---
title: "Laboratorio 3 — Plan de pruebas del proyecto integrador"
description: "Unidad III de Pruebas de Software — versión 1 del plan de pruebas del proyecto base, evidencia oficial de la unidad."
---

> Este laboratorio produce la **evidencia oficial de la Unidad III**: la
> versión 1 del plan de pruebas de tu proyecto base (Hito 3 del proyecto
> integrador). Se evalúa con la rúbrica de la unidad.
>
> Aquí ya **no** se usa el caso SPB: todo se aplica a **tu** proyecto base.
> El SPB solo sirve como modelo de referencia (Actividad A4).
>
> El plan **no se escribe desde cero**: organiza lo que tu equipo ya
> produjo en las Unidades I y II, en los Laboratorios 01 y 02 y en la
> Actividad A3.

---

## 1. Identificación

| Campo | Valor |
| --- | --- |
| Laboratorio | LAB03 — Plan de pruebas del proyecto integrador |
| Unidad | III — Ingeniería y planificación de pruebas |
| Duración | 2 sesiones de 1 hora + 2 horas de trabajo independiente por equipo (estimado) |
| Trabajo | Equipo del proyecto integrador |
| Dificultad | Intermedio |
| Evaluación | Sumativa — rúbrica de la unidad (la ponderación la confirmará tu docente) |

## 2. Objetivo

**Elaborar** la versión 1 del plan de pruebas del proyecto base del
equipo, con el [Formato del Plan de Pruebas — Unidad 03](/materias/pruebas-software/unidad-03/formato-plan-pruebas/),
que establezca objetivo, alcance, estrategia, criterios de entrada y
salida, datos, ambiente, riesgos de prueba, documentación y evidencias, y
**justificar** la selección de niveles y técnicas con base en el riesgo
de cada funcionalidad.

## 3. Resultado esperado

Al terminar, el equipo contará con:

* el plan de pruebas v1 (12 secciones del formato).
* el **Anexo A** con al menos **seis casos de prueba** CP de prioridad 1,
  provenientes del Laboratorio 01 (parte D).
* el **Anexo B** con el análisis de caja blanca del Laboratorio 02
  (parte B).
* la matriz de trazabilidad con la columna CP.
* el registro de la revisión entre pares y de los cambios realizados.

```text
RA3.1–RA3.4
        ↓
Objetivo: elaborar y justificar el plan de pruebas v1
        ↓
Etapas: insumos → riesgos → secciones del plan → anexos → revisión
        ↓
Evidencia: plan v1 + anexos A y B + matriz ampliada + registro de revisión
        ↓
Rúbrica de la unidad
```

## 4. Prerrequisitos

### Conocimientos

* Temas 1 a 7 de la unidad, desde [1. Tipos y niveles de pruebas](/materias/pruebas-software/unidad-03/01-tipos-y-niveles-de-pruebas/) hasta [7. Estándares y documentación](/materias/pruebas-software/unidad-03/07-estandares-y-documentacion/).
* [Formato del Plan de Pruebas](/materias/pruebas-software/unidad-03/formato-plan-pruebas/) (lectura completa antes de la
  sesión 31).
* Actividades A1 a A4 realizadas.

### Insumos del proyecto integrador

| Insumo | Origen | Sección del plan donde se usa | Condición |
| --- | --- | --- | --- |
| Proyecto base asignado y su especificación | Unidad II, [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) | 1, 3 | REQUERIDO |
| Requisitos RF/RNF y reglas RN | Unidad II, Laboratorio 1 | 3, 4 | REQUERIDO (ver ruta alterna, etapa 1) |
| Historias de usuario o casos de uso, criterios de aceptación y escenarios | Unidad II, Laboratorio 2 | 4, Anexo A | REQUERIDO |
| Matriz de trazabilidad | Unidad II, Laboratorio 3 | 4, 12 | REQUERIDO |
| Tablas de técnicas, casos CP y matriz con columna CP | Unidad III, Laboratorio 01 (parte D) | 5.2, Anexo A | REQUERIDO |
| Pseudocódigo, grafo, V(G) y casos por ruta base | Unidad III, Laboratorio 02 (parte B) | 5.2, Anexo B | REQUERIDO |
| Matriz de riesgo y *charters* | Unidad III, Actividad A3 | 5.1, 5.3 | REQUERIDO |
| Criterios de salida trabajados con el SPB | Unidad III, Actividad A4 | 6, 7 | RECOMENDADO (modelo) |

