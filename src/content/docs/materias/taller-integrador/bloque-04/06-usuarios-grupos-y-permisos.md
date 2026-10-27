---
title: "6. Usuarios, grupos y permisos"
description: "Bloque IV de Taller Integrador — usuarios, grupos, permisos, notación octal, chown, sudo, el grupo docker y permisos dentro del contenedor."
---

## ¿Quién ejecuta un proceso?

En Linux los procesos se ejecutan asociados a una identidad de usuario y a grupos

```text
Usuario
   │
   ▼
Proceso
   │
   ▼
Permisos efectivos
   │
   ▼
Acceso a archivos y recursos
```

Los permisos ayudan a controlar qué acciones puede realizar cada identidad

## Identificar al usuario actual

```bash
whoami
```

Ejemplo

```text
ana
```

Para consultar el identificador numérico y los grupos

```bash
id
```

Ejemplo ilustrativo

```text
uid=1000(ana) gid=1000(ana) groups=1000(ana),27(sudo)
```

Los números y grupos varían según el sistema

## ¿Qué es un grupo?

Un grupo permite asignar permisos compartidos a varios usuarios

```text
Grupo: desarrollo

├── ana
├── luis
└── carlos
```

Un archivo puede pertenecer a un usuario y a un grupo

Los permisos pueden diferenciar entre el propietario el grupo y los demás usuarios

## ¿Cómo vemos los permisos?

```bash
ls -l
```

Salida ilustrativa

```text
-rwxr-x--- 1 ana desarrollo 2048 oct 22 10:00 script.sh
```

Descomposición

```text
-rwxr-x---

│ │   │  │
│ │   │  └── Otros usuarios
│ │   └───── Grupo
│ └───────── Propietario
└─────────── Tipo de archivo
```

## El primer carácter

En la salida de `ls -l` el primer carácter representa el tipo de elemento

| Símbolo | Significado |
|---|---|
| `-` | Archivo regular |
| `d` | Directorio |
| `l` | Enlace simbólico |

Después aparecen los permisos del propietario del grupo y de los demás usuarios

## Los permisos básicos

| Símbolo | Permiso | En archivos | En directorios |
|---|---|---|---|
| `r` | Lectura | Leer el contenido | Listar nombres |
| `w` | Escritura | Modificar contenido | Crear o eliminar entradas sujeto a otros permisos |
| `x` | Ejecución | Ejecutar el archivo si es ejecutable | Acceder o atravesar el directorio |

El significado práctico depende del tipo de elemento y de los demás controles de acceso

## Tres grupos de permisos

```text
-rwxr-x---

  rwx  r-x  ---
   │    │    │
   │    │    └── Otros usuarios
   │    └─────── Grupo
   └──────────── Propietario
```

Para este ejemplo

- El propietario puede leer escribir y ejecutar
- Los miembros del grupo pueden leer y ejecutar
- Los demás no tienen permisos básicos

## ¿Qué es la notación octal?

Los permisos también pueden representarse mediante números

Cada permiso tiene un valor

| Permiso | Valor |
|---|---:|
| Lectura `r` | 4 |
| Escritura `w` | 2 |
| Ejecución `x` | 1 |
| Sin permiso | 0 |

Se suman los valores de los permisos que se desean conceder

## ¿Por qué se llama octal?

Porque utiliza ocho valores posibles del cero al siete para representar cada grupo de permisos

```text
rwx = 4 + 2 + 1 = 7
rw- = 4 + 2 + 0 = 6
r-x = 4 + 0 + 1 = 5
r-- = 4 + 0 + 0 = 4
```

Ejemplos adicionales

```text
-wx = 2 + 1 = 3
-w- = 2
--x = 1
--- = 0
```

## Tabla de conversión

| Número | Permisos | Interpretación |
|---:|---|---|
| 7 | `rwx` | Lectura escritura ejecución |
| 6 | `rw-` | Lectura y escritura |
| 5 | `r-x` | Lectura y ejecución |
| 4 | `r--` | Solo lectura |
| 3 | `-wx` | Escritura y ejecución |
| 2 | `-w-` | Solo escritura |
| 1 | `--x` | Solo ejecución |
| 0 | `---` | Ningún permiso |

## ¿Cómo se interpreta `750`?

```bash
chmod 750 script.sh
```

Se divide en tres dígitos

```text
7  5  0
│  │  │
│  │  └── Otros
│  └───── Grupo
└──────── Propietario
```

Por tanto

```text
750 = rwx r-x ---
```

El propietario puede leer escribir y ejecutar

El grupo puede leer y ejecutar

Los demás no tienen permisos básicos

## Ejemplos de permisos

```bash
chmod 644 documento.txt
```

```text
644 = rw- r-- r--
```

El propietario puede leer y modificar

El grupo y los demás pueden leer

