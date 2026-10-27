---
title: "Guía de fundamentos de contenedores"
description: "Bloque IV de Taller Integrador — material de estudio independiente: kernel y procesos, máquinas virtuales, namespaces, cgroups, capas, aislamiento y contenedores en varios lenguajes."
---

> **Para qué existe esta guía.** Los temas
> [1. ¿Qué es un contenedor?](/materias/taller-integrador/bloque-04/01-que-es-un-contenedor/) a
> [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/) presentan los contenedores en pocas páginas para llegar pronto a la
> práctica. Esta guía es la versión larga: explica **qué pasa debajo**,
> compara a fondo máquinas virtuales y contenedores, muestra qué tan
> aislado está un contenedor del equipo donde corre (y qué tan aislado
> **no** está) y enseña contenedores con Python, Node.js, Go, Java y
> Redis, no solo con PHP.
>
> **Cuándo leerla.** Antes del Laboratorio 1 las secciones G1 a G4, y
> entre el Laboratorio 1 y el 2 las secciones G5 a G9. Es parte de las
> 8 horas de estudio independiente del bloque. No agrega horas de clase.
>
> **Cómo leerla.** Cada sección termina con experimentos marcados como
> **Experimento**. Hazlos: ninguna explicación sustituye ver el
> resultado en tu propia terminal. Los comandos empiezan con `$`; lo
> que sigue sin `$` es la respuesta esperada. Identificadores, fechas,
> tamaños y versiones exactas cambian de un equipo a otro.
>
> **Sobre las citas.** Las frases entre comillas en inglés son citas
> textuales de la documentación oficial, con su traducción. Cada una
> lleva el identificador de su fuente (por ejemplo, `[T28]`), que puedes
> buscar en la sección G16 (Fuentes).

---

## Contenido

```text
G1. Lo que necesitas saber antes: sistema operativo, kernel y procesos
G2. Máquinas virtuales a fondo
G3. Contenedores a fondo
G4. Máquina virtual contra contenedor: comparación completa
G5. El aislamiento por dentro: namespaces
G6. Los límites de recursos: cgroups
G7. El sistema de archivos del contenedor: capas y copia en escritura
G8. Las puertas del aislamiento: lo que tú abres
G9. Root dentro del contenedor y los límites del aislamiento
G10. Contenedores más allá de PHP
G11. Un servicio con dos lenguajes: Python y Redis
G12. El patrón universal
G13. Errores frecuentes
G14. Autoevaluación
G15. Glosario
G16. Fuentes
```

---

## G1. Lo que necesitas saber antes: sistema operativo, kernel y procesos

No puedes entender un contenedor sin tres ideas del curso de sistemas
operativos. Si ya las dominas, salta a G2.

### G1.1 El sistema operativo tiene dos partes

Cuando dices "Windows", "macOS" o "Ubuntu" hablas de dos cosas juntas:

```text
┌──────────────────────────────────────────────────────────────┐
│ ESPACIO DE USUARIO (user space)                              │
│ Tus programas: navegador, editor, php, psql, bash, ls        │
│ Librerías: libc, openssl, ...                                │
│ Archivos de configuración: /etc/...                          │
├──────────────────────────────────────────────────────────────┤
│ KERNEL (núcleo)                                              │
│ Reparte la CPU, administra la memoria, habla con el disco    │
│ y la red, decide qué proceso puede hacer qué                 │
├──────────────────────────────────────────────────────────────┤
│ HARDWARE: CPU, memoria, disco, tarjeta de red                │
└──────────────────────────────────────────────────────────────┘
```

* El **kernel** (*kernel*) es el programa que controla el hardware. Es
  el único que puede tocar directamente el disco, la memoria y la red.
* El **espacio de usuario** (*user space*) es todo lo demás: los
  programas que usas y las librerías y archivos que necesitan.

Ubuntu, Debian, Fedora y Alpine son **distribuciones** de Linux: usan
el mismo tipo de kernel (Linux) y se distinguen sobre todo por el
espacio de usuario que traen (gestor de paquetes, librerías, versiones
de programas, archivos de configuración).

**Analogía: la administración de un edificio.** El kernel es la
administración: controla el agua, la luz, los elevadores y las llaves
maestras. Los inquilinos (los programas) no pueden abrir la caja de
fusibles; le piden a la administración lo que necesitan. Esa petición
formal se llama **llamada al sistema** (*system call*). Cuando PHP
quiere leer un archivo, no lee el disco: le pide al kernel que lo lea.

### G1.2 Un programa en ejecución es un proceso

Un **proceso** (*process*) es un programa que se está ejecutando. El
kernel le asigna un número, el **PID** (*process identifier*), un
pedazo de memoria y un tiempo de CPU.

```text
$ ps -e | head -5          # en Linux o macOS: lista procesos
  PID TTY          TIME CMD
    1 ?        00:00:03 systemd
    2 ?        00:00:00 kthreadd
  812 ?        00:00:00 sshd
 1530 pts/0    00:00:00 bash
```

El proceso con PID 1 es el primero que arranca el sistema; en Ubuntu
suele ser `systemd`. Todo lo demás desciende de él. Retén este dato:
en G5 verás que **dentro de un contenedor tu programa es el PID 1**.

### G1.3 Por qué esto importa para los contenedores

La idea central de toda esta guía cabe en una línea:

> Una máquina virtual **simula hardware** y arriba pone un sistema
> operativo completo, con kernel propio. Un contenedor **no simula
> nada**: es un proceso normal del kernel del anfitrión al que el
> kernel le esconde el resto del sistema y le pone límites.

Docker lo dice así: un contenedor es *"simply an isolated process with
all of the files it needs to run"* ("simplemente un proceso aislado con
todos los archivos que necesita para ejecutarse") `[T28]`.

**Experimento G1.** Si usas Linux o macOS, en la terminal de tu equipo:

```text
$ uname -s        # nombre del kernel
$ uname -r        # versión del kernel
$ ps -e | wc -l   # cuántos procesos hay ahora mismo
```

En Windows, abre una terminal de WSL (por ejemplo, Ubuntu) y ejecuta lo
mismo. Anota los resultados en tu bitácora: los vas a comparar en G3.

---

## G2. Máquinas virtuales a fondo

### G2.1 Qué es

Una **máquina virtual** (*virtual machine*, VM) es una computadora
simulada por software. Tiene CPU virtual, memoria virtual, disco
virtual y tarjeta de red virtual. Sobre ese hardware simulado se
instala un sistema operativo completo, con **su propio kernel**, que
cree estar en una computadora real.

El programa que crea y administra las VM se llama **hipervisor**
(*hypervisor*).

Docker lo resume así `[T30]`:

> *"Virtual machines (VMs) are an abstraction of physical hardware
> turning one server into many servers. [...] Each VM includes a full
> copy of an operating system, the application, necessary binaries and
> libraries – taking up tens of GBs. VMs can also be slow to boot."*
>
> "Las máquinas virtuales son una abstracción del hardware físico que
> convierte un servidor en muchos. [...] Cada VM incluye una copia
> completa de un sistema operativo, la aplicación y los binarios y
> librerías necesarios, y ocupa decenas de GB. Las VM también pueden
> tardar en arrancar."

### G2.2 La pila de una máquina virtual

```text
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ App A           │ │ App B           │ │ App C           │
│ Librerías       │ │ Librerías       │ │ Librerías       │
│ ─────────────── │ │ ─────────────── │ │ ─────────────── │
│ Kernel Linux    │ │ Kernel Windows  │ │ Kernel Linux    │
│ (SO invitado)   │ │ (SO invitado)   │ │ (SO invitado)   │
│ ─────────────── │ │ ─────────────── │ │ ─────────────── │
│ Hardware virtual│ │ Hardware virtual│ │ Hardware virtual│
└─────────────────┘ └─────────────────┘ └─────────────────┘
┌──────────────────────────────────────────────────────────┐
│ HIPERVISOR                                               │
├──────────────────────────────────────────────────────────┤
│ HARDWARE FÍSICO                                          │
└──────────────────────────────────────────────────────────┘
```

Fíjate en lo que se repite en cada columna: un kernel completo y un
hardware virtual. Eso es lo que hace a la VM pesada **y** lo que la
hace muy aislada: si el kernel de la VM A falla, la VM B ni se entera.

### G2.3 Dos tipos de hipervisor

| Tipo | Dónde corre | Ejemplos conocidos | Uso típico |
| --- | --- | --- | --- |
| Tipo 1 (*bare metal*) | Directamente sobre el hardware | VMware ESXi, Microsoft Hyper-V, Xen, KVM (integrado en el kernel Linux) | Centros de datos y nubes: tu VPS es casi seguro una VM de este tipo |
| Tipo 2 (*hosted*) | Como un programa más dentro de tu sistema operativo | VirtualBox, VMware Workstation, Parallels | Laptops: probar otro sistema operativo |

La clasificación de algunos productos (en particular KVM y Hyper-V) se
discute en la literatura; para este taller basta la idea general
(REF-B4-T46, pendiente de verificación de una fuente bibliográfica).

### G2.4 Lo que una VM sí puede hacer y un contenedor no

* **Ejecutar otro sistema operativo completo.** Una VM con Windows
  puede correr sobre un servidor Linux, porque trae su propio kernel.
* **Aislamiento a nivel de hardware.** Cada VM tiene su kernel. Un
  fallo grave del kernel de una VM no tumba a las demás.
* **Cambiar el kernel.** Puedes probar una versión distinta del kernel
  Linux dentro de la VM sin tocar el anfitrión.

### G2.5 Lo que cuesta

| Recurso | Por qué |
| --- | --- |
| Disco | Cada VM guarda un sistema operativo completo |
| Memoria | Cada kernel invitado reserva memoria para sí mismo, aunque la aplicación sea pequeña |
| Arranque | Arrancar una VM es arrancar una computadora: firmware virtual, kernel, servicios del sistema y por fin tu aplicación |
| Mantenimiento | Cada VM es un sistema operativo más que actualizar y parchar |

Docker lo resume: *"Spinning up a VM only to isolate a single
application is a lot of overhead"* ("Levantar una VM solo para aislar
una aplicación es mucha sobrecarga") `[T28]`.

### G2.6 Analogía: casas independientes

