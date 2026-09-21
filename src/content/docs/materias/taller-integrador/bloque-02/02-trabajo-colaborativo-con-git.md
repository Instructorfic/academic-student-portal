---
title: "2. Trabajo colaborativo con Git"
description: "Bloque II de Taller Integrador — ramas, estrategias de branching, pull requests, code review, conflictos de fusión, Conventional Commits, versionado semántico y etiquetas."
---

## De un historial lineal a un historial en paralelo

En el Bloque I usaste `git init`, `git add` y `git commit` sobre un solo
historial lineal. Eso te permitió guardar tu trabajo, pero todos ustedes
escribían directamente sobre el mismo punto del historial — no había
manera de que dos personas trabajaran al mismo tiempo sin pisarse. Eso
es exactamente lo que resuelve una rama.

## Rama (*branch*)

Una **rama** (*branch*) es una línea de desarrollo independiente:
permite que alguien trabaje sin afectar el trabajo de los demás hasta
que decida integrarlo. Técnicamente, una rama es solo un puntero que
señala a un commit específico — crear una rama no duplica el proyecto,
por eso es una operación instantánea y barata.

```bash
$ git branch feature/numero-serie-equipo
$ git branch
  feature/numero-serie-equipo
* main
$ git checkout feature/numero-serie-equipo
Cambiado a rama 'feature/numero-serie-equipo'
$ git branch
* feature/numero-serie-equipo
  main
```

`git checkout -b nombre-de-la-rama` hace las dos cosas en un solo paso
(crear la rama y cambiarte a ella):

```bash
$ git checkout -b feature/validar-doble-reserva
Cambiado a nueva rama 'feature/validar-doble-reserva'
```

## Rama de característica (*feature branch*)

Una rama creada para una sola funcionalidad o cambio. Vive poco tiempo:
se integra y se elimina. Este bloque usa el flujo más simple posible:

```text
main
 └── feature/nombre-corto-de-la-funcionalidad
```

Reglas del flujo:

```text
Nadie trabaja directamente sobre main.
Cada funcionalidad nueva nace en su propia rama.
Una rama se integra mediante pull request, nunca con git push directo a main.
Una rama se elimina después de integrarse.
```

**Modelo con ReservaFIC.** Dos integrantes trabajan al mismo tiempo:
uno agrega el campo "número de serie" al modelo `Equipo`
(`feature/numero-serie-equipo`); otro agrega la validación de doble
reserva (`feature/validar-doble-reserva`). Ambos parten de `main`,
ambos trabajan en paralelo, ninguno bloquea al otro.

## Estrategias de branching

"Crear ramas de característica" es una práctica; **qué reglas sigue tu
equipo para crearlas, nombrarlas e integrarlas** es una **estrategia de
branching** (*branching strategy*). Existen varias, con distinto nivel
de formalidad:

| Estrategia | Cómo funciona | Cuándo conviene |
| --- | --- | --- |
| **Git Flow** | Ramas de larga vida `main` (producción) y `develop` (integración), más ramas `feature/*`, `release/*` y `hotfix/*` para cada tipo de trabajo | Proyectos con versiones formales y ciclos de lanzamiento planeados (por ejemplo, software empaquetado con releases numerados) |
| **GitHub Flow** | Una sola rama de larga vida (`main`, siempre desplegable), y ramas `feature/*` cortas que se integran mediante pull request | Proyectos web con entrega continua, equipos pequeños — es el flujo que usa este bloque |
| **Trunk-Based Development** | Casi sin ramas: commits pequeños y frecuentes directamente a `main` (o ramas que viven horas, no días), apoyado en *feature flags* para ocultar trabajo incompleto | Equipos con integración continua muy madura y suites de pruebas automatizadas robustas |

### Comparativa

| Criterio | Git Flow | GitHub Flow | Trunk-Based |
| --- | --- | --- | --- |
| Complejidad | Alta (varias ramas de larga vida) | Baja | Muy baja, pero exige disciplina de pruebas |
| Tiempo de vida de una rama | Días a semanas (`release/*`) | Horas a pocos días | Minutos a horas, o ninguna rama |
| Requiere versiones formales | Sí | No | No |
| Riesgo de conflictos grandes | Medio (ramas `develop` pueden divergir) | Bajo, si las ramas son realmente cortas | Muy bajo |

### Cuál usa este bloque

