---
title: "Tarea: Desglose del cambio"
description: "Unidad IV de Lógica de Programación — hoja de tarea: desglose del cambio (4.1.2)."
---

<div class="descargas">
<a href="/descargas/logica-programacion/unidad-04/tarea-desglose-del-cambio.docx" download>Descargar Word (.docx)</a>
<a class="secundario" href="/descargas/logica-programacion/unidad-04/tarea-desglose-del-cambio.md" download>Descargar Markdown (.md)</a>
</div>

**Tema:** Resolución de problemas secuenciales (4.1.2)

**Instrumento:** Hoja de trabajo de propuesta algorítmica

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Ejercicio | Desglose del cambio |

---

## Problema

Una tienda quiere que su caja indique al cajero **cuántos billetes y monedas de cada denominación** debe entregar como cambio, empezando siempre por la denominación más grande.

El cajero proporciona el importe de la compra y el importe con el que paga el cliente. Ambos son cantidades enteras de pesos.

Denominaciones disponibles en la caja:

| Tipo | Denominaciones |
|---|---|
| Billetes | 500, 200, 100, 50, 20 |
| Monedas | 10, 5, 2, 1 |

El algoritmo debe mostrar el cambio total y, después, la cantidad de piezas de cada denominación, una por línea.

Restricciones:

- El importe de la compra es un entero mayor que cero.
- El pago es un entero mayor o igual que el importe de la compra.
- No se manejan centavos.

---

## Qué debes hacer

Realiza el análisis, desarrolla el pseudocódigo, escribe la pantalla esperada, haz la prueba de escritorio y verifica en PSeInt, completando las secciones 1 a 7.

Utiliza la notación de la materia:

| Elemento | Notación |
|---|---|
| Inicio y fin | `Inicio` … `Fin` |
| Tipos | `ENTERO`, `REAL`, `CADENA`, `CARACTER`, `LOGICO` |
| Variables | camelCase |
| Constantes | SCREAMING_SNAKE_CASE |
| Entrada | `Entrada:` (precedida por un mensaje de solicitud) |
| Salida | `Mostrar` |
| Asignación | `=` |
| División entera | `trunc(<expresión>)` |
| Residuo | `%` |

---

## 1. Descripción del problema

¿Qué problema debo resolver?

________________________________________

¿Qué resultado debo obtener?

________________________________________

## 2. Análisis

### 2.1 Datos de entrada

| Dato | Tipo | Descripción |
|---|---|---|
| | | |

### 2.2 Resultados esperados

| Resultado | Tipo | Descripción |
|---|---|---|
| | | |

### 2.3 Datos conocidos

| Dato | Valor | Descripción |
|---|---|---|
| | | |

### 2.4 Patrón y proceso

¿Qué patrón de problema secuencial es? ¿Por qué?

________________________________________

¿Qué variable guarda "lo que falta por entregar" después de cada denominación?

________________________________________

### 2.5 Restricciones y supuestos

________________________________________

¿Qué ocurriría si el pago fuera menor que la compra? ¿Lo puede detectar un algoritmo secuencial?

________________________________________

## 3. Diseño de los datos

### Constantes

| Identificador | Tipo | Valor |
|---|---|---|
| | | |

### Variables

| Identificador | Tipo |
|---|---|
| | |

## 4. Algoritmo

### Lenguaje natural

1.
2.
3.

### Pseudocódigo

```text
Inicio

Fin
```

## 5. Pantalla esperada

Escribe exactamente lo que verá el cajero con el caso normal (compra = 613, pago = 2000), incluidos los mensajes de solicitud.

```text

```

## 6. Prueba de escritorio

| Caso | Compra | Pago | Cambio esperado | Desglose esperado | Desglose obtenido | ¿Coincide? |
|---|---:|---:|---:|---|---|---|
| Normal | 613 | 2000 | 1387 | 500×2, 200×1, 100×1, 50×1, 20×1, 10×1, 5×1, 2×1, 1×0 | | |
| Solo monedas | 95 | 100 | 5 | Todas en 0 excepto 5×1 | | |
| Pago exacto | 250 | 250 | 0 | Todas en 0 | | |
| Todas las denominaciones | | | 888 | | | |

Completa el último caso: elige una compra y un pago cuyo cambio sea 888 y escribe el desglose esperado.

Si algún resultado no coincide, indica qué corregiste:

________________________________________

## 7. Verificación en PSeInt

Realiza esta sección **después** de terminar el pseudocódigo (sección 4) y su prueba (sección 6).

| Pseudocódigo | PSeInt |
|---|---|
| `Inicio` … `Fin` | `Algoritmo DesgloseCambio` … `FinAlgoritmo` |
| `ENTERO compra` | `Definir compra Como Entero` |
| `ENTERO BILLETE_500 = 500` (constante) | `Definir BILLETE_500 Como Entero` y después `BILLETE_500 = 500` |
| `Entrada: compra` | `Leer compra` |
| `Mostrar "Cambio: $", cambio` | `Escribir "Cambio: $", cambio` |
| `trunc(...)`, `%` | `trunc(...)`, `%` (igual) |

Configura PSeInt con el perfil **Flexible**. Conserva los mismos nombres y el mismo orden de instrucciones.

### 7.1 Traducción a PSeInt

```text
Algoritmo DesgloseCambio

FinAlgoritmo
```

### 7.2 Ejecución

| Caso | Pantalla esperada (sección 5 o 6) | ¿La pantalla obtenida en PSeInt coincide? |
|---|---|---|
| Normal | | |
| Solo monedas | | |
| Pago exacto | | |
| Todas las denominaciones | | |

---

## Evidencia requerida

| Representación | Requerida |
|---|---|
| Pseudocódigo | Sí (sección 4) |
| Pantalla esperada | Sí (sección 5) |
| Diagrama de flujo | No |
| Traducción y ejecución en PSeInt | Sí: traducción (7.1) y comparación (7.2) |
| Otra | Análisis y diseño de los datos (secciones 1 a 3) |

---

## Evidencia de entrega

Esta hoja con las secciones 1 a 7 completas.

Fecha y medio de entrega: los indica el profesor.
