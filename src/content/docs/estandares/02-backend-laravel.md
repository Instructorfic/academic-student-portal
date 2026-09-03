---
title: "DOC-02 · Estándar de codificación backend (Laravel / PHP)"
description: "Cómo se escribe y estructura el código PHP/Laravel: capas, naming, patrones y código limpio."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-BE |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead Backend / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Definir cómo se escribe, organiza y estructura el código PHP/Laravel del proyecto, priorizando código legible, simple y consistente sobre patrones sofisticados.

## 2. Alcance
Todo el código dentro de `backend/app`, `backend/routes`, `backend/database`, `backend/tests` y configuración de Laravel.

## 3. Base normativa (PSR y PHP moderno)
- **PSR-1** (estilo básico) y **estilo de código de Laravel** — OBLIGATORIO, verificado automáticamente por Laravel Pint con el preset `laravel`. Este preset se basa en PSR-12 y en su sucesor mantenido, **PER Coding Style** (PHP-FIG marcó PSR-12 como *deprecated* en favor de PER-CS), con ajustes propios de Laravel. No se exige el preset `psr12` estricto de Pint salvo que el equipo lo decida y lo documente.
- **PSR-4** (autoloading) — OBLIGATORIO, ya provisto por Composer/Laravel; no modificar `composer.json` sin justificar.
- PHP moderno (8.1+): usar **tipado estricto**, `readonly` en DTOs, enums nativos de PHP para catálogos cerrados, `match` en vez de `switch` cuando aplique — RECOMENDADO.
- `declare(strict_types=1);` al inicio de cada archivo de clase — RECOMENDADO (AVANZADO si el equipo aún no domina el tipado, pero se recomienda adoptarlo cuanto antes).

## 4. Naming conventions

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clases | `PascalCase`, singular | `InvoiceService`, `User` |
| Interfaces | `PascalCase` + sufijo `Interface` | `PaymentGatewayInterface` |
| Traits | `PascalCase` + sufijo descriptivo (`able`/`Trait`) | `HasUuid`, `LoggableTrait` |
| Métodos y funciones | `camelCase`, verbo + sustantivo | `calculateTotal()`, `sendInvoice()` |
| Variables | `camelCase`, nombre descriptivo, sin abreviaturas ambiguas | `$invoiceTotal`, no `$it` |
| Constantes / enum cases | `SCREAMING_SNAKE_CASE` | `MAX_ATTEMPTS`, `Status::ACTIVE` |
| Archivos de clase | Igual al nombre de la clase | `InvoiceService.php` |
| Tablas (Eloquent) | `snake_case`, plural | `invoices`, `order_items` |
| Rutas de API | `kebab-case`, plural | `/api/v1/order-items` |
| Variables de entorno | `SCREAMING_SNAKE_CASE` | `DB_CONNECTION`, `MAIL_MAILER` |

## 5. Estructura de carpetas propuesta (evaluada, no sobrearquitecturada)

```
app/
 ├── Http/
 │   ├── Controllers/Api/V1/     # Controladores delgados, un recurso por archivo
 │   ├── Requests/               # FormRequests: TODA validación de entrada vive aquí
 │   ├── Resources/               # Transformación de salida (JSON API)
 │   └── Middleware/
 ├── Models/                      # Eloquent models
 ├── Services/                    # Lógica de negocio que no pertenece al Model ni al Controller
 ├── Policies/                    # Autorización por modelo
 ├── Jobs/                        # Trabajos en cola (AVANZADO, cuando aplique)
 ├── Events/ & Listeners/         # Solo si hay un flujo realmente desacoplado (AVANZADO)
 ├── Exceptions/                  # Excepciones de dominio propias
 └── DTOs/                        # Solo si se pasa >3 datos relacionados entre capas (opcional)
```

