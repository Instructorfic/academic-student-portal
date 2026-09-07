---
title: "Laboratorio 1 — Primer contacto con Laravel desde cero"
description: "Bloque I de Taller Integrador — instalar, ejecutar y modificar tu primera aplicación Laravel, sin conocimientos previos."
---

**Modalidad:** Laboratorio guiado. **Duración estimada:** 100 minutos.
**Nivel:** Principiante absoluto. **Tecnología:** Laravel. **Tipo:**
Habilitación técnica.

## 1. Propósito

En esta práctica realizarás tu primer contacto con Laravel y aprenderás
a ejecutar una aplicación web de manera local.

No se espera que conozcas previamente: Laravel, PHP, Composer, Node.js,
npm, terminal, MVC, rutas, controladores, modelos ni bases de datos. El
laboratorio está diseñado para avanzar paso a paso.

## 2. ¿Qué vamos a lograr?

Al finalizar podrás: reconocer qué es Laravel, identificar qué es un
proyecto Laravel, abrir una terminal, ubicarte dentro de una carpeta,
reconocer la estructura básica de un proyecto, ejecutar una aplicación
Laravel, acceder a ella desde un navegador, modificar una página y
comprobar que el cambio funciona.

El objetivo **no es aprender todo Laravel**. El objetivo es conseguir
esto:

```text
Tu computadora
      ↓
Proyecto Laravel
      ↓
Servidor local
      ↓
Navegador
      ↓
Primera página funcionando
```

## 3. Antes de comenzar

El instructor debe haber preparado previamente el equipo o entorno con
PHP, Composer, Laravel, Node.js, npm, editor de código y terminal. Las
versiones concretas serán las establecidas para el laboratorio.

> **Importante.** No instales versiones diferentes por tu cuenta si el
> instructor ya proporcionó un entorno preparado.

## 4. Conceptos mínimos

### 4.1 PHP

PHP es un lenguaje de programación utilizado ampliamente para
desarrollar aplicaciones web. Laravel está construido sobre PHP.

### 4.2 Framework

Un framework proporciona herramientas y una estructura para desarrollar
software. En lugar de comenzar completamente desde cero, utilizamos una
estructura preparada: PHP → Laravel → Aplicación web.

### 4.3 Laravel

Laravel es un framework para desarrollar aplicaciones web utilizando
PHP. Durante el taller lo utilizarás como una de las tecnologías para
construir el proyecto integrador.

### 4.4 Terminal

La terminal permite darle instrucciones directamente a la computadora
mediante comandos. Por ejemplo, `pwd` significa "muéstrame en qué
carpeta estoy". No necesitas memorizar todos los comandos ahora.

### 4.5 Navegador

El navegador será el medio mediante el cual veas tu aplicación,
utilizando una dirección local similar a `http://127.0.0.1:8000` — la
aplicación está ejecutándose en tu propia computadora.

## 5. Paso 1 — Abrir la terminal

Abre la terminal de tu sistema (PowerShell, Windows Terminal o la
terminal integrada de VS Code en Windows, o Terminal en macOS o Linux).

## 6. Paso 2 — Comprobar que PHP funciona

```bash
php -v
```

Deberías obtener información similar a `PHP 8.x.x (cli)`. Si funciona,
continúa. Si aparece `php: command not found` o un mensaje equivalente,
**no continúes instalando cosas por tu cuenta** — avísale al
instructor.

## 7. Paso 3 — Comprobar Composer

Composer es el administrador de dependencias de PHP. Laravel lo utiliza
para gestionar sus componentes.

```bash
composer --version
```

Deberías obtener algo similar a `Composer version 2.x.x`. Si aparece un
error, informa al instructor.

## 8. Paso 4 — Comprobar Node.js

Laravel utiliza herramientas del ecosistema JavaScript para administrar
recursos del frontend.

```bash
node -v
npm -v
```

Ambos comandos deben devolver una versión.

## 9. Punto de control 1

```text
□ PHP funciona
□ Composer funciona
□ Node.js funciona
□ npm funciona
```

Si alguna casilla no está funcionando, detente y solicita ayuda.

## 10. Paso 5 — Crear una carpeta de trabajo

```bash
mkdir proyectos
cd proyectos
```

## 11. ¿Qué significa `cd`?

`cd` significa **change directory**: sirve para cambiar de carpeta. Para
comprobar dónde estás, ejecuta `pwd` (o `Get-Location` en Windows
PowerShell).

## 12. Paso 6 — Crear el proyecto Laravel

