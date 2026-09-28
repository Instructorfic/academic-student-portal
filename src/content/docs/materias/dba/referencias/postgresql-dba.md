---
title: "Referencia DBA PostgreSQL"
description: "Gestión de Seguridad y Desempeño de Bases de Datos — Guía de consulta de comandos de PostgreSQL 16 para administración, seguridad, control de acceso, diagnóstico, rendimiento, mantenimiento y respaldo."
---

> Guía de consulta rápida para la materia **Gestión de Seguridad y Desempeño de Bases de Datos**.

**Motor:** PostgreSQL 16
**Enfoque:** administración, seguridad, control de acceso, diagnóstico, rendimiento, mantenimiento y continuidad.

---

### 1. Propósito de esta referencia

Este documento reúne instrucciones y comandos básicos que un administrador de bases de datos puede utilizar para:

* Administrar PostgreSQL
* Consultar información del servidor
* Crear y administrar bases de datos
* Administrar usuarios y roles
* Aplicar mínimo privilegio
* Revisar permisos
* Analizar sesiones y bloqueos
* Analizar consultas
* Administrar índices
* Realizar mantenimiento
* Realizar respaldos y restauraciones
* Revisar configuraciones de seguridad
* Diagnosticar problemas básicos de desempeño

La lista no pretende sustituir la documentación oficial de PostgreSQL. Su objetivo es servir como **guía de consulta para las prácticas de la materia**.

---

## 2. Acceder a PostgreSQL

### 2.1 Conectarse con `psql`

```bash
psql -U postgres
```

Conectarse a una base de datos específica:

```bash
psql -U postgres -d mi_base
```

Indicar servidor y puerto:

```bash
psql -h localhost -p 5432 -U postgres -d mi_base
```

Solicitar contraseña:

```bash
psql -h localhost -p 5432 -U usuario -d mi_base -W
```

#### ¿Para qué sirve?

Permite establecer una sesión con PostgreSQL utilizando el cliente de línea de comandos `psql`.

---

## 3. Comandos básicos de `psql`

Los comandos que comienzan con `\` son instrucciones propias de `psql`, no SQL estándar.

### 3.1 Listar bases de datos

```text
\l
```

o:

```text
\list
```

### 3.2 Conectarse a otra base

```text
\c nombre_base
```

### 3.3 Mostrar usuario actual

```text
SELECT current_user;
```

### 3.4 Mostrar base de datos actual

```text
SELECT current_database();
```

### 3.5 Mostrar servidor

```text
SELECT version();
```

### 3.6 Listar esquemas

```text
\dn
```

### 3.7 Listar tablas

```text
\dt
```

### 3.8 Describir una tabla

```text
\d usuarios
```

Más información:

```text
\d+ usuarios
```

### 3.9 Listar roles

```text
\du
```

### 3.10 Ver ayuda

```text
\?
```

Ayuda sobre SQL:

```text
\h
```

Ayuda específica:

```text
\h CREATE ROLE
```

### 3.11 Salir

```text
\q
```

---

## 4. Bases de datos

### Crear una base

```sql
CREATE DATABASE sistema;
```

### Crear una base indicando propietario

```sql
CREATE DATABASE sistema
OWNER administrador;
```

### Eliminar una base

```sql
DROP DATABASE sistema;
```

> **Precaución:** Esta operación elimina la base de datos. No debe ejecutarse en una base productiva sin verificar previamente sus consecuencias.

Una base no puede eliminarse mientras existen conexiones activas hacia ella.

---

## 5. Esquemas

### Crear esquema

```sql
CREATE SCHEMA ventas;
```

### Crear esquema con propietario

```sql
CREATE SCHEMA ventas
AUTHORIZATION administrador;
```

### Listar esquemas

```text
\dn
```

### Eliminar esquema

```sql
DROP SCHEMA ventas;
```

Eliminar esquema y objetos contenidos:

```sql
DROP SCHEMA ventas CASCADE;
```

> **Precaución:** `CASCADE` puede eliminar objetos dependientes. Debe utilizarse con extrema precaución.

---

## 6. Tablas

### Crear tabla

```sql
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Consultar estructura

