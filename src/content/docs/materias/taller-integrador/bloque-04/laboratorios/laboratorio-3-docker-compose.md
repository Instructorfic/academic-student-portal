---
title: "Laboratorio 3 — Ambiente reproducible con Docker Compose"
description: "Bloque IV de Taller Integrador — describir el ambiente en archivos de Compose versionados y comprobar que otro integrante lo levanta desde un clon limpio."
---

## 1. Propósito

Tu proyecto ya tiene imagen. Pero para trabajar todavía necesitas
crear una red, arrancar PostgreSQL con cinco opciones, arrancar la
aplicación con otras cinco y acordarte del orden. Si cada integrante lo
hace a mano, volvemos al "en mi máquina sí funciona".

En este laboratorio escribirás ese ambiente **una sola vez**, en
archivos de Compose versionados, y lo pondrás a prueba de la forma más
honesta posible: **otro integrante** lo levantará desde un clon limpio,
sin ayuda.

---

## 2. ¿Qué vamos a lograr?

```text
☐ compose.yaml con los servicios app y db, health check y orden de arranque.
☐ compose.override.yaml para desarrollo: código en vivo, puertos y Adminer.
☐ Base de pruebas creada automáticamente la primera vez.
☐ La suite del Bloque III ejecutándose dentro del ambiente.
☐ Haber roto el ambiente a propósito y saber qué sobrevive.
☐ La imagen de producción ejecutándose localmente con la misma base.
☐ Matriz de configuración por ambiente documentada.
☐ Prueba de clon limpio superada por un integrante distinto del autor.
```

---

## 3. Antes de comenzar

```text
Laboratorio 2 integrado: Dockerfile con las etapas desarrollo y produccion.
Imagen reservafic:0.3.0 (o la de tu proyecto) construida localmente.
```

Elimina los contenedores del Lab 2 para liberar el puerto 8080:

```text
$ docker rm -f lab02-app lab02-db
$ docker network rm lab02_red
```

```bash
git checkout main
git pull origin main
git checkout -b build/compose
```

---

## 4. Paso 1 — Calentamiento: tu primer `compose.yaml` (15 min)

En una carpeta temporal `calentamiento-compose/`, crea `compose.yaml`
(el del tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/)):

```yaml
services:
  web:
    image: nginx:1.27
    ports:
      - "8090:80"

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: ejemplo
    volumes:
      - datos:/var/lib/postgresql/data

volumes:
  datos:
```

```text
$ docker compose up -d
$ docker compose ps
$ docker network ls | grep calentamiento
$ docker volume ls | grep calentamiento
```

**Predice:** ¿cómo se llaman la red y el volumen? ¿De dónde sale ese
nombre? (Tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/).)

Comprueba que `web` llega a `db` por nombre, sin puertos publicados:

```text
$ docker compose exec web getent hosts db
```

Ahora los dos comandos de apagado. **Predice antes de cada uno** qué
queda:

```text
$ docker compose down
$ docker volume ls | grep calentamiento
$ docker compose up -d
$ docker compose down -v
$ docker volume ls | grep calentamiento
```

Anota la diferencia entre `down` y `down -v`. **Nunca** uses `-v` en un
servidor con datos reales.

---

## 5. Paso 2 — `compose.yaml`: lo común (20 min)

En la raíz de tu proyecto, crea `compose.yaml`:

```yaml
# Definición común de ReservaFIC (desarrollo, pruebas locales y producción)
name: reservafic

services:
  app:
    image: ${APP_IMAGE:-reservafic:local}
    env_file: .env
    environment:
      DB_CONNECTION: pgsql
      DB_HOST: db
      DB_PORT: "5432"
      LOG_CHANNEL: stderr
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ${DB_DATABASE:-reservafic}
      POSTGRES_USER: ${DB_USERNAME:-reservafic}
      POSTGRES_PASSWORD: ${DB_PASSWORD:?Define DB_PASSWORD en .env}
    volumes:
      - datos_pg:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped

volumes:
  datos_pg:
```

Cambia `reservafic` por el nombre de tu proyecto en `name:` y en los
valores por defecto.

Lee el archivo con la tabla:

| Línea | Qué hace | Tema |
| --- | --- | --- |
| `name: reservafic` | Fija el nombre del proyecto: red `reservafic_default`, volumen `reservafic_datos_pg` | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `image: ${APP_IMAGE:-reservafic:local}` | Usa la imagen que diga `APP_IMAGE`; si no está definida, `reservafic:local` | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `env_file: .env` | Laravel recibe todas las variables de tu `.env` | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `environment: DB_HOST: db` | Corrige el host solo dentro del contenedor (tu `.env` dice `127.0.0.1`) | [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/) |
| `LOG_CHANNEL: stderr` | Logs visibles en `docker compose logs` | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `${DB_PASSWORD:?...}` | Si falta la contraseña, Compose se detiene con un mensaje claro | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `healthcheck` + `condition: service_healthy` | `app` no arranca hasta que PostgreSQL acepta conexiones | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `$${POSTGRES_USER}` | El `$$` evita que Compose sustituya; lo hace el shell del contenedor | [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) |
| `restart: unless-stopped` | Si el proceso muere o el servidor se reinicia, Docker lo vuelve a arrancar | — |

No hay `ports:` ni `build:`: eso depende del ambiente (pasos 3 y 7).

Verifica que el archivo es válido y mira cómo lo interpreta Compose:

```text
$ docker compose -f compose.yaml config
```

Si tu `.env` no tiene `DB_PASSWORD`, verás el mensaje de error que
definiste. Agrégalo y repite.

---

## 6. Paso 3 — `compose.override.yaml`: desarrollo (15 min)

Crea `compose.override.yaml`:

```yaml
# Desarrollo. Compose lo combina automáticamente con compose.yaml.
services:
  app:
    build:
      context: .
      target: desarrollo
    volumes:
      - ./:/var/www/html
    ports:
      - "8080:80"
    environment:
      APP_ENV: local
      APP_DEBUG: "true"

  db:
    ports:
      - "5433:5432"
    volumes:
      - ./docker/postgres/init:/docker-entrypoint-initdb.d:ro

  adminer:
    image: adminer:4.8.1
    ports:
      - "8081:8080"
    depends_on:
      - db
```

Y el script que crea la base de pruebas,
`docker/postgres/init/01-crear-bd-pruebas.sql`:

```sql
-- Se ejecuta solo cuando el volumen de datos está vacío (primera vez).
-- Si tu DB_USERNAME no es reservafic, cambia el OWNER.
CREATE DATABASE reservafic_testing OWNER reservafic;
```

Compara lo que Compose entiende con y sin el override:

```text
$ docker compose -f compose.yaml config > /tmp/solo-base.yaml
$ docker compose config > /tmp/con-override.yaml
$ diff /tmp/solo-base.yaml /tmp/con-override.yaml
```

> En Windows sin `diff`, abre los dos archivos lado a lado en tu editor.

**Explica:** ¿qué agregó el override? ¿Por qué el puerto de la base es
`5433` y no `5432`? (Tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/).)

> La etiqueta `adminer:4.8.1` debe verificarse en Docker Hub al inicio
> del semestre (pendiente de verificación).

### 6.1 Actualizar `.env.example`

Agrega al final de `.env.example`, **sin valores secretos**:

```dotenv
# --- Docker Compose ---
# DB_PASSWORD es obligatoria para levantar el ambiente con Docker.
# Dentro de los contenedores DB_HOST se fuerza a "db" (ver compose.yaml).
# Imagen de la aplicación (solo producción o pruebas de la imagen final):
# APP_IMAGE=registry.gitlab.com/<grupo>/<proyecto>:0.3.0
# Dominio público para el proxy HTTPS (solo producción):
# DOMINIO=
```

---

## 7. Paso 4 — Levantar el ambiente de desarrollo (20 min)

```text
$ docker compose up -d --build
$ docker compose ps
NAME                   IMAGE              SERVICE   STATUS                    PORTS
reservafic-adminer-1   adminer:4.8.1      adminer   Up                        0.0.0.0:8081->8080/tcp
reservafic-app-1       reservafic:local   app       Up                        0.0.0.0:8080->80/tcp
reservafic-db-1        postgres:16        db        Up (healthy)              0.0.0.0:5433->5432/tcp
```

Observa que `app` arrancó **después** de que `db` estuvo `healthy`.

