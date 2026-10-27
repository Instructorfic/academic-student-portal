---
title: "3. Manejo de errores"
description: "Bloque III de Taller Integrador — errores esperados e inesperados, excepciones de dominio, formato de error de la API, transacciones y registro."
---

**Temas del programa:** 3.1.3

**Errores y situaciones no esperadas**

## No todo error es igual

| Situación | Ejemplo | Quién la detecta | Respuesta |
| --- | --- | --- | --- |
| Datos inválidos | Falta fecha_fin | Form Request | 422 |
| Regla de negocio | Equipo ya reservado | Service | 409 |
| Sin identidad | Token vencido | auth:sanctum | 401 |
| Sin permiso | Préstamo ajeno | Policy | 403 |
| No existe | Préstamo 999 | Laravel | 404 |
| **No esperada** | PostgreSQL no responde | Nadie la planeó | 500 genérico |

<div class="callout">

Las cinco primeras son <strong>esperadas</strong> se diseñan · la última se <strong>controla</strong>

</div>

## Esperadas e inesperadas

<div class="grid-2">

<div class="card accent-azul"><strong>Esperada</strong><p>Parte del dominio · tiene nombre propio · el usuario puede corregirla · se registra como info</p></div>
<div class="card accent-rojo"><strong>Inesperada</strong><p>Falla técnica · el usuario no puede hacer nada · se registra como error con todo el detalle</p></div>

</div>

<div class="banner-node">

La pregunta guía — ¿el usuario puede hacer algo distinto para que funcione?

</div>

## Paso 1 — dale nombre al problema

```php
class ConflictoDeReservaException extends RuntimeException
{
    public function __construct(public readonly ?int $equipoId = null)
    {
        parent::__construct('El equipo ya está reservado en ese horario.');
    }
}
```

<div class="callout">

Una excepción de dominio dice <strong>qué</strong> pasó y lleva los datos para diagnosticarlo

</div>

## Paso 2 — lanzar donde se detecta

```php
// PrestamoService
public function crear(array $datos): Prestamo
{
    if ($this->repositorio->existeConflicto($datos)) {
        throw new ConflictoDeReservaException((int) $datos['equipo_id']);
    }

    return $this->repositorio->crear($datos);
}
```

<div class="callout-alcance">

El Service no sabe si lo llamó la web o la API · no devuelve JSON ni códigos HTTP

</div>

## Paso 3 — traducir en un solo lugar

```php
// bootstrap/app.php
$exceptions->render(function (ConflictoDeReservaException $e, Request $request) use ($error) {
    if ($request->is('api/*')) {
        Log::info('Reserva rechazada por conflicto de horario', [
            'equipo_id' => $e->equipoId,
            'user_id' => $request->user()?->id,
        ]);

        return $error('CONFLICTO_RESERVA', $e->getMessage(), [], 409);
    }
});
```

<p class="small">STD-BE-E02 · un render por excepción conocida · lo demás lo maneja Laravel</p>

## Un formato de error para toda la API

```json
{
  "error": {
    "code": "CONFLICTO_RESERVA",
    "message": "El equipo ya está reservado en ese horario.",
    "details": {}
  }
}
```

<div class="grid-3">

<div class="card accent-azul"><strong>code</strong><p>Lo compara un programa</p></div>
<div class="card accent-dorado"><strong>message</strong><p>Lo lee una persona</p></div>
<div class="card accent-verde"><strong>details</strong><p>Qué campo falló</p></div>

</div>

## Paso 4 — atrapar solo si puedes hacer algo

<div class="grid-3">

<div class="card accent-verde"><strong>Deshacer</strong><p>Revertir lo que quedó a medias</p></div>
<div class="card accent-azul"><strong>Traducir</strong><p>Convertir un error técnico en uno de dominio</p></div>
<div class="card accent-dorado"><strong>Reintentar</strong><p>Un servicio externo que falló una vez</p></div>

</div>

```php
catch (\Exception $e) { }   // BLOCKER — STD-BE-E03 el error desaparece
```

<div class="callout-alcance">

Si no puedes hacer ninguna de las tres no lo atrapes deja que suba

</div>

## Deshacer — todo o nada

```php
DB::transaction(function () use ($datos) {
    $prestamo = Prestamo::create($datos);
    $prestamo->equipo->update(['disponible' => false]);
});
```

<div class="grid-2">

<div class="card accent-rojo"><strong>Sin transacción</strong><p>Si falla la segunda línea queda un préstamo con el equipo marcado disponible</p></div>
<div class="card accent-verde"><strong>Con transacción</strong><p>Si algo lanza una excepción PostgreSQL deshace las dos escrituras</p></div>

</div>

<p class="small">Ejemplo ilustrativo · ReservaFIC no actualiza disponible al prestar</p>

## Traducir — error técnico a error de dominio

```php
try {
    $prestamo = $this->repositorio->crear($datos);
} catch (UniqueConstraintViolationException $e) {
    throw new ConflictoDeReservaException((int) $datos['equipo_id']);
}
```

<div class="callout">

Si el motor rechaza un duplicado el usuario recibe el mismo 409 de siempre y no un 500

</div>

<p class="small">Ejemplo ilustrativo · solo aplica si existe una restricción única que lo provoque</p>

## Lo que ve cada quien

<div class="grid-2">

<div class="card accent-azul"><strong>El cliente</strong><p>Código de estado · code · un mensaje genérico en el 500</p></div>
<div class="card accent-dorado"><strong>El log</strong><p>Clase de la excepción · archivo · línea · IDs del caso</p></div>

</div>

```text
[2026-11-10 10:03:12] local.ERROR: SQLSTATE[08006] connection to server failed
  {"userId":7,"exception":"[object] (Illuminate\\Database\\QueryException ...)"}
```

<p class="small">Registro ilustrativo</p>

<div class="banner-node">

El detalle técnico vive en storage/logs/laravel.log nunca en la respuesta

</div>

## Registrar con contexto y sin secretos

```php
Log::info('Reserva rechazada por conflicto de horario', [
    'equipo_id' => $e->equipoId,
    'user_id' => $request->user()?->id,
]);
```

<div class="grid-2">

<div class="card accent-verde"><strong>Sí</strong><p>Identificadores que permiten reconstruir el caso</p></div>
<div class="card accent-rojo"><strong>Nunca</strong><p>Contraseñas tokens o el cuerpo completo de la petición</p></div>

</div>

| Nivel | Cuándo |
| --- | --- |
| info | Evento normal del negocio |
| warning | Algo raro que no impidió la operación |
| error | La operación falló |

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 2 — API REST del proyecto](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-2-api-rest/).

</div>

## Qué sigue

Continúa con [4. Pruebas automatizadas](/materias/taller-integrador/bloque-03/04-pruebas-automatizadas/).
