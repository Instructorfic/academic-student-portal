---
title: "LAB-01 — Protección y privacidad de datos"
description: "Unidad 2 de DBA — clasificación, enmascaramiento, seudonimización, anonimización y retención en PostgreSQL."
---

**Materia:** Gestión de Seguridad y Desempeño de Bases de Datos
**Unidad:** II — Seguridad, privacidad y control de acceso
**Tema:** 2.3 — Datos sensibles, privacidad y protección de la información
**Motor:** PostgreSQL 16
**Modalidad:** Práctica individual
**Duración estimada:** 3 horas

---

## 1. Objetivo

Aplicar mecanismos de protección de datos en PostgreSQL de acuerdo con el propósito y nivel de acceso requerido por diferentes usuarios de una organización.

Durante la práctica se aplicarán:

* clasificación de datos
* enmascaramiento (masking)
* seudonimización (pseudonymization)
* anonimización (anonymization)
* control de acceso
* retención de datos

El laboratorio busca que el estudiante comprenda que **no existe una única técnica de protección adecuada para todos los escenarios**.

---

## 2. Resultado esperado

Al finalizar el laboratorio, el estudiante será capaz de:

1. Identificar datos que requieren protección.
2. Distinguir identificadores directos y posibles cuasi-identificadores.
3. Implementar enmascaramiento mediante una vista.
4. Restringir el acceso al dato original.
5. Implementar seudonimización mediante identificadores sustitutos.
6. Separar el acceso a los datos seudonimizados del mapa de correspondencia.
7. Generar información agregada que reduzca el riesgo de reidentificación.
8. Explicar las limitaciones de una estrategia de anonimización.
9. Proponer una regla básica de retención de datos.
10. Demostrar mediante evidencias que los controles implementados funcionan.

---

## 3. Prerrequisitos

El estudiante debe conocer:

* conceptos básicos de bases de datos relacionales
* `CREATE TABLE`
* `INSERT`
* `SELECT`
* `CREATE ROLE`
* `GRANT`
* `REVOKE`
* esquemas
* claves primarias y foráneas
* consultas con `GROUP BY`
* conceptos básicos de seguridad de la información
* principio de mínimo privilegio

Debe haber realizado previamente la actividad de **mínimo privilegio y control de accesos**.

---

## 4. Conceptos y definiciones

Antes de realizar las actividades, revisa los siguientes conceptos. No se espera que memorices todas las definiciones, pero sí que puedas identificar **qué problema de seguridad o privacidad aborda cada concepto y cuál es su relación con una base de datos**.

