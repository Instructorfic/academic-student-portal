---
title: "Laboratorio 1 — Primeros contenedores"
description: "Bloque IV de Taller Integrador — usar contenedores hechos por otros para ver funcionar y fallar imagen, contenedor, registry, volumen y red."
---

## 1. Propósito

En este laboratorio no vas a construir nada todavía. Vas a **usar**
contenedores hechos por otros hasta que los cinco conceptos del bloque
(imagen, contenedor, registry, volumen y red) dejen de ser palabras y
se vuelvan cosas que has visto funcionar y fallar.

La regla del laboratorio es **predecir, ejecutar, explicar**: antes de
cada comando marcado con **Predice**, escribe en tu bitácora qué crees
que va a pasar. Después lo ejecutas y comparas. Equivocarte en la
predicción es la parte más útil: ahí es donde aprendes.

Al final, tu proyecto dejará de depender del PostgreSQL que instalaste
a mano en el Bloque III: usará uno en contenedor.

---

## 2. ¿Qué vamos a lograr?

```text
☐ Docker instalado y verificado en tu equipo.
☐ Distinguir imagen de contenedor con tus propios ejemplos.
☐ Recorrer el ciclo de vida de un contenedor: crear, arrancar, detener, eliminar.
☐ Publicar un puerto y entrar a un contenedor en ejecución.
☐ Comprobar que lo escrito en un contenedor se pierde y que un volumen lo conserva.
☐ Usar un bind mount para ver cambios en vivo.
☐ Conectar dos contenedores por nombre en una red.
☐ Conectar tu proyecto Laravel a un PostgreSQL en contenedor.
☐ Una bitácora con predicciones, resultados y explicaciones.
```

---

## 3. Antes de comenzar (estudio independiente, antes de la sesión)

La instalación puede tardar y depende de tu sistema operativo. Hazla
**antes** de la sesión.

### 3.1 Instalar

| Sistema | Qué instalar | Notas |
| --- | --- | --- |
| Windows 10/11 | Docker Desktop | Requiere WSL 2 y la virtualización activada en el BIOS/UEFI. El instalador ofrece activar WSL 2 |
| macOS | Docker Desktop | Elige la versión para tu procesador (Apple Silicon o Intel) |
| Linux (Ubuntu) | Docker Engine desde el repositorio oficial de Docker | Sigue la guía oficial "Install Docker Engine on Ubuntu". No uses el paquete `docker.io` de Ubuntu: puede ser una versión antigua |

> **Licencia de Docker Desktop.** Las condiciones de uso de Docker
> Desktop para educación deben confirmarse con el docente
> (pendiente de verificación en el contexto del bloque). Docker Engine en
> Linux no tiene esa restricción.

> **Si tu computadora no puede.** Si no puedes activar la virtualización
> o tu equipo tiene menos de 8 GB de RAM, avisa al docente antes de la
> sesión. Alternativas: trabajar en pareja o usar una VM Linux con
> Docker Engine.

### 3.2 Verificar

```text
$ docker version
Client:
 Version:           2x.x.x
 ...
Server:
 Engine:
  Version:          2x.x.x
```

Deben aparecer **dos secciones**: `Client` y `Server`. Si solo aparece
`Client` y un error, el motor no está corriendo (abre Docker Desktop).

```text
$ docker compose version
Docker Compose version v2.x.x

$ docker run hello-world
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

Si los tres comandos funcionan, estás listo.

### 3.3 Preparar la bitácora

En la rama del laboratorio de tu proyecto:

```bash
git checkout main
git pull origin main
git checkout -b docs/lab01-contenedores
mkdir -p docs/bitacoras
```

Crea `docs/bitacoras/lab01-contenedores.md` con esta plantilla y
llénala durante el laboratorio:

```markdown
# Bitácora — Lab 1 Primeros contenedores

Integrante(s):
Sistema operativo y versión de Docker:

