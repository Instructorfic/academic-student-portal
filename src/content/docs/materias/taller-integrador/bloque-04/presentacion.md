---
title: "Presentación — Bloque IV"
description: "Bloque IV de Taller Integrador — qué aprenderemos, el problema de «en mi máquina funciona» y qué necesitamos para resolverlo."
---

## ¿Qué aprenderemos?

Al terminar este bloque podrás explicar

- Qué es la tecnología de contenedores
- Qué problemas resuelve y cuáles no
- Cómo se relacionan Docker y los estándares abiertos
- Cómo se construye una imagen
- Cómo se ejecuta y administra un contenedor
- Cómo se conectan los servicios de una aplicación
- Cómo se conservan los datos
- Cómo se identifican errores comunes
- Qué elementos deben considerarse para desplegar una aplicación

## Antes de hablar de Docker

<div class="callout-alcance">

Primero vamos a comprender la tecnología

Después utilizaremos Docker para trabajar con ella

</div>

<div class="grid-2">

<div class="card accent-azul">
<strong>Tecnología</strong>
<p>Contenedores de software</p>
<p>Conceptos y principios de funcionamiento</p>
</div>

<div class="card accent-verde">
<strong>Herramienta</strong>
<p>Docker</p>
<p>Comandos y componentes para trabajar con contenedores</p>
</div>

</div>

## ¿Qué problema queremos resolver?

Imagina que desarrollaste una aplicación para administrar reservaciones

```text
                ReservaFIC

                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Frontend               API
                                  │
                                  ▼
                              PostgreSQL
```

La aplicación funciona en tu computadora

Pero debes entregarla a otro equipo para que la ejecute

## En mi máquina funciona

<div class="grid-3">

<div class="card accent-azul">
<strong>Tu computadora</strong>
<p>PHP 8.3</p>
<p>Node.js 24</p>
<p>PostgreSQL 16</p>
</div>

<div class="card accent-dorado">
<strong>La computadora de tu compañero</strong>
<p>PHP 8.2</p>
<p>Node.js 22</p>
<p>PostgreSQL 15</p>
</div>

<div class="card accent-rojo">
<strong>El servidor</strong>
<p>Otra combinación</p>
<p>Otras configuraciones</p>
</div>

</div>

## ¿Por qué puede fallar?

El código puede ser el mismo pero el ambiente puede ser diferente

```text
                   MISMO CÓDIGO

           ┌──────────┼──────────┐
           ▼          ▼          ▼

        Equipo A   Equipo B   Servidor

        PHP 8.3    PHP 8.2    PHP 8.3
        Node 24    Node 22    Node 20
        Config A   Config B   Config C
```

Un programa depende de algo más que sus archivos de código

## El problema tiene varias partes

<div class="grid-3">

<div class="card accent-rojo">
<strong>Dependencias</strong>
<p>¿Qué bibliotecas necesita?</p>
<p>¿Qué servicios utiliza?</p>
</div>

<div class="card accent-dorado">
<strong>Versiones</strong>
<p>¿Qué versión de PHP?</p>
<p>¿Qué versión de Node.js?</p>
</div>

<div class="card accent-azul">
<strong>Configuración</strong>
<p>¿Qué variables necesita?</p>
<p>¿Qué puertos utiliza?</p>
</div>

</div>

## ¿Qué necesitamos?

Queremos definir de forma controlada

```text
Aplicación
    +
Dependencias
    +
Archivos necesarios
    +
Configuración de ejecución
```

Para poder crear un ambiente reproducible en diferentes equipos compatibles

<div class="callout">

Esta es una de las necesidades que los contenedores ayudan a resolver

</div>

## Temas del bloque

1. [¿Qué es un contenedor?](/materias/taller-integrador/bloque-04/01-que-es-un-contenedor/)
2. [Docker es la herramienta](/materias/taller-integrador/bloque-04/02-docker-es-la-herramienta/)
3. [Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)
4. [Operar Docker](/materias/taller-integrador/bloque-04/04-operar-docker/)
5. [Linux básico para trabajar con contenedores](/materias/taller-integrador/bloque-04/05-linux-basico/)
6. [Usuarios, grupos y permisos](/materias/taller-integrador/bloque-04/06-usuarios-grupos-y-permisos/)
7. [Arquitectura de Docker](/materias/taller-integrador/bloque-04/07-arquitectura-de-docker/)
8. [Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)
9. [Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/)
10. [Seguridad de contenedores](/materias/taller-integrador/bloque-04/10-seguridad-de-contenedores/)
11. [Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)
12. [Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/)
13. [Aplicación integradora](/materias/taller-integrador/bloque-04/13-aplicacion-integradora/)
14. [Cierre y autoevaluación](/materias/taller-integrador/bloque-04/14-cierre-y-autoevaluacion/)