| Concepto                                             | Definición                                                                                                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dato personal**                                    | Información relacionada con una persona física identificada o identificable.                                                                                                                                                    |
| **Dato personal sensible**                           | Información que, por su naturaleza o por la posibilidad de generar un riesgo particular para su titular, requiere un nivel especial de protección conforme al marco jurídico aplicable.                                         |
| **Titular de los datos**                             | Persona física a quien corresponden los datos personales.                                                                                                                                                                       |
| **Confidencialidad**                                 | Propiedad mediante la cual la información solamente puede ser conocida o utilizada por personas, procesos o sistemas autorizados.                                                                                               |
| **Integridad**                                       | Propiedad que busca garantizar que la información no sea modificada de manera no autorizada y que los cambios puedan detectarse.                                                                                                |
| **Disponibilidad**                                   | Propiedad que permite que la información y los servicios estén accesibles cuando sean necesarios para los usuarios autorizados.                                                                                                 |
| **Principio de mínimo privilegio (least privilege)** | Principio según el cual una persona, proceso o sistema debe recibir únicamente los permisos necesarios para realizar sus funciones.                                                                                             |
| **Clasificación de datos**                           | Proceso mediante el cual una organización identifica y categoriza la información de acuerdo con su sensibilidad, criticidad, uso y requisitos de protección.                                                                    |
| **Información sensible**                             | Información cuyo acceso, modificación, pérdida o divulgación no autorizada puede generar consecuencias relevantes para una persona u organización.                                                                              |
| **Enmascaramiento (masking)**                        | Técnica que modifica la forma en que se presenta un dato para ocultar total o parcialmente su contenido original, sin necesariamente modificar el dato almacenado.                                                              |
| **Enmascaramiento estático**                         | Técnica mediante la cual se genera una copia o conjunto de datos enmascarados que puede utilizarse sin exponer los valores originales.                                                                                          |
| **Enmascaramiento dinámico**                         | Técnica mediante la cual diferentes usuarios pueden visualizar una representación distinta del mismo dato de acuerdo con sus permisos, sin modificar necesariamente el valor almacenado.                                        |
| **Seudonimización (pseudonymization)**               | Tratamiento mediante el cual los datos ya no pueden atribuirse directamente a una persona sin utilizar información adicional que se mantiene separada y protegida.                                                              |
| **Dato seudonimizado**                               | Dato que ha sido transformado para reducir la identificación directa de una persona, pero que todavía puede volver a asociarse con ella mediante información adicional.                                                         |
| **Tabla de correspondencia**                         | Tabla que mantiene la relación entre un identificador seudonimizado y la identidad o información original. Debe recibir controles de acceso más estrictos que los datos destinados al análisis.                                 |
| **Token**                                            | Valor utilizado como identificador sustituto de otro dato. En una implementación de seudonimización, el token puede utilizarse para evitar exponer directamente un identificador real.                                          |
| **Anonimización (anonymization)**                    | Proceso mediante el cual se busca impedir que los datos puedan relacionarse razonablemente con una persona identificada o identificable, considerando los medios razonablemente disponibles para realizar una reidentificación. |
| **Dato anonimizado**                                 | Información que ha sido transformada de manera que la identificación de una persona ya no sea razonablemente posible bajo el contexto y los medios considerados.                                                                |
| **Reidentificación**                                 | Proceso mediante el cual una persona puede volver a asociarse con datos que habían sido transformados para reducir o eliminar su identificación directa.                                                                        |
| **Riesgo de reidentificación**                       | Posibilidad de que una persona pueda ser identificada nuevamente a partir de datos que fueron seudonimizados o anonimizados, especialmente cuando se combinan diferentes fuentes de información.                                |
| **Identificador directo**                            | Dato que permite identificar directamente a una persona, como puede ser un nombre completo, dependiendo del contexto.                                                                                                           |
| **Cuasi-identificador**                              | Dato que por sí mismo puede no identificar directamente a una persona, pero que combinado con otros datos puede contribuir a identificarla. Ejemplos pueden ser edad, código postal y ciudad.                                   |
| **Generalización**                                   | Técnica que reduce el nivel de detalle de un dato para disminuir la posibilidad de identificar a una persona. Por ejemplo, convertir una edad exacta en un rango de edad.                                                       |
| **Agregación**                                       | Técnica que combina varios registros para producir información resumida, como conteos, promedios o totales, reduciendo la exposición de registros individuales.                                                                 |
| **Divulgación**                                      | Acción mediante la cual información se hace accesible a una persona, organización o sistema que no debería tener acceso a ella.                                                                                                 |
| **Exposición de datos**                              | Situación en la que información queda disponible o visible más allá del nivel de acceso previsto, aunque no necesariamente exista una modificación de los datos.                                                                |
| **Separación de funciones (separation of duties)**   | Principio que distribuye responsabilidades entre diferentes personas, roles o procesos para evitar que una sola entidad concentre capacidades incompatibles o excesivas.                                                        |
| **Control de acceso**                                | Conjunto de mecanismos que determinan quién puede acceder a un recurso, qué puede hacer y bajo qué condiciones.                                                                                                                 |
| **Privacidad**                                       | Conjunto de principios y prácticas orientadas a garantizar que los datos personales sean tratados de acuerdo con los propósitos, derechos y controles aplicables.                                                               |
| **Minimización de datos**                            | Principio que busca limitar la recopilación y tratamiento de datos personales a aquellos que sean adecuados, relevantes y necesarios para una finalidad determinada.                                                            |
| **Finalidad**                                        | Propósito específico para el cual se recopilan y utilizan determinados datos.                                                                                                                                                   |
| **Retención de datos**                               | Periodo durante el cual una organización conserva determinada información de acuerdo con necesidades operativas, legales, contractuales o regulatorias.                                                                         |
| **Eliminación segura**                               | Proceso mediante el cual la información deja de estar disponible de manera recuperable para los usos no autorizados, considerando el medio y las tecnologías utilizadas.                                                        |
| **Seudónimo**                                        | Identificador utilizado para sustituir un identificador directo. Por sí mismo no necesariamente implica que el conjunto de datos esté anonimizado.                                                                              |
| **Identificación**                                   | Proceso mediante el cual se determina quién es una persona a partir de información disponible.                                                                                                                                  |
| **Pseudonimización reversible**                      | Forma de seudonimización en la que existe información adicional protegida que permite volver a relacionar el dato con su titular autorizado.                                                                                    |
| **Anonimización irreversible**                       | Objetivo de un proceso de anonimización en el que no existe un mecanismo razonable para recuperar la identidad de las personas a partir de los datos transformados.                                                             |
| **`VIEW`**                                           | Objeto de PostgreSQL que representa el resultado de una consulta y puede utilizarse para controlar qué columnas o registros se presentan a determinados usuarios.                                                               |
| **`GRANT`**                                          | Comando de PostgreSQL utilizado para otorgar privilegios sobre objetos de la base de datos.                                                                                                                                     |
| **`REVOKE`**                                         | Comando de PostgreSQL utilizado para retirar privilegios previamente otorgados.                                                                                                                                                 |
| **Rol (`ROLE`)**                                     | Identidad de PostgreSQL que puede utilizarse para representar usuarios, grupos o funciones administrativas y a la que se pueden asignar privilegios.                                                                            |
| **`NOLOGIN`**                                        | Atributo de un rol de PostgreSQL que impide utilizarlo directamente para iniciar una sesión. Puede utilizarse para crear roles destinados a representar funciones o conjuntos de permisos.                                      |
| **Propietario de un objeto**                         | Rol de PostgreSQL que posee un objeto, como una tabla. El propietario tiene capacidades especiales sobre dicho objeto que no dependen únicamente de los privilegios otorgados mediante `GRANT`.                                 |

