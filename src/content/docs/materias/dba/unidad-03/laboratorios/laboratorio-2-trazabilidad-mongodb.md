---
title: "LAB-02 — Trazabilidad en MongoDB Community"
description: "Unidad 3 de DBA — perfilador, bitácora de mongod, correlación por conexión, instantáneas de privilegios y límites reales de MongoDB Community."
---

**Materia:** Gestión de Seguridad y Desempeño de Bases de Datos
**Unidad:** III — Auditoría, trazabilidad y gobierno práctico de datos
**Temas:** 3.1 Auditoría de bases de datos · 3.2 Bitácoras y trazabilidad
**Motor:** MongoDB 7 Community Edition, con cualquier forma de despliegue (instalación nativa, máquina virtual o contenedor)
**Modalidad:** Práctica individual
**Duración estimada:** 3 horas
**Tipo:** Laboratorio técnico

---

## 1. Contexto

**Comercializadora Norte S.A. de C.V.** también mantiene una copia de sus clientes en MongoDB, en la base `comercial`, para el catálogo de su tienda en línea. En la Unidad II habilitaste autenticación y roles en ese servidor.

Ahora surge la misma pregunta del LAB-01, en otro motor:

> El RFC de un cliente cambió en MongoDB. ¿Quién lo cambió, cuándo y desde dónde?

Sería natural buscar una función de auditoría equivalente a `pgaudit`. MongoDB sí ofrece auditoría nativa, pero **solo en MongoDB Enterprise y en MongoDB Atlas** (clústeres M10 o superiores). **No está disponible en MongoDB Community Edition** (REF-U3-04), que es la edición que usa esta materia.

Este laboratorio trabaja con lo que **sí existe** en Community:

* el **perfilador de base de datos** (*Database Profiler*), que registra operaciones en la colección `system.profile` (REF-U3-05);
* la **bitácora del servidor** (*log messages*) de `mongod`, que registra conexiones, autenticaciones y eventos del servidor (REF-U3-06).

Y documenta con precisión lo que **no** puede hacerse.

> **Regla del laboratorio:** no se simula una función que no existe. Si una pregunta no puede responderse con la edición Community, la respuesta correcta es **"No hay evidencia con esta edición"**, seguida de la explicación técnica.

---

## 2. Objetivo

Configurar e interpretar los mecanismos de trazabilidad disponibles en MongoDB Community, identificar qué eventos auditables cubren y cuáles no, y explicar qué añadiría la auditoría nativa de las ediciones Enterprise y Atlas.

---

## 3. Resultados de aprendizaje

Al finalizar el laboratorio, serás capaz de:

1. Explicar la diferencia entre auditoría nativa y perfilador.
2. Verificar la edición y la configuración de arranque de un servidor desde `mongosh`.
3. Consultar y cambiar el nivel de perfilado de una base de datos, de forma temporal y de forma persistente.
4. Interpretar documentos de `system.profile`: operación, colección, usuario, cliente, aplicación y momento.
5. Reducir el volumen del perfilado mediante un filtro.
6. Consultar e interpretar la bitácora JSON de `mongod` desde el propio servidor.
7. Correlacionar un evento con la conexión que lo produjo.
8. Aplicar un control compensatorio para cambios de privilegios y explicar por qué no equivale a auditoría.
9. Comparar la trazabilidad disponible en PostgreSQL, MongoDB Community y MongoDB Enterprise/Atlas.

---

## 4. Conceptos y definiciones

### 4.1 Auditoría nativa de MongoDB (*native auditing*)

Función de MongoDB Enterprise y Atlas que registra eventos de seguridad. Según la documentación oficial puede registrar (REF-U3-04):

* cambios de esquema (DDL);
* eventos de conjuntos de réplicas y clústeres fragmentados;
* autenticación y autorización;
* operaciones CRUD (requiere `auditAuthorizationSuccess: true`).

Los eventos pueden enviarse a la consola, a *syslog*, a un archivo JSON o a un archivo BSON (`--auditDestination`). **No existe en Community Edition.**

### 4.2 Perfilador (*Database Profiler*)

Mecanismo de Community que registra información de las operaciones ejecutadas en una base de datos, dentro de la colección `system.profile` de esa misma base (REF-U3-05).

| Nivel | Comportamiento |
| --- | --- |
| `0` | Apagado. Valor por defecto |
| `1` | Registra operaciones más lentas que `slowms` (100 ms por defecto) o que cumplan un filtro |
| `2` | Registra **todas** las operaciones |

El perfilador fue diseñado para **analizar desempeño**, no para auditoría de seguridad. La documentación advierte que puede degradar el rendimiento, en especial en nivel 2, y que consume espacio en disco (REF-U3-05).

Se puede activar de dos formas:

| Forma | Alcance | Persiste tras reiniciar |
| --- | --- | --- |
| `db.setProfilingLevel()` desde `mongosh` | La base activa | No |
| `operationProfiling.mode` en el archivo de configuración de `mongod` (o la opción `--profile`) | Todas las bases | Sí |

### 4.3 `system.profile`

Colección **limitada** (*capped collection*) con tamaño por defecto de **1 MB** (REF-U3-05). Cuando se llena, los documentos más antiguos se sobrescriben.

```text
documento 1 → documento 2 → ... → documento N → (lleno) → se sobrescribe el documento 1
```

