---
title: "1. Principios de seguridad e inyección SQL/NoSQL"
description: "Unidad 2 de DBA — CIA aplicado a datos, privilegio mínimo, separación de funciones, inyección SQL y NoSQL, y de quién es la responsabilidad de prevenirla."
---

## El caso guía de la unidad: `clientes`

Desde este tema y hasta el cierre de la unidad, todos los ejemplos usan el
mismo dato, en los dos motores que ha trabajado la materia:

| Motor | Objeto | Columnas / campos |
| --- | --- | --- |
| PostgreSQL | tabla `clientes` | `id, nombre, correo, telefono, rfc, edad, clave_acceso` |
| MongoDB | colección `tienda_demo.clientes` | `{ nombre, correo, telefono, rfc, edad, clave_acceso }` |

Cada tema de la unidad le agrega una capa de protección distinta a este
mismo registro: primero evitamos que una entrada maliciosa lo altere
(este tema), después controlamos quién puede acceder a él (tema 2),
después protegemos los campos sensibles que contiene (tema 3), después
lo cifrado en tránsito y en reposo (tema 4), después conectamos cada
control con la obligación legal que lo exige (tema 5), y cerramos
endureciendo el servidor que lo aloja (tema 6). Un usuario correctamente
autenticado puede seguir teniendo demasiados privilegios; un dato cifrado
puede seguir estando disponible para quien sí está autorizado a leerlo;
cerrar un puerto innecesario no sustituye el control de acceso. Ninguna
capa reemplaza a las demás.

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
     (tema 2)   (temas 3/4)   (tema 6)
```

Los laboratorios de la unidad preparan `clientes` sobre dos contenedores
Docker desechables (PostgreSQL 16 y MongoDB 7) — ver la sección "Entorno"
del [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/)
para los comandos exactos.

## La tríada CIA aplicada a bases de datos

Ya trabajaste, en Ciberseguridad, los principios de **confidencialidad**,
**integridad** y **disponibilidad** (CIA) de forma general. Aquí los
aplicamos directamente a datos administrados por un DBA:

| Principio | En qué se traduce para un DBA |
| --- | --- |
| **Confidencialidad** | Solo quien está autorizado puede leer el dato. Se traduce en roles y permisos (tema 2), enmascaramiento (tema 3) y cifrado (tema 4). |
| **Integridad** | El dato refleja la realidad y no fue alterado sin autorización. Se traduce en *constraints*, transacciones ACID, y también en defenderse de inyección — que es un ataque directo a la integridad. |
| **Disponibilidad** | El dato está accesible cuando se necesita (retoma el concepto de disponibilidad de la [Unidad 1](/materias/dba/unidad-01/02-responsabilidades-operativas/)). Se traduce en respaldos, alta disponibilidad, y dimensionar bien `max_connections` para que una avalancha de conexiones no tumbe el servicio. |

> Referencia. Saltzer, J.H. y Schroeder, M.D. (1975). "The Protection of
> Information in Computer Systems". *Proceedings of the IEEE*, 63(9),
> 1278–1308.

## Privilegio mínimo y separación de funciones

A la tríada CIA se agregan dos principios centrales para el control de
acceso del tema 2:

* **Privilegio mínimo** (*least privilege*) — cada usuario o proceso
  cuenta solo con los permisos que necesita para su tarea, ni uno más.
* **Separación de funciones** — ninguna persona controla sola todo el
  ciclo de una operación sensible.

Ambos se aplican directamente en el siguiente tema: es exactamente lo que
separan los roles `lector`, `editor` y `administrador` que vas a construir
en PostgreSQL y MongoDB.

## Inyección SQL y NoSQL: el concepto

**Inyección** es ejecutar código o lógica no intencionada porque una
entrada de usuario se mezcló con la lógica de la consulta en vez de
tratarse como un simple valor de datos. Aplica igual en SQL y en NoSQL.

Ejemplo conceptual de cómo una aplicación construiría esa consulta por
concatenación (no es SQL puro — la concatenación ocurre en el código de
la aplicación, no en la base de datos):

```text
consulta = "SELECT * FROM clientes WHERE nombre = '" + entrada + "'"
```

Si la entrada es `' OR '1'='1`, la condición se vuelve siempre verdadera
y la consulta devuelve todos los registros, no solo el solicitado — la
misma familia de vulnerabilidad reaparece en MongoDB con un filtro como
`{ clave_acceso: { $ne: null } }`, verdadero para cualquier valor que
exista.

> Las simulaciones prácticas de inyección, vulnerable contra mitigada, en
> PostgreSQL y en MongoDB, están en el
> [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/),
> no en este tema. Aquí nos enfocamos en el concepto, la prevención y la
> responsabilidad organizacional.

## Cómo se previene

### Consultas parametrizadas

```python
# vulnerable
cur.execute(f"SELECT * FROM clientes WHERE nombre = '{entrada_nombre}'")