| Paso | Predicción (antes de ejecutar) | Resultado observado | Explicación (por qué) |
| --- | --- | --- | --- |
| 4.2 | | | |
```

### 3.4 Lectura previa

Lee las secciones G1 a G4 de la
[guía de fundamentos de contenedores](/materias/taller-integrador/bloque-04/guia-fundamentos-contenedores/):
kernel y procesos, máquinas virtuales, contenedores y la comparación
entre ambos. Haz los experimentos G1, G3 y G4.2 y anota sus resultados
en la bitácora (tres filas más). Durante el laboratorio vas a
comprobar en vivo varias de esas ideas.

---

## 4. Paso 1 — `hello-world` por dentro y la primera imagen

### 4.1 Qué pasó con `hello-world`

Lee completo el texto que imprimió `docker run hello-world`. Describe
cuatro pasos:

1. El cliente `docker` contactó al motor (*daemon*).
2. El motor descargó la imagen `hello-world` de Docker Hub.
3. El motor creó un contenedor a partir de la imagen y ejecutó el
   programa que imprime el mensaje.
4. El motor envió la salida al cliente, que la mostró en tu terminal.

Es exactamente el diagrama cliente/motor del tema [2. Docker es la herramienta](/materias/taller-integrador/bloque-04/02-docker-es-la-herramienta/).

### 4.2 Imagen y contenedor no son lo mismo

**Predice:** después de ejecutar `hello-world` una vez, ¿cuántas
imágenes y cuántos contenedores existen?

```text
$ docker image ls
$ docker ps -a
```

Ahora ejecútalo dos veces más:

```text
$ docker run hello-world
$ docker run hello-world
$ docker image ls
$ docker ps -a
```

**Explica** en la bitácora: ¿por qué hay una sola imagen y tres
contenedores? ¿Por qué todos los contenedores aparecen como `Exited`?

Pista: imagen = clase; contenedor = objeto (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)).

---

## 5. Paso 2 — Un contenedor es un programa encerrado

### 5.1 Un comando y se acaba

```text
$ docker run alpine:3.20 echo "Hola desde un contenedor"
```

`alpine` es una distribución Linux mínima. **Predice:** ¿cuánto pesa
la imagen? Compruébalo:

```text
$ docker image ls alpine
```

### 5.2 Entrar a un contenedor interactivo

```text
$ docker run -it --rm --name explorador alpine:3.20 sh
```

Estás **dentro** del contenedor. El símbolo del sistema cambió a `/ #`.
Ejecuta y anota:

```text
/ # cat /etc/os-release        ¿qué sistema operativo "cree" que es?
/ # hostname                   ¿qué nombre tiene?
/ # ps                         ¿cuántos procesos ves?
/ # ls /home                   ¿están tus archivos?
/ # whoami
```

En **otra terminal**, sin cerrar la primera:

```text
$ docker ps
```

**Explica:** dentro del contenedor, `ps` muestra uno o dos procesos;
tu computadora tiene cientos. ¿Qué concepto del tema [1. ¿Qué es un contenedor?](/materias/taller-integrador/bloque-04/01-que-es-un-contenedor/) lo
explica?

Sal con `exit`. **Predice:** ¿aparece `explorador` en `docker ps -a`?
(Pista: usaste `--rm`.)

### 5.3 La versión la decide la imagen

```text
$ docker run --rm python:3.12-slim python --version
$ docker run --rm python:3.11-slim python --version
$ docker run --rm node:22-slim node --version
```

No instalaste Python ni Node. Las versiones conviven sin chocar porque
cada una vive en su contenedor. Anota cuánto tardó cada comando la
primera vez y la segunda.

> Las etiquetas `python:3.12-slim`, `python:3.11-slim` y `node:22-slim`
> son ejemplos de imágenes oficiales con versión. Si alguna ya no
> existe, usa otra versión listada en Docker Hub (pendiente de
> verificación al inicio del semestre).

---

## 6. Paso 3 — Ciclo de vida

