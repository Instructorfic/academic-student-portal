---
title: "Laboratorio 02 — Reglas de cobro"
description: "Unidad IV de Lógica de Programación — reglas de cobro, Cafetería El Byte."
---

**Bloque:** 4.2 — Estructuras condicionales

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Duración estimada | Dos sesiones de laboratorio (1 hora cada una) más el tiempo de cierre fuera de clase |
| Modalidad | Individual |
| Punto de partida | Tu programa del Laboratorio 01 |

---

## 1. Situación

El ticket del Laboratorio 01 funciona, pero la encargada de la **Cafetería El Byte** encontró problemas en la primera semana:

- Un cajero presionó Enter cuatro veces sin capturar nada y el programa imprimió un ticket de $0.
- Un cliente pagó $100 por un pedido de $143 y el ticket le mostró un cambio de −$43.
- La cafetería lanzó una promoción y da descuentos a estudiantes y personal, pero el cajero los calcula a mano.
- Algunos clientes pagan con tarjeta y el programa siempre pide efectivo.

Tu programa tiene que **decidir**.

---

## 2. Objetivo

Ampliar el programa del Laboratorio 01 con estructuras condicionales simples, dobles, múltiples y anidadas para aplicar las reglas de cobro de la cafetería, y verificar cada ruta del algoritmo con un plan de pruebas.

---

## 3. Lo que vas a demostrar

- [ ] Identificas qué tipo de condicional requiere cada regla.
- [ ] Usas una condicional múltiple (`Segun`) con su caso `De Otro Modo`.
- [ ] Anidas una decisión que depende de otra.
- [ ] Ordenas las decisiones para no superar tres niveles de anidamiento.
- [ ] Diseñas un plan de pruebas que recorre todas las rutas y las fronteras.

---

## 4. Prerrequisitos

**Conocimientos:** bloque 4.2 completo y la [especificación de estructuras](/materias/logica-programacion/unidad-04/especificacion-estructuras/) de la unidad.

**Herramienta:** PSeInt con el perfil **Flexible**.

**Archivo:** tu `lab01_ticket_<apellido>.psc` y su pseudocódigo. Si tu Laboratorio 01 tuvo observaciones, corrígelas antes de empezar.

---

## 5. Reglas de cobro

El menú y los precios no cambian (precios con IVA incluido):

| Código | Producto | Precio |
|---:|---|---:|
| 1 | Café americano | $25.00 |
| 2 | Capuchino | $38.00 |
| 3 | Sándwich de pollo | $55.00 |
| 4 | Agua embotellada | $15.00 |

| # | Regla | Estructura que practica |
|---|---|---|
| R1 | **Pedido vacío.** Si el pedido no tiene artículos, se muestra "Pedido vacío" y no se cobra nada. | Condicional (primera rama de la decisión principal) |
| R2 | **Combo desayuno.** Si el pedido tiene al menos un café americano **y** al menos un sándwich, se descuentan $10 del subtotal. Se aplica una sola vez por pedido. | Simple con condición compuesta |
| R3 | **Tipo de cliente.** 1 = estudiante (10 % de descuento), 2 = personal (5 %), 3 = público general (sin descuento). Cualquier otro código: "Tipo de cliente no válido" y no se cobra. El porcentaje se aplica **después** del combo. | Múltiple (`Segun`) |
| R4 | **Forma de pago.** 1 = efectivo, 2 = tarjeta. Con tarjeta no se pide importe ni se calcula cambio. | Doble |
| R5 | **Pago insuficiente.** En efectivo, si el importe recibido no alcanza, se muestra cuánto falta en lugar del cambio. | Anidada (dentro de efectivo) |

El descuento del cliente y el total se redondean a centavos con `redon(x * 100) / 100`. La base sin IVA y el IVA se calculan sobre el **total con descuentos**.

---

## 6. Orden de las decisiones

Si cada regla se anida dentro de la anterior, el algoritmo llega a cuatro o cinco niveles. Para evitarlo:

1. Lee primero **todas** las cantidades y el tipo de cliente.
2. Resuelve el tipo de cliente con `Segun` y guarda si es válido en una variable `LOGICO`.
3. Usa una cadena para la decisión principal:

```text
Si <pedido vacío> Entonces
    ...
Sino Si <cliente no válido> Entonces
    ...
Sino
    ... cobro: combo, descuentos, ticket, forma de pago
FinSi
```

4. Dentro del cobro, la forma de pago (doble) y, dentro de efectivo, el pago suficiente (anidada).

Así el nivel más profundo es el tercero.

---

## 7. Procedimiento

### Paso 1 — Análisis de las decisiones

En tu hoja de trabajo agrega una tabla de decisiones:

| Regla | Condición | Tipo de condicional | Rutas que genera |
|---|---|---|---|
| R1 | | | |
| R2 | | | |
| R3 | | | |
| R4 | | | |
| R5 | | | |

Declara como constantes el descuento del combo y los porcentajes de cada tipo de cliente.

> **Punto de verificación 1:** ¿Cuántas rutas distintas tiene tu algoritmo de principio a fin? Cuéntalas antes de escribir el pseudocódigo.

### Paso 2 — Pseudocódigo

Parte del pseudocódigo del Laboratorio 01 y agrega las decisiones en el orden de la sección 6. El ticket muestra, en este orden:

1. Encabezado y detalle de productos (igual que en el Laboratorio 01)
2. Número de artículos y subtotal
3. La línea "Combo desayuno: -$10" **solo si** se aplicó
4. El descuento del cliente
5. Total, base sin IVA e IVA
6. Forma de pago y, en efectivo, pago y cambio o faltante

### Paso 3 — Plan de pruebas

Completa la tabla con tu prueba de escritorio **antes** de usar PSeInt.

| Caso | Americano | Capuchino | Sándwich | Agua | Cliente | Pago con | Importe | Total esperado | Resultado esperado |
|---|---:|---:|---:|---:|---:|---|---:|---:|---|
| Estudiante en efectivo | 2 | 1 | 1 | 0 | 1 | Efectivo | 200 | | |
| Público con tarjeta | 0 | 2 | 0 | 1 | 3 | Tarjeta | — | | |
| Personal, efectivo insuficiente | 1 | 0 | 1 | 1 | 2 | Efectivo | 50 | | |
| Pedido vacío | 0 | 0 | 0 | 0 | 1 | — | — | — | |
| Cliente no válido | 1 | 0 | 0 | 0 | 7 | — | — | — | |
| Pago exacto | 0 | 0 | 1 | 1 | 3 | Efectivo | 70 | | |
| Combo con tarjeta | 1 | 0 | 1 | 0 | 2 | Tarjeta | — | | |

> **Punto de verificación 2:** ¿Cada regla (R1 a R5) aparece en al menos un caso con la condición verdadera y en otro con la condición falsa?

### Paso 4 — Traducción y ejecución en PSeInt

Traduce con las reglas de la [especificación de estructuras](/materias/logica-programacion/unidad-04/especificacion-estructuras/). Recuerda que la cadena `Sino Si` se traduce con `Si` anidados dentro de cada `SiNo`.

> **Punto de verificación 3:** ¿Los siete casos coinciden con tu plan de pruebas?

### Paso 5 — Supuestos que todavía no se revisan

Ejecuta el programa escribiendo `3` como forma de pago. Anota qué ocurre y responde la reflexión.

---

## 8. Si algo no funciona

| Síntoma | Causa probable | Qué revisar |
|---|---|---|
| El combo se aplica con solo un café | Se usó `O` en lugar de `Y` | Condición de R2 |
| El descuento del estudiante se calcula sobre $143 en lugar de $133 | El porcentaje se aplicó antes de restar el combo | Orden de los cálculos |
| Con el cliente 7 se imprime el ticket | Falta `De Otro Modo` o no se revisa la variable `LOGICO` | R3 y la cadena principal |
| Con tarjeta se pide el importe recibido | La entrada del pago está fuera de la rama de efectivo | Ubicación de `Entrada: pago` |
| PSeInt marca error en `Sino Si` | Se tradujo la cadena en una sola línea | Traducción con `Si` anidados |
| Se muestra "Combo desayuno: -$0" | La línea del combo no está dentro de su condicional simple | R2 en la salida |

---

## 9. Preguntas de reflexión

1. ¿Qué hizo tu programa con la forma de pago `3`? ¿Es correcto? ¿Qué estructura usarías para responder "Forma de pago no válida"?
2. ¿Por qué el tipo de cliente se resolvió con `Segun` y el pedido vacío no?
3. Si la cafetería decide que el combo se aplica **por cada pareja** de americano y sándwich (dos americanos y dos sándwiches = $20 de descuento), ¿se necesita una condicional más o basta un cálculo? Escribe la expresión.
4. Si el cajero se equivoca en el tipo de cliente, hoy tiene que volver a capturar todo el pedido. ¿Qué estructura permitiría pedir de nuevo solo ese dato?

---

## 10. Reto adicional (opcional)

Implementa la regla de la pregunta 3: un descuento de $10 por cada combo completo. Pista: el número de combos es el menor entre la cantidad de americanos y la de sándwiches.

---

## 11. Entrega

| Evidencia | Requerida |
|---|---|
| Tabla de decisiones (Paso 1) | Sí |
| Pseudocódigo | Sí |
| Diagrama de flujo de la decisión principal y de la forma de pago | Sí |
| Plan de pruebas de los siete casos | Sí |
| Archivo `.psc` de PSeInt | Sí |
| Captura de pantalla de los casos "Estudiante en efectivo" y "Personal, efectivo insuficiente" | Sí |
| Respuestas de reflexión | Sí |
| Reto adicional | No |

Nombre del archivo PSeInt: `lab02_reglas_<apellido>.psc`. Conserva este archivo: es el punto de partida del Laboratorio 03.

Medio y fecha de entrega: los indica el profesor.

---

## 12. Evaluación

Lista de cotejo:

| Criterio | Cumple | No cumple |
|---|:---:|:---:|
| La tabla de decisiones identifica correctamente el tipo de condicional de cada regla | | |
| R1: el pedido vacío no imprime ticket | | |
| R2: el combo usa una condición compuesta con `Y` y su línea solo aparece cuando se aplica | | |
| R3: el tipo de cliente usa `Segun` con `De Otro Modo` y el porcentaje se aplica después del combo | | |
| R4 y R5: con tarjeta no se pide importe y en efectivo se muestra cambio o faltante | | |
| El anidamiento no supera tres niveles | | |
| Los descuentos y el total se redondean a centavos | | |
| El plan de pruebas cubre todas las rutas y sus resultados son correctos | | |
| La ejecución en PSeInt coincide con el plan de pruebas | | |
| Las respuestas de reflexión identifican los supuestos que aún no se revisan | | |
