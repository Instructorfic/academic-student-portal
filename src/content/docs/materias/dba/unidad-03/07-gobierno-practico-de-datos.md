---
title: "7. Gobierno práctico de datos"
description: "Unidad 3 de DBA — calidad desde la operación, propietario, custodio y usuario, catálogo, diccionario y expediente de auditoría."
---

**Temas del programa:** 3.4

## El gobierno práctico no es burocracia

<div class="banner-node">

Es lo que permite responder **"¿de quién es este dato y quién debe autorizar su cambio?"**, la pregunta que nadie pudo responder al inicio de la unidad.

</div>

<div class="grid-3">

<div class="card accent-azul"><strong>Calidad</strong><p>Detectar problemas desde la operación</p></div>
<div class="card accent-dorado"><strong>Responsables</strong><p>Propietario, custodio y usuarios</p></div>
<div class="card accent-verde"><strong>Metadatos</strong><p>Catálogo mínimo y diccionario operativo</p></div>

</div>

<span class="fuente">Fuente: DAMA-DMBOK, marco profesional de gestión de datos. Aquí se trabaja su forma mínima operativa</span>

## Ejemplo guiado: calidad desde la operación

```sql
SELECT lower(correo) AS correo_normalizado, count(*) AS registros,
       string_agg(id::text, ', ') AS ids
FROM clientes GROUP BY lower(correo) HAVING count(*) > 1;

SELECT id, nombre, rfc FROM clientes
WHERE rfc IS NULL OR rfc !~ '^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$';
```

```text
   correo_normalizado   | registros | ids
------------------------+-----------+------
 ana.lopez@example.test |         2 | 1, 7

 id |   nombre   |     rfc
----+------------+--------------
  7 | Ana Lopez  | LOAA850315AB
  8 | Jorge Díaz |
```

<span class="fuente">La expresión regular verifica el formato para la práctica. No valida el RFC ante el SAT</span>

## El DBA detecta, el propietario decide

<div class="grid-2">

<div class="card accent-azul"><strong>El DBA</strong><p>Ejecuta verificaciones, registra el hallazgo, propone una restricción (<code>CHECK</code>, <code>UNIQUE</code>) y lo escala</p></div>
<div class="card accent-dorado"><strong>El propietario</strong><p>Decide cuál es el valor correcto, si se fusionan los registros duplicados y si se agrega la restricción</p></div>

</div>

<div class="callout-alerta">

Si el DBA corrige un dato, la tabla de auditoría debe dejar evidencia del cambio. Un hallazgo corregido sin registro desaparece del expediente.

</div>

## Propietario, custodio y usuario

| Figura | Responsabilidad | En `clientes` |
| --- | --- | --- |
| Propietario (*data owner*) | Decide finalidad, acceso, corrección y eliminación | Gerencia Comercial |
| Custodio (*data custodian*) | Opera y protege según esas decisiones | DBA |
| Usuario | Usa el dato para una finalidad autorizada | Aplicación de ventas, soporte |

<div class="callout">

`pg_get_userbyid(relowner)` devuelve `postgres`: es el propietario **técnico** del objeto, no el propietario del dato en la organización.

</div>

## Catálogo y diccionario

<div class="grid-2">

<div class="card accent-azul"><strong>Catálogo mínimo</strong><p>¿<b>Qué</b> datos existen y <b>dónde</b>? Una fila por tabla o colección: ubicación, propietario, custodio, clasificación, finalidad, conservación.</p><span class="fuente">Fuente: IBM, "What Is a Data Catalog?"</span></div>
<div class="card accent-dorado"><strong>Diccionario operativo</strong><p>¿<b>Cómo</b> está estructurado y <b>qué significa</b>? Una fila por columna: tipo, nulos, valor por defecto, descripción, clasificación.</p><span class="fuente">Fuente: Oracle, "Data Dictionary and Dynamic Performance Views"</span></div>

</div>

## Ejemplo guiado: diccionario dentro del motor

```sql
COMMENT ON COLUMN clientes.rfc IS 'RFC del cliente. Dato personal. Uso: facturación. Cambios auditados en auditoria.cambios_clientes.';

SELECT c.column_name AS columna, c.data_type AS tipo, c.is_nullable AS acepta_nulos,
       col_description('public.clientes'::regclass, c.ordinal_position) AS descripcion
FROM information_schema.columns c
WHERE c.table_schema = 'public' AND c.table_name = 'clientes'
ORDER BY c.ordinal_position;
```

<div class="small">

```text
 columna |       tipo        | acepta_nulos |                     descripcion
---------+-------------------+--------------+------------------------------------------------------
 id      | bigint            | NO           | Identificador interno del cliente. Generado por el sistema.
 correo  | character varying | NO           | Correo de contacto. Dato personal. Uso: notificaciones al cliente.
 rfc     | character varying | YES          | RFC del cliente. Dato personal. Uso: facturación. Cambios auditados...
```

</div>

<span class="fuente">Fuente: documentación oficial de PostgreSQL, "COMMENT" e "information_schema.columns"</span>

## Ejemplo: exportar el diccionario a un archivo

```bash
psql -U postgres -d comercial --csv -c "SELECT c.column_name AS columna, c.data_type AS tipo, c.character_maximum_length AS longitud, c.is_nullable AS acepta_nulos, col_description('public.clientes'::regclass, c.ordinal_position) AS descripcion FROM information_schema.columns c WHERE c.table_schema = 'public' AND c.table_name = 'clientes' ORDER BY c.ordinal_position" > evidencias/diccionario-clientes.csv
```