```bash
chmod 600 archivo.conf
```

```text
600 = rw- --- ---
```

Solo el propietario tiene lectura y escritura según estos permisos básicos

## Permisos típicos para archivos y directorios

```bash
chmod 755 script.sh
```

Permite al propietario leer escribir y ejecutar y al grupo y demás leer y ejecutar

```bash
chmod 640 configuracion.conf
```

El propietario puede leer y escribir y el grupo puede leer

```bash
chmod 700 ~/.ssh
```

Restringe el acceso básico al directorio al propietario

Los permisos adecuados dependen del contenido y de los requisitos de la aplicación

## Cuidado con `777`

```bash
chmod 777 archivo
```

Significa

```text
rwx rwx rwx
```

El propietario el grupo y los demás reciben lectura escritura y ejecución

Esto suele conceder más permisos de los necesarios y puede permitir modificaciones no deseadas

<div class="banner-node">

No utilices `777` como solución automática a los errores de permisos

</div>

## Permisos de directorios

Un directorio necesita permisos adecuados para las operaciones que se quieren realizar

- `r` permite listar nombres
- `w` permite crear o eliminar entradas sujeto a las demás condiciones
- `x` permite atravesar el directorio y acceder a elementos conocidos

Un directorio sin permiso `x` puede impedir el acceso a sus archivos aunque estos tengan permisos de lectura

## ¿Qué hace `chown`?

`chmod` cambia permisos

`chown` cambia propietario o grupo de un archivo

```bash
sudo chown ana:desarrollo archivo.txt
```

Significa asignar

```text
Propietario: ana
Grupo: desarrollo
```

La operación puede requerir privilegios administrativos

En Linux el nombre del usuario y el nombre del grupo deben existir para poder asignarlos

## ¿Qué significa `sudo`?

`sudo` permite ejecutar un comando con los privilegios autorizados por la política del sistema

Ejemplo

```bash
sudo systemctl status docker
```

Consulta el estado del servicio Docker en sistemas que utilizan systemd y tienen ese servicio configurado

No todos los sistemas operativos ni todos los entornos utilizan `systemctl`

## Crear un usuario en Linux

En Debian y Ubuntu puede utilizarse

```bash
sudo adduser ana
```

El comando guía al administrador para crear la cuenta y completar datos solicitados

Para consultar los grupos del usuario

```bash
id ana
```

Para consultar los grupos a los que pertenece el usuario actual

```bash
groups
```

Los comandos exactos para crear usuarios pueden variar según la distribución

## ¿Qué es el grupo `docker`?

En algunas instalaciones de Docker Engine para Linux existe un grupo llamado `docker`

```bash
getent group docker
```

Un administrador puede agregar un usuario con

```bash
sudo usermod -aG docker ana
```

El usuario normalmente debe iniciar una nueva sesión para que se actualicen sus grupos efectivos

**Importante:** pertenecer al grupo `docker` concede capacidades muy elevadas sobre el host y puede equivaler en la práctica a privilegios de administrador

No agregues usuarios a este grupo sin evaluar las implicaciones de seguridad

## ¿Los permisos funcionan igual dentro de un contenedor?

No siempre

Debemos distinguir

```text
Permisos del host
        │
        ▼
Montajes y volúmenes
        │
        ▼
Identidad del proceso
        │
        ▼
Permisos dentro del contenedor
```

Los UID y GID las opciones de montaje y el modo de ejecución pueden afectar el acceso

Un archivo que funciona en una computadora puede generar errores de permisos en otro entorno

## Regresemos a Docker

**Ahora entendemos mejor el entorno**

### ¿Qué sucede al ejecutar un contenedor?

```bash
docker run --rm alpine:3.22 echo "Hola desde un contenedor"
```

Ejemplo de salida ilustrativa

```text
Hola desde un contenedor
```

Docker puede descargar la imagen si no existe localmente

Después crea el contenedor ejecuta el comando y elimina el contenedor cuando termina

La imagen puede permanecer almacenada

### Ejecutar una terminal dentro de Alpine

```bash
docker run --rm -it alpine:3.22 sh
```

Dentro del contenedor puedes probar

```sh
pwd
ls -lah
id
cat /etc/os-release
```

Alpine utiliza una distribución Linux ligera

Por eso no debes asumir que incluye todas las herramientas que encontrarías en una distribución de escritorio o servidor

### ¿Qué demuestra este ejemplo?

```text
Docker CLI
    │
    ▼
Imagen Alpine
    │
    ▼
Contenedor
    │
    ▼
Proceso sh
```

El contenedor no necesita iniciar una computadora completa con escritorio

Ejecuta el proceso configurado en un entorno aislado

## Qué sigue

Continúa con [7. Arquitectura de Docker](/materias/taller-integrador/bloque-04/07-arquitectura-de-docker/).
