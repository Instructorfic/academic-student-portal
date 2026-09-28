---
title: "Traducción del pseudocódigo a PSeInt"
description: "Unidad III de Lógica de Programación — correspondencia entre el pseudocódigo de la materia y la sintaxis de PSeInt para verificar y ejecutar los algoritmos."
---

**Propósito:** establecer la correspondencia entre el pseudocódigo
utilizado en la materia y la sintaxis de PSeInt, para verificar y
ejecutar los algoritmos.

## 1. Propósito del documento

Durante la Unidad III se utilizará PSeInt como herramienta para
verificar, ejecutar y probar los algoritmos que desarrolles.

El pseudocódigo utilizado en la materia constituye la representación
principal del algoritmo. PSeInt no sustituye esta representación ni
define la notación utilizada para evaluar los trabajos.

La relación entre ambas herramientas es:

```text
Problema
    ↓
Análisis
    ↓
Pseudocódigo
    ↓
Traducción a PSeInt
    ↓
Ejecución y verificación
    ↓
Prueba y depuración
```

Primero debes construir el algoritmo utilizando la notación establecida
en la materia y posteriormente traducirlo a PSeInt cuando se requiera
su ejecución.

## 2. Principio de traducción

La traducción consiste en conservar la misma lógica algorítmica y
adaptar únicamente la representación a la sintaxis requerida por
PSeInt.

La traducción no debe modificar:

- los datos de entrada;
- los datos de salida;
- el proceso;
- las operaciones;
- las condiciones;
- el orden lógico de las instrucciones;
- los resultados esperados.

Si el algoritmo funciona de manera diferente después de traducirlo a
PSeInt, debe revisarse la traducción o el algoritmo original.

## 3. Estructura general

| Pseudocódigo de la materia | Representación equivalente en PSeInt |
| --- | --- |
| <pre>Inicio<br><br>Declaraciones<br>Entrada<br>Procesamiento<br>Mostrar resultados<br><br>Fin</pre> | <pre>Algoritmo NombreDelAlgoritmo<br><br>    Definir variables<br>    Leer datos<br>    Procesar información<br>    Escribir resultados<br><br>FinAlgoritmo</pre> |

La estructura anterior representa la correspondencia conceptual. La
sintaxis concreta deberá ajustarse a las características de la versión
de PSeInt utilizada en el curso.

### 3.1 Perfil y versión de PSeInt

Los algoritmos del curso se verifican con el perfil **Flexible** de
PSeInt. Las reglas de esta página se verificaron con PSeInt 20240122.

En el perfil Flexible:

- el punto y coma al final de cada instrucción es opcional (las
  traducciones de esta página no lo usan);
- la asignación puede escribirse con `=` o con `<-`. En el curso se
  utiliza `=`, igual que en el pseudocódigo;
- el algoritmo se delimita con `Algoritmo … FinAlgoritmo`;
- una variable definida pero no inicializada se muestra como 0, sin
  producir error. Por eso PSeInt no sustituye la prueba de escritorio:
  un error de inicialización puede pasar inadvertido.

El perfil Estricto rechaza las traducciones de esta página porque exige
punto y coma (`ERROR 38: Falta punto y coma`) y no permite asignar con
`=`.

## 4. Tipos de datos

| Pseudocódigo de la materia | PSeInt |
| --- | --- |
| `ENTERO` | `Entero` |
| `REAL` | `Real` |
| `CADENA` | `Caracter` |
| `CARACTER` | `Caracter` |
| `LOGICO` | `Logico` |

**Ejemplo**

| Pseudocódigo | PSeInt |
| --- | --- |
| `ENTERO edad` | `Definir edad Como Entero` |
| `REAL promedio` | `Definir promedio Como Real` |
| `CADENA nombre` | `Definir nombre Como Caracter` |
| `LOGICO esMayorEdad` | `Definir esMayorEdad Como Logico` |

La equivalencia de `CADENA` y `CARACTER` requiere atención, ya que
PSeInt utiliza `Caracter` para representar tanto cadenas de texto como
caracteres. Cuando el algoritmo distinga conceptualmente entre cadena y
carácter, esa distinción deberá conservarse en el análisis aunque
PSeInt utilice una misma categoría de datos.

PSeInt 20240122 también acepta `Cadena` y `Texto` como nombres de tipo
equivalentes a `Caracter`. En el curso se utiliza `Caracter`, como
indica la tabla.

## 5. Identificadores

La materia establece:

**Variables:** utilizar camelCase.

```text
cantidadPersonas
precioUnitario
areaTriangulo
nombreAlumno
```

**Constantes:** utilizar SCREAMING_SNAKE_CASE.

