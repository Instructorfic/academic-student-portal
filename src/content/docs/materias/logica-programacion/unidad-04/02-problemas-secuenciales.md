---
title: "2. Resolución de problemas secuenciales (4.1.2)"
description: "Unidad IV de Lógica de Programación — resolución de problemas secuenciales, contenido 4.1.2."
---

## Propósito del tema

Al terminar este tema podrás:

- reconocer si un problema se puede resolver con una estructura secuencial
- identificar el patrón del problema: fórmula encadenada, porcentaje, cálculo inverso o descomposición
- usar división entera y residuo para descomponer una cantidad
- resolver el problema completo con la metodología de la Unidad III
- explicar qué supuesto deja de cumplirse cuando la secuencia ya no basta

## ¿Qué es una estructura secuencial?

Una estructura secuencial es un conjunto de instrucciones que se ejecutan **una sola vez cada una**, **en el orden en que están escritas**.

```text
 Inicio → Entrada → Proceso 1 → Proceso 2 → ... → Salida → Fin
```

**Supuesto:** el mismo procedimiento sirve para **cualquier** entrada válida. No hay que decidir nada ni repetir nada.

**Consecuencia:** si conoces las entradas, puedes predecir exactamente cada valor intermedio y la salida. Por eso la prueba de escritorio de una secuencia tiene una sola ruta.

## ¿Cuándo basta una secuencia?

Pregúntate antes de diseñar:

| Pregunta | Si la respuesta es sí |
|---|---|
| ¿El cálculo cambia según el valor de un dato? | Necesitas una **condicional** (bloque 4.2) |
| ¿Hay que revisar si el dato es válido? | Necesitas una **condicional** (bloque 4.2) |
| ¿Hay que procesar varios datos del mismo tipo, sin saber cuántos? | Necesitas una **repetitiva** (bloque 4.3) |
| Ninguna de las anteriores | Una **secuencia** es suficiente |

Ejemplo: "calcular el total de una compra de 3 productos" es secuencial. "Aplicar 10 % de descuento **solo si** el cliente es estudiante" ya no lo es.

## Cuatro patrones de problemas secuenciales

| Patrón | Idea | Ejemplo |
|---|---|---|
| **Fórmula encadenada** | Un resultado intermedio alimenta el siguiente cálculo | Recibo de luz |
| **Porcentaje** | Una parte se calcula como fracción de un total | Propina, IVA |
| **Cálculo inverso** | Se despeja un dato que normalmente es entrada | Precio sin IVA a partir del precio con IVA |
| **Descomposición** | Una cantidad se reparte en unidades mayores y un sobrante | Segundos en horas, minutos y segundos |

Reconocer el patrón te dice **qué operaciones** necesitas antes de escribir el pseudocódigo.

## Recibo de luz · Problema y análisis

Calcular el importe de un recibo de luz a partir de dos lecturas del medidor. El precio por kWh es fijo y se suma un cargo fijo por periodo.

*Los valores de la tarifa son ficticios, solo para el ejercicio.*

| Elemento | Contenido |
|---|---|
| Entradas | `lecturaAnterior`, `lecturaActual` (kWh, enteros) |
| Datos conocidos | `PRECIO_KWH = 1.10`, `CARGO_FIJO = 35.00` |
| Resultados | `consumo`, `importeEnergia`, `total` |
| Proceso | consumo → importe de energía → total (**fórmula encadenada**) |
| Restricción | `lecturaActual >= lecturaAnterior` |

## Recibo de luz · Pseudocódigo

```text
Inicio
    REAL PRECIO_KWH = 1.10
    REAL CARGO_FIJO = 35.00
    ENTERO lecturaAnterior
    ENTERO lecturaActual
    ENTERO consumo
    REAL importeEnergia
    REAL total

    Mostrar "Lectura anterior del medidor (kWh): "
    Entrada: lecturaAnterior
    Mostrar "Lectura actual del medidor (kWh): "
    Entrada: lecturaActual

    consumo = lecturaActual - lecturaAnterior
    importeEnergia = consumo * PRECIO_KWH
    total = importeEnergia + CARGO_FIJO

    Mostrar "Consumo del periodo: ", consumo, " kWh"
    Mostrar "Importe de energía: $", importeEnergia
    Mostrar "Cargo fijo: $", CARGO_FIJO
    Mostrar "Total a pagar: $", total
Fin
```

