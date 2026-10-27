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

## 11. Nueva derivación — Pruebas de Software, Unidad II

Fecha: **2026-09-27**. Fuente: `academic-workspace`,
`materias/pruebas-software/unidad02/` (laboratorios v1.1,
`PROYECTOS_BASE.md` v2.0 y `FORMATO_MATRIZ_TRAZABILIDAD.md` v2.0, estado
OFICIAL en la fuente; resto de materiales BORRADOR con QA
`APROBADO_CON_OBSERVACIONES` del 2026-09-22, anterior a la actualización
de los laboratorios). Publicación por instrucción directa del
responsable académico.

Antes de derivar se resolvió en el workspace la decisión **D-006**
(`CONTEXTO_UNIDAD.md` §16): cada equipo trabaja sobre un proyecto base
asignado por el docente, no sobre un sistema propio elegido en la Unidad
I. Manual del estudiante, presentación y contexto se alinearon con esa
decisión antes de derivar.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `PROYECTOS_BASE.md` | `.../unidad-02/proyectos-base.md` | Nuevo. Versión completa, redactada para el estudiante. |
| `FORMATO_MATRIZ_TRAZABILIDAD.md` | `.../unidad-02/formato-matriz-trazabilidad.md` | Nuevo. Versión completa; plantilla vacía reconstruida con sus 11 columnas. |
| `laboratorios/unidad02_lab01…lab03` | `.../unidad-02/laboratorios/laboratorio-{1,2,3}-*.md` | Sustituyen a la derivación anterior. Versión completa. |
| `material/unidad02_presentacion.md` | `.../unidad-02/presentacion.md` | Versión completa (no condensada), convertida de Marp; estilos en `custom.css` §30. |
| `laboratorios/unidad02_lab03` §31 | `.../unidad-02/evaluacion.md` | Nuevo. Evaluación de cierre 50 % teórica / 50 % práctica. |
| `material/unidad02_manual_estudiante.md` | `index.md` y temas `01`–`06` | Se ajustaron las menciones al sistema propio, los mínimos de cada laboratorio y las rutas del repositorio. |

## 12. Derivación — Lógica de Programación, Unidad III

Fecha: **2026-09-27**. Fuente: `academic-workspace`,
`materias/logica-programacion/unidad03/`. La presentación tiene estado
APROBADO por el responsable académico (D-016); el resto de los
materiales se publica en BORRADOR por instrucción directa del
responsable académico.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `material/unidad03_presentacion.md` | `.../unidad-03/presentacion.md` | Versión completa, convertida de Marp. Imágenes en `public/imagenes/logica-programacion/unidad-03/`. |
| `material/especificacion-diagramas-flujo.md` | `.../unidad-03/especificacion-diagramas-flujo.md` | Sin notas de verificación interna, decisiones ni registro de cambios. |
| `material/traduccion-a-pseint.md` | `.../unidad-03/traduccion-a-pseint.md` | Sin identificadores de decisiones ni registro de cambios. |
| `banco-ejercicios/ejercicios/*` (25 fichas) | `.../unidad-03/banco-ejercicios/*.md` (8 páginas por tema + índice) | Solo enunciado, instrucciones, casos de prueba, evidencia y criterios. Se excluyen códigos U3-XXX, niveles, estado, análisis ya resueltos y criterios que revelaban la respuesta. |
| `plantillas/*` (8 instrumentos) | `.../unidad-03/plantillas/*.md` + índice | `actividad-banco.md` no se deriva (plantilla interna del banco). |
| `CONTEXTO_UNIDAD.md` §1, §4, §5, §7 (extracto) | `.../unidad-03/index.md` | Identificación, RA, contenidos y alcance. |

No se derivan: `unidad03_solucionario_profesor.md` (TEACHER_RESTRICTED),
`AUDITORIA_QA_MATERIALES_U3.md`, `CONTEXTO_UNIDAD.md`,
`planeacion/`, `banco-ejercicios/{README,matriz-ejercicios,niveles,taxonomia,instrumentos,actividades}.md`
(WORKSPACE_ONLY). Tampoco se derivaron, por no estar en la solicitud,
`unidad03_especificacion_pseudocodigo.md`, `unidad03_glosario_terminos.md`
ni las hojas de `tareas/`.

