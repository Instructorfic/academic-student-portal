---
title: "Laboratorio 1 — Observación de arquitectura relacional (PostgreSQL)"
description: "Unidad 1 de DBA — laboratorio observacional y no evaluado, apoyo visual a la Actividad 5."
---

<span class="badge-estado">Observacional — no evaluado</span>

> **Alcance — leer antes de usar esta guía.** La Unidad 1 es
> **predominantemente conceptual**: si dispones de un SGBD instalado,
> este **solo puede usarse para observar —no configurar—** elementos de
> arquitectura, como apoyo visual a la Actividad 5, **no como práctica
> evaluada**. Esta guía es un **complemento visual opcional**, no un
> laboratorio que amplíe la evidencia oficial de la unidad. No se asigna
> calificación a lo que se haga aquí.

## 0. Antes de empezar

### 0.1 ¿Qué es Docker, en dos frases?

Si ya viste esto en la materia de Contenedores y Cloud Native, esto es
solo un repaso operativo, no contenido nuevo. **Docker** permite ejecutar
un programa (por ejemplo, un motor de base de datos) dentro de un
**contenedor**: un paquete aislado, desechable, que no modifica el resto
de tu computadora. En esta guía usamos Docker para ejecutar PostgreSQL
**sin instalarlo directamente en tu equipo** — al terminar, borramos el
contenedor y no queda nada instalado.

### 0.2 Glosario mínimo de esta guía

| Término | En una frase |
| --- | --- |
| **Imagen** | La "plantilla" descargada de un programa (por ejemplo, `postgres:16`) — como instalar una aplicación, pero empaquetada. |
| **Contenedor** | Una copia en ejecución de una imagen. Puedes crear y borrar contenedores sin afectar la imagen original. |
| `docker run` | Crea y arranca un contenedor nuevo a partir de una imagen. |
| `docker exec` | Ejecuta un comando **dentro** de un contenedor que ya está corriendo. |
| `-d` | "*Detached*": el contenedor corre en segundo plano y no bloquea tu terminal. |
| `-e VARIABLE=valor` | Define una variable de entorno dentro del contenedor (por ejemplo, una contraseña inicial). |
| `--name` | Le da un nombre fijo al contenedor, para poder referirte a él después sin recordar un identificador largo. |

### 0.3 Verifica que Docker está instalado y funcionando

**Paso 1 — Comprobar que Docker está instalado.**

```bash
docker --version
```

**Qué deberías ver:**

```text
Docker version 27.3.1, build ce12230
```

**Si ves** `docker: command not found`: Docker no está instalado en este
equipo. Instálalo desde <https://docs.docker.com/get-docker/>. Cuando
termine la instalación, cierra y vuelve a abrir la terminal, y repite
este paso.

**Paso 2 — Comprobar que Docker está corriendo (no solo instalado).**

```bash
docker run hello-world
```

**Qué deberías ver:**

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

**Si ves** `Cannot connect to the Docker daemon`: Docker está instalado
pero **no está corriendo**. En Windows/macOS, abre la aplicación "Docker
Desktop" y espera a que el ícono de la ballena deje de moverse. En Linux,
ejecuta `sudo systemctl start docker`. Vuelve a intentar el comando.

**Si ves** `permission denied` **(típico en Linux):** ejecuta el comando
anteponiendo `sudo`, o pide que se agregue tu usuario al grupo `docker`.

Si el paso 2 funcionó, **ya estás listo para el resto de esta guía.**

### 0.4 Qué vamos a hacer (mapa de la guía)

1. Levantar un PostgreSQL de práctica.
2. Observar cómo resuelve, en concreto, los dos problemas universales de
   arquitectura relacional descritos en
   [Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/):
   dónde vive físicamente cada dato, y cómo acelera el acceso a los
   datos.
3. Borrar todo (limpieza), sin dejar nada instalado.

### 0.5 Recordatorio de alcance

* Este laboratorio usa un contenedor **temporal, desechable**, sin datos
  reales ni de producción.
* No se instala nada de forma permanente.
* Corresponde a la [Actividad 5](/materias/dba/unidad-01/actividades/actividad-5/)
  — sirve como apoyo visual antes de elaborar ese entregable, no lo
  sustituye.
* Motor usado: **PostgreSQL**, mediante la imagen oficial de Docker Hub.

## 1. Observar la arquitectura de un SGBD relacional (PostgreSQL)

