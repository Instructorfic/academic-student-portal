---
title: "Laboratorio 2 — API REST del proyecto"
description: "Bloque III de Taller Integrador — exponer la funcionalidad principal como API REST versionada, con validación, errores consistentes y autenticación con Sanctum."
---

## 1. Propósito

Hasta ahora, la única forma de usar su sistema es abrir sus vistas en un
navegador. Un servicio digital real casi nunca tiene un solo cliente:
una aplicación móvil, otro sistema de la facultad o un frontend
separado necesitan **hablar con su sistema sin pasar por sus vistas**.

Para eso existe una **API** (*Application Programming Interface*): un
contrato que dice qué puede pedirse, cómo pedirlo y qué se recibe de
vuelta.

En este laboratorio van a exponer la funcionalidad principal de su
proyecto como una API REST versionada, reutilizando el Service y el
Form Request del Bloque II. No van a reescribir la lógica: la van a
**conectar** a una nueva puerta de entrada.

---

## 2. ¿Qué vamos a lograr?

```text
☐ Rutas de API bajo /api/v1, con recursos en plural y sin verbos en la URL.
☐ Un controlador de API delgado que reutiliza el Form Request y el Service existentes.
☐ Respuestas JSON con forma estable mediante API Resources (snake_case, fechas ISO 8601).
☐ Códigos de estado HTTP que reflejan el resultado real (200, 201, 401, 404, 409, 422).
☐ Un formato de error único para toda la API.
☐ Registro de eventos (log) con contexto y sin datos sensibles.
☐ Autenticación con token (Laravel Sanctum): ningún endpoint de datos queda público.
☐ Documentación de cada endpoint en docs/api/.
☐ Integrado mediante merge request revisado.
```

---

## 3. Antes de comenzar

### Requisitos

```text
Laboratorio 1 completo: PostgreSQL, relaciones y factories.
Herramienta para hacer peticiones HTTP: curl (incluido en Windows 10+, macOS y Linux), o Postman / Insomnia.
```

```bash
git checkout main
git pull origin main
git checkout -b feature/api-v1
```

---

## 4. Conceptos mínimos

### 4.1 Recurso, endpoint y método

En REST, la URL nombra un **recurso** (un sustantivo: `prestamos`) y el
**método HTTP** dice qué se hace con él ([`05-ESTANDAR-API-REST.md`](/recursos/estandares/05-estandar-api-rest/) §2–3):

| Método | Ruta | Significado |
| --- | --- | --- |
| `GET` | `/api/v1/prestamos` | Listar préstamos |
| `POST` | `/api/v1/prestamos` | Crear un préstamo |
| `GET` | `/api/v1/prestamos/{id}` | Ver un préstamo |
| `DELETE` | `/api/v1/prestamos/{id}` | Cancelar un préstamo |

Incorrecto: `/api/crearPrestamo`. El verbo ya lo da el método.

En este laboratorio implementan **listar y crear**. Ver y cancelar
requieren decidir *quién* puede ver o cancelar *qué* préstamo
(autorización), y eso se hace en el Laboratorio 4 con Policies. No se
publican esos endpoints antes de tener esa protección.

### 4.2 El código de estado es parte de la respuesta

La regla más importante del estándar: **nunca responder `200 OK` con un
error dentro del cuerpo** (`STD-API-01`, P0). El cliente decide qué
hacer leyendo el código:

| Código | En ReservaFIC significa |
| --- | --- |
| 200 | Lectura exitosa |
| 201 | Préstamo creado |
| 401 | No se envió un token válido |
| 404 | El recurso no existe |
| 409 | El equipo ya está reservado en ese horario (regla de negocio) |
| 422 | Los datos no pasan la validación |

### 4.3 Serialización

El servidor tiene objetos PHP (un modelo `Prestamo` con fechas de tipo
`Carbon`); por la red solo viaja texto. **Serializar** es convertir el
objeto a texto JSON; **deserializar** es el camino inverso (Laravel
convierte el JSON de la petición en un arreglo). La **validación**
ocurre después de deserializar y antes de usar los datos.

```text
Cliente                         Servidor
JSON  ──── petición ────►  deserializar → validar (Form Request) → Service → Repository → PostgreSQL
JSON  ◄─── respuesta ───   serializar (API Resource) ◄────────────────────────────┘
```

