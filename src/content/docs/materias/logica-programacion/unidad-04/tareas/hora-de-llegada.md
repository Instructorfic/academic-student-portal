---
title: "Tarea: Hora de llegada"
description: "Unidad IV de Lógica de Programación — hoja de tarea: hora de llegada (4.1.2)."
---

<div class="descargas">
<a href="/descargas/logica-programacion/unidad-04/tarea-hora-de-llegada.docx" download>Descargar Word (.docx)</a>
<a class="secundario" href="/descargas/logica-programacion/unidad-04/tarea-hora-de-llegada.md" download>Descargar Markdown (.md)</a>
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
| Ejercicio | Hora de llegada |

---

## Problema

Una línea de autobuses quiere mostrar en su pantalla de andén la **hora estimada de llegada** de cada corrida.

El operador proporciona la hora de salida (hora y minutos, en formato de 24 horas) y la duración estimada del viaje en minutos. El algoritmo debe mostrar la hora de llegada en formato de 24 horas.

Ejemplo: un autobús que sale a las 22:45 y viaja 150 minutos llega a la 1:15 del día siguiente.

Restricciones:

- La hora de salida es un entero de 0 a 23.
- Los minutos de salida son un entero de 0 a 59.
- La duración es un entero mayor que cero.

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

Pista: convierte primero la hora de salida a "minutos desde la medianoche". Después suma la duración y descompón el resultado.

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

¿Qué operación hace que, después de las 23 horas, el reloj vuelva a 0?

________________________________________

### 2.5 Restricciones y supuestos

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

Escribe exactamente lo que verá el operador con el caso que cruza la medianoche (salida 22:45, duración 150), incluidos los mensajes de solicitud.

```text

```

## 6. Prueba de escritorio

| Caso | Hora salida | Minutos salida | Duración | Llegada esperada | Llegada obtenida | ¿Coincide? |
|---|---:|---:|---:|---|---|---|
| Normal | 8 | 10 | 35 | 8:45 | | |
| Cruza la medianoche | 22 | 45 | 150 | 1:15 | | |
| Exactamente medianoche | 23 | 59 | 1 | 0:00 | | |
| Cambio de hora exacto | 14 | 30 | 30 | 15:00 | | |

Si algún resultado no coincide, indica qué corregiste:

________________________________________

## 7. Verificación en PSeInt

Realiza esta sección **después** de terminar el pseudocódigo (sección 4) y su prueba (sección 6).

| Pseudocódigo | PSeInt |
|---|---|
| `Inicio` … `Fin` | `Algoritmo HoraLlegada` … `FinAlgoritmo` |
| `ENTERO horaSalida` | `Definir horaSalida Como Entero` |
| `ENTERO MINUTOS_HORA = 60` (constante) | `Definir MINUTOS_HORA Como Entero` y después `MINUTOS_HORA = 60` |
| `Entrada: horaSalida` | `Leer horaSalida` |
| `Mostrar "Llegada: ", horaLlegada, ":", minutoLlegada` | `Escribir "Llegada: ", horaLlegada, ":", minutoLlegada` |
| `trunc(...)`, `%` | `trunc(...)`, `%` (igual) |

Configura PSeInt con el perfil **Flexible**.

### 7.1 Traducción a PSeInt

```text
Algoritmo HoraLlegada

FinAlgoritmo
```

### 7.2 Ejecución

| Caso | Llegada esperada | Pantalla obtenida en PSeInt | ¿Coincide? |
|---|---|---|---|
| Normal | 8:45 | | |
| Cruza la medianoche | 1:15 | | |
| Exactamente medianoche | 0:00 | | |
| Cambio de hora exacto | 15:00 | | |

### 7.3 Observa la pantalla

En el caso "Exactamente medianoche", ¿PSeInt muestra `0:00` o `0:0`? Si muestra `0:0`, ¿qué tendría que **decidir** el algoritmo para mostrar siempre dos cifras en los minutos?

________________________________________

---

## Reto opcional

Modifica el algoritmo para que también indique **cuántos días después** de la salida llega el autobús (0 si llega el mismo día, 1 si llega al día siguiente). Resuélvelo sin estructuras condicionales.

---

## Evidencia requerida

| Representación | Requerida |
|---|---|
| Pseudocódigo | Sí (sección 4) |
| Pantalla esperada | Sí (sección 5) |
| Diagrama de flujo | No |
| Traducción y ejecución en PSeInt | Sí: traducción (7.1), comparación (7.2) y observación (7.3) |
| Otra | Análisis y diseño de los datos (secciones 1 a 3) |

---

## Evidencia de entrega

Esta hoja con las secciones 1 a 7 completas.

Fecha y medio de entrega: los indica el profesor.
