---
title: "Laboratorio 3 — Construcción, validación y presentación de la matriz de trazabilidad"
description: "Unidad II de Pruebas de Software — entregable integrador: la matriz de trazabilidad que relaciona los Laboratorios 1 y 2 del proyecto base asignado."
---

| Elemento | Valor |
| --- | --- |
| Laboratorio | 3 de 3 |
| Resultado de aprendizaje | RA2.3 — Establecer trazabilidad requisito–prueba y prueba–defecto mediante una matriz |
| Contenido | 2.3.1 – 2.3.3 |
| Tipo | Evaluado — entregable integrador y evidencia práctica de la unidad |
| Proyecto | El mismo [proyecto base](/materias/pruebas-software/unidad-02/proyectos-base/) utilizado en los Laboratorios 1 y 2 |
| Modalidad | Trabajo en equipo |
| Duración estimada | 1 sesión de construcción + preparación de presentación |

## 1. Propósito

El propósito de este laboratorio es integrar los resultados de los
Laboratorios 1 y 2 en una matriz de trazabilidad que permita demostrar
la relación lógica entre los requisitos, las reglas de negocio y los
artefactos de prueba.

La cadena principal será:

```text
PROYECTO BASE
      ↓
REQUISITO / REGLA DE NEGOCIO
      ↓
HISTORIA DE USUARIO / CASO DE USO
      ↓
CRITERIO DE ACEPTACIÓN
      ↓
ESCENARIO DE PRUEBA
      ↓
DEFECTO
```

Durante la Unidad II los escenarios todavía no han sido ejecutados. Por
lo tanto, la relación con defectos será únicamente una relación futura:

```text
ESCENARIO
    ↓
DEFECTO
    ↓
Pendiente de ejecución
```

No deberán inventarse:

- resultados de ejecución
- defectos
- evidencias de ejecución
- estados como Pasó o Falló.

La matriz deberá demostrar la coherencia entre los tres laboratorios.
El formato completo de la matriz se describe en
[Formato de la matriz de trazabilidad](/materias/pruebas-software/unidad-02/formato-matriz-trazabilidad/).

## 2. Resultado de aprendizaje

Al finalizar el laboratorio, el equipo será capaz de:

- construir una matriz de trazabilidad
- relacionar requisitos con artefactos de prueba
- relacionar reglas de negocio con criterios y escenarios
- relacionar requisitos no funcionales con escenarios verificables
- identificar requisitos sin cobertura
- identificar escenarios sin requisito de origen
- identificar criterios de aceptación sin escenario asociado
- identificar escenarios sin criterio de aceptación
- documentar relaciones de seguridad
- establecer la relación prevista entre escenarios y defectos
- validar la consistencia de los identificadores
- defender oralmente las relaciones establecidas en la matriz.

## 3. Prerrequisitos

El equipo deberá haber completado los Laboratorios 1 y 2.

**Laboratorio 1** — deberá contar con:

- 5 requisitos funcionales
- 3 requisitos no funcionales
- 4 reglas de negocio
- al menos 1 requisito no funcional de seguridad
- identificadores únicos (RF-XX, RNF-XX, RN-XX)
- descripciones verificables
- fuente de cada elemento.

**Laboratorio 2** — deberá contar como mínimo con:

- 2 historias de usuario o 2 casos de uso
- 4 criterios de aceptación
- 6 escenarios de prueba: 2 positivos, 2 negativos y 2 alternos /
  límite
- escenarios de seguridad cuando correspondan
- identificadores HU-XX / CU-XX, CA-XX y ESC-XX.

Los identificadores deberán ser exactamente los mismos utilizados en
los laboratorios anteriores.

## 4. Entregable integrador de la Unidad II

El producto final de los tres laboratorios será una matriz de
trazabilidad integrada:

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

La matriz no deberá construirse como un documento independiente.
Deberá integrar los artefactos desarrollados previamente y demostrar
que las relaciones entre ellos son coherentes.

