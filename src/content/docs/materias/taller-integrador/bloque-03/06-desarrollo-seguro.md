---
title: "6. Desarrollo seguro"
description: "Bloque III de Taller Integrador — principios, validación de entradas, mínimo privilegio, defensa en profundidad, autenticación y autorización."
---

**Temas del programa:** 3.4

## Principios antes que herramientas

<div class="grid-3">

<div class="card accent-azul"><strong>Validar entradas</strong><p>Nada de fuera se usa sin validar</p></div>
<div class="card accent-dorado"><strong>Gestionar errores</strong><p>Detalle en el servidor y lo mínimo al cliente</p></div>
<div class="card accent-verde"><strong>Mínimo privilegio</strong><p>Solo los permisos necesarios</p></div>

</div>

<div class="callout">

Y una idea que los une — <strong>defensa en profundidad</strong> varias barreras independientes para que una falla no sea suficiente

</div>

## Validar entradas — en la práctica

```php
// Mal: confía en todo lo que manda el cliente
Prestamo::create($request->all());

// Bien: solo lo validado y la identidad desde el token
$service->crear([
    ...$request->validated(),
    'user_id' => $request->user()->id,
]);
```

<div class="callout-alcance">

Con la primera línea basta enviar "user_id": 1 para reservar a nombre de otra persona

</div>

<p class="small">STD-SEC-12 y STD-SEC-11</p>

## Gestionar errores — fallar de forma segura

<div class="grid-2">

<div class="card accent-rojo"><strong>Revela</strong><p>El correo no existe · La contraseña es incorrecta</p></div>
<div class="card accent-verde"><strong>No revela</strong><p>CREDENCIALES_INVALIDAS para ambos casos</p></div>

</div>

<div class="grid-2">

<div class="card accent-rojo"><strong>Falla abierta</strong><p>Si no pude verificar el permiso dejo pasar</p></div>
<div class="card accent-verde"><strong>Falla cerrada</strong><p>Si no pude verificar el permiso respondo 403</p></div>

</div>

## Mínimo privilegio — en la práctica

| Quién | Demasiado | Suficiente |
| --- | --- | --- |
| La app en PostgreSQL | Usuario postgres superusuario | Usuario reservafic dueño solo de sus bases |
| Un estudiante | Puede registrar equipos | Solo crea y ve sus préstamos |
| El pipeline | Variables visibles en cualquier rama | Variables protegidas y enmascaradas |

<div class="banner-node">

Si una credencial se filtra el daño se limita a lo que esa credencial podía hacer

</div>

## Defensa en profundidad en ReservaFIC

```text
Petición
  │  auth:sanctum         ¿quién eres?                 → 401
  │  Form Request         ¿los datos tienen sentido?   → 422
  │  Policy               ¿puedes hacer esto?          → 403
  │  Service              ¿respeta la regla?           → 409
  ▼  PostgreSQL           FK · NOT NULL · CHECK        → rechaza
```

<div class="callout">

Si alguien se salta la API con tinker o un seeder la base de datos sigue defendiéndose

</div>

## Quién eres y qué puedes hacer

<div class="grid-2">

<div class="card accent-azul"><strong>Autenticación</strong><p>Token de Sanctum que expira · falla con 401</p></div>
<div class="card accent-dorado"><strong>Autorización</strong><p>Policy por rol y por dueño · falla con 403</p></div>

</div>

```text
¿Ana puede cancelar el préstamo 42?
  ¿es administradora?        → sí puede
  ¿el préstamo es de Ana?    → sí puede
  en otro caso               → 403
```

## Una Policy

```php
public function view(User $usuario, Prestamo $prestamo): bool
{
    return $usuario->esAdministrador()
        || $usuario->id === (int) $prestamo->user_id;
}
```

```php
Gate::authorize('view', $prestamo);
```

<div class="callout-alcance">

Si llegó autenticado puede hacer todo es el error más frecuente

</div>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 4 — Desarrollo seguro](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-4-desarrollo-seguro/).

</div>

## Qué sigue

Continúa con [7. Gestión de secretos](/materias/taller-integrador/bloque-03/07-gestion-de-secretos/).
