---
title: "1. Manejo de datos"
description: "Bloque III de Taller Integrador — modelado, relacional frente a documental, restricciones, migraciones, el problema N+1 y validación."
---

**Temas del programa:** 3.2

## Modelar antes de guardar

<div class="grid-3">

<div class="card accent-azul"><strong>Entidad</strong><p>Algo con identidad propia que el sistema recuerda</p></div>
<div class="card accent-dorado"><strong>Relación</strong><p>Cómo se conectan las entidades y en qué cantidad</p></div>
<div class="card accent-verde"><strong>Documento</strong><p>Una unidad de información con sus datos anidados</p></div>

</div>

```text
users 1 ─── N prestamos N ─── 1 equipos
```

## Relacional o documental

| | Relacional | Documental |
| --- | --- | --- |
| Estructura | Fija por esquema | Flexible por documento |
| Integridad | La garantiza el motor | La garantiza tu código |
| Cruzar entidades | Natural con JOIN | Costoso o con datos duplicados |
| Buen uso | Datos con relaciones fuertes | Estructura variable leída como unidad |

<div class="callout-alcance">

Estándar del proyecto — PostgreSQL por defecto y MongoDB solo con ADR que lo justifique

</div>

## El mismo préstamo como documento

```json
{
  "_id": "42",
  "usuario": { "id": 7, "nombre": "Ana" },
  "equipo": { "id": 3, "nombre": "Proyector 101" },
  "fechaInicio": "2026-11-10T10:00:00Z"
}
```

<div class="callout">

Si Ana cambia su nombre hay que actualizar <strong>cada</strong> documento donde aparece

</div>

<p class="small">Actividad A3 — decidan tabla o documento para tres datos de su proyecto</p>

## La base de datos también se defiende

```php
$table->foreignId('user_id')->constrained();

DB::statement('ALTER TABLE prestamos
  ADD CONSTRAINT chk_prestamos_fechas CHECK (fecha_fin > fecha_inicio)');
```

<div class="grid-2">

<div class="card accent-rojo"><strong>Sin restricción</strong><p>Un seeder o una consola pueden guardar basura</p></div>
<div class="card accent-verde"><strong>Con restricción</strong><p>PostgreSQL rechaza el dato sin importar de dónde venga</p></div>

</div>

<p class="small">STD-DB-P02 y STD-DB-P03</p>

## Migraciones que van y vuelven

```bash
php artisan migrate
php artisan migrate:rollback
php artisan migrate
```

<div class="grid-2">

<div class="card accent-azul"><strong>Reversible</strong><p>Todo down deshace exactamente su up</p></div>
<div class="card accent-rojo"><strong>Intocable</strong><p>Una migración ya integrada no se edita se crea otra</p></div>

</div>

<p class="small">STD-DB-M01 y STD-DB-M03</p>

## El problema N+1

```php
foreach (Prestamo::all() as $prestamo) {
    echo $prestamo->equipo->nombre;   // una consulta por préstamo
}

Prestamo::with('equipo')->get();      // dos consultas en total
```

<div class="banner-node">

500 préstamos son 501 consultas o solo 2

</div>

## Lo que la validación no resuelve sola

<div class="callout">

Dos personas envían la misma reserva en el mismo instante y ambas consultas ven sin conflicto antes de que alguna guarde

</div>

Se llama **condición de carrera**

<div class="callout-alcance">

En el Bloque IV profundizarás en el comportamiento bajo carga por ahora regístralo como riesgo

</div>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 1 — Persistencia en PostgreSQL](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-1-persistencia-postgresql/).

</div>

## Qué sigue

Continúa con [2. Desarrollo de componentes](/materias/taller-integrador/bloque-03/02-desarrollo-de-componentes/).
