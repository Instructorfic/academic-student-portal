---
title: "2. Responsabilidades operativas del DBA"
description: "Unidad 1 de DBA — las seis responsabilidades cotidianas del DBA, desempeño y disponibilidad."
---

<span class="badge-estado">Borrador — QA requiere nueva verificación</span>

Más allá de la lista general del [rol del DBA](/materias/dba/unidad-01/01-rol-del-dba/),
el trabajo cotidiano de un DBA suele organizarse en seis tipos de
responsabilidad (REF-U1-01):

| Responsabilidad | En qué consiste |
| --- | --- |
| **Configuración inicial y mantenimiento** | Instalar, configurar parámetros del motor y mantener la base de datos operativa en el tiempo. |
| **Gestión de usuarios y privilegios** | Dar de alta y de baja usuarios, y controlar qué pueden hacer (visión general; el detalle técnico se estudia en la Unidad II). |
| **Monitoreo del servicio** | Vigilar que la base de datos esté disponible y funcionando dentro de parámetros esperados (visión general; el detalle técnico se estudia en la Unidad IV). |
| **Diagnóstico de fallas** | Identificar la causa de un problema cuando algo no funciona como se espera. |
| **Optimización de desempeño** | Detectar y corregir situaciones que hacen que la base de datos responda más lento de lo esperado (visión general; el detalle técnico se estudia en la Unidad IV). |
| **Documentación y bitácoras operativas** | Registrar configuración, cambios y decisiones para que el conocimiento no dependa de una sola persona. |

Nota que varias de estas responsabilidades ("gestión de usuarios",
"monitoreo", "optimización") se mencionan aquí solo en su forma general:
sus mecanismos técnicos concretos se estudian en unidades posteriores. En
esta unidad basta con reconocer que existen y en qué consisten.

## Cómo se ve cada responsabilidad en la práctica

La tabla anterior resume qué es cada responsabilidad. Esto es cómo se
aplica, con un ejemplo concreto de cada una (los mismos que vas a
clasificar en la Actividad 3):

* **Configuración inicial y mantenimiento.** No termina el día que se
  instala el motor: incluye mantenerlo actualizado y ajustar parámetros
  con el tiempo. Ejemplo: verificar, antes de dar de alta un servidor
  nuevo, qué parámetros de instalación se usaron en los servidores
  existentes — para que el nuevo sea consistente con ellos (conecta
  directamente con la paridad entre ambientes que verás en
  [Ambientes de trabajo](/materias/dba/unidad-01/03-ambientes-de-trabajo/)).
* **Gestión de usuarios y privilegios.** Dar de alta accesos es la mitad
  del trabajo. La otra mitad es **retirarlos** cuando ya no se
  necesitan. Ejemplo: revocar el acceso de una persona que dejó el
  proyecto — dejarlo activo "por si acaso" es exactamente el tipo de
  descuido que la Unidad II va a tratar como un riesgo de seguridad, no
  un detalle menor.
* **Monitoreo del servicio.** No es "mirar un panel de vez en cuando":
  es vigilar de forma sistemática que el servicio responda dentro de lo
  esperado. Ejemplo: revisar un panel de monitoreo y confirmar que el
  servicio sigue disponible, o detectar que una consulta específica está
  bloqueando a otras — esto último ya es también el inicio de un
  diagnóstico de falla.
* **Diagnóstico de fallas.** Encontrar la causa, no solo el síntoma.
  Ejemplo: un reporte que tarda más de lo habitual en generarse —el
  síntoma es "lento". El diagnóstico tiene que identificar *por qué*
  (una consulta costosa, un bloqueo, falta de un índice) antes de poder
  corregirlo. El detalle técnico para diagnosticar con precisión se
  estudia en la Unidad IV. Aquí basta con reconocer que diagnosticar es
  un paso distinto de corregir.
* **Optimización de desempeño.** Actuar sobre la causa ya diagnosticada.
  Ejemplo: ajustar la configuración de memoria del motor después de
  notar respuestas más lentas de lo esperado — nota que esto solo tiene
  sentido *después* de haber diagnosticado (responsabilidad anterior).
  Optimizar sin diagnosticar primero es adivinar, no administrar.
* **Documentación y bitácoras operativas.** Registrar configuración,
  cambios y decisiones para que el conocimiento no dependa de una sola
  persona. Ejemplo: registrar por qué se cambió un parámetro de
  configuración la semana pasada, o documentar los pasos que se
  siguieron para recuperar un servicio tras una falla — sin este
  registro, cada incidente se resuelve "desde cero", incluso si ya
  ocurrió antes.

> Estos seis ejemplos son exactamente los que vas a clasificar (junto con
> otros más) en la Actividad 3 — no son una lista aparte, son la misma
> lista de la tabla anterior, pero mostrando **cómo se ve cada
> responsabilidad cuando ocurre de verdad**, no solo su nombre.

> **Actividad 3 — Clasificación de responsabilidades operativas.**
> Instrucciones completas en la
> [Actividad 3](/materias/dba/unidad-01/actividades/actividad-3/).

## Dos conceptos que vas a encontrar constantemente: desempeño y disponibilidad

A lo largo de todo el curso —no solo en esta unidad— vas a ver
repetidamente dos palabras: **desempeño** y **disponibilidad**. Vale la
pena fijar su significado desde ahora, aunque su tratamiento técnico
completo llegue en unidades posteriores.

Según AWS, un DBMS (el software que administra una base de datos, ver
[Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/))
existe precisamente para "facilitar el almacenamiento de datos mientras
aumenta la **disponibilidad**, la confiabilidad y el **desempeño**"
(REF-U1-11). Es decir: desempeño y disponibilidad no son temas "aparte"
de administrar una base de datos — son parte de su propósito central.

* **Desempeño** — qué tan rápido y eficientemente responde la base de
  datos a las operaciones que se le solicitan (consultas, escrituras,
  reportes). Un DBA con buen desempeño logra que el sistema responda
  dentro de tiempos aceptables incluso cuando crece el volumen de datos
  o de usuarios. El detalle técnico (índices, planes de ejecución,
  tuning) se estudia en la **Unidad IV**.
* **Disponibilidad** — que la base de datos esté accesible y funcionando
  cuando se le necesita. Una base de datos con "downtime" (tiempo fuera
  de servicio) frecuente, aunque responda rápido cuando funciona, tiene
  un problema de disponibilidad. El detalle técnico (alta
  disponibilidad, redundancia, conmutación por error) se estudia en la
  **Unidad VI**.

**Ejemplo introductorio de desempeño.** Un reporte que hace un año
tardaba dos segundos en generarse ahora tarda cuarenta, porque la tabla
que consulta creció de miles a millones de filas. La base de datos
**sigue respondiendo** —no está caída, no es un problema de
disponibilidad—, solo que cada vez más lento a medida que crece el
volumen de datos. Reconocer este tipo de síntoma corresponde a
"diagnóstico de fallas" y "optimización de desempeño". El mecanismo
técnico que lo resolvería (por ejemplo, un índice) se estudia en la
Unidad IV.

Por ahora, basta con que puedas distinguir un problema de desempeño ("la
base de datos funciona, pero muy lento", como en el ejemplo anterior) de
un problema de disponibilidad ("la base de datos no está respondiendo en
absoluto").
