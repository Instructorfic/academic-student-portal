---
title: "DOC-12 · Definition of Done"
description: "Lista verificable de cuándo una tarea está realmente terminada, y los niveles de ‘Done’."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-DOD |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Todo el equipo / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Definir de forma objetiva cuándo una historia/tarea está realmente terminada, evitando el "está listo" subjetivo.

## 2. Definition of Done — lista verificable

Una tarea **NO puede considerarse DONE** si cualquiera de estas condiciones es falsa:

```
[ ] Cumple todos los criterios de aceptación definidos en el Issue/historia.
[ ] El código fue probado (tests automatizados donde aplica según Doc. 08, y prueba manual del flujo si es UI).
[ ] No tiene errores críticos conocidos (BLOCKER de Doc. 07).
[ ] El pipeline de CI pasó en verde (Doc. 11).
[ ] Tiene la documentación necesaria (README/API docs/ADR) si el cambio lo amerita (Doc. 10).
[ ] Fue revisado y aprobado por al menos un reviewer (Doc. 07).
[ ] Está fusionado a la rama principal correspondiente (main/develop), no solo "en mi rama local".
[ ] No introduce código muerto, `dd()`/`console.log` de depuración, ni TODOs sin Issue asociado.
[ ] Si tocó base de datos, la migración corre limpia desde cero en un entorno nuevo.
[ ] Si tocó la API, el contrato (request/response) quedó documentado y no rompe a otros equipos sin aviso.
```

## Reglas con ID (resumen)

Cada punto de la lista de la sección 2, para su referencia desde la Matriz de Cumplimiento (Doc. 14). Todas son condición necesaria de "Done a nivel código" (P0/P1):

| ID | Condición |
|---|---|
| STD-DOD-01 | Cumple todos los criterios de aceptación del Issue/historia. |
| STD-DOD-02 | El código fue probado (tests automatizados donde aplica según [Doc. 08](/estandares/08-pruebas/), y prueba manual del flujo si es UI). |
| STD-DOD-03 | No tiene errores críticos conocidos (BLOCKER de [Doc. 07](/estandares/07-code-review/)). |
| STD-DOD-04 | El pipeline de CI pasó en verde ([Doc. 11](/estandares/11-calidad-cicd/)). |
| STD-DOD-05 | Tiene la documentación necesaria (README/API docs/ADR) si el cambio lo amerita ([Doc. 10](/estandares/10-documentacion/)). |
| STD-DOD-06 | Fue revisado y aprobado por al menos un reviewer distinto del autor ([Doc. 07](/estandares/07-code-review/)). |
| STD-DOD-07 | Está fusionado a la rama principal correspondiente. |
| STD-DOD-08 | No introduce código muerto, `dd()`/`console.log` de depuración, ni TODOs sin Issue asociado. |
| STD-DOD-09 | Si tocó base de datos, la migración corre limpia desde cero en un entorno nuevo. |
| STD-DOD-10 | Si tocó la API, el contrato quedó documentado y no rompe a otros equipos sin aviso. |

## 3. Niveles de "Done" (para evitar ambigüedad de alcance)

| Nivel | Cuándo se usa | Qué exige |
|---|---|---|
| **Done a nivel código** | El PR está fusionado | Todo lo de la sección 2 salvo despliegue |
| **Done a nivel funcional** | La historia de usuario completa está utilizable | Además, validado en un entorno de staging/demo, con datos de prueba reales |
| **Done a nivel entrega** | Corresponde a un avance formal del curso | Además, documentado en el `CHANGELOG.md` y comunicado al docente/equipo |

## 4. Quién verifica el DoD
- El autor de la tarea se autoevalúa contra esta lista antes de pedir revisión.
- El reviewer confirma el DoD como parte del Code Review ([Doc. 07](/estandares/07-code-review/)).
- El Tech Lead de equipo verifica el DoD a nivel funcional antes de marcar la historia como cerrada en el tablero (Issues/Projects).

## 5. Qué pasa si algo no cumple el DoD
No se marca la tarea como cerrada; se reabre o se deja en progreso, y si hay razones de tiempo, se documenta como deuda técnica explícita (Issue etiquetado `deuda-tecnica`) en vez de cerrarla "a medias" sin dejar rastro.

## 6. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Checklist de DoD aplicado | Manual | Evidencia en el PR/Issue (checklist marcado) |
| CI verde antes de marcar Done | Automática | Pipeline ([Doc. 11](/estandares/11-calidad-cicd/)) |
| Deuda técnica registrada si aplica | Manual | Issue con etiqueta `deuda-tecnica` |

## 7. Referencias
- [Doc. 07](/estandares/07-code-review/) — Code Review.
- [Doc. 08](/estandares/08-pruebas/) — Pruebas.
- [Doc. 13](/estandares/13-checklists/) — Checklist F (versión operativa de este DoD).
