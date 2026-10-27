---
title: "Laboratorio 5 — Integración continua con GitLab CI"
description: "Bloque III de Taller Integrador — pipeline de GitLab CI que ejecuta las pruebas en cada cambio y bloquea la integración si fallan."
---

## 1. Propósito

Ya tienen pruebas. La pregunta incómoda es: ¿quién las ejecuta?

Si depende de que cada integrante se acuerde de correr `php artisan
test` antes de abrir un merge request, tarde o temprano alguien no lo
hará, y un cambio que rompe el defecto que corrigieron en el
Laboratorio 3 llegará a `main`.

La **integración continua** (*continuous integration*, CI) resuelve
eso: cada vez que alguien sube un cambio, un servidor ejecuta
automáticamente las mismas validaciones, en un ambiente limpio, y el
resultado aparece en el merge request. Si algo falla, el cambio **no se
puede integrar**.

El estándar lo resume así: ningún merge request debe llegar a revisión
humana con errores que una máquina puede detectar en segundos
([`11-ESTANDAR-CALIDAD-CICD.md`](/recursos/estandares/11-estandar-calidad-cicd/) §1).

---

## 2. ¿Qué vamos a lograr?

```text
☐ Un archivo .gitlab-ci.yml con un pipeline de tres trabajos: estilo, pruebas y secretos.
☐ Pruebas ejecutadas contra un PostgreSQL efímero creado por el pipeline.
☐ Migraciones validadas de ida y vuelta en cada cambio.
☐ Detección de secretos sobre todo el historial.
☐ Credenciales del pipeline guardadas como variables de CI/CD, no en el YAML.
☐ La rama main protegida y la regla "Pipelines must succeed" activada.
☐ Un merge request bloqueado a propósito por un pipeline en rojo.
☐ Plantilla de merge request y repositorio ordenado (historial, issues, documentación).
☐ Etiqueta v0.2.0 y CHANGELOG del incremento del bloque.
```

---

## 3. Antes de comenzar

```text
Laboratorios 1 a 4 completos; `php artisan test` en verde localmente.
Rol Maintainer en el proyecto de GitLab (al menos una persona del equipo) para configurar la protección de ramas.
Runners disponibles: en Settings > CI/CD > Runners debe aparecer al menos un runner activo.
```

> **Runners.** Un *runner* es el programa que ejecuta los trabajos del
> pipeline. En gitlab.com existen runners compartidos, pero su uso puede
> requerir validar la cuenta o tener una cuota de minutos
> (pendiente de verificación con la cuenta que use el curso). Si su GitLab es institucional, pregunten
> al docente qué runner usar.

```bash
git checkout main
git pull origin main
git checkout -b ci/pipeline-inicial
```

---

## 4. Conceptos mínimos

### 4.1 Pipeline, etapa y trabajo

```text
Pipeline (se ejecuta en cada push)
├── etapa: calidad
│     ├── trabajo: estilo      → ¿el código respeta el estilo de Laravel?
│     └── trabajo: secretos    → ¿hay contraseñas o tokens en el historial?
└── etapa: pruebas
      └── trabajo: pruebas     → ¿las migraciones van y vuelven? ¿pasa la suite?
```

Los trabajos de una misma etapa corren en paralelo; una etapa empieza
cuando la anterior terminó bien. Cada trabajo corre en un ambiente
nuevo y limpio: si funciona ahí, no depende de nada que esté solo en la
computadora de alguien.

### 4.2 ¿Y la compilación?

El contenido oficial 3.5.2 menciona compilación. PHP no se compila
antes de ejecutarse; en un proyecto Laravel, el equivalente es
**instalar dependencias y preparar la aplicación** (`composer install`,
`.env`, `key:generate`): si eso falla, nada más puede correr. Si su
proyecto compila recursos de frontend con Vite, agreguen un trabajo con
`npm ci` y `npm run build` (opcional en este bloque).

