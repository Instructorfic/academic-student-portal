---
title: "4. Principios generales de pruebas"
description: "Unidad I de Pruebas de Software — cuatro principios ampliamente reconocidos que orientan cuándo y cómo probar."
---

Estos cuatro principios, ampliamente reconocidos en la disciplina de
pruebas de software, te ayudan a razonar sobre cuándo y cómo probar,
incluso antes de conocer técnicas específicas de diseño de pruebas
(esas técnicas son contenido de la Unidad III).

## Las pruebas muestran presencia de defectos

Las pruebas pueden mostrar que existen defectos, pero **no pueden
probar que un sistema está libre de ellos**. Que una funcionalidad
haya pasado todas las pruebas diseñadas no significa que no tenga
defectos: significa que no se encontraron defectos con las pruebas que
se ejecutaron.

Esta distinción es central para entender por qué "ya se probó
manualmente", en la situación de la
[introducción de la unidad](/materias/pruebas-software/unidad-01/), no es una afirmación
verificable por sí sola: probar sin documentar qué se probó no permite
saber qué tan exhaustiva fue realmente esa prueba.

## Pruebas tempranas

Cuanto antes se detecte un defecto en el ciclo de vida, menor es
generalmente el costo y el esfuerzo de corregirlo. Por eso conviene
iniciar actividades de prueba, o de revisión en el sentido de garantía
de calidad que viste en el
[tema anterior](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/), desde las primeras
etapas del desarrollo, no solo al final.

## Agrupación de defectos

Los defectos no se distribuyen de manera uniforme en un sistema:
suelen concentrarse en un número reducido de módulos, generalmente los
más complejos, los que han cambiado más recientemente, o los que
fueron desarrollados bajo mayor presión de tiempo. Identificar estos
módulos críticos permite dirigir el esfuerzo de prueba con mayor
eficacia.

## Criterios de salida

Un proceso de pruebas necesita **condiciones explícitas** para decidir
cuándo una etapa de pruebas puede considerarse terminada. Por ejemplo,
"todas las pruebas planificadas se ejecutaron" o "no quedan defectos
abiertos de severidad alta". Sin criterios de salida explícitos, "ya
se probó" se vuelve una afirmación subjetiva, exactamente lo que
faltó en la situación planteada al inicio de la unidad.

En la Unidad III volverás a estos criterios de entrada y salida, ahora
como parte formal de un plan de pruebas.

## Error común

Confundir "criterio de salida verificable" con una meta genérica.
"El sistema funciona bien" no es un criterio de salida: no hay forma
objetiva de comprobar si se cumplió. "No quedan defectos abiertos de
severidad alta" sí lo es.

## Ampliación — los 7 principios ISTQB

> Esta sección amplía el contenido oficial de la unidad; no cambia lo
> que se evalúa en la Actividad 5 ni en la rúbrica. El **ISTQB**
> (*International Software Testing Qualifications Board*) reconoce 7
> principios generales de las pruebas. Los cuatro que ya estudiaste
> (presencia de defectos, pruebas tempranas, agrupación de defectos y
> criterios de salida — este último no es, en sentido estricto, uno de
> los 7 principios ISTQB, sino un tema propio del programa oficial)
> cubren tres de ellos. Aquí conoces los tres restantes.

### Principio — Las pruebas exhaustivas no existen (*exhaustive testing is impossible*)

Probar todas las combinaciones posibles de entradas y precondiciones
no es viable, salvo en casos triviales. Un formulario con 10 campos de
texto y 6 valores posibles por campo genera 6¹⁰ (aproximadamente 60
millones) de combinaciones: probarlas todas es económicamente
inviable.

**Para qué sirve:** en lugar de intentar la exhaustividad, se recurre
al análisis de riesgo y a técnicas de diseño de pruebas para decidir
qué combinaciones probar — el "cómo elegir" que se formaliza en la
Unidad III.

### Principio — La paradoja del pesticida (*pesticide paradox*)

Repetir el mismo conjunto de pruebas una y otra vez hace que,
eventualmente, deje de encontrar defectos nuevos, igual que un
pesticida pierde eficacia contra una plaga con el tiempo.

