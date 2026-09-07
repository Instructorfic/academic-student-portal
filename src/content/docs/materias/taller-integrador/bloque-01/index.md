---
title: "Bloque I — Del problema al producto"
description: "Taller Integrador — introducción al Bloque I: resultados de aprendizaje, ruta de estudio, criterios de tu proyecto y el problema que resuelve este bloque."
---

## Identificación del bloque

| Campo | Valor |
| --- | --- |
| Materia | Taller Integrador de Especialización (clave 4017) |
| Bloque | I — Del problema al producto |
| Horas de contacto | 16 (8 teóricas + 8 prácticas) |
| Estudio independiente | 8 horas |

## Resultados de aprendizaje del bloque

Al finalizar este bloque serás capaz de:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA1.1 | Comprender el propósito y la dinámica del taller |
| RA1.2 | Identificar las características de un proyecto de software de alcance profesional |
| RA1.3 | Definir el problema y el alcance inicial de tu proyecto |
| RA1.4 | Conformar, junto con tus compañeros, un equipo de trabajo |
| RA1.5 | Conocer Scrum desde el inicio y utilizarlo como marco de organización durante todo el taller |
| RA1.6 | Definir tus primeras historias de usuario y criterios de aceptación |

## Qué vas a estudiar

Este bloque cubre cuatro contenidos oficiales del programa:

1. **1.1 El desarrollo profesional de software** — qué distingue un
   proyecto profesional de un ejercicio de programación individual.
2. **1.2 Conformación de equipos** — cómo se organiza un equipo de
   desarrollo y cómo se distribuye el trabajo.
3. **1.3 Introducción a Scrum** — el marco que utilizarás para
   organizar el trabajo durante todo el semestre.
4. **1.4 Definición del proyecto** — cómo delimitar el problema y el
   alcance inicial de tu propio proyecto.

### Ruta de estudio sugerida

1. Lee esta introducción completa (el problema del bloque y la
   activación, más abajo).
2. Lee [1. El desarrollo profesional de software](/materias/taller-integrador/bloque-01/01-desarrollo-profesional-de-software/) y realiza las
   actividades [A1](/materias/taller-integrador/bloque-01/actividades/actividad-1/) y
   [A2](/materias/taller-integrador/bloque-01/actividades/actividad-2/).
3. Realiza el [Laboratorio 1 — Primer contacto con Laravel](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero/).
4. Lee [2. Conformación de equipos](/materias/taller-integrador/bloque-01/02-conformacion-de-equipos/) y realiza la
   [Actividad 3](/materias/taller-integrador/bloque-01/actividades/actividad-3/).
5. Realiza el [Laboratorio 2 — Primer CRUD con Laravel](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel/).
6. Lee [3. Introducción a Scrum](/materias/taller-integrador/bloque-01/03-introduccion-a-scrum/) y realiza la
   [Actividad 4](/materias/taller-integrador/bloque-01/actividades/actividad-4/).
7. Realiza el [Laboratorio 3 — De la necesidad a las historias de usuario](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario/).
8. Lee [4. Definición del proyecto](/materias/taller-integrador/bloque-01/04-definicion-del-proyecto/) y realiza la
   [Actividad 5 — Ficha de planteamiento del proyecto](/materias/taller-integrador/bloque-01/actividades/actividad-5/)
   (evidencia oficial del bloque).
9. Realiza el [Laboratorio 4 — Sprint 0](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0/), que integra todo lo anterior en tu proyecto.
10. Lee [5. Sprint 0 — qué debes producir](/materias/taller-integrador/bloque-01/05-sprint-0-que-debes-producir/) y el
    [cierre del bloque](/materias/taller-integrador/bloque-01/06-cierre-y-resumen/) antes de avanzar al Bloque II.

## Tu proyecto integrador comienza aquí

A diferencia de otras materias, en el Taller Integrador **no existe un
caso de estudio único que resuelva todo el grupo**. Cada equipo elige o
recibe asignado su propio dominio de proyecto. El mecanismo concreto de
asignación (libre elección, banco de propuestas del docente, o mixto)
lo indicará tu docente al inicio del bloque.

Antes de que tu docente apruebe el planteamiento de tu proyecto, tu
dominio debe cumplir un conjunto mínimo de criterios de complejidad:

- al menos dos tipos de usuario con necesidades distintas
- al menos un conjunto de reglas de negocio no triviales
- datos que deban persistir y consultarse
- necesidad real de autenticación y autorización
- necesidad de exponer o consumir una API
- al menos un flujo verificable mediante pruebas automatizadas
- sentido de ejecutarse fuera de tu computadora (despliegue)
- posibilidad de razonar sobre crecimiento (más usuarios, más datos,
  más carga)
- backlog inicial suficiente para Sprint 0 más varios sprints de
  desarrollo.

En los materiales de este bloque, esos criterios se ilustran con un
**ejemplo ilustrativo**, no con un caso oficial:

> **Ejemplo ilustrativo. No es el proyecto que debes usar: tu equipo
> define su propio dominio.**
>
> Un sistema de préstamo de equipo de laboratorio para una facultad
> universitaria ("ReservaFIC"). Dos tipos de usuario: **estudiante**
> (solicita préstamo de equipo) y **administrador de laboratorio**
> (aprueba, rechaza y da seguimiento a los préstamos). Regla de
> negocio: un mismo equipo no puede prestarse a dos personas en el
> mismo horario, y un estudiante no puede tener más de un número
> máximo de préstamos activos simultáneos. Este ejemplo se usa de forma
> consistente en el resto de los materiales de este bloque únicamente
> para demostrar conceptos — no sustituye la definición de tu propio
> proyecto.

## Qué debes tener al cerrar este bloque

Al cerrar este bloque, tu equipo debe contar con:

- equipo conformado, con roles iniciales asignados
- repositorio Git creado, con README inicial
- tablero de trabajo
- Objetivo de producto (*Product Goal*)
- Product Backlog inicial, con historias de usuario y criterios de
  aceptación
- Definition of Done inicial
- arquitectura inicial esbozada
- ambiente de desarrollo funcionando para todo el equipo, con una
  primera funcionalidad ejecutable.

Estos artefactos son el resultado de los cuatro laboratorios de este
bloque, y en particular del
[Laboratorio 4 — Sprint 0](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0/), que es la evidencia técnica central del
bloque.

## ¿Qué problema vamos a resolver?

Un equipo que comienza a programar el mismo día en que se le asigna un
proyecto, sin haber acordado qué van a construir, quién hace qué, ni
cómo van a organizarse, casi siempre descubre semanas después que cada
integrante entendió el problema de una forma distinta: código que no
se integra, funcionalidades duplicadas o incompatibles, y nadie capaz
de explicar con precisión qué falta para terminar.

Este bloque no busca que memorices definiciones de "Scrum" o de
"proyecto profesional". Busca que tu equipo evite exactamente ese
escenario, mediante una forma concreta de organizarse desde la primera
sesión.

> **Pregunta orientadora.** ¿Qué debe existir, antes de escribir la
> primera línea de código de tu proyecto, para que tu equipo tenga
> razonablemente claro qué va a construir y cómo va a trabajar?

## Activación — antes de empezar

> **Actividad 1 — Diagnóstico inicial.** Antes de continuar, piensa en
> algún trabajo en equipo (académico o de otro tipo) donde el
> resultado final no coincidió con lo que cada integrante esperaba.
> Identifica, aunque sea de manera informal, qué faltó definir al
> inicio. Guarda esa reflexión — la retomarás en la
> [Actividad 1](/materias/taller-integrador/bloque-01/actividades/actividad-1/).