# parametrizada
cur.execute("SELECT * FROM clientes WHERE nombre = %s", (entrada_nombre,))
```

El motor recibe el valor por un canal separado de la consulta. Nunca se
interpreta como código, sin importar qué contenga. En SQL puro esto se
logra con `PREPARE`; en NoSQL, con tipado estricto del valor antes de
construir el filtro.

### ORM con escape automático

```python
# seguro, el ORM parametriza por debajo
session.query(Cliente).filter(Cliente.nombre == entrada_nombre)

# igual de vulnerable aunque está "dentro" del ORM
session.execute(f"SELECT * FROM clientes WHERE nombre = '{entrada_nombre}'")
```

Usar un ORM no protege por sí solo. El riesgo vuelve en cuanto alguien
escribe SQL crudo dentro de él.

### Validación y tipado de entradas

```javascript
const nombre = String(entrada_nombre)
const clave = String(entrada_clave)
db.clientes.findOne({ nombre, clave_acceso: clave })
```

Forzar el tipo esperado antes de construir la consulta impide que un
objeto como `{"$ne": null}` llegue como operador en vez de como valor.

### Privilegio mínimo en la cuenta de aplicación

```sql
CREATE ROLE app_usuario WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT, INSERT, UPDATE ON clientes TO app_usuario;
```

```text
postgresql://app_usuario:<REDACTED>@servidor:5432/tienda_demo
```

La cuenta que usa la aplicación para conectarse nunca debe ser
superusuario. Si una inyección logra ejecutarse igual, el daño queda
acotado a lo que `app_usuario` puede hacer.

## Qué más se debe considerar

| Riesgo adicional | En qué consiste |
| --- | --- |
| Inyección de segundo orden | Un dato ya almacenado, aparentemente seguro, se reutiliza sin sanitizar en una consulta posterior. |
| Procedimientos almacenados mal construidos | Un *stored procedure* que concatena SQL dinámico internamente hereda el mismo riesgo. |
| Entradas no evidentes | *Headers* HTTP, *cookies*, nombres de archivo subido — cualquier dato que llegue del cliente es una entrada. |
| Defensa en profundidad | Un WAF (*Web Application Firewall*) ayuda a detectar patrones conocidos, pero es una capa adicional, nunca el único control. |

## ¿De quién es la responsabilidad de prevenir la inyección?

La prevención de inyección no es responsabilidad exclusiva del DBA. Es un
esfuerzo compartido, y sí deben existir escaneos periódicos, no solo
revisión manual de código:

| Equipo | Responsabilidad |
| --- | --- |
| Desarrollo | Responsable primario: escribir consultas parametrizadas, validar entradas, usar el ORM correctamente. Aquí vive la mayoría del riesgo real. |
| DBA | Responsable de que la cuenta de aplicación tenga privilegio mínimo, de auditar patrones anómalos en los *logs* de consultas, y de que ningún usuario de aplicación tenga privilegios de superusuario. |
| Seguridad y QA | Responsable de escaneos periódicos, análisis estático de código (SAST) y pruebas dinámicas sobre la aplicación en ejecución (DAST), integrados al *pipeline* de CI/CD. |

> Referencia. OWASP *SQL Injection Prevention Cheat Sheet*; OWASP
> *Testing for NoSQL Injection*; ISO/IEC 27002:2022, secc. 5.2,
> "Information security roles and responsibilities".

> **Actividad 2 — Principios de seguridad e inyección (laboratorio).**
> Vas a reproducir, contra PostgreSQL y MongoDB reales, la diferencia de
> comportamiento entre una consulta vulnerable y su equivalente
> prevenida, y a responder qué equipo sería responsable de corregir cada
> causa raíz que identifiques. Instrucciones completas en la
> [Actividad 2](/materias/dba/unidad-02/actividades/actividad-2/), guía
> técnica paso a paso en el
> [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/).

## Referencias de este tema

- OWASP Foundation, *SQL Injection Prevention Cheat Sheet* (REF-U2-07).
- OWASP Foundation, *NoSQL Security Cheat Sheet* / *Testing for NoSQL
  Injection* (REF-U2-08).

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente.

## Qué sigue

Ya evitamos que una entrada maliciosa altere `clientes`. El siguiente
problema es distinto: ¿quién debería poder acceder a `clientes`, y para
hacer qué? Continúa con
[2. Control de acceso: usuarios, roles y permisos](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/).
