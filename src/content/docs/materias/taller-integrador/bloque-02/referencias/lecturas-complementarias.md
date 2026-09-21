---
title: "Lecturas complementarias — Bloque II"
description: "Bloque II de Taller Integrador — ruta de lecturas por tema, con preguntas orientadoras y enlaces oficiales a Git, GitHub, GitLab, Conventional Commits y SemVer."
---

Esta ruta no pretende que leas libros completos. Su propósito es
orientar la consulta de fuentes confiables para consolidar los
conceptos de este bloque, y sobre todo para resolver dudas concretas
mientras trabajas en tu propio proyecto durante los laboratorios.

## Ruta general de aprendizaje

```text
GIT INDIVIDUAL → RAMAS → PULL REQUEST → CODE REVIEW → CONFLICTO
   → INTEGRACIÓN FRECUENTE → DEFINITION OF DONE
   → PRINCIPIOS ARQUITECTÓNICOS → ARQUITECTURA DEL PROYECTO
   → PATRÓN DE DISEÑO JUSTIFICADO → PRIMER INCREMENTO
```

## Lectura 1 — Git desde cero

**Fuente principal:** documentación oficial de Git (referencia de
comandos) y el libro *Pro Git*, gratuito y en español.

**Preguntas de lectura:** ¿qué problema resuelve un sistema de control
de versiones distribuido, frente a guardar copias del proyecto con
nombres distintos? ¿qué diferencia hay entre el directorio de trabajo,
el área de preparación, el repositorio local y el repositorio remoto?
¿qué hace exactamente `git pull` por dentro?

## Lectura 1bis — El contenido de `.git` y tu `.gitignore`

**Fuente principal:** documentación oficial de Git (sección interna del
repositorio) y la colección oficial de plantillas `.gitignore` de
GitHub.

**Preguntas de lectura:** ¿qué diferencia hay entre `refs/heads/` y
`refs/remotes/`? ¿qué información pierdes si borras la carpeta `.git`
completa? ¿por qué un archivo `.env` nunca debería salir de tu
`.gitignore`, incluso si "por ahora" no tiene datos sensibles?

## Lectura 2 — Ramas, estrategias de branching, pull requests y conflictos

**Fuente principal:** documentación oficial de Git (ramas y `merge`) y
documentación de pull requests de GitHub o merge requests de GitLab
(según confirme tu docente). **Fuentes sobre estrategias de
branching:** Driessen, *A successful Git branching model* (Git Flow);
guía oficial de GitHub Flow; trunkbaseddevelopment.com.

**Preguntas de lectura:** ¿por qué crear una rama es una operación
instantánea y barata? ¿qué diferencia hay entre un pull request
aprobado sin comentarios y uno con revisión real? ¿por qué Git no puede
decidir por sí solo cómo resolver un conflicto de fusión? ¿qué
diferencia práctica hay entre GitHub Flow y Git Flow, y por qué este
bloque usa el primero?

## Lectura 3 — Conventional Commits y versionado semántico

**Fuente:** Conventional Commits Specification (v1.0.0) y Semantic
Versioning (v2.0.0) — ver enlaces en
[Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/).

**Preguntas de lectura:** ¿qué tipos de commit reconoce explícitamente
la especificación, y cuáles solo recomienda? ¿cómo se marca un cambio
incompatible (*breaking change*)? ¿por qué un commit `fix:` normalmente
sube el número de PARCHE y no el MENOR?

## Lectura 4 — Integración frecuente y cambios pequeños

**Fuente principal:** Martin, R. C. *Clean Code*.

**Preguntas de lectura:** ¿por qué una rama que vive semanas sin
integrarse acumula más riesgo de conflicto? ¿qué relación hay entre el
tamaño de un cambio y la calidad de su revisión?

## Lectura 5 — Arquitectura y separación de responsabilidades

**Fuente principal:** Martin, R. C. *Clean Architecture*.

**Preguntas de lectura:** ¿qué significa que un componente tenga "una
sola razón para cambiar"? ¿cómo distingues alta cohesión de bajo
acoplamiento con un ejemplo de tu propio proyecto? ¿por qué separar
validación, regla de negocio y persistencia no cambia el comportamiento
observable de la aplicación?

## Lectura 6 — Patrones de diseño

**Fuente principal:** Freeman y Robson, *Head First Design Patterns*
(entrada accesible). **Fuente de referencia formal:** Gamma, Helm,
Johnson y Vlissides, *Design Patterns*.

**Preguntas de lectura:** ¿por qué un patrón de diseño se define por el
problema que resuelve, no por su implementación específica? ¿en qué se
diferencia un patrón creacional de uno estructural y de uno de
comportamiento? ¿qué riesgo existe al aplicar un patrón sin haber
identificado antes un problema real?

## Ruta mínima (si tienes poco tiempo)

| Orden | Fuente | Tema |
| ---: | --- | --- |
| 1 | Documentación oficial de Git | Ramas, pull request, conflictos |
| 2 | Head First Design Patterns | Concepto de patrón y tres familias |
| 3 | Clean Architecture | Separación de responsabilidades |
| 4 | Conventional Commits / SemVer | Ampliación de mensajes de commit y versionado |

## Qué no necesitas estudiar todavía

Para mantener el alcance de este bloque, en esta etapa no es necesario
profundizar en: integración continua y pipelines de CI/CD, contenedores
y Docker Compose, despliegue, pruebas de seguridad (OWASP), arquitecturas
distribuidas o de microservicios en profundidad, ni pruebas de carga o
rendimiento. Estos contenidos se abordan progresivamente en los Bloques
III y IV.

## Enlaces oficiales verificados

- Referencia completa de comandos de Git: <https://git-scm.com/docs>
- *Pro Git*, gratuito, en español: <https://git-scm.com/book/es/v2>
- `git tag` en detalle: <https://git-scm.com/docs/git-tag>
- Colección oficial de plantillas `.gitignore` (GitHub): <https://github.com/github/gitignore>
- Pull requests en GitHub: <https://docs.github.com/en/pull-requests>
- Merge requests en GitLab: <https://docs.gitlab.com/ee/user/project/merge_requests/>
- Conventional Commits: <https://www.conventionalcommits.org/en/v1.0.0/>
- Semantic Versioning: <https://semver.org/>

## Resultado esperado

Al finalizar esta ruta deberías poder explicar y demostrar la siguiente
cadena:

```text
Trabajo en paralelo con ramas → pull request con revisión real
   → conflicto resuelto en equipo → integración frecuente
   → arquitectura separada por responsabilidades
   → patrón de diseño que resuelve un problema real
   → primer incremento funcional del proyecto
```

La meta de este bloque no es memorizar comandos de Git ni nombres de
patrones. Es que tu equipo pueda trabajar en el mismo proyecto, al
mismo tiempo, sin pisarse — y dejar el código organizado para seguir
creciendo en los bloques siguientes.
