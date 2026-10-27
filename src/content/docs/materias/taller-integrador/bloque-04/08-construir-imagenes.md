---
title: "8. Construir nuestras propias imágenes"
description: "Bloque IV de Taller Integrador — Dockerfile, instrucciones, etiquetas, capas, .dockerignore, configuración, usuario no root y multi-stage."
---

**Temas del programa:** 4.1.2 y 4.1.3

## De una imagen existente a una imagen propia

Hasta ahora utilizamos imágenes que otras personas construyeron

```text
Registry
    │
    ▼
Imagen existente
    │
    ▼
Contenedor
```

Ahora construiremos una imagen para nuestra aplicación

```text
Código
   │
   ▼
Dockerfile
   │
   ▼
Imagen propia
   │
   ▼
Contenedor
```

## ¿Qué es un Dockerfile?

<div class="callout">

Un Dockerfile es un archivo de texto que describe instrucciones para construir una imagen de contenedor

</div>

Por ejemplo puede indicar

- Qué imagen se utilizará como base
- En qué directorio trabajar
- Qué archivos copiar
- Qué dependencias instalar
- Qué comando ejecutar al iniciar el contenedor

## Dockerfile como receta

```text
RECETA

1. Seleccionar ingredientes
2. Preparar los ingredientes
3. Seguir instrucciones
4. Obtener un resultado
```

```text
DOCKERFILE

FROM
WORKDIR
COPY
RUN
CMD
```

Cada instrucción tiene una función específica durante la construcción o ejecución

## Primer ejemplo con PHP

Archivo `hola.php`

```php
<?php

echo "Hola desde PHP en un contenedor" . PHP_EOL;
```

Archivo `Dockerfile`

```dockerfile
FROM php:8.3-cli

WORKDIR /app

COPY hola.php .

CMD ["php", "hola.php"]
```

La imagen base incluye PHP CLI y el Dockerfile agrega nuestro archivo y define el comando predeterminado

## ¿Qué significa `FROM`?

```dockerfile
FROM php:8.3-cli
```

Indica la imagen base de la que partirá la construcción

```text
Imagen base
php:8.3-cli
      │
      ▼
Nuestra imagen
```

La imagen base ya contiene archivos y componentes necesarios para ejecutar PHP CLI

Conviene elegir una versión compatible con la aplicación y revisar su mantenimiento

## ¿Qué significa `WORKDIR`?

```dockerfile
WORKDIR /app
```

Establece el directorio de trabajo para las instrucciones posteriores que lo utilicen

```text
Contenedor

/
├── usr
├── etc
└── app
    └── hola.php
```

Docker crea el directorio si es necesario durante la construcción

## ¿Qué significa `COPY`?

```dockerfile
COPY hola.php .
```

Copia el archivo desde el contexto de construcción al directorio de trabajo de la imagen

```text
Equipo de desarrollo
       │
       │ COPY
       ▼
Imagen
/app/hola.php
```

La ruta de origen se interpreta dentro del contexto de construcción

## ¿Qué significa `RUN`?

```dockerfile
RUN comando
```

Ejecuta una instrucción durante la construcción de la imagen

Por ejemplo en una imagen basada en Debian o Ubuntu

```dockerfile
RUN apt-get update
```

No es un comando que se repita automáticamente cada vez que se inicia el contenedor

La sintaxis y los paquetes disponibles dependen de la imagen base

## ¿Qué significa `CMD`?

```dockerfile
CMD ["php", "hola.php"]
```

Define el comando predeterminado que se ejecutará al iniciar el contenedor si no se proporciona otro comando que lo sustituya

```text
Imagen
   │
   ▼
docker run
   │
   ▼
php hola.php
```

La forma de lista JSON suele ser preferible para ejecutar directamente el programa y gestionar señales correctamente

## `RUN` contra `CMD`

| `RUN` | `CMD` |
|---|---|
| Se ejecuta durante la construcción | Define el comando o parámetros predeterminados de ejecución |
| Contribuye a construir la imagen | Se utiliza al iniciar el contenedor |
| Puede generar una capa de imagen | No genera por sí mismo una capa de archivos durante la construcción |

No deben utilizarse como si fueran instrucciones equivalentes

## Construir la imagen

Desde el directorio que contiene el Dockerfile y `hola.php`

```bash
docker build -t hola-php:1.0 .
```

Significado

```text
docker build
Construye una imagen

-t hola-php:1.0
Asigna nombre y etiqueta

.
Utiliza el directorio actual como contexto
```

La construcción puede descargar la imagen base si no está disponible localmente

## Ejecutar la imagen

```bash
docker run --rm hola-php:1.0
```

Salida ilustrativa

```text
Hola desde PHP en un contenedor
```

