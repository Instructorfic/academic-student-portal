---
title: "Laboratorio 03 — Cierre de caja"
description: "Unidad IV de Lógica de Programación — cierre de caja, Cafetería El Byte."
---

**Bloque:** 4.3 — Estructuras repetitivas

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Duración estimada | Una sesión de laboratorio (1 hora) más el tiempo de cierre fuera de clase |
| Modalidad | Individual |
| Punto de partida | Tu programa del Laboratorio 02 |

---

## 1. Situación

El programa del Laboratorio 02 cobra bien, pero la encargada de la **Cafetería El Byte** tiene dos quejas:

- Hay que ejecutar el programa otra vez por cada cliente. En la hora de más movimiento eso retrasa la fila.
- Cuando el cajero se equivoca en el tipo de cliente, el programa cancela el pedido y hay que capturarlo completo de nuevo.

Además, al final del turno quiere un **cierre de caja**: cuánto se vendió, cuántos pedidos se cobraron, cuál fue el pedido promedio y cuál fue el mayor.

---

## 2. Objetivo

Ampliar el programa del Laboratorio 02 con estructuras repetitivas para atender varios pedidos en una sola ejecución, validar las entradas sin cancelar el pedido y producir el cierre de caja del turno con contadores, acumuladores y un máximo.

---

## 3. Lo que vas a demostrar

- [ ] Eliges el ciclo adecuado para cada repetición y justificas la elección.
- [ ] Validas entradas con `Repetir`.
- [ ] Usas contadores, acumuladores y un máximo correctamente inicializados.
- [ ] Proteges el cálculo del promedio contra la división entre cero.
- [ ] Pruebas el programa con turnos de cero, uno y varios pedidos cobrados.

---

## 4. Prerrequisitos

**Conocimientos:** bloque 4.3 completo y la sección 9 de la [especificación de estructuras](/materias/logica-programacion/unidad-04/especificacion-estructuras/).

**Herramienta:** PSeInt con el perfil **Flexible**.

**Archivo:** tu `lab02_reglas_<apellido>.psc` y su pseudocódigo, con las observaciones del Laboratorio 02 corregidas.

---

## 5. Requerimientos

Las reglas R1, R2, R4 y R5 del Laboratorio 02 **no cambian**. Cambian o se agregan las siguientes:

| # | Requerimiento | Estructura que practica |
|---|---|---|
| C1 | **Turno completo.** Después de cada pedido se pregunta "¿Registrar otro pedido? (1 sí, 2 no)". El programa termina cuando se responde 2. | `Repetir` (siempre hay al menos un pedido) |
| C2 | **Tipo de cliente válido.** Si el código no es 1, 2 o 3, se pide otra vez. Sustituye a la cancelación por "Tipo de cliente no válido" del Laboratorio 02. | `Repetir` de validación |
| C3 | **Forma de pago válida.** Si no es 1 ni 2, se pide otra vez. Responde a la primera pregunta de reflexión del Laboratorio 02. | `Repetir` de validación |
| C4 | **Pedido cobrado.** Un pedido cuenta como cobrado si se pagó con tarjeta o si el efectivo fue suficiente. Un pedido vacío o con efectivo insuficiente **no** se cobra. | Condicional que actualiza contadores |
| C5 | **Cierre de caja.** Al terminar el turno se muestran los datos de la tabla 5.1. | Contadores, acumulador, máximo |

### 5.1 Cierre de caja

| Dato | Cómo se obtiene |
|---|---|
| Pedidos cobrados | Contador de pedidos cobrados |
| Pedidos no cobrados | Contador de pedidos vacíos o con efectivo insuficiente |
| Pedidos pagados con tarjeta | Contador |
| Total vendido | Acumulador de los totales de los pedidos cobrados |
| Ticket promedio | Total vendido ÷ pedidos cobrados, redondeado a centavos |
| Pedido mayor | Máximo de los totales de los pedidos cobrados |

Si no se cobró ningún pedido, en lugar del ticket promedio y del pedido mayor se muestra "Sin ventas en el turno".

---

## 6. Estructura del programa

```text
<inicializar contadores, acumulador y máximo>
Repetir
    <leer cantidades>
    <leer tipo de cliente con validación>
    <cadena del Laboratorio 02: pedido vacío / cobro>
        <dentro del cobro: leer forma de pago con validación>
        <efectivo o tarjeta, pago suficiente o insuficiente>
        <actualizar contadores y acumuladores solo si se cobró>
    <preguntar si hay otro pedido>
Hasta Que <no hay otro pedido>
<cierre de caja>
```

El ciclo del turno agrega un nivel de anidamiento a todo lo que ya tenías. **Dentro** del ciclo se conserva el límite de tres niveles del Laboratorio 02.

¿Dónde se inicializan los contadores, dentro o fuera del ciclo del turno? Justifícalo en tu reporte.

---

## 7. Procedimiento

### Paso 1 — Análisis de las repeticiones

| Repetición | Ciclo elegido | ¿Por qué? | Condición de salida |
|---|---|---|---|
| Atender pedidos | | | |
| Validar tipo de cliente | | | |
| Validar forma de pago | | | |

| Variable del cierre | Patrón | Valor inicial | ¿Dónde se actualiza? |
|---|---|---|---|
| | | | |

> **Punto de verificación 1:** ¿Alguna de tus variables del cierre se inicializa dentro del ciclo del turno? Si es así, ¿qué pasaría al final?

