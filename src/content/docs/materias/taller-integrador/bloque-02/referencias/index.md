---
title: "Referencias — Bloque II"
description: "Bloque II de Taller Integrador — bibliografía priorizada de Design Patterns, Clean Architecture, Clean Code y documentación técnica de Git."
---

Que una fuente aparezca aquí no significa que debas leerla completa —
la lectura obligatoria se especifica por tema o actividad.

## Fuentes prioritarias del bloque

### REF-B2-01 — Gamma, Helm, Johnson y Vlissides, *Design Patterns*

| Campo | Valor |
| --- | --- |
| Autores | Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides |
| Año | 1994 |
| Editorial | Addison-Wesley |
| Rol en el bloque | **Fuente principal de patrones de diseño** |
| Relevancia | Muy alta |

Catálogo original de referencia para las tres familias de patrones de
[5. Patrones de diseño](/materias/taller-integrador/bloque-02/05-patrones-de-diseno/).
Es una obra formal y densa; para el nivel introductorio de este bloque,
combínala con REF-B2-02 (más accesible) antes de remitir al catálogo
completo.

### REF-B2-02 — Freeman y Robson, *Head First Design Patterns*

| Campo | Valor |
| --- | --- |
| Autores | Eric Freeman, Elisabeth Robson |
| Año | 2020 |
| Editorial | O'Reilly |
| Rol en el bloque | Lectura de entrada a patrones de diseño |
| Relevancia | Alta |

Preferible para la primera exposición del concepto de patrón; usa
REF-B2-01 como referencia formal una vez que el concepto ya se
comprendió.

### REF-B2-03 — Martin, *Clean Architecture*

| Campo | Valor |
| --- | --- |
| Autor | Robert C. Martin |
| Año | 2017 |
| Editorial | Prentice Hall |
| Rol en el bloque | **Fuente principal de arquitectura de software** |
| Relevancia | Muy alta |

Fuente principal de
[4. Arquitectura de software](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/):
separación de responsabilidades, cohesión y acoplamiento, aplicados en
este bloque a la escala introductoria del refactor Form Request /
Service / Controlador delgado, no a su versión completa de arquitectura
limpia por capas concéntricas.

### REF-B2-04 — Martin, *Clean Code*

| Campo | Valor |
| --- | --- |
| Autor | Robert C. Martin |
| Año | 2008 |
| Editorial | Prentice Hall |
| Rol en el bloque | Fuente complementaria de organización de código |
| Relevancia | Alta |

Apoya la convención de mensajes de commit y la práctica de cambios
pequeños e integración frecuente de
[1. Git y control de versiones](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/)
y [3. Integración del trabajo](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/).

### REF-B2-05 — Hunt y Thomas, *The Pragmatic Programmer*

| Campo | Valor |
| --- | --- |
| Autores | Andrew Hunt, David Thomas |
| Año | 2019 |
| Editorial | Addison-Wesley |
| Rol en el bloque | Fuente transversal de prácticas profesionales |
| Relevancia | Media |

Mismo rol transversal que tuvo en el Bloque I. Útil como contexto de
por qué "trabajar en equipo con disciplina técnica" importa, sin ser
fuente primaria de ningún contenido específico de este bloque.

### Fuentes de relevancia baja para este bloque

Las siguientes referencias pertenecen a la bibliografía del programa,
pero corresponden principalmente a bloques posteriores del taller — no
se utilizan como contenido central del Bloque II:

| Referencia | Autor(es) | Año | Corresponde principalmente a |
| --- | --- | --- | --- |
| *Continuous Delivery* | Humble, Farley | 2010 | Bloque III |
| *Microservices Patterns* | Richardson | 2018 | Solo si un equipo clasifica erróneamente su arquitectura como orientada a servicios |
| *Designing Distributed Systems* | Burns | 2018 | Fuera de alcance de este bloque |
| *Building Microservices* | Newman | 2021 | Bloques posteriores |
| *The Docker Book* | Turnbull | 2014 | Bloque IV |

