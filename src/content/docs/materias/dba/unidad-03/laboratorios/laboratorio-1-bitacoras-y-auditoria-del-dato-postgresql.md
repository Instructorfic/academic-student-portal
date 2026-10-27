---
title: "LAB-01 — Bitácoras y auditoría del dato en PostgreSQL"
description: "Unidad 3 de DBA — bitácora del servidor, log_statement, accesos, privilegios, auditoría del dato con disparador y pgaudit opcional en PostgreSQL."
---

**Materia:** Gestión de Seguridad y Desempeño de Bases de Datos
**Unidad:** III — Auditoría, trazabilidad y gobierno práctico de datos
**Temas:** 3.1 Auditoría de bases de datos · 3.2 Bitácoras y trazabilidad
**Motor:** PostgreSQL 16, con cualquier forma de despliegue (instalación nativa, máquina virtual o contenedor)
**Modalidad:** Práctica individual
**Duración estimada:** 5 horas en dos sesiones (Partes A y B) + 1 hora opcional (Parte C)
**Tipo:** Laboratorio técnico

---

## 1. Contexto

En la Unidad II configuraste quién puede entrar a la base de datos de **Comercializadora Norte S.A. de C.V.** y qué puede hacer cada rol. Ese trabajo responde a la pregunta:

> ¿Quién **puede** hacer qué?

Esta práctica comienza con una pregunta distinta:

> ¿Qué **ocurrió** realmente, quién lo hizo, cuándo y qué valor tenía el dato antes?

El área de facturación reporta que el RFC de una clienta aparece modificado en un reporte. La aplicación de ventas tiene permiso de actualizar la tabla `clientes`, de modo que el cambio pudo ser legítimo, un error o un abuso. Nadie puede demostrarlo, porque el servidor PostgreSQL conserva la configuración de registro por defecto.

En este laboratorio vas a:

* **Parte A.** Reproducir el problema, comprobar que sin bitácora no hay evidencia, y configurar e interpretar la bitácora (*log*) del servidor.
* **Parte B.** Construir una tabla de auditoría con disparador para conservar el valor anterior y el nuevo de cada registro modificado.
* **Parte C (opcional).** Registrar la lectura de columnas sensibles con la extensión `pgaudit`.

> **Importante:** trabaja sobre un servidor de práctica propio. No modifiques la configuración de registro de servidores institucionales o de producción sin autorización.

---

## 2. Objetivo

Configurar el registro de eventos de PostgreSQL y un mecanismo de auditoría a nivel de dato, de modo que puedan demostrarse accesos, cambios de privilegios, cambios de estructura, modificaciones de datos con su valor anterior, errores y cambios de configuración, e interpretar esos registros como evidencia de lo ocurrido.

---

## 3. Resultados de aprendizaje

Al finalizar el laboratorio, serás capaz de:

1. Explicar por qué el control de acceso no produce, por sí mismo, evidencia de lo ocurrido.
2. Localizar la configuración y la bitácora de un servidor PostgreSQL desde el propio motor, sin depender de cómo se instaló.
3. Configurar los parámetros de registro con `ALTER SYSTEM` y distinguir los que requieren recarga de los que requieren reinicio.
4. Registrar e interpretar accesos exitosos y fallidos, cambios de privilegios y de estructura, modificaciones y errores.
5. Distinguir qué registra cada nivel de `log_statement`.
6. Distinguir la bitácora (historia) de `pg_stat_activity` (estado actual).
7. Construir una tabla de auditoría con disparador que conserve el valor anterior y el nuevo.
8. Explicar el papel de `SECURITY DEFINER`, `search_path`, `session_user` y `current_user` en una función de auditoría.
9. Identificar los límites de cada mecanismo: lecturas, volumen y administradores con control total.
10. Exportar una bitácora, retirar secretos y aplicar un control básico de integridad.

---

## 4. Conceptos y definiciones

### 4.1 Auditoría de bases de datos

Registro sistemático de lo que ocurre en una base de datos para que pueda utilizarse después como **evidencia**.

La auditoría no impide que algo ocurra. Permite **demostrar** que ocurrió.

```text
Control de acceso (Unidad II)      Auditoría (Unidad III)
¿Quién PUEDE hacerlo?        →     ¿Quién LO HIZO, cuándo y desde dónde?
Actúa antes de la operación        Actúa durante y después de la operación
```

### 4.2 Evento auditable

Acción con relevancia de seguridad, cumplimiento o responsabilidad que debe quedar registrada. En este laboratorio trabajarás con seis tipos:

| Tipo | Ejemplo |
| --- | --- |
| Acceso | Conexión exitosa o fallida |
| Privilegio | `GRANT`, `REVOKE`, `CREATE ROLE` |
| Estructura | `CREATE TABLE`, `ALTER TABLE`, `DROP` |
| Datos | `INSERT`, `UPDATE`, `DELETE` |
| Error | Operación rechazada por falta de permisos |
| Configuración | Cambio de un parámetro del servidor |

### 4.3 Bitácora (*log*)

Registro cronológico de eventos producido por un sistema. Una bitácora sirve como evidencia solo si cumple tres condiciones:

```text
REGISTRO          →  el evento quedó escrito
CONSERVACIÓN      →  el registro sigue existiendo cuando se necesita
INTERPRETACIÓN    →  alguien puede leerlo y responder preguntas concretas
```

### 4.4 ¿A dónde escribe PostgreSQL su bitácora?

El servidor escribe sus mensajes en la salida de error (`stderr`). Lo que ocurre con esa salida **depende de cómo se desplegó el servidor**, y ese es el primer obstáculo al buscar evidencia:

| Despliegue | Destino habitual de `stderr` con la configuración por defecto |
| --- | --- |
| Linux con paquetes de la distribución o de PGDG | Un archivo administrado por el script de arranque (por ejemplo, en `/var/log/postgresql/`) |
| macOS con Homebrew | El archivo de bitácora del servicio de Homebrew |
| Windows con el instalador de EDB | Archivos dentro del directorio de datos (el colector suele venir activado) |
| Contenedor | La salida del contenedor, que se lee con la herramienta del contenedor |

Para no depender de esas diferencias, PostgreSQL ofrece su propio **colector de bitácora** (`logging_collector`): un proceso del servidor que captura `stderr` y lo escribe en archivos dentro de `log_directory`. Con el colector activo, las funciones del motor indican y leen el archivo vigente, en cualquier plataforma (REF-U3-17, REF-U3-18):

| Función | Qué hace |
| --- | --- |
| `pg_current_logfile()` | Devuelve la ruta del archivo de bitácora que el colector usa en este momento. Devuelve `NULL` si el colector está apagado |
| `pg_read_file(ruta)` | Devuelve el contenido de un archivo del servidor. Por defecto solo puede usarla un superusuario |
| `pg_ls_logdir()` | Lista los archivos del directorio de bitácoras |

> `pg_read_file` permite leer cualquier archivo que el proceso del servidor pueda leer. Por eso está restringida a superusuarios y no debe otorgarse a otros roles sin un análisis de riesgo (REF-U3-18).

### 4.5 Parámetros de registro

PostgreSQL controla su bitácora mediante parámetros documentados en la sección "Error Reporting and Logging" del manual oficial (REF-U3-07):

| Parámetro | Qué controla | Valor por defecto | Para cambiarlo |
| --- | --- | --- | --- |
| `logging_collector` | Si el servidor captura su propia bitácora en archivos | `off` | Reinicio |
| `log_directory` / `log_filename` | Carpeta y patrón de nombre de los archivos | `log` / `postgresql-%Y-%m-%d_%H%M%S.log` | Recarga |
| `log_connections` | Registrar cada intento de conexión | `off` | Recarga |
| `log_disconnections` | Registrar el fin de cada sesión y su duración | `off` | Recarga |
| `log_line_prefix` | Información que antecede a cada línea | `%m [%p] ` | Recarga |
| `log_statement` | Qué sentencias SQL se registran | `none` | Recarga |
| `log_min_error_statement` | A partir de qué severidad se registra la sentencia que causó un error | `error` | Recarga |

**Recarga** significa que el servidor vuelve a leer su configuración sin cortar las sesiones (`SELECT pg_reload_conf()`). **Reinicio** significa detener e iniciar el servicio. La columna `pending_restart` de `pg_settings` indica si un valor guardado espera un reinicio.

### 4.6 Niveles de `log_statement`

| Valor | Registra |
| --- | --- |
| `none` | Ninguna sentencia |
| `ddl` | Definición de datos: `CREATE`, `ALTER`, `DROP`, y también `GRANT`, `REVOKE`, `COMMENT` |
| `mod` | Todo lo de `ddl`, más `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE` y `COPY FROM` |
| `all` | Todas las sentencias, incluidas las consultas `SELECT` |

Elegir el nivel es una decisión de equilibrio: más detalle produce más evidencia, pero también más volumen, más costo de almacenamiento y más riesgo de registrar datos sensibles.

### 4.7 Prefijo de línea (`log_line_prefix`)

| Marcador | Significado |
| --- | --- |
| `%m` | Fecha y hora con milisegundos |
| `%p` | Identificador del proceso (PID). Agrupa las líneas de una misma sesión |
| `%u` | Usuario de la sesión |
| `%d` | Base de datos |
| `%a` | Nombre de la aplicación (`application_name`) |
| `%h` | Host o dirección IP del cliente |

Sin `%u`, `%d` y `%h`, una línea puede decir **qué** ocurrió pero no **quién** ni **desde dónde**.

### 4.8 `ALTER SYSTEM` y prioridad de la configuración

`ALTER SYSTEM` escribe parámetros en el archivo `postgresql.auto.conf`, dentro del directorio de datos (REF-U3-12). Es la forma recomendada en este laboratorio porque funciona igual en cualquier despliegue: no necesitas saber dónde está `postgresql.conf` ni editarlo a mano.

La prioridad es (REF-U3-13):

```text
1. Opciones -c en la línea de comandos del servidor   (mayor prioridad)
2. postgresql.auto.conf  (ALTER SYSTEM)
3. postgresql.conf                                    (menor prioridad)
```

Si el servicio se arranca con opciones `-c` (algo frecuente en scripts de servicio o en contenedores), esas opciones ganan. La columna `source` de `pg_settings` indica de dónde proviene cada valor: `default`, `configuration file` o `command line`.

### 4.9 `pg_stat_activity`

