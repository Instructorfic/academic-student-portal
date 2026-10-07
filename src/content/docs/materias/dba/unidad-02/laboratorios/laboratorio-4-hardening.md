---
title: "LAB-04 — Hardening y configuración segura de PostgreSQL"
description: "Unidad 2 de DBA — superficie de ataque, listen_addresses, pg_hba.conf, privilegios, TLS y línea base en PostgreSQL."
---

**Unidad:** II — Seguridad, privacidad y control de acceso
**Tema:** 2.6 Hardening de bases de datos
**Motor:** PostgreSQL 16
**Modalidad:** Individual
**Duración estimada:** 3 horas
**Tipo:** Laboratorio técnico

---

## 1. Contexto

Una base de datos puede tener usuarios, roles, permisos, cifrado y políticas de privacidad correctamente configurados y aun así presentar una superficie de ataque innecesariamente amplia.

Un servidor PostgreSQL instalado con una configuración genérica puede:

* aceptar conexiones que no necesita
* escuchar en interfaces de red innecesarias
* utilizar métodos de autenticación inadecuados
* permitir conexiones desde redes demasiado amplias
* mantener configuraciones o componentes que no son necesarios
* utilizar contraseñas o credenciales débiles
* exponer archivos de configuración
* carecer de una política documentada de actualización
* depender de reglas de firewall demasiado permisivas
* mantener configuraciones diferentes entre ambientes

El **hardening** consiste en reducir la superficie de ataque y establecer una configuración segura de operación.

En este laboratorio trabajarás sobre una instancia de PostgreSQL destinada específicamente a prácticas de administración de bases de datos.

> **Importante:** este laboratorio se realizará sobre un entorno académico aislado. No debes aplicar cambios de configuración de red, autenticación o firewall sobre servidores institucionales o de producción sin autorización.

---

## 2. Objetivo

Aplicar un proceso básico de **hardening de PostgreSQL**, identificando configuraciones inseguras, reduciendo la superficie de exposición y estableciendo controles de acceso, autenticación y configuración segura.

El estudiante deberá ser capaz de comparar el estado inicial del servidor con el estado posterior al hardening y justificar técnicamente cada cambio realizado.

---

## 3. Resultados de aprendizaje

Al finalizar el laboratorio, el estudiante será capaz de:

1. Identificar la superficie de ataque de un servidor PostgreSQL.
2. Inspeccionar la configuración actual del servidor.
3. Identificar interfaces y puertos de escucha.
4. Analizar la configuración de `pg_hba.conf`.
5. Diferenciar autenticación, autorización y control de red.
6. Restringir conexiones remotas innecesarias.
7. Aplicar reglas de acceso más específicas.
8. Revisar permisos del sistema operativo sobre archivos sensibles.
9. Identificar configuraciones inseguras o innecesarias.
10. Verificar el resultado de los cambios realizados.
11. Documentar una línea base de seguridad.
12. Elaborar una lista de verificación de hardening.

---

## 4. Conceptos y definiciones

### 4.1 Hardening

Proceso de fortalecer un sistema reduciendo su superficie de ataque y configurando sus componentes de acuerdo con requisitos de seguridad.

El hardening no consiste únicamente en "poner más seguridad".

Consiste en **eliminar o restringir aquello que no sea necesario y controlar aquello que sí debe permanecer habilitado**.

---

### 4.2 Superficie de ataque

Conjunto de interfaces, servicios, puertos, configuraciones, cuentas, aplicaciones y componentes que podrían ser utilizados para atacar un sistema.

Ejemplo:

```text
Servidor PostgreSQL

├── Puerto 5432
├── Conexiones remotas
├── Usuarios
├── Roles
├── pg_hba.conf
├── Archivos de configuración
├── Extensiones
├── Sistema operativo
└── Red
```

Mientras mayor sea la superficie innecesariamente expuesta, mayor será la cantidad de elementos que deben protegerse.

---

### 4.3 Configuración segura

Conjunto de parámetros establecidos para reducir riesgos y permitir únicamente las funcionalidades necesarias.

---

### 4.4 Secure by default

Principio según el cual un sistema debe iniciar con una configuración razonablemente segura y no depender de que el administrador habilite controles después de una exposición innecesaria.

---

### 4.5 Puerto

Identificador lógico utilizado por un sistema operativo para asociar comunicaciones de red con un servicio.

