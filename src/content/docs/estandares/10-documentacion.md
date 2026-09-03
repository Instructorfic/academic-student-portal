---
title: "DOC-10 · Estándar de documentación"
description: "README, CONTRIBUTING, manual de instalación y Architecture Decision Records (ADR)."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-DOC |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Docente / cada equipo |
| Fecha | 2026-08-30 |

## 1. Objetivo
Que cualquier persona (nuevo integrante, otro equipo, el docente) pueda entender el proyecto, instalarlo y comprender sus decisiones sin depender de explicación oral.

## 2. Estructura mínima de `docs/`

```
docs/
 ├── README.md                     # Punto de entrada (raíz del repo, no dentro de docs/)
 ├── CONTRIBUTING.md                # Cómo se trabaja aquí (resumen operativo del handbook)
 ├── SECURITY.md                    # Cómo reportar una vulnerabilidad
 ├── CHANGELOG.md                   # Cambios relevantes por versión/entrega
 ├── architecture/
 │   ├── overview.md                # Diagrama y explicación de la arquitectura general
 │   └── adr/
 │       ├── ADR-001-eleccion-postgresql.md
 │       ├── ADR-002-uso-mongodb-en-<modulo>.md
 │       └── ADR-003-arquitectura-monolitica-modular.md
 ├── api/                            # Documentación de endpoints (o referencia a Swagger)
 ├── database/                       # Diagrama ER + documentación de colecciones Mongo
 ├── setup/
 │   ├── installation.md
 │   └── troubleshooting.md
 └── handbook/                       # Este conjunto de documentos (00-17) + config-examples/
```

## 3. README.md — contenido obligatorio

| Sección | Obligatorio |
|---|---|
| Nombre y descripción breve del proyecto | Sí |
| Stack tecnológico | Sí |
| Requisitos previos (versiones de PHP, Composer, Node, PostgreSQL, MongoDB) | Sí |
| Instrucciones de instalación (link a `setup/installation.md` si es extenso) | Sí |
| Cómo ejecutar el proyecto localmente | Sí |
| Cómo ejecutar los tests | Sí |
| Estructura general de carpetas | Sí |
| Enlace a `CONTRIBUTING.md` | Sí |
| Integrantes del equipo y roles | Recomendado |

## 4. CONTRIBUTING.md — contenido obligatorio
Debe permitir que un estudiante nuevo entienda, en una lectura, el flujo de trabajo: branching, commits, PRs, code review, y dónde están las reglas completas (enlace a `docs/handbook/`).

## 5. Manual de instalación (`setup/installation.md`)
Pasos reproducibles, probados por al menos otro integrante distinto de quien los escribió (evita el "en mi máquina sí funciona"):
1. Clonar el repositorio.
2. Variables de entorno (`.env.example` → `.env`).
3. Instalación de dependencias (Composer, npm si aplica).
4. Migraciones y seeds.
5. Levantar el servidor (local o Docker si se usa).
6. Cómo verificar que quedó bien instalado (endpoint de salud, por ejemplo).

## 6. Documentación de arquitectura
- `architecture/overview.md` explica en lenguaje simple: qué es el monolito modular, cómo están separados los módulos, cómo se comunican, y el diagrama general (puede ser un diagrama simple, no UML exhaustivo) — P1/OBLIGATORIO.

## 7. Architecture Decision Records (ADR)

### 7.1 Cuándo se escribe un ADR
Se escribe un ADR cuando la decisión:
- Cambia o fija una tecnología estructural (elegir PostgreSQL, decidir usar MongoDB en un módulo, decidir la estrategia de branching).
- Es difícil de revertir sin costo significativo.
- Genera dudas recurrentes entre integrantes ("¿por qué hicimos esto así?").

**No** se escribe un ADR para decisiones triviales o fácilmente reversibles (nombre de una variable, orden de una columna).

### 7.2 Plantilla de ADR

```markdown
# ADR-00X: <Título de la decisión>

**Estado:** Propuesta | Aceptada | Rechazada | Reemplazada por ADR-00Y
**Fecha:** YYYY-MM-DD
**Decisores:** <equipo/integrantes>

## Contexto
¿Qué problema estamos resolviendo? ¿Qué restricciones existen?

## Decisión
¿Qué se decidió hacer, en una o dos frases claras?

## Alternativas consideradas
- Alternativa 1 — por qué no se eligió
- Alternativa 2 — por qué no se eligió

## Consecuencias
¿Qué se gana? ¿Qué se sacrifica o qué riesgo se acepta?
```

### 7.3 Ejemplos obligatorios desde el inicio del proyecto
- `ADR-001-eleccion-postgresql.md`
- `ADR-002-uso-mongodb-en-<modulo>.md` (uno por cada módulo que use Mongo, si aplica)
- `ADR-003-arquitectura-monolitica-modular.md`

## 8. Documentación de API y de base de datos
- Documentación de API: ver [Doc. 05](/estandares/05-api-rest/), sección 12.
- Base de datos: diagrama entidad-relación (puede generarse con una herramienta simple, ej. dbdiagram.io) actualizado por cada cambio estructural relevante, y documentación de cada colección Mongo ([Doc. 04](/estandares/04-bases-de-datos/), STD-DB-N02).

## 9. Changelog
- `CHANGELOG.md` registra cambios relevantes por entrega/avance (no cada commit), agrupados por tipo (Agregado, Corregido, Cambiado) — P2/RECOMENDADO.

## 10. Troubleshooting
- `setup/troubleshooting.md` recopila problemas comunes de instalación/ejecución y su solución, alimentado conforme el equipo los encuentra — P2/RECOMENDADO.

## Reglas con ID (resumen)

Para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-DOC-01 | El repositorio tiene `README.md` con todas las secciones obligatorias de la sección 3. | P1 | 3 |
| STD-DOC-02 | `CONTRIBUTING.md` describe el flujo de trabajo y enlaza al handbook completo. | P1 | 4 |
| STD-DOC-03 | El manual de instalación es reproducible y fue probado por otro integrante. | P1 | 5 |
| STD-DOC-04 | `architecture/overview.md` explica la arquitectura y su diagrama general. | P1 | 6 |
| STD-DOC-05 | Toda decisión estructural (tecnología, motor de BD, branching) tiene un ADR con el formato de la sección 7.2. | P1 | 7 |
| STD-DOC-06 | La documentación de API se mantiene actualizada (ver [Doc. 05](/estandares/05-api-rest/), `STD-API-12`). | P1 | 8 |
| STD-DOC-07 | La base de datos tiene diagrama ER actualizado y cada colección Mongo documentada (ver [Doc. 04](/estandares/04-bases-de-datos/), `STD-DB-N02`). | P1 | 8 |

## 11. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| README con secciones obligatorias | Manual | Checklist de PR / auditoría docente |
| Instalación reproducible | Manual | Otro integrante ejecuta los pasos desde cero |
| ADR existente para decisiones estructurales | Manual | Auditoría (Doc. 14) |
| Documentación de API actualizada | Manual (parcial automática si se usa OpenAPI generado) | Code Review + Swagger generado en CI |

## 12. Referencias
- [Doc. 00](/estandares/00-indice/) — mapa general del handbook.
- [Doc. 04](/estandares/04-bases-de-datos/) — documentación específica de bases de datos.
- [Doc. 05](/estandares/05-api-rest/) — documentación de API.
