---
title: "9. Docker Compose"
description: "Bloque IV de Taller Integrador — servicios, comunicación entre servicios, base de datos, configuración sensible, depends_on y health checks."
---

**Temas del programa:** 4.2

**Definir una aplicación con varios servicios**

## Cuando un contenedor no es suficiente

Nuestra aplicación puede requerir

```text
ReservaFIC

├── app
├── db
└── proxy
```

Cada servicio tiene una responsabilidad diferente

Necesitamos definir cómo se construye cómo se conecta y cómo se ejecuta cada componente

## El problema de administrar cada servicio manualmente

```bash
docker network create reservafic
docker volume create datos_pg
docker run ...
docker run ...
docker run ...
```

Una aplicación multicontenedor puede requerir muchas opciones de configuración

Si cada integrante del equipo ejecuta comandos diferentes el ambiente puede volverse difícil de reproducir

## ¿Qué es Docker Compose?

<div class="callout">

Docker Compose permite definir y administrar aplicaciones multicontenedor mediante un archivo de configuración

</div>

El archivo describe servicios redes volúmenes y otras opciones de ejecución

```text
compose.yaml
     │
     ▼
docker compose up
     │
     ▼
Aplicación multicontenedor
```

## Un primer archivo Compose

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "127.0.0.1:8080:80"
```

Este archivo define un servicio llamado `web`

El servicio utiliza la imagen `nginx:alpine` y publica el puerto 80 del contenedor en el puerto 8080 del host

El puerto se publica solamente en la interfaz local

## ¿Cómo ejecutamos Compose?

En el directorio que contiene `compose.yaml`

```bash
docker compose up -d
```

Consulta los servicios y contenedores

```bash
docker compose ps
```

Consulta los registros

```bash
docker compose logs
```

Sigue los registros

```bash
docker compose logs -f
```

## ¿Cómo detenemos el proyecto?

```bash
docker compose down
```

Detiene y elimina los recursos de contenedores y redes del proyecto que administra Compose según su configuración

Los volúmenes no se eliminan normalmente con este comando

```bash
docker compose down -v
```

Solicita eliminar también los volúmenes asociados incluidos en el alcance del comando

**Eliminar volúmenes puede provocar pérdida de datos**

## Un ejemplo con dos servicios

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "127.0.0.1:8080:80"

  app:
    image: php:8.3-cli
    command: ["php", "-v"]
```

Este ejemplo demuestra la definición de dos servicios

No constituye todavía una aplicación web completa porque no conecta el servidor Nginx con una aplicación PHP funcional

## ¿Cómo se comunican los servicios?

Compose crea una red para el proyecto de forma predeterminada

```text
Red del proyecto

┌──────────┐          ┌──────────┐
│ web      │          │ app      │
│          │          │          │
└──────────┘          └──────────┘
```

Los servicios conectados a esa red pueden localizarse mediante el nombre del servicio cuando la configuración y el protocolo son correctos

El nombre de servicio no reemplaza la configuración de puertos ni hace que una aplicación escuche automáticamente

## Una aplicación con base de datos

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: reservafic
      POSTGRES_USER: reservafic
      POSTGRES_PASSWORD: ejemplo-no-produccion
    volumes:
      - datos_pg:/var/lib/postgresql/data

volumes:
  datos_pg:
```

Este ejemplo crea un servicio de PostgreSQL y un volumen nombrado para sus datos

La contraseña es ilustrativa y no debe utilizarse en producción

## ¿Qué significa cada parte?

```text
services
    │
    └── db
         │
         ├── image
         ├── environment
         └── volumes

volumes
    │
    └── datos_pg
```

`services` define los componentes de la aplicación

`environment` establece variables de entorno

`volumes` declara almacenamiento persistente administrado por Docker

## Configuración sensible en Compose

Las variables de entorno pueden servir para configurar una aplicación pero no deben considerarse un almacén de secretos de producción

Para un entorno real debemos evaluar

- Mecanismos de gestión de secretos
- Permisos de acceso
- Archivos excluidos de Git
- Rotación de credenciales
- Separación de ambientes
- Riesgos de exponer variables en registros o herramientas de diagnóstico

Un archivo `.env` tampoco debe publicarse con credenciales reales en un repositorio público

## `depends_on` no significa que todo esté listo

Un servicio puede haberse iniciado aunque la aplicación todavía no esté lista para recibir conexiones

```text
Contenedor DB iniciado
        │
        ▼
PostgreSQL inicializando
        │
        ▼
PostgreSQL listo
```

El orden de inicio y la disponibilidad del servicio son conceptos distintos

Las aplicaciones deben manejar errores temporales y reintentos cuando corresponda

## Health checks

Un health check permite definir una comprobación de salud para un contenedor cuando la imagen o la configuración lo permiten

```text
Servicio
   │
   ▼
Comprobación
   │
   ├── no saludable
   │
   └── saludable
```

Un servicio puede estar ejecutándose y aun así no responder correctamente a las solicitudes

La comprobación debe evaluar una condición significativa para el servicio

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 3 — Ambiente reproducible con Docker Compose](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-3-docker-compose/).

</div>

## Qué sigue

Continúa con [10. Seguridad de contenedores](/materias/taller-integrador/bloque-04/10-seguridad-de-contenedores/).
