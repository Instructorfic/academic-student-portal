---
title: "4. Operar Docker"
description: "Bloque IV de Taller Integrador — docker ps, imágenes, ejecución en segundo plano, registros, inspección, recursos y ciclo de vida."
---

**Temas del programa:** 4.1.2

**Observar antes de modificar**

## ¿Qué es `docker ps`?

```bash
docker ps
```

Muestra los contenedores que están ejecutándose

Ejemplo de salida ilustrativa

```text
CONTAINER ID   IMAGE         COMMAND                  STATUS
a13c9e7d2b10   nginx:alpine  "/docker-entrypoint…"    Up 2 minutes

PORTS                  NAMES
127.0.0.1:8080->80/tcp web
```

Los identificadores y tiempos son ficticios

## ¿Qué información muestra?

| Columna | Significado |
|---|---|
| `CONTAINER ID` | Identificador abreviado |
| `IMAGE` | Imagen utilizada |
| `COMMAND` | Comando configurado |
| `STATUS` | Estado actual |
| `PORTS` | Puertos publicados o expuestos |
| `NAMES` | Nombre asignado al contenedor |

El nombre puede facilitar la administración sin tener que copiar el ID

## ¿Y los contenedores detenidos?

```bash
docker ps -a
```

Ejemplo de salida ilustrativa

```text
CONTAINER ID   IMAGE         STATUS                      NAMES
a13c9e7d2b10   nginx:alpine  Up 2 minutes                web
b51f0c8a8e90   hello-world   Exited (0) 5 minutes ago    hopeful_morse
```

`docker ps` muestra los contenedores activos

`docker ps -a` incluye también los contenedores detenidos y terminados

## ¿Qué imágenes tengo?

```bash
docker images
```

Ejemplo de salida ilustrativa

```text
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         alpine    91ca84b4e7d1   2 weeks ago    48MB
hello-world   latest    74cc54e27dc4   3 months ago   10kB
```

Los identificadores tamaños y fechas son ejemplos

Una imagen puede existir localmente aunque no haya ningún contenedor ejecutándose con ella

## Comandos para obtener imágenes

```bash
docker pull nginx:alpine
```

Descarga una imagen desde un registry

```bash
docker image ls
```

Lista las imágenes locales

```bash
docker image inspect nginx:alpine
```

Muestra metadatos de una imagen

```bash
docker image rm nginx:alpine
```

Elimina una referencia de imagen local cuando no existan dependencias que impidan hacerlo

## Ejecutar un servidor web

```bash
docker run -d \
  --name web \
  -p 127.0.0.1:8080:80 \
  nginx:alpine
```

Ahora podemos consultar

```bash
docker ps
```

Y abrir en el navegador

```text
http://localhost:8080
```

Si el puerto está ocupado o Docker no está disponible el resultado será diferente

## ¿Qué significa `-d`?

```bash
docker run -d nginx:alpine
```

La opción `-d` solicita ejecutar el contenedor en segundo plano

Sin ella la terminal puede permanecer conectada al proceso o mostrar directamente su salida

El comportamiento exacto también depende del programa ejecutado y de cómo maneja la entrada y salida estándar

## ¿Cómo consultamos los registros?

```bash
docker logs web
```

Para seguir la salida conforme aparecen nuevas líneas

```bash
docker logs -f web
```

Para limitar la cantidad inicial de líneas

```bash
docker logs --tail 50 web
```

Los registros ayudan a entender qué hizo el proceso y por qué pudo fallar

No todos los programas envían automáticamente todos sus registros a la salida estándar

## ¿Cómo entramos a un contenedor?

```bash
docker exec -it web sh
```

Descomposición

```text
docker exec
Ejecuta un proceso en un contenedor existente

-it
Permite interactuar desde la terminal

web
Nombre del contenedor

sh
Intérprete de comandos solicitado
```

No todas las imágenes incluyen `bash`

Las imágenes mínimas pueden proporcionar solamente `sh` u otras herramientas reducidas

## ¿Qué podemos observar dentro?

```bash
pwd
ls -lah
ps
```

Los comandos disponibles dependen de la imagen

Al salir de la terminal

```bash
exit
```

normalmente termina la sesión interactiva pero no necesariamente el proceso principal del contenedor

## Inspeccionar un contenedor

```bash
docker inspect web
```

Permite consultar información estructurada como

- Configuración de ejecución
- Direcciones de red
- Montajes
- Estado del contenedor
- Imagen de origen
- Configuración de puertos

Para obtener solo algunos campos se puede utilizar el formato de salida de Docker

```bash
docker inspect --format '{{.State.Status}}' web
```

Salida ilustrativa

```text
running
```

## ¿Qué recursos consume?

```bash
docker stats
```

Muestra información dinámica sobre el consumo de recursos de los contenedores

Ejemplo ilustrativo

```text
CONTAINER   CPU %   MEM USAGE / LIMIT   MEM %
web         0.10%   12MiB / 2GiB        0.59%
```

Los valores dependen de la aplicación del host y de los límites configurados

## Detener iniciar y eliminar

```bash
docker stop web
```

Solicita detener el contenedor

```bash
docker start web
```

Inicia un contenedor existente que está detenido

```bash
docker rm web
```

Elimina el contenedor detenido

```bash
docker image rm nginx:alpine
```

Elimina la imagen local si Docker permite retirarla

<div class="callout-alcance">

Detener un contenedor no es lo mismo que eliminarlo y eliminar un contenedor no equivale a eliminar la imagen

</div>

## El ciclo de vida

```text
             IMAGEN
                │
                ▼
          CREAR CONTENEDOR
                │
                ▼
           CONTENEDOR
                │
                ▼
          EJECUTAR PROCESO
             │       │
           stop    termina
             │       │
             ▼       ▼
          DETENIDO  EXITED
             │
             ▼
            start
```

Un contenedor detenido puede volver a iniciarse si su configuración lo permite

Un contenedor eliminado debe crearse nuevamente a partir de una imagen

## ¿Cómo se relacionan `run` y `create`?

```bash
docker create --name web nginx:alpine
```

Crea el contenedor sin iniciar el proceso principal

```bash
docker start web
```

Inicia el contenedor creado

En cambio

```bash
docker run --name web nginx:alpine
```

es una forma abreviada de solicitar la creación y ejecución del contenedor

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 1 — Primeros contenedores](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-1-primeros-contenedores/).

</div>

## Qué sigue

Continúa con [5. Linux básico para trabajar con contenedores](/materias/taller-integrador/bloque-04/05-linux-basico/).