Vista del sistema con una fila por cada proceso del servidor: usuario, base de datos, aplicación, dirección del cliente, inicio de la sesión, estado y consulta más reciente (REF-U3-08).

```text
bitácora            →  historia: lo que ocurrió
pg_stat_activity    →  fotografía: lo que ocurre en este momento
```

### 4.10 Auditoría a nivel de sentencia y a nivel de dato

| Nivel | Qué registra | Ejemplo | Mecanismo en este laboratorio |
| --- | --- | --- | --- |
| Sentencia | El texto SQL que se ejecutó | `UPDATE clientes SET rfc = '...' WHERE id = 3` | `log_statement` (Parte A) |
| Dato | El valor de cada registro antes y después | `rfc: GAMA780912XYZ → GAMA780912ZZZ` | Disparador + tabla de auditoría (Parte B) |
| Objeto | Qué objeto o columna se leyó o escribió | Lectura de `clientes.rfc` | `pgaudit` (Parte C) |

Un `UPDATE` sin `WHERE` afecta a muchos registros con una sola sentencia. La bitácora registra **una** línea. La tabla de auditoría registra **una fila por cada registro afectado**.

### 4.11 Disparador (*trigger*), `SECURITY DEFINER` y `session_user`

Un **disparador** es una función que PostgreSQL ejecuta automáticamente cuando ocurre un evento sobre una tabla. La documentación oficial incluye como ejemplo una función de disparador para auditoría (REF-U3-11, ejemplo 43.4). Dentro de ella están disponibles, entre otras:

| Variable | Contenido |
| --- | --- |
| `TG_OP` | Operación que disparó la función: `INSERT`, `UPDATE`, `DELETE` o `TRUNCATE` |
| `OLD` | Registro anterior (en `UPDATE` y `DELETE`) |
| `NEW` | Registro nuevo (en `INSERT` y `UPDATE`) |

* `AFTER ... FOR EACH ROW`: la función se ejecuta después de aplicar la operación, una vez por cada registro afectado.
* `SECURITY DEFINER`: la función se ejecuta con los privilegios de su **propietario**. Así `app_ventas` puede **provocar** que se escriba en la auditoría sin tener privilegio de escribir en ella.
* Toda función `SECURITY DEFINER` debe fijar su `search_path`. Sin él, un usuario podría crear objetos con nombres iguales en otro esquema y lograr que la función los use con privilegios de propietario.

| Función | Devuelve |
| --- | --- |
| `session_user` | El rol con que se autenticó la sesión |
| `current_user` | El rol cuyos privilegios están vigentes en ese momento |

Dentro de una función `SECURITY DEFINER`, `current_user` devuelve el propietario de la función. Por eso la auditoría debe usar `session_user` para saber quién provocó el cambio.

### 4.12 Separación entre quien opera y quien audita

Un mecanismo de auditoría pierde valor si la misma persona que realiza las operaciones puede borrar o desactivar su registro. Este principio de separación de funciones lo trabajaste en la Unidad II. Aquí se aplica al propio mecanismo de auditoría.

---

## 5. Escenario

La empresa ficticia **Comercializadora Norte S.A. de C.V.** utiliza la tabla `clientes` que trabajaste durante la Unidad II.

| Actor | Rol en PostgreSQL | Privilegios sobre `clientes` |
| --- | --- | --- |
| DBA | `postgres` | Administrador |
| Aplicación de ventas | `app_ventas` | `SELECT`, `UPDATE` |
| Analista de soporte | `soporte_ana` | `SELECT` |

El reporte de facturación indica que el RFC de **María García** (`id = 3`) no coincide con el registrado originalmente. Dirección pregunta:

1. ¿Quién hizo el cambio?
2. ¿Cuándo?
3. ¿Desde qué aplicación o equipo?
4. ¿Hubo intentos de acceso fallidos antes del cambio?
5. ¿Qué valor tenía el RFC antes del cambio?

Tu tarea es demostrar si el servidor puede responder esas preguntas y, si no puede, configurarlo para que pueda hacerlo.

---

## 6. Preparación del entorno

### 6.1 Requisitos

* Un servidor **PostgreSQL 16** en el que tengas privilegios de superusuario. Puede ser una instalación nativa, una máquina virtual o un contenedor. El **Anexo A** resume cómo obtenerlo en cada caso.
* El cliente `psql` en el equipo desde el que trabajarás.
* Haber trabajado la tabla `clientes` en los laboratorios de la Unidad II.

> **Contraseñas de práctica.** Todos los valores de contraseña de esta guía son exclusivos del laboratorio. No reutilices ninguno en otro sistema. Al entregar evidencias, sustituye cualquier contraseña visible por `<REDACTED>`.

### 6.2 Dos tipos de sesión

Durante todo el laboratorio usarás dos tipos de sesión. La primera depende del despliegue; la segunda es idéntica en todos.

| Sesión | Para qué | Cómo se abre |
| --- | --- | --- |
| **Sesión de administrador** | Configurar el servidor y leer la bitácora | `psql -U postgres -d comercial`. En algunos despliegues se abre de otra forma (Anexo A, tabla A.1) |
| **Sesión por red** | Simular a la aplicación y a los usuarios, que se conectan con contraseña | `psql "postgresql://<usuario>:<contraseña>@<servidor>/comercial?application_name=<aplicacion>"` |

En esta guía `<servidor>` es `127.0.0.1`, porque el cliente y el servidor están en el mismo equipo. Si tu servidor está en una máquina virtual o en otro equipo, sustitúyelo por su dirección.

La forma `postgresql://...` es una **cadena de conexión** (*connection URI*) de la biblioteca cliente de PostgreSQL:

| Parte | Significado |
| --- | --- |
| `postgresql://` | Protocolo |
| `app_ventas:Ventas_Practica_2026@` | Usuario y contraseña |
| `127.0.0.1` | Servidor. Al usar una dirección, la conexión viaja por TCP y se evalúan las reglas `host` de `pg_hba.conf` |
| `/comercial` | Base de datos |
| `?application_name=app-ventas-web` | Nombre de la aplicación. Aparece como `%a` en la bitácora |

Se usa porque funciona igual en Bash, Zsh y PowerShell. Escribir la contraseña en la cadena es aceptable solo en este entorno de práctica. En producción las credenciales provienen de un gestor de secretos o del archivo `.pgpass` (Unidad II).

### 6.3 Identificar la instalación desde el motor

Abre la sesión de administrador. Si aún no existe la base `comercial`, conéctate a `postgres` y créala con `CREATE DATABASE comercial;`.

```sql
SELECT version();
SHOW data_directory;
SHOW config_file;
SHOW hba_file;
```

Resultado observado en el servidor de verificación (tus rutas dependerán del despliegue):

```text
 PostgreSQL 16.14 (Debian 16.14-1.pgdg13+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit

      data_directory
--------------------------
 /var/lib/postgresql/data

               config_file
------------------------------------------
 /var/lib/postgresql/data/postgresql.conf

               hba_file
--------------------------------------
 /var/lib/postgresql/data/pg_hba.conf
```

Estas cuatro consultas responden "¿qué servidor es y dónde guarda su configuración?" sin depender del sistema operativo. Anota los valores: forman parte del alcance del expediente del LAB-03.

### 6.4 Revisar las reglas de autenticación

Para observar accesos fallidos, la sesión por red debe exigir contraseña. Consulta las reglas vigentes con la vista `pg_hba_file_rules` (REF-U3-19):

```sql
SELECT line_number, type, database, user_name, address, auth_method
FROM pg_hba_file_rules
WHERE database = '{all}';
```

Resultado observado **antes** del ajuste en el servidor de verificación:

```text
 line_number | type  | database | user_name |  address  |  auth_method
-------------+-------+----------+-----------+-----------+---------------
         117 | local | {all}    | {all}     |           | trust
         119 | host  | {all}    | {all}     | 127.0.0.1 | trust
         121 | host  | {all}    | {all}     | ::1       | trust
         128 | host  | {all}    | {all}     | all       | scram-sha-256
```

Las reglas `host` para `127.0.0.1` y `::1` usan `trust`: cualquier conexión por TCP desde el propio equipo entraría **sin contraseña**, y nunca verías un acceso fallido. Esto ocurre con frecuencia en instalaciones de desarrollo.

Si en tu servidor alguna regla `host` que corresponda a tu conexión usa `trust`, cámbiala a `scram-sha-256`: edita el archivo que indicó `SHOW hba_file` (el Anexo A, tabla A.2, muestra cómo hacerlo en cada despliegue) y recarga:

```sql
SELECT pg_reload_conf();
```

Repite la consulta. Resultado esperado:

```text
 line_number | type  | database | user_name |  address  |  auth_method
-------------+-------+----------+-----------+-----------+---------------
         117 | local | {all}    | {all}     |           | trust
         119 | host  | {all}    | {all}     | 127.0.0.1 | scram-sha-256
         121 | host  | {all}    | {all}     | ::1       | scram-sha-256
         128 | host  | {all}    | {all}     | all       | scram-sha-256
```

La regla `local` (conexiones por socket del propio equipo) puede quedarse como está: la usa tu sesión de administrador.

#### Pregunta

¿Por qué una regla `trust` afecta lo que la bitácora puede demostrar sobre la identidad del usuario? Relaciona tu respuesta con el endurecimiento del servidor de la Unidad II.

### 6.5 Preparar los datos y los roles

En la sesión de administrador, crea la tabla y los datos ficticios de la Unidad II:

```sql
CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    rfc VARCHAR(13),
    edad INTEGER,
    ciudad VARCHAR(80),
    codigo_postal VARCHAR(10),
    fecha_alta DATE DEFAULT CURRENT_DATE
);

INSERT INTO clientes (nombre, correo, telefono, rfc, edad, ciudad, codigo_postal) VALUES
('Ana López', 'ana.lopez@example.test', '6671234567', 'LOAA850315ABC', 41, 'Culiacán', '80000'),
('Carlos Pérez', 'carlos.perez@example.test', '6672345678', 'PECA900720DEF', 35, 'Culiacán', '80100'),
('María García', 'maria.garcia@example.test', '6673456789', 'GAMA780912GHI', 47, 'Mazatlán', '82000'),
('Luis Torres', 'luis.torres@example.test', '6674567890', 'TOLU920201JKL', 34, 'Los Mochis', '81200'),
('Laura Sánchez', 'laura.sanchez@example.test', '6675678901', 'SALA880525MNO', 38, 'Culiacán', '80200');
```

