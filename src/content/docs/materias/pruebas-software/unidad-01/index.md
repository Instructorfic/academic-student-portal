---
title: "Unidad I — Fundamentos de pruebas y aseguramiento de calidad"
description: "Pruebas de Software — introducción a la Unidad I: resultados de aprendizaje, ruta de estudio y la pregunta que organiza toda la unidad."
---

## Identificación de la unidad

| Campo | Valor |
| --- | --- |
| Unidad | I — Fundamentos de pruebas y aseguramiento de calidad |
| Materia | Pruebas de Software (clave 19506) |
| Sesiones | 9 |
| Carácter | Conceptual, sin herramientas de referencia ni laboratorio técnico |

## Resultados de aprendizaje de la unidad

Al finalizar esta unidad podrás:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA1.1 | Explicar la calidad de software, sus características y su relación con el ciclo de vida y el mantenimiento, distinguiendo garantía de calidad, aseguramiento de calidad, verificación y validación |
| RA1.2 | Explicar el propósito de las pruebas de software y su papel como mecanismo de reducción de riesgo dentro del ciclo de vida del desarrollo |
| RA1.3 | Aplicar los principios generales de las pruebas de software para justificar decisiones básicas sobre cuándo y cómo probar |
| RA1.4 | Relacionar la cobertura de requisitos y de código con métricas básicas de defectos para valorar la suficiencia de un proceso de pruebas |

Estos cuatro resultados desglosan el resultado esperado que define el
programa oficial para esta unidad: que puedas explicar qué son las
pruebas de software, por qué son necesarias y cómo contribuyen a la
calidad y reducción de riesgos.

## Qué vas a estudiar

Esta unidad cubre cuatro contenidos oficiales del programa:

```text
1.1 Conceptos básicos de calidad de software
    1.1.1 Calidad de software
    1.1.2 Garantía de calidad de software
    1.1.3 Aseguramiento de calidad de software
    1.1.4 Verificación y validación

1.2 Propósito de las pruebas de software
    1.2.1 Objetivos y beneficios de las pruebas
    1.2.2 Las pruebas como reducción de riesgo
    1.2.3 Las pruebas dentro del ciclo de vida del software

1.3 Principios generales de pruebas
    1.3.1 Las pruebas muestran presencia de defectos
    1.3.2 Pruebas tempranas
    1.3.3 Agrupación de defectos
    1.3.4 Criterios de salida

1.4 Cobertura y métricas básicas
    1.4.1 Cobertura de requisitos
    1.4.2 Cobertura de código introductoria
    1.4.3 Métricas básicas de defectos
```

### Ruta de estudio sugerida

1. Lee esta introducción y guarda tu respuesta a la pregunta
   orientadora (más abajo).
2. Realiza la [Actividad 1 — Diagnóstico inicial](/materias/pruebas-software/unidad-01/actividades/actividad-1/).
3. Lee [1. Calidad de software](/materias/pruebas-software/unidad-01/01-calidad-de-software/) y realiza la
   [Actividad 2](/materias/pruebas-software/unidad-01/actividades/actividad-2/).
4. Lee [2. Garantía, aseguramiento, verificación y validación](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/)
   y realiza la [Actividad 3](/materias/pruebas-software/unidad-01/actividades/actividad-3/).
5. Lee [3. Propósito de las pruebas de software](/materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas/) y realiza la
   [Actividad 4](/materias/pruebas-software/unidad-01/actividades/actividad-4/).
6. Lee [4. Principios generales de pruebas](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/).
7. Lee [5. Cobertura y métricas básicas](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/) antes de la última sesión.
8. Realiza la [Actividad 5 — Evidencia conceptual de cierre](/materias/pruebas-software/unidad-01/actividades/actividad-5/).
9. Revisa el [cierre de la unidad](/materias/pruebas-software/unidad-01/06-cierre-y-resumen/) antes de avanzar a la Unidad II.

## Tu proyecto integrador comienza aquí

Durante la primera sesión eliges, individualmente o en equipo, un
**sistema bajo prueba**: una aplicación o sistema de software
(existente o en desarrollo) sobre el que trabajarás durante todo el
semestre. En esta unidad solo necesitas definir su contexto inicial:
propósito, usuarios, funcionalidades generales y una primera idea de
riesgos. Los requisitos formales, los casos de prueba y la
trazabilidad se construyen a partir de la Unidad II.

El sistema que elijas debe mantenerse igual durante todo el proyecto
integrador, salvo que documentes explícitamente un cambio de alcance.

## ¿Qué problema vamos a resolver?

Piensa en esta situación:

> Un equipo entrega una funcionalidad que "ya se probó manualmente".
> Poco después de liberarse, esa funcionalidad falla en producción.
> Nadie documentó qué se probó, bajo qué condiciones, ni qué criterio
> se usó para considerar terminada la prueba.

Este escenario es un disparador ilustrativo para la unidad, no un caso
institucional fijo de la materia.

Hasta ahora, en materias previas de la carrera, trabajaste
principalmente como constructor de software: analizaste, diseñaste e
implementaste sistemas. Esta unidad marca un cambio de perspectiva: a
partir de aquí vas a pensar también como la persona que debe generar
evidencia de que ese software cumple con lo esperado.

Situaciones como la anterior no son excepcionales. Cada aplicación que
usas a diario, para pagar, para comunicarte, para estudiar, depende de
que alguien haya decidido, en algún momento, que "ya se probó lo
suficiente". Esta unidad te da el vocabulario y los principios para
entender qué significa realmente esa afirmación.

> **Pregunta orientadora.** Si "ya se probó manualmente" no evitó que
> la funcionalidad fallara en producción, ¿qué le faltó a ese proceso
> de prueba?

Guarda esta pregunta. Volverás a ella en el
[cierre de la unidad](/materias/pruebas-software/unidad-01/06-cierre-y-resumen/).

## Activación — antes de empezar

> **Actividad 1 — Diagnóstico inicial.** Antes de continuar, discute
> (en grupo o individualmente, según indique tu docente): a partir de
> la situación anterior, ¿qué salió mal? ¿Qué le faltó al proceso de
> prueba de ese equipo? Guía completa en la
> [Actividad 1](/materias/pruebas-software/unidad-01/actividades/actividad-1/).
