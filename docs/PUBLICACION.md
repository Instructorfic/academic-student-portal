# Procedimiento operativo de publicación

## 1. Cuándo derivar una unidad

Solo se deriva una unidad cuando, en `academic-workspace`, tiene
dictamen de QA `APROBADO` (o `APROBADO_CON_OBSERVACIONES` ya resueltas)
registrado en su archivo de auditoría (`AUDITORIA_QA_*.md`). No se
deriva contenido `BORRADOR` sin dictamen, ni contenido bloqueado.

La validación académica humana puede seguir `PENDIENTE` sin bloquear la
derivación técnica — pero el contenido derivado debe seguir marcándose
como no definitivo mientras esa validación esté pendiente (insignia de
estado en cada página de unidad).

## 2. Derivación manual-asistida (esta fase)

No existe todavía extracción automática. El procedimiento actual es:

1. Leer el archivo fuente completo en `academic-workspace`.
2. Clasificarlo (o clasificar cada sección) como `WORKSPACE_ONLY`,
   `STUDENT_PUBLIC` o `TEACHER_RESTRICTED` (ver `docs/ARQUITECTURA.md`).
3. Copiar/adaptar el contenido permitido al portal correspondiente,
   ajustando:
   - frontmatter de Starlight (`title`, `description`);
   - referencias cruzadas a otros archivos del workspace, reemplazadas
     por enlaces internos del portal cuando exista una página
     equivalente;
   - eliminando bloques `WORKSPACE_ONLY` incrustados en el mismo
     archivo (por ejemplo, secciones "Notas para el docente" dentro de
     un archivo de actividades que sí es parcialmente público).
4. Registrar la derivación en la tabla de la sección 3 de este
   documento (o en un registro equivalente por unidad).
5. Ejecutar `npm run build` en el/los portal(es) afectados para validar.

## 3. Registro de derivación — DBA Unidad 1

Fecha de derivación: **2026-08-23**. Fuente: `academic-workspace`,
`materias/dba/unidad01/` (`CONTEXTO_UNIDAD.md`, secc. 22:
`qa_final: REQUIERE_NUEVA_VERIFICACIÓN`; `publicacion: NO_AUTORIZADA`;
`validacion_academica: PENDIENTE`).

**Nota sobre el estado de esta unidad:** a diferencia de la Unidad 2
(derivada primero por tener QA `APROBADO`), la Unidad 1 se derivó con un
estado de QA/publicación explícitamente no cerrado, por decisión directa
del responsable del workspace (ver historial de esta sesión). Cada
página de la unidad, en ambos portales, lleva una insignia visible
"QA requiere nueva verificación · Publicación no autorizada". La
calendarización de la unidad (9 sesiones, `unidad01_planeacion_clases.md`)
es un eje independiente y sí está cerrada; no debe confundirse con el
estado de aprobación del contenido.

