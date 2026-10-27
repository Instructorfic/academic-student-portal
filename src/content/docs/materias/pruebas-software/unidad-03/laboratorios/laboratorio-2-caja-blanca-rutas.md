---
title: "Laboratorio 2 — Caja blanca: grafo, rutas y complejidad ciclomática"
description: "Unidad III de Pruebas de Software — grafo de flujo, rutas base, V(G) y criterios de cobertura sobre calcularMulta del SPB y transferencia al proyecto base."
---

> Laboratorio de **análisis**: el código está en pseudocódigo y se "ejecuta" a mano mediante un **trazado de escritorio**
> (seguir el pseudocódigo línea por línea anotando el valor de cada
> variable). En la Unidad IV medirás la cobertura con herramientas sobre
> código real.

---

## 1. Identificación

| Campo | Valor |
| --- | --- |
| Laboratorio | LAB02 — Caja blanca: grafo de flujo, rutas y complejidad ciclomática |
| Unidad | III — Ingeniería y planificación de pruebas |
| Duración | 1 sesión de 1 hora + 30 minutos individuales + 45 minutos en equipo (estimado) |
| Trabajo | Parte A individual. Parte B en equipo |
| Dificultad | Intermedio |
| Evaluación | Formativa, con criterio de logro (sección 13). La parte B es el Anexo B del plan de pruebas (Laboratorio 03) |

## 2. Objetivo

**Construir** el grafo de flujo de control de una función, **calcular**
su complejidad ciclomática, **diseñar** conjuntos de casos que alcancen
cobertura de instrucciones, de decisiones y de rutas base, y
**comprobar** mediante un trazado de escritorio que cumplir un criterio
de cobertura no garantiza detectar un defecto.

## 3. Resultado esperado

* Grafo de flujo de control de `calcularMulta`.
* Complejidad ciclomática calculada por tres métodos.
* Lista de todas las rutas y un conjunto base.
* Tres conjuntos de casos (instrucciones, decisiones, rutas base), con
  resultados esperados obtenidos **de RN-04**.
* Conclusión sobre qué casos detectan el defecto de la versión B.
* Para el proyecto base: pseudocódigo de una regla, su grafo, V(G),
  conjunto base y casos.

```text
RA3.3 — Aplicar caja blanca
        ↓
Objetivo: analizar rutas y decisiones y diseñar casos por criterio de cobertura
        ↓
Tareas: grafo → V(G) → rutas → conjuntos de casos → trazado → defecto → proyecto base
        ↓
Evidencia: análisis y casos documentados
        ↓
Criterio de logro (sección 13) y Anexo B del plan (Laboratorio 03)
```

## 4. Prerrequisitos

### Conocimientos

* [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/) completo, incluidos los ejemplos de
  `validarDias`, `calcularPrecioEnvio` y `contarPrestamosVencidos`.
* [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) (particiones de salida de RN-04).
* Cobertura de instrucciones y de decisiones ([Cobertura y métricas básicas](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/), Unidad I).
* Laboratorio 01, parte D terminada (tabla de decisión de tu proyecto
  base).

### Herramientas

| Elemento | Condición |
| --- | --- |
| Papel y lápiz para el grafo | RECOMENDADO |
| Editor de texto con Markdown | REQUERIDO |
| Cámara del teléfono, si el grafo se dibuja en papel | OPCIONAL |

### Recursos

**Regla de negocio (la fuente del resultado esperado):**

| ID | Regla |
| --- | --- |
| RN-04 | Multa: 5 MXN por día de retraso para ESTUDIANTE y 3 MXN para DOCENTE, con tope de 100 MXN por préstamo y 0 MXN si no hay retraso |

**Versión A — implementación entregada por el equipo de desarrollo:**

