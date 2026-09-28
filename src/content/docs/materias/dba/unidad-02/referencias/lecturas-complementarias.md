---
title: "Lecturas complementarias — Unidad 2"
description: "Recursos oficiales adicionales para profundizar por objetivo específico. No evaluado."
---

> Una selección organizada de los recursos de
> [Referencias](/materias/dba/unidad-02/referencias/), presentados de
> forma más accesible para que la uses como apoyo de estudio
> independiente — no es lectura obligatoria: el manual y las actividades
> ya cubren lo mínimo necesario.

## OE-U2.1 — Principios de seguridad e inyección

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| OWASP Foundation, *SQL Injection Prevention Cheat Sheet* | Documentación oficial (organismo de seguridad) | Explica, con ejemplos, por qué la consulta parametrizada es la mitigación recomendada frente a la inyección SQL — profundiza lo trabajado en el [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/) | <https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html> |
| OWASP Foundation, *NoSQL Security Cheat Sheet* | Documentación oficial (organismo de seguridad) | Extiende el mismo razonamiento de la inyección SQL al mundo NoSQL (MongoDB), con mecanismos de explotación diferentes | <https://cheatsheetseries.owasp.org/cheatsheets/NoSQL_Security_Cheat_Sheet.html> |

## OE-U2.2 — Control de acceso

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, secc. 5.8, "Privileges" | Documentación oficial | Referencia completa de `GRANT`/`REVOKE` y del sistema de privilegios, más allá de lo usado en el [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/) | <https://www.postgresql.org/docs/current/ddl-priv.html> |
| MongoDB, Inc., *MongoDB Manual* — "Role-Based Access Control in Self-Managed Deployments" | Documentación oficial | Explica el modelo de roles integrados y personalizados de MongoDB, y confirma que el control de acceso **no** está activo por defecto | <https://www.mongodb.com/docs/manual/core/authorization/> |
| The Register, "MongoDB ransom attacks soar, body count hits 27,000 in hours" (2017-01-09) | Reportaje técnico especializado | Caso real: miles de instancias de MongoDB comprometidas precisamente por quedar con la configuración por defecto (sin autenticación) — motivo de por qué el Laboratorio 2 habilita `--auth` desde el inicio | <https://www.theregister.com/2017/01/09/mongodb/> |

## OE-U2.3 — Protección de datos sensibles

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Cámara de Diputados (México), *Ley Federal de Protección de Datos Personales en Posesión de los Particulares* (LFPDPPP) | Documento normativo oficial | Define qué cuenta como dato personal y dato sensible en el marco mexicano — base conceptual de la clasificación trabajada en el [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/) | <http://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm> |
| Cámara de Diputados (México), *Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados* (LGPDPPSO) | Documento normativo oficial | Misma función que la anterior, para el sector público (sujetos obligados) | <http://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm> |
| National Institute of Standards and Technology (NIST), *De-Identifying Government Datasets: Techniques and Governance* (NIST SP 800-188) | Guía técnica oficial | Cataloga técnicas de des-identificación (generalización, supresión, datos sintéticos) — fundamenta la comparación enmascaramiento/seudonimización/anonimización | <https://csrc.nist.gov/pubs/sp/800/188/final> |

> Si vas a citar un artículo específico de LFPDPPP o LGPDPPSO en un
> entregable, verifica el texto exacto con acceso directo a la ley antes
> de citarlo.

## OE-U2.4 — Cifrado y protección técnica

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, secc. 18.9, "Secure TCP/IP Connections with SSL" | Documentación oficial | Referencia completa de configuración TLS, más allá de los pasos usados en el Laboratorio 3 | <https://www.postgresql.org/docs/current/ssl-tcp.html> |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, apéndice F.26, "pgcrypto" | Documentación oficial | Referencia completa de las funciones de cifrado disponibles en `pgcrypto`, más allá de `pgp_sym_encrypt`/`pgp_sym_decrypt` usadas en el laboratorio | <https://www.postgresql.org/docs/current/pgcrypto.html> |
| MongoDB, Inc., *MongoDB Manual* — "Configure MongoDB Instances for TLS/SSL Encryption" | Documentación oficial | Equivalente en MongoDB al cifrado en tránsito trabajado en PostgreSQL, si quieres profundizar en el otro motor | <https://www.mongodb.com/docs/manual/tutorial/configure-ssl/> |

## OE-U2.5 — Privacidad y cumplimiento normativo

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Cámara de Diputados (México), LFPDPPP | Documento normativo oficial | Fuente central para la Actividad 6 (tabla control → obligación legal): principios de minimización de datos, seguridad de los datos personales y derechos ARCO | <http://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm> |
| Cámara de Diputados (México), LGPDPPSO | Documento normativo oficial | Misma función que la anterior, para sujetos obligados | <http://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm> |

> **Nota de vigencia.** Ambas leyes fueron republicadas el 2025-03-20 con
> una reforma el 2025-11-14 — es más reciente de lo que suele asumirse
> sobre esta legislación. Verifica su vigencia antes de cada uso.

## OE-U2.6 — Protección de servidores de bases de datos (hardening)

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, cap. 20, "Client Authentication" (`pg_hba.conf`) | Documentación oficial | Referencia completa de `pg_hba.conf`, más allá de las reglas usadas en el [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/) | <https://www.postgresql.org/docs/current/auth-pg-hba-conf.html> |
| Center for Internet Security (CIS), *CIS PostgreSQL Benchmark* | Guía de configuración segura (organismo de seguridad) | Checklist de referencia extendido para una línea base de hardening — el checklist del Laboratorio 4 es un subconjunto pedagógico de este benchmark | <https://www.cisecurity.org/benchmark/postgresql> |
| U.S. Government Accountability Office (GAO), *Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach* (GAO-18-559) | Informe oficial de un organismo gubernamental | Caso real de fallas de gestión de parches y segmentación de red con consecuencias masivas | <https://www.gao.gov/products/gao-18-559> |
| The Register, ataques a instancias MongoDB sin autenticación (2017) | Reportaje técnico especializado | Mismo caso citado en OE-U2.2, aquí relevante como motivación directa del Laboratorio 4: la configuración por defecto fue la causa raíz | <https://www.theregister.com/2017/01/09/mongodb/> |

## Si quieres seguir profundizando por tu cuenta

Estos recursos cubren lo verificado para esta unidad. Si encuentras algún
otro artículo, video o curso que te parezca valioso, coméntalo con tu
docente antes de citarlo en un entregable.
