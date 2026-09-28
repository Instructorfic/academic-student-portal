---
title: "6. Cierre y resumen"
description: "Unidad II de Pruebas de Software — cierre de unidad, resumen y vínculo con la Unidad III."
---

## Volviendo a la situación inicial

Retoma la [situación de la introducción](/materias/pruebas-software/unidad-02/):
un equipo entrega un formulario de registro y recibe un reporte de que
"no valida bien los correos", que el equipo rechaza porque "así lo
pidieron".

Con lo que aprendiste en esta unidad, puedes explicar esa situación con
mayor precisión:

- El problema no fue un desacuerdo de opiniones: fue un **requisito no
  verificable** — nadie escribió qué significaba "validar bien" de
  forma comprobable.
- Un **criterio de aceptación** bien escrito, acordado antes de
  construir el formulario, hubiera evitado la discusión.
- Una **matriz de trazabilidad** habría mostrado, desde el principio, si
  "validar el correo" tenía siquiera un caso de prueba asociado.

## Resumen

- Antes de un requisito existe una **necesidad**. El requisito
  expresa qué debe cumplirse, y la prueba proporciona evidencia de que
  se cumple. Un requisito se evalúa por **verificación** (¿está bien
  escrito?) y por **validación** (¿es lo que realmente se necesita?).
- Los **requisitos** (funcionales, no funcionales, reglas de negocio)
  deben redactarse de forma **verificable**: se debe poder decidir con
  certeza si se cumplen o no. Un requisito bien escrito individualmente
  puede seguir formando parte de un **conjunto** inconsistente,
  incompleto o duplicado.
- Los **requisitos de seguridad** no son "un tipo más" de requisito no
  funcional: pueden ser función, propiedad, restricción o auditoría, y
  con frecuencia se derivan de un riesgo, no de una solicitud explícita.
- **Casos de uso** e **historias de usuario** son dos formas de describir
  una interacción. Ninguna sustituye a la otra.
- Los **criterios de aceptación** convierten un requisito en condiciones
  comprobables (dado–cuando–entonces).
- Los **escenarios** (positivos, negativos, alternos/límite) traducen
  esos criterios en pruebas concretas.
- La **trazabilidad** conecta requisito → prueba, y deja prevista prueba
  → defecto. La **matriz de trazabilidad** documenta esa relación y
  revela huecos de cobertura.

## Qué produjiste en esta unidad

Al completar los tres laboratorios, tienes:

1. Cinco requisitos funcionales, tres no funcionales (al menos uno de
   seguridad) y cuatro reglas de negocio del proyecto base asignado a
   tu equipo (Laboratorio 1).
2. Dos historias de usuario o dos casos de uso, cuatro criterios de
   aceptación y seis escenarios: dos positivos, dos negativos y dos
   alternos o de límite (Laboratorio 2).
3. La **matriz de trazabilidad inicial** — evidencia oficial de la
   unidad (Laboratorio 3).

Recorriste ese mismo pipeline completo tres veces con el docente antes
de aplicarlo a tu proyecto base: con el formulario de registro (temas
1–4), con la recuperación de contraseña, y resolviendo la contradicción
de cancelación planteada en el tema 1 (tema 5).

## Lo que sigue

Con estos fundamentos, en la Unidad III vas a aplicar técnicas formales
de diseño de casos de prueba sobre los escenarios que ya construiste
aquí: ¿cómo se prueba técnicamente lo que ya sabes que debe probarse? La
misma matriz de trazabilidad que construiste hoy reaparece también en la
**Unidad V**, aplicada a pruebas de APIs y servicios.

## Referencias

Ver [Referencias de la Unidad II](/materias/pruebas-software/unidad-02/referencias/)
para el listado completo con su justificación de relevancia.
