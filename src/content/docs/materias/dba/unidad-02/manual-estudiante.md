---
title: "Manual del estudiante — Unidad 2"
description: "Seguridad, privacidad y control de acceso — desarrollo completo de los temas de la unidad."
---

## 1. Identificación de la unidad

| Campo | Información |
| --- | --- |
| Unidad | U2 — Seguridad, privacidad y control de acceso |
| Materia | Gestión de Seguridad y Desempeño de Bases de Datos (DBA) |
| Carácter | Teórico-práctico — primera unidad con laboratorios reales |
| Entorno técnico | PostgreSQL y MongoDB vía contenedores Docker (`postgres:16`, `mongo:7`) |

## 2. Competencias de referencia

> **COMP-DBA-03.** Aplicar principios de seguridad, control de acceso y
> protección de datos sensibles, incluyendo cifrado y cumplimiento
> normativo aplicable a datos personales.

> **COMP-DBA-04.** Aplicar hardening a un servidor de base de datos,
> reduciendo su superficie de ataque y documentando la configuración
> segura resultante.

Objetivos específicos de la unidad:

* **OE-U2.1** — Explicar los principios de seguridad de datos y aplicar
  mitigación de inyección SQL/NoSQL.
* **OE-U2.2** — Implementar control de acceso mediante usuarios, roles y
  permisos.
* **OE-U2.3** — Aplicar protección de datos sensibles.
* **OE-U2.4** — Aplicar cifrado en tránsito y en reposo.
* **OE-U2.5** — Explicar el marco de privacidad y cumplimiento normativo.
* **OE-U2.6** — Aplicar hardening a un servidor de base de datos.

## 3. ¿Qué problema vamos a resolver?

En la Unidad 1 diagnosticaste un entorno de base de datos sin
responsable claro y sin ambientes separados. Ese mismo entorno tiene un
problema adicional:

> Cualquier persona con la contraseña del usuario administrador puede
> leer, modificar o borrar cualquier dato. No hay cifrado en las
> conexiones, las credenciales viajan en texto plano, no hay clasificación
> de qué datos son sensibles, y el servidor conserva su configuración de
> instalación por defecto, con puertos y servicios innecesarios expuestos
> a la red.

La pregunta que organiza esta unidad:

> **¿Cómo protegemos ese entorno — quién puede acceder a qué, cómo se
> protegen los datos sensibles, y cómo se reduce la superficie de ataque
> del servidor?**

A partir de esta unidad vas a trabajar sobre un SGBD real, ejecutado en un
contenedor Docker — la misma tecnología que ya conoces de la materia de
Contenedores y Cloud Native.

## 4. Activación

> **Actividad 1 — Diagnóstico de riesgos.** A partir de la situación de
> la sección 3, identifica qué riesgos concretos existen. Guía completa
> en la página de [Actividades](/materias/dba/unidad-02/actividades/).

## 5. Principios de seguridad en bases de datos

Ya trabajaste, en Ciberseguridad, los principios de **confidencialidad**,
**integridad** y **disponibilidad** (CIA) de forma general. Aquí los
aplicamos directamente a datos administrados por un DBA:

* **Confidencialidad** — solo quienes deben ver un dato pueden verlo.
* **Integridad** — los datos no se modifican de forma no autorizada o
  accidental.
* **Disponibilidad** — los datos están accesibles cuando se necesitan
  (retoma el concepto de disponibilidad de la Unidad 1).

A estos tres principios se agregan dos más, centrales para el control de
acceso de esta unidad:

* **Privilegio mínimo** (*least privilege*) — cada usuario o proceso debe
  tener únicamente los permisos estrictamente necesarios para su función,
  ni uno más.
* **Separación de funciones** — ninguna persona debería tener, por sí
  sola, control total sobre una operación crítica de principio a fin (por
  ejemplo, quien solicita un cambio no debería ser quien lo aprueba y
  quien lo ejecuta).

### Inyección SQL e inyección NoSQL

Uno de los riesgos más documentados contra la confidencialidad e
integridad de una base de datos es la **inyección** (*injection*): cuando
una aplicación construye una consulta concatenando directamente la
entrada de un usuario, esa entrada puede alterar la lógica de la
consulta.

Ejemplo conceptual de cómo una aplicación construiría esa consulta por
concatenación (no es SQL puro, ya que la concatenación ocurre en el
código de la aplicación, no en la base de datos):

```text
-- Vulnerable: el valor del usuario se concatena directamente
consulta = "SELECT * FROM usuarios WHERE nombre = '" + entrada_usuario + "'"
```