### Paso 2 — Pseudocódigo

Parte del pseudocódigo del Laboratorio 02. Elimina la rama "Tipo de cliente no válido" (ya no es posible llegar a ella) y agrega los ciclos y el cierre.

### Paso 3 — Prueba de escritorio de un turno

Turno de prueba (cada fila es un pedido, en este orden):

| Pedido | Americano | Capuchino | Sándwich | Agua | Cliente | Pago con | Importe |
|---:|---:|---:|---:|---:|---|---|---:|
| 1 | 2 | 1 | 1 | 0 | Primero 7, después 1 | Efectivo | 200 |
| 2 | 0 | 2 | 0 | 1 | 3 | Primero 5, después tarjeta (2) | — |
| 3 | 1 | 0 | 1 | 1 | 2 | Efectivo | 50 |
| 4 | 0 | 0 | 0 | 0 | 1 | — | — |
| 5 | 1 | 0 | 1 | 0 | 2 | Tarjeta (2) | — |

Completa una fila por pedido:

| Pedido | Total del pedido | ¿Cobrado? | Cobrados | No cobrados | Con tarjeta | Total vendido | Pedido mayor |
|---:|---:|---|---:|---:|---:|---:|---:|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |

Cierre esperado: ________________________________________

> **Punto de verificación 2:** ¿El total vendido coincide con la suma de los totales de los pedidos cobrados?

### Paso 4 — Traducción y ejecución en PSeInt

Ejecuta el turno de prueba completo en una sola ejecución.

> **Punto de verificación 3:** ¿El cierre de caja de PSeInt coincide con tu prueba de escritorio?

### Paso 5 — Turnos límite

Ejecuta dos turnos más y registra el cierre:

| Turno | Pedidos | Cierre esperado | Cierre obtenido |
|---|---|---|---|
| Sin ventas | Un solo pedido vacío | | |
| Un pedido | Solo el pedido 5 del turno de prueba | | |

---

## 8. Si algo no funciona

| Síntoma | Causa probable | Qué revisar |
|---|---|---|
| El programa nunca termina | La condición de `Hasta Que` no puede cumplirse o la respuesta no se lee dentro del ciclo | Condición de C1 |
| El programa termina después del primer pedido | La condición de `Hasta Que` está invertida | `Hasta Que otroPedido = 2` |
| El total vendido solo tiene el último pedido | El acumulador se inicializa dentro del ciclo | Inicialización antes de `Repetir` |
| El pedido con efectivo insuficiente suma al total vendido | La actualización está fuera de la rama del pago suficiente | Ubicación de las actualizaciones (C4) |
| Error de división entre cero en el cierre | No se revisó que haya pedidos cobrados | Condicional antes del promedio |
| La validación acepta el tipo de cliente 7 | Condición de `Hasta Que` escrita como si fuera de `Mientras` | Debe terminar cuando el dato **es válido** |

---

## 9. Preguntas de reflexión

1. ¿Por qué el ciclo del turno es `Repetir` y no `Desde`? ¿En qué situación de la cafetería sí usarías `Desde`?
2. Un pedido con efectivo insuficiente hoy se pierde. ¿Cómo cambiarías el programa para pedir el importe otra vez hasta que alcance? ¿Cuántos niveles de anidamiento tendría?
3. Si el pedido mayor se inicializa en 0, ¿hay algún caso en que el resultado sea incorrecto? ¿Por qué no ocurre en esta cafetería?
4. El programa ya tiene más de 100 líneas y repite las mismas validaciones. ¿Qué dificultades notas para leerlo y modificarlo?

---

## 10. Reto adicional (opcional)

Agrega al cierre de caja cuántas piezas se vendieron de cada producto en el turno (solo de los pedidos cobrados) y cuál fue el producto más vendido.

---

## 11. Entrega

| Evidencia | Requerida |
|---|---|
| Tablas de análisis (Paso 1) | Sí |
| Pseudocódigo | Sí |
| Diagrama de flujo del ciclo del turno y del cierre | Sí |
| Prueba de escritorio del turno de prueba | Sí |
| Archivo `.psc` de PSeInt | Sí |
| Captura del cierre de caja del turno de prueba y del turno sin ventas | Sí |
| Respuestas de reflexión | Sí |
| Reto adicional | No |

Nombre del archivo PSeInt: `lab03_cierre_<apellido>.psc`. Es el punto de partida del proyecto de la unidad.

Medio y fecha de entrega: los indica el profesor.

---

## 12. Evaluación

Lista de cotejo:

| Criterio | Cumple | No cumple |
|---|:---:|:---:|
| El análisis justifica el ciclo elegido para cada repetición | | |
| C1: el turno usa `Repetir` y termina con la respuesta 2 | | |
| C2 y C3: las validaciones usan `Repetir` con la condición de salida correcta | | |
| Las reglas R1, R2, R4 y R5 del Laboratorio 02 se conservan | | |
| C4: solo los pedidos cobrados actualizan el total vendido y el máximo | | |
| Los contadores, el acumulador y el máximo se inicializan antes del ciclo | | |
| El promedio se protege contra la división entre cero | | |
| La prueba de escritorio del turno es correcta | | |
| La ejecución en PSeInt coincide con la prueba de escritorio en los tres turnos | | |
| Las respuestas de reflexión identifican los límites del programa | | |
