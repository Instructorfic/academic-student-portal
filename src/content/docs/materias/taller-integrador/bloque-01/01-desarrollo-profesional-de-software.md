---
title: "1. El desarrollo profesional de software"
description: "Bloque I de Taller Integrador — producto vs. servicio, usuarios y partes interesadas, problema y necesidad, desarrollo a escala."
---

## Software como producto y servicio

### Software como producto

Cuando el software se entrega como **producto**, alguien lo construye,
lo empaqueta en una versión concreta y lo entrega para que otra persona
lo instale, lo posea y lo use por su cuenta. Una vez entregado, quien
lo instaló decide cuándo actualizarlo y cómo lo usa, muchas veces sin
ninguna conexión posterior con quien lo construyó.

Son ejemplos de esta modalidad una aplicación de escritorio que se
descarga e instala, una librería que otro equipo integra a su propio
proyecto, o un videojuego que se compra una sola vez.

En un producto, quien lo construye pierde control directo sobre el
entorno donde se ejecuta: no sabe con certeza qué sistema operativo,
qué hardware o qué configuración tiene cada usuario. Por eso los
productos suelen documentar con cuidado requisitos de instalación y
versiones compatibles.

### Software como servicio

Cuando el software se entrega como **servicio** (a veces llamado
*Software as a Service*, *SaaS*, cuando se ofrece por internet), quien
lo construye también lo opera: lo mantiene ejecutándose en una
infraestructura que administra, y el usuario simplemente lo usa
mientras está disponible, típicamente a través de una aplicación web o
móvil conectada a un sistema central.

Aquí el equipo que construye el sistema no entrega una copia y se
despide: sigue siendo responsable de que el servicio funcione, de
corregir errores en producción y de que los datos de todos los
usuarios permanezcan disponibles y correctos al mismo tiempo, para
todos a la vez.

En "ReservaFIC" (el ejemplo ilustrativo de este bloque), el sistema es
un servicio: la facultad no instala una copia distinta para cada
estudiante, sino que opera un sistema central al que todos —
estudiantes y administrador — se conectan. Si el servicio falla un
lunes a las ocho de la mañana, nadie puede solicitar ni aprobar
préstamos hasta que alguien lo repare.

### Por qué importa la diferencia

La distinción entre producto y servicio no es una etiqueta académica:
cambia decisiones concretas de diseño desde el primer día.

| Dimensión | Producto | Servicio |
| --- | --- | --- |
| ¿Quién opera el sistema una vez entregado? | El usuario, en su propio entorno | Quien lo construyó, de forma continua |
| ¿Qué ocurre si falla? | Afecta a quien lo instaló | Puede afectar a todos los usuarios conectados al mismo tiempo |
| ¿Cómo se actualiza? | El usuario decide cuándo instalar una versión nueva | El equipo despliega una versión nueva y todos la reciben de inmediato |
| ¿Qué debe considerarse desde el diseño? | Compatibilidad con distintos entornos | Disponibilidad, concurrencia, capacidad de escalar |

Tu proyecto integrador, casi con toda seguridad, será un servicio, de
modo que las preguntas de la columna derecha son las que debes empezar
a tener presentes desde este bloque, aunque las profundizarás más
adelante en el taller.

## Usuarios y partes interesadas

No toda persona relacionada con tu proyecto se relaciona con él de la
misma forma. Conviene distinguir dos papeles:

- **Usuario** (*user*): quien interactúa directamente con el sistema
  para realizar una tarea. En ReservaFIC, el estudiante que solicita un
  préstamo y el administrador que lo aprueba son usuarios.
- **Parte interesada** (*stakeholder*): cualquier persona u
  organización con interés en el resultado del sistema, lo use
  directamente o no. En ReservaFIC, el coordinador del laboratorio que
  nunca abre la aplicación pero necesita un reporte mensual de equipos
  prestados es una parte interesada. También lo es la facultad, que
  exige que el sistema deje un registro auditable de cada préstamo.

Todo usuario es, de alguna forma, parte interesada, pero no toda parte
interesada es usuario.

**Error común:** diseñar pensando únicamente en quien usa el sistema
directamente puede hacer que pases por alto un requisito importante
que proviene de alguien que nunca lo va a abrir. Cuando definas el
problema y el alcance de tu propio proyecto (más adelante en este
bloque), identificar a ambos grupos — no solo a los usuarios — forma
parte del trabajo.

## Problema y necesidad