```text
\d usuarios
```

### Agregar columna

```sql
ALTER TABLE usuarios
ADD COLUMN telefono VARCHAR(20);
```

### Cambiar tipo

```sql
ALTER TABLE usuarios
ALTER COLUMN telefono TYPE VARCHAR(30);
```

### Eliminar columna

```sql
ALTER TABLE usuarios
DROP COLUMN telefono;
```

### Eliminar tabla

```sql
DROP TABLE usuarios;
```

Eliminar dependencias:

```sql
DROP TABLE usuarios CASCADE;
```

> **Precaución:** `DROP TABLE` elimina la estructura y los datos de la tabla.

---

## 7. CRUD

### INSERT

```sql
INSERT INTO usuarios (nombre, correo)
VALUES ('Ana López', 'ana@example.com');
```

### SELECT

```sql
SELECT *
FROM usuarios;
```

Seleccionar columnas específicas:

```sql
SELECT id, nombre, correo
FROM usuarios;
```

Filtrar:

```sql
SELECT *
FROM usuarios
WHERE activo = TRUE;
```

Ordenar:

```sql
SELECT *
FROM usuarios
ORDER BY nombre;
```

Limitar resultados:

```sql
SELECT *
FROM usuarios
LIMIT 10;
```

### UPDATE

```sql
UPDATE usuarios
SET activo = FALSE
WHERE id = 10;
```

> **Precaución:** Nunca ejecutar un `UPDATE` sin revisar previamente el `WHERE`.

### DELETE

```sql
DELETE FROM usuarios
WHERE id = 10;
```

> **Precaución:** Nunca ejecutar `DELETE` sin verificar el filtro.

---

## 8. Transacciones

Una transacción permite agrupar operaciones y confirmar o deshacer los cambios.

### Iniciar

```sql
BEGIN;
```

### Confirmar

```sql
COMMIT;
```

### Deshacer

```sql
ROLLBACK;
```

Ejemplo:

```sql
BEGIN;

UPDATE cuentas
SET saldo = saldo - 100
WHERE id = 1;

UPDATE cuentas
SET saldo = saldo + 100
WHERE id = 2;

COMMIT;
```

---

## 9. Usuarios y roles

PostgreSQL utiliza roles para representar usuarios y grupos de permisos.

### Crear rol

```sql
CREATE ROLE app_user
LOGIN
PASSWORD 'CAMBIAR_ESTA_CONTRASEÑA';
```

> Nunca utilizar contraseñas reales en código, repositorios o material compartido.

### Crear rol sin acceso de inicio de sesión

```sql
CREATE ROLE app_readonly;
```

Este tipo de rol puede utilizarse como grupo de permisos.

### Convertir un rol en usuario

```sql
ALTER ROLE app_user LOGIN;
```

### Cambiar contraseña

```sql
ALTER ROLE app_user
PASSWORD 'NUEVA_CONTRASEÑA';
```

### Deshabilitar acceso

```sql
ALTER ROLE app_user NOLOGIN;
```

### Eliminar rol

```sql
DROP ROLE app_user;
```

---

## 10. Principio de mínimo privilegio

Una aplicación no debería utilizar una cuenta administrativa.

Ejemplo de usuario de aplicación:

```sql
CREATE ROLE app_web
LOGIN
PASSWORD 'CAMBIAR_ESTA_CONTRASEÑA';
```

Permitir conexión:

```sql
GRANT CONNECT
ON DATABASE sistema
TO app_web;
```

Permitir uso del esquema:

```sql
GRANT USAGE
ON SCHEMA public
TO app_web;
```

Permitir consulta:

```sql
GRANT SELECT
ON usuarios
TO app_web;
```

Permitir inserción:

```sql
GRANT INSERT
ON usuarios
TO app_web;
```

No otorgar:

```sql
SUPERUSER
CREATEDB
CREATEROLE
```

salvo que exista una razón administrativa explícita.

---

## 11. GRANT

### Permitir SELECT

```sql
GRANT SELECT
ON usuarios
TO app_web;
```

### Permitir INSERT

```sql
GRANT INSERT
ON usuarios
TO app_web;
```

### Permitir UPDATE

```sql
GRANT UPDATE
ON usuarios
TO app_web;
```

### Permitir DELETE

```sql
GRANT DELETE
ON usuarios
TO app_web;
```

### Varios permisos

```sql
GRANT SELECT, INSERT
ON usuarios
TO app_web;
```

---

## 12. REVOKE

Eliminar permiso:

```sql
REVOKE DELETE
ON usuarios
FROM app_web;
```

Eliminar todos los permisos:

```sql
REVOKE ALL
ON usuarios
FROM app_web;
```

> La seguridad no consiste solamente en otorgar permisos. También implica revisar y retirar permisos innecesarios.

---

## 13. Privilegios sobre todas las tablas

Por ejemplo:

```sql
GRANT SELECT
ON ALL TABLES IN SCHEMA public
TO app_readonly;
```

Para secuencias:

```sql
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO app_web;
```

---

## 14. Privilegios predeterminados

Los privilegios predeterminados pueden establecerse para objetos creados posteriormente.

Ejemplo:

```sql
ALTER DEFAULT PRIVILEGES
IN SCHEMA public
GRANT SELECT ON TABLES
TO app_readonly;
```

> **Precaución:** Los privilegios predeterminados dependen del rol que crea los objetos. Es importante comprender este comportamiento antes de utilizarlos en ambientes reales.

---

## 15. Revisar permisos

En `psql`:

```text
\dp
```

También:

```text
\z
```

Consultar privilegios de una tabla:

```sql
SELECT *
FROM information_schema.role_table_grants
WHERE table_name = 'usuarios';
```

---

## 16. Sesiones activas

Consultar sesiones:

```sql
SELECT
    pid,
    usename,
    datname,
    client_addr,
    state,
    query
FROM pg_stat_activity;
```

Consultar solamente sesiones activas:

```sql
SELECT
    pid,
    usename,
    datname,
    state,
    query
FROM pg_stat_activity
WHERE state = 'active';
```

---

## 17. Identificar consultas de larga duración

```sql
SELECT
    pid,
    now() - query_start AS duracion,
    usename,
    state,
    query
FROM pg_stat_activity
WHERE query_start IS NOT NULL
ORDER BY duracion DESC;
```

Esto puede ayudar a detectar:

* consultas lentas
* transacciones prolongadas
* sesiones problemáticas
* posibles bloqueos

---

## 18. Bloqueos

Consultar información relacionada con bloqueos:

```sql
SELECT
    pid,
    usename,
    state,
    wait_event_type,
    wait_event,
    query
FROM pg_stat_activity
WHERE wait_event IS NOT NULL;
```

Los bloqueos deben analizarse antes de cancelar procesos.

---

## 19. Cancelar una consulta

```sql
SELECT pg_cancel_backend(12345);
```

El número corresponde al `pid`.

Si es necesario terminar una sesión:

```sql
SELECT pg_terminate_backend(12345);
```

> **Precaución:** Terminar una sesión puede provocar rollback de una transacción. Debe utilizarse después de identificar correctamente el proceso.

---

## 20. EXPLAIN

Permite conocer el plan de ejecución de una consulta.

```sql
EXPLAIN
SELECT *
FROM usuarios
WHERE correo = 'ana@example.com';
```

Una versión más detallada:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM usuarios
WHERE correo = 'ana@example.com';
```

> **Precaución:** `EXPLAIN ANALYZE` ejecuta realmente la consulta.

Para operaciones que modifican datos debe extremarse la precaución. En un laboratorio puede utilizarse una transacción controlada:

```sql
BEGIN;

