---
title: "Laboratorio 2 — Primer CRUD con Laravel desde cero"
description: "Bloque I de Taller Integrador — construir un CRUD completo: ruta, controlador, modelo, base de datos y vista."
---

**Modalidad:** Laboratorio guiado. **Duración estimada:** 100–150
minutos. **Nivel:** Principiante absoluto. **Tecnología:** Laravel.
**Prerrequisito:** [Laboratorio 1 — Primer contacto con Laravel](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero/).

## 1. Propósito

En esta práctica construirás tu primer **CRUD** utilizando Laravel. No
supone conocimientos previos de MVC, modelos, controladores,
migraciones, bases de datos, Eloquent, formularios, rutas dinámicas ni
operaciones CRUD. El objetivo es comprender el recorrido completo:

```text
Navegador → Ruta → Controlador → Modelo → Base de datos
   → Modelo → Vista → Navegador
```

## 2. ¿Qué vamos a construir?

Una pequeña aplicación para administrar equipos, que permitirá: crear
equipo, consultar equipos, ver un equipo, editar equipo, eliminar
equipo. Estas cinco operaciones forman la base de un CRUD.

## 3. ¿Qué significa CRUD?

| Letra | Operación | Significado |
| --- | --- | --- |
| C | Create | Crear |
| R | Read | Consultar |
| U | Update | Actualizar |
| D | Delete | Eliminar |

## 4. El problema que resolveremos

Supongamos que un laboratorio necesita administrar sus equipos, y
actualmente alguien lleva el registro manualmente. Queremos una
aplicación que permita registrar, consultar, modificar y eliminar
equipos. Trabajaremos inicialmente con: `Equipo` — `id`, `nombre`,
`descripcion`, `disponible`.

## 5. Antes de comenzar

```text
□ El proyecto del Laboratorio 1
□ Laravel funcionando
□ VS Code
□ Terminal
```

Entra a la carpeta del proyecto (por ejemplo, `cd taller-integrador`) y
comprueba que puedes encontrar `artisan`, `composer.json` y
`package.json`.

## 6. Paso 1 — Comprobar la aplicación

```bash
php artisan serve
```

Abre `http://127.0.0.1:8000` y comprueba que la aplicación funciona. No
continúes hasta comprobarlo.

## 7. Paso 2 — ¿Dónde guardaremos la información?

Hasta ahora nuestra aplicación solamente devolvía texto. Ahora
necesitamos guardar datos en una **base de datos**, que permite
almacenar información de manera organizada.

## 8. SQLite

Para este primer CRUD utilizaremos SQLite: una base de datos ligera que
permite trabajar con un archivo, lo que nos deja concentrarnos en
Laravel sin configurar todavía un servidor de base de datos. Más
adelante en el taller se utilizarán otros motores y configuraciones.

## 9. Paso 3 — Configurar SQLite

Busca el archivo `.env` y localiza la configuración de base de datos.
En una configuración basada en SQLite debe utilizarse:

```text
DB_CONNECTION=sqlite
```

> **Importante.** No borres otras variables de `.env`.

## 10. Paso 4 — Crear la base de datos SQLite

En la carpeta `database/`, crea un archivo `database.sqlite`. La
estructura quedará aproximadamente así:

```text
database/
├── database.sqlite
├── factories/
├── migrations/
└── seeders/
```

## 11. ¿Qué es una tabla?

Una tabla organiza información relacionada: cada fila es un registro,
cada columna es un dato. Por ejemplo:

```text
EQUIPOS
id | nombre    | descripcion | disponible
------------------------------------------
1  | Laptop    | Lenovo      | sí
2  | Proyector | Epson       | no
3  | Cámara    | Canon       | sí
```

## 12. Paso 5 — Crear una migración

Laravel utiliza **migraciones** para definir la estructura de las
tablas.

```bash
php artisan make:migration create_equipos_table
```

Laravel creará un archivo dentro de `database/migrations/`, con fecha y
hora al inicio del nombre.

## 13. Paso 6 — Definir nuestra tabla

Abre la migración recién creada. Encontrarás:

```php
Schema::create('equipos', function (Blueprint $table) {
    //
});
```

Define los campos:

```php
Schema::create('equipos', function (Blueprint $table) {
    $table->id();
    $table->string('nombre');
    $table->text('descripcion')->nullable();
    $table->boolean('disponible')->default(true);
    $table->timestamps();
});
```

## 14. ¿Qué acabamos de definir?

| Campo | Tipo | Propósito |
| --- | --- | --- |
| id | entero | Identificador |
| nombre | texto | Nombre del equipo |
| descripcion | texto | Descripción |
| disponible | booleano | Disponible o no |
| created_at | fecha | Fecha de creación |
| updated_at | fecha | Fecha de modificación |

