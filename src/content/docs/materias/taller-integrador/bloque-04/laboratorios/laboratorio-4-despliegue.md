---
title: "Laboratorio 4 — Despliegue en un servidor con HTTPS"
description: "Bloque IV de Taller Integrador — desplegar el sistema en un servidor con dominio, HTTPS con Caddy, runbook y reversión."
---

## 1. Propósito

Tu sistema corre igual en todas las laptops del equipo. Ahora tiene que
correr en un lugar donde **otras personas** lo puedan usar: un servidor
con una dirección pública, un nombre fácil de recordar y una conexión
cifrada.

La buena noticia es que casi todo el trabajo ya está hecho. El servidor
no necesita PHP, ni Composer, ni tu código: solo Docker, tres archivos
de configuración, un `.env` y la imagen que ya publicaste.

Este laboratorio tiene **dos rutas** según la infraestructura
disponible:

| Ruta | Cuándo | Resultado |
| --- | --- | --- |
| **A. Servidor remoto con dominio** | El docente o la institución proporcionó una VM Ubuntu con IP pública y un dominio o subdominio | `https://<dominio>` accesible desde Internet con certificado válido |
| **B. HTTPS local** | Todavía no hay servidor o dominio | El mismo flujo en tu máquina con `DOMINIO=localhost` y certificado de la autoridad local de Caddy |

Los pasos 1 a 3 y 9 a 11 son iguales para las dos rutas.

---

## 2. ¿Qué vamos a lograr?

```text
☐ compose.prod.yaml con el proxy Caddy y configuración de producción.
☐ Caddyfile con proxy inverso hacia app.
☐ Laravel configurado para confiar en el proxy.
☐ Un servidor Ubuntu con Docker Engine, firewall y acceso al registry (ruta A).
☐ El sistema publicado con HTTPS (ruta A: dominio real; ruta B: localhost).
☐ Una actualización y una reversión de versión ejecutadas.
☐ docs/DESPLIEGUE.md (runbook) y ADR-003.
```

---

## 3. Antes de comenzar

```text
Laboratorio 3 integrado.
Imagen candidata publicada en el registry (Lab 2): 0.3.0-rc.N.
Ruta A: datos del servidor (IP, usuario, llave SSH) y dominio entregados por el docente o la institución.
```

```bash
git checkout main
git pull origin main
git checkout -b deploy/produccion
```

---

## 4. Paso 1 — Archivos de producción en el repositorio (15 min)

### 4.1 `compose.prod.yaml`

```yaml
# Producción: docker compose -f compose.yaml -f compose.prod.yaml ...
# (o COMPOSE_FILE=compose.yaml:compose.prod.yaml en el .env del servidor)
services:
  app:
    environment:
      APP_ENV: production
      APP_DEBUG: "false"

  proxy:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    environment:
      DOMINIO: ${DOMINIO:?Define DOMINIO en .env}
    volumes:
      - ./docker/caddy:/etc/caddy:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app

volumes:
  caddy_data:
  caddy_config:
```

| Elemento | Por qué |
| --- | --- |
| Solo `proxy` tiene `ports` | `app` y `db` quedan accesibles únicamente por la red interna (tema [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/)) |
| `443:443/udp` | Caddy puede usar HTTP/3, que viaja por UDP; tomado del ejemplo de Compose de la imagen oficial de Caddy |
| `./docker/caddy:/etc/caddy` | Se monta la **carpeta** y no el archivo `Caddyfile`: la página oficial de la imagen lo recomienda así para que los cambios se apliquen bien |
| `caddy_data` | Ahí guarda Caddy los certificados. La documentación de Caddy exige que ese directorio sea persistente; si se pierde, pide certificados nuevos cada vez |
| `APP_DEBUG: "false"` | Laravel advierte que con `true` en producción se pueden exponer valores de configuración sensibles |

### 4.2 `docker/caddy/Caddyfile`

```text
{$DOMINIO} {
	reverse_proxy app:80
	encode gzip
}
```

(Explicación línea por línea en el tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/).)

### 4.3 Laravel detrás del proxy

