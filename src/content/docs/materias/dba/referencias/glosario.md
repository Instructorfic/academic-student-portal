---
title: "Glosario de seguridad y desempeño de bases de datos"
description: "Gestión de Seguridad y Desempeño de Bases de Datos — Glosario de la materia: fundamentos, seguridad, control de acceso, privacidad, criptografía, rendimiento, concurrencia, respaldo, continuidad y alta disponibilidad."
---

> Glosario general de consulta para la materia **Gestión de Seguridad y Desempeño de Bases de Datos**.

---

## Cómo utilizar este glosario

Este documento no pretende sustituir las explicaciones de clase.

Su objetivo es proporcionar una referencia rápida para relacionar:

* administración de bases de datos
* seguridad
* privacidad
* control de acceso
* rendimiento
* monitoreo
* auditoría
* respaldo
* recuperación
* continuidad
* alta disponibilidad
* escalabilidad
* PostgreSQL
* MongoDB

Cuando un concepto aparece en una práctica, el estudiante puede utilizar este documento para identificar su significado y relación con otros conceptos.

---

## A. Fundamentos de bases de datos

### Base de datos

Conjunto organizado de datos almacenados y administrados de manera que puedan ser consultados, modificados y utilizados por aplicaciones o personas autorizadas.

### DBMS / SGBD

Sistema de gestión de bases de datos.

Software encargado de administrar:

* almacenamiento
* consultas
* transacciones
* usuarios
* permisos
* concurrencia
* recuperación

Ejemplos:

* PostgreSQL
* MongoDB
* MySQL
* SQL Server
* Oracle Database

### Base de datos relacional

Modelo que organiza la información principalmente mediante tablas relacionadas entre sí.

Ejemplo:

```text
usuarios
productos
ventas
detalle_venta
```

### Base de datos NoSQL

Familia de sistemas de bases de datos que utilizan modelos diferentes o más flexibles que el modelo relacional tradicional.

MongoDB utiliza un modelo orientado a documentos.

### Tabla

Estructura del modelo relacional compuesta por filas y columnas.

### Registro / fila

Representa una instancia de una entidad dentro de una tabla.

### Columna

Representa un atributo de los registros de una tabla.

### Documento

Unidad de almacenamiento utilizada por MongoDB.

Generalmente utiliza una estructura similar a JSON, internamente representada mediante BSON.

### Colección

Conjunto de documentos en MongoDB.

Conceptualmente puede compararse con una tabla, aunque no son estructuras equivalentes.

### Esquema

En bases de datos relacionales, estructura que organiza objetos como tablas, vistas, funciones y otros elementos.

En PostgreSQL, un esquema también puede funcionar como espacio lógico de nombres.

---

## B. Administración de bases de datos

### DBA

Database Administrator.

Responsable de tareas relacionadas con la administración, seguridad, disponibilidad, rendimiento, respaldo y recuperación de bases de datos.

### Gestión de configuración

Proceso de administrar y controlar parámetros de configuración de un sistema.

### Mantenimiento

Conjunto de actividades destinadas a conservar el funcionamiento adecuado de una base de datos.

Puede incluir:

* actualización de estadísticas
* mantenimiento de índices
* limpieza
* revisión de espacio
* revisión de logs
* actualización del motor

### Capacidad

Cantidad de recursos que un sistema puede manejar.

Puede relacionarse con:

* almacenamiento
* memoria
* CPU
* conexiones
* transacciones
* usuarios
* operaciones por segundo

### Dependencia

Relación entre componentes donde uno requiere de otro para funcionar.

---

## C. Seguridad

### Seguridad de la información

Protección de la información frente a accesos, modificaciones, divulgaciones, destrucciones o interrupciones no autorizadas.

### Confidencialidad

Garantiza que la información solamente sea accesible por entidades autorizadas.

### Integridad

Garantiza que la información permanezca correcta y no sea modificada de manera no autorizada.

### Disponibilidad

Garantiza que la información y los servicios estén disponibles cuando sean necesarios.

### CIA

Modelo formado por:

```text
Confidentiality
Integrity
Availability
```

En español:

```text
Confidencialidad
Integridad
Disponibilidad
```

### Riesgo

Posibilidad de que una amenaza aproveche una vulnerabilidad y produzca un impacto.

Una representación simplificada es:

```text
Riesgo ≈ Probabilidad × Impacto
```

### Amenaza

Situación, evento o actor que puede provocar un daño.

