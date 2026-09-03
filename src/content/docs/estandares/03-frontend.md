---
title: "DOC-03 · Estándar de desarrollo frontend"
description: "Estructura y estilo del frontend en HTML5/CSS3/JavaScript ES6+ y la decisión sobre React."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-FE |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead Frontend / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Definir cómo se estructura y escribe el frontend en HTML5/CSS3/JavaScript ES6+, y resolver formalmente la pregunta de si usar React.

## 2. Decisión sobre React

**Recomendación: Opción A — HTML/CSS/JS moderno (Vanilla JS con módulos ES6), sin React, para la base del proyecto.**
React queda **fuera del proyecto por defecto**, con posibilidad de habilitarlo **opcionalmente y solo en un módulo acotado**, si un equipo específico ya domina React y justifica su valor con un ADR.

### Comparación (para sustentar la decisión)

| Criterio | Opción A: HTML/CSS/JS puro | Opción B: React |
|---|---|---|
| Curva de aprendizaje | Baja–media; se apoya en lo ya visto en la carrera | Media–alta; requiere entender JSX, estado, ciclo de vida, tooling (bundler) |
| Productividad inicial | Alta para equipos sin experiencia previa en React | Alta solo si ya hay experiencia; si no, hay una meseta de aprendizaje costosa en un semestre |
| Complejidad añadida | Baja (sin build step obligatorio) | Media (requiere Vite/webpack, npm, resolución de dependencias) |
| Mantenibilidad a este tamaño de proyecto | Buena, si se organiza en módulos ES6 disciplinados | Buena, pero el beneficio se nota más en UIs muy interactivas y grandes |
| Valor educativo | Refuerza fundamentos (DOM, eventos, fetch, módulos) que todo dev necesita dominar antes de un framework | Valioso si el objetivo del curso es aprender React específicamente |
| Riesgo para estudiantes heterogéneos | Bajo: todos parten de una base común (HTML/CSS/JS ya vista) | Alto: brecha entre quienes ya saben React y quienes no |
| Compatibilidad con Laravel (API REST separada) | Total: consumo vía `fetch` | Total: también consume la API vía `fetch`/axios |
| Escalabilidad | Suficiente para el alcance del proyecto (monolito modular) | Mayor, pero es una capacidad que este proyecto no necesita agotar |

**Conclusión:** dado que el objetivo pedagógico es que *todos* los integrantes trabajen bajo el mismo estándar y con conocimientos heterogéneos, introducir React como obligatorio generaría una brecha de productividad y frustración. Se usa **JavaScript ES6+ modular** como base **obligatoria**. React se marca como **AVANZADO/opcional**, habilitable solo con ADR y solo para una vista o módulo aislado (nunca mezclado sin criterio con el resto del frontend).

> Aunque no haya *build step* (bundler), el frontend **sí mantiene un `frontend/package.json`** con `eslint` y `prettier` como `devDependencies` y un `package-lock.json` versionado. Es lo que permite que el pipeline de CI (`npm ci` + lint/format, [Doc. 11](/estandares/11-calidad-cicd/)) sea reproducible. Un frontend sin `package.json` no puede pasar por el CI descrito en este handbook.

## 3. Estructura de archivos

```
frontend/
 ├── index.html
 ├── assets/
 │   ├── css/
 │   │   ├── base/            # reset, variables, tipografía
 │   │   ├── components/      # un archivo por componente visual (botones, cards, modales)
 │   │   └── pages/           # estilos específicos de una vista
 │   ├── js/
 │   │   ├── api/              # wrappers de fetch por recurso (invoicesApi.js, usersApi.js)
 │   │   ├── components/       # UI reutilizable (renderCard.js, modal.js)
 │   │   ├── pages/            # lógica específica de cada página
 │   │   ├── utils/            # helpers puros (formatDate.js, validators.js)
 │   │   └── main.js           # punto de entrada
 │   └── img/
 └── pages/                    # HTML de cada vista, si no es SPA
```

## 4. Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos JS/CSS | `kebab-case` | `invoice-form.js`, `invoice-form.css` |
| Funciones | `camelCase`, verbo + sustantivo | `renderInvoiceList()`, `fetchUsers()` |
| Variables | `camelCase` | `invoiceTotal` |
| Constantes | `SCREAMING_SNAKE_CASE` | `const API_BASE_URL = ...` |
| Clases CSS | `kebab-case`, metodología BEM simplificada | `.invoice-card`, `.invoice-card__title`, `.invoice-card--highlighted` |
| IDs de HTML | `kebab-case`, uso solo para anclas/único elemento | `#main-nav` |
| Clases JS (si se usan) | `PascalCase` | `class FormValidator {}` |

## 5. Organización del JavaScript

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-FE-J01 | Se usan módulos ES6 (`import`/`export`), nunca todo el JS en un solo archivo global. | P1 | OBLIGATORIO |
| STD-FE-J02 | Todo `fetch` a la API vive en `assets/js/api/`, nunca disperso dentro de manejadores de eventos de UI. | P1 | OBLIGATORIO |
| STD-FE-J03 | No se usan variables globales implícitas; todo vive dentro de un módulo o función. | P0 | OBLIGATORIO |
| STD-FE-J04 | Se prefiere `const`/`let` sobre `var`. | P1 | OBLIGATORIO |
| STD-FE-J05 | Toda función asíncrona maneja errores con `try/catch`, nunca deja una Promise sin `.catch` o sin `try`. | P0 | OBLIGATORIO |

