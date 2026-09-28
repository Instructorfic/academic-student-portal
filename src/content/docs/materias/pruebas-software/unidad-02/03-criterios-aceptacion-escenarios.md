---
title: "3. Criterios de aceptación y escenarios"
description: "Unidad II de Pruebas de Software — del criterio de aceptación dado-cuando-entonces a escenarios positivos, negativos y alternos, con condiciones límite."
---

## Criterios de aceptación (2.2.3)

Un **criterio de aceptación** (*acceptance criterion*) es una condición
verificable que determina cuándo un caso de uso o historia de usuario se
considera cumplido. Un formato útil es dado–cuando–entonces:

> **Dado que** el visitante no tiene cuenta, **cuando** envía un nombre,
> un correo válido no registrado antes y una contraseña que cumple la
> política, **entonces** el sistema crea la cuenta y confirma el
> registro.

Cada criterio de aceptación bien escrito tiene tres partes: una
**condición inicial**, una **acción** y un **resultado observable**. Si
falta alguna, el criterio está incompleto.

> **Ampliación — formato Gherkin (Given-When-Then).** El formato
> dado–cuando–entonces usado aquí corresponde al vocabulario del
> *Behavior-Driven Development* (BDD), donde se conoce como
> Given–When–Then o Gherkin. Se menciona aquí solo como referencia de
> vocabulario: el programa oficial de esta unidad no exige ni evalúa la
> sintaxis formal de Gherkin ni herramientas de BDD — eso queda fuera
> del alcance de esta unidad.

### Relación entre criterios de aceptación y pruebas

Un criterio de aceptación bien escrito es casi directamente un caso de
prueba: el **dado** es la precondición, el **cuando** es la acción o
entrada, y el **entonces** es el resultado esperado — exactamente la
estructura que necesita un caso de prueba.

### Más ejemplos de criterios de aceptación

> **Dado que** un usuario ha fallado 4 intentos de inicio de sesión,
> **cuando** falla un quinto intento, **entonces** el sistema bloquea la
> cuenta durante 15 minutos.

> **Dado que** un producto tiene 0 unidades en inventario, **cuando** un
> cliente intenta agregarlo al carrito, **entonces** el sistema impide
> la acción y muestra "sin existencias".

## Escenarios positivos, negativos y alternos (2.2.4)

A partir de los criterios de aceptación se diseñan **escenarios**
concretos, que ya son casi casos de prueba:

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E1 | Positivo | Correo nuevo válido | Cuenta creada |
| E2 | Negativo | Correo ya registrado | Registro rechazado |
| E3 | Alterno / condición límite | Contraseña del largo mínimo exacto | Cuenta creada |

### Buenas prácticas para diseñar escenarios

- **Empieza por el camino feliz** — cubre primero el escenario positivo
  antes de las variantes.
- **Ataca cada regla de negocio** — por cada regla, diseña al menos un
  escenario que intente romperla.
- **Evita duplicados sin razón** — no repitas el mismo escenario con
  datos distintos si verifica exactamente lo mismo.
- **Da un ID único a cada uno** — lo necesitarás para construir la
  matriz de trazabilidad (tema 4).

### Más ejemplos de escenarios — inicio de sesión

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E7 | Positivo | Correo y contraseña correctos | Acceso concedido |
| E8 | Negativo | Contraseña incorrecta | Acceso denegado, mensaje de error |
| E9 | Alterno / límite | Quinto intento fallido consecutivo | Cuenta bloqueada temporalmente |

### Más ejemplos de escenarios — carrito de compras

| Escenario | Tipo | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| E10 | Positivo | Carrito con 3 productos disponibles | Pago procesado |
| E11 | Negativo | Producto sin existencias en el carrito | Pago bloqueado, aviso "sin existencias" |
| E12 | Alterno / límite | Carrito con 0 productos al intentar pagar | Pago bloqueado, mensaje de carrito vacío |

Los límites no son solo de texto o de intentos — E12 es un límite de
**cantidad**, el mismo tipo que verás en tu proyecto base si algo se
cuenta, se acumula o se agota.

## Condición límite

Una **condición límite** (*boundary condition*) es un valor exactamente
en el borde de un rango válido. No es solo numérica: también aplica a
longitud de texto, número de intentos, fechas. Un escenario "alterno"
que no toca un límite real no cumple 2.2.4 — se profundizará
formalmente en la Unidad III.

### Cómo encontrar condiciones límite

Pregúntate: ¿cuál es el valor más pequeño que el sistema debe aceptar?
¿cuál es el más grande? ¿qué pasa justo un paso antes y un paso después
de ese borde? Estas preguntas —no una fórmula— son la manera intuitiva
de encontrar condiciones límite en esta unidad; en la **Unidad III** se
retoman con una técnica formal.

### Más ejemplos de condiciones límite

| Tipo de límite | Ejemplo |
| --- | --- |
| Longitud de texto | Contraseña de exactamente 8 caracteres (el mínimo permitido) |
| Cantidad | Carrito con 0 productos al intentar pagar |
| Número de intentos | Quinto intento fallido de inicio de sesión, si el límite es 5 |
| Fecha | Usar una promoción exactamente el último día de su vigencia |

## Error común

Escribir un "escenario negativo" que en realidad es solo otro caso
positivo con datos distintos. Pregúntate: ¿qué entrada rompería la regla
de negocio o el requisito? Revisa tus reglas de negocio antes de dar por
completo un escenario negativo.

> **Laboratorio 2.** A partir de uno de tus requisitos del Laboratorio
> 1: redacta un caso de uso o historia de usuario, sus criterios de
> aceptación, y al menos tres escenarios (positivo, negativo,
> alterno/límite). Guía completa en el
> [Laboratorio 2](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-2-criterios-aceptacion-escenarios/).

## Referencias de este tema

- Patton, *Software Testing* — escenarios positivos y negativos.
- Crispin y Gregory, *Agile Testing* — criterios de aceptación.

Ver [Referencias de la unidad](/materias/pruebas-software/unidad-02/referencias/)
para la ficha completa de cada fuente.

## Qué sigue

Ya tienes escenarios con ID. El siguiente paso es relacionarlos
formalmente con tus requisitos: continúa con
[4. Trazabilidad y matriz de trazabilidad](/materias/pruebas-software/unidad-02/04-trazabilidad-matriz/).
