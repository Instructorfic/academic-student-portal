---
title: "2. Expresiones"
description: "Unidad II de Lógica de Programación — operandos, operadores, evaluación de expresiones y cómo construir una expresión a partir de un problema."
---

## De los datos a las operaciones

Un algoritmo utiliza datos para resolver un problema, pero tener los datos no siempre es suficiente. Con frecuencia necesitamos **calcular, comparar o transformar** esos datos para obtener un resultado.

Por ejemplo, si `precio = 100` y `cantidad = 3`, y queremos responder **¿cuál es el costo total?**, necesitamos realizar una operación: `100 × 3`, cuyo resultado es `300`.

**Por qué importa:** los datos nos permiten representar el problema; las operaciones nos permiten trabajar con ellos.

## De una operación a una expresión

En `100 × 3` distinguimos dos elementos:

```text
100       ×       3
 ↑        ↑        ↑
operando operador operando
```

- **Operando:** el valor sobre el que se realiza la operación.
- **Operador:** el elemento que indica qué operación realizar.

Cuando combinamos operandos y operadores para obtener un resultado, construimos una **expresión**:

```text
100 × 3
   ↓
expresión
   ↓
300
```

## ¿Qué es una expresión?

Una **expresión** es una combinación de operandos y operadores que puede ser evaluada para obtener un resultado. Por ejemplo, `100 + 25` contiene el operando `100`, el operador `+` y el operando `25`; al evaluarla obtenemos `125`.

> **Operandos + operadores → expresión → resultado.**

## Los operandos pueden ser valores o identificadores

Una expresión puede utilizar directamente valores (`20 + 5`), identificadores que representan datos (`precio * cantidad`), o combinar ambos (`precio * 10`). Si `precio = 35`, la expresión `precio * 10` utiliza el dato representado por `precio`.

**Ejemplo profesional.** En un sistema de nómina, la expresión `horasTrabajadas * tarifaPorHora` combina dos identificadores; el sistema no necesita "conocer" los valores concretos al momento de escribir la expresión — los toma de las variables correspondientes cuando se ejecuta.

## Evaluar una expresión

**Evaluar una expresión** significa determinar el resultado que produce. `8 + 5` se evalúa como `13`; `20 / 4` se evalúa como `5`; `7 * 3` se evalúa como `21`.

> **Evaluar → realizar las operaciones indicadas → obtener un resultado.**

## ¿El resultado siempre es un número?

No. El tipo de resultado depende de la expresión. `8 + 5` produce un resultado numérico (`13`), pero `8 > 5` produce un resultado lógico (`Verdadero`). Por eso podemos construir expresiones que calculan valores, comparan valores o combinan condiciones — según el tipo de operador que utilicemos (ver [3. Operadores](/materias/logica-programacion/unidad-02/03-operadores/)).

> **El tipo de operación determina la naturaleza del resultado.**

## Expresiones aritméticas

Las expresiones aritméticas permiten realizar cálculos numéricos:

| Operación | Ejemplo |
| --- | --- |
| Suma | `8 + 4` |
| Resta | `8 - 4` |
| Multiplicación | `8 * 4` |
| División | `8 / 4` |
| Residuo | `8 % 4` |

Por ejemplo, `35 * 4` produce `140`.

## Construir una expresión a partir de un problema

**Problema.** Calcular el costo total de comprar 4 productos de $35 cada uno.

```text
Problema → datos → relación → expresión → resultado
```

1. **Identificar los datos:** `cantidad = 4`, `precio = 35`.
2. **Identificar la relación:** `costo total = cantidad × precio`.
3. **Construir la expresión:** `cantidad * precio`.
4. **Evaluar:** `4 * 35 = 140`.

## Ejercicio guiado: del problema a la expresión

**Problema.** Un estudiante obtuvo tres calificaciones: 8, 9 y 7. ¿Cómo podemos calcular su promedio?

1. **Identificar los datos:** `calificacion1 = 8`, `calificacion2 = 9`, `calificacion3 = 7`.
2. **Identificar la operación:** sumar las calificaciones y dividir entre 3.
3. **Construir la expresión:** `(calificacion1 + calificacion2 + calificacion3) / 3`.
4. **Evaluar:** `(8 + 9 + 7) / 3 = 8`.

> No comenzamos por escribir una expresión. **Primero entendemos el problema y después construimos la expresión.**

## Error común

Escribir una expresión antes de identificar claramente los datos y la relación entre ellos — por ejemplo, intentar adivinar la fórmula en lugar de seguir el flujo problema → datos → relación → expresión → resultado.

## Para reflexionar

- Para el problema de "calcular el área de un rectángulo", ¿qué datos necesitas identificar antes de construir la expresión?
- ¿Por qué una expresión relacional como `edad >= 18` no produce un resultado numérico?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 2 — Construcción de expresiones](/materias/logica-programacion/unidad-02/actividades/actividad-2/),
donde construirás expresiones a partir de situaciones sencillas.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.7 Expresiones y operadores, 3.7.1 Expresiones aritméticas. Fuente principal. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya sabes qué es una expresión y cómo construirla a partir de un problema. El siguiente paso es estudiar con detalle los operadores que puedes utilizar: continúa con
[3. Operadores](/materias/logica-programacion/unidad-02/03-operadores/).
