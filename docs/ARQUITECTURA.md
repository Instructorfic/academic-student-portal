# Arquitectura de publicación académica

## Modelo general

```text
academic-workspace  (privado — única fuente de verdad académica)
        │
        │  derivación controlada / manual-asistida
        ▼
   ┌─────────────────────┬──────────────────────┐
   │                      │                      │
   ▼                      ▼
academic-student-portal   academic-teacher-portal
(público)                 (restringido, requiere auth)
```

Tres repositorios, tres responsabilidades:

| Repositorio | Visibilidad | Contenido |
| --- | --- | --- |
| `academic-workspace` | Privado | Diseño, producción, QA y todo el proceso editorial. Fuente de verdad. |
| `academic-student-portal` | Público | Subconjunto `STUDENT_PUBLIC` del contenido ya aprobado. |
| `academic-teacher-portal` | Restringido | Subconjunto `STUDENT_PUBLIC` + `TEACHER_RESTRICTED`. Nunca `WORKSPACE_ONLY`. |

No existe un repositorio por materia ni por unidad. Ambos portales
soportan múltiples materias mediante una única estructura de contenido
(`src/content/docs/materias/<materia>/unidad-NN/`).

## Por qué dos portales y no uno con roles

La decisión (D1, aprobada) es mantener el Teacher Portal como un sitio
completamente separado, no como una sección con roles dentro del
Student Portal:

- Evita que una falla de autorización en una sola aplicación exponga
  material docente al público.
- Permite aplicar hosting y control de acceso distintos a cada uno sin
  acoplar su infraestructura.
- Hace visualmente imposible confundir "estoy viendo el sitio público"
  con "estoy viendo el sitio restringido" (paleta y banda de banner
  distintas — ver `academic-teacher-portal/src/components/Header.astro`).

## Clasificación de contenido

Toda derivación clasifica cada archivo fuente en una de tres categorías
antes de copiarlo (ver `docs/PUBLICACION.md` para el detalle operativo):

- **`WORKSPACE_ONLY`** — nunca sale de `academic-workspace`:
  `CONTEXTO_MATERIA.md`/`CONTEXTO_UNIDAD.md` completos, decisiones
  (`DEC-XXX`), pendientes (`PEND-XXX`), auditorías, QA interno, matrices
  de uniformidad, notas de producción, borradores no aprobados.
- **`STUDENT_PUBLIC`** — va a ambos portales: presentación, manual del
  estudiante, actividades (sin notas docentes), laboratorios,
  referencias, criterios generales de evaluación.
- **`TEACHER_RESTRICTED`** — va solo al Teacher Portal: manual del
  profesor, planeación de clases, rúbricas completas, respuestas
  esperadas, ejemplos resueltos, errores frecuentes, recomendaciones de
  impartición.

## Versionado: contenido estable vs. oferta de cohorte

Se distinguen dos cosas que antes vivían mezcladas en un mismo
documento:

1. **Contenido estable de la materia** — objetivos, temas, actividades,
   evidencias, rúbrica. No cambia entre cohortes.
2. **Oferta de una cohorte/semestre concreto** — fechas de sesión,
   calendario, exclusiones de día. Cambia en cada oferta.

En el Teacher Portal, `planeacion-clases.md` lleva una nota explícita al
inicio indicando que sus fechas corresponden a una cohorte concreta y
deben regenerarse en cada nueva oferta, para que esas fechas nunca se
lean como contenido permanente de la unidad. No se implementa todavía
un sistema histórico de versiones por cohorte: eso queda fuera de esta
fase (ver sección "No sobrediseñar" más abajo).

## Regla fuente → derivado

`academic-workspace` es la única fuente de verdad académica. Ningún
portal se edita directamente para corregir contenido:

1. Corregir en `academic-workspace`.
2. Volver a derivar el archivo afectado (`docs/PUBLICACION.md`).
3. Reconstruir el portal (`npm run build`) y publicar.

## Seguridad del Teacher Portal

El Teacher Portal requiere **autenticación/control de acceso en la capa
de hosting**. No se implementa autenticación propia en esta fase (no
sobrediseñar). Explícitamente, no son mecanismos de seguridad válidos:

- Omitir el sitio de un índice o `sitemap.xml`.
- `robots.txt`.
- Una URL "no publicitada" u oculta.

Ver `docs/PUBLICACION.md`, sección "Hosting y CI/CD", para las opciones
compatibles con Astro/Starlight estático.

## Qué no se implementa en esta fase (deliberado)

Por decisión explícita de alcance, no se construye todavía: CMS, base de
datos, API/backend propio, sincronización automática compleja,
autenticación propia, panel administrativo, editor web, ni
automatización avanzada de IA para la derivación. Markdown + Git + Astro
+ Starlight + GitHub Actions es suficiente para esta fase.

## Piloto

El primer contenido derivado con esta arquitectura fue **DBA — Unidad
2**, seleccionada por ser la primera unidad con dictamen de QA
`APROBADO` en `academic-workspace`
(`materias/dba/unidad02/AUDITORIA_QA_MATERIALES_U2.md`). La validación
académica humana de esa unidad permanece pendiente; eso no bloquea el
piloto técnico de infraestructura, pero sí implica que su contenido debe
tratarse como borrador pedagógicamente aprobado, no como definitivo
institucional.

Posteriormente se derivó también **DBA — Unidad 1**, con un estado de
QA/publicación explícitamente distinto y menos avanzado
(`qa_final: REQUIERE_NUEVA_VERIFICACIÓN`, `publicacion: NO_AUTORIZADA`
en `CONTEXTO_UNIDAD.md`, secc. 22), por decisión directa documentada en
el historial de derivación (`docs/PUBLICACION.md`, secc. 3). Esto
demuestra que la arquitectura de publicación **no asume automáticamente
que "derivado" significa "aprobado"**: cada unidad conserva y expone su
propio estado de QA independientemente de las demás, mediante la
insignia visible en cada página de unidad. La calendarización de
sesiones (planeación de clases) es un eje independiente del estado de
QA de contenido y puede estar cerrada aunque el contenido no lo esté.