## 5. Estructura oficial de la matriz

La matriz deberá contener como mínimo las siguientes columnas:

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Estas columnas deberán mantenerse en el documento oficial
`matriz_trazabilidad.md`.

## 6. Significado de las columnas

### 6.1 ID origen

Identificador del requisito o regla de negocio que origina la relación.
Valores permitidos: RF-XX, RNF-XX o RN-XX (por ejemplo, RF-01, RNF-01,
RN-01). El identificador deberá coincidir exactamente con el
Laboratorio 1.

### 6.2 Tipo

Indica el tipo del elemento de origen:

- **RF** = Requisito funcional
- **RNF** = Requisito no funcional
- **RN** = Regla de negocio.

### 6.3 Descripción

Descripción breve del requisito o regla de negocio. La descripción
deberá conservar el significado establecido en el Laboratorio 1. No
deberá modificarse únicamente para hacer que una relación parezca
válida.

### 6.4 HU/CU

Identificador de la historia de usuario o caso de uso relacionado (por
ejemplo, HU-01, HU-02 o CU-01, CU-02). Si la naturaleza del requisito
no requiere una HU/CU intermedia, podrá utilizarse **—**. La ausencia
de HU/CU deberá justificarse cuando sea necesario.

### 6.5 CA

Identificador del criterio de aceptación relacionado (por ejemplo,
CA-01, CA-02, CA-03). El criterio deberá existir realmente en el
Laboratorio 2. No deberán inventarse criterios únicamente para
completar la matriz.

### 6.6 ESC

Identificador del escenario de prueba relacionado (por ejemplo, ESC-01,
ESC-02, ESC-03). El escenario deberá existir realmente en el
Laboratorio 2.

### 6.7 Tipo de escenario

Se utilizarán exclusivamente: **Positivo**, **Negativo** y **Alterno /
Límite**. La clasificación deberá corresponder a la naturaleza real del
escenario.

### 6.8 Tipo de prueba

Se utilizarán las categorías aplicables al proyecto: Funcional,
Seguridad, Rendimiento, Usabilidad y Disponibilidad.

Un escenario podrá tener más de una característica cuando la relación
esté justificada, pero deberá evitarse utilizar múltiples categorías
sin una razón verificable. Cuando el escenario corresponda a seguridad,
deberá indicarse explícitamente **Seguridad**.

### 6.9 Defecto

Durante esta unidad no se registrarán defectos reales. El valor deberá
permanecer **Pendiente de ejecución**. No deberán utilizarse DEF-001,
DEF-002, DEF-003, a menos que exista una ejecución real posterior que
haya permitido identificar dichos defectos.

### 6.10 Estado de ejecución

Durante la Unidad II todos los escenarios deberán conservar **No
ejecutado**. No deberán utilizarse Pasó, Falló o Bloqueado como
resultados de ejecución si la prueba todavía no ha sido ejecutada.

### 6.11 Observaciones

Esta columna permitirá documentar relaciones o situaciones que
requieran aclaración, por ejemplo:

- Requisito no funcional.
- Relación directa con el escenario.
- Escenario negativo.
- Condición de límite.
- Control de acceso.
- Autenticación.
- Autorización.
- Relación con regla de negocio.

Las observaciones deberán ser breves y relevantes.

## 7. Trazabilidad hacia adelante

La matriz deberá permitir responder: **¿cómo se verifica este
requisito?**

```text
RF-02
  ↓ se representa mediante
HU-02
  ↓ se concreta mediante
CA-03
  ↓ se verifica mediante
ESC-03
```

## 8. Trazabilidad hacia atrás

La matriz también deberá permitir responder: **¿qué requisito
justifica este escenario?**

```text
ESC-03
  ↓
CA-03
  ↓
HU-02
  ↓
RF-02
```

Esta lectura permite comprobar que el escenario no fue creado de forma
aislada.