### Herramientas

| Elemento | Condición |
| --- | --- |
| Editor de texto con Markdown o procesador de textos | REQUERIDO |
| Repositorio del proyecto integrador, si el equipo ya lo usa | RECOMENDADO |

## 5. Entorno

No se instala software. Si el equipo guarda el plan en el repositorio del
proyecto, se sugiere la ruta `docs/pruebas/plan_pruebas_v1.md`, salvo que
el docente defina otra.

> **ADVERTENCIA — datos reales**
>
> No incluyas datos personales reales (nombres, correos, matrículas,
> contraseñas, datos de salud) en el plan ni en los datos de prueba. Usa
> datos ficticios. Esto es especialmente importante en el proyecto A
> (citas médicas).

## 6. Preparación

1. Reúne los insumos de la sección 4 en una carpeta del equipo.
2. Crea el documento `U03_LAB03_<nombre_del_equipo>.md`, salvo que tu
   docente indique otra convención.
3. Copia en él la **plantilla** del Formato del Plan de Pruebas, sección
   7.

---

## 7. Procedimiento

### Etapa 1 — Verificar insumos (sesión 31)

Revisa los insumos y completa:

| Insumo | ¿Existe? | ¿Está actualizado? | Observación |
| --- | :---: | :---: | --- |
| Requisitos y reglas de negocio (Unidad II) | | | |
| Criterios de aceptación y escenarios (Unidad II) | | | |
| Matriz de trazabilidad con columna CP (Unidad II + Laboratorio 01) | | | |
| Casos CP del Laboratorio 01, parte D | | | |
| Análisis de caja blanca del Laboratorio 02, parte B | | | |
| Matriz de riesgo y *charters* (Actividad A3) | | | |

**Ruta alterna (si faltan requisitos de la Unidad II):** antes de
continuar, lista **al menos cinco requisitos verificables** del proyecto
base a partir de [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/), con este mínimo:

* al menos una regla con un dato ordenado (cantidad, cupo, fecha u hora).
* al menos una regla con **dos o más condiciones** combinadas.
* al menos un requisito **no funcional**.

Avisa a tu docente que usaste la ruta alterna. Esta lista será la sección
4 de tu plan.

### CHECKPOINT 1

Muestra a tu docente la tabla de insumos (o la lista de la ruta alterna)
antes de terminar la sesión 31.

### Etapa 2 — Priorizar por riesgo de producto (sesión 31)

Retoma la matriz de riesgo de la Actividad A3. Asegúrate de que incluya
**todas** las funcionalidades que planeas probar, con impacto,
probabilidad, nivel de riesgo y justificación ([5. Pruebas exploratorias y basadas en riesgos](/materias/pruebas-software/unidad-03/05-pruebas-exploratorias-y-basadas-en-riesgos/)). Será la
sección 5.1 del plan y la base de la prioridad.

### Etapa 3 — Secciones 1 a 4 (sesión 31)

Completa las secciones 1 a 4 siguiendo la guía del Formato del Plan de
Pruebas (§5.1 a §5.4):

1. **Identificación.**
2. **Objetivo** — verificable.
3. **Alcance** — incluido y excluido. Cada exclusión con su
   justificación. Si excluyes pruebas no funcionales porque se trabajarán
   en la Unidad VI, dilo explícitamente.
4. **Insumos** — artefactos de la Unidad II por identificador, y la lista
   de **supuestos académicos** que el equipo registró en los Laboratorios
   01 y 02.

### Etapa 4 — Estrategia (trabajo independiente)

Completa la sección 5 (Formato §5.5):

* **5.1** la matriz de riesgo (etapa 2).
* **5.2** una fila por funcionalidad o regla del alcance, con niveles,
  tipos, técnicas, prioridad y **justificación de la técnica**.
* **5.3** al menos un *charter* de la Actividad A3, indicando en qué
  unidad se ejecutará.
* **5.4** recursos.

Requisitos mínimos:

* al menos **tres** técnicas distintas en el conjunto del plan, al menos
  **dos** de caja negra.
* caja blanca indicada en el componente analizado en el Laboratorio 02
  (o justificación de por qué no aplica en otros componentes).