```text
FUNCIÓN calcularMulta(diasRetraso, tipoUsuario)
1   SI diasRetraso <= 0 ENTONCES
2       RETORNAR 0
3   FIN SI
4   tarifa ← 5
5   SI tipoUsuario = "DOCENTE" ENTONCES
6       tarifa ← 3
7   FIN SI
8   multa ← diasRetraso * tarifa
9   SI multa > 100 ENTONCES
10      multa ← 100
11  FIN SI
12  RETORNAR multa
FIN FUNCIÓN
```

Para contar instrucciones, considera **instrucciones ejecutables** las
líneas 1, 2, 4, 5, 6, 8, 9, 10 y 12 (nueve en total). Las líneas `FIN SI`
no se cuentan.

## 5. Entorno

Cualquier sistema operativo con un editor de texto. No se requiere red ni
software adicional.

## 6. Preparación

1. Crea el documento `U03_LAB02_<apellido>.md` para la parte A, salvo que
   tu docente indique otra convención.
2. Copia la versión A del pseudocódigo, con su numeración de líneas.

---

## 7. Procedimiento

### Parte A — `calcularMulta` (sesión 27, individual)

#### Paso 1 — Identifica las decisiones

Escribe las líneas que contienen una decisión y la condición de cada una.
Nómbralas D1, D2 y D3 en orden de aparición. ¿Alguna es una condición
compuesta ([4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/))?

#### Paso 2 — Dibuja el grafo de flujo de control

Aplica el procedimiento del tema [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/):

1. Agrupa en un mismo nodo las instrucciones consecutivas que siempre se
   ejecutan juntas (por ejemplo, las líneas 4 y 5).
2. Usa los patrones del tema [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/). Atención a los `SI` **sin**
   `SINO`: su arista F va directo al nodo siguiente al `FIN SI`.
3. La línea 2 es un `RETORNAR`: termina la función. Agrega un nodo "Fin"
   al que lleguen todas las salidas ([4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/)).
4. Marca las aristas de cada decisión con V y F.

Puedes dibujarlo a mano y fotografiarlo, o representarlo en texto como en
el tema [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/).

#### Paso 3 — Calcula la complejidad ciclomática por tres métodos

1. `V(G) = número de decisiones + 1`.
2. `V(G) = aristas − nodos + 2`, contando las aristas y los nodos de
   **tu** grafo.
3. `V(G) = número de regiones` (áreas cerradas del grafo más la región
   exterior).

### CHECKPOINT 1

Los tres métodos deben dar el **mismo** resultado. Si no coinciden,
revisa el grafo: lo más frecuente es olvidar la arista F de una decisión
que "no hace nada" cuando es falsa (por ejemplo, de la decisión de la
línea 5 directamente a la línea 8) u olvidar la arista del `RETORNAR` de
la línea 2 al nodo "Fin".

#### Paso 4 — Enumera todas las rutas y elige un conjunto base

1. Lista **todas** las rutas desde el inicio hasta "Fin", escribiendo el
   valor (V o F) de cada decisión que recorren.

   | Ruta | D1 | D2 | D3 | Líneas ejecutadas |
   | --- | :---: | :---: | :---: | --- |
   | P1 | V | — | — | 1, 2 |
   | ... | | | | |

2. ¿Cuántas rutas hay en total? ¿Es el mismo número que V(G)?
3. Construye un **conjunto base** con el procedimiento del tema [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/)
   (paso 3): para cada ruta que agregues, indica qué arista **nueva**
   aporta.
4. Indica qué ruta quedó fuera del conjunto base y por qué no es
   independiente.

#### Paso 5 — Encuentra las fronteras de salida de RN-04

Para forzar algunas rutas necesitas saber con cuántos días la multa
**alcanza** y con cuántos **supera** el tope ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).

| Tipo de usuario | Días con la multa más alta sin superar 100 MXN | Multa | Primer día que supera 100 MXN | Multa calculada antes del tope |
| --- | ---: | ---: | ---: | ---: |
| ESTUDIANTE | ? | ? | ? | ? |
| DOCENTE | ? | ? | ? | ? |

#### Paso 6 — Diseña tres conjuntos de casos

