---
title: "DOC-13 · Checklists operativos"
description: "Versiones rápidas y operativas de los estándares: checklists A a G para el día a día."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-CHK |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Todo el equipo |
| Fecha | 2026-08-30 |

Estos checklists son las versiones **rápidas y operativas** de los estándares completos (Docs. 01–12). Se recomienda pegarlos como plantillas en el tablero de tareas o en los templates de GitHub.

---

## Checklist A — Antes de comenzar una tarea

```
[ ] Leí los criterios de aceptación de la tarea/Issue y los entiendo.
[ ] La tarea tiene un ID (para nombrar mi branch y mis commits).
[ ] Sé si esta tarea toca backend, frontend, BD, o varios (para saber qué estándares aplican).
[ ] Verifiqué que no hay otra rama/PR ya trabajando en lo mismo.
[ ] Creé mi branch desde la última versión de main/develop, con el naming correcto (Doc. 06).
[ ] Si la tarea implica una decisión técnica no trivial, la comenté con mi Tech Lead antes de avanzar.
```

## Checklist B — Antes de hacer commit

```
[ ] Corrí el formateador automático (Pint / Prettier).
[ ] No dejé dd(), var_dump(), console.log() de depuración.
[ ] No hay credenciales ni datos sensibles en el diff.
[ ] El mensaje de commit sigue Conventional Commits (Doc. 06).
[ ] El commit representa un cambio lógico coherente (no mezclo cosas no relacionadas).
```

## Checklist C — Antes de abrir Pull Request

```
[ ] Corrí lint + tests localmente y pasan.
[ ] Actualicé/agregué tests para el código nuevo (Doc. 08).
[ ] Actualicé documentación relevante (README, API docs, ADR) si aplica (Doc. 10).
[ ] Llené la plantilla de PR: qué cambia, cómo probarlo, Issue relacionado.
[ ] Revisé mi propio diff una vez antes de pedir revisión (autorevisión).
[ ] El PR no mezcla cambios no relacionados con la tarea.
```

## Checklist D — Para Code Review (reviewer)

```
[ ] Naming, arquitectura, seguridad, errores, validación, performance, tests, documentación,
    duplicación, complejidad, compatibilidad, migraciones, API, logs (checklist completo: Doc. 07).
[ ] Etiqueté cada hallazgo como BLOCKER / MAJOR / MINOR / NIT.
[ ] Di feedback claro, dirigido al código, con referencia al estándar cuando aplica.
[ ] Aprobé solo si no quedan BLOCKER ni MAJOR sin resolver o acordar.
```

## Checklist E — Antes de hacer merge

```
[ ] El PR tiene al menos 1 aprobación real (no autoaprobación).
[ ] El pipeline de CI está en verde.
[ ] No quedan hallazgos BLOCKER abiertos.
[ ] La estrategia de merge es "Squash and merge" (Doc. 06).
[ ] Tras el merge, se elimina la rama.
```

## Checklist F — Antes de considerar una historia DONE

```
[ ] Cumple criterios de aceptación.
[ ] Fue probada (automática y/o manualmente).
[ ] Sin errores críticos conocidos.
[ ] Pasó CI.
[ ] Documentación necesaria al día.
[ ] Fue revisada y aprobada.
[ ] Está fusionada en la rama principal correspondiente.
(Ver Doc. 12 para el detalle completo del Definition of Done)
```

## Checklist G — Antes de release / entrega formal

```
[ ] Todas las historias planeadas para esta entrega están en estado DONE (Checklist F).
[ ] main está en verde (CI completo pasando).
[ ] CHANGELOG.md actualizado con los cambios de esta entrega.
[ ] README/instrucciones de instalación probadas por alguien que no las escribió.
[ ] Se generó un tag de versión si el equipo lo usa (git tag vX.Y.Z).
[ ] Se preparó una demo/evidencia de la funcionalidad entregada para el docente.
[ ] Se revisó que no hay secretos ni datos reales sensibles en el estado entregado.
```