---

### 4.1 No confundas estos conceptos

Algunos conceptos utilizados durante la práctica pueden parecer similares, pero resuelven problemas diferentes.

#### Enmascaramiento

Busca **ocultar la visualización** del dato.

Ejemplo:

```text
correo original:
juan.perez@example.com

visualización para soporte:
j***@example.com
```

El dato original continúa existiendo.

---

#### Seudonimización

Busca **sustituir la identidad directa por otro identificador**, manteniendo información adicional que permite realizar la asociación cuando existe autorización.

Ejemplo:

```text
id_cliente = 1052

        ↓

token = 7c9d2e1a...
```

La relación:

```text
token → persona
```

se mantiene separada y protegida.

Por eso:

> **La seudonimización no equivale a anonimización.**

---

#### Anonimización

Busca que la información resultante **no pueda asociarse razonablemente con una persona identificable**, considerando el contexto y los medios disponibles.

Por ejemplo:

```text
Edad: 37
Código postal: 80000
```

podría transformarse en:

```text
Rango de edad: 35–44
Región postal: 800xx
```

Pero reducir el detalle de los datos **no garantiza por sí mismo que exista anonimización**.

---

### 4.2 Identificadores directos y cuasi-identificadores

Un error común es considerar que únicamente los nombres o identificadores oficiales pueden revelar la identidad de una persona.

Considera:

```text
Nombre: Ana López
Edad: 37
Ciudad: Culiacán
Código postal: 80000
```

El nombre puede ser un **identificador directo**.

Pero incluso eliminándolo:

```text
Edad: 37
Ciudad: Culiacán
Código postal: 80000
```

la combinación de los datos restantes podría ayudar a distinguir a una persona dentro de un conjunto pequeño.

Estos datos pueden funcionar como **cuasi-identificadores**.

Por eso, la anonimización debe analizar el **conjunto de datos y el contexto**, no únicamente eliminar una columna llamada `nombre`.

---

### 4.3 Seudonimización y tabla de correspondencia

En esta práctica se utilizará una tabla similar a:

```text
mapa_cliente
-------------------------
token       cliente_id
-------------------------
abc123      101
def456      102
ghi789      103
```

Esta tabla tiene un nivel de sensibilidad particularmente importante.

Si un analista obtiene:

```text
token = abc123
```

no debería poder determinar directamente quién es la persona.

Pero si también obtiene:

```text
mapa_cliente
```

puede recuperar la relación.

Por esta razón:

> **La tabla de correspondencia debe tener controles de acceso más estrictos que los datos utilizados para análisis.**

---

### 4.4 Anonimización no significa simplemente "quitar el nombre"

Eliminar:

```text
nombre
correo
telefono
```

no significa automáticamente que un conjunto de datos sea anónimo.

Por ejemplo:

```text
edad = 43
ciudad = Culiacán
codigo_postal = 80000
```

puede proporcionar suficiente información para contribuir a una identificación cuando se combina con otras fuentes.

En esta práctica se utilizarán técnicas como:

* generalización
* agregación
* agrupación por rangos
* reducción del nivel de detalle
* umbrales mínimos para mostrar grupos

El objetivo es que observes **por qué reducir el detalle puede disminuir el riesgo de identificación**, pero también que comprendas que ninguna de estas técnicas, aplicada de manera aislada, demuestra automáticamente que un conjunto de datos sea completamente anónimo.

---

### 4.5 ¿Qué significa `COUNT(*) >= 5`?

En una de las actividades se utilizará un criterio como:

```sql
HAVING COUNT(*) >= 5
```

Esto significa que solamente se mostrarán grupos que contengan al menos cinco registros.