El flujo que estudiaste en la sección anterior —`main` siempre
desplegable, ramas `feature/*` cortas, integración mediante pull
request— es una versión simplificada de **GitHub Flow**. No es
casualidad: es la estrategia más simple de las tres, y tu proyecto
todavía no tiene el volumen de trabajo ni la necesidad de versiones
formales que justificarían Git Flow, ni la madurez de pruebas
automatizadas que exige Trunk-Based Development (esa madurez es,
precisamente, uno de los objetivos del Bloque III).

> **No mezclen estrategias a medias.** Adoptar `develop` "porque se ve
> más profesional" sin seguir el resto de las reglas de Git Flow (ramas
> `release/*`, `hotfix/*`) suele generar más confusión que la que
> resuelve. Si tu equipo necesita más estructura que GitHub Flow más
> adelante en el semestre, adopten una estrategia completa, no partes
> sueltas de varias.

## Pull request (*PR*) y code review

Un **pull request** (*PR*) es una solicitud formal de integrar una rama
a otra. Permite que otra persona haga **code review**: revisar el
código antes de que se integre, no después. Si tu plataforma es GitLab,
el mismo concepto se llama *merge request*.

El code review no es opcional, y no es "que lo revise quien tenga
tiempo". La persona revisora debe leer el código (no solo el título del
pull request), ejecutar el proyecto localmente si el cambio no es
trivial, y dejar al menos un comentario real — una pregunta, una
sugerencia, o una aprobación explícita justificada. Aprobar un pull
request sin leerlo es exactamente la práctica que este bloque busca
romper.

## Conflicto de fusión (*merge conflict*)

Ocurre cuando dos ramas modificaron la misma parte del mismo archivo de
formas distintas. Git no puede decidir cuál versión conservar — alguien
del equipo tiene que decidirlo.

Cuando ocurre, Git marca el archivo con marcadores de conflicto:

```text
<<<<<<< HEAD
tu versión
=======
la versión de main
>>>>>>> main
```

Para resolverlo:

```text
1. Abre el archivo.
2. Decide, como equipo, qué versión (o combinación) es correcta.
3. Elimina las marcas <<<<<<<, ======= y >>>>>>>.
4. Guarda el archivo.
```

```bash
git add .
git commit -m "fix: resolver conflicto entre feature/conflicto-a y feature/conflicto-b"
git push origin feature/conflicto-b
```

> **Un conflicto de fusión no es un error del sistema.** Es Git
> pidiendo, correctamente, que una persona decida qué versión es
> correcta — algo que el programa no puede decidir por sí solo.

## Comandos que vas a necesitar pronto

No son parte central de este bloque, pero es útil reconocerlos antes de
necesitarlos con urgencia:

| Comando | Para qué sirve |
| --- | --- |
| `git stash` | Guarda temporalmente cambios sin terminar, sin hacer un commit, para poder cambiar de rama y volver después |
| `git reset` | Deshace commits moviendo el puntero de la rama hacia atrás — puede descartar cambios, úsalo con cuidado |
| `git revert` | Deshace un commit creando un nuevo commit que invierte sus cambios, sin borrar el historial — más seguro en una rama compartida |
| `git log --graph` | Muestra el historial como un árbol visual, útil para entender cómo se combinaron varias ramas |

---

> **Ampliación (no forma parte del temario oficial del Bloque II —
> ver la nota al final de esta sección).** Las siguientes tres secciones
> (Conventional Commits, versionado semántico y etiquetas) se agregan
> como profundización de la convención de mensajes de commit.

## Conventional Commits

