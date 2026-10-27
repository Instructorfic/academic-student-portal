---
title: "3. Auditoría del dato"
description: "Unidad 3 de DBA — niveles de auditoría, tabla de auditoría con disparador, SECURITY DEFINER y pgaudit opcional."
---

**Temas del programa:** 3.1.6 y 3.2

## Tres niveles de auditoría

| Nivel | Registra | Ejemplo | Mecanismo |
| --- | --- | --- | --- |
| Sentencia | El texto SQL | `UPDATE clientes SET rfc = ...` | `log_statement` |
| Dato | Valor antes y después, por registro | `rfc: GAMA780912XYZ → GAMA780912ZZZ` | Disparador + tabla |
| Objeto | Qué tabla o columna se leyó o escribió | Lectura de `clientes.rfc` | `pgaudit` (opcional) |

<div class="callout">

Un `UPDATE` sin `WHERE` genera **una** línea en la bitácora y **una fila por registro afectado** en la tabla de auditoría.

</div>

## Diseñar el registro de auditoría

| Campo | Responde |
| --- | --- |
| `momento TIMESTAMPTZ` | ¿Cuándo? Con zona horaria |
| `usuario_sesion TEXT` | ¿Quién provocó el cambio? |
| `aplicacion TEXT` | ¿Con qué aplicación? (la declara el cliente) |
| `ip_cliente INET` | ¿Desde dónde? |
| `operacion TEXT` | `INSERT`, `UPDATE` o `DELETE` |
| `valores_antes JSONB` | ¿Qué se perdió? |
| `valores_despues JSONB` | ¿Qué se escribió? |

<div class="callout-alerta">

La tabla de auditoría **también contiene datos personales**. Necesita control de acceso y política de conservación propios.

</div>

## Ejemplo guiado: esquema y tabla de auditoría

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

## Ejemplo guiado: la función de disparador

<div class="small">

```sql
CREATE OR REPLACE FUNCTION auditoria.registrar_cambio_cliente()
RETURNS trigger LANGUAGE plpgsql
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
```

</div>

<span class="fuente">Fuente: documentación oficial de PostgreSQL, "Trigger Functions", ejemplo 43.4 (función de disparador para auditoría)</span>

## Ejemplo guiado: asociar el disparador

```sql
REVOKE ALL ON FUNCTION auditoria.registrar_cambio_cliente() FROM PUBLIC;

CREATE TRIGGER trg_auditoria_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW EXECUTE FUNCTION auditoria.registrar_cambio_cliente();
```

<div class="grid-3">

<div class="card accent-azul"><strong><code>AFTER</code></strong><p>Registra lo que efectivamente ocurrió</p></div>
<div class="card accent-dorado"><strong><code>FOR EACH ROW</code></strong><p>Una fila de auditoría por registro afectado</p></div>
<div class="card accent-verde"><strong><code>TG_OP</code>, <code>OLD</code>, <code>NEW</code></strong><p>Operación, registro anterior, registro nuevo</p></div>

</div>

## `SECURITY DEFINER` y `search_path`

<div class="grid-2">

<div class="card accent-azul"><strong>¿Por qué <code>SECURITY DEFINER</code>?</strong><p><code>app_ventas</code> debe <b>provocar</b> la escritura en la auditoría sin tener privilegio de escribir en ella. La función se ejecuta con los privilegios de su propietario.</p></div>
<div class="card accent-rojo"><strong>¿Por qué fijar <code>search_path</code>?</strong><p>Sin él, un usuario podría crear objetos con el mismo nombre en otro esquema y lograr que la función los use con privilegios de propietario.</p></div>

</div>

## Ejemplo guiado: el incidente auditado

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "UPDATE clientes SET rfc = 'GAMA780912ZZZ' WHERE id = 3"
```

```text
id_evento        | 1
momento          | 2026-10-25 22:50:52.903439+00
usuario_sesion   | app_ventas
usuario_efectivo | postgres
aplicacion       | app-ventas-web
ip_cliente       | 127.0.0.1
operacion        | UPDATE
```

<div class="callout-alerta">

Dentro de una función `SECURITY DEFINER`, `current_user` es el **propietario de la función**. Si solo se registrara `current_user`, todos los cambios parecerían hechos por `postgres`.

</div>

## Ejemplo guiado: ¿qué campo cambió?

```sql
SELECT a.id_evento, a.usuario_sesion, a.ip_cliente, d.key AS campo,
       a.valores_antes ->> d.key AS antes, d.value #>> '{}' AS despues
