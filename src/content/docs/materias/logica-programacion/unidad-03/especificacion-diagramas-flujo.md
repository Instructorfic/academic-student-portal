---
title: "Especificación de diagramas de flujo"
description: "Unidad III de Lógica de Programación — símbolos, reglas de construcción y correspondencia con el pseudocódigo para representar gráficamente los algoritmos."
---

**Propósito:** establecer las convenciones para representar gráficamente
los algoritmos desarrollados durante la unidad.

## 1. Propósito

El diagrama de flujo constituye una representación gráfica del
algoritmo. Durante la Unidad III se utilizará para visualizar:

- la secuencia de operaciones
- la entrada y salida de información
- el procesamiento de datos
- las decisiones
- el flujo de ejecución del algoritmo.

El diagrama de flujo no sustituye al análisis ni al pseudocódigo. La
relación entre las representaciones es:

```text
Problema
    ↓
Análisis
    ↓
Pseudocódigo
    ↓
Diagrama de flujo
    ↓
PSeInt
    ↓
Verificación
```

Las tres representaciones del algoritmo (pseudocódigo, diagrama de
flujo y PSeInt) deben conservar la misma lógica.

## 2. Referencia normativa

La simbología utilizada toma como referencia:

> ISO 5807:1985 — *Information processing — Documentation symbols and
> conventions for data, program and system flowcharts, program network
> charts and system resources charts.*

La norma establece símbolos y convenciones para representar
gráficamente procedimientos y procesos relacionados con sistemas de
información.

Para efectos didácticos de esta materia se utilizará únicamente el
subconjunto de símbolos necesario para representar los algoritmos
correspondientes al nivel introductorio. La selección de símbolos no
pretende reproducir la totalidad de la norma ISO 5807: es una
adaptación didáctica, y los nombres en inglés que aparecen en esta
página son solo una referencia orientativa.

## 3. Principios generales

Todo diagrama debe:

- representar un algoritmo definido previamente
- tener un inicio claramente identificado
- mantener una dirección de flujo comprensible
- utilizar símbolos de manera consistente
- evitar cruces innecesarios de líneas
- utilizar flechas para indicar el sentido del flujo cuando sea
  necesario
- mantener correspondencia con el pseudocódigo
- utilizar textos breves dentro de los símbolos
- evitar ambigüedades
- permitir que otra persona pueda seguir el algoritmo sin explicaciones
  adicionales.

### 3.1 Resumen de símbolos

<img src="/imagenes/logica-programacion/unidad-03/unidad03_simbolos_diagrama_flujo.svg" alt="Símbolos de diagrama de flujo: terminal para Inicio y Fin, proceso para asignaciones y constantes, paralelogramo de entrada para Entrada, pantalla de salida para Mostrar, decisión para condiciones, línea de flujo para el orden y conector para continuar el diagrama" style="width:100%">

| Símbolo | Forma | Significado | Cuándo utilizarlo | Instrucción de pseudocódigo | Ejemplo |
| --- | --- | --- | --- | --- | --- |
| Terminal | Rectángulo con extremos redondeados | Inicio o final del algoritmo | Una vez al inicio y una vez al final | `Inicio`, `Fin` | `Inicio` |
| Proceso | Rectángulo | Operación que modifica un valor | Asignaciones, cálculos y constantes con valor | `identificador = expresión`, constante con valor | `area = base * altura` |
| Entrada | Paralelogramo | Información que se recibe | Cada instrucción de entrada | `Entrada:` | `Entrada: base` |
| Salida (pantalla) | Pantalla: lado izquierdo en punta y lado derecho curvo | Información que se muestra en pantalla | Cada instrucción de salida, incluidos los mensajes previos a una entrada | `Mostrar` | `Mostrar area` |
| Decisión | Rombo | Condición con dos caminos | Condicionales y repeticiones (tratamiento formal en la Unidad IV) | `Si … Entonces`, `Mientras … Hacer` | `edad >= 18` |
| Línea de flujo | Línea con punta de flecha | Orden de ejecución | Entre cada par de símbolos consecutivos | Orden de las instrucciones | `Inicio → Entrada: base` |
| Conector | Círculo con una letra | Continuación del flujo en otra parte del diagrama | Solo cuando una línea directa dificulta la lectura (por ejemplo, al dividir el diagrama en dos columnas) | Ninguna: no representa una instrucción | `A` |

## 4. Terminal

**Nombre:** en esta materia el símbolo se denomina *terminal*, nombre
habitual en los textos en español (en inglés, *terminator*).

**Función:** representa el inicio o final del algoritmo.

Representación conceptual:

```text
   ┌─────────────────┐
   │     INICIO      │
   └─────────────────┘
```

También se utiliza para `FIN`.

Correspondencia con el pseudocódigo:

```text
Inicio
...
Fin
```

Debe existir al menos un inicio y un final claramente identificados.

## 5. Proceso

**Función:** representa una operación o procesamiento.

Representación conceptual:

```text
┌─────────────────────────┐
│ area = base * altura    │
│        * MITAD          │
└─────────────────────────┘
```

