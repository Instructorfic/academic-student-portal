---
title: "14. Cierre y autoevaluación"
description: "Bloque IV de Taller Integrador — preguntas de comprensión, mapa completo, fuentes oficiales e idea central del bloque."
---

## Comprueba tu comprensión

### Pregunta 1

#### ¿Qué es un contenedor?

Respuesta esperada

Un entorno de ejecución aislado para procesos que utilizan los archivos y dependencias necesarios para ejecutar una aplicación

### Pregunta 2

#### ¿Docker y los contenedores son lo mismo?

Respuesta

```text
NO
```

```text
Contenedores = tecnología

Docker = plataforma y conjunto de herramientas
```

### Pregunta 3

#### ¿Qué diferencia existe entre imagen y contenedor?

Respuesta esperada

La imagen es una plantilla de solo lectura y el contenedor es una instancia creada a partir de ella con una configuración y un ciclo de vida propios

### Pregunta 4

#### ¿Para qué sirve un volumen?

Respuesta esperada

Para conservar datos fuera de la capa de escritura del contenedor y separarlos de su ciclo de vida

### Pregunta 5

#### ¿Qué ocurre con `localhost` dentro de un contenedor?

Respuesta esperada

Normalmente identifica al propio contenedor y no automáticamente a otro servicio ni a la computadora del usuario

### Pregunta 6

#### ¿Qué diferencia existe entre `RUN` y `CMD`?

Respuesta esperada

`RUN` ejecuta instrucciones durante la construcción de la imagen y `CMD` define el comando o los parámetros predeterminados al iniciar el contenedor

### Pregunta 7

#### ¿Qué significa el permiso `750`?

Respuesta esperada

```text
750 = rwx r-x ---
```

El propietario tiene lectura escritura y ejecución

El grupo tiene lectura y ejecución

Los demás no tienen permisos básicos

### Pregunta 8

#### ¿Qué hacen namespaces y cgroups?

Respuesta esperada

Los namespaces proporcionan aislamiento de vistas de recursos del sistema y los cgroups permiten controlar recursos utilizados por grupos de procesos

### Pregunta 9

#### ¿Qué es OCI?

Respuesta esperada

Una iniciativa abierta que mantiene especificaciones para formatos ejecución y distribución de contenedores

### Pregunta 10

#### ¿Por qué no basta con ejecutar `docker compose up`?

Respuesta esperada

Porque debemos comprender qué imágenes y servicios se ejecutan cómo se comunican dónde se guardan los datos qué permisos tienen y cómo se diagnostican los fallos

## El mapa completo

### Del problema a la aplicación

```text
PROBLEMA
"En mi máquina funciona"
       │
       ▼
TECNOLOGÍA DE CONTENEDORES
       │
       ▼
IMÁGENES Y CONTENEDORES
       │
       ▼
DOCKER CLI Y ENGINE
       │
       ▼
REDES Y VOLÚMENES
       │
       ▼
DOCKERFILE Y COMPOSE
       │
       ▼
REGISTRY Y VERSIONADO
       │
       ▼
DESPLIEGUE
       │
       ▼
OPERACIÓN Y DIAGNÓSTICO
       │
       ▼
ESCALABILIDAD
```

### Y debajo de la herramienta

```text
Docker
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
  └── Otros mecanismos
```

La herramienta nos oculta parte de la complejidad

El profesional debe comprender las responsabilidades de cada capa

### Fuentes oficiales para profundizar

**Docker**

- Introducción a Docker  
  https://docs.docker.com/get-started/
- Docker Engine  
  https://docs.docker.com/engine/
- Docker Compose  
  https://docs.docker.com/compose/
- Referencia de comandos  
  https://docs.docker.com/reference/cli/docker/

**Entornos de desarrollo**

- Instalación de Docker Engine en Linux  
  https://docs.docker.com/engine/install/
- Docker Desktop para Windows  
  https://docs.docker.com/desktop/setup/install/windows-install/
- Docker Desktop para macOS  
  https://docs.docker.com/desktop/setup/install/mac-install/
- WSL  
  https://learn.microsoft.com/es-es/windows/wsl/about

### Fuentes oficiales para profundizar

**Estándares y alternativas**

- Open Container Initiative  
  https://opencontainers.org/
- OCI Image Specification  
  https://github.com/opencontainers/image-spec
- OCI Runtime Specification  
  https://github.com/opencontainers/runtime-spec
- OCI Distribution Specification  
  https://github.com/opencontainers/distribution-spec
- Documentación de Podman  
  https://podman.io/docs/
- Documentación de Podman Desktop  
  https://podman-desktop.io/docs/

**Linux y orquestación**

- Manuales de Linux  
  https://man7.org/linux/man-pages/
- Conceptos de contenedores en Kubernetes  
  https://kubernetes.io/docs/concepts/containers/

## La idea central

**La tecnología primero**

### Lo que debes llevarte

<div class="grid-3">

<div class="card accent-azul">
<strong>Contenedores</strong>
<p>La tecnología que estamos estudiando</p>
</div>

<div class="card accent-verde">
<strong>Docker</strong>
<p>La herramienta principal que utilizaremos</p>
</div>

<div class="card accent-dorado">
<strong>OCI</strong>
<p>Los estándares abiertos del ecosistema</p>
</div>

</div>

### Y también

```text
Imagen
   ↓
Contenedor
   ↓
Red
   ↓
Volumen
   ↓
Dockerfile
   ↓
Compose
   ↓
Registry
```

Para operar con criterio debemos comprender también

```text
Linux
Permisos
Runtime
Namespaces
cgroups
Seguridad
Diagnóstico
```

### La idea profesional

<div class="callout">

No queremos aprender solamente a copiar comandos de Docker

Queremos comprender qué estamos ejecutando por qué lo ejecutamos cómo se comunican los componentes y qué consecuencias tienen nuestras decisiones

</div>

## Fin del bloque conceptual

**Contenedores de software**

**Tecnología → arquitectura → Docker → construcción → operación → despliegue**
