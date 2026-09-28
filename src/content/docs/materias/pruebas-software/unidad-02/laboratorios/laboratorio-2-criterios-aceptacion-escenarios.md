---
title: "Laboratorio 2 — Historias de usuario, criterios de aceptación y escenarios de prueba"
description: "Unidad II de Pruebas de Software — transforma los requisitos y reglas del Laboratorio 1 en historias de usuario o casos de uso, criterios de aceptación y escenarios de prueba."
---

| Elemento | Valor |
| --- | --- |
| Laboratorio | 2 de 3 |
| Resultado de aprendizaje | RA2.2 — Construir historias de usuario o casos de uso, criterios de aceptación y escenarios de prueba |
| Contenido | 2.2.1 – 2.2.4 |
| Tipo | Evaluado — segundo insumo del proceso de trazabilidad |
| Proyecto | El mismo [proyecto base](/materias/pruebas-software/unidad-02/proyectos-base/) utilizado en el Laboratorio 1 |
| Modalidad | Trabajo en equipo |
| Duración estimada | 3 sesiones |

## 1. Propósito

El propósito de este laboratorio es transformar los requisitos y reglas
de negocio identificados y documentados en el
[Laboratorio 1](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio/)
en artefactos que permitan establecer:

- qué comportamiento debe aceptar el sistema
- bajo qué condiciones debe cumplirse
- qué condiciones deben rechazarse
- qué escenarios permitirán verificar posteriormente dichas
  condiciones.

La cadena de trabajo será:

```text
REQUISITO / REGLA DE NEGOCIO
             ↓
    HISTORIA DE USUARIO
       O CASO DE USO
             ↓
 CRITERIO DE ACEPTACIÓN
             ↓
    ESCENARIO DE PRUEBA
```

Los artefactos desarrollados en este laboratorio constituirán el
segundo insumo del Laboratorio 3 y deberán conservar los
identificadores establecidos en el Laboratorio 1. La trazabilidad
deberá mantenerse de forma explícita:

```text
RF / RNF / RN
     ↓
HU / CU
     ↓
CA
     ↓
ESC
```

Durante esta etapa todavía no se ejecutan las pruebas. Por lo tanto, no
se registrarán resultados ni defectos reales.

## 2. Prerrequisitos

Antes de iniciar este laboratorio, el equipo deberá haber completado el
Laboratorio 1 y contar como mínimo con:

- 5 requisitos funcionales: RF-XX
- 3 requisitos no funcionales: RNF-XX
- 4 reglas de negocio: RN-XX
- identificadores únicos y permanentes
- descripciones verificables
- fuente de cada elemento
- al menos un requisito no funcional relacionado con seguridad.

El equipo deberá continuar utilizando exactamente el mismo proyecto
asignado en el Laboratorio 1. No se deberán modificar los
identificadores ni cambiar el significado de los requisitos o reglas.

## 3. Resultado de aprendizaje

Al finalizar el laboratorio, el equipo será capaz de:

- seleccionar requisitos y reglas de negocio verificables
- construir historias de usuario o casos de uso coherentes con el
  proyecto
- relacionar historias de usuario o casos de uso con requisitos
- definir criterios de aceptación verificables
- diseñar escenarios positivos
- diseñar escenarios negativos
- diseñar escenarios alternos o de condición límite
- diseñar escenarios de seguridad cuando corresponda
- establecer relaciones de trazabilidad entre los artefactos
- conservar los identificadores establecidos en el Laboratorio 1.

## 4. Nomenclatura oficial

Los identificadores deberán utilizarse exactamente con la siguiente
nomenclatura:

| Elemento | Identificador |
| --- | --- |
| Historia de usuario | HU-01, HU-02, ... |
| Caso de uso | CU-01, CU-02, ... |
| Criterio de aceptación | CA-01, CA-02, ... |
| Escenario de prueba | ESC-01, ESC-02, ... |

El equipo deberá seleccionar una sola modalidad para representar las
interacciones:

- historias de usuario (HU-XX), o
- casos de uso (CU-XX).

No deberán mezclarse ambas modalidades dentro del mismo entregable,
salvo que el docente lo autorice expresamente.

Los identificadores creados durante este laboratorio deberán permanecer
sin cambios durante el Laboratorio 3.