## 13. Referencias de DBA — Unidad 2 y materia

Fecha: **2026-09-27**. Publicación por instrucción directa del
responsable académico.

| Archivo fuente (`academic-workspace`) | Destino | Notas |
| --- | --- | --- |
| `dba/unidad02/referencias/unidad02_materiales_referencias.md` | `.../dba/unidad-02/referencias/index.md` | Versión completa (sustituye la resumida). Se excluyen "Notas de uso" y "Pendientes" (WORKSPACE_ONLY). Los códigos OE/C se sustituyen por enlaces a los temas. |
| `dba/unidad02/referencias/unidad02_lecturas_complementarias.md` | `.../dba/unidad-02/referencias/lecturas-complementarias.md` | Versión completa por tema. Se agrega REF-U2-14 (NIST SP 800-188), ya verificada en las referencias de la unidad. |
| `dba/referencias/ postgresql-dba.md` | `.../dba/referencias/postgresql-dba.md` | Nueva. Emojis de advertencia sustituidos por "Precaución". |
| `dba/referencias/mongodb-dba.md` | `.../dba/referencias/mongodb-dba.md` | Nueva. |
| `dba/referencias/glosario.md` | `.../dba/referencias/glosario.md` | Nueva. Sigla corregida en la fuente: LFPDPPSO → LGPDPPSO. |

## 14. Nueva derivación — DBA Unidad 2, laboratorios y presentación

Fecha: **2026-10-06**. Fuente: `academic-workspace`,
`materias/dba/unidad02/` (commit `0cd9342`). Publicación por instrucción
directa del responsable académico: tomar estrictamente los laboratorios
que existen en el workspace y sustituir con ellos los del portal. Los
laboratorios nuevos no tienen todavía registro en `CONTEXTO_UNIDAD.md`
ni dictamen de QA en `AUDITORIA_QA_MATERIALES_U2.md`.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `laboratorios/unidad02_lab01_protección y privacidad de datos.md` | `.../unidad-02/laboratorios/laboratorio-1-proteccion-y-privacidad-de-datos.md` | Nuevo. Copia íntegra. Sustituye a `laboratorio-1-inyeccion-sql-nosql.md` (eliminado). |
| `laboratorios/unidad02_lab02_cifrado, credenciales y comunicaciones seguras.md` (versión del 2026-10-06) | `.../unidad-02/laboratorios/laboratorio-2-cifrado-credenciales-y-comunicaciones-seguras.md` | Nuevo. Copia íntegra. Sustituye a `laboratorio-2-control-de-acceso.md` (eliminado), derivado de la versión anterior del mismo archivo, que aún contenía el laboratorio de control de acceso. |
| `laboratorios/unidad02_lab03_privacidad, cumplimiento y gobierno de los datos.md` | `.../unidad-02/laboratorios/laboratorio-3-privacidad-cumplimiento-y-gobierno-de-los-datos.md` | Nuevo. Copia íntegra. Sustituye a `laboratorio-3-proteccion-de-datos-y-cifrado.md` (eliminado). |
| `laboratorios/unidad02_lab04_hardening_servidor_bases_datos.md` | `.../unidad-02/laboratorios/laboratorio-4-hardening.md` | Copia íntegra de la nueva versión (solo PostgreSQL). |
| `material/unidad02_presentacion.md` (v5) | `.../unidad-02/presentacion.md` | Versión completa (no condensada), convertida de Marp. Imagen en `public/imagenes/dba/unidad-02/`. |

