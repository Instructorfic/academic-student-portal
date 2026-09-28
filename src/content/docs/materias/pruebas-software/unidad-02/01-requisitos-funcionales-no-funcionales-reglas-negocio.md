---
title: "1. Requisitos funcionales, no funcionales y reglas de negocio"
description: "Unidad II de Pruebas de Software — de la necesidad a un requisito verificable: fuentes, niveles, calidad del requisito, seguridad y revisión."
---

## Por qué empezar por aquí

Antes de poder probar algo, hace falta documentar qué debe cumplir. Este
tema te da el vocabulario para escribir eso de forma que se pueda
**verificar**, no solo describir.

## Un problema que empieza antes de programar

Un equipo recibe la petición: *"Necesitamos que los estudiantes puedan
inscribirse fácilmente a sus materias."* El equipo desarrolla el
sistema. Al entregarlo, alguien pregunta por qué no permite inscribirse
a un estudiante en particular. El desarrollador responde: *"porque no
cumple el prerrequisito"*. El usuario responde: *"pero eso nunca se
había dicho"*.

El problema comenzó antes de programar: no existía una definición
suficientemente clara de lo que debía cumplirse.

## De la necesidad al requisito

Antes de un requisito existe una **necesidad**: algo que un stakeholder
necesita lograr o que debe resolverse. El requisito expresa de forma
precisa qué debe cumplirse para responder a esa necesidad, y la prueba
proporciona evidencia de que esa condición se cumple.

```text
Necesidad → Requisito → Verificación
```

No debemos confundir **qué necesita cumplirse** (requisito) con **cómo
decidimos implementarlo** (diseño/implementación). Ejemplo: el
estudiante necesita conocer por qué no puede inscribirse (necesidad). El
sistema debe informar la condición que impide completar la inscripción
(requisito). El equipo decide mostrar el motivo con un mensaje en
pantalla (implementación) — son tres cosas distintas, y solo la segunda
es lo que vas a probar.

### ¿De dónde vienen los requisitos?

Un requisito debe poder responder: *¿de dónde salió y qué necesidad o
condición justifica que exista?* Las fuentes típicas son:

| Fuente | Ejemplo |
| --- | --- |
| Stakeholders | Usuarios, clientes, administradores, operadores y otras personas afectadas por el producto |
| Negocio y procesos | Objetivos, políticas, procedimientos, reglas y restricciones de la organización |
| Entorno | Leyes, reglamentos, normas, contratos, riesgos y condiciones externas |
| Arquitectura y tecnología | Restricciones, interfaces, plataformas y decisiones que condicionan la solución |
| Riesgos | Amenazas, fallos potenciales, seguridad, privacidad y continuidad |
| Otros requisitos | Requisitos de niveles superiores que deben transformarse o descomponerse |

### ¿Quién define un requisito?

No existe una única persona que "escriba todos los requisitos": es una
actividad colaborativa.

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

Quien redacta un requisito no necesariamente tiene autoridad para
decidir que esa necesidad es obligatoria — esa distinción entre redactar
y decidir importa cuando dos requisitos entran en conflicto (más
adelante en este tema).

### Los requisitos existen en diferentes niveles

Un mismo problema puede describirse en al menos cuatro niveles, cada uno
respondiendo una pregunta distinta:

| Nivel | Pregunta | Ejemplo (inscripción) |
| --- | --- | --- |
| Negocio | ¿Qué necesita lograr la organización? | — |
| Stakeholder | ¿Qué necesita el usuario o actor involucrado? | El estudiante necesita conocer oportunamente por qué no puede completar una inscripción |
| Sistema | ¿Qué debe cumplir la solución? | La solución debe informar la condición que impide completar la inscripción |
| Software | ¿Qué debe cumplir el componente de software? | El módulo de inscripción debe mostrar el prerrequisito incumplido cuando la validación falle |

No todo requisito tiene como sujeto al "sistema", y no todo requisito
debe describir una decisión técnica — un requisito redactado en el nivel
equivocado de abstracción mezcla necesidad con diseño.

<p style="font-size:0.85em">Fuentes: ISO/IEC/IEEE 29148, INCOSE Systems Engineering Handbook.</p>

## ¿Qué es un requisito?

Un requisito es una **expresión precisa de una necesidad, condición o
restricción que debe satisfacerse**. Puede tomar tres formas:

