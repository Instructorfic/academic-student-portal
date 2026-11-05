---
title: "Especificación de pseudocódigo"
description: "Unidad III de Lógica de Programación — notación de pseudocódigo de la materia: tipos, identificadores, entrada, salida, asignación, operadores y estructuras básicas."
---

## 1. Propósito

Este documento define la notación de pseudocódigo que se utilizará en la Unidad III.

La finalidad es establecer una notación:

- sencilla
- consistente
- legible
- independiente de un lenguaje de programación específico
- adecuada para estudiantes de primer semestre
- suficiente para representar los algoritmos abordados durante la unidad

El pseudocódigo utilizado en esta unidad no corresponde directamente a la sintaxis de PSeInt ni de ningún lenguaje de programación.

La notación debe permitir que el estudiante se concentre en la lógica de la solución y no en las particularidades sintácticas de un lenguaje.

## 2. Principios generales

El pseudocódigo debe cumplir las siguientes características:

- Cada instrucción debe expresar una acción clara.
- Las palabras reservadas se escribirán en mayúsculas.
- Los tipos de datos se escribirán en mayúsculas.
- Los identificadores seguirán las convenciones definidas en este documento.
- La indentación debe utilizarse para mostrar la estructura lógica.
- No se utilizarán instrucciones específicas de un lenguaje de programación.
- No se utilizarán construcciones propias de PSeInt que no formen parte de esta especificación.
- La solución debe poder entenderse sin conocer un lenguaje de programación concreto.

## 3. Tipos de datos básicos

Durante esta unidad se utilizarán los siguientes tipos:

| Tipo | Uso | Ejemplo |
|---|---|---|
| `ENTERO` | Números sin parte decimal | 25 |
| `REAL` | Números con parte decimal | 25.50 |
| `CADENA` | Secuencia de caracteres | "ANA" |
| `CARACTER` | Un solo carácter | 'A' |
| `LOGICO` | Valor verdadero o falso | `VERDADERO` |

### 3.1 ENTERO

Representa números enteros positivos, negativos o cero.

```text
ENTERO edad = 18
ENTERO cantidadPersonas = 25
ENTERO temperatura = -5
```

### 3.2 REAL

Representa números que pueden contener una parte decimal.

```text
REAL precio = 125.50
REAL promedio = 8.75
REAL area = 24.50
```

Cuando una operación pueda producir un resultado decimal, se debe utilizar REAL cuando corresponda.

### 3.3 CADENA

Representa texto.

Las cadenas se escriben entre comillas dobles.

```text
CADENA nombre = "ANA"
CADENA ciudad = "CULIACAN"
```

### 3.4 CARACTER

Representa un único carácter.

Los caracteres se escriben entre comillas simples.

```text
CARACTER inicial = 'A'
CARACTER opcion = 'S'
```

### 3.5 LOGICO

Representa una condición que solamente puede tener uno de dos valores:

```text
VERDADERO
FALSO
```

Ejemplo:

```text
LOGICO esMayorEdad = VERDADERO
```

## 4. Identificadores

Un identificador es el nombre utilizado para representar una variable, constante o función.

Los identificadores deben:

- comenzar con una letra
- utilizar nombres descriptivos
- evitar abreviaturas innecesarias
- no contener espacios
- no utilizar palabras reservadas
- respetar la convención correspondiente a su categoría

### 4.1 Compatibilidad con la traducción a PSeInt

Para que la [traducción a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/) nunca tenga que cambiar un identificador, los identificadores del pseudocódigo tampoco deben:

- coincidir con una palabra que PSeInt no acepta como identificador
- diferenciarse de otro identificador del mismo algoritmo únicamente por mayúsculas y minúsculas (PSeInt no distingue entre ellas: iva e IVA son el mismo identificador)

Identificadores rechazados por PSeInt (PSeInt, perfil Flexible):

| Categoría | Identificadores |
|---|---|
| Operadores | y, o, no, mod |
| Valores y constantes predefinidas | pi, verdadero, falso |
| Palabras clave | proceso, algoritmo, fin, definir, como, leer, escribir, si, sino, mientras, hacer, para, hasta, repetir, segun, dimension, limpiar, esperar |
| Funciones predefinidas | abs, trunc, redon, rc, azar, longitud |

La lista no es exhaustiva. Si una traducción produce un error de "Identificador no válido", el identificador debe cambiarse en el pseudocódigo, no solo en la traducción.

Ejemplos:

| No se recomienda | Motivo | Alternativa |
|---|---|---|
| `REAL PI = 3.141592` | PI es una constante predefinida de PSeInt | `REAL VALOR_PI = 3.141592` |
| `REAL y = 5` | y es el operador lógico Y | REAL b = 5 (o un nombre descriptivo) |
| REAL iva y REAL IVA en el mismo algoritmo | Solo difieren en mayúsculas | REAL importeIva y REAL TASA_IVA |

## 5. Convenciones de nombres

### 5.1 Variables

Las variables utilizarán camelCase.

La primera palabra comienza con minúscula y las palabras siguientes comienzan con mayúscula.

