---
title: "2. Bitácoras en PostgreSQL"
description: "Unidad 3 de DBA — ubicación y lectura de la bitácora, log_statement, accesos, privilegios, errores, pg_stat_activity y protección de la bitácora."
---

**Temas del programa:** 3.1 y 3.2

## ¿Dónde está la bitácora? Depende del despliegue

PostgreSQL escribe sus mensajes en su salida de error. Con la configuración por defecto, **quien decide a dónde va** es el mecanismo de despliegue:

| Despliegue | Destino habitual |
| --- | --- |
| Linux (paquetes) | Un archivo que administra el script de arranque |
| macOS (Homebrew) | El archivo de bitácora del servicio |
| Windows (instalador) | Archivos en el directorio de datos |
| Contenedor | La salida del contenedor |

<div class="callout">

Solución del gestor: el **colector de bitácora** (`logging_collector = on`). El propio servidor escribe sus archivos dentro de `log_directory`, en cualquier plataforma.

</div>

## Ejemplo guiado: el servidor administra su bitácora

```sql
ALTER SYSTEM SET logging_collector = on;   -- requiere reiniciar el servicio
SELECT pg_current_logfile();
```

```text
          pg_current_logfile
--------------------------------------
 log/postgresql-2026-10-25_224920.log
```

```sql
SELECT linea
FROM regexp_split_to_table(pg_read_file(pg_current_logfile()), E'\n') AS linea;
```

| Parte | Qué hace |
| --- | --- |
| `pg_current_logfile()` | Ruta del archivo vigente, relativa al directorio de datos |
| `pg_read_file(...)` | Devuelve el archivo como texto. Solo superusuarios |
| `regexp_split_to_table(..., E'\n')` | Una fila por línea |

<span class="fuente">Fuente: documentación oficial de PostgreSQL 16, "System Information Functions" y "System Administration Functions"</span>

## Leer y filtrar la bitácora con SQL

Una **vista** guarda la consulta con nombre. Se crea en un esquema sin acceso público:

```sql
CREATE SCHEMA dba;
REVOKE ALL ON SCHEMA dba FROM PUBLIC;
CREATE VIEW dba.bitacora AS
SELECT t.n AS num, t.linea
FROM regexp_split_to_table(pg_read_file(pg_current_logfile()), E'\n') WITH ORDINALITY AS t(linea, n)
WHERE t.linea <> '';
```

```sql
SELECT num, linea FROM dba.bitacora ORDER BY num DESC LIMIT 10;      -- últimas 10
SELECT linea FROM dba.bitacora WHERE linea LIKE '%statement:%';      -- sentencias
SELECT linea FROM dba.bitacora WHERE linea ~ '(FATAL|ERROR)';        -- expresión regular
SELECT count(*) FROM dba.bitacora WHERE linea LIKE '%password authentication failed%';
```

<div class="callout-alcance">

Variante: con acceso al archivo, también se lee con `tail`, `grep` o `Select-String`. Los formatos `csvlog` y `jsonlog` facilitan procesarlo con otras herramientas.

</div>

## Parámetros que controlan la bitácora

| Parámetro | Qué controla | Por defecto |
| --- | --- | --- |
| `logging_collector` | Si el servidor escribe sus propios archivos (requiere reinicio) | `off` |
| `log_connections` | Cada intento de conexión | `off` |
| `log_disconnections` | Fin de sesión y duración | `off` |
| `log_line_prefix` | Contexto de cada línea | `%m [%p] ` |
| `log_statement` | Qué sentencias se registran | `none` |
| `log_min_error_statement` | Sentencia que causó un error | `error` |

<span class="fuente">Fuente: documentación oficial de PostgreSQL, "Error Reporting and Logging"</span>

## Ejemplo guiado: configuración por defecto

```sql
SELECT name, setting, source FROM pg_settings
WHERE name IN ('log_connections','log_disconnections','log_line_prefix','log_statement');
```

```text
        name        | setting  | source
--------------------+----------+---------
 log_connections    | off      | default
 log_disconnections | off      | default
 log_line_prefix    | %m [%p]  | default
 log_statement      | none     | default
```

<div class="callout">

Con esta configuración **no se registra quién se conecta ni qué ejecuta**. La línea tampoco incluye usuario ni IP.

</div>

## Ejemplo guiado: el incidente sin bitácora