---

## 5. Paso 1 — Instalar el soporte de API y Sanctum

```bash
php artisan install:api
```

Este comando (Laravel 11 o posterior) crea `routes/api.php`, instala
**Laravel Sanctum** (paquete oficial de autenticación por token) y
agrega la migración de la tabla `personal_access_tokens`. Acepten
ejecutar las migraciones o ejecútenlas después con `php artisan migrate`.

Si su proyecto usa una versión de Laravel anterior a la 11, este comando
no existe: consulten la documentación de Sanctum de **su** versión
(pendiente de verificación de la versión del curso).

En `app/Models/User.php`, agreguen el trait que permite emitir tokens:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // ...
}
```

---

## 6. Paso 2 — Modelo con ReservaFIC: las rutas

Reemplacen el contenido de `routes/api.php`. Laravel ya antepone `/api`
a todo lo que esté en este archivo; ustedes agregan la versión
(`STD-API-07`):

```php
<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EquipoController;
use App\Http\Controllers\Api\V1\PrestamoController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::apiResource('equipos', EquipoController::class)->only(['index']);
        Route::apiResource('prestamos', PrestamoController::class)->only(['index', 'store']);
    });
});
```

Todo lo que está dentro de `auth:sanctum` exige un token válido. El
único endpoint público es `login` (`STD-API-05`).

---

## 7. Paso 3 — Autenticación: identidad mediante token

### 7.1 Validar la entrada del login

```bash
php artisan make:request Api/V1/LoginRequest
```

```php
public function authorize(): bool
{
    return true;
}

public function rules(): array
{
    return [
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
    ];
}
```

### 7.2 Controlador de autenticación

`app/Http/Controllers/Api/V1/AuthController.php`:

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $usuario = User::where('email', $request->validated('email'))->first();

        if (! $usuario || ! Hash::check($request->validated('password'), $usuario->password)) {
            return response()->json([
                'error' => [
                    'code' => 'CREDENCIALES_INVALIDAS',
                    'message' => 'Las credenciales no son válidas.',
                    'details' => (object) [],
                ],
            ], 401);
        }

        $token = $usuario->createToken('api', ['*'], now()->addHours(8));

        return response()->json([
            'data' => [
                'token' => $token->plainTextToken,
                'tipo' => 'Bearer',
                'expira_en' => $token->accessToken->expires_at?->toIso8601ZuluString(),
            ],
        ]);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
```

Observen tres decisiones de seguridad:

1. El mensaje de error es el mismo si el correo no existe o si la
   contraseña es incorrecta. Un mensaje distinto le diría a un atacante
   qué correos están registrados (exposición de información, 3.4.4).
2. El token **expira** a las 8 horas. Por defecto, los tokens de Sanctum
   no expiran (documentación oficial de Sanctum, "Token Expiration");
   el estándar pide una expiración razonable (`STD-SEC-06`).
3. Sanctum almacena el token con un hash SHA-256; el texto plano solo se
   muestra una vez, en esta respuesta.

---

## 8. Paso 4 — Dar forma a la salida: API Resources

Un **API Resource** decide exactamente qué campos salen y con qué
nombre. Nunca devuelvan un modelo crudo (`STD-BE-C04`): expondrían
columnas que no deberían salir y el contrato cambiaría cada vez que
agreguen una columna.

```bash
php artisan make:resource EquipoResource
php artisan make:resource PrestamoResource
```

`app/Http/Resources/EquipoResource.php`:

```php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'nombre' => $this->nombre,
        'descripcion' => $this->descripcion,
        'disponible' => $this->disponible,
    ];
}
```

`app/Http/Resources/PrestamoResource.php`:

```php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'equipo' => EquipoResource::make($this->whenLoaded('equipo')),
        'fecha_inicio' => $this->fecha_inicio->toIso8601ZuluString(),
        'fecha_fin' => $this->fecha_fin->toIso8601ZuluString(),
        'created_at' => $this->created_at?->toIso8601ZuluString(),
    ];
}
```

* Claves en `snake_case` (`STD-API-09`).
* Fechas en ISO 8601 con zona UTC, por ejemplo `2026-11-10T10:00:00Z`
  (`STD-API-10`). Toda fecha que entra y sale de la API se interpreta
  en UTC.
