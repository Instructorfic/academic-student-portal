---
title: "4. Caja blanca y caja gris"
description: "Unidad III de Pruebas de Software — grafo de flujo, rutas base, complejidad ciclomática, criterios de cobertura, ciclos, flujo de datos, análisis estático y caja gris."
---

**Temas del programa:** 3.2.2

## Caja blanca: ¿qué problema resuelve?

Veinte casos de caja negra bien diseñados pueden dejar **una rama completa** del código sin ejecutar. Lo que no se ejecuta, no se prueba.

<div class="callout-alcance">

En la Unidad I **mediste** cobertura de instrucciones y de decisiones. Aquí la usas al revés: **diseñas** casos para alcanzar una cobertura elegida.

</div>

<p class="small">En pseudocódigo. En la Unidad IV medirás la cobertura con herramientas.</p>

## Familia de técnicas de caja blanca

| Técnica | Pregunta | ¿Ejecuta? |
| --- | --- | :---: |
| Instrucciones, decisiones, condiciones | ¿Qué elementos del código ejecuté? | Sí |
| Rutas y rutas base | ¿Qué recorridos de entrada a salida? | Sí |
| Prueba de ciclos | ¿0, 1, varias y el máximo de vueltas? | Sí |
| Flujo de datos | ¿Cada valor llegó a donde se usa? | Sí |
| Análisis estático | ¿Qué defectos se ven sin ejecutar? | **No** |

<p class="small">"Camino básico" en algunos textos: el original es <em>basis path</em>, camino <strong>base</strong>.</p>

## El grafo de flujo de control

| Concepto | Qué es |
| --- | --- |
| Nodo | Instrucción o **bloque básico**: instrucciones que siempre se ejecutan juntas |
| Arista | Posible salto de un nodo a otro |
| Nodo de decisión | Nodo con **dos** salidas: V y F (`SI`, condición de `MIENTRAS`) |
| Nodo de unión | Donde dos ramas se vuelven a juntar |
| Entrada y salida | Donde empieza y donde termina la ejecución |

## Patrones de traducción

<p align="center">
  <img src="/imagenes/pruebas-software/unidad-03/unidad03_patrones_grafo_flujo.svg" alt="Patrones del grafo de flujo de control: secuencia, SI-ENTONCES, SI-ENTONCES-SINO y MIENTRAS" width="900">
</p>

<p class="small">La arista F de un SI sin SINO va directo a la unión: es la que más se olvida.</p>

## Ejemplo — `validarDias`

<div class="grid-2">

<div>

```text
1  SI dias < 1 ENTONCES
2      RETORNAR "RECHAZADO"
3  FIN SI
4  SI dias > 14 ENTONCES
5      RETORNAR "RECHAZADO"
6  FIN SI
7  RETORNAR "ACEPTADO"
```

</div>

<div>

```text
     [1] dias < 1 ?
     /V          \F
  [2] RECHAZADO   [4] dias > 14 ?
                  /V          \F
           [5] RECHAZADO    [7] ACEPTADO
```

</div>

</div>

Rutas: 1(V)→2 · 1(F)→4(V)→5 · 1(F)→4(F)→7

## ¿Por qué no probar todas las rutas?

<div class="grid-2">

<div class="card accent-rojo">
<strong>Decisiones en secuencia</strong>
<p>Las rutas se multiplican: 2 decisiones → 4 rutas, 10 decisiones → 1 024.</p>
</div>

<div class="card accent-rojo">
<strong>Ciclos</strong>
<p>Cada número de vueltas es una ruta distinta: pueden ser ilimitadas.</p>
</div>

</div>

<div class="callout-alcance">

Se necesita un conjunto **pequeño** que recorra toda la lógica: la **base de rutas independientes**.

</div>

## Rutas linealmente independientes

<p align="center">
  <img src="/imagenes/pruebas-software/unidad-03/unidad03_grafo_precio_envio.svg" alt="Grafo de calcularPrecioEnvio: cinco nodos, seis aristas, V(G) = 3 y tres rutas base" width="760">
</p>

