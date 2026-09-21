---
title: "9. Cierre y resumen de la unidad"
description: "Unidad II de Lógica de Programación — cierre, resumen integrador y qué sigue en la Unidad III."
---

## Cierre: vuelve a la pregunta guía

Retoma la pregunta de la
[introducción de la unidad](/materias/logica-programacion/unidad-02/):

> ¿Cómo representamos y manipulamos la información de un problema para convertirla en una solución computable?

Con lo que aprendiste en esta unidad, ahora puedes responder que necesitas: identificar la información relevante, determinar el tipo de dato que representa, decidir si es variable o constante, asignarle un identificador claro, construir expresiones con los operadores adecuados —aplicando funciones matemáticas cuando el problema lo requiera— y resolver esas expresiones respetando prioridad, asociatividad y paréntesis. Finalmente, puedes comprobar el resultado con una herramienta como PSeInt.

## La cadena conceptual de la Unidad II

```text
INFORMACIÓN
     ↓
DATOS
     ↓
TIPOS
     ↓
IDENTIFICADORES
     ↓
VARIABLES / CONSTANTES
     ↓
OPERADORES
     ↓
EXPRESIONES
     ↓
FUNCIONES MATEMÁTICAS
     ↓
RESOLUCIÓN
     ↓
RESULTADO
```

## Ejemplo integrador

Partimos de información (`precio`, `cantidad`), reconocimos sus tipos (`Real`, `Entero`), les asignamos identificadores (`precio`, `cantidad`), construimos una expresión (`precio * cantidad`) y obtuvimos un resultado (`total`).

> **Los elementos algorítmicos básicos trabajan juntos para representar información y producir resultados.**

## Resumen de la unidad

- Un dato es un valor que representa información; un tipo de dato define su naturaleza y las operaciones válidas sobre él.
- Un identificador nombra un elemento de la representación; una convención de nomenclatura (camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE) mantiene esos nombres consistentes.
- Una variable representa un valor que puede cambiar; una constante representa un valor que permanece fijo. La decisión depende del problema, no del valor en sí.
- Los operadores aritméticos calculan, los relacionales comparan y los lógicos combinan condiciones; juntos permiten construir expresiones.
- Una expresión combina operandos y operadores para producir un resultado, cuyo tipo depende de la naturaleza de la expresión (numérico o lógico).
- Una expresión con varias operaciones se resuelve respetando una jerarquía completa de operadores y, cuando dos operadores comparten nivel, la asociatividad determina el orden.
- Una herramienta como PSeInt comprueba el resultado de una solución ya razonada; no sustituye el razonamiento.

## Lo que todavía no vas a estudiar

Esta unidad delimita deliberadamente lo que corresponde a etapas posteriores del programa:

- Una metodología sistemática de solución de problemas: descripción y análisis formal, estrategias de solución, desarrollo formal de pseudocódigo, depuración y plan de pruebas, documentación (Unidad III).
- Estructuras de decisión (`if`, `if-else`, `switch`) y estructuras repetitivas (`while`, `do-while`, `for`) (Unidad IV).
- Arreglos, matrices, estructuras de datos, archivos y programación orientada a objetos (contenidos posteriores).

Ninguna actividad de esta unidad requiere resolver un problema mediante decisiones o ciclos: el problema integrador de la unidad (calcular el costo final de una compra) se resuelve completamente con los elementos aquí estudiados.

## Una última revisión

Al terminar esta unidad deberías poder explicar, sin necesidad de consultar tus notas: qué es un dato y un tipo de dato, cuándo un valor debe representarse como variable o como constante, cómo elegir un identificador claro, qué distingue a un operador aritmético de uno relacional y de uno lógico, qué es una expresión y cómo se evalúa, cómo aplicar la jerarquía completa de operadores y la asociatividad, cuándo usar una función matemática, y cómo comprobar un resultado con una herramienta.

Si alguna de estas preguntas todavía no la puedes responder con claridad, es una señal de que conviene revisar el tema correspondiente antes de avanzar:
[1](/materias/logica-programacion/unidad-02/01-tipos-de-datos/),
[2](/materias/logica-programacion/unidad-02/02-expresiones/),
[3](/materias/logica-programacion/unidad-02/03-operadores/),
[4](/materias/logica-programacion/unidad-02/04-identificadores/),
[5](/materias/logica-programacion/unidad-02/05-constantes-y-variables/),
[6](/materias/logica-programacion/unidad-02/06-funciones-matematicas/),
[7](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/) u
[8](/materias/logica-programacion/unidad-02/08-herramientas-de-compilacion/).

## Qué sigue: Unidad III

Ya sabes representar información y construir expresiones que la operan. La Unidad III del programa —Metodología para la solución de problemas algorítmicos— introduce una forma sistemática de resolver problemas: descripción del problema, análisis, estrategias de solución, técnicas de análisis, desarrollo de la solución algorítmica en pseudocódigo, depuración y plan de pruebas, y documentación. Esa unidad todavía no está publicada en este portal.

```text
Unidad II
Datos → tipos → variables → constantes → operadores → expresiones
      ↓
Unidad III
Metodología → diseño → construcción → organización → documentación
```

## Referencias generales de la unidad

Consulta el listado completo, con su justificación de relevancia, en
[Referencias de la Unidad II](/materias/logica-programacion/unidad-02/referencias/).
