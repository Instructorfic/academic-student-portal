---
title: "Laboratorio 2 — Tu sistema en una imagen: Dockerfile"
description: "Bloque IV de Taller Integrador — escribir, medir y mejorar el Dockerfile del proyecto hasta una imagen multietapa publicada desde el pipeline."
---

## 1. Propósito

En el Laboratorio 1 usaste imágenes hechas por otros. Ahora escribirás
la receta de **tu propia imagen**: un `Dockerfile` que empaque tu
sistema Laravel con la versión exacta de PHP, las extensiones, las
dependencias y el código.

No vas a llegar directo a la versión buena. Primero escribirás una
versión ingenua, la medirás y descubrirás sus problemas (uno de ellos,
grave: tus contraseñas dentro de la imagen). Después la mejorarás paso
a paso hasta llegar al `Dockerfile` multietapa del tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/). Así
cada línea de la versión final tendrá una razón que viste con tus
propios ojos.

---

## 2. ¿Qué vamos a lograr?

```text
☐ Un primer Dockerfile funcional y la medición de sus problemas.
☐ Un .dockerignore que deja fuera secretos, .git y dependencias locales.
☐ Un Dockerfile multietapa con etapas dependencias, base, desarrollo y produccion.
☐ La imagen de producción corriendo con configuración por variables de entorno, conectada a PostgreSQL.
☐ Logs visibles con docker logs y health check en estado healthy.
☐ La imagen publicada en el Container Registry de GitLab con versión.
☐ Un trabajo de CI que construye y publica la imagen al crear una etiqueta.
☐ README con instrucciones para construir la imagen.
```

---

## 3. Antes de comenzar

```text
Laboratorio 1 terminado.
Tu proyecto en main con la suite del Bloque III en verde.
composer.lock versionado en el repositorio (si no existe, el Dockerfile no puede instalar versiones exactas).
```

Revisa qué versión de PHP exige tu proyecto:

```text
$ grep '"php"' composer.json
        "php": "^8.2",
```

La imagen usará PHP 8.3. Si tu `composer.json` exige una versión que
8.3 no cumple, avisa al docente: la versión de PHP del curso todavía no
está fijada.

```bash
git checkout main
git pull origin main
git checkout -b build/dockerfile
```

---

## 4. Paso 1 — Calentamiento: ver la caché en acción (15 min)

Fuera de tu proyecto, en una carpeta temporal `calentamiento/`, crea
`hola.php` y `Dockerfile` como en el tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/):

```php
<?php
$nombre = getenv('NOMBRE') ?: 'mundo';
echo "Hola, {$nombre}. PHP " . PHP_VERSION . PHP_EOL;
```

```dockerfile
FROM php:8.3-cli
RUN apt-get update && apt-get install -y --no-install-recommends cowsay && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY hola.php .
CMD ["php", "hola.php"]
```

```text
$ docker build -t calentamiento:1 .
```

Anota cuánto tardó. Cambia el texto de `hola.php` y reconstruye:

```text
$ docker build -t calentamiento:2 .
```

Observa en la salida las líneas `CACHED`. **Predice y explica:** ¿qué
pasaría con el tiempo si movieras `COPY hola.php .` **antes** del
`RUN apt-get`? Hazlo y compruébalo. Regresa el orden original.

> `cowsay` está aquí solo para tener una instrucción lenta que se note
> en la caché.

---

## 5. Paso 2 — Primera versión: ingenua (20 min)

En la **raíz de tu proyecto**, crea `Dockerfile` con esta primera
versión. Tiene errores a propósito.

```dockerfile
# Versión 1 — INGENUA. No es la versión final.
FROM php:8.3-apache

RUN apt-get update
RUN apt-get install -y libpq-dev unzip git
RUN docker-php-ext-install pdo_pgsql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite

COPY . /var/www/html
WORKDIR /var/www/html
RUN composer install
RUN chown -R www-data:www-data storage bootstrap/cache
```

```text
$ docker build -t reservafic:ingenua .
$ docker image ls reservafic
```

Anota el tamaño. Ahora investiga la imagen:

