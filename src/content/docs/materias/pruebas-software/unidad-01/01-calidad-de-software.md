---
title: "1. Calidad de software"
description: "Unidad I de Pruebas de Software — qué es la calidad de software, sus características observables y su relación con el ciclo de vida."
---

## Por qué empezar por aquí

Antes de hablar de pruebas, necesitas un vocabulario compartido de qué
significa que un producto de software sea de calidad. Sin ese
vocabulario, "ya se probó" no significa nada verificable.

## Qué es la calidad de software

La **calidad de software** (*software quality*) es el grado en el que
un producto de software cumple con los requisitos establecidos y con
las expectativas razonables de quienes lo utilizan, de forma
consistente y sostenida en el tiempo.

No es una propiedad binaria ("tiene calidad" / "no tiene calidad"),
sino un conjunto de características que pueden estar presentes en
distintos grados: un sistema puede ser funcionalmente correcto y, al
mismo tiempo, tener un desempeño deficiente o ser difícil de mantener.

## Características observables de calidad

Algunas características que conviene reconocer desde ahora se
retomarán con mayor profundidad más adelante en el curso, especialmente
en la Unidad VI:

| Característica | Pregunta que responde |
| --- | --- |
| Funcionalidad | ¿Hace lo que se supone que debe hacer? |
| Confiabilidad | ¿Se comporta de manera consistente bajo condiciones esperadas? |
| Usabilidad | ¿Es comprensible y utilizable para quien lo opera? |
| Eficiencia de desempeño | ¿Usa los recursos y responde en tiempos razonables? |
| Mantenibilidad | ¿Puede modificarse sin un esfuerzo desproporcionado? |
| Seguridad | ¿Protege adecuadamente la información y el acceso? |

Estas características no se evalúan en profundidad en esta unidad:
aquí solo necesitas reconocer que "calidad" no es un concepto único,
sino un conjunto de características que pueden evaluarse por separado.

**Ejemplo profesional.** Una aplicación bancaria puede tener una
funcionalidad impecable (procesa correctamente cada transferencia) y
al mismo tiempo una usabilidad deficiente (un flujo de pago confuso
que hace que los usuarios abandonen la operación). Ambas son
dimensiones de calidad distintas, y una no compensa a la otra.

## Calidad, mantenimiento y satisfacción del usuario

Un producto de baja calidad no solo falla al momento de entregarse:
también resulta más costoso de mantener, porque cada corrección
introduce riesgo de nuevos defectos, y erosiona progresivamente la
confianza de quien lo usa. Por eso la calidad no es un evento puntual
antes de liberar una versión, sino una condición que debe sostenerse
durante todo el ciclo de vida del producto.

## Calidad dentro del ciclo de vida del desarrollo

La calidad de un producto de software no se decide únicamente al
codificar. Puede introducirse un defecto de calidad en:

- **análisis** — un requisito mal entendido o ambiguo
- **diseño** — una decisión arquitectónica que no soporta el
  crecimiento esperado del sistema
- **implementación** — un error de codificación
- **mantenimiento** — un cambio posterior que rompe una funcionalidad
  existente

En la Unidad III profundizarás en cómo planificar pruebas que
consideren cada una de estas etapas. Aquí basta con reconocer que la
calidad se juega en todo el ciclo de vida, no solo en la etapa de
codificación.

## Error común

Tratar "calidad" como sinónimo único de "funciona correctamente", sin
reconocer usabilidad, desempeño o mantenibilidad como características
independientes. Un sistema puede pasar todas sus pruebas funcionales y
seguir teniendo un problema serio de calidad si nadie logra usarlo con
facilidad.

## Para reflexionar

- De dos aplicaciones que uses con frecuencia, identifica al menos tres
  características de calidad presentes en cada una, y una que
  consideres deficiente, con evidencia concreta y no solo preferencia
  personal.
- ¿En qué etapa del ciclo de vida crees que se introdujo esa
  deficiencia: análisis, diseño, implementación o mantenimiento?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 2 — Caracterización de la calidad de software](/materias/pruebas-software/unidad-01/actividades/actividad-2/),
donde analizarás dos productos reales y relacionarás una deficiencia
con una etapa del ciclo de vida.

## Referencias de este tema

- ISO/IEC 25010:2011 — modelo de calidad de referencia para las
  características observables de esta sección. Ver
  [Referencias de la unidad](/materias/pruebas-software/unidad-01/referencias/).
- Jorgensen, *Software Testing: A Craftsman's Approach*.
- Patton, *Software Testing* — lectura de entrada accesible.

## Qué sigue

Ya tienes un vocabulario básico de calidad. El siguiente paso es
distinguir cuatro términos que suelen confundirse entre sí: continúa
con [2. Garantía, aseguramiento, verificación y validación](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/).
