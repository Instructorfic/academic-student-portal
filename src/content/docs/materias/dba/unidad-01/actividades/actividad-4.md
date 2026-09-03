---
title: "Actividad 4 · Análisis de riesgo por falta de separación de ambientes"
description: "Unidad 1 de DBA. Análisis de la situación inicial y de un caso real (Knight Capital o GitLab)."
---

**Objetivo específico:** OE-U1.3. **Contenido:** C1.3.1 a C1.3.7.
**Modalidad:** individual o pareja.

## Requisitos antes de empezar

* Haber leído completa la sección de [Ambientes de trabajo](/materias/dba/unidad-01/03-ambientes-de-trabajo/):
 definición formal de ambiente, tipos, por qué separarlos, separación de
 responsabilidades entre ambientes, y al menos uno de los dos casos
 reales.
* Recomendado: leer la versión completa de ambos casos en
 [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/)
 antes de esta actividad (ver recomendación de secuencia más abajo).
* Tiempo estimado: 35-40 minutos (trabajo individual/pareja + puesta en
 común).

## Instrucciones para el estudiante

1. Retoma la situación de la introducción de la unidad. Identifica por
 escrito qué separación de ambientes (desarrollo, pruebas, producción)
 habría evitado el problema descrito, y explica por qué, usando la
 definición formal de "ambiente". Indica además qué responsabilidad
 correspondía a cada ambiente en esa situación: ¿quién debía y quién no
 debía poder actuar sobre producción?
2. Elige uno de los dos casos reales (Knight Capital o GitLab) y
 responde: ¿qué tipo de "ambiente" falló o se confundió en ese caso?
 ¿Qué habría cambiado si los ambientes hubieran estado correctamente
 separados y sincronizados?

> **Recomendación de secuencia:** lee la versión completa de ambos casos
> en [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/)
> **antes** de esta actividad (idealmente como tarea de la sesión
> anterior). El resumen de la unidad basta para responder, pero la
> versión completa da contexto adicional (cronología, cifras exactas,
> cita de fuentes) que facilita justificar la respuesta con más
> precisión.

## Producto/evidencia

Análisis escrito de la situación inicial (punto 1) + análisis breve de
uno de los dos casos reales (punto 2).

## Criterio de logro

El estudiante identifica que la modificación directa en producción es el
punto crítico de la situación inicial, y explica cómo un ambiente de
pruebas (o un proceso que pase primero por desarrollo y pruebas) habría
evitado aplicar un cambio sin validar directamente sobre datos reales.
Para el caso real elegido, identifica correctamente el elemento que
corresponde a "ambiente" en ese caso (servidores no sincronizados en
Knight Capital, servidor de producción confundido en GitLab) y no lo
confunde con otros conceptos de la unidad (por ejemplo, desempeño o
disponibilidad en abstracto).
