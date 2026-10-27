---
title: "Formato del plan de pruebas"
description: "Unidad III de Pruebas de Software — estructura del plan de pruebas del proyecto integrador, guía por sección, formato del caso de prueba y plantilla."
---

> Este documento es el **formato oficial del plan de pruebas** que cada
> equipo elabora en el Laboratorio 03 de la unidad. Cumple, para la
> planificación, la misma función que el Formato de la Matriz de
> Trazabilidad cumplió en la Unidad II.
>
> La estructura es una **simplificación con fines didácticos**, inspirada
> en los estándares de documentación de pruebas (ISO/IEC/IEEE 29119-3 e
> IEEE 829-2008). **No reproduce literalmente ninguna norma.** La
> correspondencia con los elementos de esas normas que se muestra en la
> sección 4 es orientativa y queda pendiente de verificación contra el
> texto oficial de cada norma.

---

## 1. Propósito

Un **plan de pruebas** (*test plan*) es el documento que describe, **antes
de ejecutar**, qué se va a probar, qué no, cómo, con qué recursos, en qué
orden, bajo qué condiciones se empieza y bajo qué condiciones se termina.

Sin un plan, cada persona del equipo prueba "lo que se le ocurre", nadie
puede decir cuándo terminó la prueba y los resultados no se pueden
comparar ni repetir. Con un plan, la prueba se vuelve un trabajo
**organizado, verificable y revisable por terceros**.

Este formato responde a la pregunta: **¿qué debe contener, como mínimo,
el plan de pruebas de nuestro proyecto y cómo se redacta cada parte?**

---

## 2. Relación con el proyecto integrador

El plan no se escribe desde cero: organiza lo que el equipo ya produjo.

```text
UNIDAD I                         UNIDAD II                        UNIDAD III
Identificación de riesgos  ─┐    RF / RNF / RN  ─────────────┐    Laboratorio 01: casos CP
Criterios de salida        ─┤    HU / CU, CA, ESC  ──────────┤    Laboratorio 02: análisis de caja blanca
Cobertura (requisitos,     ─┤    Matriz de trazabilidad  ────┤    Actividad A3: matriz de riesgo y charters
código)                     │                                │
                            └───────────────┬────────────────┘
                                            ▼
                            PLAN DE PRUEBAS v1 (Laboratorio 03)
                                            ▼
                     Unidades IV a VII: ejecución, evidencias, defectos, reporte
```

| Insumo previo | Unidad de origen | Sección del plan donde se usa |
| --- | --- | --- |
| Proyecto base asignado (A, B o C) | II ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/)) | 1. Identificación; 3. Alcance |
| Requisitos RF, RNF y reglas RN | II, Laboratorio 1 | 3. Alcance; 4. Insumos |
| Historias de usuario o casos de uso, criterios de aceptación | II, Laboratorio 2 | 4. Insumos; 5. Estrategia (nivel de aceptación) |
| Escenarios ESC | II, Laboratorio 2 | 4. Insumos; Anexo A (cada CP proviene de un ESC) |
| Matriz de trazabilidad | II, Laboratorio 3 | 4. Insumos; 12. Documentación (se amplía con la columna CP) |
| Razonamiento de riesgo (impacto y probabilidad) | I, Actividad A4 | 5.1 Priorización por riesgo |
| Criterios de salida verificables | I, [Criterios de salida](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/#criterios-de-salida) | 7. Criterios de salida |
| Casos de caja negra y de caja blanca | III, Laboratorios 01 y 02 | Anexo A; Anexo B |
| Matriz de riesgo y *charters* | III, Actividad A3 | 5.1 y 5.3 |

---

## 3. Reglas generales

1. **El plan es un documento vivo.** Se entrega la versión 1 en esta
   unidad y se actualiza en las Unidades IV a VII. Cada versión conserva
   su número y su registro de cambios; no se sobrescribe la anterior.
2. **No se inventa ejecución.** En la Unidad III ninguna prueba se ha
   ejecutado sobre el proyecto base. Todo caso, resultado o evidencia
   futura se marca como `Pendiente de ejecutar` ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/),
   Regla 3).