En `bootstrap/app.php`, dentro del `->withMiddleware(...)` que ya
existe, agrega la línea de `trustProxies`:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->trustProxies(at: '*');
})
```

Si tu `withMiddleware` ya tenía otras líneas, conserva esas y agrega
esta. Por qué es seguro confiar en `*` en esta arquitectura: tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/).

Ejecuta la suite para confirmar que no rompiste nada:

```text
$ docker compose exec app php artisan test
```

---

## 5. Paso 2 — Ensayo general en tu máquina: ruta B (15 min)

Antes de tocar un servidor, prueba la combinación de producción en tu
máquina. **Este paso es obligatorio en las dos rutas**: si falla aquí,
fallará allá.

Construye la imagen con el cambio de `trustProxies`:

```text
$ docker build --target produccion -t reservafic:0.3.0-local .
```

Detén el ambiente de desarrollo (usa los mismos puertos) y crea un
archivo de variables de ensayo **fuera del repositorio** o usa tu `.env`
agregando temporalmente:

```dotenv
APP_IMAGE=reservafic:0.3.0-local
DOMINIO=localhost
APP_URL=https://localhost
```

```text
$ docker compose down
$ docker compose -f compose.yaml -f compose.prod.yaml up -d
$ docker compose -f compose.yaml -f compose.prod.yaml ps
```

Abre `https://localhost`. El navegador mostrará una advertencia de
certificado: Caddy usó su autoridad local, que tu sistema no conoce.
Acepta la advertencia **solo** para este ensayo. Comprueba:

```text
$ curl -k -s -o /dev/null -w "%{http_code}\n" https://localhost/up
200
$ curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost/up
308 -> https://localhost/up
```

(`-k` le dice a `curl` que acepte el certificado local. El código
exacto de la redirección puede variar según la versión de Caddy; lo
importante es que sea una redirección 3xx hacia `https://`.)

**Explica:**

* ¿Por qué `http://` respondió con una redirección? ¿Quién la hizo:
  Laravel o Caddy?
* ¿Qué puertos publica ahora tu máquina? (`docker compose ... ps`) ¿Por
  qué no aparece el 5433 de la base ni el 8080 de la aplicación?

**Ruta B termina aquí** para la parte de publicación: continúa en el
paso 9 (actualizar y revertir) y haz las actualizaciones contra este
ensayo local, cambiando `APP_IMAGE`. Al terminar, quita las tres
variables de ensayo de tu `.env` y regresa a desarrollo:

```text
$ docker compose -f compose.yaml -f compose.prod.yaml down
$ docker compose up -d
```

---

## 6. Paso 3 — Preparar el servidor: ruta A (estudio independiente, 40 min)

> Estos comandos se ejecutan **en el servidor**, conectado por SSH. Uno
> o dos integrantes lo preparan; el resto revisa el runbook.

### 6.1 Entrar y actualizar

```text
$ ssh <usuario>@<IP-del-servidor>
servidor$ sudo apt update && sudo apt upgrade -y
```

### 6.2 Firewall

```text
servidor$ sudo ufw allow OpenSSH
servidor$ sudo ufw allow 80/tcp
servidor$ sudo ufw allow 443/tcp
servidor$ sudo ufw allow 443/udp
servidor$ sudo ufw enable
servidor$ sudo ufw status
```

> **Primero `OpenSSH`, después `enable`.** Si activas el firewall sin
> permitir SSH, pierdes el acceso al servidor.

> **Docker y ufw.** La documentación de Docker advierte que el tráfico a
> los puertos publicados de los contenedores se desvía **antes** de
> pasar por las reglas de `ufw`. El firewall no protege un puerto que
> tú publiques con Docker. Por eso la protección real es que
> `compose.prod.yaml` solo publique 80 y 443.

> **Firewall del proveedor.** Muchos proveedores de nube tienen además
> su propio firewall o "grupo de seguridad". Los puertos 80 y 443 deben
> estar abiertos también ahí.

### 6.3 Instalar Docker Engine

Sigue la guía oficial **"Install Docker Engine on Ubuntu"**
(`https://docs.docker.com/engine/install/ubuntu/`), método "using the
apt repository". En resumen (verifica contra la guía, que es la
fuente):

```text
servidor$ sudo apt install ca-certificates curl
servidor$ sudo install -m 0755 -d /etc/apt/keyrings
servidor$ sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
servidor$ sudo chmod a+r /etc/apt/keyrings/docker.asc
# Agregar el repositorio: copia el bloque exacto de la guía oficial
servidor$ sudo apt update
servidor$ sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
servidor$ sudo docker run hello-world
```

No se copia aquí el comando que agrega el repositorio porque cambia de
formato entre versiones; tómalo de la guía.

Para usar Docker sin `sudo`, la guía de post-instalación agrega tu
usuario al grupo `docker`. Hazlo **solo** para quienes administran el
servidor: ese grupo equivale a ser administrador de la máquina.

