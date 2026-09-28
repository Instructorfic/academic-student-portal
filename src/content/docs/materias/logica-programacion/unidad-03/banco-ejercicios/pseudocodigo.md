---
title: "Ejercicios — Pseudocódigo"
description: "Unidad III de Lógica de Programación — ejercicios para desarrollar algoritmos secuenciales en pseudocódigo, transformarlos en diagramas de flujo y verificarlos en PSeInt (etapa 3.2.5)."
---

**Etapa:** 3.2.5 Desarrollo de la solución algorítmica.

Notación de la unidad:

| Elemento | Notación |
| --- | --- |
| Inicio y fin | `Inicio` … `Fin` |
| Tipos | `ENTERO`, `REAL`, `CADENA`, `CARACTER`, `LOGICO` |
| Variables | camelCase |
| Constantes | SCREAMING_SNAKE_CASE |
| Entrada | `Entrada:` |
| Salida | `Mostrar` |
| Asignación | `=` |

En el pseudocódigo no utilices instrucciones de PSeInt ni de ningún
lenguaje de programación. Para los diagramas de flujo consulta la
[Especificación de diagramas de flujo](/materias/logica-programacion/unidad-03/especificacion-diagramas-flujo/)
y para la verificación, la
[Traducción del pseudocódigo a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/).

## Ejemplo — Área de un triángulo

**Modalidad:** ejemplo desarrollado en clase (se resuelve paso a paso en
la [presentación de la unidad](/materias/logica-programacion/unidad-03/presentacion/)).
**Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/).

**Propósito:** construir un algoritmo secuencial que utilice datos de
entrada, una constante, una fórmula matemática y un resultado
calculado.

### Problema

Desarrolla un algoritmo que calcule el área de un triángulo a partir de
su base y su altura. El área se obtiene multiplicando la base por la
altura y dividiendo el resultado entre 2. La base y la altura deben ser
mayores que cero.

### Qué debes hacer

Realiza el análisis del problema y desarrolla el pseudocódigo
correspondiente. Utiliza SCREAMING_SNAKE_CASE para la constante y
camelCase para las variables.

### Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Normal | base = 10, altura = 6 | area = 30 |
| Límite | base = 1, altura = 1 | area = 0.5 |

### Criterios de revisión

- [ ] Identifica correctamente los datos de entrada.
- [ ] Identifica correctamente el resultado esperado.
- [ ] Define correctamente la constante.
- [ ] Utiliza tipos de datos adecuados.
- [ ] Aplica correctamente la fórmula.
- [ ] Produce los resultados esperados.

## Actividad guiada — Área de un rectángulo

**Modalidad:** actividad guiada en clase. **Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/).

**Propósito:** construir un algoritmo secuencial para calcular un
resultado a partir de dos datos de entrada.

### Problema

Desarrolla un algoritmo que calcule el área de un rectángulo a partir
de su base y su altura. La base y la altura deben ser mayores que cero.

### Qué debes hacer

Realiza el análisis del problema y desarrolla el pseudocódigo.

### Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Normal | base = 8, altura = 5 | area = 40 |
| Límite | base = 1, altura = 1 | area = 1 |

### Criterios de revisión

- [ ] Identifica correctamente las entradas.
- [ ] Identifica correctamente la salida.
- [ ] Utiliza el tipo de dato adecuado para los datos numéricos.
- [ ] Aplica correctamente la fórmula.
- [ ] Produce el resultado esperado.

## Actividad guiada — De lenguaje natural a pseudocódigo

**Modalidad:** actividad guiada en clase. **Instrumento:**
[Ficha de transformación de representaciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-transformacion/).

**Propósito:** transformar una descripción secuencial expresada en
lenguaje natural en pseudocódigo estructurado.

### Problema

Un algoritmo debe calcular el perímetro de un rectángulo.

1. El usuario proporciona la base y la altura.
2. El algoritmo calcula el perímetro multiplicando por dos la suma de la
   base y la altura.
3. Finalmente muestra el perímetro.

La base y la altura deben ser mayores que cero. El algoritmo debe
producir el perímetro del rectángulo.

### Qué debes hacer

1. Transforma la descripción anterior en pseudocódigo.
2. Utiliza la notación establecida para la unidad.
3. Utiliza tipos de datos explícitos para las variables.
4. Utiliza camelCase para las variables.

### Criterios de revisión

