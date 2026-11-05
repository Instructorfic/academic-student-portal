---
title: "Glosario de términos"
description: "Unidad III de Lógica de Programación — terminología común de la unidad: análisis del problema, datos, pseudocódigo, pruebas y documentación."
---

## 1. Propósito

Este documento establece la terminología que se utilizará durante la Unidad III.

Su finalidad es mantener un lenguaje común entre:

- docente
- estudiantes
- ejercicios
- plantillas
- materiales
- evaluaciones
- pseudocódigo

Cuando un concepto tenga varios términos posibles, se establece aquí el término preferente para la unidad.

## 2. Términos fundamentales

### Algoritmo

Conjunto finito y ordenado de instrucciones que permite resolver un problema o realizar una tarea.

### Problema

Situación que requiere una solución mediante un conjunto de acciones o decisiones.

### Solución

Propuesta de procedimiento que permite resolver un problema bajo determinadas condiciones.

### Instrucción

Indicación que especifica una acción que debe realizar el algoritmo.

### Pseudocódigo

Representación textual y estructurada de un algoritmo mediante una notación diseñada para expresar su lógica sin depender de un lenguaje de programación específico.

### Programa

Implementación de un algoritmo mediante un lenguaje de programación.

## 3. Análisis del problema

### Definición del problema

Descripción clara de la situación que debe resolverse y del resultado que se espera obtener.

### Datos de entrada

Información que el algoritmo necesita recibir para poder resolver el problema.

Término oficial:

**Datos de entrada**

Cuando los datos deben ser proporcionados por una persona, puede utilizarse:

- Datos de entrada — datos que debe proporcionar el usuario.

### Datos de salida

Información que el algoritmo debe producir como resultado.

Término oficial:

**Datos de salida**

### Resultados esperados

Descripción concreta de la información que debe obtenerse al finalizar la solución.

Los resultados esperados corresponden a la salida del algoritmo, pero se expresan desde la perspectiva del problema.

### Datos conocidos

Información disponible antes de ejecutar el algoritmo.

Puede tratarse de valores proporcionados directamente por el problema.

Ejemplo:

El precio del producto ya está establecido en $100.

### Datos no conocidos

Información cuyo valor debe obtenerse durante la ejecución del algoritmo.

Generalmente corresponde a datos que debe proporcionar el usuario.

### Proceso

Conjunto de operaciones, decisiones y pasos que transforman los datos de entrada en los resultados esperados.

### Restricción

Condición que limita los valores o situaciones válidas del problema.

Ejemplos:

- la edad no puede ser negativa
- el precio debe ser mayor que cero
- la cantidad debe ser un número entero
- el promedio debe estar entre 0 y 10

### Supuesto

Decisión tomada cuando el enunciado no proporciona explícitamente determinada información.

Ejemplo:

Se asume que el número de estudiantes será un entero positivo.

Los supuestos deben documentarse cuando puedan afectar la solución.

## 4. Datos e identificadores

### Dato

Representación de información que puede ser utilizada por un algoritmo.

### Tipo de dato

Clasificación que determina qué clase de información puede almacenar un dato y qué operaciones pueden realizarse con él.

Los tipos básicos de esta unidad son:

```text
ENTERO
REAL
CADENA
CARACTER
LOGICO
```

### Variable

Identificador asociado con un valor que puede cambiar durante la ejecución del algoritmo.

Ejemplo:

```text
ENTERO edad = 18
```

edad es una variable.

### Constante

Identificador asociado con un valor que no cambia durante la ejecución del algoritmo.

Ejemplo:

```text
REAL VALOR_PI = 3.141592
```

VALOR_PI es una constante.

### Identificador

Nombre utilizado para referirse a una variable, constante o función.

Ejemplos:

```text
edad
precioTotal
VALOR_PI
IVA_GENERAL
calcularArea()
```

### Declaración

Acción mediante la cual se establece un identificador y su tipo de dato.

Ejemplo:

```text
ENTERO edad
```

### Asignación

Operación mediante la cual se establece o modifica el valor de una variable.

Ejemplo:

```text
edad = 20
```

### Inicialización

Primera asignación de un valor a una variable.

Ejemplo:

```text
ENTERO contador = 0
```

## 5. Operaciones

