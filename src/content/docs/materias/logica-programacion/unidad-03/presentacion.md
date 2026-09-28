---
title: "Presentación — Unidad III"
description: "Unidad III de Lógica de Programación — presentación de clase completa: metodología para la solución de problemas algorítmicos, de la descripción del problema a la documentación."
---

## La pregunta de la unidad

En la Unidad I aprendimos qué es un algoritmo. En la Unidad II aprendimos a representar la información que utiliza.

<div class="banner-node">

**¿Cómo se organiza, paso a paso, el proceso para pasar de un problema a una solución algorítmica confiable?**

</div>

## Las etapas de la metodología

```text
3.1   Importancia de la aplicación de técnicas y herramientas metodológicas
3.2   Etapas de la metodología
      3.2.1 Descripción del problema
      3.2.2 Análisis del problema
      3.2.3 Estrategias de solución
      3.2.4 Técnicas de análisis
      3.2.5 Desarrollo de la solución algorítmica (pseudocódigo)
      3.2.6 Depuración y plan de pruebas
      3.2.7 Documentación
```

Al final de la unidad integrarás las siete etapas en una **propuesta algorítmica** completa.

## Ruta de la unidad

| Tema | Etapa |
|---|---|
| ¿Qué significa resolver un problema? | 3.1 |
| Descripción del problema | 3.2.1 |
| Análisis del problema | 3.2.2 |
| Datos, variables, constantes e identificadores | 3.2.2 |
| Estrategias de solución | 3.2.3 |
| Técnicas de análisis | 3.2.4 |
| Pseudocódigo | 3.2.5 |
| Prueba de escritorio y depuración | 3.2.6 |
| Documentación | 3.2.7 |
| Estudio de caso integrador | 3.2 |

Cada tema puede requerir una o varias sesiones de clase.

## Cómo trabajaremos cada tema

```text
Recuperación → Explicación → Ejemplo → Ejercicio guiado → Práctica → Revisión → Tarea
```

<div class="grid-2">

<div class="card accent-dorado">
<strong>Instrumentos</strong>
<p>Hoja de trabajo, propuesta algorítmica extendida y fichas de trazado, depuración, comparación, transformación, ordenamiento y reto.</p>
</div>

<div class="card accent-verde">
<strong>Tareas</strong>
<p>Continúan lo que se practicó en clase.</p>
</div>

</div>

## ¿Qué significa resolver un problema? — 3.1 Importancia de la aplicación de técnicas y herramientas metodológicas

### Propósito del tema

Introducir la idea de **solución algorítmica** y distinguir entre:

<div class="grid-3">

<div class="card accent-azul">
<strong>Problema</strong>
<p>Situación que requiere una solución mediante un conjunto de acciones o decisiones.</p>
</div>

<div class="card accent-dorado">
<strong>Solución</strong>
<p>Propuesta de procedimiento que permite resolver un problema bajo determinadas condiciones.</p>
</div>

<div class="card accent-verde">
<strong>Algoritmo</strong>
<p>Conjunto finito y ordenado de instrucciones que permite resolver un problema o realizar una tarea.</p>
</div>

</div>

### Algoritmo y programa no son lo mismo

| Término | Definición en la unidad |
|---|---|
| Instrucción | Indicación que especifica una acción que debe realizar el algoritmo. |
| Algoritmo | Conjunto finito y ordenado de instrucciones que resuelve un problema. |
| Pseudocódigo | Representación textual y estructurada de un algoritmo, sin depender de un lenguaje de programación. |
| Programa | Implementación de un algoritmo mediante un lenguaje de programación. |

<div class="callout-alcance">

En esta materia construimos **algoritmos** y los representamos mediante pseudocódigo y diagramas de flujo.

</div>

### Características de una solución algorítmica

<div class="grid-3">

<div class="card accent-azul">
<strong>Finita</strong>
<p>Termina después de un número determinado de pasos.</p>
</div>

<div class="card accent-dorado">
<strong>Ordenada</strong>
<p>Cada paso tiene una posición en la secuencia.</p>
</div>

<div class="card accent-verde">
<strong>Precisa</strong>
<p>Cada instrucción indica una acción clara.</p>
</div>

<div class="card accent-rojo">
<strong>Determinada</strong>
<p>Con los mismos datos produce el mismo resultado.</p>
</div>

<div class="card accent-azul">
<strong>Orientada a un resultado</strong>
<p>Produce la información que el problema solicita.</p>
</div>

</div>

### ¿Por qué seguir una metodología?

<div class="grid-2">

<div class="card accent-rojo">
<strong>Sin procedimiento ordenado</strong>
<p>Se escribe la solución antes de comprender el problema. Los errores aparecen tarde y es difícil saber dónde se originaron.</p>
</div>

<div class="card accent-verde">
<strong>Con una metodología</strong>
<p>Cada etapa prepara la siguiente. Los errores se detectan en la etapa donde se producen y la solución puede verificarse.</p>
</div>

</div>

<div class="banner-node">

**Una metodología sistemática reduce errores y facilita la solución de problemas algorítmicos.**

</div>

### Del problema a la solución

```text
Problema
   ↓  3.2.1  ¿Qué se pide resolver?
   ↓  3.2.2  ¿Qué datos intervienen y qué resultados se esperan?
   ↓  3.2.3  ¿Qué estrategia conviene utilizar?
   ↓  3.2.4  ¿Cómo se divide el problema y qué casos existen?
   ↓  3.2.5  ¿Cómo se representa la solución?
   ↓  3.2.6  ¿Funciona? ¿Qué debe corregirse?
   ↓  3.2.7  ¿Otra persona puede comprenderla?
Solución algorítmica confiable
```

### Actividad del tema

El grupo identificará, a partir de una situación cotidiana:

- la situación problemática
- el resultado esperado
- la información necesaria
- el procedimiento general

### Cierre del tema

<div class="banner-node">

**Resolver un problema algorítmicamente es construir un procedimiento finito, ordenado y preciso que produce el resultado solicitado.**

</div>

- Evidencia: registro de la actividad guiada.
- Tarea: no se asigna tarea formal en este tema.

**Siguiente tema:** 3.2.1 Descripción del problema.

## Descripción del problema — Etapa 3.2.1

### Propósito del tema

Expresar un problema de manera **clara**, **completa** y **sin ambigüedades**, identificando qué se pide resolver.

<div class="banner-node">

**No se puede resolver bien un problema que no se ha descrito bien.**

</div>

### ¿Qué contiene una descripción del problema?

La descripción del problema es la descripción clara de la situación que debe resolverse y del resultado que se espera obtener.