Si `entrada_usuario` es `' OR '1'='1`, la condición se vuelve siempre
verdadera y la consulta devuelve todos los registros, no solo el
solicitado.

La OWASP Foundation, en su *SQL Injection Prevention Cheat Sheet*,
recomienda como defensa principal el uso de **consultas parametrizadas**
(*prepared statements*), donde el valor del usuario se envía por
separado, nunca como parte del texto de la consulta, y también recomienda
aplicar **privilegio mínimo** a la cuenta que ejecuta la consulta
(REF-U2-07):

```sql
-- Seguro: el valor se vincula como parámetro, no se concatena
SELECT * FROM usuarios WHERE nombre = $1;
```

Las bases de datos NoSQL tienen su propio tipo de inyección. La OWASP
*NoSQL Security Cheat Sheet* recomienda, entre otras defensas, rechazar
operadores de consulta controlados por el cliente (como `$where` o
`$regex`) a menos que sean estrictamente necesarios y estén validados, y
preferir APIs de alto nivel (ODM/ORM) que construyan las consultas de
forma segura (REF-U2-08).

> **Actividad 2 — Principios de seguridad e inyección (laboratorio).**
> Vas a reproducir ambos casos (vulnerable y seguro) sobre un contenedor
> PostgreSQL. Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 6. Control de acceso: usuarios, roles y permisos

En PostgreSQL, los conceptos de **usuario** y **rol** están unificados: un
usuario es, técnicamente, un rol al que se le concedió el atributo
`LOGIN`. Los **privilegios** (qué puede hacer un rol sobre un objeto) se
otorgan con `GRANT` y se retiran con `REVOKE`. Solo el dueño de un objeto
(o un superusuario) puede otorgar o revocar privilegios sobre él
(REF-U2-01).

Ejemplo mínimo (valores de ejemplo, no reales):

```sql
-- Crear un rol de solo lectura
CREATE ROLE lector WITH LOGIN PASSWORD '<REDACTED>';
GRANT SELECT ON TABLE clientes TO lector;

-- Revocar el privilegio cuando ya no se necesita
REVOKE SELECT ON TABLE clientes FROM lector;
```

MongoDB usa **control de acceso basado en roles** (*Role-Based Access
Control*, RBAC): un usuario recibe uno o más roles, y cada rol determina
qué acciones puede realizar sobre qué recursos. MongoDB ofrece roles
integrados con los privilegios más comunes, y permite crear roles
personalizados cuando esos no son suficientes (REF-U2-05).

> **Dato importante que vas a usar en esta unidad y en la Actividad 7:**
> MongoDB **no habilita el control de acceso por defecto**. Debe activarse
> explícitamente (por ejemplo, con la opción `--auth` al iniciar el
> servidor, o su equivalente en el archivo de configuración) (REF-U2-05).
> Esto no es un detalle menor: en 2017, decenas de miles de instancias de
> MongoDB expuestas a internet sin autenticación fueron atacadas y
> borradas por campañas de ransomware que simplemente escanearon el
> puerto por defecto (27017) buscando instalaciones sin proteger — ver el
> caso real de la sección 10.

### Revocación y revisión periódica

Otorgar un permiso no es una decisión permanente: cuando una persona
cambia de función o dejar de necesitar un acceso, ese privilegio debe
**revocarse**. Además, buenas prácticas de administración recomiendan una
**revisión periódica** de qué privilegios tiene cada rol, para detectar
permisos que ya no deberían existir (privilegios "acumulados" con el
tiempo, un riesgo directo al principio de privilegio mínimo de la
sección 5).

> **Actividad 3 — Matriz de usuarios, roles y permisos (laboratorio,
> primera parte de la evidencia oficial).** Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 7. Protección de datos sensibles

No todos los datos requieren el mismo nivel de protección. El primer paso
es **clasificar**:

* **Dato personal** — cualquier información que identifique o haga
  identificable a una persona (nombre, correo, teléfono).
* **Dato sensible** — un subconjunto de datos personales cuyo uso
  indebido podría causar un daño mayor (origen étnico, salud, creencias
  religiosas, entre otros, según la legislación aplicable — ver sección
  9).

Una vez clasificados, existen técnicas para proteger los datos sensibles
sin eliminarlos por completo:

* **Enmascaramiento de datos** (*data masking*) — mostrar solo una parte
  del dato o sustituirlo por un valor no identificable (por ejemplo,
  mostrar solo los últimos 4 dígitos de un número de tarjeta).
