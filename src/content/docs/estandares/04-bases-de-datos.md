---
title: "DOC-04 · Estándar de bases de datos (PostgreSQL + MongoDB)"
description: "PostgreSQL como persistencia principal, MongoDB como excepción justificada; naming, constraints y migraciones."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-DB |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead Backend/DB / Docente |
| Fecha | 2026-08-30 |

## 1. Principio rector
**PostgreSQL es el sistema de persistencia principal del proyecto.** Todo dato transaccional, relacional o que requiera integridad referencial vive en PostgreSQL. **MongoDB es una excepción justificada**, no una alternativa "moderna" por defecto. Ningún equipo usa MongoDB sin registrar el ADR correspondiente (`ADR-00X-uso-mongodb-en-<modulo>.md`).

## 2. PostgreSQL

### 2.1 Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Tablas | `snake_case`, plural | `invoices`, `order_items` |
| Columnas | `snake_case` | `created_at`, `total_amount` |
| Primary Key | `id` (bigint autoincremental o UUID si se justifica) | `id` |
| Foreign Key | `<tabla_singular>_id` | `user_id`, `invoice_id` |
| Tablas pivote (N:M) | ambas tablas en singular, orden alfabético, separadas por `_` | `role_user` |
| Índices | `idx_<tabla>_<columnas>` | `idx_invoices_user_id` |
| Constraints | `<tipo>_<tabla>_<columna>` | `chk_invoices_total_positive`, `uq_users_email` |

### 2.2 Tablas, columnas y constraints — reglas

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-DB-P01 | Toda tabla tiene `id` como PK y `created_at`/`updated_at` (timestamps de Laravel) salvo justificación. | P1 | OBLIGATORIO |
| STD-DB-P02 | Toda FK declara la constraint real a nivel de base de datos (`->constrained()` en migración), no solo a nivel de aplicación. | P0 | OBLIGATORIO |
| STD-DB-P03 | Las columnas que no deben ser nulas se declaran `NOT NULL` explícitamente; no se confía solo en la validación del backend. | P0 | OBLIGATORIO |
| STD-DB-P04 | Los tipos de dato son los mínimos suficientes (no usar `text` para un campo de 20 caracteres; no usar `float` para dinero, usar `decimal`). | P1 | OBLIGATORIO |
| STD-DB-P05 | Se evita `SELECT *` en queries de aplicación; se seleccionan columnas explícitas cuando el performance importa. | P2 | RECOMENDADO |
| STD-DB-P06 | Los borrados lógicos (`soft deletes`) se usan solo cuando hay una razón de negocio (auditoría, recuperación), no por defecto en toda tabla. | P2 | RECOMENDADO |

### 2.3 Normalización
- Se normaliza hasta 3FN como estándar por defecto — RECOMENDADO.
- Se permite denormalizar puntualmente (ej. una columna calculada cacheada) **solo con justificación de performance documentada**, nunca como primer diseño — AVANZADO.

### 2.4 Índices
- Toda FK tiene índice (Laravel lo crea automáticamente al usar `constrained()`) — P1/OBLIGATORIO.
- Columnas usadas frecuentemente en `WHERE`/`ORDER BY` en consultas de alto uso se indexan — P2/RECOMENDADO; requiere evidencia (consulta lenta detectada), no se indexa "preventivamente" todo.

### 2.5 Migraciones

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-DB-M01 | Toda migración es reversible: implementa `up()` y `down()` correctamente. | P1 | OBLIGATORIO |
| STD-DB-M02 | Una migración = un cambio lógico (crear tabla, agregar columna); no se mezclan cambios de varias tablas no relacionadas en una sola migración. | P2 | RECOMENDADO |
| STD-DB-M03 | Nunca se edita una migración ya fusionada a `main`/`develop`; se crea una nueva migración de corrección. | P0 | OBLIGATORIO |
| STD-DB-M04 | El nombre del archivo de migración describe la acción: `2026_08_30_120000_create_invoices_table.php`. | P1 | OBLIGATORIO |

