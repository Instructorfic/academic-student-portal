---
title: "Presentación — Unidad II"
description: "Unidad II de Pruebas de Software — presentación de clase completa: requisitos, casos de uso, historias de usuario, criterios de aceptación, escenarios y trazabilidad."
---

## Al finalizar esta unidad podrás

<div class="grid-3">

<div class="card accent-azul">
<span class="badge">2.1</span>
<strong>Requisitos</strong>
<p>Derivar requisitos funcionales, no funcionales y reglas de negocio verificables.</p>
</div>

<div class="card accent-dorado">
<span class="badge">2.2</span>
<strong>Casos, historias y criterios</strong>
<p>Construir criterios de aceptación y escenarios a partir de casos de uso o historias de usuario.</p>
</div>

<div class="card accent-verde">
<span class="badge">2.3</span>
<strong>Trazabilidad</strong>
<p>Establecer relaciones requisito–prueba y prueba–defecto, y construir una matriz de trazabilidad.</p>
</div>

</div>

## Antes de empezar

En la Unidad 1 aprendiste **por qué** se prueba: para reducir riesgo y aumentar la confianza en el software.

Pero antes de poder probar algo, hace falta responder una pregunta previa:

**¿qué, exactamente, debe probarse?**

## Una situación

<div class="callout">

Un equipo construye un formulario de registro de usuarios. Al entregarlo, alguien reporta que "no valida bien los correos". El equipo responde que "sí funciona, así lo pidieron". **Nadie escribió, antes de construirlo, qué significaba "validar bien" un correo.**

</div>

## Pregunta orientadora

<div class="banner-node">

<strong>Pregunta central:</strong> si nadie documentó qué debía cumplir el formulario, ¿cómo se puede decidir si el reporte es un defecto real o una expectativa que nunca se acordó?

</div>

## Mapa de la unidad

<div class="banner-node">

**Pregunta orientadora:** ¿qué debe probarse exactamente, y cómo lo relacionamos con lo que se probó?

</div>

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>REQUISITOS</strong>

Qué debe hacer el
sistema y qué reglas
debe respetar.
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>CASOS Y CRITERIOS</strong>

Cómo se describe una
interacción y cuándo se
considera "cumplida".
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>TRAZABILIDAD</strong>

Cómo se relaciona cada
requisito con lo que se
probó de él.
</div>

</div>

## El pipeline completo de la unidad

<p align="center">
  <img src="/imagenes/pruebas-software/unidad-02/pipeline_requisito_a_matriz.svg" alt="Pipeline: requisito, historia de usuario, criterio de aceptación, escenario, caso de prueba y matriz de trazabilidad" width="680">
</p>

Cada flecha es un bloque de esta unidad,  al final vas a recorrer este mismo camino dos veces con ejemplos distintos.

## Para pensarlo antes de empezar

<div class="callout">

Retomando la situación del formulario de registro: ¿qué tendría que haber escrito el equipo, antes de construirlo, para que "validar bien un correo" fuera una condición verificable y no una opinión?

</div>

## Bloque 1 — Los requisitos como base de las pruebas

Antes de diseñar una prueba necesitamos saber:

**¿Qué debe cumplir el producto y por qué?**

### ¿Qué problema estamos intentando resolver?

<div class="callout">

Un equipo recibe la petición:

> "Necesitamos que los estudiantes puedan inscribirse fácilmente a sus materias."

El equipo comienza a desarrollar.

Cuando entrega el sistema, alguien pregunta:

> "¿Por qué no permite inscribirse a este estudiante?"

El desarrollador responde:

> "Porque no cumple el prerrequisito."

El usuario responde:

> "Pero eso nunca se había dicho."

</div>

<div class="callout-alerta">

El problema comenzó **antes de programar**.

No existía una definición suficientemente clara de lo que debía cumplirse.

</div>

### Antes del requisito existe una necesidad

<div class="grid-3">

<div class="card accent-azul">

<strong>Necesidad</strong>

<p>Expresa algo que un stakeholder necesita lograr o que debe resolverse.</p>

</div>

<div class="card accent-dorado">

<strong>Requisito</strong>

<p>Expresa de forma precisa qué debe cumplirse para responder a esa necesidad.</p>

</div>

<div class="card accent-verde">

<strong>Prueba</strong>

<p>Proporciona evidencia de que una condición definida se cumple.</p>

</div>

</div>

<div class="banner-node">

<strong>Necesidad → Requisito → Verificación</strong>

</div>

<p class="small">Basado en ISO/IEC/IEEE 29148 e INCOSE Needs and Requirements Manual.</p>

### De una necesidad a un requisito

<div class="callout">

Una **necesidad** todavía no es un requisito.

La necesidad expresa **qué necesita lograr alguien**.  
El requisito expresa **qué condición debe cumplir la solución** para responder a esa necesidad.

</div>

<div class="grid-3">

<div class="card accent-azul">
<strong>Necesidad</strong>
<p>El estudiante necesita saber si todavía puede cancelar su inscripción.</p>
</div>

<div class="card accent-dorado">
<strong>Requisito</strong>
<p>El sistema deberá informar si la cancelación se encuentra dentro del plazo permitido.</p>
</div>

<div class="card accent-verde">
<strong>Verificación</strong>
<p>Comprobar el comportamiento cuando la solicitud ocurre antes, exactamente en y después del límite.</p>
</div>

</div>

<div class="banner-node">

<strong>Necesidad → Requisito → Criterio → Escenario → Prueba</strong>

</div>

### ¿De dónde vienen los requisitos?

<div class="grid-3">

<div class="card accent-azul">

<strong>Stakeholders</strong>

<p>Usuarios, clientes, administradores, operadores y otras personas afectadas por el producto.</p>

</div>

<div class="card accent-dorado">

<strong>Negocio y procesos</strong>

<p>Objetivos, políticas, procedimientos, reglas y restricciones de la organización.</p>

</div>

<div class="card accent-verde">

<strong>Entorno</strong>

<p>Leyes, reglamentos, normas, contratos, riesgos y condiciones externas.</p>

</div>

<div class="card accent-rojo">

<strong>Arquitectura y tecnología</strong>

<p>Restricciones, interfaces, plataformas y decisiones que condicionan la solución.</p>

</div>

<div class="card accent-azul">

<strong>Riesgos</strong>

<p>Amenazas, fallos potenciales, seguridad, privacidad y continuidad.</p>

</div>

<div class="card accent-dorado">

<strong>Otros requisitos</strong>

<p>Requisitos de niveles superiores que deben transformarse o descomponerse.</p>

</div>

</div>

<div class="callout">

Un requisito debe poder responder una pregunta fundamental:

**¿De dónde salió y qué necesidad o condición justifica que exista?**

</div>

### ¿Quién define un requisito?

<div class="callout">

No existe una única persona que "escriba todos los requisitos".

La definición de requisitos es una actividad colaborativa en la que participan diferentes stakeholders y responsables del producto.

</div>

| Participante | Contribución posible |
| --- | --- |
| Cliente / negocio | Necesidades y objetivos |
| Usuario | Necesidades operativas |
| Analista / ingeniería de requisitos | Elicitación, análisis y documentación |
| Product Owner | Valor, alcance y prioridades |
| Seguridad | Requisitos de protección y controles |
| Área legal | Obligaciones regulatorias |
| Arquitectura | Restricciones e interfaces |
| Pruebas | Verificabilidad, ambigüedades y cobertura |

<div class="callout-alcance">

<strong>Importante:</strong> quien redacta un requisito no necesariamente es quien tiene autoridad para decidir que esa necesidad es obligatoria.

</div>

### Necesidad, requisito y decisión técnica

<div class="grid-3">

<div class="card accent-azul">

<strong>Necesidad</strong>

<p>El estudiante necesita conocer por qué no puede inscribirse.</p>

</div>

<div class="card accent-dorado">

<strong>Requisito</strong>

<p>El sistema debe informar la condición que impide completar la inscripción.</p>

</div>

<div class="card accent-verde">

<strong>Implementación</strong>

<p>El equipo decide mostrar el motivo mediante un mensaje en pantalla.</p>

</div>

</div>

<div class="callout-alerta">

No debemos confundir **qué necesita cumplirse** con **cómo decidimos implementarlo**.

</div>

### Los requisitos existen en diferentes niveles

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>NEGOCIO</strong>

¿Qué necesita lograr la organización?
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>STAKEHOLDER</strong>

¿Qué necesita el usuario o actor involucrado?
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>SISTEMA</strong>

