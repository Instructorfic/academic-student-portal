---
title: "5. Privacidad y cumplimiento normativo"
description: "Unidad 2 de DBA — marco normativo mexicano e internacional de protección de datos personales, los ocho principios rectores, derechos ARCO y qué marco aplica según el tipo de dato."
---

Todo lo que trabajaste en
[2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/),
[3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/) y
[4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/)
no es solo una buena práctica técnica: en México, buena parte de esas
prácticas están **obligadas por ley** cuando se trata de datos
personales.

## Marco normativo mexicano

| Ley | A quién aplica |
| --- | --- |
| **LFPDPPP** — Ley Federal de Protección de Datos Personales en Posesión de los Particulares | Sector privado (empresas y organizaciones no gubernamentales) (REF-U2-09). |
| **LGPDPPSO** — Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados | Sujetos obligados del sector público (REF-U2-10). |

> Ambas leyes fueron republicadas el 20 de marzo de 2025, con una reforma
> el 14 de noviembre de 2025 — es un marco normativo relativamente
> reciente, no el de hace más de una década. Verifica siempre su vigencia
> antes de aplicarlo a un caso real.

> Referencia. LFPDPPP Art. 6, LGPDPPSO Art. 16.

## Los ocho principios rectores

Además de los derechos ARCO (que son del titular), la ley impone ocho
principios rectores que obligan a quien **trata** los datos — son dos
cosas distintas:

| Principio | En una frase |
| --- | --- |
| Licitud | Conforme a la ley. |
| Consentimiento | Libre, específico, informado. |
| Información | Aviso de privacidad. |
| Calidad | Exactos y actualizados. |
| Finalidad | Solo lo informado. |
| Lealtad | Sin medios engañosos. |
| Proporcionalidad | Solo lo necesario. |
| Responsabilidad | El responsable vela por su cumplimiento. |

El enmascaramiento del [tema 3](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/)
responde directamente al principio de **proporcionalidad**: solo se
expone lo estrictamente necesario. La **minimización de datos** —no
recolectar más de lo necesario— también se desprende de este mismo
principio.

## Derechos ARCO y normativa sectorial mexicana

Los titulares de los datos tienen los derechos **ARCO**:

* **A**cceso — conocer qué datos propios tiene una organización.
* **R**ectificación — corregir datos inexactos.
* **C**ancelación — solicitar que se eliminen sus datos.
* **O**posición — oponerse a un uso específico de sus datos.

Si `clientes` incluyera historia clínica, entraría además la
**NOM-024-SSA3-2012** (sistemas de expediente clínico electrónico),
aplicada **junto con** la LFPDPPP, no en lugar de ella.

## Marco normativo internacional

| Marco | Qué es |
| --- | --- |
| **GDPR** (Unión Europea) | El reglamento de protección de datos más citado globalmente. Aplica de forma **extraterritorial** — una organización mexicana que procese datos de residentes de la UE puede estar obligada a cumplirlo. |
| **ISO/IEC 27701 (PIMS)** | Extensión de ISO/IEC 27001 y 27002 para gestión de privacidad de la información. No es una ley: es un estándar certificable que demuestra madurez más allá del mínimo legal. |
| **ISO/IEC 29100** | Marco de privacidad de ISO. Es la base de principios que referencia ISO/IEC 20889 y ISO/IEC 27701 (ver [tema 3](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/)). |
| **HIPAA, SOX, CCPA** | HIPAA (salud) y SOX (financiero), ambas de EUA, y CCPA (California) — referencias sectoriales y regionales útiles para contrastar enfoques. |

> Referencia. ISO/IEC 27701:2019, ISO/IEC 29100.

El programa de esta materia menciona estos marcos internacionales como
**referencia comparativa**, no como marco normativo central: el marco
central de la unidad sigue siendo el mexicano (LFPDPPP/LGPDPPSO).

## Qué marco aplica según el tipo de dato

| Tipo de dato | Marco aplicable | Ejemplo de caso |
| --- | --- | --- |
| Nombre, correo, teléfono | LFPDPPP o LGPDPPSO según el sector | Un *ecommerce* mexicano con `clientes.correo` necesita aviso de privacidad y limitar el uso a la finalidad declarada. |
| RFC, CURP, dirección | LFPDPPP Art. 6, principio de proporcionalidad | Solo se solicita el RFC si la finalidad (por ejemplo, facturación) realmente lo requiere. |
| Historial clínico | LFPDPPP más NOM-024-SSA3-2012 | Un sistema de citas médicas que guarda diagnósticos cumple los dos marcos a la vez. |
| Datos de tarjeta de pago | PCI DSS | No es una ley, es un estándar de la industria de tarjetas — aplica a cualquiera que procese pagos con tarjeta. |
| Datos de residentes de la Unión Europea | GDPR | Aplica de forma extraterritorial. Una universidad mexicana con estudiantes de intercambio europeos puede estar sujeta a GDPR para esos registros. |
| Reportes financieros de una empresa que cotiza en EUA | SOX | Aplica a controles internos sobre la integridad de esos reportes. |

La pregunta que debe hacerse un DBA no es "qué ley existe", sino "qué
tipo de dato estoy guardando en esta tabla o colección, y qué marco le
corresponde por ese tipo de dato".

> Referencia. PCI Security Standards Council, PCI DSS v4.0, GDPR Art. 3,
> ámbito territorial.

## Implicaciones para el DBA

Un DBA no decide las políticas de privacidad de la organización, pero es
quien **implementa técnicamente** las obligaciones que de ellas se
derivan. Cuatro preguntas que debería hacerse quien trabaja con datos e
información:

* ¿Son responsables o encargados del tratamiento? La obligación legal
  cambia según el rol que juegan sobre el dato.
* ¿Qué ley aplica según el sector? LFPDPPP en el privado, LGPDPPSO en el
  público, más la NOM sectorial si el dato es de salud.
* ¿Procesan datos de personas fuera de México? GDPR puede aplicar de
  forma extraterritorial aunque la organización sea mexicana.
* ¿Quieren demostrar madurez más allá del mínimo legal? ISO/IEC 27701 es
  la vía de certificación para eso.

Si la ley exige minimización de datos, el DBA es quien decide qué
columnas realmente necesitan almacenarse. Si un titular ejerce su
derecho de cancelación, el DBA es quien ejecuta —de forma segura y
verificable— la eliminación de esos datos.

> **Actividad 6 — Trazabilidad control → obligación legal.** Conecta
> cada control técnico ya implementado sobre `clientes` con el principio
> rector o norma que respalda su necesidad, por ejemplo:
>
> | Control aplicado | Principio o norma |
> | --- | --- |
> | Enmascaramiento de correo y rfc | Proporcionalidad |
> | Roles lector, editor, administrador | Responsabilidad |
> | Cifrado de rfc | Licitud y calidad |
>
> Instrucciones completas en la
> [Actividad 6](/materias/dba/unidad-02/actividades/actividad-6/).

## Referencias de este tema

- LFPDPPP (REF-U2-09), LGPDPPSO (REF-U2-10).
- LFPDPPP Art. 6, LGPDPPSO Art. 16.

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente. Los marcos internacionales
(GDPR, ISO/IEC 27701, ISO/IEC 29100, HIPAA, SOX, CCPA, PCI DSS) se citan
aquí como referencia comparativa del programa. No todos tienen ficha
propia en el listado de referencias de la unidad.

## Qué sigue

Ya conectamos cada control técnico con la obligación legal que lo exige.
Falta la última capa: el servidor mismo, en sus tres capas (motor,
sistema operativo, red). Continúa con
[6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/).