Ejemplos:

```text
cantidadPersonas
precioUnitario
areaTriangulo
nombreEstudiante
promedioFinal
esMayorEdad
```

No se recomienda:

```text
x
dato2
aux
cantidadpersonas
CANTIDADpersonas
cantidad personas
```

### 5.2 Constantes

Las constantes utilizarán SCREAMING_SNAKE_CASE.

Las palabras se escriben en mayúsculas y se separan mediante guiones bajos.

Ejemplos:

```text
VALOR_PI
IVA_GENERAL
LIMITE_MAXIMO
EDAD_MAYORIA
DIAS_SEMANA
```

### 5.3 Funciones

Cuando las funciones sean abordadas en la unidad o en unidades posteriores, utilizarán camelCase.

Ejemplos:

```text
calcularArea()
obtenerPromedio()
esPar()
validarEdad()
```

## 6. Declaración y asignación

La declaración de una variable puede incluir su valor inicial.

Formato:

```text
<TIPO> <identificador> = <valor>
```

Ejemplos:

```text
ENTERO cantidadPersonas = 10
REAL precio = 25.50
CADENA nombre = "ANA"
CARACTER inicial = 'A'
LOGICO esValido = VERDADERO
```

Una variable también puede declararse sin valor inicial cuando el algoritmo obtendrá posteriormente su valor mediante una entrada o una asignación.

```text
ENTERO edad
REAL promedio
CADENA nombre
```

## 7. Constantes

Las constantes representan valores que no deben modificarse durante la ejecución del algoritmo.

Formato:

```text
<TIPO> <CONSTANTE> = <VALOR>
```

Ejemplo:

```text
REAL VALOR_PI = 3.141592
ENTERO EDAD_MAYORIA = 18
REAL IVA_GENERAL = 0.16
```

Las constantes deben utilizar SCREAMING_SNAKE_CASE.

## 8. Entrada de datos

La entrada representa información que debe proporcionar el usuario o que recibe el algoritmo.

Se utilizará:

```text
Entrada: identificador
```

Ejemplo:

```text
ENTERO edad

Entrada: edad
```

Para múltiples datos:

```text
Entrada: nombre
Entrada: edad
Entrada: promedio
```

Cuando sea conveniente, puede indicarse el mensaje que debe mostrarse antes de solicitar el dato:

```text
Mostrar "Ingrese su edad:"
Entrada: edad
```

## 9. Salida de información

La instrucción oficial para presentar información será:

```text
Mostrar
```

No se utilizarán indistintamente los términos IMPRIMIR, ESCRIBIR, PRESENTAR o OUTPUT.

La palabra reservada establecida para esta unidad es:

```text
Mostrar
```

Ejemplos:

```text
Mostrar edad
Mostrar promedio
Mostrar "El resultado es:"
Mostrar "El área es:", area
```

## 10. Asignación

La asignación utiliza el símbolo:

```text
=
```

Ejemplos:

```text
area = base * altura / 2
promedio = suma / cantidad
total = precio + impuesto
```

La expresión situada a la derecha se evalúa y el resultado se almacena en el identificador situado a la izquierda.

## 11. Operadores aritméticos

| Operador | Operación | Ejemplo |
|---|---|---|
| + | Suma | a + b |
| - | Resta | a - b |
| `*` | Multiplicación | `a * b` |
| / | División | `a / b` |
| `%` | Residuo | `a % b` |

Ejemplo:

```text
ENTERO residuo

residuo = numero % 2
```

## 12. Operadores relacionales

| Operador | Significado |
|---|---|
| `=` | Igual a |
| `<>` | Diferente de |
| `<` | Menor que |
| `>` | Mayor que |
| `<=` | Menor o igual que |
| `>=` | Mayor o igual que |

Ejemplos:

```text
edad >= 18
promedio < 6
numero = 0
nombre <> "ANA"
```

## 13. Operadores lógicos

| Operador | Significado |
|---|---|
| Y | Conjunción lógica |
| O | Disyunción lógica |
| `NO` | Negación lógica |

Ejemplos:

```text
edad >= 18 Y edad <= 60
promedio >= 6 O tieneExtraordinario = VERDADERO
NO esValido
```

## 14. Precedencia

Cuando una expresión contiene varias operaciones, se utilizarán paréntesis para hacer explícito el orden de evaluación cuando exista posibilidad de ambigüedad.

Ejemplo:

```text
promedio = (calificacion1 + calificacion2 + calificacion3) / 3
```

Se recomienda utilizar paréntesis incluso cuando el orden pueda deducirse fácilmente si estos mejoran la legibilidad.

## 15. Estructura general del algoritmo

Todo algoritmo deberá comenzar con Inicio y terminar con Fin.

```text
Inicio

    [instrucciones]

Fin
```

Ejemplo:

```text
Inicio

    ENTERO edad

    Entrada: edad

    Mostrar edad

Fin
```

## 16. Secuencia

Una secuencia es un conjunto de instrucciones que se ejecutan en el orden en que aparecen.