¿Qué debe cumplir la solución?
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>SOFTWARE</strong>

¿Qué debe cumplir el componente de software?
</div>

</div>

<div class="callout-alcance">

Un requisito debe redactarse en el nivel de abstracción apropiado. No todo requisito tiene como sujeto al "sistema" y no todo requisito debe describir una decisión técnica.

</div>

<p class="small">ISO/IEC/IEEE 29148, INCOSE Systems Engineering Handbook.</p>

### Un mismo problema visto en diferentes niveles

<div class="grid-2">

<div class="card accent-azul">

<strong>Necesidad del stakeholder</strong>

<p>El estudiante necesita conocer oportunamente por qué no puede completar una inscripción.</p>

</div>

<div class="card accent-dorado">

<strong>Requisito del sistema</strong>

<p>La solución debe informar la condición que impide completar la inscripción.</p>

</div>

<div class="card accent-verde">

<strong>Requisito de software</strong>

<p>El módulo de inscripción debe mostrar el prerrequisito incumplido cuando la validación falle.</p>

</div>

<div class="card accent-rojo">

<strong>Implementación</strong>

<p>El equipo decide mostrar un mensaje junto al botón "Inscribirme".</p>

</div>

</div>

<div class="callout">

Cada nivel responde una pregunta diferente.

**Necesidad → qué se necesita.**  
**Requisito → qué debe cumplirse.**  
**Diseño → cómo se realizará.**

</div>

### ¿Qué es un requisito?

Un requisito es una **expresión precisa de una necesidad, condición o restricción que debe satisfacerse**.

<div class="grid-3">

<div class="card accent-azul">

<strong>Capacidad</strong>

<p>Algo que el producto debe hacer o proporcionar.</p>

</div>

<div class="card accent-dorado">

<strong>Característica</strong>

<p>Una propiedad o nivel de calidad que debe alcanzarse.</p>

</div>

<div class="card accent-rojo">

<strong>Restricción</strong>

<p>Una condición, regla o limitación que debe respetarse.</p>

</div>

</div>

<div class="callout-alcance">

Para que sea útil para pruebas, el requisito debe permitir determinar objetivamente si se cumple.

</div>

### ¿Por qué muchos requisitos utilizan "shall"?

<div class="callout">

INCOSE recomienda utilizar **shall** en una declaración formal de requisito para indicar que se trata de una condición obligatoria que será objeto de verificación.

</div>

#### Ejemplo

> **The system shall** allow an authenticated student to submit an enrollment request.

En español podemos expresarlo como:

> **El sistema deberá** permitir que un estudiante autenticado envíe una solicitud de inscripción.

<div class="callout-alcance">

"Debe", "deberá" o "shall" no convierten mágicamente una frase en un buen requisito. La declaración todavía debe ser necesaria, correcta, clara, factible y verificable.

</div>

<p class="small">INCOSE Guide to Writing Requirements v4, 2023.</p>

### "Debe" no es la definición de requisito

| Redacción | Problema |
| --- | --- |
| El sistema debe ser fácil de usar | "Fácil" no está definido |
| El sistema debe funcionar rápido | "Rápido" no es medible |
| El sistema debe manejar errores correctamente | No define qué significa correctamente |
| El sistema debe permitir la inscripción | Puede faltar información sobre las condiciones |

<div class="callout">

La pregunta no es:

**"¿Tiene la palabra debe?"**

La pregunta es:

**"¿Podemos determinar con precisión qué condición debe cumplirse?"**

</div>

### Del lenguaje cotidiano al requisito

<div class="grid-2">

<div class="card accent-rojo">

<strong>Petición</strong>

<p>"La inscripción debe ser rápida y sencilla."</p>

</div>

<div class="card accent-verde">

<strong>Pregunta del analista</strong>

<p>¿Qué significa "rápida"? ¿Para quién? ¿En qué condiciones? ¿Cómo se medirá?</p>

</div>

</div>

#### Posible requisito

> El sistema deberá mostrar los grupos disponibles en un tiempo máximo
> de 2 segundos bajo una carga de hasta 100 usuarios concurrentes.

<div class="callout-alcance">

La segunda redacción proporciona una condición que posteriormente puede
ser verificada.

</div>

### ¿Qué hace que un requisito esté bien formado?

<div class="grid-3">

<div class="card accent-azul">
<strong>Necesario</strong>
<p>Existe una razón que justifica su existencia.</p>
</div>

<div class="card accent-dorado">
<strong>Correcto</strong>
<p>Representa adecuadamente la necesidad o fuente de la que proviene.</p>
</div>

<div class="card accent-verde">
<strong>Claro</strong>
<p>Puede interpretarse de una sola manera razonable.</p>
</div>

<div class="card accent-rojo">
<strong>Factible</strong>
<p>Puede cumplirse dentro de las restricciones conocidas.</p>
</div>

<div class="card accent-azul">
<strong>Verificable</strong>
<p>Puede demostrarse objetivamente si se cumple.</p>
</div>

<div class="card accent-dorado">
<strong>Trazable</strong>
<p>Puede relacionarse con su fuente y con la evidencia correspondiente.</p>
</div>

</div>

<p class="small">Características sintetizadas a partir de INCOSE GtWR y Systems Engineering Handbook.</p>

### Un requisito no se evalúa solo

<div class="callout">

Un requisito puede estar bien escrito individualmente y aun así formar
parte de un conjunto de requisitos defectuoso.

</div>

<div class="grid-2">

<div class="card accent-azul">

<strong>Requisito individual</strong>

<p>¿Es claro? ¿Es necesario? ¿Es correcto? ¿Es verificable? ¿Es factible?</p>

</div>

<div class="card accent-dorado">

<strong>Conjunto de requisitos</strong>

<p>¿Está completo? ¿Es consistente? ¿Hay duplicados? ¿Hay contradicciones? ¿Cubren las necesidades?</p>

</div>

</div>

<div class="callout-alcance">

La calidad debe revisarse tanto **requisito por requisito** como sobre el
**conjunto completo**.

</div>

### Ejemplo: dos requisitos que se contradicen

| ID | Requisito |
| --- | --- |
| RF-01 | El sistema deberá permitir cancelar una inscripción hasta 24 horas antes del inicio del curso. |
| RF-02 | El sistema deberá permitir cancelar una inscripción en cualquier momento antes del inicio del curso. |

<div class="callout-alerta">

Ambos requisitos pueden parecer claros individualmente.

**Juntos son inconsistentes.**

</div>

<div class="callout">

La revisión de requisitos debe detectar contradicciones antes de que se
conviertan en problemas de diseño o pruebas.

</div>

### Ejemplo: un requisito incompleto

> El sistema deberá enviar una notificación al estudiante.

<div class="callout-alerta">

¿En qué situación?

¿A quién exactamente?

¿Por qué medio?

¿En cuánto tiempo?

¿Qué información debe contener?

¿Qué ocurre si el envío falla?

</div>

<div class="callout">

No necesariamente debemos agregar toda esa información dentro de una
sola frase. Debemos determinar **qué condiciones son necesarias para que
el requisito pueda entenderse y verificarse**.

</div>

### Ejemplo: requisito demasiado grande

<div class="callout-alerta">

> El sistema deberá permitir al estudiante consultar materias,
> seleccionar grupos, validar prerrequisitos, verificar disponibilidad,
> registrar la inscripción y enviar una confirmación por correo.

</div>

<div class="callout">

Aquí aparecen varios comportamientos diferentes.

Conviene descomponerlos para facilitar su análisis, diseño, verificación
y trazabilidad.

</div>

### Descomposición del requisito

| ID | Requisito |
| --- | --- |
| RF-01 | El sistema deberá mostrar las materias disponibles para el estudiante. |
| RF-02 | El sistema deberá mostrar los grupos disponibles de una materia. |
| RF-03 | El sistema deberá validar los prerrequisitos de la materia. |
| RF-04 | El sistema deberá verificar la disponibilidad de lugares. |
| RF-05 | El sistema deberá registrar la inscripción cuando las condiciones se cumplan. |
| RF-06 | El sistema deberá enviar una confirmación después de registrar la inscripción. |

<div class="callout-alcance">

La descomposición permite que cada condición pueda analizarse y
verificarse de manera independiente cuando corresponda.

</div>

### Funcional, calidad y restricciones

<div class="grid-3">

<div class="card accent-azul">

<strong>Funcional</strong>

<p>Describe un comportamiento o capacidad.</p>

<p><em>¿Qué debe hacer?</em></p>

</div>

<div class="card accent-dorado">

