---
title: "Unidad 2 — Seguridad, privacidad y control de acceso"
description: Introducción a la Unidad 2 de DBA — seguridad, control de acceso, protección de datos sensibles y hardening.
---

## Identificación de la unidad

| Campo | Información |
| --- | --- |
| Unidad | U2 — Seguridad, privacidad y control de acceso |
| Materia | Gestión de Seguridad y Desempeño de Bases de Datos (DBA) |
| Carácter | Teórico-práctico — primera unidad con laboratorios reales |
| Entorno técnico | PostgreSQL y MongoDB vía contenedores Docker (`postgres:16`, `mongo:7`) |

## Objetivos específicos

- **OE-U2.1** — Explicar los principios de seguridad de datos y aplicar mitigación de inyección SQL/NoSQL.
- **OE-U2.2** — Implementar control de acceso mediante usuarios, roles y permisos.
- **OE-U2.3** — Aplicar protección de datos sensibles.
- **OE-U2.4** — Aplicar cifrado en tránsito y en reposo.
- **OE-U2.5** — Explicar el marco de privacidad y cumplimiento normativo.
- **OE-U2.6** — Aplicar hardening a un servidor de base de datos.

> Competencias de referencia: COMP-DBA-03, COMP-DBA-04.

## ¿Qué problema vamos a resolver?

En la Unidad 1 diagnosticaste un entorno de base de datos sin
responsable claro y sin ambientes separados. Ese mismo entorno tiene un
problema adicional: cualquier persona con la contraseña del usuario
administrador puede leer, modificar o borrar cualquier dato. No hay
cifrado en las conexiones, las credenciales viajan en texto plano, no
hay clasificación de qué datos son sensibles, y el servidor conserva su
configuración de instalación por defecto.

La pregunta que organiza esta unidad:

> ¿Cómo protegemos ese entorno — quién puede acceder a qué, cómo se
> protegen los datos sensibles, y cómo se reduce la superficie de
> ataque del servidor?

## Cómo navegar esta unidad

1. [Presentación](/materias/dba/unidad-02/presentacion/) — resumen visual de la unidad.
2. [Manual del estudiante](/materias/dba/unidad-02/manual-estudiante/) — desarrollo completo de los temas.
3. [Actividades](/materias/dba/unidad-02/actividades/) — instrucciones de las 8 actividades, incluida la evidencia oficial.
4. [Evaluación](/materias/dba/unidad-02/evaluacion/) — qué se evalúa y criterios generales.
5. [Referencias](/materias/dba/unidad-02/referencias/) — bibliografía de la unidad.

## Qué aprenderás después

Esta unidad se detiene en el nivel introductorio de seguridad aplicada a
datos. Bitácoras y gobierno práctico de datos, monitoreo de desempeño,
respaldo/recuperación, y alta disponibilidad corresponden a unidades
posteriores de la materia.
