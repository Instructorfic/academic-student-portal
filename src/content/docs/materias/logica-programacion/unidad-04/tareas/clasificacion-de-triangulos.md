---
title: "Tarea: Clasificación de triángulos"
description: "Unidad IV de Lógica de Programación — hoja de tarea: clasificación de triángulos (4.2.4 y 4.2.5)."
---

<div class="descargas">
<a href="/descargas/logica-programacion/unidad-04/tarea-clasificacion-de-triangulos.docx" download>Descargar Word (.docx)</a>
<a class="secundario" href="/descargas/logica-programacion/unidad-04/tarea-clasificacion-de-triangulos.md" download>Descargar Markdown (.md)</a>
</div>

**Tema:** Resolución de problemas con condicionales (4.2.4 y 4.2.5)

**Instrumento:** Hoja de trabajo de propuesta algorítmica

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Ejercicio | Clasificación de triángulos |

---

## Problema

Un taller de herrería recibe pedidos de marcos triangulares. Antes de cortar el material, el encargado necesita saber si las tres medidas que pide el cliente **forman un triángulo** y, si lo forman, de qué tipo es.

El algoritmo recibe las longitudes de los tres lados en centímetros y muestra uno de estos mensajes:

- "Medida no válida", si algún lado es menor o igual que cero
- "Las medidas no forman un triángulo", si no se cumple la regla de la sección 2.4
- "Triángulo equilátero", si los tres lados son iguales
- "Triángulo isósceles", si exactamente dos lados son iguales
- "Triángulo escaleno", si los tres lados son distintos

---

## Qué debes hacer

Realiza el análisis, desarrolla el pseudocódigo y el diagrama de flujo, elabora un plan de pruebas que recorra **todas las rutas** y verifica en PSeInt, completando las secciones 1 a 7.

Utiliza la notación de la materia y de la especificación de estructuras de la unidad (`Si … Entonces … Sino … FinSi`, cadena `Sino Si`, `Y`, `O`).

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

### 2.3 Decisiones del problema

| Decisión | ¿De qué depende? | Tipo de condicional |
|---|---|---|
| ¿Las medidas son válidas? | | |
| ¿Forman un triángulo? | | |
| ¿Qué tipo de triángulo es? | | |

### 2.4 Regla del triángulo

Tres longitudes forman un triángulo solo si **cada lado es menor que la suma de los otros dos**.

Escribe esta regla como una sola condición compuesta:

________________________________________

¿Por qué las medidas 1, 2 y 3 no forman un triángulo, aunque 3 sea igual a 1 + 2?

________________________________________

### 2.5 ¿Anidar o encadenar?

La pregunta "¿qué tipo de triángulo es?" solo tiene sentido si las medidas forman un triángulo. ¿Cómo lo expresas en la estructura del algoritmo?

________________________________________

## 3. Diseño de los datos

### Variables

| Identificador | Tipo |
|---|---|
| | |

## 4. Algoritmo

### Pseudocódigo

```text
Inicio

Fin
```

### Diagrama de flujo

Dibuja el diagrama en una hoja aparte o con una herramienta digital, con los símbolos de la materia y las etiquetas **Sí** / **No** en cada decisión.

## 5. Plan de pruebas

Completa la tabla. Debe haber **al menos un caso por cada mensaje posible**.

| Caso | Lado 1 | Lado 2 | Lado 3 | Mensaje esperado | Mensaje obtenido | ¿Coincide? |
|---|---:|---:|---:|---|---|---|
| Equilátero | 5 | 5 | 5 | | | |
| Isósceles | 5 | 5 | 8 | | | |
| Isósceles, lados iguales en otra posición | 8 | 5 | 5 | | | |
| Escaleno | 3 | 4 | 5 | | | |
| Frontera de la regla del triángulo | 1 | 2 | 3 | | | |
| Lado cero | 0 | 4 | 4 | | | |
| | | | | | | |

Agrega en la última fila un caso propio que **no** forme triángulo y no sea frontera.

## 6. Prueba de escritorio

Haz el trazado completo de tu pseudocódigo con el caso isósceles **8, 5, 5**. Indica en cada decisión si la condición fue verdadera o falsa.

| Decisión | Condición evaluada | Verdadera / Falsa |
|---|---|---|
| | | |
| | | |
| | | |

## 7. Verificación en PSeInt

Traduce el pseudocódigo con el perfil **Flexible**. Si usaste la cadena `Sino Si`, recuerda que en PSeInt se escribe como `Si` anidados dentro de cada `SiNo`.

### 7.1 Traducción a PSeInt

```text
Algoritmo ClasificarTriangulo

FinAlgoritmo
```

### 7.2 Ejecución

Ejecuta todos los casos de la sección 5 y completa la columna "Mensaje obtenido".

---

## Evidencia requerida

| Representación | Requerida |
|---|---|
| Pseudocódigo | Sí (sección 4) |
| Diagrama de flujo | Sí (sección 4) |
| Plan de pruebas con todas las rutas | Sí (sección 5) |
| Traducción y ejecución en PSeInt | Sí (sección 7) |

---

## Evidencia de entrega

Esta hoja con las secciones 1 a 7 completas y el diagrama de flujo.

Fecha y medio de entrega: los indica el profesor.