```text
$ docker run --rm reservafic:ingenua cat .env
$ docker run --rm reservafic:ingenua ls vendor/bin
$ docker run --rm reservafic:ingenua du -sh .git
$ docker run --rm reservafic:ingenua php -r 'echo ini_get("display_errors"), PHP_EOL;'
```

Completa esta tabla en la descripción de tu merge request:

| Pregunta | Respuesta | ¿Es un problema? ¿Por qué? |
| --- | --- | --- |
| ¿Está tu `.env` dentro de la imagen? | | |
| ¿Hay herramientas de desarrollo (`phpunit`) en `vendor/bin`? | | |
| ¿Cuánto pesa la carpeta `.git` dentro de la imagen? | | |
| ¿Están Composer y `git` dentro de la imagen final? | | |
| ¿Cuántas capas crean los tres `RUN apt-get`? ¿Se limpió la caché de apt? | | |
| Si cambias un controlador, ¿se repite `composer install`? | | |
| ¿Qué configuración de PHP usa (desarrollo o producción)? | | |

**El hallazgo más grave es el primero.** Si esa imagen se publicara,
cualquiera que la descargue tendría tu `APP_KEY` y la contraseña de tu
base. Es el mismo problema de "secretos en el repositorio" del Bloque
III (3.4.3), ahora en imágenes.

> **No publiques nunca la imagen `reservafic:ingenua`.** Elimínala al
> terminar el laboratorio: `docker image rm reservafic:ingenua`.

---

## 6. Paso 3 — `.dockerignore` (10 min)

Crea `.dockerignore` en la raíz:

```text
# Control de versiones y editores
.git
.gitignore
.gitlab-ci.yml
.gitlab
.idea
.vscode

# Secretos y configuración local: NUNCA dentro de la imagen
.env
.env.*
!.env.example

# Dependencias: se instalan dentro de la imagen
vendor
node_modules

# Archivos generados en ejecución
storage/logs/*.log
storage/framework/cache/data/*
storage/framework/sessions/*
storage/framework/views/*.php
bootstrap/cache/*.php

# Archivos de Docker, documentación y pruebas de carga
Dockerfile
compose*.yaml
docker
docs
pruebas-carga
```

Reconstruye la versión ingenua y repite la primera prueba:

```text
$ docker build -t reservafic:ingenua .
$ docker run --rm reservafic:ingenua cat .env
cat: .env: No such file or directory
```

**Explica:** ¿por qué se ignora `vendor` si la aplicación lo necesita?
(Pista: ¿de dónde sale `vendor` dentro de la imagen?)

---

## 7. Paso 4 — Versión final: multietapa (30 min)

Reemplaza todo el `Dockerfile` por la versión del tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/). La copias
aquí completa para que no tengas que cambiar de documento:

```dockerfile
# syntax=docker/dockerfile:1

# =====================================================================
# Etapa 1 — dependencias: el "taller". Instala las librerías de PHP.
# =====================================================================
FROM php:8.3-cli AS dependencias

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader \
    --prefer-dist --no-interaction --no-progress

COPY . .
RUN composer dump-autoload --optimize --no-dev

# =====================================================================
# Etapa 2 — base: PHP + Apache configurados para Laravel.
# =====================================================================
FROM php:8.3-apache AS base

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite

WORKDIR /var/www/html

# =====================================================================
# Etapa 3 — desarrollo: el código llega por bind mount (Lab 3).
# =====================================================================
FROM base AS desarrollo

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# =====================================================================
# Etapa 4 — produccion: imagen final. Última etapa = la que se
# construye por defecto.
# =====================================================================
FROM base AS produccion

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY --from=dependencias --chown=www-data:www-data /app /var/www/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD curl -fsS http://localhost/up || exit 1
```

Construye la etapa de producción con la versión del bloque:

```text
$ docker build --target produccion -t reservafic:0.3.0 .
$ docker image ls reservafic
```

### 7.1 Comprobaciones

Repite la investigación del paso 2 sobre la imagen nueva y completa la
segunda columna:

| Pregunta | Ingenua | Multietapa |
| --- | --- | --- |
| Tamaño | | |
| `.env` dentro | | |
| `phpunit` en `vendor/bin` | | |
| `.git` dentro | | |
| Composer dentro (`docker run --rm reservafic:0.3.0 which composer`) | | |
| `display_errors` | | |

Verifica que `curl` existe en la imagen (lo usa el `HEALTHCHECK`):

```text
$ docker run --rm reservafic:0.3.0 curl --version
```

> Si este comando falla, la imagen base cambió y no trae `curl`.
> Agrégalo en la etapa `base` junto a `libpq-dev`
> (`apt-get install -y --no-install-recommends libpq-dev curl`) y
> avisa al docente para corregir el material.

Comprueba la caché: cambia una línea de un controlador y reconstruye.

```text
$ docker build --target produccion -t reservafic:0.3.0-prueba .
```

¿Se repitió `composer install`? Debe aparecer `CACHED` en esa línea.

### 7.2 Lee tu Dockerfile en voz alta

En pareja, uno lee cada bloque del `Dockerfile` y el otro explica **por
qué** está ahí usando la tabla del tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/). Si alguna línea no
tiene explicación, pregunten al docente antes de seguir. El objetivo
del bloque no es copiar este archivo: es poder defender cada línea
(actividad A3 y evaluación técnica).

#### Punto de control 1

```text
☐ La imagen multietapa no contiene .env, .git, Composer ni phpunit.
☐ La imagen multietapa pesa menos que la ingenua (anota la diferencia).
☐ Cambiar código no repite composer install.
☐ Puedo explicar qué hace cada etapa.
```

---

## 8. Paso 5 — Ejecutar la imagen con configuración externa (25 min)

La imagen no trae `.env`. Toda la configuración llega por variables de
entorno al crear el contenedor (tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)).

### 8.1 Una base de datos para la prueba

```text
$ docker network create lab02_red
$ docker run -d --name lab02-db --network lab02_red \
    -e POSTGRES_USER=reservafic -e POSTGRES_PASSWORD=solo-lab02 -e POSTGRES_DB=reservafic \
    postgres:16
```

### 8.2 Una llave de aplicación

```text
$ docker run --rm reservafic:0.3.0 php artisan key:generate --show
base64:Q3VhbHF1aWVyIGNvc2EgYWxlYXRvcmlhIGRlIDMyIGJ5dGVz...
```

`--show` imprime una llave nueva sin escribirla en ningún archivo.
Cópiala.

### 8.3 Arrancar la aplicación

Crea un archivo **fuera del repositorio**, por ejemplo
`~/lab02.env` (contiene secretos de práctica; no lo agregues a Git):

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:PEGA-AQUI-LA-LLAVE
APP_URL=http://localhost:8080
DB_CONNECTION=pgsql
DB_HOST=lab02-db
DB_PORT=5432
DB_DATABASE=reservafic
DB_USERNAME=reservafic
DB_PASSWORD=solo-lab02
LOG_CHANNEL=stderr
```

```text
$ docker run -d --name lab02-app --network lab02_red -p 8080:80 \
    --env-file ~/lab02.env reservafic:0.3.0
$ docker exec lab02-app php artisan migrate --force
```

Observa `DB_HOST=lab02-db`: el nombre del contenedor de la base, como
en el Laboratorio 1 (§10).

### 8.4 Probar

```text
$ curl -i http://localhost:8080/up
HTTP/1.1 200 OK
...
```

Crea un usuario para probar la API. La imagen de producción no tiene
Faker (es dependencia de desarrollo), así que no podemos usar el
seeder; usamos `tinker` con datos explícitos:

```text
$ docker exec lab02-app php artisan tinker --execute="App\Models\User::create(['name'=>'Prueba','email'=>'prueba@reservafic.test','password'=>'cambia-esta-clave'])"
```

```text
$ curl -s -X POST http://localhost:8080/api/v1/login \
    -H "Accept: application/json" -H "Content-Type: application/json" \
    -d '{"email":"prueba@reservafic.test","password":"cambia-esta-clave"}'
{"data":{"token":"1|...","tipo":"Bearer","expira_en":"..."}}
```

La misma API del Bloque III, ahora servida desde un contenedor que no
sabe nada de tu computadora.

> Si tu proyecto no usa `tinker` o su modelo de usuario es distinto,
> adapta este paso. Si `laravel/tinker` no está en `require` de tu
> `composer.json`, no estará en la imagen de producción.

---

## 9. Paso 6 — Logs y health check (10 min)

### 9.1 Logs de acceso

```text
$ curl -s http://localhost:8080/api/v1/no-existe -H "Accept: application/json"
$ docker logs lab02-app --tail 5
```

Verás las líneas de acceso de Apache: cada petición, con su código de
respuesta.

### 9.2 Un error real

Provoca una falla de infraestructura: detén la base de datos y vuelve a
intentar el login.

```text
$ docker stop lab02-db
$ curl -s -X POST http://localhost:8080/api/v1/login \
    -H "Accept: application/json" -H "Content-Type: application/json" \
    -d '{"email":"prueba@reservafic.test","password":"cambia-esta-clave"}'
