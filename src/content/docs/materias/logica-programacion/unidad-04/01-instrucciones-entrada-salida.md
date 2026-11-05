---
title: "1. Instrucciones de entrada/salida (4.1.1)"
description: "Unidad IV de Lógica de Programación — instrucciones de entrada/salida, contenido 4.1.1."
---

## Propósito del tema

Al terminar este tema podrás:

- explicar qué ocurre en la memoria cuando se ejecuta una entrada y cuando se ejecuta una salida
- escribir mensajes de solicitud que indiquen exactamente qué dato se espera
- diseñar una salida legible que combine texto, valores y unidades
- anticipar la **pantalla esperada** de un algoritmo antes de ejecutarlo
- detectar los errores más frecuentes de entrada y salida

## ¿Qué problema resuelven?

Un algoritmo sin entrada resuelve siempre **el mismo caso**:

```text
Inicio
    REAL base = 8
    REAL altura = 5
    REAL area
    area = (base * altura) / 2
Fin
```

Calcula 20 y nadie lo ve. Le faltan dos cosas:

- **entrada**: que el usuario decida los valores, para que sirva con cualquier triángulo
- **salida**: que el resultado llegue a quien lo necesita

La entrada y la salida son la frontera entre el algoritmo y la persona que lo usa.

## El modelo: usuario, memoria y pantalla

<img src="/imagenes/logica-programacion/unidad-04/unidad04_modelo_entrada_salida.svg" alt="El usuario escribe 19 en el teclado. Entrada: edad guarda 19 en la celda edad de la memoria. Mostrar lee la celda y en la pantalla aparece Edad: 19" width="860">

| Instrucción | Dirección | Qué cambia en la memoria |
|---|---|---|
| `Entrada: edad` | usuario → variable | `edad` recibe el valor escrito. El valor anterior **se pierde** |
| `Mostrar edad` | variable → pantalla | Nada. La variable conserva su valor |

## Declarar es reservar memoria

Cuando el algoritmo declara un dato, se **reserva un espacio** en la memoria con un nombre y un tipo.

<img src="/imagenes/logica-programacion/unidad-04/unidad04_memoria_constantes_variables.svg" alt="Siete celdas de memoria del recibo de luz. Las constantes PRECIO_KWH y CARGO_FIJO tienen fondo gris y ya tienen valor. Las variables tienen fondo blanco y valor desconocido" width="900">

## Qué ocurre al ejecutar una entrada

```text
ENTERO edad
edad = 17
Entrada: edad        // el usuario escribe 19
Mostrar edad
```

| Instrucción | `edad` | Pantalla |
|---|---|---|
| `edad = 17` | 17 | |
| `Entrada: edad` | **19** | `> 19` |
| `Mostrar edad` | 19 | `19` |

1. La ejecución **se detiene** y espera a que el usuario escriba.
2. El valor escrito se guarda en la variable y **reemplaza** al anterior.
3. La ejecución continúa con la siguiente instrucción.

## El supuesto de toda entrada

Toda entrada supone que el usuario escribe **un valor del tipo declarado**.

| Declaración | El usuario escribe | Resultado en PSeInt |
|---|---|---|
| `ENTERO edad` | `19` | Correcto |
| `ENTERO edad` | `19.5` | Error de tipos: la ejecución se detiene |
| `ENTERO edad` | `diecinueve` | Error de tipos: la ejecución se detiene |
| `CADENA nombre` | `19` | Correcto: se guarda el texto "19" |

Con estructuras secuenciales **no se puede** revisar si el dato es válido. Por eso cada problema declara sus supuestos y restricciones.

En el bloque 4.2 aprenderás a validar la entrada con estructuras condicionales.

## El tipo se elige por el uso, no por la apariencia

Una matrícula como `20261234` está formada por dígitos, pero **no es un número**:

- no se suma, ni se promedia, ni se multiplica
- puede empezar con cero: `0045812`
- si se declara `ENTERO`, el cero inicial se pierde y se muestra `45812`

```text
CADENA matricula      // identifica, no se calcula con ella
ENTERO semestre       // se puede comparar o incrementar
```

<div class="callout">

Pregunta de control: **¿voy a hacer operaciones aritméticas con este dato?** Si la respuesta es no, probablemente es una `CADENA`.

</div>

## Mensaje de solicitud

El usuario no ve el pseudocódigo. Solo ve la pantalla.

<div class="grid-2">

<div class="card accent-rojo">
<strong>Sin mensaje</strong>

```text
Entrada: kilometros
Entrada: litros
```

<p>La pantalla queda en blanco. El usuario no sabe qué escribir ni en qué orden.</p>
</div>

<div class="card accent-verde">
<strong>Con mensaje de solicitud</strong>

```text
Mostrar "Kilómetros recorridos: "
Entrada: kilometros
Mostrar "Litros cargados: "
Entrada: litros
```

<p>Cada dato se pide por su nombre y en orden.</p>
</div>

</div>

