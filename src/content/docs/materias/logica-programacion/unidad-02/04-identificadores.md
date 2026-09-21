---
title: "4. Identificadores"
description: "Unidad II de Lógica de Programación — qué es un identificador, reglas generales y convenciones de nomenclatura (camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE)."
---

## ¿Cómo nombramos los datos?

En una expresión podemos escribir directamente `35 * 4`, pero también podemos trabajar con nombres: `precio * cantidad`. Para utilizar esos nombres necesitamos identificadores.

> **Un identificador es un nombre utilizado para distinguir un elemento dentro de una representación algorítmica.**

Ejemplos: `edad`, `precio`, `cantidad`, `promedio`, `nombre`, `distancia`. Estos nombres permiten expresar una solución de manera más comprensible: compara `150 * 4` con `precio * cantidad` — la segunda expresión comunica mejor qué representa cada dato.

## Un buen identificador comunica

Observa `x` frente a `precioProducto`. Ambos pueden representar un valor, pero el segundo comunica mejor la intención.

**Por qué importa:** los nombres deben ayudar a entender el algoritmo. La elección de identificadores es parte de la claridad de una solución, no un detalle cosmético.

## Reglas generales

Las reglas exactas de qué caracteres acepta un identificador dependen de la herramienta utilizada. Como criterio general, un identificador debe cumplir:

| Criterio | Qué significa |
| --- | --- |
| Claridad | El nombre debe comunicar qué representa |
| Consistencia | Debe mantenerse una misma forma de nombrar dentro de la misma solución |
| Validez | Debe respetar las reglas de identificación de la herramienta utilizada |

> **Alcance de la unidad.** Aquí interesa comprender la función de los identificadores. Las reglas sintácticas específicas de cada lenguaje de programación no son objetivo de esta unidad.

## Convenciones de nomenclatura

Un mismo concepto —por ejemplo, "precio total"— puede escribirse de varias formas: `precioTotal`, `PrecioTotal`, `precio_total`, `PRECIO_TOTAL`. Todas representan la misma idea; la diferencia está en la **convención de escritura**.

> **Una convención de nomenclatura es un acuerdo sobre cómo se combinan palabras dentro de un identificador.**

| Convención | Ejemplo | Dónde se usa con frecuencia | ¿Cuándo conviene? |
| --- | --- | --- | --- |
| camelCase | `precioTotal` | Nombres de variables y funciones | Variable o dato individual |
| PascalCase | `PrecioTotal` | Nombres de tipos, clases o algoritmos | Cuando el identificador representa una "entidad" o estructura completa |
| snake_case | `precio_total` | Variables, nombres de columnas en bases de datos | Cuando se prioriza legibilidad sobre brevedad |
| SCREAMING_SNAKE_CASE | `PRECIO_TOTAL` | Constantes | Casi universal para señalar "este valor no cambia" |
| kebab-case | `precio-total` | Nombres de archivo, URLs | **No válido como identificador** en la mayoría de representaciones algorítmicas |

Estas son convenciones de escritura ampliamente adoptadas en distintos entornos, no la sintaxis obligatoria de un lenguaje específico.

### ¿Por qué kebab-case no funciona como identificador?

`precio-total` no es un identificador: es una expresión.

```text
precio - total
 ↑        ↑    ↑
operando operador operando
```

El guion se interpreta como el **operador de resta**.

> **Un identificador no puede contener un carácter que también sea un operador. Por eso kebab-case se reserva para archivos y URLs, no para variables.**

### Un caso especial: constantes

Por convención —casi universal, independientemente del lenguaje o herramienta— las **constantes se escriben en SCREAMING_SNAKE_CASE**: `IVA`, `PI`, `TASA_INTERES`, `LIMITE_EDAD`. Esto permite reconocer visualmente que un valor no debe cambiar, solo con ver cómo está escrito. Ver [5. Constantes y variables](/materias/logica-programacion/unidad-02/05-constantes-y-variables/) para el concepto de constante.

### Comparando el mismo valor en distintas convenciones

Para el dato "tiene identificación": `tieneIdentificacion` (camelCase), `TieneIdentificacion` (PascalCase), `tiene_identificacion` (snake_case), `TIENE_IDENTIFICACION` (SCREAMING_SNAKE_CASE, si se tratara como constante).

> **Alcance de la unidad.** No se exige una convención única para todos los ejercicios. Lo importante es reconocerlas, entender su propósito y mantener consistencia dentro de una misma solución.

## Buenas prácticas para nombrar identificadores

- **Sé descriptivo.** Prefiere `precioTotal` sobre `pt` o `x`.
- **Sé consistente.** No mezcles convenciones dentro de la misma solución.
- **Nombra los lógicos como preguntas.** `esMayorDeEdad`, `tienePermiso` se leen como una pregunta con respuesta Verdadero/Falso.
- **Evita ambigüedad.** `d` puede ser distancia, día o dato; `distanciaKm` no deja duda.

Las reglas de qué caracteres acepta un identificador (tildes, espacios, número inicial) dependen de la herramienta. La claridad del nombre, en cambio, depende siempre de quien lo escribe.

## Error común

Elegir identificadores de una sola letra o abreviaturas ambiguas (`x`, `d`, `n1`) cuando el problema ya sugiere un nombre claro, o mezclar convenciones distintas (`precioTotal` y `cantidad_productos`) dentro de la misma solución.

## Para reflexionar

- ¿Por qué las constantes se escriben casi universalmente en SCREAMING_SNAKE_CASE, en lugar de camelCase?
- Para el dato "número máximo de intentos permitidos", ¿deberías tratarlo como variable o como constante? Justifica tu respuesta antes de elegir el identificador.

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 4 — Identificadores y constantes](/materias/logica-programacion/unidad-02/actividades/actividad-4/),
donde analizarás identificadores y aplicarás las convenciones de nomenclatura estudiadas.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.6 Constantes y variables, 3.6.1 Declaración de constantes y variables. Fuente principal.
- Cairo Battistutti, O. (2015). *Metodología de la programación*, 1.3.2 Identificadores, constantes y variables. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya sabes cómo nombrar los elementos de una solución algorítmica. El siguiente paso es distinguir cuándo ese nombre representa un valor que cambia y cuándo representa un valor fijo: continúa con
[5. Constantes y variables](/materias/logica-programacion/unidad-02/05-constantes-y-variables/).
