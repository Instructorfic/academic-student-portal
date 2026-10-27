---
title: "Laboratorio 3 — Pruebas unitarias y de integración"
description: "Bloque III de Taller Integrador — encontrar con pruebas el defecto de traslape del Bloque II, corregirlo y revisarlo en un merge request."
---

## 1. Propósito

El incremento del Bloque II funcionaba. Lo probaron a mano, lo
revisaron en un merge request, lo integraron.

Y tiene un defecto.

Si en ReservaFIC alguien reservó un proyector de 10:00 a 14:00, el
sistema le permite a otra persona reservar el **mismo** proyector de
11:00 a 12:00. Y si alguien lo reservó de 10:00 a 12:00, el sistema
**rechaza** a quien quiere usarlo de 12:00 a 14:00, aunque no se
traslapan.

Nadie lo vio porque nadie probó esos casos. En la Actividad A1 ya lo
descubrieron razonando. En este laboratorio lo van a **demostrar** con
una prueba automatizada que falla, lo van a corregir, y esa prueba se
va a quedar en el proyecto para que el defecto no regrese nunca.

---

## 2. ¿Qué vamos a lograr?

```text
☐ Una base de datos PostgreSQL exclusiva para pruebas, configurada en phpunit.xml.
☐ Un issue en GitLab que documenta el defecto con pasos para reproducirlo.
☐ Una prueba de integración (Repository + PostgreSQL) que falla antes de la corrección.
☐ La corrección del defecto, con la misma prueba ahora en verde.
☐ Pruebas unitarias del Service que no necesitan base de datos.
☐ Pruebas de la API: un caso exitoso y casos de error por endpoint.
☐ ADR-002 que justifica el patrón Repository.
☐ La matriz de casos de su propio proyecto convertida en pruebas.
☐ Integrado mediante merge request que cierra el issue.
```

---

## 3. Antes de comenzar

### Requisitos

```text
Laboratorios 1 y 2 completos.
Base de datos reservafic_testing creada (Laboratorio 1, Paso 1).
Actividad A4 (matriz de casos de prueba) resuelta para su proyecto.
```

### 3.1 Configurar la base de datos de pruebas

Las pruebas de integración usan una base **real** del mismo motor que
producción ([`08-ESTANDAR-PRUEBAS.md`](/recursos/estandares/08-estandar-pruebas/) §6). SQLite en memoria no
reproduce todo el comportamiento de PostgreSQL.

Abran `phpunit.xml`. En un proyecto Laravel reciente encontrarán dos
líneas que configuran SQLite en memoria. Reemplácenlas:

```xml
<env name="DB_CONNECTION" value="pgsql"/>
<env name="DB_DATABASE" value="reservafic_testing"/>
```

Host, usuario y contraseña se toman de su `.env`. La base
`reservafic_testing` se vacía y reconstruye en cada prueba
(`RefreshDatabase`); **nunca** apunten las pruebas a su base de
desarrollo.

```bash
php artisan test
```

Las pruebas de ejemplo que trae Laravel deben pasar. Si la prueba de
ejemplo de `tests/Feature` falla porque su ruta `/` ya no responde 200,
ajústenla o elimínenla: una prueba que siempre falla enseña a ignorar
las pruebas.

---

## 4. Conceptos mínimos

### 4.1 Unitaria vs. integración

| | Prueba unitaria | Prueba de integración |
| --- | --- | --- |
| Qué verifica | Una pieza aislada (un método del Service) | Varias piezas reales juntas (Repository + PostgreSQL; o HTTP + Form Request + Service + base) |
| Base de datos | No | Sí, una de pruebas |
| Velocidad | Milisegundos | Más lenta |
| Encuentra | Errores de lógica de la pieza | Errores en cómo se conectan las piezas (por ejemplo, una consulta SQL mal escrita) |
| En Laravel | `tests/Unit`, extiende `PHPUnit\Framework\TestCase` | `tests/Feature`, extiende `Tests\TestCase` |

El defecto de ReservaFIC está en una **consulta SQL**. Una prueba
unitaria del Service con un repositorio falso no lo puede encontrar:
el repositorio falso no ejecuta SQL. Necesitan una prueba de
integración. Esa diferencia es el corazón de este laboratorio.