$ docker logs lab02-app --tail 20
```

Compara las dos salidas:

* El **cliente** recibe un error 500 genérico, sin detalles: así debe
  ser con `APP_DEBUG=false` (Bloque III, 3.4.4, exposición de
  información).
* Los **logs** muestran el detalle (`SQLSTATE...`, el host que no
  respondió). Ahí es donde diagnosticas.

**Explica:** ¿por qué con `LOG_CHANNEL=stderr` el error aparece en
`docker logs` y no en `storage/logs/laravel.log`? ¿Qué pasaría con ese
archivo al eliminar el contenedor? (Tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/), nota sobre
`LOG_CHANNEL`.)

### 9.3 Health check

Con la base todavía detenida, espera un minuto y revisa:

```text
$ docker ps
CONTAINER ID   IMAGE              ...   STATUS
...            reservafic:0.3.0   ...   Up 4 minutes (healthy)

$ docker inspect --format '{{json .State.Health}}' lab02-app
```

**Predice y explica:** ¿cambió el estado? `/up` responde 200 si
Laravel **arrancó** sin errores; no comprueba la base de datos a menos
que lo programes (documentación de Laravel, "The Health Route", evento
`DiagnosingHealth`). ¿Qué significa eso para un health check en
producción? Anota la respuesta: la usarás en el análisis del Lab 5.

```text
$ docker start lab02-db
```

---

## 10. Paso 7 — Publicar en el Container Registry de GitLab (15 min)

### 10.1 Token de acceso

En GitLab, en tu perfil: **Preferences > Access tokens** (o **Access
tokens** según la versión), crea un token personal con los permisos
`read_registry` y `write_registry` y una fecha de expiración cercana
(el fin del semestre). Guárdalo en tu gestor de contraseñas: GitLab no
lo vuelve a mostrar.

> Nunca escribas el token en un archivo del repositorio ni en la
> bitácora.

### 10.2 Iniciar sesión, etiquetar y subir

Busca la ruta de tu registry en GitLab: **Deploy > Container
Registry** del proyecto. Tiene la forma
`registry.gitlab.com/<grupo>/<proyecto>`.

```text
$ docker login registry.gitlab.com -u <tu-usuario>
Password: (pega el token)
Login Succeeded

$ docker tag reservafic:0.3.0 registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.1
$ docker push registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.1
```

Usamos `0.3.0-rc.1` (*release candidate*): la versión `0.3.0` se
publicará al cerrar el bloque, cuando todo esté terminado. Así respetas
la regla de no reutilizar etiquetas (tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)).

Recarga **Deploy > Container Registry**: verás la imagen y su
etiqueta.

### 10.3 Comprobar desde otra máquina

Pide a otro integrante que, en su computadora:

```text
$ docker login registry.gitlab.com -u <su-usuario>
$ docker pull registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.1
$ docker run --rm registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.1 php -v
```

Su PHP local no importa: el de la imagen es 8.3.

---

## 11. Paso 8 — Construir y publicar desde el pipeline (15 min)

Publicar a mano depende de que alguien se acuerde y de la computadora
de esa persona. El pipeline del Bloque III ya prueba cada cambio; ahora
también construirá la imagen oficial al crear una etiqueta.

En `.gitlab-ci.yml`, agrega la etapa y el trabajo:

```yaml
stages:
  - calidad
  - pruebas
  - publicacion