Prepara la aplicación dentro del contenedor:

```text
$ docker compose exec app composer install
$ docker compose exec app php artisan key:generate
$ docker compose up -d --force-recreate app
$ docker compose exec app php artisan migrate --seed
```

¿Por qué recrear `app` después de `key:generate`? Lee la explicación en
el tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/): las variables de entorno se fijan al crear el
contenedor.

Abre:

* `http://localhost:8080` — tu aplicación.
* `http://localhost:8081` — Adminer. Sistema: PostgreSQL; servidor:
  `db`; usuario y contraseña: los de tu `.env`; base: la de tu `.env`.

**Explica:** en Adminer escribiste `db` como servidor, pero tu
navegador está fuera de Docker. ¿Quién se conecta realmente a `db`?

### 7.1 Código en vivo

Cambia un texto de una vista Blade y recarga el navegador **sin tocar
Docker**. El bind mount `./:/var/www/html` hace que el contenedor vea
tus archivos (Lab 1, paso 6).

### 7.2 Logs

```text
$ docker compose logs -f app
```

Navega por la aplicación y observa las líneas. Sal con Ctrl+C.

#### Punto de control 1

```text
☐ docker compose ps muestra db (healthy), app y adminer.
☐ La aplicación responde en 8080 y Adminer en 8081.
☐ Un cambio en una vista se ve sin reconstruir.
```

---

## 8. Paso 5 — Pruebas dentro del ambiente (10 min)

```text
$ docker compose exec db psql -U reservafic -l
```

Debe aparecer `reservafic_testing`: la creó el script de
`docker-entrypoint-initdb.d` porque el volumen estaba vacío.

```text
$ docker compose exec app php artisan test
```

La suite del Bloque III corre contra PostgreSQL en el contenedor `db`,
usando la base de pruebas que fija tu `phpunit.xml`.

**Explica:** ¿por qué las pruebas no borran los datos de desarrollo que
creó el seeder?

---

## 9. Paso 6 — Romper a propósito (20 min)

Para cada experimento: predice, ejecuta, explica. Anota todo en la
descripción del merge request.

### 9.1 Apagar y encender

```text
$ docker compose down
$ docker compose up -d
```

**Predice:** ¿siguen los datos del seeder? ¿Por qué?

### 9.2 El reinicio desde cero

```text
$ docker compose down -v
$ docker compose up -d
$ docker compose exec app php artisan migrate --seed
$ docker compose exec db psql -U reservafic -l
```

**Predice:** ¿se perdieron los datos? ¿Se volvió a crear
`reservafic_testing`? ¿Por qué esta vez sí corrió el script?

### 9.3 Se cae la base

```text
$ docker compose stop db
```

Recarga una página que consulte la base. Lee el error (estás en
desarrollo, `APP_DEBUG=true`, así que lo ves completo).

```text
$ docker compose start db
```

### 9.4 Cambiar la contraseña "a la mala"

Cambia `DB_PASSWORD` en tu `.env` y ejecuta:

```text
$ docker compose up -d
$ docker compose ps
```

Recarga la aplicación en el navegador.

**Predice y explica:** `docker compose ps` muestra todo arriba y `db`
sigue `healthy` (`pg_isready` no comprueba contraseñas). Entonces, ¿qué
falla y por qué? (Lab 1, paso 8.4; tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/).) Regresa la contraseña
original y ejecuta `docker compose up -d` otra vez.

### 9.5 Sin health check

Comenta temporalmente (con `#`) el bloque `depends_on` de `app` en
`compose.yaml` y ejecuta:

```text
$ docker compose down -v
$ docker compose up -d
$ docker compose exec app php artisan migrate
```

Si ejecutas el `migrate` en los primeros segundos, verás un error de
conexión. Restaura `depends_on` y explica qué problema resuelve.

---

## 10. Paso 7 — La imagen de producción, en local (15 min)

Hasta ahora `app` usa la etapa `desarrollo` con tu código montado. Antes
de llevar algo a un servidor, prueba la imagen **real** de producción en
tu máquina (despliegue local, tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)):

```text
$ docker compose down
$ APP_IMAGE=reservafic:0.3.0 docker compose -f compose.yaml up -d
```