<strong>Calidad</strong>

<p>Describe una característica o nivel de desempeño.</p>

<p><em>¿Qué tan bien debe hacerlo?</em></p>

</div>

<div class="card accent-rojo">

<strong>Restricción</strong>

<p>Limita las soluciones posibles o establece una condición obligatoria.</p>

<p><em>¿Qué debe respetar?</em></p>

</div>

</div>

<div class="callout">

Estas categorías ayudan a analizar los requisitos, pero no deben
entenderse como compartimentos completamente aislados.

</div>

### Las cuatro categorías típicas de calidad (no funcionales)

<div class="grid-3">

<div class="card accent-azul">
<strong>Rendimiento</strong>
<p>La consulta de grupos deberá responder en menos de 2 segundos bajo la carga definida.</p>
</div>

<div class="card accent-dorado">
<strong>Seguridad</strong>
<p>La contraseña debe almacenarse cifrada, nunca en texto plano.</p>
</div>

<div class="card accent-verde">
<strong>Usabilidad</strong>
<p>Un estudiante de primer ingreso deberá poder completar una inscripción sin ayuda externa en un máximo de 3 intentos.</p>
</div>

<div class="card accent-rojo">
<strong>Disponibilidad</strong>
<p>El sistema de inscripción deberá estar disponible al menos el 99% del tiempo durante el periodo oficial de inscripciones.</p>
</div>

</div>

<div class="callout-alcance">

El programa oficial (contenido 2.1.2) identifica estas cuatro categorías como ejemplos de requisitos no funcionales — no son las únicas posibles, pero son el punto de partida del Laboratorio 1.

</div>

### Ejemplo integrado: inscripción

| Tipo | Requisito |
| --- | --- |
| Funcional | El sistema deberá registrar una inscripción cuando el estudiante cumpla las condiciones requeridas. |
| Calidad | La consulta de grupos deberá responder en menos de 2 segundos bajo la carga definida. |
| Restricción | Un estudiante no podrá inscribirse si no cumple los prerrequisitos. |

<div class="callout">

Ahora tenemos **tres cosas diferentes que probar**.

El comportamiento, la característica de calidad y la restricción.

</div>

### ¿Dónde quedan los requisitos de seguridad?

<div class="banner-node">

<strong>Seguridad no es solamente "un requisito no funcional".</strong>

</div>

La seguridad puede expresarse como:

<div class="grid-2">

<div class="card accent-azul">
<strong>Función de seguridad</strong>
<p>Bloquear una cuenta después de cinco intentos fallidos.</p>
</div>

<div class="card accent-dorado">
<strong>Propiedad de seguridad</strong>
<p>Proteger las credenciales de autenticación.</p>
</div>

<div class="card accent-rojo">
<strong>Restricción</strong>
<p>No almacenar contraseñas en texto plano.</p>
</div>

<div class="card accent-verde">
<strong>Auditoría</strong>
<p>Registrar los eventos relevantes de autenticación.</p>
</div>

</div>

<div class="callout">

La seguridad puede generar requisitos funcionales, requisitos de calidad,
restricciones y requisitos derivados de políticas, riesgos o regulación.

</div>

### Ejemplo: derivar un requisito de seguridad

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>NECESIDAD</strong>

El usuario necesita recuperar su cuenta.
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>RIESGO</strong>

Un atacante podría descubrir qué correos están registrados.
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>REQUISITO</strong>

No revelar si un correo existe.
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>PRUEBA</strong>

Comparar la respuesta para correos registrados y no registrados.
</div>

</div>

<div class="callout-alcance">

Los requisitos de seguridad pueden derivarse de **riesgos y amenazas**,
no solamente de solicitudes explícitas de los usuarios.

</div>

### Ejemplo aplicado: recuperación de contraseña

#### Situación

Un usuario solicita recuperar su contraseña mediante su correo.

#### Riesgo

Un atacante podría utilizar la respuesta del sistema para descubrir
qué cuentas existen.

#### Requisito

> El sistema deberá mostrar el mismo mensaje de respuesta tanto para
> una dirección registrada como para una dirección no registrada.

#### Criterio verificable

> Dado un correo registrado y uno no registrado, cuando se solicita la
> recuperación, entonces ambos deben producir una respuesta equivalente
> que no revele la existencia de la cuenta.

### Otro requisito de seguridad

#### Situación

Un atacante puede intentar repetidamente autenticarse.

#### Riesgo

Ataques de fuerza bruta contra las cuentas.

#### Requisito

> El sistema deberá bloquear temporalmente una cuenta después de cinco
> intentos consecutivos de autenticación fallidos.

#### Criterio verificable

> Dado un usuario activo, cuando se realizan cinco intentos consecutivos
> con credenciales incorrectas, entonces el sistema deberá impedir nuevos
> intentos durante el periodo definido.

### Los requisitos también pueden provenir de la regulación

<div class="callout">

Una obligación legal o normativa puede convertirse en una fuente de
requisitos para el producto.

</div>

<div class="grid-3">

<div class="card accent-azul">
<strong>Fuente</strong>
<p>Regulación, contrato, norma o política.</p>
</div>

<div class="card accent-dorado">
<strong>Necesidad</strong>
<p>La organización debe cumplir una obligación.</p>
</div>

<div class="card accent-verde">
<strong>Requisito</strong>
<p>La solución debe implementar las condiciones necesarias para demostrar ese cumplimiento.</p>
</div>

</div>

<div class="callout-alcance">

La fuente debe conservarse para poder responder posteriormente:

**¿Por qué existe este requisito?**

</div>

### La trazabilidad comienza antes de la prueba

| Requisito | Fuente | Justificación |
| --- | --- | --- |
| RF-01 | Necesidad del estudiante | Permitir solicitar inscripción |
| RN-01 | Política académica | Respetar prerrequisitos |
| RS-01 | Análisis de riesgo | No revelar cuentas existentes |
| RNF-01 | Objetivo de desempeño | Respuesta dentro del tiempo definido |

<div class="callout">

La trazabilidad no significa solamente:

**requisito → prueba**

También puede comenzar como:

**fuente → necesidad → requisito → prueba → evidencia**

</div>

### ¿Cómo sabemos que un requisito está bien?

<div class="callout">

No lo decidimos solamente porque "suena bien".

Lo sometemos a **verificación y validación de requisitos**.

</div>

<div class="grid-2">

<div class="card accent-azul">

<strong>Verificación del requisito</strong>

<p>¿Está bien escrito y posee las características necesarias para ser un requisito adecuado?</p>

</div>

<div class="card accent-dorado">

<strong>Validación del requisito</strong>

<p>¿Representa realmente la necesidad que debía satisfacerse?</p>

</div>

</div>

<div class="callout-alcance">

Aquí todavía estamos evaluando **el requisito**, no ejecutando el
software.

</div>

<p class="small">INCOSE Needs and Requirements Manual, capítulos 5 y 7.</p>

### Verificación vs. validación

<div class="grid-2">

<div class="card accent-azul">

<strong>Verificación</strong>

<p>¿El requisito está expresado correctamente?</p>

<ul>
<li>¿Es claro?</li>
<li>¿Es verificable?</li>
<li>¿Es factible?</li>
<li>¿Es consistente?</li>
</ul>

</div>

<div class="card accent-dorado">

<strong>Validación</strong>

<p>¿Es el requisito correcto?</p>

<ul>
<li>¿Representa la necesidad?</li>
<li>¿Tiene una fuente válida?</li>
<li>¿Es necesario?</li>
<li>¿Conduce a la solución que se necesita?</li>
</ul>

</div>

</div>

<div class="banner-node">

<strong>Verificación:</strong> "¿Está bien escrito?"  
<strong>Validación:</strong> "¿Es lo que realmente necesitamos?"

</div>

### ¿Cómo se revisan los requisitos?

<div class="grid-3">

<div class="card accent-azul">
<strong>Revisión</strong>
<p>Personas expertas examinan los requisitos y buscan defectos.</p>
</div>

<div class="card accent-dorado">
<strong>Checklist</strong>
<p>Se comprueba sistemáticamente cada característica esperada.</p>
</div>

<div class="card accent-verde">
<strong>Escenarios</strong>
<p>Se recorren situaciones reales para descubrir omisiones y ambigüedades.</p>
</div>

<div class="card accent-rojo">
<strong>Prototipos</strong>
<p>Se utiliza una representación para validar expectativas con stakeholders.</p>
</div>