Un **problema** es la situación observable que genera fricción o
insatisfacción: algo que no funciona bien, que toma demasiado tiempo o
que produce errores. Una **necesidad** es lo que debe resolverse para
que ese problema deje de ocurrir, y casi siempre hay más de una manera
de satisfacer la misma necesidad.

Por ejemplo, en el problema "los estudiantes no saben qué equipo de
laboratorio está disponible y terminan perdiendo tiempo o duplicando
solicitudes por mensajes o en papel", la necesidad de fondo no es
"necesitamos una aplicación web": es "necesitamos que cualquier persona
pueda consultar disponibilidad y reservar sin depender de que alguien
conteste un mensaje". Un sistema web es una posible solución a esa
necesidad, no la única, y no es la necesidad en sí misma.

Un equipo que empieza a programar sin haber identificado la necesidad
real corre el riesgo de construir, con mucho esfuerzo, algo que
resuelve el problema equivocado. Cuando definas el problema de tu
propio proyecto, empieza siempre por la necesidad, no por la solución
que ya tienes en mente.

## Desarrollo a escala

Un ejercicio de programación individual normalmente se prueba con
pocos datos y un solo usuario: tú. Un sistema de alcance profesional
debe considerarse, al menos conceptualmente, para muchos usuarios
simultáneos.

Esto no significa que debas construir infraestructura real para una
cantidad enorme de usuarios. Significa que, al diseñar, debes poder
responder preguntas como: ¿qué pasaría si en lugar de una persona
probando el sistema, lo usaran simultáneamente cien personas? ¿Qué
parte se saturaría primero? Más adelante en el taller profundizarás en
cómo analizar esas preguntas de forma más rigurosa. En este bloque
basta con que tengas presente que tu proyecto debe permitir, más
adelante, razonar sobre crecimiento — uno de los criterios de
complejidad mínima que revisaste en la [introducción del bloque](/materias/taller-integrador/bloque-01/).

## El proyecto integrador

Tu proyecto integrador es el sistema que tu equipo diseñará y
construirá durante todo el semestre. No es una tarea que se resuelve
en una sesión: es un proyecto que se planifica (objetivo, alcance,
restricciones, supuestos), se construye por incrementos, y se entrega
con evidencia verificable de su funcionamiento.

Los elementos que debes definir para tu proyecto, desde este bloque,
son:

- **objetivo** — qué problema resuelve tu sistema
- **alcance** — qué funcionalidades incluye y cuáles excluye
  deliberadamente
- **restricciones** — qué limitaciones existen (tiempo, tecnología,
  tamaño del equipo)
- **supuestos** — qué estás asumiendo como cierto sin haberlo
  verificado
- **entregables** — qué producirás como evidencia de avance
- **criterios de aceptación** — cómo sabrás que una parte del proyecto
  está terminada.

Profundizarás en la definición formal de estos elementos en
[4. Definición del proyecto](/materias/taller-integrador/bloque-01/04-definicion-del-proyecto/).

## Para reflexionar

- De dos aplicaciones que usas con frecuencia, ¿cuál es producto, cuál
  es servicio, y qué pasaría si cada una dejara de estar disponible
  durante una hora?
- En tu proyecto, ¿ya identificaste alguna parte interesada que no sea
  usuario directo del sistema?
- ¿Estás empezando a pensar en una solución antes de tener claro cuál
  es la necesidad real que resuelve tu proyecto?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 2 — Producto y servicio, en la práctica](/materias/taller-integrador/bloque-01/actividades/actividad-2/),
donde clasificarás dos sistemas reales y analizarás su disponibilidad.

## Antes de continuar: primer contacto con Laravel

Este tema es conceptual. En paralelo, el
[Laboratorio 1 — Primer contacto con Laravel](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero/)
prepara el entorno técnico que usarás más adelante en el bloque para
construir tu primer incremento — todavía no construye una
funcionalidad real de tu proyecto.

## Referencias de este tema

- Hunt, A. y Thomas, D. (2019). *The Pragmatic Programmer*. Fundamenta
  la reflexión sobre desarrollo profesional, responsabilidad y
  comunicación que sostiene esta sección. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-01/referencias/).

## Qué sigue

Con el problema y el desarrollo profesional situados, el siguiente paso
es organizar a las personas que van a resolverlo: continúa con
[2. Conformación de equipos](/materias/taller-integrador/bloque-01/02-conformacion-de-equipos/).
