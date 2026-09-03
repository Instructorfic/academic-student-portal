---
title: "3. Ambientes de trabajo: desarrollo, pruebas y producción"
description: "Unidad 1 de DBA. Qué es un ambiente, por qué se separan, y dos casos reales (Knight Capital, GitLab)."
---

## ¿Qué es, formalmente, un ambiente?

Hasta este punto usamos la palabra "ambiente" de forma intuitiva. Vale la
pena definirla con precisión, porque es uno de los conceptos que más se
va a repetir en el resto del curso.

> **Ambiente.** Conjunto independiente de infraestructura, configuración
> y datos sobre el cual se despliega y ejecuta un sistema, destinado a
> un propósito específico dentro del ciclo de vida del software.
> Microsoft, en la documentación de *Azure Deployment Environments*, lo
> define de forma equivalente como "una colección de recursos sobre la
> cual se despliega tu aplicación" (REF-U1-13).

La idea clave de esta definición es que un ambiente **no es solo "una
copia de los datos"**: incluye también la configuración (variables,
credenciales, parámetros del motor) y, en muchos casos, la
infraestructura (servidores, redes) sobre la que corre el sistema.

## Tipos de ambiente y su utilidad

El programa de esta materia define tres ambientes como base:

| Ambiente | Propósito | Utilidad concreta |
| --- | --- | --- |
| **Desarrollo** | Construir y probar código o cambios nuevos | Permite experimentar y equivocarse sin consecuencias reales, los datos pueden modificarse o destruirse libremente |
| **Pruebas** | Validar que un cambio funciona correctamente antes de exponerlo a usuarios reales | Detecta errores **antes** de que afecten a un usuario real, funciona como "ensayo general" |
| **Producción** | Atender a los usuarios reales | Es el ambiente que realmente importa para el negocio, cualquier falla aquí tiene consecuencias reales (pérdida de datos, de confianza, económicas) |

> **Nota de industria.** Muchas organizaciones agregan un cuarto
> ambiente, llamado ***staging*** (o preproducción), entre pruebas y
> producción: una copia lo más parecida posible a producción, usada como
> último ensayo antes de un despliegue real. Microsoft menciona
> *staging*/preproducción como uno de los tipos de ambiente configurables
> en sus plataformas (REF-U1-13). El programa oficial de esta materia no
> exige *staging* como ambiente obligatorio (define solo desarrollo,
> pruebas y producción). Se menciona aquí únicamente como referencia de
> lo que encontrarás en la industria.

La metodología *The Twelve-Factor App* dedica su Factor X, "Dev/prod
parity" ("paridad entre desarrollo y producción"), a un punto
complementario: no basta con **separar** los ambientes, también conviene
mantenerlos **lo más parecidos posible** entre sí, para que una prueba
en desarrollo prediga con confianza qué pasará en producción (REF-U1-03).

## ¿Por qué separar los ambientes?

En la situación de la [introducción de la unidad](/materias/dba/unidad-01/),
alguien modificó datos **directamente en producción** para "resolver
rápido" un problema. Esto es exactamente el tipo de riesgo que la
separación de ambientes busca evitar:

* un cambio sin probar puede introducir errores directamente donde más
 duele (los usuarios reales),
* sin un ambiente de pruebas, no hay forma de validar un cambio antes de
 aplicarlo,
* mezclar desarrollo y producción hace que un error de una persona en
 desarrollo pueda afectar a todos los usuarios reales.

## Separación de responsabilidades entre ambientes

Separar los ambientes físicamente no es suficiente si las mismas
personas pueden actuar de la misma forma en cualquiera de ellos. Además
de ser espacios distintos, cada ambiente debe tener claro **quién puede
hacer qué** en él:

| Ambiente | Quién puede actuar ahí |
| --- | --- |
| **Desarrollo** | El equipo de desarrollo, con amplia libertad para experimentar y modificar directamente. |
| **Pruebas** | Se amplía a quien valida el cambio, ya no se experimenta libremente, se valida algo que ya se dio por terminado en desarrollo. |
| **Producción** | Restringido a quien tiene la responsabilidad formal de administrarla, normalmente el DBA o un proceso de despliegue controlado, no cualquier integrante del equipo de desarrollo. |

