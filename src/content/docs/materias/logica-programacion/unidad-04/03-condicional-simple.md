---
title: "3. Condicional simple (4.2.1)"
description: "Unidad IV de Lógica de Programación — condicional simple, contenido 4.2.1."
---

## Lo que la secuencia no pudo resolver

En el bloque 4.1 encontraste algoritmos correctos que fallaban cuando se rompía un supuesto:

| Problema | Lo que pasó | Lo que faltaba |
|---|---|---|
| Recibo de luz con lecturas invertidas | Consumo de −258 kWh | Revisar las lecturas **antes** de calcular |
| Cifras del número 85 | Inverso 580 | Saber si tiene dos o tres cifras |
| Hora de llegada | Se muestra `0:0` | Agregar un cero **solo si** los minutos son menores que 10 |
| Ticket con pago insuficiente | Cambio de −$43 | Avisar que falta dinero |

En todos los casos el algoritmo necesitaba **decidir**.

## ¿Qué es una estructura condicional?

Una estructura condicional ejecuta un bloque de instrucciones **solo si** se cumple una condición.

**La condición** es una expresión lógica de la Unidad II: vale `VERDADERO` o `FALSO`.

```text
subtotal < 300                    // relacional
semestre >= 1 Y semestre <= 10    // compuesta
```

**Supuesto:** la condición se puede evaluar con los datos disponibles **en ese momento**. Si depende de un dato que todavía no se lee o no se calcula, la decisión será incorrecta.

**Consecuencia:** a diferencia de la secuencia, ahora un algoritmo tiene **varias rutas**. La prueba de escritorio debe recorrer todas.

## Cuatro formas de decidir

| Forma | Pregunta que responde | Contenido |
|---|---|---|
| **Simple** | ¿Hago algo adicional o no? | 4.2.1 |
| **Doble** | ¿Hago esto o aquello? | 4.2.2 |
| **Múltiple** | ¿Cuál de varias opciones, según un valor? | 4.2.3 |
| **Anidada** | ¿Qué decido después de haber decidido otra cosa? | 4.2.4 |

La notación completa, con su diagrama de flujo y su traducción a PSeInt, está en la [especificación de estructuras](/materias/logica-programacion/unidad-04/especificacion-estructuras/) de la unidad.

## Condicional simple

```text
Si <condición> Entonces
    <instrucciones>
FinSi
```

- Si la condición es **verdadera**, se ejecutan las instrucciones del bloque y después se sigue con lo que hay debajo de `FinSi`.
- Si es **falsa**, el bloque se salta completo.

Se usa cuando existe una acción **adicional** que solo a veces ocurre: un cargo, un descuento, una advertencia.

**Limitación:** la condicional simple no dice qué hacer cuando la condición es falsa. Si ese caso necesita su propia acción, se requiere una condicional doble.

## Ejemplo: envío gratis

Una tienda en línea cobra $79 de envío, excepto en compras de $300 o más. *(Valores ficticios.)*

```text
Inicio
    REAL MINIMO_ENVIO_GRATIS = 300
    REAL COSTO_ENVIO = 79
    REAL subtotal
    REAL total

    Mostrar "Subtotal en pesos: "
    Entrada: subtotal

    total = subtotal
    Si subtotal < MINIMO_ENVIO_GRATIS Entonces
        total = total + COSTO_ENVIO
    FinSi

    Mostrar "Total a pagar: $", total
Fin
```

Patrón **valor por omisión + condicional simple**: `total` empieza igual al subtotal y solo cambia si hay que cobrar envío.

## Envío gratis: diagrama y prueba

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_envio.svg" alt="Diagrama de flujo del envío gratis. Después de leer el subtotal, total = subtotal. Decisión subtotal < MINIMO_ENVIO_GRATIS: por Sí, total = total + COSTO_ENVIO. Ambas ramas se unen y se muestra el total" width="700">

| Caso | `subtotal` | ¿Condición? | `total` |
|---|---:|---|---:|
| Paga envío | 250 | Verdadera | 329 |
| Frontera | 300 | Falsa | 300 |
| Justo debajo | 299.99 | Verdadera | 378.99 |

## Las fronteras deciden

"Envío gratis **desde** $300" significa que 300 ya no paga envío.

| Condición escrita | ¿Qué pasa con 300? | ¿Correcta? |
|---|---|---|
| `subtotal < 300` | No paga envío | Sí |
| `subtotal <= 300` | Paga envío | No |

Cada vez que escribas una condición, prueba el valor **exacto de la frontera** y uno a cada lado. Ahí aparecen casi todos los errores de las condicionales.

## Qué sigue

Continúa con [4. Condicional doble](/materias/logica-programacion/unidad-04/04-condicional-doble/).
