---
title: "Unidad II — Elementos algorítmicos básicos"
description: "Lógica de Programación — introducción a la Unidad II: resultados de aprendizaje, ruta de estudio y la pregunta que organiza toda la unidad."
---

## Identificación de la unidad

| Campo | Valor |
| --- | --- |
| Unidad | II — Elementos algorítmicos básicos |
| Materia | Lógica de Programación y Pensamiento Computacional (clave 22101) |
| Carácter | Manipulación simbólica y resolución de expresiones, con comprobación mediante PSeInt u otra herramienta equivalente — todavía sin estructuras de control |

## Resultados de aprendizaje de la unidad

Al finalizar esta unidad podrás:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA2.1 | Reconocer y clasificar datos de acuerdo con la información que representan y el tipo de valor que pueden contener |
| RA2.2 | Distinguir variables y constantes a partir de la posibilidad de cambio de sus valores dentro de una solución computacional |
| RA2.3 | Utilizar identificadores significativos para representar elementos de información dentro de una solución algorítmica |
| RA2.4 | Seleccionar operadores aritméticos, relacionales y lógicos de acuerdo con la operación que se requiere realizar sobre los datos |
| RA2.5 | Construir expresiones combinando datos, variables, constantes y operadores para representar operaciones de una solución |
| RA2.6 | Evaluar expresiones aplicando correctamente reglas de prioridad, asociatividad y uso de paréntesis |
| RA2.7 | Integrar funciones matemáticas básicas en expresiones para resolver operaciones requeridas por un problema |
| RA2.8 | Integrar tipos de datos, identificadores, variables, constantes, operadores y expresiones para representar computacionalmente una situación sencilla |

## Qué vas a estudiar

Esta unidad cubre los dos contenidos oficiales del programa correspondientes a la Unidad II:

```text
2.1 Representación de la información y su manejo
    2.1.1 Tipos de datos
    2.1.2 Expresiones
    2.1.3 Operadores
    2.1.4 Identificadores
    2.1.5 Constantes
    2.1.6 Variables
    2.1.7 Funciones matemáticas
2.2 Actividades prácticas
    2.2.1 Resolución de expresiones
    2.2.2 Uso de herramientas de compilación para resolución de expresiones
```

### Ruta de estudio sugerida

1. Lee esta introducción y guarda tu respuesta a la pregunta guía (más abajo).
2. Lee [1. Tipos de datos](/materias/logica-programacion/unidad-02/01-tipos-de-datos/) y realiza la
   [Actividad 1](/materias/logica-programacion/unidad-02/actividades/actividad-1/).
3. Lee [2. Expresiones](/materias/logica-programacion/unidad-02/02-expresiones/) y realiza la
   [Actividad 2](/materias/logica-programacion/unidad-02/actividades/actividad-2/).
4. Lee [3. Operadores](/materias/logica-programacion/unidad-02/03-operadores/) y realiza la
   [Actividad 3](/materias/logica-programacion/unidad-02/actividades/actividad-3/).
5. Lee [4. Identificadores](/materias/logica-programacion/unidad-02/04-identificadores/) y realiza la
   [Actividad 4](/materias/logica-programacion/unidad-02/actividades/actividad-4/).
6. Lee [5. Constantes y variables](/materias/logica-programacion/unidad-02/05-constantes-y-variables/) y realiza la
   [Actividad 5](/materias/logica-programacion/unidad-02/actividades/actividad-5/).
7. Lee [6. Funciones matemáticas](/materias/logica-programacion/unidad-02/06-funciones-matematicas/) y realiza la
   [Actividad 6](/materias/logica-programacion/unidad-02/actividades/actividad-6/).
8. Lee [7. Resolución de expresiones](/materias/logica-programacion/unidad-02/07-resolucion-de-expresiones/) y realiza la
   [Actividad 7](/materias/logica-programacion/unidad-02/actividades/actividad-7/).
