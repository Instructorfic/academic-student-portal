---
title: "Ejercicios — Estrategias de solución"
description: "Unidad III de Lógica de Programación — ejercicios para comparar algoritmos y estrategias que resuelven un mismo problema (etapa 3.2.3)."
---

**Etapa:** 3.2.3 Estrategias de solución. **Instrumento:**
[Ficha de comparación de soluciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-comparacion/).

Recuerda: una solución no es mejor que otra solamente porque sea más
corta. La comparación debe basarse en características observables.

## Actividad guiada — Comparación de dos algoritmos

**Modalidad:** actividad guiada en clase.

**Propósito:** comparar dos soluciones algorítmicas que resuelven el
mismo problema e identificar diferencias en su estructura y claridad.

### Problema

Los siguientes algoritmos deben calcular el área de un rectángulo
utilizando una base de 8 y una altura de 5.

**Algoritmo A**

```text
Inicio

REAL base = 8
REAL altura = 5
REAL area = base * altura

Mostrar area

Fin
```

**Algoritmo B**

```text
Inicio

REAL a = 8
REAL b = 5
REAL c = a * b

Mostrar c

Fin
```

### Qué debes hacer

1. Compara ambos algoritmos considerando los siguientes criterios:

   | Criterio | Algoritmo A | Algoritmo B |
   | --- | --- | --- |
   | Identificadores descriptivos | | |
   | Facilidad de comprensión | | |
   | Correspondencia entre datos y variables | | |
   | Resultado producido | | |

2. Explica las diferencias identificadas.

### Criterios de revisión

- [ ] Determina si ambos algoritmos realizan el mismo cálculo.
- [ ] Identifica diferencias en los identificadores.
- [ ] Explica por qué un identificador puede facilitar la comprensión.
- [ ] Comprueba el resultado que produce cada algoritmo.

## Tarea — Comparación de estrategias de solución

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor.

**Propósito:** analizar dos estrategias para resolver un mismo problema
y justificar las diferencias entre ellas.

### Problema

Se requiere calcular el costo total de cinco productos cuyos precios son
proporcionados por el usuario. Se presentan dos estrategias.

**Estrategia A.** Solicitar el precio de cada producto y realizar cinco
operaciones de suma:

```text
total = precio1 + precio2 + precio3 + precio4 + precio5
```

**Estrategia B.** Solicitar cada precio y acumular el importe en una
variable `total`:

```text
total = 0

total = total + precio1
total = total + precio2
total = total + precio3
total = total + precio4
total = total + precio5
```

### Qué debes hacer

1. Compara ambas estrategias considerando: claridad, cantidad de
   variables necesarias, facilidad para modificar el algoritmo y
   posibilidad de reutilizar la estrategia cuando cambie la cantidad de
   productos.
2. Completa la tabla:

   | Criterio | Estrategia A | Estrategia B |
   | --- | --- | --- |
   | Claridad | | |
   | Variables necesarias | | |
   | Facilidad de modificación | | |
   | Adaptación a otra cantidad de productos | | |

3. Explica qué diferencia principal existe entre ambas estrategias.

**Evidencia:** tabla de comparación y explicación.

### Criterios de revisión

- [ ] Identifica correctamente las características de cada estrategia.
- [ ] Explica cómo se comporta cada estrategia si cambia la cantidad de
  productos.
- [ ] Justifica las respuestas mediante características observables de
  los algoritmos.
- [ ] No basa la comparación únicamente en preferencias personales.
