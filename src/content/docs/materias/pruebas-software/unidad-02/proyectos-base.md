---
title: "Proyectos base del proyecto integrador"
description: "Pruebas de Software — los tres sistemas bajo prueba (citas médicas, tienda y inscripción escolar) sobre los que cada equipo construye sus artefactos durante el curso."
---

## 1. Propósito del documento

Este documento establece los proyectos base que serán utilizados como
sistemas bajo prueba (*System Under Test*, SUT) durante el desarrollo
del proyecto integrador de la asignatura Pruebas de Software.

Los proyectos definidos en este documento son casos académicos de
estudio. Su propósito es proporcionar un sistema de referencia común
sobre el cual puedas aplicar, de manera progresiva, los conocimientos y
técnicas de pruebas de software desarrollados durante el curso.

Los proyectos base se utilizarán inicialmente en la Unidad II para
desarrollar los artefactos relacionados con requisitos, criterios de
aceptación y trazabilidad, y posteriormente servirán como referencia
para las actividades de las unidades siguientes. Deberás conservar la
continuidad de los artefactos generados durante el curso.

La evolución esperada es:

```text
Proyecto base
      │
      ▼
Requisitos y reglas de negocio
      │
      ▼
Historias de usuario / Casos de uso
      │
      ▼
Criterios de aceptación
      │
      ▼
Escenarios de prueba
      │
      ▼
Matriz de trazabilidad
      │
      ▼
Planificación de pruebas
      │
      ▼
Casos de prueba
      │
      ▼
Pruebas unitarias e integración
      │
      ▼
Pruebas funcionales, sistema y API
      │
      ▼
Pruebas no funcionales
      │
      ▼
Defectos y seguimiento
      │
      ▼
Métricas y reporte de resultados
      │
      ▼
Proyecto integrador final
```

Los proyectos base no representan necesariamente un producto comercial
terminado. Constituyen sistemas académicos suficientemente definidos
para permitir el diseño, documentación y ejecución de diferentes tipos
de pruebas.

## 2. Relación con el proyecto integrador

Los proyectos definidos en este documento constituyen la base común del
proyecto integrador de la asignatura.

El proyecto asignado en la Unidad II deberá mantenerse como referencia
durante las unidades posteriores, salvo que el docente establezca
explícitamente una modificación de alcance.

Los artefactos desarrollados por el equipo deberán evolucionar durante
el curso. Por lo tanto, los productos de una unidad deberán servir como
insumo para las unidades siguientes.

### 2.1 Principio de continuidad

El equipo no deberá comenzar desde cero en cada unidad. Los artefactos
previamente elaborados deberán reutilizarse, ampliarse, corregirse o
actualizarse cuando las actividades posteriores así lo requieran. Por
ejemplo:

```text
Unidad II          Unidad III             Unidades IV-VI     Unidad VII
RF-01              RF-01                  CP-01              CP-01
   ↓                  ↓                      ↓                  ↓
HU-01              HU-01                  Ejecución          DEF-001
   ↓                  ↓                      ↓                  ↓
CA-01              CA-01                  Resultado          Corrección
   ↓                  ↓                                         ↓
ESC-01             ESC-01                                    Reprueba
                      ↓                                         ↓
                   Caso de prueba CP-01                      Resultado final
```

Los identificadores deberán conservarse para permitir el seguimiento de
la trazabilidad.

## 3. Organización del trabajo

### 3.1 Modalidad

El proyecto integrador se desarrollará en equipos de hasta 4
integrantes. Cada equipo trabajará exclusivamente con uno de los tres
proyectos base definidos en este documento. El proyecto asignado deberá
permanecer como referencia durante las actividades del proyecto
integrador.

### 3.2 Tamaño de los equipos

Los equipos estarán conformados por un mínimo de 2 y un máximo de 4
integrantes. El docente podrá establecer la distribución de los equipos
procurando una carga de trabajo equilibrada.

### 3.3 Responsabilidad individual

Aunque los productos principales sean elaborados en equipo, cada
integrante deberá conocer y poder explicar:

- el proyecto asignado;
- los requisitos identificados;
- las reglas de negocio;
- las historias de usuario o casos de uso;
- los criterios de aceptación;
- los escenarios y casos de prueba;
- la estrategia de pruebas;
- los defectos encontrados;
- las evidencias obtenidas;
- las métricas utilizadas;
- las conclusiones del proyecto.

El trabajo colaborativo no elimina la responsabilidad individual sobre
la comprensión de los artefactos entregados.

## 4. Nomenclatura oficial

La siguiente nomenclatura deberá utilizarse durante el proyecto
integrador.

| Elemento | Formato | Significado |
| --- | --- | --- |
| Requisito funcional | RF-01, RF-02, RF-03, ... | Función o comportamiento observable que el sistema debe realizar. |
| Requisito no funcional | RNF-01, RNF-02, RNF-03, ... | Característica de calidad, restricción o condición que debe cumplir el sistema; debe poder verificarse mediante una prueba, medición o inspección. |
| Regla de negocio | RN-01, RN-02, RN-03, ... | Condición, restricción o política propia del dominio del sistema que debe respetarse. |
| Historia de usuario | HU-01, HU-02, HU-03, ... | Necesidad expresada desde la perspectiva de un actor. |
| Caso de uso | CU-01, CU-02, CU-03, ... | Interacción entre un actor y el sistema. |
| Criterio de aceptación | CA-01, CA-02, CA-03, ... | Cada criterio deberá relacionarse con una historia de usuario o caso de uso. |
| Escenario de prueba | ESC-01, ESC-02, ESC-03, ... | Situación diseñada para verificar un criterio. |
| Caso de prueba | CP-01, CP-02, CP-03, ... | Se desarrollará en las unidades correspondientes, conservando la relación con los escenarios previamente diseñados. |
| Defecto | DEF-001, DEF-002, DEF-003, ... | Se registra únicamente cuando exista evidencia de una ejecución o revisión que permita documentar el comportamiento observado. |
| Reprueba | RE-001, RE-002, RE-003, ... | Documenta la verificación posterior a una corrección. |

**Ejemplos**

> **RF-01** — El sistema debe permitir registrar un paciente
> proporcionando nombre, fecha de nacimiento y número de
> identificación.

> **RNF-01** — El sistema debe mostrar el resultado de una consulta en
> un tiempo máximo de 3 segundos bajo las condiciones establecidas para
> la prueba.

> **RN-01** — Un paciente no puede tener dos citas activas para la
> misma fecha y hora.

> **HU-01** — Como paciente, quiero consultar los horarios disponibles
> para seleccionar una cita.

Cuando el laboratorio correspondiente permita utilizar historias de
usuario o casos de uso, el equipo deberá conservar el mecanismo
seleccionado durante el desarrollo del proyecto, salvo indicación del
docente.

Un escenario de prueba deberá indicar, como mínimo: identificación,
elemento relacionado, tipo de escenario, condición inicial, datos de
entrada y resultado esperado. Los tipos de escenario utilizados
inicialmente serán **Positivo**, **Negativo** y **Alterno o condición
límite**.

No deberán inventarse defectos para completar la documentación.

## 5. Reglas generales para los proyectos

### Regla 1 — No modificar el alcance sin autorización

Deberás trabajar con el alcance definido para el proyecto asignado. No
podrán agregarse módulos o funcionalidades completamente nuevas sin
autorización del docente.

### Regla 2 — El proyecto base es un sistema bajo prueba

El proyecto base representa el sistema sobre el cual se diseñarán y,
cuando corresponda, ejecutarán las pruebas. Los artefactos de prueba
deberán referirse al proyecto asignado.

### Regla 3 — No inventar evidencia

No deberás presentar como ejecutada una prueba que no haya sido
realizada. No deberán inventarse resultados, capturas, defectos,
métricas, tiempos de respuesta, porcentajes de cobertura, resultados de
rendimiento ni resultados de seguridad.