FROM auditoria.cambios_clientes a
CROSS JOIN LATERAL jsonb_each(a.valores_despues) d
WHERE a.operacion = 'UPDATE'
  AND a.valores_antes -> d.key IS DISTINCT FROM d.value
ORDER BY a.id_evento;
```

```text
 id_evento | usuario_sesion | ip_cliente | campo |     antes     |    despues
-----------+----------------+------------+-------+---------------+---------------
         1 | app_ventas     | 127.0.0.1  | rfc   | GAMA780912XYZ | GAMA780912ZZZ
```

Ahora facturación **puede restaurar** el valor anterior.

## Ejemplo guiado: altas y bajas

```text
 id_evento | usuario_sesion |   aplicacion   | operacion | id_cliente |   rfc_antes   |  rfc_despues
-----------+----------------+----------------+-----------+------------+---------------+---------------
         1 | app_ventas     | app-ventas-web | UPDATE    |          3 | GAMA780912XYZ | GAMA780912ZZZ
         2 | postgres       | psql           | INSERT    |          6 |               | RUPE950101AAA
         3 | postgres       | psql           | DELETE    |          6 | RUPE950101AAA |
```

<div class="callout-alerta">

El cliente 6 ya no existe en `clientes`, pero sus datos siguen en la auditoría. **Conflicto con la política de retención** de la Unidad 2: ¿quién decide cuánto tiempo se conserva?

</div>

## Ejemplo guiado: intentar borrar la evidencia

Desde la aplicación:

```text
DELETE FROM auditoria.cambios_clientes                       → ERROR: permission denied for schema auditoria
ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes  → ERROR: must be owner of table clientes
```

Desde el administrador (desactiva, cambia y reactiva): la tabla de auditoría **no** registra el cambio, pero la bitácora sí, incluido el **intento** fallido de la aplicación:

<div class="small">

```text
user=app_ventas ... LOG:  statement: ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
user=postgres ... LOG:  statement: ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
user=postgres ... LOG:  statement: UPDATE clientes SET rfc = 'GAMA780912GHI' WHERE id = 3
user=postgres ... LOG:  statement: ALTER TABLE clientes ENABLE TRIGGER trg_auditoria_clientes
```

</div>

## Un mecanismo audita al otro

```text
Tabla de auditoría      →  detalle del dato (antes y después)
                           la desactiva el propietario de la tabla

Bitácora del servidor   →  registra que la auditoría se desactivó
                           la altera quien controla el servidor
```

<div class="callout">

Ningún mecanismo **dentro** del servidor protege contra un administrador con control total. Por eso las organizaciones envían las bitácoras a otro sistema y **separan** a quien opera la base de quien custodia la evidencia (separación de funciones, Unidad 2).

</div>

## El límite del disparador: las lecturas

**No existe disparador para `SELECT`.** Con `log_statement = 'mod'`, la bitácora tampoco registra consultas.

| Alternativa | Ventaja | Desventaja |
| --- | --- | --- |
| `log_statement = 'all'` | No requiere instalar nada | Registra **todas** las consultas de **todas** las tablas |
| Entregar el dato mediante una función que registre su uso | Control preciso | Requiere cambiar la aplicación |
| `pgaudit`, auditoría de objeto | Lecturas por tabla y por columna | Requiere instalar una extensión |

## `pgaudit` (práctica avanzada opcional)

<div class="callout-alerta">

`pgaudit` **no forma parte de la distribución básica** de PostgreSQL. Se instala su paquete en el servidor y la biblioteca se carga **al arrancar**.

</div>

```sql
SELECT name, default_version FROM pg_available_extensions WHERE name = 'pgaudit';
CREATE EXTENSION pgaudit;
-- ERROR:  pgaudit must be loaded via shared_preload_libraries

