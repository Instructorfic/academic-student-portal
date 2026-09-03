---
title: Archivos de configuración listos para copiar
description: Los archivos de config-examples/ del handbook — .gitignore, editorconfig, workflows de CI, plantillas de PR/Issue, Pint, PHPStan, ESLint, Prettier y commitlint — para copiar al repositorio del proyecto.
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Cómo se usan]
Cada archivo va en la ruta indicada **dentro del repositorio de tu proyecto**
(no en este portal). Las rutas del tipo `docs/handbook/…` que aparecen dentro
de algunos de estos archivos se refieren a la copia del handbook en *tu*
repositorio; ajústalas si tu proyecto la coloca en otra ruta. Revisa el major
vigente de cada GitHub Action al inicio del semestre.
:::


## Contenido

- `.gitignore` — Ignora entorno y secretos, artefactos de build y archivos de editor/SO.
- `.editorconfig` — Fin de línea, charset e indentación consistentes entre editores.
- `CODEOWNERS` — Quién revisa por defecto cada ruta del repositorio.
- `commitlint.config.js` — Valida que los commits sigan Conventional Commits (Doc. 06).
- `backend/pint.json` — Estilo de código PHP con Laravel Pint (Doc. 02).
- `backend/phpstan.neon` — Análisis estático con PHPStan/Larastan, nivel 5 (Doc. 02).
- `frontend/eslint.config.js` — ESLint 9+ (flat config) para el frontend (Doc. 03).
- `frontend/.prettierrc.json` — Formato de JS/CSS/HTML con Prettier (Doc. 03).
- `.github/PULL_REQUEST_TEMPLATE.md` — Plantilla de Pull Request (Doc. 06, Doc. 07).
- `.github/ISSUE_TEMPLATE/bug.md` — Plantilla de Issue para reportar un bug.
- `.github/ISSUE_TEMPLATE/historia.md` — Plantilla de Issue para una historia de usuario.
- `.github/workflows/backend-ci.yml` — Pipeline de CI del backend: lint, análisis estático, migraciones, tests, secret scanning (Doc. 11).
- `.github/workflows/frontend-ci.yml` — Pipeline de CI del frontend: lint y formato (Doc. 11).
- `.github/workflows/secret-scan.yml` — Escaneo de secretos con Gitleaks en cada push/PR (Doc. 09, Doc. 11).
- `CONTRIBUTING.md` — Resumen operativo del flujo de trabajo para nuevos integrantes (Doc. 10).
- `SECURITY.md` — Cómo reportar una vulnerabilidad (Doc. 09, Doc. 10).
- `README.md` — Plantilla de README del proyecto del equipo (Doc. 10).


## `.gitignore`

Ignora entorno y secretos, artefactos de build y archivos de editor/SO.

````bash
# --- Entorno y secretos ---
.env
.env.*
!.env.example

