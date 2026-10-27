---
title: "Laboratorio 4 — Desarrollo seguro"
description: "Bloque III de Taller Integrador — autorización con Policies, gestión de secretos y revisión de vulnerabilidades comunes."
---

## 1. Propósito

Al final del Laboratorio 2 se preguntaron qué podría hacer un usuario
autenticado que no debería poder hacer. En ReservaFIC la respuesta es
incómoda: si agregáramos "ver un préstamo por su número" sin más,
cualquier estudiante con un token podría pedir `/api/v1/prestamos/1`,
`/2`, `/3`... y leer las reservas de todos.

Saber **quién eres** (autenticación) no dice **qué puedes hacer**
(autorización). Esa confusión está en el primer lugar del OWASP Top
10:2025: *Broken Access Control*.

En este laboratorio van a cerrar esa y otras puertas antes de que el
sistema crezca: permisos por rol y por dueño, límite de intentos de
login, secretos fuera del código, errores que no revelan detalles
internos, consultas que no permiten inyección y dependencias auditadas.

---

## 2. ¿Qué vamos a lograr?

```text
☐ Roles y permisos aplicados con Policies (mínimo privilegio).
☐ Endpoints de ver y cancelar préstamo, protegidos por dueño o rol.
☐ Respuesta 403 con el formato único de error.
☐ Límite de intentos en el login (429).
☐ Prueba de que nadie puede asignarse un rol por asignación masiva.
☐ Secretos verificados: .env fuera del historial, .env.example completo.
☐ Exposición de información controlada (APP_DEBUG) comprobada.
☐ Revisión de consultas contra inyección SQL.
☐ Auditoría de dependencias con composer audit.
☐ Pruebas automatizadas para 401, 403 y 429.
☐ Integrado mediante merge request revisado.
```

---

## 3. Antes de comenzar

```text
Laboratorios 1 a 3 completos; suite de pruebas en verde.
Actividad A6 (mapa de amenazas) resuelta para su proyecto.
```

```bash
git checkout main
git pull origin main
git checkout -b feature/seguridad-api
```

---

## 4. Conceptos mínimos

### 4.1 Tres principios (3.4.1)

| Principio | Qué significa | Dónde ya lo aplican |
| --- | --- | --- |
| Validación de entradas | Nada que llegue de fuera se usa sin validar | Form Requests (`STD-SEC-12`) |
| Gestión de errores | El error se registra completo en el servidor y se informa mínimo al cliente | Manejador central del Lab 2 (`STD-SEC-17`) |
| Mínimo privilegio | Cada usuario, proceso o credencial tiene solo los permisos que necesita | Usuario de base de datos propio (Lab 1); roles en este laboratorio |

### 4.2 Identidad, roles y permisos (3.4.2)

```text
Identidad   → ¿quién eres?             → token de Sanctum (Laboratorio 2)
Rol         → ¿qué tipo de usuario?    → users.rol: estudiante | administrador
Permiso     → ¿puedes hacer ESTO       → Policy: decide por rol y por dueño
               con ESTE recurso?
```

En ReservaFIC:

| Acción | Estudiante | Administrador |
| --- | --- | --- |
| Listar sus préstamos | Sí | Sí |
| Ver o cancelar un préstamo propio | Sí | Sí |
| Ver o cancelar un préstamo ajeno | **No** | Sí |
| Registrar un equipo nuevo | **No** | Sí |

### 4.3 OWASP Top 10:2025

El OWASP Top 10 es una lista de consenso de los riesgos más críticos en
aplicaciones web, publicada por la fundación OWASP. La edición vigente
al momento de preparar este laboratorio es la **2025**
(`https://top10.owasp.org/2025/`, consultada el 2026-10-20). El tema
[7. Gestión de secretos](/materias/taller-integrador/bloque-03/07-gestion-de-secretos/) presenta las diez categorías; este
laboratorio aplica las que corresponden al contenido oficial 3.4.4.