`--csv` hace que `psql` entregue el resultado separado por comas, listo para abrirse en una hoja de cálculo.

```text
columna,tipo,longitud,acepta_nulos,descripcion
id,bigint,,NO,Identificador interno del cliente. Generado por el sistema.
nombre,character varying,120,NO,Nombre completo. Dato personal identificador directo.
```

## Catálogo mínimo de la base `comercial`

<div class="small">

| ID | Conjunto | Motor | Ubicación | Propietario | Clasificación | Datos personales |
| --- | --- | --- | --- | --- | --- | --- |
| CAT-01 | Clientes | PostgreSQL 16 | `comercial.public.clientes` | Gerencia Comercial | Confidencial | Sí |
| CAT-02 | Auditoría de clientes | PostgreSQL 16 | `comercial.auditoria.cambios_clientes` | Por definir | Confidencial | Sí |
| CAT-03 | Registro de cambios | PostgreSQL 16 | `comercial.gobierno.solicitudes_cambio` | Comité de cambios | Interna | No |
| CAT-04 | Clientes (tienda) | MongoDB 7 | `comercial.clientes` | Por definir | Confidencial | Sí |
| CAT-05 | Perfilado | MongoDB 7 | `comercial.system.profile` | Por definir | Confidencial | Sí |

</div>

<div class="callout">

CAT-02 y CAT-05 existen para la auditoría, pero **contienen datos personales**.

</div>

## Ejemplo guiado: registro de cambios y conciliación

```sql
CREATE TABLE gobierno.solicitudes_cambio (
    folio TEXT PRIMARY KEY, descripcion TEXT NOT NULL, solicitado_por TEXT NOT NULL,
    aprobado_por TEXT, ambiente TEXT NOT NULL CHECK (ambiente IN ('desarrollo','pruebas','produccion')),
    fecha_aprobacion TIMESTAMPTZ, ventana_inicio TIMESTAMPTZ, ventana_fin TIMESTAMPTZ
);
```

| Sentencia en la bitácora | Folio | ¿Autorizado? |
| --- | --- | --- |
| `ALTER TABLE clientes ADD COLUMN canal_alta ...` | CAM-2026-014 | Sí |
| `ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes` | — | **Hallazgo** |
| `GRANT UPDATE ON clientes TO app_ventas` | — | Por revisar |

<span class="fuente">Conciliación: comparar lo que ocurrió (bitácora, consultada con <code>dba.bitacora</code>) con lo que estaba autorizado (registro)</span>

## Afirmación o evidencia

<div class="grid-2">

<div class="card accent-rojo"><strong>Afirmación</strong><p>"Registramos los cambios de privilegios."</p></div>
<div class="card accent-verde"><strong>Evidencia</strong><p>Línea de bitácora con el <code>GRANT</code>, el usuario y la hora, más la configuración vigente que lo permitió.</p></div>

</div>

| ID | Evidencia técnica del expediente |
| --- | --- |
| E1 | Configuración de registro vigente (`pg_settings`) |
| E2 | Privilegios vigentes (`information_schema.role_table_grants`) |
| E3 | Disparador de auditoría habilitado (`pg_trigger`) |
| E4 | Muestra de la auditoría, solo metadatos |
| E5 | Bitácora exportada con hash |
| E6 | Evidencias de MongoDB (perfilador, bitácora, comparación) |

## El expediente de auditoría interna

```text
EXPEDIENTE.md
 1. Alcance
 2. Configuración de auditoría             (E1, E3, E6)
 3. Bitácora interpretada                  (al menos tres eventos)
 4. Elementos de gobierno                  (responsables, catálogo, diccionario)
 5. Conservación
 6. Políticas                              (POL-01 a POL-06)
 7. Conciliación de cambios
 8. Hallazgos                              (severidad, impacto, recomendación, decisión)
 9. Limitaciones y riesgos aceptados       (verificado vs. documentado)
10. Índice de evidencias con hash
```

## Actividad 7: Evidencia oficial de la unidad

<div class="banner-node">

**Configuración o diseño de auditoría con bitácora interpretada**

</div>

<div class="grid-2">

<div class="card accent-azul"><strong>Debe integrar</strong><p>(1) mecanismo real de registro disponible en la edición usada, (2) bitácora capturada, (3) al menos tres eventos interpretados, (4) propietario y entrada de catálogo y diccionario</p></div>
<div class="card accent-rojo"><strong>No se acepta</strong><p>Simular una función de auditoría que no existe en la edición usada, o una interpretación genérica no ligada a la bitácora entregada</p></div>

</div>

<div class="callout">

Relación con el **Laboratorio 03 — Políticas prácticas, gobierno de datos y evidencias**: ahí se integra el expediente con lo producido en los Laboratorios 01 y 02.

</div>

## Relación con el laboratorio

<div class="callout">

Los responsables, el diccionario, el catálogo y el expediente de auditoría interna se construyen en el [Laboratorio 3 — Políticas prácticas, gobierno de datos y evidencias](/materias/dba/unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias/).

</div>

## Qué sigue

Continúa con [8. Cierre de la unidad](/materias/dba/unidad-03/08-cierre-de-la-unidad/).