Los enlaces de otras páginas de la unidad (`index.md`, temas 1, 3 y 4,
actividades 2, 4 y 5, lecturas complementarias) que apuntaban a los
laboratorios eliminados se reapuntaron por tema: la práctica de inyección
remite al repositorio de laboratorios de la materia (como lo hace la
presentación v5), la protección de datos al Laboratorio 1 y la privacidad
al Laboratorio 3 y el cifrado (tema 4, Actividad 5) al Laboratorio 2. Las
referencias al antiguo laboratorio de control de acceso (tema 2,
Actividad 3, lecturas complementarias) se retiraron: ya no existe un
laboratorio de control de acceso en la fuente.

**Inconsistencias detectadas y no corregidas en la fuente.**

- La Actividad 3 (matriz de usuarios, roles y permisos, primera mitad
  de la evidencia oficial) se quedó sin laboratorio de apoyo.
- `unidad02_manual_estudiante.md`, `unidad02_actividades.md` y
  `CONTEXTO_UNIDAD.md` siguen describiendo la secuencia anterior de
  laboratorios.

## 15. Ajuste directo en el portal — DBA Unidad 2, temas y actividades

Fecha: **2026-10-06**. Decisión explícita del responsable académico:
ajustar los temas y las actividades de la Unidad 2 **directamente en
este portal**, tomando como base la presentación v5
(`material/unidad02_presentacion.md`), y adoptar las actividades que
propone la presentación en lugar de las Actividades 1 a 8 anteriores.

**Esto es una excepción a la regla de la sección 2.** Las páginas de
temas y actividades ya no se derivan de `unidad02_manual_estudiante.md`
ni de `unidad02_actividades.md`, que en `academic-workspace` siguen
describiendo la versión anterior. Si en el futuro se vuelve a derivar la
unidad desde el workspace, el manual y las actividades deben
actualizarse antes en la fuente, o se perderán estos ajustes.

| Página | Ajuste |
| --- | --- |
| `actividades/actividad-1.md` a `actividad-8.md` | Sustituidas por las 8 actividades de la presentación: Diagnóstico, Inyección, Matriz de roles, Protección de datos (2.3), Protección criptográfica (2.4), De requisito de privacidad a control técnico (2.5), Reducción de superficie de ataque (2.6) y Evaluación de seguridad (actividad integral). Cada una enlaza a su tema y a su laboratorio. Se retiró la sección "Criterio de logro", que la presentación no define. |
| `01-…`, `02-…` | Sin cambios de contenido (ya coincidían con la presentación); solo el recuadro de actividad. |
| `03-proteccion-de-datos-sensibles.md` | Se agregan clasificación organizacional, por qué clasificar, datos personales frente a sensibles, decisiones del DBA, cuándo enmascarar, retención y eliminación segura. Se conserva la clasificación jurídica (LFPDPPP) y los ejemplos guiados. |
| `04-cifrado-en-transito-y-en-reposo.md` | Título cambiado a "4. Cifrado y protección técnica" (la ruta se conserva). Se agregan TLS en bases de datos, cifrado frente a hashing, almacenamiento de contraseñas, credenciales expuestas, respuesta ante una credencial expuesta, gestión y ciclo de vida de llaves. |
| `05-privacidad-y-cumplimiento-normativo.md` | Se agregan seguridad frente a privacidad, aviso de privacidad, consentimiento y finalidad, minimización, trazabilidad del tratamiento y base de datos y privacidad. |
| `06-hardening-servidor-bases-datos.md` | Reorganizado según la presentación: capas, superficie de ataque, instalación funcional frente a segura, cuentas y servicios innecesarios, separación de ambientes, rutas habituales, referencia rápida, respaldos, acceso administrativo, allowlists, exposición pública, diagnóstico por capas, línea base verificable, documentación de cambios, deriva de configuración, parches, defensa en profundidad y metodología. |
| `07-cierre-y-autoevaluacion.md` | Se agregan el resultado esperado y la pregunta de cierre de la presentación. |
| `index.md`, `evaluacion.md`, `astro.config.mjs`, lecturas complementarias | Navegación, nombres de actividades y criterios generales alineados con lo anterior. |

