---
title: "Actividad 4 — Clasificación, enmascaramiento, seudonimización y anonimización"
description: "Unidad 2 de DBA — clasificar columnas y aplicar las tres técnicas de protección de datos sensibles, en PostgreSQL y MongoDB."
---

**Objetivo específico:** OE-U2.3. **Modalidad:** individual o pareja.

## Requisitos antes de empezar

* Haber leído [3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/).
* Guía técnica de seudonimización y anonimización: [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/), Parte A y B.

## Instrucciones para el estudiante

1. Clasifica cada columna de una tabla de ejemplo como "dato personal",
   "dato sensible" o "no sensible", justificando brevemente cada
   decisión.
2. Aplica enmascaramiento a al menos dos columnas (por ejemplo, un
   identificador y un correo), mostrando solo una parte del valor
   original.
3. Aplica seudonimización: crea una tabla de mapeo separada y sustituye
   el identificador por un seudónimo. Después demuestra la reversión
   mediante un `JOIN` contra esa tabla.
4. Aplica anonimización: agrega una columna de edad y genera una consulta
   que agrupe por rango de edad, sin que el resultado conserve nombre ni
   identificador de ninguna fila individual.
5. Explica, para cada una de las tres técnicas aplicadas, por qué es
   enmascaramiento, seudonimización o anonimización — completa además la
   tabla comparativa de ventajas, desventajas y caso de uso típico de
   cada una.

## Producto/evidencia

Tabla de clasificación + consulta y resultado del enmascaramiento +
tabla de mapeo y consulta de reversión (seudonimización) + consulta de
anonimización por rango de edad + tabla comparativa de las tres
técnicas.

## Criterio de logro

La clasificación es razonable y justificada, el enmascaramiento funciona
correctamente. La seudonimización demuestra reversibilidad real mediante
la tabla de mapeo. La anonimización no deja ninguna fila identificable en
el resultado. El estudiante distingue correctamente las tres técnicas sin
confundirlas.
