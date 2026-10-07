---
title: "LAB-03 — Privacidad, cumplimiento y gobierno de los datos"
description: "Unidad 2 de DBA — finalidad, minimización, derechos ARCO, retención y gobierno de datos en PostgreSQL."
---

**Unidad:** II. Seguridad, privacidad y control de acceso
**Tema:** 2.5 Privacidad, cumplimiento y gobierno de los datos
**Motor principal:** PostgreSQL 16
**Modalidad:** Individual
**Duración estimada:** 3 horas

---

## 1. Contexto

Durante LAB-01 se trabajó con la protección de datos mediante clasificación, enmascaramiento, seudonimización, anonimización y controles de acceso.

En LAB-02 se analizaron mecanismos criptográficos para proteger credenciales, información sensible y comunicaciones.

Sin embargo, existe una pregunta anterior a la implementación técnica:

> **¿La organización debería recopilar, almacenar y utilizar ese dato?**

Una base de datos puede estar técnicamente bien configurada y aun así existir un problema de privacidad o cumplimiento si:

* se recopilan datos que no son necesarios
* los datos se utilizan para una finalidad diferente a la informada
* se conservan durante más tiempo del necesario
* cualquier usuario puede consultar información personal
* no existe una justificación para determinado tratamiento
* no se pueden identificar los responsables de los datos
* no se puede responder adecuadamente a una solicitud de acceso, rectificación, cancelación u oposición
* se mezclan datos operativos con datos utilizados para análisis sin controles adecuados

En este laboratorio se analizará cómo los principios de privacidad y cumplimiento pueden traducirse en **decisiones concretas dentro de una base de datos**.

---

## 2. Objetivo

Analizar y aplicar principios básicos de privacidad, minimización, finalidad, retención, control de acceso y atención de derechos de los titulares mediante un escenario de administración de datos en PostgreSQL.

---

## 3. Resultados de aprendizaje

Al finalizar la práctica, el estudiante será capaz de:

1. Identificar datos personales dentro de una estructura de base de datos.
2. Relacionar datos almacenados con una finalidad determinada.
3. Aplicar el principio de minimización de datos.
4. Identificar riesgos derivados del uso de datos para finalidades diferentes.
5. Diseñar controles de acceso relacionados con responsabilidades funcionales.
6. Analizar la retención y eliminación de información.
7. Identificar implicaciones técnicas de los derechos ARCO.
8. Diferenciar una obligación legal de una medida técnica.
9. Documentar decisiones de privacidad y gobierno de datos.
10. Relacionar los principios de privacidad con el trabajo de un DBA.

---

## 4. Conceptos y definiciones

Antes de comenzar, revisa los siguientes conceptos.

No se espera que memorices las definiciones literalmente. Debes comprender **qué significa cada concepto y cómo puede afectar el diseño y administración de una base de datos**.

