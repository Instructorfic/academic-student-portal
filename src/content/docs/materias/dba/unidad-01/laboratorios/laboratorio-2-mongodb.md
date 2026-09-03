---
title: "Laboratorio 2 · Observación del modelo documental (MongoDB)"
description: "Unidad 1 de DBA. Laboratorio de observación, apoyo visual a la Actividad 6."
---

> **Alcance, leer antes de usar esta guía.** La Unidad 1 es
> **predominantemente conceptual**: si dispones de un SGBD instalado,
> este **solo puede usarse para observar, no configurar, ** elementos de
> arquitectura, como apoyo visual a la Actividad 6, **no como práctica
> evaluada**. Esta guía es un **complemento visual opcional**, no un
> laboratorio que amplíe la evidencia oficial de la unidad. No se asigna
> calificación a lo que se haga aquí.

## 0. Antes de empezar

### 0.1 ¿Qué es Docker, en dos frases?

Si ya viste esto en la materia de Contenedores y Cloud Native, esto es
solo un repaso operativo, no contenido nuevo. **Docker** permite ejecutar
un programa dentro de un **contenedor**: un paquete aislado, desechable,
que no modifica el resto de tu computadora. En esta guía usamos Docker
para ejecutar MongoDB **sin instalarlo directamente en tu equipo**.

### 0.2 Glosario mínimo de esta guía

| Término | En una frase |
| --- | --- |
| **Imagen** | La "plantilla" descargada de un programa (por ejemplo, `mongo:7`). |
| **Contenedor** | Una copia en ejecución de una imagen. |
| `docker run` | Crea y arranca un contenedor nuevo a partir de una imagen. |
| `docker exec` | Ejecuta un comando **dentro** de un contenedor que ya está corriendo. |
| `-d` | "*Detached*": el contenedor corre en segundo plano. |
| `--name` | Le da un nombre fijo al contenedor. |

### 0.3 Verifica que Docker está instalado y funcionando

**Paso 1.**

```bash
docker --version
```

**Si ves** `docker: command not found`: instálalo desde
<https://docs.docker.com/get-docker/>.

**Paso 2.**

```bash
docker run hello-world
```

**Si ves** `Cannot connect to the Docker daemon`: abre Docker Desktop, o
`sudo systemctl start docker` (Linux).

Si el paso 2 funcionó, ya estás listo para el resto de esta guía.

### 0.4 Qué vamos a hacer (mapa de la guía)

1. Levantar un MongoDB de práctica.
2. Insertar un documento de ejemplo y observar su estructura flexible,
 sin esquema fijo (ver
 [Arquitectura en SGBD NoSQL](/materias/dba/unidad-01/05-arquitectura-nosql/)).
3. Borrar todo (limpieza), sin dejar nada instalado.

### 0.5 Recordatorio de alcance

* Contenedor **temporal, desechable**, sin datos reales ni de producción.
* Corresponde a la [Actividad 6](/materias/dba/unidad-01/actividades/actividad-6/)
, apoyo visual, no la sustituye.
* Motor usado: **MongoDB**, imagen oficial de Docker Hub. Esta unidad no
 despliega Redis, Cassandra ni Neo4j (mencionados solo como ejemplos
 conceptuales de los otros tres modelos NoSQL).

## 1. Observar la arquitectura de un SGBD NoSQL documental (MongoDB)

### 1.1 Levantar un contenedor temporal de MongoDB

```bash
docker run --name dba-u1-mongo -d mongo:7
```

### 1.2 Conectarse con `mongosh`

```bash
docker exec -it dba-u1-mongo mongosh
```

**Qué deberías ver:** tu terminal cambia a algo como `test>`, ya estás
**dentro** de `mongosh`.

### 1.3 Observar las bases de datos existentes

```javascript
show dbs
```

**Qué deberías ver** (deben aparecer estas tres bases, tamaños variables):

```text
admin 8.00 KiB
config 12.00 KiB
local 8.00 KiB
```

Estas tres bases las crea MongoDB automáticamente al iniciar.

### 1.4 Insertar un documento de ejemplo y observar su estructura

```javascript
use dba_observacion
db.ejemplo.insertOne({
  nombre: "Servidor de práctica",
  ambiente: "laboratorio",
  etiquetas: ["observacion", "unidad01"]
})
```

**Qué deberías ver**, al ejecutar `insertOne(...)`:

```text
{
  acknowledged: true,
  insertedId: ObjectId('66f1a2b3c4d5e6f7a8b9c0d1')
}
```

El valor exacto dentro de `ObjectId(...)` será distinto en tu pantalla.
Lo importante es ver `acknowledged: true`.

### 1.5 Observar las colecciones y el documento insertado

```javascript
show collections
```

```javascript
db.ejemplo.find()
```

**Qué deberías ver:**

```text
[
  {
  _id: ObjectId('66f1a2b3c4d5e6f7a8b9c0d1'),
  nombre: 'Servidor de práctica',
  ambiente: 'laboratorio',
  etiquetas: [ 'observacion', 'unidad01' ]
  }
]
```

> A diferencia de una fila de una tabla relacional (ver el
> [Laboratorio 1](/materias/dba/unidad-01/laboratorios/laboratorio-1-postgresql/)),
> este documento no tiene un esquema fijo impuesto por el motor: campos
> como `etiquetas` (un arreglo) no tendrían equivalente directo en una
> columna simple de una tabla relacional. Esta diferencia es exactamente
> lo que la Actividad 6 pide comparar.

### 1.6 Salir de `mongosh`

```javascript
exit
```

### Qué debe registrar el estudiante (apoyo visual, no evidencia evaluada)

Una captura de pantalla o transcripción breve de los pasos 1.3 a 1.5, como
referencia real al elaborar la tabla comparativa de la Actividad 6, no
se entrega como evidencia independiente.

## 2. Limpieza del entorno

```bash
docker rm -f dba-u1-mongo
```

Tu computadora queda exactamente igual que antes de empezar esta guía.

## 3. Recordatorio de evaluación

Esta guía **no genera una evidencia evaluada de la Unidad 1**. La
evidencia oficial sigue siendo la
[Actividad 7](/materias/dba/unidad-01/actividades/actividad-7/), que
puede resolverse sin haber ejecutado este laboratorio.

## 4. Problemas frecuentes

| Problema | Causa probable | Solución |
| --- | --- | --- |
| `docker: command not found` | Docker no está instalado | Instalar desde <https://docs.docker.com/get-docker/> |
| `Cannot connect to the Docker daemon` | Docker no está corriendo | Abrir Docker Desktop, o `sudo systemctl start docker` |
| `permission denied` | Falta permiso de tu usuario | Usar `sudo`, o unirte al grupo `docker` |
| `port is already allocated` / contenedor ya existe | Ya ejecutaste el paso 1.1 antes | `docker rm -f dba-u1-mongo` y repetir |
| `mongosh` no se reconoce | Imagen de MongoDB anterior a la versión 6 | Usar `mongo:7` (paso 1.1) |
| No sabes cómo salir | `mongosh` tiene su propio comando de salida | `exit` |
