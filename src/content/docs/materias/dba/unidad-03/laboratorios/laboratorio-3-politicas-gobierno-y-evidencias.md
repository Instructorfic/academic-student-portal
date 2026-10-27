---
title: "LAB-03 — Políticas prácticas, gobierno de datos y evidencias"
description: "Unidad 3 de DBA — calidad de datos, responsables, diccionario y catálogo, conservación de bitácoras, políticas prácticas y expediente de auditoría interna."
---

**Materia:** Gestión de Seguridad y Desempeño de Bases de Datos
**Unidad:** III — Auditoría, trazabilidad y gobierno práctico de datos
**Temas:** 3.2.5 Conservación de bitácoras · 3.3 Políticas prácticas de datos · 3.4 Gobierno práctico de datos
**Motor:** PostgreSQL 16 (el mismo servidor del LAB-01, con cualquier forma de despliegue); MongoDB 7 como referencia del LAB-02
**Modalidad:** Práctica individual
**Duración estimada:** 4 horas
**Tipo:** Laboratorio técnico-documental integrador

---

## 1. Contexto

En los dos laboratorios anteriores construiste **mecanismos**: bitácoras, una tabla de auditoría, el perfilador de MongoDB e instantáneas de privilegios.

Los mecanismos responden **qué ocurrió**. No responden:

* **¿De quién es este dato?** ¿Quién decide si el RFC de un cliente puede corregirse?
* **¿Qué regla se incumplió?** Si no existe una política escrita, no puede decirse que un cambio fue indebido.
* **¿Cuánto tiempo se conserva la evidencia?** Una bitácora borrada a los tres días no sirve para una revisión trimestral.
* **¿Qué datos existen y qué significan?** Sin catálogo ni diccionario, nadie sabe qué columnas son sensibles.

Este laboratorio completa la pregunta de la unidad:

> ¿Cómo se demuestra, con evidencia verificable, qué ocurrió en una base de datos **y quién es responsable de qué**?

Al terminar, tendrás un **expediente** que integra configuración, bitácora interpretada y elementos de gobierno. Ese expediente es la **evidencia oficial de la Unidad III**: "Configuración o diseño de auditoría con bitácora interpretada" (programa oficial, sección 5).

---

## 2. Objetivo

Construir los elementos mínimos de gobierno práctico de datos para la base `comercial` (calidad, propietarios, catálogo, diccionario, criterio de conservación, políticas prácticas y registro de cambios) y relacionarlos con las evidencias técnicas de los laboratorios anteriores en un expediente para auditoría interna.

---

## 3. Resultados de aprendizaje

Al finalizar el laboratorio, serás capaz de:

1. Detectar problemas de calidad de datos desde la operación y escalarlos a quien corresponde.
2. Distinguir propietario, custodio y usuario de un dato.
3. Construir un catálogo mínimo de datos.
4. Construir un diccionario de datos operativo documentado dentro del propio motor.
5. Proponer un criterio de conservación para cada tipo de bitácora.
6. Redactar seis políticas prácticas de datos como reglas de decisión verificables.
7. Conciliar los cambios registrados en la bitácora con los cambios autorizados.
8. Integrar configuración, bitácora interpretada y gobierno en un expediente de auditoría interna.

---

## 4. Conceptos y definiciones

### 4.1 Gobierno práctico de datos

Conjunto **mínimo** de responsables, reglas e inventarios que permite responder, con evidencia, quién responde por cada dato y bajo qué reglas se usa.

En esta materia no se trata el gobierno de datos como disciplina empresarial completa. DAMA International ubica la calidad, la propiedad y los metadatos dentro del gobierno de datos de una organización (REF-U3-10). Aquí se trabaja su forma operativa mínima, la que un DBA puede construir y sostener.

### 4.2 Propietario, custodio y usuario

| Figura | Responsabilidad | Ejemplo en `clientes` |
| --- | --- | --- |
| Propietario (*data owner*) | Decide para qué se usa el dato, quién puede acceder y cuándo se corrige o elimina | Gerencia Comercial |
| Custodio (*data custodian*) | Opera y protege el dato según las decisiones del propietario | DBA |
| Usuario | Utiliza el dato para una finalidad autorizada | Aplicación de ventas, soporte |

El DBA es **custodio**, no propietario. Puede detectar un problema de calidad, pero no decide por sí mismo cuál es el valor correcto de un RFC.

### 4.3 Catálogo mínimo de datos

Inventario de **qué** datos existen y **dónde** están, con información que ayuda a descubrirlos, entenderlos y gobernarlos (REF-U3-02).

Responde: ¿qué conjuntos de datos tiene la organización, dónde viven, quién es su propietario y qué clasificación tienen?

### 4.4 Diccionario de datos operativo

Descripción de **cómo** está estructurado un conjunto de datos: columnas, tipos, restricciones y significado.

El término "diccionario de datos" también designa los metadatos que el propio SGBD mantiene sobre sus objetos. Oracle lo describe como un conjunto central de tablas y vistas de solo lectura con metadatos de la base de datos (REF-U3-01). En PostgreSQL, parte de esos metadatos se consulta mediante `information_schema` (REF-U3-15), y el significado de negocio puede guardarse con `COMMENT` (REF-U3-14).