```text
servidor$ sudo usermod -aG docker $USER
servidor$ exit
$ ssh <usuario>@<IP-del-servidor>
servidor$ docker ps
```

### 6.4 Acceso de solo lectura al registry

El servidor solo necesita **descargar** imágenes, nunca subirlas. En
GitLab, en el proyecto: **Settings > Repository > Deploy tokens**, crea
un token con el permiso `read_registry` (documentación de GitLab,
"Deploy tokens"). Copia el usuario y el token: GitLab no los vuelve a
mostrar.

```text
servidor$ docker login registry.gitlab.com -u <usuario-del-deploy-token>
Password: (pega el token)
Login Succeeded
```

**Explica:** ¿por qué un deploy token de solo lectura y no tu token
personal del Lab 2? (Principio de mínimo privilegio, Bloque III,
3.4.1.)

---

## 7. Paso 4 — Configurar y desplegar: ruta A (20 min)

### 7.1 Archivos en el servidor

Desde **tu máquina**, en la raíz del proyecto:

```text
$ ssh <usuario>@<IP> "sudo mkdir -p /opt/reservafic/docker/caddy && sudo chown -R \$USER /opt/reservafic"
$ scp compose.yaml compose.prod.yaml <usuario>@<IP>:/opt/reservafic/
$ scp docker/caddy/Caddyfile <usuario>@<IP>:/opt/reservafic/docker/caddy/
```

En el servidor **no** hay código fuente (tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)).

### 7.2 El `.env` de producción

En el servidor:

```text
servidor$ cd /opt/reservafic
servidor$ nano .env
```

Contenido (con los valores de tu equipo):

```dotenv
APP_NAME=ReservaFIC
APP_ENV=production
APP_DEBUG=false
APP_KEY=
APP_URL=https://<tu-dominio>

APP_IMAGE=registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.2
DOMINIO=<tu-dominio>
COMPOSE_FILE=compose.yaml:compose.prod.yaml

DB_DATABASE=reservafic
DB_USERNAME=reservafic
DB_PASSWORD=
```

Genera los dos secretos **en el servidor**, distintos de los de
desarrollo:

```text
servidor$ docker run --rm registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.2 php artisan key:generate --show
servidor$ openssl rand -base64 32
```

Pega la llave en `APP_KEY` y la cadena aleatoria en `DB_PASSWORD`.
Protege el archivo:

```text
servidor$ chmod 600 .env
servidor$ ls -l .env
-rw------- 1 <usuario> <usuario> ... .env
```

Agrega al `.env` cualquier otra variable que tu proyecto tenga en
`.env.example` (correo, servicios externos, etc.), con valores de
producción.

### 7.3 Verificar el dominio

```text
$ dig +short <tu-dominio>
<IP-del-servidor>
```

Si no devuelve la IP del servidor, **no sigas**: Caddy no podrá obtener
el certificado y, tras varios intentos fallidos, la autoridad de
certificación puede limitar temporalmente nuevas solicitudes. Pide al
responsable del dominio que cree o corrija el registro A (tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)).

### 7.4 Desplegar

```text
servidor$ docker compose pull
servidor$ docker compose up -d
servidor$ docker compose ps
servidor$ docker compose logs proxy --tail 30
```

En los logs de `proxy` busca líneas que indiquen que el certificado se
obtuvo para tu dominio. Después, prepara la base y la caché de Laravel
(las migraciones son un paso explícito):

```text
servidor$ docker compose exec app php artisan migrate --force
servidor$ docker compose exec app php artisan optimize
```

Crea el primer usuario administrador con `tinker` (no hay seeder en
producción; datos explícitos, contraseña fuerte, sin dejarla en el
historial compartido del equipo).

### 7.5 Comprobar desde fuera

Desde **tu máquina**:

```text
$ curl -s -o /dev/null -w "%{http_code}\n" https://<tu-dominio>/up
200
$ curl -sI http://<tu-dominio> | head -3
HTTP/1.1 308 Permanent Redirect
Location: https://<tu-dominio>/
```

Abre `https://<tu-dominio>` en el navegador: candado sin advertencias.

Completa la lista de verificación del tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/) y pégala en el merge
request con cada casilla comprobada:

```text
☐ APP_ENV=production y APP_DEBUG=false
☐ APP_URL con https://
☐ Solo el proxy publica puertos (80 y 443)       → docker compose ps
☐ La base de datos no tiene puerto publicado
☐ .env del servidor con permisos 600 y valores distintos a desarrollo
☐ ufw permite solo 22, 80 y 443                  → sudo ufw status
☐ https://dominio/up responde 200
☐ Un error provocado no muestra trazas ni configuración
```