**Contradicción registrada, no resuelta.** El programa oficial fija
como evidencia de la unidad la "Matriz de usuarios, roles, permisos y
controles de privacidad". La actividad integral de la presentación
("Evaluación de seguridad") no menciona esa matriz. Para no contradecir
el programa, la Actividad 8 pide incluir la matriz dentro del documento
de hallazgos. Esta integración es una decisión de redacción en el
portal, no un contenido de la presentación, y debe confirmarse por el
responsable académico.

## 16. Derivación — DBA Unidad 3, presentación y laboratorios

Fecha: **2026-10-26**. Fuente: `academic-workspace`,
`materias/dba/unidad03/` (commit `a3617d4`). Publicación por instrucción
directa del responsable académico: publicar la presentación y los
laboratorios de la unidad. Dictamen técnico en
`AUDITORIA_QA_MATERIALES_U3.md`: `APROBADO_CON_OBSERVACIONES`; la
validación académica sigue pendiente. Siguiendo la sección 9, no se
agregan insignias de estado.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `material/unidad03_presentacion.md` (v4) | `.../unidad-03/presentacion.md` + `.../unidad-03/{01..08}-*.md` | Convertida de Marp y separada por tema, a solicitud del responsable académico, para que cada sección tenga su propia página como en las Unidades 1 y 2. `presentacion.md` conserva solo la apertura (objetivos, caso, pregunta, Actividad 1 y preparación con `psql`) y la lista de temas. Cada lámina de sección se vuelve una página (`01-auditoria-de-bases-de-datos` a `08-cierre-de-la-unidad`) y cada lámina interna un encabezado `##` sin el prefijo de tema. Se retiran el frontmatter Marp, los comentarios internos y la portada. Se agregan, como navegación, la línea "Temas del programa", la sección "Qué sigue" y el recuadro "Relación con el laboratorio" en los temas 2, 5, 6 y 7, según los temas que declara cada laboratorio; los temas 3 y 4 ya traían esa relación en la fuente. |
| `laboratorios/unidad03_lab01_bitacoras_auditoria_postgresql.md` | `.../unidad-03/laboratorios/laboratorio-1-bitacoras-y-auditoria-del-dato-postgresql.md` | Copia íntegra. Se retiran el bloque YAML de metadatos internos y las referencias a `CONTEXTO_UNIDAD.md`, a la decisión D-004 y a `unidad03_rubrica.md`. |
| `laboratorios/unidad03_lab02_trazabilidad_mongodb.md` | `.../unidad-03/laboratorios/laboratorio-2-trazabilidad-mongodb.md` | Copia íntegra. Se retira el bloque YAML de metadatos internos. |
| `laboratorios/unidad03_lab03_politicas_gobierno_evidencias.md` | `.../unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias.md` | Copia íntegra. Se retiran el bloque YAML, la referencia a `unidad03_rubrica.md` y las marcas `PENDIENTE DE VERIFICACIÓN` (la ponderación se remite al docente). |
| `CONTEXTO_UNIDAD.md` §1, §3, §16 (extracto) y presentación | `.../unidad-03/index.md` | Identificación, propósito, problema, navegación y evidencia oficial. |

No se derivan, por no estar en la solicitud: `unidad03_manual_estudiante.md`,
`unidad03_actividades.md` y `referencias/`. Tampoco
`planeacion/`, `evaluacion/unidad03_rubrica.md` (TEACHER_RESTRICTED),
`CONTEXTO_UNIDAD.md` ni `AUDITORIA_QA_MATERIALES_U3.md` (WORKSPACE_ONLY).
Las páginas de temas se derivan de la presentación, no del manual del
estudiante. Si después se deriva el manual, deben conciliarse. La unidad
no tiene todavía páginas de actividades, evaluación ni referencias en
este portal.

## 17. Derivación — Pruebas de Software, Unidad III