* **Seudonimización** — reemplazar un dato identificable por un
  identificador artificial, de forma que revertir el proceso solo sea
  posible con información adicional (una llave) que se guarda por
  separado.
* **Anonimización** — a diferencia de la seudonimización, la anonimización
  busca que **no sea posible revertir el proceso**: el dato deja de poder
  asociarse a una persona incluso con información adicional.

Finalmente, los datos no deben conservarse indefinidamente: la
**retención** debe tener un plazo definido, y al final de ese plazo debe
existir un procedimiento de **eliminación segura** (que el dato realmente
deje de ser recuperable, no solo "invisible" para la aplicación).

> **Actividad 4 — Clasificación y enmascaramiento de datos sensibles.**
> Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 8. Cifrado y protección técnica

El cifrado protege los datos de quien no tiene la llave para descifrarlos,
incluso si logra acceder a ellos por otro medio (por ejemplo,
interceptando tráfico de red o accediendo directamente a los archivos de
disco).

### Cifrado en tránsito

Protege los datos mientras viajan por la red, entre el cliente y el
servidor de base de datos. PostgreSQL soporta conexiones cifradas
mediante TLS: con el parámetro `ssl` activado en `postgresql.conf`, el
servidor escucha tanto conexiones normales como cifradas en el mismo
puerto, y negocia con cada cliente si usar TLS (REF-U2-03). MongoDB
ofrece un mecanismo equivalente mediante las opciones `--tlsMode` y
`--tlsCertificateKeyFile` (REF-U2-06).

### Cifrado en reposo

Protege los datos ya almacenados. Un ejemplo a nivel de columna en
PostgreSQL es la extensión **pgcrypto**, que agrega funciones
criptográficas (hash, cifrado simétrico y asimétrico) directamente
utilizables desde SQL (REF-U2-04).

```sql
-- Ejemplo conceptual: cifrar y descifrar un valor con pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO clientes (nombre, dato_sensible)
VALUES ('Ejemplo', pgp_sym_encrypt('valor-secreto', '<REDACTED-KEY>'));

SELECT pgp_sym_decrypt(dato_sensible::bytea, '<REDACTED-KEY>')
FROM clientes;
```

### Manejo seguro de credenciales

Una llave de cifrado, igual que una contraseña, **nunca debe** guardarse
en texto plano dentro del código de la aplicación ni en el propio
repositorio de código. Este riesgo —credenciales expuestas en
aplicaciones— es una de las causas más comunes de brechas de seguridad
documentadas en la industria. La gestión de llaves (dónde y cómo se
almacenan de forma segura) es un tema que, a nivel introductorio, esta
unidad solo presenta como principio: soluciones más avanzadas (como un
gestor de secretos o un servicio de administración de llaves) exceden el
alcance de esta unidad.

> **Actividad 5 — Cifrado en tránsito y en reposo (laboratorio).**
> Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).
>
> ⚠️ **Advertencia.** En los laboratorios de esta unidad nunca uses
> contraseñas ni llaves reales. Usa siempre valores de ejemplo, y nunca
> los incluyas en texto plano en un entregable o repositorio público.

## 9. Privacidad y cumplimiento normativo

Todo lo que trabajaste en las secciones 6 a 8 (control de acceso,
clasificación, cifrado) no es solo una buena práctica técnica: en México,
buena parte de esas prácticas están **obligadas por ley** cuando se trata
de datos personales.

### Marco normativo mexicano

* **Ley Federal de Protección de Datos Personales en Posesión de los
  Particulares (LFPDPPP)** — aplica al sector privado (empresas y
  organizaciones no gubernamentales) (REF-U2-09).
* **Ley General de Protección de Datos Personales en Posesión de Sujetos
  Obligados (LGPDPPSO)** — aplica a instituciones y sujetos obligados del
  sector público (REF-U2-10).

> Ambas leyes fueron republicadas el 20 de marzo de 2025, con una reforma
> el 14 de noviembre de 2025 — es un marco normativo relativamente
> reciente, no el de hace más de una década. Verifica siempre su vigencia
> antes de aplicarlo a un caso real.

El programa de esta materia también menciona, como **referencia** (no como
marco normativo central), normativas internacionales estrictas como GDPR
(Unión Europea), SOX y HIPAA (Estados Unidos). No profundizamos en ellas
en esta unidad: el marco central es el mexicano.

### Principios prácticos y derechos ARCO

