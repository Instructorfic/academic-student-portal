---
title: "2. Docker es la herramienta"
description: "Bloque IV de Taller Integrador — qué es Docker, ecosistema, instalación según el sistema operativo, WSL 2 y primer comando."
---

**Temas del programa:** 4.1.1

## ¿Qué es Docker?

<div class="callout">

Docker es una plataforma y un conjunto de herramientas para construir distribuir ejecutar y administrar aplicaciones mediante contenedores

</div>

Docker facilita el uso de la tecnología

Pero la tecnología de contenedores no pertenece exclusivamente a Docker

## Herramientas del ecosistema

```text
           TECNOLOGÍA DE CONTENEDORES

              ┌────────┼────────┐
              ▼        ▼        ▼

            Docker   Podman    otras
```

En este bloque utilizaremos Docker para los ejemplos y las actividades principales

Podman se presenta como alternativa para reconocer que existen otras implementaciones

## ¿Por qué utilizaremos Docker?

<div class="grid-3">

<div class="card accent-azul">
<strong>Docker CLI</strong>
<p>Permite trabajar desde la terminal</p>
</div>

<div class="card accent-verde">
<strong>Docker Engine</strong>
<p>Administra las operaciones de contenedores</p>
</div>

<div class="card accent-dorado">
<strong>Docker Compose</strong>
<p>Permite definir aplicaciones con varios servicios</p>
</div>

</div>

## ¿Qué herramienta utilizar según tu sistema operativo?

<small>Consulta las instrucciones oficiales antes de instalar y verifica los requisitos de tu equipo</small>

| Sistema | Opción principal para este curso | Observaciones |
|---|---|---|
| Windows 10/11 compatible | Docker Desktop | Utiliza normalmente WSL 2 para contenedores Linux |
| macOS | Docker Desktop | La instalación depende de la arquitectura del equipo |
| Linux | Docker Engine y Docker CLI | Instalación nativa en distribuciones compatibles |
| Windows o macOS | Podman Desktop | Alternativa para trabajar con Podman |
| macOS | OrbStack | Alternativa de terceros para entornos de contenedores y Linux |

OrbStack no es un producto oficial de Docker

## Windows: ¿qué piezas intervienen?

```text
                    Windows
                       │
                       ▼
                Docker Desktop
                       │
                       ▼
                    WSL 2
                       │
                       ▼
                Entorno Linux
                       │
                       ▼
                 Contenedores
```

WSL 2 permite ejecutar un entorno Linux integrado con Windows

Docker Desktop administra los componentes necesarios para trabajar con contenedores Linux

## ¿Para qué sirve WSL 2?

WSL significa Windows Subsystem for Linux

Permite utilizar un entorno Linux desde Windows sin tener que reiniciar la computadora para cambiar de sistema operativo

En este curso puede utilizarse para practicar comandos como

```bash
pwd
ls -lah
mkdir proyecto
```

Docker Desktop y WSL 2 cumplen funciones relacionadas pero diferentes

## macOS: opciones de trabajo

```text
                  macOS
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼

Docker Desktop   OrbStack   Podman Desktop
       │            │            │
       ▼            ▼            ▼
              Entorno Linux
                    │
                    ▼
                Contenedores
```

Las alternativas tienen diferencias de instalación integración licenciamiento y administración

Para las actividades del curso se seguirá la configuración indicada por el docente

## Linux: ejecución nativa

En una distribución compatible puede utilizarse Docker Engine directamente

```text
Distribución Linux
        │
        ▼
    Docker CLI
        │
        ▼
   Docker Engine
        │
        ▼
    Contenedores
```

También existen alternativas como Podman

La instalación y los permisos dependen de la distribución y de la configuración elegida

## ¿Cómo comprobar que Docker funciona?

En una terminal compatible ejecuta

```bash
docker --version
docker compose version
docker info
```

Ejemplo de salida ilustrativa

```text
$ docker --version
Docker version 28.x.x

$ docker compose version
Docker Compose version v2.x.x
```

Los números son ejemplos y pueden cambiar según la versión instalada

`docker info` muestra información del entorno y del motor

## Primer comando con Docker

```bash
docker run --rm hello-world
```

¿Qué ocurre?

```text
1. Docker recibe la petición
2. Busca la imagen local
3. Descarga la imagen si es necesario
4. Crea un contenedor
5. Ejecuta el programa
6. Muestra el resultado
7. Elimina el contenedor al terminar
```

La opción `--rm` elimina el contenedor cuando termina

La imagen puede permanecer en el equipo

## ¿Qué significa cada parte?

```bash
docker run --rm hello-world
```

| Parte | Significado |
|---|---|
| `docker` | Cliente de línea de comandos |
| `run` | Crea y ejecuta un contenedor |
| `--rm` | Elimina el contenedor al terminar |
| `hello-world` | Nombre de la imagen |

Este comando es una comprobación inicial del funcionamiento de Docker

## Qué sigue

Continúa con [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/).