El comando inicia el proceso definido por `CMD`

Como se utiliza `--rm` el contenedor se elimina al terminar

La imagen `hola-php:1.0` permanece disponible localmente

## ¿Qué es una etiqueta?

Una etiqueta permite identificar una versión o variante de una imagen

```text
hola-php:1.0
hola-php:1.1
hola-php:2.0
```

No se debe asumir que una etiqueta garantiza por sí sola que el contenido nunca cambiará

Para identificar contenido de manera más precisa existen referencias por digest

## ¿Qué son las capas de una imagen?

Las imágenes se construyen mediante capas y metadatos

```text
┌─────────────────────────────┐
│ Archivos de la aplicación   │
├─────────────────────────────┤
│ Dependencias                │
├─────────────────────────────┤
│ PHP                         │
├─────────────────────────────┤
│ Archivos de la imagen base  │
└─────────────────────────────┘
```

Las capas permiten reutilizar contenido compartido y optimizar construcciones y descargas

## ¿Por qué importa el orden?

Si una instrucción cambia puede invalidarse parte de la caché de construcción

Menos eficiente para muchos proyectos

```dockerfile
COPY . .
RUN composer install
```

Una alternativa común

```dockerfile
COPY composer.json composer.lock ./
RUN composer install
COPY . .
```

Así los archivos de dependencias pueden aprovechar la caché cuando no cambian

La estrategia correcta depende del sistema de construcción y de la aplicación

## ¿Qué es `.dockerignore`?

Es un archivo que indica qué rutas deben excluirse del contexto de construcción enviado a Docker

Ejemplo

```text
.git
.env
.env.*
node_modules
vendor
storage/logs
```

La lista debe adaptarse al proyecto

No conviene excluir archivos que sean necesarios para construir correctamente la imagen

## ¿Por qué es importante?

El contexto de construcción puede incluir

```text
Código
Dependencias locales
Archivos temporales
Credenciales
Historial Git
Registros
```

Un `.dockerignore` adecuado reduce archivos innecesarios y ayuda a evitar que información sensible se incorpore accidentalmente al contexto

**No es un mecanismo suficiente para proteger secretos por sí solo**

## Configuración y secretos

```text
CÓDIGO

app/
routes/
controllers/
```

```text
CONFIGURACIÓN

APP_ENV
DB_HOST
DB_PORT
```

```text
SECRETOS

DB_PASSWORD
API_KEY
APP_KEY
```

La configuración debe separarse del código siempre que sea posible

Los secretos no deben quedar incrustados en el Dockerfile ni en las capas de la imagen

## Un Dockerfile problemático

```dockerfile
FROM php:latest

ENV DB_PASSWORD=ClaveReal

COPY . /var/www/html

RUN chmod -R 777 /var/www/html

CMD ["php", "-S", "0.0.0.0:8000"]
```

Problemas que debemos reconocer

- La etiqueta `latest` puede cambiar
- Se incorpora una contraseña a la imagen
- Se conceden permisos excesivos
- No se documentan claramente las dependencias
- El servidor integrado de PHP no debe asumirse apropiado para producción

## Principios para mejorar una imagen

<div class="grid-3">

<div class="card accent-azul">
<strong>Previsibilidad</strong>
<p>Elegir versiones compatibles y mantenerlas actualizadas</p>
</div>

<div class="card accent-verde">
<strong>Menor superficie</strong>
<p>Incluir solo componentes necesarios</p>
</div>

<div class="card accent-dorado">
<strong>Privilegios mínimos</strong>
<p>Ejecutar con la identidad adecuada</p>
</div>

</div>

Las decisiones deben responder a los requisitos reales de la aplicación

## ¿Qué significa ejecutar como usuario no root?

En Linux el usuario `root` tiene privilegios muy elevados

Cuando sea compatible con la aplicación podemos configurar un usuario específico

```dockerfile
USER app
```

El usuario debe existir y tener permisos suficientes para ejecutar el programa y acceder a sus archivos

No se debe asumir que todas las imágenes incluyen un usuario llamado `app`

## Multi-stage builds

Algunas aplicaciones necesitan herramientas para construir pero no para ejecutarse

Una construcción por etapas permite separar ambos entornos

```text
Etapa de construcción
Compiladores y herramientas
        │
        ▼
Artefactos generados
        │
        ▼
Etapa de ejecución
Solo componentes necesarios
```

Esta técnica puede reducir el tamaño de la imagen final y la cantidad de herramientas disponibles en ejecución

Su implementación depende del lenguaje y del proceso de construcción

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 2 — Tu sistema en una imagen: Dockerfile](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-2-dockerfile/).

</div>

## Qué sigue

Continúa con [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/).