### 4.2 Casos positivos y negativos

Un **caso positivo** verifica que el sistema hace lo que debe con datos
válidos. Un **caso negativo** verifica que **rechaza** lo que debe
rechazar. Los defectos suelen vivir en los **bordes**: el minuto exacto
en que termina una reserva, el valor cero, la lista vacía
([`08-ESTANDAR-PRUEBAS.md`](/recursos/estandares/08-estandar-pruebas/) §3).

### 4.3 Ver la prueba fallar primero

Una prueba que nunca vieron fallar puede estar pasando por la razón
equivocada (por ejemplo, una aserción que no verifica nada). Por eso, en
este laboratorio, escriben la prueba **antes** de corregir y confirman
que falla por la razón esperada.

---

## 5. Paso 1 — Registrar el defecto como issue

En GitLab, creen un issue con la plantilla de defecto
(`recursos/estandares/config-examples/ISSUE_TEMPLATE_bug.md`, adaptada
a `.gitlab/issue_templates/bug.md` si quieren reutilizarla):

```markdown
## Descripción del problema
La detección de conflictos de préstamo acepta reservas contenidas dentro
de otra y rechaza reservas contiguas.

## Pasos para reproducir
1. Crear un préstamo del equipo 1 de 10:00 a 14:00.
2. Crear otro préstamo del equipo 1 de 11:00 a 12:00.

## Comportamiento esperado
El segundo préstamo se rechaza con 409 CONFLICTO_RESERVA.

## Comportamiento actual
El segundo préstamo se crea con 201.

## Entorno
Rama main, etiqueta v0.1.0.
```

Etiqueta: `bug`. Anoten el número del issue (por ejemplo, `#14`).

```bash
git checkout main
git pull origin main
git checkout -b fix/14-traslape-prestamos
```

---

## 6. Paso 2 — Modelo con ReservaFIC: la prueba de integración que falla

`tests/Feature/Repositories/EloquentPrestamoRepositoryTest.php`:

```php
<?php

namespace Tests\Feature\Repositories;

use App\Models\Equipo;
use App\Models\Prestamo;
use App\Repositories\EloquentPrestamoRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class EloquentPrestamoRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * El préstamo existente siempre es de 10:00 a 12:00.
     */
    public static function casos(): array
    {
        return [
            'mismo horario' => ['10:00', '12:00', true],
            'empieza antes y termina dentro' => ['09:00', '11:00', true],
            'empieza dentro y termina después' => ['11:00', '13:00', true],
            'contenido dentro del existente' => ['10:30', '11:30', true],
            'contiene al existente' => ['09:00', '13:00', true],
            'termina justo cuando empieza el existente' => ['08:00', '10:00', false],
            'empieza justo cuando termina el existente' => ['12:00', '14:00', false],
            'totalmente separado' => ['15:00', '16:00', false],
        ];
    }

    #[DataProvider('casos')]
    public function test_detecta_traslape_de_horarios(string $inicio, string $fin, bool $esperado): void
    {
        $equipo = Equipo::factory()->create();
        Prestamo::factory()->for($equipo)->create([
            'fecha_inicio' => '2026-11-10 10:00:00',
            'fecha_fin' => '2026-11-10 12:00:00',
        ]);

        $resultado = (new EloquentPrestamoRepository())->existeConflicto([
            'equipo_id' => $equipo->id,
            'fecha_inicio' => "2026-11-10 {$inicio}:00",
            'fecha_fin' => "2026-11-10 {$fin}:00",
        ]);

        $this->assertSame($esperado, $resultado);
    }
}
```

Lean la lista de casos antes de ejecutar: cinco positivos (hay
conflicto), tres negativos (no hay conflicto), y tres de ellos son
**bordes** exactos.

```bash
php artisan test --filter=EloquentPrestamoRepositoryTest
```

#### Punto de control 1 — la prueba debe fallar

Resultado esperado con la consulta del Bloque II: **3 fallas y 5
aciertos**. Fallan:

```text
contenido dentro del existente           → esperaba true,  obtuvo false
termina justo cuando empieza el existente → esperaba false, obtuvo true
empieza justo cuando termina el existente → esperaba false, obtuvo true
```

Si todas pasan, su consulta ya era correcta o la prueba no está
probando lo que creen: revisen ambas cosas antes de seguir.

---

## 7. Paso 3 — Corregir el defecto

Dos intervalos `[A_inicio, A_fin)` y `[B_inicio, B_fin)` se traslapan
**si y solo si** cada uno empieza antes de que termine el otro:

```text
existente.fecha_inicio < nuevo.fecha_fin   Y   existente.fecha_fin > nuevo.fecha_inicio
```

Las desigualdades son **estrictas**: que una reserva termine a las 12:00
y la otra empiece a las 12:00 no es conflicto.

`app/Repositories/EloquentPrestamoRepository.php`:

```php
public function existeConflicto(array $datos): bool
{
    return Prestamo::where('equipo_id', $datos['equipo_id'])
        ->where('fecha_inicio', '<', $datos['fecha_fin'])
        ->where('fecha_fin', '>', $datos['fecha_inicio'])
        ->exists();
}
```

```bash
php artisan test --filter=EloquentPrestamoRepositoryTest
```

#### Punto de control 2

8 de 8 en verde. La corrección es más corta que el código original, y
ahora está **demostrada** para los ocho casos.

Observen que el Service no cambió: el defecto estaba en el acceso a
datos, y el Repository lo aisló en un solo lugar.

---

## 8. Paso 4 — Pruebas unitarias del Service

La regla del Service es: "si hay conflicto, lanza la excepción y no
crea nada; si no hay conflicto, crea". Esa decisión se puede probar
**sin base de datos**, sustituyendo el repositorio real por uno falso
que responde lo que la prueba necesite.

`tests/Unit/Services/PrestamoServiceTest.php`:

```php
<?php

namespace Tests\Unit\Services;

use App\Exceptions\ConflictoDeReservaException;
use App\Models\Prestamo;
use App\Repositories\PrestamoRepositoryInterface;
use App\Services\PrestamoService;
use PHPUnit\Framework\TestCase;

class PrestamoServiceTest extends TestCase
{
    private function repositorioFalso(bool $hayConflicto): PrestamoRepositoryInterface
    {
        return new class($hayConflicto) implements PrestamoRepositoryInterface
        {
            public array $creados = [];

            public function __construct(private bool $hayConflicto) {}

            public function existeConflicto(array $datos): bool
            {
                return $this->hayConflicto;
            }

            public function crear(array $datos): Prestamo
            {
                $this->creados[] = $datos;

                return new Prestamo();
            }
        };
    }

    public function test_crea_el_prestamo_cuando_no_hay_conflicto(): void
    {
        $repositorio = $this->repositorioFalso(hayConflicto: false);

        (new PrestamoService($repositorio))->crear(['equipo_id' => 1, 'user_id' => 7]);

        $this->assertCount(1, $repositorio->creados);
    }

    public function test_lanza_excepcion_y_no_crea_cuando_hay_conflicto(): void
    {
        $repositorio = $this->repositorioFalso(hayConflicto: true);

        try {
            (new PrestamoService($repositorio))->crear(['equipo_id' => 1, 'user_id' => 7]);
            $this->fail('Se esperaba ConflictoDeReservaException.');
        } catch (ConflictoDeReservaException $e) {
            $this->assertSame(1, $e->equipoId);
            $this->assertCount(0, $repositorio->creados);
        }
    }
}
```

```bash
php artisan test --testsuite=Unit
```

Comparen el tiempo de ejecución de esta suite con el de la prueba de
integración. Esa diferencia es la razón por la que conviene que la
lógica de negocio pueda probarse sin base de datos.

> **Importante.** Estas pruebas pasaban **también con el defecto**: el
> repositorio falso no ejecuta SQL. Las pruebas unitarias no sustituyen
> a las de integración; responden preguntas distintas.

**Pongan nombre al doble.** El repositorio falso es un doble de prueba
que cumple dos papeles: *stub* en `existeConflicto()` y *spy* en
`$creados` (tema [4. Pruebas automatizadas](/materias/taller-integrador/bloque-03/04-pruebas-automatizadas/), "Dobles de prueba").
Agreguen a la misma clase una tercera prueba que use un *mock* de
PHPUnit para verificar la interacción en lugar del estado:

```php
public function test_no_llama_a_crear_cuando_hay_conflicto(): void
{
    $repositorio = $this->createMock(PrestamoRepositoryInterface::class);
    $repositorio->method('existeConflicto')->willReturn(true);
    $repositorio->expects($this->never())->method('crear');

    $this->expectException(ConflictoDeReservaException::class);

    (new PrestamoService($repositorio))->crear(['equipo_id' => 1, 'user_id' => 7]);
}
```

Para comprobar que la prueba verifica algo, borren temporalmente el
`throw` del Service: las dos pruebas del caso con conflicto deben
fallar. Restauren el `throw` antes de continuar. En el merge request,
indiquen en una línea qué verifica cada prueba: estado o interacción.

---

## 9. Paso 5 — Pruebas de la API

Cada endpoint tiene al menos un caso exitoso y uno de error
(`STD-TEST-01`). `tests/Feature/Api/V1/PrestamoApiTest.php`:

```php
<?php

namespace Tests\Feature\Api\V1;

use App\Models\Equipo;
use App\Models\Prestamo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PrestamoApiTest extends TestCase
{
    use RefreshDatabase;

    private function datosValidos(Equipo $equipo): array
    {
        return [
            'equipo_id' => $equipo->id,
            'fecha_inicio' => '2026-11-10T10:00:00Z',
            'fecha_fin' => '2026-11-10T12:00:00Z',
        ];
    }

    public function test_crea_un_prestamo_y_responde_201(): void
    {
        $usuario = User::factory()->create();
        $equipo = Equipo::factory()->create();
        Sanctum::actingAs($usuario);

        $this->postJson('/api/v1/prestamos', $this->datosValidos($equipo))
            ->assertCreated()
            ->assertJsonPath('data.equipo.id', $equipo->id)
            ->assertJsonPath('data.fecha_inicio', '2026-11-10T10:00:00Z');

        $this->assertDatabaseHas('prestamos', [
            'equipo_id' => $equipo->id,
            'user_id' => $usuario->id,
        ]);
    }

    public function test_responde_422_cuando_falta_fecha_fin(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $datos = $this->datosValidos(Equipo::factory()->create());
        unset($datos['fecha_fin']);

        $this->postJson('/api/v1/prestamos', $datos)
            ->assertUnprocessable()
            ->assertJsonPath('error.code', 'VALIDATION_ERROR')
            ->assertJsonStructure(['error' => ['details' => ['fecha_fin']]]);
    }

    public function test_responde_409_cuando_el_prestamo_queda_contenido_en_otro(): void
    {
        $equipo = Equipo::factory()->create();
        Prestamo::factory()->for($equipo)->create([
            'fecha_inicio' => '2026-11-10 09:00:00',
            'fecha_fin' => '2026-11-10 13:00:00',
        ]);
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/prestamos', $this->datosValidos($equipo))
            ->assertConflict()
            ->assertJsonPath('error.code', 'CONFLICTO_RESERVA');
    }

    public function test_responde_401_sin_autenticacion(): void
    {
        $this->postJson('/api/v1/prestamos', $this->datosValidos(Equipo::factory()->create()))
            ->assertUnauthorized()
            ->assertJsonPath('error.code', 'NO_AUTENTICADO');
    }

    public function test_ignora_el_user_id_enviado_por_el_cliente(): void
    {
        $usuario = User::factory()->create();
        $otro = User::factory()->create();
        Sanctum::actingAs($usuario);

        $datos = [...$this->datosValidos(Equipo::factory()->create()), 'user_id' => $otro->id];

        $this->postJson('/api/v1/prestamos', $datos)->assertCreated();

        $this->assertDatabaseHas('prestamos', ['user_id' => $usuario->id]);
        $this->assertDatabaseMissing('prestamos', ['user_id' => $otro->id]);
    }

    public function test_lista_solo_los_prestamos_del_usuario_autenticado(): void
    {
        $usuario = User::factory()->create();
        Prestamo::factory()->count(2)->for($usuario, 'usuario')->create();
        Prestamo::factory()->count(3)->create();
        Sanctum::actingAs($usuario);

        $this->getJson('/api/v1/prestamos')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }
}
```