### 4.3 Lo que la máquina no revisa

El pipeline no sabe si la lógica pertenece al Service, si un nombre
refleja el dominio o si una excepción al estándar está justificada.
Eso sigue siendo trabajo de la revisión de código
([`11-ESTANDAR-CALIDAD-CICD.md`](/recursos/estandares/11-estandar-calidad-cicd/) §8). CI y revisión humana se
complementan; ninguna sustituye a la otra.

---

## 5. Paso 1 — Variables de CI/CD (secretos del pipeline)

El pipeline necesita una contraseña para el PostgreSQL efímero. Aunque
sea una base desechable, la práctica correcta es no escribirla en el
YAML.

En GitLab: **Settings > CI/CD > Variables > Add variable**:

| Clave | Valor | Opciones |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | Una cadena aleatoria de al menos 8 caracteres | *Masked* (oculta en los registros del pipeline) |

GitLab entrega las variables de CI/CD tanto a los trabajos como a los
servicios que estos levantan.

---

## 6. Paso 2 — Modelo con ReservaFIC: `.gitlab-ci.yml`

Creen `.gitlab-ci.yml` en la **raíz** del repositorio (ahí vive su
proyecto Laravel):

```yaml
# Pipeline de integración continua — Bloque III
# Referencias: 11-ESTANDAR-CALIDAD-CICD.md; docs.gitlab.com/ci/services/postgres/

stages:
  - calidad
  - pruebas

variables:
  POSTGRES_DB: reservafic_testing
  POSTGRES_USER: reservafic
  # POSTGRES_PASSWORD se define en Settings > CI/CD > Variables (masked)
  DB_CONNECTION: pgsql
  DB_HOST: postgres
  DB_PORT: "5432"
  DB_DATABASE: reservafic_testing
  DB_USERNAME: reservafic
  DB_PASSWORD: $POSTGRES_PASSWORD

.php:
  image: php:8.3-cli
  cache:
    key:
      files:
        - composer.lock
    paths:
      - vendor/
  before_script:
    - apt-get update -qq
    - apt-get install -y -qq git unzip libpq-dev libzip-dev > /dev/null
    - docker-php-ext-install pdo_pgsql zip > /dev/null
    - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
    - composer install --prefer-dist --no-progress --no-interaction
    - cp .env.example .env
    - php artisan key:generate

estilo:
  extends: .php
  stage: calidad
  script:
    - vendor/bin/pint --test

secretos:
  stage: calidad
  image:
    name: zricethezav/gitleaks:v8.21.2
    entrypoint: [""]
  variables:
    GIT_DEPTH: "0"
  script:
    - gitleaks git --redact --verbose

pruebas:
  extends: .php
  stage: pruebas
  services:
    - postgres:16
  script:
    - php artisan migrate --force
    - php artisan migrate:rollback --force
    - php artisan migrate --force
    - php artisan test
```

Lean el archivo por partes:

| Parte | Qué hace | Regla del estándar |
| --- | --- | --- |
| `variables` | Configura la conexión a la base del pipeline. Laravel da prioridad a las variables de ambiente sobre las del `.env`, así que estas ganan | — |
| `.php` | Plantilla reutilizable: imagen de PHP, extensión de PostgreSQL, Composer y preparación de Laravel. Los trabajos la heredan con `extends` | Paso 2 del pipeline mínimo |
| `cache` | Reutiliza `vendor/` entre ejecuciones mientras `composer.lock` no cambie | — |
| `estilo` | Falla si algún archivo no cumple el estilo de Laravel | `STD-CI-02` |
| `secretos` | Revisa **todo el historial** (`GIT_DEPTH: "0"`) en busca de secretos y falla si encuentra alguno | `STD-SEC-03`, `STD-CI-06` |
| `services: postgres:16` | Levanta un PostgreSQL desechable, accesible con el nombre de host `postgres` | `STD-TEST` §6 |
| `migrate` / `rollback` / `migrate` | Prueba que las migraciones son reversibles | `STD-DB-M01` |
| `php artisan test` | Ejecuta la suite completa | `STD-CI-04` (P0) |