Fecha: **2026-10-26**. Fuente: `academic-workspace`,
`materias/pruebas-software/unidad03/` (commit `a3617d4`). Publicación por
instrucción directa del responsable académico: publicar la presentación
y los laboratorios, con la presentación separada por temas. En la fuente,
los materiales están en `BORRADOR`, `CONTEXTO_UNIDAD.md` §19 registra
`qa_inicial` y `qa_final` como `PENDIENTE` y no existe todavía un
`AUDITORIA_QA_*.md`. Siguiendo la sección 9, no se agregan insignias de
estado.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `material/unidad03_presentacion.md` (v2.0) | `.../unidad-03/presentacion.md` + `.../unidad-03/{01..08}-*.md` | Convertida de Marp y separada por bloque: la apertura queda en `presentacion.md` con la lista de temas, cada bloque (1 a 7) es un tema y las láminas finales de Bloque 7 ("Cierre — volviendo al SPB" en adelante) forman `08-cierre-y-resumen`. Se agregan como navegación la línea "Temas del programa" y "Qué sigue". Se retiran el frontmatter Marp, los comentarios internos, la portada, la mención de la decisión D-005 y la ruta interna de la ficha de referencias. La mención a la rúbrica remite al docente. Imágenes copiadas a `public/imagenes/pruebas-software/unidad-03/`. |
| `laboratorios/unidad03_lab01_tecnicas_caja_negra.md` | `.../unidad-03/laboratorios/laboratorio-1-tecnicas-caja-negra.md` | Copia íntegra salvo las adaptaciones descritas abajo. |
| `laboratorios/unidad03_lab02_caja_blanca_rutas.md` | `.../unidad-03/laboratorios/laboratorio-2-caja-blanca-rutas.md` | Ídem. |
| `laboratorios/unidad03_lab03_plan_pruebas_proyecto.md` | `.../unidad-03/laboratorios/laboratorio-3-plan-de-pruebas.md` | Ídem. Las menciones a la decisión D-002 se sustituyen por "la ponderación la confirmará tu docente". |
| `FORMATO_PLAN_PRUEBAS.md` (v1.0) | `.../unidad-03/formato-plan-pruebas.md` | Nuevo. Se publica porque los tres laboratorios lo usan como formato obligatorio, igual que el formato de la matriz en la Unidad II. Se retiran el bloque YAML y el pie de fuentes internas. |
| `CONTEXTO_UNIDAD.md` §1, §3 y presentación (extracto) | `.../unidad-03/index.md` | Identificación, propósito, RA3.1 a RA3.4, pregunta orientadora, ruta de estudio y evidencia oficial. |

Adaptaciones comunes a los laboratorios y al formato: se retiran el
bloque YAML de metadatos; `PROYECTOS_BASE.md` y
`FORMATO_MATRIZ_TRAZABILIDAD.md` enlazan a sus páginas de la Unidad II
(la numeración de secciones coincide); los enlaces a la rúbrica docente
se sustituyen por "rúbrica de la unidad" sin enlace; se retira la ruta
interna de las fichas de referencias; `PENDIENTE DE VERIFICACIÓN` se
conserva en minúsculas.

**Inconsistencia registrada, no resuelta.** Los laboratorios remiten
unas 40 veces a secciones del manual del estudiante (§4 a §11), que no se
publica. Por decisión del responsable académico, las páginas de temas se
derivan de la presentación y cada referencia "manual §N" se sustituye
por un enlace al tema equivalente (§5 → tema 1 … §11 → tema 7; §4 →
"Antes de empezar" en la presentación; Unidad I §8.4 y §9.2 → sus
páginas). Parte de lo que piden los laboratorios solo está desarrollado
en el manual (por ejemplo, la comprobación del número de reglas de una
tabla de decisión, la regla del "conjunto de valores" o las familias de
criterios de salida), así que el tema enlazado puede no contener ese
detalle. Si se publica el manual, deben sustituirse estos enlaces.

No se derivan: `unidad03_manual_estudiante.md`, `unidad03_actividades.md`
y `referencias/` (fuera de la solicitud); `unidad03_manual_profesor.md` y
`evaluacion/unidad03_rubrica.md` (TEACHER_RESTRICTED); `CONTEXTO_UNIDAD.md`,
`PLANEACION_UNIDAD.md` y `planeacion/` (WORKSPACE_ONLY).

