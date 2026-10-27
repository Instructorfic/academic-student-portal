---
title: "Laboratorio 1 — Técnicas de caja negra"
description: "Unidad III de Pruebas de Software — partición de equivalencia, valores límite y tablas de decisión con el SPB y transferencia al proyecto base."
---

> Laboratorio de **diseño de pruebas**: no se instala software ni se
> ejecuta código. El producto es un conjunto de clases, valores límite,
> tablas de decisión y casos de prueba documentados. En la Unidad IV
> automatizarás casos como estos.
>
> Las partes A, B y C usan el **SPB** (datos fijos, retroalimentación
> común para todo el grupo). La parte D aplica las mismas técnicas a los
> **artefactos de la Unidad II de tu proyecto base**: sus casos de prueba
> serán el Anexo A de tu plan de pruebas (Laboratorio 03).

---

## 1. Identificación

| Campo | Valor |
| --- | --- |
| Laboratorio | LAB01 — Técnicas de caja negra |
| Unidad | III — Ingeniería y planificación de pruebas |
| Duración | 3 sesiones de 1 hora + 60 minutos de trabajo independiente por equipo (estimado) |
| Trabajo | Equipo del proyecto integrador (2 a 4 integrantes) |
| Dificultad | Básico–intermedio |
| Evaluación | Formativa, con criterio de logro (sección 13). La parte D alimenta la evidencia oficial (Laboratorio 03) |

## 2. Objetivo

**Derivar** casos de prueba con partición de equivalencia, análisis de
valores límite y tablas de decisión, primero sobre reglas del SPB y
después sobre las reglas y escenarios del proyecto base, **justificando**
cada valor elegido y **comprobando**, sobre pseudocódigo con defectos,
qué detecta cada técnica.

## 3. Resultado esperado

Al terminar, tu equipo contará con:

* tablas de clases y de valores límite de RN-02 del SPB, y un conjunto
  mínimo de casos para "registrar préstamo" (RN-01 + RN-02).
* la tabla de decisión completa y reducida de RN-03 del SPB, con su
  pregunta de aclaración y sus casos.
* el análisis de qué valores detectan defectos sembrados en pseudocódigo.
* para el proyecto base: una tabla de partición y valores límite, una
  tabla de decisión, **al menos seis casos de prueba** (`CP-XX`)
  vinculados a sus escenarios (`ESC-XX`) y la matriz de trazabilidad con
  la columna CP.

```text
RA3.2 — Aplicar técnicas de caja negra
        ↓
Objetivo: derivar y justificar casos con tres técnicas
        ↓
Tareas: partición → valores límite → tabla de decisión → transferencia al proyecto base
        ↓
Evidencia: tablas, casos CP y matriz ampliada
        ↓
Criterio de logro (sección 13) y Anexo A del plan (Laboratorio 03)
```

## 4. Prerrequisitos

### Conocimientos

* [2. Técnicas de diseño: enfoques y casos de prueba](/materias/pruebas-software/unidad-03/02-tecnicas-de-diseno-enfoques-y-casos/) (del escenario al caso de prueba y
  formato del caso).
* [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/): partición, valores límite,
  tablas de decisión y elección de técnica.

### Insumos del proyecto integrador (parte D)

| Insumo | Origen | Condición |
| --- | --- | --- |
| Reglas de negocio RN y requisitos RF/RNF del proyecto base | Unidad II, Laboratorio 1 | REQUERIDO |
| Historias de usuario o casos de uso, criterios de aceptación CA y escenarios ESC | Unidad II, Laboratorio 2 | REQUERIDO |
| Matriz de trazabilidad | Unidad II, Laboratorio 3 | REQUERIDO |
| Especificación del proyecto base | [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) §6, §7 u §8 | REQUERIDO |

Si a tu equipo le falta algún insumo de la Unidad II, avísale a tu
docente en la sesión 24: la parte D necesita esos artefactos.

### Herramientas

| Elemento | Condición |
| --- | --- |
| Editor de texto con Markdown **o** hoja de cálculo | REQUERIDO (cualquiera) |
| Papel y lápiz para el borrador | OPCIONAL |

### Recursos — reglas del SPB

| ID | Regla |
| --- | --- |
| RN-01 | Días de préstamo solicitados: número entero entre 1 y 14, inclusive, para ambos tipos de usuario |
| RN-02 | Libros en préstamo simultáneo: máximo 3 para ESTUDIANTE y 5 para DOCENTE |
| RN-03 | Se autoriza un préstamo solo si el registro del usuario está vigente, no tiene adeudo pendiente y sus libros en préstamo actuales son menos que su límite (RN-02) |

