---
title: "7. Cierre y autoevaluación"
description: "Unidad 2 de DBA — síntesis de la unidad, glosario y preguntas de autoevaluación antes de la evidencia oficial."
---

## Síntesis

Recorriste, en esta unidad: los principios de seguridad y la mitigación
de inyección
([1](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/)),
el control de acceso
([2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/)),
la protección de datos sensibles
([3](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/)), el
cifrado
([4](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/)), el
marco normativo
([5](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/))
y el hardening del servidor
([6](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/)).

> **Actividad 8 — Matriz de usuarios, roles, permisos y controles de
> privacidad (evidencia oficial de la unidad).** Vas a integrar todo lo
> anterior en un solo instrumento. Instrucciones completas en la
> [Actividad 8](/materias/dba/unidad-02/actividades/actividad-8/).

## Mini quiz de verificación

Autoevaluación formativa rápida — no se califica y no sustituye la
Actividad 8. Respóndelo antes de pasar a las preguntas abiertas de abajo.

1. Verdadero o falso: cifrar los datos ya resuelve por sí solo el
   problema de control de acceso.
2. ¿Qué técnica es reversible mediante una llave separada: enmascaramiento,
   seudonimización o anonimización?
3. ¿Qué modelo de control de acceso decide mediante atributos del
   sujeto, objeto y entorno: DAC, MAC o ABAC?
4. Verdadero o falso: la prevención de inyección es responsabilidad
   exclusiva del DBA.
5. ¿Qué archivo de PostgreSQL controla qué conexiones se aceptan y con
   qué método de autenticación?
6. ¿Desde qué versión de MongoDB el `bindIp` por defecto es `localhost`?
7. Menciona dos de los ocho principios rectores de protección de datos
   personales, además de ARCO.
8. En una frase, ¿qué es *hardening*, y en qué capa distinta del motor
   también aplica?

## Autoevaluación

Responde sin consultar el material anterior, después verifica tus
respuestas con tu docente.

1. Explica por qué una consulta parametrizada previene la inyección SQL,
   mientras que una consulta construida por concatenación no.
2. ¿Por qué el control de acceso por sí solo no protege datos sensibles si
   no se combina con clasificación y, en algunos casos, cifrado?
3. Explica la diferencia entre seudonimización y anonimización.
4. ¿Qué diferencia hay entre cifrado en tránsito y cifrado en reposo? Da
   un ejemplo de motor/mecanismo para cada uno.
5. Explica, con tus propias palabras, cómo se conecta el principio de
   minimización de datos (LFPDPPP/LGPDPPSO) con la clasificación de datos
   de la Unidad 2.
6. ¿Qué significa que una instalación sea "funcional" pero no "segura"? Da
   un ejemplo concreto de esta unidad.
7. En el caso de los ataques a MongoDB de 2017, ¿qué configuración por
   defecto específica permitió el ataque, y qué control de esta unidad la
   habría evitado?
8. Según el reporte de la GAO sobre Equifax, ¿qué tipo de fallas
   (más allá de "no aplicar un parche") contribuyeron a la brecha?

## Glosario

| Término | Definición |
| --- | --- |
| Privilegio mínimo (*least privilege*) | Principio según el cual cada usuario o proceso debe tener únicamente los permisos estrictamente necesarios. |
| Separación de funciones | Principio según el cual ninguna persona debería controlar, por sí sola, una operación crítica de principio a fin. |
| Inyección SQL / NoSQL | Ataque que altera la lógica de una consulta insertando entrada de usuario no validada dentro de ella. |
| DAC / RBAC / ABAC | Modelos de control de acceso: por decisión del dueño del objeto (DAC), por rol con nombre reutilizable (RBAC), o por atributo de la fila/sesión (ABAC, p. ej. Row-Level Security). |
| Enmascaramiento de datos | Mostrar solo una parte de un dato o sustituirlo por un valor no identificable, sin mecanismo formal de reversión. |
| Seudonimización | Sustitución de un dato identificable por un identificador artificial, reversible con una llave o tabla separada. |
| Anonimización | Proceso que impide asociar un dato a una persona de forma irreversible. |
| Cifrado en tránsito / en reposo | Protección criptográfica de datos mientras viajan por la red / ya almacenados. |
| LFPDPPP / LGPDPPSO | Marco normativo mexicano de protección de datos personales, para el sector privado y para sujetos obligados, respectivamente. |
| ARCO | Derechos de Acceso, Rectificación, Cancelación y Oposición sobre datos personales. |
| Hardening | Proceso de reducir la superficie de ataque de un sistema mediante configuración segura. |
| `pg_hba.conf` | Archivo de PostgreSQL que controla qué conexiones se aceptan y con qué método de autenticación. |

## Qué aprenderás después

Esta unidad se detiene en el nivel introductorio de seguridad aplicada a
datos. Los siguientes temas **no se explican todavía**:

* Bitácoras técnicas, interpretación de eventos y gobierno práctico de
  datos (**Unidad III**).
* Índices, planes de ejecución y monitoreo de desempeño (**Unidad IV**).
* Respaldo, restauración y recuperación ante desastres (**Unidad V**).
* Alta disponibilidad, replicación y particionamiento horizontal
  (**Unidad VI**).