PostgreSQL utiliza normalmente:

```text
TCP 5432
```

El número del puerto **no constituye por sí mismo un mecanismo de seguridad**.

Cambiar 5432 por otro puerto puede reducir ruido automatizado, pero no sustituye autenticación, autorización ni firewall.

---

### 4.6 `listen_addresses`

Parámetro de PostgreSQL que determina en qué direcciones IP acepta conexiones.

Ejemplo:

```text
listen_addresses = 'localhost'
```

permite escuchar únicamente en la interfaz local.

Una configuración como:

```text
listen_addresses = '*'
```

permite escuchar en todas las interfaces disponibles.

Esto no significa automáticamente que cualquier equipo pueda conectarse, porque también intervienen `pg_hba.conf` y los controles de red.

---

### 4.7 `pg_hba.conf`

Archivo de configuración utilizado por PostgreSQL para determinar qué conexiones pueden autenticarse y bajo qué método.

El nombre significa:

**PostgreSQL Host-Based Authentication**

Sus reglas consideran elementos como:

* tipo de conexión
* base de datos
* usuario
* dirección de origen
* método de autenticación

---

### 4.8 Autenticación

Proceso mediante el cual un sistema verifica quién es un usuario.

Ejemplo:

```text
usuario + contraseña
```

---

### 4.9 Autorización

Proceso mediante el cual se determina qué puede hacer un usuario autenticado.

Ejemplo:

```text
juan puede consultar clientes
juan no puede eliminar clientes
```

---

### 4.10 Control de acceso por red

Restricción de las conexiones según origen, destino, puerto o segmento de red.

---

### 4.11 Firewall

Mecanismo que permite controlar qué comunicaciones de red pueden entrar o salir de un sistema.

---

### 4.12 Allowlist

Lista explícita de orígenes, usuarios, servicios o recursos autorizados.

La idea general es:

> permitir únicamente lo necesario.

---

### 4.13 Segmentación de red

Separación de recursos en diferentes segmentos de red para limitar la comunicación entre ellos.

---

### 4.14 Mínimo privilegio

Principio según el cual un usuario, servicio o componente debe tener únicamente los privilegios necesarios para realizar su función.

---

### 4.15 Cuenta de servicio

Cuenta utilizada por una aplicación o servicio para conectarse a PostgreSQL.

No debe utilizarse una cuenta administrativa como credencial de una aplicación.

---

### 4.16 Archivo sensible

Archivo cuyo contenido puede revelar información de configuración, credenciales, certificados, claves o parámetros importantes de seguridad.

Ejemplos:

```text
postgresql.conf
pg_hba.conf
pg_ident.conf
```

La protección debe considerar tanto PostgreSQL como el sistema operativo.

---

### 4.17 Línea base de seguridad

Estado documentado de una configuración considerada aceptable desde el punto de vista de seguridad.

Permite comparar:

```text
estado inicial
      ↓
hardening
      ↓
estado esperado
```

---

### 4.18 Hardening checklist

Lista de verificaciones utilizadas para comprobar que una configuración cumple los controles de seguridad definidos.

---

## 5. Escenario

La empresa ficticia **Comercializadora Norte S.A. de C.V.** cuenta con una aplicación interna que utiliza PostgreSQL.

Durante una revisión de seguridad se detectaron las siguientes condiciones:

* PostgreSQL escucha en todas las interfaces.
* El puerto 5432 está disponible desde una red demasiado amplia.
* Existen reglas de `pg_hba.conf` demasiado permisivas.
* Se utilizan cuentas administrativas para algunas conexiones.
* No existe una documentación formal de la configuración segura.
* Los archivos de configuración no han sido revisados.
* No existe una lista de verificación de hardening.
* La organización no tiene documentada una política de actualización.
* No se conoce con precisión qué conexiones remotas son realmente necesarias.

Tu responsabilidad como administrador de bases de datos será analizar la situación y aplicar medidas de hardening.

---

## 6. Preparación del laboratorio

Antes de comenzar verifica que tienes acceso a:

* PostgreSQL 16
* usuario administrativo del laboratorio
* terminal
* `psql`
* servidor PostgreSQL asignado
* una cuenta de prueba
* una base de datos de laboratorio

No realices cambios directamente sobre un servidor de producción.

---