El mensaje de solicitud (*prompt*) es una **salida**: se escribe con `Mostrar`, justo antes de la entrada que anuncia.

## Un buen mensaje de solicitud

| Mensaje | Problema |
|---|---|
| `"Dato:"` | No dice qué dato |
| `"Ingrese el precio:"` | No dice la unidad ni el formato |
| `"Precio unitario en pesos (ej. 25.50): "` | Correcto |
| `"Semestre (1 a 10): "` | Correcto: anuncia el rango esperado |

Un buen mensaje indica **qué dato**, **en qué unidad** y, cuando ayuda, **un ejemplo o un rango**.

El mensaje informa, pero no obliga: el usuario todavía puede escribir 15 en el semestre. Revisarlo corresponde al bloque 4.2.

## Qué se puede mostrar

| Forma | Ejemplo | Pantalla con `total = 143` |
|---|---|---|
| Texto literal | `Mostrar "Gracias por su compra"` | `Gracias por su compra` |
| Valor de una variable | `Mostrar total` | `143` |
| Texto y valor | `Mostrar "Total: $", total` | `Total: $143` |
| Resultado de una expresión | `Mostrar "Con propina: $", total * 1.10` | `Con propina: $157.3` |

Los elementos se separan con coma y se muestran **uno junto al otro, sin espacio**. Si quieres un espacio, escríbelo dentro de las comillas: `"Total: $"` frente a `"Total:"`.

## Comillas: texto o variable

```text
REAL total
total = 143
Mostrar "total"
Mostrar total
```

Pantalla:

```text
total
143
```

- Entre comillas, la palabra se muestra **tal como está escrita**.
- Sin comillas, se busca la variable y se muestra **su valor**.

<div class="callout">

`Mostrar "total"` es uno de los errores más frecuentes: el algoritmo calcula bien, pero el usuario nunca ve el resultado.

</div>

## Mostrar una expresión: ventaja y límite

```text
Mostrar "Doble: ", numero * 2
```

**Ventaja:** ahorra una variable cuando el valor solo se muestra una vez.

**Límite:** el resultado no queda guardado. Si después lo necesitas para otro cálculo, debes volver a calcularlo.

```text
// Si el valor se usa más de una vez, guárdalo
doble = numero * 2
Mostrar "Doble: ", doble
triple = doble + numero
```

Criterio: si el valor **se reutiliza** o tiene un **nombre propio en el problema** (total, cambio, IVA), guárdalo en una variable.

## Diseñar la salida

Misma información, dos pantallas:

<div class="grid-2">

<div class="card accent-rojo">
<strong>Difícil de leer</strong>

```text
258
283.8
318.8
```

</div>

<div class="card accent-verde">
<strong>Legible</strong>

```text
Consumo del periodo: 258 kWh
Importe de energía: $283.8
Cargo fijo: $35
Total a pagar: $318.8
```

</div>

</div>

Una salida legible tiene una **etiqueta** por valor, la **unidad** (kWh, $, km/l) y sigue el **orden** en que el usuario la necesita: primero el detalle, al final lo que debe hacer (pagar, entregar).

## Redondear un importe

Algunos cálculos producen muchos decimales:

```text
baseSinIva = 143 / 1.16          // 123.2758620...
```

Para mostrar un importe en centavos se multiplica por 100, se redondea y se divide entre 100:

```text
baseSinIva = redon(143 / 1.16 * 100) / 100     // 123.28
```

| Paso | Valor |
|---|---|
| `143 / 1.16` | 123.2758... |
| `* 100` | 12327.58... |
| `redon(...)` | 12328 |
| `/ 100` | 123.28 |

`redon(x)` es una **función predefinida**: redondea al entero más cercano. Es la primera vez que la escribimos en la notación de la materia, y se escribe igual que en PSeInt.

## Cómo muestra PSeInt los números

PSeInt no agrega ceros a la derecha: muestra `18.5`, no `18.50`, y `35`, no `35.00`.

| Valor | Pantalla en PSeInt |
|---|---|
| `18.50` | `18.5` |
| `35.00` | `35` |
| `redon(143 / 1.16 * 100) / 100` | `123.28` |

Es una característica de la herramienta, no un error del algoritmo. El valor guardado es el mismo.

<div class="callout">

En la **pantalla esperada** escribe los números como los mostrará PSeInt. Así podrás comparar sin confusión.

</div>

## Ejemplo: credencial de la biblioteca

La biblioteca necesita imprimir una credencial con los datos que proporciona el estudiante.

```text
Inicio
    CADENA nombre
    CADENA matricula
    CADENA carrera
    ENTERO semestre

    Mostrar "Nombre completo: "
    Entrada: nombre
    Mostrar "Matrícula: "
    Entrada: matricula
    Mostrar "Carrera: "
    Entrada: carrera
    Mostrar "Semestre (1 a 10): "
    Entrada: semestre

    Mostrar "===== CREDENCIAL DE BIBLIOTECA ====="
    Mostrar "Nombre: ", nombre
    Mostrar "Matrícula: ", matricula
    Mostrar "Carrera: ", carrera, " · Semestre ", semestre
Fin
```