La evidencia **desaparece sola** sin que nadie la borre.

### 4.4 Campos del perfilador

Campos documentados oficialmente que usarás (REF-U3-16):

| Campo | Contenido |
| --- | --- |
| `op` | Tipo de operación: `query`, `insert`, `update`, `remove`, `command`, entre otros |
| `ns` | Espacio de nombres `base.coleccion` |
| `command` | Comando completo de la operación |
| `nreturned`, `nModified`, `ndeleted` | Documentos devueltos, modificados o eliminados |
| `millis` | Duración en milisegundos |
| `ts` | Momento de la operación |
| `client` | IP o nombre del cliente |
| `appName` | Identificador de la aplicación (opción `appName` de la cadena de conexión) |
| `user` | Usuario autenticado que ejecutó la operación |

### 4.5 Bitácora de `mongod`

A partir de MongoDB 4.4, cada línea de la bitácora es un documento JSON (REF-U3-06):

| Campo | Significado |
| --- | --- |
| `t` | Fecha y hora |
| `s` | Severidad (`I` información, `W` advertencia, `E` error, `F` fatal) |
| `c` | Componente: `NETWORK`, `ACCESS`, `COMMAND`, `STORAGE`, entre otros |
| `id` | Identificador numérico del tipo de mensaje |
| `ctx` | Contexto: hilo o conexión que produjo el mensaje (por ejemplo, `conn12`) |
| `msg` | Mensaje |
| `attr` | Atributos adicionales |

**¿Dónde queda?** Lo decide la opción `systemLog` del servidor (REF-U3-21): con `systemLog.destination: file`, en el archivo de `systemLog.path`; si no se configura, en la salida estándar del proceso. Los paquetes de Linux y los instaladores suelen configurar un archivo; un contenedor suele usar la salida estándar.

**Desde `mongosh`**, sin importar el despliegue, el comando `getLog` devuelve los **1024 eventos más recientes** que el servidor mantiene en memoria (REF-U3-20). Es útil para consultar e interpretar; **no sustituye** al archivo de bitácora, porque esa memoria se vacía al reiniciar y solo guarda lo reciente.

### 4.6 Control compensatorio

Medida que reduce un riesgo cuando el control preferido no está disponible. **No sustituye** al control original y debe documentarse como tal. En este laboratorio aplicarás uno: **instantáneas periódicas de privilegios**.

---

## 5. Escenario

| Actor | Usuario MongoDB | Rol |
| --- | --- | --- |
| DBA | `admin` (base `admin`) | `root` |
| Tienda en línea | `app_ventas` (base `comercial`) | `readWrite` en `comercial` |

El área de facturación reporta que el RFC de **María García** (`_id: 3`) cambió en la colección `comercial.clientes`. Preguntas de Dirección:

1. ¿Quién hizo el cambio?
2. ¿Cuándo y desde qué aplicación?
3. ¿Qué valor tenía antes?
4. ¿Cambió alguien los privilegios de `app_ventas` recientemente?

---

## 6. Preparación del entorno

### 6.1 Requisitos

* Un servidor **MongoDB 7 Community** con **control de acceso habilitado** (`security.authorization: enabled`, como en la Unidad II). El **Anexo A** resume cómo obtenerlo y habilitarlo en cada despliegue.
* El cliente `mongosh`.

> **Contraseñas de práctica.** Son exclusivas de este laboratorio. Sustitúyelas por `<REDACTED>` en las evidencias.

### 6.2 Dos tipos de sesión

| Sesión | Cadena de conexión |
| --- | --- |
| **Sesión del DBA** | `mongosh "mongodb://admin:Admin_Practica_2026@127.0.0.1:27017/comercial?authSource=admin"` |
| **Sesión de la aplicación** | `mongosh "mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web"` |

| Parte | Significado |
| --- | --- |
| `mongodb://` | Protocolo de MongoDB |
| `usuario:contraseña@` | Credenciales |
| `127.0.0.1:27017` | Servidor y puerto. Sustitúyelo si tu servidor está en otro equipo |
| `/comercial` | Base de datos de trabajo |
| `?authSource=admin` | Base donde está definido el usuario (el administrador se creó en `admin`) |
| `?appName=app-ventas-web` | Nombre de la aplicación. Aparece como `appName` en el perfilador y en la bitácora |

Para ejecutar una sola instrucción y terminar, agrega `--quiet --eval '...'`. Usa **comillas simples** alrededor del código: dentro de comillas dobles, la terminal interpreta `$set` como una variable vacía.

> Escribir la contraseña en la cadena es aceptable solo en este entorno de práctica. En producción, las credenciales provienen de un gestor de secretos (Unidad II).

### 6.3 Crear los usuarios y los datos

Con el control de acceso habilitado y **sin usuarios**, MongoDB permite crear el primer usuario solo desde una conexión local (excepción de *localhost*). Abre `mongosh` sin credenciales en el equipo del servidor y respeta el orden de la Unidad II: `use admin`, `createUser` y `db.auth`:

```javascript
use admin
db.createUser({ user: "admin", pwd: "Admin_Practica_2026", roles: ["root"] })
db.auth("admin", "Admin_Practica_2026")

use comercial
db.createUser({
  user: "app_ventas",
  pwd: "Ventas_Practica_2026",
  roles: [{ role: "readWrite", db: "comercial" }]
})

db.clientes.insertMany([
  { _id: 1, nombre: "Ana López", correo: "ana.lopez@example.test", telefono: "6671234567", rfc: "LOAA850315ABC", edad: 41, ciudad: "Culiacán", codigo_postal: "80000" },
  { _id: 2, nombre: "Carlos Pérez", correo: "carlos.perez@example.test", telefono: "6672345678", rfc: "PECA900720DEF", edad: 35, ciudad: "Culiacán", codigo_postal: "80100" },
  { _id: 3, nombre: "María García", correo: "maria.garcia@example.test", telefono: "6673456789", rfc: "GAMA780912GHI", edad: 47, ciudad: "Mazatlán", codigo_postal: "82000" },
  { _id: 4, nombre: "Luis Torres", correo: "luis.torres@example.test", telefono: "6674567890", rfc: "TOLU920201JKL", edad: 34, ciudad: "Los Mochis", codigo_postal: "81200" },
  { _id: 5, nombre: "Laura Sánchez", correo: "laura.sanchez@example.test", telefono: "6675678901", rfc: "SALA880525MNO", edad: 38, ciudad: "Culiacán", codigo_postal: "80200" }
])
```

Sal con `exit`. A partir de aquí usa las cadenas de la sección 6.2.

### 6.4 Función auxiliar para leer la bitácora

En cada **sesión del DBA**, define esta función una vez:

```javascript
function bitacora() {
  return db.adminCommand({ getLog: "global" }).log.map(l => JSON.parse(l))
}
```

| Parte | Qué hace |
| --- | --- |
| `db.adminCommand({ getLog: "global" })` | Pide al servidor sus eventos recientes |
| `.log` | Arreglo de líneas, cada una un texto JSON |
| `.map(l => JSON.parse(l))` | Convierte cada línea en un objeto, para poder filtrar por sus campos |

Ejemplos de uso:

```javascript
bitacora().length                                        // cuántos eventos hay en memoria
bitacora().filter(e => e.c === "ACCESS").slice(-5)       // últimos 5 eventos de acceso
bitacora().filter(e => JSON.stringify(e).includes("texto"))  // eventos que contienen un texto
```

---

## 7. Actividad 1 — Lo que **no** existe en esta edición

En la sesión del DBA:

```javascript
db.version()
db.adminCommand({ buildInfo: 1 }).modules
db.serverCmdLineOpts().parsed
```

Resultado observado:

```text
7.0.43
[]
{ net: { bindIp: '*' }, security: { authorization: 'enabled' } }
```

* `modules` aparece vacío. En Enterprise incluiría `"enterprise"`.
* `serverCmdLineOpts().parsed` muestra con qué configuración arrancó el servidor, venga de un archivo o de opciones de línea de comandos. Aquí confirma que la autorización está habilitada. En tu despliegue verás además la ruta del archivo de configuración y, si existe, `systemLog`.

#### Preguntas

1. ¿Qué edición de MongoDB estás usando? ¿Qué evidencia lo demuestra?
2. ¿A dónde escribe tu servidor su bitácora? ¿Cómo lo sabes?
3. Según REF-U3-04, ¿qué cuatro categorías de eventos registraría la auditoría nativa?
4. ¿Qué tendría que evaluar una organización antes de licenciar Enterprise o migrar a Atlas solo para obtener auditoría?

Guarda `evidencias/01-edicion-y-limitacion.md`.

---

## 8. Actividad 2 — El incidente sin perfilado

En la sesión del DBA:

```javascript
db.getProfilingStatus()
```

```text
{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }
```

`was: 0` indica que el perfilador está apagado. La aplicación modifica el RFC:

```bash
mongosh "mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web" --quiet --eval 'db.clientes.updateOne({ _id: 3 }, { $set: { rfc: "GAMA780912XXX" } })'
```