Crea los roles **sin escribir la contraseña en la sentencia**:

```sql
CREATE ROLE app_ventas LOGIN;
CREATE ROLE soporte_ana LOGIN;
```

Asigna las contraseñas con el metacomando `\password`, que las solicita de forma interactiva:

```text
\password app_ventas
\password soporte_ana
```

Usa `Ventas_Practica_2026` y `Soporte_Practica_2026`, respectivamente. Otorga los privilegios del escenario:

```sql
GRANT SELECT, UPDATE ON clientes TO app_ventas;
GRANT SELECT ON clientes TO soporte_ana;
```

> Las órdenes de `psql` que empiezan con `\` (`\password`, `\q`, `\dp`) son **metacomandos**: los ejecuta el cliente, no el servidor. En la Actividad 6 descubrirás por qué se pidió `\password`.

---

## PARTE A — Bitácora del servidor

---

## 7. Actividad 1 — Revisar la configuración de registro por defecto

En la sesión de administrador:

```sql
SELECT name, setting, source
FROM pg_settings
WHERE name IN ('log_destination', 'logging_collector', 'log_directory', 'log_filename',
               'log_connections', 'log_disconnections', 'log_line_prefix',
               'log_statement', 'log_min_error_statement', 'log_timezone')
ORDER BY name;
```

Resultado observado:

```text
          name           |            setting             |       source
-------------------------+--------------------------------+--------------------
 log_connections         | off                            | default
 log_destination         | stderr                         | default
 log_directory           | log                            | default
 log_disconnections      | off                            | default
 log_filename            | postgresql-%Y-%m-%d_%H%M%S.log | default
 logging_collector       | off                            | default
 log_line_prefix         | %m [%p]                        | default
 log_min_error_statement | error                          | default
 log_statement           | none                           | default
 log_timezone            | Etc/UTC                        | configuration file
(10 rows)
```

> Algunas instalaciones cambian valores por defecto en su `postgresql.conf` (por ejemplo, el colector activado o un prefijo distinto). Registra **tus** valores y su `source`.

#### Preguntas

1. Con esta configuración, ¿se registra quién se conecta?
2. ¿Se registran las sentencias `UPDATE`?
3. ¿La línea de bitácora incluye el usuario o la dirección IP del cliente?
4. ¿En qué zona horaria se registran los eventos? ¿Por qué importa al reconstruir una cronología?
5. Con `logging_collector = off`, ¿quién decide dónde termina la bitácora: PostgreSQL o el mecanismo con que se desplegó el servidor?

Guarda tus respuestas en `evidencias/01-configuracion-inicial.md`.

---

## 8. Actividad 2 — Que el servidor administre su propia bitácora

Activa el colector:

```sql
ALTER SYSTEM SET logging_collector = on;
SELECT name, setting, pending_restart FROM pg_settings WHERE name = 'logging_collector';
```

`logging_collector` solo cambia con un **reinicio**. Reinicia el servicio con el comando que corresponde a tu despliegue (Anexo A, tabla A.1) y vuelve a abrir la sesión de administrador.

Comprueba el resultado:

```sql
SELECT name, setting, source FROM pg_settings WHERE name = 'logging_collector';
SELECT pg_current_logfile();
```

Resultado observado:

```text
       name        | setting |       source
-------------------+---------+--------------------
 logging_collector | on      | configuration file

          pg_current_logfile
--------------------------------------
 log/postgresql-2026-10-25_224920.log
```

La ruta es relativa al directorio de datos (sección 6.3). Lee el archivo desde el propio motor:

```sql
SELECT linea
FROM regexp_split_to_table(pg_read_file(pg_current_logfile()), E'\n') AS linea;
```

Resultado observado:

```text
 2026-10-25 22:49:20.693 UTC [1] LOG:  starting PostgreSQL 16.14 (Debian 16.14-1.pgdg13+1) on x86_64-pc-linux-gnu, ...
 2026-10-25 22:49:20.695 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
 2026-10-25 22:49:20.695 UTC [1] LOG:  listening on IPv6 address "::", port 5432
 2026-10-25 22:49:20.700 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
 2026-10-25 22:49:20.704 UTC [30] LOG:  database system was shut down at 2026-10-25 22:49:20 UTC
 2026-10-25 22:49:20.712 UTC [1] LOG:  database system is ready to accept connections
```

| Parte de la consulta | Qué hace |
| --- | --- |
| `pg_current_logfile()` | Obtiene la ruta del archivo vigente |
| `pg_read_file(...)` | Devuelve el archivo completo como un solo texto |
| `regexp_split_to_table(..., E'\n')` | Lo divide en una fila por línea. `E'\n'` es el salto de línea |

Para no repetir esa consulta, crea una **vista** de uso exclusivo del administrador. Una vista guarda una consulta con nombre y se usa como si fuera una tabla:

```sql
CREATE SCHEMA dba;
REVOKE ALL ON SCHEMA dba FROM PUBLIC;

CREATE VIEW dba.bitacora AS
SELECT t.n AS num, t.linea
FROM regexp_split_to_table(pg_read_file(pg_current_logfile()), E'\n')
     WITH ORDINALITY AS t(linea, n)
WHERE t.linea <> '';
```

`WITH ORDINALITY` agrega el número de línea (`num`), útil para ordenar y para citar una línea en el informe. A partir de aquí, leer y filtrar la bitácora es una consulta SQL:

```sql
-- últimas 10 líneas
SELECT num, linea FROM dba.bitacora ORDER BY num DESC LIMIT 10;

-- líneas que contienen un texto, sin distinguir mayúsculas
SELECT linea FROM dba.bitacora WHERE linea ILIKE '%update%';

-- líneas que cumplen una expresión regular
SELECT linea FROM dba.bitacora WHERE linea ~ '(FATAL|ERROR)';
```

> **Variantes.** Si prefieres la terminal y tienes acceso al archivo, puedes leerlo con las herramientas de tu sistema (`tail`, `grep`, `Select-String`). El archivo pertenece al usuario del servicio y suele tener permisos restringidos, por lo que necesitarás privilegios del sistema operativo. La vista evita ese problema porque el servidor lee su propio archivo. También existen los formatos `csvlog` y `jsonlog` (`log_destination`), útiles para procesar la bitácora con otras herramientas.

> **Límite de la vista.** Solo lee el archivo vigente. Cuando el colector rota el archivo (cada día o cada 10 MB, según `log_rotation_age` y `log_rotation_size`) o cuando el servidor se reinicia, comienza uno nuevo. `SELECT * FROM pg_ls_logdir();` lista todos los archivos.

#### Preguntas

1. ¿Por qué `logging_collector` requiere reinicio y `log_statement` solo recarga?
2. ¿Qué ventaja tiene que la bitácora se lea con SQL y no con una herramienta del sistema operativo o del contenedor? ¿Qué riesgo introduce?
3. ¿Quién debería poder consultar `dba.bitacora`?

Guarda `sql/01-colector-y-vista.sql` y `evidencias/02-colector.md`.

---

## 9. Actividad 3 — El incidente sin bitácora

Simula el cambio que reportó facturación. En una terminal, conéctate por red como la aplicación de ventas:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET rfc = 'GAMA780912XXX' WHERE id = 3"
```

```text
UPDATE 1
```

Busca evidencia en la sesión de administrador:

```sql
SELECT linea FROM dba.bitacora
WHERE linea ILIKE '%update%' OR linea LIKE '%app_ventas%';
```

```text
 linea
-------
(0 rows)
```

No aparece el `UPDATE`, ni siquiera la conexión de `app_ventas`.

#### Preguntas

1. ¿Puedes demostrar quién modificó el RFC?
2. ¿Puedes demostrar que el cambio no lo hizo `soporte_ana`?
3. Los privilegios de la Unidad II, ¿impidieron el cambio? ¿Debían impedirlo?
4. ¿Qué tendría que haber estado configurado **antes** del incidente?

Guarda `evidencias/03-incidente-sin-bitacora.md`.

> **Idea central:** la auditoría no puede configurarse "después" para eventos que ya ocurrieron. Lo que no se registró en su momento no puede reconstruirse.

---

## 10. Actividad 4 — Configurar la bitácora

En la sesión de administrador:

```sql
ALTER SYSTEM SET log_connections = on;
ALTER SYSTEM SET log_disconnections = on;
ALTER SYSTEM SET log_line_prefix = '%m [%p] user=%u db=%d app=%a client=%h ';
ALTER SYSTEM SET log_statement = 'ddl';
SELECT pg_reload_conf();
```

Verifica el origen de los valores **con una consulta nueva** (ver el recuadro siguiente):

```sql
SELECT name, setting, source, sourcefile
FROM pg_settings
WHERE name IN ('log_connections', 'log_line_prefix', 'log_statement');
```

Resultado observado:

```text
      name       |                 setting                 |       source       |                  sourcefile
-----------------+-----------------------------------------+--------------------+-----------------------------------------------
 log_connections | on                                      | configuration file | /var/lib/postgresql/data/postgresql.auto.conf
 log_line_prefix | %m [%p] user=%u db=%d app=%a client=%h  | configuration file | /var/lib/postgresql/data/postgresql.auto.conf
 log_statement   | ddl                                     | configuration file | /var/lib/postgresql/data/postgresql.auto.conf
```

> **La recarga es asíncrona.** `pg_reload_conf()` envía una señal y regresa de inmediato. En la verificación de esta guía, una consulta a `pg_settings` enviada en el mismo bloque que la recarga todavía mostró los valores anteriores (`off`, `none`, `source = default`). Una consulta posterior ya mostró los nuevos.

Revisa las últimas líneas de la bitácora:

```sql
SELECT num, linea FROM dba.bitacora ORDER BY num DESC LIMIT 6;
```

Resultado observado (tus fechas y PID serán distintos):

```text
 13 | 2026-10-25 22:49:51.678 UTC [77] user=postgres db=comercial app=[unknown] client=[local] LOG:  connection authorized: user=postgres database=comercial application_name=psql
 12 | 2026-10-25 22:49:51.677 UTC [77] user=[unknown] db=[unknown] app=[unknown] client=[local] LOG:  connection received: host=[local]
 11 | 2026-10-25 22:49:50.539 UTC [1] user= db= app= client= LOG:  parameter "log_statement" changed to "ddl"
 10 | 2026-10-25 22:49:50.539 UTC [1] user= db= app= client= LOG:  parameter "log_line_prefix" changed to "%m [%p] user=%u db=%d app=%a client=%h "
  9 | 2026-10-25 22:49:50.539 UTC [1] LOG:  parameter "log_disconnections" changed to "on"
  8 | 2026-10-25 22:49:50.539 UTC [1] LOG:  parameter "log_connections" changed to "on"
```