Cuando una actividad todavía no haya sido ejecutada, deberá indicarse:
**Pendiente de ejecutar**.

### Regla 4 — Mantener la trazabilidad

Los identificadores deberán conservarse durante las unidades
posteriores:

```text
RF-01 → HU-01 → CA-01 → ESC-01 → CP-01 → Ejecución → DEF-001 → RE-001
```

La matriz de trazabilidad deberá actualizarse conforme avance el
proyecto.

### Regla 5 — Los artefactos son evolutivos

Un artefacto desarrollado en una unidad podrá ser ampliado o corregido
posteriormente. Por ejemplo, un requisito identificado en la Unidad II
puede ser refinado posteriormente si durante el diseño o ejecución de
pruebas se identifica una ambigüedad. Cuando esto ocurra, deberá
conservarse la trazabilidad y documentarse el cambio.

### Regla 6 — Distinguir especificación de supuesto

Podrás establecer supuestos académicos cuando sean necesarios para
diseñar una prueba. Sin embargo, deberás distinguir entre la
**información proporcionada por el proyecto** y el **supuesto
establecido por el equipo**. Los supuestos no deberán convertirse
automáticamente en nuevas funcionalidades.

### Regla 7 — Las pruebas deberán basarse en requisitos

Los casos y escenarios de prueba deberán tener una relación justificable
con requisitos funcionales, requisitos no funcionales, reglas de
negocio, criterios de aceptación o riesgos identificados.

## 6. Proyecto A — Sistema de citas médicas

### 6.1 Descripción general

El proyecto consiste en un sistema que permite administrar citas
médicas entre pacientes y profesionales de la salud. El sistema permite
consultar disponibilidad, solicitar citas y administrar citas
existentes. Será utilizado por pacientes y personal autorizado de la
institución médica.

### 6.2 Alcance funcional

El proyecto contempla:

- Registro de pacientes.
- Solicitud de citas.
- Cancelación de citas.
- Reprogramación de citas.
- Consulta de disponibilidad.
- Notificaciones relacionadas con las citas.

Estas funcionalidades constituyen el alcance académico del proyecto.

### 6.3 Actores

| Actor | Puede |
| --- | --- |
| Paciente | Registrar sus datos; consultar disponibilidad; solicitar una cita; consultar sus citas; cancelar una cita; solicitar la reprogramación de una cita; recibir notificaciones. |
| Personal médico | Consultar las citas asignadas; consultar su disponibilidad; recibir información relacionada con sus citas. |
| Personal administrativo | Registrar información necesaria para la gestión de citas; consultar citas; consultar disponibilidad; realizar acciones administrativas permitidas. |

### 6.4 Condiciones iniciales

Para efectos de los ejercicios:

- Cada paciente debe contar con un identificador único.
- Cada profesional de la salud debe contar con un identificador único.
- Cada cita debe estar asociada con un paciente y un profesional.
- Una cita debe tener fecha y hora.
- La disponibilidad de un profesional se define mediante horarios
  previamente establecidos.
- Una cita puede encontrarse en estado: Disponible, Confirmada,
  Cancelada o Reprogramada.
- Una cita cancelada no puede considerarse disponible automáticamente
  para el paciente que la canceló sin que exista nuevamente un espacio
  disponible.
- No se permite asignar dos citas al mismo profesional en la misma
  fecha y hora.

### 6.5 Reglas de negocio iniciales

| ID | Regla |
| --- | --- |
| RN-01 | Un paciente no puede tener dos citas activas para la misma fecha y hora. |
| RN-02 | Un profesional no puede tener dos citas confirmadas para la misma fecha y hora. |
| RN-03 | Una cita solo puede solicitarse cuando existe disponibilidad para el profesional seleccionado. |
| RN-04 | Una cita cancelada no puede utilizarse para registrar una atención. |
| RN-05 | La reprogramación de una cita solo puede realizarse hacia un horario que se encuentre disponible. |
| RN-06 | Una cita debe estar asociada con un paciente y un profesional. |