| Pregunta | Qué se escribe |
|---|---|
| ¿Qué situación se presenta? | El contexto, con tus propias palabras. |
| ¿Qué se necesita resolver? | La tarea concreta que debe cumplir la solución. |
| ¿Qué resultado debo obtener? | El objetivo, en una sola frase. |

### Características de una buena descripción

<div class="grid-3">

<div class="card accent-azul">
<strong>Clara</strong>
<p>Otra persona la entiende sin explicaciones adicionales.</p>
</div>

<div class="card accent-dorado">
<strong>Completa</strong>
<p>Incluye la situación y el resultado esperado.</p>
</div>

<div class="card accent-verde">
<strong>Sin ambigüedades</strong>
<p>Cada frase admite una sola interpretación.</p>
</div>

</div>

<div class="callout">

Todavía **no** se describen datos, fórmulas ni pasos. Eso corresponde al análisis (3.2.2) y a las etapas siguientes.

</div>

### Ejemplo: describir un problema

> Una tienda desea obtener el importe total de una compra a partir del precio de un producto y la cantidad de unidades adquiridas.

**Hoja de trabajo · 1. Definición del problema**

| Pregunta | Respuesta |
|---|---|
| ¿Qué problema debo resolver? | Una tienda necesita saber cuánto debe pagar un cliente por la compra de un producto. |
| ¿Qué resultado debo obtener? | El importe total de la compra. |

### Actividades del tema

| Momento | Actividad |
|---|---|
| Guiada | Describir una situación cotidiana de forma formal |
| Práctica | Redactar individualmente la descripción de un problema |

Se registra en la hoja de trabajo, sección 1. Definición del problema.

### Cierre del tema

<div class="banner-node">

**La descripción responde qué se debe resolver y qué resultado se espera, antes de pensar en cómo.**

</div>

- Evidencia: descripción formal del problema.

**Siguiente tema:** 3.2.2 Análisis del problema.

## Análisis del problema — Etapa 3.2.2

### Propósito del tema

Distinguir entre la **información de entrada**, la **información conocida** y los **resultados esperados** de un problema.

<div class="banner-node">

**Analizar es identificar qué información interviene en el problema antes de decidir cómo resolverlo.**

</div>

### Elementos del análisis

| Elemento | Qué es |
|---|---|
| Datos de entrada | Información que el algoritmo necesita recibir. Normalmente la proporciona el usuario. |
| Datos conocidos | Información que el problema proporciona y que **no** se solicita al usuario. |
| Resultados esperados | Información concreta que debe obtenerse al finalizar la solución. |
| Proceso | Operaciones que transforman los datos en los resultados. |
| Restricciones | Condiciones que limitan los valores válidos. |

### Tres preguntas para analizar

```text
¿Qué información debe proporcionar el usuario?     → datos de entrada
¿Qué información ya proporciona el problema?       → datos conocidos
¿Qué información debe producir la solución?        → resultados esperados
```

<div class="callout">

Un dato conocido **no** se solicita al usuario. Si el problema ya lo establece, pedirlo permitiría valores diferentes de los establecidos.

</div>

### Actividad guiada · Datos de entrada y resultados

Una tienda desea obtener el importe total de una compra a partir del precio de un producto y la cantidad de unidades adquiridas.

**Hoja de trabajo · 2. Análisis**

**2.1 Datos de entrada**

| Dato | Tipo | Descripción |
|---|---|---|
| | | |

**2.2 Resultados esperados**

| Resultado | Tipo | Descripción |
|---|---|---|
| | | |

No desarrolles el pseudocódigo.

### Actividad guiada · 2.5 Restricciones

Después de identificar los datos, preguntamos:

- ¿Qué valores **no** tendrían sentido para el precio?
- ¿La cantidad de unidades puede tener parte decimal?
- ¿Puede ser cero?

<div class="callout">

Las restricciones también forman parte del análisis. Indican qué valores son válidos.

</div>

### Actividad guiada · Datos conocidos y no conocidos

Una empresa desea calcular el salario semanal de un trabajador a partir del número de horas trabajadas y el pago correspondiente a cada hora. La empresa establece que el pago por hora es de **85.00** unidades monetarias.

| Información | Clasificación | Tipo de dato | Justificación |
|---|---|---|---|
| Pago por hora | | | |
| Horas trabajadas | | | |
| Salario semanal | | | |

Clasificación: **dato conocido**, **dato de entrada** o **resultado esperado**.

### Revisión del tema

- ¿Qué información debe proporcionar el usuario en cada problema?
- ¿Qué información calcula el algoritmo?
- ¿Por qué el pago por hora **no** debe solicitarse al usuario?

<div class="callout-alcance">

Evidencia del tema: tabla de datos conocidos, datos de entrada, resultados esperados y restricciones.

</div>

### Cierre del tema

<div class="banner-node">

**El análisis separa lo que se recibe, lo que ya se conoce y lo que se debe producir.**

</div>

- Tarea: no se asigna tarea formal en este tema.

**Siguiente tema:** convertir esa información en datos que el algoritmo pueda utilizar.

## Datos, variables, constantes e identificadores — 3.2.2 Análisis del problema

### Propósito del tema

Definir correctamente los elementos de información que utilizará un algoritmo.

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">1</span>
<strong>Tipo de dato</strong>
<p>Asignar a cada dato el tipo que corresponde a su naturaleza.</p>
</div>

<div class="card accent-dorado">
<span class="badge">2</span>
<strong>Variable o constante</strong>
<p>Decidir si el valor cambia o permanece fijo durante la ejecución.</p>
</div>

<div class="card accent-verde">
<span class="badge">3</span>
<strong>Identificador</strong>
<p>Nombrar cada dato de forma descriptiva y con la convención correcta.</p>
</div>

</div>

### ¿Dónde estamos en la metodología?

```text
3.2.1 Descripción del problema
3.2.2 Análisis del problema        ← estamos aquí
3.2.3 Estrategias de solución
3.2.4 Técnicas de análisis
3.2.5 Desarrollo de la solución algorítmica (pseudocódigo)
3.2.6 Depuración y plan de pruebas
3.2.7 Documentación
```

En el tema anterior identificamos **datos de entrada**, **datos conocidos** y **resultados esperados**.

<div class="banner-node">

**Hoy convertimos esa información en datos que el algoritmo pueda utilizar.**

</div>

### Recuperación: lo que ya conoces de la Unidad II

| Concepto | Pregunta que responde |
|---|---|
| Dato | ¿Qué información utiliza el algoritmo? |
| Tipo de dato | ¿Qué clase de valor es y qué operaciones admite? |
| Variable | ¿Su valor puede cambiar durante la ejecución? |
| Constante | ¿Su valor permanece fijo durante la ejecución? |
| Identificador | ¿Con qué nombre nos referimos a él? |

<div class="callout">

En esta unidad **no** volvemos a estudiar estos conceptos: los **aplicamos** al análisis de un problema.

