---
title: "Presentación — Unidad 3"
description: "Unidad 3 de DBA — objetivos, caso de la unidad, pregunta central y preparación del trabajo con el gestor."
---

## Objetivos de la unidad

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">Objetivo 1</span>
<strong>Eventos auditables</strong>
<p>Explicar el propósito de la auditoría e identificar qué debe registrarse</p>
</div>

<div class="card accent-dorado">
<span class="badge">Objetivo 2</span>
<strong>Registro en un SGBD real</strong>
<p>Configurar e interpretar accesos, privilegios y cambios de estructura</p>
</div>

<div class="card accent-verde">
<span class="badge">Objetivo 3</span>
<strong>Bitácoras</strong>
<p>Consultar, interpretar y conservar bitácoras</p>
</div>

<div class="card accent-rojo">
<span class="badge">Objetivo 4</span>
<strong>Políticas prácticas</strong>
<p>Redactar reglas verificables de acceso, respaldo, retención y cambios</p>
</div>

<div class="card accent-azul">
<span class="badge">Objetivo 5</span>
<strong>Gobierno práctico</strong>
<p>Construir propietarios, catálogo y diccionario de datos</p>
</div>

<div class="card accent-dorado">
<span class="badge">Evidencia final</span>
<strong>Expediente de auditoría</strong>
<p>Configuración de auditoría con bitácora interpretada</p>
</div>

</div>

## De la Unidad 2 a la Unidad 3

<div class="banner-node">

En la Unidad 2 decidimos **quién puede** hacer qué. Ahora necesitamos demostrar **qué ocurrió realmente**.

</div>

<div class="grid-2">

<div class="card accent-azul"><strong>Unidad 2: control de acceso</strong><p>Usuarios, roles, privilegios, cifrado, hardening. Actúa <b>antes</b> de la operación: permite o niega.</p></div>
<div class="card accent-dorado"><strong>Unidad 3: auditoría</strong><p>Bitácoras, auditoría del dato, políticas y responsables. Actúa <b>durante y después</b>: registra, sea o no autorizado.</p></div>

</div>

<div class="callout">

Una cuenta con privilegio legítimo de `UPDATE` puede cambiar un dato por error o por abuso. El control de acceso no lo detecta, porque la operación está permitida.

</div>

## El caso de la unidad

<div class="banner-node">

**Comercializadora Norte S.A. de C.V.**, la misma empresa ficticia de los laboratorios de la Unidad 2. Tabla `clientes` en PostgreSQL y colección `comercial.clientes` en MongoDB.

</div>

> El RFC de **María García** (`id = 3`) aparece modificado en un reporte de facturación.

<div class="grid-3">

<div class="card accent-rojo"><strong>¿Quién?</strong><p><code>app_ventas</code> tiene <code>UPDATE</code>. También el DBA. ¿Alguien más?</p></div>
<div class="card accent-dorado"><strong>¿Cuándo y desde dónde?</strong><p>¿Qué aplicación, qué equipo, a qué hora?</p></div>
<div class="card accent-azul"><strong>¿Qué valor tenía?</strong><p>Sin el valor anterior, facturación no puede corregirlo</p></div>

</div>

## La pregunta de la unidad

<div class="banner-node">

**¿Cómo se demuestra, con evidencia verificable, qué ocurrió en una base de datos y quién es responsable de qué?**

</div>

```text
CONTROL DE ACCESO (Unidad 2)            "¿quién PUEDE?"
        │
        ▼
AUDITORÍA Y TRAZABILIDAD                "¿qué OCURRIÓ?"
   ┌────┼──────────────┐
   ▼    ▼              ▼
eventos  bitácoras     políticas prácticas
   └──────────┬────────┘
              ▼
   GOBIERNO PRÁCTICO DE DATOS            "¿quién RESPONDE?"
              ▼
   EVIDENCIAS PARA AUDITORÍA INTERNA
```

## Actividad 1: Diagnóstico

<div class="banner-node">

La base de datos ya tiene usuarios, roles y privilegios configurados como en la Unidad 2.

</div>

1. ¿Por qué ese control de acceso no permite responder quién cambió el RFC?
2. ¿Qué tendría que haber existido **antes** del cambio para poder responder?
3. ¿A quién le corresponde decidir cuál es el RFC correcto?

<div class="callout">

Registra tus ideas previas. Las retomaremos al final de la unidad.

</div>

## El gestor primero, el despliegue después

