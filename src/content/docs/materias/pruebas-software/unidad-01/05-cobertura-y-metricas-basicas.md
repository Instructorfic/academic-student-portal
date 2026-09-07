---
title: "5. Cobertura y métricas básicas"
description: "Unidad I de Pruebas de Software — cobertura de requisitos, cobertura de código introductoria y métricas básicas de defectos."
---

Si los principios del tema anterior explican cómo razonar sobre las
pruebas, esta sección responde una pregunta relacionada: ¿cómo saber,
de manera más objetiva, si un proceso de pruebas fue suficiente?

## Cobertura de requisitos

La **cobertura** (*coverage*) de requisitos mide qué proporción de los
requisitos definidos para un sistema tiene al menos un caso de prueba
asociado. Un requisito sin ningún caso de prueba que lo respalde es un
requisito sin evidencia de que se haya verificado.

La relación formal entre requisitos y casos de prueba, incluida la
construcción de una matriz de trazabilidad, es contenido central de la
Unidad II. Aquí solo necesitas reconocer que "cobertura de requisitos"
significa evaluar cuántos requisitos tienen respaldo de prueba, no
construir esa relación todavía.

## Cobertura de código (introductoria)

La **cobertura de código** mide qué proporción del código fuente de
un sistema se ejecuta al correr un conjunto de pruebas. Dos formas
básicas de cobertura de código son:

- **cobertura de instrucciones** — qué proporción de líneas o
  instrucciones del código se ejecutó al menos una vez
- **cobertura de decisiones** — qué proporción de las ramas posibles
  de una decisión (por ejemplo, ambos resultados de un `if`) se
  ejecutó al menos una vez

Es importante no confundir una cobertura de código alta con ausencia
de defectos: el principio de presencia de defectos que viste en el
tema anterior aplica también aquí. Que una línea de código se haya
ejecutado no significa que se haya verificado que su resultado es
correcto.

En la Unidad IV, al trabajar con pruebas unitarias, volverás a la
cobertura de código con mayor profundidad técnica.

## Métricas básicas de defectos

Una **métrica** es una medición que permite valorar objetivamente un
aspecto de un proceso o un producto. Para el seguimiento de defectos,
algunas métricas básicas son:

- **número de defectos encontrados** — cuántos defectos se han
  identificado en un periodo o en una etapa
- **severidad** — el impacto técnico o funcional de un defecto (se
  desarrollará con profundidad en la Unidad VII)
- **prioridad** — la urgencia con la que debe atenderse un defecto (se
  desarrollará con profundidad en la Unidad VII)
- **tendencias de defectos** — si el número de defectos encontrados
  aumenta, disminuye o se estabiliza a lo largo del tiempo, lo cual
  puede indicar si un producto se está estabilizando o si un proceso
  de desarrollo está introduciendo defectos a un ritmo mayor del que
  se corrigen

Severidad y prioridad se introducen aquí únicamente como conceptos: su
gestión formal, incluyendo el ciclo de vida completo de un defecto, es
contenido de la Unidad VII.

## Error común

Confundir "cobertura de código alta" con "sistema probado a fondo".
Un conjunto de pruebas puede ejecutar el 100% de las líneas de código
sin verificar que ninguna produzca el resultado correcto, si las
aserciones son débiles o inexistentes.

## Para reflexionar

- Para tu sistema bajo prueba, ¿tienes actualmente algún caso de
  prueba formal? Si la respuesta es no, ¿qué significa eso para la
  cobertura de requisitos en este momento del semestre?
- ¿Qué diferencia práctica hay entre medir cobertura de instrucciones
  y medir cobertura de decisiones?

## Actividad y evidencia

Este tema se aplica, junto con el tema anterior, en la
[Actividad 5 — Evidencia conceptual de cierre de unidad](/materias/pruebas-software/unidad-01/actividades/actividad-5/),
la evidencia oficial de esta unidad.

## Referencias de este tema

- ISO/IEC 25010:2011 — modelo de calidad relacionado con cobertura y
  características medibles.
- ISO/IEC/IEEE 29119 (Parte 1). Ver
  [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).

## Qué sigue

Ya recorriste los cuatro contenidos oficiales de la unidad. Revisa el
[cierre y resumen](/materias/pruebas-software/unidad-01/06-cierre-y-resumen/)
antes de avanzar a la Unidad II.