</div>

### Tipos de datos de la Unidad III

<div class="grid-3">

<div class="card accent-azul">
<strong>ENTERO</strong>
<p>Números sin parte decimal.</p>
<p><code>25</code></p>
</div>

<div class="card accent-dorado">
<strong>REAL</strong>
<p>Números con parte decimal.</p>
<p><code>25.50</code></p>
</div>

<div class="card accent-verde">
<strong>CADENA</strong>
<p>Secuencia de caracteres.</p>
<p><code>"ANA"</code></p>
</div>

<div class="card accent-rojo">
<strong>CARACTER</strong>
<p>Un solo carácter.</p>
<p><code>'A'</code></p>
</div>

<div class="card accent-azul">
<strong>LOGICO</strong>
<p>Solo dos valores posibles.</p>
<p><code>VERDADERO</code> / <code>FALSO</code></p>
</div>

</div>

<div class="callout-alcance">

Notación de la unidad: cadenas entre comillas dobles, caracteres entre comillas simples y tipos en mayúsculas.

</div>

### ¿Variable o constante?

Pregunta clave: **¿el valor puede cambiar durante la ejecución del algoritmo?**

<div class="grid-2">

<div class="card accent-azul">
<strong>Variable</strong>
<p>Su valor puede cambiar.</p>
<p>Normalmente corresponde a <strong>datos de entrada</strong> y <strong>resultados</strong>.</p>
</div>

<div class="card accent-dorado">
<strong>Constante</strong>
<p>Su valor no cambia.</p>
<p>Normalmente corresponde a <strong>datos conocidos</strong> que el problema establece y que no se solicitan al usuario.</p>
</div>

</div>

### Convenciones para identificadores

<div class="grid-2">

<div class="card accent-azul">
<strong>Variables: camelCase</strong>
<p>Primera palabra en minúscula. Las siguientes inician con mayúscula.</p>
<p><code>cantidadPersonas</code><br><code>areaTriangulo</code><br><code>esMayorEdad</code></p>
</div>

<div class="card accent-dorado">
<strong>Constantes: SCREAMING_SNAKE_CASE</strong>
<p>Todo en mayúsculas. Palabras separadas por guion bajo.</p>
<p><code>VALOR_PI</code><br><code>EDAD_MAYORIA</code><br><code>DIAS_SEMANA</code></p>
</div>

</div>

### Reglas de un buen identificador

Un identificador debe:

- comenzar con una letra
- ser descriptivo
- evitar abreviaturas innecesarias
- no contener espacios
- no utilizar palabras reservadas
- respetar la convención de su categoría

| No se recomienda | Motivo |
|---|---|
| `x` | No indica qué información guarda |
| `dato2` | Nombre genérico: no dice de qué dato se trata |
| `aux` | Abreviatura que no describe su contenido |
| `cantidadpersonas` | Palabras juntas sin distinguir dónde empieza cada una |
| `CANTIDADpersonas` | Mayúsculas y minúsculas mezcladas sin criterio |
| `cantidad personas` | El espacio no es válido en un identificador |

### Ejemplo: del análisis a los datos

Retomamos el salario semanal de un trabajador: el pago por hora (85.00) es un **dato conocido**, las horas trabajadas son un **dato de entrada** y el salario semanal es el **resultado esperado**.

**Hoja de trabajo · 3. Diseño de los datos**

<div class="grid-2">

<div>

**Constantes**

| Identificador | Tipo | Valor |
|---|---|---|
| `PAGO_POR_HORA` | REAL | 85.00 |

</div>

<div>

**Variables**

| Identificador | Tipo |
|---|---|
| `horasTrabajadas` | ENTERO |
| `salarioSemanal` | REAL |

</div>

</div>

<div class="callout">

El pago por hora lo establece la empresa y **no se solicita al usuario**. Por eso es constante.

</div>

### El procedimiento que aplicaremos

```text
Información del problema
        ↓
¿Dato conocido, dato de entrada o resultado?
        ↓
¿Variable o constante?
        ↓
¿Qué tipo de dato le corresponde?
        ↓
¿Qué identificador lo describe mejor?
```

### Práctica 1 · Clasificación de tipos de datos

Un sistema requiere almacenar el **nombre** de un estudiante, su **edad**, su **promedio**, la **cantidad de materias inscritas** y **si tiene derecho** a presentar una evaluación extraordinaria.

**Qué debes hacer:** asignar a cada identificador uno de los cinco tipos de la unidad y justificar tu elección en una frase.

| Identificador | Tipo de dato | Justificación |
|---|---|---|
| `nombreEstudiante` | | |
| `edad` | | |
| `promedio` | | |
| `cantidadMaterias` | | |
| `tieneDerecho` | | |

Trabajo individual · 10 minutos · No desarrolles el pseudocódigo.

### Revisión · Clasificación de tipos de datos

Comparte tu tabla con un compañero y verifiquen:

- ¿Cada identificador tiene **un solo** tipo de dato?
- ¿Utilizaron **únicamente** ENTERO, REAL, CADENA, CARACTER o LOGICO?
- ¿La justificación se basa en la **naturaleza** de la información?

<div class="callout">

Pregunta para el grupo: **¿qué diferencia observable existe entre la edad y el promedio que justifica tipos diferentes?**

</div>

### Práctica 2 · Definición de variables y constantes

Una empresa desea calcular el **importe total** de una compra.

- El **precio unitario** y la **cantidad de productos** los proporciona el usuario.
- La **tasa de impuesto** es del 16 % y permanece constante.
- El algoritmo calcula el **subtotal** y el **importe total**.

**Qué debes hacer:** para cada elemento, define

| Identificador | Naturaleza (VARIABLE / CONSTANTE) | Tipo de dato | Valor inicial (cuando corresponda) |
|---|---|---|---|

Trabajo individual · 15 minutos · No desarrolles el pseudocódigo completo.

### Revisión · Definición de variables y constantes

Verifica tu propia tabla:

<ul style="list-style:none;padding-left:0">
<li>☐ Identifiqué <strong>una</strong> constante y la escribí en SCREAMING_SNAKE_CASE.</li>
<li>☐ Escribí las variables en camelCase.</li>
<li>☐ Cada identificador describe la información que representa.</li>
<li>☐ No utilicé abreviaturas innecesarias.</li>
<li>☐ Cada tipo de dato corresponde a la naturaleza del dato.</li>
</ul>

<div class="callout">

Pregunta para el grupo: **¿por qué la tasa de impuesto no debe solicitarse al usuario?**

</div>

### Errores frecuentes

