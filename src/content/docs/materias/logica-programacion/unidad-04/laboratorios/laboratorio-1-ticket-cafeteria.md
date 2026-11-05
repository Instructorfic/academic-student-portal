---
title: "Laboratorio 01 — Ticket de un pedido"
description: "Unidad IV de Lógica de Programación — ticket de un pedido, Cafetería El Byte."
---

**Bloque:** 4.1 — Estructuras secuenciales

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Duración estimada | Una sesión de laboratorio (1 hora) más el tiempo de cierre fuera de clase |
| Modalidad | Individual |

---

## 1. Situación

La **Cafetería El Byte** es una cafetería pequeña dentro de una facultad (negocio ficticio). Hoy cobra con calculadora y notas a mano. Se equivoca en el total, se equivoca en el cambio y, cuando un cliente pide factura, nadie sabe cuánto del total corresponde al IVA.

La encargada te pide un programa en PSeInt para la caja que, dado un pedido, imprima un ticket correcto.

Menú (los precios **ya incluyen** IVA del 16 %):

| Producto | Precio |
|---|---:|
| Café americano | $25.00 |
| Capuchino | $38.00 |
| Sándwich de pollo | $55.00 |
| Agua embotellada | $15.00 |

Este programa es la primera versión del sistema de la cafetería. En los laboratorios 02 y 03 lo ampliarás, por eso conviene que esté bien organizado y con nombres claros.

---

## 2. Objetivo

Construir un algoritmo secuencial, con su traducción a PSeInt, que reciba las cantidades de un pedido y el pago del cliente, y muestre un ticket con el detalle, el total, el desglose del IVA incluido y el cambio.

---

## 3. Lo que vas a demostrar

- [ ] Pides cada dato con un mensaje de solicitud claro.
- [ ] Encadenas cálculos: subtotales, total, base sin IVA, IVA y cambio.
- [ ] Resuelves un **cálculo inverso**: obtener la base sin IVA a partir de un precio que ya lo incluye.
- [ ] Diseñas una salida legible: etiqueta, valor y unidad en cada línea.
- [ ] Verificas tu algoritmo con prueba de escritorio y con PSeInt.

---

## 4. Prerrequisitos

**Conocimientos:** instrucciones de entrada y salida, patrones de problemas secuenciales, redondeo a centavos con `redon`, hoja de trabajo y prueba de escritorio de la Unidad III.

**Herramienta:** PSeInt configurado con el perfil **Flexible** (el mismo de la Unidad III).

---

## 5. Requerimientos del ticket

### 5.1 Entradas

El programa solicita, en este orden:

1. Cantidad de cafés americanos
2. Cantidad de capuchinos
3. Cantidad de sándwiches de pollo
4. Cantidad de aguas embotelladas
5. Importe con el que paga el cliente

### 5.2 Cálculos

| Resultado | Regla |
|---|---|
| Subtotal de cada producto | cantidad × precio del producto |
| Número de artículos | suma de las cuatro cantidades |
| Total | suma de los cuatro subtotales |
| Base sin IVA | total ÷ 1.16, redondeada a centavos |
| IVA incluido | total − base sin IVA |
| Cambio | pago − total |

### 5.3 Salida

El ticket debe mostrar, en este orden:

1. Un encabezado con el nombre de la cafetería
2. Una línea por producto con cantidad y subtotal
3. El número de artículos
4. El total
5. La base sin IVA y el IVA incluido
6. El pago y el cambio
7. Un mensaje de despedida

Ejemplo del formato esperado para el caso normal (los números deben salir de tu algoritmo):

```text
========== CAFETERÍA EL BYTE ==========
Café americano      x 2   $50
Capuchino           x 1   $38
Sándwich de pollo   x 1   $55
Agua embotellada    x 0   $0
---------------------------------------
Artículos: 4
TOTAL: $143
Base sin IVA: $123.28
IVA incluido (16%): $19.72
Pago: $200
Cambio: $57
=======================================
Gracias por su compra
```

Así se ve en la ventana de ejecución, incluidas las entradas:

![Ventana de ejecución del ticket: el programa pide las cuatro cantidades (2, 1, 1, 0) y el importe recibido (200), y después muestra el ticket con TOTAL $143, base sin IVA $123.28, IVA $19.72 y cambio $57](/imagenes/logica-programacion/unidad-04/unidad04_pantalla_ticket.svg)

### 5.4 Supuestos de esta versión

- Las cantidades son enteros mayores o iguales que cero.
- El pedido tiene al menos un artículo.
- El pago es suficiente para cubrir el total.

En el Laboratorio 02 tu programa revisará el pago y aplicará descuentos. En esta versión **no** se revisa.

---

## 6. Procedimiento

### Paso 1 — Análisis y diseño de los datos

Completa en tu hoja de trabajo: entradas, datos conocidos (precios y factor del IVA), resultados, patrón de cada cálculo y restricciones.

