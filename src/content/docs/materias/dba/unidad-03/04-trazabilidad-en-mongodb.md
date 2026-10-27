---
title: "4. Trazabilidad en MongoDB Community"
description: "Unidad 3 de DBA — límites de la edición Community, perfilador, bitácora de mongod, correlación por conexión e instantáneas de privilegios."
---

**Temas del programa:** 3.1 y 3.2

## Una limitación real que debes conocer

<div class="callout-alerta">

**La auditoría nativa de MongoDB (`--auditDestination`) es exclusiva de MongoDB Enterprise y MongoDB Atlas (M10 o superior). No existe en MongoDB Community Edition**, que es la edición de esta materia.

</div>

<div class="grid-2">

<div class="card accent-azul"><strong>No se simula</strong><p>Si una pregunta no puede responderse con Community, la respuesta es <b>"No hay evidencia con esta edición"</b> y su razón técnica</p></div>
<div class="card accent-dorado"><strong>Se documenta</strong><p>Un DBA reconoce y comunica la limitación, por ejemplo al evaluar si conviene licenciar Enterprise</p></div>

</div>

<span class="fuente">Fuente: MongoDB Manual, "Auditing"</span>

## Qué registraría la auditoría nativa

Según la documentación oficial (sin practicarlo en esta materia):

<div class="grid-2">

<div class="card accent-azul"><strong>Eventos</strong><p>Cambios de esquema (DDL), eventos de réplica y fragmentación, autenticación y autorización, y operaciones CRUD (con <code>auditAuthorizationSuccess: true</code>)</p></div>
<div class="card accent-dorado"><strong>Destinos</strong><p>Consola, <i>syslog</i>, archivo JSON o archivo BSON</p></div>

</div>

<div class="callout">

Comprueba tu edición: `db.adminCommand({ buildInfo: 1 }).modules`. En Community devuelve `[]`. En Enterprise incluiría `"enterprise"`.

</div>

## Lo que sí existe en Community

<div class="grid-2">

<div class="card accent-verde"><strong>Database Profiler</strong><p>Registra operaciones en la colección <code>system.profile</code> de cada base. Diseñado para <b>desempeño</b>, no para seguridad.</p></div>
<div class="card accent-azul"><strong>Bitácora de <code>mongod</code></strong><p>Documentos JSON con conexiones, autenticaciones, errores y cambios de configuración. Se consulta con <code>getLog</code> o en el archivo de <code>systemLog</code>.</p></div>

</div>

| Nivel del perfilador | Comportamiento |
| --- | --- |
| `0` | Apagado (por defecto) |
| `1` | Más lentas que `slowms` (100 ms) o que cumplan un filtro |
| `2` | Todas las operaciones |

<span class="fuente">Fuente: MongoDB Manual, "Database Profiler"</span>

## Ejemplo guiado: preparar MongoDB con autenticación

```javascript
use admin
db.createUser({ user: "admin", pwd: "Admin_Practica_2026", roles: ["root"] })
db.auth("admin", "Admin_Practica_2026")

use comercial
db.createUser({ user: "app_ventas", pwd: "Ventas_Practica_2026",
                roles: [{ role: "readWrite", db: "comercial" }] })
db.clientes.insertMany([ /* 5 clientes ficticios de la Unidad 2 */ ])
```

<div class="callout">

Mismo orden que en la Unidad 2: `use admin`, `createUser`, **`db.auth`**. Sin `db.auth` la sesión no queda autenticada.

</div>

## Ejemplo guiado: el incidente sin perfilado

```javascript
db.getProfilingStatus()
```

```text
{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }
```

La aplicación cambia el RFC:

```bash
mongosh "mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web" --quiet --eval 'db.clientes.updateOne({ _id: 3 }, { $set: { rfc: "GAMA780912XXX" } })'
```

<div class="callout-alerta">

`system.profile` está vacía y la bitácora solo muestra la autenticación de `app_ventas`, **no** la operación.

</div>

## La conexión a MongoDB, pieza por pieza

```text
mongodb://app_ventas:Ventas_Practica_2026@127.0.0.1:27017/comercial?appName=app-ventas-web
```

| Parte | Significado |
| --- | --- |
| `mongodb://` | Protocolo de MongoDB |
| `app_ventas:Ventas_Practica_2026@` | Usuario y contraseña |
| `127.0.0.1:27017` | Servidor y puerto |
| `/comercial` | Base de datos donde se autentica y trabaja |
| `?authSource=admin` | (Para el DBA) base donde está definido el usuario |
| `?appName=app-ventas-web` | Nombre de la aplicación. Aparece como `appName` en el perfilador |
| `--quiet --eval '...'` | Ejecuta ese código y termina, sin mensaje de bienvenida |

