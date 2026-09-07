---
title: "Casos reales completos — Unidad 1"
description: "Narrativa extendida y autocontenida de los dos casos reales de la unidad: Knight Capital y GitLab."
---

> Este documento reproduce, de forma extendida y autocontenida, los
> hechos de ambos casos, para que tu aprendizaje no dependa de la
> disponibilidad de un sitio externo.

## Caso 1 — Knight Capital Group (1 de agosto de 2012)

### Contexto

Knight Capital Group era, en 2012, uno de los operadores (*market
makers*) más grandes de acciones estadounidenses, procesando una
proporción significativa del volumen diario de operaciones en la bolsa de
Nueva York. Ese contexto es relevante: cualquier falla en sus sistemas
de negociación automática tenía capacidad de afectar el mercado completo,
no solo a la propia empresa.

### Qué se desplegó y qué salió mal

Knight Capital preparó una actualización de software para participar en
el *Retail Liquidity Program* (RLP) de la Bolsa de Nueva York (NYSE), un
programa nuevo de ese momento. El nuevo código debía desplegarse en **8
servidores de producción**.

El despliegue falló de forma silenciosa en uno de ellos: **7 de los 8
servidores recibieron correctamente el código nuevo. El octavo no**. Ese
octavo servidor conservó una función de prueba, antigua e inactiva desde
2003 (conocida internamente como "Power Peg"), que había quedado
controlada por una bandera de configuración. El nuevo código de RLP
reutilizó esa misma bandera para un propósito distinto, sin haber
verificado —ni eliminado— la función antigua asociada a ella.

Al activarse el sistema el 1 de agosto de 2012, el servidor 8 interpretó
la señal de forma distinta a los otros 7: en lugar de ejecutar la lógica
nueva de RLP, **reactivó la función de prueba de 2003**, que generaba
órdenes de compra/venta de forma automática y descontrolada.

### Lo que ocurrió en el mercado

En aproximadamente **45 minutos**, el servidor defectuoso generó más de
**4 millones de operaciones** sobre **154 acciones distintas**, moviendo
del orden de **397 millones de acciones**. Nadie en Knight Capital pudo
detener el proceso de inmediato porque la causa no era evidente: el
sistema parecía estar "funcionando", solo que de forma incorrecta.

### Consecuencia financiera y regulatoria

* **Pérdida:** entre **USD 440 y 460 millones** en 45 minutos.
* La pérdida fue tan grande que puso en riesgo la continuidad financiera
  de la empresa. Knight Capital requirió una inyección de capital de
  emergencia para sobrevivir y, meses después, fue adquirida/fusionada
  con otra firma.
* La **SEC** (Securities and Exchange Commission, regulador bursátil de
  Estados Unidos) sancionó a Knight Capital con **USD 12 millones** por
  violar la *Market Access Rule* (Regla 15c3-5), que exige controles de
  riesgo previos al acceso al mercado.

### Por qué es un caso de "ambientes" y no solo "un bug"

El error técnico puntual (una bandera reutilizada sin limpiar código
antiguo) es solo la causa inmediata. La causa de fondo, según el propio
análisis regulatorio, fue la **ausencia de un procedimiento confiable de
despliegue y de verificación posterior**: no había una forma sistemática
de comprobar que los 8 servidores quedaran en el mismo estado después de
un despliegue. Es exactamente el problema de **paridad entre ambientes**
que esta unidad discute: un ambiente de producción con servidores en
estados distintos entre sí es, en la práctica, un ambiente sin control
real, aunque cada servidor individual "funcione".

### Fuentes

* **Primaria (regulatoria):** U.S. Securities and Exchange Commission,
  orden administrativa *Release No. 34-70694* (2013) — REF-U1-15.
  <https://www.sec.gov/news/press-release/2013-222>
* **Para profundizar (análisis secundario):** Henrico Dolfing, "Case
  Study 4: The $440 Million Software Error at Knight Capital" (2019) —
  REF-U1-16.
  <https://www.henricodolfing.ch/en/case-study-4-the-440-million-software-error-at-knight-capital/>

