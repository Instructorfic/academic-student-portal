---
title: "Laboratorio 1 — Persistencia en PostgreSQL"
description: "Bloque III de Taller Integrador — migrar el proyecto de SQLite a PostgreSQL, restricciones en la base y migraciones reversibles."
---

## 1. Propósito

Hasta ahora su proyecto guarda los datos en un archivo SQLite. Fue una
buena decisión para empezar ([Laboratorio 2 del Bloque I](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel/), sección 8): les
permitió concentrarse en Laravel sin configurar un servidor.

Un servicio que aspira a atender a muchos usuarios a la vez necesita un
motor que reciba conexiones concurrentes, haga cumplir la integridad de
los datos por sí mismo y sea el mismo en desarrollo, en pruebas y en
producción. El estándar del proyecto fija ese motor: **PostgreSQL**
([`04-ESTANDAR-BASES-DE-DATOS.md`](/recursos/estandares/04-estandar-bases-de-datos/) §1).

En este laboratorio van a mover su proyecto a PostgreSQL y a fortalecer
el modelo de datos para que la base de datos, y no solo el código,
proteja la información.

---

## 2. ¿Qué vamos a lograr?

```text
☐ PostgreSQL instalado y una base de datos propia del proyecto (más una para pruebas).
☐ Laravel conectado a PostgreSQL mediante variables de entorno, sin contraseñas en el repositorio.
☐ Relaciones reales entre tablas: llaves foráneas declaradas en la base de datos.
☐ Una restricción CHECK que impide guardar un préstamo con fechas incoherentes.
☐ Migraciones reversibles (ida y vuelta sin errores).
☐ Model Factories y un seeder para tener datos de desarrollo en un comando.
☐ El binding del Repository registrado en el contenedor de servicios.
☐ ADR-001 que documenta la elección de PostgreSQL.
☐ Todo integrado a main mediante merge request revisado.
```

---

## 3. Antes de comenzar

### Requisitos

```text
Bloque II completo: flujo de ramas, ARQUITECTURA.md, Service separado, patrón aplicado.
PHP con la extensión pdo_pgsql habilitada.
PostgreSQL instalado (ver sección 3.1). Háganlo ANTES de la sesión de laboratorio.
```

### 3.1 Instalación previa (estudio independiente)

Instalen PostgreSQL con el método oficial de su sistema operativo, desde
la página de descargas de PostgreSQL (`https://www.postgresql.org/download/`).
Cualquier versión con soporte vigente sirve; el pipeline de CI del
Laboratorio 5 usará la 16.

> **Nota de alcance.** En el Bloque IV van a ejecutar PostgreSQL dentro
> de un contenedor. En este bloque se instala de forma nativa a propósito:
> primero se entiende el motor, después se empaqueta.

Verifiquen la instalación:

```bash
psql --version
php -m | grep pdo_pgsql
```

En Windows (PowerShell), la segunda línea es:

```powershell
php -m | Select-String pdo_pgsql
```

Si `pdo_pgsql` no aparece, revisen la sección 12 (Troubleshooting).

### 3.2 Rama de trabajo

```bash
git checkout main
git pull origin main
git checkout -b feature/persistencia-postgresql
```

A partir de este bloque el repositorio vive en **GitLab** (decisión del curso). Lo que en el Bloque II llamaron *pull request*, en GitLab se
llama **merge request** (MR). Es el mismo mecanismo con otro nombre.

---

## 4. Conceptos mínimos

### 4.1 Entidad, relación y documento

Una **entidad** es algo del dominio con identidad propia: un equipo, un
préstamo, un usuario. Una **relación** dice cómo se conectan: un
préstamo *pertenece a* un equipo y *pertenece a* un usuario.

En una base de datos **relacional** (PostgreSQL), cada entidad es una
tabla y cada relación es una **llave foránea** (*foreign key*, FK). En
una base de datos **documental** (MongoDB), la unidad es el
**documento**: un objeto JSON que puede contener datos anidados. El
tema [1. Manejo de datos](/materias/taller-integrador/bloque-03/01-manejo-de-datos/) compara ambos modelos. En este
laboratorio se trabaja el relacional.

