// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { viewTransitions } from "astro-vtbot/starlight-view-transitions";
import mermaid from "astro-mermaid";

import tailwindcss from "@tailwindcss/vite";
import config from "./src/config/config.json";
import social from "./src/config/social.json";
import sidebar from "./src/config/sidebar.json";

import { fileURLToPath } from "url";

const { title } = config.site;

// GitHub Pages: el workflow (.github/workflows/build.yml) inyecta SITE y
// BASE_PATH a partir del owner y el nombre del repositorio, así que el
// build de producción sale con las URLs correctas sin fijar aquí ningún
// dominio. En local (sin esas variables) el sitio se sirve en la raíz.
// Para un dominio propio, define SITE (y deja BASE_PATH vacío) en los
// "Repository variables" o en un archivo .env.
const SITE = process.env.SITE || undefined;
const BASE = process.env.BASE_PATH || undefined;

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
  integrations: [
    // Renderiza los bloques ```mermaid como diagramas. Debe ir ANTES de starlight
    // para procesar el markdown antes que él. `autoTheme` sigue el modo claro/oscuro.
    mermaid({
      theme: "neutral",
      autoTheme: true,
    }),
    starlight({
      title,
      // @ts-ignore
      social: social.main || [],
      // @ts-ignore
      sidebar: sidebar.main || [],
      customCss: ["./src/styles/global.css"],
      // Identidad institucional UAS/FIC aplicada sobre el layout de DocKit:
      // paleta y tipografía en src/config/theme.json; overrides en src/components.
      components: {
        Head: "./src/components/override-components/Head.astro",
        Header: "./src/components/override-components/Header.astro",
        Hero: "./src/components/override-components/Hero.astro",
        PageFrame: "./src/components/override-components/PageFrame.astro",
        PageSidebar: "./src/components/override-components/PageSidebar.astro",
        TwoColumnContent: "./src/components/override-components/TwoColumnContent.astro",
        ContentPanel: "./src/components/override-components/ContentPanel.astro",
        Pagination: "./src/components/override-components/Pagination.astro",
        Sidebar: "./src/components/override-components/Sidebar.astro",
      },
    }),
  ],
  vite: {
    plugins: /** @type {any} */ ([tailwindcss(), viewTransitions()]),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
