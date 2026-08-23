---
title: "Presentación — Unidad 2"
description: Resumen de diapositivas de la Unidad 2 de DBA (seguridad, privacidad y control de acceso).
---

> Contenido derivado de la presentación Marp de la unidad, sin
> información nueva. Cada bloque corresponde a una diapositiva del
> original.

## Objetivos de la unidad

Al finalizar esta unidad podrás:

- **OE-U2.1** — Explicar los principios de seguridad de datos y mitigar inyección SQL/NoSQL.
- **OE-U2.2** — Implementar control de acceso mediante usuarios, roles y permisos.
- **OE-U2.3** — Aplicar protección de datos sensibles: clasificación y enmascaramiento.
- **OE-U2.4** — Aplicar cifrado en tránsito y en reposo.
- **OE-U2.5** — Explicar el marco normativo mexicano de privacidad (LFPDPPP, LGPDPPSO).
- **OE-U2.6** — Aplicar hardening a un servidor de base de datos.

## El entorno que dejamos en la Unidad 1

Sin ambientes separados, sin responsable claro. Ahora, además: sin
control de acceso, sin cifrado, sin clasificación de datos sensibles,
con configuración de instalación por defecto.

> ¿Cómo protegemos ese entorno — quién puede acceder a qué, cómo se
> protegen los datos sensibles, y cómo se reduce la superficie de
> ataque del servidor?

## Principios de seguridad (CIA + privilegio mínimo)

- **Confidencialidad, integridad, disponibilidad** — retomados de Ciberseguridad, aplicados aquí a datos.
- **Privilegio mínimo** — cada usuario/proceso solo con los permisos que necesita.
- **Separación de funciones** — ninguna persona controla todo el ciclo de una operación sensible sola.

## Inyección SQL e inyección NoSQL

```text
-- Vulnerable: concatenación de texto en el código de la aplicación
"SELECT * FROM usuarios WHERE nombre = '" + entrada + "'"
```

```sql
-- Seguro: consulta parametrizada
SELECT * FROM usuarios WHERE nombre = $1;
```

Entrada maliciosa simple: `' OR '1'='1` — rompe la primera, no la segunda.

## Control de acceso: usuarios, roles y permisos

- **Rol** — en PostgreSQL, un usuario es un rol con `LOGIN`.
- `GRANT` / `REVOKE` — otorgar y retirar privilegios.
- MongoDB: control de acceso basado en roles (RBAC), **no activo por defecto** — debe habilitarse explícitamente (`--auth`).

## Protección de datos sensibles

- **Clasificación** — dato personal vs. dato sensible vs. no sensible.
- **Enmascaramiento** (*data masking*) — ocultar parte de un valor.
- **Seudonimización** (reversible con llave) vs. **anonimización** (irreversible) — no son lo mismo.

## Cifrado: en tránsito y en reposo

- **En tránsito** — protege los datos mientras viajan por la red (TLS/SSL).
- **En reposo** — protege los datos almacenados en disco (`pgcrypto` como ejemplo de columna cifrada).

> El cifrado no sustituye al control de acceso: alguien con credenciales
> válidas puede leer datos cifrados igual que datos sin cifrar.

## Privacidad y cumplimiento normativo (marco mexicano)

- **LFPDPPP** — sector privado.
- **LGPDPPSO** — sujetos obligados (sector público).
- **Derechos ARCO** — Acceso, Rectificación, Cancelación, Oposición.

> GDPR, SOX, HIPAA se mencionan solo como referencia internacional, no
> como marco central de esta unidad.

## Hardening: protección de servidores de bases de datos

- Reducción de superficie de ataque.
- Configuración segura por defecto (no la de instalación).
- Restricción de conexiones remotas y puertos (`pg_hba.conf`).
- Seguridad de red: segmentación, firewall, *allowlists*.
- Línea base: checklist, comparación antes/después, documentación.

## Caso real: MongoDB sin autenticación (2017)

Miles de instancias MongoDB expuestas en internet sin autenticación
habilitada (configuración por defecto) fueron secuestradas por
atacantes en cuestión de horas.

> La configuración por defecto de un SGBD no es una configuración
> segura.

## Mini quiz de verificación

> Autoevaluación formativa — no se califica, no sustituye la Actividad 8.

1. (V/F) Cifrar los datos ya resuelve por sí solo el problema de control de acceso.
2. ¿Cuál técnica es reversible mediante una llave separada? a) enmascaramiento b) seudonimización c) anonimización
3. En PostgreSQL, ¿qué comando otorga un privilegio a un rol? a) `GRANT` b) `REVOKE` c) `CREATE ROLE`
4. (V/F) MongoDB tiene el control de acceso habilitado por defecto.
5. ¿Qué archivo de PostgreSQL controla qué conexiones se aceptan y con qué método de autenticación?
6. La LFPDPPP aplica principalmente a: a) sector privado b) sujetos obligados del sector público
7. En una frase: ¿qué es "hardening"?

## Lo que sigue

En la Unidad 3 vas a auditar y rastrear que estos controles realmente se
estén cumpliendo. El control de acceso, la clasificación de datos y el
hardening de esta unidad son la base que la Unidad 3 va a dar por
conocida.