## Referencias técnicas

Documentación técnica para las actividades de implementación — no
constituyen la bibliografía conceptual principal del bloque.

| Referencia | Uso | Laboratorios relacionados |
| --- | --- | --- |
| Documentación oficial de Git | Comandos, ramas, `merge`, `tag`, contenido de `.git/` | [Laboratorio 1](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/) |
| Documentación de GitHub (pull requests) / GitLab (merge requests) | Pull request, revisión de código, resolución de conflictos | [Laboratorio 1](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/) |
| Colección oficial de plantillas `.gitignore` de GitHub | Ejemplo y preparación de `.gitignore` por lenguaje/framework | [1. Git y control de versiones](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/) |
| Documentación oficial de Laravel | Form Requests, estructura de Services | [Laboratorio 2](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/) |
| OWASP | Referencia técnica futura | Bloque III |
| Documentación de Docker | Referencia técnica futura | Bloque IV |

### Estrategias de branching

Estas tres fuentes documentan las estrategias de branching mencionadas
en [2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).
No provienen de la bibliografía oficial del programa: son
documentación técnica pública ampliamente reconocida en la industria
para cada estrategia.

| Estrategia | Fuente |
| --- | --- |
| Git Flow | Driessen, V. *A successful Git branching model* |
| GitHub Flow | Guía oficial de GitHub sobre GitHub Flow |
| Trunk-Based Development | trunkbaseddevelopment.com |

La terminología exacta a usar (pull request vs. merge request) depende
de la plataforma de repositorio que confirme tu docente.

## Fuentes de la ampliación (Conventional Commits y SemVer)

Estas dos fuentes no provienen de la bibliografía oficial del programa:
se agregaron como ampliación explícita sobre el temario oficial (ver
[2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/)).

| Referencia | Versión | URL |
| --- | --- | --- |
| Conventional Commits Specification | 1.0.0 | <https://www.conventionalcommits.org/en/v1.0.0/> |
| Semantic Versioning | 2.0.0 | <https://semver.org/> |

## Matriz de fuentes por contenido

| Contenido | Fuente principal | Complementaria |
| --- | --- | --- |
| 2.1 Git y control de versiones | Documentación oficial de Git | Clean Code |
| 2.2 Integración del trabajo | Clean Code | Documentación oficial de Git |
| 2.3 Arquitectura de software | Clean Architecture | — |
| 2.4 Patrones de diseño | Design Patterns (GoF) | Head First Design Patterns |

## Prioridad de lectura para el estudiante

| Prioridad | Fuente | Carácter |
| --- | --- | --- |
| 1 | Documentación oficial de Git | Obligatoria para el Laboratorio 1 |
| 2 | Head First Design Patterns | Entrada accesible a patrones |
| 3 | Design Patterns (GoF) | Referencia formal de patrones |
| 4 | Clean Architecture | Fundamentación de arquitectura |
| 5 | Clean Code | Complementaria |
| 6 | The Pragmatic Programmer | Contexto transversal |

## Relación con los materiales del bloque

| Material | Fuentes que utiliza |
| --- | --- |
| Temas 1 a 5 | Documentación de Git, Clean Architecture, Clean Code, Design Patterns, Head First Design Patterns |
| Presentación | Mismas fuentes que los temas 1 a 5 |
| Actividades | Mismas fuentes que los temas correspondientes |
| Laboratorio 1 (Git colaborativo) | Documentación oficial de Git y de GitHub/GitLab, Conventional Commits, SemVer |
| Laboratorio 2 (arquitectura) | Clean Architecture, documentación de Laravel |
| Laboratorio 3 (patrones de diseño) | Design Patterns, Head First Design Patterns |

Consulta también las
[lecturas complementarias](/materias/taller-integrador/bloque-02/referencias/lecturas-complementarias/)
para los enlaces directos de consulta.