```text
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

Busca evidencia:

```javascript
db.system.profile.countDocuments()
bitacora().filter(e => JSON.stringify(e).includes("GAMA780912XXX")).length
bitacora().filter(e => JSON.stringify(e).includes("app-ventas-web")).map(e => ({ t: e.t, c: e.c, ctx: e.ctx, msg: e.msg }))
```

Resultado observado:

```text
0
0
[
  { t: { '$date': '2026-10-25T22:52:34.643+00:00' }, c: 'NETWORK', ctx: 'conn8', msg: 'client metadata' },
  { t: { '$date': '2026-10-25T22:52:34.643+00:00' }, c: 'ACCESS', ctx: 'conn8', msg: 'Connection not authenticating' },
  { t: { '$date': '2026-10-25T22:52:34.650+00:00' }, c: 'NETWORK', ctx: 'conn9', msg: 'client metadata' },
  { t: { '$date': '2026-10-25T22:52:34.661+00:00' }, c: 'ACCESS', ctx: 'conn9', msg: 'Successfully authenticated' },
  ...
]
```

La bitácora muestra que la aplicación **se conectó y se autenticó**, pero no hay rastro de la operación.

#### Preguntas

1. ¿Puedes demostrar qué cambió? ¿Y quién se conectó a esa hora?
2. ¿Por qué `mongosh` abre varias conexiones (`conn8`, `conn9`, ...) para una sola instrucción? ¿Cuál es la que se autentica?

Guarda `evidencias/02-incidente-sin-perfilado.md`.

---

## 9. Actividad 3 — Activar el perfilador y registrar operaciones

En la sesión del DBA, activa el nivel 2 en la base `comercial`:

```javascript
db.setProfilingLevel(2)
db.getProfilingStatus()
```

```text
{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }
{ was: 2, slowms: 100, sampleRate: 1, ok: 1 }
```

> `setProfilingLevel` devuelve en `was` el nivel **anterior** al cambio. Por eso la segunda llamada muestra el nivel vigente.

La aplicación ejecuta una consulta, una actualización y una eliminación:

```bash
mongosh "mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web" --quiet --eval 'db.clientes.find({ ciudad: "Culiacán" }, { nombre: 1, ciudad: 1 }).toArray(); db.clientes.updateOne({ _id: 3 }, { $set: { rfc: "GAMA780912XYZ" } }); db.clientes.deleteOne({ _id: 2 });'
```

Consulta el perfilador:

```javascript
db.system.profile.find(
  { ns: "comercial.clientes" },
  { op: 1, ns: 1, command: 1, user: 1, client: 1, appName: 1, ts: 1, millis: 1, nreturned: 1, docsExamined: 1, nModified: 1, ndeleted: 1 }
).sort({ ts: 1 })
```

Resultado observado (resumido):

```text
[
  {
    op: 'query',
    ns: 'comercial.clientes',
    command: { find: 'clientes', filter: { ciudad: 'Culiacán' }, projection: { nombre: 1, ciudad: 1 }, ... },
    docsExamined: 5,
    nreturned: 3,
    millis: 0,
    ts: ISODate('2026-10-25T22:52:45.906Z'),
    client: '127.0.0.1',
    appName: 'app-ventas-web',
    user: 'app_ventas@comercial'
  },
  {
    op: 'update',
    ns: 'comercial.clientes',
    command: { q: { _id: 3 }, u: { '$set': { rfc: 'GAMA780912XYZ' } }, multi: false, upsert: false },
    docsExamined: 1,
    nModified: 1,
    millis: 0,
    ts: ISODate('2026-10-25T22:52:45.909Z'),
    client: '127.0.0.1',
    appName: 'app-ventas-web',
    user: 'app_ventas@comercial'
  },
  {
    op: 'remove',
    ns: 'comercial.clientes',
    command: { q: { _id: 2 }, limit: 1 },
    docsExamined: 1,
    ndeleted: 1,
    millis: 0,
    ts: ISODate('2026-10-25T22:52:45.915Z'),
    client: '127.0.0.1',
    appName: 'app-ventas-web',
    user: 'app_ventas@comercial'
  }
]
```

### 9.1 Interpretar los documentos

| # | `op` | Usuario | Cliente | Aplicación | Momento | Qué hizo | Documentos afectados |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `query` | | | | | | |
| 2 | `update` | | | | | | |
| 3 | `remove` | | | | | | |

#### Preguntas

1. ¿Puedes saber cuál era el RFC **antes** del cambio con la información de `system.profile`?
2. ¿Puedes saber qué datos tenía el documento eliminado?
3. A diferencia de `log_statement = 'mod'` en PostgreSQL, el nivel 2 sí registró la consulta. ¿Qué ventaja y qué riesgo tiene eso?
4. ¿Por qué el campo `user` incluye `@comercial`?

Guarda `evidencias/03-perfilador.md`.

---

## 10. Actividad 4 — Reducir el volumen con un filtro

El nivel 2 registra todo. Para conservar solo las modificaciones, aplica un filtro (REF-U3-05):

```javascript
db.setProfilingLevel(0)
db.system.profile.drop()
db.setProfilingLevel(1, { filter: { op: { $in: ["insert", "update", "remove"] } } })
db.getProfilingStatus()
```

> **Antes de borrar `system.profile`, exporta lo que necesites como evidencia** (Actividad 8). Si no lo hiciste, repite la Actividad 3 después de esta.

Resultado observado:

```text
{
  was: 1,
  slowms: 100,
  sampleRate: 1,
  filter: { op: { '$in': [ 'insert', 'remove', 'update' ] } },
  note: 'When a filter expression is set, slowms and sampleRate are not used for profiling and slow-query log lines.',
  ok: 1
}
```

La aplicación ejecuta una consulta y una actualización:

```bash
mongosh "mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web" --quiet --eval 'db.clientes.find({ _id: 1 }).toArray(); db.clientes.updateOne({ _id: 1 }, { $set: { telefono: "6670000000" } })'
```

```javascript
db.system.profile.find({}, { op: 1, ns: 1, user: 1, appName: 1, "command.q": 1, "command.u": 1, ts: 1 })
```

```text
[
  {
    op: 'update',
    ns: 'comercial.clientes',
    command: { q: { _id: 1 }, u: { '$set': { telefono: '6670000000' } } },
    ts: ISODate('2026-10-25T22:52:57.394Z'),
    appName: 'app-ventas-web',
    user: 'app_ventas@comercial'
  }
]
```

Solo aparece la operación `update`.

#### Preguntas

1. ¿Qué perdiste de evidencia al aplicar el filtro? ¿Qué ganaste?
2. ¿Qué filtro usarías si solo interesaran operaciones sobre la colección `clientes`?

Guarda `evidencias/04-filtro.md`.

---

## 11. Actividad 5 — Accesos en la bitácora de `mongod`

Genera dos intentos fallidos:

```bash
mongosh "mongodb://app_ventas:incorrecta@127.0.0.1:27017/comercial" --quiet --eval "db.clientes.countDocuments()"
mongosh "mongodb://usuario_inexistente:x@127.0.0.1:27017/comercial" --quiet --eval "db.clientes.countDocuments()"
```

```text
MongoServerError: Authentication failed.
MongoServerError: Authentication failed.
```

En la sesión del DBA, filtra los eventos de acceso:

```javascript
bitacora()
  .filter(e => e.c === "ACCESS" && e.msg === "Failed to authenticate")
  .map(e => ({ t: e.t, id: e.id, ctx: e.ctx, user: e.attr.user, client: e.attr.client, error: e.attr.error, result: e.attr.result, app: e.attr.doc.application.name }))