## 18. Derivación — Taller Integrador, Bloques III y IV

Fecha: **2026-10-26**. Fuente: `academic-workspace`,
`materias/taller-integrador/bloque03/` y `bloque04/` (commit `a3617d4`).
Publicación por instrucción directa del responsable académico: publicar
las presentaciones y los laboratorios de ambos bloques, con la
presentación separada por temas, igual que DBA U3 y Pruebas de Software
U3. Todos los archivos fuente están en `BORRADOR` y declaran
`qa: PENDIENTE`; no existe `AUDITORIA_QA_*.md` para estos bloques.
Siguiendo la sección 9, no se agregan insignias de estado.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `bloque03/material/bloque03_presentacion.md` (v2) | `.../bloque-03/presentacion.md` + `.../bloque-03/{01..09}-*.md` | Convertida de Marp y separada por lámina de sección. La apertura y "Un defecto que nadie vio" quedan en `presentacion.md`. Cada sección (3.2, 3.1, 3.1.3, 3.3, Datos de prueba, 3.4, 3.4.3, 3.5) es un tema, en el orden de la fuente. Las láminas desde "Scrum en este bloque" y "Siguiente bloque" forman `09-cierre-y-resumen`. Se retira la mención a D-008. |
| `bloque04/material/bloque04_presentacion.md` | `.../bloque-04/presentacion.md` + `.../bloque-04/{01..14}-*.md` | Ídem. Los títulos de lámina `#` se bajan un nivel. "Regresemos a Docker" se agrega como sección al final del tema 6. Las cuatro secciones finales (Comprueba tu comprensión, El mapa completo, La idea central y Fin del bloque conceptual) forman `14-cierre-y-autoevaluacion`. |
| `bloque03/laboratorios/bloque03_lab01` a `lab05` | `.../bloque-03/laboratorios/laboratorio-{1..5}-*.md` | Copia íntegra salvo las adaptaciones descritas abajo. |
| `bloque04/laboratorios/bloque04_lab01` a `lab05` | `.../bloque-04/laboratorios/laboratorio-{1..5}-*.md` | Ídem. |
| `bloque04/material/bloque04_guia_fundamentos_contenedores.md` | `.../bloque-04/guia-fundamentos-contenedores.md` | Nuevo. Se publica porque el Laboratorio 1 pide leer sus secciones G1 a G4 y hacer sus experimentos. Las citas `[Txx]` remiten a su propia sección G16. |
| Manuales del estudiante §1 a §3 (extracto) | `.../bloque-03/index.md`, `.../bloque-04/index.md` | Identificación, RA, problema del bloque y ruta de estudio. |

En cada tema se agregan, como navegación, la línea "Temas del programa"
(cuando la sección corresponde a un contenido numerado del programa),
"Relación con el laboratorio" según los contenidos que declara cada
laboratorio y "Qué sigue". La presentación del Bloque III, por criterio
de su versión 2, no menciona los laboratorios; el portal agrega esos
enlaces solo como navegación.

Adaptaciones en laboratorios y guía: se retiran el título, el subtítulo
de bloque y el bloque YAML; los encabezados `#` bajan un nivel; se
retiran las referencias a `CONTEXTO_UNIDAD.md`, a las decisiones,
hallazgos y riesgos (D-, H-, R-) y a
`PLAN_ACTIVIDADES_Y_PROYECTO_INTEGRADOR.md`, reescribiendo la frase sin
cambiar la instrucción; `bloque01_lab02_laravel.md` enlaza al
Laboratorio 2 del Bloque I; `PENDIENTE DE VERIFICACIÓN` se conserva en
minúsculas.

**Inconsistencias registradas, no resueltas.**