| Concepto                                        | Definición                                                                                                                                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Privacidad**                                  | Conjunto de principios, derechos y prácticas relacionados con el tratamiento adecuado de información personal.                                                 |
| **Dato personal**                               | Información relacionada con una persona física identificada o identificable.                                                                                   |
| **Dato personal sensible**                      | Información personal que, por su naturaleza o por los riesgos asociados a su tratamiento, requiere protección reforzada conforme al marco jurídico aplicable.  |
| **Titular**                                     | Persona física a quien corresponden los datos personales.                                                                                                      |
| **Responsable del tratamiento**                 | Persona física o moral, organización o entidad que decide sobre el tratamiento de datos personales, de acuerdo con el marco jurídico aplicable.                |
| **Encargado**                                   | Persona física o moral que trata datos personales por cuenta del responsable, siguiendo sus instrucciones.                                                     |
| **Tratamiento**                                 | Cualquier operación realizada sobre datos personales, como obtenerlos, almacenar, consultar, utilizar, modificar, transferir o eliminar información.           |
| **Finalidad**                                   | Propósito específico para el cual se recopilan y utilizan los datos.                                                                                           |
| **Limitación de finalidad**                     | Principio según el cual los datos deben utilizarse para finalidades determinadas y compatibles con las condiciones bajo las cuales fueron obtenidos.           |
| **Minimización de datos**                       | Principio que busca limitar los datos tratados a aquellos que sean adecuados, relevantes y necesarios para una finalidad determinada.                          |
| **Necesidad**                                   | Criterio que permite determinar si un dato realmente es requerido para cumplir una finalidad concreta.                                                         |
| **Proporcionalidad**                            | Relación entre la cantidad y naturaleza de los datos tratados y la finalidad que se pretende alcanzar.                                                         |
| **Retención**                                   | Periodo durante el cual una organización conserva determinados datos.                                                                                          |
| **Eliminación**                                 | Proceso mediante el cual los datos dejan de mantenerse para una finalidad determinada, considerando las obligaciones y controles aplicables.                   |
| **Conservación**                                | Mantenimiento de datos durante un periodo determinado por razones operativas, legales, contractuales o regulatorias.                                           |
| **Derechos ARCO**                               | Derechos de acceso, rectificación, cancelación y oposición relacionados con el tratamiento de datos personales, conforme al marco jurídico mexicano aplicable. |
| **Acceso**                                      | Derecho relacionado con conocer qué datos personales se tienen y determinada información sobre su tratamiento.                                                 |
| **Rectificación**                               | Derecho relacionado con solicitar la corrección de datos personales inexactos, incompletos o desactualizados.                                                  |
| **Cancelación**                                 | Derecho relacionado con solicitar que determinados datos personales sean eliminados de los registros, cuando proceda conforme al marco jurídico aplicable.     |
| **Oposición**                                   | Derecho relacionado con solicitar que el tratamiento de determinados datos personales cese o no se realice en determinadas circunstancias, cuando proceda.     |
| **Consentimiento**                              | Manifestación de voluntad mediante la cual una persona acepta determinado tratamiento de sus datos, cuando el consentimiento sea la base jurídica aplicable.   |
| **Aviso de privacidad**                         | Documento mediante el cual el responsable informa determinadas condiciones del tratamiento de datos personales, conforme al marco jurídico aplicable.          |
| **Base jurídica**                               | Fundamento que permite realizar determinado tratamiento de datos personales conforme al régimen jurídico aplicable.                                            |
| **Transferencia de datos**                      | Comunicación de datos personales a terceros o entidades distintas del responsable, de acuerdo con las condiciones aplicables.                                  |
| **Gobierno de datos (data governance)**         | Conjunto de políticas, responsabilidades, procesos y controles utilizados para administrar los datos de una organización.                                      |
| **Propietario de datos (data owner)**           | Rol organizacional responsable de tomar decisiones sobre determinados datos, su uso y los controles aplicables.                                                |
| **Custodio de datos (data custodian)**          | Rol encargado de implementar y mantener controles técnicos sobre los datos bajo su responsabilidad.                                                            |
| **Catálogo de datos**                           | Inventario organizado que describe los datos existentes, su significado, origen, clasificación, responsables y otros atributos relevantes.                     |
| **Ciclo de vida de los datos**                  | Conjunto de etapas por las que pasa la información desde su obtención hasta su eliminación o conservación conforme a una necesidad determinada.                |
| **Finalidad compatible**                        | Uso posterior que mantiene una relación razonable con la finalidad para la cual fueron obtenidos los datos, considerando el marco jurídico aplicable.          |
| **Privacidad por diseño (privacy by design)**   | Enfoque que incorpora consideraciones de privacidad desde el diseño de procesos, sistemas, aplicaciones y bases de datos.                                      |
| **Privacidad por defecto (privacy by default)** | Enfoque que busca que la configuración inicial de un sistema limite la exposición y tratamiento de datos al mínimo necesario.                                  |
| **Trazabilidad**                                | Capacidad de determinar qué ocurrió con un dato o quién realizó determinada acción sobre él, mediante registros y controles apropiados.                        |
| **Incidente de seguridad**                      | Evento que puede comprometer la confidencialidad, integridad o disponibilidad de información o sistemas.                                                       |
| **Control técnico**                             | Medida implementada mediante tecnología para reducir un riesgo, como permisos, cifrado, registros de auditoría o restricciones de acceso.                      |
| **Control administrativo**                      | Política, procedimiento, responsabilidad o regla organizacional utilizada para reducir riesgos.                                                                |
| **Cumplimiento**                                | Capacidad de una organización para satisfacer requisitos legales, regulatorios, contractuales, normativos o internos aplicables.                               |