### 4.2 ¿Por qué la base de datos también debe validar?

En el Bloque II la regla `fecha_fin` posterior a `fecha_inicio` vive en
el Form Request. Eso protege la entrada por formulario o por API, pero
no protege contra un seeder mal escrito, una consola de `tinker` o un
script de migración de datos. Las restricciones en la base de datos
son la última línea de defensa (`STD-DB-P02`, `STD-DB-P03`).

### 4.3 Migración reversible

Una migración tiene `up()` (aplicar el cambio) y `down()` (deshacerlo).
Si `down()` no funciona, nadie puede regresar a un estado anterior sin
reconstruir la base a mano (`STD-DB-M01`). Además, **una migración que
ya se integró a `main` no se edita**: se crea otra que corrige
(`STD-DB-M03`).

---

## 5. Paso 1 — Crear las bases de datos

Abran una consola de PostgreSQL con un usuario administrador. El
comando depende del sistema operativo y del instalador:

| Sistema | Comando habitual |
| --- | --- |
| Linux (paquete de la distribución) | `sudo -u postgres psql` |
| Windows (instalador oficial) | `psql -U postgres` (pide la contraseña definida al instalar) |
| macOS (Postgres.app o Homebrew) | `psql postgres` |

Dentro de `psql`, creen un usuario propio del proyecto y dos bases de
datos: una de desarrollo y una exclusiva para pruebas automatizadas
(se usará en el Laboratorio 3).

```sql
CREATE USER reservafic WITH PASSWORD 'elijan-una-clave-local';
CREATE DATABASE reservafic OWNER reservafic;
CREATE DATABASE reservafic_testing OWNER reservafic;
\q
```

Usen el nombre de **su** proyecto en lugar de `reservafic`.

> **Mínimo privilegio.** La aplicación no se conecta como `postgres`
> (superusuario), sino con un usuario que solo es dueño de sus bases.
> Es el principio 3.4.1 aplicado desde la persistencia.

#### Punto de control 1

```bash
psql -U reservafic -h 127.0.0.1 -d reservafic -c "SELECT current_user;"
```

Debe responder `reservafic`. Si pide contraseña y la rechaza, revisen la
sección 12.

---

## 6. Paso 2 — Conectar Laravel mediante variables de entorno

Editen `.env` (este archivo **no** se versiona):

```text
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=reservafic
DB_USERNAME=reservafic
DB_PASSWORD=elijan-una-clave-local
```

Editen ahora `.env.example` (este archivo **sí** se versiona) con las
mismas llaves, **sin la contraseña real**:

```text
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=reservafic
DB_USERNAME=reservafic
DB_PASSWORD=
```

Verifiquen que `.env` está ignorado por Git:

```bash
git check-ignore .env
```

Debe imprimir `.env`. Si no imprime nada, deténganse: agreguen `.env` a
`.gitignore` antes de cualquier commit (`STD-SEC-01`). La plantilla
`recursos/estandares/config-examples/.gitignore` ya lo incluye.

#### Punto de control 2

```bash
php artisan db:show
```

Debe mostrar `PostgreSQL` como motor y `reservafic` como base de datos.

---

## 7. Paso 3 — Modelo con ReservaFIC

### 7.1 El modelo de datos de este bloque

ReservaFIC amplía su modelo con dos datos que el Bloque II no tenía:

* **quién** solicita cada préstamo (`prestamos.user_id`);
* **qué rol** tiene cada usuario (`users.rol`: `estudiante` o
  `administrador`).

```text
users                     equipos
-----                     -------
id (PK)                   id (PK)
name                      nombre
email (único)             descripcion
password                  disponible
rol                       timestamps
timestamps
    │ 1                       │ 1
    │                         │
    │ N                       │ N
    └──────── prestamos ──────┘
              ---------
              id (PK)
              user_id (FK → users.id)
              equipo_id (FK → equipos.id)
              fecha_inicio
              fecha_fin
              timestamps
              CHECK (fecha_fin > fecha_inicio)
```

