---
title: "Proyecto integrador — Sistema de la Cafetería El Byte"
description: "Unidad IV de Lógica de Programación — proyecto integrador en equipo: el programa de caja de la Cafetería El Byte con un módulo a elegir."
---

---

## 1. Situación

Durante la unidad construiste, [laboratorio por laboratorio](/materias/logica-programacion/unidad-04/laboratorios/), el programa de caja de la **Cafetería El Byte**:

| Laboratorio | Lo que aprendió a hacer el programa |
|---|---|
| 01 | Cobrar un pedido e imprimir el ticket |
| 02 | Aplicar reglas: pedido vacío, combo, tipo de cliente, forma de pago, pago insuficiente |
| 03 | Atender un turno completo, validar entradas y hacer el cierre de caja |

La encargada está satisfecha, pero necesita **una función más**. Cada equipo elegirá cuál desarrollar, la integrará al programa del Laboratorio 03 y presentará el sistema terminado.

---

## 2. Propósito

Integrar estructuras secuenciales, condicionales y repetitivas en una solución completa, aplicando la metodología de la Unidad III: analizar, diseñar, probar, documentar y explicar las decisiones tomadas.

---

## 3. Modalidad

- **Equipos de 4 integrantes.** Solo se aceptan equipos de 3 cuando el grupo no se divide exacto.
- Cada equipo parte del **mejor Laboratorio 03** de sus integrantes o integra varios. Debe indicar en la bitácora de cuál partió.
- Cada equipo elige **un módulo** de la sección 5. En cada grupo, un módulo puede elegirlo **como máximo 3 equipos**. El profesor registra la elección por orden de solicitud.
- Todos los integrantes deben poder explicar **cualquier parte** del programa, no solo la que desarrollaron.

---

## 4. Requisitos comunes a todos los equipos

El sistema conserva todo lo del Laboratorio 03:

- [ ] Turno completo con `Repetir`, que termina cuando el cajero indica que no hay otro pedido.
- [ ] Menú y precios del caso (precios con IVA incluido).
- [ ] Pedido vacío: no se cobra.
- [ ] Combo desayuno: $10 de descuento si hay al menos un café americano y al menos un sándwich.
- [ ] Tipo de cliente validado: estudiante 10 %, personal 5 %, público general sin descuento.
- [ ] Forma de pago validada: efectivo o tarjeta. En efectivo, cambio o faltante.
- [ ] Ticket con detalle, total, base sin IVA e IVA.
- [ ] Cierre de caja: pedidos cobrados y no cobrados, pedidos con tarjeta, total vendido, ticket promedio protegido contra la división entre cero y pedido mayor.

---

## 5. Módulos

Las reglas de cada módulo son **obligatorias**. Si el equipo necesita suponer algo que la regla no dice, lo registra como supuesto en su propuesta algorítmica.

### Módulo A — Inventario del turno

1. Al iniciar el turno, antes del primer pedido, se capturan las existencias de los cuatro productos. Cada existencia es un entero mayor o igual que 0 y se valida con `Repetir`.
2. Si en un pedido la cantidad de **algún** producto supera su existencia, se muestra qué producto no alcanza y cuántas piezas quedan. Ese pedido **no se cobra** y cuenta como no cobrado.
3. Las existencias se descuentan **solo si el pedido se cobra**. Un pedido con efectivo insuficiente no descuenta nada.
4. En el cierre de caja se muestran las existencias finales y la palabra **AGOTADO** junto a cada producto que terminó en 0.

**Estructuras que exige:** validación con `Repetir`, condiciones compuestas, actualización condicionada de varias variables.

### Módulo B — Promociones por horario

1. Cada pedido captura la hora en que se atiende, como un entero de 7 a 14, validado con `Repetir` (el turno es de 7:00 a 15:00).
2. **Hora feliz del café**, con hora 7 u 8: 20 % de descuento sobre el subtotal de los cafés americanos y capuchinos del pedido.
3. **Servicio de cierre**, con hora 14: se suman $5 al total del pedido.
4. De 9 a 13 no hay ajuste.
5. Orden de los cálculos: subtotal, hora feliz, combo, descuento del cliente y, al final, servicio de cierre. Los descuentos se redondean a centavos.
6. En el cierre de caja se muestra cuántos pedidos cobrados tuvieron hora feliz.

