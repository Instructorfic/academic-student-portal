---
title: "1. Git y control de versiones"
description: "Bloque II de Taller Integrador — qué es Git, las cuatro áreas y los tres estados de un archivo, qué contiene la carpeta .git, cómo preparar un .gitignore y los comandos básicos con ejemplos reales."
---

## ¿Qué es Git?

**Git** es un **sistema de control de versiones** (*version control
system*): un programa que guarda el historial completo de los cambios
de un proyecto, permite volver a cualquier punto anterior de ese
historial, y permite que varias personas trabajen sobre el mismo
proyecto sin sobrescribir el trabajo de las demás.

Git no es una carpeta en la nube, ni un servicio como GitHub o GitLab.
**Git es el programa que corre en tu computadora.** GitHub y GitLab son
plataformas que **alojan** repositorios de Git y agregan herramientas
de colaboración (pull requests, issues, revisión de código) por encima
de Git. Podrías usar Git sin ninguna de las dos (por ejemplo, con un
repositorio compartido en una red local), pero este bloque las necesita
porque el flujo de pull request y code review depende de la plataforma,
no de Git por sí solo.

## El problema que Git resuelve

Antes de que existiera un sistema de control de versiones, la forma más
común de "cuidar" el trabajo era guardar copias del proyecto con
nombres cada vez más largos: `proyecto.zip`, `proyecto_final.zip`,
`proyecto_final_v2.zip`, `proyecto_final_v2_CORREGIDO.zip`.

Ese esquema falla de formas predecibles:

- nadie sabe con certeza cuál copia es la más reciente;
- no hay forma de saber **qué cambió** entre una copia y otra sin abrir
  ambas y compararlas a mano;
- si dos personas trabajan "cada una en su copia", combinar el trabajo
  de ambas al final es lento y propenso a errores;
- si algo se rompe, no hay una forma confiable de volver exactamente al
  estado anterior.

Git resuelve los cuatro problemas a la vez: mantiene **un solo
historial**, cada cambio queda registrado con quién lo hizo y por qué
(el mensaje del commit), y permite combinar el trabajo de varias
personas de forma controlada.

**Un dato de contexto.** Git fue creado en 2005 por Linus Torvalds, el
creador del kernel de Linux, específicamente para que miles de
programadores alrededor del mundo pudieran colaborar en ese mismo
proyecto sin un servidor central que se convirtiera en cuello de
botella. Por eso Git es un sistema de control de versiones
**distribuido**: cada persona tiene una copia completa del historial en
su propia computadora, no solo una copia de los archivos actuales —a
diferencia de un sistema centralizado, donde el historial completo vive
únicamente en un servidor.

## Las cuatro áreas de Git

Para entender qué hace cada comando de Git, ayuda visualizar por dónde
pasa un archivo antes de quedar registrado en el historial:

| Área | Qué es |
| --- | --- |
| Directorio de trabajo | Los archivos tal como los estás editando ahora mismo |
| Área de preparación (*staging area* o *index*) | Los cambios que decidiste incluir en el próximo commit — no todos los cambios que hiciste tienen que ir juntos |
| Repositorio local | El historial ya guardado, en tu propia computadora |
| Repositorio remoto | La copia compartida (GitHub o GitLab) que ve todo el equipo |

```text
Directorio de trabajo
        ↓ git add
Área de preparación
        ↓ git commit
Repositorio local
        ↓ git push       (↑ git pull)
Repositorio remoto
```

Todo lo que haces en Git es mover un cambio de una de estas áreas a la
siguiente.

## Los tres estados de un archivo

Vistos desde el propio archivo (no desde el área en la que vive), un
archivo dentro de un repositorio de Git siempre está en uno de tres
estados:

| Estado | Qué significa |
| --- | --- |
| Modificado (*modified*) | Cambiaste el archivo, pero todavía no le dijiste a Git que lo incluya en el próximo commit |
| Preparado (*staged*) | Marcaste el archivo, ya modificado, para que forme parte del próximo commit |
| Confirmado (*committed*) | El archivo está guardado de forma segura en tu repositorio local |

```text
Modificado
     ↓ git add
Preparado
     ↓ git commit
Confirmado
```

Este es el mismo recorrido que ya viste en las cuatro áreas de Git,
visto ahora desde la perspectiva de un archivo individual: un archivo
"modificado" vive en el directorio de trabajo, uno "preparado" vive en
el área de preparación, y uno "confirmado" ya forma parte del
historial del repositorio local. `git status` es, precisamente, el
comando que te dice en qué estado está cada archivo en este momento.

## La carpeta `.git`

Cuando ejecutas `git init`, Git crea una carpeta oculta `.git/` dentro
de tu proyecto. Ahí vive **todo** el historial: cada commit, cada rama,
cada configuración. El resto de la carpeta de tu proyecto son
simplemente los archivos que estás versionando — si borraras todo
menos `.git/`, en principio podrías reconstruir el proyecto completo a
partir de su historial.

