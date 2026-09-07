---
title: "3. Introducción a Scrum"
description: "Bloque I de Taller Integrador — pilares y valores de Scrum, roles, artefactos, eventos, e historias de usuario con criterios de aceptación."
---

## Principios ágiles

Scrum se basa en un desarrollo **iterativo e incremental**: en lugar de
intentar diseñar el sistema completo antes de escribir código, el
equipo construye y entrega partes pequeñas y funcionales del sistema de
forma repetida, adaptándose a lo que va aprendiendo en el camino.

Esto contrasta con intentar planear todo el semestre de proyecto por
adelantado y solo empezar a programar hasta tener ese plan completo —
justamente lo que este bloque busca evitar (ver
[¿Qué problema vamos a resolver?](/materias/taller-integrador/bloque-01/) en la introducción).

**Por qué importa:** un proyecto de software real cambia mientras se
desarrolla. Aparecen necesidades nuevas, se descubren problemas, se
recibe retroalimentación, cambian las prioridades. Scrum no elimina ese
cambio: da un marco para trabajar con él en lugar de pretender que no
va a ocurrir.

## Pilares de Scrum

Scrum se apoya en un enfoque empírico sostenido por tres pilares:

| Pilar | En qué consiste |
| --- | --- |
| Transparencia | El trabajo y su estado deben ser visibles para quienes lo necesitan |
| Inspección | El progreso y los resultados deben revisarse con frecuencia |
| Adaptación | El trabajo se ajusta cuando la inspección revela que algo debe cambiar |

## Valores de Scrum

| Valor | En qué consiste |
| --- | --- |
| Compromiso | Trabajar hacia los objetivos del equipo |
| Enfoque | Concentrarse en el trabajo y los objetivos del Sprint |
| Apertura | Ser transparentes sobre el trabajo y los desafíos |
| Respeto | Reconocer las capacidades y responsabilidades de los demás |
| Coraje | Hacer lo correcto y enfrentar problemas difíciles |

Estos valores no son una lista decorativa: son lo que sostiene, en la
práctica, a los tres pilares anteriores. Un equipo puede tener un
tablero perfectamente visible (transparencia) y aun así nunca decir
que un incremento no va a estar listo a tiempo, si le falta apertura y
coraje para hacerlo.

## Roles de Scrum

| Rol | Responsabilidad principal |
| --- | --- |
| Product Owner | Maximiza el valor del producto, desarrolla y comunica el objetivo del producto, crea y ordena el Product Backlog |
| Scrum Master | Ayuda a que Scrum se establezca y sea efectivo, y facilita la eliminación de impedimentos |
| Developers | Crean el incremento e incorporan calidad mediante la Definition of Done |

**Aclaración importante:** el Scrum Master no es el jefe del equipo.
Como viste en [2. Conformación de equipos](/materias/taller-integrador/bloque-01/02-conformacion-de-equipos/), en equipos pequeños quien
asume el rol de Product Owner o Scrum Master también participa como
Developer.

## Artefactos de Scrum

- **Product Backlog** — lista priorizada de todo el trabajo pendiente
  del proyecto. Es ordenado, emergente, visible y evolutivo: no
  necesitas conocer absolutamente todo desde el primer día, necesitas
  suficiente claridad para comenzar.
- **Sprint Backlog** — el subconjunto del Product Backlog que el
  equipo se compromete a completar en el sprint actual.
- **Incremento** — la suma de todo lo completado hasta el momento, en
  un estado utilizable.

Cada artefacto lleva asociado un **compromiso** que aporta claridad
sobre su propósito:

| Artefacto | Compromiso |
| --- | --- |
| Product Backlog | Product Goal (objetivo de producto) |
| Sprint Backlog | Sprint Goal (objetivo del sprint) |
| Incremento | Definition of Done |

## Eventos de Scrum

| Evento | Propósito |
| --- | --- |
| Sprint | Periodo de tiempo fijo durante el cual se construye un incremento y que contiene a todos los demás eventos |
| Sprint Planning | El equipo establece por qué (objetivo del Sprint), qué (trabajo seleccionado) y cómo (forma de realizarlo) |
| Daily Scrum | Reunión breve diaria para inspeccionar el progreso hacia el Sprint Goal — no es un reporte al profesor ni una forma de medir quién trabajó más |
| Sprint Review | El equipo demuestra el incremento junto con las partes interesadas y decide qué adaptar después |
| Sprint Retrospective | El equipo reflexiona sobre personas, proceso y herramientas, e identifica mejoras concretas |