```text
Catálogo      →  ¿QUÉ existe y DÓNDE?          (una fila por tabla o colección)
Diccionario   →  ¿CÓMO está y QUÉ SIGNIFICA?    (una fila por columna o campo)
```

### 4.5 Política práctica de datos

Regla de decisión escrita que indica **qué** debe hacerse, **quién** decide y **cómo se demuestra** que se cumplió.

Una política no es un procedimiento técnico. "Respaldar diariamente" es una política. El comando que ejecuta el respaldo es un procedimiento, y se estudiará en la Unidad V.

### 4.6 Evidencia para auditoría interna

Registro verificable que demuestra que un control existe y funciona. Una afirmación sin evidencia no supera una auditoría:

```text
"Registramos los cambios de privilegios"          → afirmación
Línea de bitácora con el GRANT, usuario y hora    → evidencia
```

### 4.7 Conciliación

Comparación entre lo que **ocurrió** (bitácora) y lo que **estaba autorizado** (registro de cambios). Las diferencias son hallazgos.

---

## 5. Escenario

Tras los laboratorios anteriores, el área de auditoría interna de **Comercializadora Norte S.A. de C.V.** programa una revisión de la base `comercial`. Solicita al DBA un expediente que demuestre:

| # | Solicitud de auditoría interna |
| --- | --- |
| A1 | Qué datos existen, dónde están y quién es responsable de cada uno |
| A2 | Qué significa cada columna de `clientes` y cuáles son sensibles |
| A3 | Qué eventos se registran, dónde y durante cuánto tiempo |
| A4 | Qué reglas rigen el acceso, el respaldo, la retención, la restauración, el uso de datos sensibles y los cambios en producción |
| A5 | Que los cambios en producción de las últimas semanas estaban autorizados |
| A6 | Qué limitaciones conocidas tienen los controles y quién las aceptó |

---

## 6. Preparación

Este laboratorio usa el mismo servidor PostgreSQL del LAB-01, con sus objetos. Abre la sesión de administrador (LAB-01, sección 6.2 y Anexo A) y verifica:

```sql
\dn
SHOW log_statement;
SELECT count(*) FROM dba.bitacora;
```

Deben existir los esquemas `public`, `auditoria` y `dba`, `log_statement` debe valer `mod` y la vista `dba.bitacora` debe devolver líneas.

> Si perdiste el entorno, repite la preparación (sección 6), las Actividades 2 y 4 y la Parte B del LAB-01. El escenario seguirá siendo válido aunque los identificadores de evento cambien.

> Todos los comandos de esta guía se ejecutan en la sesión de administrador de `psql`, salvo las exportaciones a archivo, que se ejecutan en la terminal con `psql -U postgres -d comercial ...` (o con la forma de tu despliegue).

Ten a la mano:

* `LAB-01/evidencias/bitacora-lab01.log`, la cronología y las evidencias de auditoría del dato y manipulación;
* `LAB-02/evidencias/09-comparacion.md`;
* la matriz de gobierno de datos de la Unidad II (LAB-03, Actividad 11), que usarás como insumo.

---

## 7. Actividad 1 — Calidad de datos desde la operación

La operación diaria es el primer lugar donde se detectan problemas de calidad.

Simula dos registros capturados con errores:

```sql
INSERT INTO clientes (nombre, correo, telefono, rfc, edad, ciudad, codigo_postal) VALUES
('Ana Lopez', 'ANA.LOPEZ@example.test', '6671234567', 'LOAA850315AB', 41, 'Culiacan', '80000'),
('Jorge Díaz', 'sin-correo', '667', NULL, -3, 'Culiacán', '8000');
```

Ejecuta las verificaciones:

**Posibles duplicados por correo:**

```sql
SELECT lower(correo) AS correo_normalizado,
       count(*) AS registros,
       string_agg(id::text, ', ') AS ids
FROM clientes
GROUP BY lower(correo)
HAVING count(*) > 1;
```

```text
   correo_normalizado   | registros | ids
------------------------+-----------+------
 ana.lopez@example.test |         2 | 1, 7
(1 row)
```

**RFC con formato no válido o ausente:**

```sql
SELECT id, nombre, rfc
FROM clientes
WHERE rfc IS NULL
   OR rfc !~ '^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$';
```

```text
 id |   nombre   |     rfc
----+------------+--------------
  7 | Ana Lopez  | LOAA850315AB
  8 | Jorge Díaz |
(2 rows)
```

**Correo con formato no válido:**

```sql
SELECT id, nombre, correo
FROM clientes
WHERE correo !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$';
```

**Edad fuera de rango:**

```sql
SELECT id, nombre, edad
FROM clientes
WHERE edad IS NOT NULL AND (edad < 18 OR edad > 120);
```

**Completitud:**

```sql
SELECT count(*) AS total,
       count(*) FILTER (WHERE telefono IS NULL) AS sin_telefono,
       count(*) FILTER (WHERE rfc IS NULL) AS sin_rfc
FROM clientes;
```

> Los identificadores (`id`) dependen de lo que hayas insertado y eliminado en los laboratorios anteriores. La expresión regular del RFC es una **verificación de formato** para la práctica; no valida que el RFC exista ni sustituye las reglas oficiales del SAT.

Registra cada hallazgo:

| # | Hallazgo | Registros | Regla de calidad | ¿Quién decide la corrección? | Acción propuesta |
| --- | --- | --- | --- | --- | --- |
| C1 | Posible cliente duplicado | 1, 7 | Unicidad del correo | | |
| C2 | RFC incompleto | 7 | Formato del RFC | | |
| C3 | | | | | |
| C4 | | | | | |

#### Preguntas

1. ¿Por qué el DBA **no** debe corregir por su cuenta el RFC del registro 7?
2. ¿Qué restricción (`CHECK`, `UNIQUE`) habría evitado cada hallazgo? ¿Quién debería aprobar agregarla?
3. Si el DBA corrige un dato, ¿qué mecanismo del LAB-01 (Parte B) dejará evidencia del cambio?

Guarda:

```text
evidencias/01-calidad.md
sql/01-verificaciones-calidad.sql
```

> No elimines estos registros. Forman parte de los hallazgos del expediente.

---

## 8. Actividad 2 — Propietarios, custodios y usuarios

Parte de la matriz de gobierno de datos de la Unidad II (LAB-03, Actividad 11). **No la repitas**: amplíala con las figuras de la sección 4.2 y con los objetos creados en esta unidad.

| Conjunto de datos | Propietario | Custodio | Usuarios autorizados | Quién aprueba accesos | Quién aprueba correcciones |
| --- | --- | --- | --- | --- | --- |
| `comercial.public.clientes` (PostgreSQL) | | DBA | | | |
| `auditoria.cambios_clientes` (PostgreSQL) | | | | | |
| Bitácora de PostgreSQL | | | | | |
| `comercial.clientes` (MongoDB) | | | | | |
| `comercial.system.profile` (MongoDB) | | | | | |

#### Preguntas

1. ¿Por qué el propietario de `auditoria.cambios_clientes` **no** debería ser el mismo que opera `clientes`?
2. ¿Quién debería poder leer las bitácoras y la vista `dba.bitacora`? Relaciónalo con lo observado en el LAB-01 (secretos en la bitácora).
3. ¿Qué ocurre con la responsabilidad sobre un dato cuando nadie la tiene asignada? Relaciónalo con el problema inicial de la unidad.

Guarda:

```text
evidencias/02-responsables.md
```

---

## 9. Actividad 3 — Diccionario de datos operativo dentro del motor

Documenta el significado de la tabla y de sus columnas con `COMMENT` (REF-U3-14):

```sql
COMMENT ON TABLE clientes IS 'Clientes de Comercializadora Norte. Propietario: Gerencia Comercial. Custodio: DBA. Clasificación: confidencial (contiene datos personales).';
COMMENT ON COLUMN clientes.id IS 'Identificador interno del cliente. Generado por el sistema.';
COMMENT ON COLUMN clientes.nombre IS 'Nombre completo. Dato personal identificador directo.';
COMMENT ON COLUMN clientes.correo IS 'Correo de contacto. Dato personal. Uso: notificaciones al cliente.';
COMMENT ON COLUMN clientes.rfc IS 'RFC del cliente. Dato personal. Uso: facturación. Cambios auditados en auditoria.cambios_clientes.';
COMMENT ON COLUMN clientes.edad IS 'Edad en años cumplidos. Dato personal. Uso: analítica agregada.';
```

Completa los comentarios de `telefono`, `ciudad`, `codigo_postal`, `fecha_alta` y `segmento`.

Consulta el diccionario combinando metadatos estructurales (`information_schema.columns`, REF-U3-15) y comentarios (`col_description`, REF-U3-14):

```sql
SELECT c.ordinal_position          AS pos,
       c.column_name               AS columna,
       c.data_type                 AS tipo,
       c.character_maximum_length  AS longitud,
       c.is_nullable               AS acepta_nulos,
       c.column_default            AS valor_por_defecto,
       col_description('public.clientes'::regclass, c.ordinal_position) AS descripcion
FROM information_schema.columns c
WHERE c.table_schema = 'public'
  AND c.table_name = 'clientes'
ORDER BY c.ordinal_position;
```

Fragmento observado:

```text
 pos |    columna    |       tipo        | longitud | acepta_nulos |          valor_por_defecto           |                    descripcion
-----+---------------+-------------------+----------+--------------+--------------------------------------+---------------------------------------------------
   1 | id            | bigint            |          | NO           | nextval('clientes_id_seq'::regclass) | Identificador interno del cliente. Generado ...
   3 | correo        | character varying |      150 | NO           |                                      | Correo de contacto. Dato personal. Uso: ...
   5 | rfc           | character varying |       13 | YES          |                                      | RFC del cliente. Dato personal. Uso: facturación...
```

Exporta el diccionario en CSV desde la carpeta `LAB-03/`, en la terminal:

```bash
psql -U postgres -d comercial --csv -c "SELECT c.column_name AS columna, c.data_type AS tipo, c.character_maximum_length AS longitud, c.is_nullable AS acepta_nulos, col_description('public.clientes'::regclass, c.ordinal_position) AS descripcion FROM information_schema.columns c WHERE c.table_schema = 'public' AND c.table_name = 'clientes' ORDER BY c.ordinal_position" > evidencias/diccionario-clientes.csv
```

Completa el diccionario con las columnas que el motor **no** conoce:

| Columna | Clasificación (Unidad II) | Finalidad | Control aplicado | ¿Cambios auditados? | Regla de calidad |
| --- | --- | --- | --- | --- | --- |
| `rfc` | Dato personal | Facturación | Vista enmascarada para soporte (U2) | Sí, LAB-01 Parte B | Formato RFC |
| `correo` | | | | | |
| … | | | | | |

#### Preguntas

1. ¿Qué ventaja tiene guardar el significado en `COMMENT` en lugar de solo en un documento aparte?
2. ¿Quedaron registrados los `COMMENT` en la bitácora? ¿Con qué nivel de `log_statement`?
3. ¿Qué información del diccionario debe mantenerse fuera del motor? ¿Por qué?

Guarda:

```text
sql/02-comentarios-diccionario.sql
evidencias/diccionario-clientes.csv
evidencias/03-diccionario.md
```

---

## 10. Actividad 4 — Catálogo mínimo de datos

Obtén del motor la información técnica de cada tabla:

```sql
ANALYZE;

SELECT n.nspname                                   AS esquema,
       c.relname                                   AS tabla,
       pg_get_userbyid(c.relowner)                 AS propietario_tecnico,
       c.reltuples::bigint                         AS filas_estimadas,
       pg_size_pretty(pg_total_relation_size(c.oid)) AS tamano,
       obj_description(c.oid, 'pg_class')          AS descripcion
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
  AND n.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY 1, 2;
```

> `ANALYZE` actualiza las estadísticas. Sin él, `filas_estimadas` puede mostrar `-1` en tablas recién creadas. Las estadísticas del optimizador se estudian en la Unidad IV; aquí solo se usan como dato de inventario.

Observa que `propietario_tecnico` es `postgres`: es el **propietario del objeto en el motor**, no el propietario del dato en la organización. La consulta solo lista tablas (`relkind = 'r'`): la vista `dba.bitacora` no aparece, aunque también es un activo que debe inventariarse.

Construye el catálogo integrando PostgreSQL y MongoDB. En **Ubicación** usa el formato `servidor / base / esquema.objeto`, con el nombre o la dirección de tus servidores:

| ID | Conjunto de datos | Motor | Ubicación | Propietario | Custodio | Clasificación | Contiene datos personales | Finalidad | Conservación | Diccionario |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CAT-01 | Clientes | PostgreSQL 16 | `<servidor-pg>` / `comercial` / `public.clientes` | Gerencia Comercial | DBA | Confidencial | Sí | | | `diccionario-clientes.csv` |
| CAT-02 | Auditoría de clientes | PostgreSQL 16 | `<servidor-pg>` / `comercial` / `auditoria.cambios_clientes` | | | | | | | |
| CAT-03 | Registro de cambios | PostgreSQL 16 | `<servidor-pg>` / `comercial` / `gobierno.solicitudes_cambio` | | | | | | | |
| CAT-04 | Clientes (tienda) | MongoDB 7 | `<servidor-mongo>` / `comercial` / `clientes` | | | | | | | |
| CAT-05 | Perfilado | MongoDB 7 | `<servidor-mongo>` / `comercial` / `system.profile` | | | | | | | |

> CAT-03 se crea en la Actividad 7. Puedes completarlo después.

#### Preguntas

1. ¿Por qué CAT-02 y CAT-05 contienen datos personales aunque su propósito sea la auditoría?
2. ¿Qué pasa si CAT-01 y CAT-04 tienen propietarios distintos y el RFC de un cliente difiere entre ambos motores?
3. ¿Qué información del catálogo cambia con más frecuencia y quién debe actualizarla?

Guarda:

```text
sql/03-inventario-tablas.sql
evidencias/04-catalogo.md
```

---

## 11. Actividad 5 — Criterio de conservación de bitácoras

Con lo observado en los LAB-01 y LAB-02, propone cómo conservar cada tipo de registro. La guía NIST SP 800-92 trata la planeación de la gestión de bitácoras de seguridad, incluida su conservación (REF-U3-03).

| Registro | Ubicación actual | Riesgo de pérdida observado | Sensibilidad | Periodo propuesto | Justificación | Dónde se conserva | Quién puede leerlo | Acción al vencer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accesos de PostgreSQL | Archivo del colector (`pg_current_logfile()`) | Rotación del archivo; reinstalación o recreación del servidor | | | | | | |
| Cambios de privilegios y estructura | Archivo del colector | | Alta | | | | | |
| Modificaciones de datos (`log_statement = 'mod'`) | Archivo del colector | | | | | | | |
| `auditoria.cambios_clientes` | Tabla en `comercial` | | Contiene datos personales | | | | | |
| Bitácora de `mongod` | `systemLog.path` o salida estándar; `getLog` solo en memoria | | | | | | | |
| `system.profile` | Colección limitada de 1 MB | Se sobrescribe sola | | | | | | |
| Instantáneas de privilegios (MongoDB) | `auditoria.instantaneas_privilegios` | | | | | | | |

Reglas para completar la tabla:

* No existe una cifra única correcta. El objetivo es que el criterio sea **razonado**.
* No inventes plazos legales. Si un plazo depende de una obligación normativa, escribe **"Plazo a confirmar con el área jurídica"** e indica qué obligación habría que revisar.
* Considera el conflicto observado en el LAB-01 (Actividad 13): conservar la auditoría puede contradecir la eliminación de datos personales que exige la política de retención.

