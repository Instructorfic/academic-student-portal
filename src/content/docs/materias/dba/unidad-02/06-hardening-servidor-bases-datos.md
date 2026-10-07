---
title: "6. Hardening de servidores de bases de datos"
description: "Unidad 2 de DBA — superficie de ataque, configuración segura, rutas y archivos de PostgreSQL y MongoDB, sistema operativo, red, línea base, parches y defensa en profundidad."
---

Ya conectamos cada control técnico con la obligación legal que lo exige.
Falta la última capa: el servidor mismo, en sus tres capas — motor,
sistema operativo, red.

**Hardening** (endurecimiento de configuración) es el proceso de reducir
la **superficie de ataque** de un sistema: eliminar o deshabilitar todo lo
que no es estrictamente necesario para que el sistema cumpla su función,
de forma que quede menos espacio para que algo salga mal. Un DBA no solo
instala el motor: decide qué parte de esa instalación por defecto se
queda y cuál se apaga. Esa decisión continua es hardening.

Una base de datos no funciona de manera aislada. Cada capa puede
introducir riesgos:

```text
Datos
  ↓
Motor de BD
  ↓
Sistema operativo
  ↓
Red
  ↓
Infraestructura
```

## Reducción de superficie de ataque

El hardening incluye eliminar configuraciones innecesarias, restringir
accesos, proteger servicios y archivos, reducir exposición, aplicar
actualizaciones, registrar eventos y establecer una línea base.

```text
Más servicios
+
Más puertos
+
Más usuarios
+
Más permisos
+
Más interfaces
=
Mayor superficie de ataque
```

El hardening busca reducirla sin afectar la función necesaria.

## Instalación funcional contra instalación segura

Una instalación funcional no necesariamente es una instalación segura.
La pregunta no es "¿funciona?", sino:

> ¿Funciona con la menor exposición razonable?

| Funcional | Segura |
| --- | --- |
| Permite conexiones | Permite conexiones necesarias |
| Muchos servicios activos | Servicios necesarios |
| Acceso amplio | Acceso restringido |
| Configuración predeterminada | Configuración revisada |
| Privilegios amplios | Mínimo privilegio |
| Sin línea base | Línea base documentada |

**Una instalación funcional es solamente el punto de partida.** Una
configuración segura por defecto implica escuchar solamente donde sea
necesario, deshabilitar funciones no utilizadas, evitar cuentas
innecesarias, restringir accesos y utilizar autenticación adecuada.

> Referencia. Saltzer y Schroeder (1975), ISO/IEC 27002:2022.

## Cuentas, servicios y extensiones innecesarias

Durante el hardening deben revisarse cuentas, roles, servicios,
procesos, extensiones, módulos, puertos e interfaces. Antes de eliminar
algo:

1. identificar su función
2. determinar dependencias
3. evaluar impacto
4. aplicar el cambio
5. verificar

## Separación de ambientes

Los ambientes de desarrollo, pruebas y producción no deberían tratarse
como uno solo. Deben controlarse por separado los datos, las
credenciales, los accesos, las configuraciones, los permisos y las
conexiones.

Los datos reales de producción no deberían copiarse directamente a
desarrollo sin controles apropiados de protección y transformación (ver
[3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/)).

## Dónde viven los datos realmente

Todo gestor de base de datos separa cuatro tipos de archivo. Un DBA
necesita saber dónde está cada uno antes de tocar cualquier parámetro:

* **Archivos de datos** — donde vive el contenido real de las tablas o
  colecciones.
* **Archivos de configuración** — cómo se comporta el motor: puerto,
  memoria, quién puede conectarse.
* **Registro de escritura** — bitácora de cambios antes de aplicarlos al
  archivo de datos. Da durabilidad ante una caída.
* **Archivos de autenticación y metadatos** — quién puede conectarse y
  con qué método, versión del motor que creó los archivos.

### Rutas habituales en una instalación de paquete

En instalaciones mediante paquetes Debian/Ubuntu, las rutas habituales
son:

| Elemento | PostgreSQL | MongoDB |
| --- | --- | --- |
| Configuración principal | `/etc/postgresql/16/main/postgresql.conf` | `/etc/mongod.conf` |
| Control de acceso | `/etc/postgresql/16/main/pg_hba.conf` | Roles y autorización |
| Identificación | `/etc/postgresql/16/main/pg_ident.conf` | — |
| Directorio de datos | `/var/lib/postgresql/16/main/` | `/var/lib/mongodb/` |
| Logs | `/var/log/postgresql/` | `/var/log/mongodb/` |
| Log principal | `/var/log/postgresql/postgresql-16-main.log` | `/var/log/mongodb/mongod.log` |
| Servicio | `postgresql@16-main.service` | `mongod.service` |
| Puerto | `5432` | `27017` |

Las rutas pueden cambiar según versión, distribución y método de
instalación. El directorio de datos no debe utilizarse como un
directorio común de intercambio de archivos, y los logs ayudan a
detectar conexiones, desconexiones, errores, problemas de autenticación
y eventos administrativos.

### PostgreSQL: estructura del directorio de datos (PGDATA)

Ruta típica en Docker: `/var/lib/postgresql/data`. En una instalación de
paquete Debian o Ubuntu: `/var/lib/postgresql/16/main`.

| Elemento dentro de PGDATA | Qué contiene |
| --- | --- |
| `base/` | Un subdirectorio por base de datos, nombrado por su OID. |
| `base/<oid>/<relfilenode>` | El archivo real de cada tabla o índice — el nombre es un identificador interno, no el nombre de la tabla. |
| `global/` | Catálogos compartidos por todo el clúster: roles, lista de bases. |
| `pg_wal/` | *Write Ahead Log* — cada cambio se escribe aquí antes que en el archivo de la tabla. |
| `PG_VERSION` | Versión mayor de PostgreSQL que creó este directorio. |
| `postgresql.conf` | Configuración principal del motor. |
| `postgresql.auto.conf` | Cambios hechos con `ALTER SYSTEM` — se sobreponen a `postgresql.conf`. |
| `pg_hba.conf` | Quién puede conectarse, desde dónde y con qué método. |
| `pg_ident.conf` | Mapeo de usuarios del sistema operativo a roles de PostgreSQL. |

Cada tabla se guarda en páginas fijas de 8 KB. Un valor muy grande no
cabe en la página y se mueve a una estructura aparte llamada TOAST,
transparente para quien consulta.

> Referencia. PostgreSQL Documentation, "Database File Layout",
> secc. 65.1.

### MongoDB: dónde y cómo se almacenan realmente los datos

Ruta típica de `dbPath`: `/var/lib/mongodb` en paquete Debian o Ubuntu,
`/data/db` en instalación manual o en la imagen oficial de Docker.

Un documento no vive como un archivo JSON suelto. MongoDB usa el motor
de almacenamiento **WiredTiger** (por defecto desde la versión 3.2), que
organiza los documentos BSON dentro de sus propias estructuras internas
en disco.

| Elemento dentro de dbPath | Qué contiene |
| --- | --- |
| `collection-<id>.wt` | Un archivo binario por colección, con páginas tipo B-tree gestionadas por WiredTiger, comprimidas por defecto con *snappy*. |
| `index-<id>.wt` | Un archivo por cada índice de esa colección. |
| `WiredTiger.wt` | El catálogo interno que mapea cada colección e índice a su archivo físico. |
| `journal/` | El equivalente al WAL de PostgreSQL — WiredTiger registra aquí cada escritura antes de aplicarla. |
| `WiredTigerHS.wt` | Historial de *snapshots*, usado para lecturas consistentes bajo concurrencia. |

Un documento BSON es la unidad lógica que ve la aplicación. Físicamente,
WiredTiger nunca guarda un archivo por documento: varios documentos
comparten las mismas páginas comprimidas dentro del archivo de su
colección.

> Referencia. MongoDB Manual, "WiredTiger Storage Engine".

### Archivo de configuración de MongoDB: `mongod.conf`

Ruta típica: `/etc/mongod.conf`. Formato YAML, no INI como
`postgresql.conf`.

```yaml
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true

net:
  port: 27017
  bindIp: 127.0.0.1

security:
  authorization: enabled
```