## 9. Trazabilidad de reglas de negocio

Las reglas de negocio deberán aparecer explícitamente cuando formen
parte del alcance de la matriz. Ejemplo:

```text
RN-03
  ↓
CA-03
  ↓
ESC-03
```

Si una regla de negocio complementa un requisito funcional, puede
aparecer junto con él en una relación:

```text
RF-02 + RN-03
       ↓
     HU-02
       ↓
     CA-03
       ↓
     ESC-03
```

La matriz deberá permitir identificar qué parte corresponde al
comportamiento funcional y qué parte corresponde a la restricción de
negocio.

## 10. Trazabilidad de requisitos no funcionales

Los requisitos no funcionales deberán tener una relación verificable
con criterios y escenarios cuando formen parte del alcance de la
matriz. No todos requieren necesariamente una HU/CU intermedia.

```text
RNF-03
  ↓
CA-09
  ↓
ESC-09
```

En este caso, la relación puede ser directa porque el requisito no
funcional puede verificarse mediante un escenario específico. Si se
utiliza `HU/CU: —`, la decisión deberá ser coherente con la naturaleza
del requisito.

## 11. Trazabilidad de seguridad

Los requisitos de seguridad deberán aparecer explícitamente en la
matriz. Ejemplos:

```text
RNF-01             RNF-02
  ↓                  ↓
CA-07              CA-08
  ↓                  ↓
ESC-07             ESC-08
  ↓                  ↓
Seguridad          Seguridad
```

La columna **Tipo de prueba** deberá indicar **Seguridad** cuando el
escenario esté diseñado para verificar una condición de seguridad.

## 12. Seguridad como condición verificable

Los requisitos de seguridad deberán conservar la característica de
verificabilidad definida en el Laboratorio 1. No deberá utilizarse una
formulación genérica como "El sistema debe ser seguro". La condición
deberá poder observarse mediante un escenario.

| Requisito | Trazabilidad |
| --- | --- |
| **RNF-01** — El sistema debe impedir que un usuario no autenticado consulte información de citas. | RNF-01 → CA-07 → ESC-07 → Tipo de prueba: Seguridad |
| **RNF-02** — El sistema debe impedir que un paciente consulte información perteneciente a otro paciente. | RNF-02 → CA-08 → ESC-08 → Tipo de prueba: Seguridad |

No deberá afirmarse que existe una vulnerabilidad hasta que la prueba
sea ejecutada.

## 13. Cobertura mínima

La matriz deberá demostrar, dentro del alcance definido por el equipo,
la relación entre:

- requisitos funcionales
- requisitos no funcionales
- reglas de negocio
- historias de usuario o casos de uso
- criterios de aceptación
- escenarios de prueba
- tipos de escenario
- tipos de prueba
- relación futura con defectos.

El objetivo no es llenar filas arbitrariamente. La matriz deberá
demostrar relaciones lógicas y justificables.

## 14. Cobertura de requisitos

Para cada requisito o regla incluido en la matriz, el equipo deberá
preguntar:

- ¿Tiene una relación con una HU/CU?
- ¿Tiene un criterio de aceptación?
- ¿Tiene un escenario de prueba?

Cuando alguna respuesta sea negativa, el equipo deberá revisar si:

- falta un artefacto
- la relación está documentada en otro elemento
- el requisito no forma parte del alcance seleccionado
- la relación no requiere una HU/CU intermedia.

No deberán agregarse elementos únicamente para ocultar una falta de
cobertura.

## 15. Cobertura de escenarios

Para cada escenario deberán responder:

- ¿De qué requisito o regla proviene?
- ¿Con qué criterio de aceptación se relaciona?
- ¿Con qué HU/CU está relacionado cuando corresponda?
- ¿Por qué tiene ese tipo de escenario?
- ¿Por qué tiene ese tipo de prueba?

Un escenario sin origen identificable deberá revisarse antes de
entregar.