- [ ] Incluye `Inicio` y `Fin`.
- [ ] Declara correctamente los tipos de datos.
- [ ] Solicita los datos de entrada.
- [ ] Calcula correctamente el perímetro.
- [ ] Muestra el resultado.
- [ ] Utiliza la notación establecida.

## Práctica — Promedio de tres calificaciones

**Modalidad:** práctica en clase. **Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/).

**Propósito:** construir un algoritmo que utilice tres datos de entrada
para obtener un resultado mediante operaciones aritméticas.

### Problema

Desarrolla un algoritmo que calcule el promedio de tres calificaciones
de un estudiante. Cada calificación debe estar entre 0 y 100
inclusive.

### Qué debes hacer

Realiza el análisis del problema y desarrolla el pseudocódigo.

### Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Normal | 80, 90, 70 | promedio = 80 |
| Límite | 0, 0, 0 | promedio = 0 |

### Criterios de revisión

- [ ] Identifica correctamente las tres entradas.
- [ ] Identifica correctamente el resultado.
- [ ] Utiliza el tipo de dato adecuado.
- [ ] Respeta el rango establecido.
- [ ] Calcula correctamente el promedio.

## Práctica — Pseudocódigo a diagrama de flujo: área de un rectángulo

**Modalidad:** práctica en clase. **Instrumento:**
[Ficha de transformación de representaciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-transformacion/).

**Propósito:** transformar un algoritmo expresado en pseudocódigo a una
representación mediante diagrama de flujo.

### Pseudocódigo

```text
Inicio

REAL base
REAL altura
REAL area

Entrada: base
Entrada: altura

area = base * altura

Mostrar area

Fin
```

### Qué debes hacer

Representa el algoritmo mediante un diagrama de flujo. Utiliza los
símbolos de la
[Especificación de diagramas de flujo](/materias/logica-programacion/unidad-03/especificacion-diagramas-flujo/):

- terminal para `Inicio` y `Fin`;
- entrada (paralelogramo) para cada `Entrada:`;
- salida en pantalla para cada `Mostrar`;
- proceso para el cálculo;
- línea de flujo entre cada par de símbolos.

Las declaraciones de variables sin valor (`REAL base`, `REAL altura`,
`REAL area`) no se representan en el diagrama.

### Criterios de revisión

- [ ] El diagrama representa todas las instrucciones.
- [ ] El orden de ejecución es correcto.
- [ ] La entrada de datos está representada correctamente.
- [ ] El cálculo está representado como procesamiento.
- [ ] La salida está representada correctamente.
- [ ] El diagrama tiene un inicio y un fin.

## Práctica — Pseudocódigo a diagrama de flujo: promedio de tres calificaciones

**Modalidad:** práctica en clase. **Instrumento:**
[Ficha de transformación de representaciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-transformacion/).

### Problema

Un estudiante necesita calcular el promedio de tres calificaciones. El
usuario proporciona tres calificaciones y el algoritmo calcula el
promedio aritmético.

### Pseudocódigo

```text
Inicio

REAL calificacion1
REAL calificacion2
REAL calificacion3
REAL promedio

Entrada: calificacion1
Entrada: calificacion2
Entrada: calificacion3

promedio = (calificacion1 + calificacion2 + calificacion3) / 3

Mostrar promedio

Fin
```

### Qué debes hacer

Transforma el pseudocódigo anterior en un diagrama de flujo. El
diagrama debe representar exactamente las siguientes operaciones y en
el mismo orden:

1. Inicio
2. Entrada de `calificacion1`
3. Entrada de `calificacion2`
4. Entrada de `calificacion3`
5. Cálculo de `promedio`
6. `Mostrar promedio`
7. Fin

**Reglas:**

- No agregues decisiones.
- No agregues ciclos.
- No agregues operaciones que no aparecen en el pseudocódigo.
- Conserva exactamente los identificadores.
- Conserva el orden de ejecución.
- Utiliza los símbolos de la especificación: terminal (`Inicio`,
  `Fin`), entrada (cada `Entrada:`), salida en pantalla (el `Mostrar`),
  proceso (cálculo de `promedio`) y línea de flujo.
- Las declaraciones de variables sin valor no se representan en el
  diagrama.

### Criterios de revisión