### Vulnerabilidad

Debilidad que puede ser aprovechada por una amenaza.

### Impacto

Consecuencia que puede producir un incidente.

### Mitigación

Acción destinada a reducir la probabilidad o impacto de un riesgo.

### Control de seguridad

Medida utilizada para prevenir, detectar, corregir o reducir riesgos.

---

## D. Control de acceso

### Autenticación

Proceso mediante el cual se verifica la identidad de una entidad.

Pregunta:

> ¿Quién eres?

### Autorización

Proceso mediante el cual se determina qué acciones puede realizar una entidad.

Pregunta:

> ¿Qué puedes hacer?

### Identidad

Representación de una entidad dentro de un sistema.

### Usuario

Cuenta utilizada para identificar y autenticar a una persona, aplicación o servicio.

### Rol

Conjunto de permisos agrupados bajo una identidad lógica.

### RBAC

Role-Based Access Control.

Modelo de control de acceso basado en roles.

Ejemplo:

```text
Usuario
   ↓
Rol
   ↓
Permisos
```

### Privilegio

Permiso específico para realizar una acción.

Ejemplos:

```text
SELECT
INSERT
UPDATE
DELETE
```

### GRANT

Instrucción utilizada para otorgar privilegios.

### REVOKE

Instrucción utilizada para retirar privilegios.

### Mínimo privilegio

Principio según el cual una entidad debe disponer únicamente de los permisos necesarios para realizar sus funciones.

### Separación de funciones

Principio que evita concentrar funciones críticas en una sola persona o cuenta.

### Cuenta administrativa

Cuenta con privilegios elevados para realizar tareas de administración.

### Cuenta de aplicación

Cuenta utilizada por una aplicación para conectarse a una base de datos.

Una cuenta de aplicación no debería utilizar privilegios administrativos innecesarios.

---

## E. Datos sensibles y privacidad

### Dato personal

Información relacionada con una persona identificada o identificable.

### Dato personal sensible

Categoría de información que puede requerir protección reforzada conforme a la legislación aplicable.

### Clasificación de datos

Proceso de categorizar información según su sensibilidad, importancia o requisitos de protección.

### Enmascaramiento

Técnica que modifica la representación de un dato para evitar exponer su valor original.

Ejemplo:

```text
4111111111111111
```

puede mostrarse como:

```text
************1111
```

### Pseudonimización

Proceso mediante el cual los datos se procesan de forma que ya no puedan atribuirse directamente a una persona sin información adicional.

### Anonimización

Proceso destinado a impedir que los datos puedan asociarse razonablemente con una persona identificable.

### Minimización de datos

Principio que busca recopilar y conservar solamente los datos necesarios para una finalidad determinada.

### Retención

Periodo durante el cual determinada información debe conservarse.

### Eliminación

Proceso mediante el cual los datos dejan de conservarse cuando ya no existe una finalidad o requisito legítimo para mantenerlos.

---

## F. Criptografía

### Cifrado

Transformación de información para que solamente entidades autorizadas puedan recuperar su contenido.

### Cifrado en tránsito

Protege los datos mientras viajan entre sistemas.

Ejemplo:

```text
Aplicación ← TLS → Base de datos
```

### Cifrado en reposo

Protege información almacenada.

Puede aplicarse a:

* discos
* archivos
* backups
* bases de datos

### Hash

Función que transforma información en un valor de longitud determinada.

Se utiliza, entre otras cosas, para verificar integridad.

### Salting

Uso de un valor adicional junto con una contraseña antes de aplicar un algoritmo de derivación o hash.

### TLS

Protocolo utilizado para proteger comunicaciones mediante cifrado y autenticación.

### Certificado digital

Mecanismo criptográfico utilizado para asociar una identidad con una clave pública.

### Clave criptográfica

Información utilizada por algoritmos criptográficos para cifrar, descifrar o realizar otras operaciones.

### Gestión de claves

Proceso de generación, almacenamiento, protección, rotación y eliminación de claves criptográficas.

### Secreto

Información que debe mantenerse protegida.

Ejemplos:

* contraseñas
* tokens
* API keys
* claves privadas
* cadenas de conexión

---

## G. SQL Injection y NoSQL Injection

### SQL Injection

Vulnerabilidad que ocurre cuando entradas controladas por un usuario pueden modificar la estructura de una consulta SQL.

Ejemplo conceptual:

```text
Entrada del usuario
        ↓
Consulta construida mediante concatenación
        ↓
Interpretación como SQL
```

