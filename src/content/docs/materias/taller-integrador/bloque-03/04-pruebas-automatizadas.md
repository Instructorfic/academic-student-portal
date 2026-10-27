---
title: "4. Pruebas automatizadas"
description: "Bloque III de Taller Integrador — pruebas unitarias y de integración, aserciones, dobles de prueba, F.I.R.S.T. y la corrección del defecto."
---

**Temas del programa:** 3.3

## Qué es una prueba automatizada

<div class="callout">

Código que ejecuta tu código con datos conocidos y compara el resultado con lo esperado

</div>

<div class="grid-3">

<div class="card accent-azul"><strong>Repetible</strong><p>Mismo resultado cada vez</p></div>
<div class="card accent-dorado"><strong>Rápida</strong><p>Segundos no minutos</p></div>
<div class="card accent-verde"><strong>Automática</strong><p>Nadie tiene que recordar ejecutarla</p></div>

</div>

## Unitaria o integración

| | Unitaria | Integración |
| --- | --- | --- |
| Verifica | Una pieza aislada | Piezas reales juntas |
| Base de datos | No | Sí la de pruebas |
| Velocidad | Milisegundos | Más lenta |
| En Laravel | tests/Unit | tests/Feature |

<div class="callout">

Una <strong>unidad</strong> es la pieza más pequeña con una responsabilidad propia · un método con una regla

</div>

## Toda prueba tiene tres partes

```text
Preparar   → los datos y las piezas que la prueba necesita
Actuar     → llamar una sola vez al código que se prueba
Verificar  → comparar el resultado con lo esperado
```

<div class="callout-alcance">

En inglés Arrange Act Assert · si no puedes nombrar las tres partes la prueba hace demasiado

</div>

## Ejemplo mínimo — la regla

```php
// Ejemplo de aprendizaje · no forma parte de ReservaFIC
class ReglaHorario
{
    public static function esValido(string $inicio, string $fin): bool
    {
        return strtotime($fin) > strtotime($inicio);
    }
}
```

<div class="callout">

Sin base de datos sin HTTP sin Laravel · la forma más simple de unidad

</div>

## Ejemplo mínimo — su prueba

```php
use PHPUnit\Framework\TestCase;

class ReglaHorarioTest extends TestCase
{
    public function test_acepta_un_fin_posterior_al_inicio(): void
    {
        $inicio = '2026-11-10 10:00';                 // Preparar
        $fin = '2026-11-10 12:00';

        $resultado = ReglaHorario::esValido($inicio, $fin);   // Actuar

        $this->assertTrue($resultado);                 // Verificar
    }
}
```

<p class="small">tests/Unit · extiende PHPUnit\Framework\TestCase · el método empieza con test_</p>

## Un positivo no basta

```php
public function test_rechaza_un_fin_anterior_al_inicio(): void
{
    $this->assertFalse(ReglaHorario::esValido('2026-11-10 12:00', '2026-11-10 10:00'));
}

public function test_rechaza_un_fin_igual_al_inicio(): void
{
    $this->assertFalse(ReglaHorario::esValido('2026-11-10 10:00', '2026-11-10 10:00'));
}
```

<div class="grid-3">

<div class="card accent-verde"><strong>Positivo</strong><p>Hace lo que debe</p></div>
<div class="card accent-rojo"><strong>Negativo</strong><p>Rechaza lo que debe</p></div>
<div class="card accent-dorado"><strong>Borde</strong><p>El valor justo en el límite</p></div>

</div>

## Ejecutar y leer el resultado

```bash
php artisan test --filter=ReglaHorarioTest
```

```text
PASS  Tests\Unit\ReglaHorarioTest
  acepta un fin posterior al inicio
  rechaza un fin anterior al inicio
  rechaza un fin igual al inicio

Tests:  3 passed
```

<p class="small">Salida simplificada · ante una falla PHPUnit muestra lo esperado lo obtenido y la línea</p>

## Las aserciones que más usarás

| Aserción | Verifica |
| --- | --- |
| `assertTrue` y `assertFalse` | Un resultado booleano |
| `assertSame($esperado, $real)` | Valor y tipo idénticos |
| `assertCount(1, $lista)` | Cuántos elementos hay |
| `expectException(Clase::class)` | Que se lance una excepción |
| `assertDatabaseHas('tabla', [...])` | Que una fila existe · solo integración |

<div class="callout-alcance">

Una prueba sin aserción siempre pasa y no demuestra nada

</div>

## Paso 2 — una unidad con dependencias

<div class="callout">

PrestamoService necesita un repositorio que sí usa la base de datos · ¿cómo se prueba aislado?

</div>

```text
Prueba ──► PrestamoService ──► PrestamoRepositoryInterface
                                   ├── EloquentPrestamoRepository   (producción)
                                   └── repositorio falso            (prueba)
```

<p class="small">Por esto el equipo conserva el Repository · ADR-002</p>