Utiliza el comando establecido por el instructor. Por ejemplo:

```bash
composer create-project laravel/laravel taller-integrador
```

El proceso puede tardar algunos minutos. Al terminar tendrás una
carpeta `taller-integrador`.

## 13. Paso 7 — Entrar al proyecto

```bash
cd taller-integrador
pwd
```

## 14. Paso 8 — Abrir el proyecto en VS Code

```bash
code .
```

El punto significa "abrir la carpeta actual". También puedes abrir VS
Code manualmente y seleccionar la carpeta `taller-integrador`.

## 15. Paso 9 — Conocer la estructura del proyecto

```text
taller-integrador/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── vendor/
│
├── artisan
├── composer.json
└── package.json
```

No necesitas aprenderlas todas todavía.

## 16. ¿Qué significa cada cosa?

- **`app/`** — contiene gran parte del código de la aplicación. Más
  adelante trabajarás aquí con modelos, controladores y otras clases.
- **`routes/`** — aquí se definen las rutas de la aplicación (por
  ejemplo, `/` puede representar la página principal).
- **`resources/`** — contiene recursos utilizados para construir la
  interfaz.
- **`database/`** — contiene elementos relacionados con la base de
  datos. Más adelante trabajarás aquí con migraciones.
- **`public/`** — es el punto de entrada público de la aplicación.
- **`artisan`** — herramienta de línea de comandos de Laravel. Más
  adelante usarás `php artisan` para distintas tareas.

## 17. Paso 10 — Instalar dependencias frontend

```bash
npm install
```

Este comando instala las dependencias definidas para el proyecto. Puede
tardar algunos minutos. Cuando termine, no cierres la terminal.

## 18. Paso 11 — Ejecutar Laravel

```bash
php artisan serve
```

Deberías obtener un mensaje similar a `INFO  Server running on
[http://127.0.0.1:8000].`. **No cierres esta terminal** — mientras este
proceso esté ejecutándose, el servidor estará disponible.

## 19. Paso 12 — Abrir la aplicación

Abre el navegador y visita `http://127.0.0.1:8000`. Deberás visualizar
la página inicial de Laravel.

## 20. Punto de control 2

Detente aquí. Debes poder responder:

- ¿Qué está ejecutándose? Una aplicación Laravel.
- ¿Dónde está ejecutándose? En tu computadora.
- ¿Qué es `127.0.0.1`? Representa tu propia computadora.
- ¿Qué significa `8000`? Es el puerto donde escucha el servidor local.
- ¿Qué utilizamos para ejecutar Laravel? `php artisan serve`.

## 21. Paso 13 — Nuestra primera modificación

Abre `routes/web.php`. Encontrarás una ruta similar a:

```php
Route::get('/', function () {
    return view('welcome');
});
```

No necesitas comprender todavía cada elemento. Observa que la
aplicación tiene una ruta para `/`.

## 22. Paso 14 — Crear nuestra primera respuesta

Reemplaza temporalmente el contenido de la ruta principal por:

```php
Route::get('/', function () {
    return 'Mi primer proyecto con Laravel';
});
```

Guarda el archivo, regresa al navegador y actualiza la página.

## 23. ¿Qué acabamos de hacer?

Creamos una ruta:

```text
Navegador → / → Laravel → "Mi primer proyecto con Laravel"
```

Cuando el navegador solicita `http://127.0.0.1:8000/`, Laravel
encuentra la ruta `/` y ejecuta la función asociada.

## 24. Paso 15 — Cambiar nuevamente el mensaje

Modifica el mensaje para incluir el nombre de tu equipo, por ejemplo:

```php
Route::get('/', function () {
    return 'Proyecto Equipo 03 — Taller Integrador';
});
```

Guarda el archivo y actualiza el navegador.

## 25. Punto de control 3

```text
□ La aplicación inicia
□ El navegador puede acceder
□ La ruta `/` funciona
□ Puedo modificar el código
□ El cambio aparece en el navegador
```

Si todas las casillas están completas, **ya ejecutaste y modificaste tu
primera aplicación Laravel**.

## 26. Paso 16 — Entender lo que ocurrió

```text
NAVEGADOR → solicitud → LARAVEL → busca una ruta → routes/web.php
   → ejecuta código → RESPUESTA → NAVEGADOR
```

Todavía no estamos trabajando con bases de datos, modelos,
autenticación, APIs, arquitectura avanzada, seguridad ni despliegue.
Esos temas aparecerán posteriormente.

## 27. Reto 1 — Personalizar la página