* prioridad coherente con el riesgo de la etapa 2.

### Etapa 5 — Criterios (trabajo independiente)

Completa las secciones 6 y 7 (Formato §5.6 y §5.7):

* al menos **tres** criterios de entrada.
* al menos **tres** criterios de salida, todos verificables con un dato,
  de al menos dos familias distintas ([6. Planificación de pruebas](/materias/pruebas-software/unidad-03/06-planificacion-de-pruebas/)).
* al menos **un** criterio de suspensión con su condición de reanudación.

### Etapa 6 — Datos y ambiente (trabajo independiente)

Completa las secciones 8 y 9 (Formato §5.8 y §5.9):

* un conjunto de datos por cada estado que necesitan tus casos de
  prioridad 1 (descripción, preparación, restablecimiento, protección).
  Revisa tus tablas del Laboratorio 01: cada valor límite y cada regla de
  la tabla de decisión es un dato que debe existir.
* ambiente **previsto** (el proyecto base todavía no es ejecutable):
  componentes, versiones o configuración y cómo se separará de
  producción.

### Etapa 7 — Riesgos de prueba, roles y documentación (trabajo independiente)

Completa las secciones 10 a 12 (Formato §5.10 a §5.12):

* al menos **tres** riesgos de prueba con contingencia. Incluye las
  **preguntas de aclaración** sin respuesta de tus tablas de decisión como
  riesgos de "requisito ambiguo". No repitas los riesgos de producto de la
  etapa 2.
* roles del equipo y calendario tentativo alineado con las Unidades IV a
  VII.
* documentos que producirá el equipo y **convención de evidencias**
  ([7. Estándares y documentación](/materias/pruebas-software/unidad-03/07-estandares-y-documentacion/)).

### Etapa 8 — Anexos A y B (trabajo independiente)

1. **Anexo A — Casos de prueba.** Incorpora los CP del Laboratorio 01,
   parte D. Revisa que:
   * haya **al menos seis** CP, todos de funcionalidades de
     **prioridad 1**. Si la priorización de la etapa 2 cambió, agrega o
     reemplaza casos con las mismas técnicas.
   * al menos dos provengan de partición o valores límite y al menos dos
     de una tabla de decisión (incluye la tabla).
   * cada CP tenga ESC de origen, técnica, nivel, resultado esperado y
     estado `Pendiente de ejecutar`.
2. **Anexo B — Análisis de caja blanca.** Incorpora el análisis del
   Laboratorio 02, parte B.
3. Actualiza la matriz de trazabilidad con la columna CP.

### CHECKPOINT 2

Antes de la sesión 32, revisa en equipo:

* ¿Cada técnica de la estrategia aparece aplicada en al menos un caso de
  los anexos o en un *charter*?
* ¿Cada criterio de salida podría verificarse con un dato concreto?
* ¿Hay alguna funcionalidad de riesgo alto sin técnica asignada?
* ¿Cada dato que necesita un CP de prioridad 1 aparece en la sección 8?

### Etapa 9 — Revisión entre pares (sesión 32)

1. Intercambia tu plan con otro equipo (asignado por el docente).
2. Revisa su plan con la **lista de revisión** del Formato del Plan de
   Pruebas, sección 8, durante 20 minutos. Escribe comentarios concretos
   ("el criterio de salida 2 no es verificable porque..."), no
   valoraciones generales ("está bien").
3. Recibe la revisión de tu plan.
4. Registra en tu plan (sección "Registro de revisión entre pares") qué
   comentarios atendiste, cuáles no y por qué.
5. Entrega la versión 1.

---

## 8. Verificación

Antes de entregar:

* [ ] Las 12 secciones del formato están completas.
* [ ] El alcance incluye exclusiones justificadas.
* [ ] Los insumos referencian los artefactos de la Unidad II y los supuestos académicos.
* [ ] La estrategia usa al menos tres técnicas y su prioridad es coherente con el riesgo.
* [ ] Los criterios de salida son verificables.
* [ ] Datos y ambiente no usan información personal real y están separados de producción.
* [ ] Los riesgos de prueba son distintos de los riesgos de producto.
* [ ] El Anexo A tiene al menos seis CP con ESC, técnica y resultado esperado. El Anexo B contiene el análisis de caja blanca.
* [ ] La matriz de trazabilidad tiene la columna CP.
* [ ] El registro de revisión entre pares está completo.

