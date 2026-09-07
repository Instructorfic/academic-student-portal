---
title: "Laboratorio 4 — Sprint 0: preparación profesional del proyecto"
description: "Bloque I de Taller Integrador — integrar problema, backlog, repositorio y primer incremento funcional en Sprint 0."
---

**Duración:** 100 minutos. **Modalidad:** Trabajo en equipo.
**Metodología:** Aprendizaje Basado en Problemas + Scrum.

## 1. Propósito

En este laboratorio tu equipo organizará formalmente su proyecto
integrador para comenzar el desarrollo bajo un enfoque de trabajo
profesional, integrando: problema, usuarios, alcance, historias de
usuario, Product Backlog, prioridades, roles Scrum, repositorio,
aplicación Laravel y primer incremento funcional.

El objetivo no es terminar el sistema. El objetivo es dejar el proyecto
**preparado para comenzar los Sprints de desarrollo**.

## 2. Resultado esperado

```text
Proyecto
├── Problema definido
├── Alcance definido
├── Usuarios identificados
├── Roles Scrum definidos
├── Product Backlog inicial
├── Historias priorizadas
├── Repositorio creado
├── Aplicación Laravel funcionando
└── Primer incremento funcional
```

## 3. ¿Qué es Sprint 0?

En Scrum formal, **Sprint 0 no es un elemento definido por la Scrum
Guide**. En este curso se utiliza el término como una **etapa académica
de preparación** del proyecto, para dejar listas las condiciones
mínimas antes de comenzar los Sprints de desarrollo. Sprint 0 no
sustituye un Sprint de Scrum ni se considera una excepción al marco de
trabajo (ver [3. Introducción a Scrum](/materias/taller-integrador/bloque-01/03-introduccion-a-scrum/)).

## 4. Antes de comenzar

El equipo ya debe contar con proyecto asignado, integrantes definidos,
problema o servicio identificado, las historias de usuario elaboradas
en el [Laboratorio 3](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario/), y los conocimientos básicos de
Laravel obtenidos en los [Laboratorios 1](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero/) y [2](/materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel/). No se debe cambiar
de proyecto ni comenzar otro: el trabajo se realiza sobre el proyecto
integrador ya asignado al equipo.

## 5. Actividad 1 — Definir los roles Scrum (10 minutos)

El equipo debe definir quién desempeñará cada responsabilidad:

| Responsabilidad | Integrante | Función principal |
| --- | --- | --- |
| Product Owner | | Maximizar el valor del producto |
| Scrum Master | | Facilitar Scrum y eliminar impedimentos |
| Developers | | Construir el incremento |

Puede existir más de un Developer. Una persona no debe asumir
automáticamente todas las responsabilidades: los roles representan
responsabilidades, no puestos de autoridad.

## 6. Actividad 2 — Confirmar el problema (10 minutos)

Retomen el problema definido en la
[Actividad 5](/materias/taller-integrador/bloque-01/actividades/actividad-5/)
y escriban una versión breve:

```text
Problema:
[Descripción concreta del problema]

Usuarios afectados:
[Usuarios principales]

Situación actual:
[Cómo se realiza actualmente]

Necesidad:
[Qué necesitan mejorar o resolver]
```

## 7. Actividad 3 — Confirmar el alcance (10 minutos)

| Dentro del proyecto | Fuera del proyecto |
| --- | --- |
| Registro de usuarios | Aplicación móvil nativa |
| Inicio de sesión | Integración con sistemas externos |
| Registro de solicitudes | ... |
| Consulta de solicitudes | ... |

Después identifiquen las principales restricciones (tiempo, tecnología,
tamaño del equipo, escala conceptual hasta 100,000 usuarios
potenciales, y otras que apliquen a su proyecto).

## 8. Actividad 4 — Construir el Product Backlog inicial (15 minutos)

Retomen las historias del Laboratorio 3 y organícenlas por prioridad,
las más importantes primero:

| ID | Historia | Prioridad | Puntos | Estado |
| --- | --- | --- | ---: | --- |
| HU-01 | Como cliente quiero registrar una solicitud... | Alta | 5 | Pendiente |
| HU-02 | Como cliente quiero consultar una solicitud... | Alta | 3 | Pendiente |

## 9. Actividad 5 — Seleccionar el primer incremento (15 minutos)

Respondan: ¿cuál es la mínima funcionalidad que podemos construir para
demostrar que el sistema comienza a funcionar? Seleccionen una o más
historias de alta prioridad. No intenten construir todo el sistema — el
primer incremento debe ser **pequeño, funcional y demostrable**.

## 10. Actividad 6 — Preparar el repositorio (15 minutos)

