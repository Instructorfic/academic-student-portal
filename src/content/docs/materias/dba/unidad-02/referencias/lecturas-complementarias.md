---
title: "Lecturas complementarias — Unidad 2"
description: "Recursos oficiales para profundizar por cuenta propia en los temas de la Unidad 2 de DBA, organizados por tema. No son evaluados."
---

> **Qué es esta página.** Una selección organizada de los recursos ya
> verificados en las [Referencias de la Unidad 2](/materias/dba/unidad-02/referencias/),
> presentados como apoyo para el estudio independiente.
>
> **Qué no es.** No es una lista de tareas ni de lectura obligatoria:
> los temas, las actividades y los laboratorios ya cubren lo necesario.
> Estos recursos son para quien quiera profundizar por su cuenta.

## Cómo está organizada

Cada bloque corresponde a un tema de la unidad e indica, para cada
recurso, su tipo, para qué sirve, su enlace y su identificador en las
referencias. El orden sigue la progresión de la unidad.

## 1. Principios de seguridad e inyección

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| OWASP Foundation, *SQL Injection Prevention Cheat Sheet* | Documentación oficial (organismo de seguridad) | Explica, con ejemplos, por qué la consulta parametrizada es la mitigación recomendada frente a la inyección SQL. Profundiza lo trabajado en el [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/) | <https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html> | REF-U2-07 |
| OWASP Foundation, *NoSQL Security Cheat Sheet* | Documentación oficial (organismo de seguridad) | Extiende el mismo razonamiento de la inyección SQL al mundo NoSQL (MongoDB), con mecanismos de explotación diferentes | <https://cheatsheetseries.owasp.org/cheatsheets/NoSQL_Security_Cheat_Sheet.html> | REF-U2-08 |

## 2. Control de acceso

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, secc. 5.8, "Privileges" | Documentación oficial | Referencia completa de `GRANT`/`REVOKE` y del sistema de privilegios, más allá de lo usado en el [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/) | <https://www.postgresql.org/docs/current/ddl-priv.html> | REF-U2-01 |
| MongoDB, Inc., *MongoDB Manual* — "Role-Based Access Control in Self-Managed Deployments" | Documentación oficial | Explica el modelo de roles integrados y personalizados de MongoDB, y confirma que el control de acceso **no** está activo por defecto | <https://www.mongodb.com/docs/manual/core/authorization/> | REF-U2-05 |
| The Register, "MongoDB ransom attacks soar, body count hits 27,000 in hours" (2017-01-09) | Reportaje técnico especializado | Caso real: miles de instancias de MongoDB comprometidas por quedar con la configuración por defecto, sin autenticación. Es la razón por la que el Laboratorio 2 habilita `--auth` desde el inicio | <https://www.theregister.com/2017/01/09/mongodb/> | REF-U2-13 |

## 3. Protección de datos sensibles

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| Cámara de Diputados (México), *Ley Federal de Protección de Datos Personales en Posesión de los Particulares* (LFPDPPP) | Documento normativo oficial | Define qué cuenta como dato personal y dato sensible en el marco mexicano. Es la base de la clasificación trabajada en el [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/) | <http://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm> (texto completo: <https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf>) | REF-U2-09 |
| Cámara de Diputados (México), *Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados* (LGPDPPSO) | Documento normativo oficial | Misma función que la anterior, para el sector público (sujetos obligados) | <http://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm> (texto completo: <https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPDPPSO.pdf>) | REF-U2-10 |
| National Institute of Standards and Technology (NIST), *De-Identifying Government Datasets: Techniques and Governance* (NIST SP 800-188) | Guía técnica oficial | Cataloga técnicas de des-identificación y ayuda a distinguir enmascaramiento, seudonimización y anonimización | <https://csrc.nist.gov/pubs/sp/800/188/final> | REF-U2-14 |

> Si vas a citar un artículo específico de cualquiera de las dos leyes
> en un entregable, verifica antes el texto exacto en el PDF oficial.