### Expresión

Combinación de valores, identificadores y operadores que produce un resultado.

Ejemplo:

```text
(base * altura) / 2
```

### Operador

Símbolo o palabra que indica una operación.

Ejemplos:

```text
+
-
*
/
%
```

### Operador aritmético

Operador utilizado para realizar operaciones matemáticas.

### Operador relacional

Operador utilizado para comparar valores.

Ejemplos:

```text
=
<>
<
>
<=
>=
```

### Operador lógico

Operador utilizado para combinar o modificar condiciones lógicas.

```text
Y
O
NO
```

## 6. Entrada y salida

### Entrada

Información que recibe el algoritmo.

En pseudocódigo:

```text
Entrada: edad
```

### Salida

Información que produce el algoritmo.

En pseudocódigo:

```text
Mostrar edad
```

### Mostrar

Acción mediante la cual el algoritmo presenta información como salida.

Término oficial de la unidad:

**Mostrar**

No se utilizarán como sinónimos dentro del pseudocódigo:

- imprimir
- escribir
- presentar
- desplegar
- output

Esto no significa que sean términos incorrectos en otros contextos. Simplemente se establece Mostrar como término estándar de la notación de esta unidad.

## 7. Estructuras algorítmicas

### Secuencia

Estructura en la que las instrucciones se ejecutan en el orden en que aparecen.

### Condición

Expresión que puede evaluarse como VERDADERO o FALSO.

Ejemplo:

```text
edad >= 18
```

### Condicional

Estructura que permite ejecutar instrucciones dependiendo del resultado de una condición.

### Condicional simple

Condicional que ejecuta un conjunto de instrucciones únicamente cuando la condición es verdadera.

```text
Si <condición> Entonces

    ...

FinSi
```

### Condicional doble

Condicional que permite seleccionar entre dos alternativas.

```text
Si <condición> Entonces

    ...

Sino

    ...

FinSi
```

### Condicional encadenada

Secuencia de condiciones Si … Sino Si … Sino que se evalúan en orden hasta encontrar la primera verdadera. Se utiliza, por ejemplo, para clasificar un valor por rangos.

### Condicional múltiple

Estructura que selecciona una alternativa según el valor de una variable (Segun … FinSegun). Se estudia en la [Unidad IV](/materias/logica-programacion/unidad-04/05-condicional-multiple/) (4.2.3).

### Repetición

Estructura que permite ejecutar varias veces un conjunto de instrucciones.

### Ciclo

Nombre utilizado para referirse a una estructura de repetición.

En esta unidad se recomienda utilizar preferentemente el término:

- Repetición
- Contador

Variable utilizada para llevar el registro de una cantidad de elementos o repeticiones.

Ejemplo:

```text
contador = contador + 1
```

### Acumulador

Variable utilizada para acumular progresivamente un resultado.

Ejemplo:

```text
suma = suma + numero
```

## 8. Representación algorítmica

### Lenguaje natural

Descripción de un procedimiento utilizando lenguaje humano, organizada de manera clara y ordenada.

### Diagrama de flujo

Representación gráfica de un algoritmo mediante símbolos y conexiones que muestran el flujo de ejecución.

### Pseudocódigo

Representación textual y estructurada de un algoritmo.

### Representación algorítmica

Forma utilizada para expresar un algoritmo.

En esta unidad se trabajarán principalmente:

- Lenguaje natural
- Diagrama de flujo
- Pseudocódigo

### 8.1 Símbolos del diagrama de flujo

Los símbolos se definen en la [especificación de diagramas de flujo](/materias/logica-programacion/unidad-03/especificacion-diagramas-flujo/).

### Terminal

Símbolo que representa el inicio o el final del algoritmo (Inicio, Fin).

### Proceso (símbolo)

Símbolo que representa una asignación o un cálculo, incluida la asignación del valor de una constante.

### Entrada (símbolo)

Paralelogramo que representa una instrucción Entrada:.

### Salida en pantalla (símbolo)

Símbolo de pantalla (display), con el lado izquierdo en punta y el derecho curvo, que representa una instrucción Mostrar.

### Decisión (símbolo)

Símbolo que representa una condición con dos caminos posibles.

### Línea de flujo

Línea con punta de flecha que indica el orden de ejecución.