| Error | Ejemplo | Corrección |
|---|---|---|
| Constante escrita como variable | `tasaImpuesto` para un valor fijo | Usar SCREAMING_SNAKE_CASE |
| Variable escrita como constante | `HORAS_TRABAJADAS` para un dato de entrada | Usar camelCase |
| Identificador no descriptivo | `x`, `dato1`, `cp` | Nombrar la información que representa |
| Tipo que no corresponde | Cantidad de personas como REAL | Una cantidad de elementos es ENTERO |
| Solicitar un dato conocido | Pedir al usuario el pago por hora | Representarlo como constante |

### Tarea · Selección de identificadores

**Qué debes hacer:** proponer un identificador y un tipo de dato para cada elemento de un sistema académico (cuatro variables y una constante) y verificar que cada identificador cumple las reglas vistas hoy.

| Aspecto | Detalle |
|---|---|
| Instrumento | Hoja de trabajo, sección 3. Diseño de los datos |
| Evidencia | Tabla completa y lista de verificación marcada |
| Entrega | La fecha y el medio los indica el profesor |

<div class="callout-alcance">

Es la continuación de la práctica 2: mismo procedimiento, problema diferente. No desarrolles el pseudocódigo.

</div>

### Criterios con los que se revisará la tarea

<ul style="list-style:none;padding-left:0">
<li>☐ Los identificadores son descriptivos.</li>
<li>☐ Las variables utilizan camelCase.</li>
<li>☐ La constante utiliza SCREAMING_SNAKE_CASE.</li>
<li>☐ Los identificadores no contienen espacios.</li>
<li>☐ Los identificadores no utilizan caracteres especiales.</li>
<li>☐ Los identificadores permiten reconocer la información que representan.</li>
</ul>

<div class="callout">

Revisa tu tabla con estos criterios **antes** de entregarla.

</div>

### Síntesis

```text
Análisis del problema
        ↓
Dato conocido / dato de entrada / resultado
        ↓
Variable o constante
        ↓
Tipo de dato
        ↓
Identificador
```

<div class="banner-node">

**Un dato bien definido se reconoce por su nombre, su tipo y su naturaleza.**

</div>

### Siguiente tema

**3.2.3 Estrategias de solución**

Con el problema descrito y sus datos definidos, compararemos diferentes formas de resolverlo y justificaremos cuál conviene utilizar.

En la etapa 3.2.5 utilizarás estos identificadores para escribir el pseudocódigo de la solución.

## Estrategias de solución — Etapa 3.2.3

### Propósito del tema

Comprender que un problema puede abordarse mediante **diferentes estrategias** y que la elección debe **justificarse**.

<div class="banner-node">

**Estrategia de solución: forma general elegida para abordar un problema.**

</div>

### Un problema, varias estrategias

Una vez descrito el problema y definidos sus datos, puede haber más de una forma de llegar al resultado.

Para elegir, comparamos características **observables**:

<div class="grid-4">

<div class="card accent-azul">
<strong>Cantidad de pasos</strong>
</div>

<div class="card accent-dorado">
<strong>Claridad</strong>
</div>

<div class="card accent-verde">
<strong>Datos utilizados</strong>
</div>

<div class="card accent-rojo">
<strong>Facilidad de verificación</strong>
</div>

</div>

### Comparar con criterios, no con preferencias

<div class="grid-2">

<div class="card accent-rojo">
<strong>Justificación débil</strong>
<p>"Me gusta más la estrategia A."</p>
<p>"La B es mejor porque es más corta."</p>
</div>

<div class="card accent-verde">
<strong>Justificación basada en evidencia</strong>
<p>"La A usa identificadores que describen cada dato, por lo que es más fácil verificarla."</p>
</div>

</div>

<div class="callout">

Una solución no es necesariamente mejor que otra solamente porque sea más corta.

</div>

### Instrumento: ficha de comparación

| Sección | Qué registra |
|---|---|
| Problema | Qué deben resolver ambas soluciones. |
| Solución A y Solución B | Las dos alternativas. |
| Comparación | Una tabla con los criterios establecidos. |
| Diferencias principales | Hechos observables, no opiniones. |
| Análisis | Si producen el mismo resultado y en qué casos podrían diferir. |

### Actividad guiada · Comparación de dos algoritmos

Ambos algoritmos deben calcular el área de un rectángulo con base 8 y altura 5.

<div class="grid-2">

<div>

**Algoritmo A**

```text
Inicio
    REAL base = 8
    REAL altura = 5
    REAL area = base * altura
    Mostrar area
Fin
```

</div>

<div>

**Algoritmo B**

```text
Inicio
    REAL a = 8
    REAL b = 5
    REAL c = a * b
    Mostrar c
Fin
```

</div>

</div>

### Ficha de comparación · Comparación y análisis

| Criterio | Algoritmo A | Algoritmo B |
|---|---|---|
| Identificadores descriptivos | | |
| Facilidad de comprensión | | |
| Correspondencia entre datos y variables | | |
| Resultado producido | | |

**Diferencias principales:** ¿por qué un identificador puede facilitar la comprensión?

**Análisis:** ¿ambas soluciones producen el mismo resultado? ☐ Sí ☐ No ☐ No se puede determinar

### Tarea · Comparación de estrategias de solución

**Qué debes hacer:** comparar dos estrategias para calcular el costo total de cinco productos (una suma directa y una acumulación en la variable `total`) y explicar la diferencia principal entre ellas.

| Aspecto | Detalle |
|---|---|
| Instrumento | Ficha de comparación |
| Evidencia | Tabla de comparación completa y explicación de la diferencia principal |
| Entrega | La fecha y el medio los indica el profesor |

<div class="callout-alcance">

Continúa la actividad guiada: mismos criterios observables, ahora para comparar estrategias.

</div>

### Cierre del tema

<div class="banner-node">

**Elegir una estrategia implica compararla con criterios observables y justificar la elección.**

</div>

**Siguiente tema:** 3.2.4 Técnicas de análisis.

## Técnicas de análisis — Etapa 3.2.4

### Propósito del tema

Aplicar técnicas que permiten **precisar la estrategia** elegida **antes** de escribir el pseudocódigo.

<div class="grid-2">

<div class="card accent-azul">
<strong>Descomposición</strong>
<p>Dividir un problema en partes o subproblemas más pequeños.</p>
</div>

<div class="card accent-dorado">
<strong>Identificación de casos</strong>
<p>Determinar las situaciones particulares que puede presentar el problema y que pueden requerir un comportamiento diferente.</p>
</div>

</div>

### Descomposición

Un **subproblema** es una parte del problema que puede analizarse o resolverse de manera independiente dentro de la solución general.

Para cada subproblema se determina:

| Pregunta | Ejemplo de respuesta |
|---|---|
| ¿Qué cálculo debe realizarse? | Una operación concreta |
| ¿Qué datos necesita? | Entradas, datos conocidos o resultados de otro subproblema |
| ¿Qué resultado produce? | Un valor que se usa después o se muestra |

