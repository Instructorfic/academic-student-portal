---
title: "5. Datos de prueba"
description: "Bloque III de Taller Integrador — base de pruebas, factories, seeders, datos que no lastiman y revisión con severidades."
---

**Temas del programa:** 3.3

**De dónde salen y dónde viven**

## Tres fuentes de datos distintas

| | Desarrollo | Pruebas | Producción |
| --- | --- | --- | --- |
| Base | reservafic | reservafic_testing | La del servidor |
| Quién la llena | Seeder | Cada prueba con factories | Los usuarios |
| Se borra | Cuando quieras | Antes de **cada** prueba | Nunca |
| Datos reales | No | No | Sí |

<div class="banner-node">

Las pruebas nunca apuntan a la base de desarrollo y nunca a la de producción

</div>

## La base de pruebas se configura aparte

```xml

<env name="APP_ENV" value="testing"/>
<env name="DB_CONNECTION" value="pgsql"/>
<env name="DB_DATABASE" value="reservafic_testing"/>
```

<div class="grid-2">

<div class="card accent-azul"><strong>Mismo motor</strong><p>PostgreSQL como en producción · STD-TEST §6</p></div>
<div class="card accent-dorado"><strong>Otra base</strong><p>RefreshDatabase la vacía · si apunta a desarrollo pierdes tus datos</p></div>

</div>

## Factories — datos coherentes en una línea

```php
// database/factories/EquipoFactory.php
public function definition(): array
{
    return [
        'nombre' => fake()->randomElement(['Laptop', 'Proyector', 'Cámara']).' '.fake()->numerify('###'),
        'descripcion' => fake()->sentence(),
        'disponible' => true,
    ];
}
```

```php
$equipo = Equipo::factory()->create();            // uno con valores al azar válidos
$equipos = Equipo::factory()->count(5)->create(); // cinco
```

## Fijar solo lo que importa

```php
$equipo = Equipo::factory()->create();

Prestamo::factory()->for($equipo)->create([
    'fecha_inicio' => '2026-11-10 10:00:00',   // lo que la prueba necesita controlar
    'fecha_fin' => '2026-11-10 12:00:00',
]);
```

<div class="callout">

La factory llena el resto · quien lee la prueba ve de inmediato qué datos son relevantes

</div>

<p class="small">STD-TEST §5 · factories y no datos repetidos escritos a mano en cada prueba</p>

## Cada prueba empieza en limpio

```php
class PrestamoApiTest extends TestCase
{
    use RefreshDatabase;   // migra una vez y revierte lo de cada prueba
```

<div class="grid-2">

<div class="card accent-rojo"><strong>Sin RefreshDatabase</strong><p>Una prueba ve los préstamos que dejó otra y pasa o falla según el orden</p></div>
<div class="card accent-verde"><strong>Con RefreshDatabase</strong><p>Cada prueba crea lo que necesita y nada más</p></div>

</div>

<p class="small">STD-TEST-03 y STD-TEST-04</p>

## Seeder o factory

<div class="grid-2">

<div class="card accent-azul"><strong>Seeder</strong><p>Datos de demostración para trabajar en desarrollo · admin@reservafic.test</p></div>
<div class="card accent-dorado"><strong>Factory en la prueba</strong><p>Los datos exactos que esa prueba necesita</p></div>

</div>

<div class="callout-alcance">

No uses el seeder de demo como datos de prueba · si alguien cambia la demo se rompen pruebas que no tienen relación

</div>

## Datos de prueba que no lastiman

- Nunca copies datos de personas reales a la base de pruebas
- Usa fake() para nombres y correos y dominios .test
- La contraseña de la UserFactory es conocida · solo para desarrollo y pruebas
- Los datos de prueba tampoco van al repositorio si salen de una base real

<div class="banner-node">

Un respaldo de producción en tu laptop ya es una filtración esperando ocurrir

</div>

## Revisar con severidades

| Severidad | Bloquea |
| --- | --- |
| BLOCKER — viola una regla P0 | Sí |
| MAJOR — viola una regla P1 | Sí hasta corregir |
| MINOR — mejora razonable | No |
| NIT — preferencia | No |

> **BLOCKER — STD-API-05** el endpoint no está dentro de auth:sanctum y cualquiera puede leer préstamos

<p class="small">Actividad A5 — un merge request lleno de defectos</p>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 3 — Pruebas unitarias y de integración](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-3-pruebas/).

</div>

## Qué sigue

Continúa con [6. Desarrollo seguro](/materias/taller-integrador/bloque-03/06-desarrollo-seguro/).