**Justificación de cada carpeta** (ninguna se incluye "porque sí"):
- `Controllers`: obligatoria, punto de entrada HTTP. Deben ser **delgados**: reciben Request, delegan a Service o Model, devuelven Resource.
- `Requests`: obligatoria desde Fase 2. Centraliza validación; evita `if` de validación dentro del controlador.
- `Resources`: obligatoria para cualquier endpoint que devuelva datos a un frontend distinto del propio Blade (que es el caso aquí, con frontend separado).
- `Services`: se usa **solo cuando la lógica de negocio no cabe razonablemente en el Model ni en el Controller** (p. ej. orquesta varios modelos, llama a una API externa, aplica reglas complejas). No crear un Service vacío que solo llama a `Model::create()`.
- `Policies`: obligatoria en cuanto exista más de un rol de usuario.
- `Jobs/Events/Listeners`: **AVANZADO**. Solo si hay una necesidad real de asincronía o desacoplamiento (ej. enviar correos, generar reportes pesados). No se usan para "parecer más profesional".
- `DTOs`: opcionales. Se usan si transportar un array asociativo entre capas se vuelve confuso o propenso a errores; si el equipo aún no domina `readonly class`, un array tipado con FormRequest basta.

## 6. Repository Pattern, Factory Pattern, CQRS, Event Sourcing — cuándo NO usarlos
- **Repository Pattern:** en Laravel, Eloquent implementa el patrón **Active Record** (el modelo encapsula acceso a datos y comportamiento). Añadir *además* una capa `Repository` propia sobre Eloquent **no se implementa en este proyecto**, salvo que exista una necesidad real de intercambiar la fuente de datos (por ejemplo, alternar entre PostgreSQL y una API externa) — eso se documenta con ADR. Para el 95% de los casos del proyecto, `Model::query()...` dentro de un Service es suficiente y más legible para el nivel del equipo.
- **Factory Pattern (de diseño, no las Model Factories de testing):** no se introduce salvo que exista más de una familia real de objetos intercambiables en tiempo de ejecución (por ejemplo, más de una pasarela de pago). Las *Model Factories* de Laravel para testing **sí son obligatorias** ([Doc. 08](/estandares/08-pruebas/)) — son un concepto distinto.
- **CQRS:** fuera de alcance. Es una solución para sistemas con cargas de lectura/escritura muy asimétricas y complejas; el proyecto no tiene esa escala. No se implementa.
- **Event Sourcing:** fuera de alcance total. Añade complejidad de infraestructura (event store, proyecciones) que no se justifica en un proyecto académico de un semestre.
- Regla general: **si no puedes explicar en una frase el problema concreto que el patrón resuelve en este proyecto, no lo implementes.**

## 7. Controllers — reglas

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-BE-C01 | Un controlador por recurso (`InvoiceController`), métodos RESTful estándar (`index, store, show, update, destroy`). | P1 | OBLIGATORIO |
| STD-BE-C02 | El controlador no contiene lógica de validación (usa FormRequest) ni queries complejas directas (delega a Model/Service). | P1 | OBLIGATORIO |
| STD-BE-C03 | Cada método de controlador no supera ~25 líneas; si crece más, se extrae a un Service. | P2 | RECOMENDADO |
| STD-BE-C04 | Los controladores siempre devuelven `Resource`/`ResourceCollection` o `JsonResponse` explícito, nunca `Model` crudo. | P1 | OBLIGATORIO |

**Ejemplo correcto:**
```php
class InvoiceController extends Controller
{
    public function store(StoreInvoiceRequest $request, InvoiceService $service): InvoiceResource
    {
        $invoice = $service->create($request->validated());

        return new InvoiceResource($invoice);
    }
}
```

**Ejemplo incorrecto (validación y lógica de negocio en el controlador):**
```php
public function store(Request $request)
{
    if (!$request->total || $request->total < 0) {
        return response()->json(['error' => 'invalid'], 422);
    }
    $invoice = Invoice::create($request->all()); // Mass Assignment sin protección
    return response()->json($invoice);
}
```

