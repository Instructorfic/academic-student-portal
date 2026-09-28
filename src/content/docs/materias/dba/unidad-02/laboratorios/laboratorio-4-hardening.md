---
title: "Laboratorio 4 — Checklist de hardening: motor, sistema operativo y red"
description: "Unidad 2 de DBA — laboratorio evaluado: endurecer un servidor PostgreSQL y uno MongoDB en tres capas."
---

<span class="badge-estado">Evaluado</span>

**SGBD:** PostgreSQL 16 y MongoDB 7.

## Objetivo del laboratorio

Documentar el estado por defecto de un contenedor de PostgreSQL y uno de
MongoDB, aplicar cambios de endurecimiento en las tres capas — motor,
sistema operativo, red — y comparar antes/después con la justificación
del riesgo que cada cambio mitiga.

## Prerrequisitos

* Control de acceso — ver el [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/).
* Conceptos de hardening — ver [6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/).
* Este laboratorio usa contenedores **nuevos**, sin los cambios de laboratorios anteriores, para observar el estado por defecto real.

## Entorno

```bash
docker run --name dba-postgres-act7 \
  -e POSTGRES_PASSWORD=<REDACTED> \
  -p 5432:5432 \
  -d postgres:16
```

```bash
docker run --name dba-mongo-act7 \
  -p 27017:27017 \
  -d mongo:7
```

Ambos se crean **sin** los cambios de laboratorios anteriores.

⚠️ **Advertencia de seguridad.** Usa siempre valores de ejemplo, nunca
credenciales reales.

## Preparación

```bash
docker ps | grep dba-postgres-act7
docker ps | grep dba-mongo-act7
```

**Checkpoint.** Ambos deben aparecer como `Up`.

## Procedimiento

### Checklist de referencia

| Elemento | Capa | Estado por defecto | Cambio propuesto |
| --- | --- | --- | --- |
| `listen_addresses` (Postgres) | Motor | `*` | `localhost` o rango específico |
| `pg_hba.conf` | Motor | Acepta cualquier origen | Restringido a red interna |
| `net.bindIp` (Mongo) | Motor | Escucha en todas las interfaces dentro del contenedor | Confirmar y mantener `--auth`, restringir por red, no por `bindIp` |
| `security.authorization` (Mongo) | Motor | Deshabilitado | Habilitado con `--auth` |
| Permisos de `pg_hba.conf`/`postgresql.conf` | Sistema operativo | Verificar propietario | `chmod 600`, propietario `postgres` |
| Usuario que corre el proceso | Sistema operativo | Verificar | Nunca `root` |
| Puerto publicado por el contenedor | Host/Red | Abierto a todo | Restringido a red interna cuando sea posible |

### Parte A — PostgreSQL

**Paso 1, estado "antes":**

```bash
docker exec -it dba-postgres-act7 psql -U postgres
```

```sql
SHOW listen_addresses;
SHOW hba_file;
```

```bash
docker exec dba-postgres-act7 cat /var/lib/postgresql/data/pg_hba.conf | grep -v '^#' | grep -v '^$'
```

**Checkpoint.** `listen_addresses` es `*`, y `pg_hba.conf` tiene al menos
una línea `host all all all scram-sha-256` (cualquier origen).

**Paso 2, capa de sistema operativo:**

```bash
docker exec dba-postgres-act7 ps aux
docker exec dba-postgres-act7 ls -l /var/lib/postgresql/data/pg_hba.conf /var/lib/postgresql/data/postgresql.conf
```

**Checkpoint.** La fila con `PID 1` de `ps aux` corre como `postgres`,
nunca `root`. Documenta los permisos actuales de los dos archivos, y si
ya son restrictivos o si hay que corregirlos.

> **Por qué `ps aux` y no `whoami`.** `docker exec` siempre abre el
> proceso nuevo (`whoami`, en este caso) con el usuario por defecto del
> contenedor, que en la imagen oficial de PostgreSQL es `root` — eso no
> dice nada sobre bajo qué usuario corre el **servidor** (`PID 1`).
> `ps aux` sí muestra el usuario real del proceso que ya está corriendo.

**Paso 3, aplicar cambios:**

```bash
docker exec dba-postgres-act7 bash -c \
  "printf 'host all all 172.17.0.0/16 scram-sha-256\nlocal all all trust\n' > /var/lib/postgresql/data/pg_hba.conf"
```

```sql
SELECT pg_reload_conf();
ALTER SYSTEM SET listen_addresses = 'localhost';
```

```bash
docker restart dba-postgres-act7
```

> **Por qué se conserva la línea `local all all trust`.**
> `docker exec -it ... psql -U postgres` (Paso 1) se conecta por
> *socket* Unix, no por TCP: ese tipo de conexión lo gobierna la línea
> `local` de `pg_hba.conf`, no `listen_addresses` ni la línea `host`. Si
> sobrescribes el archivo dejando solo la línea
> `host ... 172.17.0.0/16`, ninguna conexión — ni siquiera la del propio
> administrador dentro del contenedor — puede autenticarse, porque no
> existe ninguna línea `local`. Mantener `local all all trust` conserva
> el acceso administrativo dentro del contenedor mientras la línea
> `host` restringe, de verdad, quién puede conectarse **por red** — que
> es el cambio que este paso busca demostrar.

**Paso 4, estado "después":** repite el Paso 1 (sigue funcionando, por
la línea `local`) y confirma que `pg_hba.conf` ahora exige
`scram-sha-256` para cualquier origen de red en vez de aceptar `all`.