# ... (trabajos estilo, secretos y pruebas del Bloque III sin cambios)

imagen:
  stage: publicacion
  image: docker:24.0.5-cli
  services:
    - docker:24.0.5-dind
  variables:
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_CERTDIR: "/certs"
  before_script:
    - echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
  script:
    - VERSION="${CI_COMMIT_TAG#v}"
    - docker build --target produccion -t "$CI_REGISTRY_IMAGE:$VERSION" .
    - docker push "$CI_REGISTRY_IMAGE:$VERSION"
  rules:
    - if: $CI_COMMIT_TAG =~ /^v\d+\.\d+\.\d+(-rc\.\d+)?$/
```

Explicación en el tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/). Puntos clave:

* Las variables `CI_REGISTRY*` las crea GitLab: **no** guardes tu token
  personal en el pipeline.
* Las versiones `docker:24.0.5-cli` y `docker:24.0.5-dind` son las que
  usa el ejemplo de la documentación de GitLab consultada; existen
  versiones más recientes (pendiente de verificación de la versión que
  fije el curso). El cliente y el servicio deben usar la misma versión.
* Al etiquetar, el pipeline corre también estilo, secretos y pruebas.
  Si alguno falla, la etapa `publicacion` no se ejecuta: **no se
  publica una imagen que no pasó las pruebas**.

Integra el merge request y prueba con una etiqueta candidata:

```bash
git checkout main
git pull origin main
git tag -a v0.3.0-rc.2 -m "Candidata: imagen construida en CI"
git push origin v0.3.0-rc.2
```

En **Build > Pipelines** aparecerá un pipeline para la etiqueta, con la
etapa `publicacion`. Al terminar, `0.3.0-rc.2` aparecerá en el
registry.

> **Si el trabajo falla con un error sobre `privileged` o no puede
> conectarse a `docker:2376`.** El runner no permite Docker-in-Docker. Avisa al docente. Mientras se resuelve,
> la publicación manual del paso 7 es la evidencia válida y el trabajo
> de CI queda como pendiente documentado en el merge request.

---

## 12. Si tu proyecto usa Vite

Si tus vistas usan `@vite(...)` y necesitas `npm run build`, agrega una
etapa de Node y copia solo el resultado:

```dockerfile
# Antes de la etapa "base"
FROM node:22-slim AS recursos
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
```

Y en la etapa `produccion`, después del `COPY --from=dependencias`:

```dockerfile
COPY --from=recursos --chown=www-data:www-data /app/public/build /var/www/html/public/build
```

Node y `node_modules` no llegan a la imagen final: solo los archivos
compilados. Es el mismo principio del taller de carpintería (tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)). La etiqueta `node:22-slim` debe verificarse contra la versión de
Node que usa tu proyecto.

---

## 13. Paso 9 — Tu proyecto y el README (10 min)

Si trabajaste con ReservaFIC, repite los pasos 4 a 8 en el proyecto de
tu equipo. Adapta:

* Extensiones de PHP que use tu proyecto además de `pdo_pgsql` (por
  ejemplo, `gd` para imágenes; ver `docker-php-ext-install` en la
  página oficial de la imagen `php`).
* Nombres de base, usuario y rutas.

Agrega al `README.md` una sección:

```markdown
## Imagen de contenedor

Construir la imagen de producción:

    docker build --target produccion -t <proyecto>:<version> .

La imagen no contiene `.env`. La configuración se pasa con variables de
entorno; la lista completa está en `.env.example`.