> **Imágenes de contenedor.** El runner ejecuta cada trabajo dentro de
> una imagen (`php:8.3-cli`, `postgres:16`). Aquí solo las **usan**;
> cómo funcionan y cómo construir las propias es el tema del Bloque IV.

> **Versión de Gitleaks.** La etiqueta `v8.21.2` y el subcomando
> `gitleaks git` deben verificarse contra la documentación oficial de
> Gitleaks al inicio del semestre (pendiente de verificación). En
> versiones anteriores a la 8.19 el subcomando equivalente es
> `gitleaks detect --source . --redact --verbose`. Como alternativa,
> GitLab ofrece la plantilla `Jobs/Secret-Detection.gitlab-ci.yml`,
> disponible en el plan Free; verifiquen si en su plan el trabajo falla
> al encontrar un secreto antes de usarla como sustituto.

---

## 7. Paso 3 — Primer pipeline (y probablemente primer rojo)

Antes de subir, ejecuten localmente lo mismo que hará el pipeline:

```bash
vendor/bin/pint --test
php artisan test
```

Lo más probable es que `pint --test` falle: el código de los bloques
anteriores nunca pasó por el formateador. Corríjanlo en un commit
propio, separado de cualquier cambio de lógica:

```bash
vendor/bin/pint
git add -A
git commit -m "style: aplicar Laravel Pint al proyecto"
```

Suban el pipeline:

```bash
git add .gitlab-ci.yml
git commit -m "ci: agregar pipeline de estilo, pruebas y secretos"
git push -u origin ci/pipeline-inicial
```

En GitLab: **Build > Pipelines**.

#### Punto de control 1

El pipeline de su rama aparece con tres trabajos. Abran el trabajo
`pruebas` y localicen en el registro: la conexión a PostgreSQL, el
`rollback` sin errores y el resumen de la suite.

Si algún trabajo falla, **lean el registro antes de cambiar nada**
(sección 12). Diagnosticar antes de corregir es parte de la práctica.

---

## 8. Paso 4 — Proteger `main` y exigir pipeline verde

Con rol Maintainer:

1. **Settings > Repository > Protected branches**, rama `main`:
   * *Allowed to merge:* Developers + Maintainers.
   * *Allowed to push and merge:* No one.

   Así, nadie puede hacer `git push` directo a `main`: todo cambio entra
   por merge request.
2. **Settings > Merge requests > Merge checks:** activen **Pipelines
   must succeed** y guarden. A partir de ahora GitLab no permite
   integrar un MR si su pipeline falló.

> **Sobre las aprobaciones.** En el plan Free de GitLab un integrante
> puede presionar *Approve* en un MR, pero las aprobaciones son
> opcionales y no bloquean la integración; las reglas de aprobación
> obligatoria requieren Premium o Ultimate (documentación de GitLab,
> "Merge request approvals"). La regla del estándar "al menos un
> reviewer distinto del autor aprueba" (`STD-CR-06`) se cumple en este
> curso **por acuerdo del equipo**: nadie integra su propio MR sin una
> aprobación de otra persona. La rúbrica lo verifica en el historial.

---

## 9. Paso 5 — Ver a CI bloquear un cambio

Este paso es un experimento controlado. No lo integren.

1. Desde `ci/pipeline-inicial`, creen una rama de prueba:

```bash
git checkout -b experimento/romper-traslape
```

2. En `EloquentPrestamoRepository::existeConflicto`, cambien `'<'` por
   `'<='` (reintroducen el error de contigüidad).
3. Suban y abran un MR hacia `main`:

```bash
git commit -am "experimento: reintroducir defecto de contiguidad"
git push -u origin experimento/romper-traslape
```

