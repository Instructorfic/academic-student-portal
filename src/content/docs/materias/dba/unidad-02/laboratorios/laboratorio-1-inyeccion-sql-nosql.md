---
title: "Laboratorio 1 — Inyección SQL y NoSQL, consultas parametrizadas y prevención"
description: "Unidad 2 de DBA — laboratorio evaluado: inyección vulnerable vs. prevenida en PostgreSQL y MongoDB reales."
---

<span class="badge-estado">Evaluado — genera evidencia de la Actividad 2</span>

**SGBD:** PostgreSQL 16 y MongoDB 7. **Tecnología de apoyo:** contenedores
mediante Docker (ya viste los comandos básicos en `unidad01_lab01`).

> **Importante.** El propósito no es "aprender a atacar" una base de
> datos. Es reconocer el mecanismo de la vulnerabilidad para poder
> prevenirla. Todo el ejercicio ocurre en contenedores desechables,
> propios y aislados.

## Objetivo del laboratorio

Reproducir, contra un servidor PostgreSQL y un servidor MongoDB reales, la
diferencia de comportamiento entre una consulta vulnerable y su
equivalente prevenida, en los dos motores, y documentar por qué cada
técnica de prevención funciona: consultas parametrizadas, ORM usado
correctamente, validación de tipos, y privilegio mínimo en la cuenta de
aplicación.

## Prerrequisitos

* SQL básico (`SELECT`, `INSERT`, `WHERE`) y sintaxis básica de MongoDB (`find`, `insertOne`).
* Principios CIA y privilegio mínimo — ver [1. Principios de seguridad e inyección](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/).
* Docker (`docker --version` debe responder correctamente).

## Entorno

```bash
docker run --name dba-postgres-u2 \
  -e POSTGRES_PASSWORD=<REDACTED> \
  -e POSTGRES_DB=practica \
  -p 5432:5432 \
  -d postgres:16
```

```bash
docker run --name dba-mongo-u2 \
  -p 27017:27017 \
  -d mongo:7 --auth
```

`--name dba-postgres-u2` y `--name dba-mongo-u2` se reutilizan en los
Laboratorios 2 y 3 de esta unidad. `mongo:7 --auth` es la imagen oficial
de MongoDB con control de acceso habilitado desde el inicio.

⚠️ **Advertencia de seguridad.** Nunca uses credenciales, llaves ni datos
personales reales en este ni en ningún laboratorio de la unidad. Usa
siempre valores de ejemplo y datos ficticios.

## Preparación

**1. Verificar Docker y crear ambos contenedores** con los comandos de
arriba.

**2. Conectarse a PostgreSQL y crear la tabla `clientes`** (se reutiliza
en el resto de la unidad):

```bash
docker exec -it dba-postgres-u2 psql -U postgres -d practica
```

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  clave_acceso TEXT
);

INSERT INTO clientes (nombre, clave_acceso) VALUES
  ('usuario_demo', 'clave_demo');
```

**3. Conectarse a MongoDB como administrador** y crear el equivalente:

```bash
docker exec -it dba-mongo-u2 mongosh
```

```javascript
use admin
db.createUser({ user: "admin", pwd: "<REDACTED>", roles: ["root"] })
db.auth("admin", "<REDACTED>")
use practica
db.clientes.insertOne({ nombre: "usuario_demo", clave_acceso: "clave_demo" })
```

> **Por qué `use admin` primero, y por qué `db.auth()` después.**
> `mongosh` conecta por defecto a la base `test`. La excepción de
> localhost de MongoDB (que permite crear el primer usuario sin
> autenticarse todavía) solo autoriza `createUser` cuando se ejecuta
> contra la base `admin`. Sin `use admin`, el comando falla con
> `Unauthorized`. Además, crear el usuario **no autentica automáticamente
> la sesión actual** como ese usuario — la excepción de localhost se
> cierra en cuanto existe el primer usuario, y cualquier operación
> posterior (como el `insertOne` de arriba) exige autenticación
> explícita. Por eso se llama `db.auth("admin", "<REDACTED>")`
> inmediatamente después de crear el usuario, con la misma contraseña.

**Checkpoint.**

```sql
SELECT * FROM clientes;
```

```javascript
db.clientes.find()
```

Ambos deben devolver exactamente un documento/fila con `usuario_demo` /
`clave_demo`. Si alguno está vacío, repite el paso correspondiente antes
de continuar.

## Procedimiento

### Parte A — Inyección SQL: consulta vulnerable contra parametrizada

El profesor demuestra primero. La siguiente construcción **no es SQL
puro**, es pseudocódigo de aplicación:

```text
consulta = "SELECT * FROM clientes WHERE nombre = '" + entrada + "'"
```

**A1.** Entrada válida (`usuario_demo`):

```sql
SELECT * FROM clientes WHERE nombre = 'usuario_demo';
```

**A2.** Entrada maliciosa (`' OR '1'='1`):

```sql
SELECT * FROM clientes WHERE nombre = '' OR '1'='1';
```

**Qué deberías ver:** devuelve la fila existente aunque el nombre no
coincida, porque `'1'='1'` es siempre verdadera.

**A3.** Reescrita como consulta parametrizada:

```sql
PREPARE consulta_segura (text) AS
  SELECT * FROM clientes WHERE nombre = $1;