<div class="callout">

Si un subproblema necesita el resultado de otro, el orden entre ellos **no** es arbitrario.

</div>

### Actividad guiada · Descomposición de un problema

Una tienda calcula el importe de una compra de un solo producto (cantidad de unidades y precio unitario) y después aplica un descuento del **10 %**. Debe mostrar el importe antes del descuento, el descuento aplicado y el total a pagar.

| Subproblema | Datos necesarios | Operación | Resultado producido |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

Después escribimos, en lenguaje natural, el **orden** en que deben resolverse. No se escribe pseudocódigo.

### Identificación de casos

Un **caso** es una situación particular que puede presentarse durante la ejecución y que puede requerir un comportamiento diferente.

Para identificar casos se eligen valores:

- por **debajo** de un límite
- **exactamente en** el límite
- por **encima** del límite

<div class="callout-alcance">

Hoy solo **identificamos** los casos. En la Unidad IV profundizarás en las estructuras condicionales que permiten tratarlos en el algoritmo.

</div>

### Actividad guiada · Identificación de casos

Una universidad determina la situación académica de un estudiante a partir de su calificación final (entero de 0 a 100). Se considera aprobado con una calificación **mayor o igual que 60**.

| Caso | Valor de calificación | Condición que se cumple | Resultado esperado |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

Debe incluir: un valor inferior a 60, el valor 60 y un valor superior a 60.

**Pregunta final:** ¿qué condición permite distinguir los dos resultados posibles?

### Revisión del tema

- ¿Qué subproblema debe resolverse primero en la descomposición? ¿Por qué?
- ¿Por qué es indispensable probar el valor **60** en la identificación de casos?
- ¿Qué pasaría con un valor fuera del rango 0–100?

<div class="callout-alcance">

Evidencia: tabla de subproblemas con su orden y tabla de casos.

</div>

### Cierre del tema

<div class="banner-node">

**Antes de escribir la solución, se divide el problema y se identifican los casos que debe atender.**

</div>

- Tarea: no se asigna tarea formal en este tema.

**Siguiente tema:** 3.2.5 Desarrollo de la solución algorítmica (pseudocódigo).

## Pseudocódigo — 3.2.5 Desarrollo de la solución algorítmica

### Propósito del tema

Construir una representación algorítmica estructurada utilizando la **notación definida para la unidad**.

<div class="banner-node">

**Pseudocódigo: representación textual y estructurada de un algoritmo, sin depender de un lenguaje de programación específico.**

</div>

<div class="callout-alcance">

El pseudocódigo se escribe **después** de describir, analizar, elegir una estrategia y aplicar técnicas de análisis.

</div>

### Tres representaciones del mismo algoritmo

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">1</span>
<strong>Pseudocódigo</strong>
<p>Representación principal. Es la que se enseña y se evalúa.</p>
</div>

<div class="card accent-dorado">
<span class="badge">2</span>
<strong>Diagrama de flujo</strong>
<p>Representación gráfica del mismo algoritmo.</p>
</div>

<div class="card accent-verde">
<span class="badge">3</span>
<strong>Traducción a PSeInt</strong>
<p>Herramienta de verificación: ejecutar y comparar resultados.</p>
</div>

</div>

```text
Problema → Análisis → Pseudocódigo → Diagrama de flujo → Traducción a PSeInt → Ejecución → Prueba y depuración
```

<div class="callout-alcance">

PSeInt **no** es el algoritmo: sirve para comprobar que el algoritmo produce los resultados esperados. El pseudocódigo nunca se modifica para adaptarlo a PSeInt.

</div>

### Estructura de un algoritmo

```text
Inicio
    Declaraciones      → constantes y variables con su tipo
    Entrada            → datos que proporciona el usuario
    Procesamiento      → asignaciones y operaciones
    Salida             → resultados que se muestran
Fin
```

Todo algoritmo comienza con `Inicio` y termina con `Fin`. La indentación muestra la estructura.

### Notación de la unidad

| Concepto | Notación | Ejemplo |
|---|---|---|
| Inicio y fin | `Inicio` … `Fin` | |
| Declaración | `<TIPO> <identificador>` | `REAL altura` |
| Constante | `<TIPO> <CONSTANTE> = <VALOR>` | `REAL IVA_GENERAL = 0.16` |
| Entrada | `Entrada:` | `Entrada: edad` |
| Salida | `Mostrar` | `Mostrar "El área es:", area` |
| Asignación | `=` | `total = precio + impuesto` |
| Comentario | `//` | `// Calcular el área` |

Tipos: `ENTERO`, `REAL`, `CADENA`, `CARACTER`, `LOGICO`.

### Qué no se utiliza

No se utilizan instrucciones de lenguajes de programación ni de herramientas específicas:

```text
scanf    printf    cin    cout    System.out.println    console.log
```

Tampoco `Leer`, `Escribir`, `Definir`, `Algoritmo` ni otras construcciones propias de PSeInt: pertenecen a la **traducción**, no al pseudocódigo.

<div class="callout">

En el pseudocódigo, la salida siempre es `Mostrar`, la entrada siempre es `Entrada:` y la asignación siempre es `=`.

</div>

### Asignación

```text
area = (base * altura) / 2
```

1. Se evalúa la expresión de la **derecha**.
2. El resultado se almacena en el identificador de la **izquierda**.

Se usan paréntesis para hacer explícito el orden de evaluación cuando exista posibilidad de ambigüedad.

### Ejemplo — Área de un triángulo

#### Hoja de trabajo · 1. Definición del problema

Desarrolla un algoritmo que calcule el área de un triángulo a partir de su base y su altura.

| Pregunta | Respuesta |
|---|---|
| ¿Qué problema debo resolver? | Calcular el área de un triángulo cuando se conocen su base y su altura. |
| ¿Qué resultado debo obtener? | El área del triángulo. |

#### Hoja de trabajo · 2. Análisis

| Sección | Contenido |
|---|---|
| 2.1 Datos de entrada | La base y la altura del triángulo |
| 2.2 Resultados esperados | El área del triángulo |
| 2.3 Datos conocidos | El divisor de la fórmula del área: 2 |
| 2.4 Proceso | Multiplicar la base por la altura y dividir el resultado entre 2 |
| 2.5 Restricciones | La base y la altura deben ser mayores que cero |

#### Hoja de trabajo · 3. Diseño de los datos

<div class="grid-2">

<div>

**Constantes**

| Identificador | Tipo | Valor |
|---|---|---|
| `DIVISOR_AREA_TRIANGULO` | ENTERO | 2 |

</div>

<div>

**Variables**

