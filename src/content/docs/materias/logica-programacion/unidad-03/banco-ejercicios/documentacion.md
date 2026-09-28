---
title: "Ejercicios — Documentación"
description: "Unidad III de Lógica de Programación — ejercicio para documentar una solución algorítmica: propósito, datos, supuestos, restricciones y decisiones de diseño (etapa 3.2.7)."
---

**Etapa:** 3.2.7 Documentación. **Instrumento:**
[Formato extendido de propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/propuesta-algoritmica-extendida/).

## Práctica — Documentación de una solución

**Modalidad:** práctica en clase.

### Problema

Se requiere documentar un algoritmo que calcula el área de un
triángulo.

El algoritmo recibe la base y la altura del triángulo y calcula el área
mediante la siguiente fórmula:

```text
area = base * altura * 0.5
```

La solución utiliza:

- `base` como variable de tipo `REAL`
- `altura` como variable de tipo `REAL`
- `area` como variable de tipo `REAL`
- `MITAD` como constante de tipo `REAL` con valor `0.5`.

### Algoritmo proporcionado

```text
Inicio

REAL base
REAL altura
REAL area
REAL MITAD = 0.5

Entrada: base
Entrada: altura

area = base * altura * MITAD

Mostrar area

Fin
```

### Qué debes hacer

Documenta el algoritmo anterior completando los siguientes elementos:

| Elemento | Qué debes escribir |
| --- | --- |
| Propósito | Explica qué problema resuelve el algoritmo. |
| Datos de entrada | Identifica cada dato que debe proporcionar el usuario y especifica su tipo. |
| Resultado esperado | Indica qué información produce el algoritmo. |
| Variables | Identifica las variables utilizadas y explica qué representa cada una. |
| Constantes | Identifica las constantes utilizadas y explica por qué representan un valor fijo. |
| Supuestos | Indica qué condiciones deben cumplirse para que el algoritmo pueda utilizarse correctamente. |
| Restricciones | Indica los valores válidos para la base y la altura. |
| Fórmula | Explica la relación matemática utilizada. |
| Decisión de diseño | Explica por qué se utiliza la constante `MITAD` en lugar del valor `0.5` directamente en la expresión. |

### Criterios de revisión

- [ ] Describe correctamente el propósito.
- [ ] Identifica entradas y salida.
- [ ] Identifica variables y constantes.
- [ ] Describe correctamente los supuestos.
- [ ] Establece restricciones válidas.
- [ ] Explica la fórmula.
- [ ] Justifica el uso de la constante.
