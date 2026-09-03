# FIC DOCS

Sitio público con los materiales de estudio de las materias de la Facultad
de Informática Culiacán (UAS). Se publica en GitHub Pages. Construido con
**Astro + Starlight**
usando el tema **DocKit** (Themefisher, licencia MIT — ver `LICENSE`),
adaptado a la identidad visual institucional UAS/FIC.

## Tema y personalización

DocKit es Starlight con una capa de Tailwind CSS 4 y *overrides* de
componentes. La personalización de este portal vive en:

- `src/config/theme.json` — paleta (azul UAS `#0a3161`; azul claro
  `#4d7fb3` en modo oscuro) y tipografía institucional (`Segoe UI`).
- `src/config/config.json` — título, texto del logo, pie de página.
- `src/config/menu.en.json` — navegación superior.
- `src/config/sidebar.json` — menú lateral (una entrada por página).
- `src/components/override-components/` — componentes de Starlight
  sobrescritos por DocKit; los ajustes locales (sin Google Fonts, sin
  CTA de marketing, modo claro por defecto, pie institucional) están
  marcados con comentarios.
- `src/styles/global.css` (+ `base/navigation/components/button.css`) —
  estilos del tema.
- `astro-mermaid` renderiza los bloques ` ```mermaid ` como diagramas.

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
src/
├── config/                      # personalización del tema DocKit (ver arriba)
├── components/override-components/  # componentes de Starlight sobrescritos
├── styles/                      # global.css + parciales del tema
├── tailwind-plugin/             # plugins Tailwind de DocKit (colores/grid desde theme.json)
└── content/docs/
    ├── index.md                 # portada del sitio
    ├── materias/
    │   ├── index.md
    │   └── dba/
    │       ├── index.md
    │       └── unidad-01/       # 21 páginas publicadas
    ├── mapa-de-contenido.md     # draft: true (no se publica)
    └── estandares/              # draft: true (Engineering Handbook, no se publica)
```

Las páginas con `draft: true` no entran en el build de producción
(`npm run build`) ni en GitHub Pages; siguen visibles en `npm run dev`
para trabajo interno.

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
4. Registrar las nuevas entradas en `src/config/sidebar.json`.
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
