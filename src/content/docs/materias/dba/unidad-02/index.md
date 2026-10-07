---
title: "Unidad 2 — Seguridad, privacidad y control de acceso"
description: Introducción a la Unidad 2 de DBA — seguridad, control de acceso, protección de datos sensibles, cifrado, privacidad y hardening.
---

## Identificación de la unidad

| Campo | Información |
| --- | --- |
| Unidad | U2 — Seguridad, privacidad y control de acceso |
| Materia | Gestión de Seguridad y Desempeño de Bases de Datos (DBA) |
| Carácter | Teórico-práctico — primera unidad con laboratorios reales evaluados |
| Entorno técnico | PostgreSQL y MongoDB vía contenedores Docker (`postgres:16`, `mongo:7`) |

## Objetivos específicos

- **OE-U2.1** — Explicar los principios de seguridad de datos y aplicar mitigación de inyección SQL/NoSQL.
- **OE-U2.2** — Implementar control de acceso mediante usuarios, roles y permisos.
- **OE-U2.3** — Aplicar protección de datos sensibles.
- **OE-U2.4** — Aplicar cifrado en tránsito y en reposo, y proteger credenciales y llaves.
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

A partir de esta unidad vas a trabajar sobre un SGBD real, ejecutado en
un contenedor Docker — la misma tecnología que ya conoces de la materia
de Contenedores y Cloud Native.

## Cómo navegar esta unidad

1. Lee esta introducción y realiza la [Actividad 1](/materias/dba/unidad-02/actividades/actividad-1/) (diagnóstico).
2. Lee [1. Principios de seguridad e inyección SQL/NoSQL](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/) y realiza la [Actividad 2](/materias/dba/unidad-02/actividades/actividad-2/) con el laboratorio de inyección del repositorio de laboratorios de la materia (code.ficlabs.com.mx, laboratorios DBA).
3. Lee [2. Control de acceso: usuarios, roles y permisos](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) y realiza la [Actividad 3](/materias/dba/unidad-02/actividades/actividad-3/).
4. Lee [3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/) y realiza la [Actividad 4](/materias/dba/unidad-02/actividades/actividad-4/) con el [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-proteccion-y-privacidad-de-datos/).
5. Lee [4. Cifrado y protección técnica](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/) y realiza la [Actividad 5](/materias/dba/unidad-02/actividades/actividad-5/) con el [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-cifrado-credenciales-y-comunicaciones-seguras/).
6. Lee [5. Privacidad y cumplimiento normativo](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/) y realiza la [Actividad 6](/materias/dba/unidad-02/actividades/actividad-6/) con el [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-privacidad-cumplimiento-y-gobierno-de-los-datos/).
7. Lee [6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) y realiza la [Actividad 7](/materias/dba/unidad-02/actividades/actividad-7/) con el [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/).
8. Realiza la [Actividad 8](/materias/dba/unidad-02/actividades/actividad-8/) (evaluación de seguridad, actividad integral).
9. Revisa el [cierre y autoevaluación](/materias/dba/unidad-02/07-cierre-y-autoevaluacion/) antes de avanzar a la Unidad 3.

## Qué vas a producir

Al terminar la unidad vas a realizar una **evaluación integral de
seguridad** de un servidor de base de datos (Actividad 8). Su documento
de hallazgos incluye la matriz de usuarios, roles, permisos y controles
de privacidad, que es la **evidencia oficial** de la unidad según el
programa de la materia. Las Actividades 1 a 7 son evidencia de apoyo:
cada una corresponde a un tema y te prepara para esa evaluación.

## Qué aprenderás después

Esta unidad se detiene en el nivel introductorio de seguridad aplicada a
datos. Bitácoras técnicas y gobierno práctico de datos (Unidad III),
monitoreo de desempeño (Unidad IV), respaldo/recuperación (Unidad V), y
alta disponibilidad, replicación y particionamiento horizontal
(Unidad VI) corresponden a unidades posteriores de la materia.