<div class="card accent-azul">
<strong>Trazabilidad</strong>
<p>Se comprueba de dónde viene cada requisito y qué otros elementos depende.</p>
</div>

<div class="card accent-dorado">
<strong>Pruebas derivadas</strong>
<p>Se analiza si puede definirse una forma objetiva de verificarlo.</p>
</div>

</div>

### Checklist de revisión de un requisito

| Pregunta | Resultado |
| --- | --- |
| ¿Tiene una fuente identificada? | ☐ |
| ¿Es necesario? | ☐ |
| ¿Es correcto respecto a su fuente? | ☐ |
| ¿Es claro y no ambiguo? | ☐ |
| ¿Es completo para su propósito? | ☐ |
| ¿Es consistente con los demás? | ☐ |
| ¿Es factible? | ☐ |
| ¿Es verificable? | ☐ |
| ¿Tiene un identificador único? | ☐ |
| ¿Puede trazarse hasta su origen? | ☐ |

<div class="callout">

El checklist no sustituye el análisis. **Ayuda a hacerlo sistemáticamente.**

</div>

### Aplicación: revisar un requisito defectuoso

<div class="callout-alerta">

> **RF-07:** El sistema deberá permitir que el estudiante se inscriba
> rápidamente a cualquier materia que necesite.

</div>

#### Encuentra los problemas

<div class="grid-3">

<div class="card">
<strong>¿Qué significa rápidamente?</strong>
<p>No hay métrica.</p>
</div>

<div class="card">
<strong>¿Cualquier materia?</strong>
<p>Ignora restricciones y prerrequisitos.</p>
</div>

<div class="card">
<strong>¿Qué significa necesite?</strong>
<p>No existe una condición objetiva.</p>
</div>

</div>

### Mejorar el requisito

<div class="callout">

**RF-07**

> El sistema deberá permitir al estudiante solicitar la inscripción a
> una materia disponible cuando cumpla los prerrequisitos establecidos.

</div>

<div class="grid-2">

<div class="card accent-verde">
<strong>Ahora podemos identificar</strong>
<p>Actor, acción, condición y resultado esperado.</p>
</div>

<div class="card accent-azul">
<strong>Pero todavía debemos preguntar</strong>
<p>¿Qué significa "disponible"? ¿Cómo se comunica el resultado? ¿Existe alguna otra condición?</p>
</div>

</div>

<div class="callout-alcance">

Un requisito mejor redactado **no necesariamente está terminado**.

La revisión puede descubrir nuevas preguntas.

</div>

### Un requisito puede generar otros requisitos

<div class="banner-node">

**RF-07:** Registrar una inscripción cuando se cumplen las condiciones.

</div>

↓

<div class="grid-3">

<div class="card accent-azul">
<strong>Regla</strong>
<p>El estudiante debe cumplir los prerrequisitos.</p>
</div>

<div class="card accent-dorado">
<strong>Restricción</strong>
<p>No debe excederse la capacidad del grupo.</p>
</div>

<div class="card accent-verde">
<strong>Seguridad</strong>
<p>Solo un usuario autenticado puede solicitar la inscripción.</p>
</div>

</div>

<div class="callout">

Una necesidad puede producir **un conjunto de requisitos relacionados**.

Por eso también debemos evaluar el conjunto y no solamente cada frase.

</div>

### Requisitos de seguridad: una visión más completa

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>ACTIVO</strong>

¿Qué debemos proteger?
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>AMENAZA</strong>

¿Qué podría salir mal?
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>RIESGO</strong>

¿Qué impacto tendría?
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>REQUISITO</strong>

¿Qué condición debe cumplirse?
</div>

</div>

#### Ejemplo

**Activo:** cuenta del estudiante  
**Amenaza:** fuerza bruta  
**Riesgo:** acceso no autorizado  
**Requisito:** bloquear temporalmente después de cinco intentos fallidos

### Del requisito a la prueba

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>REQUISITO</strong>

Bloquear después de 5 intentos.
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>CRITERIO</strong>

El quinto intento produce bloqueo.
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>ESCENARIO</strong>

Credenciales incorrectas cinco veces.
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>PRUEBA</strong>

Comprobar que el sexto intento sea rechazado.
</div>

</div>

<div class="callout">

Aquí comienza a aparecer la relación que trabajaremos en los siguientes
bloques:

**Requisito → criterio → escenario → caso de prueba → evidencia**

</div>

### ¿Qué debe poder responder un buen requisito?

<div class="callout">

Al terminar de analizar un requisito deberíamos poder responder:

</div>

<div class="grid-2">

<div class="card accent-azul">
<strong>¿Qué?</strong>
<p>¿Qué condición debe cumplirse?</p>
</div>

<div class="card accent-dorado">
<strong>¿Para quién?</strong>
<p>¿Qué stakeholder o actor está involucrado?</p>
</div>

<div class="card accent-verde">
<strong>¿Por qué?</strong>
<p>¿Qué necesidad, riesgo, regla o fuente lo justifica?</p>
</div>

<div class="card accent-rojo">
<strong>¿Cómo sabremos?</strong>
<p>¿Qué evidencia permitirá determinar que se cumple?</p>
</div>

</div>

### Banco de necesidades para construir requisitos

<div class="callout">

Una necesidad describe **algo que un stakeholder necesita lograr, conocer,
proteger o controlar**. A partir de ella, el equipo puede derivar requisitos.

</div>

| Contexto | Necesidad |
| --- | --- |
| Biblioteca | El estudiante necesita saber si un libro está disponible antes de acudir a solicitarlo. |
| Compras | El cliente necesita conocer el estado de su pedido sin contactar al soporte. |
| Transporte | El pasajero necesita conocer si su ruta tendrá servicio en el horario seleccionado. |
| Eventos | El organizador necesita controlar el número de asistentes registrados. |
| Clínica | El paciente necesita recibir confirmación de su cita y conocer cuándo debe acudir. |
| Restaurante | El cliente necesita saber si su pedido fue recibido y en qué estado se encuentra. |
| Plataforma educativa | El estudiante necesita conocer qué actividades tiene pendientes y sus fechas límite. |
| Soporte técnico | El usuario necesita saber qué ocurrió con la solicitud que reportó. |

<div class="callout-alcance">

**No conviertas directamente estas frases en historias de usuario.**

Primero identifica:

**stakeholder → necesidad → requisito → interacción → criterio de aceptación**

</div>

### Actividad: detectar requisitos defectuosos

<div class="callout">

Analiza los siguientes requisitos y marca qué problema presentan:

</div>

| Requisito | Problema |
| --- | --- |
| "El sistema debe ser muy rápido." | |
| "El sistema debe manejar correctamente los errores." | |
| "El sistema debe hacer todo lo necesario para registrar usuarios." | |
| "El sistema debe permitir el acceso seguro." | |
| "El sistema debe permitir cancelar y modificar y consultar y eliminar..." | |

<div class="callout-alcance">

No los corrijas todavía.

Primero identifica **qué característica del requisito está fallando**.

</div>

### Actividad: transformar requisitos

<div class="callout">

Selecciona dos de los requisitos anteriores.

Para cada uno:

1. identifica la ambigüedad o problema
2. determina qué información falta
3. identifica una posible fuente o stakeholder
4. redacta una nueva versión
5. explica cómo podría verificarse.

</div>

### Laboratorio 1 — requisitos y reglas de negocio

<div class="callout">

A partir del proyecto base asignado a tu equipo:

#### 1. Identifica fuentes
Usuarios, negocio, políticas, riesgos, regulación u otras fuentes relevantes.

#### 2. Identifica necesidades
¿Qué necesita lograr cada stakeholder?

#### 3. Deriva requisitos
Redacta requisitos funcionales, de calidad y restricciones relevantes.

#### 4. Identifica reglas de negocio
¿Qué condiciones del dominio deben respetarse?

#### 5. Identifica requisitos de seguridad
¿Qué activos, amenazas o riesgos generan condiciones que el sistema debe cumplir?

</div>

### Laboratorio 1 — revisión de calidad

Antes de entregar tus requisitos, revisa cada uno:

| Criterio | ¿Cumple? |
| --- | --- |
| Tiene ID único | ☐ |
| Tiene fuente identificada | ☐ |
| Es necesario | ☐ |
| Es claro | ☐ |
| Es consistente | ☐ |
| Es factible | ☐ |
| Es verificable | ☐ |
| Puede trazarse | ☐ |
| Tiene criterios suficientes para probarlo | ☐ |

<div class="callout">

No entregues solamente una lista de requisitos.

**Entrega también la evidencia de que fueron revisados.**

