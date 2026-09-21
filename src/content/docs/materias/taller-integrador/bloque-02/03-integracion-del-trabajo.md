---
title: "3. Integración del trabajo"
description: "Bloque II de Taller Integrador — estrategias de integración frecuente, gestión de incidencias (issues) y Definition of Done."
---

## Estrategias de integración

Integrar con frecuencia, en cambios pequeños, con revisión de código,
reduce el riesgo de un conflicto grande y difícil de resolver. Una rama
que vive semanas sin integrarse acumula más diferencias con `main` y es
más probable que termine en un conflicto complicado.

**Por qué importa:** cuanto más tiempo pasa una rama sin integrarse, más
diverge de `main`, y más difícil (y riesgoso) se vuelve resolver las
diferencias cuando finalmente se integra. Integrar seguido, en cambios
pequeños, mantiene ese riesgo bajo control.

Esta idea no es exclusiva de Git: es una práctica de organización del
código y de trabajo en equipo, consistente con recomendaciones
ampliamente documentadas sobre cambios pequeños y revisión constante
(ver [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/)).

## Gestión de incidencias

Un **issue** documenta trabajo pendiente: una funcionalidad nueva, un
error (*bug*), una tarea o una mejora. Un repositorio sin issues obliga
a que el equipo recuerde de memoria qué falta por hacer.

Un issue bien redactado incluye, como mínimo: qué se necesita o qué
falla, por qué importa, y cómo se sabrá que quedó resuelto. Un issue
sin esa información ("arreglar el bug") es tan poco útil como una
historia de usuario redactada como tarea técnica (ver
[3. Introducción a Scrum](/materias/taller-integrador/bloque-01/03-introduccion-a-scrum/) del Bloque I).

## Definition of Done (DoD)

La **Definition of Done** son los criterios que determinan cuándo algo
está realmente terminado — no "ya lo hice", sino una lista verificable.

En el Bloque I usaste una versión simple de la Definition of Done. Este
bloque la retoma y **la aplica de verdad a cada pull request**, no solo
la declara. Como mínimo, agrega a la versión del Bloque I criterios
propios de este bloque, por ejemplo:

```text
☐ El cambio pasó por code review con al menos un comentario real.
☐ El cambio sigue la organización documentada en ARQUITECTURA.md.
☐ El cambio no rompe ninguna funcionalidad que ya funcionaba.
☐ Los commits usan Conventional Commits.
```

Una Definition of Done que existe solo como documento, pero que nadie
verifica antes de integrar un pull request, no cumple su propósito. La
diferencia entre "declarar" una Definition of Done y "aplicarla" es
exactamente lo que este bloque evalúa.

## Error común

Redactar una Definition of Done con frases vagas ("queda bien hecho",
"funciona correctamente") en lugar de criterios verificables uno por
uno, o definirla una sola vez al inicio del bloque y no volver a
consultarla antes de integrar cada pull request.

## Para reflexionar

- ¿Cuál de los criterios de tu Definition of Done sería más fácil de
  "hacer trampa" (marcarlo como cumplido sin que realmente lo esté)?
  ¿Cómo lo redactarías para que eso sea más difícil?
- Piensa en una rama que decidieras dejar sin integrar durante dos
  semanas. ¿Qué podría cambiar en `main` mientras tanto que te genere
  un conflicto más grande del que tendrías si integraras hoy?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 3 — Definition of Done del equipo](/materias/taller-integrador/bloque-02/actividades/actividad-3/),
que debes completar **antes** del Laboratorio 1 para poder aplicarla
desde tus primeros pull requests.

## Referencias de este tema

- Martin, R. C. *Clean Code* — fuente de la práctica de cambios
  pequeños e integración frecuente. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/).

## Qué sigue

Con un flujo de integración claro y una Definition of Done que de
verdad se aplica, el siguiente paso es organizar el código mismo antes
de que crecer se vuelva un problema: continúa con
[4. Arquitectura de software](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/).