Utilicen el sistema de control de versiones definido para el curso. El
repositorio debe contener, como mínimo, la aplicación Laravel y un
`README.md` con nombre del proyecto, descripción, integrantes, objetivo
y tecnologías.

> En este laboratorio no se evaluarán todavía estrategias avanzadas de
> branching, Pull Requests, Code Review ni CI/CD — esos contenidos se
> trabajan en bloques posteriores del taller.

## 11. Actividad 7 — Integrar Laravel (15 minutos)

Coloquen su aplicación Laravel dentro del repositorio y verifiquen que
pueda ejecutarse (`php artisan serve` y `http://127.0.0.1:8000`).

## 12. Actividad 8 — Construir el primer incremento (20 minutos)

Implementen una funcionalidad pequeña del Product Backlog, usando lo
aprendido en los Laboratorios 1 a 3. El incremento debe ser funcional.
No es necesario implementar todavía seguridad avanzada, roles y
permisos completos, APIs, Docker, CI/CD, observabilidad ni arquitectura
avanzada.

## 13. Actividad 9 — Verificar el incremento (10 minutos)

| Verificación | Resultado |
| --- | --- |
| La aplicación inicia | ☐ |
| La funcionalidad puede accederse | ☐ |
| Los datos pueden capturarse | ☐ |
| Los datos se validan | ☐ |
| Los datos se almacenan cuando corresponde | ☐ |
| El usuario recibe una respuesta | ☐ |
| La funcionalidad corresponde a la historia | ☐ |

## 14. Definition of Done inicial

```text
☐ Está implementada.
☐ La aplicación funciona.
☐ La funcionalidad puede ejecutarse.
☐ Los criterios de aceptación se cumplen.
☐ No existen errores evidentes durante la demostración.
☐ El código está incorporado al repositorio.
```

## 15. Evidencia del laboratorio

- **Organización** — roles Scrum, integrantes, responsabilidades.
- **Definición del proyecto** — problema, usuarios, necesidad, alcance,
  fuera de alcance, restricciones.
- **Product Backlog** — mínimo 6 historias de usuario, cada una con ID,
  historia, prioridad, estimación y estado.
- **Repositorio** — con `README.md` y la aplicación Laravel.
- **Primer incremento** — al menos una funcionalidad ejecutable y
  demostrable.

## 16. Evidencia visual

Captura del repositorio del proyecto, de la aplicación Laravel
funcionando, de la funcionalidad implementada y de su resultado.

## 17. Reflexión del equipo

¿Qué decisión fue más importante para definir el primer incremento?
¿Qué historia decidieron implementar primero y por qué? ¿Qué dificultad
encontraron durante la preparación? ¿Qué necesitarían tener listo antes
de comenzar el siguiente Sprint? ¿Qué parte del proyecto todavía
representa mayor incertidumbre?

## 18. Entrega final

```text
# Sprint 0 — Proyecto Integrador

## 1. Información del equipo
## 2. Roles Scrum
## 3. Problema
## 4. Usuarios
## 5. Alcance
### Incluido
### Fuera de alcance
### Restricciones
## 6. Product Backlog inicial
## 7. Primer incremento
## 8. Definition of Done
## 9. Repositorio
## 10. Evidencias
## 11. Reflexión
```

## 19. Criterio de finalización

Sprint 0 se considera terminado cuando el equipo puede demostrar:
tenemos un proyecto definido, sabemos para quién lo construimos, sabemos
qué problema resolvemos, sabemos qué está dentro del alcance, tenemos
un Product Backlog, tenemos responsabilidades Scrum, tenemos un
repositorio, tenemos Laravel funcionando y tenemos al menos un
incremento funcional.

## 20. Resultado esperado del Bloque I

Al finalizar los cuatro laboratorios, tu equipo habrá recorrido:

```text
Laboratorio 1 — Primer contacto con Laravel
        ↓
Laboratorio 2 — Primer CRUD
        ↓
Laboratorio 3 — Historias de usuario
        ↓
Laboratorio 4 — Sprint 0
        ↓
Proyecto listo para desarrollo
```

El proyecto ya no se encuentra únicamente en la etapa de "tenemos una
idea de lo que queremos construir": se encuentra en "tenemos un
problema definido, un alcance, un backlog priorizado, responsabilidades
de trabajo, un repositorio y un primer incremento funcional." A partir
de aquí, el proyecto continuará evolucionando mediante Sprints e
incrementos funcionales durante los siguientes bloques del taller — ver
el [cierre de este bloque](/materias/taller-integrador/bloque-01/06-cierre-y-resumen/).