> En PowerShell: `$env:APP_IMAGE="reservafic:0.3.0"` en una línea y
> después `docker compose -f compose.yaml up -d`. Al terminar,
> `Remove-Item Env:APP_IMAGE`.

Con `-f compose.yaml` **no** se carga el override: no hay bind mount, ni
Adminer, ni puertos publicados.

```text
$ docker compose -f compose.yaml ps
$ docker compose -f compose.yaml exec app curl -s -o /dev/null -w "%{http_code}\n" http://localhost/up
200
$ docker compose -f compose.yaml exec app php artisan tinker --execute="echo App\Models\Equipo::count();"
```

**Explica:**

* ¿Por qué la imagen de producción ve los equipos que creó el seeder
  del paso 4, si esa imagen no tiene Faker ni puede ejecutar el seeder?
  (Pista: ¿qué compartieron los dos modos?)
* No puedes abrir la aplicación en el navegador. ¿Es un error? (Tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/): en producción solo el proxy publica puertos. Lo agregarás en
  el Lab 4.)

Regresa al modo desarrollo:

```text
$ docker compose -f compose.yaml down
$ docker compose up -d
```

---

## 11. Paso 8 — Configuración por ambiente (10 min)

Documenta en el `README.md` la matriz de tu proyecto (actividad A4),
basada en el tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/):

```markdown
## Ambientes

| Aspecto | Desarrollo | Pruebas | Producción |
| --- | --- | --- | --- |
| Comando | `docker compose up -d` | `docker compose exec app php artisan test` / pipeline | `docker compose -f compose.yaml -f compose.prod.yaml up -d` |
| Etapa del Dockerfile | desarrollo | desarrollo / CI | produccion |
| Código | bind mount | el del commit | dentro de la imagen |
| APP_ENV / APP_DEBUG | local / true | testing | production / false |
| Base de datos | reservafic | reservafic_testing | reservafic (servidor) |
| Puertos publicados | 8080, 5433, 8081 | ninguno | 80, 443 (proxy) |
| Secretos | .env local | variables de GitLab CI | .env del servidor (600) |
```

---

## 12. Paso 9 — Prueba de clon limpio (20 min)

Integra el merge request (con revisión y pipeline en verde). Después,
**un integrante que no escribió los archivos de Compose**:

1. Detiene su ambiente actual (`docker compose down`).
2. Clona el repositorio en una **carpeta nueva**.
3. Sigue **solo** lo que dice el `README.md`.
4. Registra cada momento en que tuvo que preguntar algo o adivinar.

Antes de la prueba, el autor escribe en el `README.md` la sección de
inicio rápido:

```markdown
## Inicio rápido con Docker

Requisitos: Git y Docker (con Docker Compose v2).

    git clone <url>
    cd <proyecto>
    cp .env.example .env            # y escribe un DB_PASSWORD de desarrollo
    docker compose up -d --build
    docker compose exec app composer install
    docker compose exec app php artisan key:generate
    docker compose up -d --force-recreate app
    docker compose exec app php artisan migrate --seed

Aplicación: http://localhost:8080 · Adminer: http://localhost:8081
Pruebas: docker compose exec app php artisan test
```

Cada pregunta del integrante se registra como **issue** con la
etiqueta `documentacion` y se corrige en un merge request. La prueba se
repite hasta que alguien la complete sin preguntar.

### 12.1 La tabla de la actividad A1, otra vez

Cada integrante ejecuta:

```text
$ docker compose exec app php -v
$ docker compose exec app composer -V
$ docker compose exec db psql --version
```

Comparen con la tabla que hicieron en la activación. La columna de
versiones del ambiente debe ser idéntica para todos, aunque sus
sistemas operativos sigan siendo distintos.

#### Punto de control 2

```text
☐ Un integrante distinto del autor levantó el ambiente desde un clon limpio siguiendo el README.
☐ Las preguntas que surgieron están registradas como issues y corregidas.
☐ La suite de pruebas corre en verde dentro del ambiente de ese integrante.
```

---

## 13. Paso 10 — Definition of Done

Agreguen a la DoD del equipo (archivo donde la mantienen desde el
Bloque II):

