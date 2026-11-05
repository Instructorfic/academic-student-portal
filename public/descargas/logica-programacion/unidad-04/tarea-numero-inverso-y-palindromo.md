# Tarea: Número inverso y palíndromo

**Lógica de Programación y Pensamiento Computacional**
Unidad IV — Estructuras algorítmicas
Tema: Resolución de problemas con ciclos (4.3.1 y 4.3.5)

**Instrumento:** Hoja de trabajo de propuesta algorítmica

---

## Identificación

| Campo | Información |
|---|---|
| Nombre | |
| Grupo | |
| Fecha | |
| Ejercicio | Número inverso y palíndromo |

---

## Problema

En el bloque 4.1 invertiste un número de **exactamente tres cifras**. Ahora el algoritmo debe funcionar con un entero **no negativo de cualquier tamaño**.

El algoritmo:

1. Pide un número entero. Si es negativo, lo pide otra vez.
2. Muestra el número con sus cifras en orden inverso.
3. Indica si el número es **palíndromo**, es decir, si se lee igual de izquierda a derecha que de derecha a izquierda (por ejemplo, 12321).

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

### 2.2 Construir el inverso

En cada iteración se toma la última cifra de lo que falta por procesar y se agrega al final del inverso.

Si el inverso va en `27` y la siguiente cifra es `4`, ¿cómo se obtiene `274` con una operación aritmética?

________________________________________

¿Cómo se obtiene la última cifra de un número? ¿Cómo se quita?

________________________________________

### 2.3 Elección de ciclos

| Necesidad | Ciclo | ¿Por qué ese y no otro? |
|---|---|---|
| Pedir el número hasta que no sea negativo | | |
| Recorrer las cifras | | |

### 2.4 Copia de trabajo

¿Por qué el ciclo debe trabajar sobre una **copia** del número y no sobre el número original?

________________________________________

## 3. Diseño de los datos

| Identificador | Tipo | Función |
|---|---|---|
| | | |

## 4. Algoritmo

### Pseudocódigo

```text
Inicio

Fin
```

### Diagrama de flujo

Dibuja el diagrama en una hoja aparte o con una herramienta digital.

## 5. Prueba de escritorio por iteración

Número: 1230.

| Iteración | Cifra tomada | Inverso | Pendiente |
|---:|---:|---:|---:|
| Antes del ciclo | — | | |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

## 6. Plan de pruebas

| Caso | Número | Inverso esperado | ¿Palíndromo? | Resultado obtenido | ¿Coincide? |
|---|---:|---:|---|---|---|
| Palíndromo impar | 12321 | 12321 | Sí | | |
| Termina en cero | 1230 | 321 | No | | |
| Una cifra | 7 | 7 | Sí | | |
| Palíndromo par | 1001 | 1001 | Sí | | |
| Cero | 0 | | | | |
| Negativo | −45 y después 45 | 54 | No | | |

¿Qué muestra tu algoritmo con 0? ¿Cuántas iteraciones hace el ciclo? ¿Es correcto decir que 0 es palíndromo?

________________________________________

¿Por qué el inverso de 1230 es 321 y no 0321?

________________________________________

## 7. Verificación en PSeInt

### 7.1 Traducción a PSeInt

```text
Algoritmo InversoPalindromo

FinAlgoritmo
```

### 7.2 Ejecución

Ejecuta los seis casos de la sección 6 y completa la columna "Resultado obtenido".

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