Por ejemplo:

```text
Grupo A → 17 registros
Grupo B → 8 registros
Grupo C → 3 registros
```

Con:

```sql
HAVING COUNT(*) >= 5
```

se mostrarían:

```text
Grupo A → 17
Grupo B → 8
```

pero no:

```text
Grupo C → 3
```

Este mecanismo se utilizará **como ejercicio didáctico para analizar el riesgo de identificación en grupos pequeños**.

No debes interpretar que:

> `COUNT(*) >= 5` = anonimización garantizada.

El número cinco es solamente un parámetro de este ejercicio. La privacidad real requiere analizar el contexto, las variables disponibles, las posibles fuentes externas y el riesgo de reidentificación.

---

### 4.6 Retención no significa conservar información indefinidamente

La retención de datos consiste en determinar **durante cuánto tiempo debe conservarse determinada información**.

La organización debe poder justificar la conservación considerando, según corresponda:

* finalidad
* necesidades operativas
* obligaciones legales
* obligaciones contractuales
* requisitos regulatorios
* riesgos de seguridad
* necesidades de auditoría

Conservar información indefinidamente también puede representar un riesgo.

Mientras más información innecesaria conserve una organización, mayor puede ser el impacto de una exposición o incidente.

---

### 4.7 Relación entre los mecanismos

Durante el laboratorio trabajarás con diferentes capas de protección:

```text
                 PROTECCIÓN DE LOS DATOS
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
  Clasificación    Control de acceso   Transformación
                                           │
                         ┌─────────────────┼───────────────┐
                         │                 │               │
                         ▼                 ▼               ▼
                   Enmascaramiento  Seudonimización  Anonimización
                         │                 │               │
                         ▼                 ▼               ▼
                    Ocultar          Sustituir        Reducir la
                    visualización    identidad        posibilidad de
                                                       identificación
```

Ningún mecanismo sustituye automáticamente a los demás.

Por ejemplo:

> **La anonimización no sustituye el control de acceso.**

> **El enmascaramiento no convierte automáticamente los datos en anónimos.**

> **La seudonimización no elimina la posibilidad de identificación.**

> **El control de acceso no elimina la necesidad de proteger adecuadamente los datos.**

La seguridad de una base de datos requiere combinar mecanismos de acuerdo con el riesgo y la finalidad del tratamiento.

---

### 4.8 Conceptos de PostgreSQL que utilizarás

Durante las actividades aparecerán instrucciones como:

```sql
GRANT
REVOKE
CREATE ROLE
CREATE VIEW
```

No las consideres solamente comandos que debes copiar.

Debes comprender qué función cumplen:

```text
CREATE ROLE
     ↓
define una identidad o función

GRANT
     ↓
otorga privilegios

REVOKE
     ↓
retira privilegios

VIEW
     ↓
presenta una parte controlada de la información
```

Esta relación será importante posteriormente en los laboratorios de **control de acceso, auditoría y hardening**.


## 5. Escenario

La empresa ficticia **Comercializadora Norte S.A. de C.V.** almacena información de sus clientes.

La organización tiene diferentes áreas que necesitan utilizar los datos con distintos niveles de acceso.

#### Área de soporte

Necesita identificar al cliente para atender solicitudes, pero no necesita consultar todos sus datos completos.

#### Área de analítica

Necesita analizar información para identificar tendencias y patrones, pero no necesita conocer directamente la identidad del cliente.

#### Administración de la base de datos

Necesita administrar las estructuras y controlar los accesos.

#### Dirección

Necesita información estadística y agregada para la toma de decisiones.

El DBA debe implementar controles que permitan utilizar los datos sin otorgar acceso innecesario a la información original.

---

## 6. Preparación de la base de datos

### 6.1 Crear la tabla de clientes

Crear la tabla `clientes`:

```sql
CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    rfc VARCHAR(13),
    edad INTEGER,
    ciudad VARCHAR(80),
    codigo_postal VARCHAR(10),
    fecha_alta DATE DEFAULT CURRENT_DATE
);
```

Verificar la estructura:

```sql
\d clientes
```

---

### 6.2 Insertar datos de prueba

Utilizar los siguientes datos ficticios:

```sql
INSERT INTO clientes
(nombre, correo, telefono, rfc, edad, ciudad, codigo_postal)
VALUES
('Ana López',
 'ana.lopez@example.test',
 '6671234567',
 'LOAA850315ABC',
 41,
 'Culiacán',
 '80000'),

('Carlos Pérez',
 'carlos.perez@example.test',
 '6672345678',
 'PECA900720DEF',
 35,
 'Culiacán',
 '80100'),

('María García',
 'maria.garcia@example.test',
 '6673456789',
 'GAMA780912GHI',
 47,
 'Mazatlán',
 '82000'),

('Luis Torres',
 'luis.torres@example.test',
 '6674567890',
 'TOLU920201JKL',
 34,
 'Los Mochis',
 '81200'),

('Laura Sánchez',
 'laura.sanchez@example.test',
 '6675678901',
 'SALA880525MNO',
 38,
 'Culiacán',
 '80200');
```