#### Punto de control 2

El pipeline del MR queda en rojo; el trabajo `pruebas` muestra
exactamente qué casos fallaron. El botón de *Merge* está deshabilitado
con un aviso de que el pipeline debe completarse con éxito.

Capturen la pantalla del MR bloqueado. Después **cierren el MR sin
integrarlo** y borren la rama:

```bash
git checkout ci/pipeline-inicial
git branch -D experimento/romper-traslape
git push origin --delete experimento/romper-traslape
```

La prueba que escribieron en el Laboratorio 3 acaba de impedir, sin
intervención humana, que un defecto conocido regrese a `main`.

---

## 10. Paso 6 — Calidad del repositorio (3.5.3)

### 10.1 Plantilla de merge request

Adapten `recursos/estandares/config-examples/PULL_REQUEST_TEMPLATE.md`
a `.gitlab/merge_request_templates/Default.md`. Cambien las menciones
de "PR" por "MR". Al crear un MR, elijan la plantilla en el selector de
descripción.

### 10.2 Revisión del estado del repositorio

Revisen con el equipo y corrijan lo que falte:

| Elemento | Pregunta de verificación |
| --- | --- |
| Historial | ¿Los commits del bloque siguen Conventional Commits? ¿Se entiende la historia leyendo `git log --oneline`? |
| Issues | ¿Cada historia o defecto trabajado en el bloque tiene un issue? ¿Los MR los cierran con `Closes #N`? |
| Merge requests | ¿Cada MR tiene descripción, cómo probarlo y al menos un comentario de revisión? |
| Documentación | ¿`README.md` explica cómo instalar con PostgreSQL y cómo correr pruebas? ¿Existen `docs/api/` y `docs/adr/`? |
| Configuración | ¿`.env.example` está completo? ¿Hay un `CONTRIBUTING.md` con el flujo de ramas y MR? |

### 10.3 Definition of Done actualizada

Agreguen a la Definition of Done del equipo (Bloque II, Actividad A3)
los criterios que este bloque hizo verificables:

```text
[ ] El pipeline de CI está en verde (STD-DOD-04).
[ ] La funcionalidad tiene pruebas de éxito y de error (STD-DOD-02).
[ ] Si tocó la base de datos, la migración es reversible (STD-DOD-09).
[ ] Si tocó la API, el endpoint está documentado en docs/api/ (STD-DOD-10).
[ ] Otra persona aprobó el MR antes de integrarlo (STD-DOD-06).
```

---

## 11. Paso 7 — Cerrar el incremento: `v0.2.0`

Integren el MR `ci/pipeline-inicial` (con su pipeline en verde y una
aprobación). Después, en `main`:

1. Creen o actualicen `CHANGELOG.md`:

```markdown
## [0.2.0] - AAAA-MM-DD
### Added
- API REST /api/v1 con autenticación por token.
- Persistencia en PostgreSQL con llaves foráneas y restricciones.
- Pruebas unitarias y de integración.
- Policies por rol y por dueño; límite de intentos de login.
- Pipeline de integración continua en GitLab.
### Fixed
- Detección de traslape de préstamos (#14).
```

2. Etiqueten la versión (misma práctica que `v0.1.0` en el Bloque II).
   Es una versión MENOR nueva porque agrega funcionalidad sin romper la
   anterior para sus usuarios:

```bash
git checkout main
git pull origin main
git tag -a v0.2.0 -m "Incremento del Bloque III: API, persistencia, pruebas, seguridad y CI"
git push origin v0.2.0
```

---

## 12. Troubleshooting