No necesitas memorizar los tipos todavía. Lo importante es comprender
que la migración describe la estructura de la tabla.

## 15. Paso 7 — Ejecutar la migración

```bash
php artisan migrate
```

Deberías obtener un resultado similar a:

```text
INFO  Running migrations.
create_equipos_table ........ DONE
```

## 16. Punto de control 1

```text
Laravel → Migración → Tabla equipos → Base de datos

□ Existe database.sqlite
□ Existe la migración
□ Ejecuté php artisan migrate
□ No aparecen errores
```

## 17. Paso 8 — Crear el modelo

Un **modelo** representa una entidad con la que trabaja nuestra
aplicación.

```bash
php artisan make:model Equipo
```

Laravel creará `app/Models/Equipo.php`.

## 18. ¿Qué es un modelo?

El modelo representa una entidad con la que la aplicación trabaja. En
este caso, `Equipo` representa los registros de la tabla `equipos`:

```text
Modelo Equipo ↕ Tabla equipos
```

Laravel utiliza Eloquent para facilitar esta interacción.

## 19. Paso 9 — Preparar el modelo

Abre `app/Models/Equipo.php`. Dependiendo de la versión de Laravel, el
modelo puede utilizar una configuración de asignación masiva:

```php
class Equipo extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'disponible',
    ];
}
```

## 20. ¿Para qué sirve `$fillable`?

Indica qué campos permitiremos asignar directamente cuando creemos o
actualicemos un registro mediante el modelo: `nombre`, `descripcion`,
`disponible`.

## 21. Paso 10 — Crear el controlador

```bash
php artisan make:controller EquipoController --resource
```

Laravel creará `app/Http/Controllers/EquipoController.php`.

## 22. ¿Qué es un controlador?

Recibe una solicitud y coordina qué debe ocurrir:

```text
Usuario solicita /equipos → Ruta → EquipoController
   → Modelo Equipo → Base de datos → Vista
```

## 23. Paso 11 — Crear la ruta de recursos

En `routes/web.php`, agrega:

```php
use App\Http\Controllers\EquipoController;

Route::resource('equipos', EquipoController::class);
```

Esta instrucción crea las rutas necesarias para trabajar con el CRUD.

## 24. ¿Qué rutas tenemos?

```bash
php artisan route:list
```

Deberás encontrar, entre otras: `GET /equipos`, `GET /equipos/create`,
`POST /equipos`, `GET /equipos/{equipo}`, `GET /equipos/{equipo}/edit`,
`PUT/PATCH /equipos/{equipo}`, `DELETE /equipos/{equipo}`. No necesitas
memorizarlas todas.

## 25. Paso 12 — Crear la primera vista

Crea la carpeta `resources/views/equipos/` y dentro `index.blade.php`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Equipos</title>
</head>
<body>
    <h1>Equipos</h1>
    <p>Lista de equipos</p>
</body>
</html>
```

## 26. Paso 13 — Mostrar la vista desde el controlador

En `EquipoController.php`, modifica el método `index()`:

```php
use App\Models\Equipo;

public function index()
{
    $equipos = Equipo::all();

    return view('equipos.index', compact('equipos'));
}
```

## 27. ¿Qué está ocurriendo?

```text
Navegador → GET /equipos → EquipoController → Equipo::all()
   → Tabla equipos → $resultado → Vista equipos.index → Navegador
```

Todavía no hay registros, por eso la lista estará vacía.

## 28. Paso 14 — Mostrar los equipos

Modifica `resources/views/equipos/index.blade.php`:

```php
<h1>Equipos</h1>

<a href="{{ route('equipos.create') }}">
    Registrar equipo
</a>

@if ($equipos->count() > 0)
    <ul>
        @foreach ($equipos as $equipo)
            <li>{{ $equipo->nombre }}</li>
        @endforeach
    </ul>
@else
    <p>No existen equipos registrados.</p>
@endif
```

## 29. Paso 15 — Comprobar

Abre `http://127.0.0.1:8000/equipos`. Deberás observar "Equipos",
"Registrar equipo" y "No existen equipos registrados." Acabamos de
consultar la base de datos.

## 30. Paso 16 — Crear el formulario

Crea `resources/views/equipos/create.blade.php`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registrar equipo</title>
</head>
<body>
    <h1>Registrar equipo</h1>

    <form method="POST" action="{{ route('equipos.store') }}">
        @csrf

        <label>
            Nombre
            <input type="text" name="nombre">
        </label>
        <br><br>

        <label>
            Descripción
            <textarea name="descripcion"></textarea>
        </label>
        <br><br>

        <label>
            <input type="checkbox" name="disponible" value="1" checked>
            Disponible
        </label>
        <br><br>

        <button type="submit">Guardar</button>
    </form>

    <br>
    <a href="{{ route('equipos.index') }}">Regresar</a>