- [ ] Representa todos los pasos del pseudocódigo.
- [ ] Utiliza la simbología correspondiente.
- [ ] Conserva el orden de ejecución.
- [ ] Conserva los identificadores.
- [ ] Representa correctamente las tres entradas.
- [ ] Representa correctamente la operación.
- [ ] Representa correctamente la salida.
- [ ] No agrega operaciones inexistentes.

## Tarea — Conversión de Celsius a Fahrenheit

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor. **Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/).

**Propósito:** construir un algoritmo que transforme un valor
utilizando una fórmula matemática.

### Problema

Desarrolla un algoritmo que convierta una temperatura expresada en
grados Celsius a grados Fahrenheit.

La conversión se realiza multiplicando la temperatura en grados Celsius
por 9/5 y sumando 32 al resultado.

No se establece una restricción sobre el valor de la temperatura en
grados Celsius.

### Qué debes hacer

1. Realiza el análisis del problema y desarrolla el pseudocódigo.
2. Realiza una prueba de escritorio con cada caso de prueba.
3. Después de terminar el pseudocódigo y su prueba, traduce el
   pseudocódigo a PSeInt siguiendo la
   [Traducción del pseudocódigo a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/)
   (perfil Flexible).
4. Ejecuta la traducción con cada caso de prueba y registra el
   resultado obtenido.
5. Si un resultado no coincide, corrige el **pseudocódigo** y vuelve a
   traducir. No modifiques el pseudocódigo para adaptarlo a PSeInt.

### Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Normal | 25 | 77 |
| Especial | 0 | 32 |

### Evidencia requerida

| Representación | Requerida |
| --- | --- |
| Pseudocódigo | Sí |
| Diagrama de flujo | No |
| Traducción a PSeInt | Sí |
| Ejecución en PSeInt con los casos de prueba | Sí (resultado obtenido de cada caso) |

### Criterios de revisión

- [ ] Utiliza el tipo de dato adecuado para la temperatura.
- [ ] Utiliza identificadores descriptivos.
- [ ] Utiliza correctamente las constantes.
- [ ] Aplica correctamente la fórmula.
- [ ] Produce los resultados esperados.
- [ ] La traducción a PSeInt conserva los identificadores y el orden de
  las instrucciones del pseudocódigo.
- [ ] Los resultados obtenidos en PSeInt coinciden con los resultados
  esperados.

## Tarea — Costo total de una compra

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor. **Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/).

**Propósito:** construir un algoritmo que descomponga un cálculo en
operaciones intermedias.

### Problema

Desarrolla un algoritmo que calcule el importe total de una compra
considerando el precio unitario, la cantidad adquirida y un impuesto
del 16 por ciento.

El algoritmo debe mostrar el importe antes del impuesto, el importe
correspondiente al impuesto y el importe final de la compra.

**Restricciones:**

- El precio unitario debe ser mayor que cero.
- La cantidad debe ser un número entero mayor que cero.

### Qué debes hacer

1. Realiza el análisis del problema y desarrolla el pseudocódigo.
2. Realiza una prueba de escritorio con cada caso de prueba.
3. Traduce el pseudocódigo a PSeInt siguiendo la
   [Traducción del pseudocódigo a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/)
   (perfil Flexible), ejecútalo con cada caso de prueba y registra el
   resultado obtenido.
4. Si un resultado no coincide, corrige el **pseudocódigo** y vuelve a
   traducir. No modifiques el pseudocódigo para adaptarlo a PSeInt.

### Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Normal | precio unitario = 100, cantidad = 2 | subtotal = 200, impuesto = 32, total = 232 |
| Límite | precio unitario = 1, cantidad = 1 | subtotal = 1, impuesto = 0.16, total = 1.16 |

### Evidencia requerida

| Representación | Requerida |
| --- | --- |
| Pseudocódigo | Sí |
| Diagrama de flujo | No |
| Traducción a PSeInt | Sí |
| Ejecución en PSeInt con los casos de prueba | Sí (resultado obtenido de cada caso) |

### Criterios de revisión

- [ ] Identifica correctamente las entradas.
- [ ] Identifica correctamente los resultados intermedios y finales.
- [ ] Define correctamente la constante.
- [ ] Calcula correctamente el subtotal.
- [ ] Calcula correctamente el impuesto.
- [ ] Calcula correctamente el total.
- [ ] La traducción a PSeInt conserva los identificadores y el orden de
  las instrucciones del pseudocódigo.
- [ ] Los resultados obtenidos en PSeInt coinciden con los resultados
  esperados.
