---
title: "5. Pruebas exploratorias y basadas en riesgos"
description: "Unidad III de Pruebas de Software — charter, sesión exploratoria y priorización por riesgo."
---

**Temas del programa:** 3.2.3 y 3.2.4

## Pruebas exploratorias: ¿qué problema resuelven?

Las técnicas anteriores solo prueban lo que alguien **anticipó**. Muchos problemas aparecen en situaciones que nadie escribió: secuencias raras, interrupciones, datos extraños.

```text
Prueba con guion  ◄────────────────────────────►  Prueba exploratoria
(casos escritos antes)                            (diseñar, ejecutar y aprender a la vez)
```

<div class="callout-alerta">

Explorar **no** es "probar sin plan": la exploración está delimitada por una misión, un tiempo y un registro.

</div>

## ¿Qué es un charter?

<div class="banner-node">

Un <strong>charter</strong> es una declaración breve de la <strong>misión</strong> de una sesión exploratoria: qué se explora, con qué y para descubrir qué. No tiene pasos ni resultados esperados.

</div>

<div class="grid-2">
<div class="card"><strong>Enfoca</strong><p>Evita "probar de todo un poco".</p></div>
<div class="card"><strong>Delimita</strong><p>Dice cuándo se cumplió la misión.</p></div>
<div class="card"><strong>Comunica</strong><p>Otra persona sabe qué se exploró.</p></div>
<div class="card"><strong>Planifica</strong><p>Los charters se priorizan por riesgo.</p></div>
</div>

## Estructura del charter

```text
Explorar       el registro de devoluciones
con            fechas de entrega cercanas a fin de mes y ambos tipos de usuario
para descubrir errores en el cálculo de los días de retraso y de la multa
```

<p class="small">Formato explorar–con–para descubrir propuesto por Hendrickson (REF-U3-18, pendiente de verificación).</p>

## Buenos y malos charters

| Charter | Diagnóstico |
| --- | --- |
| "Explorar el SPB para encontrar errores." | Demasiado amplio |
| "Verificar que con 3 días la multa de un ESTUDIANTE es 15." | Demasiado estrecho: es un caso de prueba |
| "Explorar la búsqueda con títulos con acentos, signos y textos muy largos para descubrir resultados incompletos o mensajes confusos." | Equilibrado |

<p class="small">Fuentes de charters: matriz de riesgo, escenarios negativos y de límite, preguntas abiertas de las tablas de decisión, hallazgos previos.</p>

## La sesión exploratoria

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>PREPARAR</strong>

Leer el charter, preparar datos y ambiente
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>EXPLORAR</strong>

Probar, observar, anotar. Lo ajeno al charter es una oportunidad
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>CERRAR</strong>

Qué se exploró, qué se encontró, qué sigue
</div>

</div>

<p class="small">Gestión basada en sesiones (Bach, REF-U3-17, pendiente de verificación). Hoja de sesión: charter, personas, tiempo, ambiente, notas, posibles defectos, preguntas, datos, oportunidades, cierre.</p>

## Ejemplo de notas de sesión (SPB)

| Min | Qué probé | Qué observé | Pregunta o posible defecto |
| ---: | --- | --- | --- |
| 2 | Devolución ESTUDIANTE, 2 días tarde (fin de mes) | 10 MXN | — (correcto) |
| 7 | Misma devolución registrada dos veces | Se cobra otra vez | ¿Se puede devolver dos veces? |
| 16 | Fecha límite 28 de febrero, devuelto 1 de marzo | 5 MXN | ¿Días de retraso en año bisiesto? |

<p class="small">Las notas registran también lo que funcionó: es información de cobertura.</p>

## Pruebas basadas en riesgos

Usan el **riesgo de producto** para decidir qué probar primero, con qué técnicas, en qué niveles y con cuánta profundidad.

<div class="grid-2">

<div class="card accent-azul">
<strong>Factores de impacto</strong>
<p>Dinero, usuarios afectados y frecuencia de uso, consecuencias legales o de privacidad, reputación.</p>
</div>

<div class="card accent-dorado">
<strong>Factores de probabilidad</strong>
<p>Complejidad (V(G) alto), código nuevo, dependencias externas, tecnología nueva, defectos previos.</p>
</div>

</div>

<p class="small">Proceso: identificar → analizar → priorizar y tratar → monitorear. Escala: 1 bajo, 2 medio, 3 alto (en la Unidad I: alto/medio/bajo).</p>

## Del riesgo al tratamiento

| Área del SPB | I | P | Riesgo | Tratamiento |
| --- | ---: | ---: | --- | --- |
| Cálculo de multa (RN-04) | 3 | 2 | 6 — Alto | Primero, con varias técnicas, niveles y exploración |
| Autorización (RN-03) | 3 | 2 | 6 — Alto | Tabla de decisión, valores límite, caja blanca |
| Búsqueda (RF-03) | 2 | 1 | 2 — Bajo | Partición mínima y exploración breve |

<p class="small">Escala: 6–9 alto, 3–4 medio, 1–2 bajo.</p>

## Actividad A3 — Riesgo y exploración

<div class="callout">

Construye la matriz de riesgo y los charters de **tu proyecto base**, y practica una sesión exploratoria de 20 minutos sobre la aplicación que indique tu docente.

</div>

Instrucciones completas: **Actividades de la Unidad 03**, Actividad A3.

## Qué sigue

Continúa con [6. Planificación de pruebas](/materias/pruebas-software/unidad-03/06-planificacion-de-pruebas/).