* `whenLoaded('equipo')` incluye el equipo solo si se cargó con
  `with()`. Así evitan consultas ocultas (problema N+1, `04-ESTANDAR`
  §2.8).
* `user_id` no se expone: el cliente ya sabe quién es.

---

## 9. Paso 5 — Controladores de API delgados

Los controladores de API viven en su propia carpeta
([`02-ESTANDAR-BACKEND-LARAVEL.md`](/recursos/estandares/02-estandar-backend-laravel/) §5): `app/Http/Controllers/Api/V1/`.

`app/Http/Controllers/Api/V1/EquipoController.php`:

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipoResource;
use App\Models\Equipo;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EquipoController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return EquipoResource::collection(Equipo::orderBy('nombre')->paginate(15));
    }
}
```

`app/Http/Controllers/Api/V1/PrestamoController.php`:

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuardarPrestamoRequest;
use App\Http\Resources\PrestamoResource;
use App\Services\PrestamoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PrestamoController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $porPagina = max(1, min((int) $request->query('per_page', 15), 100));

        $prestamos = $request->user()
            ->prestamos()
            ->with('equipo')
            ->orderByDesc('fecha_inicio')
            ->paginate($porPagina);

        return PrestamoResource::collection($prestamos);
    }

    public function store(GuardarPrestamoRequest $request, PrestamoService $service): JsonResponse
    {
        $prestamo = $service->crear([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return PrestamoResource::make($prestamo->load('equipo'))
            ->response()
            ->setStatusCode(201);
    }
}
```

Lean el método `store` como un integrador de componentes (RA3.2):

```text
GuardarPrestamoRequest  → valida la forma (Bloque II, reutilizado tal cual)
$request->user()        → identidad (Sanctum)
PrestamoService         → regla de negocio (Bloque II, reutilizado tal cual)
Repository + PostgreSQL → persistencia (Bloque II + Laboratorio 1)
PrestamoResource        → forma de la salida
```

Ninguna regla de negocio se copió al controlador de API. Si la regla
cambia, cambia en un solo lugar.

Dos detalles de seguridad en este controlador:

* `user_id` sale **del token**, nunca del cuerpo de la petición. Si
  saliera del cuerpo, cualquiera podría reservar a nombre de otra
  persona.
* `per_page` tiene un máximo de 100 (`STD-API-04`): sin ese límite,
  alguien podría pedir un millón de registros en una sola petición.

> **¿Y el controlador web del Bloque II?** Las vistas Blade del
> proyecto no tienen inicio de sesión, y a partir de este bloque todo
> préstamo necesita un usuario. Si su controlador web de creación queda
> sin identidad, desactiven esa ruta y dejen la creación en la API.
> Regístrenlo como issue y en `ARQUITECTURA.md`. El listado web de
> equipos puede quedarse.

---

## 10. Paso 6 — Un formato de error único y registro de eventos

### 10.1 La excepción de dominio con contexto

Amplíen `app/Exceptions/ConflictoDeReservaException.php` para que lleve
el equipo involucrado:

```php
<?php

namespace App\Exceptions;

use RuntimeException;

class ConflictoDeReservaException extends RuntimeException
{
    public function __construct(public readonly ?int $equipoId = null)
    {
        parent::__construct('El equipo ya está reservado en ese horario.');
    }
}
```

En `PrestamoService`, al lanzarla:

```php
throw new ConflictoDeReservaException((int) $datos['equipo_id']);
```

### 10.2 Manejador central

En Laravel 11 o posterior, el mapeo de excepciones a respuestas vive en
`bootstrap/app.php` (`STD-BE-E02`). Reemplacen el bloque
`->withExceptions(...)`:

```php
use App\Exceptions\ConflictoDeReservaException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

// ...

->withExceptions(function (Exceptions $exceptions) {
    $error = fn (string $codigo, string $mensaje, array $detalles, int $estado) => response()->json([
        'error' => [
            'code' => $codigo,
            'message' => $mensaje,
            'details' => (object) $detalles,
        ],
    ], $estado);

    $exceptions->render(function (ValidationException $e, Request $request) use ($error) {
        if ($request->is('api/*')) {
            return $error('VALIDATION_ERROR', 'Los datos enviados no son válidos.', $e->errors(), 422);
        }
    });

    $exceptions->render(function (ConflictoDeReservaException $e, Request $request) use ($error) {
        if ($request->is('api/*')) {
            Log::info('Reserva rechazada por conflicto de horario', [
                'equipo_id' => $e->equipoId,
                'user_id' => $request->user()?->id,
            ]);

            return $error('CONFLICTO_RESERVA', $e->getMessage(), [], 409);
        }
    });

    $exceptions->render(function (AuthenticationException $e, Request $request) use ($error) {
        if ($request->is('api/*')) {
            return $error('NO_AUTENTICADO', 'Se requiere autenticación.', [], 401);
        }
    });

    $exceptions->render(function (NotFoundHttpException $e, Request $request) use ($error) {
        if ($request->is('api/*')) {
            return $error('NO_ENCONTRADO', 'El recurso solicitado no existe.', [], 404);
        }
    });
})
```

Cada `render` devuelve una respuesta solo si la petición es de la API;
si no devuelve nada, Laravel usa su comportamiento normal (las vistas
web siguen igual).

### 10.3 Qué se registra y qué no

`Log::info` escribe en `storage/logs/laravel.log` un evento con
**contexto** (IDs), útil para diagnosticar después
(`STD-BE-G07`). Nunca registren contraseñas, tokens ni el cuerpo
completo de la petición (`STD-SEC-17`).

Los errores no controlados (500) los registra Laravel automáticamente.
En producción, `APP_DEBUG=false` evita que el detalle técnico llegue al
cliente (`STD-API-03`); lo verificarán en el Laboratorio 4.

---

## 11. Paso 7 — Probar la API a mano

Levanten el servidor y poblen la base:

```bash
php artisan migrate:fresh --seed
php artisan serve
```

En otra terminal, inicien sesión. La `UserFactory` de Laravel asigna
la contraseña `password` a los usuarios del seeder (solo datos de
desarrollo):

```bash
curl -s -X POST http://127.0.0.1:8000/api/v1/login \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"estudiante@reservafic.test","password":"password"}'
```

Respuesta esperada (el token será distinto):

```json
{
  "data": {
    "token": "1|Xb9...",
    "tipo": "Bearer",
    "expira_en": "2026-11-10T18:00:00Z"
  }
}
```

Guarden el token en una variable de la terminal (no en un archivo del
repositorio):

```bash
TOKEN="1|Xb9..."
```

Creen un préstamo:

```bash
curl -s -i -X POST http://127.0.0.1:8000/api/v1/prestamos \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"equipo_id":1,"fecha_inicio":"2026-11-10T10:00:00Z","fecha_fin":"2026-11-10T12:00:00Z"}'
```

#### Punto de control 1

La primera línea de la respuesta debe ser `HTTP/1.1 201 Created` y el
cuerpo debe tener `data.equipo.nombre`.

#### Punto de control 2 — los cuatro errores

Ejecuten y anoten el código de cada respuesta:

| Petición | Código esperado | `error.code` esperado |
| --- | --- | --- |
| La misma petición de arriba otra vez | 409 | `CONFLICTO_RESERVA` |
| Sin `fecha_fin` | 422 | `VALIDATION_ERROR` |
| Sin el encabezado `Authorization` | 401 | `NO_AUTENTICADO` |
| `GET /api/v1/no-existe` con token | 404 | `NO_ENCONTRADO` |

Si alguna petición devuelve `200` con un error adentro, o un HTML en
lugar de JSON, revisen la sección 14.

#### Punto de control 3 — el log

```bash
tail -n 5 storage/logs/laravel.log
```

Debe aparecer la línea "Reserva rechazada por conflicto de horario" con
`equipo_id` y `user_id`, y **sin** token ni contraseña.

---

## 12. Paso 8 — Documentar la API

Cada endpoint se documenta (`STD-API-12`). Creen
`docs/api/prestamos.md`:

````markdown
# API — Préstamos (v1)

Autenticación: `Authorization: Bearer <token>` (obtenido en `POST /api/v1/login`).
Encabezados obligatorios: `Accept: application/json`.

## POST /api/v1/prestamos

Crea un préstamo para el usuario autenticado.

| Campo | Tipo | Regla |
| --- | --- | --- |
| equipo_id | entero | obligatorio; debe existir |
| fecha_inicio | fecha ISO 8601 (UTC) | obligatoria |
| fecha_fin | fecha ISO 8601 (UTC) | obligatoria; posterior a fecha_inicio |

