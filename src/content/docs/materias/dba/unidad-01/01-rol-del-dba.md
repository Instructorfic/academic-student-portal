---
title: "1. El rol del DBA en la organización"
description: "Unidad 1 de DBA — qué es un DBA, sus responsabilidades desde el día uno y su relación con otros roles."
---

<span class="badge-estado">Borrador — QA requiere nueva verificación</span>

Un **administrador de bases de datos** (*Database Administrator*, **DBA**)
es la persona (o el equipo) responsable de instalar, configurar,
proteger, monitorear, optimizar y mantener operativa una base de datos a
lo largo de su ciclo de vida.

Esta definición usa "una base de datos" en singular por simplicidad, pero
en la práctica un DBA rara vez administra una única base de datos
aislada: según el tamaño y la estructura de la organización, puede ser
responsable de varias bases de datos, de varias instancias de un mismo
SGBD, o del entorno completo de bases de datos de la organización. Lo que
no cambia con el número de sistemas es el conjunto de responsabilidades
—instalar, configurar, proteger, monitorear, optimizar, mantener
operativa— que define al rol.

Según la *Database Administrator's Guide* de Oracle Database, un DBA
puede ser responsable, entre otras tareas, de:

* instalar y actualizar el servidor de base de datos y sus herramientas;
* asignar almacenamiento del sistema y planear requerimientos futuros;
* crear las estructuras primarias de almacenamiento (tablespaces) una vez
  que los desarrolladores de aplicaciones diseñaron una aplicación;
* modificar la estructura de la base de datos según lo indiquen los
  desarrolladores de aplicaciones;
* dar de alta usuarios y mantener la seguridad del sistema;
* controlar y monitorear el acceso de los usuarios a la base de datos;
* monitorear y optimizar el desempeño de la base de datos;
* planear el respaldo y la recuperación de la información;
* respaldar y restaurar la base de datos

(REF-U1-01: Oracle Corporation, *Database Administrator's Guide*, 21c,
secc. 1.2.1 "Database Administrators").

Esta lista describe tareas de un motor específico (Oracle), pero el
patrón general —instalación, almacenamiento, seguridad, monitoreo,
desempeño, respaldo/recuperación— es representativo del rol del DBA en la
mayoría de los SGBD relacionales y, con matices, también en entornos
NoSQL.

El **DAMA International**, en su obra de referencia *DAMA-DMBOK: Data
Management Body of Knowledge*, ubica a la administración de bases de
datos como una de las prácticas de gestión de datos más establecidas y
maduras dentro de una organización (REF-U1-02). A partir de esa base y de
la lista de tareas anterior, **este manual sintetiza** la idea central
del rol —no es una cita textual de ninguna de las dos fuentes—: el DBA no
es "quien sabe SQL", es quien asume la responsabilidad integral de que
los datos de la organización permanezcan seguros, disponibles y con buen
desempeño.

**Para evitar confusiones entre términos cercanos:** el DBA es un rol
profesional, una persona o un equipo. El SGBD es el software que ese rol
administra (ver [Arquitectura relacional](/materias/dba/unidad-01/04-arquitectura-relacional/)).
Una instancia es la ejecución en memoria de ese software. Y un ambiente
(ver [Ambientes de trabajo](/materias/dba/unidad-01/03-ambientes-de-trabajo/))
es el conjunto de infraestructura, configuración y datos donde ese
software corre. Un mismo DBA puede administrar varias instancias, en
varios ambientes, de uno o más SGBD.

## Dos responsabilidades que definen al rol desde el día uno: seguridad y continuidad

El programa de esta materia organiza toda la función del DBA alrededor de
cinco ejes: seguridad, desempeño, continuidad, escalabilidad y operación
profesional. Dos de ellos —**seguridad** y **continuidad**— son, junto
con el desempeño y la disponibilidad (que verás en
[Responsabilidades operativas](/materias/dba/unidad-01/02-responsabilidades-operativas/)),
parte de la identidad misma del rol, no un tema aparte que se agrega
después:

* **Seguridad de los datos** — que solo quien debe ver o modificar un
  dato pueda hacerlo. En la lista de tareas anterior, esto ya aparece
  como "dar de alta usuarios y mantener la seguridad del sistema" y
  "controlar y monitorear el acceso de los usuarios" (REF-U1-01). Por
  ahora basta con reconocer que **es responsabilidad del DBA desde el
  primer día**, no una capa que se agrega después de que la base de
  datos ya funciona. El **cómo** —usuarios, roles, permisos, cifrado— es
  el contenido completo de la **Unidad II**.
* **Continuidad** — que la base de datos pueda seguir operando, o
  recuperarse, incluso ante una falla. La misma lista de tareas ya lo
  anticipa: "planear el respaldo y la recuperación de la información;
  respaldar y restaurar la base de datos" (REF-U1-01). En esta unidad
  basta con reconocer que un DBA nunca asume que "nada va a fallar": el
  **cómo** —tipos de respaldo, restauración, recuperación ante
  desastres— es el contenido completo de la **Unidad V**.

Vas a ver estos dos conceptos regresar constantemente en el resto del
curso, exactamente igual que "desempeño" y "disponibilidad": por ahora,
quédate con que un DBA nunca separa "hacer que la base de datos funcione"
de "hacerlo de forma segura y recuperable" — son la misma
responsabilidad, no dos tareas independientes.

## El DBA no trabaja aislado

El DBA se relaciona constantemente con otros roles:

* **Desarrollo** — los desarrolladores diseñan las estructuras de datos
  que la aplicación necesita. El DBA las implementa, las asegura y
  vigila su desempeño en producción.
* **Seguridad** — el DBA aplica controles de acceso, cifrado y auditoría
  sobre los datos (tema central de las Unidades II y III).
* **Infraestructura** — el DBA depende de servidores, redes y
  almacenamiento administrados por otros equipos, con quienes coordina
  capacidad y disponibilidad.
* **Dirección organizacional** — las decisiones de continuidad,
  cumplimiento normativo y riesgo (temas de las Unidades III, V y VI)
  suelen requerir aprobación o visibilidad de la dirección.

> **Actividad 2 — Mapa de relación del DBA con otros roles.**
> Instrucciones completas en la
> [Actividad 2](/materias/dba/unidad-01/actividades/actividad-2/).
