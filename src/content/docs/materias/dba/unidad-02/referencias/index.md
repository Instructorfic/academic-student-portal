---
title: "Referencias — Unidad 2"
description: "Bibliografía verificada de la Unidad 2 de DBA: documentación oficial de PostgreSQL y MongoDB, guías OWASP y CIS, leyes mexicanas de datos personales y casos reales."
---

Todas las fuentes de esta página se consultaron y verificaron en sus
sitios oficiales. Si una fuente indica una precaución (por ejemplo,
verificar el texto exacto de un artículo antes de citarlo), tómala en
cuenta antes de usarla en un entregable.

## Referencias verificadas

| ID | Fuente completa | Tipo | Observaciones |
| --- | --- | --- | --- |
| REF-U2-01 | The PostgreSQL Global Development Group. *PostgreSQL 18 Documentation*, secc. 5.8 "Privileges" y comandos `GRANT`/`REVOKE`. <https://www.postgresql.org/docs/current/ddl-priv.html> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-02 | The PostgreSQL Global Development Group. *PostgreSQL 18 Documentation*, cap. 20 "Client Authentication", secc. 20.1 "The pg_hba.conf File". <https://www.postgresql.org/docs/current/auth-pg-hba-conf.html> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-03 | The PostgreSQL Global Development Group. *PostgreSQL 18 Documentation*, secc. 18.9 "Secure TCP/IP Connections with SSL". <https://www.postgresql.org/docs/current/ssl-tcp.html> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-04 | The PostgreSQL Global Development Group. *PostgreSQL 18 Documentation*, apéndice F.26 "pgcrypto — cryptographic functions". <https://www.postgresql.org/docs/current/pgcrypto.html> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-05 | MongoDB, Inc. *MongoDB Manual* — "Role-Based Access Control in Self-Managed Deployments". <https://www.mongodb.com/docs/manual/core/authorization/> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-06 | MongoDB, Inc. *MongoDB Manual* — "Configure MongoDB Instances for TLS/SSL Encryption". <https://www.mongodb.com/docs/manual/tutorial/configure-ssl/> — consultado 2026-08-18 | Documentación oficial | — |
| REF-U2-07 | OWASP Foundation. *OWASP Cheat Sheet Series* — "SQL Injection Prevention Cheat Sheet". <https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html> — consultado 2026-08-18 | Documentación oficial (organismo de seguridad) | — |
| REF-U2-08 | OWASP Foundation. *OWASP Cheat Sheet Series* — "NoSQL Security Cheat Sheet". <https://cheatsheetseries.owasp.org/cheatsheets/NoSQL_Security_Cheat_Sheet.html> — consultado 2026-08-18 | Documentación oficial (organismo de seguridad) | — |
| REF-U2-09 | Cámara de Diputados (México). *Ley Federal de Protección de Datos Personales en Posesión de los Particulares* (LFPDPPP). Publicación DOF: 2025-03-20, última reforma DOF: 2025-11-14. <http://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm> (texto: <https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf>) — consultado 2026-08-18 | Documento normativo oficial | Antes de citar textualmente un artículo, verifica su redacción en el PDF oficial. |
| REF-U2-10 | Cámara de Diputados (México). *Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados* (LGPDPPSO). Publicación DOF: 2025-03-20, última reforma DOF: 2025-11-14. <http://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm> (texto: <https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPDPPSO.pdf>) — consultado 2026-08-18 | Documento normativo oficial | Igual que REF-U2-09. |
| REF-U2-11 | Center for Internet Security (CIS). *CIS PostgreSQL Benchmark* (versiones 9.5 a 18). <https://www.cisecurity.org/benchmark/postgresql> — consultado 2026-08-18 | Guía de configuración segura (organismo de seguridad) | El documento completo se descarga desde el sitio de CIS. Verifica cualquier recomendación específica contra ese documento antes de citarla. |
| REF-U2-12 | U.S. Government Accountability Office (GAO). *Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach* (GAO-18-559), publicado 2018-09-07. <https://www.gao.gov/products/gao-18-559> — consultado 2026-08-18 | Informe oficial de un organismo gubernamental | — |
| REF-U2-13 | The Register. "MongoDB ransom attacks soar, body count hits 27,000 in hours", 2017-01-09. <https://www.theregister.com/2017/01/09/mongodb/> — consultado 2026-08-18 | Reportaje técnico especializado | Los hechos centrales (configuración por defecto sin autenticación, cerca de 27,000 instancias comprometidas) coinciden con lo publicado por otros medios independientes. |
| REF-U2-14 | National Institute of Standards and Technology (NIST). *De-Identifying Government Datasets: Techniques and Governance* (NIST SP 800-188), publicado 2023-09. <https://csrc.nist.gov/pubs/sp/800/188/final> — consultado 2026-09-13 | Guía técnica oficial (organismo de estandarización) | Cataloga técnicas de des-identificación: remoción de identificadores directos, generalización de cuasi-identificadores, datos sintéticos y privacidad diferencial. Profundiza el tema de protección de datos sensibles, no sustituye a la LFPDPPP ni a la LGPDPPSO. |