```text
$ docker run -d --name reloj alpine:3.20 sh -c "while true; do date; sleep 2; done"
```

`-d` lo deja corriendo en segundo plano. El contenedor imprime la hora
cada 2 segundos.

```text
$ docker ps                      # ¿qué columna dice cuánto lleva corriendo?
$ docker logs reloj              # todo lo que ha impreso
$ docker logs -f reloj           # en vivo; sal con Ctrl+C (el contenedor sigue)
$ docker stop reloj              # tarda unos segundos: le pide que termine
$ docker ps                      # ¿está?
$ docker ps -a                   # ¿y aquí?
$ docker start reloj
$ docker logs reloj              # ¿se conservaron las líneas anteriores?
$ docker rm reloj                # ¿qué error da?
$ docker rm -f reloj             # fuerza: detiene y elimina
```

**Explica:** ¿qué diferencia hay entre `stop` y `rm`? Dibuja en la
bitácora el diagrama de ciclo de vida del tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/) marcando en
qué estado quedó el contenedor después de cada comando.

---

## 7. Paso 4 — Puertos y `exec`

### 7.1 Publicar un puerto

```text
$ docker run -d --name web -p 8080:80 nginx:1.27
```

Abre `http://localhost:8080` en el navegador. Verás "Welcome to
nginx!".

**Predice:** ¿qué pasa si ejecutas otro contenedor con el mismo
puerto?

```text
$ docker run -d --name web2 -p 8080:80 nginx:1.27
```

Lee el error. Ahora:

```text
$ docker rm web2
$ docker run -d --name web2 -p 8081:80 nginx:1.27
```

Abre `http://localhost:8081`. **Explica** con la analogía del edificio
(tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)): ¿por qué los dos contenedores pueden usar el puerto 80
adentro pero no el 8080 afuera?

### 7.2 Entrar a un contenedor que ya corre

```text
$ docker exec -it web bash
root@...:/# echo "<h1>Modificado a mano</h1>" > /usr/share/nginx/html/index.html
root@...:/# exit
```

Recarga `http://localhost:8080`. Cambió. Ahora:

**Predice:** si elimino `web` y creo uno nuevo igual, ¿qué página voy a
ver?

```text
$ docker rm -f web
$ docker run -d --name web -p 8080:80 nginx:1.27
```

Recarga. **Explica** con la analogía del cuarto de hotel (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)).

#### Punto de control 1

```text
☐ Puedo explicar la diferencia entre docker run y docker exec.
☐ Puedo explicar por qué el cambio a mano se perdió.
☐ Mi bitácora tiene al menos 6 filas con predicción, resultado y explicación.
```

---

## 8. Paso 5 — Volúmenes: datos que sobreviven

### 8.1 PostgreSQL con volumen

```text
$ docker volume create lab01_datos
$ docker run -d --name pg-lab \
    -e POSTGRES_USER=lab -e POSTGRES_PASSWORD=lab-solo-local -e POSTGRES_DB=lab \
    -v lab01_datos:/var/lib/postgresql/data \
    postgres:16
```

> En PowerShell reemplaza `\` al final de línea por `` ` `` o escribe
> todo en una línea.

Espera unos segundos y revisa:

```text
$ docker logs pg-lab | tail -3
```

Busca la línea `database system is ready to accept connections`.

Crea datos:

```text
$ docker exec -it pg-lab psql -U lab -d lab
lab=# create table prestamo (id serial primary key, equipo text);
lab=# insert into prestamo (equipo) values ('Proyector 1'), ('Laptop 3');
lab=# select * from prestamo;
lab=# \q
```

### 8.2 Destruir el contenedor

**Predice:** si elimino `pg-lab` y creo otro con el mismo volumen, ¿los
préstamos siguen?

```text
$ docker rm -f pg-lab
$ docker run -d --name pg-lab -e POSTGRES_PASSWORD=lab-solo-local \
    -v lab01_datos:/var/lib/postgresql/data postgres:16
$ docker exec pg-lab psql -U lab -d lab -c "select * from prestamo;"
```

