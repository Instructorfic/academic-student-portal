---
title: "1. Auditoría de bases de datos"
description: "Unidad 3 de DBA — qué es y qué no es la auditoría, eventos auditables y qué merece registrarse."
---

**Temas del programa:** 3.1

## Auditoría: qué es y qué no es

| | Control de acceso | Auditoría |
| --- | --- | --- |
| Pregunta | ¿Quién **puede** hacerlo? | ¿Quién **lo hizo**, cuándo, desde dónde? |
| Momento | Antes de la operación | Durante y después |
| Resultado | Permite o niega | Registra, sea o no autorizado |
| Ejemplo | `GRANT UPDATE ON clientes TO app_ventas` | Línea de bitácora con el `UPDATE` |

<div class="callout">

**Auditar** es registrar de forma sistemática lo que ocurre en una base de datos para que pueda usarse después como **evidencia**.

</div>

## Tres ideas que no debes olvidar

<div class="grid-3">

<div class="card accent-rojo"><strong>No impide nada</strong><p>La auditoría registra. Una operación permitida pero indebida solo se descubre con el registro.</p></div>
<div class="card accent-dorado"><strong>No se configura después</strong><p>Lo que no se registró en su momento no puede reconstruirse desde la bitácora.</p></div>
<div class="card accent-azul"><strong>Registrar no basta</strong><p>La bitácora es evidencia solo si se conserva y alguien puede interpretarla.</p></div>

</div>

## Eventos auditables

| Tipo | Ejemplo | ¿Por qué se audita? |
| --- | --- | --- |
| Acceso exitoso | Inicio de sesión de `app_ventas` | Quién estuvo dentro y cuándo |
| Acceso fallido | Contraseña incorrecta | Intentos no autorizados, fuerza bruta |
| Privilegios | `GRANT`, `REVOKE`, `CREATE ROLE` | Quien obtiene privilegios puede hacer lo demás |
| Estructura | `ALTER TABLE`, `DROP`, migraciones | Puede romper la aplicación o borrar datos |
| Datos sensibles | Modificar o leer un RFC | Responsabilidad sobre datos personales |
| Error de autorización | `permission denied` | Alguien intentó lo que no le correspondía |
| Configuración | Apagar el registro | Quien apaga la auditoría actúa sin rastro |

## Ejemplo: un evento de cada tipo en una bitácora real

<div class="small">

| Tipo | Línea registrada por PostgreSQL 16 (resumida) |
| --- | --- |
| Acceso exitoso | `user=app_ventas ... LOG: connection authorized: user=app_ventas database=comercial application_name=app-ventas-web` |
| Acceso fallido | `user=app_ventas ... FATAL: password authentication failed for user "app_ventas"` |
| Privilegios | `user=postgres ... LOG: statement: GRANT UPDATE ON clientes TO app_ventas` |
| Estructura | `user=postgres ... LOG: statement: ALTER TABLE clientes ADD COLUMN segmento VARCHAR(20)` |
| Datos | `user=app_ventas ... LOG: statement: UPDATE clientes SET telefono = '6679990000' WHERE id = 3` |
| Error de autorización | `user=soporte_ana ... ERROR: permission denied for table clientes` |
| Configuración | `LOG: parameter "log_statement" changed to "mod"` |

</div>

<div class="callout">

Durante la unidad aprenderás a configurar el servidor para que produzca cada una de estas líneas y a leerlas campo por campo.

</div>

## No todo merece registrarse

<div class="grid-3">

<div class="card accent-verde"><strong>Normalmente no prioritario</strong><p>Un usuario consulta su propio perfil</p></div>
<div class="card accent-dorado"><strong>Depende del volumen</strong><p>Un usuario consulta miles de registros en pocos minutos</p></div>
<div class="card accent-azul"><strong>Relevante por contexto</strong><p>Se reinicia el servicio: explica huecos en la bitácora</p></div>

</div>

<div class="callout-alerta">

Registrar todo produce volumen, costo de almacenamiento y un nuevo riesgo: la bitácora se convierte en otro depósito de datos sensibles.

</div>

## Actividad 2: Clasificación de eventos auditables

Clasifica cada evento como **auditable** o **no auditable prioritario** y justifica:

1. Un usuario consulta su propio perfil.
2. Un administrador otorga permisos de escritura a otro usuario.
3. Se elimina una columna de una tabla.
4. Un usuario lee un registro de nómina que no le corresponde.
5. Se reinicia el servicio.
6. Un usuario consulta muchos registros en poco tiempo.

<div class="callout">

Relaciona cada justificación con seguridad, cumplimiento o responsabilidad, no con "porque sí".

</div>

## Qué sigue

Continúa con [2. Bitácoras en PostgreSQL](/materias/dba/unidad-03/02-bitacoras-en-postgresql/).