Ejemplo:

```text
Inicio

    REAL base
    REAL altura
    REAL area

    Entrada: base
    Entrada: altura

    area = (base * altura) / 2

    Mostrar area

Fin
```

## 17. Condicional simple

Formato:

```text
Si <condición> Entonces

    [instrucciones]

FinSi
```

Ejemplo:

```text
Si edad >= 18 Entonces

    Mostrar "Es mayor de edad"

FinSi
```

## 18. Condicional doble

Formato:

```text
Si <condición> Entonces

    [instrucciones]

Sino

    [instrucciones]

FinSi
```

Ejemplo:

```text
Si promedio >= 6 Entonces

    Mostrar "Aprobado"

Sino

    Mostrar "Reprobado"

FinSi
```

## 19. Condicional encadenada (Sino Si)

Cuando se requieran varias condiciones relacionadas que se evalúan en orden (por ejemplo, rangos), puede utilizarse:

```text
Si <condición 1> Entonces

    [instrucciones]

Sino Si <condición 2> Entonces

    [instrucciones]

Sino

    [instrucciones]

FinSi
```

Ejemplo:

```text
Si promedio >= 9 Entonces

    Mostrar "Excelente"

Sino Si promedio >= 8 Entonces

    Mostrar "Muy bien"

Sino Si promedio >= 6 Entonces

    Mostrar "Aprobado"

Sino

    Mostrar "Reprobado"

FinSi
```

Nota: la cadena Sino Si no es la condicional múltiple del programa oficial (4.2.3). La condicional múltiple selecciona una alternativa según el valor de una variable y se escribe con Segun … FinSegun. Su notación se define en la Unidad IV ([especificación de estructuras de la Unidad IV](/materias/logica-programacion/unidad-04/especificacion-estructuras/)).

## 20. Repetición

La estructura de repetición básica será:

```text
Mientras <condición> Hacer

    [instrucciones]

FinMientras
```

Ejemplo:

```text
Mientras contador <= 10 Hacer

    Mostrar contador

    contador = contador + 1

FinMientras
```

## 21. Indentación

Las instrucciones contenidas dentro de una estructura deben utilizar indentación.

Ejemplo:

```text
Si edad >= 18 Entonces

    Mostrar "Mayor de edad"

    Si tieneIdentificacion = VERDADERO Entonces

        Mostrar "Puede continuar"

    FinSi

Sino

    Mostrar "Menor de edad"

FinSi
```

La indentación facilita identificar visualmente la estructura del algoritmo.

## 22. Comentarios

Cuando sea necesario agregar una aclaración dentro del pseudocódigo se utilizará:

```text
// comentario
```

Ejemplo:

```text
// Calcular el área del triángulo
area = (base * altura) / 2
```

Los comentarios deben explicar aspectos relevantes de la solución y no repetir literalmente lo que ya expresa la instrucción.

## 23. Convenciones prohibidas

En las actividades de esta unidad no se utilizarán directamente construcciones específicas de lenguajes de programación como:

```text
scanf
printf
cin
cout
System.out.println
console.log
```

Tampoco se utilizarán instrucciones propias de PSeInt que no formen parte de esta especificación.

El objetivo es mantener una notación común para todos los ejercicios.

## 24. Ejemplo completo

Problema:

Calcular el área de un triángulo a partir de su base y altura.

```text
Inicio

    REAL base
    REAL altura
    REAL area

    Mostrar "Ingrese la base:"
    Entrada: base

    Mostrar "Ingrese la altura:"
    Entrada: altura

    area = (base * altura) / 2

    Mostrar "El área del triángulo es:", area

Fin
```

## 25. Resumen de palabras reservadas

| Concepto | Notación |
|---|---|
| Inicio | Inicio |
| Fin | Fin |
| Entrada | Entrada: |
| Salida | Mostrar |
| Asignación | `=` |
| Condicional | Si ... Entonces |
| Alternativa | Sino |
| Fin de condicional | FinSi |
| Condicional encadenada | Sino Si ... Entonces |
| Repetición | Mientras ... Hacer |
| Fin de repetición | FinMientras |
| Comentario | // |

## 26. Regla principal

El pseudocódigo debe priorizar:

- claridad de la solución sobre similitud con un lenguaje de programación.

La finalidad del pseudocódigo es representar el algoritmo de manera precisa y comprensible antes de implementarlo en un lenguaje de programación.

## 27. Relación con las otras representaciones

El pseudocódigo de este documento es la representación principal que se enseña y se evalúa. Un mismo algoritmo puede tener, además:

| Representación | Documento | Función |
|---|---|---|
| Diagrama de flujo | [Especificación de diagramas de flujo](/materias/logica-programacion/unidad-03/especificacion-diagramas-flujo/) | Representación gráfica del mismo algoritmo |
| Traducción a PSeInt | [Traducción a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/) | Verificación: ejecución y prueba de resultados |

El pseudocódigo no se modifica para adaptarlo a PSeInt ni al diagrama. La traducción se realiza después de construir la solución.