#### Análisis

1. Las sentencias `ALTER SYSTEM` **no** aparecen, porque cuando se ejecutaron `log_statement` todavía valía `none`.
2. Sí aparece el **cambio de configuración** (`parameter ... changed to ...`), registrado por el proceso principal del servidor (PID 1) al recargar. Es un registro de cambio de configuración segura (contenido 3.2.7).
3. Tu propia sesión de administrador ya aparece (líneas 12 y 13): **consultar la bitácora también queda registrado**.

#### Preguntas

1. ¿Por qué el proceso que registra el cambio es el principal y no tu sesión?
2. ¿Qué pasaría si alguien ejecutara `ALTER SYSTEM SET log_statement = 'none'`? ¿Quedaría rastro?
3. ¿Por qué no se recomienda editar `postgresql.auto.conf` a mano?

Guarda `sql/02-configuracion-bitacora.sql` y `evidencias/04-configuracion-bitacora.md`.

---

## 11. Actividad 5 — Accesos exitosos y fallidos

Genera tres intentos de conexión por red:

```bash
psql "postgresql://app_ventas:incorrecta@127.0.0.1/comercial" -c "SELECT 1"
psql "postgresql://usuario_inexistente:x@127.0.0.1/comercial" -c "SELECT 1"
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "SELECT count(*) FROM clientes"
```

```text
psql: error: connection to server at "127.0.0.1", port 5432 failed: FATAL:  password authentication failed for user "app_ventas"
psql: error: connection to server at "127.0.0.1", port 5432 failed: FATAL:  password authentication failed for user "usuario_inexistente"
 count
-------
     5
```

Filtra la bitácora por la dirección del cliente:

```sql
SELECT linea FROM dba.bitacora WHERE linea LIKE '%client=127.0.0.1%' ORDER BY num;
```

Resultado observado:

```text
2026-10-25 22:50:00.324 UTC [91] user=[unknown] db=[unknown] app=[unknown] client=127.0.0.1 LOG:  connection received: host=127.0.0.1 port=47380
2026-10-25 22:50:00.334 UTC [91] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 FATAL:  password authentication failed for user "app_ventas"
2026-10-25 22:50:00.334 UTC [91] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 DETAIL:  Connection matched file "/var/lib/postgresql/data/pg_hba.conf" line 119: "host    all             all             127.0.0.1/32            scram-sha-256"
2026-10-25 22:50:00.453 UTC [98] user=[unknown] db=[unknown] app=[unknown] client=127.0.0.1 LOG:  connection received: host=127.0.0.1 port=47386
2026-10-25 22:50:00.462 UTC [98] user=usuario_inexistente db=comercial app=[unknown] client=127.0.0.1 FATAL:  password authentication failed for user "usuario_inexistente"
2026-10-25 22:50:00.462 UTC [98] user=usuario_inexistente db=comercial app=[unknown] client=127.0.0.1 DETAIL:  Role "usuario_inexistente" does not exist.
2026-10-25 22:50:00.558 UTC [105] user=[unknown] db=[unknown] app=[unknown] client=127.0.0.1 LOG:  connection received: host=127.0.0.1 port=47394
2026-10-25 22:50:00.565 UTC [105] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 LOG:  connection authenticated: identity="app_ventas" method=scram-sha-256 (/var/lib/postgresql/data/pg_hba.conf:119)
2026-10-25 22:50:00.566 UTC [105] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 LOG:  connection authorized: user=app_ventas database=comercial application_name=app-ventas-web
2026-10-25 22:50:00.568 UTC [105] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  disconnection: session time: 0:00:00.010 user=app_ventas database=comercial host=127.0.0.1 port=47394
```

> Si tu cliente está en otro equipo o accedes a un contenedor por un puerto publicado, `client=` mostrará otra dirección. Filtra con la que corresponda.

### 11.1 Leer una línea campo por campo

| Campo | Valor | Significado |
| --- | --- | --- |
| Fecha y hora | `2026-10-25 22:50:00.334 UTC` | |
| PID | `91` | |
| Usuario | `app_ventas` | |
| Base de datos | `comercial` | |
| Aplicación | `[unknown]` | |
| Cliente | `127.0.0.1` | |
| Severidad | `FATAL` | |
| Mensaje | `password authentication failed` | |
| Regla aplicada | `pg_hba.conf` línea 119 | |

#### Preguntas

1. La bitácora registra el usuario `app_ventas` en el intento fallido. ¿Eso prueba que la aplicación de ventas intentó entrar? ¿Qué prueba realmente?
2. ¿Qué información adicional registra PostgreSQL cuando el rol no existe? ¿Por qué aparece en la bitácora y **no** en el mensaje que recibe el cliente?
3. ¿Por qué `app=[unknown]` en el intento fallido, pero `app=app-ventas-web` en la desconexión?
4. ¿Qué patrón de varias líneas te haría sospechar de un ataque de fuerza bruta? Escribe la consulta que contaría los intentos fallidos por usuario.

Guarda `evidencias/05-accesos.md`.

---

## 12. Actividad 6 — Cambios de privilegios y de estructura

Con `log_statement = 'ddl'`, en la sesión de administrador:

```sql
REVOKE UPDATE ON clientes FROM soporte_ana;
GRANT UPDATE ON clientes TO app_ventas;
ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20);
```

> El `REVOKE` sobre un privilegio que `soporte_ana` no tenía no produce error. Se incluye porque una revisión periódica de privilegios suele aplicar revocaciones preventivas, y también deben quedar registradas.

### 12.1 La bitácora también puede filtrar secretos

Crea un rol desechable **escribiendo la contraseña en la sentencia**, y elimínalo:

```sql
CREATE ROLE rol_temporal LOGIN PASSWORD 'Temporal_Practica_2026';
DROP ROLE rol_temporal;
```

Consulta las sentencias registradas:

```sql
SELECT linea FROM dba.bitacora WHERE linea LIKE '%statement:%' ORDER BY num;
```

Resultado observado:

```text
2026-10-25 22:50:09.341 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: REVOKE UPDATE ON clientes FROM soporte_ana
2026-10-25 22:50:09.367 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: GRANT UPDATE ON clientes TO app_ventas
2026-10-25 22:50:09.372 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20)
2026-10-25 22:50:09.375 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: CREATE ROLE rol_temporal LOGIN PASSWORD 'Temporal_Practica_2026'
2026-10-25 22:50:09.382 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: DROP ROLE rol_temporal
```

La contraseña quedó **en texto claro** en la bitácora, y eliminar el rol no la borra.

Compara con lo que hace `\password`: calcula el resumen SCRAM en el cliente y envía al servidor únicamente ese resumen. Si `log_statement` hubiera estado activo en la sección 6.5, la bitácora habría mostrado una línea como esta:

```text
... LOG:  statement: ALTER USER app_ventas PASSWORD 'SCRAM-SHA-256$4096:VGmP/wLqF2JGV7ruQLpK6A==$fzqS...'
```

#### Preguntas

1. ¿Qué tipo de evento es cada una de las tres primeras sentencias (privilegio o estructura)?
2. ¿Por qué `GRANT` y `REVOKE` quedan registrados con `log_statement = 'ddl'`?
3. Si la bitácora contiene contraseñas, ¿quién debería poder leerla? Relaciónalo con la gestión de secretos de la Unidad II.

Guarda `sql/03-privilegios-estructura.sql` y `evidencias/06-privilegios-estructura.md`.

---

## 13. Actividad 7 — Modificaciones de datos: `ddl` frente a `mod`

Repite el cambio del incidente con `log_statement = 'ddl'`:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET rfc = 'GAMA780912XYZ' WHERE id = 3"
```

```sql
SELECT linea FROM dba.bitacora WHERE linea LIKE '%user=app_ventas%' ORDER BY num DESC LIMIT 3;
```

```text
... [126] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  disconnection: session time: 0:00:00.010 user=app_ventas database=comercial host=127.0.0.1 port=55818
... [126] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 LOG:  connection authorized: user=app_ventas database=comercial application_name=app-ventas-web
... [126] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 LOG:  connection authenticated: identity="app_ventas" method=scram-sha-256 (/var/lib/postgresql/data/pg_hba.conf:119)
```

Aparecen la conexión y la desconexión de `app_ventas`, pero **no** el `UPDATE`.

Cambia el nivel:

```sql
ALTER SYSTEM SET log_statement = 'mod';
SELECT pg_reload_conf();
```

Ejecuta una modificación y una consulta:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET telefono = '6679990000' WHERE id = 3" -c "SELECT nombre, rfc FROM clientes WHERE id = 3"
```

> Cada `-c` es una sentencia distinta. `psql` las ejecuta en orden y termina.

```sql
SELECT linea FROM dba.bitacora
WHERE linea LIKE '%log_statement%' OR linea LIKE '%user=app_ventas%statement:%'
ORDER BY num;
```

Resultado observado:

```text
2026-10-25 22:49:50.539 UTC [1] user= db= app= client= LOG:  parameter "log_statement" changed to "ddl"
2026-10-25 22:50:19.459 UTC [155] user=postgres db=comercial app=psql client=[local] LOG:  statement: ALTER SYSTEM SET log_statement = 'mod'
2026-10-25 22:50:19.488 UTC [1] user= db= app= client= LOG:  parameter "log_statement" changed to "mod"
2026-10-25 22:50:20.601 UTC [162] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  statement: UPDATE clientes SET telefono = '6679990000' WHERE id = 3
```

#### Análisis

* Ahora sí aparece **quién**, **cuándo**, **desde dónde**, **con qué aplicación** y **qué sentencia**.
* El `SELECT` que leyó el RFC **no** aparece: con `mod`, las lecturas no quedan registradas.
* La bitácora muestra lo que se escribió, pero **no el valor anterior** del teléfono.
* Esta vez el `ALTER SYSTEM` sí aparece, porque `log_statement` ya valía `ddl` cuando se ejecutó.

#### Preguntas