<div class="callout-alerta">

Usa **comillas simples** alrededor del código de `--eval`. Dentro de comillas dobles, la terminal interpreta `$set` como una variable vacía.

</div>

## Ejemplo guiado: activar el perfilador

```javascript
db.setProfilingLevel(2)     // { was: 0, ... }  ← devuelve el nivel ANTERIOR
db.getProfilingStatus()     // { was: 2, slowms: 100, sampleRate: 1, ok: 1 }
```

<div class="small">

```text
{
  op: 'update',
  ns: 'comercial.clientes',
  command: { q: { _id: 3 }, u: { '$set': { rfc: 'GAMA780912XYZ' } }, multi: false, upsert: false },
  docsExamined: 1,
  nModified: 1,
  ts: ISODate('2026-10-25T22:52:45.909Z'),
  client: '127.0.0.1',
  appName: 'app-ventas-web',
  user: 'app_ventas@comercial'
}
```

</div>

<span class="fuente">Fuente: MongoDB Manual, "Database Profiler Output"</span>

## Interpretar `system.profile`

| Campo | Valor observado | Responde |
| --- | --- | --- |
| `op` | `query`, `update`, `remove` | ¿Qué tipo de operación? |
| `ns` | `comercial.clientes` | ¿Sobre qué colección? |
| `command` | Filtro y cambio aplicados | ¿Qué se pidió? |
| `user` | `app_ventas@comercial` | ¿Quién? (usuario y base de autenticación) |
| `client` / `appName` | `127.0.0.1` / `app-ventas-web` | ¿Desde dónde y con qué aplicación? |
| `ts` | `2026-10-25T22:52:45.909Z` | ¿Cuándo? |

<div class="callout-alerta">

No hay **valor anterior** del RFC. Tampoco los datos de un documento eliminado. Y el nivel 2 registra los **filtros de las consultas**, que pueden contener datos personales.

</div>

## Ejemplo guiado: reducir volumen con un filtro

```javascript
db.setProfilingLevel(0)
db.system.profile.drop()          // exporta antes lo que necesites
db.setProfilingLevel(1, { filter: { op: { $in: ["insert", "update", "remove"] } } })
```

```text
{
  was: 1, slowms: 100, sampleRate: 1,
  filter: { op: { '$in': [ 'insert', 'remove', 'update' ] } },
  note: 'When a filter expression is set, slowms and sampleRate are not used ...',
  ok: 1
}
```

Tras una consulta y una actualización de la aplicación, `system.profile` contiene **solo** el `update`.

## Límites del perfilador como evidencia

<div class="grid-2">

<div class="card accent-rojo"><strong>1 MB</strong><p><code>system.profile</code> es una colección limitada. Al llenarse, sobrescribe lo más antiguo: la evidencia desaparece sola.</p></div>
<div class="card accent-rojo"><strong>No persiste</strong><p>Tras reiniciar el servicio, el nivel volvió a <code>0</code>. Para que sea permanente: <code>operationProfiling.mode</code> en el archivo de configuración de <code>mongod</code>.</p></div>
<div class="card accent-dorado"><strong>Desempeño</strong><p>La documentación advierte que puede degradar el rendimiento, sobre todo en nivel 2.</p></div>
<div class="card accent-dorado"><strong>Propósito</strong><p>Analizar operaciones lentas. No fue diseñado como auditoría de seguridad.</p></div>

</div>

<span class="fuente">Fuente: MongoDB Manual, "Database Profiler"</span>

## La bitácora de `mongod`

Cada línea es un documento JSON: `t` (fecha), `s` (severidad), `c` (componente: `NETWORK`, `ACCESS`, `COMMAND`), `id`, `ctx` (conexión, por ejemplo `conn12`), `msg` y `attr`.

| ¿Dónde queda? | Cómo se controla |
| --- | --- |
| Archivo | `systemLog.destination: file` y `systemLog.path` en el archivo de configuración |
| Salida estándar | Si no se configura `systemLog` (frecuente en contenedores) |
| Memoria del servidor | Siempre: los **1024 eventos más recientes**, consultables con `getLog` |

```javascript
function bitacora() {
  return db.adminCommand({ getLog: "global" }).log.map(l => JSON.parse(l))
}
bitacora().filter(e => e.c === "ACCESS").slice(-5)
```

