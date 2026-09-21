---
title: "4. Arquitectura de software"
description: "Bloque II de Taller Integrador — qué es la arquitectura de software, principios arquitectónicos, tipos de arquitectura con casos de uso, ventajas y desventajas."
---

## El problema que resuelve organizar la arquitectura

El controlador que construiste en el Bloque I probablemente hace todo:
recibe la petición, valida los datos, aplica las reglas de negocio,
guarda en base de datos y arma la respuesta. Funciona. No va a seguir
funcionando así cuando el proyecto crezca.

## ¿Qué es la arquitectura de software?

La **arquitectura de software** es el conjunto de decisiones
fundamentales sobre cómo está organizado un sistema: en qué
componentes se divide, qué responsabilidad tiene cada uno, cómo se
comunican entre sí, y qué reglas rigen esas relaciones. No es un
diagrama ni un documento — el diagrama y el documento son formas de
**representar** una arquitectura que ya existe (o que estás
proponiendo), de la misma manera en que el pseudocódigo representa un
algoritmo sin ser el algoritmo mismo.

Toda aplicación tiene una arquitectura, la hayas decidido
deliberadamente o no. La diferencia entre una arquitectura
**intencional** y una **accidental** es que la primera resulta de
decisiones explícitas (como las que vas a tomar en este bloque) y la
segunda es simplemente el resultado acumulado de ir agregando código
sin un criterio de organización — el controlador que "hace todo" de la
sección anterior es un ejemplo de arquitectura accidental.

**Por qué importa tan temprano en el proyecto.** Cambiar la
arquitectura de un sistema pequeño (como el tuyo, en este bloque) es
barato. Cambiarla cuando el sistema ya tiene decenas de miles de líneas
de código y varios equipos trabajando sobre él es costoso y riesgoso.
Por eso este bloque documenta la arquitectura ahora, no al final del
semestre.

## Cuatro principios arquitectónicos

| Principio | Qué significa |
| --- | --- |
| Separación de responsabilidades | Cada componente debe tener una sola razón para cambiar |
| Cohesión | Qué tan relacionado está lo que vive dentro del mismo componente — alta cohesión significa que todo ahí pertenece junto |
| Acoplamiento | Qué tan dependiente es un componente de los detalles internos de otro — bajo acoplamiento significa que puedes cambiar uno sin romper los demás |
| Escalabilidad (a nivel de diseño) | Si el diseño permite crecer (más reglas, más tipos de dato, más integraciones) sin reescribir todo |

Un controlador que valida, decide reglas de negocio y guarda datos
tiene tres razones distintas para cambiar — viola directamente la
separación de responsabilidades.

> **Alcance de este bloque.** La escalabilidad aquí es una propiedad
> del diseño, no todavía de la infraestructura. Soportar más usuarios
> simultáneos, más carga o más tráfico es contenido del Bloque IV.

## Arquitecturas comunes

| Arquitectura | Idea central | ¿Dónde vive tu proyecto? |
| --- | --- | --- |
| Monolítica | Toda la aplicación es un solo proyecto desplegable | Laravel completo, tal como lo tienes ahora |
| Multicapa | El monolito se organiza internamente en capas (presentación, lógica, datos) | Lo que vas a construir en este bloque |
| Cliente-servidor | El cliente consume servicios expuestos por un servidor | Tu navegador consumiendo las rutas de Laravel |
| Orientada a servicios | El sistema se divide en servicios independientes | Fuera de alcance de este bloque |

Tu proyecto es y sigue siendo un **monolito multicapa**: este bloque no
lo convierte en microservicios. A continuación, cada una con su caso de
uso, ventajas y desventajas — para que la elección de arquitectura sea
una decisión informada, no una preferencia arbitraria.

### Monolítica

Toda la aplicación (interfaz, lógica de negocio y acceso a datos) se
construye, se prueba y se despliega como una sola unidad.

