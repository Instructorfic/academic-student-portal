---
title: "9. Ciclo Repetir (4.3.2)"
description: "Unidad IV de Lógica de Programación — ciclo repetir, contenido 4.3.2."
---

## Ciclo Repetir

```text
Repetir
    <instrucciones>
Hasta Que <condición>
```

1. Se ejecuta el cuerpo.
2. Se evalúa la condición.
3. Si es **falsa**, se vuelve al paso 1. Si es **verdadera**, el ciclo termina.

Como la condición se revisa **después**, el cuerpo se ejecuta **al menos una vez**.

<div class="callout">

`Mientras` **continúa** cuando la condición es verdadera. `Repetir` **termina** cuando la condición es verdadera. Confundirlo es el error más frecuente con este ciclo.

</div>

## Ejemplo: validar una entrada

En el bloque 4.2 el algoritmo solo podía avisar que el semestre era inválido. Ahora lo pide de nuevo:

```text
Repetir
    Mostrar "Semestre (1 a 10): "
    Entrada: semestre
Hasta Que semestre >= 1 Y semestre <= 10
Mostrar "Semestre registrado: ", semestre
```

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_validacion.svg" alt="Diagrama de flujo de la validación del semestre. Se muestra el mensaje, se lee el semestre y se evalúa semestre >= 1 Y semestre <= 10. Por No regresa al mensaje. Por Sí muestra el semestre registrado" width="520">

## Validación: prueba

| El usuario escribe | ¿Condición de salida? | Qué pasa |
|---|---|---|
| 15 | Falsa | Pide otra vez |
| 0 | Falsa | Pide otra vez |
| 3 | Verdadera | Muestra `Semestre registrado: 3` |

`Repetir` es natural aquí porque **siempre** hay que pedir el dato al menos una vez.

Con `Mientras` habría que leer el dato antes del ciclo y repetir la misma entrada dentro, como en el centinela.

**Limitación:** la validación revisa el rango, no el tipo. Si el usuario escribe "tres" en un `ENTERO`, PSeInt detiene la ejecución con un error de tipos.

## Ejemplo: cajero con menú repetido

```text
saldo = SALDO_INICIAL
Repetir
    Mostrar "1. Consultar saldo  2. Depositar  3. Retirar  4. Salir"
    Mostrar "Opción: "
    Entrada: opcion
    Segun opcion Hacer
        1:
            Mostrar "Saldo disponible: $", saldo
        2:
            // depósito, igual que en el bloque 4.2
        3:
            // retiro con las decisiones anidadas del bloque 4.2
        4:
            Mostrar "Gracias por usar el cajero"
        De Otro Modo:
            Mostrar "Opción no válida"
    FinSegun
Hasta Que opcion = 4
```

## Cajero: el estado se conserva entre iteraciones

`saldo` se inicializa **fuera** del ciclo: así cada operación parte del saldo que dejó la anterior.

| Secuencia de opciones | Saldo final |
|---|---|
| 2 (500), 3 (700), 1, 4 | 2300 |

## Qué sigue

Continúa con [10. Ciclo Desde](/materias/logica-programacion/unidad-04/10-desde/).
