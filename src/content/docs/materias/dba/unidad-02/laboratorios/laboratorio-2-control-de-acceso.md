---
title: "Laboratorio 2 — Control de acceso: modelos, usuarios, roles y Row-Level Security"
description: "Unidad 2 de DBA — laboratorio evaluado: DAC, RBAC y ABAC en PostgreSQL y MongoDB reales."
---

<span class="badge-estado">Evaluado — genera la primera mitad de la evidencia oficial</span>

**SGBD:** PostgreSQL 16 y MongoDB 7.

## Objetivo del laboratorio

Crear, en un servidor PostgreSQL y en un servidor MongoDB reales, al
menos tres niveles de privilegio diferenciados sobre la tabla
`clientes`, identificar qué modelo de control de acceso está en juego en
cada mecanismo usado, practicar Row-Level Security como ejemplo de
control basado en atributos, y **documentar ambos motores en una sola
matriz**: primera mitad de la evidencia oficial de la Unidad 2.

## Prerrequisitos

* Principios de privilegio mínimo y separación de funciones. Modelos DAC, RBAC, ABAC — ver [2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/).
* Haber completado el [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/).

## Entorno

Se reutilizan `dba-postgres-u2` y `dba-mongo-u2` (ver Laboratorio 1). No
es necesario crear contenedores nuevos. Si no están disponibles,
créalos de nuevo según ese laboratorio.

```bash
docker ps | grep dba-postgres-u2
docker ps | grep dba-mongo-u2
```

**Checkpoint.** Debes ver ambos contenedores como `Up`.

## Procedimiento

### Parte A — PostgreSQL: roles con privilegio diferenciado

```bash
docker exec -it dba-postgres-u2 psql -U postgres -d practica
```

```sql
CREATE ROLE lector WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT ON clientes TO lector;

CREATE ROLE editor WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT, INSERT, UPDATE ON clientes TO editor;

CREATE ROLE administrador WITH LOGIN PASSWORD '<REDACTED>' SUPERUSER;
```

**Checkpoint.**

```sql
\du
```

`administrador` muestra `Superuser`, `lector` y `editor` no.

**A1. Identifica el modelo.** Para cada rol creado, anota en tu matriz:
`GRANT`/`REVOKE` sobre un objeto específico es de naturaleza DAC (el
dueño del objeto decide), y el hecho de agrupar privilegios bajo un rol
con nombre reutilizable es RBAC. Los dos conviven en el mismo mecanismo.

**A2.** Confirma el privilegio de `lector`:

```bash
docker exec -it dba-postgres-u2 psql -U lector -d practica
```

```sql
SELECT * FROM clientes;      -- debe funcionar
INSERT INTO clientes (nombre, clave_acceso) VALUES ('otro', 'x');  -- debe fallar
```

### Parte B — MongoDB: roles con privilegio diferenciado

```bash
docker exec -it dba-mongo-u2 mongosh -u admin -p <REDACTED> --authenticationDatabase admin
```

```javascript
use practica

db.createRole({
  role: "lector",
  privileges: [{ resource: { db: "practica", collection: "clientes" }, actions: ["find"] }],
  roles: []
})
db.createRole({
  role: "editor",
  privileges: [{ resource: { db: "practica", collection: "clientes" }, actions: ["find", "insert", "update"] }],
  roles: []
})
db.createUser({ user: "lector1", pwd: "<REDACTED>", roles: ["lector"] })
db.createUser({ user: "editor1", pwd: "<REDACTED>", roles: ["editor"] })
```

**Checkpoint.**

```javascript
db.getUsers()
```

Ambos usuarios aparecen con su rol correspondiente. Confirma también, en
una sesión nueva sin credenciales, que MongoDB exige autenticación:

```javascript
db.getUsers()   // debe fallar con MongoServerError: requires authentication
```

### Parte C — Row-Level Security en PostgreSQL: un ejemplo de ABAC

