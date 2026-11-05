---
title: "7. Resolución de problemas con condicionales (4.2.5)"
description: "Unidad IV de Lógica de Programación — resolución de problemas con condicionales, contenido 4.2.5."
---

## Procedimiento

La metodología de la Unidad III no cambia. Se agregan tres preguntas al análisis:

1. **¿Qué decisiones hay?** Busca en el enunciado: "si", "solo si", "excepto", "según", "en caso de", "a partir de".
2. **¿Qué tipo de decisión es cada una?** Acción adicional (simple), dos caminos (doble), valor exacto (múltiple), rangos (encadenada), una decisión dentro de otra (anidada).
3. **¿Cuáles son las rutas?** Cada ruta necesita al menos un caso de prueba, más los valores de **frontera**.

| Rutas del algoritmo | Casos de prueba mínimos |
|---|---|
| Una doble | 2 + frontera |
| `Segun` con 3 valores | 4 (incluye `De Otro Modo`) |
| Doble con una doble anidada | 3 |

## Ejemplo resuelto: estacionamiento con tolerancia

El estacionamiento de la actividad de pantalla esperada ahora tiene reglas:

- Los primeros **15 minutos** son gratis.
- Después se cobra **por hora o fracción** a $18.50.
- El cobro máximo del día es **$150**.

| Elemento | Contenido |
|---|---|
| Entrada | `minutos` de estancia (entero, mayor o igual que 0) |
| Datos conocidos | `TOLERANCIA = 15`, `TARIFA_HORA = 18.50`, `TOPE_DIARIO = 150`, `MINUTOS_HORA = 60` |
| Decisiones | ¿Dentro de la tolerancia? (doble) · ¿Supera el tope? (simple, solo si se cobra) |
| Cálculo nuevo | "Hora o fracción": 61 minutos son **2** horas |

## Hora o fracción

Para redondear **hacia arriba** se suma una hora menos un minuto antes de truncar:

```text
horas = trunc((minutos + MINUTOS_HORA - 1) / MINUTOS_HORA)
```

| `minutos` | `minutos + 59` | `/ 60` | `trunc` |
|---:|---:|---:|---:|
| 16 | 75 | 1.25 | 1 |
| 60 | 119 | 1.98 | 1 |
| 61 | 120 | 2 | 2 |

No se necesita una condicional: el cálculo resuelve la fracción. Reconocer cuándo **no** hace falta decidir también es parte del diseño.

## Estacionamiento: pseudocódigo

```text
Inicio
    ENTERO TOLERANCIA = 15
    ENTERO MINUTOS_HORA = 60
    REAL TARIFA_HORA = 18.50
    REAL TOPE_DIARIO = 150
    ENTERO minutos
    ENTERO horas
    REAL importe

    Mostrar "Minutos de estancia: "
    Entrada: minutos

    Si minutos <= TOLERANCIA Entonces
        importe = 0
    Sino
        horas = trunc((minutos + MINUTOS_HORA - 1) / MINUTOS_HORA)
        importe = horas * TARIFA_HORA
        Si importe > TOPE_DIARIO Entonces
            importe = TOPE_DIARIO
        FinSi
    FinSi

    Mostrar "Total a pagar: $", importe
Fin
```

## Estacionamiento: plan de pruebas

| Caso | `minutos` | Ruta | `horas` | `importe` |
|---|---:|---|---:|---:|
| Dentro de la tolerancia | 10 | Tolerancia | — | 0 |
| Frontera de la tolerancia | 15 | Tolerancia | — | 0 |
| Primer minuto cobrado | 16 | Cobro, sin tope | 1 | 18.5 |
| Hora exacta | 60 | Cobro, sin tope | 1 | 18.5 |
| Fracción | 61 | Cobro, sin tope | 2 | 37 |
| Justo debajo del tope | 480 | Cobro, sin tope | 8 | 148 |
| Aplica tope | 481 | Cobro con tope | 9 | 150 |

Siete casos para tres rutas: cada frontera (15/16, 60/61, 480/481) se prueba de los dos lados.

## Práctica · Año bisiesto

Un año es bisiesto si es divisible entre 4 y no entre 100, **o** si es divisible entre 400.

1. Escribe la condición con `%`, `Y`, `O` y paréntesis.
2. Desarrolla el algoritmo que indique si un año es bisiesto.
3. Pruébalo con los cuatro casos:

| Año | ¿Bisiesto? |
|---:|---|
| 2024 | Sí |
| 2023 | No |
| 1900 | No |
| 2000 | Sí |

**Producto:** pseudocódigo, prueba de escritorio y ejecución en PSeInt.

## Práctica · Calculadora de dos números

Desarrolla un algoritmo que reciba dos números y una operación:

```text
1. Sumar   2. Restar   3. Multiplicar   4. Dividir
```

- La operación se elige con una condicional múltiple.
- Si la operación es dividir y el divisor es cero, muestra "No se puede dividir entre cero".
- Si la operación no existe, muestra "Operación no válida".

