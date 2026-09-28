---
title: "5. Más ejemplos aplicados"
description: "Unidad II de Pruebas de Software — el pipeline completo requisito-historia-criterio-escenario-matriz, con una funcionalidad de seguridad y con la contradicción resuelta del tema 1."
---

## Por qué más ejemplos

El ejemplo del formulario de registro (temas 1 a 4) es sobre todo un
ejemplo de **validación de datos**. Este tema recorre el mismo pipeline
completo —requisito → historia → criterio → escenario → fila de
matriz— dos veces más, con funcionalidades de otro tipo, para que veas
que el mismo procedimiento aplica a cualquier funcionalidad:

```text
Requisito
    ↓
Criterio de aceptación
    ↓
Escenario
    ↓
Caso de prueba
    ↓
Matriz de trazabilidad inicial
```

## Segundo ejemplo aplicado — recuperación de contraseña

Este segundo ejemplo recorre el pipeline con una regla de negocio de
**seguridad**, no de validación de datos.

### El requisito

> **RF-02** — El sistema debe enviar un enlace de recuperación de
> contraseña al correo registrado cuando el usuario lo solicite.
>
> **RNF-02** — El enlace de recuperación debe expirar 30 minutos después
> de haberse generado. (requisito no funcional de seguridad)
>
> **RN-02** — El sistema no debe revelar, en su respuesta, si un correo
> está registrado o no en la base de datos.

`RN-02` es una regla de negocio menos obvia que la del primer ejemplo:
no describe qué hace el sistema, describe una fuga de información que
**no** debe ocurrir. Si el mensaje de error fuera distinto para "correo
no encontrado" que para "enlace enviado", cualquiera podría usar el
formulario para descubrir qué correos están registrados.

### La historia de usuario

```text
Como   usuario que olvidó su contraseña
quiero solicitar un enlace de recuperación por correo
para   poder recuperar el acceso a mi cuenta
```

### Los criterios de aceptación

> **Dado que** el correo está registrado, **cuando** el usuario solicita
> recuperación, **entonces** el sistema envía un enlace válido por 30
> minutos y muestra un mensaje de confirmación genérico.
>
> **Dado que** el correo **no** está registrado, **cuando** el usuario
> solicita recuperación, **entonces** el sistema muestra exactamente el
> mismo mensaje de confirmación genérico (sin enviar ningún correo).

Nota que `RN-02` obliga a que el segundo criterio exista: sin él,
alguien podría diseñar el sistema para que "funcione" (`RF-02`) sin
cumplir la regla de negocio.

### Los escenarios

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E4 | Positivo | Correo registrado | Enlace enviado; mensaje genérico de confirmación |
| E5 | Negativo | Correo no registrado | Mismo mensaje genérico; ningún correo enviado |
| E6 | Alterno / condición límite | Enlace usado exactamente a los 30 minutos de generado | Definir explícitamente si se acepta o se rechaza (el límite debe quedar documentado, no ambiguo) |

El escenario E5 no es un error en el sentido habitual: el sistema
"funciona correctamente" mostrando el mismo mensaje que en E4, sin
enviar nada. Si tu primer instinto es escribir "el sistema muestra un
error: correo no encontrado" como resultado esperado de E5, vuelve a
leer `RN-02` — ese resultado violaría la regla de negocio, aunque "se
sienta" más natural de escribir.

El escenario E6 es el más fácil de pasar por alto: "30 minutos" suena
preciso, pero ¿el minuto 30 exacto ya expiró o todavía es válido? Esa es
exactamente la clase de ambigüedad que una condición límite bien
diseñada obliga a resolver por escrito.

### La fila de la matriz

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-02 | Enviar enlace de recuperación | ESC-04 | Pendiente de ejecutar |
| RN-02 | No revelar si el correo existe | ESC-05 | Pendiente de ejecutar |
| RNF-02 | Enlace expira en 30 minutos | ESC-06 | Pendiente de ejecutar |

Observa que `RN-02` y `RNF-01` (del primer ejemplo, contraseña
almacenada cifrada) protegen cosas distintas aunque ambos "suenan a
seguridad": `RNF-01` protege el dato en reposo; `RN-02` protege contra
una fuga de información en la *respuesta* del sistema. Al construir tu
propia matriz, si confundes estos dos tipos de protección en una sola
fila, sepáralos — cada uno se prueba con un escenario distinto.

## Tercer ejemplo aplicado — resolviendo la contradicción del tema 1

En [1. Requisitos funcionales, no funcionales y reglas de negocio](/materias/pruebas-software/unidad-02/01-requisitos-funcionales-no-funcionales-reglas-negocio/)
viste dos requisitos contradecirse sobre cuándo se puede cancelar una
inscripción:

| ID | Requisito |
| --- | --- |
| RF-CANC-01 | El sistema deberá permitir cancelar una inscripción hasta 24 horas antes del inicio del curso. |
| RF-CANC-02 | El sistema deberá permitir cancelar una inscripción en cualquier momento antes del inicio del curso. |

Aquí está la versión corregida: una sola regla de negocio verificable,
en vez de dos requisitos que se contradicen.

> **RN-03** — El sistema deberá permitir cancelar una inscripción hasta
> 24 horas antes del inicio del curso.

### Los criterios de aceptación

> **Dado que** faltan más de 24 horas para el inicio del curso,
> **cuando** el estudiante solicita cancelar, **entonces** el sistema
> cancela la inscripción y libera el lugar.
>
> **Dado que** faltan menos de 24 horas, **cuando** el estudiante
> solicita cancelar, **entonces** el sistema rechaza la cancelación e
> informa el motivo.

### Escenarios y matriz de la cancelación

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E13 | Positivo | Cancelación 48 h antes | Inscripción cancelada |
| E14 | Negativo | Cancelación 2 h antes | Cancelación rechazada |
| E15 | Alterno / límite | Cancelación exactamente a las 24 h | Debe quedar definido por escrito si se acepta o rechaza |

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RN-03 | Cancelar inscripción respetando la ventana de 24 horas | ESC-13, ESC-14, ESC-15 | Pendiente de ejecutar |

Una sola regla de negocio verificable, en vez de dos requisitos que se
contradicen — y el mismo recorrido (requisito → criterio → escenario →
matriz) que harás tú en los tres laboratorios.

## Para aplicar tú mismo

Elige una funcionalidad del [proyecto base asignado a tu equipo](/materias/pruebas-software/unidad-02/proyectos-base/) que tenga una regla de
negocio de seguridad o privacidad (por ejemplo: "un usuario no puede ver
los datos de otro", "una acción queda registrada con quién la hizo").
Repite este mismo recorrido completo —requisito → historia → criterios
→ escenarios → fila de matriz— antes de continuar con el
[Laboratorio 1](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio/).

## Qué sigue

Ya recorriste el pipeline completo tres veces, con tres tipos distintos
de funcionalidad. Cierra la unidad en
[6. Cierre y resumen](/materias/pruebas-software/unidad-02/06-cierre-y-resumen/).
