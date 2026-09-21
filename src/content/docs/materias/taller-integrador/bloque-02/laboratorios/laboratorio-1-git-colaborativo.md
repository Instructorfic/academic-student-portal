---
title: "Laboratorio 1 — Git colaborativo: ramas, pull requests y conflictos"
description: "Bloque II de Taller Integrador — trabaja en equipo sobre el mismo repositorio: ramas, pull request, code review y un conflicto de fusión real."
---

**Modalidad:** Laboratorio guiado, en equipo. **Requiere:** repositorio
del Bloque I funcionando y todos los integrantes con acceso.

## 1. Propósito

Al cerrar el Bloque I dejaron un repositorio con un solo historial
lineal de commits. Nadie trabajó todavía en paralelo. Nadie revisó el
código de otra persona antes de integrarlo. Nadie resolvió un conflicto
real.

Este laboratorio corrige eso. Van a trabajar como equipo, en el mismo
repositorio, al mismo tiempo, sobre el mismo proyecto.

## 2. ¿Qué vamos a lograr?

Al terminar este laboratorio su equipo tendrá:

```text
☐ Al menos dos ramas de característica creadas por integrantes distintos.
☐ Al menos un pull request abierto, revisado y aprobado por otro integrante.
☐ Al menos un conflicto de fusión provocado y resuelto correctamente.
☐ Un README actualizado con el flujo de trabajo que van a seguir.
☐ Commits redactados con Conventional Commits (feat, fix, docs, refactor).
☐ Una etiqueta anotada v0.1.0 marcando el primer incremento.
```

## 3. Antes de comenzar

### Requisitos

```text
Repositorio del Bloque I funcionando.
Aplicación Laravel ejecutable con `php artisan serve`.
Todos los integrantes con acceso al repositorio remoto.
```

Si algún integrante todavía no tiene acceso, resuélvanlo antes de
continuar. **Este laboratorio no funciona con un solo integrante
trabajando.**

Verifiquen el estado actual:

```bash
cd nombre-del-proyecto
git status
git log --oneline
```

Deben ver el historial que construyeron en el Bloque I.

## 4. Paso 1 — Definir el flujo de ramas

Antes de crear ramas, el equipo debe acordar un flujo. Usen este, el más
simple que existe:

```text
main
 └── feature/nombre-corto-de-la-funcionalidad
```

Reglas:

```text
Nadie trabaja directamente sobre main.
Cada funcionalidad nueva nace en su propia rama.
Una rama se integra mediante pull request, nunca con git push directo a main.
Una rama se elimina después de integrarse.
```

## 5. Paso 2 — Modelo con ReservaFIC

Antes de tocar su proyecto real, observen este ejemplo. Dos integrantes
del equipo de ReservaFIC van a trabajar al mismo tiempo:

```text
Integrante A: agregar el campo "número de serie" al modelo Equipo.
Integrante B: agregar validación para que un equipo no se preste dos
              veces en el mismo horario.
```

Cada uno crea su propia rama:

```bash
git checkout -b feature/numero-serie-equipo
```

```bash
git checkout -b feature/validar-doble-reserva
```

Ambos parten de `main`, ambos trabajan en paralelo, ninguno bloquea al
otro.

## 6. Paso 3 — Crear su primera rama de característica

Cada integrante elige **una** funcionalidad pendiente del Product
Backlog de su propio proyecto.

```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-de-su-funcionalidad
```

### Punto de control 1

```bash
git branch
```

Deben ver su nueva rama marcada con `*`.

## 7. Paso 4 — Trabajar y confirmar cambios

Hagan el cambio correspondiente a su funcionalidad.

```bash
git add .
git commit -m "feat: descripción corta y clara del cambio"
```

> **Ampliación — Conventional Commits.** No forma parte del temario
> oficial del bloque; ver
> [2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).
> Usen la especificación pública Conventional Commits para todos los
> commits de este laboratorio:

```text
feat: nueva funcionalidad
fix: corrección de un error
docs: cambios de documentación
refactor: cambio interno sin alterar el comportamiento
```

Con ámbito, cuando ayude a precisar qué parte del proyecto cambia:

```bash
git commit -m "feat(prestamos): agregar validación de fecha de devolución"
```

Si el cambio rompe algo que ya funcionaba, márquenlo con `!`:

```bash
git commit -m "feat!: cambiar el formato de respuesta de la API de préstamos"
```

No usen mensajes como `cambios`, `arreglos`, `ya quedó`.

## 8. Paso 5 — Subir la rama y abrir el pull request

```bash
git push origin feature/nombre-de-su-funcionalidad
```

En su plataforma (GitHub o GitLab):

```text
1. Abran un pull request de su rama hacia main.
2. Escriban qué hace el cambio y por qué.
3. Asignen a otro integrante como revisor.
```

### Punto de control 2

El pull request debe existir y debe tener un revisor asignado antes de
continuar.

## 9. Paso 6 — Code review real

La persona asignada como revisora debe:

```text
☐ Leer el código, no solo el título del pull request.
☐ Ejecutar el proyecto localmente si el cambio no es trivial.
☐ Dejar al menos un comentario (una pregunta, una sugerencia, o una aprobación explícita).
☐ Aprobar el pull request solo si de verdad funciona.
```

No aprueben un pull request sin leerlo. Esa es exactamente la práctica
que este laboratorio busca romper.

## 10. Paso 7 — Integrar el pull request

Una vez aprobado:

```text
1. Integren el pull request desde la plataforma.
2. Verifiquen que main sigue funcionando.
3. Eliminen la rama ya integrada.
```

```bash
git checkout main
git pull origin main
php artisan serve
```

Confirmen que la aplicación sigue respondiendo correctamente.

## 11. Paso 8 — Provocar y resolver un conflicto real

Este paso es obligatorio, no opcional.

**Instrucciones.** Dos integrantes deben modificar, cada uno en su
propia rama, la misma línea del mismo archivo (por ejemplo, la misma
ruta en `routes/web.php`, o el mismo método de un controlador).

```bash
git checkout main
git checkout -b feature/conflicto-a
# modifiquen la misma línea que el otro integrante
git add .
git commit -m "feat: cambio A sobre la misma línea"
git push origin feature/conflicto-a
```

El segundo integrante repite lo mismo en paralelo, sobre la misma
línea, en su propia rama. Abran ambos pull requests hacia `main`.
Integren el primero sin problema. Al integrar el segundo, la plataforma
debe marcar un conflicto.

### Resolver el conflicto localmente

```bash
git checkout feature/conflicto-b
git fetch origin
git merge origin/main
```

Git va a marcar el archivo en conflicto:

```text
<<<<<<< HEAD
su versión
=======
la versión de main
>>>>>>> main
```

```text
1. Abran el archivo.
2. Decidan, como equipo, qué versión (o combinación) es correcta.
3. Eliminen las marcas <<<<<<<, ======= y >>>>>>>.
4. Guarden el archivo.
```

```bash
git add .
git commit -m "fix: resolver conflicto entre feature/conflicto-a y feature/conflicto-b"
git push origin feature/conflicto-b
```

### Punto de control 3

El pull request debe poder integrarse después de resolver el conflicto,
sin marcas de conflicto restantes en el código.

## 12. Paso 9 — Actualizar el README

Agreguen al `README.md` del proyecto una sección:

```text
## Flujo de trabajo

- Nadie trabaja directamente sobre main.
- Cada funcionalidad nace en una rama feature/nombre-corto.
- Toda integración pasa por pull request con al menos un revisor.
- Las ramas se eliminan después de integrarse.
```

## 13. Paso 10 — Etiquetar el incremento con versión semántica

> **Ampliación** — ver
> [2. Trabajo colaborativo con Git](/materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git/).

Una vez que `main` tiene integrados sus pull requests, márquenlo con una
etiqueta (*tag*) usando **Semantic Versioning**:

```bash
git checkout main
git pull origin main
git tag -a v0.1.0 -m "Primer incremento funcional del Bloque II"
git push origin v0.1.0
```

Usen `v0.1.0` (no `v1.0.0` todavía): el proyecto apenas tiene su primer
incremento, no una versión estable para producción. Si más adelante en
el semestre agregan una funcionalidad nueva sin romper nada, la
siguiente etiqueta sube el número MENOR (`v0.2.0`); si corrigen un
error, sube el número PARCHE (`v0.1.1`).

### Punto de control 4

```bash
git tag
git show v0.1.0
```

Debe aparecer `v0.1.0` en la lista, y `git show` debe mostrar el
mensaje, el autor y la fecha de la etiqueta.

## 14. Evidencia del laboratorio

- **A. Historial de ramas** — captura de al menos dos ramas de
  característica creadas por integrantes distintos.
- **B. Pull request revisado** — captura del pull request con al menos
  un comentario de revisión y su aprobación.
- **C. Conflicto resuelto** — captura del conflicto de fusión y captura
  del archivo ya resuelto.
- **D. README actualizado** — sección "Flujo de trabajo" visible en el
  repositorio.
- **E. Commits con Conventional Commits** — captura de `git log
  --oneline` mostrando al menos tres commits con tipo (feat, fix, docs
  o refactor).
- **F. Etiqueta de versión semántica** — salida de `git show v0.1.0`
  (Paso 10).

## 15. Reflexión del equipo

1. ¿Qué hubiera pasado si hubieran trabajado los dos directamente sobre
   `main` en el Paso 8?
2. ¿El code review del Paso 6 encontró algo que el autor no había
   visto?
3. ¿Qué parte del flujo les resultó más incómoda y por qué?
4. Si mañana se integra un quinto integrante al equipo, ¿qué le
   explicarían primero sobre este flujo?
5. Si la próxima etiqueta después de `v0.1.0` fuera `v0.2.0` en vez de
   `v1.0.0`, ¿qué les está diciendo eso sobre el tipo de cambio que
   hicieron?

## 16. Criterio de finalización

```text
☐ Existen al menos dos ramas de característica de integrantes distintos.
☐ Existe al menos un pull request integrado con revisión real.
☐ Existe al menos un conflicto de fusión resuelto correctamente.
☐ El README documenta el flujo de trabajo.
☐ Los commits usan tipo de Conventional Commits (feat, fix, docs, refactor).
☐ Existe una etiqueta anotada v0.1.0 en el repositorio remoto.
```

## 17. Conexión con el resto del bloque

El flujo de ramas de este laboratorio es la base operativa del resto
del Bloque II. El
[Laboratorio 2 (arquitectura)](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/)
y el
[Laboratorio 3 (patrones de diseño)](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno/)
se integran usando exactamente este mismo flujo: rama, pull request,
revisión. No vuelvan a hacer `git push` directo a `main` en ningún
laboratorio posterior de este bloque.