<p class="small">Una ruta es independiente si recorre al menos una arista nueva. V-V no aporta aristas nuevas.</p>

## Complejidad ciclomática V(G)

<div class="banner-node">

<strong>V(G)</strong> = número de rutas linealmente independientes del grafo (McCabe, REF-U3-15).

</div>

* **Número de casos** que exige la prueba de rutas base.
* **Máximo** de casos para cubrir instrucciones y decisiones.
* **Indicador** de complejidad: a mayor V(G), más difícil de probar y mantener.

<p class="small">McCabe sugirió revisar módulos con V(G) mayor que 10 (pendiente de verificación del valor en la fuente).</p>

## Tres formas de calcularla

| Fórmula | Cuenta | `calcularPrecioEnvio` |
| --- | --- | --- |
| E − N + 2 | Aristas y nodos | 6 − 5 + 2 = 3 |
| P + 1 | Decisiones | 2 + 1 = 3 |
| Regiones | Áreas cerradas + exterior | 2 + 1 = 3 |

<div class="callout-alerta">

Las tres deben coincidir. Con varios `RETORNAR`, agrega un nodo "Fin" al que lleguen todas las salidas: `validarDias` → 7 − 6 + 2 = 3.

</div>

## Condiciones compuestas

```text
1  SI dias < 1 O dias > 14 ENTONCES
2      RETORNAR "RECHAZADO"
3  FIN SI
4  RETORNAR "ACEPTADO"
```

<div class="callout-alcance">

Un solo `SI`, pero **dos condiciones simples**: V(G) = 3. Antes de dibujar, descompón la condición compuesta: cada condición simple es un nodo de decisión.

</div>

## Prueba de rutas base

1. Dibuja el grafo. 2. Calcula V(G) por dos métodos. 3. Construye la base: cada ruta nueva cambia **una** decisión. 4. Elige datos que fuercen cada ruta. 5. Resultado esperado **desde la especificación**.

| Ruta | peso, expres | Esperado |
| --- | --- | ---: |
| B1 (F-F) | 2, FALSO | 50 |
| B2 (V-F) | 6, FALSO | 80 |
| B3 (F-V) | 2, VERDADERO | 100 |

<p class="small">Especificación: base 50 MXN, más de 5 kg suma 30 y exprés duplica el costo.</p>

## Cobertura de instrucciones

<div class="grid-2">

<div>

```text
1  SI edad >= 18 ENTONCES
2      RETORNAR "ADULTO"
3  SINO SI edad >= 21 ENTONCES
4      RETORNAR "ADULTO MAYOR DE 21"
5  FIN SI
6  RETORNAR "MENOR"
```

</div>

<div>

**Exige:** ejecutar cada instrucción al menos una vez.

**Sirve para:** encontrar código no alcanzado y **código muerto**.

Ninguna edad ejecuta la línea 4: toda edad ≥ 21 ya salió por la línea 2. El código muerto revela el defecto: condiciones en orden equivocado.

</div>

</div>

## Instrucciones no basta

<div class="grid-2">

<div>

```text
// Socios: 10 % de descuento
1  descuento ← 10     // debía ser 0
2  SI esSocio ENTONCES
3      descuento ← total * 0.10
4  FIN SI
5  RETORNAR total - descuento
```

</div>

<div>

`(200, VERDADERO)` ejecuta **todas** las instrucciones: obtiene 180, correcto.

<div class="callout-alerta">

El defecto solo aparece si la decisión es **falsa**: `(200, FALSO)` espera 200 y obtiene **190**.

</div>

</div>

</div>

## Cobertura de decisiones (ramas)

**Exige:** que cada decisión tome V y F. En el grafo, recorrer **cada arista** de decisión. Prueba la arista F "invisible" del `SI` sin `SINO`.

<div class="grid-2">

<div>

```text
1  SEGÚN tipo HACER
2    "ESTUDIANTE": RETORNAR 5
3    "DOCENTE":    RETORNAR 3
4    OTRO:         RETORNAR 5
5  FIN SEGÚN
```

</div>

<div class="callout-alcance">