Una VM es una **casa independiente** construida en un terreno grande
(el servidor físico). Cada casa tiene sus cimientos, su cisterna, su
medidor de luz y su propia instalación eléctrica (su kernel). Puedes
construir una casa de estilo colonial junto a una moderna (Windows
junto a Linux). Si a una se le inunda la cisterna, la de al lado no se
moja. Pero construir cada casa cuesta mucho y tarda.

---

## G3. Contenedores a fondo

### G3.1 Qué es, según Docker

Docker define el contenedor de dos formas complementarias:

> *"A container is a standard unit of software that packages up code
> and all its dependencies so the application runs quickly and
> reliably from one computing environment to another."* `[T30]`
>
> "Un contenedor es una unidad estándar de software que empaqueta el
> código y todas sus dependencias para que la aplicación se ejecute de
> forma rápida y confiable de un entorno de cómputo a otro."

> *"Docker uses a technology called namespaces to provide the isolated
> workspace called the container."* `[T29]`
>
> "Docker usa una tecnología llamada namespaces para proporcionar el
> espacio de trabajo aislado llamado contenedor."

La primera definición dice **para qué sirve** (que funcione igual en
todas partes). La segunda dice **cómo funciona** (aislamiento que da el
kernel).

### G3.2 La pila de los contenedores

```text
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ App A (PHP)   │ │ App B (Python)│ │ App C (Go)    │
│ Librerías de A│ │ Librerías de B│ │ (casi nada)   │
│ Archivos de A │ │ Archivos de B │ │               │
└───────────────┘ └───────────────┘ └───────────────┘
┌──────────────────────────────────────────────────────────┐
│ MOTOR DE CONTENEDORES (Docker Engine)                    │
├──────────────────────────────────────────────────────────┤
│ KERNEL LINUX DEL ANFITRIÓN  ← uno solo, compartido       │
├──────────────────────────────────────────────────────────┤
│ HARDWARE (físico o virtual)                              │
└──────────────────────────────────────────────────────────┘
```

Compara con G2.2: **desaparecieron los kernels invitados y el hardware
virtual**. Cada contenedor trae solo su espacio de usuario (sus
programas, librerías y archivos). Todos usan el mismo kernel.

Docker lo explica así `[T30]`:

> *"Containers are an abstraction at the app layer that packages code
> and dependencies together. Multiple containers can run on the same
> machine and share the OS kernel with other containers, each running
> as isolated processes in user space. Containers take up less space
> than VMs (container images are typically tens of MBs in size)..."*
>
> "Los contenedores son una abstracción en la capa de aplicación que
> empaqueta código y dependencias. Varios contenedores pueden
> ejecutarse en la misma máquina y compartir el kernel del sistema
> operativo con otros contenedores, cada uno como un proceso aislado en
> el espacio de usuario. Los contenedores ocupan menos espacio que las
> VM (las imágenes suelen medir decenas de MB)..."

Y la frase que resume la diferencia: *"containers virtualize the
operating system instead of hardware"* ("los contenedores virtualizan
el sistema operativo en lugar del hardware") `[T30]`.

### G3.3 Las cuatro propiedades que Docker destaca

La documentación de inicio de Docker `[T28]` describe los contenedores
con cuatro adjetivos. Cada uno es un compromiso que vas a comprobar:

| Propiedad | Cita | Qué significa en la práctica | Dónde lo compruebas |
| --- | --- | --- | --- |
| Autocontenido (*self-contained*) | *"Each container has everything it needs to function with no reliance on any pre-installed dependencies on the host machine."* | No necesitas instalar PHP, Python ni PostgreSQL en tu equipo | G10 |
| Aislado (*isolated*) | Influencia mínima sobre el anfitrión y otros contenedores | Un contenedor no ve los archivos, procesos ni red de los demás | G5 |
| Independiente (*independent*) | *"Deleting one container won't affect any others."* | Borrar un contenedor no rompe otro | Lab 1 |
| Portátil (*portable*) | *"Containers can run anywhere!"* | La misma imagen corre en tu laptop y en el servidor | Labs 2 y 4 |

**Una precisión sobre "portátil".** "En cualquier parte" significa en
cualquier equipo con un motor de contenedores y **un kernel
compatible**. Una imagen de Linux necesita un kernel Linux. Y una
imagen compilada para procesadores Intel/AMD (`amd64`) no es la misma
que una para procesadores ARM (`arm64`, como los Apple Silicon). Las
imágenes oficiales suelen publicarse para varias arquitecturas y Docker
elige la correcta sola. Lo verás en G4.3.

### G3.4 Analogía: departamentos en un edificio

Un contenedor es un **departamento en un edificio**. Todos los
departamentos comparten cimientos, estructura, cisterna y acometida
eléctrica (el kernel). Cada departamento tiene su puerta con llave, sus
muebles y su decoración (su espacio de usuario). Un inquilino no ve lo
que hay en los otros departamentos.

**Dónde falla la analogía.**

1. Un departamento dura años; un contenedor se crea y se destruye en
   segundos.
2. En el edificio todos saben que hay vecinos. Un proceso en un
   contenedor **cree que está solo**: el kernel le esconde a los demás.
3. Si se cae la estructura del edificio (el kernel), se caen todos los
   departamentos a la vez. Eso es justamente lo que una VM evita.

### G3.5 ¿Y en Windows y macOS?

Los contenedores de este curso son contenedores **Linux** y necesitan
un kernel Linux. Windows y macOS no tienen uno, así que **Docker Desktop
crea una máquina virtual Linux** y ahí corren tus contenedores:

```text
 Tu laptop con Windows o macOS
┌──────────────────────────────────────────────────────────┐
│  Terminal: docker run ...                                │
│        │                                                 │
│        ▼                                                 │
│  ┌────────────────────────────────────────────────────┐  │
│  │ VM Linux de Docker Desktop                         │  │
│  │  ┌───────────┐ ┌───────────┐                       │  │
│  │  │contenedor │ │contenedor │   kernel Linux de     │  │
│  │  └───────────┘ └───────────┘   la VM, compartido   │  │
│  └────────────────────────────────────────────────────┘  │
│  Kernel de Windows o macOS                               │
└──────────────────────────────────────────────────────────┘
```

* En **Windows**, Docker Desktop usa por defecto el componente WSL 2;
  también puede usar Hyper-V. La documentación oficial pide activar la
  virtualización de hardware en el BIOS/UEFI `[T39]`.