### 8.3 Sin volumen

**Predice:** ¿y si no hubiera volumen?

```text
$ docker run -d --name pg-sin-volumen -e POSTGRES_PASSWORD=x postgres:16
$ docker exec pg-sin-volumen psql -U postgres -c "create table t (x int); insert into t values (1);"
$ docker rm -f pg-sin-volumen
$ docker run -d --name pg-sin-volumen -e POSTGRES_PASSWORD=x postgres:16
$ docker exec pg-sin-volumen psql -U postgres -c "select * from t;"
```

> Si el último comando dice que la base todavía está arrancando, espera
> unos segundos y repítelo.

**Explica** la diferencia entre 8.2 y 8.3 con la analogía del pizarrón
y el cuaderno (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)).

### 8.4 La trampa de la contraseña

**Predice:** en 8.2 creaste el segundo contenedor **sin**
`POSTGRES_USER=lab`. ¿Por qué funcionó `psql -U lab`?

Ahora crea uno con una contraseña distinta para el usuario `lab`:

```text
$ docker rm -f pg-lab
$ docker run -d --name pg-lab -e POSTGRES_USER=lab -e POSTGRES_PASSWORD=otra-distinta \
    -v lab01_datos:/var/lib/postgresql/data postgres:16
```

La contraseña de `lab` **no cambió**: la imagen solo lee esas
variables cuando el volumen está vacío. Anótalo; es el error número uno
del Laboratorio 3 (tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)).

```text
$ docker rm -f pg-lab pg-sin-volumen
```

---

## 9. Paso 6 — Bind mount: una ventana a tu carpeta

```text
$ mkdir -p ~/lab01-sitio
$ echo "<h1>Versión 1</h1>" > ~/lab01-sitio/index.html
$ docker rm -f web
$ docker run -d --name web -p 8080:80 -v ~/lab01-sitio:/usr/share/nginx/html:ro nginx:1.27
```

> En Windows con PowerShell usa una ruta completa, por ejemplo
> `-v ${HOME}\lab01-sitio:/usr/share/nginx/html:ro`.

Abre `http://localhost:8080`. Ahora edita `~/lab01-sitio/index.html`
con tu editor (cambia a "Versión 2") y recarga **sin tocar Docker**.

**Explica:** ¿en qué se diferencia de 7.2? ¿Por qué esto es útil para
desarrollar y no para producción? ¿Qué significa `:ro`?

---

## 10. Paso 7 — Redes: encontrarse por nombre

### 10.1 Dos contenedores en la misma red

```text
$ docker network create lab01_red
$ docker run -d --name db --network lab01_red \
    -e POSTGRES_USER=lab -e POSTGRES_PASSWORD=lab-solo-local -e POSTGRES_DB=lab \
    -v lab01_datos:/var/lib/postgresql/data postgres:16
```

Fíjate: **no publicaste ningún puerto**. Ahora, desde **otro**
contenedor que solo tiene el cliente de PostgreSQL:

```text
$ docker run --rm -it --network lab01_red postgres:16 psql -h db -U lab -d lab -c "select * from prestamo;"
Password for user lab: lab-solo-local
```

Llegaste a la base con el nombre `db`. El segundo contenedor usa la
misma imagen `postgres:16`, pero solo para usar su programa `psql`.

### 10.2 El error de `localhost`

**Predice:** ¿qué pasa si en lugar de `-h db` usas `-h localhost`?

```text
$ docker run --rm -it --network lab01_red postgres:16 psql -h localhost -U lab -d lab
```

**Explica** en la bitácora con tus palabras. Esta explicación será la
base del cambio `DB_HOST=db` en el Laboratorio 3.

### 10.3 Sin red común

**Predice:** ¿y un contenedor fuera de `lab01_red`?

```text
$ docker run --rm -it postgres:16 psql -h db -U lab -d lab
```