Un `SEGÚN` con *k* salidas exige *k* casos. Forzar `OTRO` con `"Docente"` revela que un tipo desconocido paga como ESTUDIANTE.

</div>

</div>

## Cobertura de condiciones

`SI activo O claveCorrecta` — defecto: debía ser `Y`.

| Caso | activo | clave | Esperado (Y) | Obtenido (O) |
| --- | :---: | :---: | --- | --- |
| C1 | V | V | ACCESO | ACCESO |
| C2 | V | F | DENEGADO | **ACCESO** |
| C3 | F | V | DENEGADO | **ACCESO** |
| C4 | F | F | DENEGADO | DENEGADO |

<p class="small">Cobertura de condiciones: cada condición simple toma V y F al menos una vez.</p>

## Cuatro criterios sobre la misma decisión

| Criterio | Un conjunto mínimo | ¿Detecta? |
| --- | --- | :---: |
| Decisiones | C1, C4 | No |
| Condiciones | C2, C3 | Sí |
| Decisión/condición | C1, C4 | No |
| Condición múltiple (2ⁿ) | C1–C4 | Sí |

<div class="callout-alerta">

Condiciones **no incluye** decisiones: con C2 y C3 la rama ACCESO nunca se ejecuta. C1 y C4 también cumplen condiciones y no detectan: importa qué conjunto eliges.

</div>

## Cobertura de todas las rutas

D1: `costo ← costo + 80` · D2: `costo ← 50 * 2` (línea 6 de `calcularPrecioEnvio`)

| Ruta | Datos | Esperado | Con D1 | Con D2 |
| --- | --- | ---: | ---: | ---: |
| F-F | (2, FALSO) | 50 | 50 | 50 |
| V-F | (6, FALSO) | 80 | 80 | 80 |
| F-V | (2, VERDADERO) | 100 | **130** | 100 |
| V-V | (6, VERDADERO) | 160 | 160 | **100** |

## ¿Qué conjunto detecta cada defecto?

| Criterio | Conjunto | D1 | D2 |
| --- | --- | :---: | :---: |
| Instrucciones | (6, V) | No | Sí |
| Decisiones | (6, V), (2, F) | No | Sí |
| Rutas base B1–B3 | (2, F), (6, F), (2, V) | Sí | **No** |
| Todas las rutas | Las cuatro | Sí | Sí |

<div class="callout-alerta">

Ninguna base de tres rutas detecta **ambos**. Todas las rutas sí, pero con ciclos pueden ser ilimitadas: los demás criterios son aproximaciones.

</div>

## Resumen de criterios

| Criterio | Exige | Casos (`calcularPrecioEnvio`) | Incluye a |
| --- | --- | ---: | --- |
| Instrucciones | Cada instrucción | 1 | — |
| Decisiones | Cada arista de decisión | 2 | Instrucciones |
| Rutas base | V(G) rutas independientes | 3 | Decisiones |
| Todas las rutas | Cada ruta completa | 4 | Rutas base |

<p class="small">"Incluye a": cumplir la fila implica cumplir lo indicado. Ningún criterio garantiza encontrar todos los defectos.</p>

## Prueba de ciclos: ciclo simple

<p align="center">
  <img src="/imagenes/pruebas-software/unidad-03/unidad03_grafo_ciclo_vencidos.svg" alt="Grafo de contarPrestamosVencidos con un ciclo, V(G) = 3" width="640">
</p>

<p class="small">Probar 0, 1, 2 y un número típico de vueltas. Si el ciclo se detiene una vuelta antes, el último préstamo nunca se revisa: el caso de una vuelta lo revela.</p>

## Ciclo con máximo

<div class="grid-2">

<div>

Carrito: **máximo 10** artículos. Si llegan más, se agregan 10 y se responde "LÍMITE ALCANZADO".

<div class="callout-alerta">

Defecto `longitud(carrito) <= 10`: con 10 artículos todo funciona. **Solo** el caso de 11 lo revela.

</div>

</div>

<div>

