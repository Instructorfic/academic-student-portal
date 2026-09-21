---
title: "3. Operadores"
description: "Unidad II de Lógica de Programación — operadores aritméticos, relacionales y lógicos, y cómo se combinan para construir condiciones."
---

## Clasificación de operadores

Los operadores que utilizarás principalmente pueden agruparse en tres clases:

| Clase | Qué permite |
| --- | --- |
| Aritméticos | Realizar cálculos con valores numéricos |
| Relacionales | Comparar valores |
| Lógicos | Combinar o modificar condiciones |

La clasificación depende de qué operación realiza el operador y qué resultado produce.

## Operadores aritméticos

| Operador | Operación | Ejemplo |
| --- | --- | --- |
| `+` | Suma | `8 + 4` |
| `-` | Resta | `8 - 4` |
| `*` | Multiplicación | `8 * 4` |
| `/` | División | `8 / 4` |
| `%` | Residuo | `8 % 4` |

La representación exacta puede variar dependiendo de la herramienta utilizada.

### El residuo de una división

El operador `%` permite obtener el **residuo** de una división entera. Por ejemplo, `10 % 3`: la división es `10 ÷ 3 = 3` y sobra `1`, por lo tanto `10 % 3 = 1`. Este operador es útil, por ejemplo, para identificar si un número es par o impar.

### Los paréntesis en una expresión

Los paréntesis permiten **agrupar operaciones**. En `2 + 3 * 4` no todas las operaciones se realizan necesariamente de izquierda a derecha; en cambio, `(2 + 3) * 4` indica explícitamente que primero debemos considerar `2 + 3` y después multiplicar el resultado por `4`.

> **Los paréntesis permiten expresar explícitamente cómo queremos agrupar una operación.** El orden completo de resolución (jerarquía de todos los operadores, no solo los aritméticos) se estudia en
> [7. Resolución de expresiones](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/).

## Operadores relacionales

| Operador | Significado |
| --- | --- |
| `<` | Menor que |
| `>` | Mayor que |
| `<=` | Menor o igual que |
| `>=` | Mayor o igual que |
| `=` | Igual a |
| `<>` | Diferente de |

La representación exacta puede variar según la herramienta utilizada.

### Una comparación produce una condición

En `8 > 5`, el operador `>` compara los operandos `8` y `5`; al evaluar la expresión obtenemos `Verdadero`. En cambio, `3 > 10` produce `Falso`.

> **Una expresión relacional compara valores y produce un resultado lógico.**

### De la comparación a la condición

Una comparación permite responder preguntas del problema. Por ejemplo, `edad >= 18` puede interpretarse como **¿la edad es mayor o igual que 18?**, y el resultado será `Verdadero` o `Falso`. Esto será fundamental cuando, en unidades posteriores, un algoritmo necesite tomar decisiones.

**Ejemplo profesional.** Un sistema de control de acceso evalúa `edad >= 18 Y tieneIdentificacion` para decidir si una persona puede realizar un trámite — la misma lógica que, más adelante en la carrera, se traduce en una estructura condicional.

## Operadores lógicos

A veces una sola condición no es suficiente; podemos necesitar combinar varias condiciones.

| Operador | Significado |
| --- | --- |
| `Y` | Verdadero cuando ambas condiciones son verdaderas |
| `O` | Verdadero cuando al menos una condición es verdadera |
| `NO` | Invierte el valor lógico de una condición |

### Combinar condiciones

Supongamos que queremos determinar si una persona puede realizar un trámite. Necesitamos comprobar `edad >= 18` y `tieneIdentificacion = Verdadero`. Podemos combinarlas: `edad >= 18 Y tieneIdentificacion`. La expresión completa produce `Verdadero` solo cuando **ambas condiciones son verdaderas**.

> **Las expresiones lógicas permiten construir condiciones más completas a partir de otras condiciones.**

## Ejercicio guiado: analizar una expresión

Considera `(10 + 5) > 12`:

1. **Operandos:** `10`, `5`, `12`.
2. **Operadores:** `+`, `>`.
3. **Primera operación:** `10 + 5 = 15`.
4. **Comparación:** `15 > 12`.
5. **Resultado:** `Verdadero`.

## Ejercicio guiado: expresión lógica

Considera `edad >= 18 Y tieneIdentificacion`, con `edad = 20` y `tieneIdentificacion = Verdadero`:

1. `20 >= 18 → Verdadero`.
2. `Verdadero Y Verdadero → Verdadero`.

> Una expresión compleja no se resuelve de un solo vistazo: se resuelve nivel por nivel, respetando paréntesis y jerarquía. Una expresión lógica puede construirse a partir de resultados de expresiones relacionales.

## Error común

Ignorar la prioridad de operadores (por ejemplo, asumir que `5 + 3 * 2` se resuelve de izquierda a derecha) o confundir el operador de comparación `=` con la asignación cuando se trabaje posteriormente con una herramienta de compilación.

## Para reflexionar

- ¿Por qué `10 % 3` y `10 / 3` producen resultados distintos, si ambos usan los mismos operandos?
- Construye una condición que combine dos comparaciones con `O` en lugar de `Y`. ¿Cómo cambia el resultado respecto a usar `Y`?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 3 — Operadores](/materias/logica-programacion/unidad-02/actividades/actividad-3/),
donde identificarás y aplicarás operadores en expresiones sencillas.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.7.1 Expresiones aritméticas, 3.7.3 Expresiones lógicas. Fuente principal.
- Cairo Battistutti, O. (2015). *Metodología de la programación*, 1.3.3 Operaciones aritméticas, 1.3.4 Expresiones lógicas. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya conoces los tres tipos de operadores y cómo combinarlos en expresiones. El siguiente paso es aprender a **nombrar** los datos que participan en esas expresiones: continúa con
[4. Identificadores](/materias/logica-programacion/unidad-02/04-identificadores/).
