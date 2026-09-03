---
title: "DOC-01 · Estándar general de desarrollo de software"
description: "Marco normativo común: principios, roles, clasificación de reglas y proceso de excepciones."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-GEN |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Arquitecto/Docente del proyecto |
| Fecha | 2026-08-30 |
| Aplica a | Todos los equipos e integrantes del proyecto |

## 1. Objetivo
Establecer el marco normativo común bajo el cual todos los equipos desarrollan el proyecto, de modo que el código, los procesos y las decisiones sean consistentes, verificables y auditables, sin exigir a los estudiantes un nivel de madurez que aún no tienen.

## 2. Alcance
Aplica a todo el código, configuración, documentación y proceso de trabajo del proyecto: backend, frontend, bases de datos, control de versiones, pruebas, seguridad, CI/CD y documentación. No aplica a herramientas personales de cada estudiante (editor, sistema operativo) salvo que afecten al repositorio compartido.

## 3. Principios rectores
1. **Consistencia antes que perfección.** Es preferible una convención simple y seguida por todos, a una convención "ideal" que solo algunos aplican.
2. **Todo lo automatizable se automatiza.** La revisión humana se reserva para diseño, arquitectura y criterio.
3. **Simplicidad por defecto (KISS/YAGNI).** No se introduce una tecnología, patrón o capa de abstracción sin una necesidad demostrada.
4. **Trazabilidad.** Toda decisión relevante (tecnología, arquitectura, excepción a una regla) queda escrita, no solo hablada.
5. **Aprendizaje progresivo.** El estándar se exige en fases (ver [Doc. 16](/estandares/16-plan-implementacion/)); no se espera dominio total desde el día uno.
6. **El estándar es objetivo, no punitivo.** Sirve para detectar y corregir, no para sancionar individualmente.

## 4. Definiciones
- **Regla P0/P1/P2/P3:** nivel de prioridad de una norma (ver [Doc. 00](/estandares/00-indice/), sección D).
- **OBLIGATORIO / RECOMENDADO / AVANZADO:** nivel de exigencia pedagógica de una norma.
- **ADR (Architecture Decision Record):** documento breve que registra una decisión arquitectónica, su contexto, alternativas consideradas y consecuencias.
- **Definition of Done (DoD):** conjunto de condiciones que una tarea debe cumplir para considerarse terminada ([Doc. 12](/estandares/12-definition-of-done/)).
- **Deuda técnica:** compromiso consciente y registrado de posponer una mejora de calidad para no bloquear el avance, con plan de pago.
- **Blocker/Major/Minor/Nit:** severidad de un hallazgo en code review ([Doc. 07](/estandares/07-code-review/)).

## 5. Responsabilidades

| Rol | Responsabilidad |
|---|---|
| **Estudiante/Developer** | Cumplir el estándar en su código, pasar los checklists antes de cada etapa, pedir ayuda cuando una regla no se entienda antes de improvisar. |
| **Tech Lead de equipo** (rotativo o fijo, definido por el equipo) | Vigilar consistencia dentro de su equipo, aprobar/organizar PRs, escalar dudas de estándar al docente. |
| **Reviewer** (cualquier integrante asignado a revisar un PR) | Aplicar el checklist de Code Review ([Doc. 07](/estandares/07-code-review/)) de forma objetiva. |
| **Docente/Arquitecto** | Mantener el estándar, auditar cumplimiento con la Matriz (Doc. 14), calificar con la Rúbrica (Doc. 15), resolver ambigüedades. |
| **CI/CD (automatizado)** | Ejecutar todas las verificaciones automatizables y bloquear merges que violen reglas P0/P1 automatizables. |

## 6. Clasificación de reglas
Toda regla del handbook se etiqueta con dos ejes independientes:

- **Prioridad:** P0 (crítico) · P1 (obligatorio) · P2 (importante) · P3 (mejora).
- **Exigencia pedagógica:** OBLIGATORIO · RECOMENDADO · AVANZADO.

