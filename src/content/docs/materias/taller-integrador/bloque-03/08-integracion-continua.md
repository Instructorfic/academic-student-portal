---
title: "8. Integración continua"
description: "Bloque III de Taller Integrador — pipeline de GitLab CI, etapas, base de datos para pruebas, secretos en CI y calidad del repositorio."
---

**Temas del programa:** 3.5

## Integrar poco y seguido

<div class="grid-2">

<div class="card accent-rojo"><strong>MR grande</strong><p>40 archivos que nadie revisa a fondo y conflictos con todos</p></div>
<div class="card accent-verde"><strong>MR pequeño</strong><p>5 archivos que se revisan en una sentada</p></div>

</div>

<div class="callout">

Integración continua — integrar con frecuencia y verificar <strong>automáticamente</strong> cada integración

</div>

<p class="small">Humble y Farley Continuous Delivery 2010</p>

## Lo que hoy haces a mano

```bash
composer install
cp .env.example .env && php artisan key:generate
vendor/bin/pint --test
php artisan migrate && php artisan migrate:rollback && php artisan migrate
php artisan test
```

<div class="grid-2">

<div class="card accent-rojo"><strong>A mano</strong><p>Alguien lo olvida · funciona en mi máquina</p></div>
<div class="card accent-verde"><strong>Automático</strong><p>Se ejecuta en cada push en una máquina limpia</p></div>

</div>

<div class="banner-node">

Un pipeline es esta lista escrita para que la ejecute una máquina

</div>

## El vocabulario

| Término | Qué es |
| --- | --- |
| Pipeline | Todo lo que se ejecuta por un push |
| Etapa (*stage*) | Un grupo de trabajos · empieza si la anterior pasó |
| Trabajo (*job*) | Una tarea con sus comandos |
| Runner | La máquina que ejecuta los trabajos |
| `.gitlab-ci.yml` | El archivo en la raíz que lo describe |

## Paso 1 — el pipeline más pequeño

```yaml
# .gitlab-ci.yml
hola:
  image: php:8.3-cli
  script:
    - php -v
    - echo "El pipeline funciona"
```

<div class="callout">

Un trabajo · una imagen · dos comandos · si alguno termina con error el trabajo queda en rojo

</div>

<p class="small">En GitLab Build · Pipelines muestra cada ejecución y su registro</p>

## Paso 2 — etapas y trabajos

```yaml
stages:
  - calidad
  - pruebas

estilo:
  stage: calidad
  script:
    - vendor/bin/pint --test

pruebas:
  stage: pruebas
  script:
    - php artisan test
```

<div class="callout-alcance">

Si estilo falla pruebas ni siquiera empieza · el error más barato se detecta primero

</div>

## Paso 3 — no repetir la preparación

```yaml
.php:
  image: php:8.3-cli
  before_script:
    - composer install --prefer-dist --no-progress --no-interaction
    - cp .env.example .env
    - php artisan key:generate

estilo:
  extends: .php
  stage: calidad
  script:
    - vendor/bin/pint --test
```

<p class="small">Un trabajo que empieza con punto es una plantilla · extends la hereda · el equivalente de compilar en PHP</p>

## Paso 4 — una base de datos para las pruebas

```yaml
variables:
  POSTGRES_DB: reservafic_testing
  POSTGRES_USER: reservafic
  # POSTGRES_PASSWORD vive en Settings · CI/CD · Variables
  DB_CONNECTION: pgsql
  DB_HOST: postgres
  DB_PASSWORD: $POSTGRES_PASSWORD

pruebas:
  extends: .php
  stage: pruebas
  services:
    - postgres:16
  script:
    - php artisan migrate --force
    - php artisan test
```

<div class="callout-alcance">

El servicio es un PostgreSQL desechable · se crea para el trabajo y desaparece al terminar

</div>

## Los secretos también en CI

<div class="grid-2">

<div class="card accent-rojo"><strong>En el YAML</strong><p>DB_PASSWORD: clave123 · queda en el repositorio y en cada copia</p></div>
<div class="card accent-verde"><strong>En variables de CI/CD</strong><p>Masked se oculta en el log · Protected solo en ramas protegidas</p></div>

</div>

<div class="banner-node">

El mismo principio que con .env — el archivo describe · el secreto se inyecta

</div>

## El pipeline del proyecto

```text
calidad   ── estilo     → vendor/bin/pint --test
          └─ secretos   → detección de secretos sobre todo el historial
pruebas   ── pruebas    → migrate · rollback · migrate · php artisan test
                          contra un PostgreSQL efímero
```

<div class="callout-alcance">

El runner usa imágenes de contenedor — construirlas es tema del Bloque IV

</div>

## Leer un trabajo en rojo

```text
$ php artisan test
   FAIL  Tests\Feature\Repositories\EloquentPrestamoRepositoryTest
  x detecta traslape de horarios with data set "contenido dentro del existente"
  Failed asserting that false is identical to true.

Tests:  1 failed, 7 passed
ERROR: Job failed: exit code 1
```

<div class="grid-3">

<div class="card accent-azul"><strong>Qué trabajo</strong><p>pruebas</p></div>
<div class="card accent-dorado"><strong>Qué caso</strong><p>El nombre del data set</p></div>
<div class="card accent-rojo"><strong>Qué esperaba</strong><p>true y obtuvo false</p></div>

</div>

<p class="small">Salida simplificada · lee de abajo hacia arriba hasta encontrar la primera falla</p>

## El pipeline decide

<div class="grid-2">

<div class="card accent-azul"><strong>Rama main protegida</strong><p>Nadie hace push directo</p></div>
<div class="card accent-verde"><strong>Pipelines must succeed</strong><p>Un MR en rojo no se integra</p></div>

</div>

<div class="callout-alcance">

En GitLab Free las aprobaciones no bloquean · nadie integra su propio MR sin aprobación por acuerdo del equipo

</div>

## El experimento

<div class="grid-3">

<div class="card accent-rojo"><strong>1</strong><p>Cambien &lt; por &lt;= en la consulta de traslape</p></div>
<div class="card accent-dorado"><strong>2</strong><p>Abran un MR</p></div>
<div class="card accent-verde"><strong>3</strong><p>El pipeline queda en rojo y el botón Merge se deshabilita</p></div>

</div>

<div class="banner-node">

La prueba de traslape impide sin intervención humana que el defecto regrese

</div>

## Lo que la máquina no revisa

<div class="grid-2">

<div class="card accent-verde"><strong>El pipeline sí</strong><p>Estilo · pruebas · migraciones · secretos</p></div>
<div class="card accent-dorado"><strong>La revisión humana sí</strong><p>Si la lógica está en la capa correcta · si el nombre refleja el dominio · si falta un caso</p></div>

</div>

<div class="callout">

Ninguna sustituye a la otra · STD-CI §8

</div>

## Calidad del repositorio

| Elemento | Qué muestra |
| --- | --- |
| Historial | Conventional Commits legibles |
| Issues | Cada historia o defecto con su issue |
| Merge requests | Closes #N · revisión con severidad · pipeline verde |
| Documentación | README · docs/api · docs/adr · CHANGELOG |

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 5 — Integración continua con GitLab CI](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-5-integracion-continua/).

</div>

## Qué sigue

Continúa con [9. Cierre y resumen](/materias/taller-integrador/bloque-03/09-cierre-y-resumen/).