```

Resultado observado:

```text
[
  {
    t: { '$date': '2026-10-25T22:52:58.122+00:00' },
    id: 5286307, ctx: 'conn41', user: 'app_ventas', client: '127.0.0.1:37276',
    error: 'AuthenticationFailed: SCRAM authentication failed, storedKey mismatch',
    result: 18, app: 'mongosh 2.10.0'
  },
  {
    t: { '$date': '2026-10-25T22:52:58.453+00:00' },
    id: 5286307, ctx: 'conn43', user: 'usuario_inexistente', client: '127.0.0.1:37296',
    error: 'UserNotFound: Could not find user "usuario_inexistente" for db "comercial"',
    result: 11, app: 'mongosh 2.10.0'
  },
  ...
]
```

Y el último acceso exitoso de la aplicación:

```javascript
bitacora()
  .filter(e => e.msg === "Successfully authenticated" && e.attr.user === "app_ventas")
  .slice(-1)
  .map(e => ({ t: e.t, id: e.id, ctx: e.ctx, client: e.attr.client, result: e.attr.result, app: e.attr.doc.application.name }))
```

```text
[
  {
    t: { '$date': '2026-10-25T22:52:57.394+00:00' },
    id: 5286306, ctx: 'conn35', client: '127.0.0.1:37234', result: 0, app: 'app-ventas-web'
  }
]
```

> Por un mismo intento fallido pueden aparecer varias líneas `Failed to authenticate` (en la verificación, el usuario inexistente produjo dos: una con `isSpeculative: true` y otra con `false`). Cuenta **intentos**, no líneas.

#### Preguntas

1. ¿Qué campo distingue un acceso fallido de uno exitoso?
2. ¿Qué diferencia hay entre el error de contraseña incorrecta y el de usuario inexistente? ¿Por qué el cliente recibe el mismo mensaje en ambos casos?
3. ¿Por qué el nombre de la aplicación del intento fallido es `mongosh 2.10.0` y no `app-ventas-web`?

Guarda `evidencias/05-accesos-mongod.md`.

---

## 12. Actividad 6 — Correlacionar un cambio de configuración con su autor

```javascript
bitacora()
  .filter(e => e.msg === "Profiler settings changed")
  .map(e => ({ t: e.t, ctx: e.ctx, msg: e.msg, attr: e.attr }))
```

Resultado observado (resumido, último evento):

```text
{
  t: { '$date': '2026-10-25T22:52:56.999+00:00' },
  ctx: 'conn31',
  msg: 'Profiler settings changed',
  attr: {
    from: { level: 0, slowms: 100, sampleRate: 1 },
    to: { level: 1, slowms: 100, sampleRate: 1, filter: { op: { '$in': [ 'insert', 'remove', 'update' ] } } },
    db: 'comercial'
  }
}
```

La línea **no** incluye el usuario. Sí incluye el contexto `ctx` (la conexión). Busca la autenticación de esa misma conexión (sustituye `conn31` por el tuyo):

```javascript
bitacora()
  .filter(e => e.ctx === "conn31" && e.msg === "Successfully authenticated")
  .map(e => ({ t: e.t, ctx: e.ctx, user: e.attr.user, db: e.attr.db, client: e.attr.client }))
