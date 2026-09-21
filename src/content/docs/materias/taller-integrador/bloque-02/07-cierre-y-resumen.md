---
title: "7. Cierre y resumen del bloque"
description: "Bloque II de Taller Integrador — cierre, resumen y qué sigue en el Bloque III."
---

## Cierre: vuelve al problema inicial

Retoma la situación de la
[introducción del bloque](/materias/taller-integrador/bloque-02/):
dos integrantes modifican el mismo archivo y uno de los dos no sabe qué
hacer cuando Git le avisa que no puede subir su cambio.

Con lo que aprendiste en este bloque, puedes explicar esa situación con
mayor precisión:

- Si hubieran trabajado en ramas de característica separadas, ese
  problema no habría bloqueado a ninguno de los dos.
- El conflicto que Git reportó no es un error del sistema: es Git
  pidiendo que una persona decida qué versión es correcta.
- Un pull request con revisión real habría detectado el choque antes de
  que llegara a producir un conflicto tan grande.

## Resumen del bloque

- Las **ramas de característica** permiten trabajar en paralelo sin
  bloquear al resto del equipo.
- Un **pull request** con **code review** real evita que código sin
  revisar llegue a `main`.
- Un **conflicto de fusión** se resuelve decidiendo, como equipo, qué
  versión es correcta — no evitándolo.
- La **Definition of Done** solo sirve si se aplica de verdad, no si
  solo existe como documento.
- **Separación de responsabilidades**, **cohesión** y **acoplamiento**
  son los criterios para decidir cómo organizar tu código antes de que
  crecer se vuelva un problema.
- Un **patrón de diseño** resuelve un problema real identificado
  primero — nunca se elige antes de tener el problema.
- Conventional Commits y versionado semántico son una ampliación sobre
  el temario oficial: no sustituyen ningún resultado de aprendizaje,
  pero te preparan para un flujo de trabajo profesional.

## Lo que todavía no vas a estudiar

Esta unidad delimita deliberadamente lo que corresponde a bloques
posteriores del programa:

- Integración continua y pipelines de CI/CD (Bloque III).
- Manejo de datos, persistencia avanzada, APIs y pruebas automatizadas
  como contenido central (Bloque III).
- Contenedores, Docker Compose y despliegue (Bloque IV).
- Arquitecturas distribuidas y de microservicios en profundidad — tu
  proyecto sigue siendo, deliberadamente, un monolito multicapa.

## Una última revisión

Al terminar este bloque deberías poder explicar, sin necesidad de
consultar tus notas: qué problema resuelve Git y por qué es un sistema
distribuido, qué es una rama de característica y por qué se usa, qué es
un pull request y por qué el code review no es opcional, cómo se
resuelve un conflicto de fusión, qué diferencia hay entre declarar y
aplicar una Definition of Done, qué son la separación de
responsabilidades, la cohesión y el acoplamiento, y cómo decides qué
patrón de diseño aplicar (y cuándo no aplicar ninguno).

Si alguna de estas preguntas todavía no la puedes responder con
claridad, es una señal de que conviene revisar el tema correspondiente
antes de avanzar:
[1](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/),
[2](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/),
[3](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/),
[4](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/) o
[5](/materias/taller-integrador/bloque-02/05-patrones-de-diseno/).

## Qué sigue: Bloque III

Con estos fundamentos, en el Bloque III vas a construir componentes,
APIs, persistencia y pruebas automatizadas sobre la arquitectura que ya
documentaste aquí — no la vas a rehacer desde cero. La pregunta que
organiza ese bloque será: **¿cómo se construye el sistema completo
sobre esta base?** Ese bloque todavía no está publicado en este portal.

```text
Bloque II
Git colaborativo → integración → arquitectura → patrones de diseño
      ↓
Bloque III
Componentes → APIs → persistencia → pruebas automatizadas
```

## Referencias generales del bloque

Consulta el listado completo, con su justificación de relevancia, en
[Referencias del Bloque II](/materias/taller-integrador/bloque-02/referencias/).
