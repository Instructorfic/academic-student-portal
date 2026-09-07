---
title: "3. Propósito de las pruebas de software"
description: "Unidad I de Pruebas de Software — objetivos de las pruebas, reducción de riesgo y su papel dentro del ciclo de vida del desarrollo."
---

## Objetivos y beneficios de las pruebas

Una **prueba** (*test*) es una actividad diseñada para evaluar un
producto de software con el fin de identificar diferencias entre su
comportamiento real y su comportamiento esperado. Sus objetivos
principales son:

- **identificación de defectos** (*defect* / *bug*) — encontrar
  comportamientos que no corresponden a lo esperado, antes de que
  lleguen a producción
- **mejora de la confiabilidad** — dar evidencia objetiva de que el
  sistema se comporta de forma consistente
- **reducción de costos derivados de errores** — un defecto detectado
  antes de liberar el producto es, en general, menos costoso de
  corregir que uno detectado después

## Las pruebas como reducción de riesgo

Un **riesgo** es la posibilidad de que ocurra un evento no deseado, y
se evalúa considerando dos factores: su **impacto** (qué tan grave
sería si ocurre) y su **probabilidad** (qué tan probable es que
ocurra).

Las pruebas de software funcionan, en gran medida, como un mecanismo
de **reducción de riesgo**: no eliminan por completo la posibilidad de
que algo falle, pero permiten identificar y corregir problemas antes
de que tengan la oportunidad de causar daño. Por eso no todas las
partes de un sistema requieren el mismo nivel de esfuerzo de prueba:
conviene priorizar aquellas con **mayor impacto y mayor probabilidad de
fallo**.

**Ejemplo relacionado con tu proyecto.** Volviendo a la situación de
la [introducción de la unidad](/materias/pruebas-software/unidad-01/): la funcionalidad que
falló no necesariamente era la más compleja del sistema, pero si tenía
alto impacto (por ejemplo, si afectaba directamente una operación
crítica para los usuarios) merecía un nivel de prueba proporcional a
ese riesgo. Cuando definas el sistema bajo prueba de tu proyecto
integrador, vas a razonar de la misma forma.

## Las pruebas dentro del ciclo de vida del software

Las pruebas no ocurren únicamente al final del desarrollo. Pueden, y
deben, para reducir costos y riesgo, integrarse en cada etapa:

| Etapa | Qué puede probarse en esa etapa |
| --- | --- |
| Análisis | Revisar si los requisitos son claros, completos y verificables |
| Diseño | Revisar si la arquitectura propuesta soporta los escenarios esperados |
| Implementación | Probar componentes conforme se van construyendo |
| Mantenimiento | Volver a probar (regresión) tras cada cambio |

En la Unidad III conocerás con detalle los tipos y niveles de prueba
(unitarias, integración, sistema, aceptación) que corresponden a cada
una de estas etapas. Aquí basta con comprender que las pruebas son una
actividad continua, no un evento aislado antes de liberar el producto.

## Error común

Pensar que "probar" ocurre solo al final, justo antes de entregar. Un
requisito ambiguo detectado en la etapa de análisis, antes de escribir
una sola línea de código, es tan valioso como un defecto encontrado
técnicamente en el sistema terminado, y mucho más barato de corregir.

## Para reflexionar

- Piensa en un proyecto (escolar o personal) donde un defecto se
  descubrió muy tarde. ¿En qué etapa anterior pudo haberse detectado?
- Para tu sistema bajo prueba, ¿qué funcionalidad tiene mayor impacto
  si falla, y cuál tiene mayor probabilidad de fallar?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 4 — Ejercicio de identificación de riesgos](/materias/pruebas-software/unidad-01/actividades/actividad-4/),
donde priorizarás funcionalidades de tu propio sistema bajo prueba por
impacto y probabilidad.

## Referencias de este tema

- Myers, Sandler y Badgett, *The Art of Software Testing* — fuente
  principal sobre objetivos y beneficios de las pruebas.
- Toledo, *Introducción a las pruebas de sistemas de información* —
  lectura de entrada en español. Ver
  [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).

## Qué sigue

Ya sabes por qué se prueba. El siguiente paso es aprender cómo razonar
sobre cuándo y cómo hacerlo: continúa con
[4. Principios generales de pruebas](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/).