Estas reglas constituyen la especificación base. El equipo podrá
identificar reglas adicionales únicamente cuando puedan derivarse
directamente de la descripción y condiciones del proyecto.

### 6.6 Condiciones de prueba disponibles

Puedes considerar: paciente existente; paciente no registrado;
profesional existente; horario disponible; horario no disponible; cita
confirmada; cita cancelada; solicitud de cita duplicada; intento de
reprogramación hacia un horario ocupado.

## 7. Proyecto B — Sistema de venta y pedidos de una tienda

### 7.1 Descripción general

El proyecto consiste en un sistema que permite administrar productos,
clientes y pedidos de una tienda. Los clientes pueden consultar
productos, seleccionar productos y generar pedidos. El sistema también
permite consultar el estado de los pedidos.

### 7.2 Alcance funcional

El proyecto contempla:

- Registro de clientes.
- Consulta de catálogo de productos.
- Administración del carrito.
- Generación de pedidos.
- Consulta del estado del pedido.

Estas funcionalidades constituyen el alcance académico del proyecto.

### 7.3 Actores

| Actor | Puede |
| --- | --- |
| Cliente | Registrarse; consultar productos; agregar productos al carrito; modificar cantidades; eliminar productos del carrito; generar un pedido; consultar el estado de sus pedidos. |
| Personal de tienda | Consultar pedidos; actualizar el estado de los pedidos; consultar información de productos. |

### 7.4 Condiciones iniciales

Para efectos de los ejercicios:

- Cada cliente tiene un identificador único.
- Cada producto tiene un identificador único.
- Cada producto tiene un nombre y un precio.
- Cada producto tiene una cantidad disponible.
- Un carrito pertenece a un cliente.
- Un pedido pertenece a un cliente.
- Un pedido contiene uno o más productos.
- La cantidad solicitada de un producto no puede superar la cantidad
  disponible.
- Un pedido generado debe tener un identificador único.
- Los estados permitidos para un pedido son: Generado, Confirmado, En
  preparación, Enviado, Entregado y Cancelado.

### 7.5 Reglas de negocio iniciales

| ID | Regla |
| --- | --- |
| RN-01 | Un cliente no puede generar un pedido sin identificarse en el sistema. |
| RN-02 | La cantidad solicitada de un producto no puede ser mayor que la cantidad disponible. |
| RN-03 | Un pedido debe contener al menos un producto. |
| RN-04 | El precio utilizado para generar el pedido debe corresponder al precio vigente del producto en el momento de generar el pedido. |
| RN-05 | Un pedido entregado no puede cambiar nuevamente al estado cancelado. |
| RN-06 | Un pedido debe estar asociado con un único cliente. |

Estas reglas constituyen la especificación base. El equipo podrá
identificar reglas adicionales únicamente cuando puedan derivarse
directamente de la descripción y condiciones del proyecto.

### 7.6 Condiciones de prueba disponibles

Puedes considerar: cliente registrado; cliente no registrado; producto
disponible; producto sin existencia; cantidad disponible suficiente;
cantidad solicitada superior a la existencia; carrito vacío; carrito con
productos; pedido generado; pedido enviado; pedido entregado; intento de
cancelar un pedido entregado.

## 8. Proyecto C — Sistema de inscripción escolar

### 8.1 Descripción general

El proyecto consiste en un sistema para gestionar la inscripción de
estudiantes a materias de una institución educativa. El sistema permite
consultar materias, revisar disponibilidad de cupos, realizar
inscripciones y consultar el horario del estudiante.

### 8.2 Alcance funcional

El proyecto contempla:

- Registro de estudiantes.
- Consulta de materias.
- Inscripción a materias.
- Validación de cupo.
- Consulta de horario.

Estas funcionalidades constituyen el alcance académico del proyecto.

### 8.3 Actores

| Actor | Puede |
| --- | --- |
| Estudiante | Consultar sus datos; consultar materias disponibles; consultar horarios; inscribirse a materias; consultar sus materias inscritas. |
| Personal académico o administrativo | Consultar estudiantes; consultar materias; consultar cupos; consultar inscripciones. |

