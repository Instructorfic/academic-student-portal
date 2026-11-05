---
title: "Tarea: Ventas de la semana"
description: "Unidad IV de Lógica de Programación — hoja de tarea: ventas de la semana (4.3.3 y 4.3.5)."
---

<div class="descargas">
<a href="/descargas/logica-programacion/unidad-04/tarea-ventas-de-la-semana.docx" download>Descargar Word (.docx)</a>
<a class="secundario" href="/descargas/logica-programacion/unidad-04/tarea-ventas-de-la-semana.md" download>Descargar Markdown (.md)</a>
</div>

**Tema:** Resolución de problemas con ciclos (4.3.3 y 4.3.5)

**Instrumento:** Hoja de trabajo de propuesta algorítmica

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Ejercicio | Ventas de la semana |

---

## Problema

Una papelería registra al final de cada semana la venta de cada día, de lunes (día 1) a domingo (día 7). El dueño quiere saber:

- el total vendido en la semana
- el promedio de venta por día, redondeado a centavos
- el **mejor día**: su número, su **nombre** y su venta
- cuántos días no hubo ventas (venta igual a 0)

Si una venta capturada es negativa, el algoritmo debe pedirla otra vez. Si dos días empatan como mejor día, se informa el **primero**.

---

## Qué debes hacer

Realiza el análisis, desarrolla el pseudocódigo y el diagrama de flujo, haz la prueba de escritorio por iteración y verifica en PSeInt, completando las secciones 1 a 7.

---

## 1. Descripción del problema

¿Qué problema debo resolver?

________________________________________

¿Qué resultado debo obtener?

________________________________________

## 2. Análisis

### 2.1 Datos de entrada y resultados

| Dato | Entrada o resultado | Tipo |
|---|---|---|
| | | |

### 2.2 Ciclos y decisiones

| Necesidad | Estructura | ¿Por qué? |
|---|---|---|
| Capturar las 7 ventas | | |
| Volver a pedir una venta negativa | | |
| Saber si una venta es la mayor hasta ese momento | | |
| Mostrar el nombre del mejor día | | |

### 2.3 Patrones

| Patrón | Variable | Valor inicial | Se actualiza cuando… |
|---|---|---|---|
| Acumulador | | | |
| Contador | | | |
| Máximo | | | |

¿Qué valor inicial del máximo garantiza que el primer día siempre se registre como el mejor hasta ese momento? ¿Por qué `>` y no `>=` cumple la regla del empate?

________________________________________

### 2.4 Anidamiento

La validación de cada venta va **dentro** del ciclo de los días. Dibuja un esquema con sangrías que muestre qué estructura queda dentro de cuál.

________________________________________

## 3. Diseño de los datos

| Identificador | Tipo | ¿Constante o variable? |
|---|---|---|
| | | |

## 4. Algoritmo

### Pseudocódigo

```text
Inicio

Fin
```

### Diagrama de flujo

Dibuja el diagrama en una hoja aparte o con una herramienta digital. Representa el ciclo `Desde` con su equivalencia en `Mientras`.

## 5. Prueba de escritorio por iteración

Datos: 1200, 950, 1430.5, 800, 2100, 2650, 0.

| Día (`i`) | Venta | Acumulado | Mejor venta | Mejor día | Días sin venta |
|---:|---:|---:|---:|---:|---:|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |

## 6. Plan de pruebas

| Caso | Ventas (lunes a domingo) | Resultado esperado | Resultado obtenido | ¿Coincide? |
|---|---|---|---|---|
| Normal | 1200, 950, 1430.5, 800, 2100, 2650, 0 | Total 9130.5, promedio 1304.36, mejor día 6 (sábado) con 2650, 1 día sin ventas | | |
| Empate | 500, 900, 900, 300, 100, 0, 0 | | | |
| Semana sin ventas | 0, 0, 0, 0, 0, 0, 0 | | | |
| Venta negativa | En el día 2 se escribe −50 y después 950 | El día 2 se pide otra vez | | |

¿Qué informa tu algoritmo como mejor día en la semana sin ventas? ¿Es razonable? Propón cómo mejorar el mensaje.

________________________________________

## 7. Verificación en PSeInt

`Desde` se traduce como `Para … FinPara`. Configura el perfil **Flexible**.

### 7.1 Traducción a PSeInt

```text
Algoritmo VentasSemana

FinAlgoritmo
```

### 7.2 Ejecución

Ejecuta los cuatro casos de la sección 6 y completa la columna "Resultado obtenido".

---

## Evidencia requerida

| Representación | Requerida |
|---|---|
| Pseudocódigo | Sí (sección 4) |
| Diagrama de flujo | Sí (sección 4) |
| Prueba de escritorio por iteración | Sí (sección 5) |
| Plan de pruebas | Sí (sección 6) |
| Traducción y ejecución en PSeInt | Sí (sección 7) |

---

## Evidencia de entrega

Esta hoja con las secciones 1 a 7 completas y el diagrama de flujo.

Fecha y medio de entrega: los indica el profesor.
