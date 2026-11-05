---
title: "10. Ciclo Desde (4.3.3)"
description: "Unidad IV de Lógica de Programación — ciclo desde, contenido 4.3.3."
---

## Ciclo Desde

```text
Desde i = <inicio> Hasta <fin> Con Paso <paso> Hacer
    <instrucciones>
FinDesde
```

- `i` empieza con el valor de inicio.
- Antes de cada iteración se revisa si `i` todavía no pasa del valor final.
- Al terminar cada iteración, `i` aumenta en el valor del paso.

Se usa cuando el número de repeticiones **se conoce antes de empezar**: un valor fijo (10 renglones, 7 días) o un dato ya leído (el número de alumnos).

Es una forma compacta de escribir un `Mientras` con contador:

```text
i = 1
Mientras i <= 10 Hacer
    ...
    i = i + 1
FinMientras
```

## Ejemplo: tabla de multiplicar

```text
Mostrar "Tabla del: "
Entrada: n
Desde i = 1 Hasta 10 Con Paso 1 Hacer
    Mostrar n, " x ", i, " = ", n * i
FinDesde
```

| Variante | Instrucción | Valores de `i` |
|---|---|---|
| Paso 1 | `Desde i = 1 Hasta 10 Con Paso 1` | 1, 2, …, 10 |
| Paso 2 | `Desde i = 1 Hasta 9 Con Paso 2` | 1, 3, 5, 7, 9 |
| Paso negativo | `Desde i = 10 Hasta 1 Con Paso -1` | 10, 9, …, 1 |
| Inicio mayor que el fin | `Desde i = 5 Hasta 1 Con Paso 1` | Ninguno: cero iteraciones |

**Regla:** no se modifica `i` dentro del cuerpo. El ciclo `Desde` ya lo actualiza.

## Ejemplo: calificaciones de un grupo

```text
Mostrar "Número de alumnos: "
Entrada: alumnos
suma = 0
aprobados = 0
mayor = -1                      // menor que cualquier calificación válida
menor = 11                      // mayor que cualquier calificación válida
Desde i = 1 Hasta alumnos Con Paso 1 Hacer
    Mostrar "Calificación del alumno ", i, ": "
    Entrada: calificacion
    suma = suma + calificacion
    Si calificacion >= 6 Entonces
        aprobados = aprobados + 1
    FinSi
    Si calificacion > mayor Entonces
        mayor = calificacion
    FinSi
    Si calificacion < menor Entonces
        menor = calificacion
    FinSi
FinDesde
promedio = suma / alumnos
```

## Calificaciones de un grupo: prueba y supuesto

Con 5 alumnos y las calificaciones 8, 5.5, 9.5, 7, 6: promedio 7.2, aprobados 4, mayor 9.5, menor 5.5.

**Supuesto:** `alumnos >= 1`. Con 0, el ciclo no se ejecuta y `suma / alumnos` es una división entre cero.

## Actividad guiada · Interés compuesto

Una inversión de $10,000 gana 10 % anual sobre el saldo acumulado *(tasa ficticia)*. Queremos mostrar el saldo al final de cada año.

1. ¿Cuántas veces se repite el cálculo? ¿Se conoce antes de empezar?
2. ¿Qué ciclo conviene? ¿Qué variable acumula?
3. Escribe el algoritmo para un número de años que proporciona el usuario.
4. Completa la tabla para 3 años:

| Año | Saldo al final del año |
|---:|---:|
| 1 | |
| 2 | |
| 3 | |

**Pregunta final:** ¿cuántos años tarda en **duplicarse** la inversión? ¿Por qué esa pregunta ya no se resuelve bien con `Desde`?

**Producto:** pseudocódigo de las dos versiones y tabla completa.

## Qué sigue

Continúa con [11. Resolución de problemas con ciclos](/materias/logica-programacion/unidad-04/11-problemas-con-ciclos/).
