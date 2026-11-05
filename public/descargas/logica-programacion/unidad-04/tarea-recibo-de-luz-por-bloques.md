# Tarea: Recibo de luz por bloques

**Lógica de Programación y Pensamiento Computacional**
Unidad IV — Estructuras algorítmicas
Tema: Resolución de problemas con condicionales (4.2.5)

**Instrumento:** Hoja de trabajo de propuesta algorítmica

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Ejercicio | Recibo de luz por bloques |

---

## Problema

En clase calculaste un recibo de luz con un precio fijo por kWh y lo validaste para no aceptar lecturas invertidas. Ahora el precio del kWh **cambia según el consumo**, por bloques. *(Las tarifas son ficticias, solo para el ejercicio.)*

| Bloque | kWh del periodo | Precio por kWh |
|---|---|---:|
| Básico | Los primeros 150 kWh | $1.10 |
| Intermedio | Del kWh 151 al 280 | $1.35 |
| Excedente | Cada kWh por encima de 280 | $3.80 |

Además se suma un cargo fijo de $35.00.

**Importante:** cada bloque se cobra **solo por los kWh que caen dentro de él**. Con un consumo de 258 kWh, los primeros 150 se cobran a $1.10 y los 108 restantes a $1.35. No se cobran los 258 kWh a $1.35.

El algoritmo recibe las dos lecturas del medidor. Si están invertidas, muestra un error y no calcula. Si son válidas, muestra el consumo, el importe de energía y el total a pagar.

---

## Qué debes hacer

Realiza el análisis, desarrolla el pseudocódigo y el diagrama de flujo, elabora el plan de pruebas y verifica en PSeInt, completando las secciones 1 a 7.

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

### 2.4 Decisiones del problema

| Decisión | Tipo de condicional | ¿Por qué? |
|---|---|---|
| ¿Las lecturas son válidas? | | |
| ¿En qué bloque termina el consumo? | | |

### 2.5 Fórmula de cada bloque

Completa la expresión del importe de energía para cada rango de consumo:

| Rango de consumo | Importe de energía |
|---|---|
| 0 a 150 kWh | |
| 151 a 280 kWh | |
| Más de 280 kWh | |

¿Por qué conviene declarar como constantes los límites 150 y 280, además de los precios?

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

### Pseudocódigo

```text
Inicio

Fin
```

### Diagrama de flujo

Dibuja el diagrama en una hoja aparte o con una herramienta digital, con los símbolos de la materia.

## 5. Plan de pruebas

| Caso | Lectura anterior | Lectura actual | Consumo | Energía esperada | Total esperado | Total obtenido | ¿Coincide? |
|---|---:|---:|---:|---:|---:|---:|---|
| Solo bloque básico | 10000 | 10100 | 100 | 110 | 145 | | |
| Frontera básico | 10000 | 10150 | 150 | | | | |
| Primer kWh intermedio | 10000 | 10151 | 151 | | | | |
| Bloque intermedio | 15230 | 15488 | 258 | | | | |
| Frontera intermedio | 10000 | 10280 | 280 | | | | |
| Bloque excedente | 10000 | 10300 | 300 | | | | |
| Sin consumo | 15488 | 15488 | 0 | | | | |
| Lecturas invertidas | 15488 | 15230 | — | — | Mensaje de error | | |

## 6. Prueba de escritorio

Haz el trazado de tu pseudocódigo con el caso "Bloque excedente" (consumo de 300 kWh). Muestra el cálculo de cada bloque por separado.

________________________________________

## 7. Verificación en PSeInt

Traduce con el perfil **Flexible**. La cadena `Sino Si` se escribe como `Si` anidados dentro de cada `SiNo`.

### 7.1 Traducción a PSeInt

```text
Algoritmo ReciboLuzBloques

FinAlgoritmo
```

### 7.2 Ejecución

Ejecuta todos los casos de la sección 5 y completa la columna "Total obtenido".

---

## Evidencia requerida

| Representación | Requerida |
|---|---|
| Pseudocódigo | Sí (sección 4) |
| Diagrama de flujo | Sí (sección 4) |
| Plan de pruebas completo | Sí (sección 5) |
| Traducción y ejecución en PSeInt | Sí (sección 7) |

---

## Evidencia de entrega

Esta hoja con las secciones 1 a 7 completas y el diagrama de flujo.

Fecha y medio de entrega: los indica el profesor.