#### Preguntas

1. ¿Por qué la bitácora de cambios de privilegios merece más tiempo de conservación que la de consultas rutinarias?
2. ¿Qué control de integridad aplicarás a las bitácoras exportadas?
3. ¿Qué diferencia hay entre conservar una bitácora y respaldar una base de datos?

> El mecanismo técnico de respaldo se estudia en la Unidad V. Aquí solo se fija el criterio.

Guarda:

```text
evidencias/05-conservacion.md
```

---

## 12. Actividad 6 — Políticas prácticas de datos

Redacta las seis políticas usando esta plantilla para cada una:

```text
POL-0X — Nombre de la política

Objetivo:        qué riesgo reduce
Alcance:         a qué datos, sistemas y ambientes aplica
Regla:           qué debe hacerse (en una a tres oraciones verificables)
Responsable:     quién decide / quién ejecuta
Excepciones:     cuándo puede omitirse y quién lo autoriza
Evidencia:       qué registro demuestra que se cumplió
Revisión:        cada cuánto se revisa la política
```

| ID | Política | Pregunta que debe responder |
| --- | --- | --- |
| POL-01 | Acceso | ¿Quién puede solicitar acceso, quién lo aprueba y cada cuánto se revisa? |
| POL-02 | Respaldo | ¿Qué se respalda, con qué frecuencia y quién verifica que el respaldo sirve? |
| POL-03 | Retención | ¿Cuánto tiempo se conservan los datos y las bitácoras, y qué se hace al vencer el plazo? |
| POL-04 | Restauración | ¿Quién autoriza y quién ejecuta una restauración, y en qué condiciones? |
| POL-05 | Uso de datos sensibles | ¿Quién accede a datos sensibles, con qué justificación y cómo se registra? |
| POL-06 | Cambios en producción | ¿Qué debe ocurrir antes, durante y después de un cambio en el ambiente de producción? |

Ejemplo de una regla **verificable**:

```text
Regla: Todo cambio de privilegios en producción requiere una solicitud aprobada
       por el propietario del dato. El DBA revisa mensualmente la bitácora de
       GRANT y REVOKE y la concilia con las solicitudes aprobadas.

Evidencia: líneas "statement: GRANT/REVOKE" de la bitácora (LAB-01, Actividad 6)
           + registro de solicitudes aprobadas + acta de la revisión mensual.
```

Ejemplo de una regla **no verificable** (evítala):

```text
Regla: Los accesos deben otorgarse con cuidado.
```

Requisitos:

* Cada **Evidencia** debe nombrar un registro concreto de los LAB-01 a LAB-03, o indicar explícitamente que hoy no existe.
* POL-02 y POL-04 fijan **reglas de decisión**, no comandos. Escribe "El procedimiento técnico se definirá en la Unidad V".
* POL-06 debe usar la definición de ambiente de la Unidad I.
* Las seis políticas deben ser coherentes entre sí: por ejemplo, POL-03 no puede exigir eliminar la auditoría antes de lo que POL-05 necesita para investigar un incidente.

Guarda:

```text
politicas/POL-01-acceso.md
politicas/POL-02-respaldo.md
politicas/POL-03-retencion.md
politicas/POL-04-restauracion.md
politicas/POL-05-datos-sensibles.md
politicas/POL-06-cambios-produccion.md
```

---

## 13. Actividad 7 — Registro de cambios y conciliación

POL-06 necesita evidencia de que cada cambio estaba autorizado. Crea un registro mínimo de solicitudes de cambio:

```sql
CREATE SCHEMA gobierno;
REVOKE ALL ON SCHEMA gobierno FROM PUBLIC;

CREATE TABLE gobierno.solicitudes_cambio (
    folio            TEXT PRIMARY KEY,
    descripcion      TEXT NOT NULL,
    solicitado_por   TEXT NOT NULL,
    aprobado_por     TEXT,
    ambiente         TEXT NOT NULL CHECK (ambiente IN ('desarrollo', 'pruebas', 'produccion')),
    fecha_aprobacion TIMESTAMPTZ,
    ventana_inicio   TIMESTAMPTZ,
    ventana_fin      TIMESTAMPTZ
);

COMMENT ON TABLE gobierno.solicitudes_cambio IS 'Registro de solicitudes de cambio en la base comercial. Propietario: Comité de cambios. Custodio: DBA. Evidencia de POL-06.';
```

Registra una solicitud aprobada y ejecuta el cambio dentro de su ventana:

```sql
INSERT INTO gobierno.solicitudes_cambio VALUES
('CAM-2026-014', 'Agregar columna canal_alta a clientes', 'Gerencia Comercial',
 'Comité de cambios', 'produccion', now() - interval '1 day',
 now() - interval '5 minutes', now() + interval '1 hour');

ALTER TABLE clientes ADD COLUMN canal_alta VARCHAR(20);
COMMENT ON COLUMN clientes.canal_alta IS 'Canal por el que se registró el cliente. Cambio CAM-2026-014.';
```

Verifica la ventana:

```sql
SELECT folio, aprobado_por,
       ventana_inicio <= now() AND now() <= ventana_fin AS dentro_de_ventana
FROM gobierno.solicitudes_cambio;
```