## 8. Requests (validación)

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-BE-R01 | Toda entrada de usuario se valida con un `FormRequest` dedicado, nunca con `$request->all()` sin validar. | P0 | OBLIGATORIO |
| STD-BE-R02 | Los mensajes de error de validación son claros y en español (idioma del proyecto). | P2 | RECOMENDADO |
| STD-BE-R03 | La autorización básica (`authorize()`) del FormRequest se usa cuando aplica, en vez de comprobarlo manualmente en el controlador. | P2 | RECOMENDADO |

## 9. Models

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-BE-M01 | Todo modelo declara `$fillable` (nunca `$guarded = []`) para prevenir Mass Assignment. | P0 | OBLIGATORIO |
| STD-BE-M02 | Las relaciones Eloquent se nombran según la relación real (`hasMany`, `belongsTo`, etc.), método en `camelCase` singular/plural según corresponda. | P1 | OBLIGATORIO |
| STD-BE-M03 | La lógica de negocio compleja no vive en el Model; accesores/mutadores simples sí son aceptables ahí. | P2 | RECOMENDADO |
| STD-BE-M04 | Tipar propiedades y castings (`$casts`) explícitamente (fechas, enums, decimales). | P1 | OBLIGATORIO |

## 10. Resources, Policies, Middleware

- **Resources:** transforman el modelo a la forma exacta que el frontend necesita; no exponer campos sensibles (`password`, tokens) — P0/OBLIGATORIO.
- **Policies:** una policy por modelo con autorización condicional (ej. "solo el dueño puede editar su registro") — P1/OBLIGATORIO en cuanto exista autenticación multiusuario.
- **Middleware:** se usa para preocupaciones transversales (autenticación, rate limiting, logging de requests); no se usa para lógica de negocio — P1/OBLIGATORIO.

## 11. Validación, excepciones y manejo de errores

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-BE-E01 | Las excepciones de dominio (`InsufficientStockException`, etc.) extienden una excepción base propia, no `Exception` genérica. | P2 | RECOMENDADO |
| STD-BE-E02 | El `app/Exceptions/Handler.php` (o `bootstrap/app.php` en Laravel 11+) centraliza el mapeo de excepciones a respuestas HTTP consistentes (ver [Doc. 05](/estandares/05-api-rest/)). | P1 | OBLIGATORIO |
| STD-BE-E03 | Nunca se captura una excepción genérica (`catch (\Exception $e)`) solo para silenciarla sin loguear. | P0 | OBLIGATORIO |
| STD-BE-E04 | Los mensajes de excepción no exponen información sensible (rutas de servidor, queries SQL) en producción. | P0 | OBLIGATORIO |

**Ejemplo correcto:**
```php
try {
    $service->processPayment($order);
} catch (PaymentGatewayException $e) {
    Log::error('Fallo en pasarela de pago', ['order_id' => $order->id, 'error' => $e->getMessage()]);
    throw new PaymentFailedException('No se pudo procesar el pago.', previous: $e);
}
```

## 12. Logs
- Se usa el sistema de logging de Laravel (`Log::info/warning/error`), nunca `dd()`/`var_dump()`/`echo` en código que llega a `main` — P0/OBLIGATORIO.
- Los logs de error incluyen contexto (IDs relevantes), nunca datos sensibles (contraseñas, tokens completos) — P0/OBLIGATORIO.

## 13. Inyección de dependencias
- Se usa el Service Container de Laravel (type-hinting en constructores o métodos de controlador) en vez de instanciar clases con `new` dentro de la lógica de negocio — P2/RECOMENDADO, AVANZADO si implica bindings personalizados en `AppServiceProvider`.

## 14. SOLID, DRY, KISS, YAGNI aplicados con realismo