| Caso | `a` | `b` | Operación | Resultado esperado |
|---|---:|---:|---:|---|
| Cada operación | 12 | 4 | 1, 2, 3, 4 | 16, 8, 48, 3 |
| División entre cero | 7 | 0 | 4 | Mensaje de error |
| Operación inexistente | 7 | 2 | 5 | Operación no válida |

**Producto:** pseudocódigo, diagrama de flujo y ejecución en PSeInt.

## Práctica · Depuración de condicionales

Un cine cobra $80 el boleto.

| Edad | Precio |
|---|---|
| Menos de 3 años | Gratis |
| De 3 a 11 años | Mitad |
| De 12 a 59 años | Completo |
| Desde 60 años | Mitad |
| Menor que 0 o mayor que 120 | "Edad no válida", sin precio |

El algoritmo de la siguiente lámina tiene **cuatro errores**.

**Producto:** ficha de depuración con los cuatro errores, el algoritmo corregido y un plan de pruebas con todas las fronteras.

## Práctica · Algoritmo con errores

```text
Inicio
    REAL PRECIO_BOLETO = 80
    REAL FACTOR_MEDIO = 0.5
    ENTERO edad
    REAL precio

    Mostrar "Edad: "
    Entrada: edad
    Si edad < 0 Y edad > 120 Entonces
        Mostrar "Edad no válida"
    Sino Si edad > 60 Entonces
        precio = PRECIO_BOLETO * FACTOR_MEDIO
    Sino Si edad < 12 Entonces
        precio = PRECIO_BOLETO * FACTOR_MEDIO
    Sino Si edad < 3 Entonces
        precio = 0
    Sino
        precio = PRECIO_BOLETO
    FinSi
    Mostrar "Precio: $", precio
Fin
```

## Errores frecuentes con condicionales

| Error | Ejemplo | Consecuencia |
|---|---|---|
| Frontera mal escrita | `>` en lugar de `>=` | Falla exactamente en el valor límite |
| `Y` en lugar de `O` | `edad < 0 Y edad > 120` | La condición nunca es verdadera |
| `O` en lugar de `Y` | `x >= 1 O x <= 10` | La condición siempre es verdadera |
| Cadena mal ordenada | `<= 5` antes de `<= 1` | Una rama nunca se alcanza |
| Falta `De Otro Modo` | Menú sin caso por omisión | Un valor inesperado no produce respuesta |
| Instrucción fuera de la rama | `Mostrar` después de `FinSi` | Se ejecuta aunque la condición haya rechazado el dato |
| Decidir antes de leer | `Si` antes de `Entrada:` | Se decide con un valor que aún no existe |

## Tareas del bloque 4.2

| Tarea | Qué debes resolver | Estructuras |
|---|---|---|
| **Clasificación de triángulos** | Decidir si tres longitudes forman un triángulo y, en ese caso, si es equilátero, isósceles o escaleno | Anidada, condiciones compuestas |
| **Recibo de luz por bloques** | Calcular el recibo cuando el precio del kWh cambia por bloques de consumo | Doble para validar, cadena `Sino Si` para los bloques |

Cada tarea se entrega con su hoja de trabajo, diagrama de flujo, plan de pruebas que cubra todas las rutas y fronteras, y ejecución en PSeInt.

Las instrucciones completas están en la hoja de cada tarea: consulta las [tareas de la unidad](/materias/logica-programacion/unidad-04/tareas/).

## Relación con el Laboratorio 02

En el **Laboratorio 02 · Reglas de cobro** tu programa de la Cafetería El Byte aprende a decidir:

- detectar un pedido vacío
- aplicar la promoción de combo desayuno
- aplicar un descuento según el tipo de cliente
- distinguir entre pago en efectivo y con tarjeta
- avisar cuando el efectivo no alcanza

Partirás del programa que entregaste en el Laboratorio 01. Las instrucciones, las reglas exactas y los datos de prueba están en la [guía del Laboratorio 02](/materias/logica-programacion/unidad-04/laboratorios/laboratorio-2-reglas-de-cobro/).

## Síntesis del bloque 4.2

| Situación | Estructura |
|---|---|
| Algo adicional que solo a veces ocurre | Simple |
| Dos caminos complementarios | Doble |
| Una opción según el valor exacto de una variable | Múltiple (`Segun`) |
| Una opción según rangos | Cadena `Sino Si` |
| Una decisión que depende de otra, o fallas con respuestas distintas | Anidada |

Una condicional se prueba **por rutas y por fronteras**: cada rama al menos una vez y cada valor límite de los dos lados.

## Segundo examen parcial

Evalúa los bloques **4.1** y **4.2**. Es escrito, sin computadora.

- [ ] Escribir la pantalla esperada y el trazado de un algoritmo
- [ ] Identificar qué estructura requiere un problema
- [ ] Encontrar y corregir errores en un algoritmo
- [ ] Completar un algoritmo
- [ ] Construir algoritmos con la notación de la materia

Para prepararte, repasa las prácticas, las tareas y los dos laboratorios.

## Qué sigue

Continúa con [8. Ciclo Mientras](/materias/logica-programacion/unidad-04/08-mientras/).
