---
title: "Actividad 3 — Matriz de usuarios, roles y permisos (evidencia oficial, parte 1)"
description: "Unidad 2 de DBA — crear roles con privilegio diferenciado en PostgreSQL y MongoDB, y practicar Row-Level Security."
---

**Objetivo específico:** OE-U2.2. **Modalidad:** individual o pareja.

## Requisitos antes de empezar

* Haber leído [2. Control de acceso: usuarios, roles y permisos](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/).
* Haber completado la [Actividad 2](/materias/dba/unidad-02/actividades/actividad-2/).
* Guía técnica completa: [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/).

## Instrucciones para el estudiante

1. En PostgreSQL, crea al menos tres roles con distinto nivel de
   privilegio sobre la tabla de la Actividad 2 (por ejemplo, un rol de
   solo lectura, uno con lectura/escritura, y uno superusuario).
2. En MongoDB, conéctate como el usuario administrador y crea al menos
   dos usuarios con roles integrados distintos (por ejemplo, `read` y
   `readWrite`) usando `db.createRole()`/`db.createUser()`.
3. Practica Row-Level Security en PostgreSQL: una política que restrinja
   el acceso de un rol a solo sus propias filas, como ejemplo de control
   basado en atributos (ABAC).
4. Documenta todo en una sola matriz: usuario/rol, motor, modelo (DAC,
   RBAC, ABAC), permisos otorgados, propósito.

## Producto/evidencia

Matriz de usuarios/roles/permisos (primera mitad de la evidencia oficial
de la unidad; se completará en la Actividad 8).

## Criterio de logro

El estudiante crea correctamente al menos tres niveles de privilegio
diferenciados en PostgreSQL y al menos dos en MongoDB, identifica
correctamente el modelo en juego en cada mecanismo, y la política de RLS
restringe el acceso como se espera.
