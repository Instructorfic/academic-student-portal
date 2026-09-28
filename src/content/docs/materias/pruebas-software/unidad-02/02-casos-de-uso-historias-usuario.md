---
title: "2. Casos de uso e historias de usuario"
description: "Unidad II de Pruebas de Software — dos formas de describir una interacción como insumo de pruebas: dónde se define cada una, cuándo conviene usarlas y cómo elegir."
---

## Por qué necesitas esto

Con los requisitos ya identificados, este tema te da dos formas
distintas de describir **cómo se usa** una funcionalidad, como paso
previo a escribir criterios de aceptación y escenarios de prueba (tema
siguiente).

## Caso de uso (2.2.1)

Un **caso de uso** (*use case*) describe una interacción completa entre
un **actor** y el sistema: incluye un **flujo principal** y, cuando
corresponde, **flujos alternativos**.

> Actor: visitante. Flujo principal: el visitante envía nombre, correo y
> contraseña válidos → el sistema crea la cuenta y confirma el registro.

### ¿Dónde se define y cuándo conviene usarlo?

| Pregunta | Respuesta |
| --- | --- |
| ¿Dónde se define? | En la etapa de análisis de requisitos, normalmente por quien levanta y documenta el requerimiento. Queda registrado en la especificación de requisitos del sistema. |
| ¿Cuándo conviene usarlo? | Procesos con varios flujos alternos, varios actores, o contextos donde se necesita documentación formal y detallada. |

### ¿Qué resuelve un caso de uso para las pruebas?

Le da al equipo de pruebas el flujo principal **y** los flujos
alternativos completos de una interacción, de donde derivar escenarios
sin tener que adivinar comportamientos que nadie describió por escrito.

### Más ejemplos de casos de uso

| Actor | Caso de uso (resumen) |
| --- | --- |
| Cliente | Solicitar devolución de un producto: indica el motivo → el sistema genera una guía de devolución. |
| Administrador | Desactivar una cuenta de usuario: confirma la desactivación → el sistema revoca el acceso. |
| Huésped | Reservar una habitación: elige fechas y tipo de habitación → el sistema confirma la disponibilidad y genera la reserva. |

## Historia de usuario (2.2.2)

Una **historia de usuario** (*user story*) describe la misma interacción
en un formato breve, orientado al valor para quien la usa:

```text
Como   visitante del sitio
quiero registrarme con mi nombre, correo y contraseña
para   poder acceder a mi cuenta personal
```

### ¿Dónde se define y cuándo conviene usarla?

| Pregunta | Respuesta |
| --- | --- |
| ¿Dónde se define? | En el backlog del producto, normalmente redactada o priorizada por quien representa al negocio frente al equipo, junto con el equipo de trabajo. |
| ¿Cuándo conviene usarla? | Equipos con iteraciones cortas, donde se prioriza entregar valor incremental sobre documentación exhaustiva. |

### Más ejemplos de historias de usuario

```text
Como   cliente frecuente
quiero ver mi historial de pedidos
para   repetir fácilmente una compra anterior
```

```text
Como   usuario que olvidó su contraseña
quiero restablecerla desde mi correo
para   recuperar el acceso sin contactar a soporte
```

Esta última historia es exactamente la funcionalidad que vas a
desarrollar como segundo ejemplo completo de la unidad, en
[5. Más ejemplos aplicados](/materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado/).

## Caso de uso vs. historia de usuario

| | Caso de uso | Historia de usuario |
| --- | --- | --- |
| Formato | Actor, flujo principal, flujos alternos | Como / quiero / para |
| Extensión | Más detallado | Breve |
| Uso típico | Documentación formal | Equipos ágiles |

No son intercambiables ni equivalentes: son dos formas distintas de
llegar al mismo insumo — qué debe cumplir el sistema al usarse.

### ¿Cuál elegir?

No es una elección exclusiva: algunos equipos usan ambos formatos según
el tipo de funcionalidad. La pregunta que orienta la elección es: ¿necesito
documentación formal para un proceso con varios flujos alternos (caso
de uso), o priorizar valor incremental en iteraciones cortas (historia
de usuario)? En cualquiera de los dos casos, el insumo que sigue es el
mismo: los criterios de aceptación (siguiente tema).

## Error común

Tratar caso de uso e historia de usuario como si uno fuera "la versión
formal" del otro. No lo son: un caso de uso documenta un flujo completo
con sus alternativas. Una historia de usuario prioriza el valor para
quien la usa, en un formato breve. Ninguno es obligatorio sobre el otro
— elige el que mejor se ajuste a tu proyecto o el que indique tu docente.
En el Laboratorio 2 tu equipo usará una sola de las dos modalidades.

## Referencias de este tema

- Crispin y Gregory, *Agile Testing* — historias de usuario y criterios
  de aceptación desde la perspectiva del equipo ágil.

Ver [Referencias de la unidad](/materias/pruebas-software/unidad-02/referencias/)
para la ficha completa de cada fuente.

## Qué sigue

Ya tienes una descripción de la interacción. El siguiente paso es
definir cuándo se considera cumplida: continúa con
[3. Criterios de aceptación y escenarios](/materias/pruebas-software/unidad-02/03-criterios-aceptacion-escenarios/).