| Identificador | Tipo |
|---|---|
| `base` | REAL |
| `altura` | REAL |
| `area` | REAL |

</div>

</div>

#### Hoja de trabajo · 4. Algoritmo en lenguaje natural

1. Solicitar la base.
2. Solicitar la altura.
3. Calcular el área: multiplicar la base por la altura y dividir entre 2.
4. Mostrar el área.

#### Hoja de trabajo · 4. Algoritmo en pseudocódigo

```text
Inicio

    ENTERO DIVISOR_AREA_TRIANGULO = 2

    REAL base
    REAL altura
    REAL area

    Mostrar "Ingrese la base:"
    Entrada: base

    Mostrar "Ingrese la altura:"
    Entrada: altura

    area = (base * altura) / DIVISOR_AREA_TRIANGULO

    Mostrar "El área del triángulo es:", area

Fin
```

#### Símbolos del diagrama de flujo

<img src="/imagenes/logica-programacion/unidad-03/unidad03_simbolos_diagrama_flujo.svg" alt="Símbolos: terminal para Inicio y Fin, proceso para asignaciones y constantes, paralelogramo de entrada para Entrada, pantalla para Mostrar, decisión para condiciones, línea de flujo para el orden y conector para continuar el diagrama" style="width:100%">

- Las declaraciones **sin valor** (`REAL base`) no se representan.
- Una constante **con valor** (`DIVISOR_AREA_TRIANGULO = 2`) se representa con un **proceso**.
- Cada `Entrada:` es un **paralelogramo** (entrada).
- Cada `Mostrar` es un símbolo de **pantalla** (salida), también los mensajes antes de una entrada.

#### Área de un triángulo: diagrama de flujo

<img src="/imagenes/logica-programacion/unidad-03/unidad03_diagrama_u3-006.svg" alt="Diagrama de flujo del área de un triángulo. Primera columna: Inicio, proceso DIVISOR_AREA_TRIANGULO = 2, Mostrar Ingrese la base, Entrada base, Mostrar Ingrese la altura, conector A. Segunda columna: conector A, Entrada altura, proceso area = (base * altura) / DIVISOR_AREA_TRIANGULO, Mostrar el área, Fin" style="width:100%">

Cada símbolo corresponde a una instrucción del pseudocódigo, en el mismo orden. El conector **A** solo continúa el dibujo en la segunda columna.

#### Área de un triángulo: traducción a PSeInt

```text
Algoritmo AreaTriangulo
    Definir DIVISOR_AREA_TRIANGULO Como Entero
    Definir base, altura, area Como Real
    DIVISOR_AREA_TRIANGULO = 2
    Escribir "Ingrese la base:"
    Leer base
    Escribir "Ingrese la altura:"
    Leer altura
    area = (base * altura) / DIVISOR_AREA_TRIANGULO
    Escribir "El área del triángulo es: ", area
FinAlgoritmo
```

Se conservan los identificadores y el orden. Solo cambia la sintaxis: `Inicio`/`Fin` → `Algoritmo`/`FinAlgoritmo`, `Entrada:` → `Leer`, `Mostrar` → `Escribir`, declaración → `Definir`. La asignación `=` se escribe igual.

En PSeInt utiliza el perfil **Flexible**.

#### Área de un triángulo: ejecución en PSeInt

Caso normal (base = 10, altura = 6):

```text
Ingrese la base:
> 10
Ingrese la altura:
> 6
El área del triángulo es: 30
```

<div class="callout">

La ejecución se realiza **después** de construir el pseudocódigo. Si el resultado no coincide, se corrige el pseudocódigo y se vuelve a traducir.

</div>

#### Hoja de trabajo · 5. Prueba

| Valores utilizados | Resultado esperado | Resultado obtenido en PSeInt | Resultado |
|---|---|---|---|
| base = 10, altura = 6 | area = 30 | 30 | ☑ CORRECTO ☐ NECESITO CORREGIR |
| base = 1, altura = 1 | area = 0.5 | 0.5 | ☑ CORRECTO ☐ NECESITO CORREGIR |

<div class="callout">

Cada línea del pseudocódigo corresponde a una decisión tomada en el análisis. Cada símbolo del diagrama y cada instrucción de PSeInt corresponden a una línea del pseudocódigo.

</div>

### Actividad guiada · Área de un rectángulo

Desarrolla un algoritmo que calcule el área de un rectángulo a partir de su base y su altura.

Construimos juntos la hoja de trabajo, en orden:

1. Definición del problema
2. Análisis: datos de entrada, resultados, datos conocidos, proceso y restricciones
3. Diseño de los datos: constantes y variables
4. Algoritmo: lenguaje natural y pseudocódigo
5. Prueba con los casos:

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Normal | base = 8, altura = 5 | area = 40 |
| Límite | base = 1, altura = 1 | area = 1 |

### Actividad guiada · De lenguaje natural a pseudocódigo

> Un algoritmo debe calcular el perímetro de un rectángulo. El usuario proporciona la base y la altura. El algoritmo calcula el perímetro multiplicando por dos la suma de la base y la altura. Finalmente muestra el perímetro.

**Ficha de transformación · 3. Elementos identificados**

| Elemento | Lenguaje natural (origen) | Pseudocódigo (destino) |
|---|---|---|
| Inicio | | |
| Entrada | | |
| Proceso | | |
| Salida | | |
| Fin | | |

Después se escribe el pseudocódigo completo y se verifica que conserva la misma secuencia.

### Práctica · Promedio de tres calificaciones

Desarrolla un algoritmo que calcule el promedio de tres calificaciones de un estudiante.

- Cada calificación está entre 0 y 100, inclusive.
- Realiza el análisis y desarrolla el pseudocódigo.
- Comprueba tu solución:

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Normal | 80, 90, 70 | promedio = 80 |
| Límite | 0, 0, 0 | promedio = 0 |

Instrumento: hoja de trabajo · Trabajo individual.

### Práctica · Pseudocódigo a diagrama de flujo

Representa cada pseudocódigo mediante un diagrama de flujo.

| Algoritmo | Pseudocódigo de origen |
|---|---|
| Área de un rectángulo | Dos entradas, un cálculo, una salida |
| Promedio de tres calificaciones | Tres entradas, un cálculo, una salida |

Reglas:

- Usa los símbolos vistos: terminal, entrada, salida en pantalla, proceso y línea de flujo.
- Las declaraciones sin valor no se representan.
- Conserva exactamente los identificadores y el orden de las instrucciones.
- No agregues decisiones, repeticiones ni operaciones inexistentes.

Evidencia: diagrama de flujo · Instrumento: ficha de transformación, con el pseudocódigo como representación de origen.

### Tareas del tema

