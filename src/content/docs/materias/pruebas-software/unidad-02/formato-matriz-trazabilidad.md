---
title: "Formato de la matriz de trazabilidad"
description: "Pruebas de Software, Unidad II — formato oficial de la matriz de trazabilidad: columnas, valores permitidos, reglas, ejemplo con el Proyecto A y plantilla vacía."
---

Descarga la plantilla en Excel para empezar a trabajar. Incluye la matriz
vacía con listas desplegables para los tipos, una hoja de instrucciones
y el ejemplo del Proyecto A.

<div class="descargas">
<a href="/descargas/pruebas-software/unidad-02/matriz_trazabilidad_unidad02.xlsx" download>Descargar la matriz vacía (Excel .xlsx)</a>
</div>

## 1. Propósito

La matriz de trazabilidad es el artefacto que permite demostrar la
relación entre la base de prueba y los diferentes artefactos que se
desarrollarán durante el proyecto integrador.

En la Unidad II, la matriz relacionará principalmente:

```text
Requisito / Regla de negocio
            ↓
Historia de usuario / Caso de uso
            ↓
Criterio de aceptación
            ↓
Escenario de prueba
```

En unidades posteriores, la información podrá ampliarse para
incorporar:

```text
Escenario de prueba
        ↓
Ejecución
        ↓
Resultado
        ↓
Defecto
        ↓
Corrección
        ↓
Reprueba
```

Por lo tanto, la matriz de la Unidad II constituye la línea base de
trazabilidad que será utilizada como referencia para las actividades
posteriores de pruebas.

La matriz no sustituye los casos de prueba, los reportes de ejecución
ni los registros de defectos. Su función principal es demostrar la
relación entre los diferentes artefactos.

## 2. Relación con el proyecto integrador

La matriz de trazabilidad forma parte del proyecto integrador de la
asignatura. Los equipos deberán conservar los identificadores y
relaciones establecidos durante la Unidad II para utilizarlos en las
unidades posteriores.

```text
UNIDAD II                       UNIDADES POSTERIORES
Base de prueba                  Matriz de trazabilidad
      ↓                               ↓
Requisitos                      Casos de prueba
      ↓                               ↓
HU / CU                         Ejecución
      ↓                               ↓
Criterios de aceptación         Resultados
      ↓                               ↓
Escenarios                      Defectos
      ↓                               ↓
Matriz de trazabilidad          Repruebas
                                      ↓
                                Reporte final
```

Los identificadores creados en la Unidad II deberán conservarse durante
todo el proyecto integrador.

## 3. Referencia normativa

La estructura se establece tomando como referencia:

- ISO/IEC/IEEE 29119 — *Software and systems engineering — Software
  testing*.
- ISO/IEC 25010 — *Systems and software engineering — Systems and
  software Quality Requirements and Evaluation*.
- Buenas prácticas de trazabilidad de requisitos y gestión de pruebas.

La documentación concreta puede adaptarse al contexto académico del
proyecto. Esta plantilla constituye una adaptación académica para la
asignatura Pruebas de Software y no pretende reproducir íntegramente
ninguna norma.

## 4. Alcance

La matriz podrá contener relaciones entre:

- Requisitos funcionales (RF-XX).
- Requisitos no funcionales (RNF-XX).
- Reglas de negocio (RN-XX).
- Historias de usuario (HU-XX).
- Casos de uso (CU-XX).
- Criterios de aceptación (CA-XX).
- Escenarios de prueba (ESC-XX).
- Casos de prueba, cuando se incorporen en unidades posteriores.
- Defectos (DEF-XXX), únicamente cuando exista ejecución real.
- Repruebas, cuando corresponda en unidades posteriores.

No todos los elementos deberán estar presentes desde la Unidad II.

## 5. Identificadores oficiales

| Elemento | Identificador | Ejemplo |
| --- | --- | --- |
| Requisito funcional | RF-XX | RF-01 |
| Requisito no funcional | RNF-XX | RNF-01 |
| Regla de negocio | RN-XX | RN-01 |
| Historia de usuario | HU-XX | HU-01 |
| Caso de uso | CU-XX | CU-01 |
| Criterio de aceptación | CA-XX | CA-01 |
| Escenario de prueba | ESC-XX | ESC-01 |
| Caso de prueba | CP-XX | CP-01 |
| Defecto | DEF-XXX | DEF-001 |

Los identificadores deberán:

1. Ser únicos dentro del proyecto.
2. Mantenerse sin cambios durante las unidades posteriores.
3. Utilizarse de manera consistente en todos los documentos.
4. No reutilizarse para representar elementos diferentes.