## 5. Requisitos mínimos del laboratorio

Cada equipo deberá producir como mínimo:

### 5.1 Historias de usuario o casos de uso

2 elementos como mínimo:

- Opción A: HU-01 y HU-02.
- Opción B: CU-01 y CU-02.

### 5.2 Criterios de aceptación

4 criterios de aceptación como mínimo: CA-01, CA-02, CA-03 y CA-04.

### 5.3 Escenarios de prueba

6 escenarios como mínimo, con la siguiente distribución:

| Tipo de escenario | Cantidad mínima |
| --- | --- |
| Positivo | 2 |
| Negativo | 2 |
| Alterno / Límite | 2 |
| **Total** | **6** |

Cuando el Laboratorio 1 incluya requisitos de seguridad seleccionados
para este laboratorio, deberá existir al menos un escenario que permita
verificar explícitamente dicha condición. Los escenarios de seguridad
deberán clasificarse como **Tipo de prueba: Seguridad**.

## 6. Selección de requisitos y reglas

El equipo deberá seleccionar requisitos y reglas del Laboratorio 1 que
permitan construir una cadena de trazabilidad clara. Se recomienda
seleccionar una funcionalidad principal del proyecto y relacionarla con
sus restricciones y condiciones de negocio.

Ejemplo conceptual:

```text
RF-02
  ↓
HU-02
  ↓
CA-02
  ↓
ESC-02
```

Cuando exista una condición negativa:

```text
RF-02 + RN-03
      ↓
    HU-02
      ↓
    CA-03
      ↓
    ESC-03
```

Los requisitos y reglas que no sean utilizados directamente en los
artefactos de este laboratorio no deberán eliminarse ni modificarse. El
Laboratorio 3 deberá establecer claramente la cobertura correspondiente
al alcance definido para la matriz.

## 7. Historias de usuario

Una historia de usuario deberá expresar una necesidad desde la
perspectiva de un actor del sistema. Se utilizará la estructura:

```text
Como [actor],
quiero [acción],
para [propósito].
```

### 7.1 Ejemplo

Para el Proyecto A — Sistema de citas médicas.

Los identificadores de los ejemplos coinciden con el ejemplo completo de matriz del
[Laboratorio 3](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/)
(Proyecto A). Por eso la numeración de criterios y escenarios no siempre es
consecutiva.

> **HU-01** — Como paciente, quiero consultar la disponibilidad de un
> profesional para seleccionar un horario disponible.

Relación: `RF-01 → HU-01`

La historia deberá estar relacionada con uno o más requisitos del
Laboratorio 1.

### 7.2 Información mínima

Cada historia de usuario deberá contener:

| Campo | Información |
| --- | --- |
| ID | HU-XX |
| Actor | Actor del proyecto |
| Historia | Como / quiero / para |
| Requisito relacionado | RF-XX, RNF-XX o RN-XX, según corresponda |
| Resultado esperado | Comportamiento esperado |

La historia no deberá agregar funcionalidades que no existan en el
proyecto base.

## 8. Casos de uso

Si el equipo selecciona casos de uso en lugar de historias de usuario,
deberá utilizar la siguiente estructura mínima:

| Elemento | Descripción |
| --- | --- |
| ID | CU-XX |
| Nombre | Nombre del caso de uso |
| Actor principal | Actor que inicia la interacción |
| Precondiciones | Condiciones iniciales |
| Flujo principal | Secuencia normal |
| Flujos alternos | Variaciones relevantes |
| Resultado esperado | Resultado de la interacción |
| Requisito relacionado | RF-XX, RNF-XX o RN-XX |

Los flujos alternos deberán corresponder a condiciones reales del
proyecto y no a funcionalidades inventadas.

## 9. Criterios de aceptación

Los criterios de aceptación deberán establecer condiciones
objetivamente verificables. Se recomienda utilizar la estructura:

```text
Dado que...
Cuando...
Entonces...
```

### 9.1 Ejemplo positivo

> **CA-01**
>
> Dado que el profesional tiene un horario disponible,
> cuando el paciente consulta la disponibilidad,
> entonces el sistema muestra el horario disponible.

Relación: `RF-01 → HU-01 → CA-01`

### 9.2 Ejemplo negativo

