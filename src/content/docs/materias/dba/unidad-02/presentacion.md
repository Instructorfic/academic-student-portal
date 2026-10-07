---
title: "Presentación — Unidad 2"
description: "Unidad 2 de DBA — presentación de clase completa: principios de seguridad, control de acceso, datos sensibles, cifrado, privacidad y hardening."
---

## Objetivos de la unidad

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">OE-U2.1</span>
<strong>Principios de seguridad</strong>
<p>Explicar la CIA y el privilegio mínimo para mitigar la inyección SQL y NoSQL</p>
</div>

<div class="card accent-dorado">
<span class="badge">OE-U2.2</span>
<strong>Control de acceso</strong>
<p>Implementar usuarios, roles y permisos</p>
</div>

<div class="card accent-verde">
<span class="badge">OE-U2.3</span>
<strong>Datos sensibles</strong>
<p>Clasificar y enmascarar información sensible</p>
</div>

<div class="card accent-rojo">
<span class="badge">OE-U2.4</span>
<strong>Cifrado</strong>
<p>Aplicar cifrado en tránsito y en reposo</p>
</div>

<div class="card accent-azul">
<span class="badge">OE-U2.5</span>
<strong>Marco normativo</strong>
<p>Explicar la LFPDPPP y la LGPDPPSO</p>
</div>

<div class="card accent-dorado">
<span class="badge">OE-U2.6</span>
<strong>Hardening</strong>
<p>Endurecer un servidor de base de datos</p>
</div>

</div>

## El entorno que dejamos en la Unidad 1

<div class="banner-node">

En la Unidad 1 identificamos un entorno de base de datos sin ambientes separados y sin responsable claro. Ahora aparecen nuevos problemas de seguridad.

</div>

<div class="grid-3">

<div class="card accent-rojo"><strong>Acceso</strong><p>No existe un control claro sobre quién puede acceder a qué</p></div>
<div class="card accent-dorado"><strong>Información</strong><p>Los datos sensibles no están identificados ni cuentan con mecanismos de protección adecuados</p></div>
<div class="card accent-azul"><strong>Exposición</strong><p>El servidor conserva configuraciones por defecto y mantiene servicios o puertos que podrían no ser necesarios</p></div>

</div>

## El caso que vamos a proteger durante toda la unidad

<div class="banner-node">

A partir de aquí, todos los ejemplos guiados de la Unidad 2 usan el mismo
dato, en los dos motores que ha usado la materia. La tabla <code>clientes</code>
en PostgreSQL y la colección <code>tienda_demo.clientes</code> en MongoDB.
Cada subtema le agrega una capa de protección distinta al mismo registro.

</div>

<div class="grid-2">

<div class="card accent-azul"><strong>PostgreSQL, tabla clientes</strong><p><code>id, nombre, correo, telefono, rfc, edad, clave_acceso</code></p></div>
<div class="card accent-dorado"><strong>MongoDB, tienda_demo.clientes</strong><p><code>{ nombre, correo, telefono, rfc, edad, clave_acceso }</code></p></div>

</div>

## Preparar el entorno

```bash
docker run --name dba-postgres -e POSTGRES_PASSWORD=<REDACTED> -p 5432:5432 -d postgres:16
docker exec -it dba-postgres psql -U postgres
```

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY, nombre TEXT, correo TEXT, telefono TEXT,
  rfc TEXT, edad INT, clave_acceso TEXT
);
INSERT INTO clientes (nombre, correo, telefono, rfc, edad, clave_acceso)
VALUES ('Persona Ejemplo', 'estudiante@correo-demo.test', '667-123-45-67',
        'ABCD123456XYZ', 22, 'clave_demo');
```

```bash
docker run --name dba-mongo -p 27017:27017 -d mongo:7 --auth
```

```javascript
use admin
db.createUser({ user: "admin", pwd: "<REDACTED>", roles: ["root"] })
db.auth("admin", "<REDACTED>")
use tienda_demo
db.clientes.insertOne({
  nombre: "Persona Ejemplo", correo: "estudiante@correo-demo.test",
  telefono: "667-123-45-67", rfc: "ABCD123456XYZ", edad: 22,
  clave_acceso: "clave_demo"
})
```

## Actividad: Diagnóstico

<div class="banner-node">

A partir del caso analizado al inicio de la Unidad 1, identifica los problemas de seguridad presentes en el nuevo escenario.

</div>

1. Cualquier persona con la contraseña del usuario administrador puede leer, modificar o borrar cualquier dato.
2. No hay cifrado en las conexiones, las credenciales viajan en texto plano, no hay clasificación de qué datos son sensibles, y el servidor conserva su configuración de instalación por defecto.

<div class="callout">

Identifica qué situaciones representan un riesgo, qué podría ocurrir si el riesgo se materializa, y qué tipo de protección parece hacer falta.

</div>

## ¿Qué estamos tratando de proteger?

<div class="grid-3">

<div class="card accent-azul"><strong>Acceso</strong><p>¿Quién puede utilizar el recurso y qué puede hacer?</p></div>
<div class="card accent-dorado"><strong>Información</strong><p>¿Cómo protegemos los datos cuando se almacenan o transmiten?</p></div>
<div class="card accent-rojo"><strong>Exposición</strong><p>¿Qué servicios, puertos y configuraciones están disponibles para la red?</p></div>

</div>

<div class="callout">

En esta unidad veremos controles técnicos para responder a cada uno de estos problemas, aplicados siempre sobre `clientes`.

</div>

## Un dato puede necesitar varias protecciones

```text
                 DATOS (clientes)
                   |
        +----------+----------+
        v          v          v
      ACCESO   PROTECCION   EXPOSICION
        |          |          |
        v          v          v
   Usuarios y   Cifrado y   Servicios
   permisos     enmascar.   y puertos
     (2.2)      (2.3/2.4)     (2.6)
