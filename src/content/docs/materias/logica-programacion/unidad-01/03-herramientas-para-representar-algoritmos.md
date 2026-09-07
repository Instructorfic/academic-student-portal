---
title: "3. Herramientas para representar algoritmos"
description: "Unidad I de Lógica de Programación — lenguaje natural, pseudocódigo, diagramas de flujo y Scratch como apoyo visual."
---

## Por qué representar un algoritmo

Antes de convertir un algoritmo en un programa, es útil
**representarlo** de una forma que cualquier persona pueda leer y
verificar, sin necesidad de conocer un lenguaje de programación. Una
solución que solo existe en tu cabeza es difícil de revisar, difícil
de explicar, puede contener ambigüedades sin que te des cuenta, y es
difícil de implementar. Representarla hace visible tu razonamiento.

## Tres formas de representación

| Herramienta | Qué es | Ventaja |
| --- | --- | --- |
| Lenguaje natural | Descripción de los pasos con palabras, en el orden en que ocurren | Es el punto de partida más cercano a tu forma cotidiana de explicar un procedimiento |
| Pseudocódigo | Descripción de los pasos de un algoritmo en lenguaje natural estructurado, sin la sintaxis estricta de un lenguaje | Fácil de leer y escribir, se centra en la lógica y no en la sintaxis |
| Diagrama de flujo | Representación gráfica de los pasos de un algoritmo mediante símbolos conectados | Permite visualizar el orden y las decisiones de un vistazo |

En esta unidad solo necesitas **reconocer** estas herramientas y
entender para qué sirven. Su uso formal, con reglas de sintaxis y
notación completas, se desarrolla en unidades posteriores.

### El mismo algoritmo, tres representaciones

**Problema:** preparar una taza de café.

Lenguaje natural:

```text
1. Tomar una taza.
2. Calentar agua.
3. Colocar café en la taza.
4. Agregar el agua caliente.
5. Mezclar.
6. Servir.
```

Pseudocódigo:

```text
Algoritmo PrepararCafe
    tomar taza
    calentar agua
    colocar café
    agregar agua caliente
    mezclar
    servir
FinAlgoritmo
```

Diagrama de flujo: la misma secuencia, representada con símbolos
conectados por flechas que muestran el inicio, cada acción en orden, y
el fin.

> **El algoritmo es la solución expresada de manera procedimental. El
> lenguaje natural, el pseudocódigo y el diagrama de flujo son
> distintas formas de representar ese mismo algoritmo — no algoritmos
> distintos.**

El programa oficial de la materia menciona además herramientas de
apoyo como DFD y PSeInt, orientadas a construir diagramas de flujo y
pseudocódigo de forma asistida. Las conocerás con más detalle cuando la
unidad correspondiente lo requiera.

## Herramienta no es lo mismo que representación

Es fácil confundir el software que usas para construir una
representación con la representación misma. No debes confundir
"pseudocódigo" con el programa que utilizas para escribirlo (por
ejemplo, un editor de texto o PSeInt), ni "diagrama de flujo" con el
software que utilizas para dibujarlo.

## Apoyo: Scratch y programación por bloques

> **Contenido de apoyo.** Se incorpora considerando que es tu primer
> semestre y tu primer contacto con la programación.

**Scratch** (Scratch Foundation / MIT Media Lab, disponible en
scratch.mit.edu) es un entorno de programación por bloques: en lugar
de escribir texto con una sintaxis exacta, arrastras y conectas
bloques visuales que representan instrucciones (mover, repetir, decir,
esperar, si/entonces, etc.). Es gratuito, funciona en el navegador sin
instalar nada, y fue diseñado para que alguien sin experiencia previa
pueda construir un programa funcional en minutos.

**Blockly** es una biblioteca de programación por bloques desarrollada
por Google. No es una aplicación para el usuario final como Scratch,
sino la tecnología que utilizan otras plataformas (como Code.org o App
Inventor) para ofrecer una experiencia similar. Se menciona aquí solo
para que sepas que la programación por bloques no es exclusiva de
Scratch.

**Por qué se usa en esta unidad:** un bloque en Scratch es, en
esencia, un paso de un algoritmo representado visualmente. Conectar
bloques en el orden correcto es exactamente lo mismo que ordenar los
pasos de una receta o de una solución algorítmica — solo que aquí la
computadora "ejecuta" tus bloques de inmediato y puedes ver el
resultado, incluso si algo sale mal.

```text
ALGORITMO
    ↓
BLOQUES
    ↓
EJECUCIÓN
```

**Importante:** Scratch **no sustituye** al pseudocódigo ni al
diagrama de flujo, y no constituye una representación algorítmica
equivalente. Es un apoyo de esta unidad, no la herramienta principal
de la materia. A partir de unidades posteriores trabajarás con otras
herramientas y, eventualmente, con un lenguaje textual.

## Error común

Pensar que las tres herramientas de representación (lenguaje natural,
pseudocódigo, diagrama de flujo) "sirven para cosas distintas", en
lugar de ser formas distintas de representar la misma solución.

## Para reflexionar

- Para el algoritmo de la sección 9 de tu manual (determinar si un
  número es par o impar), ¿cómo se vería representado en pseudocódigo?
  ¿Y como diagrama de flujo?
- ¿En qué situación preferirías comunicar un algoritmo mediante un
  diagrama de flujo en lugar de pseudocódigo, y por qué?

## Actividades y evidencia

- [Actividad 3 — Primer contacto con Scratch](/materias/logica-programacion/unidad-01/actividades/actividad-3/):
  reconstruirás con bloques un algoritmo que ya trabajaste.
- [Actividad 4 — Comparación de herramientas para representar algoritmos](/materias/logica-programacion/unidad-01/actividades/actividad-4/):
  compararás pseudocódigo, diagrama de flujo y Scratch en una tabla.

## Referencias de este tema

- Cairo Battistutti, O. (2015). *Metodología de la programación*.
  Fuente prioritaria para representación de algoritmos.
- Joyanes Aguilar, L. (2020). *Fundamentos de programación*. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-01/referencias/).

## Qué sigue

Ya sabes cómo representar una solución. El siguiente paso es
desarrollar la forma de pensar que produce esa solución: continúa con
[4. Razonamiento lógico y pensamiento computacional](/materias/logica-programacion/unidad-01/04-razonamiento-logico-y-pensamiento-computacional/).
