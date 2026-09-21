---
title: "Presentación — Unidad II"
description: "Unidad II de Lógica de Programación — versión de documentación de la presentación de clase, sin información nueva respecto a los temas de la unidad."
---

> Esta página condensa, en formato de documentación, la presentación
> de apoyo usada en clase para esta unidad. No introduce información
> nueva respecto a los [temas de la unidad](/materias/logica-programacion/unidad-02/) — es un resumen visual de
> apoyo.

## Al finalizar esta unidad podrás

| Contenido | Vas a poder... |
| --- | --- |
| 2.1.1 | Representar información identificando tipos de datos y reconociendo cómo se representa la información necesaria para un algoritmo |
| 2.1.2 / 2.1.3 | Construir expresiones combinando datos y operadores para representar operaciones dentro de una solución algorítmica |
| 2.1.4 / 2.1.5 / 2.1.6 | Diferenciar identificadores, constantes y variables dentro de una representación algorítmica |
| 2.2.1 | Resolver expresiones aplicando reglas de prioridad y asociatividad |

## ¿Dónde estamos?

En la Unidad I aprendimos a pensar una solución antes de escribir un programa:

```text
PROBLEMA
   ↓
ANÁLISIS
   ↓
ABSTRACCIÓN
   ↓
SOLUCIÓN
   ↓
ALGORITMO
```

Ahora necesitamos responder otra pregunta:

> **¿Cómo representamos la información que utiliza nuestro algoritmo?**

## De la solución a la información

Un algoritmo necesita trabajar con datos para representar y procesar la información de un problema: una calificación puede representarse mediante un valor numérico, un nombre mediante un conjunto de caracteres, una decisión mediante un valor lógico. **La naturaleza de un dato determina qué operaciones podemos realizar sobre él.** Ver [1. Tipos de datos](/materias/logica-programacion/unidad-02/01-tipos-de-datos/).

## De los datos a las operaciones

Tener los datos no siempre es suficiente: con frecuencia necesitamos calcular, comparar o transformar esos datos para obtener un resultado. Cuando combinamos operandos y operadores para obtener un resultado, construimos una **expresión**:

```text
operando   operador   operando
   ↓           ↓          ↓
  100          ×          3
        ↓
    expresión
        ↓
       300
```

Ver [2. Expresiones](/materias/logica-programacion/unidad-02/02-expresiones/) y [3. Operadores](/materias/logica-programacion/unidad-02/03-operadores/) para la clasificación completa (aritméticos, relacionales y lógicos).

## Nombrar los datos

En una expresión podemos escribir directamente `35 * 4`, o trabajar con nombres: `precio * cantidad`. Para utilizar esos nombres necesitamos **identificadores** — y, para mantenerlos consistentes, convenciones de escritura como camelCase, PascalCase, snake_case y SCREAMING_SNAKE_CASE. Ver [4. Identificadores](/materias/logica-programacion/unidad-02/04-identificadores/).

## Dos formas de representar valores

Dentro de un algoritmo trabajamos con valores que permanecen constantes (`IVA = 0.16`) y valores que pueden cambiar (`edad ← 18`, después `edad ← 19`). **Variable no significa que el nombre cambie: significa que el valor asociado puede cambiar.** Ver [5. Constantes y variables](/materias/logica-programacion/unidad-02/05-constantes-y-variables/).

## Cuando una operación ya tiene una forma conocida

Algunos cálculos aparecen con frecuencia (`√25`, `|−8|`, `2³`). En lugar de construir cada operación desde cero, usamos funciones matemáticas como `sqrt()`, `abs()`, `pow()` y `round()`. Ver [6. Funciones matemáticas](/materias/logica-programacion/unidad-02/06-funciones-matematicas/).

## El modelo conceptual de la unidad

```text
INFORMACIÓN → DATO → TIPO → IDENTIFICADOR → VALOR
```

Con:

```text
VARIABLE            CONSTANTE
     ↓                    ↓
valor que cambia   valor que permanece

OPERADOR + OPERANDOS
          ↓
      EXPRESIÓN
          ↓
       RESULTADO
```

## Una expresión puede tener varias operaciones

```text
5 + 3 * 2
```

no es 16. La multiplicación tiene prioridad sobre la suma: `5 + (3 * 2) = 5 + 6 = 11`. Cuando una expresión combina operadores aritméticos, relacionales y lógicos, necesitamos una **jerarquía completa** (paréntesis → funciones matemáticas → `*` `/` `%` → `+` `-` → relacionales → `NO` → `Y` → `O`) y, cuando dos operadores comparten nivel, la **asociatividad** determina el orden (de izquierda a derecha). Ver [7. Resolución de expresiones](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/).

## De la resolución manual a la comprobación con herramienta

Podemos resolver una expresión manualmente y después utilizar una herramienta —PSeInt u otra equivalente— para comprobar nuestro resultado. **La herramienta comprueba nuestro razonamiento. No sustituye el razonamiento.** Ver [8. Herramientas de compilación](/materias/logica-programacion/unidad-02/08-herramientas-de-compilacion/).

## Ejemplo integrador: el área de un círculo

```text
radio → variable
π     → constante

radio² → pow(radio, 2)

área = π * pow(radio, 2)
```

Para este problema no necesitamos el color del círculo, el material ni la ubicación: **la representación algorítmica siempre depende del problema que estamos resolviendo.**

## La idea que debes llevarte

```text
             INFORMACIÓN
                  ↓
                DATOS
                  ↓
                TIPOS
                  ↓
           IDENTIFICADORES
              ↙       ↘
        VARIABLES   CONSTANTES
              \       /
               ↓     ↓
              OPERADORES
                  ↓
              EXPRESIONES
                  ↓
        FUNCIONES MATEMÁTICAS
                  ↓
              RESOLUCIÓN
                  ↓
               RESULTADO
```

**Los elementos algorítmicos básicos nos permiten representar información, operar con ella y obtener resultados de manera precisa.**

## Lo que sigue

En la Unidad III trabajaremos con una metodología más sistemática para resolver problemas: descripción, análisis, estrategia, desarrollo de la solución en pseudocódigo, depuración y plan de pruebas, y documentación. Esta unidad te proporciona los elementos que esa metodología necesitará para construir soluciones de manera precisa.

## Referencias

Ver [Referencias de la Unidad II](/materias/logica-programacion/unidad-02/referencias/)
para el listado completo con su justificación de relevancia.