**Estructuras que exige:** cadena `Sino Si` por rangos de hora, validación con `Repetir`, contador condicionado.

### Módulo C — Menú ampliado

1. El menú agrega dos productos: **5 = Chocolate caliente ($35)** y **6 = Pan dulce ($18)**. Son precios del caso, con IVA incluido.
2. El pedido ya no se captura con cuatro cantidades fijas. Se captura **producto por producto**: código, cantidad y, si es bebida caliente (americano, capuchino o chocolate), tamaño. Termina cuando se escribe el código 0.
3. Tamaños: **1 = chico (−$5)**, **2 = mediano (precio del menú)**, **3 = grande (+$8)**, por pieza.
4. Un código que no exista se rechaza con un mensaje y se pide otro producto. La cantidad debe ser mayor que 0 y el tamaño debe ser 1, 2 o 3. Ambos se validan con `Repetir`.
5. El combo desayuno sigue aplicando si el pedido acumula al menos un americano (de cualquier tamaño) y al menos un sándwich.

**Estructuras que exige:** `Mientras` o `Repetir` dentro del ciclo del turno, `Segun` para el código y el tamaño, acumuladores por producto.

### Módulo D — Reporte de ventas por producto

1. El cierre de caja agrega, solo con los pedidos cobrados:
   - piezas vendidas de cada producto
   - el producto más vendido (en empate, el de menor código)
   - el porcentaje de pedidos cobrados en efectivo y con tarjeta, redondeado a dos decimales
   - el descuento total otorgado en el turno (combos más descuentos de cliente)
2. Si no hubo pedidos cobrados, en lugar de este reporte se muestra "Sin ventas en el turno".

**Estructuras que exige:** acumuladores actualizados solo en la rama correcta, máximo con regla de empate, protección contra la división entre cero.

### Módulo E — Pago mixto

1. La forma de pago agrega la opción **3 = mixto**. La forma de pago se resuelve con `Segun`.
2. En el pago mixto se captura el monto en **efectivo**, que debe ser mayor que 0 y menor que el total del pedido, validado con `Repetir`. El resto se cobra con tarjeta. No hay cambio.
3. El ticket muestra cuánto se pagó en efectivo y cuánto con tarjeta.
4. El cierre de caja agrega el **número de pedidos mixtos**, el **total cobrado en efectivo** y el **total cobrado con tarjeta**, que deben sumar el total vendido. Un pedido mixto no cuenta como pedido con tarjeta.

**Estructuras que exige:** `Segun` con tres casos, validación de un rango que depende de otro dato, acumuladores separados.

---

## 6. Entregables

| # | Entregable | Contenido mínimo |
|---|---|---|
| 1 | Propuesta algorítmica | Las siete etapas de la Unidad III, con la [plantilla de propuesta algorítmica extendida](/materias/logica-programacion/unidad-03/plantillas/propuesta-algoritmica-extendida/). Incluye la tabla de decisiones (qué estructura resuelve cada regla y por qué) |
| 2 | Pseudocódigo completo | Notación de la materia. Comentarios que separen las partes del programa |
| 3 | Diagrama de flujo | Del ciclo del turno con la decisión principal, y del módulo elegido. No se pide el programa completo |
| 4 | Programa en PSeInt | Archivo `.psc`, perfil Flexible, que ejecute sin errores |
| 5 | Plan de pruebas | Al menos 10 casos: un turno normal, un turno sin ventas, las fronteras del módulo y al menos dos entradas inválidas. Con el resultado esperado, el obtenido y capturas de la ejecución |
| 6 | Manual de usuario | Máximo una página: cómo se usa el programa, qué pide en cada paso y qué supuestos tiene |
| 7 | Bitácora del equipo | Quién hizo qué, de qué Laboratorio 03 se partió y qué problemas se resolvieron |
| 8 | Exposición | Sección 8 |

Los entregables 1 a 7 se entregan juntos, en la fecha y por el medio que indique el profesor, **antes** de las exposiciones. Después de la entrega el programa no se modifica: en la exposición se usa el archivo entregado.