## 6. Manipulación del DOM
- Se centraliza el acceso a elementos del DOM al inicio del módulo de la página (evitar `document.querySelector` repetido y disperso) — P2/RECOMENDADO.
- No se usa `innerHTML` con datos provenientes del usuario o de la API sin sanitizar (riesgo XSS, ver [Doc. 09](/estandares/09-seguridad/)) — P0/OBLIGATORIO. Preferir `textContent` o construcción de nodos.

## 7. Fetch / consumo de API

**Ejemplo correcto:**
```js
// assets/js/api/invoicesApi.js
const API_BASE_URL = 'https://api.miproyecto.local/api/v1';

export async function fetchInvoices() {
  const response = await fetch(`${API_BASE_URL}/invoices`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener facturas: ${response.status}`);
  }

  return response.json();
}
```

**Ejemplo incorrecto (sin manejo de error, URL hardcodeada dentro del componente de UI):**
```js
document.getElementById('btn').addEventListener('click', () => {
  fetch('http://localhost:8000/api/invoices').then(r => r.json()).then(data => {
    document.getElementById('list').innerHTML = data.map(i => `<div>${i.name}</div>`).join('');
  });
});
```

## 8. Manejo de errores y validaciones en UI
- Todo formulario valida en el cliente (feedback inmediato) **y** confía en la validación del servidor como fuente de verdad — P1/OBLIGATORIO.
- Los errores de red/API se muestran al usuario de forma comprensible, nunca como un `console.error` silencioso sin feedback visual — P1/OBLIGATORIO.

## 9. Accesibilidad (a11y) — nivel básico
- Todo `<img>` lleva `alt` descriptivo — P1/OBLIGATORIO.
- Formularios usan `<label for="">` asociado a su input — P1/OBLIGATORIO.
- Contraste de color mínimo razonable (no texto gris claro sobre blanco) — P2/RECOMENDADO.
- Navegación por teclado en elementos interactivos custom (si se crean) — P3/AVANZADO.

## 10. Responsive design
- Mobile-first o al menos verificación en 3 anchos de referencia (móvil, tablet, escritorio) antes de cerrar una tarea de UI — P1/OBLIGATORIO.
- Uso de unidades relativas (`rem`, `%`, `fr` en grid) en vez de solo píxeles fijos — P2/RECOMENDADO.

## 11. CSS

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-FE-C01 | Metodología BEM simplificada para nombrar clases (ver sección 4). | P1 | OBLIGATORIO |
| STD-FE-C02 | Variables CSS (`:root { --color-primary: ... }`) para colores/espaciados repetidos; no colores hardcodeados dispersos. | P1 | OBLIGATORIO |
| STD-FE-C03 | No se usa `!important` salvo justificación explícita en comentario. | P1 | OBLIGATORIO |
| STD-FE-C04 | Se evita CSS duplicado: si una regla se repite en 3+ archivos, se extrae a `base/` o `components/`. | P2 | RECOMENDADO |
| STD-FE-C05 | Preprocesadores (Sass/Less) o frameworks CSS (Bootstrap/Tailwind) son AVANZADO/opcionales, con ADR si se adoptan a nivel de todo el proyecto. | P3 | AVANZADO |

## 12. Seguridad básica en frontend
- Nunca se guardan tokens de sesión de larga duración en `localStorage` sin evaluar el riesgo (ver [Doc. 09](/estandares/09-seguridad/)); preferir cookies `httpOnly` cuando el backend lo soporte, o tokens de corta duración si se usa `localStorage`.
- Toda entrada de usuario que se renderiza en el DOM se trata como no confiable (ver sección 6, XSS).
- No se exponen claves de API de terceros directamente en el JS del cliente si son secretas.

## 13. Buenas prácticas generales de JavaScript
- Funciones puras para lógica de negocio/formato (`utils/`), separadas de funciones que tocan el DOM.
- Evitar callbacks anidados profundos; usar `async/await`.
- Un archivo, una responsabilidad (un archivo de página no mezcla lógica de tres vistas distintas).

## 14. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Formateo | Automática | Prettier |
| Lint (var no usada, var vs let/const, etc.) | Automática | ESLint 9+ con *flat config* (`eslint.config.js`); base en `config-examples/frontend-eslint.config.js` |
| Naming BEM / estructura de carpetas | Manual | Code Review |
| Accesibilidad básica | Parcial | Revisión manual + extensión de linting a11y (AVANZADO) |
| XSS / sanitización | Manual + automática | Code Review + regla ESLint `no-unsanitized` (si se configura) |

## 15. Referencias
- MDN Web Docs (HTML/CSS/JS).
- Documentación oficial de ESLint (flat config) y de Prettier.
- [Doc. 05](/estandares/05-api-rest/) (API REST) para el contrato de datos que consume el frontend.
- [Doc. 09](/estandares/09-seguridad/) (Seguridad) para XSS/CSRF/almacenamiento de tokens.