| | |
| --- | --- |
| **Caso de uso** | Proyectos pequeños o medianos, equipos pequeños, aplicaciones nuevas donde todavía no se conoce bien el dominio (exactamente la situación de tu proyecto) |
| **Ventajas** | Simple de desarrollar, probar y desplegar; no hay comunicación de red entre partes internas; depurar un error es más directo porque todo el código vive en un solo lugar |
| **Desventajas** | Difícil escalar solo una parte específica (tienes que escalar toda la aplicación aunque solo un módulo reciba mucha carga); un error grave puede afectar a todo el sistema; conforme crece, los despliegues se vuelven más grandes y riesgosos |

### Multicapa (*layered*)

El monolito se organiza internamente en capas horizontales, cada una
con una responsabilidad (por ejemplo: presentación, lógica de negocio,
acceso a datos), donde cada capa solo se comunica con la capa
inmediatamente adyacente.

| | |
| --- | --- |
| **Caso de uso** | La organización interna por defecto de la mayoría de las aplicaciones empresariales — es exactamente lo que vas a construir en este bloque (Form Request, Controlador, Service, Model) |
| **Ventajas** | Separación clara de responsabilidades; cada capa se puede entender y modificar de forma relativamente aislada; facilita dividir el trabajo entre integrantes del equipo |
| **Desventajas** | Si no se respeta la dirección de las dependencias (una capa inferior nunca debe depender de una superior), el acoplamiento crece igual que en un monolito sin capas; un cambio que "atraviesa" varias capas (por ejemplo, un campo nuevo que debe reflejarse en la vista, el controlador, el servicio y el modelo) sigue tocando varios archivos |

### Cliente-servidor

El sistema se divide en dos roles: un **cliente** que solicita
información o acciones, y un **servidor** que las provee. El servidor
no inicia la comunicación; siempre responde a una solicitud del
cliente.

| | |
| --- | --- |
| **Caso de uso** | Cualquier aplicación web o móvil que consume una API — tu navegador pidiendo una página a Laravel, o una futura app móvil consumiendo la misma API |
| **Ventajas** | Separa la interfaz de usuario del procesamiento; el mismo servidor puede atender a varios tipos de cliente (web, móvil, otro sistema) sin duplicar la lógica de negocio |
| **Desventajas** | Depende de la disponibilidad de la red entre cliente y servidor; el servidor puede convertirse en un cuello de botella si muchos clientes lo solicitan al mismo tiempo (tema de escalabilidad de infraestructura del Bloque IV) |

### Orientada a servicios (SOA)

El sistema se organiza como un conjunto de servicios de negocio
independientes, que distintas aplicaciones pueden reutilizar, a menudo
coordinados por un mecanismo central de comunicación.

| | |
| --- | --- |
| **Caso de uso** | Organizaciones grandes donde varias aplicaciones distintas necesitan compartir la misma lógica de negocio (por ejemplo, un servicio de "validar identidad" que usan varios sistemas de la misma institución) |
| **Ventajas** | Reutilización real de servicios entre aplicaciones distintas; desacopla a las aplicaciones que consumen un servicio de los cambios internos de ese servicio |
| **Desventajas** | Mayor complejidad de infraestructura y de coordinación entre servicios; requiere gobierno técnico (versionado de contratos, disponibilidad) que un proyecto de este tamaño no necesita todavía |

> **Alcance de este bloque.** Necesitas poder **identificar** estas
> cuatro arquitecturas y elegir, con justificación, cuál corresponde a
> tu proyecto (casi siempre: monolito multicapa con un rol
> cliente-servidor frente al navegador). No se te pide implementar una
> arquitectura orientada a servicios ni convertir tu monolito en varios
> servicios independientes.

## Panorama: arquitecturas más allá de este bloque

Las cuatro arquitecturas anteriores no son las únicas que existen hoy.
El programa oficial de este bloque solo pide **identificar**
arquitecturas comunes, no implementar las siguientes — se incluyen aquí
únicamente como panorama, para que sepas cómo se llaman y en qué se
diferencian del monolito multicapa que sí vas a construir.