1. ¿Qué nivel habría registrado la lectura del RFC? ¿Qué costo tendría en un servidor con miles de consultas por minuto?
2. ¿Qué le falta a esta bitácora para revertir el cambio con certeza? (Lo resolverás en la Parte B.)

Guarda `evidencias/07-modificaciones.md`.

---

## 14. Actividad 8 — Errores y operaciones rechazadas

El analista de soporte intenta borrar un registro:

```bash
psql "postgresql://soporte_ana:Soporte_Practica_2026@127.0.0.1/comercial" -c "DELETE FROM clientes WHERE id = 5"
```

```text
ERROR:  permission denied for table clientes
```

El administrador intenta eliminar un rol que todavía tiene privilegios:

```sql
DROP ROLE soporte_ana;
```

```text
ERROR:  role "soporte_ana" cannot be dropped because some objects depend on it
DETAIL:  privileges for table clientes
```

```sql
SELECT linea FROM dba.bitacora
WHERE linea ~ '(ERROR|STATEMENT|DETAIL):  (permission|privileges|role|DELETE|DROP)'
ORDER BY num;
```

Resultado observado:

```text
... [168] user=soporte_ana db=comercial app=psql client=127.0.0.1 ERROR:  permission denied for table clientes
... [168] user=soporte_ana db=comercial app=psql client=127.0.0.1 STATEMENT:  DELETE FROM clientes WHERE id = 5
... [175] user=postgres db=comercial app=psql client=[local] ERROR:  role "soporte_ana" cannot be dropped because some objects depend on it
... [175] user=postgres db=comercial app=psql client=[local] DETAIL:  privileges for table clientes
... [175] user=postgres db=comercial app=psql client=[local] STATEMENT:  DROP ROLE soporte_ana
```

Las sentencias que provocan errores se registran gracias a `log_min_error_statement = error`, **independientemente** de `log_statement`.

#### Preguntas

1. ¿El intento de `soporte_ana` causó algún daño? ¿Por qué debe auditarse de todos modos?
2. ¿Qué diferencia hay entre un error de **autorización** (esta actividad) y uno de **autenticación** (Actividad 5)?
3. ¿Qué indica el error de `DROP ROLE` sobre el orden correcto para dar de baja a un usuario?

Guarda `evidencias/08-errores.md`.

---

## 15. Actividad 9 — Sesiones activas con `pg_stat_activity`

En una **segunda terminal**, simula un reporte de larga duración:

```bash
psql "postgresql://soporte_ana:Soporte_Practica_2026@127.0.0.1/comercial?application_name=reporte-mensual" -c "SELECT pg_sleep(90)"
```

Mientras se ejecuta, en la sesión de administrador:

```sql
SELECT pid, usename, application_name, client_addr, backend_start, state, left(query, 30) AS query
FROM pg_stat_activity
WHERE backend_type = 'client backend';
```

Resultado observado:

```text
 pid |   usename   | application_name | client_addr |         backend_start         | state  |             query
-----+-------------+------------------+-------------+-------------------------------+--------+--------------------------------
 196 | postgres    | psql             |             | 2026-10-25 22:50:29.486562+00 | active | SELECT pid, usename, applicati
 189 | soporte_ana | reporte-mensual  | 127.0.0.1   | 2026-10-25 22:50:27.480049+00 | active | SELECT pg_sleep(90)
```

Busca el mismo PID en la bitácora (sustituye `189` por el tuyo):

```sql
SELECT linea FROM dba.bitacora WHERE linea LIKE '%[189]%' ORDER BY num;
```

Espera a que termine el reporte y repite la consulta a `pg_stat_activity`.

#### Preguntas

1. ¿Qué columna permite relacionar una sesión con sus líneas de bitácora?
2. Después de que termina el reporte, ¿qué fuente conserva evidencia de que existió?
3. ¿Por qué `client_addr` aparece vacío en la sesión del administrador?

> En la Unidad IV volverás a usar `pg_stat_activity`, esta vez para diagnosticar consultas costosas.

Guarda `evidencias/09-pg-stat-activity.md`.

---

## PARTE B — Auditoría del dato con disparador

El área de facturación necesita **restaurar** el RFC correcto cuando un cambio sea erróneo. El DBA recibe el requerimiento:

> **R1.** Todo cambio en `clientes` debe conservar el valor anterior, el valor nuevo, el usuario, la aplicación, la IP y el momento.

---

## 16. Actividad 10 — Diseñar y crear el registro de auditoría

Antes de escribir código, decide qué debe contener cada registro de auditoría. Completa la tabla justificando cada campo con una de las preguntas de Dirección:

| Campo propuesto | Tipo | ¿Qué pregunta responde? | ¿Puede ser nulo? ¿Por qué? |
| --- | --- | --- | --- |
| `id_evento` | `BIGSERIAL` | | |
| `momento` | `TIMESTAMPTZ` | | |
| `usuario_sesion` | `TEXT` | | |
| `usuario_efectivo` | `TEXT` | | |
| `aplicacion` | `TEXT` | | |
| `ip_cliente` | `INET` | | |
| `operacion` | `TEXT` | | |
| `id_cliente` | `BIGINT` | | |
| `valores_antes` | `JSONB` | | |
| `valores_despues` | `JSONB` | | |

Crea un esquema separado sin acceso público, y la tabla:

```sql
CREATE SCHEMA auditoria;
REVOKE ALL ON SCHEMA auditoria FROM PUBLIC;

CREATE TABLE auditoria.cambios_clientes (
    id_evento        BIGSERIAL PRIMARY KEY,
    momento          TIMESTAMPTZ NOT NULL DEFAULT now(),
    usuario_sesion   TEXT        NOT NULL DEFAULT session_user,
    usuario_efectivo TEXT        NOT NULL DEFAULT current_user,
    aplicacion       TEXT        DEFAULT current_setting('application_name'),
    ip_cliente       INET        DEFAULT inet_client_addr(),
    operacion        TEXT        NOT NULL,
    id_cliente       BIGINT,
    valores_antes    JSONB,
    valores_despues  JSONB
);
```

Los valores por defecto capturan el contexto de la sesión en el momento de insertar cada registro. `to_jsonb(OLD)` (en la Actividad 11) convierte el registro completo en un documento JSON, de modo que la auditoría conserva el estado completo aunque `clientes` cambie de estructura después.

#### Preguntas

1. ¿Por qué `momento` usa `TIMESTAMPTZ` y no `TIMESTAMP`?
2. ¿Por qué se guarda el registro completo en `JSONB` y no solo la columna que cambió?
3. La tabla de auditoría también contendrá RFC. ¿Qué implica eso para su clasificación y su control de acceso?

Guarda `evidencias/10-diseno-auditoria.md` y `sql/04-esquema-auditoria.sql`.

---

## 17. Actividad 11 — Crear la función y el disparador

```sql
CREATE OR REPLACE FUNCTION auditoria.registrar_cambio_cliente()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO auditoria.cambios_clientes (operacion, id_cliente, valores_despues)
        VALUES (TG_OP, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO auditoria.cambios_clientes (operacion, id_cliente, valores_antes, valores_despues)
        VALUES (TG_OP, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO auditoria.cambios_clientes (operacion, id_cliente, valores_antes)
        VALUES (TG_OP, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION auditoria.registrar_cambio_cliente() FROM PUBLIC;

CREATE TRIGGER trg_auditoria_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW EXECUTE FUNCTION auditoria.registrar_cambio_cliente();
```

Verifica:

```sql
SELECT tgname, tgenabled, tgrelid::regclass FROM pg_trigger WHERE NOT tgisinternal;
```

```text
         tgname         | tgenabled | tgrelid
------------------------+-----------+----------
 trg_auditoria_clientes | O         | clientes
```

`O` indica que el disparador está habilitado.

#### Preguntas

1. ¿Por qué se ejecuta `REVOKE ALL ON FUNCTION ... FROM PUBLIC` si el disparador seguirá funcionando para `app_ventas`?
2. ¿Qué pasaría si la función **no** fuera `SECURITY DEFINER`? Formula una hipótesis antes de la Actividad 12.
3. Consulta `dba.bitacora`. ¿Quedó registrada la creación del esquema, la tabla, la función y el disparador? ¿Por qué?

Guarda `sql/05-funcion-disparador.sql`.

---

## 18. Actividad 12 — El incidente auditado

La aplicación cambia el RFC de María García e intenta revisar la auditoría:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET rfc = 'GAMA780912ZZZ' WHERE id = 3"
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial" -c "SELECT * FROM auditoria.cambios_clientes"
```

```text
UPDATE 1
ERROR:  permission denied for schema auditoria
LINE 1: SELECT * FROM auditoria.cambios_clientes
                      ^
```

En la sesión de administrador (`\x` activa la presentación vertical de `psql`; repítelo para desactivarla):

```sql
\x
SELECT id_evento, momento, usuario_sesion, usuario_efectivo, aplicacion, ip_cliente, operacion, id_cliente
FROM auditoria.cambios_clientes ORDER BY id_evento;
\x
```

```text
-[ RECORD 1 ]----+------------------------------
id_evento        | 1
momento          | 2026-10-25 22:50:52.903439+00
usuario_sesion   | app_ventas
usuario_efectivo | postgres
aplicacion       | app-ventas-web
ip_cliente       | 127.0.0.1
operacion        | UPDATE
id_cliente       | 3
```

`usuario_efectivo` es `postgres` porque dentro de la función `SECURITY DEFINER`, `current_user` es el propietario de la función. Si la auditoría solo usara `current_user`, **todos** los cambios parecerían hechos por `postgres`.

¿Qué campo cambió? Compara `valores_antes` con `valores_despues` campo por campo:

```sql
SELECT a.id_evento, a.momento, a.usuario_sesion, a.ip_cliente,
       d.key                     AS campo,
       a.valores_antes ->> d.key AS antes,
       d.value #>> '{}'          AS despues
FROM auditoria.cambios_clientes a
CROSS JOIN LATERAL jsonb_each(a.valores_despues) d
WHERE a.operacion = 'UPDATE'
  AND a.valores_antes -> d.key IS DISTINCT FROM d.value
ORDER BY a.id_evento;
```

```text
 id_evento |            momento            | usuario_sesion | ip_cliente | campo |     antes     |    despues