---

## 5. Marco jurídico de referencia

En México existen diferentes marcos legales relacionados con la protección de datos personales.

Para esta práctica se utilizará principalmente como referencia conceptual la:

**Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)**.

También existe la:

**Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO)**.

La aplicación de una u otra depende, entre otros factores, del tipo de organización responsable del tratamiento.

Otros marcos internacionales pueden resultar aplicables dependiendo de la organización, sector, ubicación de los titulares, servicios ofrecidos y operaciones realizadas.

Entre ellos pueden encontrarse:

* Reglamento General de Protección de Datos (GDPR)
* Sarbanes-Oxley Act (SOX)
* Health Insurance Portability and Accountability Act (HIPAA)
* Payment Card Industry Data Security Standard (PCI DSS)

#### Importante

No todos estos instrumentos tienen la misma naturaleza.

Por ejemplo:

* GDPR es un marco jurídico de protección de datos de la Unión Europea.
* HIPAA es un marco regulatorio estadounidense relacionado con información de salud en determinados contextos.
* SOX establece obligaciones relacionadas con información financiera y controles corporativos.
* PCI DSS es un estándar de seguridad para el entorno de datos de tarjetas de pago, no una ley.

El DBA no necesita convertirse en abogado.

Su responsabilidad consiste en comprender **qué requisitos deben traducirse en controles técnicos y qué decisiones deben escalarse a las áreas jurídicas, de cumplimiento, privacidad o dirección**.

---

## 6. Escenario

La empresa ficticia **Comercializadora Norte S.A. de C.V.** utiliza una base de datos para administrar clientes.

Actualmente almacena:

```text
id
nombre
correo
telefono
rfc
edad
ciudad
codigo_postal
fecha_alta
```

La organización tiene los siguientes procesos:

#### Atención al cliente

Necesita consultar:

* nombre
* correo
* teléfono
* información básica del cliente

#### Facturación

Necesita consultar:

* nombre
* RFC
* datos fiscales necesarios

#### Analítica

Necesita información agregada para generar estadísticas.

No necesita identificar individualmente a cada cliente.

#### DBA

Administra técnicamente la base de datos, pero el acceso administrativo no implica que todos los datos deban ser utilizados para cualquier finalidad.

---

## 7. Actividad 1 — Inventario y finalidad de los datos

Crea un archivo:

```text
evidencias/01-inventario-datos.md
```

Completa la siguiente matriz.

| Campo         | ¿Es dato personal? | Finalidad | ¿Es necesario? | Nivel de acceso | Retención |
| ------------- | ------------------ | --------- | -------------- | --------------- | --------- |
| id            |                    |           |                |                 |           |
| nombre        |                    |           |                |                 |           |
| correo        |                    |           |                |                 |           |
| telefono      |                    |           |                |                 |           |
| rfc           |                    |           |                |                 |           |
| edad          |                    |           |                |                 |           |
| ciudad        |                    |           |                |                 |           |
| codigo_postal |                    |           |                |                 |           |
| fecha_alta    |                    |           |                |                 |           |

Para cada decisión debes proporcionar una justificación.

---

## 8. Actividad 2 — Principio de minimización

Supongamos que el área de atención al cliente solicita crear una nueva tabla:

```sql
CREATE TABLE clientes_soporte (
    id BIGSERIAL,
    nombre VARCHAR(120),
    correo VARCHAR(150),
    telefono VARCHAR(20),
    rfc VARCHAR(13),
    edad INTEGER,
    ciudad VARCHAR(80),
    codigo_postal VARCHAR(10),
    fecha_alta DATE
);
```

Analiza la solicitud.

