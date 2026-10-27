---
title: "6. Planificación de pruebas"
description: "Unidad III de Pruebas de Software — plan de pruebas, objetivo y alcance, estrategia, criterios de entrada y salida, datos, ambientes y riesgos de prueba."
---

**Temas del programa:** 3.3

## ¿Qué es un plan de pruebas?

El documento que dice **antes de ejecutar** qué se prueba, qué no, cómo, con qué, quién, cuándo empieza y cuándo termina.

| Término | Alcance |
| --- | --- |
| Estrategia de la organización | Reglas generales para todos los proyectos |
| Plan de pruebas | Cómo se prueba **este** proyecto o versión |
| Estrategia del plan | Niveles, tipos y técnicas por funcionalidad |

<p class="small">Es un documento vivo: cambia con los requisitos, los riesgos y el calendario, y cada cambio se registra.</p>

## ¿Qué responde un plan de pruebas?

<div class="grid-3">

<div class="card"><strong>¿Qué?</strong><p>Objetivo y alcance.</p></div>
<div class="card"><strong>¿Cómo?</strong><p>Estrategia: niveles, tipos, técnicas, prioridad.</p></div>
<div class="card"><strong>¿Cuándo empezar y terminar?</strong><p>Criterios de entrada y salida.</p></div>
<div class="card"><strong>¿Con qué?</strong><p>Datos y ambiente de pruebas.</p></div>
<div class="card"><strong>¿Qué podría impedirlo?</strong><p>Riesgos de prueba.</p></div>
<div class="card"><strong>¿Cómo se demuestra?</strong><p>Documentación y evidencias.</p></div>

</div>

## Objetivo y alcance

<div class="grid-2">

<div class="card accent-verde">
<strong>Verificable</strong>
<p>"Comprobar que RF-01, RF-02 y RN-01 a RN-04 se cumplen en la versión 1.0, para decidir su liberación".</p>
</div>

<div class="card accent-rojo">
<strong>No verificable</strong>
<p>"Asegurar que el sistema funcione bien".</p>
</div>

</div>

<div class="callout-alcance">

El alcance dice qué se **incluye** y qué se **excluye**, con justificación. Ejemplo: RNF-01 queda fuera de esta versión porque el rendimiento se trabaja en la Unidad VI.

</div>

## Estrategia de pruebas

| Funcionalidad / regla | Riesgo | Niveles | Técnicas | Prioridad |
| --- | --- | --- | --- | ---: |
| RN-04 Multa | Alto | Unitaria, sistema | Partición de salidas, valores límite, caja blanca | 1 |
| RF-03 Búsqueda | Bajo | Sistema | Partición, exploratoria | 3 |

<div class="callout-alerta">

"Caja negra" es un enfoque, no una técnica: la estrategia nombra la técnica concreta y **por qué** esa.

</div>

## Criterios de entrada y salida

<div class="grid-2">

<div class="card accent-azul">
<strong>Entrada — para iniciar</strong>
<p>Ambiente disponible · versión identificada · casos de prioridad 1 revisados · datos cargados.</p>
</div>

<div class="card accent-dorado">
<strong>Salida — para terminar</strong>
<p>Ejecución (100 % de prioridad 1) · defectos (ninguno alto abierto) · cobertura (100 % de requisitos del alcance) · tiempo con riesgo aceptado.</p>
</div>

</div>

<p class="small">Suspensión: cuándo detener porque continuar no informa nada. Reanudación: cuándo retomar.</p>

## Datos y ambientes de prueba

<div class="grid-2">

<div class="card">
<strong>Datos de prueba</strong>
<p>Se <strong>preparan</strong>, se <strong>controlan</strong> (estado y restablecimiento) y se <strong>protegen</strong>. Un caso depende del estado de sus datos.</p>
</div>

<div class="card">
<strong>Ambiente de pruebas</strong>
<p>Hardware, software, configuración y servicios. Separado de producción y documentado. Si aún no existe, se describe el previsto.</p>
</div>

</div>

<div class="callout-alcance">

Un resultado solo es reproducible si se conocen sus datos y su ambiente.

</div>

## Riesgo de producto y riesgo de prueba

| | Riesgo de producto (3.2.4) | Riesgo de prueba (3.3.5) |
| --- | --- | --- |
| Sobre | El software | El proceso de prueba |
| Ejemplo | Error en el cálculo de multas | El ambiente no está listo a tiempo |
| Decide | Qué probar primero | Qué contingencia preparar |
| En el plan | Sección 5.1 | Sección 10 |

<p class="small">Fuentes de riesgos de prueba: personas, ambiente, requisitos ambiguos, tiempo, herramientas.</p>

## El formato del plan de pruebas de la materia

<div class="grid-4">

<div class="card"><span class="badge">1–4</span><p>Identificación · objetivo · alcance · insumos</p></div>
<div class="card"><span class="badge">5</span><p>Estrategia: riesgo, técnicas, charters, recursos</p></div>
<div class="card"><span class="badge">6–7</span><p>Criterios de entrada, salida, suspensión</p></div>
<div class="card"><span class="badge">8–9</span><p>Datos y ambiente</p></div>
<div class="card"><span class="badge">10</span><p>Riesgos de prueba</p></div>
<div class="card"><span class="badge">11</span><p>Roles y calendario</p></div>
<div class="card"><span class="badge">12</span><p>Documentación y evidencias</p></div>
<div class="card"><span class="badge">A–B</span><p>Casos de prueba · caja blanca</p></div>

</div>

<p class="small">Explicación de cada sección y plantilla: Formato del Plan de Pruebas — Unidad 03. Simplificación didáctica inspirada en los estándares.</p>

## Actividad A4 — Estrategia y criterios del SPB

<div class="callout">

Redacta, para el SPB y con el formato de la materia: objetivo, alcance, estrategia, criterios, datos, ambiente y riesgos de prueba.

</div>

Es un ensayo sobre el caso común antes del plan de tu proyecto base.

Instrucciones completas: **Actividades de la Unidad 03**, Actividad A4.

## Qué sigue

Continúa con [7. Estándares y documentación](/materias/pruebas-software/unidad-03/07-estandares-y-documentacion/).