```text
☐ docker compose up -d levanta el ambiente sin pasos manuales no documentados.
☐ La imagen de producción se construye (docker build --target produccion).
☐ Ningún secreto en Dockerfile, compose*.yaml ni en la imagen.
☐ Cambios de variables reflejados en .env.example.
```

---

## 14. Troubleshooting

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `required variable DB_PASSWORD is missing a value` | Falta en `.env` | Agrégala |
| `port is already allocated` en 8080 | Contenedores del Lab 2 o `php artisan serve` | `docker ps`; detén lo que use el puerto |
| `app` queda en `Created` y no arranca | `db` no llega a `healthy` | `docker compose logs db`; revisa usuario y contraseña |
| `password authentication failed` | El volumen se inicializó con otra contraseña | Usa la original o, solo en desarrollo, `docker compose down -v` |
| No existe `reservafic_testing` | El volumen ya existía cuando agregaste el script | `docker compose exec db createdb -U reservafic reservafic_testing` |
| `database "reservafic_testing" ... role "reservafic" does not exist` en el script | `DB_USERNAME` distinto de `reservafic` | Cambia el `OWNER` del script y reinicia con `down -v` (solo desarrollo) |
| `vendor/autoload.php: No such file` | Falta `composer install` dentro del contenedor | Paso 4 |
| `Permission denied` en `storage/logs` o `bootstrap/cache` (Linux) | Con bind mount, los archivos son de tu usuario y Apache corre como `www-data` | Solo en desarrollo: `chmod -R ugo+rwX storage bootstrap/cache` en tu máquina |
| Todo muy lento en Windows | El proyecto está en el disco de Windows y se monta en WSL 2 | Clona el proyecto dentro del sistema de archivos de WSL (`\\wsl$\...`) y abre desde ahí |
| Los cambios de código no se ven en el modo del paso 7 | La imagen de producción no usa bind mount | Es lo esperado: reconstruye la imagen |
| `No application encryption key has been specified` tras `key:generate` | El contenedor conserva la `APP_KEY` vacía de cuando se creó | `docker compose up -d --force-recreate app` |
| Advertencia `version is obsolete` | El archivo tiene una línea `version:` copiada de un tutorial antiguo | Bórrala (tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/)) |

---

## 15. Evidencia del laboratorio

```text
☐ compose.yaml, compose.override.yaml y docker/postgres/init/ en el repositorio.
☐ .env.example actualizado sin secretos.
☐ Resultados de los experimentos del paso 6 en el merge request.
☐ Evidencia del paso 7 (imagen de producción respondiendo /up).
☐ Matriz de ambientes y sección de inicio rápido en el README.
☐ Issues de la prueba de clon limpio, cerrados.
☐ DoD actualizada.
```

```bash
git add compose.yaml compose.override.yaml docker/ .env.example README.md
git commit -m "build(compose): agregar ambiente reproducible con Docker Compose"
git push -u origin build/compose
```

---

## 16. Reflexión del equipo

1. ¿Cuántas preguntas surgieron en la prueba de clon limpio? ¿Qué dice
   eso del README anterior?
2. ¿Qué comando de Compose les da más miedo ejecutar y por qué?
3. Si mañana se une una persona nueva al equipo, ¿cuánto tardaría en
   tener el ambiente funcionando? Compárenlo con lo que tardaron en el
   Bloque III.

---

## 17. Reto adicional (opcional)

1. Agrega un servicio auxiliar más que tu proyecto necesite (por
   ejemplo, un servidor de correo de pruebas) y documenta por qué.
2. Usa `profiles` de Compose para que Adminer solo arranque con
   `docker compose --profile herramientas up -d`.
3. Escribe un `Makefile` o script con los comandos de inicio rápido.
   Discute en el equipo si ayuda o esconde lo que pasa.

---

## 18. Criterio de finalización

```text
☐ Cualquier integrante levanta el ambiente con los comandos del README.
☐ La suite de pruebas corre en verde dentro del ambiente.
☐ La imagen de producción funciona localmente con compose.yaml.
☐ El equipo explica qué sobrevive a down y qué a down -v.
☐ El merge request fue revisado e integrado con el pipeline en verde.
```

Siguiente: en el Laboratorio 4 llevarás esta misma imagen a un servidor
y la publicarás con HTTPS.
