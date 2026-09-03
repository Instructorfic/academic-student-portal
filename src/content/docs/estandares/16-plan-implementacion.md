---
title: "DOC-16 · Plan de implementación por fases"
description: "Cómo se introduce el handbook de forma progresiva, fase por fase, a lo largo del proyecto."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-PLAN |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Docente / Tech Leads |
| Fecha | 2026-08-30 |

## 1. Objetivo
Introducir el handbook de forma progresiva, evitando que los estudiantes reciban todo el estándar de golpe. Cada fase se apoya en la anterior.

## 2. Fases

### Fase 0 — Introducción y setup
| Aspecto | Contenido |
|---|---|
| Aprender | Qué es este handbook, por qué existe, cómo navegarlo ([Doc. 00](/estandares/00-indice/), [Doc. 01](/estandares/01-general/)). |
| Configurar | Repositorio creado, `.gitignore`, `.editorconfig`, protección de `main`, accesos del equipo. |
| Entregar | Repo inicial con la estructura de carpetas y los archivos base de `config-examples/` (`.gitignore`, `.editorconfig`, `CODEOWNERS`, plantillas de PR/Issue) y con `docs/` según [Doc. 10](/estandares/10-documentacion/), sección 2; README mínimo. |
| Verificar | El repo existe, tiene protección de rama activa, todos los integrantes tienen acceso. |
| Evidencia | Captura/config de branch protection; primer commit del repo. |

### Fase 1 — Git + Naming + Estructura
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 06](/estandares/06-git/) completo (branching, commits, PRs); naming general (Docs. 02–04, sección de naming). |
| Configurar | Commitlint, plantilla de PR e Issue, `CODEOWNERS` si aplica. |
| Entregar | Primeros 3-5 PRs siguiendo el flujo completo (branch → commit → PR → review → merge). |
| Verificar | Checklist B, C, D, E ([Doc. 13](/estandares/13-checklists/)) aplicados; commits en formato correcto. |
| Evidencia | Historial de PRs cerrados con revisión y CI (aunque sea mínimo) pasando. |

### Fase 2 — Laravel + Base de Datos
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 02](/estandares/02-backend-laravel/) (estructura backend, controllers, requests, models) y [Doc. 04](/estandares/04-bases-de-datos/) (PostgreSQL). |
| Configurar | Proyecto Laravel base, conexión a PostgreSQL, primeras migraciones, Pint + PHPStan configurados. |
| Entregar | Al menos un módulo con Model + Migration + Controller básico + Requests, sin exponer aún como API pública documentada. |
| Verificar | Migraciones reversibles, `$fillable` correcto, Pint/PHPStan en verde. |
| Evidencia | PRs de este módulo pasando CI backend ([Doc. 11](/estandares/11-calidad-cicd/), sección 5). |

### Fase 3 — API
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 05](/estandares/05-api-rest/) completo (naming, status codes, formato de respuesta, autenticación). |
| Configurar | Sanctum, versionado `/api/v1`, Resources, formato único de error. |
| Entregar | Endpoints CRUD del módulo de la Fase 2, documentados (mínimo en `docs/api/`). |
| Verificar | Tests de API de éxito/error (adelanto de [Doc. 08](/estandares/08-pruebas/)), status codes correctos. |
| Evidencia | Colección de pruebas de API (Postman/tests automatizados) + documentación de endpoints. |

### Fase 4 — Frontend
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 03](/estandares/03-frontend/) completo (estructura, naming, fetch, accesibilidad básica). |
| Configurar | ESLint + Prettier, estructura de `frontend/assets/`. |
| Entregar | Vistas que consumen los endpoints de la Fase 3, con manejo de errores visible al usuario. |
| Verificar | Checklist D aplicado a PRs de frontend; sin `innerHTML` inseguro; formularios validados. |
| Evidencia | Demo funcional del flujo end-to-end (frontend ↔ backend ↔ BD). |

### Fase 5 — Testing
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 08](/estandares/08-pruebas/) completo (tipos de prueba, qué probar, Factories). |
| Configurar | Suite de tests organizada (`tests/Unit`, `tests/Feature`), reporte de cobertura visible en CI. |
| Entregar | Cobertura razonable de la lógica crítica desarrollada hasta esta fase. |
| Verificar | Suite completa corre en CI; tests independientes y reproducibles. |
| Evidencia | Reporte de tests en CI de los últimos PRs. |

### Fase 6 — CI/CD
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 11](/estandares/11-calidad-cicd/) completo. |
| Configurar | Pipeline completo (lint + análisis estático + tests + secret scanning) para backend y frontend. |
| Entregar | Workflows de GitHub Actions funcionando establemente. |
| Verificar | Ningún PR reciente se fusionó con CI en rojo. |
| Evidencia | Historial de Actions con builds verdes consistentes. |

### Fase 7 — Seguridad
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 09](/estandares/09-seguridad/) completo (OWASP Top 10 aplicado al proyecto). |
| Configurar | Rate limiting en auth, CORS explícito, auditoría de dependencias en CI (reporte). |
| Entregar | Revisión de seguridad del módulo principal (autoevaluación con checklist de [Doc. 09](/estandares/09-seguridad/)). |
| Verificar | Sin hallazgos P0 abiertos; `.env.example` completo y actualizado. |
| Evidencia | Reporte de Gitleaks limpio; test de rate limiting pasando. |

### Fase 8 — Refactorización y calidad
| Aspecto | Contenido |
|---|---|
| Aprender | [Doc. 02](/estandares/02-backend-laravel/) sección 14 (SOLID/DRY/KISS/YAGNI aplicados con criterio), gestión de deuda técnica. |
| Configurar | Revisión de code smells detectados por PHPStan/ESLint acumulados. |
| Entregar | Refactor documentado de al menos un área con deuda técnica identificada. |
| Verificar | Reducción de duplicación/complejidad medible o al menos documentada. |
| Evidencia | PR de refactor + Issue de deuda técnica cerrado o actualizado. |

## 3. Regla de progresión
No se exige el cumplimiento de reglas de una fase futura antes de tiempo, **pero** las reglas P0 ([Doc. 00](/estandares/00-indice/), sección D) aplican desde la Fase 0, sin excepción, en cualquier fase del proyecto.

## 4. Referencias
- [Doc. 00](/estandares/00-indice/) — mapa general.
- Todos los documentos 01–15, referenciados por fase según corresponde.