### Consulta parametrizada

Consulta donde los valores se envían como parámetros separados de la estructura SQL.

Es una de las principales medidas contra SQL Injection.

### Sanitización

Proceso de validar o transformar entradas para reducir riesgos.

Debe entenderse que la sanitización no sustituye el uso de consultas parametrizadas.

### Validación de entrada

Proceso de verificar que los datos recibidos cumplen las reglas esperadas.

### NoSQL Injection

Vulnerabilidad en la que una entrada controlada por el usuario puede alterar la lógica de una consulta NoSQL.

Puede ocurrir cuando aplicaciones aceptan estructuras o operadores inesperados provenientes directamente del usuario.

---

## H. Hardening

### Hardening

Proceso de reducir la superficie de ataque de un sistema.

Puede incluir:

* deshabilitar servicios innecesarios
* restringir puertos
* limitar interfaces de red
* aplicar mínimo privilegio
* actualizar componentes
* proteger configuraciones
* utilizar cifrado
* restringir acceso remoto

### Superficie de ataque

Conjunto de puntos mediante los cuales un sistema puede ser atacado.

### Secure by default

Configuración inicial que favorece condiciones seguras sin requerir modificaciones adicionales.

### Baseline

Configuración de referencia considerada aceptable para un sistema.

### Segmentación de red

Separación de sistemas en diferentes segmentos de red para limitar comunicaciones y reducir exposición.

### Firewall

Control de red que permite o bloquea tráfico según reglas definidas.

### Allowlist

Lista explícita de entidades permitidas.

### Denylist

Lista de entidades explícitamente bloqueadas.

### Puerto

Identificador lógico utilizado por los servicios de red.

Ejemplos comunes:

```text
5432  PostgreSQL
27017 MongoDB
```

---

## I. PostgreSQL

### PostgreSQL

Sistema gestor de bases de datos relacional de código abierto.

### `psql`

Cliente de línea de comandos de PostgreSQL.

### `pg_hba.conf`

Archivo utilizado para definir reglas de autenticación y acceso de clientes.

### `postgresql.conf`

Archivo principal de configuración del servidor PostgreSQL.

### `pg_stat_activity`

Vista del sistema utilizada para consultar información sobre sesiones y actividad.

### `EXPLAIN`

Comando utilizado para consultar el plan de ejecución de una consulta.

### `EXPLAIN ANALYZE`

Ejecuta la consulta y proporciona información real sobre su ejecución.

### VACUUM

Proceso de mantenimiento relacionado con el almacenamiento y reutilización de espacio generado por actualizaciones y eliminaciones.

### ANALYZE

Actualiza estadísticas utilizadas por el optimizador de consultas.

### Índice

Estructura que permite localizar información de manera más eficiente.

### `pg_dump`

Herramienta de PostgreSQL para generar respaldos lógicos.

### `pg_restore`

Herramienta utilizada para restaurar respaldos generados en formatos compatibles.

---

## J. MongoDB

### MongoDB

Sistema de gestión de bases de datos orientado a documentos.

### mongosh

Shell interactivo de MongoDB.

### BSON

Binary JSON.

Formato utilizado internamente por MongoDB para representar documentos.

### Documento

Unidad de datos de MongoDB.

### Colección

Conjunto de documentos.

### Aggregation Pipeline

Mecanismo para procesar y transformar documentos mediante una secuencia de etapas.

### `explain()`

Mecanismo utilizado para analizar la ejecución de consultas.

### `mongod`

Proceso principal del servidor MongoDB.

### `mongodump`

Herramienta para realizar respaldos lógicos de MongoDB.

### `mongorestore`

Herramienta utilizada para restaurar respaldos generados por `mongodump`.

### `bindIp`

Configuración que determina las interfaces de red en las que MongoDB acepta conexiones.

---

## K. Rendimiento

### Rendimiento

Capacidad de un sistema para ejecutar operaciones de manera eficiente.

### Latencia

Tiempo requerido para completar una operación.

### Throughput

Cantidad de operaciones procesadas durante un periodo determinado.

### Consulta lenta

Consulta cuyo tiempo o consumo de recursos resulta elevado respecto al objetivo establecido.

### Optimizador

Componente que selecciona un plan para ejecutar una consulta.

### Plan de ejecución

Estrategia utilizada por el motor para ejecutar una consulta.

### Full Table Scan

Lectura de una tabla completa para encontrar registros.