Interpretación de RN-02 para este laboratorio: al **solicitar un nuevo
préstamo**, el sistema recibe el tipo de usuario y el número de libros
que esa persona **ya tiene** en préstamo (`librosActuales`). Si
`librosActuales` es menor que el límite, el préstamo puede continuar. Si
es igual o mayor, se rechaza por límite alcanzado.

## 5. Entorno

| Elemento | Valor |
| --- | --- |
| Sistema operativo | Cualquiera |
| Software | Editor de texto o hoja de cálculo |
| Red | No requerida |
| Datos | Solo los de este documento y los artefactos de tu equipo (ficticios) |

## 6. Preparación

1. Crea un documento llamado `U03_LAB01_<nombre_del_equipo>.md` (o la hoja
   de cálculo equivalente), salvo que tu docente indique otra convención.
2. Copia en él la tabla de reglas de la sección 4.
3. Ten a la vista el tema [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) y, para la parte D, los
   artefactos de la Unidad II de tu equipo.

---

## 7. Procedimiento

### Parte A — Partición de equivalencia (sesión 24)

#### Paso 1 — Recupera RN-01

Copia en tu documento la tabla de clases de RN-01 del tema
[3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) (clases CE-1 a CE-6). No la modifiques: es el punto
de partida común del grupo.

#### Paso 2 — Identifica las entradas de RN-02

RN-02 depende de **dos** entradas: `tipoUsuario` y `librosActuales`.
Escribe, para cada entrada, qué valores puede recibir el sistema
(incluidos valores que no debería aceptar) y si es una entrada
**ordenada** o **no ordenada** ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).

#### Paso 3 — Particiona `tipoUsuario`

Usa la regla de "conjunto de valores" del tema [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/).

| Clase | Tipo | Descripción | Representante |
| --- | --- | --- | --- |
| CE-7 | Válida | ESTUDIANTE | ESTUDIANTE |
| CE-8 | Válida | ? | ? |
| CE-9 | Inválida | ? | ? |

#### Paso 4 — Particiona `librosActuales` por tipo de usuario

Ahora particiona `librosActuales` (número entero). Atención: algunos
valores son **entradas válidas** que producen un **rechazo de negocio**
(por ejemplo, un ESTUDIANTE con 3 libros es un dato correcto, pero el
préstamo se rechaza). Distínguelos de los **datos inválidos** (por
ejemplo, un número negativo de libros). Completa al menos seis clases:

| Clase | Tipo de usuario | Descripción | Tipo (válida / inválida) | Resultado esperado | Representante |
| --- | --- | --- | --- | --- | --- |
| CE-10 | ESTUDIANTE | Entre 0 y 2 libros | Válida | El préstamo puede continuar | 1 |
| ... | | | | | |

#### Paso 5 — ¿Débil o fuerte?

Con las clases **válidas** de `tipoUsuario` (paso 3) y de
`librosActuales` (paso 4), calcula cuántos casos necesitarías con la
variante **débil normal** y con la **fuerte normal** ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).
¿Tiene sentido aquí el producto cartesiano completo? Explica en dos
líneas, considerando que las clases de `librosActuales` **dependen** del
tipo de usuario.

### CHECKPOINT 1

Antes de continuar, verifica en el equipo:

* ¿Tienen clases separadas para ESTUDIANTE y DOCENTE?
* ¿Distinguieron "rechazo por límite" de "dato inválido"?
* ¿Incluyeron una clase para `librosActuales` negativo y otra para no
  entero?
* ¿Todo valor posible cae en exactamente una clase (cobertura del dominio
  y sin traslape, [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/))?

Tu docente revisará algunas tablas al azar al final de la sesión 24.

### Parte B — Valores límite (sesión 25)

#### Paso 6 — Valores límite de RN-02 (dos valores por frontera)

`librosActuales` sí es una entrada ordenada. Para **cada** tipo de
usuario identifica las fronteras entre clases y aplica la variante de
**dos valores por frontera** ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).

| Tipo de usuario | Frontera | Valores | Resultado esperado de cada valor |
| --- | --- | --- | --- |
| ESTUDIANTE | Entre dato inválido y válido | ? , ? | ? |
| ESTUDIANTE | Entre "puede continuar" y "rechazo por límite" | ? , ? | ? |
| DOCENTE | Entre dato inválido y válido | ? , ? | ? |
| DOCENTE | Entre "puede continuar" y "rechazo por límite" | ? , ? | ? |