Diseña, con el **menor número posible** de casos:

* **Conjunto I — Cobertura de instrucciones:** cada una de las nueve
  instrucciones ejecutables se ejecuta al menos una vez.
* **Conjunto II — Cobertura de decisiones:** D1, D2 y D3 toman cada una
  los valores V y F al menos una vez.
* **Conjunto III — Rutas base:** tantos casos como V(G), uno por ruta de
  tu conjunto base.

Para cada caso escribe: entradas (`diasRetraso`, `tipoUsuario`), ruta que
recorre y **resultado esperado calculado con RN-04**, no leyendo el
código.

| Conjunto | ID | diasRetraso | tipoUsuario | Ruta | Resultado esperado según RN-04 |
| --- | --- | ---: | --- | --- | ---: |
| I | CP-RN04-I-01 | ? | ? | ? | ? |

> Regla de oro de este laboratorio: el resultado esperado sale de la
> **especificación** (RN-04). Si lo calculas leyendo el código, cualquier
> defecto del código se copiará a tu resultado esperado y nunca lo verás.

### CHECKPOINT 2

Calcula la cobertura que lograría **un solo caso**: `diasRetraso = 3`,
`tipoUsuario = "ESTUDIANTE"`.

* Cobertura de instrucciones: instrucciones ejecutadas / 9.
* Cobertura de decisiones: resultados de decisión ejecutados / 6 (tres
  decisiones × dos resultados).

Expresa ambas como porcentaje.

#### Paso 7 — Trazado de escritorio sobre la versión A

"Ejecuta" a mano cada caso de los tres conjuntos sobre la versión A:
sigue el pseudocódigo línea por línea y anota el valor de `tarifa`, de
`multa` y el valor retornado. Compara el valor retornado con el
resultado esperado.

| ID | tarifa | multa (línea 8) | Valor retornado | Resultado esperado | ¿Coincide? |
| --- | ---: | ---: | ---: | ---: | :---: |

**Resultado esperado del paso:** en la versión A todos los casos deben
coincidir.

#### Paso 8 — Una versión con un defecto

El equipo de desarrollo entregó por error una **versión B**, idéntica a la
A salvo en la línea 8:

```text
8   multa ← diasRetraso * 5
```

1. Repite el trazado de escritorio con el **Conjunto I** sobre la versión
   B. ¿Algún caso falla?
2. Repite el trazado con el **Conjunto II** y con el **Conjunto III**
   sobre la versión B. ¿Algún caso falla?
3. Compara tu Conjunto II con el de otra persona del grupo. ¿Ambos
   detectaron el defecto? Si no, ¿en qué se diferencian los casos?
4. Identifica cuál de las rutas del paso 4 es la **única** que revela el
   defecto y explica por qué.
5. Concluye en tres a cinco líneas: ¿algún criterio de cobertura
   **garantiza** detectar este defecto? ¿Qué técnica de caja negra del
   Laboratorio 01 lo habría detectado sin mirar el código?

### CHECKPOINT 3

Si tu Conjunto I **sí** detectó el defecto, revisa si es realmente
mínimo: ¿tiene más casos de los necesarios para cubrir las nueve
instrucciones? Un conjunto mínimo de cobertura de instrucciones nunca lo
detecta. Descubre por qué.

#### Paso 9 — Lo que el código no dice

1. ¿Qué devuelve la versión A si `tipoUsuario = "INVITADO"`? ¿Lo define
   RN-04?
2. ¿Qué técnica de caja negra del Laboratorio 01 habría generado ese caso
   aunque no tuvieras el código?
3. Redacta la pregunta de aclaración que enviarías a quien define los
   requisitos.

### Parte B — Pseudocódigo de una regla de tu proyecto base (trabajo independiente, en equipo)

Tu proyecto base todavía no tiene código. Pero puedes analizar la
**lógica de diseño** de una regla: cómo debería implementarse según la
especificación. Este análisis te dice cuántos casos exige su estructura y
será el Anexo B de tu plan de pruebas.