| Artículos | Esperado |
| ---: | --- |
| 0, 1, 2 | OK |
| 5 (típico) | OK |
| 9 (máx. − 1) | OK, 9 |
| 10 (máx.) | OK, 10 |
| 11 (máx. + 1) | LÍMITE, 10 |

</div>

</div>

## Ciclos anidados y concatenados

<div class="grid-2">

<div class="card accent-azul">
<strong>Anidados</strong>
<p>Combinar 7 valores por ciclo da 49 casos. Empieza por el ciclo interno con los externos al mínimo. Después avanza hacia afuera con los internos en un valor típico: unos 14 casos.</p>
</div>

<div class="card accent-azul">
<strong>Concatenados</strong>
<p>Si son independientes, cada uno se prueba como ciclo simple. Si el segundo usa un valor del primero, se tratan como anidados.</p>
</div>

</div>

## Flujo de datos: conceptos

Los criterios anteriores miran **por dónde** pasa la ejecución. El flujo de datos mira si cada **valor** llega a donde se usa (REF-U3-02).

| Concepto | Ejemplo |
| --- | --- |
| Definición (*def*) | `costo ← 50` |
| Uso computacional (*c-use*) | `RETORNAR costo` |
| Uso en predicado (*p-use*) | `SI peso > 5` |
| Par definición-uso (*du*) | Def y uso con una ruta entre ellos **sin otra definición** en medio |

<p class="small"><code>costo ← costo + 30</code> es a la vez uso y nueva definición.</p>

## Pares *du* de `costo`

| Par | Ruta | Datos |
| --- | --- | --- |
| def 1 → uso 3 | Decisión 1 en V | (6, FALSO) |
| def 1 → uso 6 | F-V | (2, VERDADERO) |
| def 1 → uso 8 | F-F | (2, FALSO) |
| def 3 → uso 6 | **V-V** | (6, VERDADERO) |
| def 3 → uso 8 | V-F | (6, FALSO) |
| def 6 → uso 8 | Decisión 2 en V | (2, VERDADERO) |

<p class="small">D2 (<code>costo ← 50 * 2</code>) rompe el par def 3 → uso 6, que ninguna ruta de B1–B3 recorre.</p>

## Criterios de flujo de datos

| Criterio | Exige | Casos | ¿Detecta D2? |
| --- | --- | ---: | :---: |
| Todas las definiciones (*all-defs*) | Cada definición llega a **un** uso | 2 | Sí |
| Todos los usos (*all-uses*) | Cada definición llega a **todos** sus usos | 4 | Sí |

<div class="callout-alcance">

En esta función pequeña, todos los usos coincide con todas las rutas. En código más grande exige bastante menos: solo sigue las rutas por las que viajan los valores.

</div>

## Anomalías de flujo de datos

<div class="grid-2">

<div>

```text
// Suma de adeudos + recargo de 15
1  recargo ← 10
2  i ← 1
3  MIENTRAS i <= longitud(adeudos)
4      total ← total + adeudos[i]
5      i ← i + 1
6  FIN MIENTRAS
7  recargo ← 15
8  RETORNAR total
```

</div>

<div>

| Anomalía | Dónde |
| --- | --- |
| Uso sin definición (*ur*) | `total`, línea 4 |
| Doble definición (*dd*) | `recargo`, líneas 1 y 7 |
| Definición sin uso (*du*) | `recargo`, línea 7 |

<p class="small">Se detectan leyendo el código, sin ejecutarlo.</p>

</div>

</div>

## Análisis estático de código

<div class="banner-node">

Examina el código **sin ejecutarlo**: en una revisión o inspección (Unidad I, 1.1.4) o con analizadores estáticos (*linters*).

</div>

<div class="grid-2">

<div class="card accent-dorado"><strong>Prueba dinámica</strong><p>Ejecuta, observa una falla y después busca el defecto que la causó.</p></div>
<div class="card accent-dorado"><strong>Análisis estático</strong><p>Señala el defecto directamente, antes de que haya una falla.</p></div>

</div>

<p class="small">Se agrupa con la caja blanca porque necesita el código, pero se clasifica como prueba estática: no diseña casos (REF-U3-04, REF-U3-19).</p>