#### Preguntas

1. ¿Todos los campos son necesarios para atención al cliente?
2. ¿Por qué soporte necesitaría conocer el RFC?
3. ¿Necesita conocer la edad?
4. ¿Necesita conocer el código postal?
5. ¿Qué principio de privacidad está relacionado con esta decisión?

---

### 8.1 Diseñar una estructura mínima

Crea una tabla que contenga únicamente los datos necesarios para la finalidad de soporte:

```sql
CREATE TABLE clientes_soporte (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20)
);
```

Carga información a partir de `clientes`:

```sql
INSERT INTO clientes_soporte (
    id,
    nombre,
    correo,
    telefono
)
SELECT
    id,
    nombre,
    correo,
    telefono
FROM clientes;
```

Consulta:

```sql
SELECT *
FROM clientes_soporte;
```

---

## 9. Actividad 3 — Separación por finalidad

Ahora el área de analítica solicita información para obtener estadísticas.

Analítica necesita:

* ciudad
* rango de edad
* región del código postal

No necesita:

* nombre
* correo
* teléfono
* RFC

Diseña una consulta que proporcione información agregada:

```sql
SELECT
    ciudad,
    COUNT(*) AS cantidad_clientes
FROM clientes
GROUP BY ciudad
ORDER BY cantidad_clientes DESC;
```

Ahora crea rangos de edad:

```sql
SELECT
    CASE
        WHEN edad < 18 THEN 'Menor de 18'
        WHEN edad BETWEEN 18 AND 29 THEN '18-29'
        WHEN edad BETWEEN 30 AND 44 THEN '30-44'
        WHEN edad BETWEEN 45 AND 59 THEN '45-59'
        ELSE '60 o más'
    END AS rango_edad,
    COUNT(*) AS cantidad
FROM clientes
GROUP BY
    CASE
        WHEN edad < 18 THEN 'Menor de 18'
        WHEN edad BETWEEN 18 AND 29 THEN '18-29'
        WHEN edad BETWEEN 30 AND 44 THEN '30-44'
        WHEN edad BETWEEN 45 AND 59 THEN '45-59'
        ELSE '60 o más'
    END
ORDER BY rango_edad;
```

#### Pregunta

¿Por qué esta información puede ser más apropiada para analítica que entregar directamente la tabla completa de clientes?

---

## 10. Actividad 4 — Control de acceso relacionado con la finalidad

Crea un rol:

```sql
CREATE ROLE analista NOLOGIN;
```

Otorga únicamente acceso a la información preparada para analítica.

Por ejemplo, crea una vista:

```sql
CREATE VIEW v_analitica_clientes AS
SELECT
    ciudad,
    CASE
        WHEN edad < 18 THEN 'Menor de 18'
        WHEN edad BETWEEN 18 AND 29 THEN '18-29'
        WHEN edad BETWEEN 30 AND 44 THEN '30-44'
        WHEN edad BETWEEN 45 AND 59 THEN '45-59'
        ELSE '60 o más'
    END AS rango_edad
FROM clientes;
```

Otorga permisos:

```sql
GRANT USAGE ON SCHEMA public TO analista;

GRANT SELECT
ON v_analitica_clientes
TO analista;
```

No otorgues:

```sql
GRANT SELECT ON clientes TO analista;
```

#### Verificación

Comprueba los privilegios:

```sql
SELECT
    grantee,
    table_name,
    privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'analista';
```

#### Preguntas

1. ¿Qué información puede consultar el rol?
2. ¿Puede consultar directamente `clientes`?
3. ¿Puede obtener nombre, correo y RFC?
4. ¿Qué principio de privacidad estás aplicando?
5. ¿Qué principio de seguridad estás aplicando?

---

## 11. Actividad 5 — Analizar una finalidad secundaria

La empresa propone utilizar los datos de clientes para una nueva finalidad:

> "Enviar promociones personalizadas basadas en la edad, ciudad y comportamiento de compra."

Analiza la situación.

Responde:

#### 1.

