---
title: "DOC-06 · Estándar de Git y control de versiones"
description: "GitHub Flow simplificado, naming de ramas, Conventional Commits y reglas de Pull Request."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-GIT |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead de cada equipo / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Definir una estrategia de branching y commits simple, suficiente para el tamaño del equipo, y verificable por CI.

## 2. Estrategia de branching: **GitHub Flow simplificado** (no Git Flow completo)
Dado el tamaño del equipo y la duración de un semestre, **no se usa Git Flow completo** (con `develop`, `release/*`, `hotfix/*` separados de forma estricta) por ser sobreingeniería para este contexto. Se usa una variante simplificada:

- `main`: siempre desplegable/estable. Protegida — nadie hace push directo.
- `develop` (OPCIONAL, AVANZADO): solo si el equipo decide integrar antes de llegar a `main` porque tiene múltiples features en paralelo que necesitan estabilizarse juntas. Si el equipo es pequeño, se puede trabajar directo contra `main` con feature branches + PR.
- Feature branches: una rama por tarea, siempre desde la última versión de `main` (o `develop` si existe).

## 3. Naming de branches

```
feature/<ID-tarea>-<descripcion-corta>
fix/<ID-tarea>-<descripcion-corta>
docs/<ID-tarea>-<descripcion-corta>
refactor/<ID-tarea>-<descripcion-corta>
test/<ID-tarea>-<descripcion-corta>
chore/<ID-tarea>-<descripcion-corta>
```

Ejemplos: `feature/23-crear-modulo-facturas`, `fix/45-error-calculo-total`, `docs/12-actualizar-readme`.

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-GIT-B01 | El nombre de la rama incluye el ID del Issue/tarea correspondiente. | P1 | OBLIGATORIO |
| STD-GIT-B02 | Una rama = una tarea/feature; no se mezclan cambios no relacionados. | P1 | OBLIGATORIO |
| STD-GIT-B03 | Las ramas se eliminan tras hacer merge (mantener el repo limpio). | P2 | RECOMENDADO |

## 4. Commits — Conventional Commits (adoptado como estándar)

Formato: `<tipo>(<alcance opcional>): <descripción en presente, minúscula>`

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `refactor` | Cambio de código sin alterar comportamiento externo |
| `test` | Agregar o corregir pruebas |
| `chore` | Tareas de mantenimiento (dependencias, configuración) |
| `build` | Cambios que afectan el sistema de build/dependencias |
| `ci` | Cambios en configuración de CI/CD |

Ejemplos:
```
feat(invoices): agregar endpoint para crear factura
fix(auth): corregir expiración incorrecta del token
docs(readme): actualizar instrucciones de instalación
refactor(services): extraer cálculo de total a InvoiceCalculator
```

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-GIT-C01 | Todo commit sigue el formato Conventional Commits. | P1 | OBLIGATORIO |
| STD-GIT-C02 | El mensaje describe el "qué" y, si no es obvio, el "por qué" en el cuerpo del commit. | P2 | RECOMENDADO |
| STD-GIT-C03 | No se hacen commits tipo "wip", "arreglos", "cambios" sin contexto. | P1 | OBLIGATORIO |
| STD-GIT-C04 | Commits pequeños y frecuentes se prefieren sobre un solo commit gigante al final. | P2 | RECOMENDADO |

## 5. Pull Requests

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-GIT-PR01 | Todo cambio a `main` (o `develop`) pasa por PR; nunca push directo. | P0 | OBLIGATORIO |
| STD-GIT-PR02 | El PR usa la plantilla del repositorio (ver `config-examples/PULL_REQUEST_TEMPLATE.md`), describiendo qué cambia y cómo probarlo. | P1 | OBLIGATORIO |
| STD-GIT-PR03 | El PR pasa el pipeline de CI en verde antes de poder fusionarse. | P0 | OBLIGATORIO |
| STD-GIT-PR04 | El PR requiere al menos **1 aprobación** de otro integrante (no el autor). | P1 | OBLIGATORIO |
| STD-GIT-PR05 | El PR referencia el Issue/tarea que resuelve (`Closes #23`). | P1 | OBLIGATORIO |
| STD-GIT-PR06 | Un PR no debería superar ~400 líneas de diff sin justificación; si es mayor, se divide o se explica por qué no. | P2 | RECOMENDADO |
| STD-GIT-PR07 | El **título del PR** sigue el formato Conventional Commits (`<tipo>(<alcance>): <descripción>`). Con la estrategia "Squash and merge" (sección 6), ese título es el mensaje del único commit que llega a `main`, por lo que es el que alimenta el historial y `commitlint`. | P1 | OBLIGATORIO |

## 6. Merge, conflictos y rebase

- Estrategia de merge en GitHub: **Squash and merge** por defecto — mantiene el historial de `main` limpio (un commit por PR) mientras el desarrollador trabaja con commits pequeños en su rama — P1/OBLIGATORIO.
- Los conflictos se resuelven en la rama de la feature (`git pull origin main` o rebase), nunca directamente en `main` — P0/OBLIGATORIO.
- `git rebase` interactivo para limpiar historia local antes de abrir PR es **AVANZADO/opcional**; no se exige a estudiantes que aún no lo dominan, pero se recomienda aprenderlo.
- Nunca se hace `git push --force` sobre `main`/`develop` — P0/OBLIGATORIO. `--force-with-lease` sobre la propia rama de feature es aceptable.

## 7. Branch protection (configuración del repositorio)

| Regla de protección en `main` | Configuración |
|---|---|
| Requiere Pull Request antes de merge | Sí |
| Requiere al menos 1 revisión aprobada | Sí |
| Requiere que los checks de CI pasen | Sí (lint, tests, build) |
| Prohíbe force-push | Sí |
| Prohíbe borrar la rama | Sí |
| Incluye administradores en las restricciones | Recomendado que sí (incluso el docente/tech lead sigue el flujo) |

## 8. Releases (si aplica)
Dado el alcance académico, no se exige un flujo de releases semántico completo. Si el proyecto entrega versiones formales (ej. para presentación de avances), se etiqueta con `git tag vX.Y.Z` sobre `main` — P3/AVANZADO.

## 9. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Formato de commit | Automática | Commitlint (hook o CI) |
| Naming de branch | Automática (parcial, regex en CI) + manual | Acción de CI + Code Review |
| PR con aprobación y CI verde | Automática | Branch protection rules de GitHub |
| No push directo a `main` | Automática | Branch protection rules |
| Tamaño de PR razonable | Manual | Code Review |

## 10. Referencias
- conventionalcommits.org
- [Doc. 07](/estandares/07-code-review/) — Code Review.
- `config-examples/` — plantillas de PR e Issue.