> **CA-03**
>
> Dado que el horario seleccionado no está disponible,
> cuando el paciente intenta solicitar la cita,
> entonces el sistema rechaza la solicitud.

Relación: `RF-02 / RN-03 → HU-02 → CA-03`

El criterio deberá permitir diseñar posteriormente un escenario cuyo
resultado esperado pueda determinarse objetivamente.

## 10. Reglas para los criterios de aceptación

Cada criterio de aceptación deberá:

- tener un identificador único
- estar relacionado con una HU o CU
- estar relacionado con uno o más requisitos o reglas cuando
  corresponda
- describir una condición verificable
- establecer un comportamiento esperado
- ser coherente con el alcance del proyecto
- poder relacionarse posteriormente con uno o más escenarios.

No deberán utilizarse criterios ambiguos como "El sistema funciona
correctamente" o "El sistema debe ser fácil de utilizar". Deberán
expresarse condiciones observables.

## 11. Seguridad en los criterios de aceptación

Cuando el Laboratorio 1 contenga un requisito de seguridad, el criterio
de aceptación deberá convertirlo en una condición observable. Ejemplo:

> **RNF-01** — El sistema debe impedir que un usuario no autenticado
> consulte información de citas.

Puede transformarse en:

> **CA-07**
>
> Dado que el usuario no está autenticado,
> cuando intenta consultar información de citas,
> entonces el sistema impide el acceso a dicha información.

La trazabilidad será `RNF-01 → CA-07`, y el escenario posterior deberá
indicar explícitamente **Tipo de prueba: Seguridad**.

## 12. Escenarios de prueba

Los escenarios de prueba representan condiciones diseñadas para
verificar los criterios de aceptación. Cada escenario deberá contener
como mínimo:

- identificador
- requisito relacionado
- HU/CU relacionado
- criterio de aceptación relacionado
- tipo de escenario
- tipo de prueba
- condición de entrada
- acción
- resultado esperado.

### 12.1 Formato obligatorio

| Campo | Información |
| --- | --- |
| ID | ESC-XX |
| Requisito relacionado | RF-XX / RNF-XX / RN-XX |
| HU/CU relacionado | HU-XX / CU-XX |
| Criterio relacionado | CA-XX |
| Tipo de escenario | Positivo / Negativo / Alterno / Límite |
| Tipo de prueba | Funcional / Seguridad / Rendimiento / Usabilidad / Disponibilidad |
| Condición de entrada | Condiciones iniciales |
| Acción | Acción ejecutada durante la prueba |
| Resultado esperado | Comportamiento esperado |

## 13. Tipos de escenario

La clasificación de los escenarios deberá utilizar exclusivamente los
siguientes valores:

- Positivo
- Negativo
- Alterno / Límite

### 13.1 Positivo

Verifica el comportamiento esperado cuando las condiciones son válidas.

**ESC-02 — Solicitud de cita con horario disponible**

| Campo | Información |
| --- | --- |
| Requisito | RF-02 |
| HU | HU-02 |
| Criterio | CA-02 |
| Tipo de escenario | Positivo |
| Tipo de prueba | Funcional |
| Condición de entrada | El paciente existe y el profesional tiene disponibilidad. |
| Acción | El paciente solicita una cita en el horario disponible. |
| Resultado esperado | El sistema permite solicitar la cita. |

## 14. Escenarios negativos

Un escenario negativo verifica el comportamiento ante una condición:

- inválida
- prohibida
- no permitida
- no autorizada
- incompatible con una regla de negocio.

**ESC-03 — Solicitud de cita en horario ocupado**

| Campo | Información |
| --- | --- |
| Requisito | RF-02 / RN-03 |
| HU | HU-02 |
| Criterio | CA-03 |
| Tipo de escenario | Negativo |
| Tipo de prueba | Funcional |
| Condición de entrada | El horario seleccionado no está disponible. |
| Acción | El paciente intenta solicitar la cita. |
| Resultado esperado | El sistema rechaza la solicitud. |

La condición negativa debe derivarse de un requisito o regla existente.

## 15. Escenarios alternos o de condición límite

Un escenario alterno o de condición límite deberá representar una
condición diferente del flujo normal y tener una justificación. Puede
corresponder a:

- un límite definido por el requisito
- un valor frontera
- una condición alternativa
- una condición excepcional
- una variación relevante del flujo.

No deberá clasificarse como alterno o límite únicamente porque utilice
un dato diferente.

### 15.1 Ejemplo de límite

Si el requisito establece:

> **RNF-03** — El sistema debe mostrar el resultado de una consulta en
> un tiempo máximo de 3 segundos.

Un escenario de límite podría ser:

**ESC-09 — Consulta en el límite de tiempo establecido**

| Campo | Información |
| --- | --- |
| Requisito | RNF-03 |
| Criterio | CA-09 |
| Tipo de escenario | Alterno / Límite |
| Tipo de prueba | Rendimiento |
| Condición de entrada | La consulta se ejecuta bajo las condiciones definidas para la prueba. |
| Acción | Se realiza una consulta de disponibilidad. |
| Resultado esperado | El resultado se muestra dentro del tiempo máximo establecido de 3 segundos. |

## 16. Escenarios de seguridad

Cuando exista un requisito de seguridad seleccionado, deberá existir
una trazabilidad explícita, por ejemplo `RNF-01 → CA-07 → ESC-07`. El
escenario deberá indicar **Tipo de prueba: Seguridad**.

### 16.1 Ejemplo — Acceso sin autenticación

**ESC-07 — Consulta de información sin autenticación**

| Campo | Información |
| --- | --- |
| Requisito | RNF-01 |
| HU/CU | — |
| Criterio | CA-07 |
| Tipo de escenario | Negativo |
| Tipo de prueba | Seguridad |
| Condición de entrada | El usuario no está autenticado. |
| Acción | El usuario intenta consultar información protegida. |
| Resultado esperado | El sistema impide el acceso a la información. |

### 16.2 Ejemplo — Acceso no autorizado

**ESC-08 — Consulta de información perteneciente a otro paciente**

| Campo | Información |
| --- | --- |
| Requisito | RNF-02 |
| HU/CU | HU-03 |
| Criterio | CA-08 |
| Tipo de escenario | Negativo |
| Tipo de prueba | Seguridad |
| Condición de entrada | El paciente está autenticado, pero la información consultada pertenece a otro paciente. |
| Acción | El usuario intenta acceder a dicha información. |
| Resultado esperado | El sistema rechaza el acceso. |

Los ejemplos deberán adaptarse al proyecto asignado. No deberán
inventarse vulnerabilidades o funcionalidades de seguridad que no estén
relacionadas con el alcance del proyecto.

## 17. Relación entre tipo de escenario y tipo de prueba

Estas dos clasificaciones representan dimensiones diferentes.

| Tipo de escenario | Tipo de prueba | Significa que... |
| --- | --- | --- |
| Negativo | Seguridad | la condición del escenario es negativa y la naturaleza de la prueba es de seguridad |
| Alterno / Límite | Rendimiento | el escenario representa una condición de límite y la prueba evalúa rendimiento |

Por lo tanto, no deberán utilizarse ambas columnas como si fueran
equivalentes.

## 18. Entregable 1 — Historias de usuario o casos de uso

El equipo deberá entregar 2 historias de usuario o 2 casos de uso como
mínimo.

**Si utiliza historias de usuario**

| ID | Actor | Historia | Requisito relacionado | Resultado esperado |
| --- | --- | --- | --- | --- |
| HU-01 | | | RF-XX | |
| HU-02 | | | RF-XX | |

**Si utiliza casos de uso**

| ID | Nombre | Actor principal | Precondiciones | Resultado esperado | Requisito relacionado |
| --- | --- | --- | --- | --- | --- |
| CU-01 | | | | | RF-XX |
| CU-02 | | | | | RF-XX |

## 19. Entregable 2 — Criterios de aceptación

El equipo deberá entregar como mínimo 4 criterios de aceptación.

| ID | HU/CU relacionado | Requisito relacionado | Dado que | Cuando | Entonces |
| --- | --- | --- | --- | --- | --- |
| CA-01 | HU/CU-XX | RF-XX | | | |
| CA-02 | HU/CU-XX | RF-XX / RN-XX | | | |
| CA-03 | HU/CU-XX | RNF-XX | | | |
| CA-04 | HU/CU-XX | RN-XX | | | |