## ¿Y el Sprint 0?

**Sprint 0 no es un evento ni un elemento definido por la *Scrum
Guide***. En este taller se utiliza como una **convención académica**:
una etapa de preparación (organizar el equipo, construir el backlog
inicial, configurar el repositorio y el entorno, y dejar una primera
funcionalidad funcionando) antes de comenzar los Sprints de desarrollo
propiamente dichos. No sustituye un Sprint de Scrum ni es una excepción
al marco de trabajo — es, simplemente, cómo este curso organiza el
arranque del proyecto. Profundizarás en qué debes producir exactamente
durante tu Sprint 0 en
[5. Sprint 0 — qué debes producir](/materias/taller-integrador/bloque-01/05-sprint-0-que-debes-producir/).

## Historias de usuario y criterios de aceptación

Una **historia de usuario** (*user story*) describe una necesidad desde
la perspectiva de quien la tiene, típicamente con el formato:

> Como &lt;tipo de usuario&gt;, quiero &lt;acción o funcionalidad&gt;,
> para &lt;beneficio que obtiene&gt;.

Un **criterio de aceptación** es una condición concreta y verificable
que determina si esa historia se considera cumplida.

**Ejemplo, usando ReservaFIC:**

> **Historia:** Como estudiante, quiero solicitar el préstamo de un
> equipo disponible, para poder usarlo en mi práctica de laboratorio.
>
> **Criterio de aceptación:** el sistema no permite solicitar un
> equipo que ya tiene una reserva activa en el mismo horario.

**Error común: confundir una historia de usuario con una tarea
técnica.** Una historia de usuario no describe cómo se va a programar
algo, describe qué necesita el usuario y para qué.

| No es una historia de usuario | Sí es una historia de usuario |
| --- | --- |
| Crear tabla de usuarios | Como usuario, quiero registrarme, para poder acceder al sistema |
| Programar API de autenticación | Como usuario, quiero iniciar sesión, para acceder a las funciones disponibles para mi cuenta |
| Crear formulario de préstamo | Como estudiante, quiero solicitar el préstamo de un equipo disponible, para usarlo en mi práctica |

La tarea técnica aparece después, como parte del trabajo necesario para
implementar la historia — no antes.

### Priorización y estimación inicial

No todo puede construirse al mismo tiempo. Una historia se prioriza
como **alta** (necesaria para entregar el valor principal), **media**
(importante para completar el servicio) o **baja** (útil, pero puede
esperar). Para comparar el tamaño relativo de las historias — sin
intentar adivinar horas — se usa una escala simple:

```text
1   muy pequeña
2   pequeña
3   media
5   grande
8   muy grande
```

Esta estimación es inicial y puede cambiar conforme el equipo aprende
más sobre el sistema que está construyendo.

## Para reflexionar

- ¿Qué diferencia existe entre Product Goal y Sprint Goal?
- ¿Qué significa, en tus palabras, que un Incremento esté "Done"
  (cumple la Definition of Done)?
- Piensa en una funcionalidad de tu proyecto: ¿está redactada como
  historia de usuario o como tarea técnica disfrazada de historia?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 4 — Mapa de artefactos y eventos de Scrum](/materias/taller-integrador/bloque-01/actividades/actividad-4/),
donde relacionarás los tres artefactos con los cinco eventos y con los
tres roles.

## Laboratorio relacionado

Practicarás la redacción de historias de usuario con criterios de
aceptación en el
[Laboratorio 3 — De la necesidad a las historias de usuario](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario/),
trabajando directamente sobre tu propio proyecto, no sobre ReservaFIC.

## Referencias de este tema

- Schwaber, K. y Sutherland, J. (2020). *The Scrum Guide*. Fuente
  principal de todo este tema: roles, artefactos, eventos, pilares y
  valores. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-01/referencias/)
  y las [lecturas complementarias](/materias/taller-integrador/bloque-01/referencias/lecturas-complementarias/)
  para el enlace de descarga oficial.

## Qué sigue

Con Scrum como marco de trabajo, el siguiente paso es aplicarlo a tu
propio proyecto: definir su problema, alcance y Product Backlog inicial
en [4. Definición del proyecto](/materias/taller-integrador/bloque-01/04-definicion-del-proyecto/).