### 8.4 Condiciones iniciales

Para efectos de los ejercicios:

- Cada estudiante tiene un identificador único.
- Cada materia tiene un identificador único.
- Cada materia tiene un número máximo de estudiantes.
- Una materia puede tener cupos disponibles o no disponibles.
- Un estudiante puede inscribirse en una materia una sola vez.
- Una inscripción relaciona un estudiante con una materia.
- Una materia tiene un horario definido.
- El estudiante puede consultar las materias en las que está inscrito.
- El sistema debe impedir inscripciones que excedan el cupo disponible.
- El sistema debe identificar conflictos de horario de acuerdo con la
  información definida para las materias.

### 8.5 Reglas de negocio iniciales

| ID | Regla |
| --- | --- |
| RN-01 | Un estudiante no puede inscribirse dos veces en la misma materia. |
| RN-02 | Una materia no puede aceptar nuevas inscripciones cuando ha alcanzado su número máximo de estudiantes. |
| RN-03 | Un estudiante no puede inscribirse en dos materias que tengan un horario incompatible. |
| RN-04 | Una inscripción debe estar asociada con un estudiante y una materia. |
| RN-05 | El sistema debe rechazar una inscripción cuando la materia no tenga cupo disponible. |
| RN-06 | El estudiante solo puede consultar las materias que tenga registradas en su inscripción. |

Estas reglas constituyen la especificación base. El equipo podrá
identificar reglas adicionales únicamente cuando puedan derivarse
directamente de la descripción y condiciones del proyecto.

### 8.6 Condiciones de prueba disponibles

Puedes considerar: estudiante registrado; estudiante no registrado;
materia con cupo; materia sin cupo; estudiante ya inscrito; estudiante
no inscrito; materias con horarios compatibles; materias con horarios
incompatibles; intento de inscripción duplicada.

## 9. Distribución de los proyectos

El docente asignará uno de los siguientes proyectos a cada equipo:

| Proyecto | Sistema | Funcionalidades principales |
| --- | --- | --- |
| A | Sistema de citas médicas | Pacientes, citas, disponibilidad, cancelación, reprogramación y notificaciones |
| B | Sistema de venta y pedidos de una tienda | Clientes, productos, carrito, pedidos y estado del pedido |
| C | Sistema de inscripción escolar | Estudiantes, materias, inscripción, cupos y horarios |

La distribución deberá procurar una cantidad equilibrada de equipos
trabajando sobre cada proyecto.

## 10. Artefactos iniciales de la Unidad II

Durante la Unidad II, cada equipo deberá construir los primeros
artefactos del proyecto integrador. Como mínimo deberá producir:

| Laboratorio | Producto mínimo |
| --- | --- |
| [Laboratorio 1](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio/) | 5 requisitos funcionales, 3 requisitos no funcionales y 4 reglas de negocio. |
| [Laboratorio 2](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-2-criterios-aceptacion-escenarios/) | A partir de los requisitos y reglas seleccionados: 2 historias de usuario o casos de uso, 4 criterios de aceptación y 6 escenarios de prueba (2 positivos, 2 negativos y 2 alternos o de condición límite). |
| [Laboratorio 3](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/) | Matriz de trazabilidad inicial. |

La matriz deberá relacionar, como mínimo:

```text
Requisito
    ↓
Historia de usuario / Caso de uso
    ↓
Criterio de aceptación
    ↓
Escenario de prueba
```

La relación con casos de prueba, ejecuciones y defectos se incorporará
posteriormente conforme avance el proyecto integrador.

## 11. Requisitos no funcionales base

Para evitar que tengas que inventar completamente las condiciones de
calidad, inicialmente podrán utilizarse las siguientes categorías:
Rendimiento, Seguridad, Usabilidad y Disponibilidad. Los equipos
deberán convertir las condiciones generales en requisitos verificables.

| Condición general | Requisito no funcional verificable |
| --- | --- |
| El sistema debe responder rápidamente. | **RNF-03** — El sistema debe mostrar el resultado de una consulta de disponibilidad en un tiempo máximo de 3 segundos bajo las condiciones definidas para la prueba. |