### 1.1 Levantar un contenedor temporal de PostgreSQL

```bash
docker run --name dba-u1-postgres \
  -e POSTGRES_PASSWORD=labpractica \
  -d postgres:16
```

`labpractica` es un valor de práctica, no una contraseña real. Nunca debe
reutilizarse fuera de este laboratorio.

**Qué deberías ver:** la primera vez, varias líneas de descarga. Al
final, una sola línea larga de letras y números — el identificador del
contenedor recién creado.

### 1.2 Conectarse con `psql` (el cliente de línea de comandos de PostgreSQL)

```bash
docker exec -it dba-u1-postgres psql -U postgres
```

**Qué deberías ver:** el símbolo de tu terminal cambia a `postgres=#` —
ya estás **dentro** de `psql`.

### 1.3 Observar las bases de datos existentes

```sql
\l
```

**Qué deberías ver** (deben aparecer estas tres bases):

```text
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ...
-----------+----------+----------+-----------------+------------+------------+----
 postgres  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |
 template1 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |
(3 rows)
```

> Cada fila es, a nivel lógico, una base de datos independiente dentro
> del mismo servidor — `template0` y `template1` las crea PostgreSQL
> automáticamente. `postgres` es la base de datos por defecto.

### 1.4 Observar los *tablespaces*

```sql
\db
```

**Qué deberías ver:**

```text
                List of tablespaces
    Name    |  Owner   |  Location
------------+----------+-----------
 pg_default | postgres |
 pg_global  | postgres |
(2 rows)
```

> PostgreSQL sí tiene el concepto de *tablespace* (REF-U1-06), pero lo
> usa como mecanismo adicional de ubicación física, no como la unidad de
> organización por defecto de todos los datos (que en PostgreSQL es el
> directorio `PGDATA`, con subdirectorios por base de datos).

### 1.5 Observar un parámetro de memoria (`shared_buffers`)

```sql
SHOW shared_buffers;
```

**Qué deberías ver:**

```text
 shared_buffers
-----------------
 128MB
(1 row)
```

> `shared_buffers` es la forma en que PostgreSQL resuelve el mismo
> problema universal que el Database Buffer Cache de Oracle: mantener en
> memoria las páginas de datos leídas recientemente.

### 1.6 Salir de `psql`

```sql
\q
```

### Qué debe registrar el estudiante (apoyo visual, no evidencia evaluada)

Una captura de pantalla o transcripción breve de los pasos 1.3–1.5, para
usarla como referencia real al elaborar el diagrama de la Actividad 5 —
no se entrega como evidencia independiente.

## 2. Limpieza del entorno

```bash
docker rm -f dba-u1-postgres
```

**Qué deberías ver:** el nombre del contenedor repetido como confirmación
de que se borró. Tu computadora queda exactamente igual que antes de
empezar esta guía.

## 3. Recordatorio de evaluación

Esta guía **no genera una evidencia evaluada de la Unidad 1**. La
evidencia oficial de la unidad sigue siendo, sin cambios, la
[Actividad 7](/materias/dba/unidad-01/actividades/actividad-7/): mapa de
responsabilidades del DBA + diagnóstico de un entorno de base de datos,
que puede resolverse sin haber ejecutado este laboratorio.

## 4. Problemas frecuentes

| Problema | Causa probable | Solución |
| --- | --- | --- |
| `docker: command not found` | Docker no está instalado | Instalar desde <https://docs.docker.com/get-docker/> |
| `Cannot connect to the Docker daemon` | Docker está instalado pero no está corriendo | Abrir Docker Desktop, o `sudo systemctl start docker` (Linux) |
| `permission denied` al ejecutar `docker` | Tu usuario no tiene permiso | Usar `sudo`, o pedir que se agregue tu usuario al grupo `docker` |
| `port is already allocated` / `Conflict... already in use` | Ya existe un contenedor previo con el mismo nombre | Ejecutar `docker rm -f dba-u1-postgres` y repetir el paso |
| `psql: error: connection to server ... failed` | El contenedor todavía está inicializando | Esperar 5-10 segundos y repetir el paso 1.2 |
| El paso 1.1 tarda mucho descargando | Primera vez que se descarga la imagen | Esperar. Las siguientes veces será instantáneo |
| No sabes cómo salir | `psql` tiene su propio comando de salida | `\q` |
