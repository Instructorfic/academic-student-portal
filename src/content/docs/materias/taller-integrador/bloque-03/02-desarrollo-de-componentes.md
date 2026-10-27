---
title: "2. Desarrollo de componentes"
description: "Bloque III de Taller Integrador — capas y componentes, APIs y REST, métodos HTTP, códigos de respuesta y datos en tránsito."
---

**Temas del programa:** 3.1

## Capas módulos y componentes

```text
                 Préstamos             Equipos
Presentación     Controller web + API   Controller API
                 Form Request           Form Request
                 Resource               Resource
Negocio          PrestamoService        (Eloquent basta)
Datos            Repository + Model     Model
                        └──── PostgreSQL ────┘
```

<div class="callout">

No todo módulo necesita todas las capas

</div>

## Qué es una API

<div class="callout">

Un <strong>contrato</strong> que permite a otro programa usar tu sistema sin conocer su código

</div>

<div class="grid-3">

<div class="card accent-azul"><strong>Dónde</strong><p>La URL del recurso</p></div>
<div class="card accent-dorado"><strong>Cómo</strong><p>El método HTTP y los datos</p></div>
<div class="card accent-verde"><strong>Qué recibes</strong><p>El código de estado y el JSON</p></div>

</div>

<p class="small">Actividad A2 — el contrato de la API de tu proyecto antes de programarla</p>

## REST en cinco ideas

- Todo es un **recurso** con nombre en plural
- Cada recurso tiene su propia URL
- El **método** dice la acción no la URL
- Cada petición trae todo lo necesario incluido el token
- El **código de estado** dice el resultado

| Correcto | Incorrecto |
| --- | --- |
| `POST /api/v1/prestamos` | `POST /api/crearPrestamo` |

## Métodos HTTP

| Método | Uso | Seguro | Idempotente |
| --- | --- | --- | --- |
| GET | Leer | Sí | Sí |
| POST | Crear | No | No |
| PUT | Reemplazar | No | Sí |
| PATCH | Modificar parte | No | No |
| DELETE | Eliminar | No | Sí |

<p class="small">RFC 9110 HTTP Semantics secciones 9.2.1 y 9.2.2</p>

## Códigos que vas a usar

<div class="grid-2">

<div class="card accent-verde"><strong>2xx éxito</strong><p>200 leer · 201 creado · 204 sin cuerpo</p></div>
<div class="card accent-rojo"><strong>4xx el cliente</strong><p>401 · 403 · 404 · 409 · 422 · 429</p></div>

</div>

<div class="banner-node">

<strong>Nunca 200 con un error adentro</strong> — STD-API-01 prioridad P0

</div>

## 422 o 409

<div class="grid-2">

<div class="card accent-dorado"><strong>422</strong><p>Los datos están mal formados como una fecha de fin antes del inicio</p></div>
<div class="card accent-azul"><strong>409</strong><p>Los datos son válidos pero chocan con el estado del sistema como un equipo ya reservado</p></div>

</div>

<div class="grid-2">

<div class="card accent-rojo"><strong>401</strong><p>No sé quién eres</p></div>
<div class="card accent-rojo"><strong>403</strong><p>Sé quién eres y no puedes hacer esto</p></div>

</div>

## 3.2.3 Datos en tránsito

```text
JSON ── petición ──►  deserializar → validar → Service → PostgreSQL
JSON ◄─ respuesta ──  serializar (API Resource) ◄──────────┘
```

<div class="grid-3">

<div class="card accent-azul"><strong>snake_case</strong><p>fecha_inicio</p></div>
<div class="card accent-dorado"><strong>ISO 8601 UTC</strong><p>2026-11-10T10:00:00Z</p></div>
<div class="card accent-rojo"><strong>Sin sensibles</strong><p>Nunca password</p></div>

</div>

<p class="small">JSON no tiene tipo fecha · RFC 8259</p>

## El controlador integra no decide

```php
public function store(GuardarPrestamoRequest $request, PrestamoService $service)
{
    $prestamo = $service->crear([
        ...$request->validated(),
        'user_id' => $request->user()->id,
    ]);

    return PrestamoResource::make($prestamo->load('equipo'))
        ->response()->setStatusCode(201);
}
```

<div class="callout">

Form Request y Service son los del Bloque II sin cambios · user_id sale del token nunca del cuerpo

</div>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 2 — API REST del proyecto](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-2-api-rest/).

</div>

## Qué sigue

Continúa con [3. Manejo de errores](/materias/taller-integrador/bloque-03/03-manejo-de-errores/).
