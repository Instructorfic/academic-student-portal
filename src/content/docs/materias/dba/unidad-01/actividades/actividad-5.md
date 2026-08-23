---
title: "Actividad 5 — Diagrama de arquitectura de un SGBD relacional"
description: "Unidad 1 de DBA — diagrama etiquetado de organización lógica/física y memoria de la instancia."
---

**Objetivo específico:** OE-U1.4. **Contenido:** C1.4.1–C1.4.2.
**Modalidad:** individual.

## Requisitos antes de empezar

* Haber leído [Arquitectura de almacenamiento en un SGBD relacional](/materias/dba/unidad-01/04-arquitectura-relacional/).
* Papel y lápiz, o cualquier herramienta de diagramas — no se requiere
  software específico.
* Opcional: haber hecho el
  [Laboratorio 1 — Arquitectura relacional (PostgreSQL)](/materias/dba/unidad-01/laboratorios/laboratorio-1-postgresql/)
  como referencia visual real (no obligatorio).
* Tiempo estimado: 20-25 minutos.

## Instrucciones para el estudiante

Elabora un diagrama que muestre la relación entre organización lógica,
organización física y memoria de la instancia, tal como se describen en
[Arquitectura de almacenamiento en un SGBD relacional](/materias/dba/unidad-01/04-arquitectura-relacional/).
Etiqueta cada elemento usando la terminología de **uno** de los dos
motores presentados como ejemplos paralelos (Oracle: tablespace,
datafile, SGA, Database Buffer Cache — o PostgreSQL: PGDATA, archivos de
datos, `shared_buffers`) y explica en una frase qué función cumple cada
elemento.

## Producto/evidencia

Diagrama etiquetado.

## Criterio de logro

El diagrama distingue correctamente la organización lógica/física
(tablespace/datafile en Oracle, o PGDATA/archivos en PostgreSQL) de la
memoria de la instancia (SGA/Database Buffer Cache en Oracle, o
`shared_buffers` en PostgreSQL), y cada etiqueta incluye una función
correcta. Es válido usar la terminología de cualquiera de los dos
motores, siempre que se use de forma consistente dentro del mismo
diagrama.