## 16. Cobertura de criterios de aceptación

Para cada criterio deberán comprobar:

- ¿Está relacionado con una HU/CU?
- ¿Está relacionado con un requisito o regla?
- ¿Tiene al menos un escenario asociado?

Si un criterio no tiene escenario, deberá agregarse el escenario
correspondiente o justificarse explícitamente la situación.

## 17. Análisis de cobertura

El equipo deberá realizar las siguientes preguntas:

| Pregunta | Qué hacer si ocurre |
| --- | --- |
| **1. Requisito sin escenario.** ¿Existe algún requisito o regla sin escenario asociado? | Agregar el escenario correspondiente, o justificar por qué no forma parte del alcance de la matriz. |
| **2. Escenario sin requisito.** ¿Existe algún escenario sin requisito o regla de origen? | Revisar si falta un requisito, falta una regla de negocio, el escenario fue creado fuera del alcance o existe una relación incorrectamente documentada. |
| **3. Criterio sin escenario.** ¿Existe algún criterio de aceptación sin escenario? | Revisar su cobertura. |
| **4. Escenario sin criterio.** ¿Existe algún escenario sin criterio de aceptación? | Justificarlo o corregirlo. |

## 18. Relación entre tipo de escenario y tipo de prueba

Estas columnas deberán analizarse de forma independiente.

| Tipo de escenario | Tipo de prueba | Significa |
| --- | --- | --- |
| Negativo | Seguridad | el escenario verifica una condición negativa y la naturaleza de la prueba es seguridad |
| Alterno / Límite | Rendimiento | el escenario representa una condición de límite y la prueba evalúa una característica de rendimiento |

Por lo tanto, no deberá utilizarse Seguridad, Rendimiento u otra
categoría como sustituto de Negativo, Positivo o Alterno / Límite.

## 19. Distribución mínima de escenarios

La matriz deberá conservar como mínimo la distribución establecida en
el Laboratorio 2:

| Tipo de escenario | Cantidad mínima |
| --- | --- |
| Positivo | 2 |
| Negativo | 2 |
| Alterno / Límite | 2 |
| **Total** | **6** |

Los escenarios de seguridad podrán formar parte de los escenarios
negativos cuando correspondan. Por ejemplo: `ESC-07`, tipo de escenario
Negativo, tipo de prueba Seguridad.

## 20. Defectos durante la Unidad II

Los escenarios de prueba representan diseños de prueba. No representan
resultados de ejecución. Por esta razón, durante esta unidad:

```text
ESC-07
   ↓
Defecto: Pendiente de ejecución
   ↓
Estado: No ejecutado
```

No deberá utilizarse un identificador de defecto como `DEF-001` sin que
exista una ejecución real que haya producido dicho defecto.

## 21. Relación futura con defectos

En una unidad posterior, después de ejecutar un escenario, podría
establecerse una relación como `ESC-07 → DEF-001`, por ejemplo:

> **DEF-001** — El sistema permitió acceder a información protegida sin
> cumplir la condición de seguridad establecida.

Esta relación es únicamente ilustrativa. No deberá incluirse como
defecto real en la matriz de la Unidad II si la prueba todavía no ha
sido ejecutada.

## 22. Procedimiento de construcción

### Paso 1 — Integrar el Laboratorio 1

Copien a la matriz los identificadores RF, RNF y RN, su tipo y su
descripción. No modifiquen los identificadores ni el significado de las
descripciones.

### Paso 2 — Integrar el Laboratorio 2

Agreguen las relaciones con HU/CU, CA y ESC. Cada relación deberá
existir realmente en los documentos anteriores.

### Paso 3 — Clasificar los escenarios

Verifiquen que la matriz conserve 2 positivos, 2 negativos y 2 alternos
/ límite. Verifiquen también que los escenarios de seguridad estén
identificados como **Tipo de prueba: Seguridad** cuando corresponda.