```text
    folio     |   aprobado_por    | dentro_de_ventana
--------------+-------------------+-------------------
 CAM-2026-014 | Comité de cambios | t
(1 row)
```

Extrae de la bitácora todos los cambios de estructura y privilegios con la vista del LAB-01:

```sql
SELECT num,
       substr(linea, 1, 23)                    AS momento,
       substring(linea from 'user=([^ ]*)')     AS usuario,
       substring(linea from 'statement: (.*)$') AS sentencia
FROM dba.bitacora
WHERE linea ~ 'statement: (CREATE|ALTER|DROP|GRANT|REVOKE)'
ORDER BY num;
```

| Parte | Qué hace |
| --- | --- |
| `substr(linea, 1, 23)` | Toma los primeros 23 caracteres: fecha y hora con milisegundos |
| `substring(linea from 'user=([^ ]*)')` | Extrae lo que sigue a `user=` hasta el primer espacio. Los paréntesis marcan la parte que se devuelve |
| `substring(linea from 'statement: (.*)$')` | Extrae la sentencia |

Fragmento observado en la verificación (servidor con el LAB-01 completo):

```text
 num |         momento         |  usuario   |                                sentencia
-----+-------------------------+------------+--------------------------------------------------------------------------
  34 | 2026-10-25 22:50:09.341 | postgres   | REVOKE UPDATE ON clientes FROM soporte_ana
  35 | 2026-10-25 22:50:09.367 | postgres   | GRANT UPDATE ON clientes TO app_ventas
  36 | 2026-10-25 22:50:09.372 | postgres   | ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20)
  37 | 2026-10-25 22:50:09.375 | postgres   | CREATE ROLE rol_temporal LOGIN PASSWORD 'Temporal_Practica_2026'
 ...
 163 | 2026-10-25 22:50:53.460 | app_ventas | ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
 169 | 2026-10-25 22:50:53.549 | postgres   | ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes
 171 | 2026-10-25 22:50:53.554 | postgres   | ALTER TABLE clientes ENABLE TRIGGER trg_auditoria_clientes
 ...
 216 | 2026-10-25 22:54:26.533 | postgres   | ALTER TABLE clientes ADD COLUMN canal_alta VARCHAR(20);
```

> La creación de la vista `dba.bitacora` no aparece: cuando se creó, `log_statement` todavía valía `none`. Es un hueco de evidencia que debe declararse. La línea 37 muestra otra vez la contraseña: cualquier extracción de la bitácora debe revisarse antes de compartirse.

Construye la tabla de conciliación:

| Momento (bitácora) | Usuario | Sentencia | Folio que lo autoriza | ¿Autorizado? | Hallazgo |
| --- | --- | --- | --- | --- | --- |
| | `postgres` | `ALTER TABLE clientes ADD COLUMN canal_alta ...` | CAM-2026-014 | Sí | — |
| | `postgres` | `ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes` | | | |
| | `postgres` | `GRANT UPDATE ON clientes TO app_ventas` | | | |
| | | | | | |

#### Preguntas

1. ¿Qué cambios de la bitácora **no** tienen folio? Clasifícalos: ¿son de preparación del laboratorio o representan hallazgos?
2. La desactivación del disparador del LAB-01 (Actividad 14), ¿qué tan grave es como hallazgo? ¿Por qué? ¿Qué distingue la línea 163 de la 169?
3. ¿Qué limitación tiene esta conciliación si `log_statement` estuvo en `none` durante algún periodo?
4. ¿Quién debería realizar la conciliación: el DBA que hizo los cambios u otra persona?

Guarda:

```text
sql/04-registro-cambios.sql
evidencias/06-conciliacion.md
```

---

## 14. Actividad 8 — Evidencias técnicas del expediente

Genera las evidencias que auditoría interna puede verificar directamente. Desde la carpeta `LAB-03/`, en la terminal (si tu sesión de administrador se abre de otra forma, usa esa forma con las mismas opciones):

**E1 — Configuración de registro vigente:**

```bash
psql -U postgres -d comercial -c "SELECT name, setting, source FROM pg_settings WHERE name IN ('logging_collector', 'log_connections', 'log_disconnections', 'log_statement', 'log_line_prefix', 'log_min_error_statement') ORDER BY name" > evidencias/E1-configuracion-registro.txt
```

**E2 — Privilegios vigentes sobre tablas:**

```bash
psql -U postgres -d comercial -c "SELECT grantee, table_schema, table_name, string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privilegios FROM information_schema.role_table_grants WHERE table_schema NOT IN ('pg_catalog', 'information_schema') AND grantee <> 'postgres' GROUP BY 1, 2, 3 ORDER BY 1" > evidencias/E2-privilegios.txt
```

Resultado observado:

```text
   grantee   | table_schema | table_name |  privilegios
-------------+--------------+------------+----------------
 app_ventas  | public       | clientes   | SELECT, UPDATE
 soporte_ana | public       | clientes   | SELECT
(2 rows)
```

**E3 — Mecanismo de auditoría de datos habilitado:**

```bash
psql -U postgres -d comercial -c "SELECT tgname, tgenabled, tgrelid::regclass FROM pg_trigger WHERE NOT tgisinternal" > evidencias/E3-disparadores.txt
```

**E4 — Muestra de la auditoría de datos (sin datos completos):**