</div>

### Del Bloque 1 al Bloque 2

<div class="banner-node">

Ya tenemos una pregunta que puede responderse:

<strong>¿Qué debe cumplir el producto?</strong>

</div>

Ahora necesitamos convertir esos requisitos en condiciones que permitan
decidir cuándo una funcionalidad puede considerarse aceptada.

<div class="grid-3">

<div class="card accent-azul">
<strong>Bloque 1</strong>
<p>Necesidades y requisitos</p>
</div>

<div class="card accent-dorado">
<strong>Bloque 2</strong>
<p>Criterios y escenarios</p>
</div>

<div class="card accent-verde">
<strong>Bloque 3</strong>
<p>Trazabilidad</p>
</div>

</div>

## Bloque 2 — Casos de uso, historias de usuario y criterios de aceptación

### Caso de uso

Un **caso de uso** describe una interacción completa entre un **actor** y el sistema: incluye un **flujo principal** y, cuando corresponde, **flujos alternativos**.

**Ejemplo:** actor "visitante", flujo principal: envía datos válidos → el sistema crea la cuenta.

### ¿Dónde se define un caso de uso y cuándo se usa?

<div class="grid-2">

<div class="card accent-azul"><strong>¿Dónde se define?</strong><p>En la etapa de análisis de requisitos, normalmente por quien levanta y documenta el requerimiento. Queda registrado en la especificación de requisitos del sistema.</p></div>
<div class="card accent-dorado"><strong>¿Cuándo conviene usarlo?</strong><p>Procesos con varios flujos alternos, varios actores, o contextos donde se necesita documentación formal y detallada.</p></div>

</div>

### Necesidades para construir casos de uso

<div class="callout">

A partir de una necesidad, identifica:

**actor → objetivo → interacción → resultado**

</div>

| Contexto | Necesidad |
| --- | --- |
| Biblioteca | El estudiante necesita solicitar un libro que desea consultar. |
| Compras | El cliente necesita solicitar la devolución de un producto recibido en malas condiciones. |
| Educación | El profesor necesita registrar las calificaciones de sus estudiantes. |
| Eventos | El organizador necesita cancelar una inscripción cuando el evento fue suspendido. |
| Transporte | El pasajero necesita consultar si una ruta tiene servicio en una fecha determinada. |
| Soporte | El usuario necesita consultar el estado de un reporte que ya registró. |

#### Preguntas para construir el caso de uso

1. ¿Quién tiene la necesidad?
2. ¿Qué objetivo quiere alcanzar?
3. ¿Con qué sistema interactúa?
4. ¿Cuál es el flujo principal?
5. ¿Qué puede salir diferente?
6. ¿Qué resultado debe producirse?

### ¿Qué resuelve un caso de uso para las pruebas?

<div class="callout">

Le da al equipo de pruebas el flujo principal **y** los flujos alternativos completos de una interacción, de donde derivar escenarios sin tener que adivinar comportamientos que nadie describió por escrito.

</div>

### Ejemplo completo: préstamo de un libro en biblioteca

<div class="callout">

Un estudiante desea solicitar el préstamo de un libro disponible en la biblioteca universitaria.

</div>

<div class="grid-3">

<div class="card accent-azul">
<strong>Actor principal</strong>
<p>Estudiante</p>
</div>

<div class="card accent-dorado">
<strong>Sistema</strong>
<p>Sistema de biblioteca</p>
</div>

<div class="card accent-verde">
<strong>Objetivo</strong>
<p>Registrar el préstamo cuando se cumplen las condiciones.</p>
</div>

</div>

#### Flujo principal

1. El estudiante se identifica.
2. El sistema consulta su situación.
3. El estudiante selecciona un libro disponible.
4. El sistema verifica las condiciones de préstamo.
5. El sistema registra el préstamo.
6. El sistema informa la fecha de devolución.

#### Flujos alternativos

- El libro no está disponible.
- El estudiante tiene préstamos vencidos.
- El estudiante alcanzó el límite de préstamos.
- El ejemplar requiere una condición especial de consulta.

### ¿Quién es el actor?

<div class="callout">

Un **actor** es un rol externo que interactúa con el sistema para alcanzar un objetivo.

</div>

<div class="grid-3">

<div class="card accent-azul">
<strong>Actor</strong>
<p>Estudiante</p>
<p>Está fuera del sistema y solicita una acción.</p>
</div>

<div class="card accent-dorado">
<strong>Sistema</strong>
<p>Sistema de biblioteca</p>
<p>Es el sistema que estamos describiendo. No es un actor de sí mismo.</p>
</div>

<div class="card accent-verde">
<strong>Actor posible</strong>
<p>Sistema de pagos / servicio externo</p>
<p>Podría ser actor si existe una interacción externa con el sistema de biblioteca.</p>
</div>

</div>

<div class="callout-alcance">

**La biblioteca como organización no es automáticamente un actor.**

Si una persona que trabaja en la biblioteca interactúa con el sistema, el actor puede ser **Bibliotecario**.

Si otro sistema externo intercambia información con nuestro sistema, ese sistema puede modelarse como **actor externo**.

</div>

### Actor, sistema y organización no son lo mismo

<div class="grid-3">

<div class="card accent-azul">

<strong>Actor</strong>

<p>Rol externo que interactúa con el sistema.</p>

<p><strong>Ejemplos:</strong><br>
Estudiante<br>
Bibliotecario<br>
Administrador</p>

</div>

<div class="card accent-dorado">

<strong>Sistema bajo estudio</strong>

<p>La solución cuyo comportamiento estamos describiendo.</p>

<p><strong>Ejemplo:</strong><br>
Sistema de biblioteca</p>

</div>

<div class="card accent-verde">

<strong>Sistema externo</strong>

<p>Otro sistema que interactúa con el sistema bajo estudio.</p>

<p><strong>Ejemplo:</strong><br>
Servicio de correo</p>

</div>

</div>

<div class="banner-node">

<strong>Pregunta clave:</strong>

¿Quién está fuera del sistema y necesita interactuar con él para lograr algo?

</div>

<div class="callout-alcance">

El nombre "biblioteca" puede referirse a una organización, un lugar o un sistema. Para identificar un actor debemos describir **el rol que interactúa externamente con el sistema**.

</div>

### Más ejemplos de casos de uso

| Actor | Caso de uso (resumen) |
| --- | --- |
| Cliente | Solicitar devolución de un producto: indica el motivo → el sistema genera una guía de devolución |
| Administrador | Desactivar una cuenta de usuario: confirma la desactivación → el sistema revoca el acceso |
| Huésped | Reservar una habitación: elige fechas y tipo de habitación → el sistema confirma la disponibilidad y genera la reserva |

### Actividad guiada — construir un caso de uso

<div class="callout">

Selecciona **una** de las siguientes necesidades:

</div>

| Opción | Necesidad |
| --- | --- |
| A | El estudiante necesita solicitar un libro disponible en la biblioteca. |
| B | El cliente necesita solicitar la devolución de un producto. |
| C | El usuario necesita consultar el estado de un reporte de soporte. |
| D | El profesor necesita registrar una calificación. |

#### Construye

**1. Actor principal**  
¿Quién tiene el objetivo?

**2. Sistema**  
¿Con qué sistema interactúa?

**3. Objetivo**  
¿Qué quiere conseguir?

**4. Flujo principal**  
Escribe entre 4 y 6 pasos.

**5. Dos flujos alternativos**  
¿Qué puede impedir o modificar el flujo principal?

**6. Resultado**  
¿Qué debe quedar registrado o informado?

<div class="callout-alcance">

No necesitas dibujar todavía un diagrama UML.

Primero aprende a **describir correctamente la interacción**.

</div>

### Historia de usuario

Una **historia de usuario** (*user story*) describe la misma interacción en un formato breve, orientado al valor para el usuario:

<div class="callout">

Como **visitante del sitio**
quiero **registrarme con mi nombre, correo y contraseña**
para **poder acceder a mi cuenta personal**

</div>

### ¿Dónde se define una historia de usuario y cuándo se usa?

<div class="grid-2">

<div class="card accent-verde"><strong>¿Dónde se define?</strong><p>En el backlog del producto, normalmente redactada o priorizada por quien representa al negocio frente al equipo, junto con el equipo de trabajo.</p></div>
<div class="card accent-rojo"><strong>¿Cuándo conviene usarla?</strong><p>Equipos con iteraciones cortas, donde se prioriza entregar valor incremental sobre documentación exhaustiva.</p></div>

</div>

