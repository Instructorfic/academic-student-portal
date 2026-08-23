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

## 3. Registro de derivación — DBA Unidad 2 (piloto)

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

## 4. Hosting y CI/CD

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

## 5. Cómo se agrega una materia nueva (resumen operativo)

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