```

<div class="callout">

Un usuario correctamente autenticado puede seguir teniendo demasiados privilegios. Un dato cifrado puede seguir estando disponible para un usuario autorizado a leerlo. Cerrar un puerto innecesario no sustituye el control de acceso.

</div>

## 2.1 — Principios de seguridad

### La tríada CIA aplicada a bases de datos

<p align="center">
  <img src="/imagenes/dba/unidad-02/triada_cia.svg" alt="Triada CIA: confidencialidad, integridad y disponibilidad" width="440">
</p>

<div class="grid-3">

<div class="card accent-azul">
<strong>Confidencialidad</strong>
<p>Solo quien está autorizado puede leer el dato. En un DBA esto se traduce en roles y permisos (2.2), enmascaramiento (2.3) y cifrado (2.4).</p>
</div>

<div class="card accent-dorado">
<strong>Integridad</strong>
<p>El dato refleja la realidad y no fue alterado sin autorización. En un DBA esto se traduce en constraints, transacciones ACID, y también en defenderse de inyección, que es un ataque directo a la integridad.</p>
</div>

<div class="card accent-verde">
<strong>Disponibilidad</strong>
<p>El dato está accesible cuando se necesita. En un DBA esto se traduce en respaldos, alta disponibilidad, y dimensionar bien <code>max_connections</code> para que una avalancha de conexiones no tumbe el servicio.</p>
</div>

</div>

<p class="small">Referencia. Saltzer, J.H. y Schroeder, M.D. (1975). "The Protection of Information in Computer Systems". Proceedings of the IEEE, 63(9), 1278 a 1308.</p>

### Privilegio mínimo y separación de funciones

<div class="grid-2">

<div class="card accent-azul"><strong>Privilegio mínimo</strong><p>Cada usuario o proceso cuenta solo con los permisos que necesita para su tarea</p></div>
<div class="card accent-dorado"><strong>Separación de funciones</strong><p>Ninguna persona controla sola todo el ciclo de una operación sensible</p></div>

</div>

<div class="callout-alcance">

Ambos se aplican directamente en 2.2. Es exactamente lo que separan los roles lector, editor y administrador que van a construir en PostgreSQL y MongoDB.

</div>

### Inyección SQL y NoSQL: el concepto

<div class="banner-node">

Inyección es ejecutar código o lógica no intencionada porque una entrada de usuario se mezcló con la lógica de la consulta en vez de tratarse como un simple valor de datos. Aplica igual en SQL y en NoSQL.

</div>

<div class="callout-alcance">

Las simulaciones prácticas de inyección, vulnerable contra mitigada, en PostgreSQL y MongoDB, están en el repositorio de laboratorios de la materia, no en esta presentación. Aquí nos enfocamos en el concepto, la prevención y la responsabilidad organizacional.

</div>

### Cómo se previene: consultas parametrizadas

```python
# vulnerable
cur.execute(f"SELECT * FROM clientes WHERE nombre = '{entrada_nombre}'")

# parametrizada
cur.execute("SELECT * FROM clientes WHERE nombre = %s", (entrada_nombre,))
```

El motor recibe el valor por un canal separado de la consulta. Nunca se interpreta como código, sin importar qué contenga.

<div class="callout-alcance">

En SQL puro esto se logra con `PREPARE`. En NoSQL, con tipado estricto del valor antes de construir el filtro.

</div>

### Cómo se previene: ORM con escape automático

```python
# seguro, el ORM parametriza por debajo
session.query(Cliente).filter(Cliente.nombre == entrada_nombre)

