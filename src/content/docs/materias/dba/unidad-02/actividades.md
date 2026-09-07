---
title: "Actividades — Unidad 2"
description: "Enunciados de las 8 actividades de la Unidad 2 de DBA, incluida la evidencia oficial."
---

> A partir de la Actividad 2 se trabaja sobre contenedores Docker con
> PostgreSQL (`postgres:16`) y/o MongoDB (`mongo:7`).
>
> ⚠️ **Regla de seguridad para todas las actividades:** nunca usar
> credenciales, llaves ni datos personales reales. Usar siempre valores de
> ejemplo (marcados como `<REDACTED>` en este documento) y datos
> ficticios.

## Actividad 1 — Diagnóstico de riesgos del entorno sin protección

**Objetivo específico:** insumo para OE-U2.1–OE-U2.6. **Modalidad:**
individual o grupal.

### Instrucciones para el estudiante

A partir de la situación descrita en el manual del estudiante (entorno sin
control de acceso, sin cifrado, sin clasificación de datos, con
configuración por defecto), identifica por escrito qué riesgos concretos
existen y a qué principio o mecanismo de la unidad correspondería
resolver cada uno.

### Producto/evidencia

Registro breve de riesgos identificados.

### Criterio de logro

El estudiante identifica al menos tres riesgos distintos (por ejemplo:
acceso sin control, datos sin cifrar, configuración por defecto) sin
necesidad todavía de vocabulario técnico preciso.

## Actividad 2 — Principios de seguridad e inyección (laboratorio)

**Objetivo específico:** OE-U2.1. **Modalidad:** demostración guiada +
práctica individual.

### Entorno

Contenedor PostgreSQL:

```bash
docker run --name dba-postgres-act2 \
  -e POSTGRES_PASSWORD=<REDACTED> \
  -e POSTGRES_DB=practica \
  -p 5432:5432 \
  -d postgres:16
```

### Preparación

Crear una tabla de ejemplo con datos ficticios:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  clave_acceso TEXT
);

INSERT INTO usuarios (nombre, clave_acceso) VALUES
  ('usuario_demo', 'clave_demo');
```

### Instrucciones para el estudiante

1. El docente demuestra una consulta construida por concatenación de
   texto (representada aquí en pseudocódigo de aplicación, no en SQL
   puro, ya que la concatenación ocurre en el código de la aplicación que
   arma la consulta):

   ```text
   consulta = "SELECT * FROM usuarios WHERE nombre = '" + entrada + "'"
   ```

   Prueba qué ocurre si `entrada` es un nombre válido, y qué ocurre si
   `entrada` es `' OR '1'='1`.

2. Reescribe la misma consulta como una consulta parametrizada (usando el
   cliente `psql` con una consulta preparada, o simulando el parámetro
   vinculado) y repite la prueba con la misma entrada maliciosa.

3. Documenta la diferencia de comportamiento entre ambos casos.

### Producto/evidencia

Comparación documentada (capturas o transcripción) de ambos casos, con
explicación de por qué la versión parametrizada no es vulnerable.

### Criterio de logro

El estudiante reproduce correctamente ambos casos y explica, sin copiar
literalmente el manual, por qué la parametrización evita que la entrada
altere la lógica de la consulta.

## Actividad 3 — Matriz de usuarios, roles y permisos (laboratorio, evidencia oficial — parte 1)

**Objetivo específico:** OE-U2.2. **Modalidad:** individual o pareja.

### Entorno

Contenedor PostgreSQL (reutilizar el de la Actividad 2 o crear uno nuevo)
y contenedor MongoDB:

```bash
docker run --name dba-mongo-act3 \
  -e MONGO_INITDB_ROOT_USERNAME=<REDACTED> \
  -e MONGO_INITDB_ROOT_PASSWORD=<REDACTED> \
  -p 27017:27017 \
  -d mongo:7 --auth
```

### Instrucciones para el estudiante

1. En PostgreSQL, crea al menos tres roles con distinto nivel de
   privilegio sobre la tabla `usuarios` de la Actividad 2:

   ```sql
   CREATE ROLE lector WITH LOGIN PASSWORD '<REDACTED>';
   GRANT SELECT ON usuarios TO lector;

   CREATE ROLE editor WITH LOGIN PASSWORD '<REDACTED>';
   GRANT SELECT, INSERT, UPDATE ON usuarios TO editor;

   CREATE ROLE administrador WITH LOGIN PASSWORD '<REDACTED>' SUPERUSER;
   ```

2. En MongoDB, conéctate como el usuario administrador inicial y crea al
   menos dos usuarios con roles integrados distintos (por ejemplo,
   `read` y `readWrite` sobre una base de datos de práctica), usando
   `db.createUser()`.

3. Documenta ambos motores en una sola matriz: usuario/rol, motor,
   permisos otorgados, propósito.

### Producto/evidencia

Matriz de usuarios/roles/permisos (primera mitad de la evidencia oficial
de la unidad, se completará en la Actividad 8).

### Criterio de logro

El estudiante crea correctamente al menos tres niveles de privilegio
diferenciados en PostgreSQL y al menos dos en MongoDB, y la matriz
documenta con precisión qué puede hacer cada rol.

## Actividad 4 — Clasificación y enmascaramiento de datos sensibles

**Objetivo específico:** OE-U2.3. **Modalidad:** individual o pareja.

### Preparación

Tabla de ejemplo con datos **ficticios** (nunca reales):

```sql
CREATE TABLE clientes_demo (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  correo TEXT,
  identificador_ficticio TEXT
);