## Recibo de luz · La memoria paso a paso

<img src="/imagenes/logica-programacion/unidad-04/unidad04_memoria_pasos_recibo.svg" alt="Tres columnas con las siete celdas de memoria del recibo. Después de declarar solo las constantes tienen valor. Después de las entradas, lecturaAnterior 15230 y lecturaActual 15488. Después del proceso, consumo 258, importeEnergia 283.8 y total 318.8" width="760">

## Recibo de luz · Prueba de escritorio

| Caso | `lecturaAnterior` | `lecturaActual` | `consumo` | `importeEnergia` | `total` |
|---|---:|---:|---:|---:|---:|
| Normal | 15230 | 15488 | 258 | 283.8 | 318.8 |
| Límite (sin consumo) | 15488 | 15488 | 0 | 0 | 35 |

Pantalla del caso normal (después de las entradas):

```text
Consumo del periodo: 258 kWh
Importe de energía: $283.8
Cargo fijo: $35
Total a pagar: $318.8
```

**Supuesto que no se puede revisar aquí:** si el usuario invierte las lecturas, el consumo sale negativo (−258) y el total también. Detectarlo requiere una condicional.

## Recibo de luz · Así se ve al ejecutarse

<img src="/imagenes/logica-programacion/unidad-04/unidad04_pantalla_recibo.svg" alt="Ventana de ejecución del recibo de luz con las entradas 15230 y 15488 y el resultado Total a pagar: $318.8" width="560">

La pantalla esperada de tu prueba de escritorio debe coincidir con esta ventana, línea por línea.

## Repartir una cantidad en unidades mayores

¿Cuántas horas completas hay en 7385 segundos, y cuánto sobra?

```text
7385 ÷ 3600 = 2.0513...
```

Necesitamos dos operaciones distintas:

| Operación | Notación | Resultado | Significado |
|---|---|---|---|
| División entera | `trunc(7385 / 3600)` | 2 | Horas **completas** |
| Residuo | `7385 % 3600` | 185 | Segundos que **sobran** |

`trunc(x)` es otra **función predefinida**: elimina la parte decimal sin redondear. El residuo `%` ya lo conoces de la Unidad II.

Comprobación: `2 * 3600 + 185 = 7385`.

## trunc no es redon

Para obtener cantidades **completas** siempre se usa `trunc`:

| Segundos sobrantes | `x / 60` | `trunc(x / 60)` | `redon(x / 60)` |
|---:|---:|---:|---:|
| 185 | 3.08 | 3 | 3 |
| 170 | 2.83 | **2** | **3** (incorrecto) |

Con 170 segundos solo hay **2** minutos completos. `redon` diría 3, que es incorrecto.

**Limitación:** `trunc` de un número negativo elimina los decimales hacia el cero: `trunc(-2.5)` es `-2`. En estos problemas se supone que las cantidades no son negativas.

## Segundos a horas, minutos y segundos · Análisis

Un cronómetro registra la duración de una actividad en segundos. Mostrarla en horas, minutos y segundos.

| Elemento | Contenido |
|---|---|
| Entrada | `totalSegundos` (entero, no negativo) |
| Datos conocidos | `SEGUNDOS_HORA = 3600`, `SEGUNDOS_MINUTO = 60` |
| Resultados | `horas`, `minutos`, `segundos` |
| Proceso | **Descomposición**: primero las horas, después con lo que sobra los minutos, al final los segundos |

Estrategia: cada paso trabaja con **lo que sobró** del paso anterior. Por eso se guarda el residuo en una variable intermedia `resto`.

## Segundos a horas, minutos y segundos · Pseudocódigo