Se utiliza para asignaciones, cálculos y operaciones de procesamiento.

Correspondencia con el pseudocódigo:

```text
area = base * altura * MITAD
```

No debe utilizarse para representar una entrada o una salida.

## 6. Entrada y salida

La entrada y la salida se representan con símbolos distintos.

### 6.1 Entrada

**Función:** representa los datos proporcionados por el usuario.

**Símbolo:** paralelogramo.

Representación conceptual:

```text
   ╱────────────────────╲
  ╱    Entrada: base     ╲
  ╲──────────────────────╱
```

Correspondencia con el pseudocódigo:

```text
Entrada: base
Entrada: altura
```

### 6.2 Salida en pantalla

**Función:** representa la información que se muestra al usuario en
pantalla.

**Símbolo:** pantalla (en inglés, *display*). El lado izquierdo termina
en punta y el lado derecho es curvo, como el contorno de un monitor.

Representación conceptual:

```text
    ┌──────────────────╮
   <    Mostrar area    )
    └──────────────────╯
```

Correspondencia con el pseudocódigo:

```text
Mostrar area

Mostrar "Ingrese la base:"
```

Los mensajes que se muestran antes de una entrada también son salidas y
se representan con el símbolo de pantalla.

El paralelogramo no debe utilizarse para una instrucción `Mostrar`, ni
el símbolo de pantalla para una instrucción `Entrada:`.

## 7. Decisión

**Función:** representa una condición que determina diferentes caminos
de ejecución.

Representación conceptual:

```text
             /\
            /  \
           / ¿? \
           \    /
            \  /
             \/
```

Una decisión debe tener una condición claramente expresada, por
ejemplo `edad >= 18`. Los caminos deben identificarse mediante
etiquetas como **Sí** y **No**, o mediante las condiciones
correspondientes.

Correspondencia con el pseudocódigo:

```text
Si edad >= 18 Entonces
    ...
Sino
    ...
FinSi
```

Las decisiones se estudian formalmente en la Unidad IV.

## 8. Línea de flujo

**Función:** indica la dirección en la que debe interpretarse el
algoritmo.

Representación conceptual:

```text
┌───────────┐
│  INICIO   │
└─────┬─────┘
      ↓
┌───────────┐
│ PROCESO   │
└─────┬─────┘
      ↓
┌───────────┐
│   FIN     │
└───────────┘
```

Las líneas deben mantener una dirección clara.

## 9. Conector

El conector permite enlazar partes del diagrama cuando una línea
directa dificulta la lectura. Se recomienda utilizarlo únicamente
cuando sea necesario. No debe utilizarse para ocultar un diseño
confuso.

**Representación:** círculo pequeño con una letra mayúscula. El flujo
sale de un conector y continúa en otro conector con la misma letra.

**Correspondencia:** no representa ninguna instrucción del
pseudocódigo, solo organiza el dibujo.

**Ejemplo:** en el siguiente diagrama del área de un triángulo, el
dibujo se divide en dos columnas. La primera termina en el conector A y
la segunda comienza en el conector A.

<img src="/imagenes/logica-programacion/unidad-03/unidad03_diagrama_u3-006.svg" alt="Diagrama de flujo del área de un triángulo en dos columnas. Primera columna: Inicio, proceso DIVISOR_AREA_TRIANGULO = 2, Mostrar Ingrese la base, Entrada base, Mostrar Ingrese la altura, conector A. Segunda columna: conector A, Entrada altura, proceso area = (base * altura) / DIVISOR_AREA_TRIANGULO, Mostrar el área, Fin" style="width:100%">

## 10. Correspondencia con el pseudocódigo

La siguiente tabla establece la relación conceptual:

| Pseudocódigo | Diagrama |
| --- | --- |
| `Inicio` | Terminal |
| Declaración de variable sin valor (`REAL base`) | No se representa |
| Declaración de variable o constante con valor (`REAL MITAD = 0.5`) | Proceso, con la asignación del valor (`MITAD = 0.5`) |
| `Mostrar "mensaje"` antes de una entrada | Salida en pantalla (un símbolo por instrucción) |
| `Entrada:` | Entrada (paralelogramo) |
| Asignación | Proceso |
| Cálculo | Proceso |
| `Mostrar` | Salida en pantalla |
| `Si ... Entonces` | Decisión |
| `Sino` | Rama alternativa de decisión |
| `Mientras` | Decisión y flujo de retorno |
| `Fin` | Terminal |

## 11. Ejemplo completo

**Problema:** calcular el área de un triángulo utilizando su base y
altura.

**Pseudocódigo**

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

**Diagrama de flujo conceptual**

```text
        ┌───────────┐
        │  INICIO   │
        └─────┬─────┘
              ↓
    ┌──────────────────────┐
    │     MITAD = 0.5      │
    └──────────┬───────────┘
               ↓
      ╱────────────────╲
     ╱   Entrada: base  ╲
     ╲──────────────────╱
              ↓
      ╱────────────────╲
     ╱ Entrada: altura  ╲
     ╲──────────────────╱
              ↓
    ┌──────────────────────┐
    │ area = base * altura │
    │        * MITAD       │
    └──────────┬───────────┘
               ↓
     ┌────────────────╮
    <   Mostrar area   )
     └────────────────╯
               ↓
        ┌───────────┐
        │    FIN    │
        └───────────┘
```