Respuestas: 201 (creado), 401, 409 (`CONFLICTO_RESERVA`), 422 (`VALIDATION_ERROR`).

Ejemplo de petición y de respuesta: <pegar las del Paso 7>.

## GET /api/v1/prestamos

Lista los préstamos del usuario autenticado, paginados.
Parámetros: `page`, `per_page` (máximo 100).
Respuestas: 200, 401.
````

---

## 13. Paso 9 — Aplicarlo a su proyecto e integrarlo

1. Antes de programar, completen la Actividad A2 (contrato de API) con
   los recursos de su dominio.
2. Implementen al menos los endpoints de **listar y crear** del recurso
   principal de su proyecto, más el login.
3. Verifiquen los cuatro códigos de error del Punto de control 2 con su
   propio recurso.
4. Documenten en `docs/api/`.
5. Commits sugeridos:

```bash
git commit -m "feat(api): instalar Sanctum y agregar login con token"
git commit -m "feat(api): agregar endpoints de listar y crear prestamos"
git commit -m "feat(api): unificar formato de errores de la API"
git commit -m "docs(api): documentar endpoints de prestamos"
```

6. Merge request hacia `main`. Quien revise debe ejecutar al menos una
   petición de éxito y una de error antes de aprobar, y aplicar el
   checklist `STD-CR` (fila "API — respeta formato y status codes").

---

## 14. Troubleshooting

| Síntoma | Diagnóstico | Solución |
| --- | --- | --- |
| La respuesta es HTML o una redirección en vez de JSON | Falta el encabezado `Accept: application/json` | Agréguenlo siempre; así Laravel sabe que el cliente espera JSON |
| `Route [login] not defined` al llamar sin token | Laravel intenta redirigir a una página web de login porque la petición no pidió JSON | Mismo caso: falta `Accept: application/json` |
| 404 en todas las rutas de API | Rutas de API no registradas | Verifiquen que `install:api` agregó `api:` en `withRouting(...)` de `bootstrap/app.php`; revisen `php artisan route:list --path=api` |
| 500 con `Target [...Interface] is not instantiable` | Falta el binding del Repository | Laboratorio 1, sección 7.6 |
| `Call to undefined method createToken()` | `User` no usa `HasApiTokens` | Paso 1 |
| 422 con fechas que parecen correctas | El formato no es interpretable como fecha | Usen ISO 8601: `2026-11-10T10:00:00Z` |
| `curl` en PowerShell no acepta `\` para cortar líneas | En PowerShell el continuador es el acento grave (`` ` ``) | Escriban la orden en una sola línea o usen Postman / Insomnia |

---

## 15. Evidencia del laboratorio

```text
A. Salida de `php artisan route:list --path=api`.
B. Petición y respuesta 201 del recurso principal de su proyecto.
C. Tabla del Punto de control 2 completada con su recurso (códigos reales obtenidos).
D. Línea del log con contexto y sin datos sensibles.
E. docs/api/<recurso>.md.
F. Merge request integrado con evidencia de que quien revisó probó la API.
```

---

## 16. Reflexión del equipo

1. ¿Qué parte del Bloque II pudieron reutilizar sin cambios? ¿Qué
   hubiera pasado si la regla de negocio siguiera en el controlador web?
2. ¿Por qué `409` y no `422` para el conflicto de horario? (Pista: ¿los
   datos están mal formados o chocan con el estado actual del sistema?)
3. ¿Qué podría hacer hoy un usuario autenticado que no debería poder
   hacer? Anótenlo: es el punto de partida del Laboratorio 4.

---

## 17. Criterio de finalización

```text
☐ Rutas bajo /api/v1, recursos en plural, sin verbos en la URL.
☐ Login con token que expira; todos los endpoints de datos exigen auth:sanctum.
☐ Controladores de API delgados que reutilizan Form Request y Service.
☐ Respuestas mediante API Resources; ningún campo sensible expuesto.
☐ Códigos 201/401/404/409/422 verificados con su propio recurso.
☐ Formato de error único {"error": {code, message, details}}.
☐ Al menos un evento registrado con contexto y sin datos sensibles.
☐ Endpoints documentados en docs/api/.
☐ Integrado mediante merge request revisado.
```