- **Capacidad** — algo que el producto debe hacer o proporcionar.
- **Característica** — una propiedad o nivel de calidad que debe
  alcanzarse.
- **Restricción** — una condición, regla o limitación que debe
  respetarse.

Para que sea útil para pruebas, el requisito debe permitir determinar
**objetivamente** si se cumple.

### Por qué muchos requisitos usan "shall" / "deberá"

INCOSE recomienda usar **shall** ("deberá") en una declaración formal de
requisito, para indicar que se trata de una condición obligatoria que
será objeto de verificación:

> **The system shall** allow an authenticated student to submit an
> enrollment request.
>
> **El sistema deberá** permitir que un estudiante autenticado envíe una
> solicitud de inscripción.

<p style="font-size:0.85em">Fuente: INCOSE, <em>Guide to Writing Requirements</em> (GtWR), v4, 2023.</p>

"Debe", "deberá" o "shall" **no** convierten mágicamente una frase en un
buen requisito:

| Redacción | Problema |
| --- | --- |
| "El sistema debe ser fácil de usar" | "Fácil" no está definido |
| "El sistema debe funcionar rápido" | "Rápido" no es medible |
| "El sistema debe manejar errores correctamente" | No define qué significa correctamente |
| "El sistema debe permitir la inscripción" | Puede faltar información sobre las condiciones |

La pregunta no es *"¿tiene la palabra 'debe'?"*. La pregunta es:
*"¿podemos determinar con precisión qué condición debe cumplirse?"*

**Del lenguaje cotidiano al requisito.** Petición: *"la inscripción debe
ser rápida y sencilla"*. Pregunta del analista: ¿qué significa "rápida"?
¿para quién? ¿en qué condiciones? ¿cómo se medirá? Posible requisito
resultante:

> El sistema deberá mostrar los grupos disponibles en un tiempo máximo
> de 2 segundos bajo una carga de hasta 100 usuarios concurrentes.

### Características de un requisito bien formado

| Característica | Significa |
| --- | --- |
| Necesario | Existe una razón que justifica su existencia |
| Correcto | Representa adecuadamente la necesidad o fuente de la que proviene |
| Claro | Puede interpretarse de una sola manera razonable |
| Factible | Puede cumplirse dentro de las restricciones conocidas |
| Verificable | Puede demostrarse objetivamente si se cumple |
| Trazable | Puede relacionarse con su fuente y con la evidencia correspondiente |

<p style="font-size:0.85em">Características sintetizadas a partir de INCOSE GtWR y el Systems Engineering Handbook.</p>

## Un requisito no se evalúa solo

Un requisito puede estar bien escrito individualmente y aun así formar
parte de un **conjunto** de requisitos defectuoso. Por eso la calidad
debe revisarse tanto requisito por requisito (¿es claro? ¿necesario?
¿correcto? ¿verificable? ¿factible?) como sobre el conjunto completo
(¿está completo? ¿es consistente? ¿hay duplicados o contradicciones?
¿cubren las necesidades?).

### Ejemplo: dos requisitos que se contradicen

| ID | Requisito |
| --- | --- |
| RF-CANC-01 | El sistema deberá permitir cancelar una inscripción hasta 24 horas antes del inicio del curso. |
| RF-CANC-02 | El sistema deberá permitir cancelar una inscripción en cualquier momento antes del inicio del curso. |

Ambos requisitos pueden parecer claros individualmente. **Juntos son
inconsistentes.** La revisión de requisitos debe detectar contradicciones
como esta antes de que se conviertan en problemas de diseño o de
pruebas. Vas a ver cómo se resuelve exactamente esta contradicción en
[5. Más ejemplos aplicados](/materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado/).

> Nota de identificadores: `RF-CANC-01`/`RF-CANC-02` son un ejemplo
> aislado, distinto del requisito `RF-01` del sistema de ejemplo
> principal (formulario de registro) que vas a usar en el resto de la
> unidad. No reutilices `RF-01`/`RF-02` para dos ejemplos distintos en tu
> propio trabajo — es exactamente el tipo de confusión que esta sección
> busca que aprendas a evitar.

### Ejemplo: un requisito incompleto

> El sistema deberá enviar una notificación al estudiante.