### Paso 4 — Revisar la cobertura

Comprueben `Requisito → HU/CU → CA → ESC` cuando corresponda. También
revisen `ESC → CA → HU/CU → Requisito` para validar la trazabilidad
hacia atrás.

### Paso 5 — Completar defectos y ejecución

Durante esta unidad utilicen **Defecto: Pendiente de ejecución** y
**Estado de ejecución: No ejecutado**. No creen defectos ficticios.

### Paso 6 — Validar consistencia

Comparen los tres laboratorios. Los identificadores deberán coincidir
exactamente.

## 23. Ejemplo completo de referencia

El siguiente ejemplo es únicamente ilustrativo y corresponde al
Proyecto A — Sistema de citas médicas.

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF-01 | RF | Consultar disponibilidad de un profesional | HU-01 | CA-01 | ESC-01 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RF-02 | RF | Solicitar una cita cuando exista disponibilidad | HU-02 | CA-02 | ESC-02 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RF-02 | RF | Solicitar una cita cuando exista disponibilidad | HU-02 | CA-03 | ESC-03 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | Horario no disponible |
| RF-03 | RF | Cancelar una cita existente | HU-03 | CA-04 | ESC-04 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RF-04 | RF | Solicitar reprogramación de una cita | HU-02 | CA-05 | ESC-05 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | Horario destino ocupado |
| RF-05 | RF | Consultar las citas del paciente | HU-03 | CA-06 | ESC-06 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RNF-01 | RNF | Impedir acceso sin autenticación | — | CA-07 | ESC-07 | Negativo | Seguridad | Pendiente de ejecución | No ejecutado | Control de acceso |
| RNF-02 | RNF | Impedir acceso a información de otro paciente | HU-03 | CA-08 | ESC-08 | Negativo | Seguridad | Pendiente de ejecución | No ejecutado | Autorización |
| RNF-03 | RNF | Responder consulta de disponibilidad en máximo 3 segundos | — | CA-09 | ESC-09 | Alterno / Límite | Rendimiento | Pendiente de ejecución | No ejecutado | Requisito no funcional |
| RN-01 | RN | Un paciente no puede tener dos citas activas en la misma fecha y hora | HU-02 | CA-10 | ESC-10 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | |
| RN-02 | RN | Un profesional no puede tener dos citas confirmadas en la misma fecha y hora | HU-02 | CA-11 | ESC-11 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | Conflicto de horario |
| RN-03 | RN | Una cita solo puede solicitarse cuando existe disponibilidad | HU-02 | CA-03 | ESC-03 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | |
| RN-04 | RN | Una cita cancelada no puede utilizarse para registrar una atención | HU-03 | CA-12 | ESC-12 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | |

Este ejemplo deberá adaptarse al proyecto realmente asignado al equipo.

## 24. Interpretación de una relación completa

La fila `RF-02 → HU-02 → CA-02 → ESC-02` significa: RF-02 establece el
comportamiento requerido, HU-02 representa la necesidad del actor,
CA-02 define la condición de aceptación. ESC-02 establece el escenario
diseñado para verificar dicha condición.

Una relación de regla de negocio podría ser `RN-03 → CA-03 → ESC-03`.
Esto indica que la condición de negocio se concreta mediante un
criterio y posteriormente se verifica mediante un escenario.

Una relación de seguridad podría ser `RNF-01 → CA-07 → ESC-07 →
Seguridad`. Esto indica que el requisito de seguridad tiene una
condición de aceptación y un escenario diseñado específicamente para
verificarla.

## 25. Validación de consistencia entre laboratorios

El equipo deberá comprobar que la cadena no se rompe entre documentos.

```text
LABORATORIO 1
RF-01
   ↓
LABORATORIO 2
HU-01
   ↓
CA-01
   ↓
ESC-01
   ↓
LABORATORIO 3
RF-01 → HU-01 → CA-01 → ESC-01
```