## Para qué sirve cada fuente

| ID | Fuente (abreviada) | Propósito en la unidad | Tema |
| --- | --- | --- | --- |
| REF-U2-01 | PostgreSQL Docs — Privileges/GRANT/REVOKE | Sintaxis y semántica oficial de privilegios y roles | [2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) |
| REF-U2-02 | PostgreSQL Docs — pg_hba.conf | Configuración de autenticación de clientes, base del checklist de hardening | [6. Hardening](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) |
| REF-U2-03 | PostgreSQL Docs — SSL/TLS | Configuración de cifrado en tránsito | [4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/) |
| REF-U2-04 | PostgreSQL Docs — pgcrypto | Cifrado en reposo a nivel de columna | [4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/) |
| REF-U2-05 | MongoDB Docs — RBAC | Control de acceso basado en roles en MongoDB. Explica que el control de acceso no está activo por defecto | [2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) |
| REF-U2-06 | MongoDB Docs — TLS/SSL | Configuración de cifrado en tránsito en MongoDB | [4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/) |
| REF-U2-07 | OWASP — SQL Injection Prevention | Mitigación de inyección SQL mediante consultas parametrizadas | [1. Principios de seguridad e inyección](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/) |
| REF-U2-08 | OWASP — NoSQL Security | Mitigación de inyección NoSQL | [1. Principios de seguridad e inyección](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/) |
| REF-U2-09 | LFPDPPP | Marco normativo mexicano de privacidad (sector privado) | [5. Privacidad y cumplimiento](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/) |
| REF-U2-10 | LGPDPPSO | Marco normativo mexicano de privacidad (sujetos obligados) | [5. Privacidad y cumplimiento](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/) |
| REF-U2-11 | CIS PostgreSQL Benchmark | Checklist de referencia para la línea base de hardening | [6. Hardening](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) |
| REF-U2-12 | GAO — Reporte Equifax | Caso real de fallas de gestión de vulnerabilidades y segmentación con consecuencias masivas | [6. Hardening](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) |
| REF-U2-13 | The Register — Ataques de ransomware a MongoDB (2017) | Caso real de riesgo por configuración por defecto sin autenticación | [2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) y [6. Hardening](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) |
| REF-U2-14 | NIST SP 800-188 | Técnicas de des-identificación que fundamentan la comparación entre enmascaramiento, seudonimización y anonimización | [3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/) |

## Referencias por tema

| Tema | Referencias |
| --- | --- |
| [1. Principios de seguridad e inyección](/materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion/) | REF-U2-07, REF-U2-08 |
| [2. Control de acceso](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/) | REF-U2-01, REF-U2-05, REF-U2-13 |
| [3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/) | REF-U2-09, REF-U2-10, REF-U2-14 |
| [4. Cifrado en tránsito y en reposo](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/) | REF-U2-03, REF-U2-04, REF-U2-06 |
| [5. Privacidad y cumplimiento normativo](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/) | REF-U2-09, REF-U2-10 |
| [6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/) | REF-U2-02, REF-U2-11, REF-U2-12, REF-U2-13 |

## Consideraciones para usar estas fuentes

- **Vigencia de la LFPDPPP y la LGPDPPSO.** Ambas leyes se publicaron
  de nuevo el 2025-03-20, con una reforma el 2025-11-14, tras la
  desaparición del INAI y la reasignación de su función regulatoria. Es
  un marco más reciente de lo que suele suponerse (la legislación
  original es de 2010). Verifica su vigencia antes de cada uso.
- **Versiones de los motores.** La documentación citada corresponde a
  la versión vigente de PostgreSQL (18) y del manual de MongoDB. Los
  laboratorios usan las imágenes `postgres:16` y `mongo:7`. La sintaxis
  de los comandos usados es la misma en esas versiones, pero revísala si
  cambias de versión.
- **Casos reales.** Los casos de Equifax (REF-U2-12) y de las instancias
  de MongoDB sin autenticación (REF-U2-13) se usan como motivación: por
  qué importan la segmentación de red, la gestión de parches y el
  control de acceso activo desde el inicio. Se describen en
  [6. Hardening](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/).

## Más recursos

- [Lecturas complementarias](/materias/dba/unidad-02/referencias/lecturas-complementarias/) — profundización opcional por tema, no evaluada.
- [Referencia DBA PostgreSQL](/materias/dba/referencias/postgresql-dba/), [Referencia DBA MongoDB](/materias/dba/referencias/mongodb-dba/) y [Glosario](/materias/dba/referencias/glosario/) de la materia.
