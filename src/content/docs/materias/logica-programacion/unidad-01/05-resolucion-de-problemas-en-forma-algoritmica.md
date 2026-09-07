---
title: "5. Resolución de problemas en forma algorítmica"
description: "Unidad I de Lógica de Programación — cómo expresar una solución como secuencia ordenada de pasos y comprobarla con ejemplos."
---

## Expresar una solución como secuencia de pasos

Resolver un problema en forma algorítmica significa expresar su
solución como una **secuencia ordenada de pasos**, sin ambigüedad, que
otra persona (o eventualmente una computadora) pueda seguir para
llegar al mismo resultado.

En esta unidad, esa secuencia se escribe en lenguaje natural ordenado
— todavía no en pseudocódigo formal, que verás en unidades
posteriores.

## Ejemplo integrador: ¿el número es par o impar?

**Problema:** determinar si un número es par o impar.

**Solución algorítmica (en lenguaje natural ordenado):**

```text
1. Pedir un número.
2. Dividir el número entre 2.
3. Si el residuo de la división es 0, el número es par.
4. Si el residuo no es 0, el número es impar.
```

Observa que cada paso es preciso y que el orden importa: no podrías
comprobar el residuo antes de dividir.

## Otro ejemplo: ¿el estudiante aprueba?

**Problema:** determinar si una persona aprueba una asignatura, dado
que se aprueba con calificación 6 o más.

```text
1. Obtener la calificación final.
2. Comparar la calificación con el criterio de aprobación (6).
3. Si cumple el criterio, indicar "Aprobado".
4. Si no lo cumple, indicar "No aprobado".
```

Observa que todavía no escribiste ni una línea de código: ya tienes
una solución algorítmica completa.

## Comprobar antes de implementar

Una solución no debería aceptarse simplemente porque "parece
correcta". En esta unidad la comprobarás mediante ejemplos concretos,
preguntándote:

1. ¿Los pasos están en el orden correcto?
2. ¿Falta alguna acción?
3. ¿Existe algún paso ambiguo?
4. ¿La secuencia permite llegar al resultado esperado?
5. ¿El algoritmo funciona para el ejemplo planteado?

Para el ejemplo de par/impar: 8 → residuo 0 → Par. 7 → residuo 1 →
Impar. 0 → residuo 0 → Par.

### Los casos límite importan especialmente

Para el problema de aprobación: 5 → No aprobado, 7 → Aprobado. Pero
¿qué pasa con **6**, exactamente en el límite establecido? Los casos
límite te obligan a revisar si realmente expresaste la regla que
querías — no basta con probar casos "cómodos".

> **Importante.** Esta comprobación mediante ejemplos **no constituye
> todavía una metodología formal de pruebas de software**. No usarás
> aún los términos "plan de pruebas" ni "depuración" de forma
> técnica — esos conceptos, y una metodología completa de solución de
> problemas, corresponden a unidades posteriores.

## Error común

Aceptar una solución algorítmica sin probarla contra al menos dos
casos distintos (por ejemplo, solo probar con números pares y nunca
con uno impar, o nunca con el caso límite). Un algoritmo que "parece
funcionar" en un solo ejemplo puede fallar en otro.

## Para reflexionar

- Para el ejemplo de par/impar, ¿qué pasaría si alguien invirtiera el
  orden de los pasos 2 y 3? ¿Seguiría siendo un algoritmo correcto?
- ¿Qué caso límite tendría el problema "determinar si una persona es
  mayor de edad"?

## Actividad y evidencia

Este tema se aplica directamente en la
[Actividad 6 — Solución algorítmica de un problema lógico (evidencia de cierre)](/materias/logica-programacion/unidad-01/actividades/actividad-6/),
la evidencia de cierre de la unidad, donde resolverás un problema
lógico completo: descomposición, solución algorítmica en pasos
ordenados, y reflexión final.

## Referencias de este tema

- Cairo Battistutti, O. (2015). *Metodología de la programación*.
  Fuente prioritaria para resolución algorítmica.
- Joyanes Aguilar, L. (2020). *Fundamentos de programación*. Ver
  [Referencias de la unidad](/materias/logica-programacion/unidad-01/referencias/).

## Qué sigue

Ya recorriste los cinco contenidos oficiales de la unidad. Revisa el
[cierre y resumen](/materias/logica-programacion/unidad-01/06-cierre-y-resumen/)
antes de avanzar a la Unidad II.
