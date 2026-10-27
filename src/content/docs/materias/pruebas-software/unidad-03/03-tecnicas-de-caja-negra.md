---
title: "3. Técnicas de caja negra"
description: "Unidad III de Pruebas de Software — partición de equivalencia, análisis de valores límite y tablas de decisión."
---

**Temas del programa:** 3.2.5, 3.2.6 y 3.2.7

## Partición de equivalencia: ¿qué problema resuelve?

RN-01 acepta 1 a 14, pero el campo puede recibir **cualquier cosa**: -1 000, 0, 7, 15, 2.5, "abc", vacío.

<div class="grid-2">

<div class="card accent-rojo">
<strong>Sin técnica</strong>
<p>Se prueban 3, 5 y 7: tres casos que aportan lo mismo, y nadie probó "abc".</p>
</div>

<div class="card accent-verde">
<strong>Con técnica</strong>
<p>Pocos casos, sin repetir esfuerzo y sin dejar comportamientos sin probar.</p>
</div>

</div>

<p class="small">Las pruebas exhaustivas no existen (Unidad I): hay que elegir bien.</p>

## Partición de equivalencia: qué es

Divide el dominio de una entrada (o salida) en **clases**: grupos que el sistema debe **tratar igual**.

<div class="callout-alcance">

**Supuesto:** si un valor de la clase revela un defecto, los demás también lo harían. Por eso basta **un representante** por clase.

</div>

* **Cobertura del dominio:** todo valor cae en alguna clase.
* **Sin traslape:** ningún valor cae en dos clases.
* **Válidas** (la regla las acepta) e **inválidas** (fuera de rango, tipo incorrecto, vacío).

## ¿Cómo encuentro las clases?

| La especificación indica... | Válidas | Inválidas |
| --- | --- | --- |
| Un **rango** (1 a 14) | 1: dentro | 2: debajo y encima |
| Un **número** de elementos (1 a 3 autores) | 1: permitido | 2: ninguno y demasiados |
| Un **conjunto** (ESTUDIANTE, DOCENTE) | 1 por valor | 1: fuera del conjunto |
| Una condición **obligatoria** | 1: se cumple | 1: no se cumple |
| Siempre | — | Tipo incorrecto, vacío |

<p class="small">Reglas prácticas de Myers et al. (REF-U3-01). Si sospechas que valores de una clase se tratan distinto, divídela.</p>

## Ejemplo — RN-01 (días de préstamo, 1 a 14)

| Clase | Tipo | Descripción | Representante | Esperado |
| --- | --- | --- | --- | --- |
| CE-1 | Válida | Entero entre 1 y 14 | 7 | Aceptado |
| CE-2 | Inválida | Entero menor que 1 | -3 | Rechazado |
| CE-3 | Inválida | Entero mayor que 14 | 20 | Rechazado |
| CE-4 | Inválida | No entero | 2.5 | Rechazado |
| CE-5 | Inválida | No numérico | "abc" | Rechazado |
| CE-6 | Inválida | Vacío | (vacío) | Rechazado |

## Dos reglas que evitan errores

<div class="grid-2">

<div class="card accent-azul">
<strong>Dato inválido ≠ rechazo de negocio</strong>
<p>ESTUDIANTE con 3 libros: dato <strong>válido</strong>, resultado de rechazo. Libros = -1: dato <strong>inválido</strong>. Son clases distintas.</p>
</div>

<div class="card accent-dorado">
<strong>Una clase inválida por caso</strong>
<p>Si un caso mezcla dos inválidas y se rechaza, no sabes cuál causó el rechazo (enmascaramiento).</p>
</div>

</div>

## Particiones de salida — RN-04

| Clase de salida | Condición | ESTUDIANTE | Esperado |
| --- | --- | --- | --- |
| CS-1 Sin multa | diasRetraso ≤ 0 | 0 días | 0 MXN |
| CS-2 Proporcional | La multa no supera el tope | 3 días | 15 MXN |
| CS-3 En el tope | La multa calculada supera 100 | 25 días | 100 MXN |