<span class="fuente">Fuente: MongoDB Manual, "Log Messages", "getLog" y "Self-Managed Configuration File Options"</span>

## Ejemplo guiado: acceso fallido en `mongod`

```javascript
bitacora()
  .filter(e => e.c === "ACCESS" && e.msg === "Failed to authenticate")
  .map(e => ({ t: e.t, id: e.id, ctx: e.ctx, user: e.attr.user, client: e.attr.client, error: e.attr.error, result: e.attr.result }))
```

<div class="small">

```text
{
  t: { '$date': '2026-10-25T22:52:58.122+00:00' },
  id: 5286307, ctx: 'conn41', user: 'app_ventas', client: '127.0.0.1:37276',
  error: 'AuthenticationFailed: SCRAM authentication failed, storedKey mismatch',
  result: 18
},
{
  ..., user: 'usuario_inexistente',
  error: 'UserNotFound: Could not find user "usuario_inexistente" for db "comercial"',
  result: 11
}
```

</div>

Un acceso exitoso aparece como `"Successfully authenticated"` con `result: 0` y el nombre de la aplicación en `attr.doc.application.name`.

## Ejemplo guiado: correlacionar por conexión

```text
{ ctx: 'conn31', msg: 'Profiler settings changed',
  attr: { from: { level: 0, ... }, to: { level: 1, ..., filter: { ... } }, db: 'comercial' } }
```

El evento **no** dice quién hizo el cambio. Sí dice qué conexión:

```javascript
bitacora().filter(e => e.ctx === "conn31" && e.msg === "Successfully authenticated")
          .map(e => ({ t: e.t, ctx: e.ctx, user: e.attr.user, db: e.attr.db }))
```

```text
[ { t: { '$date': '2026-10-25T22:52:56.959+00:00' }, ctx: 'conn31', user: 'admin', db: 'admin' } ]
```

<div class="callout-alerta">

La correlación solo es válida **dentro del mismo periodo de ejecución**: los números de conexión y la memoria de `getLog` se reinician con el servidor.

</div>

## Cambios de privilegios: el límite más importante

```javascript
db.grantRolesToUser("app_ventas", [{ role: "dbAdmin", db: "comercial" }])
```

En la verificación del laboratorio, el cambio **no apareció** en `system.profile` ni en la bitácora de `mongod`.

**Control compensatorio**: instantáneas periódicas de privilegios.

```javascript
db.getSiblingDB("auditoria").instantaneas_privilegios.insertOne({
  momento: new Date(),
  tomada_por: db.runCommand({ connectionStatus: 1 }).authInfo.authenticatedUsers,
  usuarios: db.getUsers().users.map(u => ({ user: u.user, db: u.db, roles: u.roles }))
})
```

## Lo que responde una instantánea

| Pregunta | ¿Responde? |
| --- | --- |
| ¿Cambiaron los privilegios de `app_ventas`? | Sí |
| ¿Qué rol se agregó? | Sí: `dbAdmin` en `comercial` |
| ¿Quién lo agregó? | **No** |
| ¿Cuándo exactamente? | **No**, solo entre dos instantáneas |

<div class="callout">

Un **control compensatorio** reduce un riesgo cuando el control preferido no existe, pero **no lo sustituye** y debe documentarse como tal.

</div>

## Comparación de los tres escenarios

| Evento | PostgreSQL | MongoDB Community | Enterprise / Atlas |
| --- | --- | --- | --- |
| Acceso exitoso y fallido | Sí | Sí (bitácora) | Documentado |
| Cambio de privilegios | Sí | No (solo instantáneas) | Documentado |
| Modificación de datos | Sí | Sí (perfilador) | Documentado |
| Valor anterior | Sí (disparador) | No | No lo describe el manual de MongoDB |
| Lectura de datos sensibles | Con `pgaudit` o `all` | Nivel 2, con su costo | Documentado |
| Cambio de configuración | Sí | Sí (`ctx`) | Documentado |

<span class="fuente">"Documentado" significa descrito en el manual oficial de MongoDB, no practicado en la materia</span>

## Relación con el Laboratorio 02

<div class="callout">

La edición, el perfilador, la bitácora de `mongod`, la correlación por conexión y las instantáneas de privilegios se practican en el [Laboratorio 2 — Trazabilidad en MongoDB Community](/materias/dba/unidad-03/laboratorios/laboratorio-2-trazabilidad-mongodb/).

</div>

## Qué sigue

Continúa con [5. Conservación e interpretación de bitácoras](/materias/dba/unidad-03/05-conservacion-e-interpretacion-de-bitacoras/).