### Más ejemplos de historias de usuario

<div class="callout">

Como **cliente frecuente**
quiero **ver mi historial de pedidos**
para **repetir fácilmente una compra anterior**

</div>

<div class="callout">

Como **usuario que olvidó su contraseña**
quiero **restablecerla desde mi correo**
para **recuperar el acceso sin contactar a soporte**

</div>

### Del caso de uso a la historia de usuario

<div class="callout">

Una misma necesidad puede expresarse de forma más detallada mediante un caso de uso o de forma breve mediante una historia de usuario.

</div>

#### Necesidad

> El estudiante necesita saber si un libro está disponible antes de acudir a la biblioteca.

#### Historia de usuario

> Como **estudiante**  
> quiero **consultar la disponibilidad de un libro**  
> para **saber si puedo solicitarlo antes de acudir a la biblioteca**.

#### Caso de uso

**Consultar disponibilidad de libro**

Actor: estudiante

Resultado: el sistema informa si existen ejemplares disponibles.

<div class="banner-node">

<strong>La necesidad permanece, cambia la forma de documentarla.</strong>

</div>

### Caso de uso vs. historia de usuario

| | Caso de uso | Historia de usuario |
| --- | --- | --- |
| Formato | Actor, flujo principal, flujos alternos | Como / quiero / para |
| Extensión | Más detallado | Breve |
| Uso típico | Documentación formal | Equipos ágiles |

<div class="callout-alcance">

No son intercambiables ni equivalentes — son dos formas distintas de llegar al mismo insumo: qué debe cumplir el sistema.

</div>

### Actividad guiada — construir historias de usuario

<div class="callout">

Transforma una de estas necesidades en una historia de usuario usando:

**Como [rol], quiero [objetivo], para [valor].**

</div>

| Contexto | Necesidad |
| --- | --- |
| Biblioteca | El estudiante necesita conocer la fecha límite para devolver un libro. |
| Compras | El cliente necesita recibir información cuando su pedido cambie de estado. |
| Educación | El estudiante necesita saber qué actividades tiene pendientes. |
| Soporte | El usuario necesita conocer la respuesta de su solicitud. |
| Eventos | El asistente necesita cancelar su registro antes de la fecha permitida. |

#### Después revisa

- ¿El rol está claro?
- ¿El objetivo representa una necesidad?
- ¿El "para" expresa valor?
- ¿La historia describe qué necesita el usuario y no cómo implementarlo?

### ¿Cuál elegir?

<div class="callout-alcance">

No es una elección exclusiva: algunos equipos usan ambos formatos según el tipo de funcionalidad. La pregunta que orienta la elección es: ¿necesito documentación formal para un proceso con varios flujos alternos (caso de uso), o priorizar valor incremental en iteraciones cortas (historia de usuario)? En cualquiera de los dos casos, el insumo que sigue es el mismo: los criterios de aceptación.

</div>

### Criterios de aceptación

Un **criterio de aceptación** es una condición verificable que determina cuándo una historia o caso de uso se considera cumplido.

<div class="callout">

**Dado que** el visitante no tiene cuenta,<br>
**cuando** envía un nombre, un correo válido no registrado antes y una contraseña que cumple la política,<br>
**entonces** el sistema crea la cuenta y confirma el registro.

</div>

### Actividad guiada — convertir una historia en criterios

#### Historia

> Como estudiante  
> quiero consultar la disponibilidad de un libro  
> para saber si puedo solicitarlo antes de acudir a la biblioteca.

<div class="grid-3">

<div class="card accent-azul">
<strong>Criterio positivo</strong>
<p>¿Qué ocurre cuando el libro tiene ejemplares disponibles?</p>
</div>

<div class="card accent-rojo">
<strong>Criterio negativo</strong>
<p>¿Qué ocurre cuando no hay ejemplares disponibles?</p>
</div>

<div class="card accent-dorado">
<strong>Criterio alterno</strong>
<p>¿Qué ocurre si el libro está reservado o tiene una condición especial?</p>
</div>

</div>

#### Construye tres criterios

**Dado que...**  
**Cuando...**  
**Entonces...**

<div class="callout-alcance">

Primero piensa en el comportamiento. Después escribe la frase.

</div>

### Ampliación — formato Gherkin (Given-When-Then)

<div class="callout-alcance">

El formato dado–cuando–entonces que usas en esta unidad corresponde al lenguaje **Gherkin**, ampliamente usado en la industria dentro del desarrollo guiado por comportamiento (*Behavior-Driven Development*, BDD): **Given–When–Then**. El programa oficial de esta unidad no exige Gherkin como herramienta. Se presenta aquí como la convención más extendida para escribir criterios de aceptación de forma verificable, no como contenido evaluado adicional.

</div>

### Relación entre criterios de aceptación y pruebas

<div class="callout">

Un criterio de aceptación bien escrito es casi directamente un caso de prueba: el **dado** es la precondición, el **cuando** es la acción o entrada, y el **entonces** es el resultado esperado — exactamente la estructura que necesita un caso de prueba.

</div>

### Criterio, escenario y caso de prueba

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>CRITERIO</strong>

Condición que debe cumplirse.
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>ESCENARIO</strong>

Situación concreta que permite comprobar una condición.
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>CASO DE PRUEBA</strong>

Descripción estructurada de cómo verificar el comportamiento.
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>EVIDENCIA</strong>

Resultado obtenido al ejecutar la prueba.
</div>

</div>

<div class="banner-node">

<strong>Criterio → Escenario → Caso de prueba → Evidencia</strong>

</div>

<div class="callout-alcance">

En esta unidad construimos principalmente **criterios y escenarios** y
dejamos preparada la trazabilidad. El diseño formal de casos de prueba
se profundizará en la Unidad III.

</div>

### Más ejemplos de criterios de aceptación

<div class="callout">

**Dado que** un usuario ha fallado 4 intentos de inicio de sesión,
**cuando** falla un quinto intento,
**entonces** el sistema bloquea la cuenta durante 15 minutos.

</div>

<div class="callout">

**Dado que** un producto tiene 0 unidades en inventario,
**cuando** un cliente intenta agregarlo al carrito,
**entonces** el sistema impide la acción y muestra "sin existencias".

</div>

### Escenarios: positivos, negativos y alternos

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E1 | Positivo | Correo nuevo válido | Cuenta creada |
| E2 | Negativo | Correo ya registrado | Registro rechazado |
| E3 | Alterno / límite | Contraseña del largo mínimo exacto | Cuenta creada |

### Buenas prácticas para diseñar escenarios

<div class="grid-2">

<div class="card accent-azul"><strong>Empieza por el camino feliz</strong><p>Cubre primero el escenario positivo antes de las variantes.</p></div>
<div class="card accent-dorado"><strong>Ataca cada regla de negocio</strong><p>Por cada regla, diseña al menos un escenario que intente romperla.</p></div>
<div class="card accent-verde"><strong>Evita duplicados sin razón</strong><p>No repitas el mismo escenario con datos distintos si verifica exactamente lo mismo.</p></div>
<div class="card accent-rojo"><strong>Da un ID único a cada uno</strong><p>Lo necesitarás para construir la matriz de trazabilidad (Bloque 3).</p></div>

</div>

### Más ejemplos de escenarios — inicio de sesión

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E7 | Positivo | Correo y contraseña correctos | Acceso concedido |
| E8 | Negativo | Contraseña incorrecta | Acceso denegado, mensaje de error |
| E9 | Alterno / límite | Quinto intento fallido consecutivo | Cuenta bloqueada temporalmente |

### Más ejemplos de escenarios — carrito de compras

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E10 | Positivo | Carrito con 3 productos disponibles | Pago procesado |
| E11 | Negativo | Producto sin existencias en el carrito | Pago bloqueado, aviso "sin existencias" |
| E12 | Alterno / límite | Carrito con 0 productos al intentar pagar | Pago bloqueado, mensaje de carrito vacío |

<div class="callout-alcance">

Los límites no son solo de texto o de intentos — E12 es un límite de
**cantidad**, el mismo tipo que verás en tu proyecto base si algo se
cuenta, se acumula o se agota.

</div>

### Condición límite

Una **condición límite** (*boundary condition*) es un valor exactamente en el borde de un rango válido.

<div class="callout-alcance">

No es solo numérica: también aplica a longitud de texto, número de intentos, fechas. Un escenario "alterno" que no toca un límite real no cumple 2.2.4 — se profundizará formalmente en la Unidad III.

</div>

### Cómo encontrar condiciones límite

<div class="callout">

