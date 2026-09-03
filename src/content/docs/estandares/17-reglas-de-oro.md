---
title: "DOC-17 · 20 reglas de oro del proyecto"
description: "La síntesis memorizable del handbook: el mínimo que nadie debería violar."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-ORO |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Todo el equipo |
| Fecha | 2026-08-30 |

Estas reglas son la síntesis memorizable del handbook. Si algo no está claro, estas 20 reglas son el mínimo que nadie debería violar.

1. No subas secretos, contraseñas ni tokens al repositorio. Siempre en `.env`.
2. No trabajes directamente sobre `main`. Todo pasa por una rama y un Pull Request.
3. Todo cambio importante se revisa antes de fusionarse. Nadie se autoaprueba.
4. Todo código nuevo debe poder probarse; si no sabes cómo probarlo, pregúntalo antes de darlo por terminado.
5. Si una regla del estándar no se entiende, se pregunta antes de improvisar una interpretación propia.
6. No introduzcas una tecnología, librería o patrón sin justificarlo (comentario en PR o ADR).
7. No agregues complejidad que el problema actual no necesita. Resuelve lo que hay, no lo que "podría pasar".
8. Documenta decisiones, no obviedades. Un ADR explica un "por qué" difícil de adivinar, no describe lo evidente.
9. El código en `main` siempre debe compilar/ejecutarse. Si lo rompiste, es lo primero que arreglas.
10. Toda entrada del usuario se valida, siempre, tanto en frontend como en backend.
11. Nunca confíes en que "el frontend ya validó eso" para saltarte la validación en el backend.
12. Los nombres de variables, clases y métodos dicen lo que hacen, no lo que a ti te parece corto de escribir.
13. Si copias y pegas el mismo bloque de código una tercera vez, es momento de extraerlo a una función o método.
14. PostgreSQL es la base de datos principal del proyecto. MongoDB se usa solo con justificación documentada.
15. Un commit dice qué cambió y por qué, no "cambios" o "arreglos".
16. Un Pull Request pequeño y enfocado se revisa mejor y más rápido que uno gigante que toca de todo.
17. Si tu PR rompe el pipeline de CI, no se fusiona hasta corregirlo. El CI en rojo no se ignora.
18. Los errores se manejan explícitamente; nunca se capturan y se ignoran en silencio.
19. La deuda técnica se documenta (Issue etiquetado), no se esconde debajo de un "ya lo arreglo después" no escrito.
20. El estándar existe para dar consistencia al equipo, no para castigar; si detectas que una regla no tiene sentido en un caso real, repórtalo para mejorarla ([Doc. 01](/estandares/01-general/), sección 9).