## 7. Actividad 1 — Identificar la superficie de ataque

### Objetivo

Identificar los principales puntos de exposición del servidor PostgreSQL.

Ejecuta:

```sql
SELECT version();
```

Después:

```sql
SHOW port;
SHOW listen_addresses;
SHOW ssl;
SHOW password_encryption;
```

Obtén también información sobre las conexiones:

```sql
SELECT
    pid,
    usename,
    datname,
    client_addr,
    client_port,
    application_name
FROM pg_stat_activity;
```

Registra:

| Elemento                 | Estado actual | ¿Es necesario? | Riesgo |
| ------------------------ | ------------- | -------------- | ------ |
| Puerto PostgreSQL        |               |                |        |
| Interfaces de escucha    |               |                |        |
| Conexiones remotas       |               |                |        |
| Usuarios administrativos |               |                |        |
| SSL/TLS                  |               |                |        |
| Métodos de autenticación |               |                |        |

#### Pregunta

¿Por qué conocer la superficie de ataque debe preceder al hardening?

---

## 8. Actividad 2 — Identificar los archivos de configuración

Consulta:

```sql
SHOW config_file;
SHOW hba_file;
SHOW ident_file;
```

Documenta las rutas obtenidas.

Después identifica otros parámetros importantes:

```sql
SHOW data_directory;
SHOW log_directory;
SHOW log_connections;
SHOW log_disconnections;
```

El objetivo es que puedas distinguir entre:

```text
Datos
Configuración
Autenticación
Logs
```

#### Pregunta

¿Por qué es importante conocer la ubicación física de estos archivos?

---

## 9. Actividad 3 — Revisar `listen_addresses`

Consulta:

```sql
SHOW listen_addresses;
```

Determina si PostgreSQL está escuchando:

* únicamente localmente
* en una interfaz privada
* en todas las interfaces

Documenta:

```text
Configuración encontrada:
__________________________

Interfaces necesarias:
__________________________

Interfaces innecesarias:
__________________________
```

#### Análisis

Considera el siguiente escenario:

```text
Internet
   |
Firewall
   |
Servidor PostgreSQL
   |
5432
```

Ahora compáralo con:

```text
Internet
   X
   |
Firewall
   |
Red privada
   |
Servidor PostgreSQL
```

Explica cuál arquitectura reduce mejor la exposición y por qué.

---

## 10. Actividad 4 — Revisar `pg_hba.conf`

Consulta las reglas configuradas:

```sql
SELECT
    type,
    database,
    user_name,
    address,
    auth_method
FROM pg_hba_file_rules;
```

Identifica:

* reglas locales
* reglas para conexiones IPv4
* reglas para conexiones IPv6
* bases de datos afectadas
* usuarios afectados
* redes permitidas
* método de autenticación

Busca especialmente reglas excesivamente amplias como:

```text
0.0.0.0/0
```

o:

```text
::/0
```

Estas expresiones representan rangos extremadamente amplios.

---

## 11. Actividad 5 — Analizar una regla permisiva

Supón que encuentras una regla conceptual como:

```text
host    all    all    0.0.0.0/0    scram-sha-256
```

Analiza:

1. ¿Qué bases de datos permite?
2. ¿Qué usuarios permite?
3. ¿Qué direcciones de origen permite?
4. ¿Qué método de autenticación utiliza?
5. ¿Por qué puede representar una exposición innecesaria?
6. ¿Qué información necesitarías para restringirla?

No modifiques todavía la regla.

Primero documenta:

```text
Regla actual:
________________________________

Problema:
________________________________

Origen que realmente necesita acceso:
________________________________

Base de datos:
________________________________

Usuario:
________________________________

Regla propuesta:
________________________________
```

---

## 12. Actividad 6 — Aplicar mínimo privilegio a conexiones

Ahora diseña una regla más específica.

Por ejemplo, conceptualmente:

```text
host    basedatos_app    app_user    10.10.10.0/24    scram-sha-256
```

La regla anterior es únicamente un ejemplo.

Debes construir la regla de acuerdo con el entorno real del laboratorio.

La idea es restringir:

```text
BASE DE DATOS
+
USUARIO
+
ORIGEN
+
MÉTODO DE AUTENTICACIÓN
```

#### Principio

Una regla de acceso debe ser tan específica como sea razonablemente posible.

---

