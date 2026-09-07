---
title: "5. Arquitectura en SGBD NoSQL"
description: "Unidad 1 de DBA — los cuatro modelos de datos NoSQL: documental, clave-valor, columnar y grafos."
---

Así como un SGBD relacional organiza su almacenamiento en tablespaces y
datafiles (ver [Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/)),
un SGBD NoSQL organiza sus datos según un **modelo de datos**
particular. Esta sección revisa los cuatro modelos más comunes, cada uno
con un motor real como ejemplo:

## Modelo documental

Un documento es la unidad básica de datos en bases de datos documentales
como MongoDB. Los documentos están compuestos por pares campo-valor,
donde el valor de un campo puede ser cualquier tipo de dato admitido
—incluidos otros documentos o arreglos de documentos—, lo que permite
representar datos jerárquicos dentro de un mismo documento (REF-U1-07:
MongoDB Manual, "Documents").

**Ejemplo mínimo:**

```json
{
  "_id": "u1001",
  "nombre": "Ana Torres",
  "cursos": ["DBA", "Redes"]
}
```

Este documento agrupa, en una sola unidad, datos que en un modelo
relacional normalmente vivirían en dos tablas distintas (una de
estudiantes, otra de inscripciones): la relación "un estudiante tiene
varios cursos" queda representada directamente dentro del documento,
como un arreglo.

## Modelo clave-valor

En una base de datos clave-valor como Redis, el objeto de datos asociado
a una clave particular se conoce como el valor, y ambos juntos forman un
**par clave-valor**. La clave es una cadena que se usa para recuperar el
valor asociado o modificar sus datos. En Redis las claves prácticamente
no tienen restricciones de formato (REF-U1-08: Redis Documentation,
"Redis data types").

**Ejemplo mínimo:**

```text
sesion:usr1001 → "activa, expira en 30 min"
```

Redis no sabe (ni le importa) qué significa el texto del valor: solo lo
guarda y lo entrega de vuelta cuando alguien pide esa clave. A diferencia
del modelo documental, aquí no hay campos internos que el motor pueda
consultar por separado.

## Modelo columnar (wide-column)

Apache Cassandra implementa un **modelo de almacenamiento de columnas
anchas particionado** (*partitioned wide-column storage model*). Los
datos se organizan en ***keyspaces*** —el espacio de nombres de nivel
superior de Cassandra, aproximadamente equivalente a una base de datos
en un motor relacional— que contienen tablas compuestas por filas y
columnas, y las tablas se particionan según una clave primaria que
determina en qué nodo del clúster se almacena cada fila (REF-U1-09:
Apache Cassandra Documentation, v5.0, "Overview").

**Ejemplo mínimo:**

```text
keyspace: universidad
tabla: inscripciones
partición (clave): usr1001
  columna: curso="DBA",   fecha="2026-08-25"
  columna: curso="Redes", fecha="2026-08-26"
```

Todas las filas de un mismo estudiante (misma clave de partición) se
almacenan juntas en el mismo nodo del clúster, lo que hace muy eficiente
leer "todos los cursos de un estudiante", incluso con millones de filas
repartidas en muchos servidores.

> **Nota de alcance.** Cassandra describe su comportamiento con
> **consistencia eventual** (REF-U1-09): un concepto distinto de la
> "consistencia" de ACID que viste en
> [Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/).
> La consistencia de ACID es sobre una transacción individual: deja los
> datos en un estado válido. La consistencia eventual es sobre cómo se
> sincronizan, con el tiempo, las réplicas de un sistema distribuido. Es
> solo una mención introductoria — el tratamiento completo de
> replicación y consistencia en sistemas distribuidos se estudia en la
> **Unidad VI**.

## Modelo de grafos

Una base de datos de grafos como Neo4j representa los datos mediante
tres entidades centrales: **nodos**, **relaciones** y **propiedades**,
en lugar de tablas o documentos. Un nodo representa una entidad u
objeto discreto. Las relaciones siempre tienen una dirección y conectan
nodos entre sí (REF-U1-10: Neo4j Documentation, "Graph database
concepts").

**Ejemplo mínimo:**

```text
(Ana) --[INSCRITA_EN]--> (DBA)
```

Aquí lo importante no es el nodo en sí ("Ana", "DBA"), sino la relación
etiquetada y dirigida entre ambos. Consultar "¿en qué cursos está
inscrita Ana?" es recorrer relaciones, no filtrar filas o campos.

## ¿Por qué le importa esto a un DBA?

No basta con saber que "existe" un modelo NoSQL: el DBA necesita
reconocer qué modelo está administrando, porque de eso depende cómo se
distribuyen los datos, cómo se replican, y qué mecanismos de seguridad y
desempeño aplican (temas de las unidades siguientes).

> **Actividad 6 — Comparación de modelos NoSQL.** Instrucciones
> completas en la
> [Actividad 6](/materias/dba/unidad-01/actividades/actividad-6/). También
> puedes observar el modelo documental en un MongoDB real, de forma
> opcional y no evaluada, en el
> [Laboratorio 2 — Modelo documental (MongoDB)](/materias/dba/unidad-01/laboratorios/laboratorio-2-mongodb/).