```bash
psql -U postgres -d comercial -c "SELECT id_evento, momento, usuario_sesion, aplicacion, operacion, id_cliente FROM auditoria.cambios_clientes ORDER BY id_evento DESC LIMIT 10" > evidencias/E4-muestra-auditoria.txt
```

**E5 — Bitácora exportada con hash, sin secretos:**

```bash
psql -U postgres -d comercial -At -c "SELECT replace(pg_read_file(pg_current_logfile()), 'Temporal_Practica_2026', '<REDACTED>')" > evidencias/E5-bitacora-postgresql.log
```

Calcula el hash SHA-256 (LAB-01, Actividad 16) y guárdalo en `evidencias/E5-bitacora-postgresql.sha256`. Si el colector rotó el archivo durante la unidad, `SELECT * FROM pg_ls_logdir();` muestra los anteriores: expórtalos también con `pg_read_file('log/<nombre>')`.

**E6 — Evidencias de MongoDB:** copia desde el LAB-02 `system-profile.json`, `bitacora-mongod.log`, sus hashes y la comparación de la Actividad 9.

#### Preguntas

1. Compara E2 con la matriz de roles de la Unidad II. ¿Coinciden? Si no, ¿es un hallazgo?
2. ¿Por qué E4 muestra solo metadatos y no `valores_antes` ni `valores_despues`?
3. ¿Qué evidencia demostraría que E1 estuvo vigente **durante todo el periodo** revisado y no solo hoy?

---

## 15. Actividad 9 — Integrar el expediente (evidencia oficial de la unidad)

Crea `EXPEDIENTE.md` en la raíz de `LAB-03/` con esta estructura:

```markdown
# Expediente de auditoría interna — Base comercial

## 1. Alcance
Sistemas (servidores, versiones y forma de despliegue), periodo revisado, responsable del expediente.

## 2. Configuración de auditoría (A3)
Mecanismos configurados en LAB-01 y LAB-02, con su evidencia (E1, E3, E6).

## 3. Bitácora interpretada (A3, A5)
Al menos tres eventos relevantes interpretados: quién, cuándo, desde dónde, qué ocurrió,
qué tipo de evento es y qué prueba. Incluir el incidente del RFC de María García.

## 4. Elementos de gobierno (A1, A2)
Responsables (Actividad 2), catálogo (Actividad 4), diccionario (Actividad 3).

## 5. Conservación (A3)
Criterio de la Actividad 5.

## 6. Políticas (A4)
Referencia a POL-01 a POL-06 y su evidencia.

## 7. Conciliación de cambios (A5)
Resultado de la Actividad 7.

## 8. Hallazgos
| ID | Hallazgo | Fuente | Severidad | Impacto | Recomendación | Decisión requerida de |

Incluye, como mínimo: calidad de datos (Actividad 1), cambios no autorizados (Actividad 7)
y limitaciones de los controles.

## 9. Limitaciones conocidas y riesgos aceptados (A6)
Por ejemplo: MongoDB Community sin auditoría nativa; lecturas no auditadas sin pgaudit;
la auditoría puede ser desactivada por el administrador.
Indica quién debería aceptar formalmente cada riesgo.

## 10. Índice de evidencias
Lista de archivos con su hash cuando aplique.
```

Requisitos del expediente:

1. Cada afirmación de las secciones 2 a 7 remite a una evidencia concreta (archivo y, si aplica, línea).
2. La sección 3 interpreta **al menos tres** eventos distintos con el formato del LAB-01, Actividad 17.
3. La sección 8 usa severidades **Alta**, **Media** o **Baja** y no corrige silenciosamente ningún hallazgo.
4. La sección 9 distingue lo **verificado** en los laboratorios de lo **documentado pero no practicado** (por ejemplo, la auditoría nativa de MongoDB Enterprise).

---

## 16. Verificación final

* [ ] Hallazgos de calidad registrados con responsable de la decisión.
* [ ] Matriz de responsables con propietario, custodio y usuarios.
* [ ] Comentarios en la tabla y en todas las columnas de `clientes`.
* [ ] Diccionario exportado en CSV y completado con clasificación y finalidad.
* [ ] Catálogo con al menos cinco conjuntos de datos de los dos motores.
* [ ] Criterio de conservación para los siete tipos de registro.
* [ ] Seis políticas con regla verificable y evidencia nombrada.
* [ ] Registro de cambios creado y conciliación con la bitácora.
* [ ] Evidencias E1 a E6 generadas.
* [ ] `EXPEDIENTE.md` completo, con al menos tres eventos interpretados.

---

## 17. Evidencias

```text
LAB-03/
├── EXPEDIENTE.md
├── README.md
├── sql/
│   ├── 01-verificaciones-calidad.sql
│   ├── 02-comentarios-diccionario.sql
│   ├── 03-inventario-tablas.sql
│   └── 04-registro-cambios.sql
├── politicas/
│   ├── POL-01-acceso.md
│   ├── POL-02-respaldo.md
│   ├── POL-03-retencion.md
│   ├── POL-04-restauracion.md
│   ├── POL-05-datos-sensibles.md
│   └── POL-06-cambios-produccion.md
└── evidencias/
    ├── 01-calidad.md
    ├── 02-responsables.md
    ├── 03-diccionario.md
    ├── 04-catalogo.md
    ├── 05-conservacion.md
    ├── 06-conciliacion.md
    ├── diccionario-clientes.csv
    ├── E1-configuracion-registro.txt
    ├── E2-privilegios.txt
    ├── E3-disparadores.txt
    ├── E4-muestra-auditoria.txt
    ├── E5-bitacora-postgresql.log
    ├── E5-bitacora-postgresql.sha256
    └── E6-mongodb/
```