```sql
ALTER TABLE clientes ADD COLUMN vendedor_id TEXT;
UPDATE clientes SET vendedor_id = 'v1' WHERE id = 1;

INSERT INTO clientes (nombre, clave_acceso, vendedor_id) VALUES
  ('cliente_v2', 'clave_v2', 'v2');

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY solo_mis_clientes ON clientes
  FOR SELECT
  USING (vendedor_id = current_user);

CREATE ROLE v1 WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT ON clientes TO v1;
```

```bash
docker exec -it dba-postgres-u2 psql -U v1 -d practica
```

```sql
SELECT * FROM clientes;
```

**Checkpoint.** Solo devuelve la fila con `vendedor_id = 'v1'`, aunque el
rol `v1` tiene `SELECT` sobre toda la tabla. GRANT/REVOKE por sí solo
(DAC/RBAC) no puede lograr esta restricción, porque decide a nivel de
tabla completa, no de fila. Esta política evalúa un atributo de la fila
(`vendedor_id`) contra un atributo de la sesión (`current_user`), eso es
control de acceso basado en atributos.

## Verificación

| Verificación | Resultado esperado |
| --- | --- |
| `\du` en PostgreSQL | `administrador` con `Superuser`, `lector` y `editor` sin ese atributo |
| `lector` ejecuta `SELECT` | Funciona |
| `lector` ejecuta `INSERT` | Falla por permisos |
| `db.getUsers()` autenticado en MongoDB | Muestra `lector1` y `editor1` con sus roles |
| Operación en MongoDB sin credenciales | Rechazada |
| `v1` consulta `clientes` con RLS activo | Solo ve su propia fila |

## Problemas frecuentes

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| `role "lector" already exists` | Rol creado en un intento anterior | `\du` | `DROP ROLE lector;` y repetir |
| `v1` no ve ninguna fila | La política usa `current_user`, que en PostgreSQL es el rol de conexión, no compara con `'v1'` como texto | `SELECT current_user;` conectado como `v1` | Confirmar que `vendedor_id` coincide exactamente con el nombre del rol |
| MongoDB no exige autenticación en el checkpoint | Sesión ya autenticada de un paso anterior | Abrir terminal nueva | Repetir en una conexión nueva |
| `mongosh: command not found` en el equipo anfitrión | No está instalado fuera del contenedor | No es necesario | Usar siempre `docker exec -it dba-mongo-u2 mongosh ...` |

## Evidencia mínima

Una matriz con columnas: usuario/rol, motor, modelo (DAC, RBAC, ABAC), permisos otorgados, propósito.

| Rol/usuario | Motor | Modelo | Permisos | Propósito |
| --- | --- | --- | --- | --- |
| `lector` | PostgreSQL | DAC + RBAC | SELECT sobre clientes | Consulta sin modificación |
| `editor` | PostgreSQL | DAC + RBAC | SELECT, INSERT, UPDATE | Operación cotidiana |
| `administrador` | PostgreSQL | RBAC | Superusuario | Administración completa |
| `v1` | PostgreSQL | ABAC (RLS) | SELECT restringido por fila | Acceso acotado a sus propios clientes |
| `lector1` | MongoDB | RBAC | read | Consulta sin modificación |
| `editor1` | MongoDB | RBAC | readWrite | Operación cotidiana |

## Reflexión

* ¿Por qué GRANT/REVOKE por sí solo no puede resolver el mismo problema que resuelve RLS?
* ¿Qué hubiera pasado si el contenedor de MongoDB se hubiera creado sin `--auth`?
* ¿Qué comando de PostgreSQL usarías para revocarle `INSERT` a `editor` sin eliminar su rol?

## Limpieza

No elimines los contenedores todavía, se reutilizan en el Laboratorio 3.

```bash
docker stop dba-postgres-u2 dba-mongo-u2
docker start dba-postgres-u2 dba-mongo-u2
```

## Relación con la actividad de la unidad

Este laboratorio es la ejecución técnica de la
[Actividad 3](/materias/dba/unidad-02/actividades/actividad-3/), primera
mitad de la evidencia oficial. Se completa con el Laboratorio 3, el
Laboratorio 4 y la Actividad 8.
