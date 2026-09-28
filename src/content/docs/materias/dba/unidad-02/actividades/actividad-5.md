---
title: "Actividad 5 — Cifrado en tránsito y en reposo (laboratorio)"
description: "Unidad 2 de DBA — habilitar TLS en PostgreSQL y cifrar una columna sensible con pgcrypto."
---

**Objetivo específico:** OE-U2.4. **Modalidad:** individual o pareja.

## Requisitos antes de empezar

* Haber leído [4. Cifrado en tránsito y en reposo](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/).
* `openssl` disponible en tu equipo (la imagen oficial `postgres:16` no lo incluye).
* Guía técnica completa: [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/), Parte C y D.

## Instrucciones para el estudiante

**Parte A — Cifrado en tránsito.** Verifica si la conexión al contenedor
PostgreSQL usa TLS (`SHOW ssl;`). Si no, genera un certificado
autofirmado, cópialo al contenedor, habilita `ssl = on`, recarga la
configuración y conecta explícitamente con `sslmode=require`. Documenta
el estado "antes" y "después".

**Parte B — Cifrado en reposo.** Habilita la extensión `pgcrypto` y
cifra el valor de una columna sensible con `pgp_sym_encrypt`; demuestra
que el valor almacenado no es legible directamente, y que sí se recupera
con `pgp_sym_decrypt` usando la llave correcta.

## Producto/evidencia

Evidencia del estado de la conexión (antes/después) + evidencia de que
el valor cifrado no es legible sin la llave, y que sí lo es con ella.

## Criterio de logro

El estudiante verifica correctamente el estado de cifrado en tránsito, y
demuestra que `pgcrypto` protege el valor en reposo.

> ⚠️ **Advertencia.** Nunca uses contraseñas ni llaves reales. Usa
> siempre valores de ejemplo, y nunca los incluyas en texto plano en un
> entregable o repositorio público.