Puede ser apropiada en determinadas consultas, pero puede ser costosa cuando existen grandes cantidades de datos.

### Index Scan

Acceso a datos utilizando un índice.

### Cardinalidad

Número de valores distintos o nivel de diversidad de una columna.

### Selectividad

Capacidad de un filtro para reducir significativamente el conjunto de resultados.

### Índice compuesto

Índice construido utilizando más de una columna o campo.

### Over-indexing

Situación donde existen más índices de los necesarios.

Puede incrementar:

* almacenamiento
* costo de escritura
* mantenimiento

---

## L. Concurrencia

### Concurrencia

Capacidad de un sistema para gestionar múltiples operaciones simultáneamente.

### Transacción

Conjunto de operaciones tratado como una unidad lógica.

### ACID

Propiedades tradicionalmente asociadas con transacciones:

```text
Atomicity
Consistency
Isolation
Durability
```

En español:

```text
Atomicidad
Consistencia
Aislamiento
Durabilidad
```

### Atomicidad

Una transacción se completa completamente o no se aplica.

### Consistencia

Una transacción debe llevar la base de un estado válido a otro estado válido.

### Aislamiento

Las operaciones concurrentes deben comportarse de acuerdo con las reglas de aislamiento configuradas.

### Durabilidad

Los cambios confirmados deben persistir de acuerdo con las garantías del sistema.

### Bloqueo

Mecanismo utilizado para controlar el acceso concurrente a recursos.

### Deadlock

Situación donde dos o más operaciones esperan recursos que están siendo retenidos unas por otras.

---

## M. Monitoreo y auditoría

### Monitoreo

Observación continua o periódica del comportamiento de un sistema.

### Métrica

Medición cuantificable de alguna característica del sistema.

Ejemplos:

* CPU
* memoria
* conexiones
* latencia
* operaciones
* espacio

### Log

Registro de eventos producidos por un sistema.

### Auditoría

Proceso de registrar, revisar y analizar actividades para determinar qué ocurrió, cuándo ocurrió y quién realizó determinada acción cuando esa información está disponible.

### Trazabilidad

Capacidad de relacionar una acción con su origen, contexto y resultado.

### Evento

Suceso registrado o detectado por un sistema.

### Alerta

Notificación generada cuando una condición determinada requiere atención.

---

## N. Backup y recuperación

### Backup

Copia de información utilizada para recuperación.

### Restore

Proceso de recuperar información desde un respaldo.

### Recuperación

Proceso de devolver datos o servicios a un estado operativo después de una pérdida, error o incidente.

### Backup lógico

Respaldo basado en estructuras y datos que pueden reconstruirse mediante herramientas del gestor.

Ejemplos:

```text
pg_dump
mongodump
```

### Backup físico

Respaldo de estructuras físicas utilizadas por el sistema gestor.

### Backup completo

Respaldo que representa el conjunto completo de información definido por la estrategia de respaldo.

### Backup incremental

Respaldo que contiene cambios desde un punto de referencia anterior, dependiendo de la tecnología utilizada.

### Backup diferencial

Respaldo que contiene cambios desde un respaldo completo de referencia.

### Restauración

Proceso de reconstruir información a partir de un respaldo.

### Prueba de restauración

Proceso mediante el cual se verifica que un respaldo realmente puede utilizarse para recuperar información.

Un archivo de backup que nunca se ha restaurado no debe considerarse automáticamente como un backup validado.

---

## O. Continuidad

### Continuidad

Capacidad de una organización para mantener o recuperar servicios críticos después de una interrupción.

### RPO

Recovery Point Objective.

Cantidad máxima de pérdida de datos que una organización está dispuesta a aceptar medida en términos de tiempo.

Ejemplo:

```text
RPO = 1 hora
```

Implica que la estrategia debe buscar limitar la pérdida de información a aproximadamente una hora o menos.

### RTO

Recovery Time Objective.

Tiempo máximo objetivo para recuperar un servicio.

Ejemplo:

```text
RTO = 2 horas
```

### Disaster Recovery

Conjunto de capacidades y procedimientos destinados a recuperar sistemas después de una interrupción significativa.

### Sitio alterno

Ubicación utilizada para continuar operaciones cuando la infraestructura principal no está disponible.

---

## P. Alta disponibilidad

### Alta disponibilidad

Diseño destinado a reducir el tiempo durante el cual un servicio permanece indisponible.

### Failover

Cambio de operación desde un componente principal hacia otro componente disponible.