#### Paso 10 — Escribe el pseudocódigo

Toma la regla de tu **tabla de decisión** del Laboratorio 01, parte D, y
escríbela como una función en pseudocódigo, con el estilo del tema
[4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/) (`FUNCIÓN`, `SI ... ENTONCES`, `FIN SI`, `RETORNAR`, líneas numeradas).

* Cada condición de la tabla debe aparecer como una decisión.
* Si la tabla tiene acciones distintas por motivo de rechazo, cada motivo
  debe tener su `RETORNAR`.
* Si escribes condiciones compuestas (`Y`, `O`), descompónlas en
  condiciones simples antes de dibujar el grafo ([4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/)).

#### Paso 11 — Grafo, V(G) y conjunto base

Dibuja el grafo, calcula V(G) por al menos dos métodos y construye un
conjunto base indicando la arista nueva que aporta cada ruta.

#### Paso 12 — Casos por ruta base

Para cada ruta del conjunto base escribe un caso de prueba con el formato
del [Formato del Plan de Pruebas — Unidad 03](/materias/pruebas-software/unidad-03/formato-plan-pruebas/),
sección 6: técnica "Caja blanca — rutas base", ESC de origen si existe,
resultado esperado tomado de la **regla de negocio** (no del
pseudocódigo) y estado `Pendiente de ejecutar`. Si un caso coincide con
uno del Laboratorio 01, reutiliza su ID en lugar de duplicarlo.

#### Paso 13 — Compara caja blanca y tabla de decisión

Responde en el equipo:

1. ¿Cuántas reglas tiene la tabla completa de tu Laboratorio 01 y cuánto
   vale V(G) de tu pseudocódigo? ¿Por qué son distintos?
2. ¿Hay alguna combinación de la tabla que **ninguna** ruta base obliga a
   probar? ¿Qué defecto podría esconderse ahí? (Recuerda el paso 15 del
   Laboratorio 01.)

---

## 8. Verificación

* [ ] Tres decisiones identificadas. V(G) igual por los tres métodos.
* [ ] Todas las rutas listadas con sus valores V/F. Conjunto base con la arista nueva de cada ruta.
* [ ] Fronteras de salida de RN-04 para ambos tipos de usuario.
* [ ] Conjuntos I, II y III mínimos y con ruta indicada.
* [ ] Todos los resultados esperados calculados con RN-04.
* [ ] Trazado de escritorio completo para las versiones A y B.
* [ ] Ruta que revela el defecto identificada y conclusión del paso 8.
* [ ] Parte B: pseudocódigo, grafo, V(G), conjunto base, casos y respuestas del paso 13.

## 9. Errores frecuentes de diseño

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| V(G) distinto por los métodos | Falta una arista F, falta el nodo "Fin" o sobra un nodo | Cada decisión debe tener exactamente dos aristas de salida. Todas las salidas llegan a "Fin" | Corrige el grafo y recuenta |
| El Conjunto I tiene tres o más casos | No combinaste ramas compatibles en un caso | ¿Algún caso puede ejecutar la línea 6 y la 10 a la vez? | Busca un caso que pase por ambas |
| Resultado esperado igual al del código en la versión B | Se calculó el esperado leyendo el código | ¿Usaste 3 MXN por día para DOCENTE? | Recalcula con RN-04 |
| No encuentras un caso para D3 = V con DOCENTE | Elegiste pocos días | Revisa tu tabla del paso 5 | Usa el primer día que supera el tope |
| Confundes rutas totales con V(G) | V(G) cuenta rutas independientes, no todas | Compara tu tabla del paso 4 con V(G) | Revisa el tema [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/) |
| En la parte B, V(G) = 2 con tres condiciones | Dibujaste una condición compuesta como un solo nodo | ¿Usaste `Y` u `O` en una decisión? | Descompón en condiciones simples |

## 10. Evidencias

### Evidencia mínima