</body>
</html>
```

## 31. Paso 17 — Mostrar el formulario

En `EquipoController.php`:

```php
public function create()
{
    return view('equipos.create');
}
```

Visita `http://127.0.0.1:8000/equipos/create` y verifica el formulario.

## 32. Paso 18 — Guardar el equipo

Implementamos **CREATE** en `EquipoController.php`:

```php
use Illuminate\Http\Request;

public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
        'disponible' => 'nullable|boolean',
    ]);

    $validated['disponible'] = $request->boolean('disponible');

    Equipo::create($validated);

    return redirect()->route('equipos.index');
}
```

## 33. ¿Qué hace este código?

```text
Formulario → Request → Validación → Equipo::create() → Base de datos
   → Redirect → /equipos
```

## 34. Paso 19 — Crear nuestro primer equipo

En `/equipos/create` registra, por ejemplo, "Laptop Lenovo" con
descripción "Equipo para prácticas de laboratorio" y disponible "Sí".
Al guardar deberás regresar a `/equipos` y ver "Laptop Lenovo" en la
lista.

## 35. Punto de control 2

```text
CREATE ✓
READ   ✓
```

## 36. Paso 20 — Mostrar un equipo individual

En el controlador:

```php
public function show(Equipo $equipo)
{
    return view('equipos.show', compact('equipo'));
}
```

Crea `resources/views/equipos/show.blade.php`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Equipo</title>
</head>
<body>
    <h1>{{ $equipo->nombre }}</h1>
    <p>{{ $equipo->descripcion }}</p>
    <p>Disponible: {{ $equipo->disponible ? 'Sí' : 'No' }}</p>
    <a href="{{ route('equipos.index') }}">Regresar</a>
</body>
</html>
```

## 37. Paso 21 — Enlazar cada equipo

En `index.blade.php`, dentro del `foreach`:

```php
<a href="{{ route('equipos.show', $equipo) }}">
    {{ $equipo->nombre }}
</a>
```

Ahora cada equipo es un enlace. Haz clic en "Laptop Lenovo" para ver
sus datos.

## 38. Paso 22 — Editar un equipo

En el controlador:

```php
public function edit(Equipo $equipo)
{
    return view('equipos.edit', compact('equipo'));
}
```

Crea `resources/views/equipos/edit.blade.php`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar equipo</title>
</head>
<body>
    <h1>Editar equipo</h1>

    <form method="POST" action="{{ route('equipos.update', $equipo) }}">
        @csrf
        @method('PUT')

        <label>
            Nombre
            <input type="text" name="nombre" value="{{ $equipo->nombre }}">
        </label>
        <br><br>

        <label>
            Descripción
            <textarea name="descripcion">{{ $equipo->descripcion }}</textarea>
        </label>
        <br><br>

        <label>
            <input type="checkbox" name="disponible" value="1" {{ $equipo->disponible ? 'checked' : '' }}>
            Disponible
        </label>
        <br><br>

        <button type="submit">Actualizar</button>
    </form>
</body>
</html>
```

## 39. Paso 23 — Actualizar el equipo

En el controlador:

```php
public function update(Request $request, Equipo $equipo)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
        'disponible' => 'nullable|boolean',
    ]);

    $validated['disponible'] = $request->boolean('disponible');

    $equipo->update($validated);

    return redirect()->route('equipos.index');
}
```

## 40. Paso 24 — Agregar enlace para editar

En `index.blade.php`:

```php
<a href="{{ route('equipos.edit', $equipo) }}">
    Editar
</a>
```

## 41. Paso 25 — Eliminar un equipo

Implementamos **DELETE** en el controlador:

```php
public function destroy(Equipo $equipo)
{
    $equipo->delete();

    return redirect()->route('equipos.index');
}
```

## 42. Paso 26 — Agregar botón eliminar

En `index.blade.php`:

```html
<form method="POST" action="{{ route('equipos.destroy', $equipo) }}" style="display:inline">
    @csrf
    @method('DELETE')

    <button type="submit">Eliminar</button>
</form>
```

## 43. Paso 27 — Probar el CRUD completo

Registra tres equipos (Laptop Lenovo, Proyector Epson, Cámara Canon),
visualiza la lista, abre uno, cambia la descripción de uno y elimina
uno.

## 44. Punto de control final

```text
CREATE  ✓
READ    ✓
UPDATE  ✓
DELETE  ✓
```

## 45. Comprender el recorrido completo