Verificar:

```sql
SELECT *
FROM clientes;
```

---

## 7. Actividad 1 — Clasificación de los datos

Antes de implementar controles de protección, analizar los atributos de la tabla `clientes`.

Completar la siguiente matriz:

| Campo           | ¿Identifica directamente? | ¿Puede contribuir a identificar? | ¿Requiere protección? | Justificación |
| --------------- | ------------------------- | -------------------------------- | --------------------- | ------------- |
| `id`            |                           |                                  |                       |               |
| `nombre`        |                           |                                  |                       |               |
| `correo`        |                           |                                  |                       |               |
| `telefono`      |                           |                                  |                       |               |
| `rfc`           |                           |                                  |                       |               |
| `edad`          |                           |                                  |                       |               |
| `ciudad`        |                           |                                  |                       |               |
| `codigo_postal` |                           |                                  |                       |               |
| `fecha_alta`    |                           |                                  |                       |               |

#### Preguntas

1. ¿Qué campos identifican directamente a una persona?
2. ¿Qué campos no identifican por sí solos pero podrían contribuir a hacerlo?
3. ¿Qué combinación de campos podría incrementar el riesgo de reidentificación?
4. ¿Todos los datos que deben protegerse son necesariamente datos personales sensibles desde el punto de vista jurídico?

#### Evidencia

Incluir la matriz de clasificación y las respuestas en el informe del laboratorio.

---

## 8. Actividad 2 — Enmascaramiento (masking)

El área de soporte necesita consultar información de los clientes, pero no requiere visualizar los valores completos de correo, teléfono y RFC.

El objetivo es proporcionar una vista con información parcialmente ocultada y evitar que el usuario tenga acceso directo a la tabla original.

### 8.1 Crear el rol

```sql
CREATE ROLE soporte NOLOGIN;
```

### 8.2 Crear una vista de acceso restringido

```sql
CREATE VIEW v_clientes_soporte AS
SELECT
    id,
    nombre,

    CONCAT(
        LEFT(correo, 2),
        '*****',
        SUBSTRING(correo FROM POSITION('@' IN correo))
    ) AS correo,

    CONCAT(
        '******',
        RIGHT(telefono, 4)
    ) AS telefono,

    CONCAT(
        '*********',
        RIGHT(rfc, 4)
    ) AS rfc

FROM clientes;
```

Consultar la vista:

```sql
SELECT *
FROM v_clientes_soporte;
```

---

### 8.3 Conceder acceso a la vista

```sql
GRANT USAGE
ON SCHEMA public
TO soporte;

GRANT SELECT
ON v_clientes_soporte
TO soporte;
```

Revocar el acceso directo a la tabla:

```sql
REVOKE ALL
ON clientes
FROM soporte;
```

---

### 8.4 Verificar el resultado

La consulta a la vista debe mostrar los datos protegidos:

```sql
SELECT *
FROM v_clientes_soporte;
```

El acceso directo a la tabla debe estar restringido para el rol `soporte`:

```sql
SELECT *
FROM clientes;
```

#### Preguntas

1. ¿Qué información continúa existiendo en la tabla original?
2. ¿Qué información puede visualizar el usuario `soporte`?
3. ¿Por qué no es suficiente ocultar los datos únicamente en la aplicación?
4. ¿Qué ocurriría si `soporte` tuviera acceso directo a `clientes`?

#### Evidencia

Registrar:

* resultado de la consulta a la vista
* resultado del intento de consultar `clientes`
* permisos aplicados
* explicación del mecanismo utilizado

---

## 9. Actividad 3 — Seudonimización (pseudonymization)

El área de analítica necesita estudiar información de clientes sin acceder directamente a su identidad.

Para ello se utilizará un identificador sustituto denominado **token**.

### 9.1 Crear los esquemas

```sql
CREATE SCHEMA pii;

CREATE SCHEMA analitica;
```

---

### 9.2 Crear la tabla de correspondencia

```sql
CREATE TABLE pii.mapa_cliente (
    token UUID PRIMARY KEY,
    cliente_id BIGINT UNIQUE
        REFERENCES public.clientes(id)
);
```

La tabla relacionará cada token con el identificador original del cliente.

---

### 9.3 Generar los tokens

Habilitar la extensión necesaria:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