| Arquitectura | Idea central | Ventaja principal | Desventaja principal |
| --- | --- | --- | --- |
| Microservicios | El sistema se divide en varios servicios pequeños e independientes, cada uno con su propia base de datos y su propio ciclo de despliegue | Cada servicio escala y se despliega por separado; distintos equipos pueden trabajar en paralelo con menos interferencia | Alta complejidad operativa: red entre servicios, monitoreo distribuido, consistencia de datos entre servicios — requiere la madurez de contenedores y CI/CD de los Bloques III y IV |
| Orientada a eventos (*event-driven*) | Los componentes se comunican publicando y reaccionando a eventos, sin conocerse directamente entre sí | Desacoplamiento muy alto entre quien produce un evento y quien reacciona a él; buena para procesar cosas en paralelo | Más difícil de rastrear el flujo completo de una operación (¿qué reaccionó a qué, y en qué orden?); la consistencia de los datos suele ser "eventual", no inmediata |
| *Serverless* (funciones como servicio) | El código se ejecuta en funciones administradas por un proveedor de nube, que las activa bajo demanda | No administras servidores; pagas únicamente por el tiempo de ejecución real | Tiempo de arranque adicional en la primera ejecución (*cold start*); atarte a las particularidades de un proveedor de nube específico |

> **Por qué se mencionan sin profundizar.** `CONTEXTO_UNIDAD.md` de este
> bloque señala explícitamente que las arquitecturas distribuidas y de
> microservicios en profundidad **no son contenido de este bloque** —
> el temario oficial pide *identificar* arquitecturas comunes, no
> implementarlas. Tu proyecto sigue siendo, deliberadamente, un
> monolito multicapa durante todo este bloque; estas tres son
> referencia para que reconozcas el panorama, no para que las apliques
> ahora.

## Modelo con ReservaFIC: antes y después del refactor

**Antes.** El controlador de préstamos hace todo en un solo método:
valida los datos de entrada, decide si existe un conflicto de horario, y
persiste el resultado — tres responsabilidades mezcladas.

**Después.** Tres responsabilidades, tres componentes:

```text
Form Request  → valida la forma de los datos
Service       → decide la regla de negocio (no doble reserva)
Controlador   → coordina, no decide
```

El controlador final solo recibe la petición ya validada, llama al
servicio correspondiente, y decide qué respuesta devolver según el
resultado. Nada más. Un refactor de este tipo no cambia el
comportamiento observable de la aplicación — solo cambia cómo está
organizado el código por dentro.

## Documentar la arquitectura del proyecto

Documentar la arquitectura de tu propio proyecto significa dejar por
escrito, en un archivo `ARQUITECTURA.md`:

- el **tipo de arquitectura** (monolito multicapa, en tu caso);
- los **componentes principales** (controladores, Form Requests,
  Services, Models) y qué hace cada uno;
- el **flujo de información**, desde la petición HTTP hasta la
  respuesta;
- las **dependencias entre componentes** (quién depende de quién);
- la **decisión de diseño**: por qué separaste las responsabilidades
  específicamente así para tu proyecto.

## Error común

Documentar una arquitectura "en general" o copiada de un ejemplo, en
lugar de describir con precisión los componentes reales de tu propio
proyecto — la rúbrica de este bloque distingue explícitamente entre una
arquitectura documentada de forma genérica y una que describe
correctamente el proyecto real del equipo.

## Para reflexionar

- Si mañana cambia una regla de negocio de tu proyecto, ¿en cuántos
  archivos tendrías que tocar código con tu organización actual?
- ¿En qué parte de tu proyecto todavía existe más acoplamiento del que
  te gustaría?

## Actividad y evidencia

Practica primero con el ejemplo ilustrativo en la
[Actividad 4 — Clasificar la arquitectura de ReservaFIC](/materias/taller-integrador/bloque-02/actividades/actividad-4/),
y después aplica lo mismo a tu propio proyecto en el
[Laboratorio 2 — Arquitectura inicial](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/).

## Referencias de este tema

- Martin, R. C. *Clean Architecture* — fuente principal de este tema:
  separación de responsabilidades, cohesión y acoplamiento. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/).

## Qué sigue

Con tu arquitectura ya separada en componentes, el siguiente paso es
reconocer soluciones ya probadas para problemas de diseño que se
repiten: continúa con
[5. Patrones de diseño](/materias/taller-integrador/bloque-02/05-patrones-de-diseno/).
