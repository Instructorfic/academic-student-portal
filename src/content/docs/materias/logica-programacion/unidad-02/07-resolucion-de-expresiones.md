---
title: "7. Resolución de expresiones"
description: "Unidad II de Lógica de Programación — jerarquía completa de operadores, asociatividad y ocho ejemplos guiados de resolución paso a paso."
---

## Una expresión puede tener varias operaciones

Observa `5 + 3 * 2`. ¿El resultado es 16? No: primero debemos determinar qué operación se realiza. La multiplicación tiene prioridad sobre la suma:

```text
5 + (3 * 2)
5 + 6
11
```

## ¿Qué pasa con los paréntesis?

Ahora `(5 + 3) * 2`: primero `5 + 3 = 8`, después `8 * 2 = 16`.

> **Los paréntesis permiten indicar explícitamente qué operaciones queremos realizar primero.**

## Jerarquía completa de operadores

Ya vimos que la multiplicación se resuelve antes que la suma. Pero una expresión puede combinar tres tipos de operadores: los **aritméticos** (calculan), los **relacionales** (comparan) y los **lógicos** (combinan condiciones). Cuando aparecen juntos en una misma expresión, necesitamos una jerarquía completa, no solo la de la aritmética.

> **A mayor jerarquía, primero se resuelve. A menor jerarquía, se resuelve al final.**

| Nivel | Operadores | Tipo |
| --- | --- | --- |
| 1 | `( )` | Agrupación |
| 2 | Funciones matemáticas (`sqrt`, `abs`, `pow`, etc.) | — |
| 3 | `*` `/` `%` | Aritméticos |
| 4 | `+` `-` | Aritméticos |
| 5 | `<` `>` `<=` `>=` `=` `<>` | Relacionales |
| 6 | `NO` | Lógico |
| 7 | `Y` | Lógico |
| 8 | `O` | Lógico |

> **Alcance de la unidad.** Este orden es un criterio general de resolución de expresiones, no la sintaxis de un lenguaje de programación en particular. La notación exacta puede variar según la herramienta.

## Un detalle importante: la asociatividad

Cuando dos operadores tienen el **mismo nivel**, no basta con saber "cuál va primero": necesitamos saber en qué orden se leen. Observa `20 - 6 + 4`: `+` y `-` tienen el mismo nivel y se resuelven de izquierda a derecha:

```text
(20 - 6) + 4
14 + 4
18
```

> **Cuando los operadores tienen la misma prioridad, la asociatividad determina el orden.**

### La asociatividad también aplica en multiplicación/división

`8 / 2 * 4`: un error común es asumir que la división "siempre va después". `/` y `*` tienen el mismo nivel y se resuelven de izquierda a derecha:

```text
(8 / 2) * 4
4 * 4
16
```

> **No es "primero multiplicación, después división". Es: mismo nivel → izquierda a derecha.**

## Ejemplos guiados

### Nivel 1 — Un solo operador

`6 + 4`. Un operador, dos operandos, sin ambigüedad: `6 + 4 = 10`.

### Nivel 2 — Dos operadores de distinto nivel

`6 + 4 * 2`. El `*` tiene mayor jerarquía que `+`:

```text
6 + (4 * 2)
6 + 8
14
```

### Nivel 3 — Paréntesis que alteran el orden natural

`(6 + 4) * 2`. El paréntesis obliga a resolver la suma primero:

```text
(6 + 4) * 2
10 * 2
20
```

Mismos números, mismos operadores: **resultado distinto según la agrupación**.

### Nivel 4 — Tres niveles de aritmética combinados

`2 + 3 * (4 - 1)`.

1. Paréntesis: `4 - 1 = 3`.
2. Multiplicación: `3 * 3 = 9`.
3. Suma: `2 + 9 = 11`.

### Nivel 5 — De la aritmética a lo relacional

`10 + 5 > 12`. La aritmética siempre se resuelve **antes** que la comparación.

1. `10 + 5 = 15`.
2. `15 > 12 → Verdadero`.

> **Una expresión relacional primero resuelve sus operandos y después compara.**

### Nivel 6 — Dos relaciones combinadas con lógico

`edad >= 18 Y edad <= 65`, con `edad = 30`.

1. Primera relación: `30 >= 18 → Verdadero`.
2. Segunda relación: `30 <= 65 → Verdadero`.
3. Operador lógico: `Verdadero Y Verdadero → Verdadero`.

### Nivel 7 — Aritmética + relacional + lógico

`(precio * cantidad) > 100 Y disponible`, con `precio = 40`, `cantidad = 3`, `disponible = Verdadero`.

1. Paréntesis (aritmética): `40 * 3 = 120`.
2. Relacional: `120 > 100 → Verdadero`.
3. Lógico: `Verdadero Y Verdadero → Verdadero`.

### Nivel 8 — Expresión combinada completa

`NO (edad < 18) Y (tieneIdentificacion O tienePermiso)`, con `edad = 20`, `tieneIdentificacion = Falso`, `tienePermiso = Verdadero`.

1. Paréntesis izquierdo: `edad < 18 → 20 < 18 → Falso`.
2. `NO` sobre ese resultado: `NO Falso → Verdadero`.
3. Paréntesis derecho: `tieneIdentificacion O tienePermiso → Falso O Verdadero → Verdadero`.
4. `Y` final: `Verdadero Y Verdadero → Verdadero`.

> Una expresión compleja no se resuelve de un solo vistazo. Se resuelve nivel por nivel, respetando paréntesis y jerarquía.

## ¿Por qué debemos respetar la prioridad?

Porque una misma expresión puede producir resultados diferentes si cambiamos el orden de las operaciones: `5 + 3 * 2` produce `11`, mientras que `(5 + 3) * 2` produce `16`.

> **Una expresión debe leerse respetando las reglas que determinan su evaluación.**

## Error común

Resolver una expresión de izquierda a derecha ignorando la jerarquía (por ejemplo, calcular `5 + 3` antes que `3 * 2` en `5 + 3 * 2`), o asumir que, entre operadores del mismo nivel, el orden no importa.

## Para reflexionar

- Resuelve paso a paso `8 + 2 * 3 > 10`, indicando qué operador aplicas en cada paso.
- ¿Qué diferencia de resultado obtendrías entre `NO saldo < 0` y `NO (saldo < 0)`, si `NO` tuviera mayor jerarquía que los relacionales? (No es el caso en la tabla anterior — usa esto para confirmar por qué el orden de la tabla importa).

## Actividad y evidencia

Aplica lo estudiado aquí en la
[Actividad 7 — Resolución de expresiones](/materias/logica-programacion/unidad-02/actividades/actividad-7/),
donde resolverás expresiones paso a paso respetando las reglas de prioridad y asociatividad.

## Referencias de este tema

- Joyanes Aguilar, L. (2020). *Fundamentos de programación*, 3.7.2 Reglas de prioridad, 3.7.4 Reglas generales de prioridad y asociatividad. Fuente principal.
- Cairo Battistutti, O. (2015). *Metodología de la programación*. Fuente complementaria. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-02/referencias/).

## Qué sigue

Ya sabes resolver una expresión manualmente respetando sus reglas. El siguiente paso es comprobar ese resultado utilizando una herramienta: continúa con
[8. Herramientas de compilación](/materias/logica-programacion/unidad-02/08-herramientas-de-compilacion/).
