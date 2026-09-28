---
title: "2. Control de acceso: usuarios, roles y permisos"
description: "Unidad 2 de DBA — modelos DAC/MAC/RBAC/ABAC, sublenguajes de SQL, usuarios y roles en PostgreSQL y MongoDB, y Row-Level Security."
---

Ya vimos que una entrada maliciosa puede alterar una consulta. El
siguiente problema es distinto: aunque la consulta sea segura, ¿quién
debería poder ejecutarla, y sobre qué?

## Usuarios, roles y permisos: la base

En PostgreSQL, los conceptos de **usuario** y **rol** están unificados: un
usuario es, técnicamente, un rol al que se le concedió el atributo
`LOGIN`. Los **privilegios** (qué puede hacer un rol sobre un objeto) se
otorgan con `GRANT` y se retiran con `REVOKE`. Solo el dueño de un objeto
(o un superusuario) puede otorgar o revocar privilegios sobre él
(REF-U2-01) — un RBAC construido sobre un modelo de propiedad de estilo
DAC.

MongoDB usa **control de acceso basado en roles** (*Role-Based Access
Control*, RBAC) nativo: un usuario recibe uno o más roles, y cada rol
determina qué acciones puede realizar sobre qué recursos, mediante
`createRole` y `createUser`. MongoDB ofrece roles integrados con los
privilegios más comunes, y permite crear roles personalizados cuando esos
no son suficientes (REF-U2-05).

> **El control de acceso no está activo por defecto en MongoDB.** Debe
> habilitarse explícitamente con la bandera `--auth` al iniciar el
> servidor. Sin ella, cualquiera puede leer o escribir sin credenciales —
> `db.getUsers()` simplemente responde `{ ok: 1 }`, sin pedir nada. Esto no
> es un detalle menor: en 2017, decenas de miles de instancias de MongoDB
> expuestas a internet sin autenticación fueron secuestradas por
> campañas de *ransomware* que escanearon el puerto por defecto (27017)
> buscando instalaciones sin proteger (REF-U2-13). MongoDB 3.6 respondió
> cambiando el valor por defecto de `bindIp` a `localhost` — el `--auth`
> con publicación abierta que usan los laboratorios de este curso deshace
> ese default seguro por conveniencia de laboratorio, no porque MongoDB
> venga inseguro por naturaleza.

## Más allá de RBAC: cuatro modelos de control de acceso

Usuarios, roles y permisos no es un único modelo. Es el más común, pero
existen otros con lógicas de decisión distintas.

| Modelo | Cómo decide el acceso | Caso de uso típico |
| --- | --- | --- |
| **DAC** — control de acceso discrecional | El dueño o creador de un objeto decide quién más puede acceder a él y qué puede hacer, y puede transferir ese privilegio a otros. | Un analista crea una tabla temporal de trabajo y le da `SELECT` a dos compañeros, sin pasar por el DBA — el modelo natural detrás de `GRANT`/`REVOKE` cuando cualquier usuario con privilegios de creación puede otorgar acceso sobre lo que creó. |
| **MAC** — control de acceso obligatorio | El acceso lo decide el sistema, no el dueño del objeto, según etiquetas de clasificación fijas asignadas al dato y al usuario. | Un documento gubernamental clasificado como secreto solo puede leerlo un usuario con autorización de seguridad "secreto" o superior, sin importar que el creador quisiera compartirlo con alguien de nivel inferior. |
| **RBAC** — control de acceso basado en roles | El acceso se asigna a roles, no a personas individuales, y cada usuario hereda los permisos del rol que tiene asignado. Cambiar el acceso de una persona es tan simple como cambiarle el rol. | En `tienda_demo`, a un empleado nuevo de soporte se le asigna el rol `lector`, y automáticamente hereda el `SELECT` sobre `clientes`, sin que nadie tenga que otorgarle privilegios uno por uno. |
| **ABAC** — control de acceso basado en atributos | El acceso se evalúa en el momento de la solicitud, combinando atributos del sujeto, del objeto, de la acción y del entorno, todo contra una política. | Un vendedor solo puede ver los clientes que él mismo registró, y solo en horario laboral desde la red de la oficina — esa combinación dinámica es lo que Row-Level Security con reglas basadas en sesión aproxima en PostgreSQL. |

> Referencia. Sandhu et al. (1996), *Role-Based Access Control Models*,
> IEEE Computer 29(2). Hu, V.C. et al. (2014), NIST SP 800-162.

### Ventajas y desventajas de cada modelo

| Modelo | Ventaja | Desventaja |
| --- | --- | --- |
| DAC | Flexible, fácil de administrar en equipos pequeños. | Difícil de auditar a escala, un dueño descuidado compromete el objeto. |
| MAC | Muy resistente a error humano, cumplimiento estricto. | Rígido, alto costo de administración, poco común en SGBD comerciales. |
| RBAC | Escala bien, auditable, estándar de facto en bases de datos. | No captura contexto, como la hora, la ubicación o el valor del propio dato. |
| ABAC | Muy expresivo y dinámico, responde a contexto. | Las políticas se vuelven complejas de mantener y depurar. |

En la práctica los motores combinan modelos: PostgreSQL implementa roles
sobre una base de propiedad de objetos con rasgos de DAC, y Row-Level
Security es su forma de aproximarse a ABAC sin ser un motor ABAC puro.

## Los sublenguajes de SQL, y su equivalente en MongoDB