¿El hecho de que la organización ya tenga los datos significa automáticamente que puede utilizarlos para cualquier finalidad?

#### 2.

¿Qué preguntas debería realizar la organización antes de implementar este tratamiento?

#### 3.

¿Qué datos serían realmente necesarios?

#### 4.

¿Necesitaría el área de marketing acceso directo a `clientes`?

#### 5.

¿Qué controles técnicos podrían limitar la información entregada?

Guarda tu análisis en:

```text
evidencias/05-finalidad-secundaria.md
```

---

## 12. Actividad 6 — Derechos ARCO y la base de datos

Los derechos ARCO son:

```text
A → Acceso
R → Rectificación
C → Cancelación
O → Oposición
```

El DBA debe comprender que una solicitud de derechos ARCO puede tener **implicaciones técnicas en la base de datos**, aunque la respuesta jurídica y administrativa corresponda a las áreas responsables de privacidad y cumplimiento.

---

### 12.1 Derecho de acceso

Supongamos que un titular solicita conocer los datos personales que la organización tiene registrados.

Identifica qué consulta permitiría localizar su información.

Ejemplo:

```sql
SELECT
    id,
    nombre,
    correo,
    telefono,
    rfc,
    edad,
    ciudad,
    codigo_postal,
    fecha_alta
FROM clientes
WHERE correo = 'ana@example.com';
```

#### Pregunta

¿Qué información adicional debería proporcionar la organización además del resultado de esta consulta?

No necesitas resolver jurídicamente la solicitud.

Identifica las implicaciones técnicas.

---

## 13. Actividad 7 — Derecho de rectificación

Supongamos que un cliente informa:

> "Mi correo electrónico registrado es incorrecto."

Actualiza únicamente el dato correspondiente:

```sql
UPDATE clientes
SET correo = 'nuevo-correo@example.com'
WHERE id = 1;
```

Verifica:

```sql
SELECT
    id,
    nombre,
    correo
FROM clientes
WHERE id = 1;
```

#### Preguntas

1. ¿Cómo podría comprobarse que el cambio fue autorizado?
2. ¿Debería registrarse quién realizó el cambio?
3. ¿Por qué la trazabilidad será importante?

Esta última pregunta será retomada en la **Unidad III**.

---

## 14. Actividad 8 — Derecho de cancelación y ciclo de vida

Supongamos que una solicitud de cancelación ha sido autorizada por el área responsable.

No realices todavía un `DELETE` sobre la tabla principal.

Primero analiza:

* ¿Existen otras tablas relacionadas?
* ¿Existen respaldos?
* ¿Existen réplicas?
* ¿Existen registros de auditoría?
* ¿Existen copias utilizadas para analítica?
* ¿Existen archivos exportados?
* ¿Existen sistemas externos?

Construye un pequeño mapa:

```text
clientes
   │
   ├── respaldos
   ├── réplicas
   ├── reportes
   ├── exportaciones
   └── sistemas externos
```

#### Pregunta

¿Por qué eliminar un registro de una tabla no necesariamente significa que toda la información relacionada con esa persona haya desaparecido de la organización?

Guarda tu respuesta en:

```text
evidencias/08-ciclo-vida.md
```

---

## 15. Actividad 9 — Derecho de oposición

Supongamos que un cliente solicita que sus datos no sean utilizados para una determinada finalidad secundaria.

Analiza:

> ¿Es necesario eliminar inmediatamente todos sus datos de la base?

Explica:

1. qué información podría necesitar mantenerse
2. qué información podría dejar de utilizarse para determinada finalidad
3. qué mecanismos técnicos podrían separar finalidades
4. por qué la decisión final no debe ser tomada únicamente por el DBA

---

## 16. Actividad 10 — Política de retención

La organización propone:

> "Conservar todos los datos de clientes indefinidamente porque podrían ser útiles en el futuro."

Analiza esta política.

Responde:

#### Pregunta 1

¿Es compatible con el principio de minimización?

#### Pregunta 2

¿Qué riesgos genera conservar información innecesaria?

#### Pregunta 3

¿Qué debería determinar la organización antes de establecer un periodo de retención?