### 7.2 Revisar lo que ya existe

Antes de crear migraciones, revisen qué tienen. **No editen migraciones
ya integradas a `main`** (`STD-DB-M03`).

```bash
ls database/migrations
```

En ReservaFIC existen la de `equipos` (Bloque I) y la de `prestamos`
(Bloque II), con `equipo_id`, `fecha_inicio` y `fecha_fin`. Si en su
proyecto la columna de relación se creó sin `->constrained()`, la llave
foránea **no existe** en la base de datos: eso se corrige con una
migración nueva, no editando la anterior.

### 7.3 Migración: rol del usuario

```bash
php artisan make:migration add_rol_to_users_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('rol', 20)->default('estudiante');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('rol');
        });
    }
};
```

### 7.4 Migración: quién solicita el préstamo y coherencia de fechas

```bash
php artisan make:migration add_user_id_and_check_to_prestamos_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
        });

        DB::statement(
            'ALTER TABLE prestamos ADD CONSTRAINT chk_prestamos_fechas CHECK (fecha_fin > fecha_inicio)'
        );
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE prestamos DROP CONSTRAINT chk_prestamos_fechas');

        Schema::table('prestamos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });
    }
};
```

Tres decisiones que conviene leer despacio:

1. `foreignId('user_id')->constrained()` crea la columna, la llave
   foránea hacia `users.id` y su índice (`STD-DB-P02`, sección 2.4 del
   estándar).
2. La restricción `CHECK` se escribe en SQL porque el constructor de
   esquemas de Laravel no la ofrece de forma directa. Su nombre sigue la
   convención `chk_<tabla>_<regla>` del estándar.
3. `down()` deshace los cambios **en orden inverso** a `up()`.

> **¿Y los préstamos que ya existían?** En PostgreSQL la base está
> vacía, así que una columna `NOT NULL` sin valor por defecto no causa
> problema. En una base con datos reales, agregar una columna obligatoria
> exige un plan (valor por defecto, migración de datos en dos pasos).
> Lo retomarán en el Bloque V, mantenimiento y evolución.

### 7.5 Modelos y relaciones

`app/Enums/Rol.php` (enum nativo de PHP para un catálogo cerrado,
[`02-ESTANDAR-BACKEND-LARAVEL.md`](/recursos/estandares/02-estandar-backend-laravel/) §3):

```php
<?php

namespace App\Enums;

enum Rol: string
{
    case ESTUDIANTE = 'estudiante';
    case ADMINISTRADOR = 'administrador';
}
```

En `app/Models/User.php`, agreguen el *cast* del rol y la relación.
**No agreguen `rol` a `$fillable`**: si lo hicieran, cualquiera que
enviara `"rol": "administrador"` en una petición podría promoverse a sí
mismo (*mass assignment*, `STD-BE-M01`). Lo retomarán en el
Laboratorio 4.

```php
use App\Enums\Rol;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Dentro de la clase User:

protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'rol' => Rol::class,
    ];
}

public function prestamos(): HasMany
{
    return $this->hasMany(Prestamo::class);
}

public function esAdministrador(): bool
{
    return $this->rol === Rol::ADMINISTRADOR;
}
```

`app/Models/Prestamo.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prestamo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'equipo_id',
        'fecha_inicio',
        'fecha_fin',
    ];

    protected function casts(): array
    {
        return [
            'fecha_inicio' => 'datetime',
            'fecha_fin' => 'datetime',
        ];
    }

    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class);
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
```

> **¿`user_id` en `$fillable` no es un riesgo?** No, mientras el
> controlador use `$request->validated()`: ese método devuelve **solo**
> los campos que tienen regla de validación. `GuardarPrestamoRequest` no
> valida `user_id`, así que un `user_id` enviado por el cliente se
> descarta. El valor real lo pondrá el servidor a partir del usuario
> autenticado (Laboratorio 2).

