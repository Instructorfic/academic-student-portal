---
title: "Unidad 3 — Auditoría, trazabilidad y gobierno práctico de datos"
description: Introducción a la Unidad 3 de DBA — auditoría, bitácoras, trazabilidad en PostgreSQL y MongoDB, políticas prácticas y gobierno práctico de datos.
---

## Identificación de la unidad

| Campo | Información |
| --- | --- |
| Unidad | U3 — Auditoría, trazabilidad y gobierno práctico de datos |
| Materia | Gestión de Seguridad y Desempeño de Bases de Datos (DBA) |
| Carácter | Teórico-práctico, con tres laboratorios encadenados |
| Entorno técnico | PostgreSQL 16 y MongoDB 7 Community, con cualquier forma de despliegue (instalación nativa, máquina virtual o contenedor) |

## Propósito de la unidad

Al finalizar la unidad serás capaz de diseñar e interpretar mecanismos
de auditoría y bitácoras sobre una base de datos real (relacional y no
relacional), distinguiendo qué eventos deben registrarse, cómo se
conservan e interpretan esos registros, y qué políticas y elementos
mínimos de gobierno de datos permiten sostener esa trazabilidad en el
tiempo.

## ¿Qué problema vamos a resolver?

En la Unidad 2 aprendiste a **controlar quién puede acceder** a una
base de datos. En esta unidad aprendes a **demostrar qué ocurrió
realmente**: quién accedió, qué cambió y cuándo, y a documentarlo de
forma útil para una auditoría interna.

El caso de la unidad es **Comercializadora Norte S.A. de C.V.**, la
misma empresa ficticia de los laboratorios de la Unidad 2. El RFC de un
cliente aparece modificado en un reporte de facturación, y hay que
responder con evidencia quién lo cambió, cuándo, desde dónde y qué valor
tenía antes.

> ¿Cómo se demuestra, con evidencia verificable, qué ocurrió en una base
> de datos y quién es responsable de qué?

## Cómo navegar esta unidad

1. Revisa la [presentación de la unidad](/materias/dba/unidad-03/presentacion/): objetivos, caso, pregunta central y preparación del trabajo con el gestor. Incluye la Actividad 1 (diagnóstico).
2. Lee [1. Auditoría de bases de datos](/materias/dba/unidad-03/01-auditoria-de-bases-de-datos/) y realiza la Actividad 2.
3. Lee [2. Bitácoras en PostgreSQL](/materias/dba/unidad-03/02-bitacoras-en-postgresql/) y [3. Auditoría del dato](/materias/dba/unidad-03/03-auditoria-del-dato/), y realiza el [Laboratorio 1](/materias/dba/unidad-03/laboratorios/laboratorio-1-bitacoras-y-auditoria-del-dato-postgresql/).
4. Lee [4. Trazabilidad en MongoDB Community](/materias/dba/unidad-03/04-trazabilidad-en-mongodb/) y realiza el [Laboratorio 2](/materias/dba/unidad-03/laboratorios/laboratorio-2-trazabilidad-mongodb/).
5. Lee [5. Conservación e interpretación de bitácoras](/materias/dba/unidad-03/05-conservacion-e-interpretacion-de-bitacoras/) y realiza la Actividad 5.
6. Lee [6. Políticas prácticas de datos](/materias/dba/unidad-03/06-politicas-practicas-de-datos/) y realiza la Actividad 6.
7. Lee [7. Gobierno práctico de datos](/materias/dba/unidad-03/07-gobierno-practico-de-datos/) e integra todo en el [Laboratorio 3](/materias/dba/unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias/) (Actividad 7, evidencia oficial).
8. Revisa el [cierre de la unidad](/materias/dba/unidad-03/08-cierre-de-la-unidad/) antes de avanzar a la Unidad 4.

## Qué vas a producir

La evidencia oficial de la unidad, según el programa de la materia, es
una **configuración o diseño de auditoría con bitácora interpretada**.
La construyes en el Laboratorio 3 como un expediente de auditoría
interna que reúne los mecanismos configurados en los Laboratorios 1 y 2,
la bitácora interpretada y los elementos mínimos de gobierno de datos.

## Qué aprenderás después

El desempeño de la base de datos (Unidad IV) y el respaldo y la
restauración (Unidad V) corresponden a unidades posteriores de la
materia.
