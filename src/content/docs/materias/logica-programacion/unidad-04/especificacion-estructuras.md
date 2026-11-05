---
title: "Especificación de estructuras algorítmicas"
description: "Unidad IV de Lógica de Programación — notación, diagrama de flujo y traducción a PSeInt de las estructuras secuenciales, condicionales y repetitivas."
---

Este documento define cómo se escriben, se dibujan y se traducen a PSeInt las estructuras de la Unidad IV. Amplía la [especificación de pseudocódigo de la Unidad III](/materias/logica-programacion/unidad-03/especificacion-pseudocodigo/) sin modificar lo que ya define.

## 1. Propósito

Este documento define cómo se escriben, se dibujan y se traducen a PSeInt las estructuras de la Unidad IV. La notación de la Unidad III (tipos, identificadores, `Entrada:`, `Mostrar`, `=`, comentarios) se conserva tal cual.

---

## 2. Resumen de la notación

| Estructura | Pseudocódigo de la materia | PSeInt (perfil Flexible) | Diagrama de flujo |
|---|---|---|---|
| División entera | `trunc(x)` | `trunc(x)` | Dentro de un proceso |
| Redondeo | `redon(x)` | `redon(x)` | Dentro de un proceso |
| Residuo | `a % b` | `a % b` | Dentro de un proceso |
| Condicional simple | `Si … Entonces … FinSi` | `Si … Entonces … FinSi` | Rombo, rama "No" sin instrucciones |
| Condicional doble | `Si … Entonces … Sino … FinSi` | `Si … Entonces … SiNo … FinSi` | Rombo con dos ramas |
| Condicional encadenada | `Si … Sino Si … Sino … FinSi` | `Si` anidados dentro de cada `SiNo` (sección 6.3) | Rombos en cascada por la rama "No" |
| Condicional múltiple | `Segun <variable> Hacer … De Otro Modo: … FinSegun` | `Segun <variable> Hacer … De Otro Modo: … FinSegun` | Rombo con una salida por valor |
| Condicional anidada | `Si` dentro de otro `Si` | Igual | Rombo dentro de una rama |
| Mientras | `Mientras … Hacer … FinMientras` | Igual | Rombo con regreso (sección 9.8) |
| Repetir | `Repetir … Hasta Que …` | Igual | Cuerpo y rombo con regreso (sección 9.8) |
| Desde | `Desde i = a Hasta b Con Paso p Hacer … FinDesde` | `Para i = a Hasta b Con Paso p Hacer … FinPara` | Equivalencia con Mientras (sección 9.8) |

PSeInt no distingue mayúsculas de minúsculas en las palabras clave: `Sino` y `SiNo` son equivalentes (verificado en la Unidad III con PSeInt 20240122).

---

## 3. Funciones predefinidas

Una **función predefinida** es una operación que ya existe y que se usa escribiendo su nombre y, entre paréntesis, el valor sobre el que actúa. Su resultado puede formar parte de cualquier expresión.

| Función | Qué devuelve | Ejemplo | Resultado |
|---|---|---|---|
| `trunc(x)` | La parte entera de `x`, sin redondear | `trunc(7385 / 3600)` | `2` |
| `redon(x)` | El entero más cercano a `x` | `redon(2.5)` | `3` (pendiente de verificación en PSeInt: regla de desempate en .5) |
| `abs(x)` | El valor absoluto | `abs(-12)` | `12` |

Reglas:

- Para contar unidades **completas** se usa `trunc`, nunca `redon`.
- Para redondear un importe a centavos: `redon(x * 100) / 100`.
- `trunc` de un negativo se acerca al cero: `trunc(-2.5)` es `-2`.
- Estos nombres ya están prohibidos como identificadores ([especificación de pseudocódigo](/materias/logica-programacion/unidad-03/especificacion-pseudocodigo/), sección 4.1).

---

## 4. Condiciones

Una condición es una expresión lógica (Unidad II) que vale `VERDADERO` o `FALSO`.