INSERT INTO clientes_demo (nombre, correo, identificador_ficticio) VALUES
  ('Persona Ejemplo', 'ejemplo@correo-demo.test', 'ABCD123456XYZ');
```

### Instrucciones para el estudiante

1. Clasifica cada columna de `clientes_demo` como "dato personal", "dato
   sensible" o "no sensible", justificando brevemente cada decisión.
2. Aplica una técnica simple de enmascaramiento a la columna
   `identificador_ficticio`, mostrando solo los últimos 4 caracteres:

   ```sql
   SELECT nombre,
          CONCAT('****', RIGHT(identificador_ficticio, 4)) AS identificador_enmascarado
   FROM clientes_demo;
   ```

3. Explica si esta técnica es enmascaramiento, seudonimización o
   anonimización, y por qué.

### Producto/evidencia

Tabla de clasificación + consulta y resultado del dato enmascarado +
justificación del tipo de técnica aplicada.

### Criterio de logro

La clasificación es razonable y justificada, el enmascaramiento funciona
correctamente, y el estudiante identifica correctamente que este ejemplo es
enmascaramiento (no es reversible con una llave, por lo que no es
seudonimización en sentido estricto).

## Actividad 5 — Cifrado en tránsito y en reposo (laboratorio)

**Objetivo específico:** OE-U2.4. **Modalidad:** individual o pareja.

### Instrucciones para el estudiante

**Parte A — Cifrado en tránsito.** Verifica, usando el cliente `psql`, si
la conexión al contenedor PostgreSQL está usando SSL/TLS:

```sql
SHOW ssl;
-- o, ya conectado:
\conninfo
```

Si el contenedor no tiene SSL habilitado por defecto (`SHOW ssl;`
devuelve `off`), documenta ese estado como punto de partida ("antes") y
sigue este procedimiento para habilitarlo sobre el mismo contenedor
`dba-postgres-act2`:

**1. Prerrequisito.** Tener `openssl` disponible en el equipo anfitrión
(la imagen oficial `postgres:16` no lo incluye).

**2. Generar un certificado autofirmado en el equipo anfitrión:**

```bash
openssl req -new -x509 -days 365 -nodes -text \
  -out server.crt -keyout server.key \
  -subj "/CN=localhost"
chmod 600 server.key
```

**3. Copiar el certificado y la llave al directorio de datos del
contenedor** (PostgreSQL busca `server.crt`/`server.key` ahí por
defecto):

```bash
docker cp server.crt dba-postgres-act2:/var/lib/postgresql/data/server.crt
docker cp server.key dba-postgres-act2:/var/lib/postgresql/data/server.key
docker exec dba-postgres-act2 chown postgres:postgres \
  /var/lib/postgresql/data/server.crt /var/lib/postgresql/data/server.key
docker exec dba-postgres-act2 chmod 600 \
  /var/lib/postgresql/data/server.key
```

**4. Habilitar SSL y recargar la configuración** (el parámetro `ssl`
tiene contexto `sighup`: no requiere reiniciar el contenedor, basta con
recargar):

```sql
ALTER SYSTEM SET ssl = on;
SELECT pg_reload_conf();
```

**5. Conectar usando TLS explícitamente** desde el equipo anfitrión:

```bash
psql "host=localhost port=5432 dbname=practica user=postgres sslmode=require"
```

**6. Verificar y documentar el estado "después":**

```sql
SHOW ssl;
\conninfo
```

Resultado esperado: `SHOW ssl;` devuelve `on`, y `\conninfo` incluye una
línea adicional del tipo `SSL connection (protocol: TLSv1.3, cipher:
..., compression: off)`. Si esa línea no aparece, la conexión particular
no está cifrada aunque el servidor lo permita — depende de que el
cliente la solicite (`sslmode=require` o superior).

**7. Cierre.** No es necesario revertir el cambio: el contenedor de esta
unidad es desechable.

**Parte B — Cifrado en reposo.** Habilita la extensión `pgcrypto` y cifra
el valor de una columna sensible:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE datos_protegidos (
  id SERIAL PRIMARY KEY,
  dato_cifrado BYTEA
);

INSERT INTO datos_protegidos (dato_cifrado)
VALUES (pgp_sym_encrypt('valor-de-ejemplo', '<REDACTED-KEY>'));

-- Mostrar que el valor almacenado no es legible directamente:
SELECT dato_cifrado FROM datos_protegidos;

-- Descifrar usando la misma llave:
SELECT pgp_sym_decrypt(dato_cifrado, '<REDACTED-KEY>') FROM datos_protegidos;
```

### Producto/evidencia

Evidencia del estado de la conexión (antes/después si aplica) + evidencia
de que el valor cifrado no es legible sin la llave, y que sí lo es con
ella.