Notas sobre estas pruebas:

* `Sanctum::actingAs()` autentica sin pasar por el login; la
  documentación oficial de Sanctum lo indica para pruebas.
* La prueba de 409 usa el caso "contenido": **también** habría fallado
  antes de la corrección. El defecto ahora queda vigilado desde dos
  niveles.
* `for($usuario, 'usuario')` indica el nombre de la relación porque no
  coincide con el nombre de la clase (`User`).
* La prueba que ignora `user_id` verifica una propiedad de **seguridad**,
  no solo de funcionalidad.

```bash
php artisan test
```

#### Punto de control 3

Toda la suite en verde. Si alguna prueba depende de otra (pasa sola,
falla en grupo), revisen que cada una cree sus propios datos
(`STD-TEST-03`).

---

## 10. Paso 6 — ADR-002: por qué conservamos el Repository

El estándar de backend indica que una capa Repository sobre Eloquent no
se implementa **salvo que exista una necesidad real**, documentada con
ADR ([`02-ESTANDAR-BACKEND-LARAVEL.md`](/recursos/estandares/02-estandar-backend-laravel/) §6). En el Bloque II se aplicó el
patrón; hoy tienen evidencia concreta de para qué sirve. Creen
`docs/adr/ADR-002-repository-prestamos.md`:

```markdown
# ADR-002: Conservar un Repository para el acceso a préstamos

**Estado:** Aceptada
**Fecha:** AAAA-MM-DD
**Decisores:** <integrantes>

## Contexto
PrestamoService decide la regla de no doble reserva. Queremos probar esa
decisión de forma unitaria, sin base de datos, y aislar la consulta de
traslape (que ya tuvo un defecto, issue #14) en un solo lugar probado
por integración.

## Decisión
Mantener PrestamoRepositoryInterface con una implementación Eloquent,
registrada en AppServiceProvider. Solo para Prestamo; los demás modelos
usan Eloquent directamente.

## Alternativas consideradas
- Eloquent directo en el Service — más simple, pero obliga a usar base
  de datos para probar la regla de negocio.
- Repository para todos los modelos — agrega capas sin necesidad
  (contrario a STD-BE §6, YAGNI).

## Consecuencias
- Una interfaz y un binding adicionales que mantener.
- Pruebas unitarias del Service rápidas e independientes de la base.
- La consulta de traslape se prueba por integración contra PostgreSQL.
```

Si **su** proyecto aplicó otro patrón en el Bloque II, escriban el ADR
de ese patrón con la misma pregunta: ¿qué problema real de este
proyecto resuelve? Si no pueden responderla en una frase, el ADR debe
decir "Rechazada" y el patrón debe retirarse en un refactor posterior.

---

## 11. Paso 7 — Aplicarlo a su proyecto

1. Tomen la matriz de la Actividad A4. Cada fila se convierte en una
   prueba (o en un caso de un `DataProvider`).
2. Mínimos verificables ([`08-ESTANDAR-PRUEBAS.md`](/recursos/estandares/08-estandar-pruebas/) §3–4):
   * cada endpoint: un caso exitoso y al menos uno de error;
   * cada regla de negocio no trivial: prueba unitaria;
   * cada consulta con lógica (filtros, rangos, traslapes): prueba de
     integración con casos de borde.
3. Si alguna prueba revela un defecto, sigan el mismo ciclo: issue →
   prueba que falla → corrección → prueba en verde.

---

## 12. Paso 8 — Integrar y revisar con severidades

```bash
git add tests app/Repositories
git commit -m "test(prestamos): agregar casos de traslape que exponen el defecto"
git commit -m "fix(prestamos): corregir la condición de traslape de horarios"
git add tests docs/adr phpunit.xml
git commit -m "test(api): agregar pruebas de exito y error de prestamos"
git commit -m "docs(adr): justificar Repository de prestamos"
git push -u origin fix/14-traslape-prestamos
```