#### Pregunta 4

¿Qué información debería documentarse para justificar el periodo seleccionado?

Crea:

```text
evidencias/10-retencion.md
```

---

## 17. Actividad 11 — Diseñar una matriz de gobierno de datos

Construye una matriz para los principales campos de la tabla.

| Dato          | Finalidad | Responsable | Usuarios autorizados | Protección | Retención | Acción al finalizar |
| ------------- | --------- | ----------- | -------------------- | ---------- | --------- | ------------------- |
| nombre        |           |             |                      |            |           |                     |
| correo        |           |             |                      |            |           |                     |
| telefono      |           |             |                      |            |           |                     |
| rfc           |           |             |                      |            |           |                     |
| edad          |           |             |                      |            |           |                     |
| ciudad        |           |             |                      |            |           |                     |
| codigo_postal |           |             |                      |            |           |                     |

Los roles pueden ser, por ejemplo:

* Atención al cliente
* Facturación
* Analítica
* DBA
* Dirección

No es necesario asignar todos los roles a todos los datos.

El objetivo es demostrar que **el acceso debe relacionarse con una necesidad funcional**.

Guarda la matriz en:

```text
evidencias/11-gobierno-datos.md
```

---

## 18. Actividad 12 — Privacidad por diseño

Analiza el siguiente escenario:

Una nueva aplicación requiere registrar clientes.

El desarrollador propone:

```text
CREATE TABLE clientes (
    id BIGSERIAL,
    nombre TEXT,
    correo TEXT,
    telefono TEXT,
    rfc TEXT,
    edad INTEGER,
    direccion TEXT,
    ciudad TEXT,
    codigo_postal TEXT,
    fecha_nacimiento DATE,
    ocupacion TEXT,
    salario NUMERIC,
    estado_civil TEXT,
    ...
);
```

La justificación es:

> "Es mejor guardar todos los datos por si posteriormente necesitamos alguno."

#### Preguntas

1. ¿Qué problemas identificas?
2. ¿Qué principio de privacidad se está ignorando?
3. ¿Qué preguntas realizarías antes de aprobar el diseño?
4. ¿Qué datos eliminarías?
5. ¿Qué datos requerirían una justificación adicional?
6. ¿Cómo aplicarías privacidad por defecto?

Guarda el análisis en:

```text
evidencias/12-privacidad-diseno.md
```

---

## 19. Actividad 13 — Diferenciar controles técnicos y administrativos

Clasifica las siguientes medidas:

| Medida                              | Técnico | Administrativo |
| ----------------------------------- | ------- | -------------- |
| Crear roles de PostgreSQL           |         |                |
| Política de retención               |         |                |
| Cifrado de datos                    |         |                |
| Procedimiento para solicitudes ARCO |         |                |
| Vista con información limitada      |         |                |
| Clasificación de información        |         |                |
| Registro de auditoría               |         |                |
| Política de control de acceso       |         |                |

Algunas medidas pueden involucrar ambos tipos de control.

Cuando ocurra esto, justifica tu respuesta.

---

## 20. Actividad 14 — Escenario integral

Considera la siguiente situación:

> La empresa tiene una base de datos con información de 50,000 clientes.
>
> Todos los empleados del área de analítica pueden consultar directamente la tabla `clientes`.
>
> La tabla contiene nombre, correo, teléfono, RFC, edad, ciudad y código postal.
>
> El área de analítica únicamente genera estadísticas mensuales.
>
> Los datos se conservan desde hace 12 años.
>
> No existe una política documentada de retención.
>
> Los desarrolladores reciben copias completas de la base de datos para realizar pruebas.
>
> Las copias de desarrollo contienen información real.
>
> El área de marketing utiliza los correos electrónicos para campañas promocionales.
>
> No existe documentación clara sobre qué finalidad corresponde a cada dato.

Identifica al menos **10 problemas o riesgos**.

Para cada uno indica:

| Problema | Principio afectado | Riesgo | Control propuesto |
| -------- | ------------------ | ------ | ----------------- |
|          |                    |        |                   |