Los criterios deberán conservar la terminología y el significado de los
requisitos y reglas del Laboratorio 1.

## 20. Entregable 3 — Escenarios de prueba

El equipo deberá entregar como mínimo 6 escenarios.

| ID | Requisito | HU/CU | CA | Tipo de escenario | Tipo de prueba |
| --- | --- | --- | --- | --- | --- |
| ESC-01 | RF-XX | HU/CU-XX | CA-XX | Positivo | Funcional |
| ESC-02 | RF-XX | HU/CU-XX | CA-XX | Positivo | Funcional |
| ESC-03 | RN-XX | HU/CU-XX | CA-XX | Negativo | Funcional |
| ESC-04 | RNF-XX | HU/CU-XX | CA-XX | Negativo | Seguridad |
| ESC-05 | RF/RN-XX | HU/CU-XX | CA-XX | Alterno / Límite | Funcional |
| ESC-06 | RNF-XX | HU/CU-XX | CA-XX | Alterno / Límite | Rendimiento / Seguridad |

Además de esta tabla de resumen, cada escenario deberá documentar:

- condición de entrada
- acción
- resultado esperado.

## 21. Cadena mínima de trazabilidad

Cada relación deberá poder explicarse. Ejemplo:

```text
RF-01
  ↓
HU-01
  ↓
CA-01
  ↓
ESC-01
```

La interpretación es: RF-01 define el comportamiento requerido, HU-01
representa la necesidad del actor, CA-01 establece la condición de
aceptación. ESC-01 define cómo verificar posteriormente dicha
condición.

Para una regla de negocio:

```text
RN-03
  ↓
CA-03
  ↓
ESC-03
```

Para un requisito de seguridad:

```text
RNF-01
  ↓
CA-07
  ↓
ESC-07
  ↓
Seguridad
```

No es obligatorio que todos los requisitos no funcionales tengan una
HU/CU intermedia cuando la naturaleza del requisito permita una
relación directa con un criterio y un escenario. La relación deberá
quedar justificada.

## 22. Reglas de consistencia

Los identificadores del Laboratorio 1 deberán conservarse exactamente.
Por ejemplo, `RF-01`, `RNF-01` y `RN-01` no podrán convertirse
posteriormente en `RF-001`, `RNF-001` o `RN-001`.

Tampoco deberá cambiarse el significado del requisito para adaptarlo a
una historia, criterio o escenario. La relación deberá conservarse:

```text
RF-01
  ↓
HU-01
  ↓
CA-01
  ↓
ESC-01
```

Los identificadores de este laboratorio también deberán permanecer sin
cambios para el Laboratorio 3.

## 23. Reglas sobre alcance

Los artefactos deberán construirse exclusivamente a partir del proyecto
asignado. No se deberá:

- agregar funcionalidades nuevas
- agregar actores que no correspondan al proyecto
- inventar reglas de negocio
- modificar restricciones existentes
- crear requisitos para funcionalidades inexistentes
- introducir vulnerabilidades no relacionadas con el alcance
- crear resultados de ejecución.

Los escenarios deberán verificar condiciones derivadas de los
requisitos y reglas identificados.

## 24. Reglas sobre seguridad

Cuando exista un requisito de seguridad:

- deberá ser verificable
- deberá expresar una condición observable
- deberá estar relacionado con uno o más criterios
- deberá estar relacionado con uno o más escenarios
- el escenario correspondiente deberá indicar Seguridad como tipo de
  prueba
- los accesos no autorizados deberán clasificarse normalmente como
  Negativo
- no deberá afirmarse la existencia de una vulnerabilidad sin una
  ejecución real.

En esta etapa se diseña la prueba. No se demuestra todavía el resultado
real de la prueba.

## 25. Reglas sobre ejecución

Los escenarios desarrollados en este laboratorio son diseños de prueba.
Todavía no representan resultados de ejecución. Por lo tanto, no
deberán registrarse valores como `Pasó`, `Falló`, `DEF-001` o `DEF-002`
sin una ejecución real posterior.

La relación con defectos será administrada en el Laboratorio 3 como:

```text
Defecto: Pendiente de ejecución
Estado de ejecución: No ejecutado
```

## 26. Verificación del Laboratorio 2