```

```text
[
  {
    t: { '$date': '2026-10-25T22:52:56.959+00:00' },
    ctx: 'conn31', user: 'admin', db: 'admin', client: '127.0.0.1:37200'
  }
]
```

#### Preguntas

1. ¿Qué usuario cambió la configuración del perfilador? ¿Qué dos eventos lo demuestran?
2. ¿Qué condición debe cumplirse para que esta correlación sea válida? (Piensa en qué pasa si el servidor se reinicia y los números de conexión vuelven a empezar.)
3. ¿Por qué es relevante que quede registrado un cambio de configuración del propio mecanismo de registro?

Guarda `evidencias/06-correlacion.md`.

---

## 13. Actividad 7 — Cambios de privilegios: el límite más importante

En la sesión del DBA, toma una **instantánea** de los privilegios actuales:

```javascript
db.getSiblingDB("auditoria").instantaneas_privilegios.insertOne({
  momento: new Date(),
  tomada_por: db.runCommand({ connectionStatus: 1 }).authInfo.authenticatedUsers,
  usuarios: db.getUsers().users.map(u => ({ user: u.user, db: u.db, roles: u.roles }))
})
```

Activa el nivel 2 y otorga un rol adicional a la aplicación:

```javascript
db.setProfilingLevel(2)
db.grantRolesToUser("app_ventas", [{ role: "dbAdmin", db: "comercial" }])
```

Busca evidencia del cambio:

```javascript
db.system.profile.countDocuments({ "command.grantRolesToUser": { $exists: true } })
bitacora().filter(e => JSON.stringify(e).includes("grantRoles")).length
```

```text
0
0
```

No hay evidencia en ninguna de las dos fuentes.

Toma una segunda instantánea (repite el `insertOne`) y compáralas:

```javascript
db.getSiblingDB("auditoria").instantaneas_privilegios.find({}, { _id: 0 }).sort({ momento: 1 })
```

Resultado observado:

```text
[
  {
    momento: ISODate('2026-10-25T22:53:12.105Z'),
    tomada_por: [ { user: 'admin', db: 'admin' } ],
    usuarios: [
      { user: 'app_ventas', db: 'comercial', roles: [ { role: 'readWrite', db: 'comercial' } ] }
    ]
  },
  {
    momento: ISODate('2026-10-25T22:53:12.220Z'),
    tomada_por: [ { user: 'admin', db: 'admin' } ],
    usuarios: [
      { user: 'app_ventas', db: 'comercial', roles: [ { role: 'dbAdmin', db: 'comercial' }, { role: 'readWrite', db: 'comercial' } ] }
    ]
  }
]
```

| Pregunta | ¿La instantánea responde? |
| --- | --- |
| ¿Cambiaron los privilegios de `app_ventas`? | Sí |
| ¿Qué rol se agregó? | Sí |
| ¿Quién lo agregó? | **No** |
| ¿Cuándo exactamente? | **No**, solo que ocurrió entre dos instantáneas |

Revoca el rol y restablece el filtro de la Actividad 4:

```javascript
db.revokeRolesFromUser("app_ventas", [{ role: "dbAdmin", db: "comercial" }])
db.setProfilingLevel(1, { filter: { op: { $in: ["insert", "update", "remove"] } } })
```

#### Preguntas

1. ¿Por qué un cambio de privilegios es uno de los eventos auditables más importantes?
2. ¿Con qué frecuencia tomarías instantáneas? ¿Qué factores influyen?
3. ¿Quién debería poder escribir en `auditoria.instantaneas_privilegios`?
4. Redacta en tres líneas cómo comunicarías esta limitación a Dirección.

Guarda `evidencias/07-privilegios-control-compensatorio.md`.

---

## 14. Actividad 8 — Conservación: exportar antes de perder

### 14.1 El nivel del perfilador no sobrevive al reinicio

Reinicia el servicio con el comando de tu despliegue (Anexo A, tabla A.1). En una nueva sesión del DBA:

```javascript
db.getProfilingStatus()
db.system.profile.countDocuments()
```

```text
{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }
2
```

El **nivel** volvió a `0`, aunque los documentos ya registrados siguen en `system.profile`. Comprueba también que `bitacora().length` es menor que antes: la memoria de `getLog` se vació.

Para que el perfilado y la bitácora sean permanentes, se configuran en el **archivo de configuración** de `mongod` (REF-U3-21). Fragmento verificado:

```yaml
security:
  authorization: enabled
systemLog:
  destination: file
  path: <ruta del archivo de bitácora>
  logAppend: true
operationProfiling:
  mode: all