La aplicación cambia el RFC:

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET rfc = 'GAMA780912XXX' WHERE id = 3"
```

```text
UPDATE 1
```

Buscamos evidencia:

```sql
SELECT linea FROM dba.bitacora WHERE linea ILIKE '%update%' OR linea LIKE '%app_ventas%';
```

```text
(0 rows)
```

<div class="callout-alerta">

**Ninguna línea.** Ni el `UPDATE`, ni la conexión de `app_ventas`. No hay forma de demostrar quién hizo el cambio.

</div>

## Niveles de `log_statement`

| Valor | Registra |
| --- | --- |
| `none` | Nada |
| `ddl` | `CREATE`, `ALTER`, `DROP`, **y también** `GRANT`, `REVOKE`, `COMMENT` |
| `mod` | Lo anterior + `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `COPY FROM` |
| `all` | Todo, incluidas las consultas `SELECT` |

<div class="callout">

Elegir el nivel es un equilibrio entre **evidencia**, **volumen** y **riesgo de registrar datos sensibles**.

</div>

## Ejemplo guiado: configurar con `ALTER SYSTEM`

```sql
ALTER SYSTEM SET log_connections = on;
ALTER SYSTEM SET log_disconnections = on;
ALTER SYSTEM SET log_line_prefix = '%m [%p] user=%u db=%d app=%a client=%h ';
ALTER SYSTEM SET log_statement = 'ddl';
SELECT pg_reload_conf();
```

| Marcador | Significado |
| --- | --- |
| `%m` / `%p` | Fecha y hora con milisegundos / PID del proceso |
| `%u` / `%d` | Usuario / base de datos |
| `%a` / `%h` | Aplicación (`application_name`) / IP del cliente |

<span class="fuente">Fuente: documentación oficial de PostgreSQL, "ALTER SYSTEM". Los valores se guardan en postgresql.auto.conf</span>

## Cuidado con la prioridad de la configuración

```text
1. Opciones -c al arrancar el servidor     (mayor prioridad)
2. postgresql.auto.conf  ← ALTER SYSTEM
3. postgresql.conf                          (menor prioridad)
```

<div class="callout-alerta">

Si el servicio se arranca con `-c log_statement=ddl` (en un script de servicio o en la definición de un contenedor), un `ALTER SYSTEM SET log_statement = 'mod'` **no surte efecto**. `pg_settings.source` mostrará `command line`.

</div>

```sql
SELECT name, setting, source, sourcefile FROM pg_settings WHERE name = 'log_statement';
```

<span class="fuente">Fuente: documentación oficial de PostgreSQL, "Setting Parameters"</span>

## Ejemplo guiado: el cambio de configuración queda registrado

```text
11 | ... [1] user= db= app= client= LOG:  parameter "log_statement" changed to "ddl"
10 | ... [1] user= db= app= client= LOG:  parameter "log_line_prefix" changed to "%m [%p] user=%u ..."
 9 | ... [1] LOG:  parameter "log_disconnections" changed to "on"
 8 | ... [1] LOG:  parameter "log_connections" changed to "on"
```

<div class="grid-2">

<div class="card accent-azul"><strong>Lo que sí quedó</strong><p>El nuevo estado y el momento en que entró en vigor, registrados por el proceso principal (PID 1)</p></div>
<div class="card accent-rojo"><strong>Lo que no quedó</strong><p>Las sentencias <code>ALTER SYSTEM</code>: cuando se ejecutaron, <code>log_statement</code> aún era <code>none</code></p></div>

</div>

<div class="callout-alcance">

`pg_reload_conf()` es asíncrona. En la verificación, una consulta a `pg_settings` en el mismo bloque aún mostró los valores anteriores. Comprueba con una consulta nueva.

</div>

## Accesos fallidos: revisa las reglas de autenticación

```sql
SELECT line_number, type, address, auth_method FROM pg_hba_file_rules WHERE database = '{all}';
```

```text
 line_number | type  |  address  |  auth_method
-------------+-------+-----------+---------------
         117 | local |           | trust
         119 | host  | 127.0.0.1 | trust
         128 | host  | all       | scram-sha-256
```

<div class="callout-alerta">

Con `trust`, cualquier conexión que coincida con la regla entra **sin contraseña**. Nunca verás un acceso fallido. Es frecuente en instalaciones de desarrollo.

</div>

<div class="callout">

Se corrige editando el archivo que indica `SHOW hba_file` y ejecutando `SELECT pg_reload_conf();`. Relación con la Unidad 2 (hardening): una regla `trust` también debilita lo que la bitácora puede demostrar sobre la identidad.

</div>

<span class="fuente">Fuente: documentación oficial de PostgreSQL 16, "pg_hba_file_rules"</span>

## Ejemplo guiado: accesos en la bitácora

```bash
psql "postgresql://app_ventas:incorrecta@127.0.0.1/comercial" -c "SELECT 1"
psql "postgresql://usuario_inexistente:x@127.0.0.1/comercial" -c "SELECT 1"
```

<div class="small">