### 2.6 Seeds y datos de prueba
- Se usan `Seeders` + `Factories` de Laravel para poblar datos de desarrollo/pruebas, nunca INSERTs manuales sueltos — P1/OBLIGATORIO (detalle de Factories en [Doc. 08](/estandares/08-pruebas/)).

### 2.7 Transacciones
- Toda operación que modifica más de una tabla de forma atómica (ej. crear factura + descontar inventario) se envuelve en `DB::transaction()` — P0/OBLIGATORIO.

### 2.8 Consultas y performance básica
- Se evita el problema N+1 usando *eager loading* (`with()`) cuando se recorre una relación en un loop — P1/OBLIGATORIO, verificado en Code Review (herramienta AVANZADO: Laravel Debugbar/Telescope en desarrollo).
- Queries complejas de reporting se documentan con un comentario explicando su propósito — P2/RECOMENDADO.

## 3. MongoDB

### 3.1 Cuándo SÍ usarlo
Casos de uso válidos (ejemplos orientativos, no exhaustivos):
- Datos con estructura variable/no homogénea entre registros (ej. logs de auditoría con payloads distintos por tipo de evento).
- Documentos grandes, anidados, que se leen/escriben como unidad completa y no requieren joins relacionales (ej. configuración de formularios dinámicos, borradores de documentos).
- Alto volumen de escritura de datos semi-estructurados donde el esquema relacional agregaría fricción sin aportar integridad relevante.

### 3.2 Cuándo NO usarlo
- **Nunca** para datos con relaciones fuertes que requieren integridad referencial (usuarios, facturas, pagos, inventario) — eso es PostgreSQL.
- No se usa "porque MongoDB es más moderno/rápido de prototipar". Esa no es una justificación técnica válida para este estándar.
- No se usa para evitar diseñar el modelo relacional correctamente.

### 3.3 Naming (MongoDB)

| Elemento | Convención | Ejemplo |
|---|---|---|
| Colecciones | `snake_case`, plural | `activity_logs`, `form_drafts` |
| Campos de documento | `camelCase` (convención común en Mongo/JS) | `createdAt`, `eventType` |
| Referencias a documentos de otra colección | sufijo `Id` | `userId` |

### 3.4 Modelado, índices y validación
| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-DB-N01 | Toda colección define un esquema de validación (`$jsonSchema` o validación a nivel de modelo/ODM) aunque Mongo sea schemaless. | P1 | OBLIGATORIO |
| STD-DB-N02 | Se documenta la forma esperada del documento (ejemplo de documento) en `docs/database/mongodb-<coleccion>.md`. | P1 | OBLIGATORIO |
| STD-DB-N03 | Se crean índices sobre los campos usados para filtrar/ordenar frecuentemente (`eventType`, `createdAt`). | P2 | RECOMENDADO |
| STD-DB-N04 | No se modela una relación equivalente a una FK relacional embebiendo documentos gigantes sin límite de crecimiento. | P1 | OBLIGATORIO |

### 3.5 Consistencia e integridad
- MongoDB no ofrece integridad referencial automática entre colecciones: cualquier relación (`userId` → colección `users` en PostgreSQL o Mongo) debe validarse a nivel de aplicación antes de escribir — P1/OBLIGATORIO.
- Si un módulo mezcla PostgreSQL y MongoDB, se documenta explícitamente qué entidad vive en cuál motor y por qué, en el ADR correspondiente — P1/OBLIGATORIO.

## 4. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Migraciones reversibles y ejecutables | Automática | CI ejecuta `migrate` + `migrate:rollback` en base de pruebas |
| Constraints/FK a nivel de BD | Automática (parcial) + manual | Revisión de migración en PR |
| Justificación de uso de MongoDB | Manual | Existencia de ADR ([Doc. 10](/estandares/10-documentacion/)) |
| N+1 queries | Manual (AVANZADO: automatizable con Debugbar) | Code Review |
| Naming de tablas/columnas/colecciones | Manual | Code Review |

## 5. Referencias
- Documentación oficial de PostgreSQL y de Laravel (Eloquent, Migrations).
- Documentación oficial de MongoDB.
- [Doc. 10](/estandares/10-documentacion/) — plantilla de ADR.