#### Punto de control 2

```text
☐ Puedo explicar por qué "db" funciona y "localhost" no dentro de un contenedor.
☐ Puedo explicar qué sobrevive al eliminar un contenedor y qué no.
☐ Puedo explicar la diferencia entre volumen con nombre y bind mount.
```

---

## 11. Paso 8 — Variables de entorno

```text
$ docker run --rm -e SALUDO="Hola" -e EQUIPO="Equipo 3" alpine:3.20 sh -c 'echo "$SALUDO, $EQUIPO"'
$ docker run --rm alpine:3.20 sh -c 'echo "$SALUDO, $EQUIPO"'
```

Ahora con un archivo. Crea `~/lab01.env`:

```dotenv
SALUDO=Buenas tardes
EQUIPO=ReservaFIC
```

```text
$ docker run --rm --env-file ~/lab01.env alpine:3.20 sh -c 'echo "$SALUDO, $EQUIPO"'
```

**Explica:** la imagen es la misma en los tres casos. ¿Qué cambió? ¿Por
qué esto permite usar la misma imagen en desarrollo y en producción
(tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/))?

---

## 12. Paso 9 — Imágenes por dentro

```text
$ docker pull ubuntu:24.04
$ docker image ls
```

Compara tamaños de `alpine:3.20`, `ubuntu:24.04`, `nginx:1.27` y
`postgres:16`. Anótalos.

```text
$ docker image history nginx:1.27
$ docker image inspect postgres:16 --format '{{json .Config.Env}}'
$ docker image inspect postgres:16 --format '{{json .Config.ExposedPorts}}'
```

**Explica:**

* ¿Qué instrucciones de `history` agregan más tamaño?
* La imagen de PostgreSQL declara el puerto `5432` (`ExposedPorts`).
  ¿Eso significa que el puerto está publicado en tu máquina? (Repasa la
  diferencia entre `EXPOSE` y `-p` en el tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/).)

---

## 13. Paso 10 — Aplicarlo a tu proyecto

Tu proyecto del Bloque III usa un PostgreSQL instalado de forma nativa.
Ahora vas a conectarlo a uno en contenedor, **sin** contenerizar todavía
la aplicación (eso es el Lab 2).

```text
$ docker run -d --name proyecto-db \
    -e POSTGRES_USER=reservafic -e POSTGRES_PASSWORD=solo-desarrollo -e POSTGRES_DB=reservafic \
    -p 5433:5432 \
    -v proyecto_datos:/var/lib/postgresql/data \
    postgres:16
```

Usen los nombres de usuario y base **de su proyecto**. El puerto
`5433` evita el choque con el PostgreSQL nativo, que ocupa el `5432`.