9. Lee [8. Herramientas de compilación](/materias/logica-programacion/unidad-02/08-herramientas-de-compilacion/) y realiza los
   [Laboratorios 1](/materias/logica-programacion/unidad-02/laboratorios/laboratorio-1-pseint/) y
   [2](/materias/logica-programacion/unidad-02/laboratorios/laboratorio-2-resolucion-expresiones/).
10. Realiza la [Actividad 8 — Ejercicio integrador](/materias/logica-programacion/unidad-02/actividades/actividad-8/) (evidencia de cierre).
11. Revisa el [cierre de la unidad](/materias/logica-programacion/unidad-02/09-cierre-y-resumen/) antes de avanzar a la Unidad III.

## ¿Dónde estamos?

En la Unidad I aprendiste a pensar una solución antes de escribir un programa:

```text
PROBLEMA
   ↓
ANÁLISIS
   ↓
ABSTRACCIÓN
   ↓
ALGORITMO
```

Esta unidad responde una pregunta distinta, más concreta:

> **¿Qué información necesita manejar la solución y cómo puede representarse para realizar operaciones sobre ella?**

La Unidad II pasa del razonamiento general sobre el problema a la representación concreta de la información que interviene en una solución algorítmica:

```text
PROBLEMA
   ↓
¿Qué información necesito?
   ↓
DATOS
   ↓
¿Cómo se representa?
   ↓
TIPOS DE DATOS
   ↓
¿Cómo la identifico?
   ↓
IDENTIFICADORES
   ↓
¿Puede cambiar?
   ├── Sí → VARIABLE
   └── No → CONSTANTE
   ↓
¿Qué puedo hacer con ella?
   ↓
OPERADORES
   ↓
¿Cómo combino los elementos?
   ↓
EXPRESIONES
   ↓
¿Cómo se obtiene el resultado?
   ↓
RESOLUCIÓN DE EXPRESIONES
```

## Situación inicial

Una tienda necesita calcular el costo final de una compra. Se conocen la cantidad de productos, el precio unitario y el porcentaje de descuento. Se requiere obtener el subtotal, el descuento y el total a pagar.

Este problema —el **problema integrador de la unidad**— no requiere estructuras de decisión ni ciclos: puede resolverse completamente con los elementos que estudiarás aquí (tipos de datos, identificadores, constantes, variables, operadores, expresiones y, cuando el problema lo requiera, funciones matemáticas).

> **Pregunta guía.** ¿Cómo representamos y manipulamos la información de un problema para convertirla en una solución computable?

Guarda esta pregunta. Volverás a ella en el [cierre de la unidad](/materias/logica-programacion/unidad-02/09-cierre-y-resumen/).

## Un algoritmo necesita representar información

Un algoritmo no trabaja con "cosas" de manera abstracta: necesita representar información. Antes de que puedas construir una solución algorítmica precisa, necesitas decidir:

1. qué información es relevante;
2. qué tipo de dato representa cada información;
3. qué elementos pueden cambiar;
4. qué elementos permanecen constantes;
5. cómo nombrar esos elementos;
6. qué operaciones deben realizarse;
7. cómo combinar dichas operaciones en expresiones;
8. cómo se obtiene y verifica el resultado.

Esa secuencia —de la información a la expresión resuelta— es el hilo conductor de toda la unidad.

## Qué NO se estudia todavía en esta unidad

Para mantener el alcance de la Unidad II, no se desarrollan formalmente:

- una metodología sistemática de diseño de soluciones (Unidad III);
- estructuras de decisión (`if`, `if-else`, `switch`) ni estructuras repetitivas (`while`, `do-while`, `for`) (Unidad IV);
- arreglos, matrices, estructuras de datos, archivos ni programación orientada a objetos (contenidos posteriores).

PSeInt (o una herramienta equivalente) se utiliza únicamente para representar y comprobar expresiones — no como contenido de sintaxis de un lenguaje de programación.