Guarda la matriz en:

```text
evidencias/14-evaluacion-integral.md
```

---

## 21. Actividad 15 — Propuesta de arquitectura de datos protegidos

Diseña una propuesta conceptual para separar la información de acuerdo con su finalidad.

Puedes utilizar:

```text
                 BASE DE DATOS
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
     Operación      Analítica       Auditoría
        │              │
        ▼              ▼
  Datos necesarios   Datos
  para operación     agregados
```

Agrega controles para:

* acceso
* minimización
* protección de información sensible
* retención
* trazabilidad
* eliminación
* atención de solicitudes

No es necesario implementar físicamente toda la arquitectura.

El objetivo es demostrar que puedes **traducir principios de privacidad a decisiones técnicas**.

Guarda:

```text
evidencias/15-arquitectura.md
```

---

## 22. Verificación final

Antes de finalizar el laboratorio, debes poder explicar:

#### Privacidad

¿Qué diferencia existe entre seguridad de la información y privacidad?

#### Finalidad

¿Por qué una organización no debería utilizar automáticamente todos los datos que posee para cualquier propósito?

#### Minimización

¿Por qué almacenar más información no necesariamente es mejor?

#### ARCO

¿Qué implicaciones técnicas tienen los derechos de acceso, rectificación, cancelación y oposición?

#### Retención

¿Por qué la conservación indefinida puede representar un riesgo?

#### Gobierno

¿Quién debería decidir qué datos pueden utilizarse y para qué finalidad?

#### DBA

¿Cuál es la responsabilidad del DBA y cuáles decisiones deben involucrar a otras áreas?

---

## 23. Evidencias

La entrega deberá contener:

```text
evidencias/
├── 01-inventario-datos.md
├── 05-finalidad-secundaria.md
├── 08-ciclo-vida.md
├── 10-retencion.md
├── 11-gobierno-datos.md
├── 12-privacidad-diseno.md
├── 14-evaluacion-integral.md
└── 15-arquitectura.md
```

Las evidencias deben incluir:

```text
Objetivo
Procedimiento
Resultado
Análisis
Conclusión
```

Las capturas de pantalla deben utilizarse únicamente cuando aporten evidencia relevante.

No se evaluará la cantidad de capturas.

Se evaluará la capacidad para **demostrar y explicar las decisiones realizadas**.

---

## 24. Estructura del laboratorio en GitLab

Dentro del repositorio personal:

```text
dba-19706-2026-2-apellido-nombre/
│
├── unidad-02/
│   │
│   └── lab-03-privacidad-cumplimiento/
│       │
│       ├── README.md
│       │
│       ├── sql/
│       │   ├── 01-minimizacion.sql
│       │   ├── 02-finalidad.sql
│       │   └── 03-control-acceso.sql
│       │
│       └── evidencias/
│           ├── 01-inventario-datos.md
│           ├── 05-finalidad-secundaria.md
│           ├── 08-ciclo-vida.md
│           ├── 10-retencion.md
│           ├── 11-gobierno-datos.md
│           ├── 12-privacidad-diseno.md
│           ├── 14-evaluacion-integral.md
│           └── 15-arquitectura.md
│
└── ...
```

---

## 25. Commits

Realiza commits que permitan identificar la evolución del trabajo.

Por ejemplo:

```bash
git add .
git commit -m "feat: documenta inventario y finalidad de datos"
```

Posteriormente:

```bash
git add .
git commit -m "feat: implementa controles por finalidad"
```

Después:

```bash
git add .
git commit -m "docs: documenta derechos y retencion"
```

Finalmente:

```bash
git add .
git commit -m "docs: completa analisis de privacidad"
```

No es necesario utilizar ramas ni solicitudes de integración.

El objetivo es mantener evidencia del proceso de trabajo y facilitar la revisión.

---

## 26. Informe final

El archivo:

```text
README.md
```

debe contener:

### 1. Introducción

Explica el problema de privacidad abordado.

### 2. Inventario de datos

Presenta los datos identificados y su clasificación.

### 3. Finalidades