**Para qué sirve:** justifica revisar y actualizar periódicamente las
pruebas existentes y escribir pruebas nuevas. En pruebas de regresión
automatizadas, este efecto también tiene un lado positivo: un número
bajo y estable de defectos de regresión.

### Principio — Las pruebas dependen del contexto (*testing is context dependent*)

No se prueba igual un sitio web informativo que el software de control
de un avión de pasajeros. A mayor riesgo de pérdida humana o
económica, mayor debe ser la inversión en pruebas.

**Para qué sirve:** advierte contra aplicar la misma profundidad de
prueba a todo por igual. Los casos reales de la siguiente sección
muestran qué ocurre cuando el contexto de riesgo se subestima.

### Un cuarto elemento relacionado: la falacia de ausencia de errores

Aunque no aparece en el temario oficial de esta unidad, el ISTQB
también advierte sobre la **falacia de ausencia de errores**
(*absence-of-errors fallacy*): encontrar y corregir muchos defectos no
garantiza el éxito de un sistema, que puede seguir siendo difícil de
usar o no cumplir las necesidades reales del usuario. Se relaciona
directamente con la diferencia entre **verificación** y **validación**
que viste en el
[tema anterior](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/).

## Casos reales — cuando falla el proceso de prueba

> Los dos casos siguientes son reales, con fuente citada — a diferencia
> del escenario ilustrativo genérico de la
> [introducción de la unidad](/materias/pruebas-software/unidad-01/).
> No son el caso institucional de la materia. Fichas completas en
> [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).

### CrowdStrike (19 de julio de 2024)

Una actualización de contenido del sensor Falcon de CrowdStrike
("Channel File 291") provocó fallas masivas de Windows en
aproximadamente 8.5 millones de equipos en todo el mundo. El sensor
esperaba 20 campos de entrada; la actualización envió 21. Al leer el
campo inexistente, el driver realizó una lectura de memoria fuera de
rango.

Lo relevante para esta unidad: el **validador de contenido**, que
debía detectar archivos de actualización corruptos antes de
liberarlos, tenía a su vez un defecto no detectado y dejó pasar el
archivo dañado a producción. Ilustra el principio de presencia de
defectos — confiar en que una herramienta de prueba "siempre ha
funcionado" no prueba que esté libre de defectos.

### Boeing 737 MAX (2018–2019)

Dos accidentes fatales (Lion Air, octubre de 2018; Ethiopian Airlines,
marzo de 2019; 346 personas fallecidas en total) se vincularon al
sistema de estabilización MCAS, que confiaba en la lectura de un único
sensor de ángulo de ataque, sin contrastarla con sensores redundantes,
y podía anular el control manual de los pilotos.

Lo relevante para esta unidad: no se probó adecuadamente el caso "¿qué
pasa si el único sensor falla?" (tolerancia a fallos), pese a tratarse
de un sistema de seguridad crítica. Ilustra el principio de que las
pruebas dependen del contexto — un sistema donde una falla puede
costar vidas exige un nivel de prueba de redundancia muy superior al
de software no crítico.

## Para reflexionar

- De los cuatro principios, ¿cuál explica mejor por qué "ya se probó y
  no se encontró nada" no garantiza que un sistema esté libre de
  defectos?
- Si tuvieras que apostar en qué parte de un sistema es más probable
  encontrar más defectos, ¿qué información usarías para decidir?

## Qué sigue

Con estos cuatro principios entendidos, el siguiente paso es aprender
a medir si un proceso de pruebas fue suficiente: continúa con
[5. Cobertura y métricas básicas](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/).
Aplicarás los cuatro principios, junto con ese tema, en la
[Actividad 5 — Evidencia conceptual de cierre](/materias/pruebas-software/unidad-01/actividades/actividad-5/).

## Referencias de este tema

- Black, van Veenendaal y Graham, *Foundations of Software Testing ISTQB Certification* —
  fuente principal para los principios generales de pruebas.
- ISO/IEC/IEEE 29119 (Parte 1) — referencia conceptual complementaria.
  Ver [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).
