---
title: "7. Gestión de secretos"
description: "Bloque III de Taller Integrador — secretos, .env, .gitignore, secretos en el historial, configuración insegura y OWASP Top 10:2025."
---

**Temas del programa:** 3.4.3 y 3.4.4

## Qué es un secreto

<div class="callout">

Cualquier valor que <strong>da acceso</strong> a algo · si otra persona lo tiene puede actuar como tú o como tu sistema

</div>

<div class="grid-3">

<div class="card accent-rojo"><strong>Credenciales</strong><p>DB_PASSWORD · usuario y contraseña de servicios</p></div>
<div class="card accent-dorado"><strong>Llaves</strong><p>APP_KEY · llaves de API de terceros</p></div>
<div class="card accent-azul"><strong>Tokens</strong><p>Tokens de Sanctum · tokens de acceso de GitLab</p></div>

</div>

<p class="small">No son secretos APP_NAME · DB_HOST de tu máquina · el puerto · van en .env.example con su valor</p>

## Dónde vive cada secreto

| Ambiente | Dónde | Quién lo ve |
| --- | --- | --- |
| Tu máquina | .env fuera del repositorio | Solo tú |
| Pruebas locales | .env o .env.testing ignorados | Solo tú |
| Pipeline de CI | Variables de CI/CD de GitLab | El pipeline · enmascaradas en el log |
| Producción | La plataforma de despliegue | En el Bloque IV profundizarás en esto |

<div class="banner-node">

El código viaja a todas partes · los secretos se quedan en cada ambiente

</div>

## El camino de un secreto en Laravel

```text
.env                  DB_PASSWORD=clave-local-de-ana
  ▼
config/database.php   'password' => env('DB_PASSWORD'),
  ▼
tu código             config('database.connections.pgsql.password')
```

```php
// Mal: el secreto queda en el repositorio para siempre
$cliente = new ServicioCorreo('sk_live_8f3a...');

// Bien: se lee de la configuración
$cliente = new ServicioCorreo(config('services.correo.key'));
```

<p class="small">env() solo dentro de config/ · el resto del código usa config()</p>

## .env y .env.example

<div class="grid-2">

<div class="card accent-rojo"><strong>.env · no se versiona</strong><p>DB_PASSWORD=clave-local-de-ana<br>APP_KEY=base64:Qm9...</p></div>
<div class="card accent-verde"><strong>.env.example · sí se versiona</strong><p>DB_PASSWORD=<br>APP_KEY=</p></div>

</div>

```bash
cp .env.example .env
php artisan key:generate
```

<div class="callout">

Una persona nueva levanta el proyecto con dos comandos sin recibir tus credenciales · STD-SEC-02

</div>

## Retomando .gitignore

<div class="callout">

En el Bloque II viste qué no entra al repositorio · ahora interesa <strong>cómo</strong> decide Git y dónde puede fallar

</div>

```gitignore
# Entorno y secretos
.env
.env.*
!.env.example

# Generados
/vendor
/node_modules
.phpunit.result.cache
/storage/*.key
```

<p class="small">recursos/estandares/config-examples/.gitignore adaptado a un proyecto en la raíz</p>

## Cómo lee Git un .gitignore

| Patrón | Significa |
| --- | --- |
| `.env` | Cualquier archivo llamado .env |
| `.env.*` | .env.testing · .env.production · .env.backup |
| `!.env.example` | Excepción · este sí se versiona |
| `/vendor` | La carpeta vendor de la raíz solamente |
| `*.log` | Cualquier archivo que termine en .log |
| `# texto` | Comentario |

<div class="callout-alcance">

Se leen de arriba hacia abajo · la última regla que coincide gana · por eso el ! va después

</div>

## Comprobar en lugar de suponer

```bash
$ git check-ignore -v .env
.gitignore:2:.env	.env

$ git check-ignore -v .env.testing
.gitignore:3:.env.*	.env.testing

$ git status --ignored --short
!! .env
!! vendor/
```

<div class="callout">

check-ignore dice qué línea del .gitignore decide el destino de cada archivo

</div>

## La trampa — .gitignore no deja de rastrear

<div class="callout">

