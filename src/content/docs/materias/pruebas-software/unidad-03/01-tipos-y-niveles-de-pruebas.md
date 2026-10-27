---
title: "1. Tipos y niveles de pruebas"
description: "Unidad III de Pruebas de Software — nivel y tipo de prueba, los cuatro niveles, modelo en V y estrategias de integración."
---

**Temas del programa:** 3.1

## Nivel de prueba y tipo de prueba

<div class="grid-2">

<div class="card accent-azul">
<strong>Nivel de prueba</strong>
<p>Agrupa pruebas por el <strong>objeto de prueba</strong>: componente, conexión entre componentes, sistema completo, uso del negocio.</p>
</div>

<div class="card accent-dorado">
<strong>Tipo de prueba</strong>
<p>Agrupa pruebas por la característica que evalúan: funcional, no funcional, estructural, relacionada con cambios.</p>
</div>

</div>

<div class="callout-alerta">

JUnit o Postman son **herramientas**, no niveles. El nivel depende de **qué** estás probando.

</div>

## Los cuatro niveles

| Nivel | Objeto de prueba | Quién suele probar | Base de prueba |
| --- | --- | --- | --- |
| Unitaria | Función, método o clase aislados | Quien desarrolla | Diseño detallado, código |
| Integración | Interacción entre componentes | Desarrollo o pruebas | Arquitectura, interfaces |
| Sistema | Sistema completo, ambiente similar a producción | Equipo de pruebas | Requisitos, casos de uso |
| Aceptación (UAT) | Sistema en el contexto del negocio | Usuarios o cliente | Criterios de aceptación |

<p class="small">Base de prueba: el documento del que salen los casos y sus resultados esperados.</p>

## Nivel unitario: el componente aislado

```text
FUNCIÓN calcularMulta(diasRetraso, tipoUsuario)
1   SI diasRetraso <= 0 ENTONCES RETORNAR 0 ...
4   tarifa ← 5
5   SI tipoUsuario = "DOCENTE" ENTONCES tarifa ← 3 ...
8   multa ← diasRetraso * tarifa
9   SI multa > 100 ENTONCES multa ← 100 ...
12  RETORNAR multa
```

```text
CASO (unitario)   Entrada: diasRetraso = 3, tipoUsuario = "ESTUDIANTE"
                  Resultado esperado: 15     (RN-04: 3 × 5 MXN)
```

Si falla, el defecto **solo** puede estar dentro de `calcularMulta`.

## Nivel de integración: el acuerdo entre componentes

```text
FUNCIÓN registrarDevolucion(idPrestamo, fechaDevolucion)
1   prestamo ← repositorioPrestamos.buscar(idPrestamo)
2   usuario  ← servicioUsuarios.obtener(prestamo.idUsuario)
3   diasRetraso ← diasEntre(prestamo.fechaLimite, fechaDevolucion)
4   multa ← calcularMulta(diasRetraso, usuario.tipo)
5   prestamo.multa ← multa
6   repositorioPrestamos.guardar(prestamo)
```

<div class="callout-alerta">

`servicioUsuarios` devuelve `"Docente"`. `calcularMulta` compara con `"DOCENTE"`. Cada componente pasa sus pruebas unitarias. **Juntos** cobran 5 MXN a un DOCENTE.

</div>

## Sistema y aceptación

<div class="grid-2">

<div class="card accent-azul">
<strong>Sistema</strong>
<p>Desde la pantalla: registrar la devolución de un ESTUDIANTE con 3 días de retraso.</p>
<p>Esperado: la pantalla muestra 15 MXN y el préstamo queda "Devuelto".</p>
</div>

<div class="card accent-dorado">
<strong>Aceptación</strong>
<p><em>Dado que</em> una persona devuelve un libro con retraso, <em>cuando</em> la bibliotecaria registra la devolución, <em>entonces</em> el monto coincide con el procedimiento de cobranza.</p>
</div>

</div>

<p class="small">Los criterios dado–cuando–entonces de la Unidad II son la base de la prueba de aceptación.</p>

## Una misma regla, cuatro niveles

| Nivel | La multa (RN-04) en el SPB | Defecto que busca |
| --- | --- | --- |
| Unitaria | La función devuelve 15 MXN | Cálculo mal programado |
| Integración | La multa se calcula con el tipo correcto y se guarda | Acuerdo roto entre componentes |
| Sistema | El monto aparece en la pantalla de devolución | Flujo incompleto, dato mal mostrado |
| Aceptación | Coincide con el proceso de cobranza | No sirve al proceso real |

## Niveles y ciclo de vida: el modelo en V

```text
Requisitos del negocio ─────────────────────── Prueba de aceptación
    Requisitos del sistema ─────────────── Prueba de sistema
        Diseño de arquitectura ─────── Prueba de integración
            Diseño detallado ────── Prueba unitaria
                      Implementación
```

Los casos de cada nivel pueden **diseñarse** en cuanto existe su base de prueba, aunque se **ejecuten** después (pruebas tempranas, Unidad I).

<p class="small">Por eso puedes diseñar casos para tu proyecto base aunque todavía no sea ejecutable.</p>

## Integración: ¿todo junto o poco a poco?

<div class="grid-2">

<div class="card accent-rojo">
<strong>Big bang</strong>
<p>Se unen todos los componentes a la vez. Si algo falla, es difícil saber qué interfaz lo causó.</p>
</div>

<div class="card accent-verde">
<strong>Incremental</strong>
<p>Se agrega un componente a la vez, de arriba hacia abajo o de abajo hacia arriba. Localiza el origen de la falla.</p>
</div>

</div>

<p class="small">En la Unidad IV verás cómo se simulan los componentes que aún no existen.</p>

## Actividad A1 — Clasificación de niveles

<div class="callout">

Clasifica diez pruebas del SPB por **nivel** y **tipo**, y describe qué se probaría en cada nivel para una funcionalidad de **tu proyecto base**.

</div>

Producto: tabla de clasificación justificada por el objeto de prueba.

Instrucciones completas: **Actividades de la Unidad 03**, Actividad A1.

## Qué sigue

Continúa con [2. Técnicas de diseño: enfoques y casos de prueba](/materias/pruebas-software/unidad-03/02-tecnicas-de-diseno-enfoques-y-casos/).
