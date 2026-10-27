---
title: "5. Linux básico para trabajar con contenedores"
description: "Bloque IV de Taller Integrador — terminal, directorios, archivos, registros, búsqueda y procesos."
---

## ¿Por qué necesitamos Linux?

Aunque Docker oculte parte de la complejidad es importante conocer los fundamentos del entorno

Los comandos de Linux ayudan a

- Navegar por directorios
- Inspeccionar archivos
- Leer registros
- Revisar procesos
- Comprender usuarios y permisos
- Diagnosticar problemas de ejecución

No necesitamos convertirnos en administradores Linux expertos para comenzar

## La terminal y el directorio actual

```bash
pwd
```

Muestra el directorio actual

Ejemplo

```text
/home/ana/proyectos/reservafic
```

```bash
ls
```

Lista los elementos del directorio

```bash
ls -lah
```

Muestra también archivos ocultos y detalles como permisos propietario y tamaño

## Navegar por directorios

```bash
cd proyectos
```

Entra a un directorio relativo a la ubicación actual

```bash
cd ..
```

Sube al directorio padre

```bash
cd ~
```

Va al directorio personal del usuario

```bash
cd /var/log
```

Va a una ruta absoluta

La ruta absoluta comienza desde `/`

## Crear directorios y archivos

```bash
mkdir proyecto
```

Crea un directorio

```bash
mkdir -p proyecto/config
```

Crea directorios intermedios si no existen

```bash
touch notas.txt
```

Crea un archivo vacío si no existe o actualiza sus marcas de tiempo

```bash
cp notas.txt copia.txt
```

Copia un archivo

```bash
mv copia.txt respaldo.txt
```

Mueve o cambia el nombre de un archivo

## Leer archivos y registros

```bash
cat archivo.txt
```

Muestra el contenido completo de un archivo pequeño

```bash
less archivo.txt
```

Permite revisar el contenido de forma interactiva

```bash
head -n 20 archivo.txt
```

Muestra las primeras 20 líneas

```bash
tail -n 50 archivo.txt
```

Muestra las últimas 50 líneas

```bash
tail -f aplicacion.log
```

Sigue las líneas nuevas que aparecen en un archivo

## Buscar archivos y texto

```bash
find . -name 'Dockerfile'
```

Busca archivos con ese nombre desde el directorio actual

```bash
grep -n 'ERROR' aplicacion.log
```

Busca líneas que contengan `ERROR`

```bash
grep -R 'DB_HOST' .
```

Busca una cadena en los archivos del directorio y sus subdirectorios

En proyectos grandes conviene limitar la búsqueda para evitar recorrer dependencias y archivos innecesarios

## Procesos y consumo de recursos

```bash
ps aux
```

Muestra procesos del sistema en formatos habituales de Linux

```bash
top
```

Permite observar procesos y consumo de recursos de forma dinámica

```bash
kill PID
```

Envía una señal a un proceso identificado por su PID

No conviene terminar procesos sin identificar primero qué hacen

Dentro de un contenedor las herramientas disponibles pueden ser más limitadas que en el host

## El comando `rm` requiere cuidado

```bash
rm archivo.txt
```

Elimina un archivo

```bash
rm -i archivo.txt
```

Solicita confirmación antes de eliminar el archivo

```bash
rm -r directorio
```

Elimina recursivamente un directorio y su contenido

Antes de eliminar conviene verificar la ruta y los permisos

Un comando destructivo no debe ejecutarse sin comprender su alcance

## Qué sigue

Continúa con [6. Usuarios, grupos y permisos](/materias/taller-integrador/bloque-04/06-usuarios-grupos-y-permisos/).