## 4. Cifrado y protección técnica

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, secc. 18.9, "Secure TCP/IP Connections with SSL" | Documentación oficial | Referencia completa de configuración TLS, más allá de los pasos usados en el Laboratorio 3 | <https://www.postgresql.org/docs/current/ssl-tcp.html> | REF-U2-03 |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, apéndice F.26, "pgcrypto" | Documentación oficial | Referencia completa de las funciones de cifrado de `pgcrypto`, más allá de `pgp_sym_encrypt`/`pgp_sym_decrypt` usadas en el laboratorio | <https://www.postgresql.org/docs/current/pgcrypto.html> | REF-U2-04 |
| MongoDB, Inc., *MongoDB Manual* — "Configure MongoDB Instances for TLS/SSL Encryption" | Documentación oficial | Equivalente en MongoDB al cifrado en tránsito trabajado en PostgreSQL, si quieres profundizar en el otro motor | <https://www.mongodb.com/docs/manual/tutorial/configure-ssl/> | REF-U2-06 |

## 5. Privacidad y cumplimiento normativo

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| Cámara de Diputados (México), LFPDPPP | Documento normativo oficial | Fuente central de la [Actividad 6](/materias/dba/unidad-02/actividades/actividad-6/) (tabla control → obligación legal): principios de minimización de datos, seguridad de los datos personales y derechos ARCO | <http://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm> | REF-U2-09 |
| Cámara de Diputados (México), LGPDPPSO | Documento normativo oficial | Misma función que la anterior, para sujetos obligados | <http://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm> | REF-U2-10 |

> **Nota de vigencia.** Ambas leyes se publicaron de nuevo el
> 2025-03-20, con una reforma el 2025-11-14, tras la desaparición del
> INAI y la reasignación de su función regulatoria. Es más reciente de
> lo que suele suponerse sobre esta legislación. Verifica su vigencia
> antes de cada uso.

## 6. Protección de servidores de bases de datos (hardening)

| Recurso | Tipo | Para qué te sirve | Enlace | Ref. |
| --- | --- | --- | --- | --- |
| The PostgreSQL Global Development Group, *PostgreSQL Documentation*, cap. 20, "Client Authentication" (`pg_hba.conf`) | Documentación oficial | Referencia completa de `pg_hba.conf`, más allá de las reglas usadas en el [Laboratorio 4](/materias/dba/unidad-02/laboratorios/laboratorio-4-hardening/) | <https://www.postgresql.org/docs/current/auth-pg-hba-conf.html> | REF-U2-02 |
| Center for Internet Security (CIS), *CIS PostgreSQL Benchmark* | Guía de configuración segura (organismo de seguridad) | Checklist de referencia extendido para una línea base de hardening. El checklist del Laboratorio 4 es un subconjunto didáctico de este benchmark | <https://www.cisecurity.org/benchmark/postgresql> | REF-U2-11 |
| U.S. Government Accountability Office (GAO), *Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach* (GAO-18-559) | Informe oficial de un organismo gubernamental | Caso real de fallas de gestión de parches y segmentación de red con consecuencias masivas. Motiva el subtema de gestión de parches | <https://www.gao.gov/products/gao-18-559> | REF-U2-12 |
| The Register, ataques a instancias MongoDB sin autenticación (2017) | Reportaje técnico especializado | El mismo caso del tema 2, aquí como motivación directa del Laboratorio 4: la configuración por defecto fue la causa raíz | <https://www.theregister.com/2017/01/09/mongodb/> | REF-U2-13 |

> El documento completo del CIS PostgreSQL Benchmark se descarga desde
> el sitio de CIS. Si vas a convertir alguna de sus recomendaciones en
> un requisito de un entregable, verifica el contenido exacto en ese
> documento antes de citarlo.

## Los dos casos reales de esta unidad

Dos casos reales fundamentan varias actividades y laboratorios de la
unidad: el ataque de ransomware contra instancias MongoDB expuestas sin
autenticación (2017, REF-U2-13) y el informe de la GAO sobre la brecha
de Equifax (2017, REF-U2-12). Ambos se describen en
[6. Hardening de servidores de bases de datos](/materias/dba/unidad-02/06-hardening-servidor-bases-datos/)
y se retoman en los Laboratorios 2 y 4.

## Si quieres seguir profundizando

Estos recursos cubren lo verificado para esta unidad. Si encuentras
otro artículo, video o curso que te parezca valioso, coméntalo con tu
docente antes de citarlo en un entregable: no todo lo que aparece en
una búsqueda cumple los mismos criterios de autoridad y verificación.

Para consultar comandos y conceptos de la materia, usa también la
[Referencia DBA PostgreSQL](/materias/dba/referencias/postgresql-dba/),
la [Referencia DBA MongoDB](/materias/dba/referencias/mongodb-dba/) y el
[Glosario](/materias/dba/referencias/glosario/).
