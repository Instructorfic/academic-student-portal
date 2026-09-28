---
title: "Laboratorio 1 — Identificación de requisitos y reglas de negocio verificables"
description: "Unidad II de Pruebas de Software — transforma la descripción del proyecto base asignado en requisitos funcionales, no funcionales y reglas de negocio verificables."
---

| Elemento | Valor |
| --- | --- |
| Laboratorio | 1 de 3 |
| Resultado de aprendizaje | RA2.1 |
| Contenido | 2.1.1 – 2.1.3 |
| Tipo | Evaluado — primer insumo del proceso de trazabilidad |
| Proyecto | Uno de los tres [proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) asignados por el docente |
| Modalidad | Trabajo en equipo |
| Duración estimada | 2 sesiones |

## 1. Propósito

El propósito de este laboratorio es transformar la descripción del
proyecto base asignado en un conjunto de requisitos funcionales,
requisitos no funcionales y reglas de negocio verificables, que puedan
utilizarse posteriormente como base para diseñar criterios de
aceptación y escenarios de prueba.

Este laboratorio constituye el primer paso de la cadena de
trazabilidad de la Unidad II:

```text
PROYECTO BASE
     ↓
REQUISITOS Y REGLAS
     ↓
LABORATORIO 2
     ↓
HU/CU + CA + ESC
     ↓
LABORATORIO 3
     ↓
MATRIZ DE TRAZABILIDAD
```

Los identificadores definidos en este laboratorio deberán conservarse
sin modificaciones durante los Laboratorios 2 y 3.

## 2. Proyectos base disponibles

Cada equipo deberá trabajar exclusivamente con el proyecto asignado por
el docente.

| Proyecto | Sistema | Alcance principal |
| --- | --- | --- |
| A | Sistema de citas médicas | Pacientes, citas, disponibilidad, cancelación, reprogramación y notificaciones |
| B | Sistema de venta y pedidos de una tienda | Clientes, productos, carrito, pedidos y estado del pedido |
| C | Sistema de inscripción escolar | Estudiantes, materias, inscripción, cupos y horarios |

### Regla de continuidad

El equipo deberá utilizar el mismo proyecto durante los tres
laboratorios. No se permitirá cambiar de proyecto entre el Laboratorio
1, el Laboratorio 2 y el Laboratorio 3.

El equipo tampoco deberá:

- desarrollar software;
- diseñar bases de datos;
- agregar módulos;
- agregar actores no contemplados;
- incorporar funcionalidades ajenas al alcance;
- modificar las reglas de negocio proporcionadas por el proyecto base.

La fuente principal de información será la página
[Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/).

## 3. Resultado de aprendizaje

Al finalizar el laboratorio, el equipo será capaz de:

- identificar requisitos funcionales a partir del alcance del proyecto;
- identificar requisitos no funcionales verificables;
- identificar reglas de negocio derivadas directamente del dominio;
- distinguir entre requisitos funcionales, requisitos no funcionales y
  reglas de negocio;
- redactar condiciones observables que puedan comprobarse mediante
  pruebas;
- asignar identificadores únicos y permanentes;
- establecer una base para la trazabilidad de los Laboratorios 2 y 3.

## 4. Prerrequisitos

Antes de comenzar, el equipo deberá conocer del proyecto base asignado:

- su descripción general;
- los actores;
- el alcance funcional;
- las condiciones iniciales;
- las reglas de negocio proporcionadas;
- las restricciones del dominio;
- las condiciones de prueba disponibles;
- la nomenclatura oficial de la Unidad II.

## 5. Nomenclatura oficial

Los elementos deberán identificarse utilizando exactamente la siguiente
nomenclatura:

| Elemento | Identificador |
| --- | --- |
| Requisito funcional | RF-01, RF-02, ... |
| Requisito no funcional | RNF-01, RNF-02, ... |
| Regla de negocio | RN-01, RN-02, ... |

### Regla de permanencia

Los identificadores asignados en este laboratorio deberán conservarse
durante los Laboratorios 2 y 3. Por ejemplo:

```text
Laboratorio 1
RF-01
RNF-01
RN-01
        ↓
Laboratorio 2
RF-01 → HU-01 → CA-01 → ESC-01
        ↓
Laboratorio 3
RF-01 → HU-01 → CA-01 → ESC-01
```

No se deberá cambiar posteriormente un identificador por otro, por
ejemplo `RF-01 → RF-05`, `RNF-01 → RNF-03` o `RN-01 → RN-04`.

## 6. ¿Qué es un elemento verificable?

Un elemento es verificable cuando permite determinar mediante evidencia
objetiva si una condición se cumple o no. La redacción deberá evitar
términos ambiguos cuando no exista un criterio que permita
comprobarlos.

**Ejemplo no verificable**

> El sistema debe ser rápido.

El término "rápido" no establece un límite objetivo.

**Ejemplo verificable**

> **RNF-03** — El sistema debe mostrar el resultado de una consulta de
> disponibilidad en un tiempo máximo de 3 segundos bajo las condiciones
> definidas para la prueba.

Ahora puede diseñarse posteriormente un escenario que permita
determinar si se cumple la condición.

### Regla general

Antes de aceptar un requisito o regla, el equipo deberá poder
responder:

> ¿Podría diseñarse posteriormente un escenario de prueba que determine
> objetivamente si esta condición se cumple?

Si la respuesta es no, deberá reformularse.

## 7. Requisitos funcionales

Un requisito funcional describe una función o comportamiento observable
que el sistema debe realizar. Debe expresar qué debe hacer el sistema,
sin incorporar detalles innecesarios de implementación.

| Proyecto | Ejemplo |
| --- | --- |
| A | **RF-01** — El sistema debe permitir consultar la disponibilidad de un profesional para una fecha determinada. |
| B | **RF-01** — El sistema debe permitir agregar un producto disponible al carrito del cliente. |
| C | **RF-01** — El sistema debe permitir al estudiante consultar las materias disponibles para inscripción. |

El equipo deberá redactar sus propios requisitos utilizando
exclusivamente el proyecto asignado.

## 8. Requisitos no funcionales

Un requisito no funcional establece una característica de calidad o
restricción verificable del sistema. Para este laboratorio se
utilizarán inicialmente las siguientes categorías:

- Seguridad.
- Rendimiento.
- Usabilidad.
- Disponibilidad.

Los requisitos no funcionales deberán establecer condiciones
observables. No deberán utilizarse expresiones ambiguas como:

- El sistema debe ser rápido.
- El sistema debe ser seguro.
- El sistema debe ser fácil de usar.
- El sistema debe estar siempre disponible.

salvo que posteriormente se establezca un criterio objetivo que permita
verificarlas.

### 8.1 Seguridad

La seguridad deberá expresarse como una condición verificable. No
utilices "El sistema debe ser seguro"; utiliza una condición
observable, por ejemplo:

> **RNF-01** — El sistema debe impedir que un usuario no autenticado
> consulte información de citas.

> **RNF-02** — El sistema debe impedir que un paciente consulte
> información perteneciente a otro paciente.

Para los proyectos B y C deberán derivarse condiciones equivalentes a
partir de los actores, la información y las operaciones existentes:

| Proyecto | Ejemplo |
| --- | --- |
| B | **RNF-01** — El sistema debe impedir que un cliente consulte información de pedidos pertenecientes a otro cliente. |
| C | **RNF-01** — El sistema debe impedir que un estudiante consulte información de inscripciones perteneciente a otro estudiante. |

Estos ejemplos son únicamente referencias. Cada equipo deberá redactar
sus requisitos a partir del proyecto asignado.

## 9. Reglas de negocio

Una regla de negocio representa una condición, restricción o política
propia del dominio del proyecto. Las reglas de negocio no deberán
confundirse con funcionalidades.

**Ejemplo**

> **RN-01** — Un paciente no puede tener dos citas activas para la
> misma fecha y hora.

Esta afirmación representa una restricción del dominio. En cambio, "El
sistema debe permitir registrar una cita" representa un comportamiento
funcional y corresponde a un requisito funcional.

### Regla de derivación

Las reglas de negocio deberán:

- provenir del proyecto base, o
- derivarse directamente de las condiciones y restricciones del dominio
  descrito en el proyecto.

