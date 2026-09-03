---
title: "Unidad 1 · Introducción a la Gestión de Bases de Datos"
description: Presentación de la Unidad 1 de DBA. El rol del DBA, responsabilidades operativas, ambientes y arquitectura relacional y NoSQL.
---

Esta unidad abre la materia. Su objetivo es que entiendas qué hace una
persona responsable de una base de datos en operación, antes de tocar la
configuración de un motor real. Es una unidad conceptual.

## Identificación de la unidad

| Campo | Información |
| --- | --- |
| Unidad | U1 · Introducción a la Gestión de Bases de Datos |
| Materia | Gestión de Seguridad y Desempeño de Bases de Datos (DBA) |
| Carácter | Conceptual, sin configuración de un SGBD real |

## Competencias de referencia

> **COMP-DBA-01.** Explicar el rol profesional del DBA, sus
> responsabilidades operativas y la separación entre ambientes de
> desarrollo, pruebas y producción.

> **COMP-DBA-02.** Describir la arquitectura de almacenamiento y memoria
> de un SGBD relacional y los modelos de datos de un SGBD NoSQL.

Estas competencias son una propuesta de referencia, no oficiales. Los
objetivos específicos de la unidad las dividen en metas más concretas:

* **OE-U1.1.** Explicar el rol del DBA y su relación con desarrollo, seguridad, infraestructura y dirección organizacional.
* **OE-U1.2.** Describir las responsabilidades operativas cotidianas del DBA.
* **OE-U1.3.** Diferenciar los ambientes de desarrollo, pruebas y producción, y justificar los riesgos de no separarlos.
* **OE-U1.4.** Describir la arquitectura lógica, física y de memoria de un SGBD relacional.
* **OE-U1.5.** Describir los modelos de datos de un SGBD NoSQL desde una perspectiva operativa.

## Qué vas a estudiar y cómo

### Temario de la unidad

```text
1. Función del DBA en organizaciones actuales
  1.1 Administración técnica de bases de datos
  1.2 Seguridad y continuidad de datos
  1.3 Desempeño y disponibilidad
  1.4 Relación con desarrollo, seguridad, infraestructura y dirección organizacional

2. Responsabilidades operativas del DBA
  2.1 Configuración inicial y mantenimiento
  2.2 Gestión de usuarios y privilegios
  2.3 Monitoreo del servicio
  2.4 Diagnóstico de fallas
  2.5 Optimización de desempeño
  2.6 Documentación y bitácoras operativas

3. Ambientes de trabajo
  3.1 Desarrollo, pruebas y producción
  3.2 Separación de responsabilidades entre ambientes
  3.3 Riesgos de operar sin separación de ambientes

4. Arquitectura de almacenamiento en SGBD relacionales (SQL)
  4.1 Estructuras lógicas y físicas
  4.2 Gestión de memoria

5. Arquitectura en SGBD NoSQL
  5.1 Modelos de datos (documental, clave-valor, columnar, grafos)
```

Numeración según el programa oficial de la materia, sección 4, "UNIDAD I".

### Ruta de estudio sugerida

1. Lee esta introducción y responde la pregunta orientadora.
2. Realiza la [Actividad 1](/materias/dba/unidad-01/actividades/actividad-1/).
3. Lee [El rol del DBA](/materias/dba/unidad-01/01-rol-del-dba/) y realiza la [Actividad 2](/materias/dba/unidad-01/actividades/actividad-2/).
4. Lee [Responsabilidades operativas](/materias/dba/unidad-01/02-responsabilidades-operativas/) y realiza la [Actividad 3](/materias/dba/unidad-01/actividades/actividad-3/).
5. Lee [Ambientes de trabajo](/materias/dba/unidad-01/03-ambientes-de-trabajo/) y realiza la [Actividad 4](/materias/dba/unidad-01/actividades/actividad-4/).
6. Lee [Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/) y realiza la [Actividad 5](/materias/dba/unidad-01/actividades/actividad-5/).
7. Lee [Arquitectura NoSQL](/materias/dba/unidad-01/05-arquitectura-nosql/) y realiza la [Actividad 6](/materias/dba/unidad-01/actividades/actividad-6/).
8. Realiza la [Actividad 7](/materias/dba/unidad-01/actividades/actividad-7/), que es la evidencia oficial de la unidad.
9. Completa la autoevaluación y revisa el [cierre](/materias/dba/unidad-01/06-cierre-y-autoevaluacion/) antes de dar por terminada la unidad.

### Qué vas a producir

La evidencia oficial de la unidad es un mapa de responsabilidades del DBA
y un diagnóstico de un entorno de base de datos, sobre un entorno que te
describirá tu docente (Actividad 7). Las actividades 1 a 6 son de apoyo:
te preparan para construir esa evidencia final.

## ¿Qué problema vamos a resolver?

Piensa en esta situación:

> Una base de datos que hasta ahora "solo funcionaba", sin un responsable
> técnico claro, sin ambientes separados y sin documentación de su
> configuración, empieza a fallar de forma intermitente. Alguien modifica
> datos directamente en producción para "resolver rápido" un problema, y
> nadie puede explicar con certeza cómo está configurada esa base de
> datos ni quién tiene acceso a qué.

Es solo un escenario para arrancar la discusión, sin nombre de empresa ni
cifras.

Hasta ahora, en materias anteriores, trabajaste sobre todo como
**diseñador o usuario** de una base de datos: modelaste entidades,
escribiste consultas SQL y entendiste en términos generales qué es una
base de datos NoSQL. Esta unidad cambia la perspectiva. A partir de aquí
piensas como la persona **responsable** de que una base de datos ya en
funcionamiento sea segura, eficiente y esté disponible.

Situaciones como esta no son raras. Todos los días confías tus fotos, tus
conversaciones y tus contraseñas a aplicaciones que dependen de bases de
datos como esa, sin pensarlo dos veces.

> **Pregunta orientadora.** ¿Qué debería existir (roles, responsabilidades,
> ambientes, conocimiento de la arquitectura) para que una base de datos
> de la que dependen personas reales no termine en la situación anterior?

## Antes de empezar

> **Actividad 1 · Diagnóstico de ideas previas.** Antes de continuar,
> discute, en grupo o por tu cuenta según indique tu docente: a partir de
> la situación anterior, ¿qué salió mal? ¿quién debería haberlo evitado?
> La guía completa está en la
> [Actividad 1](/materias/dba/unidad-01/actividades/actividad-1/).