# igual de vulnerable aunque esta "dentro" del ORM
session.execute(f"SELECT * FROM clientes WHERE nombre = '{entrada_nombre}'")
```

<div class="callout-alerta">

Usar un ORM no protege por sí solo. El riesgo vuelve en cuanto alguien escribe SQL crudo dentro de él.

</div>

### Cómo se previene: validación y tipado de entradas

```javascript
const nombre = String(entrada_nombre)
const clave = String(entrada_clave)
db.clientes.findOne({ nombre, clave_acceso: clave })
```

Forzar el tipo esperado antes de construir la consulta impide que un objeto como `{"$ne": null}` llegue como operador en vez de como valor.

### Cómo se previene: privilegio mínimo en la cuenta de aplicación

```sql
CREATE ROLE app_usuario WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT, INSERT, UPDATE ON clientes TO app_usuario;
```

```text
postgresql://app_usuario:<REDACTED>@servidor:5432/tienda_demo
```

<div class="callout">

La cuenta que usa la aplicación para conectarse nunca debe ser superusuario. Si una inyección logra ejecutarse igual, el daño queda acotado a lo que `app_usuario` puede hacer.

</div>

### Qué más se debe considerar

<div class="grid-2">

<div class="card accent-dorado"><strong>Inyección de segundo orden</strong><p>Un dato ya almacenado, aparentemente seguro, se reutiliza sin sanitizar en una consulta posterior</p></div>
<div class="card accent-rojo"><strong>Procedimientos almacenados mal construidos</strong><p>Un stored procedure que concatena SQL dinámico internamente hereda el mismo riesgo</p></div>
<div class="card accent-azul"><strong>Entradas no evidentes</strong><p>Headers HTTP, cookies, nombres de archivo subido. Cualquier dato que llegue del cliente es una entrada</p></div>
<div class="card accent-verde"><strong>Defensa en profundidad</strong><p>Un WAF ayuda a detectar patrones conocidos, pero es una capa adicional, nunca el único control</p></div>

</div>

### ¿Debe haber escaneos? ¿De quién es la responsabilidad?

<div class="banner-node">

La prevención de inyección no es responsabilidad exclusiva del DBA. Es un esfuerzo compartido entre equipos, y sí deben existir escaneos periódicos, no solo revisión manual de código.

</div>

<div class="grid-3">

<div class="card accent-azul">
<strong>Desarrollo</strong>
<p>Responsable primario. Escribir consultas parametrizadas, validar entradas, usar el ORM correctamente. Aquí vive la mayoría del riesgo real.</p>
</div>

<div class="card accent-dorado">
<strong>DBA</strong>
<p>Responsable de que la cuenta de aplicación tenga privilegio mínimo, de auditar patrones anómalos en los logs de consultas, y de que ningún usuario de aplicación tenga privilegios de superusuario.</p>
</div>

<div class="card accent-verde">
<strong>Seguridad y QA</strong>
<p>Responsable de escaneos periódicos, análisis estático de código (SAST) y pruebas dinámicas sobre la aplicación en ejecución (DAST), integrados al pipeline de CI/CD.</p>
</div>

</div>

<p class="small">Referencia. OWASP SQL Injection Prevention Cheat Sheet. OWASP Testing for NoSQL Injection. ISO/IEC 27002:2022, sección 5.2, "Information security roles and responsibilities".</p>

### Actividad: Inyección

<div class="callout">

Reproduce el laboratorio de inyección SQL y NoSQL del repositorio de la materia (code.ficlabs.com.mx, laboratorios DBA), documenta el comportamiento vulnerable y mitigado, y responde qué equipo sería responsable de corregir cada causa raíz que identificaste.

</div>

## 2.2 — Control de acceso

### Más allá de RBAC: modelos de control de acceso

<div class="banner-node">

Usuarios, roles y permisos no es un único modelo. Es el más común, pero existen otros con lógicas distintas de decisión.

</div>

<div class="grid-2">

<div class="card accent-azul">
<strong>DAC, control de acceso discrecional</strong>
<p>El dueño o creador de un objeto decide quién más puede acceder a él y qué puede hacer, y puede transferir ese privilegio a otros.</p>
</div>

<div class="card accent-dorado">
<strong>MAC, control de acceso obligatorio</strong>
<p>El acceso lo decide el sistema, no el dueño del objeto, según etiquetas de clasificación fijas asignadas al dato y al usuario.</p>
</div>

</div>

### Caso de uso: DAC y MAC

<div class="grid-2">

<div class="card accent-azul">
<strong>DAC</strong>
<p>Un analista crea una tabla temporal de trabajo y le da SELECT a dos compañeros, sin pasar por el DBA. Es el modelo natural detrás de GRANT y REVOKE cuando cualquier usuario con privilegios de creación puede otorgar acceso sobre lo que creó.</p>
</div>

<div class="card accent-dorado">
<strong>MAC</strong>
<p>Un documento gubernamental clasificado como secreto solo puede leerlo un usuario con autorización de seguridad secreto o superior, sin importar que el creador quisiera compartirlo con alguien de nivel inferior.</p>
</div>

</div>

### RBAC y ABAC

<div class="grid-2">

<div class="card accent-verde">
<strong>RBAC, control de acceso basado en roles</strong>
<p>El acceso se asigna a roles, no a personas individuales, y cada usuario hereda los permisos del rol que tiene asignado. Cambiar el acceso de una persona es tan simple como cambiarle el rol.</p>
</div>

<div class="card accent-rojo">
<strong>ABAC, control de acceso basado en atributos</strong>
<p>El acceso se evalúa en el momento de la solicitud, combinando atributos del sujeto, del objeto, de la acción y del entorno, todo contra una política.</p>
</div>

</div>

### Caso de uso: RBAC y ABAC

<div class="grid-2">

<div class="card accent-verde">
<strong>RBAC</strong>
<p>En tienda_demo, a un empleado nuevo de soporte se le asigna el rol lector, y automáticamente hereda el SELECT sobre clientes, sin que nadie tenga que otorgarle privilegios uno por uno.</p>
</div>

<div class="card accent-rojo">
<strong>ABAC</strong>
<p>Un vendedor solo puede ver los clientes que él mismo registró, y solo en horario laboral desde la red de la oficina. Esa combinación dinámica es lo que Row-Level Security con reglas basadas en sesión aproxima en PostgreSQL.</p>
</div>

</div>

<p class="small">Referencia — Sandhu et al. (1996), IEEE Computer 29(2). Hu, V.C. et al. (2014), NIST SP 800-162.</p>

### Ventajas y desventajas de cada modelo

| Modelo | Ventaja | Desventaja |
|---|---|---|
| DAC | Flexible, fácil de administrar en equipos pequeños | Difícil de auditar a escala. Un dueño descuidado compromete el objeto |
| MAC | Muy resistente a error humano, cumplimiento estricto | Rígido, alto costo de administración, poco común en SGBD comerciales |
| RBAC | Escala bien, auditable, estándar de facto en bases de datos | No captura contexto, como la hora, la ubicación o el valor del propio dato |
| ABAC | Muy expresivo y dinámico, responde a contexto | Las políticas se vuelven complejas de mantener y depurar |

<div class="callout-alcance">

En la práctica los motores combinan modelos. PostgreSQL implementa roles sobre una base de propiedad de objetos con rasgos de DAC, y Row-Level Security es su forma de aproximarse a ABAC sin ser un motor ABAC puro.

</div>

### Los sublenguajes de SQL, y su equivalente en MongoDB

<div class="banner-node">

SQL no es un solo lenguaje, es una familia de sublenguajes, cada uno con un propósito distinto. MongoDB no tiene esta división formal, pero sus métodos se agrupan de forma equivalente.

</div>

| Categoría | Sigla | Qué hace | Comandos en SQL | Equivalente en MongoDB |
|---|---|---|---|---|
| Definición de Datos | DDL | Define y modifica estructura | CREATE, ALTER, DROP | createCollection, createIndex |
| Manipulación de Datos | DML | Inserta, modifica, elimina registros | INSERT, UPDATE, DELETE | insertOne, updateOne, deleteOne |
| Consulta de Datos | DQL | Consulta sin modificar | SELECT | find, aggregate |
| Control de Datos | DCL | Otorga y retira privilegios | GRANT, REVOKE | createRole, grantRolesToUser |
| Control de Transacciones | TCL | Agrupa operaciones como unidad atómica | BEGIN, COMMIT, ROLLBACK | startTransaction, commitTransaction |

### Dos notas sobre esta tabla

<div class="callout-alcance">

Los comandos GRANT y REVOKE, son DCL. No es coincidencia que control de acceso y este sublenguaje compartan nombre.

</div>

<div class="callout-alcance">

Hay ambigüedad frecuente en español: tanto DQL como DCL suelen abreviarse LCD. Por eso aquí se usan las siglas en inglés. Algunos autores tampoco consideran DQL una categoría aparte y consideran SELECT dentro de DML.

</div>

<div class="callout">

MongoDB no tiene una gramática formal dividida en estas categorías. Los métodos se agrupan aquí solo para el paralelo conceptual. Las transacciones multi documento, por ejemplo, existen desde la versión 4.0.

</div>

### Usuarios, roles y permisos en la práctica

<div class="grid-2">

<div class="card accent-azul"><strong>PostgreSQL</strong><p>Un usuario es un rol con LOGIN. GRANT y REVOKE otorgan y retiran privilegios, un RBAC construido sobre un modelo de propiedad de estilo DAC</p></div>
<div class="card accent-rojo"><strong>MongoDB</strong><p>RBAC nativo con createRole y createUser. El control de acceso no está activo por defecto y debe habilitarse con --auth</p></div>

</div>

### Ejemplo guiado: roles con privilegio diferenciado (PostgreSQL)

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

### MongoDB sin autenticación por defecto

<div class="callout-alerta">

Sin la bandera --auth, cualquiera puede leer o escribir sin credenciales.

</div>

```javascript
> db.getUsers()
{ ok: 1 }
```

### Ejemplo guiado: roles con privilegio diferenciado (MongoDB)

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

`lector1` solo puede leer `clientes`. `root` es el equivalente a SUPERUSER.

<p class="small">Fuente. MongoDB Manual, "Role-Based Access Control".</p>

### Nota avanzada: control de acceso a nivel de fila (PostgreSQL)

<div class="callout-alcance">

GRANT y REVOKE controlan el acceso a toda la tabla. Row-Level Security restringe filas individuales según atributos. Es el ejemplo más cercano a ABAC que van a ver en esta unidad.

</div>

```sql
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY solo_mis_clientes ON clientes
  FOR SELECT
  USING (vendedor_id = current_user);
