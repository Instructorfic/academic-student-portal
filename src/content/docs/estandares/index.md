---
title: Estándares de desarrollo (Engineering Handbook)
description: Versión para estudiantes del conjunto de estándares de desarrollo de software del proyecto integrador — código, Git, pruebas, seguridad, CI/CD y más.
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

Este conjunto de documentos define **cómo se construye el software** de un
proyecto de la carrera, con independencia del equipo o integrante que lo
escriba. Su principio rector es *"primero consistencia, después calidad,
después optimización"*.

## Estatus

Es un **estándar de referencia** para proyectos que adopten el stack aquí
descrito (PHP/Laravel + PostgreSQL + API REST + frontend en JavaScript
modular). Que sea obligatorio o recomendado para una materia concreta lo
decide el responsable académico de esa materia; este material no lo impone
por sí mismo. Donde una materia use otro stack, aplican por analogía los
principios generales del [Doc. 01](/estandares/01-general/) y no las reglas
específicas de lenguaje o framework.

El contenido está pendiente de validación académica; puede ajustarse.

## Documentos

| # | Documento |
|---|---|
| 00 | [Arquitectura documental del handbook](/estandares/00-indice/) |
| 01 | [Estándar general de desarrollo](/estandares/01-general/) |
| 02 | [Codificación backend — Laravel / PHP](/estandares/02-backend-laravel/) |
| 03 | [Desarrollo frontend](/estandares/03-frontend/) |
| 04 | [Bases de datos (PostgreSQL + MongoDB)](/estandares/04-bases-de-datos/) |
| 05 | [APIs REST](/estandares/05-api-rest/) |
| 06 | [Git y control de versiones](/estandares/06-git/) |
| 07 | [Code review](/estandares/07-code-review/) |
| 08 | [Pruebas](/estandares/08-pruebas/) |
| 09 | [Seguridad](/estandares/09-seguridad/) |
| 10 | [Documentación (incluye ADR)](/estandares/10-documentacion/) |
| 11 | [Calidad y CI/CD](/estandares/11-calidad-cicd/) |
| 12 | [Definition of Done](/estandares/12-definition-of-done/) |
| 13 | [Checklists operativos](/estandares/13-checklists/) |
| 16 | [Plan de implementación por fases](/estandares/16-plan-implementacion/) |
| 17 | [20 reglas de oro](/estandares/17-reglas-de-oro/) |
| — | [Archivos de configuración listos para copiar](/estandares/config-examples/) |

Los documentos **14 (Matriz de verificación y cumplimiento)** y **15
(Rúbrica de evaluación técnica)** tienen audiencia docente y no se publican
en este portal.

## Cómo leer las referencias

- **«Doc. NN»** dentro de un documento remite a otro documento de esta
  sección (menú lateral).
- **`docs/handbook/…`** se refiere a una copia de estos documentos dentro
  del repositorio **de tu propio proyecto**, no a este portal.
- **`config-examples/…`** son los archivos de configuración reunidos en
  [esta página](/estandares/config-examples/).