```text
VALOR_PI
VALOR_MAXIMO
PORCENTAJE_DESCUENTO
MITAD
```

Estas convenciones pertenecen al estándar didáctico de la materia.
PSeInt puede utilizar una sintaxis diferente para declarar constantes.
La traducción deberá conservar, en la medida de lo posible, los
identificadores definidos en el algoritmo original.

En esta unidad, una constante se traduce con `Definir` y una única
asignación de su valor, como `MITAD` en el ejemplo de la sección 15.

### 5.1 Identificadores que PSeInt no acepta

La traducción conserva siempre los identificadores del pseudocódigo.
Para que esto sea posible, la notación de pseudocódigo de la materia
prohíbe los identificadores que PSeInt no acepta. Verificado con PSeInt
20240122:

| Situación | Ejemplo | Resultado en PSeInt |
| --- | --- | --- |
| Constante predefinida | `PI` | `ERROR 48: Identificador no válido (PI)` |
| Operador lógico usado como nombre | `y`, `o`, `no` | `ERROR 234: Falta operando` |
| Dos identificadores que solo difieren en mayúsculas | `iva` e `IVA` | `ERROR 124: La variable (IVA) ya estaba definida` |

Si aparece uno de estos errores, se corrige el pseudocódigo y después
se vuelve a traducir.

## 6. Declaración de variables

| Pseudocódigo | PSeInt |
| --- | --- |
| <pre>ENTERO cantidadPersonas<br>REAL precio<br>CADENA nombre<br>LOGICO esValido</pre> | <pre>Definir cantidadPersonas Como Entero<br>Definir precio Como Real<br>Definir nombre Como Caracter<br>Definir esValido Como Logico</pre> |

## 7. Inicialización

| Pseudocódigo | PSeInt |
| --- | --- |
| <pre>ENTERO cantidadPersonas = 10<br>REAL precio = 25.50<br>LOGICO esValido = VERDADERO</pre> | <pre>Definir cantidadPersonas Como Entero<br>Definir precio Como Real<br>Definir esValido Como Logico<br><br>cantidadPersonas = 10<br>precio = 25.50<br>esValido = Verdadero</pre> |

La asignación se escribe igual en el pseudocódigo y en PSeInt (perfil
Flexible):

```text
identificador = expresión
```

PSeInt también acepta `identificador <- expresión`, pero en el curso no
se utiliza, para no confundir dos notaciones de asignación.

## 8. Entrada de datos

| Pseudocódigo | PSeInt |
| --- | --- |
| <pre>Entrada: base<br>Entrada: altura</pre> | <pre>Leer base<br>Leer altura</pre> |

La palabra `Leer` pertenece a PSeInt y no debe utilizarse como
sustituto de `Entrada:` en el pseudocódigo de la materia.

## 9. Salida de datos

| Pseudocódigo | PSeInt |
| --- | --- |
| `Mostrar area` | `Escribir area` |

La materia utilizará `Mostrar` como término estándar para representar
la salida de información.

### 9.1 Mensajes y valores en una misma salida

| Pseudocódigo | PSeInt |
| --- | --- |
| <pre>Mostrar "Ingrese la base:"<br>Entrada: base</pre> | <pre>Escribir "Ingrese la base:"<br>Leer base</pre> |

Cuando una salida combina un texto y un valor, PSeInt los muestra
juntos, sin espacio intermedio:

```text
Escribir "El área es:", area      muestra      El área es:30
```

Para que la salida sea legible, en la traducción se deja un espacio al
final del texto: `Escribir "El área es: ", area`. Este cambio no
modifica la lógica del algoritmo.

## 10. Asignación

| Pseudocódigo | PSeInt |
| --- | --- |
| `area = base * altura * MITAD` | `area = base * altura * MITAD` |

La operación matemática y la lógica son las mismas.

## 11. Operadores

La traducción debe conservar el significado de las operaciones.

| Operación | Pseudocódigo | PSeInt |
| --- | --- | --- |
| Suma | `+` | `+` |
| Resta | `-` | `-` |
| Multiplicación | `*` | `*` |
| División | `/` | `/` |
| Módulo | `%` | `%` (también acepta `MOD`) |

Cuando exista una diferencia sintáctica, debe utilizarse la sintaxis
requerida por PSeInt únicamente durante la traducción.

### 11.1 División

En PSeInt, `/` siempre produce un resultado real: `9 / 5` da `1.8`. Si
ese resultado se asigna a una variable `Entero`, la ejecución se
detiene con `ERROR 314: No coinciden los tipos, el valor a asignar debe
ser un entero`. Este error suele indicar que el tipo elegido en el
análisis no es el adecuado.

