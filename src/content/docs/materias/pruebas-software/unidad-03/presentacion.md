---
title: "Presentación — Unidad III"
description: "Unidad III de Pruebas de Software — objetivos, situación del SPB, reglas del caso, pregunta orientadora y mapa de la unidad."
---

## Al finalizar esta unidad podrás

<div class="grid-2">

<div class="card accent-azul">
<span class="badge">3.1</span>
<strong>Niveles de prueba</strong>
<p>Distinguir prueba unitaria, de integración, de sistema y de aceptación, y ubicarlas en un sistema.</p>
</div>

<div class="card accent-dorado">
<span class="badge">3.2</span>
<strong>Técnicas de caja negra</strong>
<p>Derivar casos con partición de equivalencia, valores límite y tablas de decisión.</p>
</div>

<div class="card accent-verde">
<span class="badge">3.2</span>
<strong>Caja blanca, exploración y riesgo</strong>
<p>Analizar rutas y complejidad ciclomática, explorar con un charter y priorizar por riesgo.</p>
</div>

<div class="card accent-rojo">
<span class="badge">3.3–3.4</span>
<strong>Plan de pruebas</strong>
<p>Elaborar un plan de pruebas básico con referencia a estándares de documentación.</p>
</div>

</div>

## Antes de empezar

Si un campo acepta días de préstamo del 1 al 14, ¿qué tres valores usarías para probarlo?

¿Quién debería probar la función que calcula una multa: quien la programó, otra persona del equipo o quien usará el sistema?

Abre tus escenarios (ESC) de la Unidad II: ¿alguno indica valores concretos? ¿Cómo los eligieron?

## Una situación

<div class="callout">

El equipo del **Sistema de Préstamos de Biblioteca (SPB)** terminó los módulos de préstamo, devolución y búsqueda. Antes de liberar la versión 1.0 alguien pregunta: "¿ya lo probaron?". La respuesta: **"sí, probamos lo que se nos ocurrió"**.

</div>

Nadie puede decir qué valores se usaron, por qué esos, qué partes del código se ejecutaron, qué se probó primero ni cuándo se decidió que era suficiente.

<p class="small">Caso ilustrativo ficticio, común para todo el grupo. Tu sistema bajo prueba es tu proyecto base (A, B o C).</p>

## Las reglas del SPB

| ID | Regla |
| --- | --- |
| RN-01 | Días de préstamo: entero entre 1 y 14, inclusive |
| RN-02 | Libros simultáneos: máximo 3 (ESTUDIANTE) y 5 (DOCENTE) |
| RN-03 | Se autoriza si el registro está vigente, no hay adeudo y los libros actuales son menos que el límite |
| RN-04 | Multa por día de retraso: 5 MXN (ESTUDIANTE) y 3 MXN (DOCENTE), con tope de 100 MXN y 0 si no hay retraso |
| RNF-01 | La búsqueda responde en 2 s o menos con 50 usuarios simultáneos |

<p class="small">También: RF-01 registrar préstamo · RF-02 registrar devolución y calcular multa · RF-03 buscar libro.</p>

## Pregunta orientadora

<div class="banner-node">

<strong>Pregunta central:</strong> si un campo acepta valores del 1 al 14, ¿cuántos valores necesitas probar para tener confianza razonable en que la regla funciona, y cuáles elegirías?

</div>

## Lo que ya tienes

| Lo que hiciste | Unidad | Se usa aquí para |
| --- | --- | --- |
| Riesgo = impacto × probabilidad | I | Pruebas basadas en riesgos y prioridad del plan |
| Criterios de salida verificables | I | Criterios del plan de pruebas |
| Cobertura de instrucciones y decisiones | I | Diseñar casos de caja blanca |
| Reglas RN de tu proyecto base | II | Entrada de las técnicas de caja negra |
| Escenarios ESC | II | Se concretan en casos de prueba CP |
| Matriz de trazabilidad | II | Se amplía con la columna CP |

## Mapa de la unidad

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>¿EN QUÉ NIVEL?</strong>

Unitaria · integración ·
sistema · aceptación
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>¿CON QUÉ TÉCNICA?</strong>

Caja negra · gris · blanca ·
exploratoria · por riesgo
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>¿CON QUÉ PLAN?</strong>

Alcance · estrategia ·
criterios · datos · ambiente
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>¿CÓMO SE DEMUESTRA?</strong>

Estándares · documentos ·
evidencias
</div>

</div>

## Temas de la unidad

1. [Tipos y niveles de pruebas](/materias/pruebas-software/unidad-03/01-tipos-y-niveles-de-pruebas/)
2. [Técnicas de diseño: enfoques y casos de prueba](/materias/pruebas-software/unidad-03/02-tecnicas-de-diseno-enfoques-y-casos/)
3. [Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)
4. [Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/)
5. [Pruebas exploratorias y basadas en riesgos](/materias/pruebas-software/unidad-03/05-pruebas-exploratorias-y-basadas-en-riesgos/)
6. [Planificación de pruebas](/materias/pruebas-software/unidad-03/06-planificacion-de-pruebas/)
7. [Estándares y documentación](/materias/pruebas-software/unidad-03/07-estandares-y-documentacion/)
8. [Cierre y resumen](/materias/pruebas-software/unidad-03/08-cierre-y-resumen/)
