---
title: "2. Garantía, aseguramiento, verificación y validación"
description: "Unidad I de Pruebas de Software — los cuatro términos que con más frecuencia se confunden: QA, aseguramiento, verificación y validación."
---

Estos cuatro términos son, según la experiencia documentada en el
diseño de esta unidad, los que con más frecuencia se confunden entre
sí. Vale la pena detenerse en cada uno antes de continuar.

## Garantía de calidad (*Quality Assurance*, QA)

La **garantía de calidad** es el conjunto de actividades
**preventivas** integradas dentro del proceso de desarrollo,
orientadas a evitar que se introduzcan defectos, más que a encontrarlos
después de que ya existen. Ejemplos: definir un estándar de
codificación antes de escribir código, o establecer que todo cambio
debe pasar por una revisión de pares antes de integrarse.

La garantía de calidad se relaciona directamente con los **procesos
organizacionales**: no pregunta únicamente "¿este producto es
correcto?", sino "¿el proceso que seguimos para construirlo reduce la
probabilidad de que introduzcamos defectos?".

## Aseguramiento de calidad

El **aseguramiento de calidad** comprende las actividades de
**revisión, evaluación y mejora continua** que verifican si esas
actividades preventivas realmente se están cumpliendo y si están
funcionando. Si la garantía de calidad define "así vamos a trabajar",
el aseguramiento de calidad pregunta "¿de verdad estamos trabajando
así, y está funcionando?".

**Error común.** No confundir garantía con aseguramiento: la garantía
es el diseño preventivo del proceso, el aseguramiento es la revisión y
mejora continua de que ese proceso se cumple.

## Verificación y validación

- **Verificación** (*verification*) responde: **¿se construyó el
  producto correctamente?** Comprueba que un producto de trabajo (un
  módulo, una funcionalidad, un documento) cumple con las
  especificaciones que se le dieron, sin necesariamente cuestionar si
  esas especificaciones eran las correctas.
- **Validación** (*validation*) responde: **¿se construyó el producto
  correcto?** Comprueba que el producto satisface la necesidad real
  del usuario o del negocio, incluso si técnicamente cumple con la
  especificación escrita.

**Ejemplo profesional.** Si el requisito indica "el sistema debe
rechazar contraseñas de menos de 4 caracteres" y el sistema
efectivamente rechaza esas contraseñas, la **verificación** es
exitosa. Pero si 4 caracteres son insuficientes para proteger las
cuentas de los usuarios en la práctica, el sistema puede pasar la
verificación y, aun así, **fallar la validación**: el requisito mismo
no representaba correctamente la necesidad de seguridad.

## Los cuatro términos en un solo lugar

| Término | Pregunta central | Naturaleza |
| --- | --- | --- |
| Garantía de calidad | ¿El proceso está diseñado para prevenir defectos? | Preventiva, de proceso |
| Aseguramiento de calidad | ¿Ese proceso se cumple y está funcionando? | Revisión, evaluación, mejora continua |
| Verificación | ¿Se construyó el producto correctamente (según la especificación)? | Comprobación técnica |
| Validación | ¿Se construyó el producto correcto (según la necesidad real)? | Comprobación de adecuación al uso |

## Para reflexionar

- Piensa en un producto que "cumple exactamente lo que dice el
  manual" pero que aun así te resulta poco útil. ¿Es un problema de
  verificación o de validación?
- ¿Qué actividad preventiva concreta (garantía de calidad) podría
  haber evitado la situación planteada en la
  [introducción de la unidad](/materias/pruebas-software/unidad-01/)?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 3 — Análisis de caso: garantía, aseguramiento, verificación y validación](/materias/pruebas-software/unidad-01/actividades/actividad-3/),
donde aplicarás los cuatro términos a la situación inicial de la
unidad.

## Referencias de este tema

- Jorgensen, *Software Testing: A Craftsman's Approach* — fuente
  principal para verificación y validación.
- ISO/IEC/IEEE 29119 (Parte 1) — vocabulario normalizado de referencia.
  Ver [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).

## Qué sigue

Ya sabes distinguir estos cuatro conceptos. El siguiente paso es
entender para qué sirven las pruebas en términos concretos: continúa
con [3. Propósito de las pruebas de software](/materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas/).