En el `.env` de tu proyecto (no en `.env.example`), cambia
temporalmente:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=5433
DB_PASSWORD=solo-desarrollo
```

```text
$ php artisan migrate
$ php artisan db:seed
$ php artisan serve
```

**Explica:** aquí `DB_HOST=127.0.0.1` sí funciona, a diferencia de 10.2.
¿Por qué? (Pista: ¿desde dónde se conecta Laravel en este paso: desde
dentro de un contenedor o desde tu computadora?)

Cuando termines, regresa tu `.env` a como estaba si quieres seguir
usando el PostgreSQL nativo. En el Laboratorio 3 todo quedará dentro de
Compose.

---

## 14. Paso 11 — Limpieza

```text
$ docker rm -f web web2 db proyecto-db
$ docker network rm lab01_red
$ docker volume ls
$ docker volume rm lab01_datos
$ docker system df
```

Conserva `proyecto_datos` si quieres seguir usando esa base. No borres
volúmenes que no reconozcas.

---

## 15. Troubleshooting

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `Cannot connect to the Docker daemon` | El motor no está corriendo | Abre Docker Desktop y espera a que diga "running"; en Linux `sudo systemctl start docker` |
| `permission denied ... docker.sock` (Linux) | Tu usuario no está en el grupo `docker` | Usa `sudo docker ...` o agrega tu usuario al grupo según la guía oficial "Linux post-installation steps" y cierra sesión |
| `WSL 2 installation is incomplete` (Windows) | Falta WSL 2 | Ejecuta `wsl --install` en PowerShell como administrador y reinicia |
| `Virtualization must be enabled` | Virtualización desactivada | Actívala en el BIOS/UEFI (VT-x, AMD-V o SVM) |
| `port is already allocated` | El puerto del anfitrión está ocupado | Usa otro puerto a la izquierda o detén el contenedor que lo usa |
| `Conflict. The container name "/web" is already in use` | Ya existe un contenedor con ese nombre (aunque esté detenido) | `docker rm -f web` o usa otro nombre |
| `psql: error: connection ... failed: FATAL: password authentication failed` | El volumen ya tenía otra contraseña (paso 8.4) | Usa la contraseña original o, si son datos de práctica, elimina el volumen |
| `the database system is starting up` | PostgreSQL todavía inicializa | Espera unos segundos y repite |
| Descargas muy lentas | Red del laboratorio saturada | Trabajen en parejas o descarguen las imágenes antes de la sesión |
| El bind mount aparece vacío en Windows | Ruta mal escrita | Usa ruta absoluta; verifica que la carpeta esté compartida en Docker Desktop |

---

## 16. Evidencia del laboratorio

```text
☐ docs/bitacoras/lab01-contenedores.md con al menos 12 filas completas.
☐ Respuestas a todas las preguntas "Explica".
☐ Captura o salida del paso 13 mostrando tu proyecto migrado contra el PostgreSQL en contenedor.
☐ Merge request con la bitácora, revisado por otro integrante.
```

```bash
git add docs/bitacoras/lab01-contenedores.md
git commit -m "docs(docker): agregar bitácora del laboratorio 1 de contenedores"
git push -u origin docs/lab01-contenedores
```

---

## 17. Reflexión del equipo

1. ¿Cuál de tus predicciones falló y qué aprendiste de ello?
2. Si tuvieras que explicarle a alguien de primer semestre qué es un
   volumen, ¿qué analogía usarías? ¿Dónde falla?
3. ¿Qué parte del Laboratorio 1 del Bloque III (instalar PostgreSQL)
   habría sido distinta con lo que hiciste hoy?

---

## 18. Reto adicional (opcional)

1. Limita la memoria de un contenedor (`docker run -m 64m ...`) y
   observa con `docker stats` qué pasa cuando PostgreSQL intenta usar
   más.
2. Ejecuta `docker inspect` sobre un contenedor en ejecución y localiza
   su dirección IP en la red `lab01_red`. Explica por qué no conviene
   usar esa IP en la configuración.
3. Si ya cursaste o cursas otra materia de contenedores: documenta tres
   diferencias entre lo que viste allá y lo que se hizo aquí.
4. Haz los experimentos de aislamiento de la guía de fundamentos
   (G5.3b, G5.5b, G6.5 y G9.1) y explica en la bitácora, para cada uno,
   qué mecanismo del kernel observaste: namespace de PID, namespace de
   red, cgroup de memoria o capacidades.
5. Contenedoriza el servidor de Node.js o el de Go de la guía (G10.4 o
   G10.5). Compara el tamaño de la imagen con la de PHP del Laboratorio
   2 y explica la diferencia.

---

## 19. Criterio de finalización

El laboratorio está terminado cuando:

```text
☐ docker version muestra Client y Server.
☐ La bitácora demuestra que distingues imagen, contenedor, registry, volumen y red con ejemplos ejecutados.
☐ Explicaste con tus palabras por qué localhost no sirve entre contenedores.
☐ Tu proyecto migró contra un PostgreSQL en contenedor.
☐ El merge request fue revisado e integrado.
```

Siguiente: en el Laboratorio 2 escribirás tu propia imagen con un
`Dockerfile`.
