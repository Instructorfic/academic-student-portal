---
title: "7. Arquitectura de Docker"
description: "Bloque IV de Taller Integrador — Docker CLI, Engine, containerd, runc, OCI, namespaces y cgroups."
---

## La arquitectura conceptual

```text
                 PERSONA USUARIA
                        │
                        ▼
                   Docker CLI
                        │
                        ▼
                   Docker API
                        │
                        ▼
                  Docker Engine
                        │
           ┌────────────┼────────────┐
           ▼            ▼            ▼
        Imágenes       Redes      Volúmenes
                        │
                        ▼
                   Contenedores
```

Esta es una vista simplificada de las principales responsabilidades

## Docker CLI

CLI significa Command-Line Interface

Es la interfaz que utilizamos desde la terminal

```bash
docker ps
docker images
docker run nginx:alpine
```

La CLI interpreta los argumentos y solicita operaciones a la API de Docker

La CLI por sí sola no es el motor que ejecuta los contenedores

## Docker Engine

Docker Engine proporciona las funciones principales para construir y ejecutar contenedores

En una instalación habitual de Docker Engine para Linux intervienen

```text
Docker CLI
    │
    ▼
Docker API
    │
    ▼
Docker daemon
    │
    ▼
Componentes de ejecución
```

El daemon `dockerd` administra objetos Docker y coordina las operaciones necesarias para crear ejecutar y detener contenedores

## ¿Qué hace Docker daemon?

El daemon puede encargarse de tareas como

- Gestionar imágenes locales
- Crear y administrar contenedores
- Administrar redes Docker
- Administrar volúmenes
- Gestionar operaciones de construcción
- Coordinar operaciones solicitadas por la API

En Docker Desktop el entorno de ejecución se administra mediante componentes adicionales y no debe suponerse que todo ocurre directamente en el kernel del sistema operativo de escritorio

## ¿Qué sucede cuando ejecutas `docker ps`?

```text
Persona usuaria
      │
      │ docker ps
      ▼
Docker CLI
      │
      │ petición a la API
      ▼
Docker Engine
      │
      │ consulta el estado
      ▼
Lista de contenedores
      │
      ▼
Salida en terminal
```

La CLI solicita la información y muestra el resultado

## ¿Qué hay debajo del Engine?

Una arquitectura simplificada de una instalación común puede representarse así

```text
Docker CLI
     │
     ▼
Docker Engine
     │
     ▼
containerd
     │
     ▼
runtime OCI
     │
     ▼
Kernel del entorno
```

Los detalles internos pueden variar según la versión la plataforma y la configuración

No todos los componentes tienen que administrarse directamente por el usuario

## ¿Qué es `containerd`?

`containerd` es un componente que administra aspectos del ciclo de vida de los contenedores y las operaciones relacionadas con sus imágenes

```text
Docker Engine
      │
      ▼
containerd
      │
      ▼
Gestión de contenedores
```

En un uso habitual de Docker el estudiante no necesita ejecutar `containerd` directamente

## ¿Qué es `runc`?

`runc` es una implementación de runtime de bajo nivel compatible con la especificación OCI Runtime

Se encarga de crear y ejecutar procesos de contenedor a partir de la configuración preparada para el runtime

```text
Docker Engine
      │
      ▼
containerd
      │
      ▼
runc
      │
      ▼
Proceso aislado
```

Esta representación simplifica una implementación habitual

## ¿Qué es OCI?

OCI significa Open Container Initiative

Es una iniciativa abierta que mantiene especificaciones para mejorar la interoperabilidad entre herramientas de contenedores

Entre sus especificaciones principales se encuentran

- Image Specification
- Runtime Specification
- Distribution Specification

OCI define estándares y no sustituye herramientas como Docker o Podman

## OCI Image Specification

Describe la estructura de una imagen de contenedor

Incluye elementos como

```text
Manifest
    │
    ├── Configuración
    ├── Capas del sistema de archivos
    └── Descriptores de contenido
```

Su objetivo es favorecer herramientas interoperables para construir transportar y preparar imágenes

## OCI Runtime Specification

Define aspectos de la configuración el entorno de ejecución y el ciclo de vida de un contenedor

Entre otros elementos puede describir

- El proceso que se ejecutará
- El sistema de archivos raíz
- Variables de entorno
- Parámetros de aislamiento
- Configuración de recursos
- Acciones del ciclo de vida