-----------+-------------------------------+----------------+------------+-------+---------------+---------------
         1 | 2026-10-25 22:50:52.903439+00 | app_ventas     | 127.0.0.1  | rfc   | GAMA780912XYZ | GAMA780912ZZZ
```

| Parte | Qué hace |
| --- | --- |
| `jsonb_each(a.valores_despues)` | Convierte el documento en filas `key`/`value`, una por campo |
| `CROSS JOIN LATERAL` | Aplica esa función a cada fila de auditoría |
| `->>` / `#>> '{}'` | Extraen el valor como texto |
| `IS DISTINCT FROM` | Compara tratando correctamente los nulos |

#### Preguntas

1. Compara tu hipótesis de la Actividad 11 con este resultado.
2. Escribe la sentencia `UPDATE` que restauraría el valor anterior.
3. ¿Qué columna conserva más valor para una investigación: `aplicacion` o `ip_cliente`? ¿Cuál puede falsificar el cliente con más facilidad?

> `application_name` lo declara el propio cliente. Distingue aplicaciones legítimas, pero no es evidencia fuerte de identidad.

Guarda `evidencias/11-incidente-auditado.md` y `sql/06-campos-modificados.sql`.

---

## 19. Actividad 13 — Altas y bajas

Como administrador:

```sql
INSERT INTO clientes (nombre, correo, rfc, edad, ciudad, codigo_postal)
VALUES ('Pedro Ruiz', 'pedro.ruiz@example.test', 'RUPE950101AAA', 30, 'Guasave', '81000');
DELETE FROM clientes WHERE nombre = 'Pedro Ruiz';

SELECT id_evento, usuario_sesion, aplicacion, ip_cliente, operacion, id_cliente,
       valores_antes ->> 'rfc' AS rfc_antes, valores_despues ->> 'rfc' AS rfc_despues
FROM auditoria.cambios_clientes ORDER BY id_evento;
```

```text
 id_evento | usuario_sesion |   aplicacion   | ip_cliente | operacion | id_cliente |   rfc_antes   |  rfc_despues
-----------+----------------+----------------+------------+-----------+------------+---------------+---------------
         1 | app_ventas     | app-ventas-web | 127.0.0.1  | UPDATE    |          3 | GAMA780912XYZ | GAMA780912ZZZ
         2 | postgres       | psql           |            | INSERT    |          6 |               | RUPE950101AAA
         3 | postgres       | psql           |            | DELETE    |          6 | RUPE950101AAA |
```

#### Preguntas

1. El cliente `Pedro Ruiz` ya no existe en `clientes`. ¿Dónde queda evidencia de que existió y de sus datos?
2. ¿Por qué `ip_cliente` está vacía en los eventos 2 y 3?
3. La política de retención de la Unidad II pedía eliminar datos cuando ya no fueran necesarios. ¿Qué conflicto aparece? ¿Quién debe resolverlo?

Guarda `evidencias/12-altas-bajas.md`.

---

## 20. Actividad 14 — Intentar manipular la auditoría

Desde la cuenta de la aplicación:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "DELETE FROM auditoria.cambios_clientes" -c "ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes"
```

```text
ERROR:  permission denied for schema auditoria
LINE 1: DELETE FROM auditoria.cambios_clientes
                    ^
ERROR:  must be owner of table clientes
```

Desde la cuenta de administrador, desactiva el disparador, modifica un dato y vuelve a activarlo:

```sql
ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes;
UPDATE clientes SET rfc = 'GAMA780912GHI' WHERE id = 3;
ALTER TABLE clientes ENABLE TRIGGER trg_auditoria_clientes;
SELECT count(*) FROM auditoria.cambios_clientes;
```

El conteo sigue en `3`: el cambio **no** quedó en la tabla de auditoría. Revisa la bitácora:

```sql
SELECT linea FROM dba.bitacora
WHERE linea ~ 'statement: (ALTER TABLE clientes (DIS|EN)ABLE|UPDATE clientes SET rfc = .GAMA780912GHI)'
ORDER BY num;
```

```text
... [253] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  statement: ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
... [260] user=postgres db=comercial app=psql client=[local] LOG:  statement: ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
... [260] user=postgres db=comercial app=psql client=[local] LOG:  statement: UPDATE clientes SET rfc = 'GAMA780912GHI' WHERE id = 3
... [260] user=postgres db=comercial app=psql client=[local] LOG:  statement: ALTER TABLE clientes ENABLE TRIGGER trg_auditoria_clientes
```

La primera línea es el **intento** de `app_ventas`: con `ddl`, la sentencia se registra antes de ejecutarse, aunque después falle.

```text
Tabla de auditoría      →  detalle del dato (antes y después)
                           la puede desactivar el propietario de la tabla

Bitácora del servidor   →  registra que el mecanismo se desactivó
                           la puede alterar quien controle el servidor
```

Ningún mecanismo dentro del propio servidor protege contra un administrador con control total. Por eso las organizaciones envían las bitácoras a un sistema externo administrado por otra área y separan a quien opera la base de quien custodia la evidencia.

#### Preguntas

1. ¿Qué evidencia permite detectar que hubo un cambio sin auditar?
2. ¿Qué control administrativo (no técnico) reduciría este riesgo?
3. Relaciona esta actividad con el principio de separación de funciones de la Unidad II.

Guarda `evidencias/13-manipulacion.md`.

---

## 21. Actividad 15 — Límites: lecturas y volumen

Ejecuta una lectura de datos sensibles y un cambio masivo:

```bash
psql "postgresql://soporte_ana:Soporte_Practica_2026@127.0.0.1/comercial" -c "SELECT nombre, rfc, telefono FROM clientes WHERE id = 3"
```

```sql
UPDATE clientes SET segmento = 'regular';

SELECT count(*) AS lineas_bitacora FROM dba.bitacora
WHERE linea LIKE '%statement: UPDATE clientes SET segmento%';

SELECT operacion, count(*) FROM auditoria.cambios_clientes GROUP BY operacion ORDER BY operacion;

SELECT count(*) AS lecturas_soporte FROM dba.bitacora
WHERE linea LIKE '%user=soporte_ana%SELECT nombre, rfc%';
```

Resultado observado:

```text
 lineas_bitacora
-----------------
               1

 operacion | count
-----------+-------
 DELETE    |     1
 INSERT    |     1
 UPDATE    |     6

 lecturas_soporte
------------------
                0
```

* El `UPDATE` masivo produjo **una** línea en la bitácora y **cinco** filas nuevas en la auditoría.
* La lectura del RFC no dejó rastro: **no existe disparador para `SELECT`** y `mod` no registra consultas.

| Alternativa para registrar lecturas | Ventaja | Desventaja |
| --- | --- | --- |
| `log_statement = 'all'` | No requiere instalar nada | Registra **todas** las consultas de **todas** las tablas |
| Entregar el dato solo mediante una función que registre su uso | Control preciso | Requiere cambiar la aplicación |
| `pgaudit` con auditoría de objeto (Parte C) | Registra lecturas por tabla y por columna | Requiere instalar una extensión |

#### Preguntas

1. Si `clientes` tuviera un millón de registros, ¿qué ocurriría con la auditoría tras un `UPDATE` sin `WHERE`?
2. Propón quién podría autorizar la depuración de `auditoria.cambios_clientes`.
3. ¿Por qué `log_statement = 'all'` puede convertir la bitácora en un nuevo depósito de datos sensibles?

Guarda `evidencias/14-limites.md`.

---

## CIERRE DE LAS PARTES A Y B

---

## 22. Actividad 16 — Exportar y conservar la bitácora

La bitácora vive en el servidor. Si el servidor se reinstala, se recrea o rota sus archivos sin que nadie los conserve, la evidencia desaparece.

Desde la carpeta `LAB-01/` de tu repositorio (con la subcarpeta `evidencias/`), exporta el archivo vigente **retirando la contraseña** que quedó en la Actividad 6:

```bash
psql -U postgres -d comercial -At -c "SELECT replace(pg_read_file(pg_current_logfile()), 'Temporal_Practica_2026', '<REDACTED>')" > evidencias/bitacora-lab01.log
```

| Opción | Significado |
| --- | --- |
| `-A` | Salida sin alineación ni bordes de tabla |
| `-t` | Sin encabezados ni conteo de filas |
| `replace(texto, buscado, reemplazo)` | Sustituye el secreto antes de que salga del servidor |
| `>` | Envía la salida a un archivo. Si existe, lo reemplaza |

> Si tu sesión de administrador se abre de otra forma (Anexo A, tabla A.1), usa esa misma forma con las opciones `-At -c "..."`.

Calcula un resumen criptográfico (*hash*) del archivo:

| Sistema | Comando |
| --- | --- |
| Linux | `sha256sum evidencias/bitacora-lab01.log` |
| macOS | `shasum -a 256 evidencias/bitacora-lab01.log` |
| Windows (PowerShell) | `Get-FileHash evidencias/bitacora-lab01.log -Algorithm SHA256` |

Guarda el resultado en `evidencias/bitacora-lab01.sha256` y documenta en el informe que el archivo se exportó con la contraseña sustituida.

#### Preguntas

1. Un resumen SHA-256, ¿impide que alguien modifique la bitácora? ¿Qué permite demostrar?
2. ¿Dónde debería guardarse el hash para que sea útil como control de integridad?
3. La guía NIST SP 800-92 trata la conservación y protección de bitácoras (REF-U3-03). ¿Qué riesgos tiene conservar la bitácora **solo** en el servidor que la produce?
4. Propón durante cuánto tiempo conservarías esta bitácora y justifica tu criterio. No existe una cifra única correcta.

> El criterio formal de conservación se completa en el LAB-03.

---

## 23. Actividad 17 — Reconstruir la cronología y responder a Dirección

Con tu bitácora y la tabla de auditoría, construye una tabla con **al menos ocho eventos** en orden cronológico:

| # | Fecha y hora | Usuario | Cliente | Tipo de evento | Qué ocurrió | ¿Exitoso? | Fuente (línea o `id_evento`) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | Configuración | | | |
| 2 | | | | Acceso | | | |
| 3 | | | | Privilegio | | | |
| 4 | | | | Estructura | | | |
| 5 | | | | Datos | | | |
| 6 | | | | Error | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

Responde las cinco preguntas de Dirección (sección 5) **solo con la evidencia**:

1. ¿Quién cambió el RFC la primera vez (Actividad 3)? ¿Y en las Actividades 7, 12 y 14?
2. ¿Quién cambió el teléfono?
3. ¿Hubo intentos de acceso fallidos? ¿De qué usuarios y desde dónde?
4. ¿Qué valor tenía el RFC antes de cada cambio?

Cuando la evidencia no permita responder, escribe explícitamente **"No hay evidencia"** y explica por qué. Un evento que no se registró no tiene hora: se declara como hueco, no se estima.

Guarda `evidencias/15-cronologia.md`.

---

## PARTE C — `pgaudit` (opcional, práctica avanzada)

> Esta parte es **opcional**. `pgaudit` es una extensión oficial del proyecto `pgaudit/pgaudit` (REF-U3-09) que **no forma parte de la distribución básica de PostgreSQL**: hay que instalar su paquete en el servidor y cargarla al arrancar.
>
> Realiza esta parte **después** de exportar la bitácora (Actividad 16), porque el reinicio inicia un archivo de bitácora nuevo.

---

## 24. Actividad 18 — Instalar y cargar `pgaudit`

### 24.1 Instalar el paquete

| Despliegue | Cómo obtener `pgaudit` para PostgreSQL 16 |
| --- | --- |
| Linux con paquetes PGDG (Debian/Ubuntu) | Paquete `postgresql-16-pgaudit` en el mismo servidor |
| Linux con paquetes PGDG (Red Hat y derivados) | Paquete de `pgaudit` para PostgreSQL 16 del repositorio PGDG |
| Contenedor | Imagen derivada de la oficial que instale el paquete (Anexo A, sección A.3). Es un servidor nuevo: repite las secciones 6.4 y 6.5 y la Actividad 2 |
| macOS o Windows | Consulta el README del proyecto. Si no dispones de un paquete para tu plataforma, compílala desde el código fuente o realiza esta parte en Linux o en un contenedor |

Comprueba que el servidor ve la extensión e intenta crearla:

```sql
SELECT name, default_version FROM pg_available_extensions WHERE name = 'pgaudit';
CREATE EXTENSION pgaudit;
```

```text
  name   | default_version