> El estándar del proyecto ([`09-ESTANDAR-SEGURIDAD.md`](/recursos/estandares/09-estandar-seguridad/)) todavía cita la
> edición 2021. Las prácticas del estándar siguen
> vigentes; lo que cambian son los nombres y el orden de las categorías.

---

## 5. Paso 1 — Modelo con ReservaFIC: Policies

### 5.1 Crear las Policies

```bash
php artisan make:policy PrestamoPolicy --model=Prestamo
php artisan make:policy EquipoPolicy --model=Equipo
```

Laravel las asocia automáticamente con sus modelos por convención de
nombres. Dejen solo los métodos que usan; un método que devuelve `false`
por defecto es más seguro que uno olvidado que devuelve `true`.

`app/Policies/PrestamoPolicy.php`:

```php
<?php

namespace App\Policies;

use App\Models\Prestamo;
use App\Models\User;

class PrestamoPolicy
{
    public function view(User $usuario, Prestamo $prestamo): bool
    {
        return $usuario->esAdministrador()
            || $usuario->id === (int) $prestamo->user_id;
    }

    public function delete(User $usuario, Prestamo $prestamo): bool
    {
        return $this->view($usuario, $prestamo);
    }
}
```

`app/Policies/EquipoPolicy.php`:

```php
<?php

namespace App\Policies;

use App\Models\User;

class EquipoPolicy
{
    public function create(User $usuario): bool
    {
        return $usuario->esAdministrador();
    }
}
```

### 5.2 Usar las Policies en los controladores

En `PrestamoController` de la API, agreguen:

```php
use App\Models\Prestamo;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

public function show(Prestamo $prestamo): PrestamoResource
{
    Gate::authorize('view', $prestamo);

    return PrestamoResource::make($prestamo->load('equipo'));
}

public function destroy(Prestamo $prestamo): Response
{
    Gate::authorize('delete', $prestamo);

    $prestamo->delete();

    return response()->noContent();
}
```

En `EquipoController` de la API, un endpoint para registrar equipos,
solo para administración:

```bash
php artisan make:request Api/V1/GuardarEquipoRequest
```

```php
// GuardarEquipoRequest
public function authorize(): bool
{
    return true; // la autorización la decide EquipoPolicy en el controlador
}

public function rules(): array
{
    return [
        'nombre' => ['required', 'string', 'max:100'],
        'descripcion' => ['nullable', 'string', 'max:500'],
    ];
}
```

```php
// EquipoController
use App\Http\Requests\Api\V1\GuardarEquipoRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

public function store(GuardarEquipoRequest $request): JsonResponse
{
    Gate::authorize('create', Equipo::class);

    $equipo = Equipo::create($request->validated());

    return EquipoResource::make($equipo)->response()->setStatusCode(201);
}
```

Actualicen `routes/api.php`:

```php
Route::apiResource('equipos', EquipoController::class)->only(['index', 'store']);
Route::apiResource('prestamos', PrestamoController::class)->only(['index', 'store', 'show', 'destroy']);
```

### 5.3 Respuesta 403 con el formato único

Cuando `Gate::authorize` niega, Laravel lanza una excepción que termina
como `AccessDeniedHttpException`. Agreguen su `render` en
`bootstrap/app.php`, junto a los del Laboratorio 2:

```php
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

$exceptions->render(function (AccessDeniedHttpException $e, Request $request) use ($error) {
    if ($request->is('api/*')) {
        return $error('SIN_PERMISO', 'No tienes permiso para realizar esta acción.', [], 403);
    }
});
```

> **Decisión de diseño a discutir en equipo.** Responder 403 confirma
> que el préstamo existe. Algunos sistemas responden 404 a quien no
> tiene permiso para no revelar ni siquiera eso. El estándar del
> proyecto usa 403 ([`05-ESTANDAR-API-REST.md`](/recursos/estandares/05-estandar-api-rest/) §4); si su dominio maneja
> información sensible, discútanlo y documéntenlo.

---

## 6. Paso 2 — Límite de intentos en el login

Sin límite, un atacante puede probar miles de contraseñas por minuto
contra una cuenta (*Authentication Failures*, OWASP A07:2025). En
`routes/api.php`:

```php
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
```

Cinco intentos por minuto (`STD-SEC-13`). Al sexto, Laravel responde
429. Denle el formato único:

```php
use Illuminate\Http\Exceptions\ThrottleRequestsException;

$exceptions->render(function (ThrottleRequestsException $e, Request $request) use ($error) {
    if ($request->is('api/*')) {
        return $error('DEMASIADAS_PETICIONES', 'Demasiados intentos. Intenta más tarde.', [], 429);
    }
});
```

---

## 7. Paso 3 — Pruebas de seguridad

Agreguen a su factory de usuarios un estado de administrador, en
`database/factories/UserFactory.php`:

```php
use App\Enums\Rol;

public function administrador(): static
{
    return $this->state(fn () => ['rol' => Rol::ADMINISTRADOR]);
}
```

`tests/Feature/Api/V1/SeguridadApiTest.php`:

```php
<?php

namespace Tests\Feature\Api\V1;

use App\Models\Prestamo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SeguridadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_el_dueno_puede_ver_su_prestamo(): void
    {
        $prestamo = Prestamo::factory()->create();
        Sanctum::actingAs($prestamo->usuario);

        $this->getJson("/api/v1/prestamos/{$prestamo->id}")->assertOk();
    }

    public function test_un_estudiante_no_puede_ver_un_prestamo_ajeno(): void
    {
        $prestamo = Prestamo::factory()->create();
        Sanctum::actingAs(User::factory()->create());

        $this->getJson("/api/v1/prestamos/{$prestamo->id}")
            ->assertForbidden()
            ->assertJsonPath('error.code', 'SIN_PERMISO');
    }

    public function test_un_estudiante_no_puede_cancelar_un_prestamo_ajeno(): void
    {
        $prestamo = Prestamo::factory()->create();
        Sanctum::actingAs(User::factory()->create());

        $this->deleteJson("/api/v1/prestamos/{$prestamo->id}")->assertForbidden();
        $this->assertModelExists($prestamo);
    }

    public function test_administracion_puede_ver_cualquier_prestamo(): void
    {
        $prestamo = Prestamo::factory()->create();
        Sanctum::actingAs(User::factory()->administrador()->create());

        $this->getJson("/api/v1/prestamos/{$prestamo->id}")->assertOk();
    }

    public function test_un_estudiante_no_puede_registrar_equipos(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/equipos', ['nombre' => 'Proyector 101'])->assertForbidden();
        $this->assertDatabaseMissing('equipos', ['nombre' => 'Proyector 101']);
    }

    public function test_administracion_puede_registrar_equipos(): void
    {
        Sanctum::actingAs(User::factory()->administrador()->create());

        $this->postJson('/api/v1/equipos', ['nombre' => 'Proyector 101'])->assertCreated();
    }

    public function test_el_login_se_bloquea_tras_cinco_intentos(): void
    {
        $usuario = User::factory()->create();
        $credenciales = ['email' => $usuario->email, 'password' => 'incorrecta'];

        for ($intento = 1; $intento <= 5; $intento++) {
            $this->postJson('/api/v1/login', $credenciales)->assertUnauthorized();
        }

        $this->postJson('/api/v1/login', $credenciales)
            ->assertStatus(429)
            ->assertJsonPath('error.code', 'DEMASIADAS_PETICIONES');
    }

    public function test_nadie_puede_asignarse_un_rol_por_asignacion_masiva(): void
    {
        $usuario = User::create([
            'name' => 'Intento',
            'email' => 'intento@reservafic.test',
            'password' => 'una-clave-larga',
            'rol' => 'administrador',
        ]);

        $this->assertFalse($usuario->fresh()->esAdministrador());
    }

    public function test_la_respuesta_de_usuario_nunca_expone_la_contrasena(): void
    {
        $usuario = User::factory()->create();

        $this->assertArrayNotHasKey('password', $usuario->toArray());
    }
}
```

```bash
php artisan test --filter=SeguridadApiTest
```

#### Punto de control 1