| Síntoma en el registro del pipeline | Diagnóstico | Solución |
| --- | --- | --- |
| El pipeline queda en *pending* indefinidamente | No hay runner disponible | Settings > CI/CD > Runners; consulten al docente |
| `could not translate host name "postgres"` | El trabajo no declaró `services` o se escribió distinto | Verifiquen `services: - postgres:16` en el trabajo `pruebas` |
| `password authentication failed` | `POSTGRES_PASSWORD` no está definida como variable de CI/CD | Paso 1 |
| `database "reservafic_testing" does not exist` | `POSTGRES_DB` y `DB_DATABASE` no coinciden con `phpunit.xml` | Los tres valores deben ser iguales |
| `pint --test` falla en archivos que nadie tocó | Código previo sin formatear | Paso 3: commit `style:` separado |
| `gitleaks: unknown command "git"` | Versión de Gitleaks anterior a la 8.19 | Usen `gitleaks detect --source . --redact --verbose` |
| `secretos` falla con un hallazgo | Hay un secreto en algún commit del historial | No lo ignoren: identifiquen el secreto (aparece enmascarado), **rótenlo** y avisen al docente (`STD-SEC-04`) |
| Las variables masked no se aceptan | El valor no cumple los requisitos de enmascaramiento de GitLab | Usen una cadena más larga, sin espacios |

---

## 13. Evidencia del laboratorio

```text
A. .gitlab-ci.yml integrado en main.
B. Captura del pipeline en verde con los tres trabajos.
C. Captura de la configuración de rama protegida y de "Pipelines must succeed".
D. Captura del MR bloqueado por el pipeline en rojo (Punto de control 2).
E. Plantilla de MR en .gitlab/merge_request_templates/.
F. Definition of Done actualizada.
G. CHANGELOG.md y etiqueta anotada v0.2.0.
```

---

## 14. Reflexión del equipo

1. ¿Cuántos problemas detectó el pipeline la primera vez que lo
   ejecutaron? ¿Cuántos habrían llegado a `main` sin él?
2. ¿Qué validación agregarían al pipeline en el siguiente sprint? (Por
   ejemplo, análisis estático con PHPStan/Larastan o `composer audit`,
   [`11-ESTANDAR-CALIDAD-CICD.md`](/recursos/estandares/11-estandar-calidad-cicd/) §2.)
3. Si el pipeline tarda 6 minutos, ¿cómo cambia eso la forma en que el
   equipo hace commits y merge requests?

---

## 15. Reto adicional (opcional)

Agreguen un trabajo `auditoria` en la etapa `calidad` que ejecute
`composer audit`. El estándar indica que la auditoría de dependencias
**se reporta pero no bloquea** ([`11-ESTANDAR-CALIDAD-CICD.md`](/recursos/estandares/11-estandar-calidad-cicd/) §4):
investiguen la opción `allow_failure` de GitLab CI para lograrlo.

---

## 16. Criterio de finalización

```text
☐ Pipeline con estilo, secretos y pruebas, en verde sobre main.
☐ Pruebas contra PostgreSQL efímero; migraciones de ida y vuelta validadas.
☐ Ninguna credencial escrita en .gitlab-ci.yml.
☐ main protegida; "Pipelines must succeed" activo.
☐ Evidencia de un MR bloqueado por CI.
☐ Plantilla de MR, README, docs/api, docs/adr y CHANGELOG actualizados.
☐ Definition of Done actualizada.
☐ Etiqueta anotada v0.2.0 publicada.
```

---

## 17. Cierre del bloque

Con los cinco laboratorios completos, su sistema:

```text
persiste en PostgreSQL con integridad garantizada por el motor   (Lab 1)
expone una API REST versionada, documentada y autenticada        (Lab 2)
está vigilado por pruebas unitarias y de integración              (Lab 3)
aplica permisos, límites y manejo seguro de secretos y errores    (Lab 4)
no acepta cambios que rompan nada de lo anterior                  (Lab 5)
```

En el Bloque IV van a empaquetar este mismo sistema en contenedores,
ejecutarlo de forma reproducible con Docker Compose y desplegarlo. El
pipeline que construyeron hoy se extenderá para construir imágenes; no
se reemplazará.