### Parte B — MongoDB, espejo de la Parte A

**Paso 5, estado "antes":**

```bash
docker exec dba-mongo-act7 mongosh --eval "db.serverStatus().network"
docker exec -it dba-mongo-act7 mongosh
```

```javascript
db.getUsers()   // sin --auth, no exige autenticación
```

**Checkpoint.** La operación se ejecuta sin pedir credenciales. Esto
confirma el riesgo del caso real de 2017.

**Paso 6, aplicar cambios:**

```bash
docker rm -f dba-mongo-act7
docker run --name dba-mongo-act7 -p 27017:27017 -d mongo:7 --auth --bind_ip_all
```

> **Por qué `--bind_ip_all` y no un rango CIDR.** A diferencia de
> `pg_hba.conf` en PostgreSQL, `net.bindIp`/`--bind_ip` de MongoDB **no
> acepta notación CIDR** (`172.17.0.0/16`): solo direcciones IP o
> *hostnames* literales, separados por coma. Con un rango inválido,
> `mongod` no arranca. `--bind_ip_all` escucha en todas las interfaces
> (equivalente a `0.0.0.0`) — el mismo efecto que el valor por defecto de
> la imagen oficial dentro de un contenedor Docker — y deja la
> restricción real por origen de red a cargo de la red del
> contenedor/firewall, no de `bindIp`. Documenta esta asimetría entre
> motores: es una diferencia real de diseño, no un detalle menor de
> sintaxis.

```bash
docker exec -it dba-mongo-act7 mongosh
```

```javascript
use admin
db.createUser({ user: "admin", pwd: "<REDACTED>", roles: ["root"] })
```

**Paso 7, estado "después":**

```javascript
db.getUsers()   // ahora sin credenciales debe fallar
```

**Checkpoint.** En una sesión nueva sin credenciales, `db.getUsers()`
falla con un error del tipo
`MongoServerError: not authorized on admin to execute command { usersInfo: 1, ... }`
— no se le permite ejecutar el comando sin haberse autenticado antes.

**Paso 8, capa de sistema operativo en MongoDB:**

```bash
docker exec dba-mongo-act7 ps aux
```

**Checkpoint.** La fila con `PID 1` corre como `mongodb`, nunca `root`
(igual que en el Paso 2, `docker exec ... whoami` no serviría aquí:
siempre muestra el usuario por defecto del contenedor, no el del proceso
servidor).

## Verificación

| Verificación | Antes | Después |
| --- | --- | --- |
| `listen_addresses` | `*` | `localhost` |
| `pg_hba.conf` | Acepta cualquier origen | Restringido al rango elegido, con `local` conservado |
| Autenticación en MongoDB | No exigida | Exigida (`--auth`) |
| `bindIp` en MongoDB | Amplio | `--bind_ip_all`, restricción real a nivel de red |
| Usuario del proceso, ambos motores | `postgres`/`mongodb` (verificado con `ps aux`) | Sin cambio, confirmar que nunca fue `root` |

## Problemas frecuentes

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| Ya no puedes conectarte tras cambiar `pg_hba.conf` | La regla nueva no incluye la conexión local | `docker logs dba-postgres-act7` | Incluir una línea `local all all` si conectas dentro del contenedor |
| El contenedor no reinicia tras `ALTER SYSTEM` | Error de sintaxis | `docker logs dba-postgres-act7` | Revisar el mensaje de error, si es necesario, recrear el contenedor |
| `SHOW listen_addresses;` sigue en `*` | No reiniciaste el contenedor | `docker restart dba-postgres-act7` | Este parámetro requiere reinicio, a diferencia de `ssl` |
| No sabes qué subred usar | Docker la asigna dinámicamente | `docker network inspect bridge \| grep Subnet` | Usar el valor real devuelto |
| `mongod` con `--bind_ip` no arranca | `bindIp` no acepta notación CIDR (`x.x.x.x/16`), solo IPs/hostnames literales separados por coma | `docker logs dba-mongo-act7` | Usar `--bind_ip_all` (todas las interfaces) o una lista de IPs literales. Restringir por red se hace a nivel de Docker/firewall, no con `bindIp` |

## Evidencia mínima

Checklist con estado antes/después de al menos cinco elementos, en las
tres capas — motor, sistema operativo, red — con justificación del
riesgo que cada cambio reduce.

## Reflexión

* ¿Por qué "funcional" no es lo mismo que "seguro" en una instalación recién hecha?
* De los cambios aplicados, ¿cuál habría evitado por sí solo el incidente de MongoDB de 2017, y cuál no?
* ¿Por qué la capa de sistema operativo, usuario del proceso y permisos de archivo, importa tanto como la capa del motor?

## Limpieza

```bash
docker rm -f dba-postgres-act7 dba-mongo-act7
```

Si ya no necesitas los contenedores de laboratorios anteriores:

```bash
docker rm -f dba-postgres-u2 dba-mongo-u2
```

## Relación con la actividad de la unidad y cierre

Ejecución técnica de la
[Actividad 7](/materias/dba/unidad-02/actividades/actividad-7/). Su
resultado se incorpora, junto con las matrices del Laboratorio 2 y el
Laboratorio 3, en la
[Actividad 8](/materias/dba/unidad-02/actividades/actividad-8/),
evidencia oficial de cierre de la Unidad 2.