En `app/Models/Equipo.php`, agreguen `use HasFactory;` y la relación
inversa:

```php
public function prestamos(): HasMany
{
    return $this->hasMany(Prestamo::class);
}
```

### 7.6 Registrar el binding del Repository

El `PrestamoService` del Bloque II recibe una
`PrestamoRepositoryInterface` en su constructor. Laravel sabe construir
clases concretas, pero **no sabe qué clase usar cuando se le pide una
interfaz** a menos que se lo indiquen. Si su proyecto todavía no lo
tiene, regístrenlo en `app/Providers/AppServiceProvider.php`:

```php
use App\Repositories\EloquentPrestamoRepository;
use App\Repositories\PrestamoRepositoryInterface;

public function register(): void
{
    $this->app->bind(
        PrestamoRepositoryInterface::class,
        EloquentPrestamoRepository::class
    );
}
```

Sin esta línea, la primera petición que use el Service termina con un
error del tipo "Target [...PrestamoRepositoryInterface] is not
instantiable". (Este paso faltaba en el laboratorio del Bloque II.)

---

## 8. Paso 4 — Factories y seeder

Las **Model Factories** generan datos de ejemplo coherentes; se usan
para desarrollo y, sobre todo, para las pruebas del Laboratorio 3
(`STD-TEST`, sección 5).

```bash
php artisan make:factory EquipoFactory --model=Equipo
php artisan make:factory PrestamoFactory --model=Prestamo
```

`database/factories/EquipoFactory.php`:

```php
public function definition(): array
{
    return [
        'nombre' => fake()->randomElement(['Laptop', 'Proyector', 'Osciloscopio', 'Cámara']).' '.fake()->numerify('###'),
        'descripcion' => fake()->sentence(),
        'disponible' => true,
    ];
}
```

`database/factories/PrestamoFactory.php`:

```php
use App\Models\Equipo;
use App\Models\User;

public function definition(): array
{
    $inicio = fake()->dateTimeBetween('+1 day', '+10 days');

    return [
        'user_id' => User::factory(),
        'equipo_id' => Equipo::factory(),
        'fecha_inicio' => $inicio,
        'fecha_fin' => (clone $inicio)->modify('+2 hours'),
    ];
}
```

En `database/seeders/DatabaseSeeder.php`, dentro de `run()`:

```php
use App\Enums\Rol;
use App\Models\Equipo;
use App\Models\User;

User::factory()->create([
    'name' => 'Administración de laboratorio',
    'email' => 'admin@reservafic.test',
    'rol' => Rol::ADMINISTRADOR,
]);

User::factory()->create([
    'name' => 'Estudiante de prueba',
    'email' => 'estudiante@reservafic.test',
]);

Equipo::factory()->count(5)->create();
```

Aquí `rol` sí se asigna dentro de `create()`, aunque no está en
`$fillable` (sección 7.5). La razón: las factories de Laravel crean los
modelos con la protección de asignación masiva desactivada. Por eso las
factories son herramientas de desarrollo y de pruebas, y **nunca** se
usan para procesar datos que vienen de una petición.

> **Contraseña de los usuarios de ejemplo.** La `UserFactory` de Laravel
> asigna una contraseña de ejemplo conocida. Sirve solo para datos de
> desarrollo; nunca ejecuten este seeder contra una base con usuarios
> reales.

---

## 9. Paso 5 — Ejecutar y verificar la reversibilidad

```bash
php artisan migrate:fresh --seed
```

`migrate:fresh` **borra todas las tablas** y vuelve a crearlas. Úsenlo
solo en su base de desarrollo.

Ahora prueben que las migraciones se pueden deshacer y rehacer
(`STD-DB-M01`):

```bash
php artisan migrate:rollback
php artisan migrate
```

#### Punto de control 3

Verifiquen en PostgreSQL que las restricciones existen **en la base de
datos**:

```bash
psql -U reservafic -h 127.0.0.1 -d reservafic -c "\d prestamos"
```

En la salida deben aparecer, en las secciones de restricciones:

```text
"chk_prestamos_fechas" CHECK (fecha_fin > fecha_inicio)
"prestamos_equipo_id_foreign" FOREIGN KEY (equipo_id) REFERENCES equipos(id)
"prestamos_user_id_foreign" FOREIGN KEY (user_id) REFERENCES users(id)
```

Si `prestamos_equipo_id_foreign` no aparece, su migración del Bloque II
no declaró la llave foránea: creen una migración nueva que la agregue.

#### Punto de control 4 — la base de datos se defiende sola

```bash
php artisan tinker
```

```php
App\Models\Prestamo::create([
    'user_id' => 1,
    'equipo_id' => 1,
    'fecha_inicio' => '2026-11-10 12:00:00',
    'fecha_fin' => '2026-11-10 10:00:00',
]);
```

PostgreSQL debe rechazar la inserción con un error que menciona
`chk_prestamos_fechas`. El Form Request no intervino: la protección es
del motor. Repitan con `'equipo_id' => 9999` y observen el error de
llave foránea.

---

## 10. Paso 6 — ADR-001: elección de PostgreSQL

El estándar de documentación pide registrar como **ADR** (*Architecture
Decision Record*) las decisiones que fijan una tecnología estructural
([`10-ESTANDAR-DOCUMENTACION.md`](/recursos/estandares/10-estandar-documentacion/) §7). Creen
`docs/adr/ADR-001-eleccion-postgresql.md`:

```markdown
# ADR-001: Usar PostgreSQL como base de datos principal

**Estado:** Aceptada
**Fecha:** AAAA-MM-DD
**Decisores:** <integrantes del equipo>

## Contexto
El proyecto usaba SQLite desde el Bloque I. El sistema debe atender
muchos usuarios concurrentes (escenario de referencia de 100,000
usuarios) y proteger la integridad de los préstamos.

## Decisión
Usar PostgreSQL como motor principal en desarrollo, pruebas e
integración continua.

## Alternativas consideradas
- SQLite — no está diseñado para un servidor con muchas escrituras
  concurrentes; las pruebas no reproducirían el motor real.
- MongoDB — los préstamos, usuarios y equipos tienen relaciones fuertes
  que requieren integridad referencial.

## Consecuencias
- Cada integrante debe instalar PostgreSQL localmente.
- Las restricciones (FK, CHECK) las hace cumplir el motor.
- Las pruebas usarán una base PostgreSQL dedicada (reservafic_testing).
```

Adapten el contexto y las alternativas a **su** proyecto. Un ADR
copiado sin adaptar no documenta ninguna decisión.

---

## 11. Paso 7 — Aplicarlo a su proyecto e integrarlo

1. Repitan los pasos 3 a 5 con las entidades de su dominio. Identifiquen
   **todas** las relaciones de su modelo y verifiquen que cada una tiene
   su llave foránea real.
2. Identifiquen al menos una regla de coherencia que deba proteger la
   base de datos (una restricción `CHECK`, un `unique`, un `NOT NULL`
   que faltaba).
3. Actualicen `ARQUITECTURA.md` con el diagrama de entidades.
4. Hagan commits pequeños con Conventional Commits, por ejemplo:

```bash
git add database/migrations app/Models app/Enums
git commit -m "feat(db): agregar user_id y restricción de fechas a prestamos"
git add database/factories database/seeders
git commit -m "test(db): agregar factories y seeder de desarrollo"
git add docs/adr .env.example
git commit -m "docs(adr): registrar elección de PostgreSQL"
git push -u origin feature/persistencia-postgresql
```

5. Abran un **merge request** en GitLab hacia `main`. En la descripción
   escriban cómo probarlo (comandos del Paso 5) y enlacen el issue
   correspondiente con `Closes #<número>`.
6. Otro integrante revisa siguiendo el checklist de `STD-CR` (sección 3
   del estándar), con atención a "Migraciones — reversibles, con
   constraints correctos".

---

## 12. Troubleshooting

