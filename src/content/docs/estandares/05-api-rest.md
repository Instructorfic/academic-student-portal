---
title: "DOC-05 · Estándar de APIs REST"
description: "Forma, semántica HTTP, status codes, formato de respuesta y versionado de los endpoints del proyecto."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-API |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead Backend / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Garantizar que todos los endpoints del proyecto, sin importar qué equipo los construya, tengan la misma forma, el mismo comportamiento de errores y la misma semántica HTTP.

## 2. Naming de endpoints y recursos

| Regla | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|
| Recursos en plural, `kebab-case` | `/api/v1/invoices` | `/api/v1/getInvoice` |
| Sin verbos en la URL (el verbo lo da el método HTTP) | `POST /api/v1/invoices` | `/api/v1/createInvoice` |
| Anidación solo cuando hay dependencia real | `/api/v1/invoices/{invoice}/items` | `/api/v1/invoice-items?invoice_id=1` (aceptable solo si `items` también se consulta de forma independiente) |
| Versionado en la URL | `/api/v1/...` | sin versión |

## 3. HTTP verbs

| Verbo | Uso | Idempotente |
|---|---|---|
| `GET` | Leer un recurso o colección | Sí |
| `POST` | Crear un recurso | No |
| `PUT` | Reemplazar un recurso completo | Sí |
| `PATCH` | Actualizar parcialmente un recurso | No (pero se recomienda diseñarlo idempotente cuando sea posible) |
| `DELETE` | Eliminar un recurso | Sí |

## 4. HTTP status codes — tabla de referencia obligatoria

| Código | Uso |
|---|---|
| 200 OK | Lectura u operación exitosa con cuerpo de respuesta |
| 201 Created | Recurso creado (incluye `Location` o el recurso en el body) |
| 204 No Content | Operación exitosa sin cuerpo (ej. `DELETE`) |
| 400 Bad Request | Solicitud mal formada (JSON inválido, parámetros incorrectos) |
| 401 Unauthorized | No autenticado |
| 403 Forbidden | Autenticado pero sin permiso |
| 404 Not Found | Recurso no existe |
| 409 Conflict | Conflicto de estado (ej. duplicado) |
| 422 Unprocessable Entity | Validación de datos fallida (estándar en Laravel) |
| 429 Too Many Requests | Rate limit excedido |
| 500 Internal Server Error | Error no controlado del servidor |

**Regla P0/OBLIGATORIO:** nunca devolver `200 OK` con un error dentro del body (`{"error": true}` con status 200). El código HTTP siempre refleja el resultado real.

## 5. Formato de Request y Response

### Response exitoso (recurso único)
```json
{
  "data": {
    "id": 12,
    "type": "invoice",
    "total_amount": "1500.00",
    "status": "paid",
    "created_at": "2026-08-20T10:00:00Z"
  }
}
```

### Response exitoso (colección paginada)
```json
{
  "data": [ { "id": 1, "...": "..." }, { "id": 2, "...": "..." } ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 42
  },
  "links": {
    "next": "/api/v1/invoices?page=2",
    "prev": null
  }
}
```

> Este es el formato **mínimo** que el proyecto exige. `LengthAwarePaginator` de Laravel (`->paginate()`), envuelto en una `ResourceCollection`, produce por defecto una estructura más amplia (`meta` con `from`, `to`, `last_page`, `path`, `links[]`; `links` con `first`, `last`). Se acepta el default de Laravel siempre que incluya, como mínimo, `data`, `meta.current_page`, `meta.per_page`, `meta.total` y `links.next`/`links.prev`. Si se personaliza, el formato debe ser idéntico en todos los endpoints paginados.