* Parte A: decisiones, grafo (texto o fotografía legible) y V(G) por tres
  métodos. Tabla de rutas y conjunto base. Fronteras de salida.
  Conjuntos I, II y III con resultados esperados. Respuesta del
  checkpoint 2. Trazado de la versión B y respuestas del paso 8.
* Parte B: pseudocódigo, grafo, V(G), conjunto base, casos y respuestas
  del paso 13.

### Evidencia adicional

* Trazado completo de la versión A (paso 7).
* Respuestas del paso 9.
* Reto adicional (sección 12).

## 11. Reflexión

1. ¿Qué te dice el paso 8 sobre afirmar "tenemos 100 % de cobertura de
   instrucciones"? Relaciónalo con el principio "las pruebas muestran
   presencia de defectos, no su ausencia" (Unidad I).
2. ¿Por qué el resultado esperado debe calcularse desde la especificación
   y no desde el código?
3. ¿En qué nivel de prueba ([1. Tipos y niveles de pruebas](/materias/pruebas-software/unidad-03/01-tipos-y-niveles-de-pruebas/)) se aplicaría normalmente este
   análisis? ¿Quién lo haría?
4. ¿Qué te aportó la caja blanca que no te habían aportado la partición,
   los valores límite y la tabla de decisión? ¿Y al revés?

## 12. Reto adicional

1. Toma el pseudocódigo correcto de RN-03 del reto del Laboratorio 01.
   Calcula su V(G) y compáralo con las 8 reglas de la tabla completa.
2. Imagina una **versión C** de `calcularMulta` en la que la línea 9 dice
   `SI multa >= 100 ENTONCES`. Con los valores de tu paso 5, ¿algún valor
   produce un resultado distinto entre la versión A y la C? ¿Qué concluyes
   sobre ese cambio?

## 13. Entrega y evaluación

| Aspecto | Valor |
| --- | --- |
| Qué entregar | Parte A: el documento individual con la evidencia mínima y la fotografía del grafo, si aplica. Parte B: un documento del equipo |
| Formato | Markdown (`.md`) o PDF. Imagen `.png` o `.jpg` para el grafo |
| Nombre | `U03_LAB02_<apellido>` (parte A) y `U03_LAB02B_<nombre_del_equipo>` (parte B), salvo indicación del docente |
| Dónde | En la plataforma indicada por tu docente |
| Cuándo | Parte A: antes de la sesión 28. Parte B: antes de la sesión 31 |

### Criterio de logro (nivel satisfactorio)

| Criterio | Evidencia | Nivel esperado |
| --- | --- | --- |
| Análisis estructural | Pasos 1–4 | Grafo correcto, V(G) = 4 por los tres métodos, todas las rutas listadas, conjunto base justificado por aristas nuevas |
| Diseño por criterio | Pasos 5–6 | Fronteras de salida correctas. Tres conjuntos mínimos que cumplen su criterio. Resultados esperados obtenidos de RN-04 |
| Comprobación | Pasos 7–8 | Trazado correcto. Identifica la ruta que revela el defecto y explica que cumplir un criterio de cobertura no garantiza detectarlo |
| Transferencia | Pasos 10–13 | Pseudocódigo coherente con la tabla de decisión. Grafo y V(G) consistentes. Un caso por ruta base con resultado esperado de la regla. Compara V(G) con el número de reglas |

Este laboratorio es formativo. La parte B se reutiliza como Anexo B del
plan de pruebas y se evalúa, junto con el plan, con el criterio "Técnicas
de diseño" de la rúbrica de la unidad.

## 14. Referencias

* Temas [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) y [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/) de la Unidad III, y [Cobertura y métricas básicas](/materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas/) de la Unidad I.
* REF-U3-01 (Myers et al.), REF-U3-02 (Jorgensen), REF-U3-13
  (ISO/IEC/IEEE 29119-4), REF-U3-15 (McCabe) y REF-U3-16 (Watson y
  McCabe, ambas pendiente de verificación).