**Resultado esperado:** ocho valores en total, cada uno con su resultado
esperado.

#### Paso 7 — Variante de tres valores

Repite el paso 6 solo para la frontera "puede continuar / rechazo por
límite" de cada tipo de usuario, ahora con **tres valores por frontera**.
Anota qué valores **nuevos** aparecen respecto al paso 6.

#### Paso 8 — ¿Qué detecta cada valor? Pseudocódigo con defectos

Esta es una implementación **correcta** de la verificación de límite de
RN-02 (supón que los datos inválidos ya se rechazaron antes):

```text
FUNCIÓN puedePrestarPorLimite(tipoUsuario, librosActuales)
1   limite ← 3
2   SI tipoUsuario = "DOCENTE" ENTONCES
3       limite ← 5
4   FIN SI
5   SI librosActuales < limite ENTONCES
6       RETORNAR VERDADERO
7   FIN SI
8   RETORNAR FALSO
FIN FUNCIÓN
```

El equipo de desarrollo entregó tres versiones con un defecto cada una.
Cada versión es idéntica a la correcta salvo en la línea indicada:

| Versión | Línea con defecto |
| --- | --- |
| MA | `5   SI librosActuales <= limite ENTONCES` |
| MB | `3       limite ← 4` |
| MC | `5   SI librosActuales < limite - 1 ENTONCES` |

Para cada versión:

1. Ejecuta a mano la función con los **representantes** de tus clases
   válidas del paso 4 y con los **valores límite** del paso 6.
2. Marca qué valores producen un resultado distinto al esperado por
   RN-02.

| Versión | ¿La detectan los representantes? | Valores límite que la detectan | Explicación en una línea |
| --- | :---: | --- | --- |
| MA | | | |
| MB | | | |
| MC | | | |

### CHECKPOINT 2

Responde en tu documento: ¿alguna de las tres versiones es detectada por
los representantes de la partición? ¿Qué te dice eso sobre usar solo
partición de equivalencia? Relaciónalo con la tabla del tema [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/).

#### Paso 9 — Combina RN-01 y RN-02 en casos de "registrar préstamo"

Diseña el **conjunto mínimo** de casos de prueba para RF-01 (registrar
préstamo) que cubra:

* todas las clases de RN-01 (CE-1 a CE-6).
* todas las clases de `tipoUsuario` y de `librosActuales` que definiste.
* los valores límite de RN-01 ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)) y los del paso 6.

Reglas de combinación ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/), paso 6):

1. Puedes combinar varias clases **válidas** en un mismo caso.
2. Cada caso debe contener **como máximo una** clase inválida o un valor
   que produzca rechazo. El resto de las entradas debe ser válido.
3. Cada caso debe tener resultado esperado concreto.

| ID | Regla | Técnica | Precondiciones | Datos de entrada (tipoUsuario, librosActuales, días) | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| CP-RF01-01 | RN-01, RN-02 | Partición + valores límite | Usuario con registro vigente y sin adeudo | ESTUDIANTE, 2, 14 | Préstamo registrado |
| ... | | | | | |

### CHECKPOINT 3

Cuenta tus casos. Escribe cuántos tienes y explica en dos líneas por qué
no puedes reducirlos más sin perder alguna clase o algún valor límite.

### Parte C — Tabla de decisión (sesión 26, primeros 35 minutos)

#### Paso 10 — Condiciones, acciones y número de reglas

Lee RN-03 y escribe las **condiciones** (cada una con respuesta Sí/No) y
las **acciones**:

| ID | Condición |
| --- | --- |
| C1 | ¿El registro del usuario está vigente? |
| C2 | ? |
| C3 | ? |

| ID | Acción |
| --- | --- |
| A1 | Autorizar el préstamo |
| A2 | ? |

Escribe la condición C3 de forma que funcione para **ambos** tipos de
usuario (no "¿tiene 3 libros?"). Calcula el número de reglas ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).

#### Paso 11 — Tabla completa

Construye la tabla con **todas** las combinaciones, usando el patrón de
alternancia del tema [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) (C1 alterna cada cuatro columnas, C2 cada
dos, C3 en cada una).

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| C1 | S | S | S | S | N | N | N | N |
| C2 | ? | ? | ? | ? | ? | ? | ? | ? |
| C3 | ? | ? | ? | ? | ? | ? | ? | ? |
| A1 | | | | | | | | |
| A2 | | | | | | | | |

