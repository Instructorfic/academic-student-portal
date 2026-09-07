---
title: "Presentación — Unidad 1"
description: "Resumen de diapositivas de la Unidad 1 de DBA (rol del DBA, responsabilidades, ambientes y arquitectura)."
---

> Contenido derivado de la presentación de la unidad, sin información
> nueva respecto al manual del estudiante. Cada bloque corresponde a un
> grupo de diapositivas del original.

## Objetivos de aprendizaje

- **OE-U1.1** — Explicar el rol del DBA y su relación con desarrollo, seguridad, infraestructura y dirección organizacional.
- **OE-U1.2** — Describir las responsabilidades operativas cotidianas del DBA.
- **OE-U1.3** — Diferenciar los ambientes de desarrollo, pruebas y producción, y justificar los riesgos de no separarlos.
- **OE-U1.4** — Describir la arquitectura lógica/física y de memoria de un SGBD relacional.
- **OE-U1.5** — Describir los modelos de datos de un SGBD NoSQL desde una perspectiva operativa.

## Una base de datos no se administra sola

El punto de partida: una base de datos sin responsable claro, sin
ambientes separados, sin documentación de su configuración, que falla de
forma intermitente después de una modificación directa en producción.

> **Pregunta orientadora.** ¿Qué debería existir —roles,
> responsabilidades, ambientes, conocimiento de la arquitectura— para
> que una base de datos de la que dependen personas reales no termine en
> esa situación?

## Bloque 1 — El DBA como función profesional

- ¿Qué significa ser DBA? Responsabilidad integral, no solo dominio de SQL.
- El DBA administra un servicio, no solamente una base de datos.
- El DBA no trabaja aislado: se relaciona con desarrollo, seguridad, infraestructura y dirección organizacional.
- ¿Hasta dónde llega la responsabilidad del DBA? Seguridad y continuidad, desde el día uno.

**Actividad 1 · El problema detrás del problema** — diagnóstico de ideas previas.
**Actividad 2 · Mapa de relación del DBA con otros roles.**

## Bloque 2 — Responsabilidades operativas del DBA

- ¿Qué hace un DBA durante una semana normal? Las seis responsabilidades operativas.
- Dos dimensiones transversales: desempeño y disponibilidad.
- De la responsabilidad a la acción: un principio importante — diagnosticar antes de optimizar.

**Actividad 3 · ¿Qué haría un DBA?** — clasificación de responsabilidades operativas.

## Bloque 3 — Desempeño y disponibilidad

- Dos conceptos que no debemos confundir: "funciona pero lento" (desempeño) frente a "no responde" (disponibilidad).
- ¿Por qué importa esta diferencia? Cada una tiene un diagnóstico y una solución distintos.

## Bloque 4 — Ambientes: dónde ocurre cada cambio

- ¿Qué es un ambiente? Infraestructura + configuración + datos, con un propósito específico.
- Tres ambientes, tres propósitos: desarrollo, pruebas, producción.
- ¿Por qué no trabajar directamente en producción?
- Separar ambientes no significa aislarlos por completo: paridad entre ambientes.
- Una cuarta posibilidad en la industria: preproducción/*staging*.
- **Caso de estudio · Knight Capital** — ¿qué debemos aprender?
- **Caso de estudio · GitLab** — una pregunta más profunda.

**Actividad 4 · Analizar un incidente** — análisis de riesgo por falta de separación de ambientes.

## Bloque 5 — Arquitectura de un SGBD relacional

- Antes de hablar de motores: SGBD, motor, base de datos — no son sinónimos.
- El modelo mental: memoria y almacenamiento no cumplen la misma función.
- ¿Qué ocurre cuando llega una consulta? Organización lógica → física, y memoria compartida.
- ¿Cómo resuelven esto Oracle y PostgreSQL? Dos ejemplos paralelos del mismo problema.
- Del dato lógico al dato físico.

**Actividad 5 · Construye el modelo** — diagrama de arquitectura de un SGBD relacional.

## Bloque 6 — Arquitecturas NoSQL

- NoSQL: una familia, no una sola arquitectura.
- Cuatro modelos para reconocer: documental, clave-valor, columnar, grafos.
- El mismo contexto, cuatro perspectivas — un mismo dato modelado de cuatro formas distintas.
- ¿Por qué existen distintos modelos? Cada uno resuelve mejor un tipo de problema.
- Lo importante no es memorizar herramientas, es reconocer el patrón.

**Actividad 6 · Elegir el modelo adecuado** — comparación de modelos NoSQL.

## Bloque 7 — Integración: pensar como DBA

Regresemos al problema inicial: responsabilidades poco claras, cambios
directos en producción, ausencia de documentación, desconocimiento de la
arquitectura, falta de controles operativos.

**Cinco preguntas para analizar una base de datos:**

1. **Quién** — Responsabilidad. ¿Quién administra y quién decide?
2. **Qué** — Operación. ¿Qué tareas deben controlarse?
3. **Dónde** — Ambiente. ¿Dónde se desarrolla, prueba y opera?
4. **Cómo** — Arquitectura. ¿Cómo organiza y procesa los datos?
5. Y una quinta: ¿qué puede salir mal y cómo lo detectamos?

**El DBA piensa en relaciones.** Ante "necesitamos modificar la base de
datos", el DBA se pregunta: ¿qué cambia? ¿dónde se prueba? ¿quién
autoriza? ¿cómo se despliega? ¿cómo se recupera?

**Actividad 7 · Diagnóstico integral** — evidencia oficial de la unidad:
responsabilidades, ambientes y arquitectura del entorno asignado.

**Qué debes llevarte de esta unidad:**

- **El DBA** administra un servicio de datos crítico, no solamente consultas SQL.
- **Los ambientes** separan experimentar, validar y operar con usuarios reales.
- **La arquitectura** explica cómo el SGBD representa, procesa y conserva los datos.

**Cinco preguntas antes de continuar** (para verificar tu propia
comprensión antes de la Unidad 2): ¿qué hace un DBA?, ¿qué
responsabilidades administra?, ¿por qué separar ambientes?, ¿cómo
funciona un SGBD a nivel conceptual? — y una pregunta final: ¿qué
riesgos aparecen cuando ninguna de estas preguntas tiene una respuesta
clara?

## Lo que sigue

De la administración a la seguridad: en la Unidad 2 vas a aplicar
controles de seguridad y acceso sobre un entorno como el diagnosticado en
la Actividad 7.

## Referencias

Quince referencias (documentación oficial de Oracle,
PostgreSQL, MongoDB, Redis, Cassandra, Neo4j y AWS/IBM, la metodología
*The Twelve-Factor App*, un documento regulatorio de la SEC, y un
postmortem oficial de GitLab). Listado completo en
[Referencias](/materias/dba/unidad-01/referencias/).