| Principio | Cómo se aplica aquí, en términos simples |
|---|---|
| **S**ingle Responsibility | Un Controller atiende un recurso; un Service resuelve un caso de uso, no "todo lo relacionado a X". |
| **O**pen/Closed | Si algo cambia mucho (ej. reglas de descuento), extraer a una clase separada en vez de llenar de `if` un método existente. |
| **L**iskov | Si una clase extiende otra, debe poder sustituirla sin romper el comportamiento esperado. |
| **I**nterface Segregation | No forzar una interfaz con 10 métodos si una clase solo necesita 2. |
| **D**ependency Inversion | Depender de una interfaz (`PaymentGatewayInterface`) solo si realmente habrá más de una implementación; si no, se puede depender de la clase concreta sin culpa. |
| **DRY** | Si copias/pegas el mismo bloque una tercera vez, extráelo a un método/trait. Copiarlo dos veces no es automáticamente una falta. |
| **KISS** | La solución más simple que resuelve el problema real gana, aunque no sea la "más elegante". |
| **YAGNI** | No construyas la opción de "por si en el futuro necesitamos multi-tenant" si nadie lo pidió. |

## 15. Código limpio — checklist rápido
- Nombres que explican el "qué" sin necesitar leer el cuerpo del método.
- Métodos con un solo nivel de abstracción (no mezclar validación de bajo nivel con orquestación de alto nivel en el mismo método).
- Evitar banderas booleanas como parámetro (`process($order, true)`) — usar nombres claros o enums.
- Máximo ~3 niveles de anidamiento (`if`/`foreach`); más que eso, extraer método.

## Reglas con ID (resumen)

Además de las reglas `STD-BE-C0x` (controllers), `STD-BE-R0x` (requests), `STD-BE-M0x` (models) y `STD-BE-E0x` (errores) de las secciones 7–11, este documento fija estas reglas generales, para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-BE-G01 | El código sigue el estilo de Laravel (preset `laravel` de Pint, base PSR-12/PER-CS); PSR-1 y PSR-4 obligatorios. | P1 | 3 |
| STD-BE-G02 | Se respetan las convenciones de nombres de la sección 4 (clases, métodos, variables, tablas, rutas, variables de entorno). | P1 | 4 |
| STD-BE-G03 | Los Resources no exponen campos sensibles (`password`, tokens). | P0 | 10 |
| STD-BE-G04 | Una Policy por modelo en cuanto exista autenticación multiusuario. | P1 | 10 |
| STD-BE-G05 | El middleware se usa para preocupaciones transversales, no para lógica de negocio. | P1 | 10 |
| STD-BE-G06 | Se usa `Log::*`, nunca `dd()`/`var_dump()`/`echo` en código que llega a `main`. | P0 | 12 |
| STD-BE-G07 | Los logs incluyen contexto y nunca datos sensibles. | P0 | 12 |

## 16. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Estilo de código (preset `laravel`, base PSR-12/PER-CS) | Automática | Laravel Pint (`--test` en CI) |
| Tipado y errores estáticos | Automática | PHPStan/Larastan nivel 4-5 |
| Naming de clases/métodos | Parcial (automática + humana) | PHPStan + Code Review |
| Estructura de capas (Controller delgado, etc.) | Manual | Code Review ([Doc. 07](/estandares/07-code-review/)) |
| Mass Assignment / fillable | Automática (regla PHPStan) + manual | Larastan + Review |

## 17. Referencias
- PSR-1, PSR-4 (php-fig.org). PSR-12 (deprecado) y su sucesor **PER Coding Style** (php-fig.org/per/coding-style).
- Documentación oficial de Laravel (versión usada por el proyecto, fijada en `composer.json`) y de Laravel Pint.
- [Doc. 05](/estandares/05-api-rest/) (API REST) para el mapeo de excepciones a códigos HTTP.
- [Doc. 08](/estandares/08-pruebas/) (Pruebas) para testing de Services/Controllers.