Comprueba: ¿exactamente **una** columna autoriza el préstamo?

#### Paso 12 — Lo que la especificación no dice

RN-03 indica **cuándo** se rechaza, pero no **qué mensaje** debe ver la
persona usuaria. Señala las columnas en las que falla **más de una**
condición y redacta, en una o dos líneas, la **pregunta de aclaración**
que enviarías a quien define los requisitos ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)).

#### Paso 13 — Reduce según la respuesta de "la biblioteca"

Tu docente anunciará la respuesta. Si no se anuncia, usa el **supuesto
A**: el sistema muestra **un solo motivo**, el primero que falle en este
orden: registro no vigente, adeudo pendiente, límite alcanzado.

1. Separa A2 en una acción por motivo (por ejemplo, A2 "rechazar:
   registro no vigente", A3 "rechazar: adeudo pendiente", A4 "rechazar:
   límite alcanzado").
2. Fusiona las columnas con **exactamente las mismas acciones** marcando
   con `—` las condiciones que no influyen.
3. Aplica la **comprobación del número de reglas** ([3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/)): la
   suma de 2ᵏ de cada regla reducida debe dar 8.

#### Paso 14 — Casos por regla

Escribe **un caso de prueba por regla** de la tabla reducida:

* Para C3 usa los **valores límite** del paso 6: cuando C3 sea "Sí", el
  valor más alto que todavía permite el préstamo. Cuando sea "No", el
  primero que lo impide.
* En las columnas con `—`, elige un valor concreto e indica cuál elegiste.

| ID | Regla de la tabla | Datos (tipoUsuario, vigente, adeudo, librosActuales) | Resultado esperado |
| --- | --- | --- | --- |
| CP-RN03-01 | Regla que autoriza (C1 = S, C2 = N, C3 = S) | ESTUDIANTE, Sí, No, 2 | Préstamo autorizado |
| ... | | | |

#### Paso 15 — Una implementación para revisar

El equipo de desarrollo implementó RN-03 así:

```text
FUNCIÓN autorizarPrestamo(usuario)
1   SI usuario.tieneAdeudo ENTONCES
2       RETORNAR "RECHAZADO: ADEUDO PENDIENTE"
3   FIN SI
4   SI NO usuario.registroVigente ENTONCES
5       RETORNAR "RECHAZADO: REGISTRO NO VIGENTE"
6   FIN SI
7   SI usuario.librosActuales >= limite(usuario.tipoUsuario) ENTONCES
8       RETORNAR "RECHAZADO: LÍMITE ALCANZADO"
9   FIN SI
10  RETORNAR "AUTORIZADO"
FIN FUNCIÓN
```

1. Con el supuesto A, ¿qué columna(s) de tu tabla **completa** revelan
   que esta implementación no cumple?
2. ¿Tus casos del paso 14 la detectan? Revisa qué valor elegiste para los
   `—`.
3. Concluye en tres líneas: ¿qué riesgo tiene elegir "cualquier valor"
   para una condición marcada con `—`?

### CHECKPOINT 4

* ¿La tabla completa tiene 8 columnas distintas y una sola autoriza?
* ¿La tabla reducida pasa la comprobación del número de reglas?
* ¿Cada caso del paso 14 usa un valor límite de RN-02 para C3?

### Parte D — Transferencia al proyecto base (sesión 26, últimos 20 minutos, y trabajo independiente)

Ahora aplicas las tres técnicas a **tu** proyecto base. No inventes
reglas nuevas: trabaja con las RN, CA y ESC que tu equipo ya escribió en
la Unidad II ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) §12–13). Si necesitas un dato que el
proyecto no define (por ejemplo, un número máximo o un horario),
regístralo como **supuesto académico** ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/), Regla 6).

#### Paso 16 — Elige dos reglas

Con la tabla del tema [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/), elige de tus artefactos de la Unidad II:

1. **Una regla o escenario con un dato ordenado** (cantidad, cupo, fecha,
   hora, longitud) → partición + valores límite. Si tu proyecto no tiene
   ninguno explícito, usa tu escenario "alterno o de condición límite"
   de la Unidad II y registra el supuesto que fija el límite.
2. **Una regla o funcionalidad cuyo resultado dependa de dos o más
   condiciones** → tabla de decisión.

Escribe por qué cada regla corresponde a esa técnica.

#### Paso 17 — Partición y valores límite de la regla 1