<div class="callout-alcance">

La frontera entre CS-2 y CS-3 **depende del tipo de usuario**: el ESTUDIANTE llega antes al tope.

</div>

## Variantes: débil o fuerte, normal o robusta

| Variante | Construcción | RN-04 (tipo × días) |
| --- | --- | ---: |
| Débil normal | Cada clase válida al menos una vez | 3 |
| Fuerte normal | Todas las combinaciones de válidas | 6 |
| Débil robusta | Débil + un caso por clase inválida | 5 |
| Fuerte robusta | Todas las combinaciones de todas | 12 |

<p class="small">La débil supone que los defectos dependen de una sola entrada. Si el resultado depende de cómo se combinan, usa la fuerte o una tabla de decisión (Jorgensen, REF-U3-02).</p>

## Cuando el supuesto falla

```text
FUNCIÓN validarDias(dias)
1   SI dias < 1 ENTONCES RETORNAR "RECHAZADO"
4   SI dias > 10 ENTONCES RETORNAR "REQUIERE AUTORIZACIÓN"   ← no está en RN-01
7   SI dias > 14 ENTONCES RETORNAR "RECHAZADO"
10  RETORNAR "ACEPTADO"
```

<div class="callout-alerta">

7 y 12 están en la misma clase, pero el código los trata distinto. El representante 7 no lo ve. Lo revelan los **valores límite** (14) y la **caja blanca** (línea 4 sin ejecutar).

</div>

## Análisis de valores límite: ¿qué problema resuelve?

"Entre 1 y 14 inclusive" se traduce a `<`, `<=`, `>`, `>=`. Un símbolo mal escrito cambia el comportamiento **solo en los bordes**.

<div class="callout-alcance">

**Valores límite (BVA):** además de un representante, prueba los valores **en la frontera** entre clases contiguas.

</div>

<p class="small">Solo aplica a clases ordenadas: números, fechas, horas, cantidades, longitudes.</p>

## Los defectos viven en los bordes

| Versión | Línea con defecto | ¿7, -3 o 20 lo detectan? | Lo detecta |
| --- | --- | :---: | :---: |
| M1 | `SI dias <= 1` | No | 1 |
| M2 | `SI dias >= 14` | No | 14 |
| M3 | `SI dias > 15` | No | 15 |
| M4 | `SI dias < 0` | No | 0 |

<div class="banner-node">

Con **0, 1, 14 y 15** se detectan los cuatro defectos.

</div>

## Variantes de valores límite

<div class="grid-2">

<div class="card accent-azul">
<strong>Dos valores por frontera</strong>
<p>RN-01: <strong>0, 1</strong> y <strong>14, 15</strong></p>
</div>

<div class="card accent-dorado">
<strong>Tres valores por frontera</strong>
<p>RN-01: <strong>0, 1, 2</strong> y <strong>13, 14, 15</strong></p>
</div>

</div>

Ejemplo genérico: "hasta 10 MB" programado como `tamaño = 10`. Con 10 y 11 no se detecta. Con **9** sí.

<p class="small">Con varias entradas: normal 4n + 1, robusto 6n + 1, peor caso 5ⁿ (Jorgensen, REF-U3-02).</p>

## Tablas de decisión: ¿qué problema resuelven?

<div class="grid-2">

<div class="card accent-rojo">
<strong>Combinaciones</strong>
<p>Si el resultado depende de varias condiciones, el defecto puede estar en una <strong>combinación</strong> que nadie probó.</p>
</div>

<div class="card accent-dorado">
<strong>Huecos de la especificación</strong>
<p>Las reglas en lenguaje natural dicen qué pasa si todo está bien, no qué pasa en cada combinación de fallas.</p>
</div>

</div>

## Estructura de una tabla de decisión

