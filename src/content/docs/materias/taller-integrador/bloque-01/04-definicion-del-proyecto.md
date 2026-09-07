---
title: "4. Definición del proyecto"
description: "Bloque I de Taller Integrador — cómo delimitar problema, usuarios y alcance, y construir el Product Backlog inicial de tu proyecto."
---

## Problema

Antes de definir qué vas a construir, define con precisión **qué
problema resuelve** tu sistema y **para quién**. Un problema mal
delimitado ("hacer una aplicación para restaurantes") es más difícil de
convertir en un Product Backlog que uno delimitado ("permitir que un
restaurante pequeño gestione reservaciones de mesa sin depender de una
llamada telefónica").

Este paso retoma directamente la distinción entre problema y necesidad
que viste en
[1. El desarrollo profesional de software](/materias/taller-integrador/bloque-01/01-desarrollo-profesional-de-software/):
si todavía no puedes nombrar la necesidad real detrás de tu proyecto en
una frase, es señal de que el problema aún no está suficientemente
delimitado.

## Alcance

Define explícitamente:

- qué funcionalidades incluye tu proyecto
- qué funcionalidades excluye deliberadamente (no es lo mismo "no lo
  hicimos" que "decidimos que no forma parte del alcance")
- qué restricciones existen (tiempo disponible, tamaño del equipo,
  tecnología que ya conocen).

**Por qué importa:** un proyecto sin límites explícitos tiende a crecer
sin control durante el semestre ("ya que estamos, agreguemos
también..."), lo que compromete la entrega de un incremento
demostrable a tiempo. Decir que no a una funcionalidad, con una razón
documentada, es una decisión tan profesional como decir que sí.

**Ejemplo, usando ReservaFIC:**

| Dentro del alcance | Fuera del alcance |
| --- | --- |
| Registro y consulta de solicitudes de préstamo | Aplicación móvil nativa |
| Aprobación y seguimiento por el administrador | Integraciones con sistemas externos de la facultad |
| Validación de conflictos de horario | Funciones que no aporten al objetivo inicial |

## Backlog inicial

Con el problema y el alcance definidos, tu equipo debe producir un
Product Backlog inicial: una lista priorizada de historias de usuario,
suficiente para cubrir Sprint 0 y varios sprints de desarrollo (revisa
los [criterios de complejidad mínima](/materias/taller-integrador/bloque-01/) de la introducción del bloque).

Este backlog no aparece completo de la nada: es el resultado directo de
convertir las necesidades identificadas en historias de usuario con
criterios de aceptación, tal como estudiaste en
[3. Introducción a Scrum](/materias/taller-integrador/bloque-01/03-introduccion-a-scrum/). La secuencia completa es:

```text
Problema
   ↓
Usuarios y necesidades
   ↓
Historias de usuario
   ↓
Criterios de aceptación
   ↓
Prioridad y estimación
   ↓
Product Backlog inicial
```

## Error común

Escribir un backlog inicial compuesto solo de historias de prioridad
"alta". Si todo es urgente, el backlog no está priorizando nada: revisa
tus historias contra la pregunta "¿el sistema puede entregar su valor
principal sin esto todavía?" antes de marcar una historia como alta.

## Para reflexionar

- ¿Tu problema puede explicarse en una frase a alguien que no conoce tu
  proyecto, sin mencionar todavía la tecnología que vas a usar?
- ¿Qué funcionalidad sería la primera candidata a quedar fuera de
  alcance si el tiempo del semestre se reduce?

## Actividad y evidencia

Este tema se aplica directamente en la
[Actividad 5 — Ficha de planteamiento del proyecto](/materias/taller-integrador/bloque-01/actividades/actividad-5/),
la **evidencia oficial de "Planteamiento del proyecto"** de este
bloque (20% de la calificación de la materia). Ahí definirás problema,
alcance, Objetivo de producto, verificarás los nueve criterios de
complejidad mínima, y redactarás tu Product Backlog inicial.

## Laboratorios relacionados

- [Laboratorio 3 — De la necesidad a las historias de usuario](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario/)
  te prepara para redactar el backlog con historias bien formadas.
- [Laboratorio 4 — Sprint 0](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0/)
  integra el problema, el alcance y el backlog con el repositorio y tu
  primera funcionalidad ejecutable.

## Referencias de este tema

- Schwaber, K. y Sutherland, J. (2020). *The Scrum Guide* — Product
  Backlog. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-01/referencias/).
- Hunt, A. y Thomas, D. (2019). *The Pragmatic Programmer* — apoyo
  conceptual sobre delimitar problema y alcance.

## Qué sigue

Con problema, alcance y backlog definidos, el siguiente paso es
integrar todo en tu Sprint 0: continúa con
[5. Sprint 0 — qué debes producir](/materias/taller-integrador/bloque-01/05-sprint-0-que-debes-producir/).
