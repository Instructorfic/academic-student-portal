---
title: "6. Hardening de servidores de bases de datos"
description: "Unidad 2 de DBA — estructura de archivos de PostgreSQL y MongoDB, parámetros críticos, hardening del sistema operativo y de la red, y línea base de configuración segura."
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

## Instalación funcional contra instalación segura

| | |
| --- | --- |
| **Instalación funcional** | Todo habilitado, cualquier interfaz, cualquier extensión. |
| **Instalación endurecida** | Solo lo que la aplicación realmente necesita. |

> Referencia. Saltzer y Schroeder (1975); ISO/IEC 27002:2022.

## Dónde viven los datos realmente

Todo gestor de base de datos separa cuatro tipos de archivo. Un DBA
necesita saber dónde está cada uno antes de tocar cualquier parámetro:

* **Archivos de datos** — donde vive el contenido real de las tablas o
  colecciones.
* **Archivos de configuración** — cómo se comporta el motor: puerto,
  memoria, quién puede conectarse.
* **Registro de escritura** — bitácora de cambios antes de aplicarlos al
  archivo de datos; da durabilidad ante una caída.
* **Archivos de autenticación y metadatos** — quién puede conectarse y
  con qué método, versión del motor que creó los archivos.

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

### PostgreSQL

| Parámetro en `postgresql.conf` | Por defecto | Qué decide el DBA |
| --- | --- | --- |
| `port` | 5432 | Cambiarlo retrasa escaneos automáticos, no sustituye el control de acceso. |
| `listen_addresses` | `localhost`, en el paquete *upstream* | Restringir a las IP que realmente necesitan conectarse. |
| `max_connections` | 100 | Evita agotamiento de memoria; también es un vector de disponibilidad. |
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
| `net.maxIncomingConnections` | 65536 | Equivalente a `max_connections`; dimensionar. |
| `security.authorization` | `disabled` | Debe quedar `enabled` (ver [tema 2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/)). |
| `setParameter.enableLocalhostAuthBypass` | `true` | Deshabilitar una vez creado el primer usuario. |
| `security.javascriptEnabled` | `true` | Deshabilitar si la app no usa `$where` o `mapReduce`. |

MongoDB 3.6 cambió `bindIp` a `localhost` por defecto como respuesta
directa a incidentes como el de 2017 (ver más abajo). El `--auth` con
publicación abierta que usan los laboratorios de este curso deshace ese
*default* seguro por conveniencia de laboratorio, no porque MongoDB
venga inseguro por naturaleza.

> Referencia. MongoDB Manual, "Configuration File Options"; MongoDB
> Engineering Blog.

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

## Seguridad de red

| Elemento | En qué consiste |
| --- | --- |
| Segmentación | El servidor vive en una subred privada, nunca expuesto directamente a internet. |
| Firewall | Solo el servidor de aplicación tiene regla de entrada al puerto del motor. |
| Listas de control de acceso | `pg_hba.conf` o `bindIp` más *firewall* trabajan juntos — defensa en profundidad, no alternativas entre sí. |
| Acceso administrativo | Por túnel SSH o VPN, mismo mecanismo ya visto en el [tema 4](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/). |

## Más allá del checklist básico

| Elemento | Por qué importa |
| --- | --- |
| Cuentas de ejemplo | Deshabilitar cualquier usuario o base de datos de demostración que venga con la instalación por defecto. |
| Revisión periódica de extensiones | No basta con revisar al instalar — una extensión puede agregarse meses después sin que nadie lo documente. |
| Swap del sistema operativo | Si el motor puede paginar datos sensibles a memoria virtual, un *swap* sin cifrar filtra esos datos fuera del control del motor. |
| Aislamiento del usuario del servicio | El usuario del sistema operativo que corre el motor solo debe tener permisos sobre su propio directorio de datos. |

## Checklist de hardening: antes y después

| Elemento | Capa | Antes | Después |
| --- | --- | --- | --- |
| Puerto publicado por el contenedor | Host | Abierto a todo | Restringido a red interna |
| `listen_addresses` o `bindIp` | Motor | `*` o `0.0.0.0` | Solo las necesarias |
| `pg_hba.conf` | Motor | Acepta cualquier origen | Restringido a rango de red |
| Extensiones no usadas | Motor | Pueden estar instaladas | Eliminadas |
| Cuentas de ejemplo | Motor | Presentes | Deshabilitadas |
| SSH | Sistema operativo | Acepta contraseña y root | Solo llave, sin root directo |

## Línea base de configuración segura

Una **línea base** (*baseline*) de configuración segura es un documento
de referencia — normalmente un *checklist* — contra el que se compara la
configuración real de un servidor. El **CIS PostgreSQL Benchmark**, del
Center for Internet Security, es un ejemplo público y ampliamente usado
de este tipo de *checklist* para PostgreSQL (REF-U2-11). Documentar los
cambios de seguridad realizados y revisar la configuración
periódicamente son parte integral de mantener esa línea base vigente.

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

> **Actividad 7 — Checklist de hardening (laboratorio, antes/después).**
> Documenta el estado por defecto de los contenedores que contienen
> `clientes`, en PostgreSQL y MongoDB, en las tres capas vistas — motor,
> sistema operativo y red. Aplica al menos tres cambios de
> endurecimiento en cada capa y compara antes contra después.
> Instrucciones completas en la
> [Actividad 7](/materias/dba/unidad-02/actividades/actividad-7/), guía
> técnica en el
> [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/).

## Referencias de este tema

- The PostgreSQL Global Development Group, "Database File Layout",
  secc. 65.1.
- MongoDB Manual, "WiredTiger Storage Engine"; "Configuration File
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