A diferencia de PostgreSQL, que separa configuración general y control
de acceso en dos archivos, MongoDB concentra todo en `mongod.conf`,
organizado por secciones.

### Comparativa de archivos: PostgreSQL contra MongoDB

| Concepto | PostgreSQL | MongoDB |
| --- | --- | --- |
| Directorio de datos | PGDATA, `/var/lib/postgresql/.../main` | dbPath, `/var/lib/mongodb` |
| Dónde vive cada tabla o colección | `base/<oid_bd>/<relfilenode>` | archivo `.wt` por colección dentro de dbPath |
| Formato interno | páginas de 8 KB, TOAST para valores grandes | páginas B-tree de WiredTiger, comprimidas, documentos BSON |
| Registro de escritura | `pg_wal/` | `journal/` |
| Configuración principal | `postgresql.conf` | `mongod.conf`, formato YAML |
| Control de acceso | `pg_hba.conf`, archivo separado | sección `security` y `net` dentro de `mongod.conf` |
| Metadatos de versión | `PG_VERSION` | `WiredTiger.wt`, catálogo |

## Parámetros críticos que un DBA debe conocer

El DBA debe revisar parámetros relacionados con conexiones, interfaces,
autenticación, autorización, logging, TLS, límites, extensiones,
archivos y almacenamiento. La configuración debe documentarse.

`pg_hba.conf` es uno de los archivos más importantes para el control de
acceso en PostgreSQL. Una regla determina tipo de conexión, base de
datos, usuario, origen y método de autenticación:

```text
host  db_app  usuario_app  red_autorizada  scram-sha-256
```

En MongoDB, autenticación (¿quién eres?) y autorización (¿qué puedes
hacer?) son conceptos diferentes. La autorización basada en roles
permite limitar las operaciones disponibles para cada usuario.

### PostgreSQL

| Parámetro en `postgresql.conf` | Por defecto | Qué decide el DBA |
| --- | --- | --- |
| `port` | 5432 | Cambiarlo retrasa escaneos automáticos, no sustituye el control de acceso. |
| `listen_addresses` | `localhost`, en el paquete *upstream* | Restringir a las IP que realmente necesitan conectarse. |
| `max_connections` | 100 | Evita agotamiento de memoria, también es un vector de disponibilidad. |
| `superuser_reserved_connections` | 3 | Garantiza acceso del DBA durante un incidente. |
| `password_encryption` | `scram-sha-256` desde PG 14 | Verificar que no quede en `md5`. |
| `statement_timeout` | Sin límite | Corta sesiones colgadas que agotan conexiones. |
| `shared_preload_libraries` | Vacío | Cada extensión cargada es superficie de ataque adicional. |

Cambiar el puerto por defecto es seguridad por oscuridad — el mismo
principio de Kerckhoffs del [tema 4](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/):
no reemplaza `pg_hba.conf` ni un *firewall*.

### MongoDB

| Parámetro en `mongod.conf` | Por defecto | Qué decide el DBA |
| --- | --- | --- |
| `net.port` | 27017 | Mismo matiz que en PostgreSQL. |
| `net.bindIp` | `127.0.0.1` desde la versión 3.6 | Ampliarlo solo a las IP necesarias, nunca a `0.0.0.0` en producción. |
| `net.maxIncomingConnections` | 65536 | Equivalente a `max_connections`, dimensionar. |
| `security.authorization` | `disabled` | Debe quedar `enabled` (ver [tema 2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/)). |
| `setParameter.enableLocalhostAuthBypass` | `true` | Deshabilitar una vez creado el primer usuario. |
| `security.javascriptEnabled` | `true` | Deshabilitar si la app no usa `$where` o `mapReduce`. |

MongoDB 3.6 cambió `bindIp` a `localhost` por defecto como respuesta
directa a incidentes como el de 2017 (ver más abajo). El `--auth` con
publicación abierta que usan los laboratorios de este curso deshace ese
*default* seguro por conveniencia de laboratorio, no porque MongoDB
venga inseguro por naturaleza.

> Referencia. MongoDB Manual, "Configuration File Options", MongoDB
> Engineering Blog.

## Referencia rápida: PostgreSQL y MongoDB

