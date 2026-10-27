---
title: "12. Escalabilidad y orquestación"
description: "Bloque IV de Taller Integrador — usuarios y solicitudes, qué observar, escalamiento vertical y horizontal, y cuándo aparece Kubernetes."
---

**Temas del programa:** 4.4

**Aplicaciones posteriores de los fundamentos**

## Contenedores y escalabilidad

Los contenedores facilitan empaquetar y ejecutar componentes de una aplicación

Pero no garantizan por sí solos que el sistema soporte más usuarios

```text
Contenerizar
     │
     ▼
Estandarizar el entorno
     │
     ▼
Medir el comportamiento
     │
     ▼
Identificar límites
     │
     ▼
Tomar decisiones de escalabilidad
```

## No confundamos usuarios y solicitudes

```text
Usuarios registrados
        ↓
Usuarios activos
        ↓
Usuarios concurrentes
        ↓
Solicitudes por segundo
```

Son medidas diferentes

No es correcto afirmar que una aplicación soporta una cantidad determinada de usuarios solamente porque utiliza Docker

La capacidad debe medirse con un escenario definido

## ¿Qué debemos observar?

- Solicitudes por segundo
- Latencia
- Percentiles como p95
- Errores
- CPU
- Memoria
- Capacidad de la base de datos
- Consumo de conexiones
- Comportamiento durante la recuperación

Los resultados deben distinguirse entre valores medidos estimaciones y objetivos de diseño

## Escalamiento vertical y horizontal

<div class="grid-2">

<div class="card accent-azul">
<strong>Vertical</strong>
<p>Asignar más recursos a una instancia</p>

```text
CPU y memoria
      ↑
  más recursos
```
</div>

<div class="card accent-verde">
<strong>Horizontal</strong>
<p>Ejecutar más instancias de un servicio</p>

```text
app  app  app
  \   |   /
  tráfico
```
</div>

</div>

La estrategia adecuada depende de la arquitectura y de los límites de cada componente

## ¿Qué ocurre si la base de datos es el límite?

```text
app 1 ──┐
app 2 ──┼──► PostgreSQL
app 3 ──┘
```

Agregar más instancias de la aplicación puede aumentar la presión sobre la base de datos

Antes de escalar hay que identificar el cuello de botella

Puede estar en el código la CPU la memoria el almacenamiento la red o una dependencia externa

## ¿Cuándo aparece Kubernetes?

Cuando hay muchos contenedores y servicios puede ser necesario automatizar tareas como

- Programar contenedores en distintos nodos
- Recuperar servicios después de ciertos fallos
- Distribuir tráfico
- Gestionar actualizaciones
- Escalar cargas de trabajo
- Descubrir servicios

Kubernetes es una plataforma de orquestación de contenedores

En este bloque se estudian sus fundamentos conceptuales sin convertirlo en la herramienta principal

## Docker y Kubernetes cumplen funciones diferentes

```text
Contenedores
    │
    ▼
Docker y otras herramientas
    │
    ▼
Construir distribuir y ejecutar imágenes
```

```text
Orquestación
    │
    ▼
Kubernetes
    │
    ▼
Administrar cargas de trabajo en un clúster
```

La orquestación se estudia después de comprender imágenes contenedores redes y almacenamiento

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 5 — Pruebas de carga y análisis de capacidad](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-5-pruebas-de-carga/).

</div>

## Qué sigue

Continúa con [13. Aplicación integradora](/materias/taller-integrador/bloque-04/13-aplicacion-integradora/).