## Caso 2 — GitLab.com (31 de enero de 2017)

### Contexto

GitLab.com es la plataforma pública (SaaS) de GitLab Inc. En enero de
2017, el equipo de infraestructura enfrentaba un problema de carga
elevada en la base de datos principal (PostgreSQL), aparentemente
causado por un usuario que generaba tráfico excesivo. El equipo estaba
tratando de estabilizar la replicación entre el servidor primario y sus
réplicas.

### La secuencia del incidente

Durante la investigación, un ingeniero intentó reiniciar la replicación
en uno de los servidores secundarios. Al ejecutar un comando destructivo
para limpiar el directorio de datos y reconstruir la réplica desde cero,
**lo ejecutó por error contra el servidor primario de producción**, no
contra la réplica que pretendía reparar.

El comando eliminó el directorio de datos activo de la base de datos
principal de GitLab.com **mientras el sistema estaba en operación**.

### Impacto

* Ventana de datos perdidos de forma permanente: **aproximadamente 6
  horas** (entre las 17:20 y las 00:00 UTC del 31 de enero de 2017).
* Se perdieron cambios en **proyectos, comentarios, *issues*,
  *snippets*** y otros datos de esa ventana — del orden de **~5,000
  proyectos y ~700 cuentas de usuario** afectadas.
* Los repositorios de código en sí (el contenido de Git) no se vieron
  afectados de la misma forma que la base de datos de la aplicación — la
  pérdida fue principalmente en los metadatos y datos de la aplicación
  almacenados en PostgreSQL.

### Por qué fue tan grave: los respaldos tampoco funcionaron

Lo que convirtió este incidente en un caso de estudio no fue solo el
comando ejecutado por error: fue que, al intentar recuperarse, el equipo
descubrió que **varios de sus mecanismos de respaldo no funcionaban de
forma confiable** en ese momento (fallas silenciosas que nadie había
detectado porque no se probaban las restauraciones de forma periódica).
La restauración final solo fue posible gracias a una instantánea (*LVM
snapshot*) que, por casualidad operativa, se había tomado horas antes
sobre un servidor de *staging*, no como parte de un procedimiento formal
de respaldo de producción.

GitLab publicó un postmortem público y detallado del incidente, algo
inusual y valorado en la industria por su nivel de transparencia.

### Por qué es el caso central de esta unidad

Este incidente conecta, en un solo evento real, los cuatro temas de la
Unidad 1:

* **Rol del DBA** (OE-U1.1) — ¿quién es responsable de verificar que los
  mecanismos de respaldo funcionen de verdad, no solo que existan?
* **Responsabilidades operativas** (OE-U1.2) — monitoreo, diagnóstico de
  fallas y documentación fallaron en cadena.
* **Ambientes** (OE-U1.3) — el comando se ejecutó contra el servidor
  equivocado. Una separación y una identificación más claras entre
  ambientes/servidores habrían reducido ese riesgo.
* **Disponibilidad** — el incidente es, en esencia, una falla de
  disponibilidad con pérdida de datos, no solo una interrupción
  temporal.

### Fuentes

* **Primaria (oficial):** GitLab Inc., "Postmortem of database outage of
  January 31" (blog oficial, 2017) — REF-U1-14.
  <https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/>
* **Para profundizar (análisis secundario, en audio):** *The Downtime
  Project*, episodio "GitLab's 2017 Postgres Outage" (2021) —
  REF-U1-17. <https://downtimeproject.com/podcast/gitlabs-2017-postgres-outage/>

## Cómo usar este documento

* Para la [Actividad 4](/materias/dba/unidad-01/actividades/actividad-4/):
  usa la sección "Por qué es un caso de..." de cada caso como punto de
  partida para identificar qué separación de ambientes habría evitado el
  problema.
* Para la [Actividad 7](/materias/dba/unidad-01/actividades/actividad-7/)
  (evidencia oficial): puedes citar cualquiera de los dos casos como
  ejemplo real al construir tu diagnóstico.
* Este documento **no sustituye** la lectura de las fuentes primarias
  cuando estén disponibles: es un respaldo para cuando no lo estén.