## 13. Actividad 7 — Revisar autenticación

Consulta:

```sql
SHOW password_encryption;
```

El objetivo es verificar qué mecanismo se utilizará para almacenar nuevas contraseñas cuando se establezcan mediante PostgreSQL.

En un entorno actual de PostgreSQL, debe preferirse:

```text
scram-sha-256
```

frente a mecanismos heredados como:

```text
md5
```

siempre que el entorno y los clientes lo permitan.

#### Preguntas

1. ¿Qué diferencia existe entre autenticación y autorización?
2. ¿Qué protege `scram-sha-256`?
3. ¿Por qué una contraseña almacenada mediante un mecanismo de autenticación no debe confundirse con cifrado reversible?
4. ¿Qué sucede si una cuenta tiene permisos excesivos aunque utilice una contraseña fuerte?

---

## 14. Actividad 8 — Revisar usuarios y privilegios

Obtén los roles:

```sql
\du
```

O mediante SQL:

```sql
SELECT
    rolname,
    rolsuper,
    rolinherit,
    rolcreaterole,
    rolcreatedb,
    rolcanlogin
FROM pg_roles
ORDER BY rolname;
```

Identifica:

* superusuarios
* usuarios que pueden iniciar sesión
* usuarios con `CREATEROLE`
* usuarios con `CREATEDB`
* roles utilizados por aplicaciones
* cuentas que podrían ser innecesarias

Construye una tabla:

| Rol | LOGIN | SUPERUSER | CREATEROLE | CREATEDB | Función |
| --- | ----: | --------: | ---------: | -------: | ------- |
|     |       |           |            |          |         |

#### Pregunta

¿Por qué no debería utilizarse una cuenta `SUPERUSER` como cuenta normal de una aplicación?

---

## 15. Actividad 9 — Separar cuentas administrativas y de aplicación

Diseña conceptualmente tres tipos de cuentas:

#### DBA

Responsabilidades administrativas.

#### Aplicación

Conexión utilizada por el software.

#### Consulta

Usuario con acceso limitado para determinadas operaciones.

Documenta:

| Cuenta   | Propósito      | LOGIN | Privilegios     |
| -------- | -------------- | ----- | --------------- |
| DBA      | Administración | Sí    | Administrativos |
| APP      | Aplicación     | Sí    | Mínimos         |
| CONSULTA | Consulta       | Sí    | Solo lectura    |

#### Pregunta

¿Qué riesgo existe si la aplicación se conecta utilizando una cuenta administrativa?

---

## 16. Actividad 10 — Revisar extensiones

Consulta:

```sql
SELECT
    extname,
    extversion
FROM pg_extension
ORDER BY extname;
```

Determina:

1. qué extensiones existen
2. cuáles son necesarias
3. cuáles fueron instaladas para prácticas
4. cuáles podrían representar funcionalidad innecesaria en otro entorno

#### Importante

No significa que una extensión sea insegura simplemente por estar instalada.

El principio de hardening es:

> **habilitar únicamente la funcionalidad necesaria para el propósito del sistema.**

---

## 17. Actividad 11 — Revisar configuración relacionada con conexiones

Consulta:

```sql
SHOW max_connections;
SHOW superuser_reserved_connections;
SHOW statement_timeout;
SHOW idle_in_transaction_session_timeout;
```

Documenta los valores actuales.

Investiga y explica qué función cumple cada parámetro.

#### Pregunta

¿Por qué mantener conexiones indefinidamente abiertas puede representar un problema de disponibilidad o consumo de recursos?

---

## 18. Actividad 12 — Revisar permisos del sistema operativo

Esta actividad se realiza en la terminal del servidor.

Primero identifica:

```sql
SHOW data_directory;
SHOW config_file;
SHOW hba_file;
```

Después revisa los permisos de los archivos correspondientes desde el sistema operativo.

Ejemplo conceptual:

```bash
ls -l /ruta/postgresql.conf
ls -l /ruta/pg_hba.conf
```

Y sobre el directorio de datos:

```bash
ls -ld /ruta/data
```

Analiza:

* propietario
* grupo
* permisos
* posibilidad de lectura por otros usuarios

#### Pregunta

¿Por qué no es suficiente proteger PostgreSQL mediante `GRANT` y `REVOKE` si cualquier usuario del sistema operativo puede leer archivos sensibles?