```

<p class="small">Referencia. PostgreSQL Documentation, "Row Security Policies".</p>

### Actividad: Matriz de roles

<div class="callout">

Crea al menos tres roles con distinto nivel de privilegio sobre `clientes` en PostgreSQL y su equivalente en MongoDB. Identifica qué modelo de control de acceso está en juego en cada mecanismo que uses.

</div>

<p class="small">Instrucciones completas: <a href="/materias/dba/unidad-02/actividades/actividad-3/">Actividad 3</a></p>

## 2.3 — Protección de datos sensibles

### Protección de datos sensibles

Proteger una base de datos no significa únicamente impedir accesos no autorizados.

También implica controlar:

* qué información se almacena
* quién puede utilizarla
* cómo se transforma
* cuánto tiempo se conserva
* cuándo debe eliminarse

> **El DBA administra datos, pero también administra riesgos asociados a esos datos.**

### Clasificación de datos

La clasificación permite determinar qué nivel de protección necesita cada información.

| Clasificación | Ejemplo                        | Riesgo   |
| ------------- | ------------------------------ | -------- |
| Público       | Catálogo de productos          | Bajo     |
| Interno       | Información operativa          | Medio    |
| Confidencial  | Información financiera         | Alto     |
| Personal      | Nombre, correo                 | Alto     |
| Sensible      | Datos especialmente protegidos | Muy alto |
| Credencial    | Contraseña, token              | Crítico  |

**Idea clave**

> La clasificación debe determinar los controles, no solamente el nombre de la columna.

### ¿Por qué clasificar los datos?

Sin clasificación, resulta difícil decidir:

* quién puede acceder
* qué debe cifrarse
* qué puede enmascararse
* cuánto tiempo debe conservarse
* qué debe registrarse
* qué debe eliminarse

**Ejemplo**

```text
correo electrónico
      ↓
dato personal
      ↓
acceso restringido
      ↓
protección y trazabilidad
```

### Datos personales vs datos sensibles

No todos los datos personales tienen el mismo nivel de riesgo.

| Tipo     | Ejemplo                              | Consideración            |
| -------- | ------------------------------------ | ------------------------ |
| Personal | Nombre                               | Identifica a una persona |
| Personal | Correo                               | Permite contacto         |
| Personal | Teléfono                             | Permite contacto         |
| Personal | Identificador                        | Vincula registros        |
| Sensible | Información médica                   | Riesgo elevado           |
| Sensible | Información biométrica               | Riesgo elevado           |
| Sensible | Información sobre origen o creencias | Riesgo elevado           |

**Importante**

> "Confidencial" y "sensible" no son necesariamente sinónimos.

La clasificación organizacional y la clasificación jurídica cumplen funciones diferentes.

### Datos sensibles y decisiones del DBA

Cuando un dato presenta mayor riesgo, pueden requerirse controles adicionales:

* acceso restringido
* cifrado
* enmascaramiento
* monitoreo
* minimización
* retención limitada
* eliminación segura

**Pregunta para el DBA**

> ¿Necesitamos que todos los usuarios vean el valor real?

Si la respuesta es no, debe analizarse una alternativa.

### Enmascaramiento de datos

El enmascaramiento modifica la forma en que se presenta un dato.

Ejemplo:

```text
Original
juan.perez@empresa.com

Enmascarado
j***@empresa.com
```

Otro ejemplo:

```text
4111111111111111

4111********1111
```

**Objetivo**

Permitir trabajar con información sin exponer innecesariamente el valor completo.

### ¿Cuándo utilizar enmascaramiento?

Puede ser útil en:

* ambientes de pruebas
* soporte técnico
* reportes
* interfaces administrativas
* consultas de usuarios
* capacitación

**Pero no es cifrado.**

El dato puede seguir existiendo en su forma original.

### Seudonimización

La seudonimización sustituye identificadores directos por otros valores.

Ejemplo:

```text
Cliente:
14420708

↓

Identificador:
CLI-8F3A21
```

La información original puede recuperarse mediante información adicional.

**Idea clave**

> La seudonimización reduce exposición, pero no elimina necesariamente la posibilidad de identificar a la persona.

### Anonimización

La anonimización busca impedir que una persona pueda ser identificada razonablemente a partir de los datos resultantes.

Ejemplo:

```text
Edad: 37
Ciudad: Culiacán
Ingreso: $28,500

↓

Rango de edad: 35–40
Región: Sinaloa
Rango de ingreso: 25–30 mil
```

La transformación debe evaluarse frente al riesgo de reidentificación.

### Enmascaramiento, seudonimización y anonimización

| Técnica         |             Dato original recuperable | Identificación       |
| --------------- | ------------------------------------: | -------------------- |
| Enmascaramiento |                                    Sí | Generalmente posible |
| Seudonimización |         Sí, con información adicional | Posible              |
| Anonimización   | No debería ser razonablemente posible | Objetivo: impedirla  |

**No son equivalentes.**

Cada técnica responde a un problema diferente.

### Retención de datos

La retención determina durante cuánto tiempo se conserva información.

El DBA debe conocer:

* motivo de conservación
* periodo requerido
* responsable
* ubicación
* controles de acceso
* mecanismo de eliminación

**Pregunta**

> ¿Por qué seguimos almacenando este dato?

Si no existe una razón válida, debe revisarse su permanencia.

### Retención y eliminación segura

Eliminar datos no significa únicamente ejecutar:

```sql
DELETE FROM clientes;
```

También deben considerarse:

* copias de respaldo
* réplicas
* archivos temporales
* exportaciones
* logs
* snapshots
* ambientes de pruebas

**Idea clave**

> El ciclo de vida del dato continúa después de eliminarlo de una tabla.

### Eliminación segura

Una política de eliminación debe definir:

```text
Identificar
    ↓
Autorizar
    ↓
Eliminar
    ↓
Verificar
    ↓
Registrar
```

Debe existir evidencia de que la operación fue realizada correctamente.

### Actividad 2.3

#### Protección de datos

Analizar un conjunto de datos y determinar:

1. clasificación
2. nivel de riesgo
3. usuarios que requieren acceso
4. datos que deben enmascararse
5. datos que podrían seudonimizarse
6. periodo de retención
7. mecanismo de eliminación

**Evidencia**

Una matriz de clasificación y protección.

## 2.4 — Cifrado y protección técnica

El cifrado busca proteger la confidencialidad de la información.

Puede aplicarse:

* durante la comunicación
* durante el almacenamiento
* en respaldos
* en determinados campos
* en credenciales mediante mecanismos especializados

> El cifrado es un control, no una estrategia completa de seguridad.

### Cifrado en tránsito

Protege información mientras se desplaza entre componentes.

```text
Cliente
   ↓
Canal protegido
   ↓
Servidor
```

Ejemplos:

* TLS
* conexiones seguras
* túneles cifrados
* VPN

Sin protección:

```text
Cliente ────────────── Servidor
          datos