El runtime interpreta la configuración conforme a las capacidades que proporciona su plataforma

## OCI Distribution Specification

Define un protocolo para distribuir contenido como imágenes mediante registries compatibles

```text
Equipo de desarrollo
        │
        │ push
        ▼
      Registry
        │
        │ pull
        ▼
Servidor de despliegue
```

El objetivo es facilitar la distribución de imágenes entre herramientas compatibles

## Docker y OCI son conceptos diferentes

```text
Docker
Herramientas y plataforma
        │
        ▼
Construir y ejecutar contenedores
```

```text
OCI
Estándares abiertos
        │
        ▼
Formatos y contratos de interoperabilidad
```

Una herramienta puede implementar o utilizar estándares abiertos sin que ambos conceptos sean equivalentes

## ¿Y dónde está Linux?

Linux proporciona mecanismos fundamentales utilizados por muchos entornos de contenedores

```text
Runtime
   │
   ▼
Kernel Linux
   │
   ├── Namespaces
   ├── cgroups
   ├── Capacidades y permisos
   └── Otros mecanismos de seguridad
```

El runtime configura el entorno y el kernel aplica los mecanismos correspondientes

## Namespaces: aislamiento

Los namespaces permiten proporcionar vistas aisladas de ciertos recursos del sistema

Algunos ejemplos

| Namespace | Idea general |
|---|---|
| PID | Vista de procesos |
| Network | Interfaces y configuración de red |
| Mount | Vista de montajes |
| UTS | Nombre del host y dominio UTS |
| IPC | Recursos de comunicación entre procesos |
| User | Identidades y mapeos de usuarios |

La disponibilidad y el comportamiento dependen de la plataforma y de la configuración

## Namespace de procesos

En el host puede haber muchos procesos

```text
HOST

PID 100 → nginx
PID 101 → postgres
PID 102 → php
PID 103 → bash
```

Dentro de un namespace de procesos un contenedor puede observar una vista distinta

```text
CONTENEDOR

PID 1 → php
```

El PID que se ve dentro del contenedor no tiene por qué coincidir con el PID del host

## Namespace de red

Un contenedor puede tener su propia vista de interfaces y configuración de red

```text
HOST
 │
 ├── interfaz de red
 │
 └── entorno Docker
       │
       └── CONTENEDOR
             ├── interfaz virtual
             ├── dirección IP
             └── rutas
```

Esto ayuda a separar la configuración de red de distintos entornos de ejecución

La conectividad también depende de las redes y reglas configuradas por Docker y el host

## cgroups: control de recursos

Los cgroups permiten organizar procesos y aplicar controles sobre el consumo de recursos compatibles con la plataforma

Por ejemplo

```text
Contenedor A
CPU y memoria asignadas

Contenedor B
CPU y memoria asignadas
```

El objetivo es gestionar el uso de recursos y reducir el riesgo de que un proceso consuma recursos sin control

No todas las restricciones se comportan igual en todas las versiones o sistemas

## ¿Qué sucede con un límite de memoria?

Ejemplo

```bash
docker run --rm --memory 64m alpine:3.22 sh -c 'sleep 30'
```

Este ejemplo crea un contenedor con un límite de memoria configurado

No demuestra por sí solo qué ocurre cuando una aplicación supera el límite

Si los procesos consumen demasiada memoria pueden producirse errores o terminaciones por falta de memoria

## ¿Por qué importan namespaces y cgroups?

<div class="grid-2">

<div class="card accent-azul">
<strong>Namespaces</strong>
<p>Ayudan a aislar vistas de recursos del sistema</p>
</div>

<div class="card accent-dorado">
<strong>cgroups</strong>
<p>Ayudan a controlar recursos consumidos por grupos de procesos</p>
</div>

</div>

Junto con otros mecanismos contribuyen al funcionamiento de los contenedores Linux

## El modelo mental completo

```text
Persona usuaria
      │
      ▼
Docker CLI
      │
      ▼
Docker Engine
      │
      ▼
Componentes de ejecución
      │
      ▼
Runtime OCI
      │
      ▼
Kernel del entorno
      │
      ├── Namespaces
      ├── cgroups
      └── otros mecanismos
      │
      ▼
Proceso del contenedor
```

La arquitectura ayuda a comprender las responsabilidades y a diagnosticar fallos

## Qué sigue

Continúa con [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/).