### 11.2 Operadores relacionales y lógicos

| Operación | Pseudocódigo | PSeInt |
| --- | --- | --- |
| Igual a | `=` | `=` |
| Diferente de | `<>` | `<>` |
| Menor, mayor, menor o igual, mayor o igual | `<` `>` `<=` `>=` | `<` `>` `<=` `>=` |
| Conjunción | `Y` | `Y` |
| Disyunción | `O` | `O` |
| Negación | `NO` | `NO` |

### 11.3 Asignación frente a comparación

En el pseudocódigo, el símbolo `=` cumple dos funciones:

- cuando una instrucción comienza con un identificador seguido de `=`,
  es una asignación (`total = subtotal + impuesto`);
- dentro de una condición (`Si`, `Mientras`), es una comparación
  (`Si numero = 0 Entonces`).

En ambos casos el `=` se conserva en la traducción: PSeInt, en el
perfil Flexible, distingue la asignación de la comparación por el lugar
donde aparece.

## 12. Valores lógicos

| Pseudocódigo | PSeInt |
| --- | --- |
| `VERDADERO` | `Verdadero` |
| `FALSO` | `Falso` |

La representación puede variar en mayúsculas y minúsculas sin modificar
el significado.

## 13. Condicionales

Cuando se utilicen estructuras condicionales, primero se define la
lógica en el pseudocódigo de la materia.

| Pseudocódigo | PSeInt |
| --- | --- |
| <pre>Si edad >= 18 Entonces<br>    Mostrar "Es mayor de edad"<br>Sino<br>    Mostrar "Es menor de edad"<br>FinSi</pre> | <pre>Si edad >= 18 Entonces<br>    Escribir "Es mayor de edad"<br>Sino<br>    Escribir "Es menor de edad"<br>FinSi</pre> |

La estructura lógica permanece igual. Las estructuras condicionales se
estudian formalmente en la Unidad IV.

## 14. Ciclos

Cuando se incorporen estructuras repetitivas en las unidades
correspondientes, la traducción seguirá el mismo principio: primero se
construye el algoritmo en la notación de la materia y después se adapta
a PSeInt. No se debe diseñar el algoritmo directamente utilizando la
sintaxis de PSeInt.

## 15. Ejemplo completo

**Problema:** calcular el área de un triángulo a partir de su base y
altura.

**Pseudocódigo de la materia**

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

**Traducción a PSeInt**

```text
Algoritmo CalcularAreaTriangulo

    Definir base Como Real
    Definir altura Como Real
    Definir area Como Real
    Definir MITAD Como Real

    MITAD = 0.5

    Leer base
    Leer altura

    area = base * altura * MITAD

    Escribir area

FinAlgoritmo
```

El algoritmo es el mismo. Únicamente cambia la representación necesaria
para que PSeInt pueda interpretarlo y ejecutarlo.

**Verificación:** ejecutado en PSeInt 20240122 con perfil Flexible,
entradas `base = 10` y `altura = 6`; se muestra `30`, que coincide con
el resultado esperado.

## 16. PSeInt como herramienta de verificación

Después de traducir el algoritmo a PSeInt, deberás verificar:

- [ ] Que el algoritmo pueda ejecutarse.
- [ ] Que no existan errores de sintaxis.
- [ ] Que los datos de entrada sean aceptados.
- [ ] Que las operaciones produzcan resultados correctos.
- [ ] Que los resultados coincidan con los resultados esperados.
- [ ] Que los casos de prueba definidos produzcan los resultados
  previstos.

La ejecución correcta en PSeInt no demuestra por sí sola que el
análisis del problema sea correcto. Debe existir correspondencia entre:

```text
Análisis
↓
Algoritmo
↓
Implementación en PSeInt
↓
Resultado
```

## 17. Errores frecuentes

| Error | Corrección |
| --- | --- |
| Diseñar directamente en PSeInt y posteriormente copiar el código como pseudocódigo. | Desarrollar primero el algoritmo utilizando la notación de la materia. |
| Utilizar `Leer` en el pseudocódigo de la materia. | `Entrada: dato` |
| Utilizar `Escribir` en el pseudocódigo de la materia. | `Mostrar resultado` |
| Utilizar `<-` como asignación, en el pseudocódigo o en la traducción. | `resultado = calculo` |
| Modificar la lógica para adaptarla a PSeInt. | Realizar únicamente la traducción sintáctica necesaria. |

## 18. Regla fundamental

Primero se diseña el algoritmo; después se traduce a PSeInt;
finalmente se ejecuta y verifica.

PSeInt es una herramienta para experimentar, ejecutar y verificar
algoritmos. No sustituye el análisis del problema ni la construcción
del algoritmo.
