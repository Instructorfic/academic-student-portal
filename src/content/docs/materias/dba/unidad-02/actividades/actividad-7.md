---
title: "Actividad 7 — Checklist de hardening (laboratorio, antes/después)"
description: "Unidad 2 de DBA — documentar el estado por defecto de un servidor y aplicar cambios de endurecimiento en tres capas."
---

**Objetivo específico:** OE-U2.6. **Modalidad:** individual o pareja.

## Requisitos antes de empezar

* Haber leído [6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/).
* Guía técnica completa: [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/).
* Esta actividad usa contenedores **nuevos**, sin los cambios de
  actividades anteriores, para observar el estado por defecto real.

## Instrucciones para el estudiante

1. Documenta el estado "por defecto" de un contenedor PostgreSQL y uno
   de MongoDB recién creados, en al menos cinco elementos (conexiones
   remotas aceptadas, interfaces de escucha, cuenta administrativa,
   puerto expuesto, usuario del sistema operativo que corre el proceso).
2. Aplica al menos tres cambios de endurecimiento, en las tres capas:
   motor, sistema operativo, red.
3. Documenta el estado "después" para cada uno, y explica qué riesgo
   concreto reduce cada cambio.

## Producto/evidencia

Checklist con estado antes/después de al menos cinco elementos, en las
tres capas, con justificación del riesgo que cada cambio reduce.

## Criterio de logro

El estudiante documenta al menos cinco cambios de hardening reales y
verificables, en las tres capas, en ambos motores, y justifica cada uno
con el riesgo que mitiga.
