---
title: "4. Trazabilidad y matriz de trazabilidad"
description: "Unidad II de Pruebas de Software — trazabilidad requisito-prueba y prueba-defecto, brechas de cobertura, y la matriz que las documenta."
---

## ¿Qué es trazabilidad?

**Trazabilidad** (*traceability*) es la relación documentada entre dos
artefactos. En esta unidad trabajas dos relaciones:

- **requisito → caso de prueba** (2.3.1): cada requisito debe poder
  relacionarse con al menos un caso de prueba que lo verifique.
- **caso de prueba → defecto** (2.3.2): cada caso de prueba, al
  ejecutarse, puede relacionarse con un defecto si falla.

Sin trazabilidad, no hay forma sistemática de responder: *"¿probamos
todo lo que teníamos que probar?"*

> En esta unidad la relación caso de prueba–defecto se deja
> **prevista**, no ejecutada: todavía no corres pruebas ni gestionas
> defectos. Severidad, prioridad, ciclo de vida del defecto y
> herramientas de gestión (Jira, TestLink, Zephyr) son contenido de la
> Unidad VII.

### Una brecha de cobertura

Un requisito sin ningún caso de prueba asociado es una **brecha de
cobertura** — no un detalle de formato:

| ID requisito | Descripción | ID caso de prueba |
| --- | --- | --- |
| RF-INSC-06 | Enviar confirmación de registro por correo | — (sin caso de prueba asociado) |

Esta fila no es un error de formato: es una alerta. Si nadie escribió un
caso de prueba para `RF-INSC-06`, no hay evidencia de que esa
funcionalidad se haya verificado — sin importar si "parece que
funciona".

## Matriz de trazabilidad (2.3.3)

La **matriz de trazabilidad** documenta estas relaciones de forma
tabular:

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-01 | Crear cuenta con datos válidos | ESC-01 | Pendiente de ejecutar |
| RN-01 | Rechazar correo ya registrado | ESC-02 | Pendiente de ejecutar |
| RNF-01 | Contraseña cifrada | ESC-03 | Pendiente de ejecutar |

La matriz sirve para dos cosas: detectar requisitos sin ninguna prueba
asociada, y —más adelante en el curso— rastrear qué pruebas hay que
revisar si un requisito cambia.

### Formato sugerido de matriz

No existe un formato único obligatorio. ISO/IEC/IEEE 29119 reconoce la
matriz de trazabilidad como un artefacto de documentación de pruebas,
sin fijar columnas exactas. El formato mínimo recomendado incluye: **ID
de requisito, descripción, ID(s) de caso(s) de prueba, y estado de
ejecución/defecto encontrado**.

### Un requisito, varios casos de prueba

Un requisito real casi nunca se cubre con un solo caso de prueba — la
matriz debe poder mostrar varias filas (o varias columnas) para el mismo
requisito, una por cada escenario relevante que ya construiste en el
tema anterior:

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-01 | Crear cuenta con datos válidos | ESC-01 (camino positivo) | Pendiente de ejecutar |
| RF-01 | Crear cuenta con datos válidos | ESC-03 (límite: contraseña del largo mínimo) | Pendiente de ejecutar |

## Una matriz con más filas

| ID requisito | Descripción | ID caso de prueba | ¿Encontró defecto? |
| --- | --- | --- | --- |
| RF-INSC-01 | Mostrar materias disponibles | ESC-07 | Pendiente de ejecutar |
| RF-INSC-02 | Mostrar grupos de una materia | ESC-08 | Pendiente de ejecutar |
| RF-INSC-03 | Validar prerrequisitos | ESC-09, ESC-10 | Pendiente de ejecutar |
| RF-INSC-04 | Verificar disponibilidad de lugares | ESC-11 | Pendiente de ejecutar |
| RF-INSC-05 | Registrar inscripción | ESC-12 | Pendiente de ejecutar |
| RF-INSC-06 | Enviar confirmación | — (sin caso de prueba asociado) | — |

Esta es la misma descomposición del requisito de inscripción que viste
en
[1. Requisitos funcionales, no funcionales y reglas de negocio](/materias/pruebas-software/unidad-02/01-requisitos-funcionales-no-funcionales-reglas-negocio/).
Una matriz real casi nunca tiene tres filas ordenadas: mezcla requisitos
con 0, 1 o varios casos de prueba — como aquí `RF-INSC-03` (dos
escenarios) y `RF-INSC-06` (ninguno, la misma brecha de cobertura que
viste arriba, ahora dentro de una matriz de tamaño más real).

### ¿Por qué importa la matriz?

- **Detecta huecos** — revela requisitos que nadie está probando.
- **Rastrea impacto** — si cambia un requisito, muestra qué pruebas hay
  que revisar.

## Error común

Completar la columna "¿Encontró defecto?" con un resultado inventado.
En esta unidad no se ejecutan pruebas: la columna debe decir "Pendiente
de ejecutar" en todas las filas. Confundir "diseñar trazabilidad" con
"ejecutar pruebas" es el error más frecuente al cerrar esta unidad.

> **Laboratorio 3 (evidencia oficial).** Construye la matriz de
> trazabilidad inicial del proyecto base asignado a tu equipo,
> relacionando los requisitos y reglas del Laboratorio 1 con las
> historias o casos de uso, los criterios y los escenarios del
> Laboratorio 2. La matriz del laboratorio usa el
> [formato oficial de once columnas](/materias/pruebas-software/unidad-02/formato-matriz-trazabilidad/).
> las tablas de este tema son versiones simplificadas. Guía completa en el
> [Laboratorio 3](/materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad/).

## Referencias de este tema

- Jorgensen, *Software Testing: A Craftsman's Approach* — nociones de
  trazabilidad entre especificación y pruebas.
- Black, van Veenendaal y Graham, *Foundations of Software Testing ISTQB
  Certification* — trazabilidad como bloque formal del temario ISTQB.
- ISO/IEC/IEEE 29119 (familia) — marco conceptual de documentación de
  pruebas.

Ver [Referencias de la unidad](/materias/pruebas-software/unidad-02/referencias/)
para la ficha completa de cada fuente.

## Qué sigue

Ya viste el pipeline completo con el ejemplo del formulario de registro.
Antes de aplicarlo a tu proyecto base, recorre más ejemplos completos
con funcionalidades distintas en
[5. Más ejemplos aplicados](/materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado/).