Construye la tabla de clases (válidas e inválidas, con representante y
resultado esperado) y la tabla de valores límite (dos valores por
frontera) de la regla 1.

#### Paso 18 — Tabla de decisión de la regla 2

Construye la tabla completa, registra al menos una pregunta de
aclaración si aparece una combinación que la especificación no resuelve,
reduce solo si la especificación lo justifica y aplica la comprobación
del número de reglas.

#### Paso 19 — Casos de prueba CP

Deriva **al menos seis casos de prueba** con el formato del [Formato del
Plan de Pruebas — Unidad 03](/materias/pruebas-software/unidad-03/formato-plan-pruebas/), sección 6:

* al menos dos de la regla 1 (partición o valores límite).
* al menos dos de la regla 2 (una por regla de la tabla, hasta donde
  alcance).
* cada uno con su **escenario de origen** (`ESC-XX` de la Unidad II). Si
  un caso no corresponde a ningún escenario existente, agrega el
  escenario a tus artefactos de la Unidad II e indícalo como "agregado
  en la Unidad III".
* nomenclatura oficial `CP-01`, `CP-02`... ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) §4.8).
* estado `Pendiente de ejecutar`.

#### Paso 20 — Amplía la matriz de trazabilidad

Agrega a tu matriz de la Unidad II la columna **CP**. Después identifica:

* escenarios sin ningún caso de prueba.
* casos de prueba sin escenario de origen (no debería quedar ninguno).

### CHECKPOINT 5

Antes de entregar, revisa en equipo:

* ¿Cada CP tiene técnica, ESC de origen y resultado esperado tomado de la
  especificación (no de "lo que haría el sistema")?
* ¿Distinguiste en el texto lo que dice el proyecto base de lo que es un
  supuesto académico?
* ¿Ningún caso aparece como ejecutado?

---

## 8. Verificación

* [ ] Las clases de RN-02 están separadas por tipo de usuario y distinguen rechazo de negocio de dato inválido.
* [ ] Ocho valores límite de RN-02 con resultado esperado. Fronteras en 3 y 5.
* [ ] La tabla del paso 8 identifica qué valores detectan MA, MB y MC.
* [ ] Ningún caso del paso 9 combina dos clases inválidas.
* [ ] La tabla completa de RN-03 tiene 8 columnas. La reducida pasa la comprobación del número de reglas.
* [ ] Hay al menos una pregunta de aclaración de RN-03 y la respuesta del paso 15.
* [ ] Parte D: tabla de clases y de valores límite, tabla de decisión, al menos seis CP y matriz con columna CP.

## 9. Errores frecuentes de diseño

Este laboratorio no tiene fallas técnicas de instalación. Los problemas
habituales son de diseño. Antes de pedir ayuda, sigue el diagnóstico:
observa tu tabla, formula una hipótesis, compárala con el tema
[3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/) y corrige.

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| Tienes varios casos que aportan lo mismo | Elegiste varios representantes de la misma clase | ¿A qué clase pertenece cada valor? | Deja un representante por clase y agrega valores límite |
| Un caso falla y no sabes por qué | Combinaste dos clases inválidas en un caso | Cuenta las entradas inválidas por caso | Separa en un caso por clase inválida |
| Tu tabla de RN-02 tiene una sola frontera superior | No separaste por tipo de usuario | ¿Aparecen los límites 3 y 5? | Haz una partición por tipo de usuario |
| Clasificaste 3 libros de ESTUDIANTE como dato inválido | Confundiste regla de negocio con validez del dato | ¿El dato es posible en la realidad? | Es una entrada válida con resultado de rechazo |
| Faltan combinaciones en la tabla de decisión | Columnas escritas sin orden | ¿Tienes 2ⁿ columnas distintas? | Usa el patrón de alternancia |
| La comprobación del número de reglas no da 8 | Se usó `—` en exceso o se olvidó una columna | Sustituye cada `—` por S y por N: ¿la combinación aparece en otra columna? | Reduce solo columnas con acciones idénticas |
| Resultado esperado "funciona" o "error" | Resultado no observable | ¿Podría alguien decidir si pasó o falló? | Escribe el efecto concreto: "préstamo registrado", "rechazado: límite alcanzado" |
| En la parte D, un CP sin ESC | Se diseñó el caso sin partir de los artefactos de la Unidad II | ¿De qué escenario sale? | Vincúlalo a un ESC o agrega el escenario y regístralo |
| En la parte D, una regla "inventada" | Se agregó funcionalidad fuera del proyecto base | ¿Está en [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) o en tus artefactos de la Unidad II? | Usa una regla existente o registra un supuesto académico sobre un dato, no una funcionalidad nueva |

