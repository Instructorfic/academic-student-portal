---
title: "Configuración de doble repositorio remoto (GitHub + GitLab institucional)"
description: "Taller Integrador — guía técnica: enviar los cambios del proyecto a GitHub y al GitLab institucional con un solo git push."
---

**Taller Integrador**
Guía técnica · Recurso transversal

---

## 1. Propósito

Esta guía describe cómo configurar un proyecto local para enviar sus cambios **simultáneamente** a dos plataformas de control de versiones con un solo `git push`:

- **GitHub**, donde el equipo ya tiene su repositorio.
- **GitLab institucional** (*GitLab On-Premise*), en `code.ficlabs.com.mx`.

El resultado es un único remoto `origin` que **descarga** (*fetch*) desde GitHub y **envía** (*push*) a ambos servidores.

---

## 2. Requisitos previos

- El proyecto local ya está vinculado y sincronizado con su repositorio de GitHub, configurado como el remoto `origin`.
- Conoces tu identificador en el curso: **grupo** (Grupo 1 o Grupo 4) y **equipo** (Equipo 1 a Equipo 8).
- Tienes una cuenta institucional activa en el GitLab de la facultad y puedes iniciar sesión.

Puedes comprobar el primer requisito con:

```bash
git remote -v
```

Debe aparecer `origin` apuntando a la URL de GitHub.

---

## 3. Paso 1 — Crear el proyecto en GitLab

1. Entra a `https://code.ficlabs.com.mx`.
2. Ve al directorio asignado a tu grupo:

   | Grupo | Ruta |
   |---|---|
   | Grupo 1 | `fic/informatica/taller-integrador/2026-2027-1/grupo-1/equipo-X` |
   | Grupo 4 | `fic/informatica/taller-integrador/2026-2027-1/grupo-4/equipo-X` |

3. Dentro del directorio de tu equipo, crea un proyecto nuevo (*New Project*).
4. **Crea el proyecto vacío.** Desmarca las opciones para incluir `README`, `.gitignore` o licencia. Si GitLab crea un commit inicial, el primer envío será rechazado porque los historiales no coinciden.
5. Copia la URL HTTPS del proyecto. Debe tener una forma análoga a:

   ```text
   https://code.ficlabs.com.mx/fic/informatica/taller-integrador/2026-2027-1/grupo-4/equipo-1/nombre-del-repositorio.git
   ```

---

## 4. Paso 2 — Generar el token de acceso personal (PAT)

El GitLab institucional es GitLab Enterprise Edition en su nivel gratuito (*Free*), que incluye los tokens de acceso personal. Por política de seguridad de la infraestructura institucional, la autenticación por HTTPS requiere un **token de acceso personal** (*Personal Access Token*, PAT) en lugar de la contraseña del portal.

1. En la esquina superior derecha, selecciona tu avatar y después **Edit profile**.
2. En la barra lateral izquierda, selecciona **Access > Personal access tokens**.
3. En la lista desplegable **Generate token**, selecciona **Legacy token**.
4. En **Token name**, escribe un nombre (por ejemplo, `entorno-desarrollo`). La descripción (**Token description**) es opcional.
5. En **Expiration date**, elige una fecha que cubra el semestre. Si la dejas vacía, el token vence a los 365 días.
6. Selecciona el alcance (*scope*) `write_repository`. El alcance `api` también funciona, pero concede más permisos de los necesarios.
7. Selecciona **Generate token**.
8. Copia el token y guárdalo en un lugar seguro. **GitLab lo muestra una sola vez**: al salir o recargar la página ya no podrás verlo. No lo compartas ni lo incluyas en el repositorio.

---

## 5. Paso 3 — Agregar GitLab como segundo destino de envío

Abre una terminal en la raíz del proyecto local.

### 5.1 Registrar GitHub como destino de envío explícito

```bash
git remote set-url --add --push origin https://github.com/USUARIO-GITHUB/NOMBRE-REPO.git
```

Usa exactamente la URL que muestra `git remote -v` para GitHub.

> **Por qué este paso es necesario.** Mientras un remoto no tiene destinos de envío explícitos, Git envía a la misma URL de la que descarga. En cuanto se registra el primer destino de envío con `--add --push`, Git envía **solo** a los destinos registrados. Si agregas GitLab sin registrar antes GitHub, tus `git push` dejarán de llegar a GitHub.

### 5.2 Registrar GitLab como segundo destino de envío

```bash
git remote set-url --add --push origin https://code.ficlabs.com.mx/fic/informatica/taller-integrador/2026-2027-1/grupo-G/equipo-E/nombre-del-repositorio.git
```

Sustituye `grupo-G`, `equipo-E` y `nombre-del-repositorio` por los valores de la URL que copiaste en el paso 1.

### 5.3 Verificar la configuración

```bash
git remote -v
```

La salida debe mostrar **un** destino de descarga (GitHub) y **dos** destinos de envío:

```text
origin  https://github.com/USUARIO-GITHUB/NOMBRE-REPO.git (fetch)
origin  https://github.com/USUARIO-GITHUB/NOMBRE-REPO.git (push)
origin  https://code.ficlabs.com.mx/fic/.../equipo-X/NOMBRE-REPO.git (push)
```

Si solo aparece la línea `(push)` de GitLab, falta el paso 5.1: ejecútalo y repite la verificación.

---

## 6. Paso 4 — Enviar los cambios a ambos repositorios

Envía la rama principal (`main` o `master`, según tu proyecto):

```bash
git push origin main
```

Git envía primero a GitHub y después a GitLab. Cuando el servidor institucional solicite credenciales:

- **Username:** tu nombre de usuario en GitLab.
- **Password:** el token generado en el paso 2, **no** la contraseña del portal.

### Validar el envío

Abre ambos repositorios en el navegador (GitHub y `code.ficlabs.com.mx`) y verifica que el historial de commits y los archivos coincidan.

---

## 7. Solución de problemas

| Síntoma | Causa | Solución |
|---|---|---|
| `error: src refspec main does not match any` | La rama local no se llama `main`. | Envía la rama correcta (`git push origin master`) o renombra la rama local con `git branch -M main`. |
| `HTTP 401` o `HTTP 403` al enviar a GitLab | Se ingresó la contraseña del portal en lugar del token, el token no tiene el alcance `write_repository` o ya venció. | Ingresa el token como contraseña. Si persiste, genera un token nuevo con el alcance correcto. |
| El envío llega a GitLab pero no a GitHub | GitHub no está registrado como destino de envío. | Ejecuta el paso 5.1 y verifica con `git remote -v`. |
| `! [rejected] ... (fetch first)` en GitLab | El proyecto de GitLab no se creó vacío y contiene un commit inicial. | Elimina el proyecto y créalo de nuevo sin `README`, `.gitignore` ni licencia. |
| Error de verificación del certificado SSL | El servidor usa un certificado que tu equipo no reconoce, por ejemplo uno autofirmado. | Desactiva temporalmente la verificación **solo en este proyecto** con `git config http.sslVerify false`. |

Sobre la última fila: desactivar la verificación del certificado elimina una protección contra la suplantación del servidor. Úsalo solo con el servidor institucional y vuelve a activarla cuando ya no sea necesaria:

```bash
git config --unset http.sslVerify
```

No uses la opción `--global` para esta configuración, porque afectaría a todos tus repositorios.