| Tarea | Qué debes hacer |
|---|---|
| Conversión de Celsius a Fahrenheit | Analizar y escribir el pseudocódigo para convertir una temperatura de Celsius a Fahrenheit |
| Costo total de una compra | Analizar y escribir el pseudocódigo del importe total de una compra con impuesto del 16 % |

| Evidencia | Requerida |
|---|---|
| Análisis, diseño de datos y pseudocódigo (hoja de trabajo) | Sí |
| Diagrama de flujo | No |
| Traducción a PSeInt y resultados obtenidos con los casos de prueba | Sí |

Entrega: la fecha y el medio los indica el profesor.

<div class="callout-alcance">

Aplica el procedimiento del ejemplo del área del triángulo: primero el pseudocódigo, después la traducción a PSeInt y la comparación de resultados.

</div>

### Cierre del tema

<div class="banner-node">

**El pseudocódigo representa las decisiones tomadas en el análisis. El diagrama lo muestra gráficamente y PSeInt permite verificarlo.**

</div>

**Siguiente tema:** 3.2.6 ¿Cómo sabemos que el algoritmo funciona?

## Prueba de escritorio y depuración — 3.2.6 Depuración y plan de pruebas

### Propósito del tema

Verificar que un algoritmo produzca los resultados esperados y **detectar errores antes de considerarlo terminado**.

<div class="grid-3">

<div class="card accent-azul">
<strong>Prueba de escritorio</strong>
<p>Ejecución manual y paso a paso de un algoritmo con valores concretos.</p>
</div>

<div class="card accent-dorado">
<strong>Trazado</strong>
<p>Registro sistemático de los valores de las variables mientras se sigue la ejecución.</p>
</div>

<div class="card accent-verde">
<strong>Depuración</strong>
<p>Proceso de identificar, analizar y corregir errores en una solución.</p>
</div>

</div>

### Resultado esperado y resultado obtenido

| Término | Significado |
|---|---|
| Caso de prueba | Conjunto de valores de entrada para comprobar el comportamiento del algoritmo. |
| Resultado esperado | Resultado que **debería** producir el algoritmo para ese caso. |
| Resultado obtenido | Resultado que **realmente** produce el algoritmo durante el trazado. |

<div class="banner-node">

**Si el resultado obtenido no coincide con el esperado, existe un error que debe localizarse.**

</div>

### Plan de pruebas

Un plan de pruebas reúne los casos con los que se verificará la solución. Como mínimo incluye:

<div class="grid-2">

<div class="card accent-azul">
<strong>Caso normal</strong>
<p>Valores habituales del problema.</p>
</div>

<div class="card accent-dorado">
<strong>Caso límite</strong>
<p>Valores en el borde de las restricciones.</p>
</div>

</div>

| Caso | Entrada | Resultado esperado | Resultado obtenido | ¿Coincide? |
|---|---|---|---|---|

### Cómo se realiza un trazado

1. Registra el valor inicial de cada identificador.
2. Ejecuta las instrucciones **en orden**, una por una.
3. Después de cada instrucción que modifica un valor, anota el nuevo valor.
4. Determina qué se muestra al final.

Instrumento: ficha de trazado.

<div class="callout">

No ejecutes el algoritmo en una computadora: el trazado se realiza manualmente.

</div>

### Actividad guiada · Trazado de una secuencia de operaciones

**Ficha de trazado** · Algoritmo a analizar:

```text
Inicio
    REAL precio = 50
    ENTERO cantidad = 3
    REAL subtotal = precio * cantidad
    REAL descuento = 20
    REAL total = subtotal - descuento
    Mostrar total
Fin
```

**2. Trazado paso a paso**

| Paso | Instrucción | precio | cantidad | subtotal | descuento | total | Observación |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |

**3. Resultado de la ejecución:** ¿qué valor se muestra al finalizar? · **4. Explicación:** ¿qué hace el algoritmo?

### Cómo se depura

```text
Comportamiento esperado → Prueba → Localizar el error → Explicar la causa → Corregir → Volver a probar
```

No basta con indicar que algo está mal: se explica **qué ocurre**, **por qué ocurre** y **cómo se corrige**.

Instrumento: ficha de depuración.

### Actividad guiada · Corrección de tipos de datos

**Ficha de depuración · 1. Problema:** el algoritmo debe almacenar el nombre de un estudiante, su edad y su promedio.

```text
Inicio
    ENTERO nombreEstudiante = "Carlos"
    CADENA edad = 19
    ENTERO promedio = 87.5

    Mostrar nombreEstudiante
    Mostrar edad
    Mostrar promedio
Fin
```

| Sección de la ficha | Qué registramos |
|---|---|
| 4. Identificación del error | Instrucción donde se encuentra cada error y qué hace incorrectamente |
| 5. Corrección | Algoritmo corregido **sin modificar los valores** |
| 6. Verificación | ¿El algoritmo corregido almacena cada dato con el tipo adecuado? ☐ Sí ☐ No |

### Práctica · Trazado de intercambio de valores

```text
Inicio
    ENTERO primerValor = 15
    ENTERO segundoValor = 30
    ENTERO auxiliar = primerValor

    primerValor = segundoValor
    segundoValor = auxiliar

    Mostrar primerValor
    Mostrar segundoValor
Fin
```

Registra los valores de `primerValor`, `segundoValor` y `auxiliar` después de cada asignación y determina los valores mostrados.

Instrumento: ficha de trazado.

### Práctica · Corrección de una fórmula

El algoritmo debe calcular el área de un triángulo a partir de su base y su altura.

```text
Inicio
    REAL base = 10
    REAL altura = 6
    REAL area = base + altura
    Mostrar area
Fin
```

1. Identifica el error en el cálculo del área.
2. Corrige **únicamente** la instrucción que calcula `area`.
3. Realiza una prueba de escritorio. Resultado esperado: `area = 30`.

Instrumento: ficha de depuración.

### Prueba de escritorio y PSeInt

```text
Prueba de escritorio → Resultado obtenido (manual) → Traducción a PSeInt → Resultado obtenido (PSeInt) → Comparación
```

Ejemplo con la fórmula del área corregida (`area = (base * altura) / 2`):

| Verificación | Resultado esperado | Resultado obtenido |
|---|---|---|
| Prueba de escritorio | 30 | 30 |
| Ejecución en PSeInt | 30 | 30 |

<div class="callout-alerta">

PSeInt **no sustituye** la prueba de escritorio: en el perfil Flexible, una variable sin inicializar se muestra como 0 sin marcar error. El trazado manual permite ver **por qué** un resultado es incorrecto.

</div>

### Tareas del tema

| Tarea | Qué debes hacer |
|---|---|
| Trazado de operaciones acumuladas | Realizar el trazado de un algoritmo que acumula valores en `total` |
| Corrección del orden de operaciones | Localizar y corregir un error en el orden de las operaciones de un cálculo con impuesto |

