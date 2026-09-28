---
title: "Actividad 2 — Principios de seguridad e inyección (laboratorio)"
description: "Unidad 2 de DBA — reproducir inyección SQL y NoSQL, vulnerable y prevenida, contra PostgreSQL y MongoDB reales."
---

**Objetivo específico:** OE-U2.1. **Modalidad:** demostración guiada +
práctica individual.

## Requisitos antes de empezar

* Haber leído [1. Principios de seguridad e inyección SQL/NoSQL](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/).
* Docker funcionando (ver [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/) para la guía técnica completa).

## Instrucciones para el estudiante

1. Reproduce una consulta construida por concatenación de texto (en
   pseudocódigo de aplicación, no SQL puro): prueba qué ocurre si la
   entrada es un nombre válido, y qué ocurre si es `' OR '1'='1`.
2. Reescribe la misma consulta como una consulta parametrizada y repite
   la prueba con la misma entrada maliciosa.
3. Repite el mismo contraste en MongoDB: una consulta vulnerable con
   `$ne: null` sin tipar, y su versión mitigada con tipado forzado.
4. Documenta la diferencia de comportamiento entre cada par
   vulnerable/mitigado, en ambos motores.

## Producto/evidencia

Comparación documentada (capturas o transcripción) de los pares
vulnerable/mitigado en SQL y en NoSQL, con explicación de por qué cada
versión mitigada no es vulnerable.

## Criterio de logro

El estudiante reproduce correctamente los pares vulnerable/mitigado, en
ambos motores, y explica, sin copiar literalmente el manual, por qué
cada técnica de prevención funciona.