¿En qué situación? ¿A quién exactamente? ¿Por qué medio? ¿En cuánto
tiempo? ¿Qué información debe contener? ¿Qué ocurre si el envío falla?
No es necesario responder todo eso en una sola frase — hay que
determinar **qué condiciones son necesarias** para que el requisito
pueda entenderse y verificarse.

### Ejemplo: un requisito demasiado grande

> El sistema deberá permitir al estudiante consultar materias,
> seleccionar grupos, validar prerrequisitos, verificar disponibilidad,
> registrar la inscripción y enviar una confirmación por correo.

Aquí aparecen varios comportamientos distintos. Conviene descomponerlos
para facilitar su análisis, diseño, verificación y trazabilidad:

| ID | Requisito |
| --- | --- |
| RF-INSC-01 | El sistema deberá mostrar las materias disponibles para el estudiante. |
| RF-INSC-02 | El sistema deberá mostrar los grupos disponibles de una materia. |
| RF-INSC-03 | El sistema deberá validar los prerrequisitos de la materia. |
| RF-INSC-04 | El sistema deberá verificar la disponibilidad de lugares. |
| RF-INSC-05 | El sistema deberá registrar la inscripción cuando las condiciones se cumplan. |
| RF-INSC-06 | El sistema deberá enviar una confirmación después de registrar la inscripción. |

Vas a volver a ver esta misma descomposición (`RF-INSC-01`–`RF-INSC-06`)
en [4. Trazabilidad y matriz de trazabilidad](/materias/pruebas-software/unidad-02/04-trazabilidad-matriz/),
dentro de una matriz de tamaño más real.

## Funcional, calidad y restricción

| Categoría | Responde | Ejemplo |
| --- | --- | --- |
| Funcional | ¿Qué debe hacer? | El sistema deberá registrar una inscripción cuando el estudiante cumpla las condiciones requeridas. |
| Calidad (no funcional) | ¿Qué tan bien debe hacerlo? | La consulta de grupos deberá responder en menos de 2 segundos bajo la carga definida. |
| Restricción | ¿Qué debe respetar? | Un estudiante no podrá inscribirse si no cumple los prerrequisitos. |

Estas categorías ayudan a analizar los requisitos, pero no son
compartimentos completamente aislados — ahora tenemos tres cosas
diferentes que probar: el comportamiento, la característica de calidad
y la restricción.

### Las cuatro categorías típicas de calidad (no funcionales)

El programa oficial (contenido 2.1.2) identifica estas cuatro categorías como
ejemplos de requisitos no funcionales — no son las únicas posibles, pero
son el punto de partida del Laboratorio 1:

| Categoría | Ejemplo |
| --- | --- |
| Rendimiento | La consulta de grupos deberá responder en menos de 2 segundos bajo la carga definida. |
| Seguridad | La contraseña debe almacenarse cifrada, nunca en texto plano. |
| Usabilidad | Un estudiante de primer ingreso deberá poder completar una inscripción sin ayuda externa en un máximo de 3 intentos. |
| Disponibilidad | El sistema de inscripción deberá estar disponible al menos el 99% del tiempo durante el periodo oficial de inscripciones. |

## Los requisitos de seguridad merecen atención aparte

La seguridad no es solamente "un requisito no funcional más". Puede
expresarse de cuatro formas distintas:

| Forma | Ejemplo |
| --- | --- |
| Función de seguridad | Bloquear una cuenta después de cinco intentos fallidos. |
| Propiedad de seguridad | Proteger las credenciales de autenticación. |
| Restricción | No almacenar contraseñas en texto plano. |
| Auditoría | Registrar los eventos relevantes de autenticación. |

La seguridad puede generar requisitos funcionales, requisitos de
calidad, restricciones y requisitos derivados de políticas, riesgos o
regulación — no encaja en una sola categoría.

### Cómo se deriva un requisito de seguridad

```text
NECESIDAD → RIESGO → REQUISITO → PRUEBA
```

Un ejemplo: el usuario necesita recuperar su cuenta (necesidad). Un
atacante podría descubrir qué correos están registrados (riesgo). El
sistema no debe revelar si un correo existe (requisito). Comparar la
respuesta para correos registrados y no registrados (prueba). Los
requisitos de seguridad pueden derivarse de **riesgos y amenazas**, no
solamente de solicitudes explícitas de los usuarios.