En la situación inicial, el problema no fue solo "no había un ambiente de
pruebas": fue que **alguien sin esa responsabilidad asignada modificó
datos directamente en producción**. Tener ambientes separados sin
definir también quién puede actuar en cada uno deja la separación
incompleta.

> Esta unidad presenta la idea a nivel introductorio: **qué significa**
> separar responsabilidades entre ambientes y **por qué importa**. El
> mecanismo técnico para exigirlo (usuarios, roles y permisos
> diferenciados por ambiente) es contenido de la **Unidad II**.

> **Actividad 4 · Análisis de riesgo por falta de separación de
> ambientes.** Instrucciones completas en la
> [Actividad 4](/materias/dba/unidad-01/actividades/actividad-4/).

## Caso real · Knight Capital (2012): cuando los ambientes no coinciden

Este caso, ampliamente documentado y sancionado por el regulador
financiero estadounidense (la SEC), ilustra en la vida real el riesgo de
no mantener paridad entre ambientes.

> El 1 de agosto de 2012, la empresa de *trading* Knight Capital
> desplegó una actualización de software en ocho servidores de
> producción. Por un error operativo, **solo 7 de los 8 servidores**
> recibieron el código nuevo. El octavo servidor conservó una función de
> código antigua e inactiva desde 2003. Esa inconsistencia entre
> servidores activó, en el servidor no actualizado, órdenes de
> compra/venta automáticas y descontroladas. En 45 minutos, la empresa
> generó más de 4 millones de operaciones sobre 154 acciones (cerca de
> 397 millones de acciones negociadas) y perdió entre 440 y 460 millones
> de dólares. La Comisión de Bolsa y Valores de Estados Unidos (SEC)
> determinó que la empresa no contaba con salvaguardas adecuadas para
> prevenir este tipo de error, y le impuso una sanción de 12 millones de
> dólares (REF-U1-15).

Aunque este caso ocurrió en un sistema de *trading* (no en una base de
datos administrada por un DBA), el problema de fondo es exactamente el
mismo: **una inconsistencia entre "ambientes"** (en este caso, entre
servidores que deberían estar sincronizados) fue suficiente para causar
una pérdida masiva en minutos.

Narrativa completa del caso: [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/).

## Caso real · GitLab.com (2017): responsabilidades, ambientes y disponibilidad

Este segundo caso conecta directamente el rol del DBA, sus
responsabilidades y la separación de ambientes.

> El 31 de enero de 2017, un ingeniero de GitLab, al intentar resolver un
> problema de desempeño causado por cuentas de *spam*, ejecutó por error
> un comando destructivo (`rm -rf`) contra el directorio de datos del
> **servidor de base de datos de producción** de GitLab.com, en lugar
> del servidor que pretendía usar. Como resultado, se perdieron de forma
> permanente aproximadamente 6 horas de datos de producción (ventana
> entre las 17:20 y las 00:00 UTC), afectando alrededor de 5,000
> proyectos, 5,000 comentarios y 700 cuentas de usuario nuevas. Al
> intentar recuperarse, GitLab descubrió que varios de sus mecanismos de
> respaldo no funcionaban de forma confiable, lo que dificultó la
> recuperación (REF-U1-14). GitLab publicó un informe (*postmortem*)
> público y detallado sobre lo ocurrido, una práctica común en la
> industria para aprender de los incidentes.

Este caso ilustra tres ideas centrales de esta unidad al mismo tiempo:

* **Responsabilidades del DBA:** verificar que los mecanismos de
 respaldo realmente funcionen es, precisamente, el tipo de
 responsabilidad operativa que un DBA debe vigilar (el detalle técnico
 de respaldo y restauración se estudia en la **Unidad V**).
* **Disponibilidad:** un incidente como este es, ante todo, un problema
 de disponibilidad: el servicio quedó afectado durante horas.
* **Ambientes:** el error específico fue ejecutar una acción
 destructiva contra el ambiente equivocado, exactamente el tipo de
 riesgo que esta sección describe.

> No se profundiza aquí en los mecanismos técnicos de respaldo o alta
> disponibilidad que habrían mitigado este incidente: eso corresponde a
> las Unidades V y VI.

Narrativa completa del caso: [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/).