## Credencial de la biblioteca: pantalla esperada

Entrada: `Ana Sofía López`, `0045812`, `Informática`, `1`

```text
Nombre completo: 
> Ana Sofía López
Matrícula: 
> 0045812
Carrera: 
> Informática
Semestre (1 a 10): 
> 1
===== CREDENCIAL DE BIBLIOTECA =====
Nombre: Ana Sofía López
Matrícula: 0045812
Carrera: Informática · Semestre 1
```

Observa:

- el `0` inicial de la matrícula se conserva porque es `CADENA`
- cada `Mostrar` produce una línea nueva
- el signo `>` lo agrega PSeInt cuando espera una entrada

## Credencial de la biblioteca: así se ve al ejecutarse

<img src="/imagenes/logica-programacion/unidad-04/unidad04_pantalla_credencial.svg" alt="Ventana de ejecución de la credencial. El algoritmo pide nombre, matrícula, carrera y semestre. El usuario escribe Ana Sofía López, 0045812, Informática y 1. Después se muestra la credencial" width="560">

Lo que **escribe el usuario** aparece en amarillo. Todo lo demás lo **muestra el algoritmo**: los mensajes de solicitud y los resultados.

## Traducción a PSeInt

| Pseudocódigo | PSeInt |
|---|---|
| `Entrada: nombre` | `Leer nombre` |
| `Mostrar "Total: $", total` | `Escribir "Total: $", total` |
| `CADENA nombre` | `Definir nombre Como Caracter` |

Variante útil de PSeInt:

```text
Escribir Sin Saltar "Nombre completo: "
Leer nombre
```

`Sin Saltar` deja el cursor en la misma línea, de modo que el usuario escribe junto al mensaje. No cambia la lógica: es solo una mejora de la traducción.

## Actividad guiada · Pantalla esperada

Un estacionamiento cobra una tarifa fija por hora.

```text
Inicio
    REAL TARIFA_HORA = 18.50
    ENTERO horas
    REAL importe

    Mostrar "Horas de estancia: "
    Entrada: horas
    importe = horas * TARIFA_HORA
    Mostrar "Tarifa por hora: $", TARIFA_HORA
    Mostrar "Total a pagar: $", importe
Fin
```

1. Con `horas = 3`, escribe **exactamente** lo que aparecerá en la pantalla, línea por línea.
2. Haz lo mismo con `horas = 0`.
3. Si la línea `importe = horas * TARIFA_HORA` se moviera **debajo** del último `Mostrar`, ¿qué mostraría la última línea? ¿Por qué?

**Producto:** pantalla esperada de los dos casos y respuesta a la pregunta 3.

## Práctica · Depuración de entrada y salida

Este algoritmo debería calcular el rendimiento de un automóvil en kilómetros por litro. Tiene **cuatro errores** de entrada y salida.

```text
Inicio
    REAL kilometros
    REAL litros
    REAL rendimiento

    rendimiento = kilometros / litros
    Entrada: kilometros
    Mostrar "Litros cargados: "
    Entrada: litros
    Mostrar "Rendimiento: "
    Entrada: rendimiento
    Mostrar "rendimiento"
Fin
```

1. Localiza cada error y explica qué vería el usuario por su causa.
2. Escribe el algoritmo corregido.
3. Escribe la pantalla esperada con 420 km y 30 litros.

**Producto:** ficha de depuración con los cuatro errores, el algoritmo corregido y la pantalla esperada.

## Errores frecuentes de entrada y salida

| Error | Síntoma en pantalla |
|---|---|
| Calcular antes de leer | Resultado 0 o error de división por cero |
| Entrada sin mensaje de solicitud | Pantalla en blanco esperando un dato |
| Pedir al usuario un resultado | El usuario debe calcular lo que el algoritmo debía calcular |
| Variable entre comillas | Aparece el nombre de la variable, no su valor |
| Mostrar antes de calcular | Aparece 0 (PSeInt) o un valor indefinido |
| Valor sin etiqueta ni unidad | Números sueltos que el usuario no sabe interpretar |

## Cierre del tema

- [ ] Explico qué cambia en la memoria con `Entrada:` y qué no cambia con `Mostrar`.
- [ ] Escribo un mensaje de solicitud antes de cada entrada.
- [ ] Elijo el tipo de un dato por el uso que tendrá.
- [ ] Distingo entre `Mostrar "total"` y `Mostrar total`.
- [ ] Escribo la pantalla esperada de un algoritmo antes de ejecutarlo.

<div class="banner-node">

**Siguiente tema:** con entrada, proceso y salida bien ordenados, resolveremos problemas completos con estructuras secuenciales.

</div>

## Qué sigue

Continúa con [2. Resolución de problemas secuenciales](/materias/logica-programacion/unidad-04/02-problemas-secuenciales/).
