---
title: "Bloque IV — Contenedores, despliegue y escalabilidad"
description: "Taller Integrador — introducción al Bloque IV: resultados de aprendizaje, ruta de estudio y el paso de «funciona en mi computadora» a un sistema reproducible, desplegado y medido."
---

## Identificación del bloque

| Campo | Valor |
| --- | --- |
| Materia | Taller Integrador de Especialización (clave 4017) |
| Bloque | IV — Contenedores, despliegue y escalabilidad |
| Horas de contacto | 16 (8 teóricas + 8 prácticas) |
| Estudio independiente | 8 horas |
| Punto de partida | Tu proyecto en la etiqueta `v0.2.0` del Bloque III |
| Punto de llegada | Etiqueta `v0.3.0`: sistema contenerizado, desplegado y medido |

## Resultados de aprendizaje del bloque

| ID | Al terminar el bloque... |
| --- | --- |
| RA4.1 | Comprendes el modelo de ejecución mediante contenedores |
| RA4.2 | Contenerizas el sistema desarrollado |
| RA4.3 | Construyes ambientes reproducibles |
| RA4.4 | Despliegas el sistema |
| RA4.5 | Analizas el comportamiento del sistema ante cargas representativas |

## ¿Qué problema vamos a resolver?

Para que ReservaFIC funcionara en tu computadora tuviste que instalar
PostgreSQL, crear usuarios y bases de datos, configurar el `.env` y
tener las versiones correctas de PHP, sus extensiones y Composer. Cada
respuesta vive en la cabeza de alguien o en un README que se
desactualiza, y lo que funciona en tres laptops falla en el servidor.

Al final del bloque cualquier integrante de tu equipo podrá clonar el
proyecto en una computadora que solo tenga Git y Docker, ejecutar
`docker compose up -d` y tener funcionando la aplicación y la base de
datos con las mismas versiones que todos los demás y que el servidor.
Después medirás cuánta carga aguanta tu sistema y razonarás, con datos y
supuestos explícitos, qué tendría que cambiar para atender el escenario
de referencia de 100,000 usuarios activos potenciales.

## Ruta de estudio sugerida

1. Revisa la [presentación del bloque](/materias/taller-integrador/bloque-04/presentacion/): qué aprenderemos y el problema de «en mi máquina funciona».
2. Lee los temas [1. ¿Qué es un contenedor?](/materias/taller-integrador/bloque-04/01-que-es-un-contenedor/) a [4. Operar Docker](/materias/taller-integrador/bloque-04/04-operar-docker/) y las secciones G1 a G4 de la [guía de fundamentos de contenedores](/materias/taller-integrador/bloque-04/guia-fundamentos-contenedores/). Después realiza el [Laboratorio 1](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-1-primeros-contenedores/).
3. Lee los temas [5. Linux básico](/materias/taller-integrador/bloque-04/05-linux-basico/), [6. Usuarios, grupos y permisos](/materias/taller-integrador/bloque-04/06-usuarios-grupos-y-permisos/) y [7. Arquitectura de Docker](/materias/taller-integrador/bloque-04/07-arquitectura-de-docker/), junto con las secciones G5 a G9 de la guía.
4. Lee [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/) y realiza el [Laboratorio 2](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-2-dockerfile/).
5. Lee [9. Docker Compose](/materias/taller-integrador/bloque-04/09-docker-compose/) y [10. Seguridad de contenedores](/materias/taller-integrador/bloque-04/10-seguridad-de-contenedores/), y realiza el [Laboratorio 3](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-3-docker-compose/).
6. Lee [11. Del desarrollo al despliegue](/materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue/) y realiza el [Laboratorio 4](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-4-despliegue/).
7. Lee [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/) y realiza el [Laboratorio 5](/materias/taller-integrador/bloque-04/laboratorios/laboratorio-5-pruebas-de-carga/).
8. Revisa [13. Aplicación integradora](/materias/taller-integrador/bloque-04/13-aplicacion-integradora/) y el [cierre y autoevaluación](/materias/taller-integrador/bloque-04/14-cierre-y-autoevaluacion/).

## Qué aprenderás después

El Bloque V parte del sistema contenerizado, desplegado y medido que
dejas en la etiqueta `v0.3.0`.