### Qué contiene `.git`

No necesitas memorizar esto ni manipularlo directamente, pero ayuda
reconocer qué hace cada elemento cuando lo veas:

| Elemento | Qué es |
| --- | --- |
| `HEAD` | Un archivo de texto que indica en qué rama estás parado actualmente (apunta a `refs/heads/main`, por ejemplo) |
| `config` | La configuración de este repositorio en particular (por ejemplo, la URL del remoto `origin`) |
| `index` | El área de preparación en sí misma — un archivo binario que registra qué cambios están "preparados" para el próximo commit |
| `objects/` | La base de datos de Git: aquí se guardan, comprimidos e identificados por hash, todos los commits, árboles de archivos y contenidos de archivo que alguna vez confirmaste |
| `refs/heads/` | Un archivo por cada rama local, con el identificador del commit al que apunta esa rama |
| `refs/tags/` | Un archivo por cada etiqueta (*tag*) creada en el repositorio |
| `refs/remotes/` | Referencias al estado, la última vez que sincronizaste, de las ramas del repositorio remoto |
| `hooks/` | Scripts opcionales que Git puede ejecutar automáticamente antes o después de ciertos eventos (por ejemplo, antes de un commit) |
| `logs/` | El *reflog*: un historial de a dónde ha apuntado `HEAD` a lo largo del tiempo, útil para recuperarte de un error |

> **Qué pasa si borras `.git`.** Pierdes todo el historial de forma
> irreversible: commits, ramas, autores, mensajes. Los archivos actuales
> siguen ahí, pero dejan de estar bajo control de versiones. Nunca
> borres esta carpeta sin estar completamente seguro.

## Dos formas de empezar un repositorio

| Comando | Cuándo se usa |
| --- | --- |
| `git init` | Conviertes una carpeta que ya existe (o que acabas de crear) en un repositorio de Git nuevo |
| `git clone <url>` | Descargas un repositorio remoto que ya existe, con todo su historial, a tu computadora |

En el Bloque I probablemente usaste `git init` para crear tu repositorio
desde cero. Cuando un integrante nuevo se une al equipo, o cuando
trabajas desde otra computadora, usas `git clone` para obtener una
copia completa del repositorio del equipo, historial incluido.

## Comandos básicos — repaso del Bloque I, ahora con su propósito

| Comando | Qué hace | En qué área actúa |
| --- | --- | --- |
| `git init` | Convierte una carpeta normal en un repositorio de Git | Crea el repositorio local |
| `git status` | Muestra qué cambió y en qué área está cada cambio | Consulta las cuatro áreas |
| `git add archivo` | Mueve un cambio del directorio de trabajo al área de preparación | Directorio de trabajo → preparación |
| `git commit -m "mensaje"` | Guarda permanentemente, en el historial, lo que está en el área de preparación | Preparación → repositorio local |
| `git log` | Muestra el historial de commits | Consulta el repositorio local |
| `git branch` | Lista, crea o elimina ramas | Consulta o modifica el repositorio local |
| `git checkout` / `git switch` | Cambia a otra rama | Cambia qué rama ves en el directorio de trabajo |
| `git push` | Sube los commits del repositorio local al remoto | Repositorio local → remoto |
| `git pull` | Trae al repositorio local los commits nuevos del remoto | Repositorio remoto → local |

A continuación, cada comando con un ejemplo real y la salida que
deberías ver — pruébalos tú mismo, en tu propio repositorio del Bloque
I, en el orden en que aparecen.

**`git status`** — antes de hacer nada más, revisa siempre qué cambió:

```bash
$ git status
En la rama main
Cambios no rastreados para el commit:
  (usa "git add <archivo>..." para actualizar lo que será confirmado)
        modificado:     app/Models/Prestamo.php

no hay cambios agregados al commit (usa "git add" o "git commit -a")
```

**`git add`** — mueve ese cambio al área de preparación:

```bash
$ git add app/Models/Prestamo.php
$ git status
En la rama main
Cambios a ser confirmados:
        modificado:     app/Models/Prestamo.php
```

Nota cómo `git status` cambió de "no rastreados" a "a ser confirmados"
— es exactamente el paso de directorio de trabajo → área de preparación.

**`git commit`** — guarda ese cambio en el historial:

```bash
$ git commit -m "feat: agregar campo numero_serie al modelo Equipo"
[main a1b2c3d] feat: agregar campo numero_serie al modelo Equipo
 1 file changed, 3 insertions(+)
```

**`git log`** — revisa el historial completo:

```bash
$ git log --oneline
a1b2c3d feat: agregar campo numero_serie al modelo Equipo
9f8e7d6 feat: crear cuenta con validación de correo
3c2b1a0 commit inicial del proyecto
```

`--oneline` muestra una línea por commit; sin esa opción verías también
el autor, la fecha y el mensaje completo.

**`git branch`** — revisa en qué rama estás y cuáles existen:

```bash
$ git branch
* main
```