Vas a desarrollar esta misma necesidad — recuperación de contraseña —
como el segundo ejemplo completo de la unidad, en
[5. Más ejemplos aplicados](/materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado/).
Otro requisito de seguridad del mismo tipo: un atacante puede intentar
repetidamente autenticarse (riesgo de fuerza bruta). El sistema deberá
bloquear temporalmente una cuenta después de cinco intentos consecutivos
de autenticación fallidos (requisito). El criterio verificable sería
*"dado un usuario activo, cuando se realizan cinco intentos consecutivos
con credenciales incorrectas, entonces el sistema deberá impedir nuevos
intentos durante el periodo definido"*.

### Los requisitos también pueden provenir de la regulación

Una obligación legal, contractual o normativa puede convertirse en una
fuente de requisitos: la organización debe cumplir una obligación
(necesidad), y la solución debe implementar las condiciones necesarias
para demostrar ese cumplimiento (requisito). La fuente debe conservarse
para poder responder después: *¿por qué existe este requisito?*

Este es exactamente el mismo principio de trazabilidad que vas a aplicar
formalmente en
[4. Trazabilidad y matriz de trazabilidad](/materias/pruebas-software/unidad-02/04-trazabilidad-matriz/):
un requisito de ejemplo del dominio de inscripción — `RF-INSC-01`,
"permitir solicitar inscripción" — puede trazarse a la necesidad del
estudiante que lo originó. Una regla de negocio análoga a "respetar
prerrequisitos" se traza a la política académica. Un requisito de
seguridad análogo a "no revelar cuentas existentes" se traza a un
análisis de riesgo. Y un requisito de calidad análogo a "responder
dentro del tiempo definido" se traza a un objetivo de desempeño. La
trazabilidad no significa solamente requisito → prueba: también puede
empezar como fuente → necesidad → requisito → prueba → evidencia.

## Verificación y validación de requisitos

No decidimos que un requisito "está bien" solamente porque "suena bien".
Lo sometemos a dos evaluaciones distintas — aquí todavía estamos
evaluando el requisito, no ejecutando el software:

| | Verificación del requisito | Validación del requisito |
| --- | --- | --- |
| Pregunta central | ¿Está bien escrito y posee las características necesarias para ser un requisito adecuado? | ¿Representa realmente la necesidad que debía satisfacerse? |
| Se pregunta | ¿Es claro? ¿Es verificable? ¿Es factible? ¿Es consistente? | ¿Representa la necesidad? ¿Tiene una fuente válida? ¿Es necesario? ¿Conduce a la solución que se necesita? |
| En una frase | "¿Está bien escrito?" | "¿Es lo que realmente necesitamos?" |

<p style="font-size:0.85em">Fuente: INCOSE, <em>Needs and Requirements Manual</em>, capítulos 5 y 7.</p>

### Cómo se revisan los requisitos en la práctica

| Técnica | En qué consiste |
| --- | --- |
| Revisión | Personas expertas examinan los requisitos y buscan defectos. |
| Checklist | Se comprueba sistemáticamente cada característica esperada. |
| Escenarios | Se recorren situaciones reales para descubrir omisiones y ambigüedades. |
| Prototipos | Se utiliza una representación para validar expectativas con stakeholders. |
| Trazabilidad | Se comprueba de dónde viene cada requisito y de qué otros elementos depende. |
| Pruebas derivadas | Se analiza si puede definirse una forma objetiva de verificarlo. |

**Checklist de revisión de un requisito:**

- ¿Tiene una fuente identificada?
- ¿Es necesario?
- ¿Es correcto respecto a su fuente?
- ¿Es claro y no ambiguo?
- ¿Es completo para su propósito?
- ¿Es consistente con los demás?
- ¿Es factible?
- ¿Es verificable?
- ¿Tiene un identificador único?
- ¿Puede trazarse hasta su origen?

El checklist no sustituye el análisis: ayuda a hacerlo sistemáticamente.

### Aplicación guiada: revisar y mejorar un requisito defectuoso

> **RF-07 (ejemplo de revisión, no forma parte del sistema de ejemplo
> principal):** El sistema deberá permitir que el estudiante se
> inscriba rápidamente a cualquier materia que necesite.

