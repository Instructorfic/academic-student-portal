---
title: "Presentación — Bloque II"
description: "Bloque II de Taller Integrador — versión de documentación de la presentación de clase, sin información nueva respecto a los temas del bloque."
---

> Esta página condensa, en formato de documentación, la presentación de
> apoyo usada en clase para este bloque. No introduce información nueva
> respecto a los [temas del bloque](/materias/taller-integrador/bloque-02/) — es un resumen visual de apoyo.

## Al terminar este bloque vas a poder

| RA | Vas a poder... |
| --- | --- |
| RA2.1 | Utilizar Git para gestionar el desarrollo colaborativo de tu equipo |
| RA2.2 | Organizar el código mediante estrategias de ramas |
| RA2.3 | Definir una arquitectura inicial de tu proyecto |
| RA2.4 | Identificar componentes y responsabilidades del sistema |
| RA2.5 | Continuar el desarrollo del proyecto mediante iteraciones |

## Dónde estamos dentro del taller

```text
Bloque I
Del problema al producto
        ↓
Bloque II  ← estás aquí
Desarrollo colaborativo y arquitectura
        ↓
Bloque III
Construcción del sistema
```

## Lo que ya tienen y lo que falta

Al cierre del Bloque I: equipo conformado, repositorio con un historial
lineal, Product Backlog inicial, esqueleto Laravel ejecutable. Lo que
falta: trabajar en paralelo sin pisarse, revisar código antes de
integrarlo, y organizar el proyecto en componentes separados. Eso es
exactamente este bloque.

## Git y control de versiones

Git es un sistema de control de versiones **distribuido**: guarda un
historial completo de cambios, permite volver a cualquier punto
anterior, y permite que varias personas trabajen sin sobrescribirse.
Git no es GitHub ni GitLab — esas son plataformas que alojan
repositorios de Git y agregan pull requests, issues y revisión de
código por encima de él. Ver
[1. Git y control de versiones](/materias/taller-integrador/bloque-02/01-git-y-control-de-versiones/).

## De un historial lineal a ramas en paralelo

```text
main
 └── feature/nombre-corto-de-la-funcionalidad
```

Una rama de característica permite trabajar sin bloquear a los demás. Un
pull request permite que otra persona revise el código antes de
integrarlo (*code review*). Un conflicto de fusión ocurre cuando dos
ramas modificaron la misma parte del mismo archivo — Git pide,
correctamente, que una persona decida qué versión es correcta. Ver
[2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).

## Ampliación: Conventional Commits, SemVer y tags

```text
<tipo>[ámbito]: <descripción>

feat: nueva funcionalidad       → sube versión MENOR
fix:  corrección de un error    → sube versión PARCHE
feat!: cambio incompatible      → sube versión MAYOR
```

Una etiqueta anotada (`git tag -a v0.1.0`) marca el primer incremento
del proyecto. Esta ampliación no sustituye ningún RA oficial del
bloque.

## Integración del trabajo

Integrar con frecuencia, en cambios pequeños y con revisión, reduce el
riesgo de un conflicto grande. Un issue documenta trabajo pendiente. Una
Definition of Done solo sirve si se aplica de verdad a cada pull
request, no si solo existe como documento. Ver
[3. Integración del trabajo](/materias/taller-integrador/bloque-02/03-integracion-del-trabajo/).

## Arquitectura de software

```text
ANTES                          DESPUÉS
Controlador hace todo    →     Form Request → valida
(valida + decide + guarda)     Service       → decide la regla de negocio
                                Controlador   → coordina, no decide
```

Cuatro principios: separación de responsabilidades, cohesión,
acoplamiento y escalabilidad de diseño. Tu proyecto es y sigue siendo un
monolito multicapa — este bloque no lo convierte en microservicios. Ver
[4. Arquitectura de software](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/).

## Patrones de diseño

```text
Problema real del proyecto
        ↓
¿Qué familia de patrón lo resuelve?
        ↓
Creacional / Estructural / De comportamiento
        ↓
Implementación conectada al Service existente
```

La pregunta correcta no es "¿qué patrón puedo usar?": es "¿qué problema
tengo, y qué patrón lo resuelve?". Ver
[5. Patrones de diseño](/materias/taller-integrador/bloque-02/05-patrones-de-diseno/).

## Cierre — volviendo al problema inicial

Dos integrantes modifican el mismo archivo y Git avisa que no puede
subir el segundo cambio. Con ramas de característica, ese problema no
habría bloqueado a ninguno; un pull request con revisión real lo habría
detectado antes; y el conflicto se resuelve decidiendo, como equipo, qué
versión es correcta.

## En síntesis

```text
GIT COLABORATIVO
      +
INTEGRACIÓN Y DEFINITION OF DONE
      +
ARQUITECTURA SEPARADA POR RESPONSABILIDADES
      +
UN PATRÓN DE DISEÑO JUSTIFICADO
      ↓
PRIMER INCREMENTO FUNCIONAL REAL
```

## Lo que sigue

En el Bloque III vas a construir componentes, APIs, persistencia y
pruebas automatizadas sobre la arquitectura que documentaste en este
bloque — no la vas a rehacer desde cero.

## Referencias

Ver [Referencias del Bloque II](/materias/taller-integrador/bloque-02/referencias/)
para el listado completo con su justificación de relevancia.