No deberán introducir políticas que no tengan fundamento en el proyecto
asignado.

## 10. Requisitos mínimos del laboratorio

Cada equipo deberá producir como mínimo:

| Elemento | Cantidad mínima | Identificadores |
| --- | --- | --- |
| Requisitos funcionales | 5 | RF-01 a RF-05 |
| Requisitos no funcionales | 3 | RNF-01 a RNF-03 |
| Reglas de negocio | 4 | RN-01 a RN-04 |

Al menos uno de los tres requisitos no funcionales deberá corresponder
a **Seguridad**. Los restantes podrán corresponder a Rendimiento,
Usabilidad, Disponibilidad o Seguridad.

Las reglas deberán derivarse directamente del proyecto asignado.

## 11. Procedimiento

### Paso 1 — Revisar el proyecto asignado

Identifiquen actores, funcionalidades, condiciones iniciales, reglas de
negocio, restricciones del dominio, datos relevantes y condiciones de
prueba. No deberán agregar funcionalidades fuera del alcance.

### Paso 2 — Seleccionar funcionalidades

Seleccionen funcionalidades suficientes para construir posteriormente
los artefactos de los Laboratorios 2 y 3. Se recomienda seleccionar
funcionalidades que permitan diseñar escenarios:

- positivos;
- negativos;
- alternos;
- de condición límite;
- de seguridad, cuando corresponda.

La selección deberá facilitar posteriormente una trazabilidad clara.

### Paso 3 — Derivar requisitos funcionales

Redacten cinco requisitos funcionales. Cada requisito deberá:

- describir una acción o comportamiento observable;
- estar relacionado con el alcance del proyecto;
- ser verificable;
- tener un identificador único;
- conservarse durante los siguientes laboratorios.

### Paso 4 — Derivar requisitos no funcionales

Redacten tres requisitos no funcionales. Cada requisito deberá:

- pertenecer a una categoría de calidad;
- ser verificable;
- establecer una condición observable;
- evitar términos ambiguos;
- poder relacionarse posteriormente con uno o más criterios o
  escenarios de prueba.

Al menos uno deberá abordar explícitamente Seguridad.

### Paso 5 — Identificar reglas de negocio

Seleccionen cuatro reglas de negocio. Pueden utilizar:

- reglas proporcionadas directamente en el proyecto base;
- reglas derivadas directamente de las condiciones del dominio.

No podrán:

- eliminar una regla base;
- cambiar su significado;
- inventar políticas ajenas al proyecto;
- agregar restricciones que no puedan justificarse desde el proyecto.

### Paso 6 — Clasificar y numerar

Todos los elementos deberán organizarse en una tabla con el siguiente
formato obligatorio:

| ID | Tipo | Categoría | Descripción verificable | Fuente |
| --- | --- | --- | --- | --- |
| RF-01 | Funcional | — | | Proyecto base |
| RF-02 | Funcional | — | | Proyecto base |
| RF-03 | Funcional | — | | Proyecto base |
| RF-04 | Funcional | — | | Proyecto base |
| RF-05 | Funcional | — | | Proyecto base |
| RNF-01 | No funcional | Seguridad | | Derivado |
| RNF-02 | No funcional | Rendimiento | | Derivado |
| RNF-03 | No funcional | Usabilidad/Disponibilidad | | Derivado |
| RN-01 | Regla de negocio | — | | Proyecto base |
| RN-02 | Regla de negocio | — | | Proyecto base |
| RN-03 | Regla de negocio | — | | Proyecto base |
| RN-04 | Regla de negocio | — | | Proyecto base |

La columna **Fuente** permitirá distinguir entre información
proporcionada directamente por el proyecto y condiciones derivadas por
el equipo.

## 12. Ejemplo de referencia

El siguiente ejemplo utiliza el Proyecto A — Sistema de citas médicas.
Es únicamente una referencia académica: no deberá copiarse si el equipo
tiene asignado otro proyecto.

