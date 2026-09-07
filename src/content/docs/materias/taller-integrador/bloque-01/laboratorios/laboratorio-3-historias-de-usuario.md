---
title: "Laboratorio 3 — De la necesidad a las historias de usuario"
description: "Bloque I de Taller Integrador — transformar necesidades reales del proyecto en historias de usuario con criterios de aceptación."
---

**Duración:** 100 minutos. **Modalidad:** Trabajo en equipo.
**Metodología:** Aprendizaje Basado en Problemas + Scrum.

## 1. Propósito

En este laboratorio tu equipo transformará necesidades reales de su
proyecto integrador en **historias de usuario** que puedan incorporarse
al Product Backlog. La intención no es escribir una lista de
funcionalidades: el objetivo es aprender a expresar quién necesita
algo, qué necesita y para qué lo necesita.

Al finalizar, cada equipo tendrá un conjunto inicial de historias de
usuario con criterios de aceptación y una primera priorización.

## 2. Resultado esperado

Cada equipo deberá entregar entre **6 y 10 historias de usuario**
relacionadas con su proyecto. Cada historia deberá contener:
identificador, historia de usuario, criterios de aceptación, prioridad,
estimación inicial y justificación breve.

| ID | Historia de usuario | Prioridad | Estimación |
| --- | --- | --- | ---: |
| HU-01 | Como usuario, quiero registrarme para poder acceder al sistema. | Alta | 5 |
| HU-02 | Como usuario, quiero iniciar sesión para acceder a las funciones disponibles para mi cuenta. | Alta | 3 |
| HU-03 | Como administrador, quiero consultar los usuarios registrados para poder gestionar sus cuentas. | Media | 5 |

## 3. Antes de comenzar

El equipo ya tiene proyecto integrador asignado, integrantes
definidos, el problema o servicio sobre el que trabajará, y una idea
general del sistema. **No se debe crear un proyecto nuevo**: este
laboratorio trabaja sobre el proyecto ya asignado al equipo.

## 4. Conceptos que debes comprender

- **Usuario** — persona o actor que interactúa con el sistema (cliente,
  alumno, profesor, administrador, empleado, proveedor).
- **Necesidad** — algo que el usuario necesita realizar (registrar una
  solicitud, consultar información, reservar un recurso).
- **Funcionalidad** — una capacidad concreta que el sistema proporciona
  para atender esa necesidad.
- **Historia de usuario** — forma breve de expresar una necesidad desde
  la perspectiva del usuario: "Como [tipo de usuario], quiero [acción o
  necesidad], para [beneficio o propósito]."

## 5. Estructura de una buena historia

```text
Como [tipo de usuario],
quiero [acción o necesidad],
para [beneficio].
```

**Ejemplo:** "Como alumno, quiero consultar mis calificaciones, para
conocer mi avance académico."

La historia debe describir una necesidad del usuario, no una decisión
técnica.

- **Incorrecto:** "Como desarrollador, quiero crear una tabla
  PostgreSQL para almacenar los usuarios." (describe una decisión
  técnica).
- **Correcto:** "Como administrador, quiero registrar usuarios, para
  poder gestionar el acceso al sistema."

## 6. Actividad 1 — Identificar usuarios (10 minutos)

Como equipo, revisen nuevamente el proyecto asignado e identifiquen los
principales actores que interactuarán con el sistema:

| Actor | ¿Quién es? | ¿Qué necesita hacer? |
| --- | --- | --- |
| Usuario | Persona que utiliza el servicio | Realizar una solicitud |
| Administrador | Responsable de gestionar el sistema | Gestionar solicitudes |
| ... | ... | ... |

No necesitan identificar todos los usuarios posibles: comiencen con los
actores más importantes para que el sistema pueda funcionar.

## 7. Actividad 2 — Identificar necesidades (15 minutos)

Para cada actor, respondan: ¿qué necesita hacer?, ¿qué problema
intenta resolver?, ¿qué información necesita consultar?, ¿qué
información necesita registrar?, ¿qué resultado espera obtener?

| Actor | Necesidad |
| --- | --- |
| Cliente | Registrar una solicitud |
| Cliente | Consultar el estado de una solicitud |
| Administrador | Consultar solicitudes |
| Administrador | Cambiar el estado de una solicitud |

## 8. Actividad 3 — Convertir necesidades en historias (20 minutos)

Transformen las necesidades en historias usando la estructura "Como
[actor], quiero [necesidad], para [beneficio]." Ejemplo: de la
necesidad "el cliente necesita consultar el estado de su solicitud" a
"Como cliente, quiero consultar el estado de mi solicitud, para
conocer el avance de mi trámite." Construyan al menos **6 historias**.

## 9. Actividad 4 — Revisar las historias (15 minutos)

