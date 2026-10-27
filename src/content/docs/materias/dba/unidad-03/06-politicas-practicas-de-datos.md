---
title: "6. Políticas prácticas de datos"
description: "Unidad 3 de DBA — política frente a procedimiento, las seis políticas prácticas, plantilla y verificabilidad."
---

**Temas del programa:** 3.3

## Política no es procedimiento

<div class="grid-2">

<div class="card accent-azul"><strong>Política</strong><p>Regla de decisión: <b>qué</b> debe hacerse, <b>quién</b> decide y <b>cómo se demuestra</b>.<br>"Se respalda diariamente y el custodio verifica cada mes que el respaldo puede restaurarse."</p></div>
<div class="card accent-dorado"><strong>Procedimiento</strong><p>Pasos técnicos para cumplirla.<br>"Ejecutar el comando de respaldo a las 2:00."<br>Se estudia en la <b>Unidad V</b>.</p></div>

</div>

## Las seis políticas prácticas

| Política | Debe responder |
| --- | --- |
| Acceso | ¿Quién solicita, quién aprueba, cada cuánto se revisa? |
| Respaldo | ¿Qué se respalda, con qué frecuencia, quién verifica que sirve? |
| Retención | ¿Cuánto se conservan datos y bitácoras? ¿Qué pasa al vencer? |
| Restauración | ¿Quién autoriza, quién ejecuta y en qué condiciones? |
| Datos sensibles | ¿Quién accede, con qué justificación, cómo se registra? |
| Cambios en producción | ¿Qué ocurre antes, durante y después del cambio? |

## Plantilla mínima

```text
POL-0X — Nombre

Objetivo:      qué riesgo reduce
Alcance:       datos, sistemas y ambientes
Regla:         una a tres oraciones verificables
Responsable:   quién decide / quién ejecuta
Excepciones:   cuándo puede omitirse y quién lo autoriza
Evidencia:     qué registro demuestra que se cumplió
Revisión:      cada cuánto se revisa
```

<div class="callout">

**Cambios en producción** retoma la definición de **ambiente** de la Unidad I.

</div>

## Ejemplo: una política completa

```text
POL-06 — Cambios en producción

Objetivo:     evitar cambios de estructura o de privilegios no autorizados en producción
Alcance:      base comercial (PostgreSQL y MongoDB), ambiente de producción
Regla:        todo cambio en producción requiere una solicitud con folio aprobada por el
              Comité de cambios y se ejecuta dentro de la ventana autorizada. El DBA concilia
              cada mes las sentencias CREATE, ALTER, DROP, GRANT y REVOKE de la bitácora con
              las solicitudes aprobadas
Responsable:  decide el Comité de cambios, ejecuta el DBA, concilia una persona distinta del DBA
Excepciones:  emergencia que detiene la operación. Se ejecuta con aviso al propietario y la
              solicitud se registra en las 24 horas siguientes
Evidencia:    tabla gobierno.solicitudes_cambio + bitácora exportada con hash + acta de conciliación
Revisión:     anual, o después de cualquier cambio no autorizado detectado
```

## Verificable o no verificable

<div class="grid-2">

<div class="card accent-verde"><strong>Verificable</strong><p>"Todo cambio de privilegios en producción requiere una solicitud aprobada por el propietario del dato. El DBA concilia mensualmente la bitácora de <code>GRANT</code> y <code>REVOKE</code> con las solicitudes aprobadas."</p></div>
<div class="card accent-rojo"><strong>No verificable</strong><p>"Los accesos deben otorgarse con cuidado."</p></div>

</div>

<div class="callout">

La diferencia está en la **evidencia**: la primera nombra un registro que alguien puede revisar.

</div>

## Las políticas deben ser coherentes entre sí

<div class="grid-2">

<div class="card accent-rojo"><strong>Contradicción</strong><p>Retención: "eliminar los datos de clientes dados de baja a los 30 días".<br>Datos sensibles: "conservar la auditoría completa para investigar incidentes durante un año".</p></div>
<div class="card accent-azul"><strong>Resolución</strong><p>Decidir explícitamente qué conserva la auditoría, durante cuánto, con qué acceso, y quién lo aprueba. Registrar la decisión.</p></div>

</div>

## Actividad 6: Políticas prácticas

1. Redacta POL-01 a POL-06 con la plantilla, para la base `comercial` de Comercializadora Norte.
2. Cada **Evidencia** nombra un registro concreto, o indica que hoy no existe.
3. POL-02 y POL-04 son reglas de decisión: "El procedimiento técnico se definirá en la Unidad V".
4. Revisa que no se contradigan.

<div class="callout">

Esta actividad se desarrolla dentro del **Laboratorio 03 — Políticas prácticas, gobierno de datos y evidencias**.

</div>

## Relación con el laboratorio

<div class="callout">

Las políticas prácticas se redactan en el [Laboratorio 3 — Políticas prácticas, gobierno de datos y evidencias](/materias/dba/unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias/).

</div>

## Qué sigue

Continúa con [7. Gobierno práctico de datos](/materias/dba/unidad-03/07-gobierno-practico-de-datos/).