Declara los precios y el factor del IVA como **constantes**.

> **Punto de verificación 1:** ¿Tienes 5 entradas, 5 constantes y una variable por cada resultado de la tabla 5.2? ¿Por qué la base sin IVA no se calcula como `total * 0.84`?

### Paso 2 — Pseudocódigo

Escribe el algoritmo en la notación de la materia: declaraciones, entradas con mensaje de solicitud, cálculos en el orden de la tabla 5.2 y salida en el orden de la sección 5.3.

### Paso 3 — Prueba de escritorio

Completa la tabla con tu pseudocódigo **antes** de usar PSeInt.

| Caso | Americano | Capuchino | Sándwich | Agua | Pago | Total | Base sin IVA | IVA | Cambio |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Normal | 2 | 1 | 1 | 0 | 200 | | | | |
| Pago exacto | 0 | 0 | 1 | 1 | 70 | | | | |
| Un solo artículo | 1 | 0 | 0 | 0 | 50 | | | | |

> **Punto de verificación 2:** en los tres casos, ¿la base sin IVA más el IVA es igual al total?

### Paso 4 — Traducción y ejecución en PSeInt

Traduce el pseudocódigo con las reglas de la Unidad III. Ejecuta los tres casos y compara la pantalla obtenida con tu pantalla esperada.

> **Punto de verificación 3:** ¿Los tres casos coinciden con tu prueba de escritorio? Si no coinciden, corrige primero el pseudocódigo y después la traducción.

### Paso 5 — Prueba de los supuestos

Ejecuta el programa con un pago **menor** que el total (por ejemplo, el pedido normal pagando $100). Anota qué muestra y responde las preguntas de reflexión.

---

## 7. Si algo no funciona

| Síntoma | Causa probable | Qué revisar |
|---|---|---|
| ERROR de tipos al asignar la base sin IVA | La variable se declaró `ENTERO` | La división produce un valor real |
| El ticket muestra `subtotalAmericano` en lugar de un número | La variable está entre comillas | `Mostrar "..."`, variable fuera de las comillas |
| Todos los importes salen en 0 | Los cálculos están antes de las entradas | Orden: entradas, después cálculos |
| La base sin IVA muestra muchos decimales | Falta el redondeo a centavos | `redon(... * 100) / 100` |
| El IVA aparece como `19.7199999` | Representación interna de los números reales | Redondea también el IVA a centavos y anótalo en tu reporte |
| El nombre de una constante es rechazado | Identificador reservado en PSeInt | Reglas de identificadores de la Unidad III |

---

## 8. Preguntas de reflexión

Responde en tu reporte:

1. Con el pedido normal y un pago de $100, ¿qué cambio mostró el programa? ¿Qué debería hacer el programa en ese caso y qué estructura necesitarías?
2. Si mañana el capuchino sube a $40, ¿cuántas líneas de tu algoritmo tienes que modificar? ¿Qué te dice eso sobre el uso de constantes?
3. ¿Por qué la base sin IVA se obtiene dividiendo entre 1.16 y no restando el 16 % del total?

---

## 9. Reto adicional (opcional)

La encargada quiere que el cambio se entregue con el menor número de piezas. Agrega al ticket el desglose del cambio en billetes y monedas, reutilizando el procedimiento de la tarea "Desglose del cambio". Supón que el pago es un entero de pesos.

---

## 10. Entrega

| Evidencia | Requerida |
|---|---|
| Hoja de trabajo: análisis y diseño de los datos | Sí |
| Pseudocódigo | Sí |
| Prueba de escritorio de los tres casos | Sí |
| Archivo `.psc` de PSeInt | Sí |
| Captura de la pantalla del caso normal en PSeInt | Sí |
| Respuestas de reflexión | Sí |
| Reto adicional | No |

Nombre del archivo PSeInt: `lab01_ticket_<apellido>.psc`. Conserva este archivo: es el punto de partida del Laboratorio 02.

Medio y fecha de entrega: los indica el profesor.

---

## 11. Evaluación

Lista de cotejo:

| Criterio | Cumple | No cumple |
|---|:---:|:---:|
| Cada entrada tiene un mensaje de solicitud que indica qué dato se espera | | |
| Los precios y el factor del IVA están declarados como constantes | | |
| Los tipos de datos corresponden al uso de cada dato | | |
| Los cálculos están en el orden correcto y después de las entradas | | |
| La base sin IVA se calcula por cálculo inverso y se redondea a centavos | | |
| El ticket muestra todos los elementos de la sección 5.3, con etiqueta en cada valor | | |
| La prueba de escritorio de los tres casos es correcta | | |
| La pantalla obtenida en PSeInt coincide con la prueba de escritorio | | |
| Las respuestas de reflexión identifican el supuesto del pago y la estructura que se necesita | | |
| El pseudocódigo respeta la notación de la materia (no usa `Leer` ni `Escribir`) | | |