## 9. Errores frecuentes de diseño

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| Objetivo "que el sistema funcione correctamente" | Objetivo no verificable | ¿Podría alguien decir si se cumplió? | Nombra requisitos, versión y decisión asociada |
| Alcance sin exclusiones | Se asume que todo se prueba | ¿Probarás rendimiento, seguridad, todos los navegadores? | Lista lo que no se prueba y por qué |
| Estrategia que repite "caja negra" en todas las filas | Enfoque en lugar de técnica | ¿Dice qué técnica concreta? | Usa partición, valores límite, tabla de decisión, etc. |
| Riesgos de prueba iguales a riesgos de producto | Confusión entre ambos ([6. Planificación de pruebas](/materias/pruebas-software/unidad-03/06-planificacion-de-pruebas/)) | ¿El riesgo es sobre el software o sobre el proceso de prueba? | Mueve los de producto a la sección 5.1 |
| Criterio de salida "cuando ya no haya errores" | Imposible de verificar (Unidad I) | ¿Qué dato lo demostraría? | Usa porcentajes de ejecución, severidad de defectos abiertos, cobertura de requisitos |
| Casos del Anexo A copiados sin revisar la prioridad | La prioridad cambió después del Laboratorio 01 | ¿Todos los CP son de prioridad 1? | Reemplaza o agrega casos con las mismas técnicas |
| CP marcados como "Aprobado" | Se inventó una ejecución | ¿Existe evidencia de ejecución? | Marca `Pendiente de ejecutar` ([Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/), Regla 3) |

## 10. Evidencias

### Evidencia mínima

* Plan de pruebas v1 con las 12 secciones.
* Anexo A (al menos seis CP, con la tabla de decisión utilizada) y Anexo
  B (análisis de caja blanca).
* Matriz de trazabilidad con columna CP.
* Registro de la revisión entre pares.

### Evidencia adicional

* Registro de cambios respecto a los productos de los Laboratorios 01 y
  02.
* Reto adicional (sección 12).

## 11. Reflexión

Incluye al final del plan (máximo una página para todo el equipo):

1. ¿Qué funcionalidad decidieron probar primero y qué información usaron
   para decidirlo?
2. ¿Qué parte de lo que hicieron en las Unidades I y II les resultó más
   útil para el plan? ¿Qué tuvieron que corregir?
3. ¿Qué comentario de la revisión entre pares cambió más su plan?
4. ¿Qué parte del plan creen que tendrán que modificar al automatizar
   pruebas en la Unidad IV?

## 12. Reto adicional

Elige un requisito no funcional de tu proyecto base y redacta, para la
sección 3 del plan, cómo se incluirá en la versión 2 del plan (Unidad
VI): qué característica de ISO/IEC 25010 evalúa, qué criterio de salida
verificable tendría y qué riesgo de prueba implica. No diseñes todavía el
escenario de carga ni de seguridad.

## 13. Entrega y evaluación

| Aspecto | Valor |
| --- | --- |
| Qué entregar | Plan v1 con anexos, matriz ampliada y registro de revisión, en un solo documento |
| Formato | Markdown (`.md`) o PDF |
| Nombre | `U03_LAB03_<nombre_del_equipo>`, salvo indicación del docente |
| Dónde | En la plataforma indicada por tu docente y, si aplica, en el repositorio del proyecto |
| Cuándo | Al final de la sesión 32 (07/10/2026) |

Se evalúa con la rúbrica de la unidad.
La ponderación dentro de la calificación la confirmará tu docente.

El plan es un **documento vivo**: se revisará y actualizará en las
Unidades IV a VII. Conserva la versión 1 sin sobrescribirla.

## 14. Referencias

* Temas 1 a 7 de la Unidad III.
* [Formato del Plan de Pruebas](/materias/pruebas-software/unidad-03/formato-plan-pruebas/).
* [Proyectos base](/materias/pruebas-software/unidad-02/proyectos-base/) y [Formato de la matriz de trazabilidad](/materias/pruebas-software/unidad-02/formato-matriz-trazabilidad/).
* REF-U3-11 (ISO/IEC/IEEE 29119-2), REF-U3-12 (ISO/IEC/IEEE 29119-3),
  REF-U3-09 (IEEE 829-2008), REF-U3-03 (Patton).
