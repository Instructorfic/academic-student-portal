---
title: "8. Ciclo Mientras (4.3.1)"
description: "Unidad IV de Lógica de Programación — ciclo mientras, contenido 4.3.1."
---

## Lo que las condicionales no pudieron resolver

| Problema | Lo que pasó |
|---|---|
| Cifras de un número | Solo funcionaba con exactamente tres cifras |
| Validar el semestre | Si el dato era incorrecto, el algoritmo terminaba. No podía pedirlo otra vez |
| Cajero automático | Hacía una sola operación por ejecución |
| Cafetería | Cobra un pedido y termina. No puede atender un turno completo |
| Sumar las calificaciones de un grupo | Hay que escribir una entrada por alumno, y el tamaño del grupo cambia |

En todos los casos el algoritmo necesitaba **repetir** un bloque de instrucciones.

## ¿Qué es una estructura repetitiva?

Una estructura repetitiva (ciclo, *loop*) ejecuta un bloque de instrucciones **varias veces**, mientras una condición lo indique.

| Elemento | Qué es |
|---|---|
| **Cuerpo** | Las instrucciones que se repiten |
| **Iteración** | Cada ejecución del cuerpo |
| **Condición de control** | Decide si se repite otra vez |
| **Variable de control** | La variable de la que depende la condición |

**Supuesto:** algo dentro del cuerpo cambia la variable de control. Si nada la cambia, la condición nunca deja de cumplirse y el algoritmo no termina: es un **ciclo infinito**.

## Las tres partes de la variable de control

```text
i = 1                      // 1. inicialización: antes del ciclo
Mientras i <= 5 Hacer      // 2. evaluación: en la condición
    Mostrar i
    i = i + 1              // 3. actualización: dentro del cuerpo
FinMientras
```

| Falta | Consecuencia |
|---|---|
| Inicialización | La condición usa un valor indefinido (0 en PSeInt) |
| Actualización | Ciclo infinito: muestra 1 para siempre |
| Condición con `<` en lugar de `<=` | Una iteración menos: muestra del 1 al 4 |

## Tres ciclos, tres preguntas

| Ciclo | ¿Cuándo evalúa? | Mínimo de iteraciones | Pregunta que responde | Contenido |
|---|---|---|---|---|
| **Mientras** | Antes del cuerpo | 0 | ¿Repito mientras se cumpla algo? | 4.3.1 |
| **Repetir** | Después del cuerpo | 1 | ¿Repito hasta que se cumpla algo? | 4.3.2 |
| **Desde** | Antes, con un contador | 0 | ¿Repito un número conocido de veces? | 4.3.3 |

## Ciclo Mientras

```text
Mientras <condición> Hacer
    <instrucciones>
FinMientras
```

1. Se evalúa la condición.
2. Si es **verdadera**, se ejecuta el cuerpo y se vuelve al paso 1.
3. Si es **falsa**, el ciclo termina y se continúa después de `FinMientras`.

Como la condición se revisa **antes**, el cuerpo puede ejecutarse **cero veces**.

Se usa cuando el número de repeticiones **no se conoce** antes de empezar.

## Ejemplo: registro de gastos (0 para terminar)

```text
Inicio
    REAL gasto
    REAL total
    REAL mayor
    ENTERO cantidad

    total = 0
    cantidad = 0
    mayor = 0
    Mostrar "Gasto (0 para terminar): "
    Entrada: gasto
    Mientras gasto <> 0 Hacer
        total = total + gasto
        cantidad = cantidad + 1
        Si gasto > mayor Entonces
            mayor = gasto
        FinSi
        Mostrar "Gasto (0 para terminar): "
        Entrada: gasto
    FinMientras
    Mostrar "Total: $", total, " en ", cantidad, " gastos. Mayor: $", mayor
Fin
```

## Centinela y lectura previa

El usuario captura sus gastos uno por uno. Al final se muestran el total, el número de gastos y el gasto mayor.

El **0** es un **valor centinela**: no es un gasto, solo indica el final.

Por eso hay **dos** entradas:

- una **antes** del ciclo, para que la condición tenga un valor la primera vez
- otra al **final** del cuerpo, para leer el siguiente dato antes de volver a evaluar

| Iteración | `gasto` | `total` | `cantidad` | `mayor` |
|---|---:|---:|---:|---:|
| Antes del ciclo | 120 | 0 | 0 | 0 |
| 1 | 45.5 | 120 | 1 | 120 |
| 2 | 300 | 165.5 | 2 | 120 |
| 3 | 0 | 465.5 | 3 | 300 |
| Sale del ciclo | | | | |

Pantalla final: `Total: $465.5 en 3 gastos. Mayor: $300`

Si el primer dato es 0, el ciclo se ejecuta **cero veces**: total 0, cantidad 0.

## Registro de gastos: así se ve al ejecutarse

<img src="/imagenes/logica-programacion/unidad-04/unidad04_pantalla_gastos.svg" alt="Ventana de ejecución del registro de gastos. El mensaje Gasto (0 para terminar) aparece cuatro veces. El usuario escribe 120, 45.5, 300 y 0. Al final se muestra Total: $465.5 en 3 gastos. Mayor: $300" width="560">

El mismo mensaje aparece **cuatro veces** aunque en el pseudocódigo está escrito solo dos: una antes del ciclo y otra dentro, que se repite.

## Tres patrones que aparecen en todo ciclo

| Patrón | Antes del ciclo | Dentro del ciclo | En el ejemplo |
|---|---|---|---|
| **Contador** | `cantidad = 0` | `cantidad = cantidad + 1` | Cuántos gastos |
| **Acumulador** | `total = 0` | `total = total + gasto` | Cuánto se gastó |
| **Máximo** | `mayor = 0` | `Si gasto > mayor Entonces mayor = gasto` | El gasto mayor |

`mayor = 0` funciona porque los gastos son positivos. Si los datos pudieran ser negativos, habría que iniciar con el **primer dato** o con un valor imposible.

<div class="callout">

Un acumulador que se inicializa **dentro** del ciclo vuelve a cero en cada iteración y al final solo guarda el último dato.

</div>

## Ejemplo: las cifras de cualquier número

En el bloque 4.1 el algoritmo de las cifras solo servía para tres cifras. Con `Mientras` se separa una cifra en cada iteración, sin importar cuántas tenga.

```text
pendiente = numero
suma = 0
cifras = 0
Mientras pendiente > 0 Hacer
    suma = suma + pendiente % 10
    cifras = cifras + 1
    pendiente = trunc(pendiente / 10)
FinMientras
```

| `numero` | Iteraciones | `suma` | `cifras` |
|---:|---:|---:|---:|
| 472 | 3 | 13 | 3 |
| 85 | 2 | 13 | 2 |
| 1000 | 4 | 1 | 4 |
| 0 | 0 | 0 | 0 |

`pendiente` es una copia: si el ciclo modificara `numero`, al final ya no se podría mostrar el número original.

## Cifras de un número: diagrama

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_cifras.svg" alt="Diagrama de flujo de la suma de cifras. Después de leer numero e inicializar pendiente, suma y cifras, decisión pendiente > 0. Por Sí se suman la cifra, se cuenta y se quita la última cifra, y una línea regresa a la decisión. Por No se muestran la suma y las cifras" width="760">

**Limitación:** con 0 el algoritmo dice "0 cifras", aunque el 0 se escribe con una. El supuesto del ciclo (`pendiente > 0`) no cubre ese caso. Se puede corregir con una condicional antes del ciclo.

## Qué sigue

Continúa con [9. Ciclo Repetir](/materias/logica-programacion/unidad-04/09-repetir/).