## 6. Principio de trazabilidad

La trazabilidad deberá conservar una relación lógica entre la necesidad
que debe verificarse y la prueba que permitirá verificarla. Ejemplo:

```text
RF-02
  ↓
HU-02
  ↓
CA-03
  ↓
ESC-03
```

La relación deberá permitir responder **¿qué escenario permite
verificar este requisito?** y también **¿por qué existe este escenario
de prueba?**

Cuando una relación tenga sentido en ambos sentidos, deberá poder
recorrerse `Requisito → HU/CU → CA → ESC` y `ESC → CA → HU/CU →
Requisito`.

## 7. Estructura oficial de la matriz para la Unidad II

La matriz deberá contener como mínimo las siguientes columnas:

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Estas columnas constituyen el formato mínimo oficial para el
[Laboratorio 3](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/).

## 8. Descripción de las columnas

### 8.1 ID origen

Identificador del elemento de la base de prueba que origina la
relación. Puede ser RF-XX, RNF-XX o RN-XX. Ejemplo: `RF-02`.

### 8.2 Tipo

Indica el tipo del elemento de origen. Valores permitidos: **RF**,
**RNF** y **RN**. Ejemplo: `RF`.

### 8.3 Descripción

Descripción breve del requisito o regla de negocio. Debe conservar el
significado definido en el Laboratorio 1. No deberá cambiarse
arbitrariamente la redacción para modificar el alcance del requisito.
Ejemplo: *Solicitar una cita cuando exista disponibilidad.*

### 8.4 HU/CU

Identificador de la historia de usuario o caso de uso relacionado
(HU-01, HU-02 o CU-01, CU-02). El equipo deberá utilizar una sola
modalidad de acuerdo con la instrucción establecida para el
laboratorio. No deberá combinar HU y CU sin justificación metodológica.

### 8.5 CA

Identificador del criterio de aceptación relacionado (CA-01, CA-02,
CA-03). Un requisito puede relacionarse con uno o varios criterios de
aceptación. Un criterio de aceptación también puede contribuir a
verificar más de un requisito cuando exista una relación justificable.

### 8.6 ESC

Identificador del escenario de prueba relacionado (ESC-01, ESC-02,
ESC-03). Cada escenario deberá tener un origen identificable. No
deberán existir escenarios aislados sin relación con algún requisito,
regla o criterio de aceptación.

### 8.7 Tipo de escenario

Los valores oficiales para la Unidad II serán:

| Valor | Qué verifica |
| --- | --- |
| Positivo | El comportamiento esperado cuando las condiciones son válidas. |
| Negativo | El comportamiento ante entradas, condiciones o acciones no permitidas. |
| Alterno / Límite | Caminos alternativos, valores extremos o condiciones cercanas a los límites establecidos. |

## 9. Tipo de prueba

Esta columna identifica la naturaleza principal de la prueba. Durante
la Unidad II podrán utilizarse: Funcional, Seguridad, Rendimiento,
Usabilidad y Disponibilidad. El tipo deberá corresponder con el
propósito del escenario. Por ejemplo:

```text
ESC-07
Tipo de escenario: Negativo
Tipo de prueba: Seguridad
```

Estas dos clasificaciones no son equivalentes. **Tipo de escenario**
describe la condición del escenario. **Tipo de prueba** describe qué
característica se pretende verificar. Por lo tanto, un escenario puede
ser *Negativo + Seguridad* o *Alterno / Límite + Rendimiento*.

## 10. Seguridad como característica verificable

La seguridad deberá expresarse mediante condiciones verificables. No
será suficiente utilizar expresiones generales como "El sistema debe
ser seguro". El requisito deberá establecer una condición observable.
Ejemplo:

> **RNF-01** — El sistema debe impedir que un usuario no autenticado
> consulte información de citas.

Este requisito puede relacionarse con:

```text
RNF-01
   ↓
CA-07
   ↓
ESC-07
   ↓
Seguridad
```

Los equipos deberán adaptar los requisitos de seguridad al proyecto
base asignado.

## 11. Seguridad y control de acceso

Dentro del alcance académico de la Unidad II podrán considerarse
aspectos como:

- Autenticación.
- Autorización.
- Control de acceso.
- Protección de información según el rol del usuario.
- Acceso a información perteneciente a otro usuario.
- Intentos de ejecutar funciones no autorizadas.

