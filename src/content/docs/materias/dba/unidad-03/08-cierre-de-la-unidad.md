---
title: "8. Cierre de la unidad"
description: "Unidad 3 de DBA — errores conceptuales frecuentes, mecanismos complementarios, pregunta de cierre, referencia rápida y referencias."
---

## Errores conceptuales frecuentes

| Error | Corrección |
| --- | --- |
| "Tenemos roles y contraseñas, ya tenemos auditoría" | El control de acceso decide. La auditoría registra |
| "Activamos la bitácora para investigar lo de ayer" | Lo no registrado no se reconstruye |
| "`log_statement = 'all'` es lo más seguro" | Registra todo, incluidos datos sensibles |
| "El perfilador es la auditoría de Community" | Es una herramienta de desempeño. La auditoría nativa no existe en Community |
| "La bitácora dice `app_ventas`, fue la aplicación" | Prueba la credencial, no la persona |
| "El DBA es el dueño de los datos" | El DBA custodia. El propietario decide |

## Mecanismos complementarios

```text
                 ¿Qué ocurrió en clientes?
                           │
   ┌──────────────┬────────┴────────┬──────────────────┐
   ▼              ▼                 ▼                  ▼
Bitácora       Tabla de          pgaudit           Profiler + log
PostgreSQL     auditoría         (opcional)        MongoDB
quién, cuándo, valor antes       lecturas de        operaciones,
qué sentencia  y después         columnas           accesos
   └──────────────┴────────┬────────┴──────────────────┘
                           ▼
       Políticas + responsables + catálogo + diccionario
                           ▼
              Expediente para auditoría interna
```

## Pregunta de cierre

> La base de datos tiene roles correctos, la bitácora en `mod`, una tabla de auditoría con disparador y un perfilador activo en MongoDB. Pero nadie tiene asignado el dato, no hay política de retención de bitácoras y los servidores se reinstalan cada semana sin conservar sus archivos de bitácora.

**¿Puede demostrarse quién cambió el RFC hace un mes?**

<div class="callout">

**No.** La evidencia se perdió con cada reinstalación y nadie tenía la responsabilidad de conservarla. Sin **conservación** y **gobierno**, los mecanismos técnicos no producen evidencia.

</div>

## ¿Qué sigue?

<div class="grid-2">

<div class="card accent-azul"><strong>Unidad IV: desempeño</strong><p>¿Cómo hacemos que esta base, ya auditable, responda rápido? Retomarás <code>pg_stat_activity</code> y el vocabulario de bitácoras para diagnosticar consultas costosas.</p></div>
<div class="card accent-dorado"><strong>Unidad V: respaldo y restauración</strong><p>POL-02, POL-03 y POL-04 serán el insumo para diseñar los mecanismos técnicos de respaldo y recuperación.</p></div>

</div>

## Referencia rápida del DBA

| Necesidad | PostgreSQL 16 | MongoDB 7 Community |
| --- | --- | --- |
| ¿Dónde está la configuración? | `SHOW config_file`, `SHOW hba_file` | `db.serverCmdLineOpts()` |
| Leer la bitácora | `pg_read_file(pg_current_logfile())` (vista `dba.bitacora`) | `db.adminCommand({ getLog: "global" })` |
| Configurar registro | `ALTER SYSTEM` + `pg_reload_conf()` o reinicio | `db.setProfilingLevel()` o archivo de configuración |
| Ver configuración vigente | `pg_settings` (`source`, `pending_restart`) | `db.getProfilingStatus()` |
| Reglas de autenticación | `pg_hba_file_rules` | `security.authorization` |
| Sesiones actuales | `pg_stat_activity` | — |
| Valor anterior | Disparador + tabla de auditoría | No disponible |
| Lecturas por columna | `pgaudit` (opcional) | Nivel 2 (sin filtro por campo) |
| Diccionario | `COMMENT` + `information_schema` | Documento externo |

## Referencias

<div class="small">

* Oracle. *Database Concepts* 21c, "Data Dictionary and Dynamic Performance Views". https://docs.oracle.com/en/database/oracle/oracle-database/21/cncpt/data-dictionary-and-dynamic-performance-views.html
* IBM. "What Is a Data Catalog?". https://www.ibm.com/think/topics/data-catalog
* NIST. *SP 800-92: Guide to Computer Security Log Management*. https://csrc.nist.gov/pubs/sp/800/92/final
* MongoDB. *MongoDB Manual*, "Auditing". https://www.mongodb.com/docs/manual/core/auditing/
* MongoDB. *MongoDB Manual*, "Database Profiler". https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/
* MongoDB. *MongoDB Manual*, "Database Profiler Output". https://www.mongodb.com/docs/manual/reference/database-profiler/
* MongoDB. *MongoDB Manual*, "Log Messages". https://www.mongodb.com/docs/manual/reference/log-messages/
* MongoDB. *MongoDB Manual*, "getLog". https://www.mongodb.com/docs/manual/reference/command/getLog/
* MongoDB. *MongoDB Manual*, "Self-Managed Configuration File Options". https://www.mongodb.com/docs/manual/reference/configuration-options/
* PostgreSQL. "Error Reporting and Logging". https://www.postgresql.org/docs/current/runtime-config-logging.html
* PostgreSQL. "The Cumulative Statistics System". https://www.postgresql.org/docs/current/monitoring-stats.html
* PostgreSQL 16. "Trigger Functions". https://www.postgresql.org/docs/16/plpgsql-trigger.html
* PostgreSQL 16. "ALTER SYSTEM". https://www.postgresql.org/docs/16/sql-altersystem.html
* PostgreSQL 16. "Setting Parameters". https://www.postgresql.org/docs/16/config-setting.html
* PostgreSQL 16. "System Information Functions and Operators". https://www.postgresql.org/docs/16/functions-info.html
* PostgreSQL 16. "System Administration Functions". https://www.postgresql.org/docs/16/functions-admin.html
* PostgreSQL 16. "pg_hba_file_rules". https://www.postgresql.org/docs/16/view-pg-hba-file-rules.html
* PostgreSQL 16. "COMMENT". https://www.postgresql.org/docs/16/sql-comment.html
* PostgreSQL 16. "columns". https://www.postgresql.org/docs/16/infoschema-columns.html
* pgaudit. Repositorio oficial. https://github.com/pgaudit/pgaudit
* DAMA International. *DAMA-DMBOK*, 2.ª ed. https://dama.org/cpages/body-of-knowledge

</div>