## Qué detecta el análisis estático

| Hallazgo | Ejemplo |
| --- | --- |
| Código inalcanzable | Línea 4 de `clasificarEdad` |
| Variable sin valor o sin uso | `total` y `recargo` en `sumarAdeudos` |
| Condición siempre verdadera | `SI dias >= 1 O dias <= 14` |
| División entre posible cero | `suma / longitud(multas)` con lista vacía |
| Complejidad excesiva | Módulo con V(G) muy alto |

<div class="callout-alerta">

No compara contra la especificación: D1 (`costo + 80`) es código válido y ningún analizador lo detecta.

</div>

## Límites de la caja blanca

<div class="grid-2">

<div class="card accent-rojo"><strong>No ve lo que falta</strong><p>Si nadie programó un requisito, no hay ruta que lo ejecute.</p></div>
<div class="card accent-rojo"><strong>Oráculo</strong><p>El esperado sale de la especificación. Si sale del código, el defecto se copia.</p></div>
<div class="card accent-dorado"><strong>Cobertura ≠ corrección</strong><p>Algunos defectos solo aparecen con ciertos datos de la misma ruta.</p></div>
<div class="card accent-dorado"><strong>Necesita el código</strong><p>Se usa sobre todo en el nivel unitario.</p></div>

</div>

## Caja gris: entre los dos enfoques

<div class="banner-node">

Casos diseñados con conocimiento **parcial** del diseño interno, ejecutados por la **interfaz externa**. A veces el resultado se verifica en el **estado interno**.

</div>

| Conocimiento interno | Casos que sugiere |
| --- | --- |
| Modelo de datos: `titulo` de 100 caracteres | Límites 100 y 101 |
| Interfaz: el tipo de usuario viaja como texto | `DOCENTE`, `Docente`, `docente ` |
| Estado: contador `librosPrestados` | Secuencia de préstamos y revisión del contador |

<p class="small">Complemento de 3.2.1–3.2.2. No es un tema propio del programa. Se usa más en integración y sistema.</p>

## Caja gris: ejemplos (SPB)

<p class="small">Los datos de diseño son supuestos académicos.</p>

| Caso | Qué hace | Esperado | Busca |
| --- | --- | --- | --- |
| CG-02 | Título de 101 caracteres | Mensaje claro de máximo excedido | Recorte silencioso |
| CG-04 | Devolución de `Docente`, 4 días | 12 MXN (RN-04) | 20 MXN por la interfaz |
| CG-06 | 3.er préstamo de ESTUDIANTE, revisar `librosPrestados` e intentar el 4.º | 3, y el 4.º rechazado (RN-02) | Contador sin incrementar |

<div class="callout-alerta">

Si la especificación calla (CG-02), se registra la pregunta. El comportamiento actual no es el esperado por definición.

</div>

## Negra, gris y blanca

| Aspecto | Caja negra | Caja gris | Caja blanca |
| --- | --- | --- | --- |
| Conocimiento interno | Ninguno | Parcial: diseño, datos, interfaces | Completo: código |
| Base del diseño | Especificación | Especificación y diseño | Código |
| Ejecución | Interfaz externa | Interfaz externa y estado interno | Llamada directa al código |
| Nivel típico | Sistema, aceptación | Integración, sistema | Unitario |

<p class="small">En los tres, el resultado esperado sale de la especificación. En las Unidades IV y V aplicarás la caja gris a bases de datos y APIs.</p>

## Relación con el Laboratorio 02

<div class="callout">

El grafo, las rutas y la complejidad ciclomática se practican en el [Laboratorio 2 — Caja blanca: grafo, rutas y complejidad ciclomática](/materias/pruebas-software/unidad-03/laboratorios/laboratorio-2-caja-blanca-rutas/): primero con `calcularMulta` del SPB y después con el pseudocódigo de una regla de tu proyecto base.

</div>

## Qué sigue

Continúa con [5. Pruebas exploratorias y basadas en riesgos](/materias/pruebas-software/unidad-03/05-pruebas-exploratorias-y-basadas-en-riesgos/).