Todavía solo existe `main` (por eso hay un `*` a su lado). Esto cambia
en [2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).

**`git push` / `git pull`** — sincroniza con el repositorio remoto:

```bash
$ git push origin main
Enumerando objetos: 5, listo.
...
To github.com:equipo/reservafic.git
   9f8e7d6..a1b2c3d  main -> main
```

```bash
$ git pull origin main
De github.com:equipo/reservafic.git
 * branch            main       -> FETCH_HEAD
Ya está actualizado.
```

`git pull` es en realidad `git fetch` (traer los cambios) seguido de
`git merge` (combinarlos con tu trabajo) — no necesitas ejecutarlos por
separado, pero ayuda a saber que son dos pasos combinados en uno.

## `.gitignore` — qué no debe entrar al repositorio

No todos los archivos de tu proyecto deben versionarse. Dependencias
instaladas (`vendor/`, `node_modules/`), archivos de configuración con
credenciales (`.env`) y archivos generados automáticamente no deben
subirse al repositorio: ocupan espacio innecesario, pueden filtrar
información sensible, y pueden regenerarse a partir del código fuente.

**`.gitignore`** es un archivo de texto, en la raíz del proyecto, que le
dice a Git qué archivos y carpetas debe ignorar por completo: no los
va a rastrear, no van a aparecer en `git status`, y `git add .` nunca
los va a incluir aunque existan en tu carpeta.

Laravel ya incluye un archivo `.gitignore` con estas exclusiones
configuradas por defecto — revísalo, no lo borres:

```gitignore
/vendor
/node_modules
/public/hot
/public/storage
/storage/*.key
/.env
/.env.backup
/.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
/.idea
/.vscode
```

| Patrón | Por qué se ignora |
| --- | --- |
| `/vendor`, `/node_modules` | Dependencias instaladas por Composer y npm — se regeneran con `composer install` y `npm install`, no necesitan versionarse |
| `/.env` | Contiene credenciales y configuración sensible (contraseñas de base de datos, claves de API) — nunca debe subirse a un repositorio compartido |
| `/.phpunit.result.cache`, `npm-debug.log` | Archivos generados automáticamente por herramientas, sin valor fuera de tu computadora |
| `/.idea`, `/.vscode` | Configuración específica de tu editor, no del proyecto — cada integrante puede usar un editor distinto |

### Cómo preparar tu propio `.gitignore`

Si agregas una herramienta nueva a tu proyecto (por ejemplo, un
generador de reportes que crea archivos temporales), es tu
responsabilidad agregar sus archivos generados al `.gitignore`. No
necesitas escribirlo completamente desde cero: la comunidad mantiene
plantillas de `.gitignore` ya preparadas por lenguaje y framework —
consulta la colección oficial de GitHub en
<https://github.com/github/gitignore> (por ejemplo, `Laravel.gitignore`)
antes de escribir reglas nuevas a mano.

> **Un archivo ya rastreado no se ignora retroactivamente.** Si un
> archivo como `.env` ya fue confirmado por error antes de agregarlo al
> `.gitignore`, agregarlo ahora no lo elimina del historial — hay que
> quitarlo explícitamente del repositorio (`git rm --cached archivo`) y,
> si contenía credenciales, considerarlas expuestas y cambiarlas.

## Organización del repositorio

Un repositorio ordenado tiene, como mínimo: estructura clara, un
`README.md` actualizado, convenciones de nombres de rama consistentes,
e issues que documentan el trabajo pendiente (ver
[3. Integración del trabajo](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/)).

## Error común

Confundir Git con GitHub o GitLab, como si fueran lo mismo. Git es el
sistema de control de versiones; GitHub y GitLab son plataformas que
alojan repositorios de Git y agregan una interfaz web, pull requests y
revisión de código por encima de él.

## Para reflexionar

- En el Bloque I probablemente trabajaste con un solo historial lineal.
  ¿Qué habría pasado si cuatro integrantes hubieran escrito código al
  mismo tiempo sobre ese mismo historial, sin ramas?
- ¿Por qué Git guarda una copia completa del historial en cada
  computadora, en lugar de guardar el historial únicamente en el
  servidor remoto?

## Actividad y evidencia

Aplica lo estudiado aquí en las actividades
[A1 — Diagnóstico inicial](/materias/taller-integrador/bloque-02/actividades/actividad-1/) y
[A2 — Nombrar las ramas antes de crearlas](/materias/taller-integrador/bloque-02/actividades/actividad-2/).

## Referencias de este tema

- Documentación oficial de Git — referencia completa de comandos y
  libro *Pro Git* en español. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/)
  y las [lecturas complementarias](/materias/taller-integrador/bloque-02/referencias/lecturas-complementarias/)
  para los enlaces directos.

## Qué sigue

Ya conoces los fundamentos de Git como herramienta individual. El
siguiente paso es usarlo para trabajar **en equipo, al mismo tiempo**,
sobre el mismo proyecto: continúa con
[2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).