| Archivo fuente (`academic-workspace`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `materias/dba/unidad01/CONTEXTO_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Permanece exclusivamente en el workspace. |
| `materias/dba/unidad01/QA_UNIDAD.md`, `AUDITORIA_QA_MATERIALES_U1.md` | — (no se derivan) | `WORKSPACE_ONLY` | QA interno; solo el dictamen resumido se refleja en `unidad-01/index.md` de ambos portales. |
| `materias/dba/unidad01/PLANEACION_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Documento rector superado por `CONTEXTO_UNIDAD.md` y `unidad01_planeacion_clases.md`; permanece como registro interno. |
| `materias/dba/unidad01/material/unidad01_manual_estudiante.md` | `student-portal` y `teacher-portal`: `.../unidad-01/{01..06}-*.md` | `STUDENT_PUBLIC` | Dividido en 6 páginas temáticas (una por sección del manual) en vez de una sola página larga, según la estructura solicitada. |
| `materias/dba/unidad01/material/unidad01_presentacion.md` | `student-portal` y `teacher-portal`: `.../unidad-01/presentacion.md` | `STUDENT_PUBLIC` | Convertida de diapositivas Marp a página de documentación condensada; sin información nueva respecto al manual. |
| `materias/dba/unidad01/material/unidad01_actividades.md` | `student-portal`: `.../unidad-01/actividades/actividad-{1..7}.md` (sin "Notas para el docente") · `teacher-portal`: mismas páginas, íntegras + notas docentes | `STUDENT_PUBLIC` (parcial) + `TEACHER_RESTRICTED` (notas docentes) | Dividido en 7 páginas (una por actividad) en ambos portales. |
| `materias/dba/unidad01/material/unidad01_ejemplos_resueltos.md` | `teacher-portal`: sección "Ejemplo resuelto" embebida en cada `actividades/actividad-{1..7}.md` | `TEACHER_RESTRICTED` | No se creó como página independiente: se integró en la página de la actividad correspondiente para mantener el contenido junto a su contexto. |
| `materias/dba/unidad01/material/unidad01_lab01_presentacion.md`, `unidad01_lab02_presentacion.md` | — (no se derivan como páginas independientes) | `STUDENT_PUBLIC` | Contenido redundante con las guías de laboratorio ya derivadas (mismos comandos/salidas); no se duplica. |
| `materias/dba/unidad01/laboratorios/unidad01_lab01_postgresql_arquitectura_relacional.md` | `student-portal` y `teacher-portal`: `.../unidad-01/laboratorios/laboratorio-1-postgresql.md` | `STUDENT_PUBLIC` | — |
| `materias/dba/unidad01/laboratorios/unidad01_lab02_mongodb_modelo_documental.md` | `student-portal` y `teacher-portal`: `.../unidad-01/laboratorios/laboratorio-2-mongodb.md` | `STUDENT_PUBLIC` | — |
| `materias/dba/unidad01/evaluacion/unidad01_rubrica.md` | `teacher-portal`: `.../unidad-01/rubrica.md` | `TEACHER_RESTRICTED` | No se deriva al Student Portal (D5). Se sustituye ahí por `evaluacion.md`, con criterios generales. |
| `materias/dba/unidad01/planeacion/unidad01_manual_profesor.md` | `teacher-portal`: `.../unidad-01/manual-profesor.md` | `TEACHER_RESTRICTED` | — |
| `materias/dba/unidad01/planeacion/unidad01_planeacion_clases.md` | `teacher-portal`: `.../unidad-01/planeacion-clases.md` | `TEACHER_RESTRICTED` | Marcada explícitamente como oferta de cohorte (D6), no contenido permanente. |
| `materias/dba/unidad01/referencias/unidad01_materiales_referencias.md` | `student-portal` y `teacher-portal`: `.../unidad-01/referencias/index.md` | `STUDENT_PUBLIC` | Se excluye la sección "Notas de uso" (proceso editorial, `WORKSPACE_ONLY`); se conservan las tablas de referencias y trazabilidad. |
| `materias/dba/unidad01/referencias/unidad01_lecturas_complementarias.md` | `student-portal` y `teacher-portal`: `.../unidad-01/referencias/lecturas-complementarias.md` | `STUDENT_PUBLIC` | Se excluye la sección "Fuentes evaluadas y descartadas" (nota de proceso interno sobre una anomalía de seguridad detectada en una fuente descartada, `WORKSPACE_ONLY`). |
| `materias/dba/unidad01/referencias/unidad01_casos_completos.md` | `student-portal` y `teacher-portal`: `.../unidad-01/referencias/casos-reales.md` | `STUDENT_PUBLIC` | Copia íntegra. |
| `materias/dba/CONTEXTO_MATERIA.md` (secc. 2, extracto) | ya derivado en el piloto de Unidad 2; sin cambios | `STUDENT_PUBLIC` (extracto) | No se repite la derivación. |

## 4. Registro de derivación — DBA Unidad 2 (piloto)

Fecha de derivación: **2026-08-23**. Fuente: `academic-workspace`,
`materias/dba/unidad02/` (QA: `APROBADO`; validación académica:
`PENDIENTE`).

| Archivo fuente (`academic-workspace`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `materias/dba/unidad02/CONTEXTO_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Permanece exclusivamente en el workspace. |
| `materias/dba/unidad02/AUDITORIA_QA_MATERIALES_U2.md` | — (no se deriva) | `WORKSPACE_ONLY` | QA interno; solo su dictamen resumido se refleja en `unidad-02/index.md` de ambos portales. |
| `materias/dba/unidad02/material/unidad02_manual_estudiante.md` | `student-portal` y `teacher-portal`: `.../unidad-02/manual-estudiante.md` | `STUDENT_PUBLIC` | Copia íntegra; enlaces internos adaptados a rutas del portal. |
| `materias/dba/unidad02/material/unidad02_presentacion.md` | `student-portal` y `teacher-portal`: `.../unidad-02/presentacion.md` | `STUDENT_PUBLIC` | Convertida de diapositivas Marp a página de documentación; sin información nueva. |
| `materias/dba/unidad02/material/unidad02_actividades.md` | `student-portal`: `.../unidad-02/actividades.md` (sin secciones "Notas para el docente") · `teacher-portal`: `.../unidad-02/actividades.md` (íntegro) | `STUDENT_PUBLIC` (parcial) + `TEACHER_RESTRICTED` (notas docentes) | Único archivo derivado en dos versiones distintas desde la misma fuente. |
| `materias/dba/unidad02/evaluacion/unidad02_rubrica.md` | `teacher-portal`: `.../unidad-02/rubrica.md` | `TEACHER_RESTRICTED` | No se deriva al Student Portal (D5: rúbrica docente completa). Se sustituye ahí por `evaluacion.md`, con criterios generales. |
| `materias/dba/unidad02/planeacion/unidad02_manual_profesor.md` | `teacher-portal`: `.../unidad-02/manual-profesor.md` | `TEACHER_RESTRICTED` | — |
| `materias/dba/unidad02/planeacion/unidad02_planeacion_clases.md` | `teacher-portal`: `.../unidad-02/planeacion-clases.md` | `TEACHER_RESTRICTED` | Marcada explícitamente como oferta de cohorte (D6), no contenido permanente. |
| `materias/dba/unidad02/referencias/unidad02_materiales_referencias.md` | `student-portal` y `teacher-portal`: `.../unidad-02/referencias.md` | `STUDENT_PUBLIC` | Se excluyen las secciones "Notas de uso" y "Pendientes" (notas de proceso editorial, `WORKSPACE_ONLY`); se conservan las tablas de referencias, propósito y trazabilidad. |
| (nuevo, sin fuente 1:1) | `student-portal`: `.../unidad-02/evaluacion.md` | `STUDENT_PUBLIC` | Página nueva que resume criterios generales de evaluación sin reproducir la rúbrica docente; no introduce ningún criterio ausente de `unidad02_actividades.md`. |
| `materias/dba/CONTEXTO_MATERIA.md` (secc. 2, extracto) | `student-portal` y `teacher-portal`: `.../dba/index.md` | `STUDENT_PUBLIC` (extracto) | Solo el propósito general públicamente seguro; el resto del archivo permanece `WORKSPACE_ONLY`. |

## 5. Hosting y CI/CD

- **Student Portal** — sitio estático, apto para GitHub Pages público
  una vez que se confirme la organización/dominio de destino (`site` en
  `astro.config.mjs` queda sin definir hasta entonces).
- **Teacher Portal** — sitio estático, pero **no debe publicarse** en un
  hosting sin control de acceso delante. Opciones compatibles con un
  sitio estático Astro/Starlight (a decidir por quien gestione el
  hosting, no impuesto aquí): protección por contraseña o SSO en la
  plataforma de hosting (por ejemplo, Cloudflare Access, Netlify
  Password Protection/Identity, Vercel Password Protection/SSO), o un
  despliegue detrás de una red privada/VPN institucional. No se fija un
  proveedor en esta fase.
- Ambos repositorios incluyen un workflow de GitHub Actions
  (`.github/workflows/build.yml`) que instala dependencias, construye el
  sitio y falla el pipeline si el build falla. El Student Portal agrega
  un job de despliegue a GitHub Pages; el Teacher Portal solo construye
  y deja documentado que el paso de publicación requiere la capa de
  acceso mencionada arriba antes de activarse.

## 6. Cómo se agrega una materia nueva (resumen operativo)

1. En `academic-workspace`: confirmar que la unidad a publicar tiene QA
   `APROBADO`.
2. Clasificar cada archivo fuente de esa unidad (sección 2).
3. Crear `src/content/docs/materias/<materia>/unidad-NN/` en el/los
   portal(es) correspondientes.
4. Copiar/adaptar el contenido permitido por audiencia.
5. Agregar las entradas al `sidebar` de `astro.config.mjs`.
6. Agregar una fila a la tabla de registro de derivación (sección 3, o
   una tabla equivalente para la nueva unidad).
7. `npm run build` para validar.
8. Publicar según el flujo de CI del repositorio.

## 7. Registro de derivación — Taller Integrador, Bloque I

Fecha de derivación: **2026-09-06**. Fuente: `academic-workspace`,
`materias/taller-integrador/bloque01/` (`CONTEXTO_UNIDAD.md`, secc. 19:
`qa_inicial: PENDIENTE`; `qa_final: PENDIENTE`;
`validacion_academica: PENDIENTE`; `publicacion: NO_AUTORIZADA`). No
existe todavía un archivo `AUDITORIA_QA_*.md` para este bloque.

**Nota sobre el estado de esta unidad.** A diferencia del piloto de DBA
Unidad 2 (QA `APROBADO`), este bloque se deriva **sin haber pasado
todavía por ningún ciclo de QA**, por decisión directa del responsable
del workspace, siguiendo el mismo precedente ya sentado con DBA Unidad
1 (sección 3 de este documento): la derivación técnica no bloquea a la
espera de QA, pero cada página de este bloque, en este portal, lleva
una insignia visible "Borrador — QA pendiente · Publicación no
autorizada". Esto no debe leerse como una excepción silenciosa a la
regla de la sección 1 de este documento: es una decisión explícita,
registrada aquí, y el contenido no debe tratarse como definitivo hasta
que `academic-workspace` registre un dictamen de QA.

**Inconsistencia detectada y no corregida en la fuente.**
`bloque01_manual_estudiante.md` y `bloque01_actividades.md` (en
`academic-workspace`) enlazan a dos archivos de laboratorio que ya no
existen (`bloque01_lab01_sprint0.md`,
`bloque01_practica01_historias_usuario.md`), reemplazados por los
cuatro laboratorios actuales
(`bloque01_lab01_laravel.md` a `bloque01_lab04_sprint0.md`). Esta
derivación enlaza a los cuatro laboratorios que sí existen; el enlace
roto en la fuente no se corrigió ahí (no es responsabilidad de este
repositorio) y debe reportarse al responsable de `academic-workspace`.

| Archivo fuente (`academic-workspace`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `bloque01/CONTEXTO_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Permanece exclusivamente en el workspace. |
| `bloque01/material/bloque01_manual_estudiante.md` | `student-portal`: `.../bloque-01/index.md` + `.../bloque-01/{01..06}-*.md` | `STUDENT_PUBLIC` | Dividido en una página de introducción y 6 páginas temáticas, siguiendo el patrón de DBA Unidad 1. |
| `bloque01/material/bloque01_presentacion.md` | `student-portal`: `.../bloque-01/presentacion.md` | `STUDENT_PUBLIC` | Convertida de diapositivas Marp a página de documentación condensada; sin información nueva respecto al manual. |
| `bloque01/material/bloque01_actividades.md` | `student-portal`: `.../bloque-01/actividades/actividad-{1..5}.md` (sin "Notas para el docente") | `STUDENT_PUBLIC` (parcial) | Dividido en 5 páginas, una por actividad. |
| `bloque01/material/bloque01_manual_profesor.md` | — (no se deriva) | `TEACHER_RESTRICTED` | Incluye decisiones D-001 a D-005 y notas de validación docente; no corresponde al Student Portal. |
| `bloque01/laboratorios/bloque01_lab01_laravel.md` | `student-portal`: `.../bloque-01/laboratorios/laboratorio-1-laravel-desde-cero.md` | `STUDENT_PUBLIC` | Copia íntegra, sin simplificar pasos, checkpoints ni errores frecuentes. |
| `bloque01/laboratorios/bloque01_lab02_laravel.md` | `student-portal`: `.../bloque-01/laboratorios/laboratorio-2-crud-laravel.md` | `STUDENT_PUBLIC` | Copia íntegra. |
| `bloque01/laboratorios/bloque01_lab03_historias_usuario.md` | `student-portal`: `.../bloque-01/laboratorios/laboratorio-3-historias-de-usuario.md` | `STUDENT_PUBLIC` | Copia íntegra. |
| `bloque01/laboratorios/bloque01_lab04_sprint0.md` | `student-portal`: `.../bloque-01/laboratorios/laboratorio-4-sprint-0.md` | `STUDENT_PUBLIC` | Copia íntegra. |
| `bloque01/referencias/bloque01_materiales_referencias.md` | `student-portal`: `.../bloque-01/referencias/index.md` | `STUDENT_PUBLIC` | Se excluyen las secciones de proceso editorial ("Regla para generación de materiales", "Reglas de mantenimiento") y la ruta interna del PDF del SBOK; se conservan las tablas de fuentes y trazabilidad. |
| `bloque01/referencias/RUTA_LECTURAS_BLOQUE01.md` | `student-portal`: `.../bloque-01/referencias/lecturas-complementarias.md` | `STUDENT_PUBLIC` | Copia adaptada; conserva únicamente URL públicas ya presentes en la fuente. |
| `bloque01/planeacion/PLAN_BLOQUE01.md` | — (no se deriva) | `WORKSPACE_ONLY` | Planeación interna del bloque. |
| `taller-integrador/CONTEXTO_MATERIA.md`, `presentacion/presentacion_materia.md` (extracto) | `student-portal`: `.../taller-integrador/index.md` | `STUDENT_PUBLIC` (extracto) | Solo propósito, organización en bloques y evaluación oficial; el resto de `CONTEXTO_MATERIA.md` permanece `WORKSPACE_ONLY`. |

No se creó una página independiente de "evaluación" a partir de un
archivo fuente 1:1 (no existe un `bloque01_rubrica.md` todavía): la
página `.../bloque-01/evaluacion.md` es nueva, resume criterios
generales de evaluación sin reproducir ninguna rúbrica docente, y no
introduce ningún criterio ausente de `bloque01_actividades.md`.

## 8. Registro de derivación — Lógica de Programación, Unidad I

Fecha de derivación: **2026-09-06**. Fuente: `academic-workspace`,
`materias/logica-programacion/unidad01/` (`CONTEXTO_UNIDAD.md`, secc.
23: `QA editorial: Pendiente`; `QA curricular: Pendiente`;
`Validación académica: Pendiente`; `Publicación definitiva: No
autorizada`). No existe todavía un archivo `AUDITORIA_QA_*.md` para
esta unidad.

**Nota sobre el estado de esta unidad.** Igual que el Bloque I de
Taller Integrador (sección 7 de este documento), esta unidad se deriva
sin haber pasado todavía por ningún ciclo de QA, por decisión directa
del responsable del workspace, siguiendo el mismo precedente sentado
con DBA Unidad 1 (sección 3). Cada página de esta unidad, en este
portal, lleva una insignia visible "Borrador — QA pendiente ·
Publicación no autorizada". Esto no es una excepción silenciosa a la
regla de la sección 1: es una decisión explícita, registrada aquí, y
el contenido no debe tratarse como definitivo hasta que
`academic-workspace` registre un dictamen de QA.

| Archivo fuente (`academic-workspace`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `unidad01/CONTEXTO_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Permanece exclusivamente en el workspace. |
| `unidad01/PLANEACION_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Planeación interna de la unidad. |
| `unidad01/material/unidad01_manual_estudiante.md` | `student-portal`: `.../unidad-01/index.md` + `.../unidad-01/{01..06}-*.md` | `STUDENT_PUBLIC` | Dividido en una página de introducción y 6 páginas temáticas, siguiendo el patrón ya usado en DBA Unidad 1 y Taller Integrador Bloque I. |
| `unidad01/material/unidad01_presentacion.md` | `student-portal`: `.../unidad-01/presentacion.md` | `STUDENT_PUBLIC` | Convertida de diapositivas Marp a página de documentación condensada; sin información nueva respecto al manual. No se copiaron las imágenes (`recursos/imagenes/*.svg`, `*.png`); los diagramas se representan como texto/ASCII. |
| `unidad01/material/unidad01_actividades.md` | `student-portal`: `.../unidad-01/actividades/actividad-{1..6}.md` (sin "Notas para el docente") | `STUDENT_PUBLIC` (parcial) | Dividido en 6 páginas, una por actividad. |
| `unidad01/material/unidad01_manual_profesor.md` | — (no se deriva) | `TEACHER_RESTRICTED` | No corresponde al Student Portal. |
| `unidad01/evaluacion/unidad01_rubrica.md` | — (no se deriva) | `TEACHER_RESTRICTED` | Rúbrica docente completa; se sustituye en el Student Portal por `evaluacion.md`, con criterios generales. |
| `unidad01/referencias/unidad01_materiales_referencias.md` | `student-portal`: `.../unidad-01/referencias/index.md` | `STUDENT_PUBLIC` | Se excluyen las secciones de proceso editorial (checklist de control de calidad, decisión curricular, regla para materiales futuros); se conservan las tablas de fuentes, pertinencia y cobertura temática. |
| `unidad01/referencias/RUTA_LECTURAS_UNIDAD01.md` | `student-portal`: `.../unidad-01/referencias/lecturas-complementarias.md` | `STUDENT_PUBLIC` | Copia adaptada; conserva únicamente las URL públicas ya presentes en la fuente. |
| `logica-programacion/CONTEXTO_MATERIA.md`, `presentacion/presentacion_materia.md` (extracto) | `student-portal`: `.../logica-programacion/index.md` | `STUDENT_PUBLIC` (extracto) | Solo propósito, organización en unidades y evaluación oficial; el resto de `CONTEXTO_MATERIA.md` permanece `WORKSPACE_ONLY`. |

No se creó una página independiente de "laboratorios": esta unidad no
tiene laboratorios en `academic-workspace` (`unidad01/laboratorios/`
está vacío); su componente práctico (Scratch) se cubre dentro de los
temas y actividades correspondientes, igual que en la fuente.

No se creó una página independiente de "evaluación" a partir de un
archivo fuente 1:1: la página `.../unidad-01/evaluacion.md` es nueva,
resume criterios generales de evaluación sin reproducir la rúbrica
docente (`unidad01_rubrica.md`), y no introduce ningún criterio ausente
de `unidad01_actividades.md`.

## 9. Aprobación de publicación — DBA, Taller Integrador y Lógica de Programación

Fecha: **2026-09-06**. El responsable del workspace aprobó, por
instrucción directa en este repositorio, la publicación de todo el
contenido derivado hasta la fecha: DBA (Unidad 1 y Unidad 2), Taller
Integrador de Especialización (Bloque I) y Lógica de Programación y
Pensamiento Computacional (Unidad I).

Como consecuencia:

- Se retiraron todas las insignias `badge-estado` de estado de QA/
  publicación ("Borrador — QA pendiente", "QA requiere nueva
  verificación", "Publicación no autorizada", "QA: aprobado",
  "Validación académica: pendiente") de todas las páginas de las tres
  materias. La insignia "Observacional — no evaluado" de los
  laboratorios opcionales de DBA Unidad 1 se conservó: no describe un
  estado de QA, describe el alcance no evaluado de esos laboratorios.
- Se retiró o reformuló el lenguaje que calificaba contenido de apoyo
  como "no oficial" (por ejemplo, "Contenido de apoyo, no oficial" →
  "Contenido de apoyo"; "competencias... propuestas, no oficiales" →
  redactado sin esa calificación), conservando la distinción funcional
  entre contenido oficial del programa y contenido de apoyo, sin
  presentar este último como no válido o no aprobado.
- Se registra esta aprobación como la decisión que sustituye, para
  efectos de publicación en este portal, el estado de QA pendiente
  documentado en las secciones 3, 7 y 8 de este archivo. Esas
  secciones se conservan sin editar como registro histórico de cómo y
  cuándo se derivó cada unidad; esta sección 9 documenta el cambio de
  estado posterior.

Esta aprobación se realizó directamente sobre `academic-student-portal`
y no queda reflejada automáticamente como un dictamen de QA en
`academic-workspace`: si se corrige o amplía contenido de estas
unidades en el futuro, `academic-workspace` sigue siendo la fuente de
verdad y debe volver a derivarse siguiendo el procedimiento de la
sección 2.

## 10. Registro de derivación y aprobación — Pruebas de Software, Unidad I

Fecha: **2026-09-06**. Fuente: `academic-workspace`,
`materias/pruebas-software/unidad01/` (`CONTEXTO_UNIDAD.md`, secc. 19:
`qa_inicial: PENDIENTE`; `qa_final: PENDIENTE`;
`validacion_academica: PENDIENTE`; `publicacion: NO_AUTORIZADA`). No
existe todavía un archivo `AUDITORIA_QA_*.md` para esta unidad.

Por la misma decisión de aprobación registrada en la sección 9 (el
responsable del workspace instruyó publicar todo el contenido del
portal sin insignias de estado de QA), esta unidad se deriva y publica
en un solo paso, sin pasar por un estado intermedio con insignias de
"Borrador — QA pendiente": ningún archivo de esta derivación incluyó
nunca esas insignias.

| Archivo fuente (`academic-workspace`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `unidad01/CONTEXTO_UNIDAD.md` | — (no se deriva) | `WORKSPACE_ONLY` | Permanece exclusivamente en el workspace. |
| `unidad01/PLANEACION_UNIDAD.md`, `unidad01/planeacion/unidad01_planeacion_clases.md` | — (no se derivan) | `WORKSPACE_ONLY` | Planeación interna de la unidad. |
| `unidad01/material/unidad01_manual_estudiante.md` | `student-portal`: `.../unidad-01/index.md` + `.../unidad-01/{01..06}-*.md` | `STUDENT_PUBLIC` | Dividido en una página de introducción y 6 páginas temáticas, siguiendo el patrón ya usado en las demás materias. |
| `unidad01/material/unidad01_presentacion.md` | `student-portal`: `.../unidad-01/presentacion.md` | `STUDENT_PUBLIC` | Convertida de diapositivas Marp a página de documentación condensada; sin información nueva respecto al manual. |
| `unidad01/material/unidad01_actividades.md` | `student-portal`: `.../unidad-01/actividades/actividad-{1..5}.md` (sin "Notas para el docente") | `STUDENT_PUBLIC` (parcial) | Dividido en 5 páginas, una por actividad. |
| `unidad01/material/unidad01_manual_profesor.md` | — (no se deriva) | `TEACHER_RESTRICTED` | No corresponde al Student Portal. |
| `unidad01/evaluacion/unidad01_rubrica.md` | — (no se deriva) | `TEACHER_RESTRICTED` | Rúbrica docente completa; se sustituye en el Student Portal por `evaluacion.md`, con criterios generales. |
| `unidad01/referencias/unidad01_materiales_referencias.md` | `student-portal`: `.../unidad-01/referencias/index.md` | `STUDENT_PUBLIC` | Se excluye la sección de proceso editorial ("Reglas de mantenimiento"); se conservan las tablas de fuentes, prioridad de lectura y relación con los temas. |
| `pruebas-software/CONTEXTO_MATERIA.md`, `presentacion/presentacion_materia.md` (extracto) | `student-portal`: `.../pruebas-software/index.md` | `STUDENT_PUBLIC` (extracto) | Solo propósito, organización en unidades y evaluación oficial; el resto de `CONTEXTO_MATERIA.md` permanece `WORKSPACE_ONLY`. |

No se creó una página independiente de "laboratorios": esta unidad no
tiene laboratorios en `academic-workspace` (`unidad01/laboratorios/`
está vacío) ni el programa oficial le asigna herramientas de
referencia; es una unidad conceptual, igual que Lógica de Programación
Unidad I.

No se creó una página independiente de "lecturas complementarias":
a diferencia de DBA y Taller Integrador, `academic-workspace` no tiene
un segundo archivo de ruta de lecturas para esta unidad (solo
`unidad01_materiales_referencias.md`), así que no se inventó uno.

No se creó una página independiente de "evaluación" a partir de un
archivo fuente 1:1: la página `.../unidad-01/evaluacion.md` es nueva,
resume criterios generales de evaluación sin reproducir la rúbrica
docente (`unidad01_rubrica.md`), y no introduce ningún criterio
ausente de `unidad01_actividades.md`.