- Los laboratorios remiten unas 50 veces al manual del estudiante, que no
  se publica (la mayoría en el Bloque IV). Cada "manual §N" se sustituye
  por un enlace al tema equivalente de la presentación: en el Bloque III,
  §5 → temas 2 y 3, §6 → 1, §7 → 4 y 5, §8 → 6 y 7, §9 → 8; en el
  Bloque IV, §5 → 1 y 2, §6 → 3, §7 → 4, §8 a §10 → 8 (§9.5 → 10),
  §11 y §12 → 9, §13, §14 y §18 → 11, §15 a §17 → 12. La presentación
  del Bloque IV es conceptual y no desarrolla HTTPS con Caddy, k6, la ley
  de Little ni los niveles de afirmación de capacidad, que los
  Laboratorios 4 y 5 dan por estudiados en el manual. El tema enlazado
  puede no contener ese detalle.
- Los laboratorios citan los estándares del proyecto
  (`02-ESTANDAR-BACKEND-LARAVEL.md`, `08-ESTANDAR-PRUEBAS.md`,
  `STD-TEST`, etc.), que viven en `academic-workspace/recursos/estandares/`
  y no se publican en este portal. Las citas se conservan sin enlace.

No se derivan: manuales del estudiante, actividades, `bloque04_referencia_rapida.md`
y `referencias/` (fuera de la solicitud); manuales del profesor,
`evaluacion/` (TEACHER_RESTRICTED); `CONTEXTO_UNIDAD.md` (WORKSPACE_ONLY).

## 19. Derivación — Estándares de desarrollo (Engineering Handbook)

Fecha: **2026-10-26**. Fuente: `academic-workspace`, `recursos/estandares/`
(commit `a3617d4`). Publicación por instrucción directa del responsable
académico. Dictamen en `AUDITORIA_QA_ESTANDARES.md`:
`APROBADO_CON_OBSERVACIONES`, validación académica `PENDIENTE`. La
auditoría recomienda derivar solo el subconjunto `STUDENT_PUBLIC`
(Docs 00–13, 16, 17 y `config-examples/`) y no derivar los Docs 14 y 15
(audiencia docente); esta derivación sigue esa recomendación. Siguiendo
la sección 9, no se agregan insignias de estado.

Es un recurso transversal, así que se publica fuera de `materias/`, en
una sección "Recursos" del menú principal.

| Archivo fuente | Destino | Notas |
| --- | --- | --- |
| `README.md` | `src/content/docs/recursos/estandares/index.md` | Adaptado para estudiantes. Se retiran la audiencia docente (auditoría y calificación), la nota sobre el documento 18 y la descripción de directorios del workspace. |
| `00-…md` a `13-…md`, `16-…md`, `17-…md` | `.../recursos/estandares/<nombre-en-minúsculas>.md` | Copia íntegra. El título del documento pasa al frontmatter. Las menciones `NN-NOMBRE.md` y los pies "Continúa en…" enlazan a la página publicada. En Doc 00, las filas 14 y 15 se marcan como instrumentos docentes no publicados y la fila 18 ya no remite a la auditoría. El pie de Doc 13 continúa en Doc 16. El pie de Doc 17 ya no remite a la auditoría. |
| `config-examples/` (17 archivos) | `.../recursos/estandares/config-examples.md` | Una sola página con cada archivo en un bloque de código copiable, y la nota del README sobre las rutas `docs/handbook/`. |
| `14-MATRIZ-…md`, `15-RUBRICA-…md` | — (no se derivan) | `TEACHER_RESTRICTED`. |
| `AUDITORIA_QA_ESTANDARES.md` | — (no se deriva) | `WORKSPACE_ONLY`. |

Cambios en otras páginas del portal: las citas `NN-ESTANDAR-….md` de los
laboratorios de Taller Integrador (Bloques III y IV) ahora enlazan al
documento publicado, lo que resuelve la segunda inconsistencia registrada
en la sección 18. La portada (`index.md`) lista las unidades publicadas
hasta hoy y enlaza a los estándares.

**Inconsistencia registrada, no resuelta.** El Doc 09 (Seguridad) se
alinea con el OWASP Top 10:2021 y conserva su nota de verificación
pendiente (PEND-EST-01). El Laboratorio 4 y el tema 7 del Bloque III de
Taller Integrador ya usan la edición 2025 y lo señalan.