La representación gráfica final deberá utilizar los símbolos gráficos
correspondientes y no los caracteres anteriores:

<img src="/imagenes/logica-programacion/unidad-03/unidad03_diagrama_area_triangulo_mitad.svg" alt="Diagrama de flujo del área de un triángulo con la constante MITAD: Inicio, proceso MITAD = 0.5, entrada base, entrada altura, proceso area = base * altura * MITAD, salida Mostrar area, Fin" style="max-width:460px;width:100%">

La constante `MITAD` se representa con un proceso porque su valor se
asigna durante el algoritmo. En la
[traducción a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/)
corresponde a la instrucción `MITAD = 0.5`. Así, las tres
representaciones contienen las mismas instrucciones.

## 12. Reglas de construcción

### 12.1 Flujo principal

Siempre que sea posible, el flujo principal debe avanzar de arriba
hacia abajo.

### 12.2 Lectura

El lector debe poder determinar fácilmente qué operación ocurre
primero, cuál después y cuándo termina el algoritmo.

### 12.3 Texto

Utiliza frases cortas y claras. Evita colocar explicaciones extensas
dentro de los símbolos.

### 12.4 Operaciones

Cada proceso debe representar una operación o conjunto coherente de
operaciones. No coloques un algoritmo completo dentro de un solo
símbolo de proceso.

### 12.5 Decisiones

Toda decisión debe mostrar claramente sus posibles caminos. Por
ejemplo:

```text
        ¿edad >= 18?
          /      \
        Sí        No
        ↓          ↓
```

### 12.6 Cruces

Evita cruces de líneas cuando exista una alternativa de diseño.

### 12.7 Conectores

Utiliza conectores únicamente cuando contribuyan a mantener la
legibilidad.

## 13. Nivel de detalle

El nivel de detalle debe corresponder al propósito del diagrama.

Para ejercicios introductorios se recomienda representar:

```text
Inicio
↓
Entrada
↓
Proceso
↓
Salida
↓
Fin
```

Para algoritmos con decisiones:

```text
Inicio
↓
Entrada
↓
Decisión
↙    ↘
Proceso  Proceso
↘    ↙
Salida
↓
Fin
```

En estructuras repetitivas se deberá mostrar claramente el retorno del
flujo hacia la condición o punto de repetición.

## 14. Relación con PSeInt

El diagrama de flujo, el pseudocódigo y el algoritmo ejecutado en
PSeInt deben representar la misma solución:

```text
Pseudocódigo
      ↕
Diagrama de flujo
      ↕
PSeInt
```

Si las tres representaciones producen resultados diferentes, se debe
revisar el algoritmo.

PSeInt no determina cómo debe construirse el diagrama de flujo. El
diagrama tampoco determina automáticamente la solución. Las tres
representaciones son formas diferentes de expresar una misma solución
algorítmica.

## 15. Errores frecuentes

| Error | Corrección |
| --- | --- |
| Utilizar un rectángulo para representar una entrada. | Utilizar el paralelogramo de entrada. |
| Utilizar el paralelogramo para una instrucción `Mostrar`. | Utilizar el símbolo de pantalla. |
| Representar una decisión como un proceso. | Utilizar el símbolo de decisión. |
| Crear decisiones sin indicar sus caminos. | Identificar claramente las ramas. |
| Crear diagramas sin inicio o final. | Utilizar el símbolo terminal para Inicio y Fin. |
| Cruzar líneas constantemente. | Reorganizar el diagrama o utilizar conectores cuando sean necesarios. |
| Colocar demasiado texto dentro de los símbolos. | Utilizar expresiones breves que representen la operación. |
| Crear un diagrama diferente al pseudocódigo. | Comprobar correspondencia instrucción por instrucción. |

## 16. Criterios de revisión

Un diagrama podrá considerarse correctamente elaborado cuando:

- [ ] Representa el problema planteado.
- [ ] Tiene inicio y final.
- [ ] Utiliza símbolos apropiados.
- [ ] Mantiene un flujo comprensible.
- [ ] Las entradas corresponden a los datos identificados.
- [ ] Los procesos corresponden a las operaciones del algoritmo.
- [ ] Las salidas corresponden a los resultados esperados.
- [ ] Las decisiones representan correctamente las condiciones.
- [ ] Existe correspondencia con el pseudocódigo.
- [ ] Puede utilizarse para verificar la lógica del algoritmo.

## 17. Regla fundamental

El diagrama de flujo debe representar gráficamente el mismo algoritmo
que se expresa mediante pseudocódigo. No debe utilizarse para decorar
la solución ni para sustituir el análisis del problema.

La calidad del diagrama depende de la claridad de la solución
algorítmica que representa.
