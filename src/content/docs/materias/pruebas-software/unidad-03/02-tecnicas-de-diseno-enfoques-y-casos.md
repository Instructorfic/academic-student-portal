---
title: "2. Técnicas de diseño: enfoques y casos de prueba"
description: "Unidad III de Pruebas de Software — qué es una técnica de diseño, caja negra frente a caja blanca, del escenario al caso de prueba y formato del caso."
---

**Temas del programa:** 3.2.1 y 3.2.2

## ¿Qué es una técnica de diseño de pruebas?

Un procedimiento sistemático para decidir **qué casos** escribir y **con qué datos**, de forma que la elección se pueda justificar, repetir y revisar.

| Familia | Usa | Técnicas de la unidad |
| --- | --- | --- |
| Caja negra | La especificación | Partición, valores límite, tablas de decisión |
| Caja blanca | La estructura del código | Rutas, decisiones, complejidad ciclomática |
| Basadas en la experiencia | El conocimiento de quien prueba | Pruebas exploratorias |

<p class="small">Las pruebas basadas en riesgos deciden cuánto esfuerzo y qué técnicas asignar a cada parte.</p>

## Los enfoques se complementan

<div class="grid-3">

<div class="card accent-azul"><strong>Caja negra</strong><p>Detecta lo que falta: el código no muestra lo que no se programó.</p></div>
<div class="card accent-dorado"><strong>Caja blanca</strong><p>Detecta lógica que ninguna prueba ejecutó.</p></div>
<div class="card accent-verde"><strong>Exploratoria</strong><p>Detecta lo que nadie escribió: ni en la especificación ni en el código.</p></div>

</div>

<p class="small">Entre negra y blanca está la <strong>caja gris</strong>: conocimiento parcial del diseño, ejecución por la interfaz externa (Bloque 4).</p>

## Del escenario al caso de prueba

```text
ESC (Unidad II)                    técnica (Unidad III)            CP (Unidad III)
"Préstamo con días fuera      →    valores límite          →      CP: días = 15 → rechazado
 del rango permitido"              sobre RN-01                     CP: días = 0  → rechazado
```

<div class="callout-alcance">

El **escenario** dice qué situación se prueba. El **caso** fija los datos exactos, la técnica que los justifica y el resultado esperado.

</div>

## Formato del caso de prueba

| Campo | Ejemplo |
| --- | --- |
| ID · ESC de origen | `CP-01` · `ESC-03` (en el SPB: `CP-RN01-03`) |
| Requisito o regla · Técnica | RN-01 · Valores límite |
| Precondiciones | Usuario con registro vigente y sin adeudo |
| Datos · Acción | Días = 15 · Registrar préstamo |
| Resultado esperado | Rechazado: días fuera de rango |
| Estado | Pendiente de ejecutar |

<div class="callout-alerta">

Sin resultado esperado no hay caso de prueba. El **oráculo** es la especificación, nunca el código.

</div>

## Actividad A2 — Selección de enfoque

<div class="callout">

Para seis situaciones del SPB decide el enfoque y justifícalo. Escribe un caso completo y analiza qué le falta a un escenario de tu proyecto base para ser un caso.

</div>

Instrucciones completas: **Actividades de la Unidad 03**, Actividad A2.

## Qué sigue

Continúa con [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/).