No deberá existir una situación como la siguiente, si HU-02 no
corresponde a la relación documentada en el Laboratorio 2:

```text
Laboratorio 1:  RF-01
Laboratorio 2:  HU-03
Laboratorio 3:  RF-01 → HU-02
```

## 26. Validación de identificadores

Antes de entregar, deberán comprobar que:

- no existen identificadores duplicados
- no existen identificadores modificados
- todos los requisitos conservan sus IDs
- todas las reglas conservan sus IDs
- todas las HU/CU conservan sus IDs
- todos los criterios conservan sus IDs
- todos los escenarios conservan sus IDs.

La nomenclatura deberá ser consistente: RF-01, RNF-01, RN-01, HU-01,
CA-01, ESC-01.

## 27. Entregable integrador de la Unidad II

Al finalizar el Laboratorio 3, cada equipo deberá contar con tres
documentos relacionados.

| Documento | Archivo | Contenido |
| --- | --- | --- |
| 1 — Requisitos y reglas | `laboratorio_1_requisitos.md` | 5 RF, 3 RNF, 4 RN, al menos 1 RNF de seguridad, identificadores, fuentes, redacción verificable. |
| 2 — HU/CU, criterios y escenarios | `laboratorio_2_criterios_escenarios.md` | 2 HU o CU, 4 CA, 6 ESC como mínimo (2 positivos, 2 negativos, 2 alternos / límite). Escenarios de seguridad cuando correspondan. |
| 3 — Matriz de trazabilidad | `matriz_trazabilidad.md` | Integra Requisito / Regla → HU / CU → Criterio de aceptación → Escenario → Defecto. Durante la Unidad II, Defecto: Pendiente de ejecución. |

## 28. Presentación práctica

La matriz será utilizada como evidencia de la evaluación práctica de la
Unidad II. El equipo deberá presentar y explicar las relaciones
principales de la matriz. Cada integrante deberá comprender:

- el proyecto asignado
- los requisitos funcionales
- los requisitos no funcionales
- las reglas de negocio
- las historias de usuario o casos de uso
- los criterios de aceptación
- los escenarios
- los escenarios de seguridad
- los tipos de escenario
- los tipos de prueba
- las relaciones de trazabilidad
- la razón de las relaciones
- la situación de los defectos.

## 29. Defensa individual

Aunque la matriz sea un producto de equipo, cada integrante deberá
poder explicar las relaciones documentadas. Podrán plantearse preguntas
como:

1. ¿Por qué este escenario verifica este requisito?
2. ¿Qué diferencia existe entre este requisito y esta regla de negocio?
3. ¿Por qué este elemento es un requisito no funcional?
4. ¿Por qué este escenario es negativo?
5. ¿Por qué este escenario es alterno o de límite?
6. ¿Por qué este escenario se clasifica como Seguridad?
7. ¿Por qué un requisito de seguridad debe formularse como una
   condición verificable?
8. ¿Qué sucedería con esta fila después de ejecutar el escenario?
9. ¿Qué elemento permitiría rastrear un defecto hasta el requisito
   afectado?
10. ¿Por qué el defecto aparece actualmente como pendiente de
    ejecución?

## 30. Regla sobre ejecución

La Unidad II establece el diseño de la trazabilidad. No deberán
presentarse resultados de ejecución inventados. Durante esta etapa:
**Defecto: Pendiente de ejecución** y **Estado: No ejecutado**.

La relación real entre escenario y defecto será incorporada cuando las
pruebas sean ejecutadas en una etapa posterior.

## 31. Evaluación final de la Unidad II

La evaluación de cierre de la Unidad II estará integrada por:

| Componente | Valor |
| --- | --- |
| Evaluación teórica individual | 50 % |
| Evaluación práctica | 50 % |
| **Total** | **100 %** |

### 31.1 Evaluación teórica — 50 %