Modifica la respuesta para mostrar el nombre del proyecto, el equipo y
los integrantes. Puedes usar HTML sencillo:

```php
Route::get('/', function () {
    return '
        <h1>Taller Integrador</h1>
        <p>Proyecto: __________</p>
        <p>Equipo: __________</p>
        <p>Integrantes: __________</p>
    ';
});
```

## 28. Reto 2 — Crear una segunda ruta

Agrega `/about`, que debe mostrar "Acerca del proyecto", comprobable en
`http://127.0.0.1:8000/about`.

## 29. Reto 3 — Crear una tercera ruta

Crea `/contacto`, que debe mostrar "Contacto del proyecto", comprobable
en `http://127.0.0.1:8000/contacto`.

## 30. Evidencia de la práctica

- **Evidencia 1** — captura del navegador mostrando la aplicación
  Laravel funcionando.
- **Evidencia 2** — archivo `routes/web.php` mostrando las rutas
  creadas.
- **Evidencia 3** — las URLs `/`, `/about` y `/contacto` funcionando.
- **Evidencia 4** — captura de la estructura del proyecto en VS Code.

## 31. Checklist de finalización

```text
ENTORNO
□ PHP funciona
□ Composer funciona
□ Node.js funciona
□ npm funciona

PROYECTO
□ Proyecto Laravel creado
□ Proyecto abierto en VS Code
□ Dependencias instaladas
□ Laravel ejecutándose

APLICACIÓN
□ Página principal funciona
□ Modifiqué la página principal
□ Creé /about
□ Creé /contacto

COMPRENSIÓN
□ Sé qué es Laravel
□ Sé qué es un framework
□ Sé qué es la terminal
□ Sé ejecutar Laravel
□ Sé dónde están las rutas
□ Sé comprobar un cambio en el navegador
```

## 32. ¿Qué debes conservar?

No borres el proyecto. Se utilizará como punto de partida para el
[Laboratorio 2](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel/). Progresivamente se incorporarán rutas,
controladores, vistas, modelos, base de datos, CRUD y las
funcionalidades del proyecto.

## 33. Errores frecuentes

**Error: `php` no existe** (`php: command not found`). No reinstales
PHP inmediatamente. Verifica que estás utilizando el entorno
proporcionado por el instructor.

**Error: `composer` no existe** (`composer: command not found`).
Detén la práctica y solicita apoyo.

**Error: `npm` no existe** (`npm: command not found`). Verifica la
instalación de Node.js en el entorno.

**Error: el puerto 8000 está ocupado.** Solicita apoyo al instructor
antes de cambiar configuraciones.

**Error: no abre `127.0.0.1:8000`.** Comprueba primero que la terminal
siga mostrando `Server running`. Si cerraste la terminal, vuelve a
ejecutar `php artisan serve`.

**Error: modifiqué el archivo pero no veo el cambio.** Comprueba: (1)
guardaste el archivo, (2) actualizaste el navegador, (3) estás
entrando a la URL correcta, (4) el servidor sigue ejecutándose.

## 34. Preguntas de comprensión

Responde con tus propias palabras: ¿Qué es Laravel? ¿Para qué sirve un
framework? ¿Qué hace `php artisan serve`? ¿Qué representa `127.0.0.1`?
¿Dónde se definen las rutas web? ¿Qué ocurre cuando escribes `/about`
en el navegador? ¿Qué diferencia existe entre modificar el código y
visualizar el resultado?

## 35. Relación con el proyecto integrador

Esta práctica todavía **no construye una funcionalidad real del
producto**: su objetivo es preparar el entorno técnico. La relación con
el proyecto integrador comienza cuando tu equipo use esta base para
implementar, más adelante, las historias de usuario de tu Product
Backlog (ver [4. Definición del proyecto](/materias/taller-integrador/bloque-01/04-definicion-del-proyecto/)).

## 36. Resultado esperado

Al terminar este laboratorio debes poder decir: "Tengo un proyecto
Laravel ejecutándose en mi computadora, puedo modificar una ruta y
puedo comprobar el resultado desde el navegador." Ese es el punto de
partida técnico para el siguiente laboratorio.

## 37. Preparación para el Laboratorio 2

En el siguiente laboratorio aprenderás a construir un **CRUD**,
partiendo de `Ruta → Laravel → Respuesta` y avanzando hacia `Navegador
→ Ruta → Controlador → Modelo → Base de datos → Respuesta`. No
necesitas estudiar estos conceptos por adelantado — el
[Laboratorio 2](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel/) los introduce paso a paso.
