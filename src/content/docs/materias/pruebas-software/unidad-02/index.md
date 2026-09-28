---
title: "Unidad II — Requisitos, criterios de aceptación y trazabilidad"
description: "Pruebas de Software — introducción a la Unidad II: resultados de aprendizaje, ruta de estudio y la pregunta que organiza toda la unidad."
---

## Identificación de la unidad

| Campo | Valor |
| --- | --- |
| Unidad | II — Requisitos, criterios de aceptación y trazabilidad |
| Materia | Pruebas de Software (clave 19506) |
| Sesiones | 5 |
| Carácter | Aplicada — sin herramienta de gestión de pruebas (esa se introduce en la Unidad VII); tres laboratorios guiados |

## Resultados de aprendizaje de la unidad

Al finalizar esta unidad podrás:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA2.1 | Derivar requisitos funcionales, requisitos no funcionales y reglas de negocio verificables a partir del proyecto base asignado a tu equipo |
| RA2.2 | Construir, a partir de casos de uso y/o historias de usuario, criterios de aceptación y escenarios de prueba positivos, negativos y alternos (incluyendo condiciones límite) |
| RA2.3 | Establecer relaciones de trazabilidad requisito–caso de prueba y caso de prueba–defecto, y construir una matriz de trazabilidad |

Estos tres resultados son una subdivisión didáctica del resultado
esperado único que define el programa oficial para esta unidad: que
puedas derivar escenarios y casos de prueba a partir de requisitos, y
establecer relaciones de trazabilidad.

## Qué vas a estudiar

Esta unidad cubre tres contenidos oficiales del programa:

```text
2.1 Requisitos como base de las pruebas
    2.1.1 Requisitos funcionales
    2.1.2 Requisitos no funcionales
    2.1.3 Reglas de negocio verificables

2.2 Casos de uso, historias de usuario y criterios de aceptación
    2.2.1 Casos de uso como insumo de pruebas
    2.2.2 Historias de usuario como insumo de pruebas
    2.2.3 Criterios de aceptación
    2.2.4 Escenarios positivos, negativos y alternos

2.3 Trazabilidad
    2.3.1 Trazabilidad requisito-caso de prueba
    2.3.2 Trazabilidad caso de prueba-defecto
    2.3.3 Matriz de trazabilidad
```

En esta materia, los tres laboratorios guiados **son** las actividades
evaluadas de la unidad: no existe un documento de "actividades" aparte,
cada laboratorio incluye sus propias instrucciones, producto/evidencia y
criterio de logro.

### Ruta de estudio sugerida

1. Lee esta introducción y guarda tu respuesta a la pregunta orientadora
   (más abajo). Revisa también los
   [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/)
   y ubica el que el docente asignó a tu equipo.
2. Lee [1. Requisitos funcionales, no funcionales y reglas de negocio](/materias/pruebas-software/unidad-02/01-requisitos-funcionales-no-funcionales-reglas-negocio/)
   y realiza el
   [Laboratorio 1 — Requisitos y reglas de negocio](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio/).
3. Lee [2. Casos de uso e historias de usuario](/materias/pruebas-software/unidad-02/02-casos-de-uso-historias-usuario/)
   y [3. Criterios de aceptación y escenarios](/materias/pruebas-software/unidad-02/03-criterios-aceptacion-escenarios/),
   y realiza el
   [Laboratorio 2 — Criterios de aceptación y escenarios](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-2-criterios-aceptacion-escenarios/).
4. Lee [4. Trazabilidad y matriz de trazabilidad](/materias/pruebas-software/unidad-02/04-trazabilidad-matriz/)
   **antes** de la última sesión, y realiza el
   [Laboratorio 3 — Matriz de trazabilidad](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/)
   (evidencia oficial de la unidad), con el
   [Formato de la matriz de trazabilidad](/materias/pruebas-software/unidad-02/formato-matriz-trazabilidad/).
5. Recorre [5. Más ejemplos aplicados](/materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado/)
   (recuperación de contraseña, y la contradicción del tema 1 ya
   resuelta) para confirmar que entiendes el pipeline completo con
   funcionalidades distintas a la del ejemplo principal.