Evaluará, de forma individual, el dominio conceptual de: requisitos
funcionales, requisitos no funcionales, seguridad como característica
verificable, reglas de negocio, historias de usuario, casos de uso,
criterios de aceptación, escenarios positivos, escenarios negativos,
escenarios alternos, condiciones límite, trazabilidad, matriz de
trazabilidad, relación requisito–prueba, relación prueba–defecto.

### 31.2 Evaluación práctica — 50 %

La evaluación práctica consistirá en la presentación y defensa del
Laboratorio 1, el Laboratorio 2, la matriz de trazabilidad y las
relaciones entre los artefactos. Se considerará:

| Criterio | Evidencia |
| --- | --- |
| Coherencia del proyecto | Los tres laboratorios utilizan el mismo proyecto |
| Requisitos | RF, RNF y RN correctamente identificados |
| Verificabilidad | Los requisitos pueden ser comprobados |
| Seguridad | Existe trazabilidad verificable de seguridad cuando corresponde |
| HU/CU | Relaciones justificables con requisitos |
| Criterios de aceptación | Son verificables |
| Escenarios | Cumplen clasificación y condiciones |
| Trazabilidad | Las relaciones son completas y justificables |
| Cobertura | Los elementos incluidos tienen relaciones identificables |
| Defectos | No se inventan resultados |
| Defensa individual | Cada integrante explica las relaciones de la matriz |

## 32. Checklist final de entrega

**Proyecto**

- [ ] Es el proyecto asignado.
- [ ] No se cambió de proyecto entre laboratorios.
- [ ] No se agregaron funcionalidades fuera del alcance.
- [ ] Las descripciones corresponden al proyecto.

**Laboratorio 1**

- [ ] Existen 5 RF.
- [ ] Existen 3 RNF.
- [ ] Existen 4 RN.
- [ ] Existe al menos 1 RNF de seguridad.
- [ ] Todos tienen identificador.
- [ ] Todos son verificables.
- [ ] Todos corresponden al proyecto.
- [ ] Las reglas base no fueron modificadas.

**Laboratorio 2**

- [ ] Existen 2 HU o CU.
- [ ] Existen 4 CA.
- [ ] Existen al menos 6 ESC.
- [ ] Existen 2 escenarios positivos.
- [ ] Existen 2 escenarios negativos.
- [ ] Existen 2 escenarios alternos / límite.
- [ ] Los escenarios de seguridad están identificados como Seguridad
  cuando corresponde.
- [ ] Todos los escenarios tienen requisito de origen.
- [ ] Todos los escenarios tienen criterio relacionado.
- [ ] Todos tienen condición de entrada.
- [ ] Todos tienen acción.
- [ ] Todos tienen resultado esperado.

**Laboratorio 3**

- [ ] Todos los identificadores coinciden.
- [ ] Los requisitos tienen relaciones justificables.
- [ ] Las reglas de negocio tienen relaciones justificables.
- [ ] Los RNF tienen trazabilidad cuando forman parte del alcance.
- [ ] Las HU/CU están relacionadas con requisitos.
- [ ] Los CA están relacionados con HU/CU.
- [ ] Los ESC están relacionados con CA.
- [ ] Los escenarios tienen tipo de escenario.
- [ ] Los escenarios tienen tipo de prueba.
- [ ] Los escenarios de seguridad están identificados.
- [ ] No existen escenarios sin origen injustificados.
- [ ] No existen criterios sin escenario injustificados.
- [ ] No existen requisitos sin cobertura injustificados.
- [ ] No existen defectos inventados.
- [ ] Defecto = Pendiente de ejecución.
- [ ] Estado de ejecución = No ejecutado.

**Presentación**

- [ ] Todos los integrantes conocen la matriz.
- [ ] Todos pueden explicar una cadena completa de trazabilidad.
- [ ] Todos pueden explicar al menos un requisito.
- [ ] Todos pueden explicar una regla de negocio.
- [ ] Todos pueden explicar un criterio de aceptación.
- [ ] Todos pueden explicar un escenario.
- [ ] Todos pueden explicar la trazabilidad de seguridad cuando
  corresponda.
