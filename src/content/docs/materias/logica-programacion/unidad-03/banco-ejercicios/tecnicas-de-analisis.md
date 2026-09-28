---
title: "Ejercicios — Técnicas de análisis"
description: "Unidad III de Lógica de Programación — ejercicios de descomposición de un problema e identificación de casos (etapa 3.2.4)."
---

**Etapa:** 3.2.4 Técnicas de análisis.

## Actividad guiada — Descomposición de un problema

**Modalidad:** actividad guiada en clase. **Instrumento:**
[Ficha de transformación de representaciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-transformacion/).

### Problema

Una tienda necesita calcular el importe total de una compra de un solo
producto.

El usuario proporciona la cantidad de unidades compradas y el precio de
una unidad.

El sistema debe calcular primero el importe de la compra y
posteriormente aplicar un descuento del 10 %.

El resultado final debe mostrar el importe de la compra antes del
descuento, el descuento aplicado y el importe total que debe pagar el
cliente.

**Restricciones:**

- La cantidad de unidades debe ser un número entero positivo.
- El precio unitario debe ser un número real positivo.
- El descuento corresponde al 10 % del importe de la compra.

### Qué debes hacer

1. Descompón el problema en subproblemas que puedan resolverse de
   manera independiente.
2. Para cada subproblema determina qué cálculo debe realizarse, qué
   datos necesita y qué resultado produce.
3. Completa la tabla:

   | Subproblema | Datos necesarios | Operación | Resultado producido |
   | --- | --- | --- | --- |
   | | | | |
   | | | | |
   | | | | |

4. Escribe en lenguaje natural el orden en que deben ejecutarse los
   subproblemas.

No escribas pseudocódigo.

### Criterios de revisión

- [ ] Identifica los cálculos necesarios.
- [ ] Utiliza los datos correctos en cada cálculo.
- [ ] Establece una dependencia lógica entre los subproblemas.
- [ ] El orden propuesto permite obtener el resultado final.
- [ ] No desarrolla pseudocódigo.

## Actividad guiada — Identificación de casos

**Modalidad:** actividad guiada en clase. **Instrumento:**
[Ficha de comparación de soluciones algorítmicas](/materias/logica-programacion/unidad-03/plantillas/ficha-comparacion/).

### Problema

Una universidad determina la situación académica de un estudiante a
partir de su calificación final.

- La calificación final se expresa mediante un número entero de 0 a
  100.
- Un estudiante se considera aprobado cuando obtiene una calificación
  mayor o igual que 60.
- El sistema debe indicar si el estudiante está **APROBADO** o **NO
  APROBADO**.

### Qué debes hacer

1. Antes de desarrollar una solución algorítmica, identifica los casos
   que debe considerar la solución.
2. Completa la tabla:

   | Caso | Valor de calificación | Condición que se cumple | Resultado esperado |
   | --- | --- | --- | --- |
   | | | | |
   | | | | |
   | | | | |

   Debes incluir obligatoriamente: un valor inferior a 60, el valor 60 y
   un valor superior a 60.

3. Responde: ¿qué condición permite distinguir los dos resultados
   posibles?

No escribas pseudocódigo.

### Criterios de revisión

- [ ] Incluye los tres valores solicitados.
- [ ] Clasifica correctamente cada valor.
- [ ] Identifica correctamente el límite de aprobación.
- [ ] Determina la condición que separa los resultados.
- [ ] No incorpora casos fuera de las restricciones.