```

Con protección:

```text
Cliente ══ TLS ══════ Servidor
```

### TLS en bases de datos

TLS puede proteger conexiones entre:

* aplicación y PostgreSQL
* aplicación y MongoDB
* herramienta administrativa y servidor
* componentes de una arquitectura distribuida

Protege principalmente:

* confidencialidad
* integridad del canal
* autenticación del servidor

### Cifrado en reposo

Protege información almacenada.

Puede aplicarse mediante:

* cifrado de discos
* cifrado de volúmenes
* cifrado de respaldos
* cifrado de archivos
* cifrado a nivel de aplicación
* mecanismos específicos del motor

**Pregunta**

> ¿Qué sucede si alguien obtiene una copia física del almacenamiento?

El control de acceso al servidor por sí solo puede no ser suficiente.

### Cifrado de datos vs hashing

No son lo mismo.

| Mecanismo | Uso principal           | Recuperación |
| --------- | ----------------------- | ------------ |
| Hash      | Verificación            | No           |
| Cifrado   | Confidencialidad        | Sí           |
| HMAC      | Integridad/autenticidad | No           |
| TLS       | Comunicación segura     | No aplica    |

**Contraseñas**

No deberían almacenarse mediante cifrado reversible.

### Manejo seguro de credenciales

Una credencial puede ser:

* contraseña
* token
* API key
* certificado
* clave privada
* cadena de conexión
* secreto de aplicación

Nunca debe asumirse que una contraseña es el único secreto que debe protegerse.

### Almacenamiento de contraseñas

Una contraseña no debería almacenarse así:

```text
usuario | contraseña
juan    | Secreto123
```

Ni simplemente mediante:

```text
SHA-256(contraseña)
```

Para contraseñas se utilizan funciones diseñadas para derivación de claves y resistencia a ataques de fuerza bruta.

Ejemplos:

* Argon2id
* bcrypt
* scrypt

**Idea clave**

> Una contraseña debe almacenarse mediante un mecanismo diseñado específicamente para contraseñas.

### Credenciales expuestas en aplicaciones

Un error frecuente:

```text
DB_HOST=servidor
DB_USER=admin
DB_PASSWORD=123456
```

dentro del código fuente.

También pueden aparecer en:

* repositorios Git
* archivos `.env`
* logs
* scripts
* imágenes de contenedores
* archivos de configuración
* pipelines CI/CD

### ¿Qué hacer ante una credencial expuesta?

La respuesta no debe limitarse a eliminar el archivo.

Secuencia recomendada:

```text
Detectar
   ↓
Revocar
   ↓
Rotar
   ↓
Investigar exposición
   ↓
Verificar accesos
   ↓
Corregir almacenamiento
   ↓
Registrar incidente
```

**Importante**

> Una credencial publicada debe considerarse comprometida.

### Gestión de llaves

Las claves criptográficas también necesitan protección.

Debe controlarse:

* generación
* almacenamiento
* acceso
* distribución
* rotación
* revocación
* respaldo
* destrucción

**Problema**

Cifrar correctamente pero almacenar la clave junto al dato reduce considerablemente la protección.

### Ciclo de vida de una llave

```text
Generación
    ↓
Almacenamiento seguro
    ↓
Uso controlado
    ↓
Rotación
    ↓
Revocación
    ↓
Destrucción
```

La gestión de llaves debe ser independiente del dato que protegen cuando sea posible.

### Base64 no es cifrado

Ejemplo:

```text
SG9sYQ==
```

puede representar:

```text
Hola
```

Base64 solamente codifica datos.

No proporciona:

* confidencialidad
* protección criptográfica
* resistencia contra lectura

**Regla**

> Codificación no significa cifrado.

### PostgreSQL: `pgcrypto`

PostgreSQL puede proporcionar funciones criptográficas mediante `pgcrypto`.

Ejemplos conceptuales:

```sql
CREATE EXTENSION pgcrypto;
```

Puede utilizarse para:

* hashing
* cifrado
* funciones criptográficas

**Advertencia**

Las claves no deben quedar expuestas directamente en consultas, código fuente o repositorios.

### MongoDB: protección criptográfica

MongoDB puede utilizar mecanismos de seguridad para proteger:

* comunicaciones
* autenticación
* determinados datos
* almacenamiento

La disponibilidad exacta de determinadas capacidades depende de la versión y edición utilizada.

**Principio**

> El mecanismo técnico debe seleccionarse de acuerdo con el riesgo y la arquitectura.

### Actividad 2.4

#### Protección criptográfica

Analizar:

1. una contraseña
2. una conexión de base de datos
3. un dato almacenado
4. una credencial de aplicación
5. una clave criptográfica

Para cada caso determinar:

* qué debe protegerse
* contra qué amenaza
* qué mecanismo utilizar
* dónde almacenar los secretos
* cómo verificar el control

## 2.5 — Privacidad y cumplimiento normativo

La seguridad busca proteger la información.

La privacidad busca asegurar que los datos personales sean tratados de manera adecuada.

```text
Seguridad
¿Qué controles protegen los datos?

Privacidad
¿Por qué tenemos estos datos y cómo los utilizamos?
```

### Principios prácticos de protección de datos

El tratamiento debe considerar principios como:

* licitud
* consentimiento
* información
* calidad
* finalidad
* lealtad
* proporcionalidad
* responsabilidad

Estos principios deben traducirse en decisiones técnicas.

### Marco normativo mexicano

En México existen marcos diferenciados para:

**Sector privado**

> Ley Federal de Protección de Datos Personales en Posesión de los Particulares.

**Sector público**

> Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.

La aplicación concreta depende de:

* quién trata los datos
* qué tipo de organización es
* qué información se procesa
* cuál es la finalidad del tratamiento

### ¿Qué significa para el DBA?

El cumplimiento no se resuelve únicamente con documentos legales.

Puede tener consecuencias técnicas sobre:

* acceso
* clasificación
* retención
* eliminación
* trazabilidad
* respaldos
* cifrado
* auditoría
* minimización

> El DBA participa en la implementación técnica de controles relacionados con el tratamiento de datos.

### GDPR, SOX y HIPAA

Son marcos diferentes y no deben tratarse como equivalentes.

| Marco | Enfoque principal                             |
| ----- | --------------------------------------------- |
| GDPR  | Protección de datos personales                |
| SOX   | Controles y reportes financieros              |
| HIPAA | Protección de información de salud en EE. UU. |

Su aplicación depende del contexto y alcance de la organización.

**Idea clave**

> No se implementa una norma únicamente porque el nombre aparezca en una lista de cumplimiento.

### Aviso de privacidad

El aviso de privacidad informa al titular sobre aspectos del tratamiento de sus datos.

Entre otros elementos, puede explicar:

* quién trata los datos
* qué datos se recopilan
* para qué se utilizan
* cómo pueden ejercerse derechos
* con quién pueden compartirse

**Implicación para el DBA**

La base de datos debe almacenar solamente la información necesaria para las finalidades definidas.

### Consentimiento y finalidad

Antes de almacenar un dato debe existir una razón válida para hacerlo.

```text
Dato
 ↓
¿Por qué se necesita?
 ↓
¿Para qué finalidad?
 ↓
¿Quién lo necesita?
 ↓
