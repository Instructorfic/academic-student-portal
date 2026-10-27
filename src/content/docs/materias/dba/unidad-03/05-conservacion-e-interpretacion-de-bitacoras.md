---
title: "5. Conservación e interpretación de bitácoras"
description: "Unidad 3 de DBA — condiciones de la evidencia, criterio de conservación, interpretación y cronología."
---

**Temas del programa:** 3.2

## Tres condiciones de la evidencia

```text
REGISTRO      →   el evento quedó escrito
CONSERVACIÓN  →   el registro sigue existiendo, íntegro y protegido, cuando se necesita
INTERPRETACIÓN →  alguien puede leerlo y responder preguntas concretas
```

<div class="callout">

Si falta cualquiera de las tres, **no hay evidencia útil**.

</div>

## Cómo se pierde la evidencia sin que nadie la borre

| Registro | Cómo se pierde |
| --- | --- |
| Archivo de bitácora de PostgreSQL | Rotación sin conservar los archivos anteriores, reinstalación o recreación del servidor |
| Bitácora de `mongod` en memoria (`getLog`) | Reinicio del servicio. Solo guarda los 1024 eventos más recientes |
| Bitácora en la salida estándar | Se pierde con el proceso o el contenedor que la produjo, si nadie la recoge |
| `system.profile` | Se sobrescribe al llenar 1 MB |
| Nivel del perfilador | Vuelve a `0` al reiniciar, si no está en el archivo de configuración |
| Tabla de auditoría | La desactiva o depura quien la administra |
| Cualquier bitácora | `log_statement` en `none` durante un periodo |

## Criterio de conservación

<div class="grid-2">

<div class="card accent-azul"><strong>Sensibilidad</strong><p>Un cambio de privilegios pesa más que una consulta rutinaria</p></div>
<div class="card accent-dorado"><strong>Obligaciones</strong><p>Plazos que confirma el área jurídica. <b>El DBA no inventa plazos legales.</b></p></div>
<div class="card accent-verde"><strong>Espacio y costo</strong><p>El volumen depende del nivel de registro elegido</p></div>
<div class="card accent-rojo"><strong>Conflicto con la retención</strong><p>La auditoría conserva datos que la política de retención pide eliminar</p></div>

</div>

<span class="fuente">Fuente: NIST SP 800-92, "Guide to Computer Security Log Management"</span>

## Ejemplo: un criterio de conservación razonado

<div class="small">

| Registro | Sensibilidad | Periodo propuesto | Justificación | Dónde se conserva | Al vencer |
| --- | --- | --- | --- | --- | --- |
| Cambios de privilegios y estructura | Alta | Más largo que el resto | Permiten reconstruir quién pudo hacer qué en cualquier momento | Fuera del servidor, con hash | Depurar con autorización del propietario |
| Accesos fallidos | Media | Intermedio | Sirven para detectar patrones de ataque en el tiempo | Fuera del servidor | Depurar |
| `auditoria.cambios_clientes` | Alta, contiene datos personales | Plazo a confirmar con el área jurídica | Conflicto con la retención de datos personales | Esquema protegido | Decisión del propietario y jurídico |
| `system.profile` | Media, contiene filtros de consultas | No sirve para conservar: 1 MB | Se sobrescribe sola | Exportar a archivo | Depurar el archivo exportado |

</div>

<div class="callout">

El ejemplo usa periodos **relativos**. Los plazos en días o meses dependen de las obligaciones de cada organización y no los fija el DBA por su cuenta.

</div>

## Interpretar es responder preguntas

<div class="grid-2">

<div class="card accent-azul"><strong>Preguntas</strong><p>¿Quién? ¿Cuándo? ¿Desde dónde? ¿Con qué aplicación? ¿Qué tipo de evento? ¿Fue exitoso?</p></div>
<div class="card accent-dorado"><strong>Pregunta clave</strong><p>¿Qué <b>prueba</b> esta línea y qué <b>no</b> prueba?</p></div>

</div>

| Línea | Prueba | No prueba |
| --- | --- | --- |
| `user=app_ventas ... statement: UPDATE ...` | Que se usó la credencial `app_ventas` desde `127.0.0.1` | Qué persona estaba detrás |
| `FATAL: password authentication failed` | Que hubo un intento fallido | Que fue un ataque |

<div class="callout-alerta">

Cuando no alcanza la evidencia: **"No hay evidencia"** y su razón técnica. Nunca una explicación inventada.

</div>

## Reconstruir una cronología

Fragmento de una ejecución verificada del Laboratorio 01:

<div class="small">

| # | Hora (UTC) | Usuario | Cliente | Tipo | Qué ocurrió |
| --- | --- | --- | --- | --- | --- |
| — | Sin registro | — | — | Datos | Primer cambio del RFC: **no hay evidencia** (registro apagado) |
| 1 | 22:49:50.539 | `postgres` (PID 1) | — | Configuración | `log_statement` cambia a `ddl` |
| 2 | 22:50:00.334 | `app_ventas` | 127.0.0.1 | Acceso | Contraseña incorrecta |
| 3 | 22:50:00.462 | `usuario_inexistente` | 127.0.0.1 | Acceso | Rol inexistente |
| 4 | 22:50:09.367 | `postgres` | local | Privilegio | `GRANT UPDATE ON clientes TO app_ventas` |
| 5 | 22:50:20.601 | `app_ventas` | 127.0.0.1 | Datos | `UPDATE clientes SET telefono = ...` |
| 6 | 22:50:20.720 | `soporte_ana` | 127.0.0.1 | Error | `permission denied` al intentar `DELETE` |

</div>

<div class="callout">

Un evento que no se registró **no tiene hora** en la cronología. Se declara como hueco de evidencia, no se estima.

</div>

## Actividad 5: Interpretación y conservación

1. Con tu bitácora de PostgreSQL o de MongoDB, interpreta **al menos cuatro** eventos distintos.
2. Indica qué prueba y qué no prueba cada uno.
3. Propón cuánto tiempo conservarías ese tipo de bitácora y justifica con sensibilidad, obligaciones y espacio.

<div class="callout">

No existe una cifra única correcta. Se evalúa el **razonamiento**, no el número.

</div>

## Relación con el laboratorio

<div class="callout">

La conservación de bitácoras se practica en el [Laboratorio 3 — Políticas prácticas, gobierno de datos y evidencias](/materias/dba/unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias/), con las bitácoras que generaste en los Laboratorios 1 y 2.

</div>

## Qué sigue

Continúa con [6. Políticas prácticas de datos](/materias/dba/unidad-03/06-politicas-practicas-de-datos/).