Antes de entregar, el equipo deberá comprobar:

| Verificación | Resultado esperado |
| --- | --- |
| 2 HU o CU | Cumplido |
| 4 criterios de aceptación | Cumplido |
| 2 escenarios positivos | Cumplido |
| 2 escenarios negativos | Cumplido |
| 2 escenarios alternos / límite | Cumplido |
| Escenario de seguridad cuando corresponda | Cumplido |
| Todos los escenarios tienen ID | Cumplido |
| Todos los escenarios tienen requisito relacionado | Cumplido |
| Todos los escenarios tienen HU/CU cuando corresponda | Cumplido |
| Todos los escenarios tienen criterio relacionado | Cumplido |
| Todos los criterios tienen HU/CU relacionado | Cumplido |
| Los identificadores del Laboratorio 1 se conservan | Cumplido |
| No se agregaron funcionalidades fuera del alcance | Cumplido |
| No se inventaron resultados de ejecución | Cumplido |

## 27. Checklist de calidad

Antes de entregar, el equipo deberá revisar:

**Historias de usuario / casos de uso**

- [ ] Existen al menos 2.
- [ ] Utilizan una sola modalidad: HU o CU.
- [ ] Los actores pertenecen al proyecto.
- [ ] Cada elemento tiene identificador.
- [ ] Existe relación con requisitos del Laboratorio 1.
- [ ] No se agregaron funcionalidades fuera del alcance.

**Criterios de aceptación**

- [ ] Existen al menos 4.
- [ ] Todos tienen identificador.
- [ ] Todos son verificables.
- [ ] Están relacionados con una HU/CU.
- [ ] Están relacionados con requisitos o reglas cuando corresponda.
- [ ] Las condiciones son observables.
- [ ] El comportamiento esperado está claramente definido.

**Escenarios**

- [ ] Existen al menos 6.
- [ ] Existen al menos 2 positivos.
- [ ] Existen al menos 2 negativos.
- [ ] Existen al menos 2 alternos/límite.
- [ ] Todos tienen requisito de origen.
- [ ] Todos tienen criterio relacionado.
- [ ] Todos tienen tipo de escenario.
- [ ] Todos tienen tipo de prueba.
- [ ] Todos tienen condición de entrada.
- [ ] Todos tienen acción.
- [ ] Todos tienen resultado esperado.
- [ ] Los escenarios de seguridad están identificados como Seguridad.

**Consistencia**

- [ ] Los identificadores del Laboratorio 1 no fueron modificados.
- [ ] No existen identificadores duplicados.
- [ ] No se agregaron funcionalidades fuera del proyecto.
- [ ] No existen defectos inventados.
- [ ] No existen resultados de ejecución inventados.

## 28. Entrega del Laboratorio 2

El equipo deberá entregar un único documento denominado
`laboratorio_2_criterios_escenarios.md`, que deberá contener:

1. Identificación del proyecto.
2. Requisitos utilizados del Laboratorio 1.
3. Historias de usuario o casos de uso.
4. Criterios de aceptación.
5. Escenarios de prueba.
6. Clasificación de cada escenario.
7. Tipo de prueba.
8. Condiciones de entrada.
9. Acciones.
10. Resultados esperados.
11. Relaciones de trazabilidad.

La estructura mínima será:

```text
Requisito / Regla
        ↓
HU / CU
        ↓
Criterio de aceptación
        ↓
Escenario de prueba
```

## 29. Preparación para el Laboratorio 3

Al finalizar este laboratorio, el equipo deberá disponer de los
elementos necesarios para construir la matriz de trazabilidad:

```text
LABORATORIO 1
RF / RNF / RN
      ↓
LABORATORIO 2
HU / CU
CA
ESC
      ↓
LABORATORIO 3
MATRIZ DE TRAZABILIDAD
```

La matriz del Laboratorio 3 utilizará como mínimo las siguientes
columnas: ID origen, Tipo, Descripción, HU/CU, CA, ESC, Tipo de
escenario, Tipo de prueba, Defecto, Estado de ejecución y
Observaciones.

Por esta razón, cada artefacto creado en este laboratorio deberá tener
identificadores claros y relaciones justificables.

## 30. Criterio de completitud

