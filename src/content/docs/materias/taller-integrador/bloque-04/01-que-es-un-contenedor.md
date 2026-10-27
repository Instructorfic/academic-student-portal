---
title: "1. ¿Qué es un contenedor?"
description: "Bloque IV de Taller Integrador — definición, contenedor frente a máquina virtual, contenedores en Windows y macOS y lo que no resuelven."
---

**Temas del programa:** 4.1.1

## Una primera definición

<div class="callout">

Un contenedor es un entorno de ejecución aislado para uno o varios procesos que utilizan un conjunto definido de archivos y dependencias

</div>

En el caso habitual de contenedores Linux

- Los procesos se ejecutan utilizando el kernel Linux disponible en su entorno de ejecución
- El aislamiento se implementa mediante mecanismos del sistema operativo
- Los archivos necesarios para ejecutar la aplicación se proporcionan mediante una imagen y sus capas

## Una aplicación puede dividirse

```text
                  APLICACIÓN

       ┌────────────┼────────────┐
       ▼            ▼            ▼

    Frontend       API       PostgreSQL

   contenedor   contenedor   contenedor
```

Cada componente puede tener su propio ciclo de vida y configuración

<div class="callout-alcance">

Separar componentes es una decisión de arquitectura y no una obligación para todas las aplicaciones

</div>

## Una analogía para comenzar

Imagina una mudanza

```text
ANTES

Ropa
Libros
Herramientas
Documentos

Todo mezclado
```

```text
DESPUÉS

Caja 1 → libros
Caja 2 → herramientas
Caja 3 → documentos
```

Cada caja organiza los elementos que deben trasladarse juntos

Los contenedores ayudan a empaquetar y ejecutar software con sus archivos necesarios

## La analogía tiene un límite

Una caja es un objeto físico

Un contenedor es un entorno de ejecución que el sistema operativo administra

```text
Aplicación
    │
    ▼
Proceso aislado
    │
    ▼
Sistema operativo
```

<div class="callout-alcance">

La analogía ayuda a comprender la idea de organización y aislamiento pero no describe el funcionamiento interno

</div>

## Contenedor y máquina virtual

<div class="grid-2">

<div class="card accent-azul">
<strong>Máquina virtual</strong>
<p>Virtualiza hardware</p>
<p>Ejecuta un sistema operativo invitado con su propio kernel</p>
</div>

<div class="card accent-verde">
<strong>Contenedor Linux</strong>
<p>Aísla procesos</p>
<p>Comparte el kernel de su entorno Linux</p>
</div>

</div>

## Arquitectura de una máquina virtual

```text
┌───────────────────────────────┐
│ Aplicación                    │
├───────────────────────────────┤
│ Bibliotecas y dependencias    │
├───────────────────────────────┤
│ Sistema operativo invitado    │
├───────────────────────────────┤
│ Kernel del sistema invitado   │
└───────────────────────────────┘
                │
                ▼
            Hipervisor
                │
                ▼
             Hardware
```

## Arquitectura de un contenedor Linux

```text
┌───────────────────────────────┐
│ Aplicación                    │
├───────────────────────────────┤
│ Bibliotecas y dependencias    │
├───────────────────────────────┤
│ Archivos de la imagen         │
└───────────────────────────────┘
                │
                ▼
       Runtime de contenedores
                │
                ▼
┌───────────────────────────────┐
│ Kernel Linux compartido       │
└───────────────────────────────┘
                │
                ▼
             Hardware
```

## La diferencia fundamental

| Característica | Máquina virtual | Contenedor Linux |
|---|---|---|
| Unidad principal | Sistema operativo virtualizado | Procesos aislados |
| Kernel | Kernel propio del invitado | Comparte el kernel de su entorno |
| Archivos | Sistema operativo completo | Archivos de la imagen |
| Inicio | Arranca un sistema operativo | Inicia los procesos configurados |
| Sobrecarga | Generalmente mayor | Generalmente menor |
| Aislamiento | Frontera de virtualización | Aislamiento a nivel de sistema operativo |

La sobrecarga y el nivel de aislamiento dependen de la implementación y la configuración

## ¿Los contenedores siempre utilizan Linux?

No necesariamente

Existen contenedores Linux y contenedores Windows con diferentes requisitos

En este bloque estudiaremos principalmente contenedores Linux porque son la base de muchos entornos modernos de desarrollo y despliegue

```text
Contenedores
    │
    ├── Contenedores Linux
    │
    └── Contenedores Windows
```

No se debe confundir el sistema operativo de tu computadora con el sistema operativo del entorno donde se ejecuta el contenedor

## ¿Qué pasa en Windows y macOS?

Una computadora Windows o macOS no proporciona de forma nativa el kernel Linux que necesitan los contenedores Linux

Por eso las herramientas habituales utilizan un entorno Linux

```text
Windows o macOS
       │
       ▼
Entorno Linux
       │
       ▼
Motor de contenedores
       │
       ▼
Contenedores Linux
```

En Windows se utiliza comúnmente WSL 2 con Docker Desktop

En macOS Docker Desktop utiliza una máquina virtual Linux administrada por la herramienta

## ¿Qué puede contener una imagen?

```text
Imagen de una aplicación

├── Archivos del programa
├── Bibliotecas necesarias
├── Dependencias
├── Certificados requeridos
├── Archivos de configuración predeterminados
└── Instrucciones de ejecución
```

Una imagen no tiene que contener todos los elementos de una computadora

Por ejemplo no necesita incluir un escritorio gráfico si ejecutará una API web

## ¿Qué no resuelven los contenedores automáticamente?

Los contenedores no garantizan por sí solos

- Que el código sea correcto
- Que la aplicación sea segura
- Que existan respaldos
- Que los datos sean persistentes
- Que el sistema soporte miles de usuarios
- Que todos los equipos tengan idéntico rendimiento
- Que un despliegue sea de alta disponibilidad

<div class="banner-node">

Contenerizar una aplicación no sustituye el diseño de software ni la administración de infraestructura

</div>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 1 — Primeros contenedores](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-1-primeros-contenedores/).

</div>

## Qué sigue

Continúa con [2. Docker es la herramienta](/materias/taller-integrador/bloque-04/02-docker-es-la-herramienta/).
