---
title: "Presentación — Unidad I"
description: "Unidad I de Lógica de Programación — versión de documentación de la presentación de clase, sin información nueva respecto al manual."
---

> Esta página condensa, en formato de documentación, la presentación
> de apoyo usada en clase para esta unidad. No introduce información
> nueva respecto a los [temas de la unidad](/materias/logica-programacion/unidad-01/) — es un resumen visual de
> apoyo.

## Al finalizar esta unidad podrás

| Contenido | Vas a poder... |
| --- | --- |
| 1.1 | Explicar por qué aprender a programar implica desarrollar capacidades de análisis, abstracción y resolución de problemas |
| 1.2 | Diferenciar computadora, algoritmo, programa y lenguaje, y explicar cómo se relacionan |
| 1.3 | Reconocer y utilizar de manera introductoria lenguaje natural, pseudocódigo y diagramas de flujo |
| 1.4 / 1.5 | Aplicar razonamiento lógico para construir soluciones y expresarlas como algoritmos |

## Antes de empezar

¿Programar significa escribir código? No exactamente. Antes de
escribir una sola línea necesitamos comprender:

> **¿Qué problema queremos resolver?**

Y después: ¿qué sabemos? → ¿qué necesitamos conseguir? → ¿qué
información es relevante? → ¿qué solución podemos construir? La
programación comienza mucho antes del teclado.

## Un problema tiene cuatro elementos

Antes de diseñar un algoritmo necesitamos comprender qué queremos
resolver. Un problema puede describirse mediante:

1. **Situación inicial** — ¿dónde estamos?
2. **Objetivo** — ¿a dónde queremos llegar?
3. **Datos** — ¿con qué información contamos?
4. **Restricciones** — ¿qué condiciones debemos respetar?

**Ejemplo — aprobar una asignatura.** Situación inicial: tenemos la
calificación final de un estudiante. Objetivo: determinar si aprueba.
Datos: calificación final y criterio de aprobación. Restricción: debe
respetarse el criterio establecido. No necesitamos el nombre del
estudiante, su edad ni su domicilio — esos datos pertenecen a la
realidad, pero no son relevantes para esta solución.

## De la realidad al modelo

Una computadora no trabaja directamente con toda la realidad.
Necesitamos construir una representación de los aspectos relevantes:

```text
REALIDAD → OBSERVAR → ABSTRAER → MODELO
```

**No programamos la realidad completa. Construimos una solución a
partir de un modelo de la parte relevante del problema.** Ver
[1. Importancia de aprender a programar](/materias/logica-programacion/unidad-01/01-importancia-de-programar/).

## Programar es más que escribir código

```text
COMPRENDER → ANALIZAR → DISEÑAR → REPRESENTAR → IMPLEMENTAR
```

En esta unidad nos concentraremos principalmente en comprender,
analizar y diseñar soluciones algorítmicas.

## Un algoritmo necesita ciertas propiedades

| Propiedad | Significado |
| --- | --- |
| Finitud | El procedimiento termina después de un número finito de pasos |
| Definitud | Cada paso está suficientemente definido, sin interpretación arbitraria |
| Entrada | Puede recibir cero o más datos de entrada |
| Salida | Produce uno o más resultados |

Estas propiedades son necesarias para que algo **sea** un algoritmo.
No es lo mismo que sea un algoritmo **de calidad**: eso se evalúa con
otros cuatro criterios — corrección, claridad, generalidad y
eficiencia — que profundizarás más adelante en la carrera. Ver
[2. Computadora, algoritmo, programa y lenguaje](/materias/logica-programacion/unidad-01/02-computadora-algoritmo-programa-lenguaje/).

## Algoritmo, solución y programa no son lo mismo

```text
PROBLEMA → SOLUCIÓN → ALGORITMO → REPRESENTACIÓN → PROGRAMA
```

Un algoritmo puede expresarse mediante lenguaje natural, pseudocódigo
o diagrama de flujo. Un programa utiliza un **lenguaje de
programación** y está destinado a ser ejecutado por una computadora.
Primero construimos la solución. Después decidimos cómo implementarla.

## Representar algoritmos

```text
             ALGORITMO
                 │
      ┌──────────┼──────────┐
      ↓          ↓          ↓
  Natural   Pseudocódigo   Diagrama de flujo
```

Ver [3. Herramientas para representar algoritmos](/materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos/)
para el detalle de cada una, incluyendo Scratch como recurso opcional.

## Pensamiento computacional

Cuatro ideas de apoyo para razonar de forma sistemática:
**descomposición**, **reconocimiento de patrones**, **abstracción** y
**diseño algorítmico**. Ver
[4. Razonamiento lógico y pensamiento computacional](/materias/logica-programacion/unidad-01/04-razonamiento-logico-y-pensamiento-computacional/).

## Ejemplo integrador: ¿aprueba el estudiante?

```text
Situación: tenemos una calificación final
Objetivo: determinar el resultado
Regla: se aprueba con 6 o más
Salida: Aprobado / No aprobado
```

Algoritmo en lenguaje natural:

```text
1. Obtener la calificación final.
2. Comparar la calificación con el criterio de aprobación.
3. Si cumple el criterio, indicar "Aprobado".
4. Si no lo cumple, indicar "No aprobado".
```

Observa que todavía no escribimos código. Los **casos límite** (por
ejemplo, una calificación de exactamente 6) nos obligan a revisar si
realmente expresamos la regla que queríamos. Ver
[5. Resolución de problemas en forma algorítmica](/materias/logica-programacion/unidad-01/05-resolucion-de-problemas-en-forma-algoritmica/).

## La idea que debes llevarte

```text
PROBLEMA → COMPRENSIÓN → ABSTRACCIÓN → MODELO → SOLUCIÓN
   → ALGORITMO → REPRESENTACIÓN → IMPLEMENTACIÓN → PROGRAMA → EJECUCIÓN
```

**Programar consiste en transformar problemas en soluciones que puedan
expresarse con suficiente precisión para ser implementadas y
ejecutadas por una computadora.**

## Lo que sigue

En la Unidad II comenzarás a trabajar con los elementos que permiten
construir algoritmos de manera más precisa: datos, variables,
operadores y expresiones. Primero aprendiste a **pensar una solución**.
Ahora comenzarás a trabajar con los elementos que necesitas para
expresarla con mayor precisión.

## Referencias

Ver [Referencias de la Unidad I](/materias/logica-programacion/unidad-01/referencias/)
para el listado completo con su justificación de relevancia.
