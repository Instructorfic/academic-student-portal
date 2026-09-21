---
title: "8. Herramientas de compilación"
description: "Unidad II de Lógica de Programación — PSeInt, pseudocódigo y cómo comprobar una expresión resuelta manualmente con una herramienta."
---

## Del razonamiento a la comprobación

Podemos resolver una expresión manualmente, como en el
[tema anterior](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/), y después utilizar una herramienta para comprobar nuestro resultado:

```text
EXPRESIÓN
    ↓
RESOLUCIÓN MANUAL
    ↓
RESULTADO ESPERADO
    ↓
HERRAMIENTA
    ↓
COMPROBACIÓN
```

> **La herramienta comprueba nuestro razonamiento. No sustituye el razonamiento.**

## PSeInt como herramienta

PSeInt permite representar algoritmos mediante pseudocódigo y observar su ejecución. En esta asignatura, PSeInt es una **herramienta de apoyo**, no el contenido central de la unidad. El contenido central es el pensamiento algorítmico, el pseudocódigo como representación, y la comprobación de resultados.

> **Alcance de la unidad.** Esta unidad no pretende enseñar PSeInt como lenguaje de programación independiente, ni convertirse en un curso de C, C++ u otro lenguaje. La metodología formal de resolución de problemas se desarrollará en la Unidad III.

## Pseudocódigo

El **pseudocódigo** es una forma de representación algorítmica en lenguaje natural estructurado — no un lenguaje de programación (ver
[3. Herramientas para representar algoritmos](/materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos/) de la Unidad I). Ejemplo:

```text
Algoritmo CalcularTotal

    Definir cantidad, precio, total Como Real

    Leer cantidad
    Leer precio

    total <- cantidad * precio

    Escribir total

FinAlgoritmo
```

Esta estructura representa un algoritmo. La herramienta permite escribirlo y ejecutarlo para observar el resultado.

## ¿Qué debemos comprobar?

Cuando ejecutamos una solución, debemos preguntarnos: **¿el resultado coincide con lo esperado?** Por ejemplo, si `cantidad = 4` y `precio = 35`, esperamos `4 * 35 = 140`. Si la herramienta produce `140`, la comprobación coincide con nuestro resultado esperado.

## La herramienta no piensa por nosotros

Si escribimos una expresión incorrecta y la herramienta produce un resultado, eso no significa que la solución sea correcta. Debemos preguntarnos:

- ¿Representé correctamente el problema?
- ¿Utilicé los datos adecuados?
- ¿Construí correctamente la expresión?
- ¿El resultado tiene sentido?

> **Ejecutar una representación y obtener un resultado no garantiza por sí mismo que la solución del problema sea correcta.**

## Diagramas de flujo como complemento

Además del pseudocódigo, un **diagrama de flujo** representa gráficamente la misma secuencia de datos, operaciones y resultado. En los laboratorios de esta unidad utilizarás ambas representaciones —pseudocódigo y diagrama de flujo— para el mismo problema, y las comprobarás ejecutando el pseudocódigo en PSeInt o una herramienta equivalente.

## Error común

Aceptar el resultado producido por la herramienta sin comparar contra el resultado que calculaste manualmente, o modificar la expresión hasta que "salga" el resultado esperado sin entender por qué la versión original estaba mal planteada.

## Para reflexionar

- Si PSeInt (o la herramienta que uses) produce un resultado distinto al que calculaste manualmente, ¿cuáles son los pasos que revisarías, en orden, para encontrar el error?
- ¿Por qué la comprobación mediante una herramienta no sustituye el haber entendido el problema?

## Actividades y evidencia

- [Laboratorio 1 — Representar y comprobar una expresión](/materias/logica-programacion/unidad-02/laboratorios/laboratorio-1-pseint/): representarás y comprobarás una expresión sencilla mediante pseudocódigo.
- [Laboratorio 2 — Representar y comprobar un cálculo](/materias/logica-programacion/unidad-02/laboratorios/laboratorio-2-resolucion-expresiones/): construirás una solución completa con pseudocódigo y diagrama de flujo.

## Referencias de este tema

- PSeInt. *Pseudo Intérprete para aprendizaje de lógica de programación y pseudocódigo*. Herramienta de apoyo, no bibliografía académica.
- Joyanes Aguilar, L. (2020). *Fundamentos de programación*. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya cuentas con todos los elementos de la unidad: datos, tipos, identificadores, constantes, variables, operadores, expresiones, funciones matemáticas, resolución de expresiones y una forma de comprobarlas. Revisa el
[cierre y resumen](/materias/logica-programacion/unidad-02/09-cierre-y-resumen/) antes de avanzar a la Unidad III.
