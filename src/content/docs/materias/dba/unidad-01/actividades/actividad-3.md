---
title: "Actividad 3 — Clasificación de responsabilidades operativas"
description: "Unidad 1 de DBA — clasificar 12 tareas cotidianas según las seis responsabilidades operativas del DBA."
---

**Objetivo específico:** OE-U1.2. **Contenido:** C1.2.1–C1.2.6.
**Modalidad:** individual o grupal.

## Requisitos antes de empezar

* Haber leído la tabla de las seis responsabilidades operativas en
  [Responsabilidades operativas del DBA](/materias/dba/unidad-01/02-responsabilidades-operativas/).
* Usar la lista de 12 tareas ya provista más abajo (no es necesario que
  el docente prepare una propia).
* Tiempo estimado: 20 minutos.

## Instrucciones para el estudiante

A partir de la tabla de responsabilidades (configuración y mantenimiento,
gestión de usuarios y privilegios, monitoreo del servicio, diagnóstico de
fallas, optimización de desempeño, documentación y bitácoras), clasifica
una lista de tareas cotidianas de un DBA (provista por el docente) según
a cuál de las seis responsabilidades pertenece cada una.

Después de clasificar, responde brevemente: de las seis responsabilidades,
¿cuál te pareció que requiere mayor capacidad de diagnóstico, y por qué?

## Producto/evidencia

Tabla de clasificación de tareas + respuesta breve a la pregunta de
cierre.

## Criterio de logro

El estudiante clasifica correctamente la mayoría de las tareas y puede
justificar, para al menos dos de ellas, por qué pertenecen a esa
categoría y no a otra. La respuesta de cierre identifica una
responsabilidad y ofrece una justificación coherente con la tabla de
responsabilidades operativas.

## Lista de tareas para clasificar (lista de referencia)

> Lista sugerida de 12 tareas, con casos ambiguos incluidos a propósito
> (marcados con *). El docente puede usar esta lista tal cual, reordenar
> las tareas, o sustituirla por una propia — no es la única lista válida,
> es un punto de partida para no requerir preparación desde cero.

1. Instalar una nueva versión del motor de base de datos.
2. Dar de alta a un nuevo desarrollador con acceso de solo lectura.
3. Revisar por qué un reporte tarda más de lo habitual en generarse. *
4. Programar una tarea automática que respalde la base de datos cada
   noche.
5. Registrar en un documento por qué se cambió un parámetro de
   configuración la semana pasada.
6. Revocar el acceso de un usuario que dejó el proyecto.
7. Revisar un panel de monitoreo y confirmar que el servicio sigue
   disponible.
8. Detectar que una consulta específica está bloqueando a otras
   consultas. *
9. Documentar los pasos que se siguieron para recuperar un servicio tras
   una falla.
10. Ajustar la configuración de memoria del motor tras notar respuestas
    más lentas de lo esperado. *
11. Verificar, antes de dar de alta un servidor nuevo, qué parámetros de
    instalación se usaron en los servidores existentes.
12. Revisar el registro de accesos fallidos de la última semana.

> Las tareas marcadas con `*` pueden justificarse en más de una
> categoría (por ejemplo, la tarea 3 es "diagnóstico de fallas" y
> también roza "optimización de desempeño". La tarea 8 es "monitoreo" y
> "diagnóstico". La tarea 10 es "optimización" y también "configuración").
> Ese es el punto: sirven para la discusión sobre límites entre
> categorías, no tienen una única respuesta "correcta".