Nombre del archivo PSeInt: `proyecto_modulo<letra>_equipo<número>.psc`.

---

## 7. Organización del trabajo

| Fase | Duración aproximada | Qué se hace | Producto de la fase |
|---|---|---|---|
| 1. Análisis y diseño | Una sesión | Elegir el módulo, analizar sus reglas, tabla de decisiones, esquema del programa | Etapas 3.2.1 a 3.2.4 de la propuesta |
| 2. Desarrollo | Una o dos sesiones más estudio independiente | Pseudocódigo, integración con el Laboratorio 03, traducción a PSeInt | Programa que ejecuta un turno |
| Revisión de avance | Dentro de la fase 2 | El profesor revisa con el equipo: tabla de decisiones, pseudocódigo del módulo y una ejecución | Observaciones por corregir |
| 3. Pruebas y entrega | Una sesión | Plan de pruebas, correcciones, manual y bitácora | Entregables 1 a 7 |
| 4. Exposición | Según el calendario del profesor | Sección 8 | Exposición |

Sugerencia de reparto en un equipo de 4: una persona coordina la propuesta y el plan de pruebas, dos desarrollan el módulo y su integración, y una revisa la notación, el diagrama y el manual. **Todos** prueban el programa.

---

## 8. Exposición

**Duración por equipo:** 12 minutos, 8 de exposición y 4 de preguntas.

| Parte | Tiempo | Quién |
|---|---|---|
| El problema y el módulo elegido: qué pidió la encargada y qué reglas implementaron | 2 min | Integrante 1 |
| Una decisión de diseño: qué estructura eligieron para una regla del módulo y por qué no otra | 2 min | Integrante 2 |
| Demostración en PSeInt de un caso normal del módulo | 2 min | Integrante 3 |
| Demostración de un caso de frontera o de una entrada inválida y lo que aprendieron | 2 min | Integrante 4 |
| Preguntas del profesor a **dos integrantes elegidos al azar** | 4 min | Al azar |

En equipos de 3, la cuarta parte se reparte entre los integrantes 1 y 2.

Para la demostración, los casos deben estar preparados y escritos de antemano. No se presentan diapositivas largas: lo central es el programa funcionando y la explicación de las decisiones.

---

## 9. Evaluación

El proyecto se califica con la lista de cotejo y la rúbrica de la unidad (100 puntos):

| Parte | Puntos | Cómo se califica |
|---|---:|---|
| Lista de cotejo técnica | 60 | Ejecución del programa con los casos de referencia y revisión de los entregables |
| Análisis y propuesta algorítmica | 15 | Rúbrica |
| Plan de pruebas | 10 | Rúbrica |
| Exposición del equipo | 5 | Rúbrica |
| Parte individual: lo que expone cada integrante y su respuesta a las preguntas | 10 | Rúbrica, por integrante |

El proyecto y su exposición son productos requeridos de la evaluación parcial (proyectos y técnica expositiva). Su peso en la calificación lo informa el profesor conforme al programa de la materia.

---

## 10. Integridad académica

- El programa debe partir de los laboratorios de los integrantes del equipo.
- El uso de otras fuentes o herramientas se rige por lo que indique el profesor. Lo que se use se declara en la bitácora.
- Cualquier integrante debe poder explicar cualquier instrucción del programa. Una respuesta que muestre que el equipo no comprende su propio código se refleja en la parte individual de la evaluación.

---

## 11. Lista de verificación antes de entregar

- [ ] El programa ejecuta el turno completo sin errores en PSeInt, perfil Flexible.
- [ ] Se conservan todas las reglas del Laboratorio 03.
- [ ] Todas las reglas del módulo están implementadas y probadas.
- [ ] El plan de pruebas tiene al menos 10 casos, con fronteras y entradas inválidas.
- [ ] El pseudocódigo no usa `Leer`, `Escribir` ni `Definir`.
- [ ] El diagrama de flujo usa los símbolos de la materia.
- [ ] El manual de usuario cabe en una página.
- [ ] La bitácora indica qué hizo cada integrante.
- [ ] Cada integrante sabe qué parte expone y puede explicar todo el programa.