### Failback

Regreso de la operación hacia el componente principal después de su recuperación.

### Redundancia

Existencia de componentes alternativos que pueden asumir una función.

### SPOF

Single Point of Failure.

Componente cuya falla puede provocar la interrupción de un servicio completo.

---

## Q. Replicación

### Replicación

Mecanismo mediante el cual los datos se mantienen en más de una instancia.

### Réplica

Copia sincronizada o mantenida a partir de otra instancia.

### Primario

Nodo que normalmente recibe determinadas operaciones de escritura dentro de una arquitectura de replicación.

### Secundario

Nodo que mantiene una copia de datos de otro nodo.

### Replicación síncrona

La confirmación de una operación depende de determinadas confirmaciones de réplicas.

### Replicación asíncrona

Las réplicas pueden actualizarse después de que la operación haya sido confirmada en el nodo principal.

---

## R. Escalabilidad

### Escalabilidad

Capacidad de un sistema para soportar crecimiento de demanda.

### Escalabilidad vertical

Incrementar recursos de un servidor:

```text
CPU
RAM
almacenamiento
```

### Escalabilidad horizontal

Agregar más servidores o nodos.

### Sharding

Distribución de datos entre diferentes nodos para permitir crecimiento horizontal.

### Particionamiento

División lógica de datos en partes manejables.

---

## S. Privacidad y cumplimiento

### Privacidad

Protección de las personas respecto al tratamiento de sus datos personales.

### LFPDPPP

Ley Federal de Protección de Datos Personales en Posesión de los Particulares.

Marco mexicano relacionado con el tratamiento de datos personales por particulares.

### LGPDPPSO

Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.

Marco mexicano relacionado con el tratamiento de datos personales por sujetos obligados.

### GDPR

Reglamento General de Protección de Datos de la Unión Europea.

### Aviso de privacidad

Documento mediante el cual se informa, entre otros aspectos, sobre el tratamiento de datos personales conforme al marco jurídico aplicable.

### Consentimiento

Manifestación mediante la cual una persona autoriza determinado tratamiento cuando la legislación aplicable establece que constituye una base válida para dicho tratamiento.

### Finalidad

Propósito para el cual se recopilan o procesan datos personales.

### Derechos ARCO

Derechos relacionados con:

```text
Acceso
Rectificación
Cancelación
Oposición
```

Su aplicación concreta depende del marco jurídico correspondiente.

---

## T. DevSecOps y automatización

### DevOps

Enfoque que busca integrar desarrollo y operaciones mediante colaboración, automatización y entrega continua.

### DevSecOps

Integra prácticas de seguridad dentro del ciclo de desarrollo y operación.

### CI

Continuous Integration.

Integración continua de cambios de software.

### CD

Continuous Delivery o Continuous Deployment, dependiendo del contexto.

### Pipeline

Conjunto automatizado de etapas para procesar cambios.

### Infraestructura como código

Práctica de definir infraestructura mediante archivos y código versionado.

### Configuración como código

Definición de configuraciones mediante archivos versionados y reproducibles.

### Secret Management

Gestión centralizada y protegida de secretos.

---

## U. Conceptos de operación segura

### Cambio

Modificación realizada sobre un sistema, configuración, aplicación o infraestructura.

### Gestión de cambios

Proceso para evaluar, aprobar, ejecutar y verificar modificaciones.

### Rollback

Proceso para regresar un sistema o cambio a un estado anterior.

### Baseline de seguridad

Conjunto de configuraciones mínimas consideradas necesarias para operar de manera segura.

### Segregación de ambientes

Separación entre ambientes como:

```text
Desarrollo
Pruebas
Producción
```

### Credencial

Información utilizada para autenticar una identidad.

### Cuenta de servicio

Identidad utilizada por una aplicación o proceso automatizado.

### Rotación de credenciales

Proceso de reemplazar periódicamente credenciales o secretos.

---

## V. Conceptos que deben relacionarse

### Seguridad + rendimiento

Una medida de seguridad puede tener impacto en el rendimiento.

Ejemplo:

```text
Más controles
    ↓
Más procesamiento
    ↓
Posible impacto en latencia
```

Por eso las decisiones deben evaluarse considerando seguridad y desempeño.

### Seguridad + disponibilidad

Una configuración extremadamente restrictiva puede impedir conexiones legítimas.

Una configuración demasiado abierta puede aumentar la exposición.