ALTER SYSTEM SET shared_preload_libraries = 'pgaudit';
SELECT pg_reload_conf();
SELECT name, setting, pending_restart FROM pg_settings WHERE name = 'shared_preload_libraries';
--  shared_preload_libraries |         | t        ← espera un reinicio
```

Después de reiniciar el servicio: `CREATE EXTENSION pgaudit;` → versión `16.1`.

<span class="fuente">Fuente: repositorio oficial del proyecto pgaudit</span>

## Recargar o reiniciar: cómo saberlo

| Parámetro | Cambia con | Por qué |
| --- | --- | --- |
| `log_statement`, `log_connections`, `log_line_prefix` | Recarga (`pg_reload_conf()`) | Cada proceso puede leer el nuevo valor sin detenerse |
| `logging_collector` | Reinicio | El proceso colector se crea al arrancar el servidor |
| `shared_preload_libraries` | Reinicio | Las bibliotecas se cargan en memoria al arrancar |

<div class="callout">

La columna `pending_restart` de `pg_settings` responde la pregunta sin memorizar la tabla. El **comando** de reinicio depende del despliegue (servicio del sistema, Homebrew, servicios de Windows, contenedor). El **diagnóstico** es el mismo en todos.

</div>

<span class="fuente">Fuente: documentación oficial de PostgreSQL 16, "Setting Parameters" y "ALTER SYSTEM"</span>

## Ejemplo guiado: auditoría de objeto con `pgaudit`

El rol auditor no inicia sesión. Sus privilegios son un **filtro** de qué columnas auditar:

```sql
CREATE EXTENSION pgaudit;
CREATE ROLE auditor_datos NOLOGIN;
GRANT SELECT (rfc, telefono), UPDATE (rfc, telefono) ON clientes TO auditor_datos;
ALTER SYSTEM SET pgaudit.log = 'role, ddl';
ALTER SYSTEM SET pgaudit.role = 'auditor_datos';
ALTER SYSTEM SET log_line_prefix = '%m [%p] user=%u db=%d app=%a client=%h ';
SELECT pg_reload_conf();
```

<div class="small">

```text
user=app_ventas ... AUDIT: OBJECT,1,1,READ,SELECT,TABLE,public.clientes,"SELECT nombre, rfc FROM clientes WHERE id = 3",<not logged>
user=app_ventas ... AUDIT: OBJECT,2,1,READ,SELECT,TABLE,public.clientes,SELECT * FROM clientes WHERE id = 4,<not logged>
user=app_ventas ... AUDIT: OBJECT,3,1,WRITE,UPDATE,TABLE,public.clientes,UPDATE clientes SET rfc = 'LOAA850315XXX' WHERE id = 1,<not logged>
user=postgres   ... AUDIT: SESSION,1,1,ROLE,GRANT,TABLE,,GRANT SELECT ON clientes TO soporte_ana,<not logged>
```

</div>

`SELECT nombre, ciudad ...` y `UPDATE ... SET ciudad ...` **no** aparecen.

## Advertencias del propio `pgaudit`

<div class="grid-2">

<div class="card accent-rojo"><strong>Volumen</strong><p>Puede generar un volumen muy grande de registros, agotar disco y afectar la latencia. Se recomienda limitar el alcance con auditoría de objeto.</p></div>
<div class="card accent-dorado"><strong>Superusuarios</strong><p>El README oficial indica que los superusuarios no pueden auditarse de forma confiable.</p></div>
<div class="card accent-azul"><strong>Usuario</strong><p>La línea <code>AUDIT</code> no incluye el usuario: se obtiene de <code>log_line_prefix</code>.</p></div>
<div class="card accent-verde"><strong>Carga</strong><p>Sin <code>shared_preload_libraries</code>, la extensión no registra nada.</p></div>

</div>

<span class="fuente">Fuente: README oficial de pgaudit</span>

## Relación con el Laboratorio 01

<div class="callout">

La bitácora del servidor, la tabla de auditoría con disparador y `pgaudit` se practican en el [Laboratorio 1 — Bitácoras y auditoría del dato en PostgreSQL](/materias/dba/unidad-03/laboratorios/laboratorio-1-bitacoras-y-auditoria-del-dato-postgresql/), sobre el servidor que tú despliegues.

</div>

## Qué sigue

Continúa con [4. Trazabilidad en MongoDB Community](/materias/dba/unidad-03/04-trazabilidad-en-mongodb/).