El Laboratorio 2 se considerará completo cuando el equipo pueda
responder claramente:

```text
¿Qué requisito o regla se quiere verificar?
             ↓
¿En qué HU/CU se representa?
             ↓
¿Qué criterio de aceptación define el comportamiento?
             ↓
¿Qué escenario permitirá verificarlo?
             ↓
¿Qué tipo de escenario es?
             ↓
¿Qué tipo de prueba corresponde?
```

Si alguna relación no puede explicarse, deberá revisarse antes de
entregar.

## 31. Producto esperado

El resultado del laboratorio deberá poder representarse mediante una
cadena como:

```text
PROYECTO BASE
      ↓
RF / RNF / RN
      ↓
HU / CU
      ↓
CA
      ↓
ESC
```

Ejemplos:

```text
Funcional             Regla de negocio      Seguridad             Rendimiento
RF-02                 RF-02 + RN-03         RNF-01                RNF-03
  ↓                     ↓                     ↓                     ↓
HU-02                 HU-02                 CA-07                 CA-09
  ↓                     ↓                     ↓                     ↓
CA-02                 CA-03                 ESC-07                ESC-09
  ↓                     ↓                     ↓                     ↓
ESC-02                ESC-03                Tipo de prueba:       Tipo de prueba:
                                            Seguridad             Rendimiento
```

## 32. Relación con la evaluación de la Unidad II

El Laboratorio 2 constituye el segundo insumo del proceso de
trazabilidad de la Unidad II. La secuencia completa será:

```text
LABORATORIO 1
Requisitos y reglas
        ↓
LABORATORIO 2
HU/CU + CA + ESC
        ↓
LABORATORIO 3
Matriz de trazabilidad
```

El desempeño del equipo deberá demostrar que los artefactos no fueron
construidos como elementos independientes, sino como partes
relacionadas de una misma cadena de trazabilidad.

La calidad principal evaluada en este laboratorio será:
**coherencia, verificabilidad y trazabilidad entre requisitos, criterios
de aceptación y escenarios de prueba.**

## 33. Plantilla de trabajo

### 33.1 Identificación del proyecto

```text
Proyecto asignado:
Nombre del sistema:
Equipo:
Integrantes:
```

### 33.2 Requisitos utilizados

| ID | Tipo | Descripción |
| --- | --- | --- |
| RF-XX | RF | |
| RNF-XX | RNF | |
| RN-XX | RN | |

### 33.3 Historias de usuario

| ID | Actor | Historia | Requisito relacionado | Resultado esperado |
| --- | --- | --- | --- | --- |
| HU-01 | | | | |
| HU-02 | | | | |

### 33.4 Criterios de aceptación

| ID | HU/CU | Requisito | Dado que | Cuando | Entonces |
| --- | --- | --- | --- | --- | --- |
| CA-01 | | | | | |
| CA-02 | | | | | |
| CA-03 | | | | | |
| CA-04 | | | | | |

### 33.5 Escenarios de prueba

| ID | Requisito | HU/CU | CA | Tipo de escenario | Tipo de prueba | Condición de entrada | Acción | Resultado esperado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ESC-01 | | | | Positivo | Funcional | | | |
| ESC-02 | | | | Positivo | Funcional | | | |
| ESC-03 | | | | Negativo | Funcional | | | |
| ESC-04 | | | | Negativo | Seguridad | | | |
| ESC-05 | | | | Alterno / Límite | Funcional | | | |
| ESC-06 | | | | Alterno / Límite | Rendimiento / Seguridad | | | |

## 34. Cierre del laboratorio

Al concluir el Laboratorio 2, el equipo deberá haber construido un
conjunto coherente de:

```text
REQUISITOS Y REGLAS
        ↓
HU / CU
        ↓
CRITERIOS DE ACEPTACIÓN
        ↓
ESCENARIOS DE PRUEBA
```

Estos elementos serán utilizados directamente en el Laboratorio 3 para
construir la matriz de trazabilidad. Los identificadores deberán
conservarse sin modificaciones y las pruebas todavía no deberán
considerarse ejecutadas: el defecto permanece como **Pendiente de
ejecución** y el estado como **No ejecutado**.

Continúa con el
[Laboratorio 3 — Matriz de trazabilidad](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/).