## 10. Evidencias

### Evidencia mínima

* Partes A y B: tablas de clases (pasos 3–4), respuesta del paso 5,
  valores límite (paso 6), tabla de defectos (paso 8), casos combinados
  (paso 9) y respuestas de los checkpoints 2 y 3.
* Parte C: condiciones y acciones, tabla completa, pregunta de
  aclaración, tabla reducida con su comprobación, casos (paso 14) y
  respuestas del paso 15.
* Parte D: tablas de las dos reglas, al menos seis CP y matriz con
  columna CP.

### Evidencia adicional

* Variante de tres valores (paso 7).
* Tabla reducida de RN-03 también con el supuesto B (el sistema muestra
  **todos** los motivos que apliquen).
* Reto adicional (sección 12).

## 11. Reflexión

Responde brevemente (2–4 líneas cada una):

1. ¿Cuántos casos habrías escrito para RF-01 antes de este laboratorio?
   Compara con tu respuesta de la activación ([Antes de empezar](/materias/pruebas-software/unidad-03/presentacion/#antes-de-empezar)).
2. ¿Qué defecto del paso 8 te sorprendió más y qué técnica lo detectó?
3. Compara los escenarios que escribiste en la Unidad II con los casos de
   la parte D: ¿qué agregó la técnica que el escenario no tenía?
4. ¿En qué nivel de prueba ([1. Tipos y niveles de pruebas](/materias/pruebas-software/unidad-03/01-tipos-y-niveles-de-pruebas/)) ejecutarías los casos de la parte
   D? ¿Podrían ejecutarse en más de uno?

## 12. Reto adicional

Escribe RN-03 como pseudocódigo **correcto** con el supuesto A (tres
decisiones `SI` consecutivas, como en el paso 15 pero en el orden
correcto). Guárdalo: en el Laboratorio 02 calcularás su complejidad
ciclomática y la compararás con el número de reglas de tu tabla completa.

## 13. Entrega y evaluación

| Aspecto | Valor |
| --- | --- |
| Qué entregar | El documento del laboratorio con la evidencia mínima de las partes A a D |
| Formato | Markdown (`.md`) o PDF exportado desde la hoja de cálculo |
| Nombre | `U03_LAB01_<nombre_del_equipo>`, salvo indicación del docente |
| Dónde | En la plataforma indicada por tu docente |
| Cuándo | Partes A–C: al final de la sesión 26. Parte D: antes de la sesión 28 |

### Criterio de logro (nivel satisfactorio)

| Criterio | Evidencia | Nivel esperado |
| --- | --- | --- |
| Partición correcta | Pasos 3–5 | Clases válidas e inválidas completas para ambas entradas, separadas por tipo de usuario. Distingue rechazo de negocio de dato inválido |
| Valores límite y su justificación | Pasos 6 y 8 | Ocho valores sobre las fronteras correctas (3 y 5). Identifica qué valores detectan cada versión con defecto |
| Combinación válida | Paso 9 | Conjunto que cubre todas las clases y valores límite sin combinar dos inválidas en un caso |
| Tabla de decisión | Pasos 10–15 | Ocho reglas completas, una sola autoriza. Pregunta de aclaración concreta. Reducción que pasa la comprobación. Casos con valores límite. Explica el riesgo del `—` |
| Transferencia al proyecto base | Pasos 16–20 | Dos reglas reales del proyecto con técnica justificada. Al menos seis CP con ESC, técnica y resultado esperado. Matriz con columna CP. Supuestos identificados |

Este laboratorio es formativo. La parte D se reutiliza como Anexo A del
plan de pruebas y se evalúa, junto con el plan, con el criterio "Técnicas
de diseño" de la rúbrica de la unidad.

## 14. Referencias

* Temas [2. Técnicas de diseño: enfoques y casos de prueba](/materias/pruebas-software/unidad-03/02-tecnicas-de-diseno-enfoques-y-casos/) y [3. Técnicas de caja negra](/materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra/).
* [Formato del Plan de Pruebas](/materias/pruebas-software/unidad-03/formato-plan-pruebas/), sección 6.
* [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) (reglas, nomenclatura y supuestos).
* REF-U3-01 (Myers et al.), REF-U3-02 (Jorgensen), REF-U3-04 (Black et
  al., ISTQB), REF-U3-13 (ISO/IEC/IEEE 29119-4).
