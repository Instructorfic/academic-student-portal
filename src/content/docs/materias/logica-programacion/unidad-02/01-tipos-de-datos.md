---
title: "1. Tipos de datos"
description: "Unidad II de Lógica de Programación — qué es un dato, qué es un tipo de dato y los cuatro tipos básicos con los que trabajarás en la unidad."
---

## ¿Qué es un dato?

En términos formales, un **dato** es una representación de hechos, conceptos o instrucciones en una forma adecuada para su comunicación, interpretación o procesamiento. Para nuestro propósito, puedes entenderlo de manera más sencilla:

**Un dato es un valor que representa una característica, hecho o elemento y que puede ser utilizado dentro de un procedimiento.**

Observa:

```text
18
8.75
"Alexis"
Verdadero
```

Todos son **datos**, pero representan **diferentes tipos de valores**. Antes de utilizar un dato necesitamos identificar qué tipo de valor representa.

**Por qué importa:** un algoritmo no puede procesar "información" en abstracto. Necesita datos concretos, y cada dato tiene una naturaleza que condiciona qué se puede hacer con él.

## ¿Qué es un tipo de dato?

Un **tipo de dato** define la naturaleza de los valores que puede representar un dato y las operaciones que pueden realizarse con ellos.

```text
18          → entero
8.75        → real
"Alexis"    → cadena
Verdadero   → lógico
```

El tipo de dato permite saber cómo interpretar un valor dentro de un algoritmo y qué operaciones tienen sentido sobre él.

> **Dato** → un valor que queremos representar o procesar.
>
> **Tipo de dato** → determina qué clase de valor es y cómo podemos trabajar con él.

## Tipos de datos básicos

Para esta unidad trabajarás principalmente con cuatro tipos:

| Tipo | Qué representa | Ejemplos |
| --- | --- | --- |
| Entero | Números sin parte decimal | `8`, `25`, `100` |
| Real | Números que pueden representar una parte decimal | `8.5`, `3.14` |
| Carácter o cadena | Información textual | `"A"`, `"Culiacán"` |
| Lógico | Una condición de verdad | `Verdadero`, `Falso` |

## ¿Por qué importa el tipo?

Consideremos `8 + 4`: tiene sentido realizar una suma. Pero `"Culiacán" + 4` no representa necesariamente una operación matemática válida. El tipo del dato ayuda a determinar qué operaciones tienen sentido.

**Ejemplo profesional.** Un sistema de facturación necesita sumar el precio de varios productos (datos reales o enteros), pero no tendría sentido "sumar" el nombre de un cliente con su número de teléfono, aunque ambos puedan escribirse con dígitos. El tipo de dato — no la apariencia del valor — determina qué operación es válida.

> **Los datos no son únicamente valores. También tienen una naturaleza que condiciona cómo podemos utilizarlos.**

## Clasificar datos

Observa los siguientes datos y su clasificación:

| Dato | Tipo |
| --- | --- |
| `23` | Entero |
| `"Informática"` | Cadena |
| `9.5` | Real |
| `Verdadero` | Lógico |
| `1500` | Entero |
| `"UAS"` | Cadena |

## Una pregunta importante: ¿el tipo depende del dato o de lo que queremos hacer con él?

Por ejemplo, `2026` puede representar un número, un año o una cantidad. El valor es el mismo; la interpretación depende del contexto.

> **El significado de un dato depende del problema en el que se utiliza.**

## Error común

Confundir dato con información, o asumir que un valor "se ve como número" y por lo tanto ya es un dato numérico utilizable en operaciones aritméticas (por ejemplo, tratar un número de teléfono o una matrícula como si fuera un dato numérico sobre el que tiene sentido sumar o promediar).

## Para reflexionar

- ¿Por qué un número de teléfono, aunque esté compuesto solo por dígitos, normalmente se trata como una cadena y no como un dato numérico?
- Piensa en tres datos de tu vida cotidiana (por ejemplo, tu edad, tu nombre, si estás inscrito o no en un curso). ¿Qué tipo de dato representa cada uno?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 1 — Clasificación de información](/materias/logica-programacion/unidad-02/actividades/actividad-1/),
donde clasificarás un conjunto de datos e indicarás el tipo correspondiente con una breve justificación.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.5 Datos, tipos de datos y operaciones primitivas. Fuente principal.
- Cairo Battistutti, O. (2015). *Metodología de la programación*, 1.3.1 Tipos de datos. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya sabes identificar qué tipo de valor representa un dato. El siguiente paso es aprender a combinar datos mediante operaciones: continúa con
[2. Expresiones](/materias/logica-programacion/unidad-02/02-expresiones/).
