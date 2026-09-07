---
title: "Presentación — Unidad I"
description: "Unidad I de Pruebas de Software — versión de documentación de la presentación de clase, sin información nueva respecto al manual."
---

> Esta página condensa, en formato de documentación, la presentación
> de apoyo usada en clase para esta unidad. No introduce información
> nueva respecto a los [temas de la unidad](/materias/pruebas-software/unidad-01/) — es un resumen visual de
> apoyo.

## Al finalizar esta unidad podrás

| Contenido | Vas a poder... |
| --- | --- |
| 1.1 | Explicar la calidad de software y distinguir garantía, aseguramiento, verificación y validación |
| 1.2 | Explicar para qué se prueba y cómo las pruebas reducen el riesgo dentro del ciclo de vida |
| 1.3 | Aplicar los principios generales de las pruebas para decidir cuándo y cómo probar |
| 1.4 | Relacionar cobertura y métricas básicas con la suficiencia de un proceso de pruebas |

## Antes de empezar

¿Alguna vez usaste una aplicación que falló justo después de que el
equipo que la desarrolla aseguró que "ya estaba probada"? ¿Cómo sabes,
en realidad, si algo "ya se probó lo suficiente"? Esta unidad te da el
vocabulario y los principios para responder esa pregunta con
precisión.

## Mapa de la unidad

> **Pregunta orientadora.** ¿Cómo sabemos que un software realmente
> funciona y que podemos confiar en él?

```text
01 CALIDAD              ¿qué significa que un software sea de calidad?
                         verificación, validación, aseguramiento
02 ¿POR QUÉ PROBAR?      detectar defectos, aumentar confiabilidad,
                         reducir riesgos
03 PRINCIPIOS            las pruebas tienen reglas y límites
                         probar no significa "demostrar que no hay errores"
04 MEDIR                 cobertura y métricas para conocer qué
                         estamos probando
```

## La calidad se construye durante todo el ciclo de vida

Un error puede originarse mucho antes de que alguien escriba una sola
línea de código:

```text
ANÁLISIS         requisito ambiguo o mal entendido
                  ejemplo: "el sistema debe ser rápido"
DISEÑO            una decisión técnica no contempla el crecimiento
                  ejemplo: 10 usuarios → 100,000
IMPLEMENTACIÓN    error al convertir el diseño en código
                  ejemplo: una condición incorrecta
MANTENIMIENTO     un cambio rompe algo que funcionaba
                  ejemplo: nueva función → falla otra
```

La calidad no se agrega al final. Se construye y se protege durante
todo el ciclo de vida del software. Ver
[1. Calidad de software](/materias/pruebas-software/unidad-01/01-calidad-de-software/).

## Verificación y validación

Un sistema que rechaza contraseñas de menos de 4 caracteres pasa la
**verificación** si cumple esa regla, pero puede fallar la
**validación** si 4 caracteres son insuficientes para proteger las
cuentas en la práctica. Ver
[2. Garantía, aseguramiento, verificación y validación](/materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion/).

## Las pruebas como reducción de riesgo

> **Riesgo = impacto × probabilidad de fallo**

No todas las partes de un sistema requieren el mismo esfuerzo de
prueba: conviene priorizar aquellas con mayor impacto y mayor
probabilidad de fallo. Ver
[3. Propósito de las pruebas de software](/materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas/).

## Cuatro principios que orientan cuándo y cómo probar

```text
1  Presencia de defectos    las pruebas muestran que hay defectos,
                             no que no los hay
2  Pruebas tempranas        antes se detecta, menos cuesta corregir
3  Agrupación de defectos   se concentran en módulos críticos
4  Criterios de salida      condiciones explícitas para terminar de probar
```

Ejemplo verificable: "no quedan defectos abiertos de severidad alta".
Ejemplo no verificable: "el sistema funciona bien". Ver
[4. Principios generales de pruebas](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/).

## Ampliación — los 7 principios ISTQB

Los cuatro anteriores cubren tres de los 7 principios generales que
reconoce el ISTQB. Los tres restantes:

```text
Pruebas exhaustivas       probar todas las combinaciones posibles
imposibles                 no es viable (ej. 10 campos × 6 valores
                            = ~60 millones de combinaciones)
Paradoja del pesticida    repetir siempre las mismas pruebas deja
                            de encontrar defectos nuevos
Dependen del contexto     un sistema de seguridad crítica exige más
                            prueba que un sitio web informativo
```

Ver el detalle completo, con la falacia de ausencia de errores, en
[4. Principios generales de pruebas](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/).

## Casos reales — cuando falla el proceso de prueba

Dos casos reales (con fuente citada, distintos del escenario
ilustrativo genérico de la introducción) muestran el costo de saltarse
estos principios:

```text
CrowdStrike (jul. 2024)   el validador que debía frenar una
                            actualización corrupta tenía, a su vez,
                            un defecto no detectado
Boeing 737 MAX (2018-19)  el sistema MCAS confió en un único sensor
                            sin contrastarlo con sensores redundantes
```

Desarrollo completo en
[4. Principios generales de pruebas](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/);
fuentes citadas en
[Referencias de la Unidad I](/materias/pruebas-software/unidad-01/referencias/).

## Panorama normativo internacional (ampliación)

El programa oficial cita ISO/IEC 29119, IEEE 829 e ISO/IEC 25010. La
familia de estándares es más amplia: incluye, entre otros, ISO/IEC/IEEE
29119 (partes 2 a 6 y 11), ISO/IEC/IEEE 12207, ISO/IEC 20246 e ISO/IEC
33000. Ver el detalle de cada uno, con su relevancia real para esta
unidad, en [Referencias de la Unidad I](/materias/pruebas-software/unidad-01/referencias/).

## Cobertura y métricas básicas

```text
Cobertura de requisitos    proporción de requisitos con al menos
                            un caso de prueba asociado
Cobertura de instrucciones proporción de líneas ejecutadas
                            al menos una vez
Cobertura de decisiones    proporción de ramas de una decisión
                            ejecutadas al menos una vez
```

Cobertura de código alta no equivale a ausencia de defectos: que una
línea se haya ejecutado no significa que su resultado sea correcto.
Ver [5. Cobertura y métricas básicas](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/).

## En síntesis

- La calidad es un conjunto de características, no una propiedad
  binaria, y se juega en todo el ciclo de vida.
- Garantía, aseguramiento, verificación y validación son cuatro
  comprobaciones distintas.
- Las pruebas identifican defectos, mejoran la confiabilidad y
  reducen riesgo.
- Cuatro principios generales orientan cuándo y cómo probar (el ISTQB
  reconoce tres más, con las mismas ideas de fondo).
- Casos reales como CrowdStrike y Boeing 737 MAX muestran el costo de
  saltarse estos principios en la práctica.
- Cobertura y métricas básicas permiten valorar si un proceso de
  pruebas fue suficiente.

## Lo que sigue

Si ya sabemos por qué se prueba, ¿qué debe probarse exactamente? En la
Unidad II vas a trabajar con requisitos, criterios de aceptación y
trazabilidad: el puente entre "por qué probar" y "qué probar".

## Referencias

Ver [Referencias de la Unidad I](/materias/pruebas-software/unidad-01/referencias/)
para el listado completo con su justificación de relevancia.