SQL no es un solo lenguaje: es una familia de sublenguajes, cada uno con
un propósito distinto. MongoDB no tiene esta división formal, pero sus
métodos se agrupan de forma equivalente.

| Categoría | Sigla | Qué hace | Comandos en SQL | Equivalente en MongoDB |
| --- | --- | --- | --- | --- |
| Definición de Datos | DDL | Define y modifica estructura | `CREATE`, `ALTER`, `DROP` | `createCollection`, `createIndex` |
| Manipulación de Datos | DML | Inserta, modifica, elimina registros | `INSERT`, `UPDATE`, `DELETE` | `insertOne`, `updateOne`, `deleteOne` |
| Consulta de Datos | DQL | Consulta sin modificar | `SELECT` | `find`, `aggregate` |
| Control de Datos | DCL | Otorga y retira privilegios | `GRANT`, `REVOKE` | `createRole`, `grantRolesToUser` |
| Control de Transacciones | TCL | Agrupa operaciones como unidad atómica | `BEGIN`, `COMMIT`, `ROLLBACK` | `startTransaction`, `commitTransaction` |

No es coincidencia que `GRANT`/`REVOKE` (DCL) comparta nombre con "control
de acceso": es la misma idea, formalizada como sublenguaje. Ten cuidado
con la ambigüedad frecuente en español: tanto DQL como DCL suelen
abreviarse "LCD" — por eso aquí se usan las siglas en inglés. Algunos
autores tampoco consideran DQL una categoría aparte y ubican `SELECT`
dentro de DML. MongoDB, por su parte, no tiene una gramática formal
dividida en estas categorías — los métodos se agrupan aquí solo para el
paralelo conceptual. Las transacciones multidocumento, por ejemplo,
existen desde la versión 4.0.

## Ejemplo guiado: roles con privilegio diferenciado

**PostgreSQL:**

```sql
CREATE ROLE lector WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT ON clientes TO lector;

CREATE ROLE editor WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT, INSERT, UPDATE ON clientes TO editor;

CREATE ROLE administrador WITH LOGIN PASSWORD '<REDACTED>' SUPERUSER;
```

```text
\du
       Rol       | Atributos
-----------------+------------
 administrador   | Superuser
 editor          |
 lector          |
```

**MongoDB:**

```javascript
db.createRole({
  role: "lector",
  privileges: [{ resource: { db: "tienda_demo", collection: "clientes" },
                 actions: ["find"] }],
  roles: []
})
db.createRole({
  role: "editor",
  privileges: [{ resource: { db: "tienda_demo", collection: "clientes" },
                 actions: ["find", "insert", "update"] }],
  roles: []
})
db.createUser({ user: "lector1", pwd: "<REDACTED>", roles: ["lector"] })
db.createUser({ user: "editor1", pwd: "<REDACTED>", roles: ["editor"] })
```

`lector1` solo puede leer `clientes`. El rol integrado `root` es el
equivalente de MongoDB a `SUPERUSER`.

> Fuente. MongoDB Manual, "Role-Based Access Control".

## Nota avanzada: control de acceso a nivel de fila (PostgreSQL)

`GRANT`/`REVOKE` controlan el acceso a **toda la tabla**. Row-Level
Security (RLS) restringe **filas individuales** según atributos — es el
ejemplo más cercano a ABAC que vas a ver en esta unidad.

```sql
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY solo_mis_clientes ON clientes
  FOR SELECT
  USING (vendedor_id = current_user);
```

Con esta política, un rol con `SELECT` sobre toda la tabla solo ve las
filas cuyo `vendedor_id` coincide con su propio nombre de rol — algo que
`GRANT`/`REVOKE` por sí solo (DAC/RBAC) no puede lograr, porque esos
mecanismos deciden a nivel de tabla completa, no de fila.

> Referencia. PostgreSQL Documentation, "Row Security Policies".

## Revocación y revisión periódica

Otorgar un permiso no es una decisión permanente: cuando una persona
cambia de función o deja de necesitar un acceso, ese privilegio debe
**revocarse**. Buenas prácticas de administración recomiendan además una
**revisión periódica** de qué privilegios tiene cada rol, para detectar
permisos que ya no deberían existir — privilegios "acumulados" con el
tiempo, un riesgo directo al principio de privilegio mínimo del tema
anterior.

> **Actividad 3 — Matriz de usuarios, roles y permisos (laboratorio,
> primera parte de la evidencia oficial).** Crea al menos tres roles con
> distinto nivel de privilegio sobre `clientes` en PostgreSQL y su
> equivalente en MongoDB. Identifica qué modelo de control de acceso está
> en juego en cada mecanismo que uses. Instrucciones completas en la
> [Actividad 3](/materias/dba/unidad-02/actividades/actividad-3/), guía
> técnica en el
> [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/).

## Referencias de este tema

- The PostgreSQL Global Development Group, *Privileges*/`GRANT`/`REVOKE`
  (REF-U2-01).
- MongoDB, Inc., *Role-Based Access Control in Self-Managed Deployments*
  (REF-U2-05).
- The Register, ataques a MongoDB sin autenticación (2017) (REF-U2-13).

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente.

## Qué sigue

Ya decidimos quién puede acceder a `clientes` y qué puede hacer. El
siguiente problema es distinto: incluso un usuario autorizado no debería
ver ciertos campos en texto claro. Continúa con
[3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/).