| Elemento | Notación | Ejemplo |
|---|---|---|
| Relacionales | `=`, `<>`, `<`, `>`, `<=`, `>=` | `subtotal < 300` |
| Conjunción | `Y` | `semestre >= 1 Y semestre <= 10` |
| Disyunción | `O` | `edad < 0 O edad > 120` |
| Negación | `NO` | `NO (opcion = 3)` |

Reglas:

- Un rango se escribe con dos comparaciones unidas por `Y`. `1 <= semestre <= 10` **no** es válido.
- Dentro de una condición, `=` compara ([traducción a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/), sección 11.3).
- Se recomiendan paréntesis cuando se mezclan `Y` y `O`: `(a % 4 = 0 Y a % 100 <> 0) O a % 400 = 0`.
- Se prefieren códigos numéricos (`1` efectivo, `2` tarjeta) frente a respuestas de texto (`"S"`, `"s"`, `"si"`) para evitar diferencias de mayúsculas. Pendiente de verificación: si PSeInt distingue mayúsculas al comparar cadenas.

---

## 5. Condicional simple y doble

### 5.1 Simple

```text
Si <condición> Entonces
    <instrucciones>
FinSi
```

Si la condición es falsa, no se ejecuta nada y el algoritmo continúa después de `FinSi`. Patrón frecuente: **valor por omisión + condicional simple**.

```text
total = subtotal
Si subtotal < MINIMO_ENVIO_GRATIS Entonces
    total = total + COSTO_ENVIO
FinSi
```

### 5.2 Doble

```text
Si <condición> Entonces
    <instrucciones si es verdadera>
Sino
    <instrucciones si es falsa>
FinSi
```

Se ejecuta **exactamente una** de las dos ramas.

### 5.3 Indentación

Cada nivel de estructura agrega cuatro espacios. `Si`, `Sino` y `FinSi` van alineados.

---

## 6. Condicional encadenada y condicional múltiple

### 6.1 Condicional encadenada (`Sino Si`)

Se utiliza cuando la alternativa depende de **rangos** o de condiciones distintas que se revisan en orden.

```text
Si peso <= 0 Entonces
    Mostrar "Peso no válido"
Sino Si peso <= 1 Entonces
    tarifa = TARIFA_HASTA_1KG
Sino Si peso <= 5 Entonces
    tarifa = TARIFA_HASTA_5KG
Sino
    tarifa = TARIFA_MAS_5KG
FinSi
```

Reglas:

- Las condiciones se evalúan **de arriba hacia abajo** y se ejecuta solo la primera verdadera.
- El orden importa: cada condición supone que las anteriores fueron falsas.
- Un solo `FinSi` cierra toda la cadena.

### 6.2 Condicional múltiple (`Segun`) — contenido oficial 4.2.3

Se utiliza cuando la alternativa depende del **valor exacto** de una variable entera o de un carácter.

```text
Segun opcion Hacer
    1:
        Mostrar "Saldo disponible: $", saldo
    2:
        Mostrar "Monto a depositar: "
        Entrada: monto
        saldo = saldo + monto
    3, 4:
        Mostrar "Opción en mantenimiento"
    De Otro Modo:
        Mostrar "Opción no válida"
FinSegun
```

Reglas:

- Cada caso es un valor (o varios separados por comas) seguido de `:`. Sus instrucciones van debajo con un nivel más de indentación.
- Si el caso tiene **una sola** instrucción, puede escribirse en la misma línea: `1: Mostrar "Ventas"`.
- `De Otro Modo:` es obligatorio en la materia. Atiende cualquier valor no previsto.
- No se usan rangos ni condiciones en los casos (`opcion > 3:` no es válido). Para rangos se usa la condicional encadenada.

### 6.3 Traducción de la condicional encadenada a PSeInt

Pendiente de verificación: PSeInt no tiene una instrucción `Sino Si` en una sola línea. La traducción anida un `Si` dentro de cada `SiNo` y agrega un `FinSi` por cada `Si`:

```text
Si peso <= 0 Entonces
    Escribir "Peso no válido"
SiNo
    Si peso <= 1 Entonces
        tarifa = TARIFA_HASTA_1KG
    SiNo
        Si peso <= 5 Entonces
            tarifa = TARIFA_HASTA_5KG
        SiNo
            tarifa = TARIFA_MAS_5KG
        FinSi
    FinSi
FinSi
```

La lógica no cambia. Por eso se dice que una cadena `Sino Si` es una forma compacta de escribir condicionales anidadas en la rama falsa.

### 6.4 ¿Encadenada o múltiple?

| Situación | Estructura |
|---|---|
| Opción de un menú, código de producto, día de la semana | Múltiple (`Segun`) |
| Rangos de peso, de consumo, de calificación | Encadenada (`Sino Si`) |
| Condiciones sobre variables distintas | Encadenada o anidada |

---

## 7. Condicional anidada — contenido oficial 4.2.4

Una condicional anidada es una condicional escrita **dentro de una rama** de otra. La condición interior solo se evalúa si la exterior llevó a esa rama.

```text
Si monto <= saldo Entonces
    Si monto % 100 = 0 Entonces
        saldo = saldo - monto
        Mostrar "Retire su efectivo"
    Sino
        Mostrar "Solo se entregan billetes de $100"
    FinSi
Sino
    Mostrar "Saldo insuficiente"
FinSi
```

Reglas:

- Se anida cuando la segunda decisión **depende** de la primera o cuando cada falla necesita una respuesta distinta.
- Si dos condiciones llevan a la misma acción y no importa cuál falló, se prefiere una condición compuesta con `Y`.
- Más de tres niveles de anidamiento es señal de que conviene reorganizar el algoritmo.

---

## 8. Diagrama de flujo de las condicionales

Se conservan los símbolos de la [especificación de diagramas de flujo](/materias/logica-programacion/unidad-03/especificacion-diagramas-flujo/). Para las decisiones:

- El rombo contiene **solo la condición**, sin `Si` ni `Entonces`: `subtotal < MINIMO_ENVIO_GRATIS`.
- Cada salida del rombo lleva su etiqueta: **Sí** / **No**.
- Las ramas se vuelven a unir en un solo punto antes de la siguiente instrucción.
- Condicional simple: la rama **No** va directa al punto de unión.
- Condicional múltiple: un rombo con la variable (`opcion`) y una salida etiquetada por cada valor, más una salida **De otro modo**.

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_envio.svg" alt="Diagrama de flujo de una condicional simple: envío gratis" width="700">

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_lecturas.svg" alt="Diagrama de flujo de una condicional doble: recibo de luz con validación" width="900">

---

## 9. Estructuras repetitivas — contenidos oficiales 4.3.1 a 4.3.3

### 9.1 Elementos de todo ciclo

| Elemento | Qué es | Ejemplo |
|---|---|---|
| Cuerpo | Instrucciones que se repiten | `suma = suma + calificacion` |
| Iteración | Cada ejecución del cuerpo | La tercera vuelta del ciclo |
| Condición de control | Decide si se repite otra vez | `pendiente > 0` |
| Variable de control | Variable de la que depende la condición | `pendiente`, `i`, `opcion` |

La variable de control necesita tres momentos: **inicialización** (antes del ciclo), **evaluación** (en la condición) y **actualización** (dentro del cuerpo). Si falta la actualización, el ciclo no termina (**ciclo infinito**).

### 9.2 Mientras (4.3.1)

```text
Mientras <condición> Hacer
    <instrucciones>
FinMientras
```

- La condición se evalúa **antes** de cada iteración. Si es falsa desde el principio, el cuerpo se ejecuta **cero veces**.
- El ciclo continúa **mientras** la condición sea verdadera.
- Uso típico: número de repeticiones desconocido. Por ejemplo, procesar datos hasta un **valor centinela** (un valor que indica el fin, como 0).
- Con centinela se usa **lectura previa**: un dato se lee antes del ciclo y el siguiente al final del cuerpo.