```text
                         │ R1 │ R2 │ R3 │ R4 │   ← reglas: una combinación cada una
─────────────────────────┼────┼────┼────┼────┤
 C1: compra ≥ 500 MXN    │ S  │ S  │ N  │ N  │   ← condiciones
 C2: cliente registrado  │ S  │ N  │ S  │ N  │
─────────────────────────┼────┼────┼────┼────┤
 A1: envío gratuito      │ X  │    │    │    │   ← acciones
 A2: cobrar envío        │    │ X  │ X  │ X  │
```

<p class="small">n condiciones Sí/No → 2ⁿ reglas. Llenado sistemático: la primera condición alterna cada 2ⁿ⁻¹ columnas. La última, en cada columna.</p>

## Por qué no basta "un caso bueno y uno malo"

```text
Correcto:   SI montoCompra >= 500 Y registrado ENTONCES "GRATUITO"
Defecto:    SI montoCompra >= 500 O registrado ENTONCES "GRATUITO"
```

| Regla | Esperado | Con el defecto | ¿Detecta? |
| --- | --- | --- | :---: |
| R1 (S, S) | Gratuito | Gratuito | No |
| R2 (S, N) | Cobrar | Gratuito | **Sí** |
| R3 (N, S) | Cobrar | Gratuito | **Sí** |
| R4 (N, N) | Cobrar | Cobrar | No |

## Reducir y comprobar

Si una condición no cambia las acciones, se marca con `—` y las columnas se fusionan: R3 y R4 → (N, —).

<div class="callout-alcance">

**Comprobación:** cada `—` en una condición Sí/No vale 2. La suma debe dar 2ⁿ: 1 + 1 + 2 = 4 ✓. Si da más, hay traslape. Si da menos, falta una combinación.

</div>

<div class="callout-alerta">

Reduce solo si la especificación lo justifica: si R3 y R4 muestran mensajes distintos, no se fusionan.

</div>

## Entrada extendida y combinaciones imposibles

<div class="grid-2">

<div class="card accent-azul">
<strong>Entrada extendida</strong>
<p>Condición con más de dos valores: tipo de cliente PREMIUM / REGISTRADO / INVITADO × compra ≥ 500 → 3 × 2 = 6 reglas.</p>
</div>

<div class="card accent-dorado">
<strong>Combinaciones imposibles</strong>
<p>"compra ≥ 500 = N" y "compra ≥ 1 000 = S" no pueden ocurrir juntas: se marcan como imposibles y no generan casos.</p>
</div>

</div>

## La tabla también es una herramienta de análisis

<div class="callout">

Al construirla aparecen combinaciones que la especificación **no resuelve**. Es un hallazgo aunque no hayas ejecutado nada: se pregunta, no se supone, y se registra como riesgo de prueba.

</div>

<p class="small">Con muchas condiciones la tabla crece (6 condiciones → 64 reglas): reduce cuando se justifique, separa en subreglas o prioriza por riesgo.</p>

## ¿Qué técnica de caja negra elijo?

| Si la regla... | Técnica |
| --- | --- |
| Restringe a un conjunto o tipo de valores | Partición |
| Restringe un dato ordenado a un rango o cantidad | Partición + valores límite |
| Produce tramos distintos de una salida | Partición de salidas + valores límite |
| Combina dos o más condiciones para decidir | Tabla de decisión (+ valores límite en las condiciones numéricas) |

<p class="small">En los proyectos base: cantidad frente a existencia (B), cupo (C) y horario dentro de la disponibilidad (A). Por ejemplo: solicitar cita, generar pedido, inscribirse.</p>

## Relación con el Laboratorio 01

<div class="callout">

Las técnicas de este bloque se practican en el [Laboratorio 1 — Técnicas de caja negra](/materias/pruebas-software/unidad-03/laboratorios/laboratorio-1-tecnicas-caja-negra/): primero con reglas del SPB y después con las reglas y los escenarios de tu proyecto base.

</div>

## Qué sigue

Continúa con [4. Caja blanca y caja gris](/materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris/).