Generar un token para cada cliente:

```sql
INSERT INTO pii.mapa_cliente
(token, cliente_id)
SELECT
    gen_random_uuid(),
    id
FROM clientes;
```

Verificar:

```sql
SELECT *
FROM pii.mapa_cliente;
```

---

## 10. Crear el conjunto de datos para analítica

Crear una tabla que no contenga directamente los identificadores principales del cliente:

```sql
CREATE TABLE analitica.clientes AS
SELECT
    m.token AS cliente_token,
    c.edad,
    c.ciudad,
    c.codigo_postal,
    c.fecha_alta
FROM pii.mapa_cliente m
JOIN clientes c
    ON c.id = m.cliente_id;
```

Verificar:

```sql
SELECT *
FROM analitica.clientes;
```

El conjunto de datos no deberá contener directamente:

```text
nombre
correo
telefono
rfc
```

---

## 11. Actividad 4 — Separación de funciones

La seudonimización pierde gran parte de su utilidad si el mismo usuario puede consultar tanto los datos seudonimizados como el mapa que permite recuperar la identidad.

Crear el rol:

```sql
CREATE ROLE analista NOLOGIN;
```

Conceder acceso al conjunto de datos analítico:

```sql
GRANT USAGE
ON SCHEMA analitica
TO analista;

GRANT SELECT
ON analitica.clientes
TO analista;
```

No conceder acceso a:

```text
pii.mapa_cliente
```

ni a:

```text
public.clientes
```

---

### 11.1 Verificar los permisos

El acceso al conjunto analítico debe estar permitido:

```sql
SELECT *
FROM analitica.clientes;
```

El acceso al mapa de correspondencia debe estar restringido:

```sql
SELECT *
FROM pii.mapa_cliente;
```

También debe estar restringido el acceso directo a los datos originales:

```sql
SELECT *
FROM public.clientes;
```

#### Preguntas

1. ¿Qué ocurriría si `analista` pudiera consultar también `pii.mapa_cliente`?
2. ¿Qué principio de seguridad se está aplicando al separar ambos accesos?
3. ¿Por qué la seudonimización no equivale a anonimización?
4. ¿Qué información permite volver a relacionar el token con una persona?

#### Evidencia

Demostrar:

* consulta permitida sobre `analitica.clientes`
* consulta rechazada sobre `pii.mapa_cliente`
* consulta rechazada sobre `public.clientes`

---

## 12. Actividad 5 — Anonimización (anonymization)

El área de dirección solicita información estadística.

No necesita conocer los clientes individualmente.

El objetivo es generar información agregada y reducir el riesgo de reidentificación.

### 12.1 Generalizar la edad

```sql
SELECT
    CASE
        WHEN edad BETWEEN 18 AND 30 THEN '18-30'
        WHEN edad BETWEEN 31 AND 45 THEN '31-45'
        ELSE '46+'
    END AS rango_edad,
    COUNT(*) AS total
FROM clientes
GROUP BY 1;
```

---

### 12.2 Generalizar la región

```sql
SELECT
    LEFT(codigo_postal, 2) AS region,
    COUNT(*) AS total
FROM clientes
GROUP BY 1;
```

---

### 12.3 Combinar atributos

```sql
SELECT
    CASE
        WHEN edad BETWEEN 18 AND 30 THEN '18-30'
        WHEN edad BETWEEN 31 AND 45 THEN '31-45'
        ELSE '46+'
    END AS rango_edad,

    LEFT(codigo_postal, 2) AS region,

    COUNT(*) AS total

FROM clientes

GROUP BY 1, 2;
```

---

### 12.4 Suprimir grupos pequeños

Como ejercicio didáctico se utilizará un umbral de cinco registros:

```sql
SELECT
    CASE
        WHEN edad BETWEEN 18 AND 30 THEN '18-30'
        WHEN edad BETWEEN 31 AND 45 THEN '31-45'
        ELSE '46+'
    END AS rango_edad,

    LEFT(codigo_postal, 2) AS region,

    COUNT(*) AS total

FROM clientes

GROUP BY 1, 2

HAVING COUNT(*) >= 5;
```

El valor `5` representa un ejemplo didáctico relacionado con **k-anonimato (k-anonymity)**.

> **Importante:** cumplir con un umbral `k = 5` no demuestra por sí mismo que un conjunto de datos sea completamente anónimo. La evaluación debe considerar también otros atributos y posibles combinaciones que permitan la reidentificación.

---

## 13. Actividad 6 — Análisis del riesgo de reidentificación

Analizar el resultado obtenido en la actividad anterior.

Responder:

1. ¿Qué identificadores directos fueron eliminados?
2. ¿Qué cuasi-identificadores permanecen?
3. ¿Qué combinaciones de atributos podrían reducir el anonimato?
4. ¿Qué sucede cuando un grupo contiene pocos registros?
5. ¿Qué atributos deberían generalizarse?
6. ¿Qué información debería suprimirse?
7. ¿Es correcto afirmar que el conjunto de datos es "100 % anónimo"? ¿Por qué?

#### Reto

Modificar la consulta anterior para reducir aún más el riesgo de reidentificación.

Documentar:

* cambio realizado
* motivo
* resultado obtenido
* riesgo que se pretende reducir

---

## 14. Actividad 7 — Retención de datos

La organización debe definir qué información conserva y durante cuánto tiempo.

Primero identificar los registros que hipotéticamente superan el periodo de conservación establecido.

Para este ejercicio se utilizará un periodo de cinco años:

```sql
SELECT *
FROM clientes
WHERE fecha_alta <
      CURRENT_DATE - INTERVAL '5 years';
```

**No ejecutar el `DELETE` sobre la tabla principal.**

El objetivo de esta actividad es identificar los registros afectados y diseñar el procedimiento.

Documentar:

* qué registros serían afectados
* cuál sería la justificación del periodo
* qué aprobación debería existir antes de eliminar información
* qué respaldo debería existir
* qué evidencia debería conservarse
* qué procedimiento permitiría recuperar información eliminada accidentalmente

La eliminación física de información se trabajará posteriormente en las prácticas de respaldo y recuperación.

---

## 15. Verificación final

Al finalizar el laboratorio, comprobar los siguientes escenarios.

#### Área de soporte

Debe poder consultar:

```sql
SELECT *
FROM v_clientes_soporte;
```

pero no acceder directamente a:

```sql
SELECT *
FROM clientes;
```

#### Área de analítica

Debe poder consultar:

```sql
SELECT *
FROM analitica.clientes;
```

pero no:

```sql
SELECT *
FROM pii.mapa_cliente;
```

ni:

```sql
SELECT *
FROM public.clientes;
```

#### Información para dirección

Debe contener información agregada y no identificadores directos.

#### Retención

Debe existir una consulta que permita identificar los registros que exceden el periodo establecido.

---

## 16. Evidencias

La entrega se realizará mediante el repositorio de GitLab asignado al estudiante.

Cada estudiante deberá mantener la siguiente estructura:

```text
LAB-01/
├── README.md
├── sql/
│   ├── 01-clasificacion.sql
│   ├── 02-enmascaramiento.sql
│   ├── 03-seudonimizacion.sql
│   ├── 04-anonimizacion.sql
│   └── 05-retencion.sql
├── evidencias/
│   ├── 01-clasificacion.pdf
│   ├── 02-enmascaramiento.pdf
│   ├── 03-seudonimizacion.pdf
│   ├── 04-anonimizacion.pdf
│   └── 05-retencion.pdf
└── informe.md
```

El nombre de los archivos podrá ajustarse a la estructura definitiva del repositorio de la materia.

---

## 17. Uso de GitLab

El repositorio será parte de la evidencia de la práctica.

El estudiante deberá:

1. realizar el trabajo en su repositorio
2. mantener los scripts SQL
3. documentar las decisiones tomadas
4. incorporar las evidencias
5. realizar commits que permitan identificar la evolución del trabajo
6. entregar el laboratorio mediante el repositorio establecido por el profesor

Se recomienda utilizar commits descriptivos, por ejemplo:

```text
feat: agrega clasificación de datos
feat: implementa vista de enmascaramiento
feat: implementa seudonimización
feat: agrega análisis de anonimización
docs: agrega evidencias y conclusiones
```

No es necesario utilizar ramas, solicitudes de incorporación de cambios ni un flujo Git complejo para esta práctica.

El objetivo es utilizar GitLab como **medio de entrega, trazabilidad y revisión**, no convertir el laboratorio de bases de datos en una práctica de Git.

---

## 18. Evidencia mínima

Cada evidencia deberá permitir identificar:

* estudiante
* actividad
* consulta o comando ejecutado
* resultado obtenido
* fecha o contexto de ejecución cuando sea necesario

Las capturas de pantalla no sustituyen los scripts SQL ni la explicación técnica.

Cuando un requisito consista en demostrar que un acceso fue rechazado, la evidencia deberá mostrar claramente el intento y el mensaje de error correspondiente.

---

## 19. Informe

El archivo `informe.md` deberá contener:

### 19.1 Clasificación

Explicar qué datos requieren protección y por qué.

### 19.2 Enmascaramiento

Explicar:

* qué se ocultó
* para quién
* por qué
* qué mecanismo se utilizó

