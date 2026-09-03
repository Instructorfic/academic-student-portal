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
5. Agregar las entradas a `src/config/sidebar.json` (tema DocKit).
6. Agregar una fila a la tabla de registro de derivación (sección 3, o
   una tabla equivalente para la nueva unidad).
7. `npm run build` para validar.
8. Publicar según el flujo de CI del repositorio.

## 7. Registro de derivación — Estándares de desarrollo (Engineering Handbook)

Fecha de derivación: **2026-09-02**. Fuente: `academic-workspace`,
`recursos/estandares/` (recurso transversal, no una materia/unidad).
Dictamen de QA: **`APROBADO_CON_OBSERVACIONES`**
(`recursos/estandares/AUDITORIA_QA_ESTANDARES.md`; observaciones H-01…H-14
resueltas, PEND-EST-01 —edición OWASP— y PEND-EST-02 —Doc. 18— abiertas).
Validación académica: **PENDIENTE** (insignia de estado en cada página).

Destino: nueva sección de primer nivel `src/content/docs/estandares/` del
**Student Portal** (grupo "Estándares de desarrollo" en `src/config/sidebar.json`).
Encuadre neutro: es estándar *de referencia*; su carácter obligatorio por
materia lo define cada `CONTEXTO_MATERIA.md` (H-14 / PEND-EST-03).

| Archivo fuente (`academic-workspace/recursos/estandares/`) | Destino | Audiencia | Notas |
| --- | --- | --- | --- |
| `00`–`13`, `16`, `17` (16 documentos) | `student-portal`: `.../estandares/<slug>.md` | `STUDENT_PUBLIC` | Copia adaptada: se quita el H1 (pasa a `title`), se quita el pie "Fin del documento", las referencias «Doc. NN» se enlazan a las páginas equivalentes del portal. Sin cambios de contenido normativo. |
| `14-MATRIZ-VERIFICACION-Y-CUMPLIMIENTO.md` | — (no se deriva) | `TEACHER_RESTRICTED` | Matriz de auditoría; audiencia docente. Iría al Teacher Portal en una derivación posterior. |
| `15-RUBRICA-EVALUACION.md` | — (no se deriva) | `TEACHER_RESTRICTED` | Rúbrica de evaluación técnica; audiencia docente (precedente D5). |
| `18-AUDITORIA-PROPIA.md` | — (no existe) | `WORKSPACE_ONLY` | Referenciado en el índice pero no entregado (PEND-EST-02). |
| `AUDITORIA_QA_ESTANDARES.md` | — (no se deriva) | `WORKSPACE_ONLY` | QA interno; solo su dictamen resumido se refleja en `estandares/index.md` y en la insignia. |
| `config-examples/` (17 archivos) | `student-portal`: `.../estandares/config-examples.md` | `STUDENT_PUBLIC` | Reunidos en una sola página, cada archivo en un bloque de código con su ruta destino en el repo del proyecto. Las rutas `docs/handbook/…` internas se conservan (se refieren al repo del proyecto del equipo, no al portal). |
| (nuevo, sin fuente 1:1) | `student-portal`: `.../estandares/index.md` | `STUDENT_PUBLIC` | Página de presentación de la sección: estatus, índice y cómo leer las referencias. |

Pendiente antes de considerar esta sección definitiva: cerrar PEND-EST-01…03
en `academic-workspace` y la validación académica humana.
