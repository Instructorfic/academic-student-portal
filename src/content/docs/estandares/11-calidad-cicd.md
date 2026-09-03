---
title: "DOC-11 · Estándar de calidad y CI/CD"
description: "Pipeline mínimo obligatorio, qué bloquea el merge y ejemplos de workflows de GitHub Actions."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-CI |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Automatizar todo lo automatizable para que ningún PR llegue a revisión humana con errores que una máquina puede detectar en segundos.

## 2. Pipeline mínimo obligatorio (orden de ejecución)

```
1. Checkout del código
2. Instalar dependencias (composer install, npm ci)
3. Lint (Pint --test, ESLint)
4. Format check (Pint --test también cubre esto; Prettier --check)
5. Análisis estático (PHPStan/Larastan)
6. Tests (PHPUnit/Pest; opcional: Jest si hay tests JS)
7. Build (si el frontend requiere bundling; en la Opción A puede no aplicar)
8. Chequeos de seguridad (Gitleaks; opcional: composer audit / npm audit)
9. Deploy (solo si el proyecto llega a esa fase; fuera del alcance obligatorio del semestre salvo que se defina)
```

Cada paso que falla **detiene el pipeline** y bloquea el merge (para pasos marcados como obligatorios en la tabla de la sección 4).

## 3. Herramientas por stack

| Stack | Lint | Formato | Análisis estático | Tests |
|---|---|---|---|---|
| Backend (PHP/Laravel) | Laravel Pint (incluye lint de estilo) | Laravel Pint | PHPStan / Larastan | PHPUnit o Pest |
| Frontend (JS/CSS/HTML) | ESLint 9+ (flat config, `eslint.config.js`) | Prettier | (opcional, AVANZADO: TypeScript si se adopta) | Opcional/AVANZADO (Jest/Vitest) |

No se imponen herramientas adicionales (ej. SonarQube completo) salvo que un equipo decida adoptarlas y lo justifique — quedan como **AVANZADO/opcional**.

## 4. Qué bloquea el merge

| Paso del pipeline | ¿Bloquea merge? | Prioridad |
|---|---|---|
| Lint / formato | Sí | P1 |
| Análisis estático (errores, no solo warnings) | Sí | P1 |
| Tests | Sí | P0 |
| Build | Sí (si aplica) | P1 |
| Secret scanning | Sí | P0 |
| Auditoría de dependencias | No (se reporta) | P2 |
| Cobertura | No (se reporta, ver [Doc. 08](/estandares/08-pruebas/)) | P2 |

## 5. Ejemplo de workflow (GitHub Actions) — Backend

> Los workflows completos y actualizados viven en `config-examples/.github/workflows/`. Este ejemplo es una versión resumida para lectura; al montar el proyecto se copian los de `config-examples/`, no este fragmento. Revisar el major vigente de cada action al inicio de cada semestre.

```yaml
name: backend-ci
on:
  pull_request:
    paths: ["backend/**"]

jobs:
  quality:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: secret
          POSTGRES_DB: testing
        ports: ["5432:5432"]
        options: >-
          --health-cmd="pg_isready" --health-interval=10s --health-timeout=5s --health-retries=5
    steps:
      - uses: actions/checkout@v5
      - uses: shivammathur/setup-php@v2
        with:
          php-version: "8.3"
      - run: composer install --prefer-dist --no-progress
        working-directory: backend
      - run: cp .env.example .env && php artisan key:generate
        working-directory: backend
      - name: Lint / formato (Pint)
        run: vendor/bin/pint --test
        working-directory: backend
      - name: Análisis estático (PHPStan)
        run: vendor/bin/phpstan analyse
        working-directory: backend
      - name: Tests
        run: php artisan test
        working-directory: backend
      - name: Secret scanning
        uses: gitleaks/gitleaks-action@v2
```

## 6. Ejemplo de workflow — Frontend

```yaml
name: frontend-ci
on:
  pull_request:
    paths: ["frontend/**"]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: "20"
      - run: npm ci
        working-directory: frontend
      - name: Lint
        run: npx eslint . --max-warnings=0
        working-directory: frontend
      - name: Formato
        run: npx prettier --check .
        working-directory: frontend
```

## 7. Definition of "pipeline verde" para el proyecto completo
Un PR está listo para revisión humana solo cuando **todos** los jobs relevantes a las carpetas modificadas están en verde. No se revisa manualmente un PR con CI en rojo (ahorra tiempo de revisión a algo que la máquina ya detectó).

## 8. Qué NO se automatiza (y por qué)
- Revisión de arquitectura y diseño (¿esta lógica debería ser un Service?): requiere criterio humano.
- Coherencia de nombres con el dominio del negocio (una variable puede estar "bien nombrada" técnicamente y aun así no reflejar el concepto real).
- Decisiones de UX/diseño visual.
- Evaluación de si una excepción a una regla está bien justificada.

## 9. Matriz Manual/Automática (resumen operativo)

| Regla | Manual/Automática | Herramienta | Momento |
|---|---|---|---|
| Formateo (backend) | Automática | Pint | CI + pre-commit local opcional |
| Formateo (frontend) | Automática | Prettier | CI |
| Lint (frontend) | Automática | ESLint | CI |
| Análisis estático (backend) | Automática | PHPStan/Larastan | CI |
| Tests | Automática | PHPUnit/Pest | CI |
| Secretos en el repo | Automática | Gitleaks | CI + pre-push opcional |
| Formato de commit | Automática | Commitlint | Hook local / CI |
| Naming de clases/variables (semántico) | Parcial | Análisis estático (sintaxis) + Code Review (semántica) | PR |
| Arquitectura y capas | Manual | Code Review | PR |
| Documentación actualizada | Manual | Checklist de PR | PR |
| Cobertura de pruebas | Automática (reporte) | PCOV/Xdebug | CI (informativo) |

## Reglas con ID (resumen)

Para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-CI-01 | El repositorio tiene el pipeline mínimo obligatorio de la sección 2 en `.github/workflows/`. | P0 | 2 |
| STD-CI-02 | Lint / formato bloquean el merge. | P1 | 4 |
| STD-CI-03 | El análisis estático (errores) bloquea el merge. | P1 | 4 |
| STD-CI-04 | Los tests bloquean el merge. | P0 | 4 |
| STD-CI-05 | El build bloquea el merge cuando aplica. | P1 | 4 |
| STD-CI-06 | El secret scanning bloquea el merge. | P0 | 4 |
| STD-CI-07 | Un PR con CI en rojo no pasa a revisión humana ni se fusiona. | P0 | 7 |

## 10. Verificación de este documento
La existencia y funcionamiento del pipeline se verifica revisando que `.github/workflows/` contenga los workflows descritos y que el historial de PRs muestre checks ejecutados consistentemente.

## 11. Referencias
- [Doc. 06](/estandares/06-git/) — Git (branch protection).
- [Doc. 08](/estandares/08-pruebas/) — Pruebas.
- [Doc. 09](/estandares/09-seguridad/) — Seguridad (secret scanning, auditoría de dependencias).
- `config-examples/` — workflows completos listos para copiar.