**Conventional Commits** es una especificación pública (versión 1.0.0,
<https://www.conventionalcommits.org/>) que estandariza la estructura de
un mensaje de commit:

```text
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[pie opcional]
```

Los tipos que la especificación reconoce explícitamente son `feat`
(nueva funcionalidad) y `fix` (corrección de un error); recomienda
además `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf` y
`test`.

**Ámbito (*scope*).** Precisa a qué parte del proyecto afecta el
cambio:

```text
feat(prestamos): agregar validación de fecha de devolución
```

**Cambios incompatibles (*breaking changes*).** Se marcan de dos formas
equivalentes:

```text
feat!: cambiar el formato de respuesta de la API de préstamos
```

```text
feat: cambiar el formato de respuesta de la API de préstamos

BREAKING CHANGE: el campo "fecha" ahora se llama "fecha_devolucion"
```

> **Por qué importa.** Un mensaje de commit estandarizado no es
> burocracia: permite generar automáticamente un historial de cambios
> (*changelog*) y decidir, de forma mecánica, qué número de versión
> corresponde al siguiente release.

## Versionado semántico (*Semantic Versioning*, SemVer)

**SemVer** es una especificación pública (versión 2.0.0,
<https://semver.org/>, creada por Tom Preston-Werner, cofundador de
GitHub) que define un formato de número de versión con tres partes:

```text
MAYOR.MENOR.PARCHE
```

| Parte | Se incrementa cuando... |
| --- | --- |
| MAYOR | Haces cambios incompatibles con versiones anteriores |
| MENOR | Agregas funcionalidad nueva de forma compatible con versiones anteriores |
| PARCHE | Corriges errores de forma compatible con versiones anteriores |

Por ejemplo, pasar de `1.2.3` a `1.3.0` significa "agregamos algo
nuevo, pero no rompimos nada que ya funcionaba"; pasar de `1.2.3` a
`2.0.0` significa "algo que dependía de la versión anterior puede dejar
de funcionar".

**Relación con Conventional Commits.** No es casualidad que ambas
especificaciones combinen bien: un commit `fix:` normalmente justifica
subir el número de PARCHE; un commit `feat:` justifica subir el número
MENOR; un commit `feat!:` o con `BREAKING CHANGE:` justifica subir el
número MAYOR. Cuando un release combina varios tipos de cambio, se usa
el incremento más alto entre todos — nunca se suman.

## Etiquetas (*tags*) en Git

Una **etiqueta** (*tag*) marca, de forma permanente, un commit
específico como un punto importante del historial — típicamente, una
versión publicada.

```bash
git tag -a v0.1.0 -m "Primer incremento funcional del Bloque II"
git push origin v0.1.0
```

`-a` crea una **etiqueta anotada** (guarda autor, fecha y mensaje, como
un commit); una etiqueta sin `-a` (*lightweight tag*) es solo un
puntero, sin esa información. Para el primer incremento de este
bloque, usa siempre etiquetas anotadas — dejan evidencia de quién y
cuándo lo marcó como listo.

```bash
git tag
git show v0.1.0
```

`git tag` lista las etiquetas existentes; `git show` muestra el detalle
de una etiqueta específica.

> **Sobre esta ampliación.** El temario oficial del Bloque II
> (2.1.1 a 2.1.3) llega hasta "estructura, convenciones, README,
> documentación, issues", sin mencionar mensajes de commit
> estandarizados, versionado ni etiquetas. Estas tres secciones se
> incorporaron como una ampliación explícita sobre ese temario, no
> como sustitución de ningún resultado de aprendizaje oficial.

## Error común

Aprobar un pull request sin leer el código, o resolver un conflicto de
fusión eliminando arbitrariamente una de las dos versiones sin discutir
cuál es la correcta con la persona que hizo el otro cambio.

## Para reflexionar

- ¿Qué hubiera pasado si dos integrantes hubieran trabajado
  directamente sobre `main`, en lugar de en ramas separadas?
- Si la siguiente etiqueta después de `v0.1.0` fuera `v0.2.0` en vez de
  `v1.0.0`, ¿qué te está diciendo eso sobre el tipo de cambio que se
  hizo?

## Actividad y evidencia

Practicarás todo lo estudiado aquí —ramas, pull request, code review,
un conflicto de fusión real, Conventional Commits y una etiqueta
semántica— en el
[Laboratorio 1 — Git colaborativo](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/),
trabajando directamente sobre tu propio proyecto.

## Referencias de este tema

- Documentación oficial de Git, pull requests de GitHub o merge
  requests de GitLab, Conventional Commits y Semantic Versioning.
- Sobre estrategias de branching: el modelo original de Git Flow
  (Vincent Driessen, *A successful Git branching model*), la guía
  oficial de GitHub sobre GitHub Flow, y trunkbaseddevelopment.com para
  Trunk-Based Development.

Ver [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/)
y las [lecturas complementarias](/materias/taller-integrador/bloque-02/referencias/lecturas-complementarias/)
para los enlaces directos.

## Qué sigue

Ya sabes trabajar en paralelo sin pisarte con tu equipo. El siguiente
paso es decidir cuándo ese trabajo está realmente terminado: continúa
con [3. Integración del trabajo](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/).