Los escenarios deberán derivarse del alcance del proyecto. No deberán
inventarse módulos, vulnerabilidades o funcionalidades ajenas al
sistema especificado.

## 12. Defecto

La columna **Defecto** está reservada para incorporar posteriormente un
defecto identificado mediante una ejecución real (por ejemplo, DEF-001).

Durante la Unidad II deberá utilizarse **Pendiente de ejecución**. No
deberá utilizarse DEF-001, DEF-002, etc. si todavía no existe una
ejecución que haya identificado realmente el defecto.

## 13. Estado de ejecución

Durante la Unidad II todos los escenarios se encuentran diseñados, pero
todavía no ejecutados. Por lo tanto, el valor oficial será **No
ejecutado**.

No deberán utilizarse Pasó, Falló o Bloqueado si no existe evidencia
real de ejecución. Estos estados podrán utilizarse posteriormente
cuando el equipo realice las pruebas correspondientes.

## 14. Observaciones

La columna de observaciones permite documentar información adicional
necesaria para comprender la relación. Puede utilizarse para indicar:

- Requisito no funcional.
- Regla de negocio.
- Condición negativa.
- Condición límite.
- Seguridad.
- Dependencia con otro escenario.
- Relación indirecta.
- Supuesto académico.
- Aclaración de alcance.

Las observaciones no deberán utilizarse para introducir
funcionalidades que no pertenezcan al proyecto base.

## 15. Reglas de trazabilidad

**Regla 1 — No modificar identificadores.** Una vez creado un
identificador, deberá conservarse. Por ejemplo, `RF-03` no deberá
convertirse posteriormente en `RF-05` para reorganizar la matriz.

**Regla 2 — No romper relaciones existentes.** Si un requisito ya está
relacionado con una HU, CA o ESC, cualquier modificación deberá
actualizar los artefactos posteriores.

**Regla 3 — Todo escenario debe tener origen.** No deberán existir
escenarios sin relación con la base de prueba.

**Regla 4 — Todo criterio debe tener origen.** Cada criterio de
aceptación deberá estar relacionado con una HU o CU.

**Regla 5 — Mantener consistencia.** La información de la matriz deberá
coincidir con el Laboratorio 1, el Laboratorio 2, la documentación del
proyecto integrador y los artefactos posteriores de pruebas.

**Regla 6 — No inventar resultados.** La matriz de la Unidad II
documenta diseño y trazabilidad. No documenta resultados de pruebas que
todavía no hayan sido ejecutadas.

## 16. Cobertura mínima de la Unidad II

La matriz deberá reflejar como mínimo los artefactos establecidos para
el Laboratorio 3. El equipo deberá contar con:

| Laboratorio | Artefactos |
| --- | --- |
| Laboratorio 1 | 5 requisitos funcionales, 3 requisitos no funcionales y 4 reglas de negocio. |
| Laboratorio 2 | 2 historias de usuario o casos de uso, 4 criterios de aceptación y 6 escenarios de prueba como mínimo: 2 positivos, 2 negativos y 2 alternos / límite. |

La matriz deberá reflejar las relaciones correspondientes.

## 17. Trazabilidad de requisitos no funcionales

Los requisitos no funcionales deberán contar con una relación
verificable. Ejemplo:

```text
RNF-03
   ↓
CA-09
   ↓
ESC-09
```

Los requisitos no funcionales no deberán quedar únicamente descritos en
el Laboratorio 1. Deberán existir mecanismos de prueba o verificación
definidos mediante los artefactos posteriores.

## 18. Trazabilidad de reglas de negocio

Las reglas de negocio seleccionadas para el laboratorio deberán poder
relacionarse con criterios y escenarios. Ejemplo:

```text
RN-01
   ↓
HU-02
   ↓
CA-10
   ↓
ESC-10
```

Esto permite demostrar cómo una regla de negocio se convierte en una
condición verificable.

## 19. Relaciones uno a muchos

La matriz no deberá asumir que cada elemento tiene una única relación.
Un requisito puede tener:

```text
RF-02
 ├── CA-02
 │     └── ESC-02
 │
 └── CA-03
       └── ESC-03
```

En la tabla esto puede representarse mediante varias filas:

| ID origen | CA | ESC |
| --- | --- | --- |
| RF-02 | CA-02 | ESC-02 |
| RF-02 | CA-03 | ESC-03 |

Esto es válido cuando cada relación esté justificada.

## 20. Ejemplo de referencia

El siguiente ejemplo corresponde al **Proyecto A — Sistema de citas
médicas**. Cada equipo deberá elaborar su propia matriz utilizando el
proyecto asignado.