La administración requiere encontrar una configuración adecuada al riesgo y al propósito del sistema.

### Backup + RPO

El RPO influye en la frecuencia y estrategia de respaldo.

```text
RPO bajo
   ↓
Mayor frecuencia de protección de datos
```

### Backup + RTO

El RTO influye en cuánto tiempo puede tardar la recuperación.

```text
RTO bajo
   ↓
Necesidad de mecanismos de recuperación más rápidos
```

### Mínimo privilegio + SQL Injection

El mínimo privilegio no elimina SQL Injection, pero puede reducir el impacto potencial de una explotación.

```text
Vulnerabilidad
      +
Privilegios elevados
      ↓
Mayor impacto potencial
```

### Hardening + superficie de ataque

El hardening busca reducir puntos innecesarios de exposición.

```text
Servicios innecesarios
        ↓
Deshabilitar

Puertos innecesarios
        ↓
Cerrar/restringir

Usuarios innecesarios
        ↓
Eliminar/deshabilitar
```

---

## W. Diferencias importantes

### Autenticación vs autorización

```text
Autenticación
¿Quién eres?

Autorización
¿Qué puedes hacer?
```

### Cifrado vs hash

```text
Cifrado
→ diseñado para poder recuperar el contenido mediante una clave

Hash
→ diseñado como transformación unidireccional
```

### Backup vs replicación

```text
Backup
→ recuperación ante pérdida o corrupción

Replicación
→ disponibilidad y distribución de datos
```

La replicación no sustituye automáticamente a los backups.

### Pseudonimización vs anonimización

```text
Pseudonimización
→ puede existir información adicional que permita volver a asociar los datos

Anonimización
→ busca impedir razonablemente dicha asociación
```

### Índice vs tabla

```text
Tabla
→ almacena los datos

Índice
→ facilita determinadas formas de localizar los datos
```

### RPO vs RTO

```text
RPO
¿Cuánta información puedo perder?

RTO
¿Cuánto tiempo puedo tardar en recuperar?
```

---

## X. Preguntas que debe hacerse un DBA

Ante una operación:

#### Seguridad

```text
¿Quién puede hacerlo?
¿Realmente necesita ese permiso?
¿La cuenta tiene privilegios excesivos?
```

#### Rendimiento

```text
¿Por qué esta consulta es lenta?
¿Existe un índice apropiado?
¿Qué plan de ejecución se está utilizando?
```

#### Disponibilidad

```text
¿Qué sucede si este componente falla?
¿Existe un SPOF?
```

#### Recuperación

```text
¿Existe backup?
¿Se ha probado?
¿Cuánto podemos perder?
¿Cuánto podemos tardar en recuperar?
```

#### Cambio

```text
¿Qué voy a modificar?
¿Qué puede afectar?
¿Cómo verifico el cambio?
¿Cómo regreso atrás?
```

---

## Y. Modelo mental general de la materia

La administración segura de bases de datos puede resumirse en:

```text
PROTEGER
   ↓
CONTROLAR
   ↓
OBSERVAR
   ↓
OPTIMIZAR
   ↓
RESPALDAR
   ↓
RECUPERAR
   ↓
MEJORAR
```

Y ante cualquier problema:

```text
1. Observar
2. Identificar
3. Analizar
4. Evaluar riesgo
5. Cambiar
6. Verificar
7. Documentar
```

---

## Z. Conceptos fundamentales para el curso

Si el estudiante domina y puede explicar correctamente estos conceptos, tiene una buena base para avanzar en la materia:

```text
CIA
Mínimo privilegio
Autenticación
Autorización
RBAC
GRANT
REVOKE
SQL Injection
NoSQL Injection
Validación
Sanitización
Hardening
Superficie de ataque
Cifrado
TLS
Datos personales
Pseudonimización
Anonimización
Auditoría
Logs
Métricas
EXPLAIN
Índices
Concurrencia
Bloqueos
Transacciones
ACID
Backup
Restore
RPO
RTO
Continuidad
Alta disponibilidad
Failover
Replicación
Sharding
Escalabilidad
```

---

## Principio final

Un DBA no debe preguntarse únicamente:

> **¿Qué comando debo ejecutar?**

Debe preguntarse:

> **¿Qué problema estoy resolviendo, qué riesgo estoy aceptando, qué impacto tendrá el cambio y cómo comprobaré que funcionó?**

Ese cambio de mentalidad es una de las diferencias entre **ejecutar comandos** y **administrar una base de datos**.
