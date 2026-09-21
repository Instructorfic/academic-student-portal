---
title: "6. Primer incremento — qué debes producir"
description: "Bloque II de Taller Integrador — el checklist completo del primer incremento funcional real que cierra el Bloque II."
---

## A diferencia del Bloque I

En el Bloque I, tu equipo dejó un **esqueleto mínimo ejecutable**:
funcionaba localmente, pero nadie había trabajado todavía en paralelo,
nadie había revisado el código de otra persona antes de integrarlo, y
nadie había resuelto un conflicto real.

Este bloque produce algo distinto: el **primer incremento funcional
real** del proyecto. La diferencia no es solo de tamaño — es de
**proceso**: este incremento se construye siguiendo el flujo de ramas y
pull requests que estudiaste en
[2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).
Nada se integra directamente a `main`.

## Checklist completo del cierre del bloque

```text
☐ Historial de ramas y al menos un pull request integrado con revisión real.
☐ Al menos un conflicto de fusión resuelto correctamente, sin marcas de conflicto restantes.
☐ README actualizado con el flujo de trabajo del equipo.
☐ Commits redactados con Conventional Commits (feat, fix, docs, refactor).
☐ Una etiqueta anotada v0.1.0 marcando el primer incremento.
☐ Definition of Done actualizada, aplicada realmente a los pull requests del bloque.
☐ ARQUITECTURA.md con componentes, dependencias y flujo de información documentados.
☐ Al menos un patrón de diseño aplicado y justificado.
☐ El primer incremento funciona de extremo a extremo, sin errores.
```

## De dónde viene cada elemento

| Elemento del checklist | Dónde lo produces |
| --- | --- |
| Ramas, pull request, conflicto resuelto, Conventional Commits, etiqueta `v0.1.0` | [Laboratorio 1 — Git colaborativo](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/) |
| Definition of Done actualizada | [Actividad 3](/materias/taller-integrador/bloque-02/actividades/actividad-3/), aplicada durante el Laboratorio 1 |
| `ARQUITECTURA.md`, separación de responsabilidades | [Laboratorio 2 — Arquitectura inicial](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/) |
| Patrón de diseño aplicado y documentado | [Laboratorio 3 — Aplicar un patrón de diseño](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno/) |

Ningún elemento de este checklist se produce en una sola sesión: es el
resultado **acumulado** de los tres laboratorios del bloque, no una
entrega separada al final.

## No es una entrega de documentación

El primer incremento no se considera completo si solo existe
`ARQUITECTURA.md` y una descripción del patrón elegido, sin que el
código realmente funcione. La aplicación debe poder ejecutarse de
extremo a extremo, comportándose igual o mejor que el esqueleto del
Bloque I — un refactor de arquitectura no debe cambiar lo que el
usuario final observa, solo cómo está organizado el código por dentro.

## Error común

Dejar la documentación de arquitectura y de patrones para el final,
después de que el código ya está integrado, en lugar de documentar cada
decisión en el momento en que se toma (como piden el Laboratorio 2 y el
Laboratorio 3).

## Para reflexionar

- De los nueve elementos del checklist, ¿cuál le falta actualmente a tu
  equipo?
- Si tuvieras que explicarle a un compañero de otro equipo, en dos
  frases, qué cambió en la forma de trabajar de tu equipo entre el
  Bloque I y este bloque, ¿qué dirías?

## Qué sigue

Con el primer incremento completo, revisa el
[cierre del bloque](/materias/taller-integrador/bloque-02/07-cierre-y-resumen/)
antes de avanzar al Bloque III.
