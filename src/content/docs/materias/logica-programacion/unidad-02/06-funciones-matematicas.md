---
title: "6. Funciones matemáticas"
description: "Unidad II de Lógica de Programación — funciones matemáticas básicas (raíz cuadrada, valor absoluto, potencia, redondeo) y su uso dentro de expresiones."
---

## Cuando una operación ya tiene una forma conocida

Algunos cálculos aparecen con frecuencia: `√25`, `|−8|`, `2³`. En lugar de construir cada operación desde cero, podemos utilizar funciones matemáticas.

> **Una función matemática recibe uno o más valores y produce un resultado de acuerdo con una operación definida.**

## Algunas funciones frecuentes

| Función | Notación | Qué hace |
| --- | --- | --- |
| Raíz cuadrada | `sqrt(x)` | Calcula la raíz cuadrada de `x` |
| Valor absoluto | `abs(x)` | Calcula el valor absoluto de `x` |
| Potencia | `pow(x, y)` | Calcula `x` elevado a `y` |
| Redondeo | `round(x)` | Redondea `x` al entero más cercano |

> **Alcance de la unidad.** La notación exacta depende de la herramienta utilizada. Lo importante aquí es reconocer la función matemática que necesitas y comprender qué resultado produce — no memorizar la sintaxis de un lenguaje específico.

## Ejemplos

```text
sqrt(25)  → 5
abs(-8)   → 8
pow(2,3)  → 8
round(8.6) → 9
```

## Una función también forma parte de una expresión

Observa `sqrt(25) + 5`. Podemos resolver primero `sqrt(25) → 5`, y después `5 + 5 → 10`.

> Las funciones matemáticas pueden combinarse con operadores para construir expresiones más completas. Su lugar exacto dentro de la jerarquía de resolución se estudia en
> [7. Resolución de expresiones](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/).

## Ejemplo integrador: el área de un círculo

Para calcular el área de un círculo necesitamos `radio` y `π`, con la expresión `π * radio²`. El término `radio²` es una potencia, que representamos con la función matemática ya conocida: `radio² → pow(radio, 2)`. Por lo tanto, la expresión completa queda:

```text
π * pow(radio, 2)
```

## Error común

Confundir `round(x)` con truncar (eliminar la parte decimal sin redondear): `round(7.3)` produce `7`, pero `round(7.8)` produce `8`, no `7`.

## Para reflexionar

- ¿Qué función matemática necesitarías para calcular la distancia entre dos puntos, si ya conoces la fórmula que involucra una raíz cuadrada?
- ¿Por qué `abs(-5) * 2` no es lo mismo que `abs(-5 * 2)`? Calcula ambos resultados y compáralos.

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 6 — Funciones matemáticas](/materias/logica-programacion/unidad-02/actividades/actividad-6/),
donde resolverás problemas sencillos que requieren utilizar funciones matemáticas.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.8 Funciones internas, 3.8.1 Funciones matemáticas. Fuente principal. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya cuentas con todos los elementos para representar información y construir expresiones: datos, tipos, identificadores, constantes, variables, operadores y funciones matemáticas. El siguiente paso es aprender a resolver correctamente una expresión que combina varias operaciones: continúa con
[7. Resolución de expresiones](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/).