Para la última casilla:

```text
$ curl -s https://<tu-dominio>/api/v1/prestamos/abc -H "Accept: application/json"
```

La respuesta debe ser el formato de error del Bloque III, sin trazas.

#### Punto de control 1

```text
☐ El sistema responde por HTTPS (ruta A: certificado válido; ruta B: autoridad local).
☐ http redirige a https.
☐ Solo 80 y 443 están publicados.
```

---

## 8. Paso 5 — Consultar logs y estado en el servidor (5 min)

```text
servidor$ docker compose ps
servidor$ docker compose logs app --tail 50
servidor$ docker compose logs -f proxy
servidor$ docker stats --no-stream
```

**Explica:** si mañana un usuario reporta "la página no carga", ¿qué
tres comandos ejecutarías primero y en qué orden? Escríbelo en el
runbook (paso 10).

---

## 9. Paso 6 — Actualizar y revertir (15 min)

Ejecuten este paso en la ruta que hayan seguido (A en el servidor, B en
el ensayo local).

### 9.1 Una versión nueva

Hagan un cambio pequeño y visible (por ejemplo, el texto del pie de
página), intégrenlo con merge request y publiquen una nueva candidata:

```bash
git tag -a v0.3.0-rc.3 -m "Candidata: cambio de prueba para actualización"
git push origin v0.3.0-rc.3
```

Cuando el pipeline publique `0.3.0-rc.3`:

```text
servidor$ sed -i 's|^APP_IMAGE=.*|APP_IMAGE=registry.gitlab.com/<grupo>/<proyecto>:0.3.0-rc.3|' .env
servidor$ docker compose pull app
servidor$ docker compose up -d app
servidor$ docker compose exec app php artisan migrate --force
servidor$ docker compose exec app php artisan optimize
```

Mide el tiempo sin servicio: en otra terminal, antes de `up -d`,
ejecuta un ciclo que consulte `/up` cada segundo y cuenta los fallos.

```text
$ while true; do curl -s -o /dev/null -w "%{http_code} " https://<tu-dominio>/up; sleep 1; done
```

### 9.2 Revertir

Supongan que `rc.3` tiene un defecto. Regresen a `rc.2` con los mismos
comandos, cambiando la etiqueta en `APP_IMAGE`.

**Explica:**

* ¿Por qué la reversión funcionó en segundos? (Tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/): etiquetas
  inmutables.)
* ¿Qué tendrían que hacer si `rc.3` hubiera incluido una migración que
  cambia una tabla? (Tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/).)
* ¿Cuántos segundos sin servicio midieron? ¿Qué haría falta para que
  fueran cero? (Lo retomarás en el análisis de capacidad: más de una
  instancia.)

---

## 10. Paso 7 — Runbook: `docs/DESPLIEGUE.md` (15 min)

Un **runbook** es la guía que permite a cualquier integrante operar el
sistema sin depender de quien lo instaló. Usen esta estructura:

```markdown
# Despliegue de <proyecto>

## Infraestructura
- Servidor: <proveedor o institución>, Ubuntu <versión>, <RAM>, <CPU>
- Dominio: <dominio> (registro A administrado por <quién>)
- Acceso: SSH con llave para <integrantes>
- Ubicación de los archivos: /opt/<proyecto>

## Primer despliegue
1. ...
(los pasos 6 y 7 de este laboratorio, adaptados a su proyecto)

## Actualizar a una versión nueva
1. ...

## Revertir
1. ...
2. Si la versión revertida incluía migraciones: ...

## Diagnóstico rápido
1. docker compose ps
2. ...

## Secretos
- Dónde están (sin escribir sus valores).
- Quién puede leerlos.
- Cómo rotar DB_PASSWORD y APP_KEY (investigar el impacto de rotar APP_KEY).

## Respaldo de la base de datos
- Comando de respaldo (ver reto 1).
```

La prueba del runbook es la misma que la del README: **otro
integrante** debe poder actualizar el sistema leyendo solo el
documento.

---

## 11. Paso 8 — ADR-003 (10 min)

Creen `docs/adr/ADR-003-contenedores-y-despliegue.md` con el formato
del Bloque III ([`10-ESTANDAR-DOCUMENTACION.md`](/recursos/estandares/10-estandar-documentacion/) §7). Decisiones a
registrar:

* Imagen de aplicación basada en `php:8.3-apache` en lugar de Nginx +
  PHP-FPM.
* Caddy como proxy inverso y HTTPS.
* Migraciones como paso explícito del runbook.
* Infraestructura elegida y por qué.
* Consecuencias negativas que aceptan (por ejemplo, unos segundos sin
  servicio al actualizar).

```bash
git add compose.prod.yaml docker/caddy bootstrap/app.php docs/DESPLIEGUE.md docs/adr/ADR-003-contenedores-y-despliegue.md README.md
git commit -m "deploy: agregar configuración de producción con Caddy y runbook"
git push -u origin deploy/produccion
```

Agreguen al README la URL pública (ruta A) o la nota "despliegue
validado en ensayo local; servidor pendiente de infraestructura" (ruta
B).

---

## 12. Troubleshooting

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `required variable DOMINIO is missing` | Falta en `.env` | Agrégala |
| Caddy repite errores al obtener el certificado | DNS no apunta al servidor, o 80/443 cerrados en `ufw` o en el firewall del proveedor | `dig +short dominio`; `sudo ufw status`; revisa la consola del proveedor. Corrige antes de reintentar |
| `pull access denied` o `unauthorized` en el servidor | El servidor no inició sesión en el registry o el deploy token no tiene `read_registry` | Paso 6.4 |
| `manifest unknown` | La etiqueta en `APP_IMAGE` no existe en el registry | Revisa Deploy > Container Registry |
| `502 Bad Gateway` | Caddy no alcanza `app`: el contenedor no corre o no está sano | `docker compose ps`; `docker compose logs app` |
| La página carga pero los enlaces son `http://` | Falta `trustProxies` o la imagen no se reconstruyó | Paso 4.3 y nueva versión de la imagen |
| `419 Page Expired` en formularios | `APP_URL` o sesión con dominio distinto | `APP_URL=https://<dominio>`; `php artisan optimize` de nuevo |
| Cambié el `.env` y no se refleja | El contenedor conserva las variables de cuando se creó, y la configuración está en caché | `docker compose up -d --force-recreate app` y `php artisan optimize` |
| Perdí el acceso SSH | `ufw enable` sin permitir OpenSSH | Consola web del proveedor o de la institución |
| `no space left on device` | Imágenes viejas acumuladas | `docker image prune` (revisa antes con `docker system df`) |

---

## 13. Evidencia del laboratorio

```text
☐ compose.prod.yaml, Caddyfile y trustProxies en el repositorio.
☐ Ensayo local (paso 2) con /up 200 y redirección http → https.
☐ Ruta A: URL pública con HTTPS válido y lista de verificación completa.
   Ruta B: evidencia del ensayo local y nota en el README.
☐ Actualización y reversión ejecutadas, con segundos sin servicio medidos.
☐ docs/DESPLIEGUE.md probado por otro integrante.
☐ ADR-003.
☐ Merge request revisado e integrado.
```

---

## 14. Reflexión del equipo

1. ¿Qué parte del despliegue habría sido imposible o muy lenta sin la
   imagen del Lab 2?
2. ¿Qué secreto del servidor sería más grave perder o filtrar? ¿Qué
   harían si pasara?
3. Un integrante propone publicar el puerto 5432 en el servidor "para
   revisar la base desde casa". ¿Qué le responden?

---

## 15. Reto adicional (opcional)

1. **Respaldo.** Escribe y prueba un comando que genere un respaldo de
   la base con `pg_dump` desde el contenedor `db` hacia un archivo del
   servidor, y otro que lo restaure en tu ambiente local.
2. **Despliegue continuo.** Agrega un trabajo manual (`when: manual`) en
   `.gitlab-ci.yml` que se conecte por SSH al servidor y ejecute los
   comandos de actualización. Usa una llave SSH guardada como variable
   protegida de GitLab. Discute los riesgos.
3. **Nginx + Certbot.** Reemplaza Caddy por Nginx con certificados de
   Certbot y compara el número de pasos.

---

## 16. Criterio de finalización

```text
☐ El sistema está publicado con HTTPS (ruta A) o validado en ensayo local con HTTPS (ruta B).
☐ Solo el proxy publica puertos.
☐ El equipo actualizó y revirtió una versión siguiendo su runbook.
☐ Otro integrante puede operar el sistema leyendo docs/DESPLIEGUE.md.
```

Siguiente: en el Laboratorio 5 medirás cuánta carga soporta el sistema
y razonarás sobre el escenario de 100,000 usuarios.
