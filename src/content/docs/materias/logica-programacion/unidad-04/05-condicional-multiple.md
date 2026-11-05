---
title: "5. Condicional múltiple (4.2.3)"
description: "Unidad IV de Lógica de Programación — condicional múltiple, contenido 4.2.3."
---

## ¿Qué problema resuelve?

Un cajero automático muestra un menú:

```text
1. Consultar saldo
2. Depositar
3. Retirar
```

La acción depende del **valor exacto** de una variable. Con condicionales dobles habría que escribir `Si opcion = 1 … Sino Si opcion = 2 …` y repetir el nombre de la variable en cada comparación.

La condicional múltiple expresa directamente la idea: **según el valor, haz esto**.

## Condicional múltiple: Segun

```text
Segun <variable> Hacer
    <valor 1>:
        <instrucciones>
    <valor 2>, <valor 3>:
        <instrucciones>
    De Otro Modo:
        <instrucciones>
FinSegun
```

- Se compara la variable con cada valor, de arriba hacia abajo, y se ejecuta **solo** el caso que coincide.
- Un caso puede tener varios valores separados por coma.
- `De Otro Modo` atiende cualquier valor no previsto. En la materia es **obligatorio**: el usuario puede escribir 7 en un menú de tres opciones.

**Supuesto:** la variable es entera o un carácter, y cada caso es un **valor exacto**. No admite rangos ni condiciones.

## Ejemplo: cajero automático

```text
Inicio
    ENTERO SALDO_INICIAL = 2500
    ENTERO saldo
    ENTERO opcion
    ENTERO monto

    saldo = SALDO_INICIAL
    Mostrar "1. Consultar saldo"
    Mostrar "2. Depositar"
    Mostrar "3. Retirar"
    Mostrar "Opción: "
    Entrada: opcion

    Segun opcion Hacer
        1:
            Mostrar "Saldo disponible: $", saldo
        2:
            Mostrar "Monto a depositar: "
            Entrada: monto
            saldo = saldo + monto
            Mostrar "Nuevo saldo: $", saldo
        3:
            Mostrar "Monto a retirar: "
            Entrada: monto
            saldo = saldo - monto
            Mostrar "Nuevo saldo: $", saldo
        De Otro Modo:
            Mostrar "Opción no válida"
    FinSegun
Fin
```

## Cajero automático: prueba

| Caso | `opcion` | `monto` | Pantalla final |
|---|---:|---:|---|
| Consulta | 1 | — | `Saldo disponible: $2500` |
| Depósito | 2 | 500 | `Nuevo saldo: $3000` |
| Retiro | 3 | 700 | `Nuevo saldo: $1800` |
| Opción inexistente | 7 | — | `Opción no válida` |
| Retiro excesivo | 3 | 3000 | `Nuevo saldo: $-500` |

El último caso muestra un saldo negativo: el retiro necesita **otra decisión** dentro del caso 3. Eso es una condicional anidada (4.2.4).

En un diagrama de flujo, `Segun` se dibuja como un rombo con la variable y una salida etiquetada por cada valor, más la salida **De otro modo**.

## Variante: la cadena Sino Si

Cuando la decisión depende de **rangos**, `Segun` no sirve. Una empresa de paquetería cobra por peso *(tarifas ficticias)*:

```text
Si peso <= 0 Entonces
    Mostrar "Peso no válido"
Sino Si peso <= 1 Entonces
    tarifa = TARIFA_HASTA_1KG          // 90
Sino Si peso <= 5 Entonces
    tarifa = TARIFA_HASTA_5KG          // 150
Sino
    tarifa = TARIFA_MAS_5KG            // 250
FinSi
```

Las condiciones se revisan **en orden** y se ejecuta solo la primera verdadera. Por eso la segunda no necesita decir `peso > 0 Y peso <= 1`: si llegó ahí, `peso <= 0` ya fue falsa.

## En la cadena, el orden importa

```text
Si peso <= 5 Entonces
    tarifa = TARIFA_HASTA_5KG
Sino Si peso <= 1 Entonces           // nunca se alcanza
    tarifa = TARIFA_HASTA_1KG
...
```

Un paquete de 0.5 kg cumple `peso <= 5` y paga $150. La segunda condición jamás se evalúa como verdadera.

| ¿Cómo decide? | Usa |
|---|---|
| Por el **valor exacto** de una variable (menú, código) | `Segun` |
| Por **rangos** o condiciones distintas | Cadena `Sino Si`, ordenada del rango más restrictivo al más amplio |

## Qué sigue

Continúa con [6. Condicional anidada](/materias/logica-programacion/unidad-04/06-condicional-anidada/).
