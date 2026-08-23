# Academic Student Portal

Sitio público (Astro + Starlight) con los materiales del estudiante de
las materias de la Facultad de Informática Culiacán (UAS).

## Propósito

Publicar, para audiencia estudiantil, el subconjunto de material
académico ya producido en `academic-workspace` que es seguro y correcto
compartir públicamente: manuales del estudiante, actividades (sin notas
docentes), presentaciones, referencias y criterios generales de
evaluación.

## Audiencia

Pública. Este repositorio y el sitio que genera no requieren
autenticación.

## Relación con `academic-workspace`

`academic-workspace` (repositorio privado, separado de este) es la
**única fuente de verdad académica**. Este portal es un **derivado**:
contiene copias filtradas y adaptadas de contenido ya aprobado en el
workspace, nunca contenido editado directamente aquí.

```text
academic-workspace  →  derivación (manual-asistida)  →  este repositorio
```

Ver `docs/ARQUITECTURA.md` para el modelo completo y `docs/PUBLICACION.md`
para el procedimiento operativo.

## Estructura

```text
src/content/docs/
├── index.md                     # portada del portal
├── materias/
│   ├── index.md                 # listado de materias publicadas / en preparación
│   └── dba/
│       ├── index.md             # presentación pública de la materia
│       └── unidad-02/           # unidad piloto
│           ├── index.md
│           ├── presentacion.md
│           ├── manual-estudiante.md
│           ├── actividades.md
│           ├── evaluacion.md
│           └── referencias.md
```

Cada materia nueva se agrega como un subdirectorio de
`src/content/docs/materias/<materia>/`, y cada unidad como
`unidad-NN/` dentro de esa materia. No es necesario crear un repositorio
ni una configuración nueva por materia.

## Qué NO debe almacenarse aquí

- Contenido editado directamente (todo cambio de contenido se hace en
  `academic-workspace` y se vuelve a derivar).
- `CONTEXTO_MATERIA.md` / `CONTEXTO_UNIDAD.md` completos.
- Rúbricas docentes completas, ponderaciones internas, respuestas
  resueltas, notas de planeación o de proceso interno.
- Contenido no aprobado por QA presentado como definitivo.

## Cómo agregar una nueva materia

1. Confirmar en `academic-workspace` que la materia tiene al menos una
   unidad con dictamen de QA `APROBADO`.
2. Crear `src/content/docs/materias/<materia>/index.md` con una
   presentación pública breve (sin copiar `CONTEXTO_MATERIA.md`
   completo).
3. Derivar la(s) unidad(es) aprobadas siguiendo `docs/PUBLICACION.md`.
4. Registrar las nuevas entradas en el `sidebar` de `astro.config.mjs`.
5. Ejecutar `npm run build` para validar, y actualizar
   `src/content/docs/materias/index.md`.

## Cómo agregar una nueva unidad

Igual que una materia nueva, pero dentro del directorio de la materia ya
existente: crear `unidad-NN/`, derivar el contenido aprobado
correspondiente, y agregar las entradas al `sidebar`.

## Cómo actualizar contenido

1. Corregir la fuente en `academic-workspace`.
2. Repetir la derivación del archivo afectado (ver `docs/PUBLICACION.md`).
3. Ejecutar `npm run build` y verificar antes de publicar.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
```