EXECUTE consulta_segura('usuario_demo');
EXECUTE consulta_segura('%'' OR ''1''=''1');
```

**Qué deberías ver:** el segundo `EXECUTE` devuelve **0 filas**. El motor
buscó literalmente un nombre igual a la cadena completa
`' OR '1'='1`, que no existe.

### Parte B — Inyección NoSQL: el mismo problema en MongoDB

```javascript
db.clientes.findOne({ nombre: "usuario_demo", clave_acceso: { $ne: null } })
```

**Qué deberías ver:** devuelve el documento completo **sin conocer**
`clave_demo`, porque `$ne: null` es verdadero para cualquier valor que
exista. Es la misma familia de vulnerabilidad que en A2, en otro motor.

**B1.** Mitigada con tipado forzado:

```javascript
const entrada_clave = { "$ne": null }   // simula el JSON malicioso que llegaría del cliente
const clave = String(entrada_clave)
db.clientes.findOne({ nombre: "usuario_demo", clave_acceso: clave })
```

**Qué deberías ver:** `String({"$ne": null})` produce el texto
`"[object Object]"`, no el operador `$ne`. La consulta devuelve `null`,
cero resultados: el objeto ya no puede colarse como operador.

### Parte C — Las otras tres técnicas de prevención

**C1. ORM con escape automático, correcto e incorrecto:**

```python
# vulnerable, aunque esté "dentro" de un ORM
session.execute(f"SELECT * FROM clientes WHERE nombre = '{entrada_nombre}'")

# seguro, el ORM parametriza por debajo
session.query(Cliente).filter(Cliente.nombre == entrada_nombre)
```

**C2. Validación y tipado de entradas**, ya demostrado en el Paso B1.

**C3. Privilegio mínimo en la cuenta de aplicación:**

```sql
CREATE ROLE app_usuario WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT, INSERT, UPDATE ON clientes TO app_usuario;
```

```bash
docker exec -it dba-postgres-u2 psql -U app_usuario -d practica
```

```sql
DROP TABLE clientes;   -- debe fallar
```

**Qué deberías ver:** `DROP TABLE` falla con
`must be owner of table clientes`. Aunque una inyección lograra
ejecutarse contra `app_usuario`, el daño queda acotado a lo que ese rol
puede hacer.

## Verificación

| Verificación | Resultado esperado |
| --- | --- |
| SQL concatenada, entrada válida | Devuelve `usuario_demo` |
| SQL concatenada, entrada maliciosa | Devuelve la fila existente (vulnerable) |
| SQL parametrizada, misma entrada maliciosa | 0 filas (no vulnerable) |
| NoSQL, `{ $ne: null }` sin tipar | Devuelve el documento sin conocer la clave (vulnerable) |
| NoSQL, con `String()` | 0 resultados (no vulnerable) |
| `app_usuario` ejecuta `DROP TABLE` | Falla por permisos |

Si tus resultados no coinciden con esta tabla, no continúes a la
documentación de evidencia, revisa la parte correspondiente antes.

## Problemas frecuentes

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| El nombre `dba-postgres-u2` o `dba-mongo-u2` ya está en uso | Un contenedor previo no se eliminó | `docker ps -a` | `docker rm -f <nombre>` y repite la creación |
| `psql: error: connection refused` | El contenedor aún está iniciando, o el puerto está ocupado | `docker ps` | Reintentar. Revisar el mapeo `-p` si el puerto está ocupado |
| La consulta concatenada del A2 devuelve 0 filas | Cadena maliciosa mal escrita | Comparar carácter por carácter contra `' OR '1'='1` | Reescribir exactamente la cadena indicada |
| `$ne` no produce el bypass esperado | Se conectó ya autenticado con `--auth` sin repetir la consulta en `practica` | `use practica` antes de la consulta | Repetir `use practica` en la sesión de `mongosh` |
| No recuerdas cómo salir | — | — | `\q` en psql, `exit` en mongosh |

## Evidencia mínima

1. Consulta SQL concatenada con entrada maliciosa y su resultado (A2)
2. Consulta SQL parametrizada con la misma entrada y su resultado (A3)
3. Consulta NoSQL vulnerable con `$ne` y su resultado (Parte B)
4. Consulta NoSQL mitigada con `String()` y su resultado (B1)
5. Intento de `DROP TABLE` como `app_usuario` y el error de permisos obtenido (C3)
6. Explicación, en tus propias palabras, de por qué cada versión mitigada no es vulnerable

## Reflexión

* ¿Por qué la entrada maliciosa cambia el significado de la consulta solo en las versiones vulnerables, en ambos motores?
* ¿Qué tienen en común el ataque SQL con `OR '1'='1'` y el ataque NoSQL con `$ne: null`, a pesar de ser sintaxis completamente distinta?
* ¿Qué principio de privilegio mínimo seguiría siendo necesario aunque la inyección no existiera como problema?

## Limpieza

No elimines los contenedores todavía, se reutilizan en el Laboratorio 2 y el Laboratorio 3.

```bash
docker stop dba-postgres-u2 dba-mongo-u2
docker start dba-postgres-u2 dba-mongo-u2
```

Elimínalos definitivamente solo al cerrar el Laboratorio 3:

```bash
docker rm -f dba-postgres-u2 dba-mongo-u2
```

## Relación con la actividad de la unidad

Este laboratorio es la ejecución técnica de la
[Actividad 2](/materias/dba/unidad-02/actividades/actividad-2/).
