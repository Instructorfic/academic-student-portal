---
title: "Ejercicios — Datos, variables, constantes e identificadores"
description: "Unidad III de Lógica de Programación — ejercicios para seleccionar tipos de datos, distinguir variables de constantes y proponer identificadores (etapa 3.2.2)."
---

**Etapa:** 3.2.2 Análisis del problema. **Instrumento:**
[Hoja de trabajo — Propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica/),
sección 3. Diseño de los datos.

Tipos de datos de la unidad: `ENTERO`, `REAL`, `CADENA`, `CARACTER` y
`LOGICO`. Las variables se escriben en camelCase y las constantes en
SCREAMING_SNAKE_CASE.

## Práctica 1 — Clasificación de tipos de datos

**Modalidad:** práctica en clase, individual.

**Propósito:** seleccionar el tipo de dato adecuado de acuerdo con la
naturaleza de la información que representa.

### Problema

Un sistema requiere almacenar información correspondiente al nombre de
un estudiante, su edad, su promedio, la cantidad de materias inscritas y
si tiene derecho a presentar una evaluación extraordinaria.

| Identificador | Información |
| --- | --- |
| `nombreEstudiante` | Nombre del estudiante |
| `edad` | Edad del estudiante expresada en años |
| `promedio` | Promedio académico del estudiante |
| `cantidadMaterias` | Número de materias inscritas |
| `tieneDerecho` | Indica si el estudiante tiene derecho a presentar la evaluación extraordinaria |

### Qué debes hacer

1. Analiza cada elemento de información indicado en el problema.
2. Asigna a cada elemento uno de los tipos de datos de la unidad:
   `ENTERO`, `REAL`, `CADENA`, `CARACTER` o `LOGICO`.
3. Completa la tabla indicando el identificador, el tipo de dato
   seleccionado y una justificación breve de la elección:

   | Identificador | Tipo de dato | Justificación |
   | --- | --- | --- |
   | `nombreEstudiante` | | |
   | `edad` | | |
   | `promedio` | | |
   | `cantidadMaterias` | | |
   | `tieneDerecho` | | |

No desarrolles el pseudocódigo.

### Criterios de revisión

- [ ] Selecciona un tipo de dato para cada elemento.
- [ ] Utiliza únicamente los tipos establecidos.
- [ ] La selección corresponde a la naturaleza de cada información.

## Práctica 2 — Definición de variables y constantes

**Modalidad:** práctica en clase, individual.

**Propósito:** definir identificadores adecuados para representar
variables y constantes de acuerdo con la naturaleza de los datos.

### Problema

Una empresa desea calcular el importe total de una compra.

- El precio unitario de un producto debe ser proporcionado por el
  usuario.
- La cantidad de productos adquiridos debe ser proporcionada por el
  usuario.
- La tasa de impuesto aplicable es del 16 por ciento y permanece
  constante.
- El algoritmo debe calcular el subtotal y el importe total de la
  compra.

### Qué debes hacer

1. Analiza la información necesaria para resolver el problema.
2. Identifica cuáles elementos deben representarse mediante variables
   y cuál debe representarse mediante una constante.
3. Para cada elemento define:

   | Identificador | Naturaleza (VARIABLE / CONSTANTE) | Tipo de dato | Valor inicial (cuando corresponda) |
   | --- | --- | --- | --- |
   | | | | |

4. Utiliza camelCase para las variables y SCREAMING_SNAKE_CASE para las
   constantes. Los identificadores deben ser descriptivos y no deben
   usar abreviaturas innecesarias.

No desarrolles el pseudocódigo completo.

### Criterios de revisión

- [ ] Identifica correctamente las variables.
- [ ] Identifica correctamente la constante.
- [ ] Utiliza SCREAMING_SNAKE_CASE para la constante.
- [ ] Utiliza camelCase para las variables.
- [ ] Utiliza tipos de datos adecuados.
- [ ] Los identificadores describen claramente la información que
  representan.

## Tarea — Selección de identificadores

**Modalidad:** tarea individual. La fecha y el medio de entrega los
indica el profesor.

**Propósito:** seleccionar identificadores descriptivos que cumplan las
convenciones establecidas para variables y constantes.

### Problema

Un sistema académico requiere almacenar el nombre de un estudiante, su
edad, su promedio académico y la cantidad de materias que cursa. El
sistema también utiliza una constante que representa el número máximo
de materias permitidas.

| Elemento | Naturaleza |
| --- | --- |
| Nombre del estudiante | Variable |
| Edad del estudiante | Variable |
| Promedio académico | Variable |
| Cantidad de materias | Variable |
| Número máximo de materias permitidas | Constante |

### Qué debes hacer

1. Propón un identificador para cada elemento indicado en el problema.
   Utiliza camelCase para las variables y SCREAMING_SNAKE_CASE para las
   constantes.
2. Completa la tabla:

   | Elemento | Naturaleza | Identificador propuesto | Tipo de dato |
   | --- | --- | --- | --- |
   | | | | |

3. Verifica cada identificador de acuerdo con las siguientes reglas:
   - describe claramente la información que representa;
   - no contiene espacios;
   - no contiene caracteres especiales;
   - utiliza la convención de escritura correspondiente;
   - no utiliza abreviaturas innecesarias.

No desarrolles el pseudocódigo.

**Evidencia:** la tabla completa y la lista de verificación marcada.

### Criterios de revisión

- [ ] Los identificadores son descriptivos.
- [ ] Las variables utilizan camelCase.
- [ ] La constante utiliza SCREAMING_SNAKE_CASE.
- [ ] Los identificadores no contienen espacios.
- [ ] Los identificadores no utilizan caracteres especiales.
- [ ] Los identificadores permiten reconocer la información que
  representan.