### 19.3 Seudonimización

Explicar:

* cómo se generaron los tokens
* dónde se encuentra el mapa de correspondencia
* quién debería poder acceder a él
* por qué se separaron los permisos

### 19.4 Anonimización

Explicar:

* qué identificadores fueron eliminados
* qué atributos fueron generalizados
* qué grupos fueron suprimidos
* qué riesgo de reidentificación permanece

### 19.5 Retención

Explicar:

* qué criterio se utilizó
* qué información debería conservarse
* qué información podría eliminarse
* qué controles deberían existir antes de eliminarla

### 19.6 Conclusiones

Responder:

> ¿Qué técnica utilizarías para un área de soporte?

> ¿Qué técnica utilizarías para un área de analítica?

> ¿Qué técnica utilizarías para publicar estadísticas?

> ¿Por qué ninguna de estas técnicas sustituye al control de acceso?

---

## 20. Preguntas de reflexión

Responder individualmente:

1. ¿Cuál es la diferencia entre enmascaramiento y seudonimización?
2. ¿Por qué la seudonimización no significa anonimización?
3. ¿Por qué eliminar `nombre` y `RFC` no garantiza que un conjunto de datos sea anónimo?
4. ¿Qué función tienen los cuasi-identificadores?
5. ¿Por qué es importante separar el mapa de seudonimización?
6. ¿Qué principio de seguridad se aplica al impedir que el analista acceda al mapa?
7. ¿Por qué una vista puede ser preferible a entregar acceso directo a la tabla?
8. ¿Qué diferencia existe entre proteger un dato para visualización y protegerlo contra acceso no autorizado?
9. ¿Por qué la retención forma parte de la protección de datos?
10. ¿Qué riesgo existe si una organización conserva información indefinidamente?

---

## 21. Entrega

La entrega deberá realizarse mediante el repositorio de GitLab asignado.

Antes de realizar la entrega, verificar:

* [ ] La matriz de clasificación está completa.
* [ ] Los scripts SQL están incluidos.
* [ ] El enmascaramiento funciona.
* [ ] El rol de soporte no tiene acceso directo a los datos originales.
* [ ] La seudonimización funciona.
* [ ] El rol de analista no tiene acceso al mapa de correspondencia.
* [ ] El análisis de anonimización está documentado.
* [ ] Se identificaron posibles cuasi-identificadores.
* [ ] Se estableció una consulta para identificar datos sujetos a retención.
* [ ] Las evidencias corresponden a las actividades realizadas.
* [ ] El informe contiene las conclusiones y respuestas de reflexión.

---

## 22. Evaluación

| Criterio                                     | Porcentaje |
| -------------------------------------------- | ---------: |
| Clasificación y análisis de datos            |       15 % |
| Enmascaramiento y control de acceso          |       20 % |
| Seudonimización y separación de funciones    |       20 % |
| Anonimización y análisis de reidentificación |       25 % |
| Retención de datos                           |       10 % |
| Evidencias y documentación                   |       10 % |
| **Total**                                    |  **100 %** |

#### Criterio de aprobación técnica

No basta con que las consultas produzcan resultados.

El estudiante debe demostrar que comprende:

> **qué problema de seguridad resuelve cada mecanismo, qué riesgo permanece y por qué el control elegido es adecuado para el escenario.**

---

## 23. Relación con la Unidad II

Este laboratorio cubre principalmente el tema **2.3 — Datos sensibles, privacidad y protección de la información**.

También prepara los temas posteriores:

```text
2.3
¿Qué datos necesito proteger?
        ↓
2.4
¿Cómo protejo los datos y las comunicaciones?
        ↓
2.5
¿Qué principios y obligaciones debo considerar?
        ↓
2.6
¿Cómo aseguro el servidor que almacena los datos?
```

---

## 24. Relación con los siguientes laboratorios

El esquema `clientes` se conservará para reutilizarlo durante la Unidad II.

#### LAB-01 — Protección y privacidad

```text
clientes
   │
   ├── clasificación
   ├── enmascaramiento
   ├── seudonimización
   ├── anonimización
   └── retención
```

#### LAB-02 — Cifrado y protección de credenciales

Se incorporarán:

```text
password_hash
datos cifrados
TLS
gestión de claves
```

#### LAB-03 — Privacidad y cumplimiento

El mismo escenario se utilizará para relacionar:

```text
dato
  ↓
finalidad
  ↓
principio
  ↓
control técnico
  ↓
evidencia
```

#### LAB-04 — Hardening de PostgreSQL

El sistema se utilizará para trabajar:

```text
baseline
   ↓
identificación de exposición
   ↓
hardening
   ↓
validación
   ↓
evidencia
```