El docente podrá establecer valores específicos antes de la ejecución
de las pruebas. Los valores utilizados deberán quedar documentados en
el proyecto.

## 12. Qué puede modificar o ampliar el equipo

El equipo puede:

- redactar requisitos derivados de la especificación;
- dividir una funcionalidad en varios requisitos;
- identificar reglas de negocio adicionales derivadas del dominio;
- seleccionar historias de usuario o casos de uso;
- definir criterios de aceptación;
- diseñar escenarios de prueba;
- establecer datos de entrada;
- definir datos de prueba;
- establecer supuestos académicos necesarios para una prueba;
- ampliar los casos de prueba;
- identificar riesgos de prueba;
- proponer pruebas adicionales justificadas.

Las ampliaciones deberán conservar relación con el alcance del
proyecto.

## 13. Qué no puede modificar el equipo

El equipo no deberá:

- cambiar el alcance principal del proyecto;
- agregar módulos completamente nuevos sin autorización;
- inventar funcionalidades no relacionadas con el proyecto;
- eliminar una regla de negocio establecida;
- cambiar el significado de una regla de negocio;
- modificar identificadores previamente utilizados;
- presentar como ejecutada una prueba que no se realizó;
- inventar resultados;
- inventar defectos;
- inventar métricas;
- presentar evidencia falsa.

Cuando un elemento sea modificado por una razón justificada, deberá
actualizarse la trazabilidad correspondiente.

## 14. Criterio de consistencia entre unidades

Los artefactos deberán mantener coherencia durante todo el proyecto
integrador. Ejemplo con el Proyecto A:

```text
UNIDAD II
RF-02 — Solicitar una cita
RN-03 — Solo solicitar una cita cuando existe disponibilidad
RNF-03 — Tiempo máximo de respuesta
        ↓
HU-02 — Solicitar una cita
        ↓
CA-02 — La cita puede solicitarse cuando existe disponibilidad
CA-03 — El sistema rechaza la solicitud cuando no existe disponibilidad
        ↓
ESC-02 — Solicitud válida
ESC-03 — Horario ocupado
        ↓
UNIDADES POSTERIORES
CP-01 — Verificar solicitud de cita disponible
        ↓
EJECUCIÓN
Resultado: Aprobado / Fallido
        ↓
Si existe defecto: DEF-001
        ↓
Corrección
        ↓
RE-001 — Reprueba
        ↓
Resultado final
```

Si un elemento cambia durante el proyecto, deberán actualizarse los
artefactos dependientes.

## 15. Evolución de la matriz de trazabilidad

La matriz de trazabilidad comenzará en la Unidad II como un instrumento
para relacionar requisitos con los primeros artefactos de prueba.
Posteriormente deberá ampliarse conforme se generen nuevos artefactos.

| Unidad | Cadena |
| --- | --- |
| Unidad II | RF / RNF / RN → HU / CU → CA → ESC |
| Unidad III | RF / RNF / RN → HU / CU → CA → ESC → CP |
| Unidades IV-VI | CP → Ejecución → Resultado → Evidencia |
| Unidad VII | CP → DEF → Corrección → Reprueba → Resultado final |

La matriz deberá actualizarse y conservarse como parte del portafolio
del proyecto integrador.

## 16. Relación de los proyectos base con las unidades posteriores

Los proyectos base deberán servir como referencia para las actividades
prácticas del curso.

| Unidad | Aplicación al proyecto |
| --- | --- |
| Unidad I | Fundamentos y criterios que sustentan la estrategia de calidad |
| Unidad II | Requisitos, reglas, criterios de aceptación, escenarios y trazabilidad |
| Unidad III | Planificación, técnicas y documentación de pruebas |
| Unidad IV | Pruebas unitarias e integración, según el alcance definido para el proyecto |
| Unidad V | Pruebas funcionales, sistema, GUI y APIs, según corresponda |
| Unidad VI | Pruebas de rendimiento, seguridad, usabilidad y accesibilidad |
| Unidad VII | Gestión de defectos, métricas, evidencias y reporte de resultados |
| Unidad VIII | Relación del trabajo realizado con roles, ética y práctica profesional |