* Incluso **Docker Desktop para Linux** ejecuta una VM, entre otras
  razones por seguridad: *"any malware that gains root privileges is
  restricted to the VM environment without access to the host"*
  ("cualquier malware que obtenga privilegios de root queda restringido
  al entorno de la VM, sin acceso al anfitrión") `[T38]`.
* En el **servidor Ubuntu** del Laboratorio 4 instalarás Docker Engine
  directamente: no hay VM intermedia de Docker y los contenedores usan
  el kernel del servidor.

> **Ojo con la ironía.** El servidor del Laboratorio 4 es, casi
> seguramente, una VM que te presta una institución o un proveedor de
> nube. Es decir: vas a correr contenedores **dentro** de una VM. No
> compiten; se combinan. Lo verás en G4.4.

**Experimento G3.** Compara el kernel de tu equipo con el que ven los
contenedores, y dos distribuciones distintas entre sí:

```text
$ docker run --rm alpine:3.20 uname -r
6.10.14-linuxkit                      ← ejemplo en macOS (VM de Docker Desktop)

$ docker run --rm ubuntu:24.04 uname -r
6.10.14-linuxkit                      ← el MISMO kernel

$ docker run --rm alpine:3.20 cat /etc/os-release | head -2
NAME="Alpine Linux"
ID=alpine

$ docker run --rm ubuntu:24.04 cat /etc/os-release | head -2
PRETTY_NAME="Ubuntu 24.04.x LTS"
NAME="Ubuntu"
```

Anota y explica en tu bitácora:

1. ¿Coinciden las dos salidas de `uname -r`? ¿Coinciden con lo que
   anotaste en G1 para tu equipo? (En Linux nativo deben coincidir con
   tu equipo; en Windows verás un kernel de WSL 2, con
   `microsoft-standard-WSL2` en el nombre; en macOS uno de la VM de
   Docker Desktop.)
2. Si el kernel es el mismo, ¿por qué un contenedor "es Alpine" y el
   otro "es Ubuntu"? (Pista: G1.1. Lo que cambia es el espacio de
   usuario.)

---

## G4. Máquina virtual contra contenedor: comparación completa

### G4.1 Tabla comparativa

| Aspecto | Máquina virtual | Contenedor |
| --- | --- | --- |
| Qué se virtualiza | El hardware `[T30]` | El sistema operativo `[T30]` |
| Kernel | Uno propio por VM | El del anfitrión, compartido `[T28]` |
| Qué contiene | Sistema operativo completo, librerías y aplicación | Solo la aplicación, sus librerías y sus archivos |
| Tamaño típico | Decenas de GB `[T30]` | Decenas de MB a algunos cientos de MB `[T30]` |
| Arranque | Lo que tarda en arrancar un sistema operativo; *"can be slow to boot"* `[T30]` | Lo que tarda en arrancar el proceso (lo mides en G4.2) |
| Cuántos caben en un servidor | Pocos | Muchos más, porque no repiten kernel ni sistema operativo |
| Sistema operativo distinto al anfitrión | Sí (Windows sobre Linux, por ejemplo) | No: un contenedor Linux necesita kernel Linux |
| Fuerza del aislamiento | Muy fuerte: frontera de hardware virtual | Fuerte, pero comparte kernel (G9) |
| Si falla el kernel | Cae solo esa VM | Caen todos los contenedores del anfitrión |
| Qué se distribuye | Imagen de disco de la VM | Imagen de contenedor, en capas compartibles (G7) |
| Vida típica | Meses o años; se actualiza "en caliente" | Minutos a semanas; se reemplaza por uno nuevo en vez de actualizarlo |
| Herramientas | VirtualBox, VMware, Hyper-V, KVM | Docker, Podman y otros |

### G4.2 Medirlo tú

**Experimento G4.2 — tiempo de arranque.** El comando `time` mide
cuánto tarda otro comando. La primera vez incluye la descarga; mide la
segunda.

```text
$ docker pull alpine:3.20
$ time docker run --rm alpine:3.20 true
real    0m0.6s                     ← ejemplo; tu número será distinto
```

`true` es un programa que no hace nada y termina. Lo que mediste es
crear un contenedor, arrancarlo, ejecutar el proceso, detenerlo y
borrarlo. Compáralo con el tiempo que tarda en arrancar tu computadora
o una VM de VirtualBox, si tienes una.

> En Windows, en PowerShell usa
> `Measure-Command { docker run --rm alpine:3.20 true }`.

**Experimento G4.2b — tamaño.**

```text
$ docker pull ubuntu:24.04
$ docker image ls
REPOSITORY   TAG     IMAGE ID       CREATED       SIZE
ubuntu       24.04   ...            ...           78MB   ← ejemplo
alpine       3.20    ...            ...           7.8MB  ← ejemplo
```

Un Ubuntu "completo" para contenedor mide decenas de MB. Una VM con
Ubuntu Server ocupa varios GB de disco después de instalada. La
diferencia es todo lo que el contenedor **no** trae: kernel,
controladores de hardware, gestor de arranque, servicios del sistema.

### G4.3 Lo que un contenedor no puede hacer

**Experimento G4.3.** Busca en Docker Hub una imagen de Windows para
correrla en tu Docker Desktop configurado con contenedores Linux. No
vas a poder ejecutarla: las imágenes de Windows existen (la imagen
oficial de Python, por ejemplo, tiene una variante
`windowsservercore` que *"only works in places which that image does"*
`[T44]`), pero necesitan un kernel de Windows.

Lo mismo con la arquitectura del procesador. Pregunta a Docker qué
arquitectura tiene tu motor:

```text
$ docker version --format '{{.Server.Arch}}'
arm64          ← Mac con Apple Silicon
amd64          ← la mayoría de laptops Intel/AMD y servidores
```

Si una imagen solo existe para `amd64` y tu equipo es `arm64`, Docker
Desktop puede emularla (`docker run --platform linux/amd64 ...`), pero
más lento (REF-B4-T48, pendiente de verificación de los detalles de
emulación). Todas las imágenes oficiales que usa el bloque se publican
para ambas arquitecturas; si algún día ves el aviso
`requested image's platform does not match`, ya sabes qué significa.

### G4.4 No es "uno u otro": se combinan

Docker lo dice explícitamente: *"Containers and VMs used together
provide a great deal of flexibility in deploying and managing app[s]"*
("usados juntos, contenedores y VM dan mucha flexibilidad para
desplegar y administrar aplicaciones") `[T30]`.

Así se ve tu proyecto al final del bloque:

```text
 Centro de datos (físico)
 └── Hipervisor del proveedor
      └── VM Ubuntu (tu servidor del Lab 4)        ← aislamiento fuerte
           └── Docker Engine
                ├── contenedor proxy (Caddy)        ← empaquetado y
                ├── contenedor app (ReservaFIC)        reproducibilidad
                └── contenedor db (PostgreSQL)
```

La VM aísla tu servidor del de otros clientes del proveedor. Los
contenedores empaquetan cada pieza de tu sistema para que sea igual en
tu laptop y en el servidor.

### G4.5 Cuándo elegir cada uno

| Situación | Mejor opción | Por qué |
| --- | --- | --- |
| Tu aplicación web y su base de datos, que deben correr igual en tres laptops y un servidor | Contenedores | Reproducibilidad y ligereza |
| Necesitas un servidor Windows y tu hardware tiene Linux | VM | Otro sistema operativo completo |
| Un proveedor aloja a muchos clientes que no se conocen | VM (con contenedores dentro, si quieren) | Aislamiento fuerte entre clientes |
| Probar rápido una versión de Python sin instalarla | Contenedor | Se descarga y se borra en segundos |
| Aprender a instalar y administrar un sistema operativo | VM | Ahí está el sistema completo |
| Correr 20 microservicios pequeños | Contenedores | Una VM por servicio desperdicia recursos |

### G4.6 Mitos frecuentes

| Mito | Realidad |
| --- | --- |
| "Un contenedor es una VM ligera" | No hay hardware virtual ni kernel propio. Es un proceso aislado `[T28]`. Por eso un contenedor sin proceso no existe: si el proceso termina, el contenedor se detiene |
| "Un contenedor trae su propio sistema operativo" | Trae el **espacio de usuario** de una distribución, no un kernel. En G10.5 verás uno que no trae ni siquiera eso |
| "Los contenedores reemplazan a las VM" | Se combinan (G4.4). La nube corre contenedores dentro de VM todo el tiempo |
| "Un contenedor es tan seguro como una VM" | Comparte kernel; su aislamiento es fuerte pero distinto (G9) |
| "Con Docker ya no importa el sistema operativo" | Importan el kernel (Linux) y la arquitectura (amd64 o arm64) (G4.3) |
| "Si entro al contenedor estoy en otra computadora" | Estás en un proceso de **tu** computadora que ve un sistema de archivos distinto (G5) |

---

## G5. El aislamiento por dentro: namespaces

### G5.1 La idea

El kernel Linux tiene una función llamada **espacios de nombres**
(*namespaces*). Su manual la define así `[T45]`:

> *"A namespace wraps a global system resource in an abstraction that
> makes it appear to the processes within the namespace that they have
> their own isolated instance of the global resource."*
>
> "Un namespace envuelve un recurso global del sistema en una
> abstracción que hace que a los procesos dentro del namespace les
> parezca que tienen su propia instancia aislada de ese recurso."

Dicho de forma simple: el kernel tiene **una** lista de procesos,
**una** red, **un** árbol de archivos, **un** nombre de equipo. Con
namespaces, a un grupo de procesos le muestra **otra versión** de cada
una de esas cosas.

**Analogía: la sala con vidrio de una sola vista.** Un contenedor es
como una sala de entrevistas con espejo de una sola vista. Quien está
adentro solo ve la sala y cree estar solo. Quien está afuera (el
anfitrión) ve todo lo que pasa adentro. El aislamiento de los
contenedores funciona igual: **el contenedor no ve al anfitrión, pero
el anfitrión sí ve al contenedor**.

### G5.2 Los namespaces que importan

Docker crea un namespace de cada tipo para cada contenedor; *"Each
aspect of a container runs in a separate namespace and its access is
limited to that namespace"* ("cada aspecto de un contenedor corre en un
namespace separado y su acceso se limita a ese namespace") `[T29]`.
Los tipos, según el manual de Linux `[T45]`:

| Namespace | Qué aísla `[T45]` | Qué ve el proceso en el contenedor | Experimento |
| --- | --- | --- | --- |
| PID | Identificadores de proceso | Solo sus propios procesos; él es el PID 1 | G5.3 |
| Mount | Puntos de montaje | Su propio árbol de archivos `/` | G5.4 |
| Network | Dispositivos de red, pilas, puertos | Su propia interfaz, su propia IP, su propio `localhost` | G5.5 |
| UTS | Nombre de equipo (*hostname*) | Su propio nombre de equipo | G5.6 |
| IPC | Comunicación entre procesos | Solo puede comunicarse así con procesos de su contenedor | — |
| User | Identificadores de usuario y grupo | Puede mapear usuarios propios (ver G9) | G9 |
| Cgroup | Directorio raíz de cgroups | Su propia vista de los límites de recursos | G6 |
| Time | Relojes de arranque y monotónico | — (Docker no lo usa por defecto en este curso) | — |

No necesitas memorizar la tabla. Necesitas poder explicar con tus
palabras los cuatro primeros, porque los vas a ver fallar y funcionar
en todo el bloque.

### G5.3 PID: el contenedor solo ve sus procesos

**Experimento G5.3a — desde adentro.**

```text
$ docker run --rm alpine:3.20 ps
PID   USER     TIME  COMMAND
    1 root      0:00 ps
```

Una computadora normal tiene cientos de procesos (anotaste cuántos en
G1). El contenedor ve **uno**: el propio `ps`, con PID 1. No ve tu
navegador, tu editor ni los procesos de otros contenedores. La
documentación de seguridad de Docker lo dice así: *"Processes running
within a container cannot see, and even less affect, processes running
in another container"* ("los procesos dentro de un contenedor no pueden
ver, y menos afectar, a los procesos de otro contenedor") `[T31]`.

**Experimento G5.3b — desde afuera.** Ahora mira el mismo proceso desde
los dos lados del vidrio:

```text
$ docker run -d --name dormilon alpine:3.20 sleep 600
$ docker exec dormilon ps
PID   USER     TIME  COMMAND
    1 root      0:00 sleep 600
    7 root      0:00 ps

$ docker top dormilon
UID    PID     PPID    C   STIME   TTY   TIME       CMD
root   48213   48190   0   10:15   ?     00:00:00   sleep 600
```

El **mismo** proceso `sleep` es el PID 1 adentro y el PID 48213 (o el
número que te salga) para el kernel. Dos vistas de una misma realidad:
eso es un namespace.

Si usas **Linux nativo**, puedes verlo con las herramientas normales
de tu sistema, sin Docker:

```text
$ ps -ef | grep "sleep 600"
root   48213   48190  0 10:15 ?   00:00:00 sleep 600
```

Es un proceso más de tu computadora. (En Windows y macOS no lo verás
así, porque vive dentro de la VM de Docker Desktop, G3.5; `docker top`
sí funciona en todos los sistemas.)

```text
$ docker rm -f dormilon
```

**Consecuencia práctica.** El proceso principal de un contenedor es su
PID 1. Si ese proceso termina, el contenedor se detiene. Por eso un
contenedor de PostgreSQL sigue vivo (el servidor nunca termina) y uno
de `echo` muere al instante.

### G5.4 Mount: el contenedor tiene su propio árbol de archivos

**Experimento G5.4.**

```text
$ docker run --rm alpine:3.20 ls /
bin    dev    etc    home   lib    media  mnt    opt    proc
root   run    sbin   srv    sys    tmp    usr    var

$ docker run --rm alpine:3.20 ls /home
                                    ← vacío

$ docker run --rm alpine:3.20 ls /Users        # en macOS tu carpeta personal está en /Users
ls: /Users: No such file or directory
```

El contenedor tiene su propia raíz `/`, que sale de la imagen. **No ve
tus documentos, tu escritorio ni tu proyecto.** Ningún archivo de tu
equipo entra a un contenedor a menos que tú lo montes (G8.2).

Compara `/etc/os-release` del contenedor con el de tu equipo (G3): son
archivos distintos porque son árboles de archivos distintos.

### G5.5 Network: el contenedor tiene su propia red

**Experimento G5.5a — su propia interfaz.**

```text
$ docker run --rm alpine:3.20 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> ...
    inet 127.0.0.1/8 scope host lo
...: eth0@if...: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    inet 172.17.0.2/16 ...
```

El contenedor tiene su `lo` (con `127.0.0.1`, su **propio**
`localhost`) y su `eth0` con una IP privada que Docker le asignó. La
documentación de seguridad lo describe así: *"Each container also gets
its own network stack"* ("cada contenedor también obtiene su propia
pila de red") `[T31]`.

Esta es la raíz del error más frecuente del bloque (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)):
`localhost` dentro de un contenedor es **el contenedor mismo**.

**Experimento G5.5b — sin red.** Docker trae varios controladores de
red. El controlador `none` aísla por completo: *"Completely isolate a
container from the host and other containers"* ("aislar completamente
un contenedor del anfitrión y de otros contenedores") `[T36]`.

```text
$ docker run --rm --network none alpine:3.20 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> ...
    inet 127.0.0.1/8 scope host lo
                                    ← no hay eth0

$ docker run --rm --network none alpine:3.20 wget -qO- -T 3 http://example.com
wget: bad address 'example.com'
```

Sin interfaz de red, el proceso no puede salir a internet ni hablar con
nadie. Útil para ejecutar código en el que no confías del todo.

**Experimento G5.5c — por qué hay que publicar puertos.**

```text
$ docker run -d --name web nginx:1.27
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:80
000                                 ← nadie responde en tu equipo

$ docker run --rm --network container:web alpine:3.20 wget -qO- http://localhost | head -4
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>               ← desde la red del contenedor sí responde
$ docker rm -f web
```

`--network container:web` crea un contenedor desechable que **comparte
la red** del contenedor `web`; para él, `localhost` es el mismo que
para nginx.

nginx escucha en el puerto 80 **de la red del contenedor**, no en la de
tu equipo. La documentación lo explica: los contenedores corren con red
aislada por defecto y *"This isolation is great for security and
managing dependencies, but it also means you can't access them
directly"* ("este aislamiento es excelente para la seguridad y para
manejar dependencias, pero significa que no puedes acceder a ellos
directamente") `[T37]`. Publicar un puerto con `-p` abre una puerta
controlada (G8.1).

### G5.6 UTS: su propio nombre de equipo

```text
$ hostname
laptop-de-ana

$ docker run --rm alpine:3.20 hostname
3f9a1c7e2b40

$ docker run --rm --hostname servidor-pruebas alpine:3.20 hostname
servidor-pruebas
```

Docker le pone a cada contenedor como nombre de equipo su
identificador corto. Lo vas a aprovechar en G10 y en el Laboratorio 5:
si una aplicación responde con su `hostname`, sabes **qué contenedor**
atendió la petición.

### G5.7 Resumen del aislamiento

```text
                ANFITRIÓN (tu equipo o el servidor)
   Ve todo: procesos, archivos, red y límites de cada contenedor
 ┌───────────────────────────────────────────────────────────────┐
 │  ┌─────────────────────┐        ┌─────────────────────┐       │
 │  │ Contenedor A        │        │ Contenedor B        │       │
 │  │ PID 1 = su programa │  no se │ PID 1 = su programa │       │
 │  │ su / (de su imagen) │ ◄────► │ su / (de su imagen) │       │
 │  │ su localhost, su IP │  ven*  │ su localhost, su IP │       │
 │  │ su hostname         │        │ su hostname         │       │
 │  └─────────────────────┘        └─────────────────────┘       │
 │            KERNEL COMPARTIDO (uno solo)                       │
 └───────────────────────────────────────────────────────────────┘
 * salvo que tú los conectes con una red (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/))
```

---

## G6. Los límites de recursos: cgroups

### G6.1 El problema

El aislamiento decide **qué ve** un proceso. No decide **cuánto
consume**. Sin límites, un contenedor con una fuga de memoria puede
acabarse la memoria del servidor y tumbar a todos los demás.

La documentación es clara sobre el comportamiento por defecto: *"By
default, a container has no resource constraints"* ("por defecto, un
contenedor no tiene restricciones de recursos") y puede usar tanto como
el planificador del kernel le permita `[T32]`.

### G6.2 La herramienta

Los **grupos de control** (*control groups*, cgroups) son una función
del kernel Linux que agrupa procesos para **limitar y medir** su uso de
recursos `[T45]`. Controlan, entre otros, CPU (`cpu`), memoria
(`memory`), lectura y escritura de disco (`io`) y número de procesos
(`pids`).

Según la documentación de seguridad de Docker, los cgroups
*"implement resource accounting and limiting"* ("implementan la
medición y la limitación de recursos"), aseguran que cada contenedor
reciba *"its fair share of memory, CPU, disk I/O"* ("su parte justa de
memoria, CPU y E/S de disco") y garantizan que *"a single container
cannot bring the system down by exhausting one of those resources"*
("un solo contenedor no pueda tumbar el sistema agotando uno de esos
recursos") `[T31]`.

**Analogía: el plan de datos del celular.** El namespace decide qué
apps ves; el cgroup decide cuántos GB te tocan al mes. Cuando se acaba
el plan, el operador te corta, aunque tu teléfono funcione.

### G6.3 Medir: `docker stats`

```text
$ docker run -d --name ocupado alpine:3.20 sh -c "while true; do :; done"
$ docker stats --no-stream ocupado
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %   ...
a91c...        ocupado   99.87%    412KiB / 7.66GiB      0.01%   ...
```

El ciclo infinito consume un núcleo completo (alrededor de 100%). El
límite de memoria que aparece es toda la memoria disponible para
Docker: no hay límite.

### G6.4 Limitar CPU: `--cpus`

```text
$ docker rm -f ocupado
$ docker run -d --name ocupado --cpus 0.5 alpine:3.20 sh -c "while true; do :; done"
$ docker stats --no-stream ocupado
CONTAINER ID   NAME      CPU %     ...
a91c...        ocupado   50.12%    ...
$ docker rm -f ocupado
```

El mismo programa ahora no pasa de medio núcleo. La documentación da el
ejemplo de `--cpus="1.5"`: en un anfitrión con dos CPU, el contenedor
tiene garantizado *"at most one and a half of the CPUs"* ("como máximo
una CPU y media") `[T32]`.

### G6.5 Limitar memoria: `--memory` y el código 137

```text
$ docker run --name gloton -m 64m python:3.13-slim \
    python -c "datos = bytearray(500 * 1024 * 1024); print('lo logré')"

$ echo $?
137

$ docker inspect --format '{{.State.OOMKilled}}' gloton
true

$ docker rm gloton
```

El programa intentó reservar 500 MB con un límite de 64 MB. El kernel
lo terminó sin dejarle imprimir nada. Dos señales para reconocerlo:

* **Código de salida 137** (en PowerShell, consulta `$LASTEXITCODE`).
* **`OOMKilled: true`**: lo mató el mecanismo de "memoria agotada" del
  kernel (*Out Of Memory*, OOM).

La documentación explica que cuando falta memoria *"the kernel [...]
starts killing processes to free up memory"* ("el kernel empieza a
matar procesos para liberar memoria") y que el mínimo permitido para
`-m` es `6m` `[T32]`.

> **Por qué importa en este bloque.** En el Laboratorio 5 medirás
> cuánta memoria y CPU usa cada contenedor de tu sistema bajo carga. Si
> un contenedor tuyo se reinicia sin explicación y `docker inspect`
> dice `OOMKilled: true`, ya sabes qué buscar.

---

## G7. El sistema de archivos del contenedor: capas y copia en escritura

### G7.1 Imagen inmutable, contenedor con capa propia

Docker establece dos principios de las imágenes `[T34]`:

* *"Images are immutable. Once an image is created, it can't be
  modified."* ("Las imágenes son inmutables. Una vez creada, una imagen
  no puede modificarse.")
* *"Container images are composed of layers."* ("Las imágenes de
  contenedor están compuestas de capas.") Cada capa es *"a set of file
  system changes that add, remove, or modify files"* ("un conjunto de
  cambios al sistema de archivos que agregan, eliminan o modifican
  archivos").

Al crear un contenedor, Docker agrega encima una capa de escritura:
*"When you create a new container, you add a new writable layer on top
of the underlying layers"* ("al crear un contenedor se agrega una nueva
capa de escritura sobre las capas de abajo") `[T33]`.

### G7.2 Copia en escritura

¿Qué pasa si el contenedor modifica un archivo que viene de la imagen,
que es de solo lectura? Docker usa **copia en escritura**
(*copy-on-write*): el archivo se lee de la capa de la imagen mientras
nadie lo cambie; en el momento en que el contenedor lo modifica, se
copia a su capa de escritura y se cambia **la copia** `[T33]`.

**Analogía: el libro de la biblioteca y tus fotocopias.** Diez
estudiantes pueden leer el mismo libro de la biblioteca (la capa de la
imagen). Si uno quiere subrayar un capítulo, no raya el libro: saca una
fotocopia de ese capítulo y raya la fotocopia (su capa de escritura).
El libro sigue limpio para los demás.

Gracias a esto, *"multiple containers can share access to the same
underlying image and yet have their own data state"* ("varios
contenedores pueden compartir la misma imagen y aun así tener su propio
estado") `[T33]`. Diez contenedores de `postgres:16` no ocupan diez
veces el tamaño de la imagen.

### G7.3 Experimento: ver qué cambió

`docker diff` lista lo que cambió en un contenedor respecto de su
imagen; marca con `A` lo agregado, `D` lo eliminado y `C` lo cambiado
`[T42]`.

```text
$ docker run --name cambios alpine:3.20 sh -c \
    "echo hola > /tmp/nuevo.txt && rm /etc/motd && echo '# cambio' >> /etc/profile"

$ docker diff cambios
C /etc
D /etc/motd
C /etc/profile
C /tmp
A /tmp/nuevo.txt
```

(El orden puede variar.) La imagen `alpine:3.20` sigue intacta: corre
otro contenedor y `/etc/motd` seguirá ahí.

```text
$ docker run --rm alpine:3.20 ls /etc/motd
/etc/motd
```

### G7.4 Experimento: cuánto ocupa cada contenedor

```text
$ docker ps -a -s --filter name=cambios
CONTAINER ID   IMAGE         ...   NAMES     SIZE
5be2...        alpine:3.20   ...   cambios   45B (virtual 7.8MB)
$ docker rm cambios
```

La documentación distingue dos números `[T33]`: `size` es lo que ocupa
**la capa de escritura** de ese contenedor (lo propio) y `virtual size`
incluye además las capas de la imagen, que son compartidas. Por eso no
debes sumar los `virtual size` de varios contenedores para calcular el
disco usado.

### G7.5 Consecuencias para tu proyecto

| Hecho | Consecuencia |
| --- | --- |
| La capa de escritura se borra con el contenedor | Datos de PostgreSQL, archivos subidos: siempre en volúmenes (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)) |
| Las capas de la imagen se comparten | Usar la misma imagen base en varios proyectos ahorra disco y descargas |
| Escribir mucho en la capa del contenedor es más lento que en un volumen | Logs a la salida estándar (Lab 2) y datos en volúmenes |
| La imagen no cambia | Para "actualizar" un contenedor se construye una imagen nueva y se crea un contenedor nuevo |

---

## G8. Las puertas del aislamiento: lo que tú abres

### G8.1 La idea

Un contenedor recién creado está bastante encerrado. Casi todo lo útil
que haces con Docker consiste en **abrir puertas controladas**. Cada
puerta tiene un propósito y un riesgo.

**Analogía: una estación espacial.** El módulo del astronauta está
sellado. Para recibir provisiones o salir a reparar algo se abren
escotillas específicas. Cada escotilla abierta es útil y, a la vez, un
punto por donde algo podría entrar o salir.

| Puerta | Opción | Qué abre | Riesgo si se usa mal |
| --- | --- | --- | --- |
| Puerto publicado | `-p 8080:80` | Tráfico de tu equipo (o de la red) hacia un puerto del contenedor | Exponer una base de datos a toda la red |
| Volumen | `-v datos:/ruta` | Almacenamiento que vive fuera del contenedor | Bajo; se borra solo si tú lo borras |
| Montaje de carpeta | `-v ./carpeta:/ruta` | Una carpeta de tu equipo dentro del contenedor | El contenedor puede **modificar o borrar** esos archivos |
| Variables de entorno | `-e CLAVE=valor` | Información de configuración | Secretos visibles con `docker inspect` |
| Red compartida | `--network nombre` | Comunicación con otros contenedores | Servicios internos alcanzables por más contenedores |
| Red del anfitrión | `--network host` | Elimina el aislamiento de red | El contenedor usa directamente la red de tu equipo |
| Socket de Docker | `-v /var/run/docker.sock:...` | Control total del motor de Docker | Equivale a dar acceso de administrador al anfitrión |
| Modo privilegiado | `--privileged` | Casi todas las capacidades del kernel | Elimina gran parte del aislamiento |

En este taller usarás las cinco primeras. Las tres últimas aparecen
aquí para que las reconozcas y desconfíes cuando un tutorial las pida
sin explicar por qué.

### G8.2 Puertos: publicar solo lo necesario

La documentación advierte: *"When a port is published, it's published
to all network interfaces by default"* ("cuando se publica un puerto,
se publica por defecto en todas las interfaces de red") `[T37]`. Es
decir, **cualquiera que alcance tu equipo en la red** (por ejemplo, en
el wifi de la escuela) puede llegar a ese puerto.

```text
$ docker run -d --name pg -e POSTGRES_PASSWORD=secreto -p 5433:5432 postgres:16
      ← cualquier equipo de la red puede intentar conectarse a tu puerto 5433

$ docker rm -f pg
$ docker run -d --name pg -e POSTGRES_PASSWORD=secreto -p 127.0.0.1:5433:5432 postgres:16
      ← solo tu propio equipo puede conectarse
$ docker rm -f pg
```

La forma `IP:AFUERA:ADENTRO` limita el puerto a una dirección. En
desarrollo, publicar la base de datos solo en `127.0.0.1` es una buena
costumbre. En el servidor (Lab 4) la base de datos **no se publica**:
solo la alcanza la aplicación por la red interna.

> En el servidor Linux hay un detalle adicional: los puertos publicados
> por Docker se procesan antes que las reglas del firewall `ufw`
> (REF-B4-T06, tema [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/)).

### G8.3 Montajes de carpeta: una ventana que se puede romper desde adentro

Un *bind mount* hace que una carpeta de tu equipo aparezca dentro del
contenedor. **Lo que el contenedor haga con ella, lo hace con tus
archivos reales.**

```text
$ mkdir -p ~/prueba-montaje && echo "importante" > ~/prueba-montaje/tesis.txt

$ docker run --rm -v ~/prueba-montaje:/datos alpine:3.20 rm /datos/tesis.txt

$ ls ~/prueba-montaje
                                    ← tesis.txt ya no existe, también en tu equipo
```

La documentación de seguridad de Docker pone el caso extremo: es
posible arrancar un contenedor donde una carpeta interna sea la raíz
`/` del anfitrión, y entonces *"the container can alter your host
filesystem without any restriction"* ("el contenedor puede alterar el
sistema de archivos del anfitrión sin ninguna restricción") `[T31]`.
**No lo hagas.** Monta solo la carpeta que el contenedor necesita y, si
solo necesita leerla, agrégale `:ro` (solo lectura):

```text
$ echo "importante" > ~/prueba-montaje/tesis.txt
$ docker run --rm -v ~/prueba-montaje:/datos:ro alpine:3.20 rm /datos/tesis.txt
rm: can't remove '/datos/tesis.txt': Read-only file system
```

### G8.4 Quién puede usar Docker es quien manda en el equipo

El motor de Docker corre con privilegios de administrador. Por eso:

* *"only trusted users should be allowed to control your Docker
  daemon"* ("solo usuarios de confianza deben poder controlar el motor
  de Docker") `[T31]`.
* En Linux, agregar tu usuario al grupo `docker` evita escribir `sudo`,
  pero *"The docker group grants root-level privileges to the user"*
  ("el grupo docker otorga privilegios de nivel root al usuario")
  `[T35]`.

En el servidor del Laboratorio 4, solo los integrantes que administran
el despliegue deben estar en ese grupo.

---

## G9. Root dentro del contenedor y los límites del aislamiento

### G9.1 Por defecto eres root, pero un root recortado

```text
$ docker run --rm alpine:3.20 id
uid=0(root) gid=0(root) groups=0(root),...
```

Adentro eres `root`. Sin embargo, Docker arranca los contenedores
*"with a restricted set of capabilities"* ("con un conjunto restringido
de capacidades") `[T31]`. Las **capacidades** (*capabilities*) son los
permisos especiales en que Linux divide el poder de root (cambiar la
hora del sistema, cambiar el nombre del equipo, configurar la red,
cargar módulos del kernel...). Docker quita casi todas.

**Experimento G9.1.**

```text
$ docker run --rm alpine:3.20 hostname otro-nombre
hostname: sethostname: Operation not permitted

$ docker run --rm alpine:3.20 date -s "2030-01-01"
date: can't set date: Operation not permitted
```

(El texto exacto de los mensajes puede variar.)

Eres root y aun así el kernel te dice "no". La documentación lo
resume: root dentro de un contenedor tiene muchos menos privilegios que
el root real, y *"even if an intruder manages to escalate to root
within a container, it is much harder to do serious damage"* ("aunque
un intruso logre ser root dentro de un contenedor, es mucho más difícil
causar un daño serio") `[T31]`.

### G9.2 Aun así, mejor no ser root

"Más difícil" no es "imposible". La recomendación de Docker es correr
las aplicaciones como usuarios sin privilegios: es *"The best way to
prevent privilege-escalation attacks from within a container"* ("la
mejor manera de prevenir ataques de escalada de privilegios desde un
contenedor") `[T40]`.

En un Dockerfile se hace con la instrucción `USER`. Las imágenes que
verás en G10 lo aplican; en la imagen de ReservaFIC lo hace Apache, que
atiende las peticiones como el usuario `www-data` (tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)).

```text
$ docker run --rm --user 1000:1000 alpine:3.20 id
uid=1000 gid=1000 groups=1000

$ docker run --rm --user 1000:1000 alpine:3.20 touch /etc/prueba
touch: /etc/prueba: Permission denied
```

### G9.3 El efecto que vas a notar en Linux: archivos de root en tu proyecto

Si usas **Linux nativo**, un contenedor que corre como root y escribe
en una carpeta montada deja archivos **de root** en tu proyecto:

```text
$ docker run --rm -v "$PWD":/trabajo alpine:3.20 touch /trabajo/creado.txt
$ ls -l creado.txt
-rw-r--r-- 1 root root 0 oct 22 10:40 creado.txt
$ rm creado.txt
rm: cannot remove 'creado.txt': Permission denied
```

Para evitarlo, ejecuta el contenedor con tu propio usuario:

```text
$ docker run --rm --user "$(id -u):$(id -g)" -v "$PWD":/trabajo alpine:3.20 touch /trabajo/creado.txt
$ ls -l creado.txt
-rw-r--r-- 1 ana ana 0 oct 22 10:41 creado.txt
```

(Y para borrar el archivo de root del ejemplo anterior:
`sudo rm creado.txt`.) En Windows y macOS, Docker Desktop traduce los
permisos al compartir carpetas y normalmente no verás este problema.
Este es un ejemplo concreto de que el aislamiento de usuarios **no**
está activo por defecto: el root del contenedor escribió como root en
tu disco. Docker tiene un mecanismo para mapear el root del contenedor
a un usuario sin privilegios del anfitrión (*user namespace remap*)
`[T40]`; no lo usarás en este taller.

### G9.4 Lo que el aislamiento no protege

| Límite | Por qué | Qué hacer en el taller |
| --- | --- | --- |
| Kernel compartido | Una falla de seguridad del kernel afecta a todos los contenedores del anfitrión | Mantener actualizado el servidor (Lab 4) |
| Configuración por defecto | La documentación reconoce que el conjunto por defecto de capacidades y montajes *"may provide incomplete isolation"* ("puede dar un aislamiento incompleto") `[T31]` | No usar `--privileged` ni montar el socket de Docker |
| Imágenes de origen desconocido | Lo que hay dentro corre en tu equipo | Usar imágenes oficiales o de organizaciones reconocidas (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)) |
| Puertas abiertas por ti | Puertos, montajes y variables (G8) | Abrir solo lo necesario |
| Recursos sin límite | Por defecto no hay límites (G6) | Medir en el Lab 5 y limitar si hace falta |

Ninguna de estas limitaciones es motivo para no usar contenedores: son
la razón por la que el proveedor de nube te da **una VM** y dentro de
ella corres tus contenedores (G4.4).

---

## G10. Contenedores más allá de PHP

PHP es el lenguaje del proyecto, pero un contenedor no sabe ni le
importa en qué lenguaje está escrito el programa que encierra. Esta
sección muestra lo mismo con otros lenguajes para que veas que **el
patrón es idéntico** (G12).

### G10.1 Catálogo de imágenes oficiales

Docker Hub mantiene **imágenes oficiales** (las que no tienen prefijo
de organización) para casi cualquier tecnología. La página de cada una
está en `https://hub.docker.com/_/<nombre>`.

| Categoría | Imágenes oficiales | Para qué te pueden servir |
| --- | --- | --- |
| Lenguajes | `php`, `python`, `node`, `golang`, `eclipse-temurin` (Java), `ruby`, `rust` | Ejecutar o compilar programas sin instalar el lenguaje |
| Bases de datos | `postgres`, `mariadb`, `mysql`, `mongo`, `redis` | Tener la base de datos que pida un proyecto, en la versión exacta |
| Servidores web y proxies | `nginx`, `httpd` (Apache), `caddy` | Servir sitios o hacer de proxy (Lab 4) |
| Sistemas base | `alpine`, `debian`, `ubuntu` | Practicar comandos Linux o como punto de partida |

**Variantes de una misma imagen.** La mayoría ofrece varias etiquetas
con distinto tamaño. Para Python, Docker Hub describe `[T44]`:

| Variante | Ejemplo | Descripción oficial (resumida) |
| --- | --- | --- |
| Completa | `python:3.13` | La imagen "de facto"; si no sabes qué necesitas, probablemente es esta |
| `-slim` | `python:3.13-slim` | Sin los paquetes comunes de Debian que trae la completa; más pequeña |
| `-alpine` | `python:3.13-alpine` | Basada en Alpine; útil cuando el tamaño mínimo es la prioridad |

En esta guía se usan las variantes `-slim` porque son pequeñas y
compatibles con casi todas las librerías.

> **Versiones usadas en esta guía.** Las etiquetas `python:3.13-slim`,
> `node:24-slim`, `golang:1.27` y `redis:8` aparecían como vigentes en
> Docker Hub el 2026-10-22 `[T44]`. Las de `eclipse-temurin` y
> `mariadb` están pendiente de verificación (REF-B4-T47). Las etiquetas
> cambian con el tiempo: si alguna ya no existe, usa la versión
> vigente más cercana y anótalo.

> **Sobre las guías oficiales por lenguaje.** Docker publica guías para
> Python, Node.js, Go, Java y otros lenguajes `[T43]`. En 2026 esas
> guías usan imágenes "endurecidas" de Docker (prefijo `dhi.io/`). Esta
> guía usa las imágenes oficiales de Docker Hub, que no requieren
> cuenta ni configuración adicional; los principios son los mismos.

### G10.2 Usar un lenguaje sin instalarlo

Antes de construir imágenes, aprovecha lo más inmediato: **probar un
lenguaje o una herramienta sin instalar nada**.

```text
# Python: ejecutar una línea
$ docker run --rm python:3.13-slim python -c "import sys; print(sys.version)"
3.13.x (main, ...) [GCC ...]

# Python: consola interactiva (sales con exit())
$ docker run --rm -it python:3.13-slim
>>> 2 ** 100
1267650600228229401496703205376

# Node.js: ejecutar una línea
$ docker run --rm node:24-slim node -e "console.log(process.version)"
v24.x.x

# Go: ver la versión del compilador
$ docker run --rm golang:1.27 go version
go version go1.27.x linux/arm64

# Un Ubuntu desechable para practicar comandos de Linux
$ docker run --rm -it ubuntu:24.04 bash
root@3c1f...:/# apt-get update && apt-get install -y cowsay
root@3c1f...:/# /usr/games/cowsay "esto se borra al salir"
root@3c1f...:/# exit
```

Opciones nuevas:

* `-it` combina `-i` (mantener la entrada abierta) y `-t` (simular una
  terminal). Se usa para programas interactivos, como una consola.
* Lo que instales dentro del Ubuntu desechable **desaparece al salir**
  (G7). Para repetirlo tendrías que instalarlo otra vez; para que quede,
  se escribe en un Dockerfile.

**Ejecutar tu propio script sin instalar el lenguaje.** Combina un
montaje de carpeta con `-w` (*working directory*, carpeta de trabajo):

```text
$ mkdir -p ~/g10 && cd ~/g10
$ printf 'nombres = ["Ana", "Luis", "Marta"]\nfor n in nombres:\n    print(f"Hola, {n}")\n' > saludo.py

$ docker run --rm -v "$PWD":/app -w /app python:3.13-slim python saludo.py
Hola, Ana
Hola, Luis
Hola, Marta
```

El contenedor ve tu carpeta en `/app`, ejecuta el script y desaparece.

### G10.3 Python: una API web pequeña

**El programa.** Crea una carpeta `hola-python` con dos archivos.

`app.py`:

```python
import os
import socket

from flask import Flask

app = Flask(__name__)

@app.get("/")
def inicio():
    return {
        "mensaje": f"Hola desde Python, {os.environ.get('NOMBRE', 'mundo')}",
        "contenedor": socket.gethostname(),
    }
```

`requirements.txt`:

```text
flask==3.1.*
```

**El Dockerfile.**

```dockerfile
# 1. Partimos de Python oficial en su variante pequeña
FROM python:3.13-slim

# 2. Carpeta de trabajo dentro de la imagen
WORKDIR /app

# 3. Primero las dependencias (se aprovecha la caché, tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/))
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Después el código
COPY app.py .

# 5. Un usuario sin privilegios (G9.2)
RUN useradd --create-home appuser
USER appuser

# 6. Documentar el puerto y definir el arranque
EXPOSE 5000
CMD ["flask", "--app", "app", "run", "--host=0.0.0.0", "--port=5000"]
```

**Construir y ejecutar.**

```text
$ docker build -t hola-python:1.0 .
$ docker run -d --name py -p 5000:5000 -e NOMBRE=Equipo3 hola-python:1.0
$ curl http://localhost:5000
{"contenedor":"8d2e4f...","mensaje":"Hola desde Python, Equipo3"}
$ docker rm -f py
```

**El detalle que más tiempo hace perder: `--host=0.0.0.0`.** Por
defecto, el servidor de desarrollo de Flask escucha en `127.0.0.1`, es
decir, en el `localhost` **del contenedor** (G5.5). Haz la prueba:
cambia el `CMD` para quitar `--host=0.0.0.0`, reconstruye y ejecuta.

```text
$ curl http://localhost:5000
curl: (52) Empty reply from server        ← o "Connection reset by peer"
```

El puerto está publicado, pero el tráfico que llega por la interfaz
`eth0` del contenedor no encuentra a nadie escuchando, porque Flask
solo atiende su propio `localhost`. `0.0.0.0` significa "escuchar en
todas las interfaces del contenedor". **Este error aparece igual en
Node.js, Go, Java y PHP**: cualquier servidor dentro de un contenedor
debe escuchar en `0.0.0.0`.

> El servidor que trae Flask es para desarrollo. En producción se usa
> un servidor de aplicaciones dedicado (por ejemplo, Gunicorn). No lo
> necesitas para este ejercicio.

### G10.4 Node.js: un servidor sin dependencias

`servidor.js`:

```javascript
const http = require("node:http");
const os = require("node:os");

const PUERTO = process.env.PUERTO || 3000;

const servidor = http.createServer((peticion, respuesta) => {
  respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  respuesta.end(JSON.stringify({
    mensaje: "Hola desde Node.js",
    version: process.version,
    contenedor: os.hostname(),
  }));
});

servidor.listen(PUERTO, "0.0.0.0", () => {
  console.log(`Escuchando en el puerto ${PUERTO}`);
});
```

`Dockerfile`:

```dockerfile
FROM node:24-slim
WORKDIR /app
COPY servidor.js .
# La imagen oficial de Node incluye un usuario sin privilegios llamado node
USER node
EXPOSE 3000
CMD ["node", "servidor.js"]
```

Antes de confiar en el comentario, compruébalo (REF-B4-T49):

```text
$ docker run --rm node:24-slim id node
uid=1000(node) gid=1000(node) groups=1000(node)
```

Construir, ejecutar y ver los logs:

```text
$ docker build -t hola-node:1.0 .
$ docker run -d --name nodo -p 3000:3000 hola-node:1.0
$ docker logs nodo
Escuchando en el puerto 3000
$ curl http://localhost:3000
{"mensaje":"Hola desde Node.js","version":"v24.x.x","contenedor":"b71c..."}
$ docker rm -f nodo
```

`console.log` escribe en la salida estándar y Docker la guarda: por eso
`docker logs` funciona sin configurar nada. Es la misma razón por la
que en el Laboratorio 2 configurarás Laravel para escribir sus logs en
`stderr`.

**Con dependencias: generar `package-lock.json` sin instalar Node.**
Los proyectos reales usan librerías. El archivo `package-lock.json`
fija sus versiones exactas, igual que `composer.lock` en PHP. Puedes
generarlo con un contenedor desechable:

```text
$ mkdir hola-express && cd hola-express
$ docker run --rm -v "$PWD":/app -w /app node:24-slim npm init -y
$ docker run --rm -v "$PWD":/app -w /app node:24-slim npm install express
$ ls
node_modules  package-lock.json  package.json
```

(En Linux nativo, recuerda G9.3: agrega
`--user "$(id -u):$(id -g)" -e npm_config_cache=/tmp/.npm` para que los
archivos no queden como root.)

`servidor.js`:

```javascript
const express = require("express");
const os = require("node:os");

const app = express();

app.get("/", (req, res) => {
  res.json({ mensaje: "Hola desde Express", contenedor: os.hostname() });
});

app.listen(3000, "0.0.0.0", () => console.log("Escuchando en el puerto 3000"));
```

`.dockerignore`:

```text
node_modules
```

`Dockerfile`:

```dockerfile
FROM node:24-slim
WORKDIR /app
# Primero los archivos de dependencias, para aprovechar la caché
COPY package.json package-lock.json ./
# npm ci instala exactamente lo que dice el lock; --omit=dev excluye
# las dependencias de desarrollo
RUN npm ci --omit=dev
COPY servidor.js .
USER node
EXPOSE 3000
CMD ["node", "servidor.js"]
```

Compara con el Dockerfile de ReservaFIC (tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/)): `composer.json` y
`composer.lock` primero, `composer install --no-dev` y después el
código. **Es exactamente el mismo orden.**

### G10.5 Go: de más de 1 GB a unos cuantos MB

Go compila a un **ejecutable único** que no necesita intérprete. Eso
permite un experimento revelador.

`main.go`:

```go
package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		nombre, _ := os.Hostname()
		fmt.Fprintf(w, "Hola desde Go. Contenedor: %s\n", nombre)
	})
	fmt.Println("Escuchando en el puerto 8080")
	http.ListenAndServe(":8080", nil)
}
```

`go.mod` (generado con un contenedor, sin instalar Go):

```text
$ docker run --rm -v "$PWD":/src -w /src golang:1.27 go mod init holago
go: creating new go.mod: module holago
```

**Versión 1: una sola etapa.** Guárdala como `Dockerfile.una-etapa`.

```dockerfile
FROM golang:1.27
WORKDIR /src
COPY go.mod main.go ./
RUN CGO_ENABLED=0 go build -o /holago
EXPOSE 8080
CMD ["/holago"]
```

**Versión 2: multietapa, sobre `scratch`.** Guárdala como `Dockerfile`.

```dockerfile
# Etapa 1: el taller, con el compilador completo
FROM golang:1.27 AS compilacion
WORKDIR /src
COPY go.mod main.go ./
RUN CGO_ENABLED=0 go build -o /holago

# Etapa 2: una imagen VACÍA; solo se copia el ejecutable
FROM scratch
COPY --from=compilacion /holago /holago
USER 65534:65534
EXPOSE 8080
ENTRYPOINT ["/holago"]
```

`scratch` es una imagen especial **completamente vacía**: no tiene
shell, ni `ls`, ni librerías, ni distribución de Linux. `CGO_ENABLED=0`
pide a Go un ejecutable que no dependa de librerías del sistema, de
modo que pueda correr así. `USER 65534:65534` es un usuario sin
privilegios indicado por número, porque en una imagen vacía no hay
lista de usuarios con nombres.

```text
$ docker build -t holago:una-etapa -f Dockerfile.una-etapa .
$ docker build -t holago:multietapa .
$ docker image ls holago
REPOSITORY   TAG          SIZE
holago       multietapa   8MB        ← ejemplo
holago       una-etapa    1.2GB      ← ejemplo

$ docker run -d --name go -p 8080:8080 holago:multietapa
$ curl http://localhost:8080
Hola desde Go. Contenedor: 4e0b7c1d9a22

$ docker exec -it go sh
OCI runtime exec failed: ... exec: "sh": executable file not found in $PATH
$ docker rm -f go
```

Tres lecciones en un solo ejercicio:

1. **El tamaño.** La guía oficial de Go en Docker reporta el mismo
   fenómeno: alrededor de 1.11 GB con una sola etapa y 28.1 MB con
   multietapa sobre una imagen mínima `[T43]`. Lo que sobra es el
   compilador, que solo hace falta para construir.
2. **Un contenedor no necesita un sistema operativo.** La imagen
   `holago:multietapa` no tiene Ubuntu, ni Alpine, ni shell: solo tu
   programa. Corre porque el kernel lo pone el anfitrión (G3). Ninguna
   VM puede funcionar así.
3. **Menos cosas adentro, menos que atacar.** Si alguien comprometiera
   este programa, no encontraría ni siquiera un shell para ejecutar
   comandos.

La etapa `dependencias` de ReservaFIC (con Composer) y la etapa final
(sin Composer) siguen la misma idea, aunque PHP sí necesita su
intérprete en la imagen final.

### G10.6 Java: compilar en una imagen, ejecutar en otra

Java tiene dos paquetes: el **JDK** (*Java Development Kit*, con el
compilador `javac`) y el **JRE** (*Java Runtime Environment*, solo para
ejecutar). La imagen oficial `eclipse-temurin` ofrece ambos.

`Hola.java`:

```java
public class Hola {
    public static void main(String[] args) {
        String version = System.getProperty("java.version");
        String contenedor = System.getenv("HOSTNAME");
        System.out.println("Hola desde Java " + version + ". Contenedor: " + contenedor);
    }
}
```

Docker define la variable de entorno `HOSTNAME` en cada contenedor, así
que cualquier lenguaje puede leerla.

**Probarlo sin construir nada** (Java puede ejecutar un archivo fuente
directamente):

```text
$ docker run --rm -v "$PWD":/app -w /app eclipse-temurin:25-jdk java Hola.java
Hola desde Java 25.x. Contenedor: 0c9e5f...
```

**Imagen multietapa: compilar con el JDK, ejecutar con el JRE.**

```dockerfile
FROM eclipse-temurin:25-jdk AS compilacion
WORKDIR /src
COPY Hola.java .
RUN javac Hola.java

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=compilacion /src/Hola.class .
RUN useradd --create-home appuser
USER appuser
CMD ["java", "Hola"]
```

```text
$ docker build -t hola-java:1.0 .
$ docker run --rm hola-java:1.0
Hola desde Java 25.x. Contenedor: 7a1d...
```

Las etiquetas `25-jdk` y `25-jre` están pendiente de verificación
(REF-B4-T47); en la página oficial aparece `eclipse-temurin:25`. Si
fallan, revisa las etiquetas vigentes en Docker Hub. La guía oficial de
Java en Docker aplica el mismo principio con un proyecto Spring Boot:
compila con una imagen JDK y ejecuta con una JRE, como usuario sin
privilegios `[T43]`.

### G10.7 Servicios listos para usar: Redis

No todo contenedor es un programa tuyo. Muchas veces el contenedor
**es** el servicio que tu aplicación necesita. Ya lo hiciste con
PostgreSQL (tema [4. Operar Docker](/materias/taller-integrador/bloque-04/04-operar-docker/)). Redis es una base de datos en memoria muy
usada para caché y contadores. Las instrucciones de Docker Hub `[T44]`:

```text
$ docker network create lab-redis
$ docker run -d --name mi-redis --network lab-redis redis:8

$ docker run -it --rm --network lab-redis redis:8 redis-cli -h mi-redis
mi-redis:6379> SET saludo "hola"
OK
mi-redis:6379> GET saludo
"hola"
mi-redis:6379> INCR visitas
(integer) 1
mi-redis:6379> INCR visitas
(integer) 2
mi-redis:6379> exit

$ docker rm -f mi-redis && docker network rm lab-redis
```

Observa lo que ya sabes: el segundo contenedor (el cliente) encontró al
servidor por su **nombre** porque comparten una red (tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/)), y no
se publicó ningún puerto en tu equipo.

Otras bases de datos funcionan igual: cambian la imagen, las variables
de entorno obligatorias y la carpeta de datos. Por ejemplo, para
MariaDB (etiqueta y variable pendiente de verificación, REF-B4-T47):

```text
$ docker run -d --name maria -e MARIADB_ROOT_PASSWORD=secreto \
    -v datos_maria:/var/lib/mysql -p 127.0.0.1:3307:3306 mariadb:11
```

Antes de usar cualquier base de datos en contenedor, lee la página de
su imagen oficial: ahí dice qué variables son obligatorias y dónde
guarda sus datos.

### G10.8 `docker init`: un punto de partida generado

Docker Desktop incluye `docker init`, un comando que, ejecutado en la
carpeta de un proyecto, pregunta algunas cosas y genera `Dockerfile`,
`compose.yaml`, `.dockerignore` y `README.Docker.md` `[T41]`. Tiene
plantillas para ASP.NET Core, Go, Java, Node, PHP con Apache, Python y
Rust, más una genérica.

Úsalo **para comparar, no para copiar**: genera los archivos en una
carpeta de prueba y compáralos con los que escribiste. ¿Qué hace
distinto? ¿Por qué? La documentación advierte que debes revisarlos y
ajustarlos, y que si ya existen archivos con esos nombres, los puede
sobrescribir sin posibilidad de recuperarlos `[T41]`. **No lo ejecutes
en la carpeta de tu proyecto sin un commit previo.**

---

## G11. Un servicio con dos lenguajes: Python y Redis

Este ejemplo junta todo: una aplicación en Python que cuenta visitas en
Redis. Usa Docker Compose, que estudiarás a fondo en el Laboratorio 3;
aquí basta con leer el archivo como una lista de los contenedores que
quieres.

Estructura:

```text
contador/
├── app.py
├── requirements.txt
├── Dockerfile
└── compose.yaml
```

`app.py`:

```python
import os
import socket

from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379)

@app.get("/")
def inicio():
    visitas = redis.incr("visitas")
    return {"visitas": visitas, "atendido_por": socket.gethostname()}
```

`requirements.txt` (versiones pendiente de verificación, REF-B4-T47):

```text
flask==3.1.*
redis==6.*
```

`Dockerfile`: el mismo de G10.3.

`compose.yaml`:

```yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      REDIS_HOST: redis      # el NOMBRE del otro servicio, no localhost
    depends_on:
      - redis

  redis:
    image: redis:8
    volumes:
      - datos_redis:/data    # los conteos sobreviven al contenedor

volumes:
  datos_redis:
```

```text
$ docker compose up -d --build
$ curl http://localhost:5000
{"atendido_por":"a3f9...","visitas":1}
$ curl http://localhost:5000
{"atendido_por":"a3f9...","visitas":2}

$ docker compose down          # elimina contenedores y red; el volumen queda
$ docker compose up -d
$ curl http://localhost:5000
{"atendido_por":"c71e...","visitas":3}   ← otro contenedor, mismo conteo

$ docker compose down -v       # ahora sí borra también el volumen
```

**Para pensar.**

1. ¿Por qué cambió `atendido_por` pero no se perdió el conteo?
2. ¿Qué pasaría si `REDIS_HOST` valiera `localhost`? (G5.5)
3. ¿Qué pasaría sin la sección `volumes` después de `down` y `up`? (G7)
4. Identifica en este ejemplo los cinco conceptos del tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/):
   imagen, contenedor, registry, volumen y red.

Este es, en pequeño, el mismo diseño de ReservaFIC: aplicación web en
un contenedor, base de datos en otro, comunicación por nombre y datos
en un volumen.

---

## G12. El patrón universal

Pon lado a lado los Dockerfile de esta guía y el de ReservaFIC. Casi
todos siguen los mismos pasos:

| Paso | PHP (ReservaFIC) | Python | Node.js | Go | Java |
| --- | --- | --- | --- | --- | --- |
| 1. Imagen base con el lenguaje | `php:8.3-apache` | `python:3.13-slim` | `node:24-slim` | `golang:1.27` | `eclipse-temurin:25-jdk` |
| 2. Archivo de dependencias | `composer.json` + `composer.lock` | `requirements.txt` | `package.json` + `package-lock.json` | `go.mod` (+ `go.sum`) | `pom.xml` (Maven) |
| 3. Instalar dependencias | `composer install --no-dev` | `pip install -r requirements.txt` | `npm ci --omit=dev` | `go mod download` | `mvn dependency:go-offline` |
| 4. Copiar el código | `COPY . .` | `COPY app.py .` | `COPY servidor.js .` | `COPY *.go .` | `COPY src ./src` |
| 5. Compilar (si aplica) | No aplica | No aplica | Opcional (TypeScript) | `go build` | `javac` / `mvn package` |
| 6. Imagen final reducida | Etapa `produccion` sin Composer | `-slim` | `-slim` | `scratch` o similar | JRE en vez de JDK |
| 7. Usuario sin privilegios | `www-data` (Apache) | `useradd` + `USER` | `USER node` | `USER 65534` | `useradd` + `USER` |
| 8. Puerto | 80 | 5000 | 3000 | 8080 | según la aplicación |
| 9. Escuchar en todas las interfaces | Apache lo hace por defecto | `--host=0.0.0.0` | `listen(..., "0.0.0.0")` | `":8080"` | según el framework |
| 10. Logs | `stderr` (Lab 2) | salida estándar | `console.log` | `fmt.Println` | `System.out` |

**Si entiendes esta tabla, puedes contenerizar casi cualquier proyecto
web.** Cambian los nombres de los archivos y de los comandos; el
razonamiento es el mismo:

1. Elegir una imagen base oficial y versionada.
2. Copiar primero lo que cambia poco (dependencias) y al final lo que
   cambia mucho (código), por la caché.
3. Dejar fuera de la imagen final las herramientas que solo sirven
   para construir.
4. No correr como root.
5. Escuchar en `0.0.0.0` y escribir logs a la salida estándar.
6. Configurar con variables de entorno, nunca con secretos dentro de la
   imagen.

---

## G13. Errores frecuentes

| Síntoma | Causa | Sección |
| --- | --- | --- |
| `Empty reply from server` o `Connection reset by peer` con el puerto publicado | El servidor escucha en `127.0.0.1` dentro del contenedor | G10.3 |
| `Connection refused` al conectar a otro servicio usando `localhost` | `localhost` es el propio contenedor | G5.5 |
| El contenedor se detiene apenas arranca | El proceso principal (PID 1) terminó | G5.3 |
| `Exited (137)` y `OOMKilled: true` | Se excedió el límite de memoria | G6.5 |
| `Operation not permitted` siendo root | Capacidades restringidas por Docker | G9.1 |
| Archivos de `root` en tu proyecto (Linux) | El contenedor escribió como root en un montaje | G9.3 |
| `exec: "sh": executable file not found` | La imagen no trae shell (por ejemplo, `scratch`) | G10.5 |
| `requested image's platform does not match` | Imagen para otra arquitectura (amd64 y arm64) | G4.3 |
| Lo instalado con `apt-get` dentro del contenedor desaparece | Estaba en la capa de escritura | G7 |
| Borraste archivos de tu equipo desde un contenedor | Montaje de carpeta sin `:ro` | G8.3 |
| La base de datos responde desde otras computadoras de la red | Puerto publicado en todas las interfaces | G8.2 |

---

## G14. Autoevaluación

Responde sin mirar; las respuestas están al final.

1. Explica en dos frases la diferencia entre lo que virtualiza una VM y
   lo que "virtualiza" un contenedor.
2. Un compañero dice: "mi contenedor de Ubuntu corre sobre el kernel de
   Ubuntu". Su laptop es una Mac. ¿Qué kernel usa realmente?
3. Dentro de un contenedor ejecutas `ps` y ves solo dos procesos. Desde
   el anfitrión Linux ves ese mismo proceso con otro número. ¿Qué
   mecanismo explica las dos vistas?
4. ¿Qué limita a un contenedor que no tiene opciones `-m` ni `--cpus`?
5. Tienes diez contenedores de la misma imagen de 400 MB, cada uno con
   1 MB escrito. ¿Aproximadamente cuánto disco ocupan? ¿Por qué no son
   4 GB?
6. ¿Por qué `-p 127.0.0.1:5433:5432` es más seguro que `-p 5433:5432`?
7. Si eres root dentro de un contenedor, ¿por qué no puedes cambiar la
   hora del sistema?
8. Menciona dos cosas que una VM puede hacer y un contenedor no.
9. Tu aplicación en Node.js funciona en tu laptop sin Docker, pero
   dentro del contenedor el navegador no recibe respuesta, aunque
   publicaste el puerto. ¿Qué revisas primero?
10. ¿Por qué la imagen multietapa de Go pesa tanto menos que la de una
    sola etapa? ¿Qué le falta?
11. En el Laboratorio 4, ¿dónde hay una VM y dónde hay contenedores?
    ¿Qué aporta cada uno?
12. Completa la fila de Ruby en la tabla de G12 (investiga la imagen
    oficial `ruby` y el archivo `Gemfile.lock`).

**Respuestas.**

1. Una VM simula hardware y sobre él corre un sistema operativo
   completo con su kernel. Un contenedor no simula hardware: es un
   proceso del kernel del anfitrión al que se le aísla la vista del
   sistema y se le limitan los recursos.
2. El kernel Linux de la VM que crea Docker Desktop. "Ubuntu" es solo
   el espacio de usuario de la imagen.
3. El namespace de PID.
4. Nada: por defecto no hay límites `[T32]`; solo los recursos del
   anfitrión (o de la VM de Docker Desktop).
5. Alrededor de 410 MB: una sola copia de las capas de la imagen,
   compartidas, más 1 MB de capa de escritura por contenedor (G7).
6. Porque el puerto solo acepta conexiones desde el propio equipo y no
   desde cualquier equipo de la red (G8.2).
7. Porque Docker quita la capacidad de cambiar la hora; el root del
   contenedor es un root recortado (G9.1).
8. Por ejemplo: ejecutar otro sistema operativo (Windows sobre Linux),
   usar otro kernel, tener aislamiento a nivel de hardware.
9. Que el servidor escuche en `0.0.0.0` y no en `127.0.0.1` (G10.3);
   después, que el puerto publicado coincida con el que escucha.
10. Porque la imagen final no contiene el compilador ni la distribución
    de Linux: solo el ejecutable. Le falta todo lo que no se necesita
    para ejecutar, incluido el shell.
11. El servidor es una VM (aislamiento entre clientes del proveedor) y
    dentro corren los contenedores de Caddy, la aplicación y la base de
    datos (empaquetado y reproducibilidad) (G4.4).
12. Respuesta abierta; verifica con la página oficial de la imagen.

---

## G15. Glosario

| Término | Término en inglés | Definición breve |
| --- | --- | --- |
| Anfitrión | *host* | Equipo (físico o virtual) donde corre el motor de contenedores |
| Capacidad | *capability* | Cada uno de los permisos especiales en que Linux divide el poder de root |
| Copia en escritura | *copy-on-write* | Un archivo se comparte hasta que alguien lo modifica; entonces se copia |
| Espacio de nombres | *namespace* | Función del kernel que da a un grupo de procesos su propia vista de un recurso |
| Espacio de usuario | *user space* | Programas, librerías y archivos fuera del kernel |
| Grupo de control | *cgroup* | Función del kernel que limita y mide recursos de un grupo de procesos |
| Hipervisor | *hypervisor* | Software que crea y administra máquinas virtuales |
| Imagen oficial | *Docker Official Image* | Imagen mantenida en Docker Hub sin prefijo de organización |
| Kernel | *kernel* | Núcleo del sistema operativo que controla el hardware |
| Llamada al sistema | *system call* | Petición de un programa al kernel |
| Máquina virtual | *virtual machine* (VM) | Computadora simulada con su propio sistema operativo y kernel |
| OOM | *Out Of Memory* | Situación de memoria agotada; el kernel termina procesos |
| PID | *process identifier* | Número que identifica a un proceso |
| Proceso | *process* | Programa en ejecución |

---

## G16. Fuentes

Consultadas el 2026-10-22.

| ID | Fuente |
| --- | --- |
| T06 | Docker Docs — Packet filtering and firewalls |
| T28 | Docker Docs — What is a container? |
| T29 | Docker Docs — What is Docker? (Docker overview) |
| T30 | Docker — What is a container? (comparación con VM) |
| T31 | Docker Docs — Docker Engine security |
| T32 | Docker Docs — Resource constraints |
| T33 | Docker Docs — Storage drivers |
| T34 | Docker Docs — What is an image? |
| T35 | Docker Docs — Linux post-installation steps |
| T36 | Docker Docs — Network drivers |
| T37 | Docker Docs — Publishing and exposing ports |
| T38 | Docker Docs — Docker Desktop for Linux FAQs |
| T39 | Docker Docs — Install Docker Desktop on Windows |
| T40 | Docker Docs — Isolate containers with a user namespace |
| T41 | Docker Docs — docker init |
| T42 | Docker Docs — docker container diff |
| T43 | Docker Docs — Guías por lenguaje (Python, Node.js, Go, Java) |
| T44 | Docker Hub — imágenes oficiales `python`, `node`, `golang`, `redis`, `eclipse-temurin` |
| T45 | Linux man-pages — namespaces(7) y cgroups(7) |

pendiente de verificación: T46 (clasificación de hipervisores), T47
(etiquetas de `eclipse-temurin`, `mariadb`, `ubuntu:24.04` y versiones
de Flask y redis-py), T48 (emulación entre arquitecturas), T49 (usuario
`node` en la imagen oficial; el comando de G10.4 lo comprueba).