Al crear: `Usuario → Formulario → POST /equipos → Route →
EquipoController@store → Validación → Equipo::create() → Base de
datos`. Al consultar: `Usuario → GET /equipos → Route →
EquipoController@index → Equipo::all() → Base de datos → Vista →
Navegador`. Al editar y eliminar, el patrón es análogo, cambiando el
verbo HTTP y el método del controlador.

## 46. La arquitectura que acabamos de utilizar

Sin entrar todavía en arquitectura avanzada, utilizamos una separación
básica:

```text
VISTA (Blade/HTML) → RUTA (routes/web.php) → CONTROLADOR
   (EquipoController) → MODELO (Equipo) → BASE DE DATOS (equipos)
```

No necesitas memorizar este diagrama todavía. Lo importante es empezar
a reconocer la responsabilidad de cada pieza.

## 47. Reto 1 — Agregar un campo

Agrega al equipo un campo `marca`, modificando migración, modelo,
formulario de creación, formulario de edición y vista. Después ejecuta
el procedimiento necesario para actualizar la base de datos de
desarrollo.

> **Importante.** Si la migración ya fue ejecutada, no modifiques una
> migración histórica como si todavía no hubiera sido aplicada. Más
> adelante en el taller se explica el flujo correcto para modificar
> estructuras mediante nuevas migraciones.

## 48. Reto 2 — Mostrar disponibilidad

Modifica la lista para mostrar "Disponible: Sí" o "Disponible: No"
junto a cada equipo.

## 49. Reto 3 — Validación

Intenta registrar un equipo sin nombre, y después con un nombre
demasiado largo. Observa qué ocurre. ¿Por qué es importante validar la
información antes de almacenarla?

## 50. Reto 4 — Relacionarlo con el proyecto integrador

El modelo `Equipo` usado aquí es únicamente un ejemplo. Identifica una
entidad real de tu proyecto que podría convertirse en un CRUD (por
ejemplo: sistema de reservas → `Reserva`, sistema de eventos →
`Evento`, sistema de citas → `Cita`). No necesitas implementarla
todavía: identifica la entidad, qué información tendría, quién la
administraría y qué operaciones necesitaría.

## 51. Evidencia

- **Evidencia 1** — captura de `/equipos` mostrando registros.
- **Evidencia 2** — captura del formulario de creación y su resultado.
- **Evidencia 3** — captura mostrando un registro modificado.
- **Evidencia 4** — captura de la lista después de eliminar un
  registro.
- **Evidencia 5** — código de `routes/web.php`, `app/Models/Equipo.php`,
  `EquipoController.php`, la migración y las vistas.

## 52. Checklist

```text
BASE DE DATOS
□ SQLite configurado
□ database.sqlite creado
□ Migración creada
□ Tabla equipos creada

MODELO
□ Modelo Equipo creado
□ Fillable configurado

CONTROLADOR
□ EquipoController creado
□ index / create / store / show / edit / update / destroy implementados

RUTAS
□ Route::resource configurado

VISTAS
□ index / create / show / edit

CRUD
□ Crear / Consultar / Ver / Editar / Eliminar
```

## 53. Preguntas de comprensión

¿Qué significa CRUD? ¿Qué diferencia existe entre una tabla y un
modelo? ¿Para qué sirve una migración? ¿Qué función tiene el
controlador? ¿Qué ocurre cuando se ejecuta `Equipo::all()`? ¿Qué ocurre
cuando se ejecuta `Equipo::create()`? ¿Qué diferencia existe entre una
vista y un controlador? ¿Por qué validamos los datos antes de
guardarlos? ¿Qué pieza conecta la URL con el controlador? ¿Qué entidad
de tu proyecto podría convertirse en un CRUD?

## 54. Resultado esperado

Al terminar debes poder explicar: "Una aplicación Laravel puede recibir
una solicitud mediante una ruta, procesarla mediante un controlador,
utilizar un modelo para trabajar con datos y devolver una vista al
usuario." Y debes tener funcionando un CRUD completo de equipos.

## 55. Relación con el proyecto integrador

Este laboratorio es un ejercicio técnico y no representa
necesariamente una funcionalidad del proyecto de tu equipo. Su
propósito es adquirir las capacidades mínimas para posteriormente
implementar historias de usuario reales:

```text
Laboratorio 1 "Aprendo a ejecutar Laravel"
   ↓
Laboratorio 2 "Aprendo a construir un CRUD"
   ↓
Historias de usuario "Defino qué necesita mi usuario"
   ↓
Proyecto integrador "Construyo el CRUD que realmente necesita mi producto"
```

## 56. Preparación para el siguiente laboratorio

En el [Laboratorio 3](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario/) dejarás de trabajar solamente con un
ejemplo: tomarás las necesidades reales de tu proyecto integrador y las
convertirás en historias de usuario que puedan volverse funcionalidades
como esta.