3. **Se distingue especificación de supuesto.** Si el plan necesita un
   dato que el proyecto base no define (por ejemplo, un horario o un
   límite numérico), se registra como **supuesto académico** y se indica
   así en el texto ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/), Regla 6).
4. **Se conservan los identificadores.** RF, RNF, RN, HU/CU, CA y ESC
   mantienen el identificador asignado en la Unidad II. Los casos de
   prueba usan la nomenclatura oficial `CP-01`, `CP-02`, ... ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/)
   §4.8).
5. **Todo lo que se escribe debe poder verificarse.** Si una frase del
   plan no permite que otra persona decida si se cumplió, debe
   reescribirse.
6. **Ningún dato personal real.** Los datos de prueba son ficticios o
   anonimizados.

---

## 4. Estructura del plan

| # | Sección | Pregunta que responde | Contenido 3.x |
| ---: | --- | --- | --- |
| 1 | Identificación | ¿Qué documento es, de qué sistema y de qué versión? | 3.4.2 |
| 2 | Objetivo | ¿Para qué se prueba esta versión? | 3.3.1 |
| 3 | Alcance | ¿Qué se prueba y qué no? | 3.3.1 |
| 4 | Insumos (base de prueba) | ¿A partir de qué documentos se diseñan las pruebas? | 3.3.1, 3.4.2 |
| 5 | Estrategia | ¿Cómo se prueba: niveles, tipos, técnicas, prioridad y recursos? | 3.3.2 |
| 6 | Criterios de entrada | ¿Cuándo puede empezar la prueba? | 3.3.3 |
| 7 | Criterios de salida, suspensión y reanudación | ¿Cuándo termina, cuándo se detiene y cuándo se reanuda? | 3.3.3 |
| 8 | Datos de prueba | ¿Con qué datos? | 3.3.4 |
| 9 | Ambiente de pruebas | ¿Dónde se ejecuta? | 3.3.4 |
| 10 | Riesgos de prueba | ¿Qué podría impedir probar bien y qué haremos? | 3.3.5 |
| 11 | Roles y calendario | ¿Quién hace qué y cuándo? | 3.3.2 |
| 12 | Documentación y evidencias | ¿Qué documentos y evidencias se producirán y cómo se nombrarán? | 3.4.2, 3.4.3 |
| — | Anexo A — Casos de prueba | Casos CP derivados con técnicas | 3.2 |
| — | Anexo B — Análisis de caja blanca | Grafo, V(G) y rutas de un componente | 3.2.2 |
| — | Registro de cambios y de revisión entre pares | ¿Qué cambió y por qué? | 3.4.2 |

**Correspondencia orientativa con los estándares** (pendiente de
verificación contra el texto oficial): los planes de prueba descritos en
IEEE 829-2008 e ISO/IEC/IEEE 29119-3 incluyen, con nombres propios de
cada norma, elementos equivalentes a los de esta tabla: identificación
del plan, elementos y funcionalidades a probar y a no probar, enfoque o
estrategia, criterios de aprobación y de suspensión, entregables, tareas,
necesidades de ambiente, responsabilidades, calendario, riesgos y
contingencias, y aprobaciones. Esta materia omite o simplifica algunos de
ellos (por ejemplo, capacitación del personal y aprobaciones formales)
por tratarse de un proyecto académico.

---

## 5. Guía por sección

Cada sección se explica con el mismo esquema: **qué es**, **contenido
mínimo**, **ejemplo** (con el Sistema de Préstamos de Biblioteca, SPB,
caso ilustrativo de la unidad) y **errores frecuentes**. Los ejemplos son
**parciales**: muestran el formato, no resuelven el plan del SPB
(Actividad A4) ni el de tu proyecto.

### 5.1 Sección 1 — Identificación

**Qué es.** Los datos que permiten saber de qué documento se trata sin
leerlo completo.

