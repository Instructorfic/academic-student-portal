---
title: "Bloque II — Desarrollo colaborativo y arquitectura"
description: "Taller Integrador — introducción al Bloque II: resultados de aprendizaje, ruta de estudio y el primer incremento funcional real de tu proyecto."
---

## Identificación del bloque

| Campo | Valor |
| --- | --- |
| Materia | Taller Integrador de Especialización (clave 4017) |
| Bloque | II — Desarrollo colaborativo y arquitectura |
| Horas de contacto | 16 (8 teóricas + 8 prácticas) |
| Estudio independiente | 8 horas |

## Resultados de aprendizaje del bloque

Al finalizar este bloque serás capaz de:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA2.1 | Utilizar Git para gestionar el desarrollo colaborativo |
| RA2.2 | Organizar el código mediante estrategias de ramas |
| RA2.3 | Definir una arquitectura inicial |
| RA2.4 | Identificar componentes y responsabilidades del sistema |
| RA2.5 | Continuar el desarrollo del proyecto mediante iteraciones |

## Qué vas a estudiar

Este bloque cubre cuatro contenidos oficiales del programa:

1. **2.1 Git y control de versiones** — cómo trabajar en equipo sobre el
   mismo repositorio sin pisarse el trabajo entre sí.
2. **2.2 Integración del trabajo** — cómo decidir cuándo algo está
   realmente terminado y cómo gestionar lo que falta por hacer.
3. **2.3 Arquitectura de software** — cómo organizar tu código en
   responsabilidades separadas antes de que crecer se vuelva un
   problema.
4. **2.4 Patrones de diseño** — soluciones ya probadas a problemas de
   diseño que se repiten.

### Ruta de estudio sugerida

1. Lee esta introducción completa (el problema del bloque y la
   activación, más abajo).
2. Lee [1. Git y control de versiones](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/) y realiza las
   actividades [A1](/materias/taller-integrador/bloque-02/actividades/actividad-1/) y
   [A2](/materias/taller-integrador/bloque-02/actividades/actividad-2/).
3. Lee [2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/) y realiza el
   [Laboratorio 1 — Git colaborativo](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/).
4. Lee [3. Integración del trabajo](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/) y realiza la
   [Actividad 3 — Definition of Done del equipo](/materias/taller-integrador/bloque-02/actividades/actividad-3/).
5. Lee [4. Arquitectura de software](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/) y realiza la
   [Actividad 4](/materias/taller-integrador/bloque-02/actividades/actividad-4/) y el
   [Laboratorio 2 — Arquitectura inicial](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/).
6. Lee [5. Patrones de diseño](/materias/taller-integrador/bloque-02/05-patrones-de-diseno/) y realiza la
   [Actividad 5](/materias/taller-integrador/bloque-02/actividades/actividad-5/) y el
   [Laboratorio 3 — Aplicar un patrón de diseño](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno/).
7. Lee [6. Primer incremento — qué debes producir](/materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir/) y el
   [cierre del bloque](/materias/taller-integrador/bloque-02/07-cierre-y-resumen/) antes de avanzar al Bloque III.

## Tu proyecto continúa aquí, no empieza de nuevo

En el [Bloque I](/materias/taller-integrador/bloque-01/) definiste tu dominio de proyecto, conformaste tu
equipo, aprendiste Scrum y dejaste un esqueleto Laravel ejecutable en un
repositorio. Este bloque **no reinicia nada de eso**: lo continúa.

Al cierre del Bloque I tu repositorio tenía un solo historial de
commits — nadie había trabajado todavía en paralelo, nadie había
revisado el código de otra persona antes de integrarlo. Este bloque
resuelve exactamente eso: vas a trabajar como equipo, en el mismo
repositorio, al mismo tiempo, sobre el mismo proyecto.

> **Ejemplo ilustrativo. No es tu proyecto: tu equipo sigue trabajando
> sobre su propio dominio.** Los materiales de este bloque siguen
> usando "ReservaFIC" (sistema de préstamo de equipo de laboratorio),
> el mismo ejemplo del Bloque I, con los mismos dos tipos de usuario y
> la misma regla de no doble reserva — únicamente para demostrar
> conceptos.

## ¿Qué problema vamos a resolver?

Dos integrantes de un equipo modifican, cada uno por su cuenta, el
mismo archivo del proyecto, en la misma tarde. Uno de los dos hace
`git push` primero. Cuando el segundo intenta subir su cambio, Git le
avisa que no puede — y ninguno de los dos sabe qué hacer con eso.

Este escenario le puede pasar a cualquier equipo que empiece a trabajar
en paralelo sin un flujo acordado, y probablemente le va a pasar al
tuyo en este mismo bloque.

> **Pregunta orientadora.** Si dos personas de tu equipo necesitan
> trabajar hoy mismo en funcionalidades distintas del mismo proyecto,
> ¿cómo lo organizarías para que ninguna interrumpa el trabajo de la
> otra?

## Qué debes tener al cerrar este bloque

Al cerrar este bloque, tu equipo debe contar con:

- historial de ramas y al menos un pull request integrado con revisión real
- al menos un conflicto de fusión resuelto correctamente
- `ARQUITECTURA.md` con componentes, dependencias y flujo de información documentados
- al menos un patrón de diseño aplicado y justificado
- el **primer incremento funcional real** del proyecto, construido siguiendo el flujo de ramas y pull requests — a diferencia del esqueleto mínimo del Bloque I, aquí nada se integra directamente a `main`.

Estos artefactos son el resultado acumulado de los tres laboratorios de
este bloque. Ver
[6. Primer incremento — qué debes producir](/materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir/)
para el detalle completo.

## Activación — antes de empezar

> Antes de continuar, revisa con tu equipo: ¿alguna vez perdieron
> trabajo, o tuvieron que rehacerlo, por trabajar dos personas sobre el
> mismo archivo sin coordinarse? Vas a resolver exactamente ese
> problema en
> [1. Git y control de versiones](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/)
> y en el [Laboratorio 1](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/).