```text
22:50:00.334 UTC [91] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 FATAL:  password authentication failed for user "app_ventas"
22:50:00.334 UTC [91] ... DETAIL:  Connection matched file "/var/lib/postgresql/data/pg_hba.conf" line 119: "host all all 127.0.0.1/32 scram-sha-256"
22:50:00.462 UTC [98] user=usuario_inexistente ... FATAL:  password authentication failed for user "usuario_inexistente"
22:50:00.462 UTC [98] ... DETAIL:  Role "usuario_inexistente" does not exist.
22:50:00.565 UTC [105] user=app_ventas ... LOG:  connection authenticated: identity="app_ventas" method=scram-sha-256
22:50:00.566 UTC [105] user=app_ventas ... LOG:  connection authorized: user=app_ventas database=comercial application_name=app-ventas-web
22:50:00.568 UTC [105] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  disconnection: session time: 0:00:00.010
```

</div>

<div class="callout">

El cliente recibe el mismo mensaje en ambos fallos. **Solo el servidor** sabe que el rol no existe.

</div>

## Leer una línea campo por campo

```text
2026-10-25 22:50:00.334 UTC [91] user=app_ventas db=comercial app=[unknown] client=127.0.0.1 FATAL:  password authentication failed
```

| Parte | Valor | Responde |
| --- | --- | --- |
| `%m` | `2026-10-25 22:50:00.334 UTC` | ¿Cuándo? |
| `%p` | `91` | ¿Qué proceso? Agrupa las líneas de una sesión |
| `%u` / `%d` | `app_ventas` / `comercial` | ¿Con qué rol y en qué base? |
| `%a` | `[unknown]` | ¿Qué aplicación? Aún desconocida al fallar |
| `%h` | `127.0.0.1` | ¿Desde dónde? |
| Mensaje | `FATAL: password authentication failed` | ¿Qué ocurrió? |

## Ejemplo guiado: privilegios y estructura

```sql
REVOKE UPDATE ON clientes FROM soporte_ana;
GRANT UPDATE ON clientes TO app_ventas;
ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20);
```

<div class="small">

```text
22:50:09.341 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: REVOKE UPDATE ON clientes FROM soporte_ana
22:50:09.367 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: GRANT UPDATE ON clientes TO app_ventas
22:50:09.372 UTC [119] user=postgres db=comercial app=psql client=[local] LOG:  statement: ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20)
```

</div>

<div class="callout">

Con `log_statement = 'ddl'` ya quedan registrados los cambios de **privilegios** y de **estructura**, con usuario y hora. `client=[local]` indica una conexión por el socket local del servidor.

</div>

## Ejemplo guiado: la bitácora también filtra secretos

```sql
CREATE ROLE rol_temporal LOGIN PASSWORD 'Temporal_Practica_2026';
SELECT linea FROM dba.bitacora WHERE linea LIKE '%rol_temporal%';
```

```text
LOG:  statement: CREATE ROLE rol_temporal LOGIN PASSWORD 'Temporal_Practica_2026'
```

<div class="callout-alerta">

La contraseña quedó **en texto claro** en la bitácora. Borrar el rol no la borra del registro.

</div>

<div class="grid-2">

<div class="card accent-verde"><strong>Alternativa: <code>\password</code></strong><p><code>psql</code> calcula el resumen SCRAM y envía solo eso: <code>ALTER USER app_ventas PASSWORD 'SCRAM-SHA-256$4096:...'</code></p></div>
<div class="card accent-dorado"><strong>Consecuencia</strong><p>La bitácora se protege como la base de datos: acceso restringido, revisión antes de compartirla</p></div>

</div>

## Ejemplo guiado: `ddl` no registra el `UPDATE`

Con `log_statement = 'ddl'` se repite el cambio de RFC: la bitácora muestra la conexión y la desconexión de `app_ventas`, **pero no el `UPDATE`**.

```sql
ALTER SYSTEM SET log_statement = 'mod';
SELECT pg_reload_conf();
```

<div class="small">

```text
22:50:19.459 UTC [155] user=postgres ... LOG:  statement: ALTER SYSTEM SET log_statement = 'mod'
22:50:19.488 UTC [1]   user= db= app= client= LOG:  parameter "log_statement" changed to "mod"
22:50:20.601 UTC [162] user=app_ventas db=comercial app=app-ventas-web client=127.0.0.1 LOG:  statement: UPDATE clientes SET telefono = '6679990000' WHERE id = 3
```

</div>

Ahora sí: **quién**, **cuándo**, **desde dónde**, **con qué aplicación** y **qué sentencia**.

## Lo que la bitácora todavía no muestra

<div class="grid-3">