Los identificadores de este ejemplo coinciden con el ejemplo completo
de matriz del
[Laboratorio 3](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/).
Por eso la numeración de criterios y escenarios no es consecutiva.

### 20.1 Requisitos

| ID | Requisito |
| --- | --- |
| RF-01 | El sistema debe permitir consultar la disponibilidad de un profesional. |
| RF-02 | El sistema debe permitir solicitar una cita cuando exista disponibilidad. |
| RNF-01 | El sistema debe impedir que un usuario no autenticado consulte información de citas. |
| RNF-03 | El sistema debe mostrar el resultado de una consulta de disponibilidad en un tiempo máximo de 3 segundos bajo las condiciones definidas para la prueba. |
| RN-01 | Un paciente no puede tener dos citas activas para la misma fecha y hora. |

### 20.2 Historias de usuario

| ID | Historia |
| --- | --- |
| HU-01 | Como paciente, quiero consultar la disponibilidad de los profesionales para seleccionar un horario. |
| HU-02 | Como paciente, quiero solicitar una cita para reservar un horario disponible. |

### 20.3 Criterios de aceptación

| ID | Criterio |
| --- | --- |
| CA-01 | El sistema muestra los horarios disponibles del profesional seleccionado. |
| CA-02 | El sistema permite solicitar una cita cuando existe disponibilidad. |
| CA-03 | El sistema rechaza una solicitud cuando el horario seleccionado no está disponible. |
| CA-07 | El sistema impide consultar información de citas cuando el usuario no está autenticado. |
| CA-09 | El resultado de la consulta de disponibilidad se muestra dentro del tiempo máximo establecido. |
| CA-10 | El sistema impide registrar dos citas activas del mismo paciente para la misma fecha y hora. |

### 20.4 Escenarios

| ID | Escenario | Tipo de escenario | Tipo de prueba |
| --- | --- | --- | --- |
| ESC-01 | Consulta de disponibilidad | Positivo | Funcional |
| ESC-02 | Solicitud con horario disponible | Positivo | Funcional |
| ESC-03 | Solicitud con horario ocupado | Negativo | Funcional |
| ESC-07 | Acceso sin autenticación | Negativo | Seguridad |
| ESC-09 | Tiempo de respuesta de disponibilidad | Alterno / Límite | Rendimiento |
| ESC-10 | Cita duplicada | Negativo | Funcional |

## 21. Ejemplo de matriz

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF-01 | RF | Consultar disponibilidad de un profesional | HU-01 | CA-01 | ESC-01 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RF-02 | RF | Solicitar una cita disponible | HU-02 | CA-02 | ESC-02 | Positivo | Funcional | Pendiente de ejecución | No ejecutado | |
| RF-02 | RF | Solicitar una cita disponible | HU-02 | CA-03 | ESC-03 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | Horario no disponible |
| RNF-01 | RNF | Impedir consulta de citas sin autenticación | — | CA-07 | ESC-07 | Negativo | Seguridad | Pendiente de ejecución | No ejecutado | Control de acceso |
| RNF-03 | RNF | Responder consulta de disponibilidad en máximo 3 segundos | — | CA-09 | ESC-09 | Alterno / Límite | Rendimiento | Pendiente de ejecución | No ejecutado | Requisito no funcional |
| RN-01 | RN | Impedir dos citas activas del mismo paciente en la misma fecha y hora | HU-02 | CA-10 | ESC-10 | Negativo | Funcional | Pendiente de ejecución | No ejecutado | Regla de negocio |

## 22. Lectura de la matriz

La matriz puede leerse desde el requisito hacia la prueba:

```text
RNF-01 → CA-07 → ESC-07 → Seguridad → No ejecutado
```

Esto permite responder **¿cómo se verificará el requisito?**
Respuesta: mediante ESC-07, que verifica el comportamiento del sistema
ante un usuario no autenticado.

También puede recorrerse en sentido inverso:

```text
ESC-07 → CA-07 → RNF-01
```

Esto permite responder **¿por qué existe este escenario?** Porque
existe un requisito de seguridad que establece una condición
verificable de acceso.

## 23. Defectos en unidades posteriores

La matriz podrá ampliarse después de la ejecución, por ejemplo
`ESC-07 → DEF-001`, donde:

> **DEF-001** — El sistema permitió consultar información de citas sin
> una sesión autenticada.

La incorporación del defecto deberá realizarse únicamente después de
ejecutar la prueba y obtener evidencia. La existencia del defecto
deberá poder relacionarse con:

- escenario ejecutado
- evidencia
- resultado observado
- registro del defecto
- corrección
- reprueba, cuando corresponda.

## 24. Evolución de la matriz durante el proyecto integrador

La matriz de la Unidad II no deberá desecharse al finalizar el
laboratorio. Deberá evolucionar junto con el proyecto.

| Etapa | Cadena |
| --- | --- |
| Etapa 1 — Unidad II | Requisito → HU/CU → CA → ESC |
| Etapa 2 — Diseño de pruebas | Requisito → HU/CU → CA → ESC → CP |
| Etapa 3 — Ejecución | ESC → CP → Resultado |
| Etapa 4 — Gestión de defectos | CP → DEF → Corrección → Reprueba |

La estructura específica de las unidades posteriores podrá incorporar
columnas adicionales sin eliminar la trazabilidad histórica.

## 25. Regla de continuidad del proyecto integrador

Los equipos deberán mantener un único conjunto de identificadores
durante el proyecto integrador (por ejemplo, RF-01, RNF-01, RN-01,
HU-01, CA-01, ESC-01, CP-01, DEF-001). Los identificadores no deberán
reiniciarse arbitrariamente en cada unidad.

El propósito es que el docente pueda seguir la evolución de un
requisito desde su definición hasta su verificación.

## 26. Validación antes de entregar

Antes de entregar la matriz, el equipo deberá comprobar:

- [ ] Los identificadores coinciden con los laboratorios anteriores.
- [ ] No existen identificadores duplicados.
- [ ] La matriz corresponde al proyecto base asignado.
- [ ] Los requisitos funcionales seleccionados tienen trazabilidad.
- [ ] Los requisitos no funcionales tienen trazabilidad.
- [ ] Las reglas de negocio seleccionadas tienen trazabilidad.
- [ ] Las HU/CU tienen criterios de aceptación relacionados.
- [ ] Los criterios de aceptación tienen escenarios relacionados.
- [ ] Los escenarios tienen un origen identificable.
- [ ] Los escenarios positivos suman al menos 2.
- [ ] Los escenarios negativos suman al menos 2.
- [ ] Los escenarios alternos / límite suman al menos 2.
- [ ] Los escenarios de seguridad están identificados como Seguridad.
- [ ] Los requisitos de seguridad son verificables.
- [ ] No se han inventado funcionalidades fuera del alcance.
- [ ] No se han inventado resultados de ejecución.
- [ ] El campo Defecto permanece como Pendiente de ejecución.
- [ ] El campo Estado de ejecución permanece como No ejecutado.
- [ ] Las relaciones son consistentes con los documentos anteriores.

## 27. Criterio de completitud

La matriz de la Unidad II se considerará completa cuando permita
responder claramente:

```text
¿Qué requisito o regla debe verificarse?
                ↓
¿En qué HU/CU se representa?
                ↓
¿Qué criterio de aceptación define su comportamiento?
                ↓
¿Qué escenario permite verificarlo?
                ↓
¿Qué tipo de prueba corresponde?
                ↓
¿Se ha ejecutado?
```

Durante la Unidad II, la respuesta a la última pregunta deberá ser **No
ejecutado** y el campo de defecto deberá permanecer **Pendiente de
ejecución**.

## 28. Plantilla vacía

Completa una matriz con la siguiente estructura, o descarga la plantilla
en Excel:

<div class="descargas">
<a href="/descargas/pruebas-software/unidad-02/matriz_trazabilidad_unidad02.xlsx" download>Descargar la matriz vacía (Excel .xlsx)</a>
</div>

| ID origen | Tipo | Descripción | HU/CU | CA | ESC | Tipo de escenario | Tipo de prueba | Defecto | Estado de ejecución | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |
| | | | | | | | | Pendiente de ejecución | No ejecutado | |

## 29. Resultado esperado

Al finalizar el Laboratorio 3, cada equipo deberá contar con una matriz
que permita demostrar la trazabilidad de su proyecto:

```text
PROYECTO BASE
      │
      ├── RF
      ├── RNF
      └── RN
            │
            ↓
       HU / CU
            │
            ↓
           CA
            │
            ↓
           ESC
            │
            ↓
     MATRIZ DE TRAZABILIDAD
            │
            ↓
   BASE PARA UNIDADES POSTERIORES
```

La matriz constituye así uno de los artefactos permanentes del proyecto
integrador de Pruebas de Software y deberá conservarse para las
actividades posteriores de diseño, ejecución, gestión de defectos y
reporte de resultados.