- Instrumentos: ficha de trazado y ficha de depuración.
- Evidencia: ficha de trazado y ficha de depuración completas, realizadas **manualmente**. No se requiere PSeInt.
- Entrega: la fecha y el medio los indica el profesor.

<div class="callout-alcance">

Continúan las actividades de trazado y de depuración realizadas en clase.

</div>

### Cierre del tema

<div class="banner-node">

**Un algoritmo no está terminado hasta que el resultado obtenido coincide con el resultado esperado.**

</div>

**Siguiente tema:** 3.2.7 Documentación.

## Documentación — Etapa 3.2.7

### Propósito del tema

Documentar una solución de manera que **otra persona pueda comprenderla sin reconstruir el proceso desde cero**.

<div class="banner-node">

**Una solución que solo entiende quien la escribió es difícil de verificar, corregir y reutilizar.**

</div>

### Qué se documenta

<div class="grid-3">

<div class="card accent-azul">
<strong>Propósito</strong>
<p>Qué problema resuelve.</p>
</div>

<div class="card accent-dorado">
<strong>Entradas y salidas</strong>
<p>Qué recibe y qué produce, con su tipo.</p>
</div>

<div class="card accent-verde">
<strong>Variables y constantes</strong>
<p>Qué representa cada identificador.</p>
</div>

<div class="card accent-rojo">
<strong>Restricciones y supuestos</strong>
<p>Qué valores son válidos y qué se asumió.</p>
</div>

<div class="card accent-azul">
<strong>Fórmulas</strong>
<p>Qué relación matemática se utiliza.</p>
</div>

<div class="card accent-dorado">
<strong>Decisiones</strong>
<p>Por qué se eligió cada alternativa.</p>
</div>

</div>

### Supuesto y restricción

| Término | Definición | Ejemplo |
|---|---|---|
| Restricción | Condición que limita los valores o situaciones válidas del problema. | La cantidad debe ser un número entero mayor que cero. |
| Supuesto | Decisión tomada cuando el enunciado no proporciona explícitamente cierta información. | Se asume que el número de estudiantes será un entero positivo. |

<div class="callout">

Los supuestos deben documentarse cuando puedan afectar la solución.

</div>

### Ejemplo: documentar el promedio de tres calificaciones

Retomamos el promedio de tres calificaciones (tema Pseudocódigo).

| Elemento | Documentación |
|---|---|
| Propósito | Calcular el promedio de tres calificaciones de un estudiante. |
| Entradas | `calificacion1`, `calificacion2`, `calificacion3` (REAL) |
| Salida | `promedio` (REAL) |
| Constante | `NUMERO_CALIFICACIONES = 3`: cantidad de calificaciones que se promedian. |
| Restricción | Cada calificación está entre 0 y 100, inclusive. |
| Fórmula | Suma de las tres calificaciones dividida entre la cantidad de calificaciones. |
| Decisión | Se usa una constante para que el divisor tenga nombre y significado. |

### Práctica · Documentación de una solución

Documenta el algoritmo proporcionado que calcula el área de un triángulo utilizando la constante `MITAD`.

Completa: propósito, datos de entrada, resultado esperado, variables, constantes, supuestos, restricciones, fórmula y decisión de diseño.

<div class="callout">

Decisión de diseño que debes explicar: **¿por qué se utiliza la constante `MITAD` en lugar del valor 0.5 directamente en la expresión?**

</div>

Instrumento: propuesta algorítmica extendida · El profesor proporciona el algoritmo completo.

### Cierre del tema

<div class="banner-node">

**Documentar es dejar registro de qué hace la solución, con qué datos y por qué se tomó cada decisión.**

</div>

- Tarea: no se asigna tarea formal. El estudio de caso integrador reúne todas las etapas.

**Siguiente tema:** estudio de caso integrador.

## Estudio de caso integrador — 3.2 Etapas de la metodología

### Propósito del tema

Integrar las **siete etapas** de la metodología en una propuesta algorítmica completa.

```text
1. Descripción del problema
2. Análisis
3. Estrategia
4. Técnicas de análisis
5. Pseudocódigo
6. Pruebas y depuración
7. Documentación
```

### El caso

Una papelería desea automatizar el cálculo del importe de una compra de un solo producto.

| El usuario proporciona | El sistema calcula |
|---|---|
| Cantidad de unidades | Subtotal |
| Precio unitario | Importe del impuesto |
| Porcentaje de impuesto aplicable | Total a pagar |

<div class="callout-alcance">

Solo se requieren operaciones aritméticas: no se requieren estructuras condicionales ni repetitivas.

</div>

### Qué debe contener la propuesta

| Etapa | Evidencia |
|---|---|
| Descripción | Problema correctamente delimitado |
| Análisis | Entradas, salidas, datos conocidos y restricciones |
| Estrategia | Procedimiento seleccionado y justificado |
| Técnica de análisis | Descomposición del problema |
| Pseudocódigo | Algoritmo completo con la notación de la unidad |
| Pruebas | Al menos tres casos: normal, mínimo válido y diferente al normal |
| Verificación en PSeInt | Traducción del pseudocódigo y resultados obtenidos de los tres casos |
| Documentación | Supuestos, decisiones y resultados de las pruebas |

Instrumento: propuesta algorítmica extendida.

### Organización del trabajo

| Momento | Actividad (distribución de etapas sugerida) | Evidencia |
|---|---|---|
| Avance 1 | Aplicación integral de la metodología: etapas 1 a 4 | Avance del estudio de caso |
| Avance 2 | Aplicación integral de la metodología: etapas 5 y 6 | Avance del estudio de caso |
| Trabajo colaborativo | Etapa 7 y revisión | Estudio de caso |
| Retroalimentación | Revisión previa a la entrega | Cuestionario formativo |
| Entrega | Entrega y evaluación del estudio de caso | Estudio de caso (producto requerido) |

### Condición de cierre

El estudiante debe demostrar trazabilidad entre:

```text
Problema → Datos → Proceso → Algoritmo → Pruebas → Documentación
```

<div class="banner-node">

**El ejercicio está terminado cuando las siete etapas están completas y los casos de prueba demuestran que el pseudocódigo produce los resultados esperados.**

</div>

### Cierre de la Unidad III

<div class="grid-2">

<div class="card accent-azul">
<strong>Lo que construiste</strong>
<p>Un procedimiento para pasar de un problema a una solución algorítmica verificada y documentada.</p>
</div>

<div class="card accent-dorado">
<strong>Lo que sigue</strong>
<p>En la Unidad IV profundizarás en las estructuras secuenciales, condicionales y repetitivas, y aplicarás esta metodología para construir soluciones con ellas.</p>
</div>

</div>