**Contenido mínimo.** Sistema bajo prueba (proyecto base A, B o C),
versión del sistema que se probará (o "especificación v1 de la Unidad
II" si todavía no hay sistema ejecutable), equipo e integrantes, fecha y
versión del plan.

**Error frecuente.** Omitir la versión: un plan sin versión del sistema
no permite saber a qué se refieren los resultados.

### 5.2 Sección 2 — Objetivo

**Qué es.** Para qué se prueba **esta** versión. Responde a una decisión
que alguien tomará con los resultados (liberar, corregir, aceptar).

**Contenido mínimo.** Una o dos oraciones que nombren los requisitos o
reglas, la versión y la decisión asociada.

**Ejemplo (SPB).**

| No verificable | Verificable |
| --- | --- |
| "Asegurar que el sistema funcione bien." | "Comprobar que RF-01, RF-02 y RN-01 a RN-04 se cumplen en la versión 1.0, para decidir su liberación." |

**Error frecuente.** Objetivos que no terminan nunca ("encontrar todos
los errores") o que no nombran nada concreto.

### 5.3 Sección 3 — Alcance

**Qué es.** La frontera de la prueba: qué funcionalidades, requisitos y
tipos de prueba **se incluyen** y cuáles **se excluyen**.

**Contenido mínimo.** Dos tablas: incluido (con motivo) y excluido (con
justificación). Toda exclusión se justifica.

**Ejemplo (SPB).**

| Excluido | Justificación |
| --- | --- |
| RNF-01 (búsqueda en 2 s con 50 usuarios) | Las pruebas de rendimiento se diseñan y ejecutan en la Unidad VI; en la versión 1 del plan se declara como pendiente. |

**Error frecuente.** Un alcance sin exclusiones. Excluir no es un defecto
del plan; excluir **sin decirlo** sí lo es.

### 5.4 Sección 4 — Insumos (base de prueba)

**Qué es.** La **base de prueba** (*test basis*): los documentos de los
que se derivan los casos y los resultados esperados.

**Contenido mínimo.** Lista de los artefactos de la Unidad II con su
identificador y versión: requisitos, reglas de negocio, historias o casos
de uso, criterios de aceptación, escenarios y matriz de trazabilidad.
Lista de supuestos académicos registrados.

**Error frecuente.** Copiar los requisitos completos dentro del plan. Se
**referencian** por identificador; el plan no duplica la Unidad II.

### 5.5 Sección 5 — Estrategia

**Qué es.** La **estrategia de pruebas** (*test strategy*) describe
**cómo** se va a probar. Es la sección central del plan.

**Contenido mínimo.**

* **5.1 Priorización por riesgo de producto.** Tabla de funcionalidades
  con impacto (1–3), probabilidad (1–3), riesgo = impacto ×
  probabilidad, clasificación y justificación.
* **5.2 Niveles, tipos y técnicas.** Una fila por funcionalidad o regla
  del alcance:

  | Funcionalidad / regla | Riesgo | Niveles | Tipos | Técnicas de diseño | Prioridad | Justificación de la técnica |
  | --- | --- | --- | --- | --- | ---: | --- |
  | RN-04 Multa (SPB) | Alto | Unitaria, sistema | Funcional | Partición de salidas, valores límite, caja blanca | 1 | Regla numérica con tope: las fronteras (0, tope) concentran defectos; la función tiene tres decisiones |

* **5.3 Pruebas exploratorias.** Al menos un *charter* con su tiempo y
  responsable.
* **5.4 Recursos.** Personas, tiempo, herramientas previstas en las
  Unidades IV a VII y ambientes.

**Requisitos mínimos.** Al menos tres técnicas distintas en el conjunto
del plan, al menos dos de caja negra; indicar dónde aplica caja blanca o
por qué no; prioridad coherente con el riesgo.

**Error frecuente.** Escribir "caja negra" en todas las filas. Caja negra
es un **enfoque**; la estrategia debe nombrar la **técnica** concreta
(partición, valores límite, tabla de decisión).

### 5.6 Sección 6 — Criterios de entrada

**Qué es.** Un **criterio de entrada** (*entry criteria*) es una condición
que debe cumplirse para **iniciar** una actividad de prueba.

**Contenido mínimo.** Al menos tres criterios verificables.

**Ejemplo.** "El ambiente de pruebas está disponible y su versión está
registrada en la sección 9." "Los casos de prioridad 1 fueron revisados
por otro integrante."

**Error frecuente.** Criterios de entrada que en realidad son tareas
("instalar el sistema").

### 5.7 Sección 7 — Criterios de salida, suspensión y reanudación

**Qué es.**

* **Criterio de salida** (*exit criteria*): condición para **terminar**
  la actividad de prueba (Unidad I, [Criterios de salida](/materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas/#criterios-de-salida)).
* **Criterio de suspensión**: condición para **detener** temporalmente la
  prueba porque continuar no produce información útil.
* **Criterio de reanudación**: condición para **retomarla**.

**Contenido mínimo.** Al menos tres criterios de salida verificables con
un dato; al menos un par suspensión–reanudación.

**Ejemplo.** Salida: "El 100 % de los casos de prioridad 1 se ejecutó y
ningún defecto de severidad alta permanece abierto." Suspensión: "Si el
registro de préstamo falla de manera que bloquea los casos de RN-03."
Reanudación: "Al recibir una versión que corrige el bloqueo."

**Error frecuente.** "Cuando ya no haya errores": no existe un dato que lo
demuestre (principio "las pruebas muestran la presencia de defectos",
Unidad I).

### 5.8 Sección 8 — Datos de prueba

**Qué es.** Los **datos de prueba** (*test data*) son los valores y
registros que necesitan los casos.

**Contenido mínimo.** Tabla de conjuntos de datos: descripción,
preparación, restablecimiento (cómo se regresa al estado inicial) y
protección.

| Conjunto | Descripción | Preparación | Restablecimiento | Protección |
| --- | --- | --- | --- | --- |
| DP-01 (SPB) | ESTUDIANTE, registro vigente, sin adeudo, 2 libros en préstamo | Alta manual en el ambiente de pruebas | Eliminar los préstamos creados por la prueba | Nombre y matrícula ficticios |

**Error frecuente.** Datos descritos como "usuarios de prueba" sin decir
en qué estado deben estar. Un caso de prueba depende del **estado** de sus
datos.

### 5.9 Sección 9 — Ambiente de pruebas

**Qué es.** El **ambiente de pruebas** (*test environment*): hardware,
software, configuración y servicios con los que se ejecuta la prueba.

**Contenido mínimo.** Tabla por componente con versión o configuración y
cómo se separa de producción. Si el proyecto base todavía no es
ejecutable, se describe el ambiente **previsto** y se marca como tal.

**Error frecuente.** Planificar pruebas sobre un sistema en producción o
con datos reales.

### 5.10 Sección 10 — Riesgos de prueba

**Qué es.** Un **riesgo de prueba** (o de proyecto) es una situación que
podría **impedir o limitar la prueba**. Es distinto del **riesgo de
producto** (sección 5.1), que es algo que podría fallar en el software.

**Contenido mínimo.** Al menos tres riesgos con efecto, probabilidad y
contingencia.

| Riesgo de prueba | Efecto | Probabilidad | Contingencia |
| --- | --- | --- | --- |
| Ambigüedad en el mensaje de rechazo de RN-03 (SPB) | Resultados esperados dudosos | Alta | Registrar la pregunta; no ejecutar esos casos hasta tener respuesta |

**Error frecuente.** Repetir aquí los riesgos de producto ("que falle el
cálculo de la multa").

### 5.11 Sección 11 — Roles y calendario

**Qué es.** Quién hace qué y cuándo.

**Contenido mínimo.** Tabla de roles (responsable del plan, diseño de
casos, preparación de datos y ambiente, ejecución, registro de defectos)
y calendario tentativo alineado con las Unidades IV a VII.

**Error frecuente.** Asignar todo a "todo el equipo": nadie queda como
responsable.

### 5.12 Sección 12 — Documentación y evidencias

**Qué es.** Los documentos que producirá la prueba y la forma de las
evidencias de ejecución.

**Contenido mínimo.**

* Lista de documentos previstos (plan, especificación de casos, registro
  de ejecución, reportes de defectos, reporte de resultados) y la unidad
  en que se producirá cada uno.
* **Convención de evidencias**: qué debe contener cada evidencia (ID del
  caso, fecha, versión, ambiente, datos, resultado esperado, resultado
  obtenido, veredicto y responsable) y cómo se nombra. Ejemplo:
  `CP-03_2026-11-12_falla.png`.
* Indicación de que la matriz de trazabilidad se amplía con la columna
  CP.

**Error frecuente.** Una convención de evidencias que no permite saber
qué caso se ejecutó ni sobre qué versión.

---

## 6. Formato del caso de prueba (CP)

### 6.1 Escenario y caso de prueba no son lo mismo

En la Unidad II diseñaste **escenarios** (ESC): la situación que debe
probarse, con su condición de entrada, acción y resultado esperado. Un
**caso de prueba** (CP) concreta un escenario: agrega la **técnica** que
justificó la elección de los valores y los **datos exactos**.

Ejemplo ilustrativo con el proyecto C (el cupo máximo de 30 es un
**supuesto académico**; el proyecto base no fija un número):

```text
ESC-03 (Unidad II)  "Solicitud de inscripción cuando la materia no tiene cupo"
        │  técnica: valores límite sobre el cupo
        ▼
CP-05 (Unidad III)  cupo máximo = 30; inscritos actuales = 30 → rechazar
CP-06 (Unidad III)  cupo máximo = 30; inscritos actuales = 29 → inscribir
```

Un escenario puede originar varios casos; un caso pertenece a un solo
escenario.

### 6.2 Campos

| Campo | Contenido | Ejemplo |
| --- | --- | --- |
| ID | Nomenclatura oficial `CP-XX` (en los ejercicios del SPB se usa un ID descriptivo, por ejemplo `CP-RN01-03`) | CP-05 |
| Escenario de origen | ESC de la Unidad II | ESC-03 |
| Requisito / regla | RF, RNF o RN que verifica | RN-02 |
| Técnica | La técnica que originó los datos | Valores límite |
| Nivel | Unitaria, integración, sistema o aceptación | Sistema |
| Prioridad | Según la sección 5.1 | 1 |
| Precondiciones | Estado necesario antes de ejecutar | Estudiante registrado sin inscripción en la materia |
| Datos de entrada | Valores concretos | cupoMaximo = 30; inscritos = 30 |
| Acción o pasos | Qué se hace | Solicitar la inscripción |
| Resultado esperado | Efecto observable, derivado de la especificación | Inscripción rechazada: materia sin cupo |
| Estado | `Pendiente de ejecutar` en la Unidad III | Pendiente de ejecutar |

> Un caso **sin resultado esperado** no es un caso de prueba. El
> resultado esperado se obtiene de la **especificación** (requisito,
> regla, criterio de aceptación), nunca del código ni de "lo que hace el
> sistema".

---

## 7. Plantilla para copiar

```markdown
# Plan de pruebas — <proyecto base> — v1

## 1. Identificación
| Campo | Valor |
| --- | --- |
| Sistema bajo prueba | Proyecto <A/B/C> — <nombre> |
| Versión que se probará | |
| Equipo e integrantes | |
| Fecha | |
| Versión del plan | 1.0 |

## 2. Objetivo
<Requisitos o reglas, versión y decisión asociada. Verificable.>

## 3. Alcance
### 3.1 Incluido
| Funcionalidad / requisito | Motivo |
| --- | --- |
### 3.2 Excluido
| Funcionalidad / requisito / tipo de prueba | Justificación |
| --- | --- |

## 4. Insumos (base de prueba)
| Artefacto | Identificadores | Versión / fecha |
| --- | --- | --- |
### 4.1 Supuestos académicos
| ID | Supuesto | Motivo |
| --- | --- | --- |

## 5. Estrategia
### 5.1 Priorización por riesgo de producto
| Funcionalidad | Impacto (1–3) | Probabilidad (1–3) | Riesgo | Clasificación | Justificación |
| --- | ---: | ---: | ---: | --- | --- |
### 5.2 Niveles, tipos y técnicas
| Funcionalidad / regla | Riesgo | Niveles | Tipos | Técnicas | Prioridad | Justificación |
| --- | --- | --- | --- | --- | ---: | --- |
### 5.3 Pruebas exploratorias
| Charter | Duración | Responsable | Unidad en que se ejecutará |
| --- | --- | --- | --- |
### 5.4 Recursos

## 6. Criterios de entrada
1.
2.
3.

## 7. Criterios de salida
1.
2.
3.
### 7.1 Suspensión y reanudación
| Suspender si | Reanudar cuando |
| --- | --- |

## 8. Datos de prueba
| Conjunto | Descripción | Preparación | Restablecimiento | Protección |
| --- | --- | --- | --- | --- |

## 9. Ambiente de pruebas
| Componente | Versión / configuración | Separación de producción |
| --- | --- | --- |

## 10. Riesgos de prueba
| Riesgo | Efecto | Probabilidad | Contingencia |
| --- | --- | --- | --- |

## 11. Roles y calendario
| Rol | Responsable | Actividades |
| --- | --- | --- |

| Etapa | Unidad | Fecha tentativa | Producto |
| --- | --- | --- | --- |

## 12. Documentación y evidencias
### 12.1 Documentos que se producirán
### 12.2 Convención de evidencias

## Anexo A — Casos de prueba
| ID | ESC | Requisito / regla | Técnica | Nivel | Prioridad | Precondiciones | Datos | Acción | Resultado esperado | Estado |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |

## Anexo B — Análisis de caja blanca
<Pseudocódigo, grafo, V(G), rutas base y casos (Laboratorio 02, parte B).>

## Registro de cambios
| Versión | Fecha | Cambio | Motivo |
| --- | --- | --- | --- |

## Registro de revisión entre pares
| Comentario recibido | ¿Se atendió? | Cambio realizado o motivo para no atenderlo |
| --- | :---: | --- |

## Reflexión del equipo
```

---

## 8. Lista de revisión entre pares

Marca cada punto como Cumple (C), Parcial (P) o No cumple (N) y escribe
un comentario concreto para cada P o N ("el criterio de salida 2 no es
verificable porque..."), no una valoración general ("está bien").

| # | Punto de revisión | C / P / N | Comentario |
| ---: | --- | :---: | --- |
| 1 | El objetivo es verificable y nombra requisitos y versión | | |
| 2 | El alcance lista exclusiones con justificación | | |
| 3 | Los insumos referencian los artefactos de la Unidad II por identificador | | |
| 4 | La prioridad de la estrategia corresponde al riesgo de producto | | |
| 5 | Cada funcionalidad de riesgo alto tiene al menos una técnica concreta | | |
| 6 | Se usan al menos tres técnicas, dos de ellas de caja negra | | |
| 7 | Hay al menos un *charter* con área, recursos e información buscada | | |
| 8 | Los criterios de salida son verificables con un dato concreto | | |
| 9 | Hay al menos un par suspensión–reanudación | | |
| 10 | Los datos de prueba no contienen información personal real y describen su estado | | |
| 11 | El ambiente está separado de producción | | |
| 12 | Los riesgos de prueba son distintos de los de producto y tienen contingencia | | |
| 13 | La convención de evidencias identifica caso, fecha, versión, datos, esperado, obtenido y veredicto | | |
| 14 | Cada CP del Anexo A tiene ESC de origen, técnica y resultado esperado, y está como `Pendiente de ejecutar` | | |

---

## 9. Criterio de calidad del plan

Un plan cumple este formato cuando otra persona, que no participó en su
elaboración, puede responder leyéndolo:

* qué se probará y qué no, y por qué;
* con qué técnica se diseñó cada caso y por qué esa;
* qué se probará primero;
* cuándo empieza y cuándo termina la prueba;
* con qué datos y en qué ambiente;
* qué podría salir mal en el proceso de prueba y qué se hará;
* qué evidencia demostrará cada resultado.

---

**Se usa en:** temas [6. Planificación de pruebas](/materias/pruebas-software/unidad-03/06-planificacion-de-pruebas/) y [7. Estándares y documentación](/materias/pruebas-software/unidad-03/07-estandares-y-documentacion/), Actividad A4 y [Laboratorio 3 — Plan de pruebas del proyecto integrador](/materias/pruebas-software/unidad-03/laboratorios/laboratorio-3-plan-de-pruebas/).