No todas las actividades de una unidad tienen que producir un artefacto
completamente nuevo. Algunas actividades podrán consistir en ampliar,
ejecutar, analizar o mejorar artefactos previamente desarrollados.

## 17. Ejemplos usados en clase

Los ejemplos utilizados durante las explicaciones del docente podrán
utilizar sistemas distintos de los tres proyectos base. Sin embargo,
los productos evaluados deberán elaborarse sobre el proyecto base que
le haya sido asignado a tu equipo, salvo autorización expresa del
docente.

Los ejemplos utilizados durante las explicaciones no forman parte
automáticamente de tu evidencia.

## 18. Resultado esperado al finalizar el proyecto integrador

Al finalizar el curso, cada equipo deberá contar con un conjunto
coherente de artefactos que evidencie la aplicación progresiva de las
técnicas de pruebas de software. Como referencia, el proyecto podrá
integrar:

```text
PROYECTO BASE
      │
      ├── Requisitos funcionales
      ├── Requisitos no funcionales
      ├── Reglas de negocio
      │
      ├── Historias de usuario / Casos de uso
      ├── Criterios de aceptación
      ├── Escenarios de prueba
      │
      ├── Matriz de trazabilidad
      │
      ├── Plan de pruebas
      ├── Estrategia de pruebas
      ├── Riesgos
      │
      ├── Casos de prueba
      ├── Datos de prueba
      ├── Evidencias
      │
      ├── Pruebas unitarias
      ├── Pruebas de integración
      ├── Pruebas funcionales
      ├── Pruebas de sistema
      ├── Pruebas de API
      ├── Pruebas GUI
      │
      ├── Pruebas de rendimiento
      ├── Pruebas de seguridad
      ├── Evaluación de usabilidad
      ├── Evaluación de accesibilidad
      │
      ├── Registro de defectos
      ├── Seguimiento de correcciones
      ├── Repruebas
      │
      ├── Métricas
      ├── Indicadores de calidad
      ├── Reporte final
      │
      └── Presentación / defensa del proyecto integrador
```

El alcance exacto de cada artefacto será determinado por las
actividades y entregables establecidos para cada unidad.

## 19. Principio de reutilización

El proyecto integrador deberá evitar la duplicación innecesaria de
trabajo. Cuando un artefacto desarrollado previamente sea adecuado para
una actividad posterior, deberá reutilizarse y ampliarse.

**No:**

```text
Unidad II  → Matriz A
Unidad III → Matriz B
Unidad IV  → Matriz C
```

**Sí:**

```text
Unidad II  → Matriz inicial
                 ↓
Unidad III → Matriz ampliada
                 ↓
Unidad IV  → Matriz actualizada
                 ↓
Unidad V   → Matriz actualizada
                 ↓
Unidad VII → Matriz final
```

De esta manera, los productos desarrollados durante el curso
constituyen un único expediente técnico del proyecto.

## 20. Condición de cierre

El proyecto integrador se considerará completo cuando el equipo haya
integrado los artefactos establecidos para las unidades
correspondientes y pueda demostrar la relación entre:

```text
Necesidad / Requisito
        ↓
Diseño de prueba
        ↓
Ejecución
        ↓
Resultado
        ↓
Defecto, cuando exista
        ↓
Corrección
        ↓
Reprueba
        ↓
Métrica / Evidencia
        ↓
Conclusión de calidad
```

La existencia de un defecto no constituye por sí misma un resultado
negativo del proyecto. Los defectos encontrados deberán documentarse,
analizarse y gestionarse conforme al proceso establecido en la
asignatura.

El objetivo del proyecto integrador es demostrar la capacidad del
equipo para diseñar, ejecutar, documentar, analizar y comunicar
actividades de pruebas de software de manera sistemática y trazable.