¿Durante cuánto tiempo?
```

La finalidad ayuda a determinar qué datos son necesarios y qué tratamiento está justificado.

### Minimización de datos

Un diseño puede ser técnicamente funcional y aun así recopilar información innecesaria.

Ejemplo:

```text
Registro de usuario

Necesario:
nombre
correo
contraseña

¿Realmente necesario?
fecha de nacimiento
CURP
teléfono
dirección
```

**Principio**

> No almacenar información solamente porque técnicamente podemos hacerlo.

### Derechos ARCO

Los titulares pueden ejercer derechos relacionados con sus datos personales.

```text
A → Acceso
R → Rectificación
C → Cancelación
O → Oposición
```

La organización debe contar con mecanismos para responder a estas solicitudes conforme al marco aplicable.

### Trazabilidad del tratamiento

La trazabilidad permite responder:

* quién accedió
* cuándo accedió
* qué operación realizó
* sobre qué información
* desde dónde
* con qué cuenta

Ejemplo:

```text
Usuario
  ↓
Autenticación
  ↓
Consulta
  ↓
Registro de actividad
  ↓
Evidencia
```

**La trazabilidad permite investigar y demostrar.**

### Base de datos y privacidad

El diseño de la base de datos puede facilitar o dificultar el cumplimiento.

Ejemplos:

* almacenar únicamente datos necesarios
* separar información sensible
* controlar privilegios
* registrar accesos
* aplicar retención
* eliminar información cuando corresponda
* proteger respaldos

### Actividad 2.5

#### De requisito de privacidad a control técnico

Para un caso de tratamiento de datos:

1. identificar el dato
2. identificar su finalidad
3. determinar quién debe acceder
4. definir periodo de retención
5. seleccionar controles
6. definir evidencia

**Resultado**

```text
Requisito
   ↓
Riesgo
   ↓
Control
   ↓
Implementación
   ↓
Evidencia
```

## 2.6 — Hardening de servidores de bases de datos

### Protección de servidores de bases de datos

Una base de datos no funciona de manera aislada.

```text
Datos
  ↓
Motor de BD
  ↓
Sistema operativo
  ↓
Red
  ↓
Infraestructura
```

Cada capa puede introducir riesgos.

### ¿Qué es hardening?

Hardening es el proceso de reducir la superficie de ataque y fortalecer la configuración de un sistema.

Incluye:

* eliminar configuraciones innecesarias
* restringir accesos
* proteger servicios
* proteger archivos
* reducir exposición
* aplicar actualizaciones
* registrar eventos
* establecer una línea base

### Reducción de superficie de ataque

Cada componente innecesario puede aumentar el riesgo.

```text
Más servicios
+
Más puertos
+
Más usuarios
+
Más permisos
+
Más interfaces
=
Mayor superficie de ataque
```

Hardening busca reducirla sin afectar la función necesaria.

### Configuración segura por defecto

Una instalación funcional no necesariamente es una instalación segura.

La pregunta no es:

> ¿Funciona?

La pregunta es:

> ¿Funciona con la menor exposición razonable?

Ejemplos:

* escuchar solamente donde sea necesario
* deshabilitar funciones no utilizadas
* evitar cuentas innecesarias
* restringir accesos
* utilizar autenticación adecuada

### Instalación funcional vs instalación segura

| Funcional                    | Segura                        |
| ---------------------------- | ----------------------------- |
| Permite conexiones           | Permite conexiones necesarias |
| Muchos servicios activos     | Servicios necesarios          |
| Acceso amplio                | Acceso restringido            |
| Configuración predeterminada | Configuración revisada        |
| Privilegios amplios          | Mínimo privilegio             |
| Sin línea base               | Línea base documentada        |

**Una instalación funcional es solamente el punto de partida.**

### Cuentas, servicios y extensiones innecesarias

Durante el hardening deben revisarse:

* cuentas
* roles
* servicios
* procesos
* extensiones
* módulos
* puertos
* interfaces

Antes de eliminar algo:

1. identificar su función
2. determinar dependencias
3. evaluar impacto
4. aplicar el cambio
5. verificar

### Separación de ambientes

Los ambientes de:

```text
Desarrollo
Pruebas
Producción
```

no deberían tratarse como uno solo.

Deben controlarse:

* datos
* credenciales
* accesos
* configuraciones
* permisos
* conexiones

**Ejemplo**

Los datos reales de producción no deberían copiarse directamente a desarrollo sin controles apropiados de protección y transformación.

### Configuración segura del servidor

El DBA debe revisar parámetros relacionados con:

* conexiones
* interfaces
* autenticación
* autorización
* logging
* TLS
* límites
* extensiones
* archivos
* almacenamiento

La configuración debe documentarse.

### Referencia operativa

### PostgreSQL: archivos y rutas importantes

En instalaciones mediante paquetes Debian/Ubuntu, las rutas habituales son:

| Elemento                | Ruta habitual                                |
| ----------------------- | -------------------------------------------- |
| Configuración principal | `/etc/postgresql/16/main/postgresql.conf`    |
| Control de acceso       | `/etc/postgresql/16/main/pg_hba.conf`        |
| Identificación          | `/etc/postgresql/16/main/pg_ident.conf`      |
| Directorio de datos     | `/var/lib/postgresql/16/main/`               |
| Logs                    | `/var/log/postgresql/`                       |
| Log principal           | `/var/log/postgresql/postgresql-16-main.log` |
| Servicio                | `postgresql@16-main.service`                 |
| Puerto                  | `5432`                                       |

**Nota**

Las rutas pueden cambiar según versión, distribución y método de instalación.

### PostgreSQL: `postgresql.conf`

Archivo principal de configuración.

Parámetros relevantes:

```text
listen_addresses
port
max_connections
ssl
logging_collector
log_connections
log_disconnections
```

**Pregunta**

> ¿Qué exposición genera cada parámetro?

### PostgreSQL: `pg_hba.conf`

Controla las reglas de autenticación y acceso.

Ejemplo conceptual:

```text
host  db_app  usuario_app  red_autorizada  scram-sha-256
```

La regla puede determinar:

* tipo de conexión
* base de datos
* usuario
* origen
* método de autenticación

> `pg_hba.conf` es uno de los archivos más importantes para el control de acceso en PostgreSQL.

### PostgreSQL: directorio de datos

Ruta habitual:

```text
/var/lib/postgresql/16/main/
```

Contiene información interna del cluster.

Debe protegerse:

* propietario
* grupo
* permisos
* acceso administrativo
* respaldos

**No debe utilizarse como un directorio común de intercambio de archivos.**

### PostgreSQL: logs

Ruta habitual:

```text
/var/log/postgresql/
```

Los logs pueden ayudar a detectar:

* conexiones
* desconexiones
* errores
* problemas de autenticación
* eventos administrativos
* problemas operativos

### MongoDB: archivos y rutas importantes

En instalaciones habituales:

| Elemento      | Ruta habitual                 |
| ------------- | ----------------------------- |
| Configuración | `/etc/mongod.conf`            |
| Datos         | `/var/lib/mongodb/`           |
| Logs          | `/var/log/mongodb/`           |
| Log principal | `/var/log/mongodb/mongod.log` |
| Servicio      | `mongod.service`              |
| Puerto        | `27017`                       |

**Nota**

Las rutas pueden variar según instalación y versión.

### MongoDB: `mongod.conf`

Archivo principal de configuración.

Puede contener parámetros relacionados con:

* red
* almacenamiento
* logging
* seguridad
* operación

Ejemplo:

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```