Las leyes mexicanas establecen, entre otros, los principios de
**consentimiento** (el titular debe autorizar el uso de sus datos),
**finalidad** (los datos solo deben usarse para lo que se informó al
titular) y **minimización de datos** (no recolectar más datos de los
necesarios) — este último principio se conecta directamente con la
clasificación de datos de la sección 7.

Los titulares de los datos tienen, además, los derechos **ARCO**:

* **A**cceso — conocer qué datos propios tiene una organización.
* **R**ectificación — corregir datos inexactos.
* **C**ancelación — solicitar que se eliminen sus datos.
* **O**posición — oponerse a un uso específico de sus datos.

### Implicaciones para el DBA

Un DBA no decide las políticas de privacidad de la organización, pero es
quien **implementa técnicamente** las obligaciones que de ellas se
derivan: si la ley exige minimización de datos, el DBA es quien decide
qué columnas realmente necesitan almacenarse. Si un titular ejerce su
derecho de cancelación, el DBA es quien ejecuta —de forma segura y
verificable— la eliminación de esos datos (sección 7).

> **Actividad 6 — Trazabilidad control → obligación legal.**
> Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 10. Hardening: protección de servidores de bases de datos

**Hardening** (endurecimiento de configuración) es el proceso de reducir
la **superficie de ataque** de un sistema: eliminar o deshabilitar todo lo
que no es estrictamente necesario para que el sistema cumpla su función,
de forma que quede menos espacio para que algo salga mal.

### Instalación funcional vs. instalación segura

Una instalación "funcional" es la que simplemente funciona: puertos
abiertos por defecto, cuentas de ejemplo activas, servicios adicionales
habilitados "por si acaso". Una instalación **segura** es la que además
minimiza deliberadamente todo eso, aunque tome más trabajo configurarla.

### Configuración segura del servidor

Incluye: revisar parámetros críticos de configuración, deshabilitar
cuentas/servicios/extensiones que no se usan, restringir qué conexiones
remotas se aceptan, configurar con cuidado los puertos y direcciones de
escucha, y —retomando la Unidad 1— mantener separados los ambientes de
desarrollo, pruebas y producción también a nivel de configuración de
seguridad (no solo de datos).

En PostgreSQL, el archivo **`pg_hba.conf`** ("host-based authentication")
controla exactamente qué conexiones se aceptan: tipo de conexión, rango de
direcciones IP del cliente, base de datos, usuario y método de
autenticación permitido para cada combinación (REF-U2-02). Restringir este
archivo a solo los rangos de red realmente necesarios es una de las
medidas de hardening más directas y efectivas.

### Seguridad del sistema operativo y de la red

A nivel de sistema operativo: el proceso del servicio de base de datos
debe ejecutarse con los permisos mínimos necesarios (no como
administrador/root), los archivos de configuración y de datos deben tener
permisos restringidos, y deben aplicarse actualizaciones y parches de
forma oportuna (ver más abajo).

A nivel de red: **segmentar** la red (que la base de datos no comparta
segmento con sistemas menos confiables), aplicar reglas de **firewall**,
usar **listas de permitidos** (*allowlists*) en vez de listas de bloqueo,
preferir redes privadas o túneles seguros para el acceso administrativo,
y evitar exponer el servidor directamente a internet pública sin
necesidad.

### Línea base de configuración segura

Una **línea base** (*baseline*) de configuración segura es un documento de
referencia —normalmente un checklist— contra el que se compara la
configuración real de un servidor. El **CIS PostgreSQL Benchmark**, del
Center for Internet Security, es un ejemplo público y ampliamente usado
de este tipo de checklist para PostgreSQL (REF-U2-11). Documentar los
cambios de seguridad realizados y revisar la configuración periódicamente
son parte integral de mantener esa línea base vigente.

### Actualizaciones y parches de seguridad

Ningún hardening inicial es suficiente si el software nunca se actualiza:
las vulnerabilidades conocidas siguen siendo explotables mientras el
parche correspondiente no se aplique. El **reporte oficial de la GAO**
(Government Accountability Office de Estados Unidos) sobre la brecha de
datos de Equifax en 2017 —una de las más grandes de la historia, con
información de más de 145 millones de personas comprometida— identificó
fallas relacionadas con identificación y detección de vulnerabilidades,
segmentación del acceso a las bases de datos, y gobierno de los datos
como parte de las causas que permitieron el ataque (REF-U2-12).

> **Actividad 7 — Checklist de hardening (laboratorio, antes/después).**
> Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 11. Cierre: matriz de usuarios, roles, permisos y controles de privacidad