| Síntoma | Diagnóstico | Solución |
| --- | --- | --- |
| `could not find driver` al migrar | PHP no tiene `pdo_pgsql` | Habiliten la extensión en `php.ini` (`extension=pdo_pgsql` y `extension=pgsql`) o instálenla con el gestor de paquetes de su sistema; reinicien la terminal |
| `password authentication failed for user "reservafic"` | Contraseña de `.env` distinta a la del `CREATE USER` | `ALTER USER reservafic WITH PASSWORD '...';` desde `psql` como administrador |
| `Peer authentication failed` (Linux) | Conexión por socket local sin contraseña | Usen `-h 127.0.0.1` y `DB_HOST=127.0.0.1` para forzar conexión TCP |
| `connection refused` en el puerto 5432 | El servicio de PostgreSQL no está corriendo | Inicien el servicio (Servicios de Windows, Postgres.app, `systemctl start postgresql`) |
| `permission denied for schema public` | En PostgreSQL 15+ el esquema `public` ya no da permiso de creación a todos | Creen la base con `OWNER reservafic`, como en el Paso 1 |
| `Target [...Interface] is not instantiable` | Falta el binding del Repository | Paso 3, sección 7.6 |
| `migrate:rollback` falla | `down()` no deshace exactamente lo que hizo `up()` | Revisen el orden inverso y los nombres de restricciones |

---

## 13. Evidencia del laboratorio

```text
A. Salida de `php artisan db:show` mostrando PostgreSQL.
B. Salida de `\d <tabla principal>` mostrando FK y CHECK.
C. Salida de rollback + migrate sin errores.
D. Error de PostgreSQL al violar la restricción (Punto de control 4).
E. docs/adr/ADR-001-eleccion-postgresql.md adaptado al proyecto.
F. Merge request integrado, con al menos un comentario de revisión.
```

---

## 14. Reflexión del equipo

1. ¿Qué regla de su dominio protegía antes solo el código y ahora
   protege también la base de datos?
2. Si dos integrantes registran un préstamo del mismo equipo, en el
   mismo horario, en el mismo milisegundo, ¿qué los protege hoy? (La
   respuesta honesta probablemente sea "nada todavía". El tema
   [1. Manejo de datos](/materias/taller-integrador/bloque-03/01-manejo-de-datos/) explica por qué.)
3. ¿Qué dato de su proyecto sería candidato a una base documental, y
   por qué no lo es (o sí)?

---

## 15. Reto adicional (opcional) — base de datos documental

Solo si su equipo terminó el laboratorio completo. Identifiquen un dato
con estructura variable (por ejemplo, una bitácora de eventos cuyo
contenido cambia según el tipo de evento). Diseñen el documento JSON y
redacten un `ADR-00X-uso-mongodb-en-<modulo>.md` que justifique por qué
**ese** dato y no otro iría en MongoDB ([`04-ESTANDAR-BASES-DE-DATOS.md`](/recursos/estandares/04-estandar-bases-de-datos/)
§3). Implementarlo es opcional; si lo hacen, usen el paquete oficial de
integración de MongoDB con Laravel y verifiquen su compatibilidad con su
versión de Laravel (pendiente de verificación al momento de usarlo).

---

## 16. Criterio de finalización

```text
☐ La aplicación funciona contra PostgreSQL; .env no está en el repositorio y .env.example sí.
☐ Cada relación del modelo tiene llave foránea real en la base de datos.
☐ Existe al menos una restricción de coherencia en la base de datos.
☐ Las migraciones nuevas son reversibles; ninguna migración ya integrada fue editada.
☐ Factories y seeder permiten reconstruir datos de desarrollo con un comando.
☐ El binding del Repository está registrado.
☐ ADR-001 adaptado al proyecto.
☐ Integrado mediante merge request revisado.
```

---

## 17. Relación con los siguientes laboratorios

La base de prueba `reservafic_testing` se usará en el Laboratorio 3.
Las relaciones `usuario` y `equipo` las usará la API del Laboratorio 2
para devolver préstamos con sus datos relacionados.