## El repositorio falso

```php
private function repositorioFalso(bool $hayConflicto): PrestamoRepositoryInterface
{
    return new class($hayConflicto) implements PrestamoRepositoryInterface {
        public array $creados = [];

        public function __construct(private bool $hayConflicto) {}

        public function existeConflicto(array $datos): bool
        {
            return $this->hayConflicto;          // responde lo que la prueba decide
        }

        public function crear(array $datos): Prestamo
        {
            $this->creados[] = $datos;           // recuerda qué le pidieron
            return new Prestamo();
        }
    };
}
```

## Probar el camino feliz

```php
public function test_crea_el_prestamo_cuando_no_hay_conflicto(): void
{
    $repositorio = $this->repositorioFalso(hayConflicto: false);

    (new PrestamoService($repositorio))->crear(['equipo_id' => 1, 'user_id' => 7]);

    $this->assertCount(1, $repositorio->creados);
}
```

<div class="callout">

No hay base de datos · la prueba corre en milisegundos

</div>

## Probar que debe fallar

```php
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
```

<p class="small">Verifica dos cosas — que se lanzó la excepción correcta y que no se guardó nada</p>

## Dobles de prueba

<div class="callout">

Objetos que ocupan el lugar de una dependencia real durante la prueba · lo viste en Pruebas de Software

</div>

| Doble | Qué hace |
| --- | --- |
| Dummy | Se pasa porque la firma lo exige · nadie lo usa |
| Stub | Devuelve respuestas preparadas |
| Spy | Registra cómo lo llamaron |
| Mock | Trae programadas las llamadas que deben ocurrir |
| Fake | Funciona pero simplificado · por ejemplo en memoria |

## ¿Qué doble es el repositorio falso?

<div class="grid-2">

<div class="card accent-azul"><strong>Stub</strong><p>existeConflicto() responde lo que la prueba decide</p></div>
<div class="card accent-dorado"><strong>Spy</strong><p>$creados recuerda qué le pidieron</p></div>

</div>

<div class="callout">

Los nombres describen papeles no clases · un mismo objeto puede cumplir dos

</div>

## Stub o mock — qué se verifica

<div class="grid-2">

<div class="card accent-verde"><strong>Stub · verificación de estado</strong><p>¿Qué resultado produjo? · excepción · valor devuelto · lo registrado</p></div>
<div class="card accent-azul"><strong>Mock · verificación de interacción</strong><p>¿Se llamó o no se llamó? · cuántas veces · con qué argumentos</p></div>

</div>

<div class="callout-alcance">

La diferencia importante no es el nombre sino lo que la prueba comprueba al final

</div>

## El mismo caso con un mock de PHPUnit

```php
public function test_no_guarda_nada_cuando_hay_conflicto(): void
{
    $repositorio = $this->createMock(PrestamoRepositoryInterface::class);
    $repositorio->method('existeConflicto')->willReturn(true);   // papel de stub
    $repositorio->expects($this->never())->method('crear');      // papel de mock

    $this->expectException(ConflictoDeReservaException::class);

    (new PrestamoService($repositorio))->crear(['equipo_id' => 1, 'user_id' => 7]);
}
```

<p class="small">createStub() solo responde · createMock() además declara expectativas con expects()</p>

## La expectativa es la aserción

```php
$repositorio->expects($this->once())
    ->method('crear')
    ->with($datos)
    ->willReturn(new Prestamo());

(new PrestamoService($repositorio))->crear($datos);
```

<div class="callout">

No hay assert · PHPUnit falla la prueba si crear() no se llamó una vez con esos datos

</div>

## Un fake puede esconder el defecto

<div class="grid-2">

<div class="card accent-rojo"><strong>Repositorio en memoria</strong><p>Reescribe en PHP la condición de traslape · prueba la copia</p></div>
<div class="card accent-verde"><strong>PostgreSQL de pruebas</strong><p>Ejecuta la consulta real · prueba el original</p></div>

</div>

<div class="callout-alcance">

Si la consulta SQL sigue mal el fake pasa igual · por eso la condición se prueba contra la base real

</div>

## Cuándo usar un doble y cuándo no

| Situación | Decisión |
| --- | --- |
| Correo o API de terceros | Doble · Mail::fake() Http::fake() |
| Aislar una regla de la base de datos | Stub del repositorio |
| Importa que algo no ocurra | Mock o spy |
| Integración con la base del proyecto | Base real · nunca un doble |
| La clase que se prueba | Nunca se sustituye |

<p class="small">08-ESTANDAR-PRUEBAS.md §6 · muchos mocks que verifican el orden interno atan la prueba a la implementación</p>

## Paso 3 — muchos casos una sola prueba