| ID | Tipo | Categoría | Descripción verificable | Fuente |
| --- | --- | --- | --- | --- |
| RF-01 | Funcional | — | El sistema debe permitir consultar la disponibilidad de un profesional para una fecha determinada. | Proyecto base |
| RF-05 | Funcional | — | El sistema debe permitir al paciente consultar sus citas. | Proyecto base |
| RNF-01 | No funcional | Seguridad | El sistema debe impedir que un usuario no autenticado consulte información de citas. | Derivado |
| RNF-02 | No funcional | Seguridad | El sistema debe impedir que un paciente consulte información perteneciente a otro paciente. | Derivado |
| RNF-03 | No funcional | Rendimiento | El sistema debe mostrar el resultado de una consulta de disponibilidad en un tiempo máximo de 3 segundos bajo las condiciones definidas para la prueba. | Derivado |
| RN-01 | Regla de negocio | — | Un paciente no puede tener dos citas activas para la misma fecha y hora. | Proyecto base |

## 13. Justificación de los requisitos no funcionales

Cada requisito no funcional que sea derivado por el equipo deberá
incluir una breve justificación que explique:

- qué característica de calidad o restricción representa;
- por qué es relevante para el proyecto;
- cómo podría verificarse posteriormente.

**Ejemplo — RNF-01, Seguridad**

> **Requisito:** El sistema debe impedir que un usuario no autenticado
> consulte información de citas.
>
> **Justificación:** El requisito permite verificar una condición de
> control de acceso relacionada con la información de citas.
> Posteriormente puede comprobarse mediante un escenario en el que un
> usuario sin sesión intente acceder a dicha información.

La justificación no deberá introducir funcionalidades nuevas.

## 14. Checkpoint de verificabilidad

Antes de entregar, el equipo deberá revisar cada elemento
individualmente. Para cada requisito o regla deberán responder:

- ¿La condición es observable?
- ¿La condición puede comprobarse mediante evidencia?
- ¿Puede diseñarse un escenario de prueba?
- ¿La condición pertenece al proyecto asignado?
- ¿El identificador es único?
- ¿El elemento podrá conservarse sin modificaciones durante los
  Laboratorios 2 y 3?

Si alguna respuesta es negativa, el elemento deberá revisarse antes de
entregar.

## 15. Verificación del laboratorio

| Verificación | Resultado esperado |
| --- | --- |
| 5 requisitos funcionales | Cumplido |
| 3 requisitos no funcionales | Cumplido |
| Al menos 1 RNF de seguridad | Cumplido |
| 4 reglas de negocio | Cumplido |
| Todos los elementos son verificables | Cumplido |
| Todos tienen identificador único | Cumplido |
| Todos pertenecen al proyecto asignado | Cumplido |
| No se agregaron funcionalidades fuera del alcance | Cumplido |
| Las reglas base no fueron modificadas | Cumplido |
| Los identificadores podrán reutilizarse en los Laboratorios 2 y 3 | Cumplido |

## 16. Entregable del Laboratorio 1

El equipo deberá entregar un único documento de requisitos y reglas de
negocio que contenga:

- identificación del proyecto asignado;
- cinco requisitos funcionales;
- tres requisitos no funcionales;
- al menos un requisito no funcional de seguridad;
- cuatro reglas de negocio;
- identificador único para cada elemento;
- tipo;
- categoría;
- descripción verificable;
- fuente del elemento;
- justificación breve de los requisitos no funcionales derivados.

**Nombre recomendado del archivo:** `laboratorio_1_requisitos.md`

## 17. Criterio de aprobación del laboratorio

El laboratorio estará completo cuando los requisitos y reglas puedan
utilizarse directamente como insumo del Laboratorio 2 sin modificar sus
identificadores ni su significado.

La calidad principal evaluada será:

```text
VERIFICABILIDAD
      +
TRAZABILIDAD FUTURA
      +
CONSISTENCIA CON EL PROYECTO
```

## 18. Relación con el Laboratorio 2

Los identificadores producidos en este laboratorio deberán reutilizarse
en el Laboratorio 2. Ejemplo:

```text
LABORATORIO 1
RF-01
RNF-01
RN-01
       ↓
LABORATORIO 2
HU-01
CA-01
ESC-01
       ↓
LABORATORIO 3
RF-01 → HU-01 → CA-01 → ESC-01
RNF-01 → CA-07 → ESC-07
RN-01 → HU-02 → CA-10 → ESC-10
```