6. Revisa el [cierre de la unidad](/materias/pruebas-software/unidad-02/06-cierre-y-resumen/)
   antes de avanzar a la Unidad III.

> **Nota de ritmo.** Esta unidad se cursa en 5 sesiones. La última
> concentra los tres subtemas de trazabilidad además del cierre —
> conviene llegar a esa sesión con los Laboratorios 1 y 2 ya resueltos.

## Tu proyecto integrador continúa aquí

A partir de esta unidad, cada equipo trabaja sobre uno de los tres
**proyectos base** del proyecto integrador, asignado por el docente:

| Proyecto | Sistema | Alcance principal |
| --- | --- | --- |
| A | Sistema de citas médicas | Pacientes, citas, disponibilidad, cancelación, reprogramación y notificaciones |
| B | Sistema de venta y pedidos de una tienda | Clientes, productos, carrito, pedidos y estado del pedido |
| C | Sistema de inscripción escolar | Estudiantes, materias, inscripción, cupos y horarios |

En cada laboratorio vas a derivar requisitos, criterios de aceptación,
escenarios y una matriz de trazabilidad **del proyecto asignado a tu
equipo**, el mismo en los tres laboratorios y en las unidades
siguientes. Al cierre de la unidad tendrás la matriz de trazabilidad
inicial, que es la evidencia oficial de la Unidad II. La descripción
completa de cada proyecto está en
[Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/).

## Evaluación

La evaluación de cierre de la Unidad II se compone de una evaluación
teórica individual (50 %) y una evaluación práctica (50 %): la
presentación y defensa de los tres laboratorios y de la matriz de
trazabilidad. Consulta el detalle en
[Evaluación de la unidad](/materias/pruebas-software/unidad-02/evaluacion/).

## ¿Qué problema vamos a resolver?

Piensa en esta situación:

> Un equipo construye un formulario de registro de usuarios. Al
> entregarlo, alguien reporta que "no valida bien los correos". El
> equipo responde que "sí funciona, así lo pidieron". Nadie escribió,
> antes de construirlo, qué significaba "validar bien" un correo.

Este escenario es un disparador ilustrativo para la unidad: no forma
parte de ninguno de los proyectos base. Sirve para explicar los
conceptos antes de que los apliques al proyecto asignado a tu equipo.

En la Unidad I aprendiste **por qué** se prueba software. Esta unidad
responde la pregunta que quedó pendiente: si "ya funciona" no es
suficiente para evitar un desacuerdo como el del ejemplo, ¿qué,
exactamente, debe probarse, y cómo lo documentamos para que no dependa
de la opinión de cada quien?

> **Pregunta orientadora.** Si nadie documentó qué debía cumplir el
> formulario, ¿cómo se puede decidir si el reporte es un defecto real o
> una expectativa que nunca se acordó?

Guarda esta pregunta. Volverás a ella en el
[cierre de la unidad](/materias/pruebas-software/unidad-02/06-cierre-y-resumen/).

## Activación — antes de empezar

> Antes de continuar, piensa (en grupo o individualmente, según indique
> tu docente): retomando la situación anterior, ¿qué tendría que haber
> escrito el equipo, antes de construir el formulario, para que "validar
> bien un correo" fuera una condición verificable y no una opinión?
> Vas a responder esta pregunta con precisión técnica al terminar el
> primer tema.

## Qué NO se estudia todavía en esta unidad

Para mantener el alcance de la Unidad II, no se desarrollan formalmente:

- técnicas de diseño de casos de prueba (caja negra, caja blanca,
  partición de equivalencia, valores límite formales) — Unidad III;
- ejecución real de pruebas y gestión operativa del defecto (severidad,
  prioridad, ciclo de vida, herramientas como Jira, TestLink o Zephyr) —
  Unidad VII;
- pruebas funcionales, de sistema, GUI o de API — Unidad V.

La trazabilidad caso de prueba–defecto (2.3.2) se trabaja aquí solo como
relación conceptual prevista, no como gestión operativa del defecto.