Ejemplo de lectura: una regla "P1 / OBLIGATORIO" se exige siempre desde que la fase correspondiente inicia. Una regla "P3 / AVANZADO" es válida usarla, pero no se penaliza no usarla.

## 7. Reglas generales (aplican a todo el proyecto)

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-GEN-001 | Ninguna credencial, contraseña, token o clave se sube al repositorio; siempre vía `.env` no versionado. | P0 | OBLIGATORIO |
| STD-GEN-002 | Nadie hace push directo a `main`/`develop`; todo cambio entra por Pull Request. | P0 | OBLIGATORIO |
| STD-GEN-003 | El código en `main` siempre debe compilar/ejecutarse y pasar el pipeline de CI. | P0 | OBLIGATORIO |
| STD-GEN-004 | No se introduce una tecnología, librería o patrón nuevo sin justificarlo (comentario en PR si es menor, ADR si es estructural). | P1 | OBLIGATORIO |
| STD-GEN-005 | Todo el equipo sigue las convenciones de nombres definidas en los Docs. 02–06. | P1 | OBLIGATORIO |
| STD-GEN-006 | El formateo automático (Pint/Prettier) se ejecuta antes de cada commit. | P1 | OBLIGATORIO |
| STD-GEN-007 | Toda función/método pública relevante tiene al menos un comentario o docblock explicando su propósito si su nombre no es autoexplicativo. | P2 | RECOMENDADO |
| STD-GEN-008 | La complejidad se añade solo cuando resuelve un problema real y documentado, nunca "por si acaso". | P1 | OBLIGATORIO |
| STD-GEN-009 | Toda decisión que cambie la arquitectura general (nueva capa, nuevo servicio, cambio de motor de BD) requiere un ADR ([Doc. 10](/estandares/10-documentacion/)). | P1 | OBLIGATORIO |
| STD-GEN-010 | El código muerto (comentado, no usado) se elimina antes de abrir PR; Git conserva el historial. | P2 | RECOMENDADO |

## 8. Excepciones
Una regla puede excepcionarse cuando:
1. Existe una razón técnica documentada (comentario en el PR, mínimo una frase).
2. La excepción no es de prioridad P0 (las reglas P0 **nunca** se excepcionan).
3. El reviewer o el docente la aprueba explícitamente.

Toda excepción a una regla P1 debe quedar escrita en la descripción del PR bajo el encabezado `## Excepción al estándar`.

## 9. Proceso de actualización del estándar
1. Cualquier integrante puede proponer un cambio abriendo un Issue con la etiqueta `estandar`.
2. La propuesta describe: regla actual, problema detectado, propuesta de cambio, impacto.
3. El docente/arquitecto revisa y decide: aceptar, rechazar o llevar a discusión en clase/reunión de equipo.
4. Si se acepta, se actualiza el documento correspondiente, se incrementa su versión (semántica simple: 1.0 → 1.1 para cambios menores, 2.0 para cambios estructurales) y se anota en un `CHANGELOG.md` dentro de `docs/`.
5. Los cambios de estándar **no aplican retroactivamente** salvo que se indique explícitamente; el código ya fusionado no se reescribe solo por el cambio de norma.

## 10. Verificación de este documento
Este documento no es directamente verificable por CI (es normativo/marco); se verifica por:
- Existencia y accesibilidad del handbook completo en `docs/` del repositorio.
- Que cada equipo referencie explícitamente estas reglas en su `CONTRIBUTING.md`.
- Auditoría periódica del docente usando la Matriz de Cumplimiento (Doc. 14).

## 11. Referencias
- [Doc. 00](/estandares/00-indice/) — Arquitectura documental.
- [Doc. 12](/estandares/12-definition-of-done/) — Definition of Done.
- Doc. 14 — Matriz de Verificación y Cumplimiento.
