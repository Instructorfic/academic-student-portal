---
title: "DOC-00 · Arquitectura documental del handbook"
description: "Índice del handbook, relación entre documentos, prioridades P0-P3 y niveles de exigencia."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Proyecto | Proyecto Integrador — 9.º Semestre, Licenciatura en Informática |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Arquitectura/Docencia del proyecto |
| Fecha | 2026-08-30 |

---

## A. Propósito del sistema documental

Este handbook es el conjunto de reglas, plantillas y artefactos que definen **cómo se construye el software del proyecto**, independientemente de qué equipo o integrante lo escriba. No sustituye el criterio técnico: lo encuadra. Su función es que:

1. Un estudiante nuevo lea `CONTRIBUTING.md` y sepa *"así trabajamos aquí"*.
2. El docente/arquitecto pueda auditar objetivamente si un equipo cumple el estándar.
3. El pipeline de CI/CD pueda verificar automáticamente todo lo que sea automatizable.

Principio rector: **"Primero consistencia, después calidad, después optimización."** No se persigue el código perfecto; se persigue que **200 líneas escritas por 4 estudiantes distintos se vean como si las hubiera escrito una sola persona disciplinada.**

### Estatus y alcance

Este handbook es el **estándar de referencia** para proyectos de software que adopten el stack aquí descrito (PHP/Laravel + PostgreSQL + API REST + frontend en JavaScript modular). Su carácter —recomendado u obligatorio— para cada materia con proyecto de software (`taller-integrador`, `dba`, `pruebas-software`, `contenedores`, `sistemas-control-versiones`) lo determina el responsable académico de esa materia en su `CONTEXTO_MATERIA.md`; este documento no lo impone por sí mismo. Donde una materia use otro stack, se aplican por analogía los principios generales ([Doc. 01](/estandares/01-general/)) y no las reglas específicas de lenguaje/framework.

---

## B. Índice general de documentos

| Doc | Nombre | Público principal |
|---|---|---|
| 01 | Estándar General de Desarrollo de Software | Todo el equipo |
| 02 | Estándar de Codificación Backend (Laravel/PHP) | Devs backend |
| 03 | Estándar de Desarrollo Frontend | Devs frontend |
| 04 | Estándar de Bases de Datos (PostgreSQL + MongoDB) | Devs backend / DB |
| 05 | Estándar de APIs REST | Devs backend / frontend |
| 06 | Estándar de Git y Control de Versiones | Todo el equipo |
| 07 | Estándar de Code Review | Reviewers / Tech leads de equipo |
| 08 | Estándar de Pruebas | Todo el equipo |
| 09 | Estándar de Seguridad | Todo el equipo |
| 10 | Estándar de Documentación (incluye ADRs) | Todo el equipo |
| 11 | Estándar de Calidad y CI/CD | Todo el equipo |
| 12 | Definition of Done | Todo el equipo + docente |
| 13 | Checklists operativos (A–G) | Todo el equipo |
| 14 | Matriz de Verificación y Cumplimiento | Docente/arquitecto (auditoría) |
| 15 | Rúbrica de Evaluación Técnica | Docente |
| 16 | Plan de Implementación por Fases | Todo el equipo (roadmap) |
| 17 | 20 Reglas de Oro | Todo el equipo (referencia rápida) |
| 18 | Auditoría de la propuesta y riesgos — *no incluido en esta versión del handbook* | Docente/arquitecto |
| `config-examples/` | Archivos de configuración reales listos para copiar | Todo el equipo |

## C. Relación entre documentos

```
                     ┌──────────────────────────────┐
                     │ 01. Estándar General          │  ← marco, principios, niveles P0-P3
                     └───────────────┬───────────────┘
        ┌───────────────┬────────────┼────────────┬───────────────┐
        ▼                ▼            ▼            ▼               ▼
     02 Backend       03 Frontend   04 BD        05 API         09 Seguridad
        │                │            │            │               │
        └────────┬───────┴─────┬──────┴─────┬──────┴───────┬───────┘
                  ▼             ▼            ▼              ▼
              06 Git       07 Code Review  08 Pruebas   11 CI/CD
                  │             │            │              │
                  └─────────────┴─────┬──────┴──────────────┘
                                       ▼
                         10 Documentación (ADR, README, API docs)
                                       ▼
                         12 Definition of Done ──► 13 Checklists
                                       ▼
                  14 Matriz de cumplimiento ──► 15 Rúbrica ──► 16 Plan por fases
                                       ▼
                              17 Reglas de oro (síntesis)
```

Cada documento técnico (02–05, 09) se apoya en 01 (principios), alimenta a 06/07/08/11 (cómo se versiona, revisa, prueba y automatiza lo que ahí se define) y todo se documenta según 10. El cumplimiento se mide con 14 y se califica con 15. 16 secuencia el aprendizaje para que nada de esto se exija de golpe.

## D. Matriz resumen de estándares (vista rápida)

| Prioridad | Significado | Ejemplos | Bloquea merge |
|---|---|---|---|
| **P0 — Crítico** | Rompe seguridad, integridad o build | Secretos en el repo, push directo a `main`, código que no compila, tests críticos en rojo | Sí, siempre |
| **P1 — Obligatorio** | Base de consistencia del equipo | Naming, formateo, lint, PR obligatorio, code review | Sí, vía CI/checklist |
| **P2 — Importante** | Calidad sostenida en el tiempo | Cobertura razonable, refactor de duplicados, documentación de módulo | No bloquea, pero se registra como deuda |
| **P3 — Mejora** | Optimización y patrones avanzados | Caching avanzado, patrones de diseño complejos, micro-optimizaciones | No bloquea |

Cada regla, además de prioridad, tiene un **nivel de exigencia pedagógica**:

| Nivel | Significado |
|---|---|
| **OBLIGATORIO** | Se cumple siempre, sin excepción, desde la Fase 1. |
| **RECOMENDADO** | Se aplica salvo justificación explícita (registrada en el PR o en un ADR). |
| **AVANZADO** | Se habilita cuando el equipo ya domina lo obligatorio/recomendado; no se exige en fases tempranas. |

## E. Herramientas recomendadas (resumen; detalle en cada documento)

| Área | Herramienta principal | Alternativa académica aceptable |
|---|---|---|
| Formateo PHP | Laravel Pint | — |
| Análisis estático PHP | PHPStan (nivel 4–5) | Larastan |
| Testing PHP | Pest o PHPUnit (elegir uno, no mezclar) | — |
| Lint JS | ESLint (config recomendada, no airbnb completa) | — |
| Formateo JS/CSS/HTML | Prettier | — |
| Control de versiones | Git + GitHub | GitLab si la institución lo provee |
| CI/CD | GitHub Actions | GitLab CI |
| Secret scanning | Gitleaks (acción de GitHub) | GitHub secret scanning nativo |
| Documentación de API | OpenAPI/Swagger (`l5-swagger`) o Postman Collection versionada | — |
| Gestión de tareas | GitHub Projects / Issues | Trello (si se documenta el mapeo a Issues) |

Ningún equipo debe introducir una herramienta fuera de esta lista sin registrar un ADR breve explicando el motivo (ver [Doc. 10](/estandares/10-documentacion/)).