La relación podrá variar según el proyecto y los artefactos
desarrollados por el equipo. Lo obligatorio es conservar los
identificadores originales y mantener relaciones justificables.

## 19. Reglas de consistencia

Durante el desarrollo del laboratorio deberán cumplirse las siguientes
reglas:

1. Cada identificador deberá ser único.
2. Un identificador no podrá representar dos elementos diferentes.
3. Un elemento no deberá tener dos identificadores.
4. La descripción deberá conservarse durante los siguientes
   laboratorios.
5. Las reglas de negocio proporcionadas por el proyecto no deberán
   cambiar de significado.
6. Los requisitos deberán permanecer dentro del alcance del proyecto.
7. Los requisitos no funcionales deberán ser verificables.
8. Al menos un requisito no funcional deberá corresponder a Seguridad.
9. No deberán inventarse funcionalidades.
10. No deberán incorporarse resultados de ejecución de pruebas.

## 20. Preparación para los Laboratorios 2 y 3

Al finalizar este laboratorio, el equipo deberá disponer de una base
que permita construir:

```text
REQUISITO / REGLA
        ↓
HU / CU
        ↓
CRITERIO DE ACEPTACIÓN
        ↓
ESCENARIO DE PRUEBA
        ↓
MATRIZ DE TRAZABILIDAD
```

Los elementos del Laboratorio 1 constituyen la base de prueba
documental para los laboratorios siguientes.

## 21. Checklist final

Antes de entregar, el equipo deberá verificar:

**Proyecto**

- [ ] Es el proyecto asignado.
- [ ] Se utilizará el mismo proyecto durante los tres laboratorios.
- [ ] No se agregaron funcionalidades fuera del alcance.
- [ ] Las reglas del proyecto base no fueron modificadas.

**Requisitos funcionales**

- [ ] Existen 5 requisitos funcionales.
- [ ] Están identificados como RF-01 a RF-05.
- [ ] Son verificables.
- [ ] Son coherentes con el proyecto.

**Requisitos no funcionales**

- [ ] Existen 3 requisitos no funcionales.
- [ ] Están identificados como RNF-01 a RNF-03.
- [ ] Al menos uno corresponde a Seguridad.
- [ ] Todos son verificables.
- [ ] Todos tienen una categoría.
- [ ] Los requisitos derivados tienen justificación.

**Reglas de negocio**

- [ ] Existen 4 reglas de negocio.
- [ ] Están identificadas como RN-01 a RN-04.
- [ ] Se derivan del proyecto asignado.
- [ ] No modifican el significado de las reglas base.

**Identificadores**

- [ ] No existen identificadores duplicados.
- [ ] Cada elemento tiene un único identificador.
- [ ] Los identificadores podrán conservarse en los Laboratorios 2 y 3.

**Trazabilidad futura**

- [ ] Cada elemento puede convertirse o relacionarse posteriormente con
  un criterio o escenario de prueba.
- [ ] Los requisitos de seguridad pueden verificarse mediante
  escenarios.
- [ ] La información está preparada para construir la matriz de
  trazabilidad.

## 22. Producto esperado

Al finalizar el Laboratorio 1, el equipo deberá contar con un conjunto
coherente de requisitos y reglas:

```text
                  PROYECTO BASE
                       │
                       ↓
          ┌────────────────────────┐
          │ LABORATORIO 1          │
          │                        │
          │ RF-01 ... RF-05        │
          │ RNF-01 ... RNF-03      │
          │ RN-01 ... RN-04        │
          └────────────┬───────────┘
                       │
                       ↓
              BASE DE TRAZABILIDAD
                       │
                       ↓
                 LABORATORIO 2
                       │
                       ↓
              HU/CU + CA + ESC
                       │
                       ↓
                 LABORATORIO 3
                       │
                       ↓
             MATRIZ DE TRAZABILIDAD
```

Continúa con el
[Laboratorio 2 — Historias de usuario, criterios de aceptación y escenarios](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-2-criterios-aceptacion-escenarios/).