---------+-----------------
 pgaudit | 16.1

ERROR:  pgaudit must be loaded via shared_preload_libraries
```

El paquete está instalado, pero la biblioteca no está cargada.

### 24.2 Cargar la biblioteca al arrancar

```sql
ALTER SYSTEM SET shared_preload_libraries = 'pgaudit';
SELECT pg_reload_conf();
SELECT name, setting, pending_restart FROM pg_settings WHERE name = 'shared_preload_libraries';
```

```text
           name           | setting | pending_restart
--------------------------+---------+-----------------
 shared_preload_libraries |         | t
```

`pending_restart = t`: el valor está guardado, pero solo entra en vigor al reiniciar. Reinicia el servicio (Anexo A, tabla A.1) y en una sesión nueva:

```sql
SHOW shared_preload_libraries;
CREATE EXTENSION pgaudit;
SELECT extname, extversion FROM pg_extension WHERE extname = 'pgaudit';
```

```text
 shared_preload_libraries
--------------------------
 pgaudit

CREATE EXTENSION
 extname | extversion
---------+------------
 pgaudit | 16.1
```

> Si ya tenías otras bibliotecas en `shared_preload_libraries`, agrégalas separadas por comas en lugar de sustituirlas.

---

## 25. Actividad 19 — Auditoría de objeto sobre columnas sensibles

`pgaudit` ofrece dos modos (REF-U3-09):

| Modo | Parámetro | Qué registra |
| --- | --- | --- |
| Sesión | `pgaudit.log` | Clases de sentencias: `READ`, `WRITE`, `ROLE`, `DDL`, `FUNCTION`, `MISC`, `ALL` |
| Objeto | `pgaudit.role` | Operaciones sobre los objetos y columnas en que el rol auditor tiene privilegios |

Crea un rol auditor **sin acceso de conexión** y otórgale privilegios solo sobre las columnas sensibles. Sus privilegios funcionan como un **filtro**:

```sql
CREATE ROLE auditor_datos NOLOGIN;
GRANT SELECT (rfc, telefono), UPDATE (rfc, telefono) ON clientes TO auditor_datos;
ALTER SYSTEM SET pgaudit.log = 'role, ddl';
ALTER SYSTEM SET pgaudit.role = 'auditor_datos';
ALTER SYSTEM SET pgaudit.log_relation = on;
SELECT pg_reload_conf();
```

Ejecuta, como `app_ventas`, tres consultas y dos actualizaciones:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "SELECT nombre, ciudad FROM clientes WHERE id = 2" -c "SELECT nombre, rfc FROM clientes WHERE id = 3" -c "SELECT * FROM clientes WHERE id = 4" -c "UPDATE clientes SET rfc = 'LOAA850315XXX' WHERE id = 1" -c "UPDATE clientes SET ciudad = 'Navolato' WHERE id = 2"
```

Y, como administrador, un cambio de privilegios:

```sql
GRANT SELECT ON clientes TO soporte_ana;
SELECT linea FROM dba.bitacora WHERE linea LIKE '%AUDIT:%';
```

> Si estás en un servidor nuevo (contenedor), crea antes la vista `dba.bitacora` de la Actividad 2.

Resultado observado:

```text
... user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  AUDIT: OBJECT,1,1,READ,SELECT,TABLE,public.clientes,"SELECT nombre, rfc FROM clientes WHERE id = 3",<not logged>
... user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  AUDIT: OBJECT,2,1,READ,SELECT,TABLE,public.clientes,SELECT * FROM clientes WHERE id = 4,<not logged>
... user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  AUDIT: OBJECT,3,1,WRITE,UPDATE,TABLE,public.clientes,UPDATE clientes SET rfc = 'LOAA850315XXX' WHERE id = 1,<not logged>
... user=postgres db=comercial app=psql client=[local] LOG:  AUDIT: SESSION,1,1,ROLE,GRANT,TABLE,,GRANT SELECT ON clientes TO soporte_ana,<not logged>
```

Los campos de cada entrada son (REF-U3-09):

```text
AUDIT_TYPE, STATEMENT_ID, SUBSTATEMENT_ID, CLASS, COMMAND, OBJECT_TYPE, OBJECT_NAME, STATEMENT, PARAMETER
```

`pgaudit` no incluye el usuario en sus campos: se obtiene del prefijo de línea.

#### Preguntas

1. ¿Por qué no apareció `SELECT nombre, ciudad ...`? ¿Por qué sí apareció `SELECT * ...`?
2. ¿Por qué no apareció `UPDATE ... ciudad ...`?
3. ¿Qué diferencia de volumen esperarías frente a `log_statement = 'all'`?
4. El README oficial advierte que `pgaudit` no puede auditar de forma confiable a los superusuarios (REF-U3-09). ¿Qué implica para la separación de funciones?

Guarda `evidencias/16-pgaudit.md`.

---

## 26. Verificación final

#### Parte A

```sql
SELECT name, setting, source FROM pg_settings
WHERE name IN ('logging_collector', 'log_connections', 'log_disconnections', 'log_statement', 'log_line_prefix');
```

| Parámetro | Valor esperado | Origen esperado |
| --- | --- | --- |
| `logging_collector` | `on` | `configuration file` |
| `log_connections` | `on` | `configuration file` |
| `log_disconnections` | `on` | `configuration file` |
| `log_statement` | `mod` | `configuration file` |
| `log_line_prefix` | `%m [%p] user=%u db=%d app=%a client=%h ` | `configuration file` |

* [ ] un acceso fallido por contraseña incorrecta y uno por usuario inexistente
* [ ] un acceso exitoso con su desconexión
* [ ] un `GRANT`, un `REVOKE` y un `ALTER TABLE`
* [ ] un `UPDATE` registrado con usuario, IP y aplicación
* [ ] un error de permisos con su sentencia
* [ ] un cambio de configuración (`parameter ... changed to ...`)

#### Parte B

* [ ] El esquema `auditoria` no tiene acceso para `PUBLIC`.
* [ ] El disparador está habilitado (`tgenabled = O`).
* [ ] La auditoría contiene al menos un `UPDATE`, un `INSERT` y un `DELETE`.
* [ ] El `UPDATE` de `app_ventas` muestra `usuario_sesion = app_ventas`.
* [ ] La bitácora registra la desactivación y reactivación del disparador.

#### Parte C (opcional)

* [ ] `pgaudit` aparece en `pg_extension` y en `shared_preload_libraries`.
* [ ] La lectura de `rfc` aparece como `AUDIT: OBJECT,...,READ` y la de `nombre, ciudad` no.

> **No elimines este servidor.** El LAB-03 continúa sobre la misma base de datos.

---

## 27. Evidencias

```text
LAB-01/
├── README.md
├── sql/
│   ├── 01-colector-y-vista.sql
│   ├── 02-configuracion-bitacora.sql
│   ├── 03-privilegios-estructura.sql
│   ├── 04-esquema-auditoria.sql
│   ├── 05-funcion-disparador.sql
│   └── 06-campos-modificados.sql
├── evidencias/
│   ├── 01-configuracion-inicial.md ... 15-cronologia.md
│   ├── 16-pgaudit.md                  (solo Parte C)
│   ├── bitacora-lab01.log
│   └── bitacora-lab01.sha256
└── informe.md
```

El nombre de los archivos podrá ajustarse a la estructura definitiva del repositorio de la materia. Cada evidencia debe permitir identificar: estudiante, actividad, comando ejecutado, resultado obtenido e interpretación. Las capturas de pantalla no sustituyen la bitácora exportada ni la interpretación escrita. En `README.md` indica cómo desplegaste el servidor (Anexo A) y su versión.

La entrega se realiza mediante el repositorio de GitLab asignado, igual que en la Unidad II. Commits sugeridos:

```text
docs: documenta configuracion inicial de registro
feat: activa colector y vista de bitacora
feat: configura bitacora de conexiones y sentencias
docs: interpreta accesos, privilegios, estructura y errores
feat: agrega tabla y disparador de auditoria de clientes
docs: interpreta incidente auditado y manipulacion
docs: agrega bitacora exportada, hash y cronologia
```

> **No subas contraseñas.** Revisa la bitácora exportada antes de cada commit. No subas volcados completos de la tabla de auditoría: incluye solo las filas necesarias para demostrar cada punto.

---

## 28. Informe

El archivo `informe.md` debe contener:

1. **Despliegue y situación inicial.** Cómo desplegaste el servidor, qué registraba por defecto y por qué no permitía responder a Dirección.
2. **Configuración aplicada.** Parámetros, valores, si requirieron recarga o reinicio, y justificación.
3. **Eventos observados.** Un ejemplo interpretado de cada tipo de evento.
4. **Auditoría del dato.** Diseño de la tabla, papel de `SECURITY DEFINER` y `session_user`, resultado del incidente auditado.
5. **Limitaciones.** Lecturas, volumen, administrador con control total.
6. **Riesgos de la bitácora.** Secretos expuestos, pérdida, acceso de terceros.
7. **Cronología y conclusión.** ¿Con esta configuración puede demostrarse quién cambió un dato sensible y qué valor tenía antes?

---

## 29. Preguntas de reflexión

1. ¿Por qué la auditoría no puede configurarse después de un incidente para investigarlo?
2. ¿Por qué conviene que la bitácora la administre el propio servidor y no el mecanismo de despliegue?
3. ¿Por qué el prefijo de línea es tan importante como el nivel de `log_statement`?
4. ¿Qué diferencia práctica hay entre registrar la **sentencia** y registrar el **cambio en el dato**?
5. ¿Qué evidencia ofrece `pg_stat_activity` que no ofrece la bitácora, y viceversa?
6. Si el administrador puede cambiar `log_statement` a `none` y desactivar el disparador, ¿quién audita al administrador?

---

## 30. Evaluación

| Criterio | Porcentaje |
| --- | ---: |
| Configuración verificada del colector y de la bitácora | 15 % |
| Accesos, privilegios, estructura, datos y errores interpretados | 20 % |
| Tabla de auditoría, disparador e incidente auditado | 20 % |
| Manipulación y límites (lecturas, volumen) | 10 % |
| Exportación, retiro de secretos e integridad | 10 % |
| Cronología y respuestas a Dirección | 15 % |
| Informe y reflexión | 10 % |
| **Total** | **100 %** |

> La Parte C no suma porcentaje mientras sea opcional. Ponderación de referencia dentro del laboratorio; la ponderación en la calificación de la unidad la confirmará tu docente.

**Criterio de aprobación técnica:** no basta con que existan registros. Debes demostrar que puedes **leerlos**, **relacionarlos** y **distinguir lo que prueban de lo que no prueban**.

---

## 31. Errores frecuentes

#### Error 1 — Verificar en el mismo bloque que la recarga

`pg_reload_conf()` es asíncrona. Si consultas `pg_settings` inmediatamente en el mismo bloque, puedes ver los valores anteriores. Consulta de nuevo.

#### Error 2 — Olvidar el reinicio

`logging_collector` y `shared_preload_libraries` solo cambian al reiniciar. Revisa `pending_restart`.

#### Error 3 — Opciones de arranque que ganan a `ALTER SYSTEM`

Si el servicio se arranca con `-c parametro=valor`, esa opción prevalece. `pg_settings.source` mostrará `command line`. Revisa el script de servicio o la definición del contenedor.

#### Error 4 — Probar accesos fallidos con una regla `trust`

Si la regla que corresponde a tu conexión usa `trust`, nunca fallará por contraseña. Revisa `pg_hba_file_rules` (sección 6.4).

#### Error 5 — Registrar `current_user` en la auditoría

Dentro de una función `SECURITY DEFINER` devuelve el propietario de la función. Usa `session_user`.

#### Error 6 — Confundir "usuario de la bitácora" con "persona"

La bitácora registra el **rol** con que se autenticó la sesión. Si varias personas comparten `app_ventas`, no puede distinguirlas.

#### Error 7 — Subir la bitácora sin revisarla

Una bitácora puede contener contraseñas, datos personales dentro de sentencias y direcciones internas.

---

## 32. Relación con los siguientes laboratorios

```text
LAB-01  Bitácoras y auditoría del dato en PostgreSQL
        ¿Quién se conectó, qué ejecutó y qué valor tenía el dato?
           │
           ▼
LAB-02  Trazabilidad en MongoDB Community
        ¿Qué se puede registrar en MongoDB Community y qué no?
           │
           ▼
LAB-03  Políticas, gobierno y evidencias
        ¿Quién es responsable del dato y cómo se demuestra ante una auditoría interna?
```

---

## Anexo A — Particularidades de cada despliegue

Las actividades anteriores usan solo instrucciones del motor (`psql`, SQL). Lo único que cambia entre despliegues es cómo se abre la sesión de administrador, cómo se reinicia el servicio y cómo se edita `pg_hba.conf`. Consulta la documentación oficial de descargas (REF-U3-22) para instalar PostgreSQL 16 en tu plataforma.

### A.1 Sesión de administrador y reinicio

| Despliegue | Sesión de administrador | Reinicio del servicio |
| --- | --- | --- |
| Linux (paquetes de la distribución o PGDG) | `sudo -u postgres psql -d comercial` (la regla `local` suele ser `peer`: el usuario del sistema debe llamarse como el rol) | `sudo systemctl restart postgresql` (el nombre de la unidad puede variar, por ejemplo `postgresql@16-main`) |
| macOS (Homebrew, `postgresql@16`) | `psql -d comercial`. El superusuario inicial lleva el nombre de tu usuario del sistema. Para usar los comandos de esta guía, crea el rol: `createuser -s postgres` | `brew services restart postgresql@16` |
| Windows (instalador de EDB) | `psql -U postgres -d comercial` (solicita la contraseña definida al instalar) | Aplicación *Servicios*, o en PowerShell como administrador: `Restart-Service postgresql-x64-16` |
| Contenedor (imagen oficial `postgres:16`) | `docker exec -it dba-u3-pg psql -U postgres -d comercial`. También puedes abrir una terminal dentro del contenedor (`docker exec -it dba-u3-pg bash`) y ejecutar la guía tal cual | `docker restart dba-u3-pg` |

Para el contenedor, un servidor equivalente al de esta guía se crea con:

```bash
docker run --name dba-u3-pg -e POSTGRES_PASSWORD=Practica_U3_2026 -e POSTGRES_DB=comercial -p 5432:5432 -d postgres:16
```

`-p 5432:5432` publica el puerto para que un `psql` instalado en tu equipo alcance el servidor. En ese caso, la bitácora mostrará como cliente la dirección de la red interna del contenedor, no `127.0.0.1`.

> Con `logging_collector = on`, la bitácora se escribe en archivos dentro del directorio de datos y ya no aparece en la salida del contenedor. Es el comportamiento esperado: la evidencia queda bajo control del servidor.

### A.2 Editar `pg_hba.conf`

| Despliegue | Cómo editar el archivo que indica `SHOW hba_file` |
| --- | --- |
| Linux | Con un editor y privilegios de administrador, por ejemplo `sudo nano <ruta>` |
| macOS (Homebrew) | Con cualquier editor; el archivo pertenece a tu usuario |
| Windows | Con un editor ejecutado como administrador |
| Contenedor | La imagen no incluye editor. Este comando cambia `trust` por `scram-sha-256` en las reglas `host` de `127.0.0.1` y `::1`: |

```bash
docker exec dba-u3-pg bash -c "sed -i -E 's/^(host +all +all +(127\.0\.0\.1\/32|::1\/128) +)trust/\1scram-sha-256/' /var/lib/postgresql/data/pg_hba.conf"
```

Después de editar, en cualquier despliegue: `SELECT pg_reload_conf();` y verifica con `pg_hba_file_rules`. Si la columna `error` muestra un valor, corrige el archivo antes de recargar.

### A.3 `pgaudit` en un contenedor

```dockerfile
FROM postgres:16

RUN apt-get update \
 && apt-get install -y --no-install-recommends postgresql-16-pgaudit \
 && rm -rf /var/lib/apt/lists/*
```

```bash
docker build -t dba-u3/postgres-pgaudit:16 .
docker run --name dba-u3-pgaudit -e POSTGRES_PASSWORD=Practica_U3_2026 -e POSTGRES_DB=comercial -d dba-u3/postgres-pgaudit:16
```

La imagen derivada instala el mismo paquete que en Linux. La carga de la biblioteca se hace igual que en cualquier despliegue, con `ALTER SYSTEM SET shared_preload_libraries` y un reinicio (Actividad 18). La construcción descarga paquetes de internet: si la red del aula usa *proxy*, constrúyela con anticipación.

---

## 33. Referencias de este laboratorio

* **REF-U3-03** — NIST. *SP 800-92: Guide to Computer Security Log Management*. https://csrc.nist.gov/pubs/sp/800/92/final
* **REF-U3-07** — PostgreSQL Global Development Group. "Error Reporting and Logging". https://www.postgresql.org/docs/current/runtime-config-logging.html
* **REF-U3-08** — PostgreSQL Global Development Group. "The Cumulative Statistics System", `pg_stat_activity`. https://www.postgresql.org/docs/current/monitoring-stats.html
* **REF-U3-09** — pgaudit project. Repositorio y README oficial. https://github.com/pgaudit/pgaudit
* **REF-U3-11** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 43.10 "Trigger Functions". https://www.postgresql.org/docs/16/plpgsql-trigger.html
* **REF-U3-12** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, "ALTER SYSTEM". https://www.postgresql.org/docs/16/sql-altersystem.html
* **REF-U3-13** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 20.1 "Setting Parameters". https://www.postgresql.org/docs/16/config-setting.html
* **REF-U3-17** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 9.26 "System Information Functions and Operators" (`pg_current_logfile`). https://www.postgresql.org/docs/16/functions-info.html
* **REF-U3-18** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 9.27 "System Administration Functions" (`pg_read_file`, `pg_reload_conf`, `pg_ls_logdir`). https://www.postgresql.org/docs/16/functions-admin.html
* **REF-U3-19** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 54.9 "pg_hba_file_rules". https://www.postgresql.org/docs/16/view-pg-hba-file-rules.html
* **REF-U3-22** — PostgreSQL Global Development Group. "PostgreSQL: Downloads". https://www.postgresql.org/download/

Las salidas mostradas se obtuvieron ejecutando esta guía el 2026-10-25 contra PostgreSQL 16.14 (las marcas de tiempo están en UTC). Para la verificación se usó la imagen oficial `postgres:16` con una terminal dentro del servidor, de modo que las conexiones por red llegaran desde `127.0.0.1`, como en una instalación nativa. Fechas, PID, rutas y direcciones serán distintos en tu equipo.
