---
title: "6. Cierre y resumen de la unidad"
description: "Unidad I de Pruebas de Software — cierre, resumen y qué sigue en la Unidad II."
---

## Cierre: volviendo a la situación inicial

Retoma la situación de la
[introducción de la unidad](/materias/pruebas-software/unidad-01/): un equipo entrega una
funcionalidad "ya probada manualmente" que falla poco después en
producción, sin que nadie haya documentado qué se probó, bajo qué
condiciones, ni con qué criterio se consideró terminada la prueba.

Con lo que aprendiste en esta unidad, puedes explicar esa situación
con mayor precisión:

- Es posible que el equipo confundiera **verificación** ("funciona
  según lo que yo entendí que debía hacer") con **validación**
  ("funciona según lo que el usuario realmente necesitaba").
- "Ya se probó" no es una afirmación verificable sin **criterios de
  salida** explícitos ni sin conocer la **cobertura** real de esa
  prueba.
- Si el equipo hubiera priorizado esa funcionalidad por su **impacto y
  probabilidad de fallo**, probablemente le habría dedicado un
  esfuerzo de prueba proporcional a su importancia.
- El hecho de que la prueba manual "no encontrara nada" no demostraba
  ausencia de defectos, solo ausencia de defectos encontrados con esa
  prueba en particular.

## Resumen de la unidad

- La **calidad de software** es un conjunto de características, no
  una propiedad binaria, y se juega durante todo el ciclo de vida del
  desarrollo, no solo al codificar.
- **Garantía de calidad** (preventiva, de proceso) y **aseguramiento
  de calidad** (revisión, evaluación, mejora continua) no son lo
  mismo. **Verificación** ("¿correctamente?") y **validación**
  ("¿correcto?") tampoco.
- Las pruebas existen para **identificar defectos**, **mejorar la
  confiabilidad** y **reducir riesgo**, y deben integrarse en todo el
  ciclo de vida del desarrollo.
- Cuatro **principios generales**, presencia de defectos, pruebas
  tempranas, agrupación de defectos y criterios de salida, orientan
  decisiones básicas sobre cuándo y cómo probar.
- **Cobertura** (de requisitos y de código) y **métricas básicas** de
  defectos permiten valorar si un proceso de pruebas fue suficiente,
  más allá de afirmaciones subjetivas como "ya se probó".

## Lo que todavía no vas a estudiar

Esta unidad delimita deliberadamente lo que corresponde a unidades
posteriores del programa:

- Requisitos funcionales y no funcionales, casos de uso, historias de
  usuario, criterios de aceptación, escenarios y trazabilidad
  (Unidad II).
- Tipos y niveles de prueba en detalle, técnicas de diseño de casos,
  plan y estrategia de pruebas (Unidad III).
- Pruebas unitarias e integración, dobles de prueba, JUnit (Unidad IV).
- Pruebas funcionales, de sistema, GUI, APIs, Postman/Selenium
  (Unidad V).
- Pruebas de rendimiento, seguridad introductoria, usabilidad, JMeter
  (Unidad VI).
- Gestión formal de defectos, Jira/TestLink/Zephyr (Unidad VII).

## Una última revisión

Al terminar esta unidad deberías poder explicar, sin necesidad de
consultar tus notas: qué es la calidad de software y cómo se relaciona
con el ciclo de vida, en qué se diferencian garantía, aseguramiento,
verificación y validación, por qué se prueba y cómo eso reduce riesgo,
qué principios generales orientan cuándo y cómo probar, y qué
significa que un proceso de pruebas tenga buena cobertura.

Si alguna de estas preguntas todavía no la puedes responder con
claridad, revisa el tema correspondiente antes de avanzar:
[1](/materias/pruebas-software/unidad-01/01-calidad-de-software/),
[2](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/),
[3](/materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas/),
[4](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/) o
[5](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/).

## Qué sigue: Unidad II

Con estos fundamentos, en la Unidad II comenzarás a responder una
pregunta que esta unidad deliberadamente no resuelve todavía: **¿qué
debe probarse exactamente?** Esa unidad trabaja con requisitos,
criterios de aceptación y trazabilidad, el puente entre "por qué
probar" y "qué probar". Todavía no está publicada en este portal.

## Referencias generales de la unidad

Consulta el listado completo, con su justificación de relevancia, en
[Referencias de la Unidad I](/materias/pruebas-software/unidad-01/referencias/).