**Pregunta**

> ¿En qué interfaces debe aceptar conexiones el servidor?

### MongoDB: autenticación y autorización

Son conceptos diferentes.

**Autenticación**

> ¿Quién eres?

**Autorización**

> ¿Qué puedes hacer?

La autorización basada en roles permite limitar las operaciones disponibles para cada usuario.

### MongoDB: directorio de datos

Ruta habitual:

```text
/var/lib/mongodb/
```

Debe protegerse:

* propietario
* grupo
* permisos
* acceso administrativo
* respaldos

El acceso directo al almacenamiento debe estar restringido.

### MongoDB: logs

Ruta habitual:

```text
/var/log/mongodb/mongod.log
```

Pueden proporcionar evidencia sobre:

* arranque
* detención
* errores
* conexiones
* autenticación
* comportamiento del servidor

### PostgreSQL y MongoDB: referencia rápida

| Elemento          | PostgreSQL                     | MongoDB                |
| ----------------- | ------------------------------ | ---------------------- |
| Cliente           | `psql`                         | `mongosh`              |
| Servicio          | `postgresql@16-main`           | `mongod`               |
| Puerto            | `5432`                         | `27017`                |
| Configuración     | `postgresql.conf`              | `mongod.conf`          |
| Control de acceso | `pg_hba.conf`                  | Roles + autorización   |
| Datos             | `/var/lib/postgresql/16/main/` | `/var/lib/mongodb/`    |
| Logs              | `/var/log/postgresql/`         | `/var/log/mongodb/`    |
| Estado            | `pg_isready`                   | conexión con `mongosh` |
| Red               | `listen_addresses`             | `bindIp`               |
| TLS               | Sí                             | Sí                     |

**No son equivalencias funcionales exactas.**

La tabla sirve como referencia operativa.

### Usuario del servicio de base de datos

El motor de base de datos normalmente se ejecuta con una cuenta específica.

Ejemplo conceptual:

```text
PostgreSQL
    ↓
usuario postgres
    ↓
proceso del servidor
    ↓
archivos de PostgreSQL
```

El proceso no debería ejecutarse como `root`.

**Principio**

> Si un servicio es comprometido, sus privilegios deben estar limitados.

### Protección de archivos de configuración

Los archivos de configuración pueden modificar el comportamiento del servidor.

Por ello deben protegerse:

```text
/etc/postgresql/16/main/
/etc/mongod.conf
```

El DBA debe revisar:

* propietario
* grupo
* permisos
* usuarios con acceso
* posibilidad de modificación

### Protección de archivos de datos

Los directorios de datos contienen información crítica.

```text
PostgreSQL
/var/lib/postgresql/16/main/

MongoDB
/var/lib/mongodb/
```

Deben evitarse:

* permisos excesivos
* acceso de usuarios no autorizados
* copias no controladas
* exposición innecesaria

### Protección de respaldos

Un respaldo contiene información que puede ser tan sensible como la base de datos original.

Debe protegerse:

* acceso
* almacenamiento
* transmisión
* cifrado
* retención
* eliminación

**Pregunta**

> ¿Qué ocurriría si un atacante obtiene nuestro respaldo?

### Gestión de parches y actualizaciones

Las actualizaciones pueden corregir:

* vulnerabilidades
* errores
* problemas de estabilidad
* fallas de seguridad

Pero actualizar también requiere control.

Proceso:

```text
Identificar
   ↓
Evaluar
   ↓
Probar
   ↓
Aplicar
   ↓
Verificar
   ↓
Documentar
```

### Restricción del acceso administrativo

No todos los usuarios deben administrar el servidor.

Debe controlarse:

* cuentas administrativas
* acceso remoto
* privilegios
* sudo
* acceso al sistema operativo
* acceso a la base de datos

**Principio**

> Administrar una base de datos no implica administrar todo el servidor.

### Seguridad de red

### Segmentación de red

La segmentación limita qué sistemas pueden comunicarse entre sí.

Ejemplo conceptual:

```text
Usuarios
   ↓
Red de aplicaciones
   ↓
Servidor de base de datos
```

No todos los componentes necesitan comunicarse directamente.

**Objetivo**

Reducir movimiento lateral y exposición.

### Reglas de firewall

Un firewall puede controlar:

* origen
* destino
* protocolo
* puerto
* dirección
* estado de conexión

Una política básica puede expresarse:

```text
Permitir lo necesario
        +
Bloquear lo innecesario
```

### Allowlists

Una allowlist define explícitamente qué orígenes están autorizados.

Ejemplo conceptual:

```text
Servidor de aplicación
        ↓
TCP 5432
        ↓
Servidor PostgreSQL
```

En lugar de:

```text
Cualquier origen
        ↓
TCP 5432
        ↓
Servidor PostgreSQL
```

**Principio**

> Es preferible autorizar explícitamente lo necesario.

### Redes privadas y túneles seguros

Un servidor de base de datos no necesita estar expuesto directamente a Internet.

El acceso administrativo puede realizarse mediante:

* redes privadas
* VPN
* túneles seguros
* bastiones
* canales administrativos controlados

**Objetivo**

Reducir la exposición pública.

### Restricción de exposición pública

Una mala configuración:

```text
Internet
   ↓
5432
   ↓
PostgreSQL
```

Una arquitectura más restrictiva:

```text
Red autorizada
      ↓
  PostgreSQL
```

El puerto del motor no debería exponerse públicamente si la operación no lo requiere.

### Diagnóstico de una conexión

Cuando una conexión falla, analizar por capas:

```text
Cliente
  ↓
Conectividad
  ↓
Firewall
  ↓
Puerto
  ↓
Servicio
  ↓
Configuración
  ↓
Autenticación
  ↓
Autorización
  ↓
Permisos
```

**No cambiar cinco configuraciones al mismo tiempo.**

Primero identificar dónde está el problema.

### Línea base

### ¿Qué es una línea base?

Una línea base es una configuración de referencia considerada aceptable.

Permite comparar:

```text
Estado inicial
      ↓
Hardening
      ↓
Estado esperado
```

Sin línea base es difícil determinar si un servidor continúa endurecido.

### Configuración mínima aceptable

Una línea base puede definir:

* usuarios autorizados
* servicios necesarios
* puertos permitidos
* interfaces permitidas
* autenticación requerida
* privilegios
* archivos protegidos
* logging
* actualizaciones
* reglas de firewall

**La línea base debe ser verificable.**

### Checklist de hardening

#### Sistema operativo

* [ ] usuarios identificados
* [ ] privilegios revisados
* [ ] acceso administrativo restringido
* [ ] servicios innecesarios deshabilitados
* [ ] actualizaciones aplicadas
* [ ] logs disponibles

#### Base de datos

* [ ] usuarios y roles revisados
* [ ] privilegios mínimos
* [ ] conexiones restringidas
* [ ] autenticación configurada
* [ ] TLS evaluado
* [ ] logging revisado

#### Red

* [ ] puertos necesarios identificados
* [ ] origen permitido definido
* [ ] firewall configurado
* [ ] exposición pública evaluada

### Comparación antes y después

El hardening debe producir evidencia.

| Control       | Antes          | Después      |
| ------------- | -------------- | ------------ |
| Usuarios      | Amplios        | Restringidos |
| Servicios     | Varios activos | Necesarios   |
| Puertos       | Expuestos      | Limitados    |
| Privilegios   | Amplios        | Mínimos      |
| Acceso remoto | General        | Restringido  |
| Logs          | Limitados      | Revisados    |

**La evidencia debe demostrar el cambio.**

### Documentación de cambios

Todo cambio relevante debe registrar:

```text
¿Qué se cambió?
¿Por qué?
¿Quién lo realizó?
¿Cuándo?
¿Qué riesgo reduce?
¿Cómo se verificó?
¿Qué impacto tuvo?
¿Cómo revertirlo?
```

Esto convierte una modificación técnica en un cambio administrado.

### Revisión periódica

El hardening no es una actividad de una sola vez.

Debe revisarse periódicamente porque cambian:

* software
* usuarios
* servicios
* aplicaciones
* vulnerabilidades
* requisitos
* arquitectura

**Pregunta**

> ¿El servidor sigue cumpliendo la línea base seis meses después?

### Línea base y deriva de configuración

Con el tiempo pueden aparecer cambios:

```text
Línea base
    ↓
Cambios
    ↓
Nuevos servicios
    ↓
Nuevos usuarios
    ↓
Nuevos puertos
    ↓
Configuración modificada
    ↓
Deriva
```

La revisión periódica busca detectar esta deriva.

### Actualizaciones y parches

El DBA debe conocer:

* versión instalada
* versión disponible
* vulnerabilidades relevantes
* dependencia con aplicaciones
* ventana de mantenimiento
* procedimiento de reversión
* evidencia posterior

**No basta con decir: "está actualizado".**

Debe poder demostrarse.

### Actividad de hardening

#### Reducción de superficie de ataque

Los estudiantes deberán:

1. identificar servicios activos
2. identificar puertos
3. relacionar puertos y procesos
4. revisar configuraciones
5. identificar componentes innecesarios
6. analizar privilegios
7. aplicar cambios controlados
8. verificar funcionamiento
9. documentar evidencia

### Metodología de laboratorio

Utilizar la secuencia:

```text
Preguntar
    ↓
Observar
    ↓
Decidir
    ↓
Cambiar
    ↓
Verificar
    ↓
Documentar
```

**El objetivo no es memorizar comandos.**

El objetivo es aprender a tomar decisiones de administración segura.

### Evidencia de hardening

La evidencia puede incluir:

* comandos ejecutados
* configuración antes/después
* servicios activos
* puertos abiertos
* permisos
* usuarios
* reglas de acceso
* logs
* pruebas de conexión

**Una evidencia debe permitir que otra persona comprenda qué ocurrió.**

### Defensa en profundidad

La seguridad debe combinar controles.

```text
Datos
  ↓
Roles y privilegios
  ↓
Motor de BD
  ↓
Sistema operativo
  ↓
Firewall
  ↓
Segmentación
  ↓
Red
```

Si una capa falla, otras pueden limitar el impacto.

### Principio de mínimo privilegio

El principio aplica en todas las capas.

**Base de datos**

```text
GRANT SELECT
```

**Sistema operativo**

```text
sudo systemctl reload postgresql
```

**Red**

```text
permitir únicamente origen autorizado
```

> Mínimo privilegio significa otorgar solamente la capacidad necesaria.

### Integración de controles

Un servidor endurecido debe combinar:

```text
Usuarios
   +
Privilegios
   +
Configuración
   +
Archivos
   +
Servicios
   +
Red
   +
Logs
   +
Parches
   +
Línea base
```

Ningún control individual resuelve todos los riesgos.

### Actividad integral

#### Evaluación de seguridad

Para un servidor de base de datos:

1. identificar activos
2. identificar datos
3. identificar usuarios
4. identificar servicios
5. identificar puertos
6. revisar configuración
7. revisar privilegios
8. revisar archivos
9. revisar red
10. revisar actualizaciones
11. establecer línea base
12. documentar hallazgos

### Resultado esperado

Al finalizar esta unidad, el estudiante debe poder:

* proteger datos
* administrar privilegios
* reconocer información sensible
* aplicar mecanismos de protección criptográfica
* identificar riesgos de credenciales
* relacionar privacidad con bases de datos
* analizar un servidor
* reducir superficie de ataque
* aplicar controles de hardening
* verificar configuraciones
* documentar evidencia

### Pregunta de cierre

> Una base de datos tiene usuarios correctamente configurados, pero el servidor permite acceso administrativo amplio, tiene servicios innecesarios y expone el puerto del motor a Internet.

**¿Está realmente segura?**

#### Respuesta esperada

No.

La seguridad debe evaluarse de forma integral.

```text
Datos
+
Base de datos
+
Sistema operativo
+
Red
+
Administración
+
Evidencia
```

**El DBA debe proteger el sistema completo, no solamente la base de datos.**

### Referencia rápida del DBA

| Necesidad           | PostgreSQL                     | MongoDB              |
| ------------------- | ------------------------------ | -------------------- |
| Cliente             | `psql`                         | `mongosh`            |
| Servicio            | `postgresql@16-main`           | `mongod`             |
| Puerto              | `5432`                         | `27017`              |
| Configuración       | `postgresql.conf`              | `mongod.conf`        |
| Control de acceso   | `pg_hba.conf`                  | Roles + autorización |
| Datos               | `/var/lib/postgresql/16/main/` | `/var/lib/mongodb/`  |
| Logs                | `/var/log/postgresql/`         | `/var/log/mongodb/`  |
| Estado              | `pg_isready`                   | `mongosh`            |
| Red                 | `listen_addresses`             | `bindIp`             |
| Comunicación segura | TLS                            | TLS                  |

> **Utiliza esta tabla como referencia durante las prácticas, no como sustituto de la documentación oficial del motor.**