Problemas: "rápidamente" no tiene métrica, "cualquier materia" ignora
restricciones y prerrequisitos, "que necesite" no es una condición
objetiva.

Versión mejorada:

> **RF-07 (revisado):** El sistema deberá permitir al estudiante
> solicitar la inscripción a una materia disponible cuando cumpla los
> prerrequisitos establecidos.

Ahora podemos identificar actor, acción, condición y resultado esperado
— pero todavía debemos preguntar qué significa "disponible", cómo se
comunica el resultado, y si existe alguna otra condición. Un requisito
mejor redactado **no necesariamente está terminado**: la revisión puede
descubrir nuevas preguntas, y una necesidad puede producir un conjunto
de requisitos relacionados (por ejemplo, de `RF-07` también se derivan
la regla "el estudiante debe cumplir los prerrequisitos", la restricción
"no debe excederse la capacidad del grupo" y el requisito de seguridad
"solo un usuario autenticado puede solicitar la inscripción"). Por eso
también debemos evaluar el conjunto y no solamente cada frase.

### Requisitos de seguridad: activo, amenaza, riesgo, requisito

```text
ACTIVO → AMENAZA → RIESGO → REQUISITO
```

Ejemplo: activo = cuenta del estudiante, amenaza = fuerza bruta, riesgo
= acceso no autorizado. Requisito = bloquear temporalmente después de
cinco intentos fallidos. Y de ahí al requisito de prueba: requisito
("bloquear después de 5 intentos") → criterio ("el quinto intento
produce bloqueo") → escenario ("credenciales incorrectas cinco veces")
→ prueba ("comprobar que el sexto intento sea rechazado"). Esta cadena
—requisito → criterio → escenario → caso de prueba → evidencia— es
exactamente el hilo conductor de los siguientes dos temas de la unidad.

## Qué debe poder responder un buen requisito

Al terminar de analizarlo deberías poder responder cuatro preguntas:
**¿qué?** (¿qué condición debe cumplirse?), **¿para quién?** (¿qué
stakeholder o actor está involucrado?), **¿por qué?** (¿qué necesidad,
riesgo, regla o fuente lo justifica?) y **¿cómo sabremos?** (¿qué
evidencia permitirá determinar que se cumple?).

## Práctica en clase (opcional, antes del Laboratorio 1)

Antes de aplicar esto a tu proyecto base, tu docente puede pedirte que
analices requisitos ya escritos (por ejemplo: *"el sistema debe ser muy
rápido"*, *"el sistema debe manejar correctamente los errores"*, *"el
sistema debe hacer todo lo necesario para registrar usuarios"*) para
identificar **qué característica está fallando** en cada uno (sin
corregirlos todavía), y después elegir dos y transformarlos: identificar
la ambigüedad, determinar qué información falta, identificar una fuente
o stakeholder posible, redactar una nueva versión y explicar cómo
podría verificarse. Esta práctica no es el Laboratorio 1 ni sustituye su
evidencia — es preparación.

> **Laboratorio 1.** A partir del [proyecto base asignado a tu equipo](/materias/pruebas-software/unidad-02/proyectos-base/):
> deriva cinco requisitos funcionales, tres no funcionales (al menos uno
> de seguridad) y cuatro reglas de negocio, todos verificables, y revisa
> cada uno contra el checklist de esta sección antes de entregar. Guía
> completa en el
> [Laboratorio 1](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio/).

## Referencias de este tema

- Jorgensen, *Software Testing: A Craftsman's Approach* — fundamentación
  de requisitos como base de las pruebas.
- Black, van Veenendaal y Graham, *Foundations of Software Testing ISTQB
  Certification*.
- ISO/IEC 25010:2011 — vocabulario formal para requisitos no
  funcionales.
- INCOSE, *Guide to Writing Requirements* v4 (2023) e INCOSE, *Needs and
  Requirements Manual*, caps. 5 y 7 — citadas puntualmente en este tema
  (ver notas arriba).

Ver [Referencias de la unidad](/materias/pruebas-software/unidad-02/referencias/)
para la ficha completa de cada fuente.

## Qué sigue

Ya tienes requisitos verificables. El siguiente paso es describir cómo
se usan: continúa con
[2. Casos de uso e historias de usuario](/materias/pruebas-software/unidad-02/02-casos-de-uso-historias-usuario/).
