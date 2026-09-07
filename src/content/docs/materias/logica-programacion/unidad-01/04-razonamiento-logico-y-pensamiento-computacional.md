---
title: "4. Razonamiento lógico y pensamiento computacional"
description: "Unidad I de Lógica de Programación — descomposición, patrones, abstracción y diseño de algoritmos, con dos ejemplos completos."
---

## Razonar antes de programar

El **razonamiento lógico** es la capacidad de analizar una situación
siguiendo relaciones de causa y efecto y condiciones, para llegar a una
conclusión o solución válida. Para construir una solución necesitas
preguntarte: ¿qué sabemos? ¿qué queremos conseguir? ¿qué relaciones
existen? ¿qué debe ocurrir primero? ¿qué ocurre después?

## Cuatro elementos del pensamiento computacional

> **Contenido de apoyo.** Estos cuatro elementos son un **apoyo
> pedagógico** tomado del pensamiento computacional (*Computational
> Thinking*, Wing, 2006). Se usan para que puedas practicar el
> razonamiento lógico de forma más ordenada.

| Elemento | Qué significa | Por qué importa para programar |
| --- | --- | --- |
| **Descomposición** | Dividir un problema grande en partes más pequeñas y manejables | Un problema completo suele ser demasiado grande para resolverlo de un solo golpe, y las partes pequeñas son más fáciles de analizar y convertir en pasos |
| **Reconocimiento de patrones** | Identificar semejanzas o repeticiones entre partes del problema | Si varias partes del problema se resuelven de forma parecida, puedes reutilizar la misma idea de solución en lugar de inventar una distinta para cada una |
| **Abstracción** | Quedarte con los detalles relevantes del problema e ignorar los que no importan para resolverlo | Un algoritmo que intenta representar *todos* los detalles de la realidad se vuelve inmanejable: abstraer es decidir qué sí importa |
| **Diseño de algoritmos** | Ordenar las partes, patrones y abstracciones anteriores en una secuencia de pasos que resuelve el problema | Es el paso que conecta el pensamiento computacional con la [resolución de problemas en forma algorítmica](/materias/logica-programacion/unidad-01/05-resolucion-de-problemas-en-forma-algoritmica/) |

## Ejemplo 1: preparar el desayuno para tres personas

**Problema:** "Quiero preparar el desayuno para tres personas con
gustos distintos, en el menor tiempo posible."

- **Descomposición:** separar el problema en "qué preparar para cada
  persona" y "en qué orden hacerlo para no perder tiempo".
- **Reconocimiento de patrones:** notar que varias preparaciones
  comparten un mismo paso (por ejemplo, calentar la sartén).
- **Abstracción:** ignorar detalles irrelevantes para la lógica del
  problema (el color de los platos) y enfocarte en lo que sí afecta el
  resultado (tiempos, orden, recursos compartidos).
- **Diseño de algoritmos:** con las partes, patrones y abstracciones
  anteriores, ordenar una secuencia concreta: "1) calentar la sartén,
  2) preparar lo que toma más tiempo primero, 3) aprovechar la sartén
  caliente para lo que la comparte, 4) servir en el orden en que cada
  preparación termina".

## Ejemplo 2: planear una ruta para hacer varios mandados

**Problema:** "Necesito ir al banco, a la papelería y a la farmacia en
la misma salida, gastando la menor cantidad de tiempo posible."

- **Descomposición:** dividir el problema en "ubicar dónde está cada
  lugar" y "decidir en qué orden visitarlos".
- **Reconocimiento de patrones:** notar si dos de los lugares están
  cerca entre sí, lo que conviene visitar consecutivamente.
- **Abstracción:** ignorar detalles irrelevantes (el color del
  edificio de cada lugar) y quedarte con lo relevante (distancia,
  horario de atención, tráfico esperado).
- **Diseño de algoritmos:** "1) salir hacia el lugar más lejano primero
  mientras hay más tiempo disponible, 2) visitar los lugares cercanos
  entre sí de forma consecutiva, 3) regresar por la ruta más corta
  disponible".

## Conexión con la práctica en Scratch

Cuando construyas un programa en Scratch (Actividad 3), notarás que
cada bloque que agregas corresponde a un paso de tu diseño de
algoritmo — el cuarto elemento de la tabla anterior. Ver el programa
ejecutarse te permite comprobar si el orden que diseñaste realmente
produce el resultado esperado: una primera forma, muy sencilla, de
verificar una solución algorítmica.

## Error común

Descomponer un problema en un único paso general ("hacer la mudanza")
o, en el otro extremo, en pasos excesivamente detallados que pierden
el nivel de abstracción útil. Descomponer bien significa encontrar
partes lo bastante pequeñas para analizarlas, pero lo bastante
generales para seguir siendo manejables.

## Para reflexionar

- Elige un problema cotidiano tuyo (organizar una mudanza pequeña,
  preparar una mochila de viaje). ¿En qué subtareas lo descompondrías?
- ¿Qué detalle de ese problema decidirías ignorar por abstracción, y
  por qué no afecta a la solución?

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 5 — Pensamiento computacional aplicado (4 elementos)](/materias/logica-programacion/unidad-01/actividades/actividad-5/),
donde aplicarás los cuatro elementos a un problema cotidiano propio.

## Referencias de este tema

- Wing, J. M. (2006). *Computational Thinking*. *Communications of the
  ACM*, 49(3), 33–35. DOI:
  [10.1145/1118178.1118215](https://doi.org/10.1145/1118178.1118215).
  Fundamento académico de esta sección. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-01/referencias/).
- Joyanes Aguilar, L. (2020). *Fundamentos de programación*.

## Qué sigue

Con estas herramientas de razonamiento, ya puedes construir la
solución completa de un problema y expresarla como algoritmo:
continúa con
[5. Resolución de problemas en forma algorítmica](/materias/logica-programacion/unidad-01/05-resolucion-de-problemas-en-forma-algoritmica/).