### Criterio de logro

El estudiante verifica correctamente el estado de cifrado en tránsito, y
demuestra que `pgcrypto` protege el valor en reposo (el valor crudo en
`dato_cifrado` no es texto legible).

## Actividad 6 — Trazabilidad control → obligación legal

**Objetivo específico:** OE-U2.5. **Modalidad:** individual o grupal.

### Instrucciones para el estudiante

Para cada control implementado en las Actividades 3 a 5 (control de
acceso, clasificación/enmascaramiento, cifrado), identifica qué principio
o disposición de la LFPDPPP y/o la LGPDPPSO respalda su necesidad (por
ejemplo: minimización de datos, seguridad de los datos personales,
derechos ARCO). Construye una tabla control → obligación legal.

### Producto/evidencia

Tabla control → obligación legal.

### Criterio de logro

El estudiante conecta correctamente al menos tres controles técnicos con
un principio o derecho del marco normativo mexicano (manual del
estudiante, sección 9), sin necesidad de citar artículos específicos de
la ley.

## Actividad 7 — Checklist de hardening (laboratorio, antes/después)

**Objetivo específico:** OE-U2.6. **Modalidad:** individual o pareja.

### Entorno

Un contenedor PostgreSQL o MongoDB recién creado, con configuración por
defecto (sin los cambios de las actividades anteriores).

### Checklist de referencia (provisto por el docente)

| Elemento | Estado por defecto | Cambio de hardening propuesto |
| --- | --- | --- |
| Conexiones remotas aceptadas | Amplias / sin restricción de origen | Restringir `pg_hba.conf` a rangos de red específicos |
| Escucha en todas las interfaces de red | Sí (`listen_addresses = '*'` o equivalente) | Limitar a las interfaces necesarias |
| Extensiones o funciones no utilizadas | Pueden estar instaladas | Eliminar/deshabilitar las que no se usan |
| Cuenta administrativa | Con nombre y privilegios por defecto | Revisar/renombrar y aplicar contraseña robusta de práctica |
| Puerto expuesto públicamente | Publicado directamente (`-p 5432:5432`) | Restringir a red interna/Docker cuando sea posible |

### Instrucciones para el estudiante

1. Documenta el estado "por defecto" del contenedor para cada elemento
   del checklist.
2. Aplica al menos tres cambios de endurecimiento de la tabla anterior (o
   equivalentes justificados).
3. Documenta el estado "después" para cada uno, y explica qué riesgo
   concreto reduce cada cambio.

### Producto/evidencia

Checklist completado con estado "antes" y "después", y justificación de
cada cambio.

### Criterio de logro

El estudiante documenta correctamente al menos tres cambios de
hardening reales (verificables en la configuración del contenedor, no
solo declarados) y justifica cada uno con el riesgo que mitiga.

## Actividad 8 — Matriz de usuarios, roles, permisos y controles de privacidad (cierre, evidencia oficial completa)

**Objetivo específico:** síntesis de OE-U2.1–OE-U2.6. **Modalidad:**
individual o pareja.

Esta es la **evidencia oficial de la Unidad 2**.

### Instrucciones para el estudiante

Consolida, en un solo documento, la matriz de la Actividad 3, ampliada
con:

1. Para cada rol: qué datos sensibles puede ver (retomando la
   clasificación de la Actividad 4) y si esos datos están enmascarados o
   cifrados para ese rol.
2. Qué obligación normativa (Actividad 6) respalda cada control.
3. Un resumen del estado de hardening del servidor (Actividad 7).

### Producto/evidencia

Matriz de usuarios, roles, permisos y controles de privacidad (evidencia
oficial de la unidad).

### Criterio de logro

La matriz integra correctamente control de acceso, protección de datos
sensibles, respaldo normativo y estado de hardening, de forma coherente
con lo trabajado en las actividades 3 a 7 (no información genérica ni
copiada del manual sin adaptar).

## Resumen de trazabilidad de actividades

| Actividad | Objetivo específico | Evidencia |
| --- | --- | --- |
| 1 — Diagnóstico de riesgos | Insumo OE-U2.1–OE-U2.6 | Registro de riesgos |
| 2 — Principios de seguridad e inyección | OE-U2.1 | Comparación inyección vs. parametrizada |
| 3 — Matriz de usuarios/roles/permisos | OE-U2.2 | Matriz parcial |
| 4 — Clasificación y enmascaramiento | OE-U2.3 | Tabla de clasificación + dato enmascarado |
| 5 — Cifrado en tránsito y en reposo | OE-U2.4 | Evidencia de cifrado |
| 6 — Trazabilidad control → obligación legal | OE-U2.5 | Tabla control → obligación |
| 7 — Checklist de hardening | OE-U2.6 | Checklist antes/después |
| 8 — Matriz completa | Síntesis OE-U2.1–OE-U2.6 | Evidencia oficial de la unidad |

Ninguna actividad usa datos personales reales ni credenciales reales (ver
advertencia de seguridad al inicio de este documento). Ninguna introduce
contenido de las Unidades III en adelante.