| Elemento | PostgreSQL | MongoDB |
| --- | --- | --- |
| Cliente | `psql` | `mongosh` |
| Servicio | `postgresql@16-main` | `mongod` |
| Puerto | `5432` | `27017` |
| Configuración | `postgresql.conf` | `mongod.conf` |
| Control de acceso | `pg_hba.conf` | Roles + autorización |
| Datos | `/var/lib/postgresql/16/main/` | `/var/lib/mongodb/` |
| Logs | `/var/log/postgresql/` | `/var/log/mongodb/` |
| Estado | `pg_isready` | conexión con `mongosh` |
| Red | `listen_addresses` | `bindIp` |
| Comunicación segura | TLS | TLS |

**No son equivalencias funcionales exactas.** Utiliza esta tabla como
referencia durante las prácticas, no como sustituto de la documentación
oficial del motor.

## Lo mínimo que un DBA debe conocer del sistema operativo

Esto no reemplaza al equipo de infraestructura. Es la base que un DBA
necesita para no depender de otro equipo en una emergencia.

| Elemento | En qué consiste |
| --- | --- |
| Actualizaciones automáticas | Parches de seguridad del sistema operativo aplicados sin depender de que alguien lo recuerde — por ejemplo, `unattended-upgrades` en Debian o Ubuntu. |
| SSH endurecido | `PermitRootLogin no`, `PasswordAuthentication no`, dentro de `/etc/ssh/sshd_config`. Solo acceso por llave, nunca root directo. |
| Firewall de host | `ufw` o `firewalld` como complemento del *firewall* de red, no como sustituto. |
| Cuentas de usuario | Sin cuentas compartidas. Acceso administrativo vía `sudo`, nunca sesión root compartida entre varias personas. |
| Protección contra fuerza bruta | `fail2ban` o equivalente sobre el servicio SSH. |
| MAC a nivel de sistema operativo | SELinux o AppArmor — el modelo MAC del [tema 2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) aplicado al sistema operativo, no solo a la base de datos. |

## Lo que el motor no resuelve por sí solo

| Elemento | Qué implica |
| --- | --- |
| Usuario del servicio | PostgreSQL corre como `postgres`, MongoDB como `mongodb`, nunca como `root`. |
| Permisos de archivos de configuración | `postgresql.conf`, `pg_hba.conf` y `mongod.conf`, con `chmod 600`, propietario del servicio. |
| Permisos de datos y respaldos | Directorio de datos con `chmod 700` — un respaldo sin cifrar y con permisos abiertos deshace el cifrado en reposo del [tema 4](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/). |
| Gestión de parches | Parchar el motor y parchar el sistema operativo son procesos distintos que el DBA debe coordinar. |

El proceso del motor no debería ejecutarse como `root`: si un servicio
es comprometido, sus privilegios deben estar limitados.

### Protección de respaldos

Un respaldo contiene información que puede ser tan sensible como la base
de datos original. Debe protegerse su acceso, almacenamiento,
transmisión, cifrado, retención y eliminación.

> ¿Qué ocurriría si un atacante obtiene nuestro respaldo?

### Restricción del acceso administrativo

No todos los usuarios deben administrar el servidor. Deben controlarse
las cuentas administrativas, el acceso remoto, los privilegios, `sudo`,
el acceso al sistema operativo y el acceso a la base de datos.

> **Principio.** Administrar una base de datos no implica administrar
> todo el servidor.

## Seguridad de red

| Elemento | En qué consiste |
| --- | --- |
| Segmentación | El servidor vive en una subred privada, nunca expuesto directamente a internet. |
| Firewall | Solo el servidor de aplicación tiene regla de entrada al puerto del motor. |
| Listas de control de acceso | `pg_hba.conf` o `bindIp` más *firewall* trabajan juntos — defensa en profundidad, no alternativas entre sí. |
| Acceso administrativo | Por túnel SSH o VPN, mismo mecanismo ya visto en el [tema 4](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/). |

### Allowlists

Una *allowlist* define explícitamente qué orígenes están autorizados.

```text
Servidor de aplicación
        ↓
TCP 5432
        ↓
Servidor PostgreSQL
```

en lugar de:

```text
Cualquier origen
        ↓
TCP 5432
        ↓
Servidor PostgreSQL
```

