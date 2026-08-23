---
title: "Lecturas complementarias — Unidad 1"
description: "Recursos oficiales adicionales para profundizar por objetivo específico. No evaluado."
---

> Una selección organizada de los recursos ya verificados en
> [Referencias](/materias/dba/unidad-01/referencias/), presentados de
> forma más accesible para que la uses como apoyo de estudio
> independiente — no es lectura obligatoria: el manual y las actividades
> ya cubren lo mínimo necesario.

## OE-U1.1 — El rol del DBA

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Oracle Corporation, *Database Administrator's Guide* | Documentación oficial | Lista de referencia de las tareas típicas de un DBA en un motor real | <https://docs.oracle.com/en/database/oracle/oracle-database/21/admin/getting-started-with-database-administration.html> |
| DAMA International, *DAMA-DMBOK* (2.ª ed.) | Libro de referencia profesional | Marco profesional más amplio de gestión de datos, más allá del rol técnico del DBA | <https://dama.org/cpages/body-of-knowledge> (el libro no es de acceso abierto) |
| GitLab Inc., postmortem del caso GitLab (2017) | Informe técnico oficial | Ejemplo real de qué pasa cuando las responsabilidades del DBA no están claramente cubiertas — ver también [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/) | <https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/> |

## OE-U1.2 — Responsabilidades operativas cotidianas

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Oracle Corporation, *Database Administrator's Guide*, secc. 1.2.1 | Documentación oficial | Detalle de las responsabilidades operativas (configuración, usuarios, monitoreo, diagnóstico, desempeño, respaldo) | <https://docs.oracle.com/en/database/oracle/oracle-database/21/admin/getting-started-with-database-administration.html> |

## OE-U1.3 — Ambientes de desarrollo, pruebas y producción

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Wiggins, A., *The Twelve-Factor App*, Factor X | Metodología / artículo técnico | Explica por qué mantener los ambientes lo más parecidos posible reduce riesgo | <https://12factor.net/dev-prod-parity> |
| Microsoft Corporation, *Azure Deployment Environments* | Documentación oficial | Define formalmente qué es un "ambiente" y qué tipos existen en la industria | <https://learn.microsoft.com/en-us/azure/deployment-environments/concept-environments-key-concepts> |
| U.S. SEC, orden administrativa sobre Knight Capital (2013) | Documento regulatorio oficial | Caso real de pérdida financiera masiva por falta de paridad entre servidores — ver también [Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/) | <https://www.sec.gov/news/press-release/2013-222> |
| Dolfing, H., "Case Study 4: The $440 Million Software Error at Knight Capital" (2019) | Análisis técnico (fuente secundaria) | Narrativa extendida y análisis del caso Knight Capital | <https://www.henricodolfing.ch/en/case-study-4-the-440-million-software-error-at-knight-capital/> |
| GitLab Inc., postmortem del caso GitLab (2017) | Informe técnico oficial | Caso real de ejecución de un comando contra el servidor equivocado | <https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/> |
| Kleinpeter, T.; Turner, J., *The Downtime Project* (2021) | Podcast técnico (~50 min) | Reconstrucción conversacional del incidente de GitLab | <https://downtimeproject.com/podcast/gitlabs-2017-postgres-outage/> |

## OE-U1.4 — Arquitectura de un SGBD relacional

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| Oracle Corporation, *Database Concepts*, cap. 15 | Documentación oficial | Definición oficial de la SGA (*System Global Area*) | <https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html> |
| Oracle Corporation, *Database Administrator's Guide*, cap. 13 | Documentación oficial | Definición oficial de *tablespace* y *datafile* | <https://docs.oracle.com/en/database/oracle/oracle-database/18/admin/managing-tablespaces.html> |
| PostgreSQL Global Development Group, secc. 66.1 | Documentación oficial | Arquitectura de almacenamiento en un motor distinto a Oracle | <https://www.postgresql.org/docs/current/storage-file-layout.html> |
| Amazon Web Services, "What is a DBMS?" | Recurso divulgativo oficial | Definición formal de SGBD, útil como repaso rápido | <https://aws.amazon.com/what-is/dbms/> |

## OE-U1.5 — Arquitectura y modelos de datos en SGBD NoSQL

| Recurso | Tipo | Para qué te sirve | Enlace |
| --- | --- | --- | --- |
| MongoDB, Inc., *MongoDB Manual* — "Documents" | Documentación oficial | Definición formal del modelo documental | <https://www.mongodb.com/docs/manual/core/document/> |
| MongoDB, Inc., curso *MongoDB Document Model* | Curso oficial en línea (con video) | Explicación oficial extendida, gratuita | <https://learn.mongodb.com/learn/course/mongodb-document-model> |
| Redis Ltd., *Redis Documentation* | Documentación oficial | Definición formal del modelo clave-valor | <https://redis.io/docs/latest/develop/data-types/> |
| The Apache Software Foundation, *Apache Cassandra Documentation* | Documentación oficial | Definición formal del modelo columnar (*wide-column*) | <https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html> |
| Neo4j, Inc., *Neo4j Documentation* | Documentación oficial | Definición formal del modelo de grafos | <https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/> |
| IBM, "SQL vs. NoSQL Databases" | Recurso divulgativo oficial | Comparación general SQL/NoSQL | <https://www.ibm.com/think/topics/sql-vs-nosql> |

## Los dos casos reales, completos

Ambos casos (Knight Capital y GitLab) están disponibles como narrativa
completa y autocontenida en
[Casos reales completos](/materias/dba/unidad-01/referencias/casos-reales/).

## Si quieres seguir profundizando por tu cuenta

Estos recursos cubren lo verificado para esta unidad. Si encuentras algún
otro artículo, video o curso que te parezca valioso, coméntalo con tu
docente antes de citarlo en un entregable — no todo lo que aparece en una
búsqueda cumple los mismos criterios de autoridad y verificación que se
siguieron aquí.