```text
Inicio
    ENTERO SEGUNDOS_HORA = 3600
    ENTERO SEGUNDOS_MINUTO = 60
    ENTERO totalSegundos
    ENTERO horas
    ENTERO minutos
    ENTERO segundos
    ENTERO resto

    Mostrar "Duración en segundos: "
    Entrada: totalSegundos

    horas = trunc(totalSegundos / SEGUNDOS_HORA)
    resto = totalSegundos % SEGUNDOS_HORA
    minutos = trunc(resto / SEGUNDOS_MINUTO)
    segundos = resto % SEGUNDOS_MINUTO

    Mostrar totalSegundos, " s equivalen a ", horas, " h ", minutos, " min ", segundos, " s"
Fin
```

## Segundos a horas, minutos y segundos · Diagrama de flujo

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_segundos.svg" alt="Diagrama de flujo de la conversión de segundos. Primera columna: Inicio, proceso con las constantes SEGUNDOS_HORA = 3600 y SEGUNDOS_MINUTO = 60, Mostrar Duración en segundos, Entrada totalSegundos, conector A. Segunda columna: conector A, proceso horas = trunc(totalSegundos / SEGUNDOS_HORA), proceso resto = totalSegundos % SEGUNDOS_HORA, proceso minutos = trunc(resto / SEGUNDOS_MINUTO), proceso segundos = resto % SEGUNDOS_MINUTO, Mostrar el resultado, Fin" width="860">

Un diagrama secuencial tiene **una sola ruta** de Inicio a Fin, sin decisiones.

## Segundos a horas, minutos y segundos · Prueba de escritorio

| Caso | `totalSegundos` | `horas` | `resto` | `minutos` | `segundos` |
|---|---:|---:|---:|---:|---:|
| Normal | 7385 | 2 | 185 | 3 | 5 |
| Menos de un minuto | 59 | 0 | 59 | 0 | 59 |
| Exactamente una hora | 3600 | 1 | 0 | 0 | 0 |
| Un día menos un segundo | 86399 | 23 | 3599 | 59 | 59 |

Pantalla del caso normal:

```text
7385 s equivalen a 2 h 3 min 5 s
```

Los casos límite se eligen **en las fronteras** de cada unidad: justo antes de un minuto, justo en una hora.

## El mismo patrón, otros problemas

La descomposición con `trunc` y `%` aparece cada vez que una cantidad se reparte en unidades de distinto tamaño:

| Problema | Unidades |
|---|---|
| Duración de una película | horas, minutos |
| Peso de un paquete en gramos | kilogramos, gramos |
| Centímetros a medidas de obra | metros, centímetros |
| Cifras de un número | centenas, decenas, unidades |
| Cambio de una compra | billetes y monedas |

Lo que cambia es el **tamaño de cada unidad**, no el procedimiento.

## Actividad guiada · Dividir la cuenta

Un grupo de amigos va a cenar. Quieren dividir la cuenta en partes iguales, incluyendo una propina expresada en porcentaje.

Construimos juntos la hoja de trabajo:

1. Análisis: entradas, datos conocidos, resultados, patrón del problema
2. Diseño de los datos y tipos (¿la cantidad de personas es `REAL` o `ENTERO`?)
3. Pseudocódigo con mensajes de solicitud y salida legible
4. Prueba con los casos:

| Caso | Cuenta | Propina | Personas | Resultado esperado por persona |
|---|---:|---:|---:|---:|
| Normal | 1240 | 10 % | 4 | 341 |
| Con decimales | 1000 | 15 % | 3 | ? |

## Actividad guiada · Un centavo perdido

En el caso con decimales, cada persona paga `1150 / 3 = 383.333...`

Si se redondea a centavos, cada persona paga **383.33**.

```text
383.33 * 3 = 1149.99
```

Falta **un centavo** para completar la cuenta.

- ¿Es un error del algoritmo o una consecuencia del redondeo?
- ¿Qué tendría que hacer el algoritmo para que una persona pague 383.34?
- ¿Se puede resolver solo con una secuencia?

Discute con tu equipo y anota la conclusión.

## Práctica · Cifras de un número

Desarrolla un algoritmo que reciba un número entero de **tres cifras** y muestre:

- su cifra de las centenas, de las decenas y de las unidades
- la suma de sus cifras
- el número con las cifras en orden inverso

| Caso | Número | Centenas | Decenas | Unidades | Suma | Inverso |
|---|---:|---:|---:|---:|---:|---:|
| Normal | 472 | 4 | 7 | 2 | 13 | 274 |
| Límite | 100 | | | | | |

Pista: la cifra de las unidades es lo que sobra al dividir entre 10.

**Producto:** hoja de trabajo completa, diagrama de flujo y traducción a PSeInt ejecutada con los dos casos.

## Práctica · ¿Qué pasa si se rompe el supuesto?

Ejecuta tu algoritmo con el número **85**, que solo tiene dos cifras.

1. ¿Qué cifras muestra? ¿Qué número inverso muestra?
2. ¿El resultado es incorrecto, o es correcto para un problema distinto?
3. ¿Qué tendría que **decidir** el algoritmo para manejar números de dos cifras?

<div class="callout">

Una secuencia funciona mientras se cumplan sus supuestos. Cuando el algoritmo necesita revisar un supuesto y actuar distinto según el resultado, necesita una **estructura condicional**.

</div>

## Revisión del tema

Para cada problema, indica si se resuelve con una secuencia y, si es así, qué patrón utiliza:

| Problema | ¿Secuencia? | Patrón o estructura necesaria |
|---|---|---|
| Convertir una distancia en kilómetros a millas | | |
| Calcular cuántas cajas de 12 piezas se llenan con un pedido y cuántas piezas sobran | | |
| Indicar si un año es bisiesto | | |
| Calcular el precio antes de un descuento conocido a partir del precio final | | |
| Sumar las calificaciones de un grupo cuyo tamaño no se conoce | | |

## Tareas del tema

| Tarea | Qué debes resolver | Patrón |
|---|---|---|
| **Desglose del cambio** | Calcular el cambio de una compra e indicar cuántos billetes y monedas de cada denominación se entregan | Descomposición |
| **Hora de llegada** | Calcular la hora de llegada de un autobús a partir de la hora de salida y la duración del viaje | Descomposición |

Cada tarea se entrega con su hoja de trabajo, prueba de escritorio y ejecución en PSeInt.

Las instrucciones completas están en la hoja de cada tarea: consulta las [tareas de la unidad](/materias/logica-programacion/unidad-04/tareas/).

## Criterios con los que se revisarán las tareas

- [ ] El análisis identifica entradas, datos conocidos, resultados, patrón y restricciones.
- [ ] Cada entrada tiene un mensaje de solicitud.
- [ ] Se usa `trunc` para cantidades completas y `%` para lo que sobra.
- [ ] La salida tiene etiqueta y unidad en cada valor.
- [ ] La prueba de escritorio incluye el caso normal y los casos límite pedidos.
- [ ] La pantalla obtenida en PSeInt coincide con la pantalla esperada.

## Relación con el Laboratorio 01

En el **Laboratorio 01 · Ticket de un pedido** aplicarás lo que viste en el bloque 4.1 al caso de la Cafetería El Byte:

- entrada de las cantidades de un pedido
- cálculo encadenado del total
- cálculo inverso del IVA incluido
- pago y cambio
- un ticket legible en pantalla

Las instrucciones, los datos de prueba y la forma de entrega están en la [guía del Laboratorio 01](/materias/logica-programacion/unidad-04/laboratorios/laboratorio-1-ticket-cafeteria/).

## Síntesis del bloque 4.1

```text
ENTRADA                    PROCESO                         SALIDA
mensaje de solicitud  →    fórmula encadenada         →    etiqueta + valor + unidad
tipo según el uso          porcentaje                      en el orden que se necesita
                           cálculo inverso
                           descomposición (trunc, %)
```

Una estructura secuencial resuelve un problema cuando el **mismo procedimiento** sirve para todas las entradas válidas.

Cuando aparece un **"solo si"** o un **"depende de"**, la secuencia ya no basta.

## Qué sigue

Continúa con [3. Condicional simple](/materias/logica-programacion/unidad-04/03-condicional-simple/).