<div class="card accent-rojo"><strong>El valor anterior</strong><p>Sabemos qué se escribió en <code>telefono</code>, no qué se perdió</p></div>
<div class="card accent-dorado"><strong>Las lecturas</strong><p>El <code>SELECT</code> que leyó el RFC no aparece con <code>mod</code></p></div>
<div class="card accent-azul"><strong>La persona</strong><p>Se registra el rol. Si varias personas comparten <code>app_ventas</code>, no se distinguen</p></div>

</div>

<div class="callout">

Las dos primeras limitaciones se resuelven con una tabla de auditoría y con `pgaudit`, como verás a continuación. La tercera es un problema de gestión de credenciales (Unidad 2).

</div>

## Ejemplo guiado: errores de autorización

```bash
psql "postgresql://soporte_ana:Soporte_Practica_2026@127.0.0.1/comercial" -c "DELETE FROM clientes WHERE id = 5"
```

<div class="small">

```text
user=soporte_ana db=comercial app=psql client=127.0.0.1 ERROR:  permission denied for table clientes
user=soporte_ana db=comercial app=psql client=127.0.0.1 STATEMENT:  DELETE FROM clientes WHERE id = 5
user=postgres db=comercial app=psql client=[local] ERROR:  role "soporte_ana" cannot be dropped because some objects depend on it
user=postgres db=comercial app=psql client=[local] DETAIL:  privileges for table clientes
user=postgres db=comercial app=psql client=[local] STATEMENT:  DROP ROLE soporte_ana
```

</div>

<div class="callout">

`log_min_error_statement = error` registra la sentencia que falló **aunque** `log_statement` sea `none`. Un intento rechazado es tan relevante como una operación exitosa.

</div>

## Ejemplo guiado: `pg_stat_activity`

```sql
SELECT pid, usename, application_name, client_addr, state, left(query, 30) AS query
FROM pg_stat_activity WHERE backend_type = 'client backend';
```

```text
 pid |   usename   | application_name | client_addr | state  |             query
-----+-------------+------------------+-------------+--------+--------------------------------
 196 | postgres    | psql             |             | active | SELECT pid, usename, applicati
 189 | soporte_ana | reporte-mensual  | 127.0.0.1   | active | SELECT pg_sleep(90)
```

| Bitácora | `pg_stat_activity` |
| --- | --- |
| Historia: lo que ocurrió | Fotografía: lo que ocurre ahora |
| Se conserva si se conserva la bitácora | La fila desaparece al terminar la sesión |

<span class="fuente">El PID relaciona ambas fuentes. En la Unidad IV se usará para diagnosticar desempeño.</span>

## Exportar y proteger la bitácora

```bash
psql -U postgres -d comercial -At -c "SELECT replace(pg_read_file(pg_current_logfile()), 'Temporal_Practica_2026', '<REDACTED>')" > evidencias/bitacora.log
```

`-A` quita la alineación, `-t` los encabezados. `replace` retira el secreto **antes** de que salga del servidor. `>` envía la salida a un archivo y lo reemplaza si existe.

| Sistema | Resumen SHA-256 del archivo |
| --- | --- |
| Linux | `sha256sum evidencias/bitacora.log` |
| macOS | `shasum -a 256 evidencias/bitacora.log` |
| Windows | `Get-FileHash evidencias/bitacora.log -Algorithm SHA256` |

<div class="callout">

El resumen (*hash*) es una huella de 64 caracteres hexadecimales. Cualquier cambio en el archivo produce una huella distinta. No impide modificarlo: **permite demostrar** si fue modificado, siempre que la huella se guarde en otro lugar.

</div>

## Ejemplo: el hash detecta una alteración

```bash
shasum -a 256 bitacora.log
```

```text
ad10b928960869be89354c5c522695b9122620372db29bd89a2c519057550e6a  bitacora.log
```

Alguien cambia `app_ventas` por `soporte_ana` en una sola línea del archivo:

```bash
sed -i '' 's/app_ventas/soporte_ana/' bitacora.log     # en Linux: sed -i 's/.../.../' archivo
shasum -a 256 bitacora.log
```

```text
1f06e95f47838d699b8d2bb8770ea39f65bf979ec9eb6825642837ad6d705ec2  bitacora.log
```

<div class="callout-alerta">

`sed -i 's/viejo/nuevo/'` reemplaza texto dentro del archivo. Aquí simula una manipulación. La huella cambió por completo: la alteración queda en evidencia.

</div>

## Relación con el laboratorio

<div class="callout">

La bitácora del servidor se practica en la Parte A del [Laboratorio 1 — Bitácoras y auditoría del dato en PostgreSQL](/materias/dba/unidad-03/laboratorios/laboratorio-1-bitacoras-y-auditoria-del-dato-postgresql/).

</div>

## Qué sigue

Continúa con [3. Auditoría del dato](/materias/dba/unidad-03/03-auditoria-del-dato/).