Nueve pruebas en verde. Para comprobar que las pruebas de autorización
sí vigilan algo, comenten temporalmente la línea `Gate::authorize('view',
$prestamo);` y ejecuten de nuevo: la prueba "no puede ver un préstamo
ajeno" debe fallar. Después **restauren la línea**.

---

## 8. Paso 4 — Secretos (3.4.3)

### 8.1 ¿Alguna vez se subió el `.env`?

```bash
git ls-files .env
git log --all --oneline -- .env
```

Ambas órdenes deben responder vacío. Si `git log` muestra commits, el
archivo estuvo en el historial aunque hoy ya no esté: **todos los
secretos que contenía se consideran expuestos** y deben cambiarse
(contraseña de base de datos, `APP_KEY`, llaves de servicios externos),
no solo borrarse (`STD-SEC-04`). Avisen al docente.

### 8.2 `.env.example` completo y sin valores reales

Cada variable que el proyecto necesita debe estar en `.env.example`,
sin su valor secreto (`STD-SEC-02`). Comprueben que una persona nueva
podría levantar el proyecto con solo copiarlo y llenar los huecos.

### 8.3 Credenciales que no deberían estar en el código

```bash
grep -rniE "password|secret|api_key|token" app config routes --include=*.php | grep -v "env("
```

Revisen cada resultado. Una contraseña escrita en un archivo PHP es un
secreto en el repositorio. Los valores de configuración se leen con
`env()` **solo** dentro de `config/`; el resto del código usa
`config('...')`.

---

## 9. Paso 5 — Exposición de información y configuración insegura

Este paso muestra por qué `APP_DEBUG` nunca va en `true` fuera de
desarrollo (*Security Misconfiguration*, A02:2025).

1. En `.env`, dejen `APP_DEBUG=true` y cambien temporalmente
   `DB_PASSWORD` por un valor incorrecto.
2. Pidan `GET /api/v1/equipos` con un token válido.
3. Observen la respuesta 500: incluye la clase de la excepción, el
   archivo, la línea y, posiblemente, el host y el usuario de la base
   de datos.
4. Cambien a `APP_DEBUG=false` y repitan: el cliente solo recibe un
   mensaje genérico de error del servidor. El detalle sigue en
   `storage/logs/laravel.log`, que es donde debe estar.
5. **Restauren** `DB_PASSWORD` y `APP_DEBUG=true` para seguir
   desarrollando.

Anoten en `README.md`, en la sección de instalación: "en cualquier
ambiente que no sea el de desarrollo local, `APP_ENV=production` y
`APP_DEBUG=false`".

---

## 10. Paso 6 — Inyección (A05:2025)

Una inyección SQL ocurre cuando un dato del usuario se **concatena**
dentro del texto de una consulta y termina interpretándose como parte
del SQL.

Vulnerable:

```php
DB::select("SELECT * FROM equipos WHERE nombre = '{$request->nombre}'");
```

Si alguien envía como nombre `x' OR '1'='1`, la consulta devuelve todos
los equipos. Con otras cadenas puede hacer cosas peores.

Seguro (el valor viaja separado del SQL, como parámetro):

```php
Equipo::where('nombre', $request->validated('nombre'))->get();
```

Busquen en su proyecto los lugares donde se escribe SQL a mano:

```bash
grep -rnE "DB::(raw|select|statement|unprepared)|whereRaw|orderByRaw|selectRaw" app database
```

Para cada resultado, respondan: ¿algún dato que venga del usuario forma
parte del texto? Si la respuesta es sí, reescríbanlo con el constructor
de consultas o con parámetros (`?`). La sentencia `CHECK` del
Laboratorio 1 aparece en la búsqueda, pero es segura: su texto es
constante (`STD-SEC-08`).

---

## 11. Paso 7 — Dependencias vulnerables (A03:2025)

Su proyecto ejecuta código de decenas de paquetes que ustedes no
escribieron. *Software Supply Chain Failures* es la categoría A03 del
OWASP Top 10:2025.

```bash
composer audit
```

`composer audit` compara las versiones instaladas contra bases públicas
de vulnerabilidades conocidas.