Pregúntate: ¿cuál es el valor más pequeño que el sistema debe aceptar? ¿cuál es el más grande? ¿qué pasa justo un paso antes y un paso después de ese borde? Estas preguntas — no una fórmula — son la manera intuitiva de encontrar condiciones límite en esta unidad.

</div>

### Más ejemplos de condiciones límite

| Tipo de límite | Ejemplo |
| --- | --- |
| Longitud de texto | Contraseña de exactamente 8 caracteres (el mínimo permitido) |
| Cantidad | Carrito con 0 productos al intentar pagar |
| Número de intentos | Quinto intento fallido de inicio de sesión, si el límite es 5 |
| Fecha | Usar una promoción exactamente el último día de su vigencia |

### Actividad guiada — encontrar el límite

<div class="callout">

Para cada regla identifica:

**valor mínimo → valor válido → valor máximo → qué ocurre fuera del rango**

</div>

| Regla | Pregunta |
| --- | --- |
| Máximo 5 préstamos | ¿Qué ocurre con 4, 5 y 6 préstamos? |
| Contraseña mínima de 8 caracteres | ¿Qué ocurre con 7, 8 y 9 caracteres? |
| Cancelación hasta 24 horas antes | ¿Qué ocurre a 25 h, 24 h y 23 h? |
| Máximo 3 intentos de recuperación | ¿Qué ocurre en el segundo, tercero y cuarto intento? |

#### Tu tarea

Elige **una regla** y construye tres escenarios:

- antes del límite
- exactamente en el límite
- después del límite

<div class="callout-alcance">

En esta unidad el objetivo es **identificar y describir el escenario límite**. Las técnicas formales de valores límite se estudiarán en la Unidad III.

</div>

### Actividad — Laboratorio 2

#### De un requisito a escenarios verificables

<div class="callout">

Selecciona **un requisito funcional o regla de negocio** de tu Laboratorio 1.

</div>

#### Construye en este orden

**1. Requisito**  
Copia el ID y la redacción.

**2. Actor o rol involucrado**  
¿Quién inicia o participa en la interacción?

**3. Caso de uso o historia de usuario**  
Describe la interacción.

**4. Criterios de aceptación**  
Escribe al menos 2.

**5. Escenarios**  
Construye al menos:

- un escenario positivo
- un escenario negativo
- un escenario alterno o límite.

**6. Resultado esperado**  
Indica qué debería observarse.

<div class="callout-alcance">

La finalidad no es producir muchas pruebas.

La finalidad es demostrar que puedes **derivar escenarios a partir de
requisitos documentados**.

</div>

## Bloque 3 — Trazabilidad

### El recorrido completo

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>NECESIDAD</strong>

¿Por qué necesitamos algo?
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>REQUISITO</strong>

¿Qué debe cumplirse?
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>CRITERIO</strong>

¿Cuándo consideramos cumplida la condición?
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>ESCENARIO</strong>

¿Qué situación concreta verificaremos?
</div>

</div>

<div class="banner-node">

**NECESIDAD → REQUISITO → CRITERIO → ESCENARIO → PRUEBA → EVIDENCIA**

</div>

<div class="callout">

La trazabilidad permite conservar las relaciones entre estos elementos para poder conocer qué está cubierto, qué falta y qué cambia cuando cambia un requisito.

</div>

### ¿Qué es trazabilidad?

**Trazabilidad** (*traceability*) es la relación documentada entre dos artefactos: por ejemplo, entre un requisito y la prueba que lo verifica.

<div class="callout-alcance">

Sin trazabilidad, no hay forma sistemática de responder: "¿probamos todo lo que teníamos que probar?"

</div>

### Trazabilidad requisito–caso de prueba

Cada requisito debe poder relacionarse con **al menos un** caso de prueba que lo verifique.

<div class="callout">

Un requisito sin ningún caso de prueba asociado es una **brecha de cobertura** — no un detalle de formato.

</div>

### Ejemplo — una brecha de cobertura

| ID requisito | Descripción | ID caso de prueba |
| --- | --- | --- |
| RF-03 | Enviar confirmación de registro por correo | — (sin caso de prueba asociado) |

<div class="callout-alerta">

Esta fila no es un error de formato: es una alerta. Si nadie escribió un caso de prueba para RF-03, no hay evidencia de que esa funcionalidad se haya verificado — sin importar si "parece que funciona".

</div>

### Trazabilidad caso de prueba–defecto

Cada caso de prueba, al ejecutarse, puede relacionarse con un defecto si falla.

<div class="callout-alcance">

En esta unidad esta relación se deja **prevista**, no ejecutada: no se corren pruebas ni se gestionan defectos todavía (severidad, prioridad, ciclo de vida y herramientas de gestión son contenido de la Unidad VII).

</div>

### Matriz de trazabilidad

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-01 | Crear cuenta con datos válidos | ESC-01 | Pendiente de ejecutar |
| RN-01 | Rechazar correo ya registrado | ESC-02 | Pendiente de ejecutar |
| RNF-01 | Contraseña cifrada | ESC-03 | Pendiente de ejecutar |

<p class="small">Caso ilustrativo — la versión completa se construye en el Laboratorio 3.</p>

### Formato sugerido de matriz de trazabilidad

<div class="callout-alcance">

No existe un formato único obligatorio. ISO/IEC/IEEE 29119 (REF-U2-08) reconoce la matriz de trazabilidad como un artefacto de documentación de pruebas, sin fijar columnas exactas. El formato mínimo recomendado incluye: **ID de requisito, descripción, ID(s) de caso(s) de prueba, y estado de ejecución/defecto encontrado.**

</div>

### Un requisito, varios casos de prueba

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-01 | Crear cuenta con datos válidos | ESC-01, E7 | Pendiente de ejecutar |
| RF-01 | Crear cuenta con datos válidos | E9 (límite) | Pendiente de ejecutar |

<div class="callout">

Un requisito real casi nunca se cubre con un solo caso de prueba: la matriz debe poder mostrar varias filas (o varias columnas) para el mismo requisito — uno por cada escenario relevante.

</div>

### Una matriz con más filas

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-01 | Mostrar materias disponibles | ESC-07 | Pendiente de ejecutar |
| RF-02 | Mostrar grupos de una materia | ESC-08 | Pendiente de ejecutar |
| RF-03 | Validar prerrequisitos | ESC-09, ESC-10 | Pendiente de ejecutar |
| RF-04 | Verificar disponibilidad de lugares | ESC-11 | Pendiente de ejecutar |
| RF-05 | Registrar inscripción | ESC-12 | Pendiente de ejecutar |
| RF-06 | Enviar confirmación | — (sin caso de prueba asociado) | — |

<div class="callout-alerta">

Una matriz real casi nunca tiene tres filas ordenadas: mezcla requisitos con
0, 1 o varios casos de prueba — como aquí RF-03 (dos escenarios) y RF-06
(ninguno, la misma brecha de cobertura que viste antes, pero ahora dentro
de una matriz de tamaño real).

</div>

### ¿Por qué importa la matriz?

<div class="grid-2">

<div class="card"><strong>Detecta huecos</strong><p>Revela requisitos que nadie está probando.</p></div>
<div class="card"><strong>Rastrea impacto</strong><p>Si cambia un requisito, muestra qué pruebas hay que revisar.</p></div>

</div>

### La trazabilidad también funciona hacia atrás

<div class="grid-2">

<div class="card accent-azul">

<strong>Hacia adelante</strong>

<p>¿Qué pruebas necesitamos cuando aparece o cambia un requisito?</p>

<p><strong>Requisito → criterios → escenarios → pruebas</strong></p>

</div>

<div class="card accent-dorado">

<strong>Hacia atrás</strong>

<p>¿Qué requisito justifica esta prueba?</p>

<p><strong>Prueba → escenario → criterio → requisito</strong></p>

</div>

</div>

<div class="callout">

Una prueba sin requisito asociado puede indicar una prueba sin justificación documentada.

Un requisito sin prueba asociada puede indicar una brecha de cobertura.

</div>

<div class="banner-node">

<strong>La trazabilidad permite recorrer el camino en ambas direcciones.</strong>

</div>

### ¿Qué pasa si cambia un requisito?

<div class="callout-alerta">

Supongamos que cambia esta regla:

> La cancelación puede realizarse hasta 24 horas antes.

Ahora se establece:

> La cancelación puede realizarse hasta 48 horas antes.

</div>

#### La trazabilidad permite localizar