.gitignore solo afecta archivos que Git <strong>todavía no rastrea</strong> · si .env ya se había agregado seguirá subiendo cambios

</div>

```bash
$ git ls-files .env
.env                          # Git lo rastrea aunque esté en .gitignore

$ git rm --cached .env        # deja de rastrearlo y conserva tu archivo local
$ git commit -m "chore: dejar de versionar .env"
```

<div class="callout-alcance">

Esto lo saca de los commits futuros · los anteriores lo siguen teniendo

</div>

## Si un secreto llegó al historial

```bash
git log --all --oneline -- .env
```

<div class="grid-3">

<div class="card accent-rojo"><strong>1 Rotar</strong><p>Cambiar la contraseña o generar una llave nueva</p></div>
<div class="card accent-dorado"><strong>2 Avisar</strong><p>Al equipo y al docente</p></div>
<div class="card accent-verde"><strong>3 Prevenir</strong><p>Corregir .gitignore y verificar con check-ignore</p></div>

</div>

<div class="banner-node">

Borrarlo en el siguiente commit no basta — el historial lo conserva · STD-SEC-04

</div>

## Detectarlo antes de que alguien lo use

<div class="grid-2">

<div class="card accent-azul"><strong>Antes del commit</strong><p>git status y git diff --staged · ¿hay un .env o una llave?</p></div>
<div class="card accent-verde"><strong>En cada push</strong><p>El pipeline revisa todo el historial con una herramienta de detección de secretos</p></div>

</div>

```text
Finding:  DB_PASSWORD=REDACTED
File:     config/database.php
Commit:   3f2a1b0
```

<p class="small">STD-SEC-03 · salida ilustrativa con el secreto ocultado</p>

## Configuración insegura

<div class="grid-2">

<div class="card accent-rojo"><strong>APP_DEBUG=true</strong><p>El 500 muestra archivos líneas y datos de conexión</p></div>
<div class="card accent-verde"><strong>APP_DEBUG=false</strong><p>El cliente recibe un mensaje genérico y el detalle queda en el log</p></div>

</div>

<div class="callout-alcance">

APP_DEBUG=true solo en tu máquina · en cualquier otro ambiente APP_ENV=production y APP_DEBUG=false

</div>

## OWASP Top 10:2025

| | | | |
| --- | --- | --- | --- |
| A01 Broken Access Control | A02 Security Misconfiguration | A03 Software Supply Chain Failures | A04 Cryptographic Failures |
| A05 Injection | A06 Insecure Design | A07 Authentication Failures | A08 Software or Data Integrity Failures |
| A09 Security Logging and Alerting Failures | A10 Mishandling of Exceptional Conditions | | |

<p class="small">top10.owasp.org/2025 consultado 2026-10-20 · el estándar del proyecto aún cita la edición 2021</p>

## Las cuatro del programa

<div class="grid-2">

<div class="card accent-rojo"><strong>Inyección</strong><p>A05 · datos del usuario dentro del SQL</p></div>
<div class="card accent-dorado"><strong>Exposición de información</strong><p>A01 A02 A10 · datos ajenos o detalles internos</p></div>
<div class="card accent-azul"><strong>Configuraciones inseguras</strong><p>A02 · debug abierto o CORS sin control</p></div>
<div class="card accent-verde"><strong>Dependencias vulnerables</strong><p>A03 · composer audit</p></div>

</div>

<div class="callout-alcance">

A10 es exactamente el tema de manejo de errores · un error mal controlado también es una vulnerabilidad

</div>

## Inyección en una línea

```php
// Vulnerable
DB::select("SELECT * FROM equipos WHERE nombre = '{$request->nombre}'");

// Seguro
Equipo::where('nombre', $request->validated('nombre'))->get();
```

<div class="callout">

Con <code>x' OR '1'='1</code> la primera consulta devuelve todo

</div>

<p class="small">Actividad A6 — mapa de amenazas de tu proyecto</p>

## Relación con el laboratorio

<div class="callout">

Este tema se practica en el [Laboratorio 4 — Desarrollo seguro](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-4-desarrollo-seguro/).

</div>

## Qué sigue

Continúa con [8. Integración continua](/materias/taller-integrador/bloque-03/08-integracion-continua/).
