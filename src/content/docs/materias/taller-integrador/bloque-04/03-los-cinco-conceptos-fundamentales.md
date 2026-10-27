---
title: "3. Los cinco conceptos fundamentales"
description: "Bloque IV de Taller Integrador — imagen, contenedor, registry, red y volumen."
---

**Temas del programa:** 4.1.1

**Imagen · Contenedor · Registry · Red · Volumen**

## 1 — Imagen

<div class="callout">

Una imagen es un paquete de solo lectura que contiene los archivos y la configuración necesarios para crear contenedores

</div>

Por ejemplo una imagen puede incluir

```text
PHP
+
Extensiones necesarias
+
Archivos de la aplicación
+
Instrucciones de ejecución
```

La imagen funciona como una plantilla para crear contenedores

## Una imagen puede crear varios contenedores

```text
               IMAGEN
             php-app:1.0
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
   Contenedor A Contenedor B Contenedor C
```

Los contenedores pueden compartir la misma imagen de origen

Cada uno tiene su propio estado de ejecución y su propia capa de escritura

## 2 — Contenedor

<div class="callout">

Un contenedor es una instancia creada a partir de una imagen con un proceso y una configuración de ejecución

</div>

```text
Imagen
   │
   │ docker run
   ▼
Contenedor
   │
   ▼
Proceso en ejecución
```

Un contenedor puede estar ejecutándose detenido o haber terminado

No es lo mismo un contenedor que un proceso necesariamente activo

## Imagen contra contenedor

| Imagen | Contenedor |
|---|---|
| Plantilla | Instancia |
| Se construye o descarga | Se crea a partir de una imagen |
| Se comparte entre ejecuciones | Tiene un ciclo de vida propio |
| Sus capas son de solo lectura | Tiene una capa de escritura |
| Se identifica por repositorio y etiqueta o digest | Se identifica por ID y nombre |

Los datos importantes no deben depender únicamente de la capa de escritura del contenedor

## 3 — Registry

Un registry es un servicio que almacena y distribuye imágenes

```text
             Registry
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
   Docker Hub       GitLab Container Registry
```

Ejemplos de operaciones

```bash
docker pull nginx:alpine
docker push registro.example.com/equipo/app:1.0.0
```

`pull` descarga una imagen

`push` publica una imagen en un registry al que tengas acceso

## ¿Qué es Docker Hub?

Docker Hub es un servicio de registro de imágenes que permite buscar descargar y distribuir imágenes

Antes de utilizar una imagen conviene revisar

- Quién la publica
- Qué software contiene
- Qué versiones ofrece
- Cuándo se actualizó
- Qué instrucciones y advertencias documenta
- Si su origen es confiable

No todas las imágenes disponibles en Internet son apropiadas para producción

## 4 — Red

Una aplicación puede tener componentes separados

```text
frontend ─────► api ─────► db
```

Para comunicarse necesitan conectividad y una configuración correcta

Docker permite crear redes virtuales y conectar contenedores a ellas

```text
Red del proyecto

  frontend ─── api ─── db
```

La red permite la comunicación entre servicios según sus conexiones y reglas

## ¿Qué significa `localhost`?

Dentro de un contenedor

```text
CONTENEDOR APP

localhost
    │
    ▼
Este mismo contenedor
```

No significa automáticamente el contenedor de PostgreSQL ni la computadora del usuario

Si la aplicación necesita conectarse a otro servicio debemos usar una dirección accesible desde su entorno de red

## Comunicación con Docker Compose

Si el proyecto define los servicios

```yaml
services:
  app:
    image: ejemplo-app:1.0
  db:
    image: postgres:16
```

La aplicación puede utilizar el nombre del servicio como nombre de host dentro de la red de Compose

```text
DB_HOST=db
DB_PORT=5432
```

Esto funciona cuando los servicios comparten una red apropiada y la base de datos está lista para recibir conexiones

## ¿Qué es un puerto?

Un puerto identifica un punto de comunicación de red asociado a un servicio

PostgreSQL utiliza normalmente el puerto `5432`

Una publicación de puerto puede relacionar

```text
HOST                         CONTENEDOR

localhost:5433 ─────────────► 5432
```

La aplicación que se conecta desde el host utiliza el puerto publicado

Los servicios conectados a la misma red Docker pueden comunicarse mediante el puerto interno del servicio

## ¿Cómo se publica un puerto?

```bash
docker run -d \
  --name web \
  -p 127.0.0.1:8080:80 \
  nginx:alpine
```

La publicación significa

```text
127.0.0.1:8080
        │
        ▼
Puerto 80 del contenedor
```

En este ejemplo el puerto del host se publica solamente en la interfaz local

Si se omite la dirección de host el comportamiento de publicación puede exponer el puerto en otras interfaces según la configuración de Docker y del sistema

## 5 — Volumen

Imagina una base de datos que almacena reservaciones

```text
Contenedor PostgreSQL
          │
          ▼
       Datos
```

Si eliminamos el contenedor no debemos asumir que los datos guardados únicamente en su capa de escritura se conservarán

Para persistir información utilizamos almacenamiento separado del ciclo de vida del contenedor

## ¿Qué es un volumen?

<div class="callout">

Un volumen es un mecanismo de almacenamiento administrado por Docker que permite conservar datos fuera de la capa de escritura del contenedor

</div>

```text
Contenedor
    │
    ▼
PostgreSQL
    │
    ▼
Volumen persistente
    │
    ▼
Datos
```

Eliminar un contenedor no elimina automáticamente todos los volúmenes asociados

## Volumen y bind mount

Son dos formas de proporcionar almacenamiento a un contenedor

| Volumen | Bind mount |
|---|---|
| Docker administra su ubicación | Se utiliza una ruta del host |
| Adecuado para datos persistentes | Útil para compartir archivos del proyecto |
| Puede sobrevivir a la eliminación del contenedor | Depende de la ubicación y gestión de los archivos del host |

Ejemplos conceptuales

```text
Volumen:
datos_postgres → directorio de datos

Bind mount:
./src → /app/src
```

## Los cinco conceptos juntos

```text
                 REGISTRY
                     │
                   pull
                     ▼
                  IMAGEN
                     │
                    run
                     ▼
                CONTENEDOR
                 /       \
                ▼         ▼
              RED       VOLUMEN
                │         │
                ▼         ▼
           comunicación  datos
```

Estos conceptos forman la base para comprender una aplicación contenerizada

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 1 — Primeros contenedores](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-1-primeros-contenedores/).

</div>

## Qué sigue

Continúa con [4. Operar Docker](/materias/taller-integrador/bloque-04/04-operar-docker/).
