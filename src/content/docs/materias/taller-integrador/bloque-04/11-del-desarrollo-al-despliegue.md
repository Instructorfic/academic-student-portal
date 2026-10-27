---
title: "11. Del desarrollo al despliegue"
description: "Bloque IV de Taller Integrador — desarrollo y producción, distribución y versionado de imágenes, reproducibilidad y errores frecuentes."
---

**Temas del programa:** 4.3

## Desarrollo y producción

En desarrollo buscamos facilidad para modificar el código y observar resultados

En producción necesitamos además controlar disponibilidad seguridad configuración datos y recuperación

```text
DESARROLLO

Código + imágenes + Compose
```

```text
PRODUCCIÓN

Imágenes versionadas
+ configuración controlada
+ datos persistentes
+ monitoreo
+ respaldos
+ seguridad
```

Contenerizar no sustituye la planeación de operación

## ¿Qué llevamos al servidor?

```text
Aplicación
    │
    ├── Imagen
    ├── Configuración
    ├── Datos persistentes
    ├── Redes
    └── Dependencias de infraestructura
```

No necesitamos trasladar literalmente toda la computadora del desarrollador

Necesitamos definir los artefactos y servicios necesarios para ejecutar la aplicación en el ambiente destino

## Distribución de imágenes

```text
Equipo de desarrollo
        │
        ▼
docker build
        │
        ▼
Imagen versionada
        │
        ▼
Registry
        │
        ▼
Servidor
        │
        ▼
docker compose up
```

El registry puede ser Docker Hub o un registro privado como GitLab Container Registry

El servidor debe tener acceso autorizado al registro y a la configuración requerida

## ¿Por qué versionar imágenes?

Ejemplo

```text
reservafic:1.0.0
reservafic:1.1.0
reservafic:1.2.0
```

Las etiquetas permiten identificar versiones de la aplicación

Para despliegues reproducibles debemos controlar también las imágenes base las dependencias y la configuración

Una etiqueta por sí sola no garantiza que el contenido de una referencia sea inmutable

## ¿Qué significa reproducibilidad?

```text
Equipo A
   │
   ▼
Repositorio
   │
   ▼
Definición de ambiente
   │
   ▼
Ejecución
```

```text
Equipo B
   │
   ▼
Repositorio
   │
   ▼
Definición de ambiente
   │
   ▼
Ejecución
```

Buscamos que ambos equipos utilicen versiones y configuraciones controladas

El resultado puede seguir dependiendo de diferencias de arquitectura recursos y del entorno de ejecución

## ¿Cómo diagnosticamos un contenedor detenido?

Primero observamos

```bash
docker ps -a
```

Después consultamos sus registros

```bash
docker logs nombre_contenedor
```

Y examinamos su configuración

```bash
docker inspect nombre_contenedor
```

No comenzamos eliminando todo ni reconstruyendo la aplicación sin entender el problema

## Error frecuente: puerto ocupado

Supongamos que aparece un error al publicar

```text
Bind for 127.0.0.1:8080 failed
port is already allocated
```

Una causa posible es que otro proceso o contenedor ya utilice el puerto

Podemos revisar

```bash
docker ps
```

También debemos comprobar los procesos y servicios del host mediante las herramientas apropiadas para el sistema operativo

## Error frecuente: conexión rechazada

```text
Aplicación
    │
    ▼
localhost:5432
    │
    ▼
Connection refused
```

Preguntas de diagnóstico

- ¿PostgreSQL está ejecutándose?
- ¿Está listo para aceptar conexiones?
- ¿La dirección es correcta?
- ¿La aplicación está dentro o fuera de un contenedor?
- ¿El puerto corresponde al servicio correcto?
- ¿Los servicios comparten la red adecuada?

## Error frecuente: permisos denegados

```text
Permission denied
```

Antes de cambiar permisos revisamos

```bash
whoami
id
ls -l archivo
```

También debemos verificar

- Quién es el propietario
- Qué grupos intervienen
- Qué permisos tiene el directorio padre
- Qué usuario ejecuta el proceso del contenedor
- Si hay un volumen o bind mount involucrado

No utilices `chmod 777` como solución automática

## Error frecuente: desaparecieron los datos

Primero preguntamos dónde se almacenaban

```text
¿Capa de escritura del contenedor?
        │
        ▼
Datos ligados al ciclo de vida del contenedor
```

```text
¿Volumen nombrado?
        │
        ▼
Datos separados del ciclo de vida del contenedor
```

Después revisamos si el volumen existe y si fue eliminado

Los respaldos siguen siendo necesarios aunque utilicemos volúmenes

## Comandos para revisar el entorno

```bash
docker version
docker info
docker ps -a
docker images
docker network ls
docker volume ls
```

Para un contenedor específico

```bash
docker inspect nombre_contenedor
docker logs nombre_contenedor
docker stats
```

Estos comandos ayudan a obtener evidencia antes de cambiar la configuración

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 4 — Despliegue en un servidor con HTTPS](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-4-despliegue/).

</div>

## Qué sigue

Continúa con [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/).