### 9.3 Repetir (4.3.2)

```text
Repetir
    <instrucciones>
Hasta Que <condición>
```

- La condición se evalúa **después** de cada iteración: el cuerpo se ejecuta **al menos una vez**.
- El ciclo **termina** cuando la condición es verdadera (lógica inversa a `Mientras`).
- Uso típico: validar una entrada y repetir un menú hasta elegir "Salir".

### 9.4 Desde (4.3.3)

```text
Desde i = <inicio> Hasta <fin> Con Paso <paso> Hacer
    <instrucciones>
FinDesde
```

- Se usa cuando el número de repeticiones se conoce **antes** de empezar el ciclo (un valor fijo o un dato ya leído).
- `i` toma el valor de inicio y aumenta `paso` al final de cada iteración. Con paso positivo, el ciclo se ejecuta mientras `i <= fin`.
- `Con Paso 1` es obligatorio en la materia, aunque PSeInt lo suponga, para que el paso siempre quede explícito.
- Paso negativo para contar hacia atrás: `Desde i = 10 Hasta 1 Con Paso -1 Hacer`.
- No se modifica `i` dentro del cuerpo.
- Equivalencia con `Mientras`:

```text
i = inicio
Mientras i <= fin Hacer
    <instrucciones>
    i = i + paso
FinMientras
```

### 9.5 Patrones con ciclos

| Patrón | Inicialización (antes del ciclo) | Dentro del ciclo |
|---|---|---|
| Contador | `contador = 0` | `contador = contador + 1` |
| Acumulador de suma | `suma = 0` | `suma = suma + dato` |
| Acumulador de producto | `producto = 1` | `producto = producto * dato` |
| Máximo | `mayor = <valor menor que cualquier dato>` o el primer dato | `Si dato > mayor Entonces mayor = dato FinSi` |
| Mínimo | `menor = <valor mayor que cualquier dato>` o el primer dato | `Si dato < menor Entonces menor = dato FinSi` |
| Bandera | `encontrado = FALSO` | `Si <condición> Entonces encontrado = VERDADERO FinSi` |

Un acumulador inicializado **dentro** del ciclo se reinicia en cada iteración. Es un error frecuente.

### 9.6 ¿Qué ciclo usar?

| Situación | Ciclo |
|---|---|
| Se sabe cuántas veces antes de empezar | `Desde` |
| No se sabe cuántas veces, y puede ser ninguna | `Mientras` |
| No se sabe cuántas veces, pero al menos una | `Repetir` |

### 9.7 Traducción a PSeInt

| Pseudocódigo | PSeInt |
|---|---|
| `Mientras … Hacer … FinMientras` | Igual |
| `Repetir … Hasta Que …` | Igual |
| `Desde i = 1 Hasta n Con Paso 1 Hacer … FinDesde` | `Para i = 1 Hasta n Con Paso 1 Hacer … FinPara` |

Pendiente de verificación: que el perfil Flexible acepte `=` en `Para i = 1` (la sintaxis documentada de PSeInt usa `Para i <- 1`). Si no lo acepta, la traducción de `Desde` será la única excepción a la regla de asignar con `=` y se escribirá con `<-`.

### 9.8 Diagrama de flujo de los ciclos

- **Mientras:** rombo con la condición. La rama **Sí** entra al cuerpo y una línea regresa **al rombo**. La rama **No** sale del ciclo.
- **Repetir:** el cuerpo va primero. Después, un rombo con la condición de `Hasta Que`: la rama **No** regresa al inicio del cuerpo y la rama **Sí** sale.
- **Desde:** se dibuja con su equivalencia en `Mientras`: un proceso de inicialización (`i = 1`), el rombo (`i <= n`), el cuerpo, un proceso de actualización (`i = i + 1`) y el regreso al rombo.

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_cifras.svg" alt="Diagrama de flujo de un ciclo Mientras: suma de cifras" width="760">

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_validacion.svg" alt="Diagrama de flujo de un ciclo Repetir: validación del semestre" width="520">
