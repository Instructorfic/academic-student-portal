---
title: "13. Aplicación integradora"
description: "Bloque IV de Taller Integrador — arquitectura de referencia de ReservaFIC y recorrido tecnológico."
---

**ReservaFIC**

## Arquitectura de referencia

```text
                   Usuario
                      │
                      ▼
                 Proxy HTTPS
                      │
                      ▼
                 Aplicación
                Laravel / PHP
                      │
                ┌─────┴─────┐
                ▼           ▼
            PostgreSQL    Redis
```

Esta arquitectura es ilustrativa

La cantidad de servicios y sus relaciones dependen de las necesidades reales de la aplicación

## ¿Qué componentes debemos identificar?

<div class="grid-3">

<div class="card accent-azul">
<strong>Aplicación</strong>
<p>Código y dependencias</p>
<p>Imagen y proceso</p>
</div>

<div class="card accent-verde">
<strong>Comunicación</strong>
<p>Redes</p>
<p>Puertos</p>
</div>

<div class="card accent-dorado">
<strong>Datos</strong>
<p>Volúmenes</p>
<p>Respaldos y recuperación</p>
</div>

</div>

También debemos identificar configuración secretos y dependencias externas

## El recorrido tecnológico

```text
Código fuente
     │
     ▼
Dockerfile
     │
     ▼
Imagen versionada
     │
     ▼
Registry
     │
     ▼
Docker Compose
     │
     ▼
Servicios y redes
     │
     ▼
Servidor de despliegue
```

El objetivo es comprender qué hace cada componente y cómo se relaciona con el resto

## Antes de ejecutar un comando

Predice el resultado

```text
¿Qué imagen utilizará?

¿Qué contenedor se creará?

¿Qué proceso ejecutará?

¿Qué puerto se publicará?

¿En qué red estará?

¿Dónde se guardarán los datos?

¿Qué ocurrirá al detenerlo?

¿Qué ocurrirá al eliminarlo?
```

La predicción permite relacionar los comandos con el modelo conceptual

## Después de ejecutar

No basta con afirmar que funcionó

Debemos explicar

```text
Qué hizo Docker

Qué hizo el contenedor

Qué proceso se ejecutó

Qué hizo la red

Qué hizo el volumen

Qué evidencia confirma el resultado
```

El objetivo es desarrollar capacidad de análisis y diagnóstico

## Qué sigue

Continúa con [14. Cierre y autoevaluación](/materias/taller-integrador/bloque-04/14-cierre-y-autoevaluacion/).