EXPLAIN ANALYZE
UPDATE usuarios
SET activo = FALSE
WHERE id = 10;

ROLLBACK;
```

Aun así, funciones, triggers y otras acciones pueden producir efectos secundarios. No debe asumirse que `ROLLBACK` hace segura cualquier operación.

---

## 21. Índices

### Crear índice

```sql
CREATE INDEX idx_usuarios_correo
ON usuarios(correo);
```

### Índice único

```sql
CREATE UNIQUE INDEX idx_usuarios_correo_unique
ON usuarios(correo);
```

### Listar índices

```text
\di
```

### Eliminar índice

```sql
DROP INDEX idx_usuarios_correo;
```

Los índices pueden mejorar consultas, pero también tienen costos:

* espacio
* mantenimiento
* escrituras más costosas
* memoria
* tiempo de actualización

---

## 22. Estadísticas

Actualizar estadísticas:

```sql
ANALYZE usuarios;
```

Actualizar toda la base:

```sql
ANALYZE;
```

Las estadísticas ayudan al optimizador a seleccionar planes de ejecución.

---

## 23. VACUUM

Ejecutar:

```sql
VACUUM usuarios;
```

Con estadísticas:

```sql
VACUUM ANALYZE usuarios;
```

`VACUUM` ayuda a mantener las tablas después de actualizaciones y eliminaciones.

Importante:

> `VACUUM` normalmente hace que el espacio liberado pueda reutilizarse dentro de PostgreSQL. No significa necesariamente que el sistema operativo recupere ese espacio.

`VACUUM FULL` funciona de manera diferente:

```sql
VACUUM FULL usuarios;
```

Puede recuperar espacio para el sistema operativo, pero requiere una operación más costosa y puede bloquear la tabla.

---

## 24. Tamaño de bases de datos

```sql
SELECT
    pg_size_pretty(pg_database_size(current_database()));
```

Tamaño de una tabla:

```sql
SELECT
    pg_size_pretty(pg_total_relation_size('usuarios'));
```

Listar tamaños:

```sql
SELECT
    relname,
    pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

---

## 25. Configuración de PostgreSQL

Consultar un parámetro:

```sql
SHOW port;
```

```sql
SHOW listen_addresses;
```

```sql
SHOW max_connections;
```

```sql
SHOW ssl;
```

Consultar ubicación de archivos:

```sql
SHOW config_file;
```

```sql
SHOW hba_file;
```

Ver todos los parámetros:

```sql
SELECT name, setting
FROM pg_settings
ORDER BY name;
```

---

## 26. `postgresql.conf`

Archivo principal de configuración.

Algunos parámetros importantes:

```text
listen_addresses
port
max_connections
shared_buffers
work_mem
maintenance_work_mem
ssl
log_connections
log_disconnections
```

No deben modificarse valores de configuración sin comprender:

1. qué controla el parámetro
2. qué impacto tiene
3. qué valor existe actualmente
4. qué cambio se pretende realizar
5. cómo verificar el resultado
6. cómo regresar al estado anterior

---

## 27. `pg_hba.conf`

Controla la autenticación y acceso de clientes.

Consultar su ubicación:

```sql
SHOW hba_file;
```

Ejemplo conceptual:

```text
host    sistema    app_web    10.10.10.0/24    scram-sha-256
```

La interpretación general es:

```text
tipo    base    usuario    origen    método
```

Nunca debe abrirse PostgreSQL indiscriminadamente a Internet.

Evitar configuraciones como:

```text
0.0.0.0/0
```

salvo que exista una justificación de arquitectura, controles adicionales y conocimiento de las implicaciones.

---

## 28. TLS

Consultar:

```sql
SHOW ssl;
```

En ambientes reales, la protección de conexiones debe analizar:

* TLS
* certificados
* autenticación
* clientes autorizados
* cifrado
* administración de certificados