### Response de error (formato único en todo el proyecto)
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos.",
    "details": {
      "total_amount": ["El monto total es obligatorio."]
    }
  }
}
```

## 6. Validación y errores
- Todo error de validación devuelve `422` con el formato de la sección 5 — P1/OBLIGATORIO. En Laravel, esto ya es el comportamiento por defecto de un `FormRequest`; se estandariza el formato de salida mediante el manejador de excepciones central.
- Los errores 500 nunca exponen el stack trace ni mensajes internos en producción; en desarrollo sí, para depuración — P0/OBLIGATORIO.

## 7. Paginación, filtros y ordenamiento

| Parámetro | Ejemplo | Comportamiento |
|---|---|---|
| `page`, `per_page` | `?page=2&per_page=20` | Paginación estándar (Laravel `paginate()`) |
| Filtros | `?status=paid&user_id=5` | Un parámetro por campo filtrable, documentado por endpoint |
| Ordenamiento | `?sort=-created_at` | Prefijo `-` para descendente; se documenta qué campos son ordenables |

`per_page` tiene un máximo definido por el backend (ej. 100) para evitar abuso — P1/OBLIGATORIO.

## 8. Autenticación y autorización
- Autenticación vía **Laravel Sanctum** (tokens, adecuado para SPA/API separada de este proyecto) — RECOMENDADO como default; OAuth2 completo (Passport) es AVANZADO y solo si se justifica.
- Todo endpoint que no sea explícitamente público requiere autenticación (`auth:sanctum`) — P0/OBLIGATORIO.
- La autorización de "quién puede hacer qué" se resuelve con Policies ([Doc. 02](/estandares/02-backend-laravel/)), no con `if` dispersos en el controlador — P1/OBLIGATORIO.

## 9. Versionado
- Se versiona desde el día uno con `/api/v1/` aunque solo exista una versión — P1/OBLIGATORIO. Evita romper contratos con el frontend cuando el proyecto crezca.
- Un breaking change de contrato (quitar/renombrar un campo, cambiar un tipo) requiere `v2`, no se modifica `v1` en producción — P2/RECOMENDADO (AVANZADO en la práctica, dado el alcance del proyecto, pero la regla de versionar desde el inicio sí es obligatoria).

## 10. Idempotencia
- `PUT` y `DELETE` deben ser idempotentes: llamarlos dos veces con los mismos datos produce el mismo estado final — P1/OBLIGATORIO.
- Operaciones críticas no idempotentes por naturaleza (ej. procesar un pago) deben prevenir duplicados con una clave de idempotencia o validación de estado previo — P2/RECOMENDADO (AVANZADO en implementación con `Idempotency-Key` header).

## 11. Convenciones JSON
- `snake_case` para claves JSON (consistente con las columnas de PostgreSQL) — P1/OBLIGATORIO.
- Fechas en formato ISO 8601 (`2026-08-20T10:00:00Z`) — P1/OBLIGATORIO.
- Nunca se devuelven campos sensibles (`password`, `remember_token`) — P0/OBLIGATORIO (se controla en el Resource, [Doc. 02](/estandares/02-backend-laravel/)).

## 12. Documentación de la API
- Cada endpoint se documenta (mínimo: método, ruta, parámetros, ejemplo de request/response, códigos de error posibles) en `docs/api/` o vía anotaciones OpenAPI (`l5-swagger`) — P1/OBLIGATORIO desde Fase 3 (ver [Doc. 16](/estandares/16-plan-implementacion/)).

## Reglas con ID (resumen)

Las reglas P0/P1 de este documento, para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-API-01 | El código HTTP siempre refleja el resultado real; nunca `200 OK` con un error en el body. | P0 | 4 |
| STD-API-02 | Todo error de validación devuelve `422` con el formato único de la sección 5. | P1 | 6 |
| STD-API-03 | Los errores 500 no exponen stack trace ni mensajes internos en producción. | P0 | 6 |
| STD-API-04 | `per_page` tiene un máximo definido por el backend. | P1 | 7 |
| STD-API-05 | Todo endpoint no explícitamente público requiere autenticación (`auth:sanctum`). | P0 | 8 |
| STD-API-06 | La autorización se resuelve con Policies, no con `if` dispersos en el controlador. | P1 | 8 |
| STD-API-07 | Se versiona desde el inicio con `/api/v1/`. | P1 | 9 |
| STD-API-08 | `PUT` y `DELETE` son idempotentes. | P1 | 10 |
| STD-API-09 | Claves JSON en `snake_case`. | P1 | 11 |
| STD-API-10 | Fechas en formato ISO 8601. | P1 | 11 |
| STD-API-11 | Nunca se devuelven campos sensibles (`password`, `remember_token`). | P0 | 11 |
| STD-API-12 | Cada endpoint se documenta (método, ruta, parámetros, ejemplos, códigos de error). | P1 | 12 |

## 13. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Formato de respuesta consistente | Manual + pruebas | Feature/API tests ([Doc. 08](/estandares/08-pruebas/)) + Code Review |
| Status codes correctos | Automática (parcial) | Tests de API que aseveran el status |
| Naming de rutas | Automática (revisión de `routes/api.php`) + manual | Code Review |
| Documentación de endpoint actualizada | Manual | Checklist de PR ([Doc. 13](/estandares/13-checklists/)) |
| Autenticación/autorización aplicada | Automática (tests) + manual | Tests + Code Review |

## 14. Referencias
- Estándares REST generales (Richardson Maturity Model como referencia conceptual, no como exigencia estricta de nivel 3/HATEOAS).
- [Doc. 02](/estandares/02-backend-laravel/) (Backend) para el mapeo de excepciones.
- [Doc. 09](/estandares/09-seguridad/) (Seguridad) para rate limiting, CORS, autenticación.