Revisen cada historia con estas preguntas: ¿identifica claramente al
usuario?, ¿describe una necesidad?, ¿explica el beneficio?, ¿se
entiende sin conocer el código?, ¿evita mencionar tecnologías
innecesarias?, ¿podría convertirse en una funcionalidad verificable? Si
una historia tiene varias respuestas "No", corríjanla.

## 10. Actividad 5 — Criterios de aceptación (20 minutos)

Para al menos **3 historias principales**, escriban sus criterios de
aceptación: condiciones concretas y verificables que describen
comportamientos observables.

**Ejemplo (HU-01: "Como cliente, quiero registrar una solicitud, para
iniciar un trámite"):**

```text
CA-01: El usuario debe proporcionar los datos obligatorios.
CA-02: El sistema debe validar que los datos requeridos estén completos.
CA-03: Al registrar correctamente la solicitud, el sistema debe
       asignarle un identificador.
CA-04: El usuario debe recibir confirmación del registro.
```

Los criterios permiten responder: ¿cómo sabremos que esta historia está
terminada correctamente?

## 11. Actividad 6 — Priorizar (10 minutos)

Clasifiquen las historias como **Alta** (sin esta funcionalidad, el
sistema no puede proporcionar su servicio principal), **Media**
(importante para mejorar o completar el servicio) o **Baja** (útil,
pero el sistema puede funcionar sin ella inicialmente).

## 12. Actividad 7 — Estimación inicial (10 minutos)

Realicen una estimación relativa: `1` muy pequeña, `2` pequeña, `3`
media, `5` grande, `8` muy grande. No intenten calcular horas — la
pregunta es qué tan grande o compleja parece esta historia comparada
con las demás. La estimación es inicial y puede cambiar cuando el
equipo conozca mejor el sistema.

## 13. Producto final del laboratorio

| ID | Historia de usuario | Criterios de aceptación | Prioridad | Puntos |
| --- | --- | --- | --- | ---: |
| HU-01 | Como... quiero... para... | CA-01, CA-02... | Alta | 5 |
| HU-02 | Como... quiero... para... | CA-01, CA-02... | Alta | 3 |
| HU-03 | Como... quiero... para... | CA-01, CA-02... | Media | 5 |

## 14. Reglas para las historias

Una buena historia está escrita desde la perspectiva del usuario,
expresa una necesidad, tiene un propósito, puede ser entendida por una
persona no técnica, puede verificarse, estimarse y priorizarse. Evita
historias como "Crear la base de datos", "Programar el login" o "Hacer
la pantalla principal" — son tareas técnicas o funcionalidades
incompletas.

## 15. Conexión con Scrum

Las historias elaboradas formarán parte del **Product Backlog**.
Posteriormente el equipo deberá recorrer: necesidad → historia de
usuario → criterios de aceptación → prioridad → estimación → Product
Backlog → Sprint → Incremento. Este laboratorio todavía no define el
Sprint completo — eso se trabaja en el
[Laboratorio 4 — Sprint 0](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0/).

## 16. Preguntas de reflexión

¿Cuál es la diferencia entre una necesidad del usuario y una
funcionalidad técnica? ¿Por qué una historia debe indicar el beneficio
que espera obtener el usuario? ¿Qué problema puede existir si todas las
historias tienen prioridad alta? ¿Por qué una estimación inicial puede
cambiar posteriormente? ¿Qué historia consideran actualmente la más
importante para que su proyecto entregue valor?

## 17. Evidencia

- [ ] Lista de actores principales.
- [ ] Lista de necesidades.
- [ ] Mínimo 6 historias de usuario.
- [ ] Criterios de aceptación para al menos 3 historias.
- [ ] Prioridad de cada historia.
- [ ] Estimación inicial de cada historia.
- [ ] Product Backlog inicial.

## 18. Criterio de finalización

El laboratorio se considera terminado cuando el equipo puede responder
claramente: ¿quién necesita algo, qué necesita, para qué lo necesita y
cómo sabremos que está correctamente implementado?

## Resultado esperado al terminar el Laboratorio 3

El equipo pasa de "Nuestro sistema tendrá usuarios, reportes,
solicitudes y administración" a un conjunto de historias concretas como
"Como cliente, quiero registrar una solicitud, para iniciar un
trámite." Ahora el proyecto empieza a tener trabajo concreto que puede
planificarse, desarrollarse y verificarse — todo lo que estudiaste en
[3. Introducción a Scrum](/materias/taller-integrador/bloque-01/03-introduccion-a-scrum/)
y en
[4. Definición del proyecto](/materias/taller-integrador/bloque-01/04-definicion-del-proyecto/)
queda ahora aplicado directamente a tu propio proyecto.