- [ ] Todos pueden explicar la relación requisito–prueba–defecto.
- [ ] Todos comprenden por qué los defectos permanecen pendientes.

## 33. Plantilla oficial de la matriz

El equipo deberá completar la siguiente estructura, disponible también en Excel:

<div class="descargas">
<a href="/descargas/pruebas-software/unidad-02/matriz_trazabilidad_unidad02.xlsx" download>Descargar la matriz vacía (Excel .xlsx)</a>
</div>

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF-XX | RF | | HU/CU-XX | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |
| RF-XX | RF | | HU/CU-XX | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |
| RNF-XX | RNF | | — | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |
| RNF-XX | RNF | | — | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |
| RN-XX | RN | | HU/CU-XX | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |
| RN-XX | RN | | HU/CU-XX | CA-XX | ESC-XX | | | Pendiente de ejecución | No ejecutado | |

La cantidad de filas deberá crecer según las relaciones reales del
proyecto. Una misma fuente podrá aparecer en varias filas cuando se
relacione con diferentes criterios o escenarios.

## 34. Criterio de completitud

La matriz se considerará completa cuando permita responder claramente:

```text
¿Qué requisito o regla debe verificarse?
                ↓
¿En qué HU/CU se representa?
                ↓
¿Qué criterio de aceptación define su comportamiento?
                ↓
¿Qué escenario permite verificarlo?
                ↓
¿Qué tipo de escenario es?
                ↓
¿Qué tipo de prueba corresponde?
                ↓
¿Existe algún defecto?
```

Durante la Unidad II, la última respuesta será **Pendiente de
ejecución** y el estado será **No ejecutado**.

## 35. Producto final de la Unidad II

Al finalizar los tres laboratorios, el producto integrador deberá poder
representarse así:

```text
                    PROYECTO BASE
                         │
                         ↓
              ┌─────────────────────┐
              │ LABORATORIO 1       │
              │ RF / RNF / RN       │
              └──────────┬──────────┘
                         │
                         ↓
              ┌─────────────────────┐
              │ LABORATORIO 2       │
              │ HU / CU             │
              │ CA                  │
              │ ESC                 │
              └──────────┬──────────┘
                         │
                         ↓
              ┌─────────────────────┐
              │ LABORATORIO 3       │
              │ MATRIZ DE           │
              │ TRAZABILIDAD        │
              └──────────┬──────────┘
                         │
                         ↓
                  ENTREGABLE
                  INTEGRADOR
```

La cadena de trazabilidad principal será:

```text
REQUISITO / REGLA
        ↓
HU / CU
        ↓
CRITERIO DE ACEPTACIÓN
        ↓
ESCENARIO DE PRUEBA
        ↓
DEFECTO
```

Durante esta unidad: **DEFECTO = Pendiente de ejecución** y **ESTADO =
No ejecutado**.

## 36. Resultado esperado

Al terminar el Laboratorio 3, el equipo deberá contar con una matriz
que permita demostrar que los artefactos de la Unidad II forman un
conjunto coherente:

```text
PROYECTO BASE
      ↓
REQUISITOS Y REGLAS
      ↓
HISTORIAS / CASOS
      ↓
CRITERIOS DE ACEPTACIÓN
      ↓
ESCENARIOS
      ↓
MATRIZ DE TRAZABILIDAD
      ↓
DEFECTOS
      ↓
Pendiente de ejecución
```

La matriz constituye el entregable integrador de la Unidad II y deberá
conservar la trazabilidad establecida durante los Laboratorios 1 y 2.

La evaluación final de la unidad será:

- 50 % — Evaluación teórica individual.
- 50 % — Evaluación práctica mediante presentación y defensa de la
  matriz y sus artefactos de soporte.
