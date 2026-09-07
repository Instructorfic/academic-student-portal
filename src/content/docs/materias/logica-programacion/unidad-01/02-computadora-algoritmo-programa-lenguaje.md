---
title: "2. Computadora, algoritmo, programa y lenguaje"
description: "Unidad I de Lógica de Programación — los cuatro conceptos básicos y cómo se relacionan entre sí."
---

## Computadora

Una **computadora** es una máquina capaz de recibir datos, procesarlos
siguiendo instrucciones y producir un resultado. Por sí sola, una
computadora no "sabe" resolver ningún problema: necesita que alguien le
indique, paso a paso, qué hacer. El tratamiento en esta unidad es
conceptual — no profundizarás todavía en arquitectura de computadoras.

## Algoritmo

Un **algoritmo** es una secuencia ordenada, finita y precisa de pasos
que resuelve un problema o realiza una tarea. Un algoritmo:

- tiene un punto de inicio y un punto final (es **finito**)
- cada paso es preciso, sin ambigüedad (es **definido**)
- produce un resultado a partir de una entrada, aunque la entrada esté
  implícita.

Además de estas características, un algoritmo bien construido no puede
depender de una acción imposible de ejecutar: cada paso debe poder
realizarse mediante un procedimiento efectivo. "Haz lo necesario para
resolver el problema" no es una instrucción suficientemente definida.
"Ordena los datos de menor a mayor" sí lo es. Esto no significa que el
algoritmo deba ser rápido u óptimo — esa es una cuestión distinta, de
**calidad** de la solución (corrección, claridad, generalidad,
eficiencia), no un requisito para que algo cuente como algoritmo.

**Ejemplo profesional.** Una receta de café bien escrita, con
cantidades y orden claros, es un algoritmo. "Haz café" no lo es, porque
deja pasos sin especificar — exactamente la situación planteada en la
[introducción de la unidad](/materias/logica-programacion/unidad-01/).

## Programa

Un **programa** es la implementación de un algoritmo en un lenguaje
que una computadora puede ejecutar. El algoritmo es la idea de
solución. El programa es esa idea escrita en una forma que la máquina
entiende.

```text
Algoritmo (idea de solución)
        ↓  se escribe en un lenguaje
Programa (código ejecutable)
```

## Lenguajes

Un **lenguaje de programación** es el conjunto de reglas (vocabulario
y sintaxis) que permite escribir un programa para que una computadora
lo ejecute. Existen muchos lenguajes (por ejemplo, C, C++, Python), y
todos permiten expresar algoritmos, aunque con reglas distintas.

En esta unidad no aprenderás la sintaxis de ningún lenguaje textual en
particular — eso comenzará a trabajarse en unidades posteriores, una
vez que domines el razonamiento algorítmico. En el
[siguiente tema](/materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos/)
usarás Scratch, que representa un programa con bloques en lugar de
texto, precisamente para que experimentes la idea de "programa" sin la
barrera de la sintaxis.

## Cómo se relacionan estos conceptos

```text
Computadora
    ↓ ejecuta
Programa
    ↑ es la implementación de
Algoritmo
    ↑ se expresa mediante
Lenguaje de programación
```

## Error común

Usar "algoritmo" y "programa" como sinónimos, o pensar que el lenguaje
de programación es quien "ejecuta" el programa. Quien ejecuta es la
**computadora**. El lenguaje es solo el medio formal con el que se
escribió ese programa.

## Para reflexionar

- ¿Por qué existen tantos lenguajes de programación distintos, si
  todos sirven para expresar algoritmos?
- Piensa en un algoritmo que ya conoces (por ejemplo, cómo ordenar tus
  contactos alfabéticamente). ¿Podrías expresarlo en más de un
  lenguaje de programación sin que dejara de ser el mismo algoritmo?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 2 — Mapa conceptual: computadora, algoritmo, programa y lenguaje](/materias/logica-programacion/unidad-01/actividades/actividad-2/),
donde construirás un mapa conceptual con los cuatro conceptos
relacionados.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*. Fuente
  principal.
- Levine Gutiérrez, G. (1994). *Introducción a la computación y a la
  programación estructurada*. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-01/referencias/).

## Qué sigue

Con el vocabulario básico definido, el siguiente paso es aprender a
**representar** un algoritmo antes de convertirlo en programa:
continúa con
[3. Herramientas para representar algoritmos](/materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos/).
