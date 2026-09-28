---
title: "Ejercicios — Prueba de escritorio y depuración"
description: "Unidad III de Lógica de Programación — ejercicios de trazado de algoritmos y de localización y corrección de errores (etapa 3.2.6)."
---

**Etapa:** 3.2.6 Depuración y plan de pruebas. **Instrumentos:**
[Ficha de trazado de algoritmos](/materias/logica-programacion/unidad-03/plantillas/ficha-trazado/)
y
[Ficha de depuración de algoritmos](/materias/logica-programacion/unidad-03/plantillas/ficha-depuracion/).

Realiza los trazados manualmente: no ejecutes los algoritmos en una
computadora. En la depuración no basta con indicar que algo está mal:
explica qué ocurre, por qué ocurre y cómo se corrige.

## Actividad guiada — Trazado de una secuencia de operaciones

**Modalidad:** actividad guiada en clase. **Instrumento:** ficha de
trazado.

**Propósito:** seguir la ejecución de un algoritmo y registrar los
valores de las variables después de cada operación.

### Algoritmo a analizar

```text
Inicio

REAL precio = 50
ENTERO cantidad = 3
REAL subtotal = precio * cantidad
REAL descuento = 20
REAL total = subtotal - descuento

Mostrar total

Fin
```

### Qué debes hacer

1. Realiza una prueba de escritorio del algoritmo.
2. Registra el valor de cada variable después de cada instrucción que
   modifique su valor.
3. Determina el valor que se muestra al finalizar el algoritmo.

### Criterios de revisión

- [ ] Registra correctamente los valores.
- [ ] Respeta el orden de ejecución.
- [ ] Calcula correctamente cada operación.
- [ ] Obtiene correctamente el valor mostrado.

## Actividad guiada — Corrección de tipos de datos

**Modalidad:** actividad guiada en clase. **Instrumento:** ficha de
depuración.

**Propósito:** identificar inconsistencias entre la naturaleza de un
dato y el tipo utilizado para representarlo.

### Problema

El siguiente algoritmo debe almacenar el nombre de un estudiante, su
edad y su promedio.

```text
Inicio

ENTERO nombreEstudiante = "Carlos"
CADENA edad = 19
ENTERO promedio = 87.5

Mostrar nombreEstudiante
Mostrar edad
Mostrar promedio

Fin
```

### Qué debes hacer

1. Identifica los errores relacionados con los tipos de datos.
2. Corrige el algoritmo sin modificar los valores.

### Criterios de revisión

- [ ] Identifica todos los errores de tipo de dato.
- [ ] Asigna a cada dato el tipo que corresponde a la naturaleza de la
  información.
- [ ] Explica por qué cada tipo original era incorrecto.
- [ ] Conserva los valores originales.

## Práctica — Trazado de intercambio de valores

**Modalidad:** práctica en clase. **Instrumento:** ficha de trazado.

**Propósito:** analizar el cambio de valores de variables durante una
secuencia de asignaciones.

### Algoritmo a analizar

```text
Inicio

ENTERO primerValor = 15
ENTERO segundoValor = 30
ENTERO auxiliar = primerValor

primerValor = segundoValor
segundoValor = auxiliar

Mostrar primerValor
Mostrar segundoValor

Fin
```

### Qué debes hacer

1. Realiza una prueba de escritorio.
2. Registra los valores de `primerValor`, `segundoValor` y `auxiliar`
   después de cada asignación.
3. Determina los dos valores mostrados al finalizar el algoritmo.

### Criterios de revisión

- [ ] Registra correctamente los valores iniciales.
- [ ] Actualiza correctamente las variables.
- [ ] Explica para qué se utiliza `auxiliar`.
- [ ] Determina correctamente los valores finales.

## Práctica — Corrección de una fórmula

**Modalidad:** práctica en clase. **Instrumento:** ficha de depuración.

**Propósito:** identificar y corregir una fórmula que no corresponde al
problema planteado.

### Problema

El siguiente algoritmo debe calcular el área de un triángulo a partir de
su base y su altura.

```text
Inicio

REAL base = 10
REAL altura = 6
REAL area = base + altura

Mostrar area

Fin
```

### Qué debes hacer

1. Identifica el error en el cálculo del área.
2. Corrige únicamente la instrucción que calcula `area`.
3. Realiza una prueba de escritorio con los valores proporcionados.

**Resultado esperado:** `area = 30`

### Criterios de revisión

- [ ] Identifica que la operación utilizada es incorrecta.
- [ ] Utiliza la fórmula correspondiente al área de un triángulo.
- [ ] Obtiene el resultado esperado.

## Tarea — Trazado de operaciones acumuladas

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor. **Instrumento:** ficha de trazado.

**Propósito:** analizar cómo cambia el valor de una variable que recibe
resultados de operaciones sucesivas.

### Algoritmo a analizar

```text
Inicio

    REAL total = 0

    total = total + 25
    total = total + 40
    total = total + 15
    total = total - 10

    Mostrar total

Fin
```

### Qué debes hacer

1. Realiza una prueba de escritorio del algoritmo.
2. Registra el valor de `total` después de cada asignación.
3. Determina el valor que se muestra al finalizar el algoritmo.
4. Explica, con tus propias palabras, qué hace el algoritmo con la
   variable `total`.

**Evidencia:** la ficha con el valor inicial, la tabla de trazado
completa, el valor mostrado y la explicación.

### Criterios de revisión

- [ ] Registra correctamente el valor inicial.
- [ ] Actualiza correctamente `total` en cada operación.
- [ ] Respeta el orden de ejecución.
- [ ] Obtiene correctamente el resultado final.

## Tarea — Corrección del orden de operaciones

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor. **Instrumento:** ficha de depuración.

**Propósito:** identificar errores producidos por ejecutar operaciones
en un orden diferente al requerido por el problema.

### Problema

El algoritmo debe calcular el subtotal de una compra, aplicar un
impuesto del 16 por ciento y obtener el total.

```text
Inicio

REAL precioUnitario = 100
ENTERO cantidad = 2
REAL subtotal = 0
REAL impuesto = 0
REAL total = 0
REAL TASA_IMPUESTO = 0.16

total = subtotal + impuesto
subtotal = precioUnitario * cantidad
impuesto = subtotal * TASA_IMPUESTO

Mostrar total

Fin
```

### Qué debes hacer

1. Identifica el error en el orden de las operaciones.
2. Corrige el algoritmo para que `total` se calcule después de obtener
   `subtotal` e `impuesto`.
3. Realiza una prueba de escritorio del algoritmo corregido.

**Resultado esperado:** `subtotal = 200`, `impuesto = 32`, `total = 232`.

### Criterios de revisión

- [ ] Identifica en qué momento se calcula `total` y qué valores tiene
  disponibles en ese momento.
- [ ] Reordena correctamente las operaciones.
- [ ] Obtiene `subtotal = 200`.
- [ ] Obtiene `impuesto = 32`.
- [ ] Obtiene `total = 232`.