Hagan el commit de la prueba **antes** que el de la corrección: el
historial demuestra que la prueba fallaba.

En la descripción del merge request escriban `Closes #14`. GitLab
cerrará el issue automáticamente al integrar.

**Revisión de código (3.3.3).** Quien revisa clasifica cada hallazgo con
la severidad del estándar (`STD-CR-01`): **BLOCKER**, **MAJOR**,
**MINOR** o **NIT**. Para un MR de pruebas, revisen en particular:

```text
☐ ¿Cada prueba tiene una aserción que pueda fallar? (una prueba sin assert no verifica nada)
☐ ¿Los nombres describen el comportamiento, no la implementación?
☐ ¿Hay casos de borde, no solo el caso feliz?
☐ ¿Las pruebas son independientes entre sí?
☐ ¿La corrección es la mínima necesaria?
```

Ejemplo de comentario bien formado:

> **MAJOR — STD-TEST-01:** el endpoint `GET /api/v1/prestamos` solo
> tiene caso exitoso. Falta al menos un caso de error (por ejemplo, 401
> sin token).

---

## 13. Troubleshooting

| Síntoma | Diagnóstico | Solución |
| --- | --- | --- |
| `database "reservafic_testing" does not exist` | No se creó la base de pruebas | Laboratorio 1, Paso 1 |
| Las pruebas borran sus datos de desarrollo | `phpunit.xml` apunta a la base de desarrollo | Sección 3.1: `DB_DATABASE=reservafic_testing` |
| `A facade root has not been set` en `tests/Unit` | El código bajo prueba usa una fachada (`Log`, `DB`) y las pruebas unitarias no levantan Laravel | Muevan esa dependencia fuera de la pieza probada o conviertan la prueba en Feature |
| `Call to undefined method ...::factory()` | El modelo no usa `HasFactory` | Laboratorio 1, Paso 3 |
| `DataProvider` ignorado | Versión de PHPUnit anterior a la 10 (usa la anotación `@dataProvider`) | Verifiquen la versión con `vendor/bin/phpunit --version` |
| Una prueba pasa sola y falla en grupo | Dependencia entre pruebas | Cada prueba debe crear sus datos; usen `RefreshDatabase` |

---

## 14. Evidencia del laboratorio

```text
A. Issue del defecto con pasos de reproducción.
B. Salida de la prueba de integración FALLANDO (Punto de control 1) y luego en VERDE (Punto de control 2).
C. Historial: el commit de la prueba aparece antes que el de la corrección.
D. Salida de `php artisan test` con toda la suite en verde.
E. docs/adr/ADR-002-<patron>.md.
F. Merge request con "Closes #N" y al menos un comentario de revisión clasificado por severidad.
G. Pruebas del proyecto propio derivadas de la matriz de A4.
```

---

## 15. Reflexión del equipo

1. ¿Por qué la prueba unitaria del Service no podía encontrar el
   defecto, y la de integración sí?
2. ¿Cuántos de los ocho casos de traslape habrían escrito si no les
   hubieran dado la lista? ¿Cuáles habrían olvidado?
3. ¿Qué parte de su propio proyecto tiene "bordes" que todavía nadie
   probó?

---

## 16. Reto adicional (opcional)

Midan la cobertura (requiere la extensión PCOV o Xdebug):

```bash
php artisan test --coverage
```

Interpreten el número como una **señal**, no como una meta
([`08-ESTANDAR-PRUEBAS.md`](/recursos/estandares/08-estandar-pruebas/) §7). Busquen una línea "cubierta" por una
prueba que en realidad no verifica nada relevante sobre ella.

---

## 17. Criterio de finalización

```text
☐ phpunit.xml usa la base PostgreSQL de pruebas.
☐ El defecto está registrado como issue y cerrado por el merge request.
☐ La prueba de integración se vio fallar y luego pasar.
☐ El Service tiene pruebas unitarias sin base de datos.
☐ Cada endpoint tiene caso exitoso y al menos un caso de error.
☐ ADR-002 explica el patrón con un problema real (o lo rechaza).
☐ La matriz de A4 del proyecto propio está convertida en pruebas.
☐ Revisión con severidades registrada en el merge request.
```