Imágenes publicadas: GitLab > Deploy > Container Registry. Se publican
automáticamente al crear una etiqueta `vX.Y.Z`.
```

```bash
git add Dockerfile .dockerignore .gitlab-ci.yml README.md
git commit -m "build(docker): agregar Dockerfile multietapa y publicación de imagen en CI"
git push -u origin build/dockerfile
```

---

## 14. Troubleshooting

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `COPY failed: file not found ... composer.lock` | `composer.lock` no está versionado o está en `.dockerignore` | Ejecuta `composer install` localmente y versiona `composer.lock` |
| `Your requirements could not be resolved ... php` | La versión de PHP de la imagen no cumple `composer.json` | Revisa `"php"` en `composer.json` y avisa al docente |
| `could not find driver` al migrar | Falta `pdo_pgsql` | Revisa la etapa `base` |
| `No application encryption key has been specified` | Falta `APP_KEY` | Paso 8.2 |
| `SQLSTATE[08006] ... could not translate host name` | `DB_HOST` no coincide con el nombre del contenedor, o están en redes distintas | `docker network inspect lab02_red` |
| `The stream or file "storage/logs/laravel.log" could not be opened` | Falta `LOG_CHANNEL=stderr` o permisos de `storage` | Revisa el archivo de variables y el `--chown` |
| 404 en todas las rutas excepto `/` | `mod_rewrite` no activo o `DocumentRoot` mal configurado | Revisa `a2enmod rewrite` y las líneas `sed` |
| 403 Forbidden en `/` | Apache sirve una carpeta sin `index.php` | El `APACHE_DOCUMENT_ROOT` debe terminar en `/public` |
| `(unhealthy)` en `docker ps` | `/up` no responde 200 | `docker logs`; prueba `docker exec lab02-app curl -i http://localhost/up` |
| `denied: access forbidden` al hacer push | Token sin `write_registry` o ruta de registry incorrecta | Revisa el token y la ruta en Deploy > Container Registry |
| El trabajo `imagen` no aparece en el pipeline | Se ejecutó en una rama, no en una etiqueta, o la etiqueta no cumple el formato | Solo corre con etiquetas `vX.Y.Z` o `vX.Y.Z-rc.N` |
| `error during connect ... docker:2376` en CI | Runner sin modo privilegiado | Paso 11, nota final |

---

## 15. Evidencia del laboratorio

```text
☐ Tabla comparativa ingenua vs. multietapa en la descripción del merge request.
☐ Dockerfile multietapa y .dockerignore en el repositorio.
☐ Salida de docker ps con la aplicación (healthy) y del login exitoso contra el contenedor.
☐ Respuesta a la pregunta del paso 9.3 sobre lo que /up comprueba.
☐ Imagen 0.3.0-rc.N visible en el Container Registry.
☐ Pipeline de etiqueta con la etapa publicacion (o una nota si el runner no permite Docker-in-Docker).
☐ README actualizado.
☐ Merge request revisado e integrado.
```

---

## 16. Reflexión del equipo

1. ¿Qué problema de la versión ingenua les habría costado más caro si
   llegaba a producción?
2. ¿Qué línea del `Dockerfile` les costó más entender? ¿Ya la pueden
   explicar?
3. ¿Qué ventaja tiene que el pipeline publique la imagen, en lugar de
   un integrante?

---

## 17. Reto adicional (opcional)

1. **Usuario sin privilegios.** Investiga cómo hacer que Apache escuche
   en el puerto 8080 y agrega `USER www-data` en la etapa `produccion`.
   Documenta qué cambia en los puertos.
2. **Nginx + PHP-FPM.** Reemplaza `php:8.3-apache` por `php:8.3-fpm` y
   un segundo contenedor `nginx`, con la configuración de Nginx de la
   documentación de Laravel ("Deployment"). Compara tamaños y
   complejidad.
3. **Alpine.** Construye una variante con `php:8.3-apache` sustituida
   por una base Alpine y compara tamaño y tiempo de construcción.
4. **Health check completo.** Escucha el evento `DiagnosingHealth` en
   Laravel para que `/up` falle si la base de datos no responde.

---

## 18. Criterio de finalización

```text
☐ docker build --target produccion construye sin errores en la computadora de dos integrantes distintos.
☐ La imagen corre con configuración solo por variables de entorno y responde /up con 200.
☐ La imagen no contiene secretos (comprobado).
☐ Hay una imagen versionada en el registry de GitLab.
☐ El equipo puede explicar cada línea del Dockerfile.
```

Siguiente: en el Laboratorio 3 dejarás de escribir comandos `docker run`
largos. Docker Compose levantará todo el ambiente con uno solo.
