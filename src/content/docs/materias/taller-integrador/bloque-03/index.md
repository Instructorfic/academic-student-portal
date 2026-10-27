---
title: "Bloque III — Construcción del sistema"
description: "Taller Integrador — introducción al Bloque III: resultados de aprendizaje, ruta de estudio y el defecto que organiza todo el bloque."
---

## Identificación del bloque

| Campo | Valor |
| --- | --- |
| Materia | Taller Integrador de Especialización (clave 4017) |
| Bloque | III — Construcción del sistema |
| Horas de contacto | 22 (10 teóricas + 12 prácticas) |
| Estudio independiente | 11 horas |

## Resultados de aprendizaje del bloque

Al finalizar este bloque serás capaz de:

| ID | Resultado de aprendizaje |
| --- | --- |
| RA3.1 | Implementar las funcionalidades prioritarias del proyecto |
| RA3.2 | Integrar componentes de software |
| RA3.3 | Implementar APIs y mecanismos de persistencia |
| RA3.4 | Aplicar prácticas de calidad y desarrollo seguro |
| RA3.5 | Trabajar mediante iteraciones Scrum |

## ¿Qué problema vamos a resolver?

En ReservaFIC, el ejemplo ilustrativo del curso, el servicio de
préstamos del Bloque II acepta que dos personas reserven el mismo
proyector a la misma hora, y rechaza préstamos que no se traslapan.
Nadie lo vio porque nadie probó esos casos, y aun así pasó la revisión
de código, la Sprint Review y la Definition of Done.

Este bloque trata de pasar de un sistema que **parece** funcionar a uno
que puedes **demostrar** que funciona, que protege sus datos, que no
deja hacer lo que no se debe y que no permite que un error ya corregido
regrese.

> **Pregunta orientadora.** ¿Cómo puede tu equipo tener evidencia, y no
> solo confianza, de que el sistema hace lo correcto, para el usuario
> correcto, cada vez que alguien integra un cambio?

## Ruta de estudio sugerida

1. Revisa la [presentación del bloque](/materias/taller-integrador/bloque-03/presentacion/): objetivos, decisiones del curso, el defecto que nadie vio y el camino del bloque.
2. Lee [1. Manejo de datos](/materias/taller-integrador/bloque-03/01-manejo-de-datos/) y realiza el [Laboratorio 1](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-1-persistencia-postgresql/).
3. Lee [2. Desarrollo de componentes](/materias/taller-integrador/bloque-03/02-desarrollo-de-componentes/) y [3. Manejo de errores](/materias/taller-integrador/bloque-03/03-manejo-de-errores/), y realiza el [Laboratorio 2](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-2-api-rest/).
4. Lee [4. Pruebas automatizadas](/materias/taller-integrador/bloque-03/04-pruebas-automatizadas/) y [5. Datos de prueba](/materias/taller-integrador/bloque-03/05-datos-de-prueba/), y realiza el [Laboratorio 3](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-3-pruebas/).
5. Lee [6. Desarrollo seguro](/materias/taller-integrador/bloque-03/06-desarrollo-seguro/) y [7. Gestión de secretos](/materias/taller-integrador/bloque-03/07-gestion-de-secretos/), y realiza el [Laboratorio 4](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-4-desarrollo-seguro/).
6. Lee [8. Integración continua](/materias/taller-integrador/bloque-03/08-integracion-continua/) y realiza el [Laboratorio 5](/materias/taller-integrador/bloque-03/laboratorios/laboratorio-5-integracion-continua/).
7. Revisa el [cierre y resumen](/materias/taller-integrador/bloque-03/09-cierre-y-resumen/).

## Qué aprenderás después

En el Bloque IV empaquetarás este mismo sistema en contenedores para
ejecutarlo de forma reproducible, desplegarlo y medir cuánta carga
soporta.