---

## 19. Actividad 13 — Revisar exposición de red

Desde un equipo autorizado, identifica si PostgreSQL está escuchando en el puerto correspondiente.

En Linux puedes utilizar herramientas disponibles en el entorno, por ejemplo:

```bash
ss -lnt
```

o:

```bash
ss -lntp
```

Busca:

```text
5432
```

Documenta:

```text
Dirección de escucha:
______________________

Puerto:
______________________

¿Está expuesto fuera de la interfaz necesaria?
______________________
```

---

## 20. Actividad 14 — Diseñar una política de firewall

No debes modificar el firewall institucional.

Diseña una regla conceptual.

Supón:

```text
PostgreSQL
IP: 10.10.10.20
Puerto: 5432
```

Y que solamente:

```text
Red DBA: 10.10.10.0/24
```

debe tener acceso.

Construye una tabla:

| Origen                | Destino    | Puerto | Acción   |
| --------------------- | ---------- | -----: | -------- |
| 10.10.10.0/24         | PostgreSQL |   5432 | Permitir |
| Cualquier otro origen | PostgreSQL |   5432 | Denegar  |

#### Pregunta

¿Por qué `pg_hba.conf` y el firewall no son controles equivalentes?

---

## 21. Actividad 15 — Revisar TLS

Consulta:

```sql
SHOW ssl;
SHOW ssl_min_protocol_version;
```

Después:

```sql
SELECT
    pid,
    usename,
    client_addr,
    ssl,
    version,
    cipher
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();
```

Determina:

```text
¿La conexión actual utiliza TLS?
__________________________

Versión:
__________________________

Cipher:
__________________________
```

#### Relación con LAB-02

Recuerda:

```text
LAB-02
   ↓
Cifrado y TLS

LAB-04
   ↓
Hardening de la configuración
```

En este laboratorio no basta con saber que TLS existe.

Debes determinar si está correctamente integrado en la configuración del servidor y de los clientes.

---

## 22. Actividad 16 — Comparar configuración antes y después

Construye una línea base:

| Control                  | Antes | Después | Justificación |
| ------------------------ | ----- | ------- | ------------- |
| `listen_addresses`       |       |         |               |
| `pg_hba.conf`            |       |         |               |
| Método de autenticación  |       |         |               |
| Usuarios administrativos |       |         |               |
| Cuentas de aplicación    |       |         |               |
| Puerto                   |       |         |               |
| TLS                      |       |         |               |
| Permisos SO              |       |         |               |
| Extensiones              |       |         |               |
| Conexiones               |       |         |               |

Esta tabla será una de las evidencias principales del laboratorio.

---

## 23. Actividad 17 — Elaborar checklist de hardening

Construye un checklist con al menos 15 controles.

Ejemplo:

|  # | Control                            | Verificado | Evidencia |
| -: | ---------------------------------- | :--------: | --------- |
|  1 | Puerto documentado                 |            |           |
|  2 | Interfaces de escucha justificadas |            |           |
|  3 | `pg_hba.conf` revisado             |            |           |
|  4 | Redes autorizadas restringidas     |            |           |
|  5 | Autenticación segura               |            |           |
|  6 | Superusuarios identificados        |            |           |
|  7 | Cuentas de aplicación separadas    |            |           |
|  8 | Privilegios mínimos                |            |           |
|  9 | Extensiones revisadas              |            |           |
| 10 | TLS verificado                     |            |           |
| 11 | Configuración protegida            |            |           |
| 12 | Directorio de datos protegido      |            |           |
| 13 | Firewall documentado               |            |           |
| 14 | Actualizaciones documentadas       |            |           |
| 15 | Configuración registrada           |            |           |

Puedes agregar controles adicionales.

---

## 24. Actividad 18 — Caso integral

Analiza el siguiente escenario:

> PostgreSQL está configurado para aceptar conexiones desde cualquier dirección IPv4. Una aplicación web se conecta utilizando un usuario con privilegios administrativos. El servidor escucha en todas las interfaces. El firewall permite el puerto 5432 desde cualquier origen. El archivo `pg_hba.conf` permite `all/all` desde `0.0.0.0/0`. El administrador afirma que "no hay problema porque todas las contraseñas son fuertes".

Identifica al menos **10 problemas o riesgos**.

Utiliza la siguiente estructura:

|  # | Problema | Riesgo | Control propuesto |
| -: | -------- | ------ | ----------------- |
|  1 |          |        |                   |
|  2 |          |        |                   |
|  3 |          |        |                   |
|  4 |          |        |                   |
|  5 |          |        |                   |
|  6 |          |        |                   |
|  7 |          |        |                   |
|  8 |          |        |                   |
|  9 |          |        |                   |
| 10 |          |        |                   |

Después responde:

#### ¿Es suficiente tener contraseñas fuertes?

Explica tu respuesta considerando:

```text
Autenticación
+
Autorización
+
Red
+
Configuración
+
Sistema operativo
+
Monitoreo
```

---

## 25. Actividad 19 — Construcción de una línea base

Elabora una propuesta de **baseline de seguridad para PostgreSQL 16**.

Debe incluir al menos:

#### Red

* interfaces autorizadas
* puerto
* firewall
* redes permitidas

#### Autenticación

* método
* políticas de credenciales
* cuentas administrativas

#### Autorización

* roles
* privilegios
* cuentas de aplicación

#### Configuración

* parámetros relevantes
* extensiones
* conexiones

#### Sistema operativo

* propietario de archivos
* permisos
* protección del directorio de datos

#### Cifrado

* TLS
* protección de credenciales
* protección de información sensible

#### Mantenimiento

* actualización
* revisión periódica
* documentación

---

## 26. Verificación final

Al terminar debes poder responder afirmativamente:

* [ ] Identifiqué la superficie de ataque.
* [ ] Identifiqué las interfaces de escucha.
* [ ] Identifiqué el puerto PostgreSQL.
* [ ] Revisé `pg_hba.conf`.
* [ ] Analicé las reglas de autenticación.
* [ ] Identifiqué cuentas administrativas.
* [ ] Revisé privilegios de los roles.
* [ ] Separé conceptualmente cuentas administrativas y de aplicación.
* [ ] Revisé extensiones.
* [ ] Revisé parámetros de conexión.
* [ ] Revisé permisos del sistema operativo.
* [ ] Verifiqué exposición de red.
* [ ] Analicé el uso de TLS.
* [ ] Documenté cambios.
* [ ] Elaboré una checklist.
* [ ] Construí una línea base.

---

## 27. Evidencias

La carpeta del laboratorio debe contener:

```text
lab-04-hardening/
├── README.md
├── sql/
│   ├── 01-inspeccion.sql
│   ├── 02-roles.sql
│   ├── 03-configuracion.sql
│   └── 04-verificacion.sql
├── configuracion/
│   ├── baseline.md
│   └── cambios.md
├── evidencias/
│   ├── 01-superficie-ataque.png
│   ├── 02-listen-addresses.png
│   ├── 03-pg-hba.png
│   ├── 04-roles.png
│   ├── 05-tls.png
│   └── 06-verificacion.png
└── informe.md
```

No es necesario capturar pantalla de cada comando.

La evidencia debe demostrar el **resultado** y no simplemente que se ejecutó un comando.

---

## 28. README del laboratorio

El `README.md` debe contener:

```markdown
# LAB-04 — Hardening y configuración segura de PostgreSQL

## Objetivo

## Entorno

## Superficie de ataque inicial

## Hallazgos

## Cambios realizados

## Justificación de los cambios

## Verificación

## Checklist de hardening

## Conclusiones
```

---

## 29. Commits sugeridos

Se recomienda mantener una trazabilidad sencilla.

Ejemplos:

```text
feat: documenta superficie de ataque
feat: analiza configuracion de pg_hba
feat: aplica hardening de acceso
feat: documenta roles y privilegios
feat: verifica configuracion tls
docs: agrega baseline de seguridad
docs: agrega checklist de hardening
```

No es necesario crear ramas ni merge requests para este laboratorio.

---

## 30. Informe

El informe debe responder:

#### 1. ¿Cuál era la principal superficie de ataque?

#### 2. ¿Qué configuración representaba el mayor riesgo?

#### 3. ¿Qué cambio produjo la mayor reducción de exposición?

#### 4. ¿Qué diferencia existe entre firewall y `pg_hba.conf`?

#### 5. ¿Qué diferencia existe entre autenticación y autorización?

#### 6. ¿Por qué una cuenta de aplicación no debe ser `SUPERUSER`?