---

## 29. Backup lógico

Crear respaldo:

```bash
pg_dump -U postgres -d sistema -F c -f sistema.dump
```

Formato SQL:

```bash
pg_dump -U postgres -d sistema > sistema.sql
```

El formato personalizado `-F c` es útil para trabajar con `pg_restore`.

---

## 30. Restauración

Restaurar un archivo SQL:

```bash
psql -U postgres -d sistema < sistema.sql
```

Restaurar formato personalizado:

```bash
pg_restore -U postgres -d sistema sistema.dump
```

Listar contenido de un dump:

```bash
pg_restore -l sistema.dump
```

> Un respaldo no debe considerarse válido solamente porque el archivo existe. Debe probarse su restauración.

---

## 31. Diagnóstico básico

Ante un problema de PostgreSQL:

```text
1. ¿El servidor está disponible?
2. ¿La base responde?
3. ¿Hay conexiones?
4. ¿Hay consultas lentas?
5. ¿Hay bloqueos?
6. ¿Hay errores?
7. ¿Hay suficiente espacio?
8. ¿Los índices son adecuados?
9. ¿Las estadísticas están actualizadas?
10. ¿Hubo algún cambio reciente?
```

---

## 32. Comandos que requieren precaución

Los siguientes comandos pueden tener consecuencias importantes:

```sql
DROP DATABASE
DROP TABLE
DROP SCHEMA ... CASCADE
TRUNCATE
DELETE
UPDATE
ALTER ROLE ... SUPERUSER
REVOKE ALL
pg_terminate_backend(...)
VACUUM FULL
```

Antes de ejecutar una operación destructiva:

```text
Identificar → verificar → respaldar si aplica → ejecutar → comprobar → documentar
```

---

## 33. Checklist básico de seguridad PostgreSQL

#### Acceso

* [ ] No utilizar `postgres` como usuario de la aplicación
* [ ] Crear roles específicos
* [ ] Aplicar mínimo privilegio
* [ ] Revisar usuarios periódicamente
* [ ] Eliminar o deshabilitar cuentas innecesarias

#### Red

* [ ] No exponer PostgreSQL directamente a Internet
* [ ] Revisar `listen_addresses`
* [ ] Revisar `pg_hba.conf`
* [ ] Restringir redes autorizadas
* [ ] Utilizar TLS cuando corresponda

#### Privilegios

* [ ] Revisar `GRANT`
* [ ] Revisar `REVOKE`
* [ ] Evitar `SUPERUSER`
* [ ] Revisar privilegios predeterminados

#### Mantenimiento

* [ ] Revisar estadísticas
* [ ] Revisar índices
* [ ] Revisar sesiones
* [ ] Revisar bloqueos
* [ ] Revisar espacio

#### Continuidad

* [ ] Realizar respaldos
* [ ] Proteger los respaldos
* [ ] Probar restauraciones
* [ ] Definir RPO
* [ ] Definir RTO

---

## 34. Comandos que conviene memorizar

```text
\l
\c
\dt
\d
\du
\dn
\q
```

```sql
SELECT current_user;
SELECT current_database();
SELECT version();

CREATE ROLE
ALTER ROLE
DROP ROLE

GRANT
REVOKE

SELECT * FROM pg_stat_activity;

EXPLAIN
EXPLAIN ANALYZE

CREATE INDEX
ANALYZE
VACUUM

SHOW
```

---

## 35. Modelo mental del DBA PostgreSQL

Un DBA no solamente ejecuta comandos.

Ante cualquier problema debe pensar:

```text
OBSERVAR
   ↓
ENTENDER
   ↓
EVALUAR RIESGO
   ↓
CAMBIAR
   ↓
VERIFICAR
   ↓
DOCUMENTAR
```

La administración de una base de datos debe buscar simultáneamente:

```text
Seguridad
   +
Disponibilidad
   +
Integridad
   +
Rendimiento
   +
Recuperabilidad
```
