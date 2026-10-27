---
title: "Presentación — Bloque III"
description: "Bloque III de Taller Integrador — objetivos, decisiones del curso, el defecto que nadie vio y el camino del bloque."
---

## Al terminar este bloque vas a poder

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">RA3.1</span>
<strong>Implementar lo prioritario</strong>
<p>Las historias más valiosas de tu backlog</p>
</div>

<div class="card accent-dorado">
<span class="badge">RA3.2</span>
<strong>Integrar componentes</strong>
<p>Una API que reutiliza tu lógica sin copiarla</p>
</div>

<div class="card accent-verde">
<span class="badge">RA3.3</span>
<strong>APIs y persistencia</strong>
<p>REST versionada sobre PostgreSQL</p>
</div>

</div>

<div class="grid-2">

<div class="card accent-rojo">
<span class="badge">RA3.4</span>
<strong>Calidad y seguridad</strong>
<p>Pruebas revisión permisos y secretos</p>
</div>

<div class="card accent-azul">
<span class="badge">RA3.5</span>
<strong>Iteraciones Scrum</strong>
<p>Dos o tres sprints con incremento real</p>
</div>

</div>

## Dos decisiones del curso

<div class="grid-2">

<div class="card accent-dorado"><strong>GitLab</strong><p>Lo que en el Bloque II llamaste pull request aquí se llama merge request</p></div>
<div class="card accent-verde"><strong>PostgreSQL</strong><p>Tu proyecto deja SQLite y trabaja con el motor del estándar</p></div>

</div>

<div class="callout-alcance">

Mismo mecanismo con otro nombre el programa oficial dice pull request y GitLab dice merge request

</div>

## Un defecto que nadie vio

### El código del Bloque II

```php
Prestamo::where('equipo_id', $datos['equipo_id'])
    ->where(function ($q) use ($datos) {
        $q->whereBetween('fecha_inicio', [$datos['fecha_inicio'], $datos['fecha_fin']])
          ->orWhereBetween('fecha_fin', [$datos['fecha_inicio'], $datos['fecha_fin']]);
    })->exists();
```

<div class="callout">

Pregunta si el inicio o el fin de un préstamo existente cae dentro del horario nuevo

</div>

Suena razonable y funcionó en la demostración

### Pruébalo con un proyector

| Existente | Nuevo | El sistema | Debería |
| --- | --- | --- | --- |
| 10:00 a 14:00 | 11:00 a 12:00 | Lo acepta | Rechazarlo |
| 10:00 a 12:00 | 12:00 a 14:00 | Lo rechaza | Aceptarlo |

<div class="banner-node">

Pasó la revisión de código la Sprint Review y la Definition of Done

</div>

### La pregunta del bloque

<div class="callout">

¿Cómo puede tu equipo tener <strong>evidencia</strong> y no solo confianza de que el sistema hace lo correcto para el usuario correcto cada vez que alguien integra un cambio?

</div>

<p class="small">Actividad A1 — dibujen todas las posiciones posibles entre dos reservas</p>

### El camino del bloque

<div class="grid-3">

<div class="card accent-verde"><strong>Datos</strong><p>Modelar y persistir en PostgreSQL</p></div>
<div class="card accent-azul"><strong>Componentes y API</strong><p>REST con errores bien manejados</p></div>
<div class="card accent-dorado"><strong>Calidad</strong><p>Pruebas que encuentran el defecto</p></div>

</div>

<div class="grid-2">

<div class="card accent-rojo"><strong>Seguridad</strong><p>Permisos secretos y configuración</p></div>
<div class="card accent-azul"><strong>Integración continua</strong><p>Una máquina que impide que el defecto regrese</p></div>

</div>

## Temas del bloque

1. [Manejo de datos](/materias/taller-integrador/bloque-03/01-manejo-de-datos/)
2. [Desarrollo de componentes](/materias/taller-integrador/bloque-03/02-desarrollo-de-componentes/)
3. [Manejo de errores](/materias/taller-integrador/bloque-03/03-manejo-de-errores/)
4. [Pruebas automatizadas](/materias/taller-integrador/bloque-03/04-pruebas-automatizadas/)
5. [Datos de prueba](/materias/taller-integrador/bloque-03/05-datos-de-prueba/)
6. [Desarrollo seguro](/materias/taller-integrador/bloque-03/06-desarrollo-seguro/)
7. [Gestión de secretos](/materias/taller-integrador/bloque-03/07-gestion-de-secretos/)
8. [Integración continua](/materias/taller-integrador/bloque-03/08-integracion-continua/)
9. [Cierre y resumen](/materias/taller-integrador/bloque-03/09-cierre-y-resumen/)