* Sin hallazgos: guarden la salida como evidencia.
* Con hallazgos: creen un issue por cada uno, con el paquete, la
  severidad y la versión que lo corrige. Actualicen con
  `composer update <paquete>` en una rama propia y verifiquen con la
  suite de pruebas. No actualicen todo a ciegas en el mismo MR.

No agreguen paquetes de fuentes no oficiales o sin mantenimiento sin
revisión del equipo (`STD-SEC-18`).

---

## 12. Paso 8 — Aplicarlo a su proyecto

1. A partir de la Actividad A6, escriban la tabla de permisos de su
   dominio (como la de la sección 4.2) y conviértanla en Policies.
2. Escriban al menos: una prueba 401, una 403 por cada regla de
   permiso, una 429 del login y la de asignación masiva.
3. Completen los Pasos 4 a 7 sobre su repositorio.
4. Actualicen `docs/api/` con los códigos 403 y 429.

---

## 13. Paso 9 — Integrar

```bash
git commit -m "feat(auth): aplicar policies de prestamos y equipos"
git commit -m "feat(auth): limitar intentos de login"
git commit -m "test(auth): agregar pruebas de autorizacion y rate limiting"
git commit -m "docs: documentar configuracion segura y codigos 403/429"
```

Merge request hacia `main`. Para un MR de seguridad, quien revisa
aplica la fila "Seguridad" del checklist `STD-CR` y marca como
**BLOCKER** cualquier violación de una regla P0 (por ejemplo, un
endpoint de datos sin `auth:sanctum` o una acción sensible sin
Policy).

---

## 14. Troubleshooting

| Síntoma | Diagnóstico | Solución |
| --- | --- | --- |
| Siempre 403, incluso al dueño | Comparación de tipos distintos (`"5"` contra `5`) | Conviertan con `(int)`, como en la Policy de ejemplo |
| La Policy no se ejecuta | El nombre o la carpeta no siguen la convención | `app/Policies/<Modelo>Policy.php` |
| 403 devuelve HTML | Falta el `render` de `AccessDeniedHttpException` | Paso 1, sección 5.3 |
| La prueba de 429 falla de forma intermitente | Otra prueba consume los intentos del mismo minuto | Cada prueba crea su propio usuario; ejecútenla aislada para confirmar |
| `composer audit` no existe | Composer anterior a la versión 2.4 | `composer self-update` |

---

## 15. Evidencia del laboratorio

```text
A. Tabla de permisos de su dominio y sus Policies.
B. Salida de las pruebas de seguridad en verde.
C. Evidencia de que una prueba de autorización falla al quitar la protección (Punto de control 1).
D. Salida de `git log --all --oneline -- .env` (vacía o con plan de rotación).
E. Captura comparando la respuesta 500 con APP_DEBUG=true y con APP_DEBUG=false.
F. Resultado de la búsqueda de SQL manual con la conclusión de cada caso.
G. Salida de `composer audit` (e issues si hubo hallazgos).
H. Merge request integrado.
```

---

## 16. Reflexión del equipo

1. ¿Qué diferencia práctica encontraron entre autenticación y
   autorización en su propio dominio?
2. ¿Qué información revelaba su sistema con `APP_DEBUG=true` que un
   atacante podría aprovechar?
3. De las diez categorías del OWASP Top 10:2025, ¿cuál les parece más
   probable en su proyecto y qué harían en el siguiente sprint para
   reducirla?

---

## 17. Criterio de finalización

```text
☐ Permisos por rol y por dueño aplicados con Policies.
☐ 401, 403 y 429 con formato único y probados automáticamente.
☐ Ningún rol se puede asignar por asignación masiva (probado).
☐ .env nunca estuvo en el historial (o hay plan de rotación).
☐ .env.example completo y sin secretos.
☐ APP_DEBUG documentado; comportamiento verificado.
☐ Consultas manuales revisadas contra inyección.
☐ composer audit ejecutado y sus hallazgos registrados.
☐ Integrado mediante merge request revisado.
```