#### 7. ¿Por qué cambiar el puerto de PostgreSQL no constituye hardening suficiente?

#### 8. ¿Por qué `listen_addresses='*'` puede ser innecesario?

#### 9. ¿Qué papel tiene el sistema operativo en la seguridad de PostgreSQL?

#### 10. ¿Qué controles deberían revisarse periódicamente?

---

## 31. Reflexión

Responde individualmente:

> **¿Qué cambiarías primero si recibieras la responsabilidad de asegurar un servidor PostgreSQL que ya se encuentra funcionando en producción?**

Justifica tu respuesta considerando:

* riesgo
* exposición
* impacto
* disponibilidad
* continuidad
* privilegios
* autenticación
* red

La respuesta debe explicar **por qué** realizarías ese cambio antes que otros.

---

## 32. Evaluación

| Criterio                                  |    Valor |
| ----------------------------------------- | -------: |
| Identificación de superficie de ataque    |      15% |
| Análisis de configuración y `pg_hba.conf` |      20% |
| Roles, privilegios y cuentas              |      15% |
| Hardening de red y autenticación          |      15% |
| Revisión de sistema operativo y archivos  |      10% |
| TLS y configuración segura                |      10% |
| Checklist y baseline                      |      10% |
| Evidencia y documentación                 |       5% |
| **Total**                                 | **100%** |

---

## 33. Criterios técnicos

El laboratorio será considerado correctamente realizado cuando el estudiante:

1. No se limite a ejecutar comandos.
2. Explique qué información obtuvo.
3. Identifique riesgos concretos.
4. Proponga controles adecuados.
5. Justifique técnicamente los cambios.
6. Diferencie controles de red, autenticación y autorización.
7. No utilice privilegios administrativos innecesariamente.
8. Verifique que los cambios realmente funcionen.
9. Documente el estado anterior y posterior.
10. Mantenga evidencia reproducible.

---

## 34. Errores que deben evitarse

#### Error 1

Pensar que cambiar:

```text
5432 → 5433
```

es suficiente para proteger PostgreSQL.

**No lo es.**

---

#### Error 2

Utilizar:

```text
0.0.0.0/0
```

sin justificarlo.

Un rango amplio debe considerarse una decisión de exposición y no una configuración predeterminada.

---

#### Error 3

Confundir:

```text
Autenticación
```

con:

```text
Autorización
```

Una contraseña verifica identidad.

Los privilegios determinan qué puede hacer esa identidad.

---

#### Error 4

Utilizar `SUPERUSER` para una aplicación.

Una aplicación comprometida podría heredar las capacidades de esa cuenta.

---

#### Error 5

Pensar que PostgreSQL es seguro solamente porque tiene contraseña.

La seguridad de una base de datos depende de múltiples capas:

```text
Sistema operativo
       ↓
Red / Firewall
       ↓
PostgreSQL
       ↓
Autenticación
       ↓
Autorización
       ↓
Datos
       ↓
Aplicación
```

---

#### Error 6

Modificar configuración sin documentarla.

Un hardening que no puede reproducirse ni verificarse se convierte rápidamente en una configuración desconocida.

---

## 35. Relación con los laboratorios anteriores

Este laboratorio integra los conocimientos desarrollados durante la Unidad II.

```text
LAB-01
Protección y privacidad
        ↓
LAB-02
Cifrado y comunicaciones
        ↓
LAB-03
Privacidad y cumplimiento
        ↓
LAB-04
Hardening
        ↓
INTEGRADOR
Evaluación integral de seguridad
```

En los primeros laboratorios aprendiste a proteger los datos.

Ahora aprenderás a proteger **el entorno que permite acceder a esos datos**.

---

## 36. Preparación para el laboratorio integrador

El LAB-04 será utilizado como base para el laboratorio integrador de la Unidad II.

En el integrador deberás recibir un servidor PostgreSQL con una configuración deliberadamente imperfecta y realizar un proceso completo de evaluación:

```text
1. Descubrir
      ↓
2. Identificar riesgos
      ↓
3. Priorizar
      ↓
4. Aplicar controles
      ↓
5. Verificar
      ↓
6. Documentar
```

El objetivo ya no será simplemente ejecutar instrucciones.

El objetivo será **pensar como un DBA responsable de la seguridad de una base de datos**.
