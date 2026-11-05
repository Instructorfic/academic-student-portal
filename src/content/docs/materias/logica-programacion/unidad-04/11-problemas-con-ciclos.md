---
title: "11. Resolución de problemas con ciclos (4.3.5)"
description: "Unidad IV de Lógica de Programación — resolución de problemas con ciclos, contenido 4.3.5."
---

## ¿Qué ciclo uso?

| Pregunta | Si la respuesta es sí |
|---|---|
| ¿Sé cuántas veces se repite **antes** de empezar? | `Desde` |
| ¿Debe ejecutarse **al menos una vez** (pedir un dato, mostrar un menú)? | `Repetir` |
| ¿Puede no ejecutarse **ninguna** vez (datos hasta un centinela, condición que puede ser falsa desde el inicio)? | `Mientras` |

Cualquier ciclo puede escribirse con `Mientras`. Elegir el adecuado hace el algoritmo **más claro** y evita errores de inicialización.

## Plan de pruebas para ciclos

Además de las rutas y las fronteras del bloque 4.2, un ciclo se prueba con:

| Caso | Por qué |
|---|---|
| **Cero** iteraciones | Revela divisiones entre cero y variables sin valor |
| **Una** iteración | Revela errores de inicialización de máximos y mínimos |
| **Varias** iteraciones | El caso normal |
| La **última** iteración | Revela errores de `<` frente a `<=` |

La prueba de escritorio de un ciclo se registra **una fila por iteración**, con el valor de cada variable al final de esa iteración.

## Ejemplo resuelto: ¿es primo?

Un número es primo si es mayor que 1 y solo es divisible entre 1 y entre sí mismo.

```text
esPrimo = VERDADERO
Si numero < 2 Entonces
    esPrimo = FALSO
FinSi
divisor = 2
Mientras divisor * divisor <= numero Y esPrimo = VERDADERO Hacer
    Si numero % divisor = 0 Entonces
        esPrimo = FALSO
    FinSi
    divisor = divisor + 1
FinMientras
```

- `esPrimo` es una **bandera**: empieza en `VERDADERO` y cambia si se encuentra un divisor.
- Basta revisar hasta `divisor * divisor <= numero`: si 25 tuviera un divisor mayor que 5, también tendría uno menor que 5.
- La condición `esPrimo = VERDADERO` detiene el ciclo en cuanto se encuentra un divisor.

## ¿Es primo?: plan de pruebas

| `numero` | Divisores revisados | Iteraciones | Resultado |
|---:|---|---:|---|
| 1 | Ninguno | 0 | No es primo |
| 2 | Ninguno (`4 <= 2` es falso) | 0 | Primo |
| 9 | 2, 3 | 2 | No es primo |
| 17 | 2, 3, 4 | 3 | Primo |
| 25 | 2, 3, 4, 5 | 4 | No es primo |

El 2 prueba el caso de **cero iteraciones** con resultado positivo. El 25 prueba la **última** iteración (`5 * 5 <= 25`).

## Práctica · Factorial

El factorial de `n` (se escribe `n!`) es el producto de 1 × 2 × … × `n`. Por definición, `0! = 1`.

1. ¿Qué ciclo conviene? ¿Qué valor inicial necesita el acumulador?
2. Desarrolla el algoritmo con validación de que `n` no sea negativo.
3. Pruébalo:

| `n` | `n!` |
|---:|---:|
| 0 | 1 |
| 1 | 1 |
| 5 | 120 |
| 10 | 3628800 |

**Producto:** pseudocódigo, prueba de escritorio de `n = 5` (una fila por iteración) y ejecución en PSeInt.

## Práctica · Trazado de un ciclo

```text
suma = 0
Desde i = 1 Hasta n Con Paso 2 Hacer
    suma = suma + i
FinDesde
Mostrar suma
```

1. Haz el trazado completo con `n = 9`: una fila por iteración con `i` y `suma`.
2. ¿Qué muestra con `n = 10`? ¿Por qué no se suma el 11?
3. ¿Qué muestra con `n = 0`? ¿Cuántas iteraciones hay?
4. Describe en una frase qué calcula el algoritmo.