```

| Opción | Efecto |
| --- | --- |
| `systemLog.destination: file` y `systemLog.path` | La bitácora se escribe en ese archivo y sobrevive a los reinicios |
| `systemLog.logAppend: true` | Al reiniciar, agrega al final del archivo en lugar de reemplazarlo |
| `operationProfiling.mode` | `off`, `slowOp` o `all`. Equivale a los niveles 0, 1 y 2, para todas las bases |

Con esa configuración, en la verificación, `db.getProfilingStatus()` devolvió `was: 2` desde el arranque y `db.serverCmdLineOpts().parsed` mostró las tres secciones. **No es obligatorio aplicarla en este laboratorio**: si lo haces, documenta qué archivo cambiaste y considera el costo de desempeño del modo `all`.

### 14.2 Exportar `system.profile`

Desde la carpeta `LAB-02/` de tu repositorio:

```bash
mongosh "mongodb://admin:Admin_Practica_2026@127.0.0.1:27017/comercial?authSource=admin" --quiet --eval 'EJSON.stringify(db.system.profile.find({}, { op: 1, ns: 1, user: 1, client: 1, appName: 1, ts: 1, "command.q": 1, "command.u": 1 }).toArray(), null, 2)' > evidencias/system-profile.json
```

Fragmento observado:

```json
[
  {
    "op": "update",
    "ns": "comercial.clientes",
    "command": { "q": { "_id": 1 }, "u": { "$set": { "telefono": "6670000000" } } },
    "ts": { "$date": "2026-10-25T22:52:57.394Z" },
    "client": "127.0.0.1",
    "appName": "app-ventas-web",
    "user": "app_ventas@comercial"
  }
]
```

### 14.3 Exportar la bitácora

Exporta **antes** de reiniciar, o la memoria de `getLog` se habrá vaciado:

```bash
mongosh "mongodb://admin:Admin_Practica_2026@127.0.0.1:27017/comercial?authSource=admin" --quiet --eval 'db.adminCommand({ getLog: "global" }).log.join("\n")' > evidencias/bitacora-mongod.log
```

Si tu servidor escribe en un archivo (`systemLog.path`), copia también ese archivo: contiene la historia completa, no solo los últimos 1024 eventos.

Calcula el hash SHA-256 de cada archivo exportado (LAB-01, Actividad 16) y guárdalos en `evidencias/hashes.sha256`.

#### Preguntas

1. Menciona tres formas en que la evidencia del perfilador o de la bitácora puede perderse sin que nadie la borre deliberadamente.
2. ¿Por qué el tamaño de 1 MB de `system.profile` es un problema de conservación y no solo de espacio?
3. ¿Por qué `getLog` sirve para interpretar pero no para conservar?

Guarda `evidencias/08-conservacion.md`.

---

## 15. Actividad 9 — Comparar los tres escenarios

Completa con lo observado en el LAB-01, en este laboratorio y con la documentación de REF-U3-04:

| Evento auditable | PostgreSQL (bitácora + disparador) | MongoDB Community (perfilador + bitácora) | MongoDB Enterprise/Atlas (auditoría nativa) |
| --- | --- | --- | --- |
| Acceso exitoso | | | |
| Acceso fallido | | | |
| Cambio de privilegios | | | |
| Cambio de estructura | | | |
| Modificación de datos | | | |
| Valor anterior del dato | | | |
| Lectura de datos sensibles | | | |
| Cambio de configuración del registro | | | |

Usa **Sí** (observado), **Parcial** (explica) o **No**. Para Enterprise/Atlas escribe **"Documentado, no practicado"** cuando corresponda.

Guarda `evidencias/09-comparacion.md`.

---

## 16. Actividad 10 — Responder a Dirección

Responde las cuatro preguntas de la sección 5 **solo con la evidencia de este laboratorio**:

1. ¿Quién cambió el RFC de María García en la Actividad 2? ¿Y en la Actividad 3?
2. ¿Cuándo y desde qué aplicación?
3. ¿Qué valor tenía antes?
4. ¿Cambió alguien los privilegios de `app_ventas`?

Cuando no haya evidencia, escribe **"No hay evidencia con esta edición"** y explica el motivo técnico.

Guarda `evidencias/10-respuesta-direccion.md`.

---

## 17. Verificación final

* [ ] Documentaste que la auditoría nativa no existe en Community, con evidencia de la edición.
* [ ] Identificaste a dónde escribe tu servidor su bitácora.
* [ ] `system.profile` contiene al menos una operación `query`, una `update` y una `remove` de `app_ventas`.
* [ ] Interpretaste usuario, cliente, aplicación y momento de cada operación.
* [ ] Aplicaste un filtro de perfilado y explicaste qué evidencia se pierde.
* [ ] La bitácora muestra un acceso fallido y uno exitoso, interpretados.
* [ ] Correlacionaste un cambio de configuración con su autor mediante `ctx`.
* [ ] Aplicaste y explicaste el control compensatorio de privilegios.
* [ ] Exportaste `system.profile` y la bitácora con su hash.

---

## 18. Evidencias

```text
LAB-02/
├── README.md
├── evidencias/
│   ├── 01-edicion-y-limitacion.md ... 10-respuesta-direccion.md
│   ├── system-profile.json
│   ├── bitacora-mongod.log
│   └── hashes.sha256
├── scripts/
│   └── comandos-mongosh.js
└── informe.md
```

En `README.md` indica cómo desplegaste el servidor (Anexo A) y su versión. Commits sugeridos:

```text
docs: documenta edicion de MongoDB y limitacion de auditoria
feat: configura perfilador de la base comercial
docs: interpreta system.profile y bitacora de mongod
feat: agrega instantaneas de privilegios como control compensatorio
docs: agrega evidencias exportadas, comparacion e informe
```

---

## 19. Informe

1. **Despliegue, edición y limitación.** Cómo desplegaste el servidor, qué no existe en Community y cómo lo verificaste.
2. **Perfilador.** Configuración, interpretación y costo.
3. **Bitácora de `mongod`.** Dónde se escribe, accesos y cambios de configuración.
4. **Privilegios.** Evidencia disponible, control compensatorio y su límite.
5. **Conservación.** Riesgos observados y exportación realizada.
6. **Comparación.** Resumen de la Actividad 9.
7. **Recomendación.** Para una organización que necesite auditar cambios de privilegios en MongoDB, ¿qué recomendarías y por qué? Distingue hechos verificados de supuestos.

---

## 20. Preguntas de reflexión

1. ¿Por qué el perfilador no debe presentarse como un mecanismo de auditoría de seguridad?
2. ¿Por qué el perfilador sí aporta trazabilidad aunque no sea auditoría?
3. ¿Qué riesgo introduce el nivel 2 al registrar filtros de consultas que pueden contener datos personales?
4. ¿Qué diferencia hay entre detectar un cambio y atribuirlo a alguien?
5. ¿Por qué reconocer una limitación técnica es parte del trabajo profesional del DBA?

---

## 21. Evaluación

| Criterio | Porcentaje |
| --- | ---: |
| Documentación correcta de la edición, la configuración y la limitación | 15 % |
| Configuración e interpretación del perfilador | 25 % |
| Interpretación de la bitácora de `mongod` y correlación | 20 % |
| Control compensatorio de privilegios y su límite | 15 % |
| Conservación y exportación de evidencias | 10 % |
| Comparación, respuesta a Dirección e informe | 15 % |
| **Total** | **100 %** |

**Criterio de aprobación técnica:** si el informe afirma que MongoDB Community tiene auditoría nativa, o presenta el perfilador o las instantáneas como equivalentes a ella, el laboratorio **no se aprueba** aunque los comandos se hayan ejecutado correctamente.

---

## 22. Errores frecuentes

#### Error 1 — Buscar `--auditDestination` en Community

Es una opción de Enterprise. En Community no existe.

#### Error 2 — Activar el perfilador en la base equivocada

`db.setProfilingLevel()` se aplica a la base activa. Si lo ejecutas en `admin`, la base `comercial` seguirá sin perfilar.

#### Error 3 — Leer `was` como el nivel actual

`setProfilingLevel` devuelve el nivel anterior.

#### Error 4 — Borrar `system.profile` antes de exportar

La evidencia se pierde de forma irreversible.

#### Error 5 — Asumir que `getLog` es la bitácora completa

Solo contiene los 1024 eventos más recientes y se vacía al reiniciar.

#### Error 6 — Correlacionar `ctx` entre reinicios

Los números de conexión se reinician con el servidor.

#### Error 7 — Usar comillas dobles en `--eval` con operadores `$`

La terminal interpreta `$set` como variable. Usa comillas simples.

---

## 23. Relación con los demás laboratorios

```text
LAB-01  PostgreSQL: bitácora del servidor y auditoría del dato
LAB-02  MongoDB Community: trazabilidad disponible y límites reales   ← estás aquí
LAB-03  Políticas, gobierno y evidencias para auditoría interna
```

En el LAB-03 la limitación documentada aquí aparecerá como un **riesgo aceptado o por resolver** dentro del expediente para auditoría interna.

---

## Anexo A — Particularidades de cada despliegue

Las actividades usan solo `mongosh`. Lo que cambia entre despliegues es cómo se habilita la autorización, dónde está el archivo de configuración y cómo se reinicia el servicio. Consulta la guía oficial de instalación de MongoDB Community para tu plataforma (REF-U3-23). La ruta del archivo de configuración en uso aparece en `db.serverCmdLineOpts().parsed.config`.

### A.1 Habilitar la autorización y reiniciar

| Despliegue | Habilitar `security.authorization` | Reinicio del servicio |
| --- | --- | --- |
| Linux (paquetes oficiales) | Editar el archivo de configuración del servicio (habitualmente `/etc/mongod.conf`) | `sudo systemctl restart mongod` |
| macOS (Homebrew, `mongodb-community@7.0`) | Editar el archivo de configuración que usa el servicio de Homebrew | `brew services restart mongodb-community@7.0` |
| Windows (instalador MSI) | Editar `mongod.cfg` en la carpeta de instalación, como administrador | Aplicación *Servicios*, o en PowerShell como administrador: `Restart-Service MongoDB` |
| Contenedor (imagen oficial `mongo:7`) | Arrancar con la opción `--auth` (ver abajo) o con un archivo de configuración montado | `docker restart dba-u3-mongo` |

En cualquier archivo de configuración, la sección es:

```yaml
security:
  authorization: enabled
