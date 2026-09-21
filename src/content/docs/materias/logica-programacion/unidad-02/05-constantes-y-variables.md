---
title: "5. Constantes y variables"
description: "Unidad II de Lógica de Programación — la diferencia entre un valor que permanece fijo y uno que puede cambiar durante la solución."
---

## Dos formas de representar valores

Dentro de un algoritmo podemos trabajar con valores que permanecen constantes y con valores que pueden cambiar.

| Elemento | Qué representa |
| --- | --- |
| Constante | Un valor que se mantiene fijo durante la solución |
| Variable | Un dato cuyo valor puede cambiar durante la ejecución del algoritmo |

## Ejemplo

Para calcular el área de un círculo necesitamos `radio` y `π`. El radio puede cambiar de un círculo a otro; el valor de π se considera constante para nuestro modelo:

```text
radio → variable
π     → constante
```

## Otro ejemplo

Para calcular el costo de un viaje necesitamos `distancia`, `consumo` y `precioCombustible`. Estos valores pueden cambiar de un viaje a otro, por lo tanto los tres son variables.

## Variable significa que el valor puede cambiar

Supongamos `edad ← 18` y, posteriormente, `edad ← 19`. El identificador sigue siendo `edad`, pero su valor cambió.

> **Variable no significa que el nombre cambie. Significa que el valor asociado puede cambiar.**

## Constante significa que el valor permanece

Supongamos `IVA = 0.16`. Si nuestro problema establece que ese valor es fijo, `IVA` es una constante y su valor no debe cambiar durante el procedimiento.

**Por qué importa:** la decisión de considerar algo constante o variable depende del problema y de las reglas que establezcamos para nuestra solución — no es una propiedad automática del valor.

**Ejemplo profesional.** En un sistema de facturación, la `TASA_IVA` suele tratarse como constante dentro de un cálculo dado, aunque en otro contexto (por ejemplo, si el sistema debe soportar distintas tasas por región) el mismo valor podría representarse como variable. La clasificación depende de las reglas de la solución, no del número en sí.

## Una distinción importante: identificador no es lo mismo que variable

No confundas **identificador** con **variable**. Un identificador es un **nombre** (por ejemplo, `precio`). Una variable es un **elemento que puede representar valores que cambian**. El identificador `precio` puede utilizarse para representar una variable: `precio → 35`.

## Error común

Confundir variable con constante (por ejemplo, tratar un dato que puede cambiar de un caso a otro, como el `precio` de un producto en oferta, como si fuera una constante), o asumir que basta con que un valor "se vea numérico" para decidir si es variable o constante, sin analizar si el problema permite que cambie.

## Para reflexionar

- Para el problema "calcular el pago de un préstamo utilizando una tasa establecida", ¿qué datos considerarías variables y cuáles constantes? Justifica tu decisión.
- ¿Puede un mismo dato ser constante en un problema y variable en otro? Da un ejemplo.

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 5 — Variables y constantes](/materias/logica-programacion/unidad-02/actividades/actividad-5/),
donde resolverás ejercicios sobre qué información debe representarse mediante variables y cuál mediante constantes.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.6 Constantes y variables, 3.6.1 Declaración de constantes y variables. Fuente principal.
- Cairo Battistutti, O. (2015). *Metodología de la programación*, 1.3.2 Identificadores, constantes y variables. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya distingues cuándo un dato debe representarse como variable y cuándo como constante. El siguiente paso es reconocer operaciones matemáticas que ya tienen una forma conocida: continúa con
[6. Funciones matemáticas](/materias/logica-programacion/unidad-02/06-funciones-matematicas/).