**Producto:** ficha de trazado.

## Práctica · Depuración de ciclos

El algoritmo debería calcular el promedio de `n` temperaturas. Tiene **cuatro errores**.

```text
Inicio
    ENTERO n
    ENTERO i
    REAL temperatura
    REAL suma
    REAL promedio
    Mostrar "Número de lecturas: "
    Entrada: n
    i = 1
    Mientras i < n Hacer
        suma = 0
        Mostrar "Temperatura ", i, ": "
        Entrada: temperatura
        suma = suma + temperatura
    FinMientras
    promedio = suma / n
    Mostrar "Promedio: ", promedio
Fin
```

**Producto:** ficha de depuración, algoritmo corregido y plan de pruebas con 0, 1 y 3 lecturas.

## Errores frecuentes con ciclos

| Error | Consecuencia |
|---|---|
| Falta la actualización de la variable de control | Ciclo infinito |
| `<` en lugar de `<=` | Una iteración de menos |
| Acumulador o contador inicializado dentro del ciclo | Solo conserva el último dato |
| Acumulador de producto iniciado en 0 | El resultado siempre es 0 |
| Condición de `Repetir` escrita como si fuera de `Mientras` | El ciclo termina en cuanto el dato es **inválido** |
| Centinela sin lectura previa | La primera evaluación usa un valor indefinido |
| Centinela procesado como dato | El 0 se cuenta como un gasto más |
| Dividir entre el contador sin revisar que sea mayor que 0 | División entre cero cuando no hubo datos |

## Tareas del bloque 4.3

| Tarea | Qué debes resolver | Estructuras |
|---|---|---|
| **Ventas de la semana** | Capturar la venta de cada día de la semana y mostrar el total, el promedio, el mejor día con su nombre y cuántos días no hubo ventas | `Desde`, `Repetir` para validar, `Segun` |
| **Número inverso y palíndromo** | Invertir las cifras de un entero de cualquier tamaño e indicar si se lee igual al revés | `Mientras`, `Repetir` para validar |

Cada tarea se entrega con hoja de trabajo, diagrama de flujo, prueba de escritorio por iteración, plan de pruebas (cero, una y varias iteraciones) y ejecución en PSeInt.

Las instrucciones completas están en la hoja de cada tarea: consulta las [tareas de la unidad](/materias/logica-programacion/unidad-04/tareas/).

## Relación con el Laboratorio 03

En el **Laboratorio 03 · Cierre de caja** la Cafetería El Byte atiende un turno completo:

- cobrar varios pedidos en una sola ejecución
- volver a pedir un tipo de cliente o una forma de pago inválidos
- al final del turno, mostrar el total vendido, el número de pedidos cobrados, el ticket promedio y el pedido mayor

Partirás del programa del Laboratorio 02. Las instrucciones y los datos de prueba están en la [guía del Laboratorio 03](/materias/logica-programacion/unidad-04/laboratorios/laboratorio-3-cierre-de-caja/).

## Síntesis del bloque 4.3

| Situación | Ciclo |
|---|---|
| Número de repeticiones conocido antes de empezar | `Desde` |
| Al menos una vez: validar, menú | `Repetir` |
| Puede ser ninguna vez: centinela, condición inicial | `Mientras` |

| Patrón | Se inicializa | Se actualiza |
|---|---|---|
| Contador | En 0, antes del ciclo | `+ 1` dentro |
| Acumulador | En 0 (suma) o en 1 (producto), antes | Con cada dato, dentro |
| Máximo, mínimo | Con un valor imposible o con el primer dato | Con una condicional simple, dentro |
| Bandera | En `VERDADERO` o `FALSO`, antes | Cuando se cumple la condición buscada |

Un ciclo se prueba con **cero, una y varias** iteraciones.

## Qué sigue

Continúa con [12. Proyecto integrador y cierre](/materias/logica-programacion/unidad-04/12-proyecto-y-cierre/).