```

### A.2 Contenedor

```bash
docker run --name dba-u3-mongo -p 27017:27017 -d mongo:7 --auth
```

* Lo que se escribe después del nombre de la imagen se entrega a `mongod`: `--auth` habilita la autorización.
* La excepción de *localhost* de la sección 6.3 solo aplica a conexiones originadas dentro del contenedor. Crea el primer usuario con `docker exec -it dba-u3-mongo mongosh`.
* Para la configuración persistente de la Actividad 8, monta un archivo y arranca con él: `docker run ... -v <ruta-local>/mongod.conf:/etc/mongod-lab.conf:ro -d mongo:7 --config /etc/mongod-lab.conf`.
* Si accedes desde tu equipo por el puerto publicado, `client` mostrará la dirección de la red interna del contenedor, no `127.0.0.1`.

---

## 24. Referencias de este laboratorio

* **REF-U3-04** — MongoDB, Inc. *MongoDB Manual*, "Auditing". https://www.mongodb.com/docs/manual/core/auditing/
* **REF-U3-05** — MongoDB, Inc. *MongoDB Manual*, "Database Profiler". https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/
* **REF-U3-06** — MongoDB, Inc. *MongoDB Manual*, "Log Messages". https://www.mongodb.com/docs/manual/reference/log-messages/
* **REF-U3-16** — MongoDB, Inc. *MongoDB Manual*, "Database Profiler Output". https://www.mongodb.com/docs/manual/reference/database-profiler/
* **REF-U3-20** — MongoDB, Inc. *MongoDB Manual*, "getLog (database command)". https://www.mongodb.com/docs/manual/reference/command/getLog/
* **REF-U3-21** — MongoDB, Inc. *MongoDB Manual*, "Self-Managed Configuration File Options". https://www.mongodb.com/docs/manual/reference/configuration-options/
* **REF-U3-23** — MongoDB, Inc. *MongoDB Manual*, "Install MongoDB Community Edition". https://www.mongodb.com/docs/manual/administration/install-community/

Las salidas mostradas se obtuvieron ejecutando esta guía el 2026-10-25 contra MongoDB 7.0.43 Community (marcas de tiempo en UTC), con `mongosh` ejecutado en el mismo equipo que el servidor. Fechas, direcciones, números de conexión y versión exacta de `mongosh` serán distintos en tu equipo.