Recorriste, en esta unidad: los principios de seguridad y la mitigación de
inyección (secc. 5), el control de acceso (secc. 6), la protección de
datos sensibles (secc. 7), el cifrado (secc. 8), el marco normativo (secc.
9) y el hardening del servidor (secc. 10).

> **Actividad 8 — Matriz de usuarios, roles, permisos y controles de
> privacidad (evidencia oficial de la unidad).** Vas a integrar todo lo
> anterior en un solo instrumento. Instrucciones completas en
> [Actividades](/materias/dba/unidad-02/actividades/).

## 12. Autoevaluación

Responde sin consultar el manual. Después verifica tus respuestas con tu
docente.

1. Explica por qué una consulta parametrizada previene la inyección SQL,
   mientras que una consulta construida por concatenación no.
2. ¿Por qué el control de acceso por sí solo no protege datos sensibles si
   no se combina con clasificación y, en algunos casos, cifrado?
3. Explica la diferencia entre seudonimización y anonimización.
4. ¿Qué diferencia hay entre cifrado en tránsito y cifrado en reposo? Da
   un ejemplo de motor/mecanismo para cada uno.
5. Explica, con tus propias palabras, cómo se conecta el principio de
   minimización de datos (LFPDPPP/LGPDPPSO) con la clasificación de datos
   de la sección 7.
6. ¿Qué significa que una instalación sea "funcional" pero no "segura"? Da
   un ejemplo concreto de esta unidad.
7. En el caso de los ataques a MongoDB de 2017 (sección 10), ¿qué
   configuración por defecto específica permitió el ataque, y qué control
   de esta unidad la habría evitado?
8. Según el reporte de la GAO sobre Equifax, ¿qué tipo de fallas
   (más allá de "no aplicar un parche") contribuyeron a la brecha?

## 13. Glosario

| Término | Definición |
| --- | --- |
| Privilegio mínimo (*least privilege*) | Principio según el cual cada usuario o proceso debe tener únicamente los permisos estrictamente necesarios. |
| Separación de funciones | Principio según el cual ninguna persona debería controlar, por sí sola, una operación crítica de principio a fin. |
| Inyección SQL / NoSQL | Ataque que altera la lógica de una consulta insertando entrada de usuario no validada dentro de ella. |
| Rol | En PostgreSQL, entidad a la que se otorgan privilegios. Un usuario es un rol con el atributo `LOGIN`. |
| RBAC (*Role-Based Access Control*) | Modelo de control de acceso basado en roles, usado por MongoDB y muchos otros sistemas. |
| Enmascaramiento de datos | Mostrar solo una parte de un dato o sustituirlo por un valor no identificable. |
| Seudonimización | Sustitución de un dato identificable por un identificador artificial, reversible con una llave separada. |
| Anonimización | Proceso que impide asociar un dato a una persona de forma irreversible. |
| Cifrado en tránsito | Protección criptográfica de datos mientras viajan por la red. |
| Cifrado en reposo | Protección criptográfica de datos ya almacenados. |
| LFPDPPP | Ley Federal de Protección de Datos Personales en Posesión de los Particulares (sector privado, México). |
| LGPDPPSO | Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (sector público, México). |
| ARCO | Derechos de Acceso, Rectificación, Cancelación y Oposición sobre datos personales. |
| Hardening | Proceso de reducir la superficie de ataque de un sistema mediante configuración segura. |
| Superficie de ataque | Conjunto de puntos por los que un sistema podría ser atacado. |
| `pg_hba.conf` | Archivo de PostgreSQL que controla qué conexiones se aceptan y con qué método de autenticación. |
| Línea base de configuración segura | Documento de referencia (checklist) contra el que se compara la configuración real de un servidor. |

## 14. Qué aprenderemos después

Esta unidad se detiene en el nivel introductorio de seguridad aplicada a
datos. Los siguientes temas **no se explican todavía**:

* Bitácoras técnicas, interpretación de eventos y gobierno práctico de
  datos (**Unidad III**).
* Índices, planes de ejecución y monitoreo de desempeño (**Unidad IV**).
* Respaldo, restauración y recuperación ante desastres (**Unidad V**).
* Alta disponibilidad, replicación y particionamiento horizontal (**Unidad
  VI**).

## 15. Referencias

Este material se apoya exclusivamente en las trece referencias de
esta unidad, disponibles en la página de
[Referencias](/materias/dba/unidad-02/referencias/).