Explica para qué deben utilizarse los datos.

### 4. Minimización

Explica qué datos pueden eliminarse o limitarse y por qué.

### 5. Control de acceso

Explica cómo relacionaste los permisos con las funciones.

### 6. Derechos ARCO

Explica las implicaciones técnicas identificadas.

### 7. Retención

Explica cómo debería determinarse el periodo de conservación.

### 8. Gobierno de datos

Presenta la matriz de responsabilidades.

### 9. Evaluación integral

Presenta los principales riesgos encontrados.

### 10. Conclusiones

Explica qué aprendiste sobre la relación entre privacidad, seguridad y administración de bases de datos.

---

## 27. Preguntas de reflexión

Responde en el informe:

#### 1.

¿Una base de datos técnicamente segura necesariamente cumple con todos los requisitos de privacidad?

#### 2.

¿Por qué el principio de mínimo privilegio también contribuye a la privacidad?

#### 3.

¿Por qué el DBA no debería decidir por sí solo la finalidad del tratamiento de los datos?

#### 4.

¿Por qué los desarrolladores no deberían recibir automáticamente copias completas de bases de datos productivas?

#### 5.

¿Por qué una copia utilizada para desarrollo también puede representar un riesgo de privacidad?

#### 6.

¿Por qué la retención debe formar parte del ciclo de vida de los datos?

#### 7.

¿Qué relación existe entre privacidad por diseño y diseño de bases de datos?

#### 8.

¿Qué controles técnicos implementarías para reducir el riesgo de exposición de datos personales?

#### 9.

¿Qué información debería conocer un DBA para responder técnicamente a una solicitud ARCO?

#### 10.

¿Qué responsabilidades deberían corresponder al DBA, al responsable de privacidad, al área jurídica y al propietario de los datos?

---

## 28. Evaluación

| Criterio                              | Porcentaje |
| ------------------------------------- | ---------: |
| Inventario, clasificación y finalidad |        15% |
| Minimización de datos                 |        15% |
| Control de acceso por finalidad       |        15% |
| Análisis de derechos ARCO             |        15% |
| Retención y ciclo de vida             |        10% |
| Gobierno y responsabilidades          |        10% |
| Evaluación integral de riesgos        |        10% |
| Evidencias y documentación            |        10% |
| **Total**                             |   **100%** |

---

## 29. Criterios técnicos importantes

Para considerar correctamente realizada la práctica:

* No se debe asumir que todos los datos almacenados son necesarios.
* La finalidad debe analizarse antes de otorgar acceso.
* Los usuarios deben recibir únicamente la información necesaria para sus funciones.
* Una vista puede utilizarse para limitar la información presentada.
* La seudonimización y anonimización no sustituyen las obligaciones de privacidad.
* La eliminación de un registro de una tabla no necesariamente elimina todas sus copias.
* Las copias de desarrollo y pruebas también deben considerarse dentro del ciclo de vida de los datos.
* Las decisiones jurídicas no deben ser inventadas por el DBA.
* El DBA debe identificar las implicaciones técnicas y escalar las decisiones que correspondan.
* Las evidencias deben demostrar razonamiento y no solamente ejecución de comandos.

---

## 30. Relación con los siguientes laboratorios

Hasta este punto:

```text
LAB-01
Protección y privacidad de datos
        │
        ▼
LAB-02
Cifrado, credenciales y comunicaciones
        │
        ▼
LAB-03
Privacidad, cumplimiento y gobierno
        │
        ▼
LAB-04
Hardening de PostgreSQL
```

LAB-03 permite pasar de:

> **"¿Cómo protejo técnicamente el dato?"**

a:

> **"¿Por qué tengo este dato, quién necesita utilizarlo, para qué finalidad, durante cuánto tiempo y qué controles debo aplicar?"**

Esta perspectiva será importante para las siguientes unidades, particularmente cuando se incorporen:

* auditoría
* trazabilidad
* monitoreo
* gestión de respaldos
* recuperación
* continuidad
* disponibilidad
* replicación
* administración de ambientes
* gobierno de bases de datos