```php
public static function casos(): array
{
    return [
        'mismo horario'                             => ['10:00', '12:00', true],
        'contenido dentro del existente'            => ['10:30', '11:30', true],
        'termina justo cuando empieza el existente' => ['08:00', '10:00', false],
        'empieza justo cuando termina el existente' => ['12:00', '14:00', false],
    ];
}

#[DataProvider('casos')]
public function test_detecta_traslape_de_horarios(string $inicio, string $fin, bool $esperado): void
```

<div class="callout-alcance">

Cada fila es un caso con nombre · la tabla de la Actividad A1 se vuelve código

</div>

## Nombres que explican

<div class="grid-2">

<div class="card accent-rojo"><strong>Así no</strong><p>test1 · testPrestamo · testFunciona</p></div>
<div class="card accent-verde"><strong>Así sí</strong><p>test_responde_422_cuando_falta_fecha_fin</p></div>

</div>

<div class="callout">

Cuando una prueba falla su nombre debe decirte qué regla se rompió sin abrir el archivo

</div>

## Errores frecuentes al probar

| Error | Por qué es un problema |
| --- | --- |
| Prueba sin aserción | Siempre pasa |
| Una prueba depende de otra | Falla según el orden · STD-TEST-03 |
| Probar el framework | Verificar que Eloquent guarda no prueba tu regla |
| Solo el caso feliz | Los defectos viven en los bordes |
| Nunca verla fallar | Puede estar pasando por la razón equivocada |

## Buenas prácticas — F.I.R.S.T.

| | Significa | En el proyecto |
| --- | --- | --- |
| Fast | Milisegundos | Unitarias sin base de datos |
| Independent | No depende de otra | STD-TEST-03 |
| Repeatable | Mismo resultado siempre | Sin red ni fecha actual sin control |
| Self-validating | Pasa o falla sola | Aserciones · nunca dd() para mirar |
| Timely | Junto con el código | Sin pruebas la historia no está terminada |

<p class="small">Clean Code · Martin 2008 · retoma las buenas prácticas de Pruebas de Software</p>

## Seis prácticas concretas

<div class="grid-3">

<div class="card accent-azul"><strong>Un comportamiento por prueba</strong><p>Varias aserciones sí · dos reglas no</p></div>
<div class="card accent-azul"><strong>Sin lógica en la prueba</strong><p>Nada de if o for · usa data provider</p></div>
<div class="card accent-dorado"><strong>Esperados literales</strong><p>assertSame(120 ...) · no recalcules con la misma fórmula</p></div>
<div class="card accent-dorado"><strong>Controla el tiempo</strong><p>Fechas fijas · travelTo() si la regla usa now()</p></div>
<div class="card accent-verde"><strong>Por la puerta principal</strong><p>Métodos públicos · no privados</p></div>
<div class="card accent-verde"><strong>Preparación a la vista</strong><p>El dato que decide se lee en la prueba</p></div>

</div>

## La lección del defecto

<div class="grid-2">

<div class="card accent-rojo"><strong>Prueba unitaria del Service</strong><p>Usa un repositorio falso que no ejecuta SQL y pasa con el defecto</p></div>
<div class="card accent-verde"><strong>Prueba de integración</strong><p>Ejecuta la consulta real contra PostgreSQL y falla con el defecto</p></div>

</div>

<div class="banner-node">

No compiten — responden preguntas distintas

</div>

## Ocho casos tres fallan

| Nuevo frente a 10:00 a 12:00 | Esperado | Bloque II |
| --- | --- | --- |
| 10:30 a 11:30 contenido | Conflicto | Sin conflicto |
| 08:00 a 10:00 contiguo | Sin conflicto | Conflicto |
| 12:00 a 14:00 contiguo | Sin conflicto | Conflicto |

<div class="callout">

Los defectos viven en los <strong>bordes</strong>

</div>

## La corrección

```php
Prestamo::where('equipo_id', $datos['equipo_id'])
    ->where('fecha_inicio', '<', $datos['fecha_fin'])
    ->where('fecha_fin', '>', $datos['fecha_inicio'])
    ->exists();
```

<div class="callout">

Dos intervalos se traslapan si cada uno empieza antes de que termine el otro

</div>

El Service no cambió — el Repository aisló el defecto en un solo lugar

## Ver la prueba fallar primero

<div class="grid-3">

<div class="card accent-rojo"><strong>1 Issue</strong><p>Pasos para reproducir</p></div>
<div class="card accent-dorado"><strong>2 Prueba en rojo</strong><p>Commit antes de corregir</p></div>
<div class="card accent-verde"><strong>3 Corrección</strong><p>La misma prueba en verde</p></div>

</div>

<div class="callout-alcance">

Una prueba que nunca viste fallar puede estar pasando por la razón equivocada

</div>

<p class="small">Actividad A4 — matriz de casos positivos negativos y de borde</p>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 3 — Pruebas unitarias y de integración](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-3-pruebas/).

</div>

## Qué sigue

Continúa con [5. Datos de prueba](/materias/taller-integrador/bloque-03/05-datos-de-prueba/).