Commits sugeridos:

```text
docs: registra hallazgos de calidad de datos
docs: agrega matriz de responsables
feat: documenta diccionario de datos con COMMENT
docs: agrega catalogo minimo de datos
docs: agrega criterio de conservacion de bitacoras
docs: agrega politicas practicas de datos
feat: agrega registro de solicitudes de cambio
docs: agrega conciliacion y evidencias tecnicas
docs: integra expediente de auditoria interna
```

---

## 18. Preguntas de reflexión

1. ¿Por qué el gobierno de datos no es "burocracia" en el contexto del problema inicial de la unidad?
2. ¿Qué diferencia hay entre el propietario técnico de una tabla en PostgreSQL y el propietario del dato?
3. ¿Por qué una política sin evidencia no supera una auditoría?
4. ¿Qué parte del expediente sería la más difícil de mantener actualizada? ¿Cómo lo resolverías?
5. ¿Qué hallazgo de tu expediente tiene mayor impacto y por qué?
6. ¿Por qué documentar una limitación es preferible a ocultarla ante una auditoría?

---

## 19. Evaluación

| Criterio | Porcentaje |
| --- | ---: |
| Calidad de datos y escalamiento correcto | 10 % |
| Responsables, catálogo y diccionario | 20 % |
| Criterio de conservación razonado | 10 % |
| Seis políticas verificables y coherentes | 20 % |
| Registro de cambios y conciliación | 15 % |
| Expediente: bitácora interpretada (al menos tres eventos) | 15 % |
| Hallazgos, limitaciones y calidad del documento | 10 % |
| **Total** | **100 %** |

Este laboratorio produce la **evidencia oficial de la Unidad III**. Se evalúa con los criterios de la Actividad 7 de la unidad. La ponderación en la calificación de la unidad la confirmará tu docente.

---

## 20. Errores frecuentes

#### Error 1 — Confundir catálogo y diccionario

El catálogo tiene una fila por conjunto de datos. El diccionario tiene una fila por columna.

#### Error 2 — Poner al DBA como propietario de todo

El DBA custodia. El propietario decide.

#### Error 3 — Escribir políticas como procedimientos

"Ejecutar `pg_dump` a las 2:00" es un procedimiento. La política fija qué se respalda, con qué frecuencia y quién verifica.

#### Error 4 — Inventar plazos legales

Si no conoces la obligación aplicable, escríbelo y escala la decisión.

#### Error 5 — Corregir los hallazgos sin registrarlos

Un hallazgo corregido sin registro desaparece del expediente y de la evidencia de mejora.

#### Error 6 — Incluir datos personales completos en el expediente

El expediente demuestra que los controles funcionan. No necesita reproducir la tabla de clientes.

---

## 21. Relación con la Unidad III y con las siguientes unidades

```text
LAB-01  Bitácora y auditoría del dato (PostgreSQL)  ─┐
                                                     ├─→  LAB-03  Expediente de auditoría interna
LAB-02  Trazabilidad en MongoDB Community           ─┘           (evidencia oficial de la unidad)
```

Lo que este laboratorio deja preparado:

* **Unidad IV.** El vocabulario de bitácoras y el uso de `pg_stat_activity` se extenderán hacia métricas de desempeño.
* **Unidad V.** POL-02, POL-03 y POL-04 serán el insumo para diseñar los mecanismos técnicos de respaldo y restauración.

---

## 22. Referencias de este laboratorio

* **REF-U3-01** — Oracle Corporation. *Database Concepts*, 21c, cap. "Data Dictionary and Dynamic Performance Views". https://docs.oracle.com/en/database/oracle/oracle-database/21/cncpt/data-dictionary-and-dynamic-performance-views.html
* **REF-U3-02** — IBM. "What Is a Data Catalog?". https://www.ibm.com/think/topics/data-catalog
* **REF-U3-03** — NIST. *SP 800-92: Guide to Computer Security Log Management*. https://csrc.nist.gov/pubs/sp/800/92/final
* **REF-U3-10** — DAMA International. *DAMA-DMBOK*, 2.ª ed. https://dama.org/cpages/body-of-knowledge
* **REF-U3-14** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, "COMMENT". https://www.postgresql.org/docs/16/sql-comment.html
* **REF-U3-15** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 37.17 "columns". https://www.postgresql.org/docs/16/infoschema-columns.html
* **REF-U3-18** — PostgreSQL Global Development Group. *PostgreSQL 16 Documentation*, secc. 9.27 "System Administration Functions". https://www.postgresql.org/docs/16/functions-admin.html

Las salidas mostradas se obtuvieron ejecutando esta guía contra PostgreSQL 16.14 el 2026-10-19 y, en su versión independiente del despliegue, el 2026-10-25, encadenada después del LAB-01 en el mismo servidor. Los identificadores y fechas serán distintos en tu equipo.
