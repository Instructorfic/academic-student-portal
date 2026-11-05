---
title: "6. Condicional anidada (4.2.4)"
description: "Unidad IV de Lógica de Programación — condicional anidada, contenido 4.2.4."
---

## Condicional anidada

Una condicional **anidada** es una condicional escrita dentro de una rama de otra.

```text
Si <condición exterior> Entonces
    Si <condición interior> Entonces
        ...
    Sino
        ...
    FinSi
Sino
    ...
FinSi
```

La condición interior **solo se evalúa** cuando la exterior llevó a esa rama.

Se usa cuando una decisión **depende** de otra, o cuando cada falla necesita **una respuesta distinta**.

## Ejemplo: retiro en el cajero

El cajero solo entrega billetes de $100 y no permite retirar más que el saldo.

```text
3:
    Mostrar "Monto a retirar: "
    Entrada: monto
    Si monto <= saldo Entonces
        Si monto % 100 = 0 Entonces
            saldo = saldo - monto
            Mostrar "Retire su efectivo. Nuevo saldo: $", saldo
        Sino
            Mostrar "Solo se entregan billetes de $100"
        FinSi
    Sino
        Mostrar "Saldo insuficiente"
    FinSi
```

## Retiro en el cajero: prueba

| `monto` (saldo 2500) | Exterior | Interior | Pantalla |
|---:|---|---|---|
| 700 | Verdadera | Verdadera | `Retire su efectivo. Nuevo saldo: $1800` |
| 750 | Verdadera | Falsa | `Solo se entregan billetes de $100` |
| 3000 | Falsa | No se evalúa | `Saldo insuficiente` |
| 2500 | Verdadera | Verdadera | `Retire su efectivo. Nuevo saldo: $0` |

## ¿Anidar o usar Y?

<div class="grid-2">

<div class="card accent-azul">
<strong>Con Y</strong>

```text
Si monto <= saldo Y monto % 100 = 0 Entonces
    saldo = saldo - monto
Sino
    Mostrar "No se puede retirar"
FinSi
```

<p>Más corta, pero el usuario no sabe <strong>por qué</strong> se rechazó.</p>
</div>

<div class="card accent-dorado">
<strong>Anidada</strong>

<p>Cada falla tiene su propio mensaje. Además, el orden expresa una prioridad: primero se revisa el saldo.</p>

<p>Criterio: si todas las fallas llevan a <strong>la misma acción</strong>, usa <code>Y</code>. Si necesitan <strong>acciones distintas</strong>, anida.</p>
</div>

</div>

**Limitación:** más de tres niveles de anidamiento vuelven el algoritmo difícil de leer y de probar. Es señal de que conviene reorganizarlo.

## Traducción a PSeInt

| Pseudocódigo | PSeInt |
|---|---|
| `Si … Entonces … Sino … FinSi` | Igual (`Sino` y `SiNo` son equivalentes) |
| `Segun opcion Hacer … De Otro Modo: … FinSegun` | Igual |
| Cadena `Sino Si` | Un `Si` dentro de cada `SiNo`, con un `FinSi` por cada `Si` |

```text
Si peso <= 0 Entonces
    Escribir "Peso no válido"
SiNo
    Si peso <= 1 Entonces
        tarifa = TARIFA_HASTA_1KG
    SiNo
        ...
    FinSi
FinSi
```

La traducción muestra lo que realmente es una cadena `Sino Si`: condicionales **anidadas** en la rama falsa.

## Qué sigue

Continúa con [7. Resolución de problemas con condicionales](/materias/logica-programacion/unidad-04/07-problemas-con-condicionales/).
