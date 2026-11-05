---
title: "4. Condicional doble (4.2.2)"
description: "Unidad IV de Lógica de Programación — condicional doble, contenido 4.2.2."
---

## Condicional doble

```text
Si <condición> Entonces
    <instrucciones si es verdadera>
Sino
    <instrucciones si es falsa>
FinSi
```

Se ejecuta **exactamente una** de las dos ramas, nunca las dos, nunca ninguna.

Se usa cuando los dos casos posibles necesitan **acciones distintas**.

## Ejemplo: la hora con dos cifras

En la tarea "Hora de llegada" PSeInt mostraba `15:0`. Ahora se puede decidir:

```text
Si minutoLlegada < 10 Entonces
    Mostrar "Hora estimada de llegada: ", horaLlegada, ":0", minutoLlegada
Sino
    Mostrar "Hora estimada de llegada: ", horaLlegada, ":", minutoLlegada
FinSi
```

| `horaLlegada` | `minutoLlegada` | Rama | Pantalla |
|---:|---:|---|---|
| 15 | 0 | Verdadera | `Hora estimada de llegada: 15:00` |
| 8 | 45 | Falsa | `Hora estimada de llegada: 8:45` |
| 1 | 9 | Verdadera | `Hora estimada de llegada: 1:09` |
| 1 | 10 | Falsa | `Hora estimada de llegada: 1:10` |

El valor no cambia. La decisión solo afecta **cómo se muestra**.

## ¿Dos simples o una doble?

<div class="grid-2">

<div class="card accent-rojo">
<strong>Dos simples</strong>

```text
Si nota >= 6 Entonces
    Mostrar "Acreditado"
FinSi
Si nota < 6 Entonces
    Mostrar "No acreditado"
FinSi
```

<p>Evalúa dos condiciones. Si alguien escribe <code>nota > 6</code> en la primera, el 6 no muestra nada.</p>
</div>

<div class="card accent-verde">
<strong>Una doble</strong>

```text
Si nota >= 6 Entonces
    Mostrar "Acreditado"
Sino
    Mostrar "No acreditado"
FinSi
```

<p>Una sola condición. Es imposible que falten o sobren mensajes.</p>
</div>

</div>

Cuando los casos son **complementarios**, usa una doble.

## Actividad guiada · Recibo de luz con validación

Retomamos el recibo de luz del bloque 4.1. Si las lecturas están invertidas, el algoritmo debe mostrar un error y **no** calcular el recibo.

1. ¿Cuál es la condición? ¿Qué pasa si las dos lecturas son iguales?
2. ¿Qué instrucciones van en cada rama? ¿Las entradas van dentro o fuera de la condicional?
3. Escribe el pseudocódigo y dibuja el diagrama de flujo.
4. Prueba con tres casos: normal (15230 y 15488), sin consumo (15488 y 15488) e invertidas (15488 y 15230).

**Producto:** pseudocódigo, diagrama y prueba de escritorio de las tres rutas.

## Recibo de luz con validación: diagrama

<img src="/imagenes/logica-programacion/unidad-04/unidad04_diagrama_lecturas.svg" alt="Diagrama de flujo del recibo de luz con validación. Después de leer las dos lecturas, decisión lecturaActual >= lecturaAnterior. Rama Sí: calcular consumo, importeEnergia y total y mostrarlos. Rama No: mostrar Error: lecturas invertidas. Ambas ramas se unen antes de Fin" width="900">

Las entradas quedan **antes** de la decisión: la condición necesita las dos lecturas.

## Condiciones compuestas

Un rango se revisa con **dos** comparaciones:

```text
Si semestre >= 1 Y semestre <= 10 Entonces
    Mostrar "Semestre registrado"
Sino
    Mostrar "El semestre debe estar entre 1 y 10"
FinSi
```

| Escrito así | Qué ocurre |
|---|---|
| `1 <= semestre <= 10` | No es una condición válida: hay que separar las dos comparaciones |
| `semestre >= 1 O semestre <= 10` | **Siempre** es verdadera: cualquier número cumple al menos una |
| `semestre < 1 O semestre > 10` | Correcta, pero describe lo contrario: el valor **fuera** del rango |

Pregunta de control: con `Y` deben cumplirse **todas**, con `O` basta **una**.

## Qué sigue

Continúa con [5. Condicional múltiple](/materias/logica-programacion/unidad-04/05-condicional-multiple/).
