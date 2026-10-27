---
title: "10. Seguridad de contenedores"
description: "Bloque IV de Taller Integrador — límites del aislamiento, root, montajes, puertos, cadena de suministro y contenedores desechables."
---

**Temas del programa:** 4.1.3

## El aislamiento no es una frontera mágica

La seguridad depende de varios componentes

```text
Host
 │
 ├── Kernel
 ├── Motor
 ├── Runtime
 ├── Imagen
 ├── Red
 ├── Volúmenes
 ├── Secretos
 └── Permisos
```

Una configuración insegura puede reducir las ventajas del aislamiento

## Ejecutar como root

Un proceso ejecutado como `root` dentro de un contenedor puede tener privilegios elevados dentro de su entorno

No significa automáticamente que tenga todos los privilegios del host pero tampoco debe asumirse que está completamente protegido

Cuando sea compatible

- Utiliza usuarios no privilegiados
- Evita capacidades innecesarias
- No uses el modo privilegiado sin justificación
- Revisa los montajes del host
- Mantén actualizado el motor y las imágenes

## Cuidado con los montajes del host

Un montaje puede dar acceso a archivos externos al contenedor

```text
HOST
 │
 └── directorio compartido
          │
          ▼
      CONTENEDOR
```

Si se monta un directorio sensible con permisos de escritura el contenedor puede modificar los archivos que tenga autorizados

No montes rutas críticas del host sin comprender el efecto

## Cuidado con los puertos publicados

Una base de datos normalmente no necesita estar expuesta públicamente para que la aplicación la utilice

Arquitectura preferible para muchos casos

```text
Internet
   │
   ▼
Proxy HTTPS
   │
   ▼
Aplicación
   │
   ▼
Base de datos en red interna
```

La exposición de servicios debe limitarse a los componentes que realmente necesitan acceso externo

## Imágenes y cadena de suministro

Antes de utilizar una imagen revisa

- Su origen
- Su mantenimiento
- Sus versiones
- Sus dependencias
- Sus vulnerabilidades conocidas
- La forma en que se distribuye
- Los mecanismos disponibles para verificar su integridad

Utilizar una imagen oficial puede ayudar a identificar su origen pero no elimina la necesidad de mantenerla actualizada y evaluar sus riesgos

## Contenedores desechables

La estrategia habitual de actualización consiste en crear una nueva imagen y reemplazar los contenedores correspondientes

```text
Imagen V1
    │
    ▼
Contenedor V1
    │
    ▼
Construir imagen V2
    │
    ▼
Crear contenedor V2
```

No conviene depender de entrar manualmente a un contenedor en ejecución para modificarlo como mecanismo principal de actualización

Los cambios hechos solo en la capa de escritura pueden perderse al recrear el contenedor

## Qué sigue

Continúa con [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/).