# --- Backend (Laravel/PHP) ---
backend/vendor/
backend/storage/*.key
backend/storage/logs/*.log
backend/storage/framework/cache/*
backend/storage/framework/sessions/*
backend/storage/framework/views/*
backend/bootstrap/cache/*.php
backend/.phpunit.result.cache
backend/coverage/

# --- Frontend (JS) ---
frontend/node_modules/
frontend/dist/
frontend/build/
frontend/.cache/

# --- Editor / SO ---
.vscode/
.idea/
.DS_Store
Thumbs.db

# --- Logs generales ---
*.log
npm-debug.log*
````

## `.editorconfig`

Fin de línea, charset e indentación consistentes entre editores.

````ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4

[*.{js,jsx,ts,tsx,json,css,scss,html,yml,yaml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
````

## `CODEOWNERS`

Quién revisa por defecto cada ruta del repositorio.

````text
# Cada línea define quién debe revisar cambios en esa ruta.
# Ajustar los usuarios de GitHub reales de cada equipo.

/backend/       @tech-lead-backend
/frontend/      @tech-lead-frontend
/database/      @tech-lead-backend @tech-lead-db
/docs/handbook/ @docente-arquitecto
/.github/       @docente-arquitecto
````

## `commitlint.config.js`

Valida que los commits sigan Conventional Commits (Doc. 06).

````js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'build', 'ci'],
    ],
    'subject-case': [0],
  },
};
````

## `backend/pint.json`

Estilo de código PHP con Laravel Pint (Doc. 02).

````json
{
  "preset": "laravel",
  "rules": {
    "no_unused_imports": true,
    "ordered_imports": { "sort_algorithm": "alpha" },
    "single_quote": true,
    "trailing_comma_in_multiline": true,
    "no_empty_statement": true
  }
}
````

## `backend/phpstan.neon`

Análisis estático con PHPStan/Larastan, nivel 5 (Doc. 02).

````yaml
includes:
    - vendor/larastan/larastan/extension.neon

parameters:
    paths:
        - app
        - routes
        - database
    level: 5
    tmpDir: storage/framework/phpstan
    ignoreErrors: []
    # 'tests' puede añadirse aquí cuando el equipo quiera análisis estático también sobre las pruebas.
    # Nota: en Laravel 11+ no existe app/Console/Kernel.php (la consola se define en routes/console.php).
````

## `frontend/eslint.config.js`

ESLint 9+ (flat config) para el frontend (Doc. 03).

````js
// Copiar a la raíz del frontend como `eslint.config.js` (ESLint 9+, "flat config").
// devDependencies necesarias: eslint, @eslint/js, globals
//   npm i -D eslint @eslint/js globals
// ESLint 9 dejó `.eslintrc.*` como formato heredado; este proyecto usa flat config.

import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-implicit-globals': 'error',
    },
  },
];
````

## `frontend/.prettierrc.json`

Formato de JS/CSS/HTML con Prettier (Doc. 03).

````json
{
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always"
}
````

## `.github/PULL_REQUEST_TEMPLATE.md`

Plantilla de Pull Request (Doc. 06, Doc. 07).

````md
<!-- El TÍTULO de este PR debe seguir Conventional Commits, p. ej.:
     feat(invoices): agregar endpoint para crear factura
     Con "Squash and merge" ese título es el mensaje del commit que queda en main (Doc. 06, STD-GIT-PR07). -->

## Descripción
<!-- ¿Qué cambia este PR y por qué? -->

## Issue relacionado
Closes #

## Tipo de cambio
- [ ] feat (nueva funcionalidad)
- [ ] fix (corrección de bug)
- [ ] docs
- [ ] refactor
- [ ] test
- [ ] chore/build/ci

## Cómo probarlo
<!-- Pasos concretos para que el reviewer verifique el cambio -->
1.
2.

## Checklist del autor (Doc. 13, Checklist C)
- [ ] Corrí lint + tests localmente y pasan
- [ ] Agregué/actualicé tests (Doc. 08)
- [ ] Actualicé documentación relevante (README/API/ADR) si aplica
- [ ] Autorevisé mi propio diff
- [ ] Este PR no mezcla cambios no relacionados

## Excepción al estándar (si aplica)
<!-- Si este PR se salta alguna regla RECOMENDADO/OBLIGATORIO, explica por qué -->
````

## `.github/ISSUE_TEMPLATE/bug.md`

Plantilla de Issue para reportar un bug.

````md
---
name: Reporte de bug
about: Reportar un defecto en el sistema
labels: bug
---

## Descripción del problema
<!-- Qué pasa vs. qué debería pasar -->

## Pasos para reproducir
1.
2.
3.

## Comportamiento esperado

## Comportamiento actual

## Entorno
- Rama/versión:
- Navegador/PHP version (si aplica):

## Evidencia (capturas, logs)
````

## `.github/ISSUE_TEMPLATE/historia.md`

Plantilla de Issue para una historia de usuario.

````md
---
name: Historia de usuario / tarea
about: Nueva funcionalidad o tarea de desarrollo
labels: historia
---

## Historia
Como <rol>, quiero <funcionalidad>, para <objetivo>.

## Criterios de aceptación
- [ ]
- [ ]
- [ ]

## Notas técnicas
<!-- Módulo afectado, dependencias, decisiones ya tomadas -->

## Definition of Done aplicable
Ver Doc. 12 del handbook (`docs/handbook/12-DEFINITION-OF-DONE.md`)
````

## `.github/workflows/backend-ci.yml`

Pipeline de CI del backend: lint, análisis estático, migraciones, tests, secret scanning (Doc. 11).

````yaml
# Revisar el major vigente de cada action al inicio de cada semestre (checkout, setup-node, setup-php, gitleaks-action).
# gitleaks-action@v2: en repos de una ORGANIZACION requiere el secreto GITLEAKS_LICENSE; en repos personales es gratuito.
name: backend-ci
on:
  pull_request:
    paths: ["backend/**"]
  push:
    branches: [main]
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
          coverage: pcov

      - name: Instalar dependencias
        run: composer install --prefer-dist --no-progress
        working-directory: backend

      - name: Preparar entorno
        run: |
          cp .env.example .env
          php artisan key:generate
        working-directory: backend

      - name: Lint / formato (Pint)
        run: vendor/bin/pint --test
        working-directory: backend

      - name: Análisis estático (PHPStan/Larastan)
        run: vendor/bin/phpstan analyse
        working-directory: backend

      - name: Migraciones (ida y vuelta, valida reversibilidad)
        run: |
          php artisan migrate --force
          php artisan migrate:rollback --force
          php artisan migrate --force
        working-directory: backend
        env:
          DB_CONNECTION: pgsql
          DB_HOST: localhost
          DB_PORT: 5432
          DB_DATABASE: testing
          DB_USERNAME: postgres
          DB_PASSWORD: secret

      - name: Tests
        run: php artisan test --coverage --min=0
        working-directory: backend
        env:
          DB_CONNECTION: pgsql
          DB_HOST: localhost
          DB_PORT: 5432
          DB_DATABASE: testing
          DB_USERNAME: postgres
          DB_PASSWORD: secret

      - name: Secret scanning
        uses: gitleaks/gitleaks-action@v2
````

## `.github/workflows/frontend-ci.yml`

Pipeline de CI del frontend: lint y formato (Doc. 11).

````yaml
# Revisar el major vigente de cada action al inicio de cada semestre (checkout, setup-node, setup-php, gitleaks-action).
name: frontend-ci
on:
  pull_request:
    paths: ["frontend/**"]
  push:
    branches: [main]
    paths: ["frontend/**"]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v5
        with:
          node-version: "20"

      - name: Instalar dependencias
        run: npm ci
        working-directory: frontend

      - name: Lint (ESLint)
        run: npx eslint . --max-warnings=0
        working-directory: frontend

      - name: Formato (Prettier)
        run: npx prettier --check .
        working-directory: frontend
````

## `.github/workflows/secret-scan.yml`

Escaneo de secretos con Gitleaks en cada push/PR (Doc. 09, Doc. 11).

````yaml
# Revisar el major vigente de cada action al inicio de cada semestre (checkout, setup-node, setup-php, gitleaks-action).
# gitleaks-action@v2: en repos de una ORGANIZACION requiere el secreto GITLEAKS_LICENSE; en repos personales es gratuito.
name: secret-scan
on:
  pull_request:
  push:
    branches: [main]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
````

## `CONTRIBUTING.md`

Resumen operativo del flujo de trabajo para nuevos integrantes (Doc. 10).

````md
# Cómo trabajamos aquí

Este proyecto sigue el **Engineering Handbook** completo en `docs/handbook/`. Este archivo es el resumen operativo.

## Flujo de trabajo (resumen)
1. Toma una tarea del tablero (Issues). Revisa `docs/handbook/13-CHECKLISTS.md`, Checklist A.
2. Crea una rama: `feature/<ID>-descripcion-corta` desde `main`.
3. Trabaja, haz commits siguiendo Conventional Commits (`feat:`, `fix:`, `docs:`, etc.). Checklist B antes de cada commit.
4. Antes de abrir tu Pull Request, revisa el Checklist C.
5. Abre el PR usando la plantilla. Espera al menos 1 aprobación y CI en verde.
6. El reviewer aplica el Checklist D (`docs/handbook/07-ESTANDAR-CODE-REVIEW.md`).
7. Al fusionar (squash and merge), revisa el Checklist E.
8. Antes de marcar la tarea como terminada, revisa el Checklist F / Definition of Done (`docs/handbook/12-DEFINITION-OF-DONE.md`).

## Reglas que nunca se rompen (P0)
- Nunca subas secretos al repositorio.
- Nunca hagas push directo a `main`.
- El código en `main` siempre debe compilar y pasar CI.

## ¿Dudas sobre una regla?
Pregunta antes de improvisar. Si crees que una regla del estándar debería cambiar, abre un Issue con la etiqueta `estandar` (ver `docs/handbook/01-ESTANDAR-GENERAL.md`, sección 9).

## Documentos clave
- `docs/handbook/17-REGLAS-DE-ORO.md` — las 20 reglas que todos deben recordar.
- `docs/handbook/13-CHECKLISTS.md` — checklists operativos del día a día.
- `docs/handbook/00-INDICE-Y-ARQUITECTURA-DOCUMENTAL.md` — mapa completo del handbook.
````

## `SECURITY.md`

Cómo reportar una vulnerabilidad (Doc. 09, Doc. 10).

````md
# Política de Seguridad

## Reportar una vulnerabilidad
Si detectas una vulnerabilidad de seguridad (secretos expuestos, inyección, acceso indebido, etc.):

1. **No** la publiques en un Issue público.
2. Notifícala directamente al Tech Lead del equipo y/o al docente responsable por el canal privado acordado (correo institucional / mensaje directo).
3. Incluye: qué encontraste, cómo reproducirlo, impacto estimado.

## Alcance
Este proyecto es de carácter académico. El objetivo de este documento es fomentar la práctica profesional de divulgación responsable, no gestionar un programa de bug bounty.

## Referencia
Ver `docs/handbook/09-ESTANDAR-SEGURIDAD.md` para las prácticas de seguridad exigidas en el proyecto.
````

## `README.md`

Plantilla de README del proyecto del equipo (Doc. 10).

````md
# <Nombre del Proyecto>

Proyecto integrador — Licenciatura en Informática, 9.º semestre.

## Stack tecnológico
- **Backend:** PHP 8.3 + Laravel, API REST, arquitectura monolítica modular.
- **Bases de datos:** PostgreSQL (principal) + MongoDB (solo en módulos justificados, ver `docs/architecture/adr/`).
- **Frontend:** HTML5, CSS3, JavaScript ES6+ (módulos nativos).
- **CI/CD:** GitHub Actions (lint, análisis estático, tests, secret scanning).

## Requisitos previos
- PHP >= 8.3, Composer
- Node.js >= 20, npm
- PostgreSQL >= 16
- MongoDB >= 7 (solo si el módulo correspondiente lo usa)

## Instalación
Ver `docs/setup/installation.md` para la guía completa. Resumen:
```bash
git clone <url-del-repo>
cd <repo>/backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Ejecutar tests
```bash
cd backend
php artisan test
```

## Estructura del repositorio
```
backend/    # API Laravel
frontend/   # HTML/CSS/JS
database/   # Scripts/documentación adicional de BD
docs/       # Documentación completa, incluido el Engineering Handbook
.github/    # Workflows de CI, plantillas de PR e Issue
```

## Cómo contribuir
Ver `CONTRIBUTING.md` y el Engineering Handbook completo en `docs/handbook/`.

## Equipo
| Integrante | Rol |
|---|---|
| | |
````