Un mismo servidor PostgreSQL o MongoDB puede estar instalado de varias formas. Las instrucciones del **gestor** son las mismas en todas.

| Despliegue | Qué cambia | Qué no cambia |
| --- | --- | --- |
| Instalación nativa (Linux, macOS, Windows) | Cómo se inicia y reinicia el servicio, rutas de archivos | SQL, `psql`, `mongosh`, parámetros del motor |
| Máquina virtual | La dirección del servidor | Lo mismo |
| Contenedor | Cómo se abre una terminal y se reinicia | Lo mismo |
| Servicio administrado en la nube (DBaaS) | Los parámetros y las bitácoras se gestionan desde la consola del proveedor | Los conceptos: qué registrar, cómo interpretarlo, cuánto conservarlo |

<div class="callout">

En esta unidad aprenderás a preguntarle al **propio motor** dónde está su configuración y su bitácora, en lugar de depender de cómo se instaló.

</div>

## Dos tipos de sesión con `psql`

<div class="grid-2">

<div class="card accent-azul"><strong>Sesión de administrador</strong><p>Configura el servidor y lee la bitácora.<br><code>psql -U postgres -d comercial</code><br>En algunos despliegues se abre de otra forma, por ejemplo <code>sudo -u postgres psql</code> en Linux.</p></div>
<div class="card accent-dorado"><strong>Sesión por red</strong><p>Simula a la aplicación y a los usuarios, que entran con contraseña. Es idéntica en cualquier despliegue.</p></div>

</div>

```bash
psql "postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web" -c "SELECT 1"
```

<div class="callout-alcance">

Las contraseñas son de práctica. En las evidencias se sustituyen por `<REDACTED>`.

</div>

## La cadena de conexión, pieza por pieza

```text
postgresql://app_ventas:Ventas_Practica_2026@127.0.0.1/comercial?application_name=app-ventas-web
```

| Parte | Significado |
| --- | --- |
| `postgresql://` | Protocolo de PostgreSQL |
| `app_ventas:Ventas_Practica_2026@` | Usuario (rol) y contraseña |
| `127.0.0.1` | Servidor. Al usar una dirección, la conexión viaja por TCP y se evalúan las reglas `host` de `pg_hba.conf` |
| `/comercial` | Base de datos |
| `?application_name=...` | Nombre de la aplicación que verá el servidor (`%a` en la bitácora) |
| `-c "..."` | Ejecuta esa sentencia y termina. Cada `-c` es una sentencia |

<div class="callout">

La misma cadena funciona en Bash, Zsh y PowerShell. Si el servidor está en otro equipo, solo cambia `127.0.0.1`. En producción la contraseña no va en la cadena: proviene de `.pgpass` o de un gestor de secretos (Unidad 2).

</div>

## Preguntarle al motor por su instalación

```sql
SELECT version();
SHOW data_directory;
SHOW config_file;
SHOW hba_file;
```

```text
 PostgreSQL 16.14 (Debian 16.14-1.pgdg13+1) on x86_64-pc-linux-gnu, ...
 /var/lib/postgresql/data
 /var/lib/postgresql/data/postgresql.conf
 /var/lib/postgresql/data/pg_hba.conf
```

<div class="callout-alcance">

Dentro de `psql`, las órdenes que empiezan con `\` (`\q`, `\x`, `\password`) son **metacomandos**: los ejecuta el cliente, no el servidor.

</div>

<span class="fuente">Las rutas dependen del despliegue. Las consultas son las mismas en todos</span>

## Temas de la unidad

1. [Auditoría de bases de datos](/materias/dba/unidad-03/01-auditoria-de-bases-de-datos/)
2. [Bitácoras en PostgreSQL](/materias/dba/unidad-03/02-bitacoras-en-postgresql/)
3. [Auditoría del dato](/materias/dba/unidad-03/03-auditoria-del-dato/)
4. [Trazabilidad en MongoDB Community](/materias/dba/unidad-03/04-trazabilidad-en-mongodb/)
5. [Conservación e interpretación de bitácoras](/materias/dba/unidad-03/05-conservacion-e-interpretacion-de-bitacoras/)
6. [Políticas prácticas de datos](/materias/dba/unidad-03/06-politicas-practicas-de-datos/)
7. [Gobierno práctico de datos](/materias/dba/unidad-03/07-gobierno-practico-de-datos/)
8. [Cierre de la unidad](/materias/dba/unidad-03/08-cierre-de-la-unidad/)