### Conector

Símbolo que indica que el flujo continúa en otra parte del diagrama. No representa una instrucción.

### 8.2 Traducción a PSeInt

### Traducción

Paso del pseudocódigo de la unidad a la sintaxis de PSeInt para ejecutarlo, conservando la misma lógica, los mismos identificadores y el mismo orden de instrucciones. Se define en [traducción a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/).

### PSeInt

Herramienta que se utiliza en la unidad para ejecutar y verificar algoritmos. No define la notación del pseudocódigo de la unidad.

Términos que no se intercambian:

| En el pseudocódigo | Solo en la traducción a PSeInt |
|---|---|
| Entrada: | Leer |
| Mostrar | Escribir |
| Inicio … Fin | Algoritmo … FinAlgoritmo |
| ENTERO base (declaración) | Definir base Como Entero |

La asignación se escribe con = en ambas representaciones.

## 9. Verificación y calidad

### Caso de prueba

Conjunto de valores de entrada utilizado para comprobar el comportamiento de un algoritmo.

### Resultado esperado

Resultado que debería producir el algoritmo para un caso de prueba determinado.

### Resultado obtenido

Resultado que realmente produce el algoritmo durante la ejecución o trazado.

### Verificación

Proceso de comprobar que una solución produce los resultados esperados.

### Prueba

Ejecución de un algoritmo utilizando datos específicos para observar su comportamiento.

### Prueba de escritorio

Ejecución manual y paso a paso de un algoritmo utilizando valores concretos.

### Trazado

Registro sistemático de los valores de las variables y resultados mientras se sigue la ejecución de un algoritmo.

### Depuración

Proceso de identificar, analizar y corregir errores en una solución algorítmica.

### Error

Situación en la que una solución no cumple con lo esperado.

Puede manifestarse como:

- resultado incorrecto
- condición incorrecta
- cálculo incorrecto
- secuencia incorrecta
- comportamiento inesperado

## 10. Estrategias y diseño

### Estrategia de solución

Forma general elegida para abordar un problema.

### Descomposición

Proceso de dividir un problema en partes o subproblemas más pequeños.

### Subproblema

Parte de un problema que puede analizarse o resolverse de manera independiente dentro de la solución general.

### Caso

Situación particular que puede presentarse durante la ejecución del algoritmo y que puede requerir un comportamiento diferente.

### Validación

Proceso mediante el cual se comprueba que los datos utilizados cumplen las condiciones establecidas por el problema.

## 11. Términos que deben evitarse como sinónimos en las plantillas

Para mantener consistencia, se utilizarán preferentemente los siguientes términos:

| Evitar alternar entre | Término estándar |
|---|---|
| imprimir / escribir / presentar | Mostrar |
| recibir / pedir / capturar | Entrada |
| resultado final / output | Datos de salida |
| dato solicitado / input | Dato de entrada |
| ciclo / loop | Repetición |
| declaración de valor | Asignación |
| valor fijo / dato constante | Constante |
| nombre de variable / etiqueta | Identificador |
| prueba manual / ejecución en papel | Prueba de escritorio |
| encontrar errores / corregir código | Depuración |

## 12. Convenciones lingüísticas

Los materiales de la unidad deben:

- utilizar frases cortas
- evitar terminología innecesariamente técnica
- definir un término antes de utilizarlo cuando sea nuevo
- utilizar siempre la misma palabra para el mismo concepto
- diferenciar conceptos que tengan significados diferentes
- evitar mezclar terminología de pseudocódigo con terminología específica de lenguajes de programación

## 13. Regla de consistencia

Cuando un término aparezca en:

- una actividad
- una plantilla
- una explicación
- un ejemplo
- una rúbrica

debe conservar el significado definido en este glosario.

Si posteriormente se decide cambiar un término oficial, primero debe actualizarse este documento y después las plantillas y actividades relacionadas.

## 14. Relación con la especificación de pseudocódigo

La terminología de este documento y la notación de:

- [especificación de pseudocódigo](/materias/logica-programacion/unidad-03/especificacion-pseudocodigo/)

deben mantenerse sincronizadas.

El glosario define qué significa cada concepto.

La especificación de pseudocódigo define cómo se representa ese concepto.