| Elemento | ¿Debe revisarse? |
| --- | --- |
| Requisito | Sí |
| Criterios de aceptación | Sí |
| Escenarios de 24 h | Sí |
| Escenarios de 48 h | Sí |
| Casos de prueba relacionados | Sí |
| Evidencia anterior | Debe evaluarse |
| Otros requisitos relacionados | Debe analizarse |

<div class="banner-node">

<strong>Cambio de requisito → análisis de impacto</strong>

</div>

<div class="callout-alcance">

La matriz no solo sirve para comprobar cobertura.

También ayuda a **identificar qué artefactos pueden verse afectados por un cambio**.

</div>

### Actividad — Laboratorio 3 (evidencia oficial)

<div class="callout">

Construye la matriz de trazabilidad inicial del proyecto base asignado a tu equipo: relaciona los requisitos y reglas del Laboratorio 1 con las historias o casos de uso, los criterios y los escenarios del Laboratorio 2.

</div>

<p class="small">Instrucciones completas en el Laboratorio 3 — evidencia oficial de la Unidad 2.</p>

### Segundo ejemplo aplicado — recuperación de contraseña

El primer ejemplo fue sobre todo validación de datos este es sobre una
regla de negocio de seguridad — mismo pipeline funcionalidad distinta

### El requisito y la regla de negocio

<div class="callout">

**RF-02** enviar enlace de recuperación al correo registrado

**RNF-02** el enlace expira 30 minutos después de generarse

**RN-02** el sistema no debe revelar si un correo está registrado o no

</div>

`RN-02` no describe qué hace el sistema describe una fuga de información
que no debe ocurrir

### Los criterios de aceptación

**Dado que** el correo está registrado **cuando** se solicita
recuperación **entonces** se envía el enlace y se muestra un mensaje
genérico

**Dado que** el correo NO está registrado **cuando** se solicita
recuperación **entonces** se muestra exactamente el mismo mensaje
genérico

Sin el segundo criterio `RN-02` podría incumplirse aunque `RF-02`
funcione

### Los escenarios

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E4 | Positivo | Correo registrado | Enlace enviado mensaje genérico |
| E5 | Negativo | Correo no registrado | Mismo mensaje genérico sin enviar nada |
| E6 | Alterno / límite | Enlace usado exactamente a los 30 minutos | Debe quedar definido por escrito si se acepta o se rechaza |

<div class="callout-alcance">

E6 es la clase de ambigüedad que una condición límite obliga a resolver
antes de que el sistema decida algo que nadie definió a propósito

</div>

### La fila de la matriz

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-02 | Enviar enlace de recuperación | ESC-04 | Pendiente de ejecutar |
| RN-02 | No revelar si el correo existe | ESC-05 | Pendiente de ejecutar |
| RNF-02 | Enlace expira en 30 minutos | ESC-06 | Pendiente de ejecutar |

### Tercer ejemplo aplicado — resolviendo la contradicción del Bloque 1

Al inicio de la unidad viste `RF-01` y `RF-02` contradecirse sobre cuándo
se puede cancelar una inscripción. Aquí está la versión corregida.

**RN-03**

> El sistema deberá permitir cancelar una inscripción hasta 24 horas
> antes del inicio del curso.

**Dado que** faltan más de 24 horas para el inicio del curso, **cuando**
el estudiante solicita cancelar, **entonces** el sistema cancela la
inscripción y libera el lugar.

**Dado que** faltan menos de 24 horas, **cuando** el estudiante solicita
cancelar, **entonces** el sistema rechaza la cancelación e informa el motivo.

### Escenarios y matriz de la cancelación

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E13 | Positivo | Cancelación 48 h antes | Inscripción cancelada |
| E14 | Negativo | Cancelación 2 h antes | Cancelación rechazada |
| E15 | Alterno / límite | Cancelación exactamente a las 24 h | Debe quedar definido por escrito si se acepta o rechaza |

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RN-03 | Cancelar inscripción respetando la ventana de 24 horas | ESC-13, ESC-14, ESC-15 | Pendiente de ejecutar |

<div class="callout">

Una sola regla de negocio verificable, en vez de dos requisitos que se
contradicen — y el mismo recorrido (requisito → criterio → escenario →
matriz) que harás tú en los tres laboratorios.

</div>

### Actividad integradora — recorre todo el pipeline

<div class="callout">

Elige **una necesidad** del proyecto base asignado a tu equipo y recorre todo el camino.

</div>

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">01</span>
<strong>NECESIDAD</strong>

¿Qué necesita lograr el stakeholder?
</div>

<div class="timeline-step">
<span class="step-number">02</span>
<strong>REQUISITO</strong>

¿Qué debe cumplir el sistema?
</div>

<div class="timeline-step">
<span class="step-number">03</span>
<strong>CASO / HISTORIA</strong>

¿Cómo documentarás la interacción?
</div>

<div class="timeline-step">
<span class="step-number">04</span>
<strong>CRITERIOS</strong>

¿Cuándo se considera cumplida?
</div>

</div>

<div class="timeline-row">

<div class="timeline-step">
<span class="step-number">05</span>
<strong>ESCENARIOS</strong>

Positivo, negativo y alterno/límite.
</div>

<div class="timeline-step">
<span class="step-number">06</span>
<strong>PRUEBA</strong>

¿Qué verificarías?
</div>

<div class="timeline-step">
<span class="step-number">07</span>
<strong>TRAZABILIDAD</strong>

¿Qué requisito cubre cada prueba?
</div>

</div>

<div class="banner-node">

**El objetivo es demostrar la relación entre los artefactos, no producir documentos aislados.**

</div>

### Ahora te toca a ti

<div class="callout">

Selecciona **una funcionalidad del proyecto base asignado a tu equipo**. No necesitas rehacer todo el sistema Construye únicamente un recorrido completo:

</div>

<div class="banner-node">

<strong>Necesidad → Requisito → Caso de uso o Historia de usuario → Criterios → Escenarios → Trazabilidad</strong>

</div>

#### Debes poder explicar

- ¿Quién necesita algo?
- ¿Qué necesita?
- ¿Qué debe cumplir el sistema?
- ¿Quién es el actor?
- ¿Cuál es el flujo principal?
- ¿Qué puede salir diferente?
- ¿Cuándo consideramos cumplida la funcionalidad?
- ¿Qué escenarios la verifican?
- ¿Qué prueba queda relacionada con el requisito?

### Cierre — volviendo a la situación inicial

Con lo aprendido en esta unidad, ahora puedes explicar con precisión:

* el problema del formulario de registro fue un **requisito no verificable**, no un desacuerdo sobre gustos
* un criterio de aceptación bien escrito hubiera evitado la discusión
* la matriz de trazabilidad muestra, de entrada, si "validar el correo" tenía siquiera un caso de prueba asociado.

### En síntesis

* Los **requisitos** (funcionales, no funcionales, reglas de negocio) deben redactarse de forma **verificable**.
* **Casos de uso** e **historias de usuario** son dos formas de describir una interacción. Ninguna sustituye a la otra.
* Los **criterios de aceptación** convierten un requisito en condiciones comprobables.
* Los **escenarios** (positivos, negativos, alternos/límite) traducen esos criterios en pruebas concretas.
* La **matriz de trazabilidad** conecta requisito → prueba, y deja prevista prueba → defecto.

### Lo que sigue

<div class="banner-node">

<strong>Ya sabemos qué debe probarse. ¿Cómo se diseñan técnicamente esas pruebas?</strong>

</div>

En la **Unidad III** vas a aplicar técnicas formales de diseño de casos de prueba (caja negra, caja blanca, partición de equivalencia, valores límite) sobre los escenarios que ya construiste aquí.

<div class="callout-alcance">

La misma matriz de trazabilidad que construiste hoy reaparece en la **Unidad V** — ahí la aplicarás también a pruebas de APIs y servicios.

</div>

### Referencias

* Jorgensen — *Software Testing: A Craftsman's Approach* (4.ª ed., 2013).
* Patton — *Software Testing* (2.ª ed., 2005).
* Myers, Sandler y Badgett — *The Art of Software Testing* (3.ª ed., 2011).
* Black, van Veenendaal y Graham — *Foundations of Software Testing ISTQB Certification* (2012).
* Crispin y Gregory — *Agile Testing* (2009).
* Toledo — *Introducción a las pruebas de sistemas de información* (2024).
* ISO/IEC 25010:2011, ISO/IEC/IEEE 29119.

<p class="small">Ficha completa de cada fuente en las referencias de la unidad (REF-U2-01 a REF-U2-10).</p>