Una política básica de *firewall* se expresa como "permitir lo necesario
y bloquear lo innecesario". Es preferible autorizar explícitamente lo
necesario.

### Restricción de exposición pública

Un servidor de base de datos no necesita estar expuesto directamente a
Internet. El acceso administrativo puede realizarse mediante redes
privadas, VPN, túneles seguros, bastiones o canales administrativos
controlados. El puerto del motor no debería exponerse públicamente si la
operación no lo requiere.

### Diagnóstico de una conexión

Cuando una conexión falla, analiza por capas:

```text
Cliente → Conectividad → Firewall → Puerto → Servicio
        → Configuración → Autenticación → Autorización → Permisos
```

**No cambies cinco configuraciones al mismo tiempo.** Primero identifica
dónde está el problema.

## Más allá del checklist básico

| Elemento | Por qué importa |
| --- | --- |
| Cuentas de ejemplo | Deshabilitar cualquier usuario o base de datos de demostración que venga con la instalación por defecto. |
| Revisión periódica de extensiones | No basta con revisar al instalar — una extensión puede agregarse meses después sin que nadie lo documente. |
| Swap del sistema operativo | Si el motor puede paginar datos sensibles a memoria virtual, un *swap* sin cifrar filtra esos datos fuera del control del motor. |
| Aislamiento del usuario del servicio | El usuario del sistema operativo que corre el motor solo debe tener permisos sobre su propio directorio de datos. |

## Línea base de configuración segura

Una **línea base** (*baseline*) de configuración segura es un documento
de referencia — normalmente un *checklist* — contra el que se compara la
configuración real de un servidor. El **CIS PostgreSQL Benchmark**, del
Center for Internet Security, es un ejemplo público y ampliamente usado
de este tipo de *checklist* para PostgreSQL (REF-U2-11). Documentar los
cambios de seguridad realizados y revisar la configuración
periódicamente son parte integral de mantener esa línea base vigente.

Sin línea base es difícil determinar si un servidor continúa endurecido.

```text
Estado inicial
      ↓
Hardening
      ↓
Estado esperado
```

### Configuración mínima aceptable

Una línea base puede definir usuarios autorizados, servicios necesarios,
puertos e interfaces permitidos, autenticación requerida, privilegios,
archivos protegidos, logging, actualizaciones y reglas de *firewall*.
**La línea base debe ser verificable.**

| Capa | Verificaciones |
| --- | --- |
| Sistema operativo | Usuarios identificados, privilegios revisados, acceso administrativo restringido, servicios innecesarios deshabilitados, actualizaciones aplicadas, logs disponibles. |
| Base de datos | Usuarios y roles revisados, privilegios mínimos, conexiones restringidas, autenticación configurada, TLS evaluado, logging revisado. |
| Red | Puertos necesarios identificados, origen permitido definido, *firewall* configurado, exposición pública evaluada. |

### Documentación de cambios

Todo cambio relevante debe registrar:

```text
¿Qué se cambió?
¿Por qué?
¿Quién lo realizó?
¿Cuándo?
¿Qué riesgo reduce?
¿Cómo se verificó?
¿Qué impacto tuvo?
¿Cómo revertirlo?
```

Esto convierte una modificación técnica en un cambio administrado.

### Revisión periódica y deriva de configuración

El hardening no es una actividad de una sola vez. Cambian el software,
los usuarios, los servicios, las aplicaciones, las vulnerabilidades, los
requisitos y la arquitectura. Con el tiempo, nuevos servicios, usuarios,
puertos o configuraciones modificadas alejan al servidor de su línea
base: eso es **deriva de configuración**, y la revisión periódica busca
detectarla.

> ¿El servidor sigue cumpliendo la línea base seis meses después?

## Checklist de hardening: antes y después

El hardening debe producir evidencia. La evidencia debe demostrar el
cambio, por ejemplo:

| Elemento | Capa | Antes | Después |
| --- | --- | --- | --- |
| Puerto publicado por el contenedor | Host | Abierto a todo | Restringido a red interna |
| `listen_addresses` o `bindIp` | Motor | `*` o `0.0.0.0` | Solo las necesarias |
| `pg_hba.conf` | Motor | Acepta cualquier origen | Restringido a rango de red |
| Extensiones no usadas | Motor | Pueden estar instaladas | Eliminadas |
| Cuentas de ejemplo | Motor | Presentes | Deshabilitadas |
| SSH | Sistema operativo | Acepta contraseña y root | Solo llave, sin root directo |

## Caso real: MongoDB sin autenticación (2017)

Miles de instancias MongoDB expuestas en internet sin autenticación
habilitada fueron secuestradas por atacantes en cuestión de horas, antes
de que la versión 3.6 cambiara el *default* de `bindIp` (REF-U2-13). **La
configuración por defecto de un SGBD no es una configuración segura.**

## Actualizaciones y parches de seguridad

Ningún hardening inicial es suficiente si el software nunca se
actualiza: las vulnerabilidades conocidas siguen siendo explotables
mientras el parche correspondiente no se aplique. El **reporte oficial de
la GAO** (*Government Accountability Office* de Estados Unidos) sobre la
brecha de datos de Equifax en 2017 —una de las más grandes de la
historia, con información de más de 145 millones de personas
comprometida— identificó fallas relacionadas con identificación y
detección de vulnerabilidades, segmentación del acceso a las bases de
datos, y gobierno de los datos como parte de las causas que permitieron
el ataque (REF-U2-12).

Pero actualizar también requiere control:

```text
Identificar → Evaluar → Probar → Aplicar → Verificar → Documentar
```

El DBA debe conocer la versión instalada, la versión disponible, las
vulnerabilidades relevantes, la dependencia con aplicaciones, la ventana
de mantenimiento, el procedimiento de reversión y la evidencia
posterior. **No basta con decir "está actualizado": debe poder
demostrarse.**

## Defensa en profundidad

La seguridad debe combinar controles. Si una capa falla, otras pueden
limitar el impacto.

```text
Datos → Roles y privilegios → Motor de BD → Sistema operativo
      → Firewall → Segmentación → Red
```

El principio de mínimo privilegio aplica en todas las capas:

| Capa | Ejemplo |
| --- | --- |
| Base de datos | `GRANT SELECT` |
| Sistema operativo | `sudo systemctl reload postgresql` |
| Red | Permitir únicamente el origen autorizado |

Un servidor endurecido combina usuarios, privilegios, configuración,
archivos, servicios, red, logs, parches y línea base. Ningún control
individual resuelve todos los riesgos.

## Metodología de trabajo

```text
Preguntar → Observar → Decidir → Cambiar → Verificar → Documentar
```

**El objetivo no es memorizar comandos**, sino aprender a tomar
decisiones de administración segura. La evidencia de hardening puede
incluir comandos ejecutados, configuración antes y después, servicios
activos, puertos abiertos, permisos, usuarios, reglas de acceso, logs y
pruebas de conexión. **Una evidencia debe permitir que otra persona
comprenda qué ocurrió.**

> **Actividad 7 — Reducción de superficie de ataque.** Identifica
> servicios activos y puertos, relaciona puertos y procesos, revisa
> configuraciones, identifica componentes innecesarios, analiza
> privilegios, aplica cambios controlados, verifica el funcionamiento y
> documenta la evidencia. Instrucciones completas en la
> [Actividad 7](/materias/dba/unidad-02/actividades/actividad-7/), guía técnica en el
> [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/).

## Referencias de este tema

- The PostgreSQL Global Development Group, "Database File Layout",
  secc. 65.1.
- MongoDB Manual, "WiredTiger Storage Engine", "Configuration File
  Options".
- The PostgreSQL Global Development Group, cap. 20 "Client
  Authentication" (REF-U2-02).
- Center for Internet Security, *CIS PostgreSQL Benchmark* (REF-U2-11).
- U.S. GAO, *GAO-18-559*, caso Equifax (REF-U2-12).
- The Register, ataques a MongoDB sin autenticación (2017) (REF-U2-13).

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente.

## Qué sigue

Ya protegimos `clientes` en las tres capas: acceso, datos y servidor.
Revisa el [cierre de la unidad](/materias/dba/unidad-02/07-cierre-y-autoevaluacion/)
antes de avanzar a la Unidad 3.
