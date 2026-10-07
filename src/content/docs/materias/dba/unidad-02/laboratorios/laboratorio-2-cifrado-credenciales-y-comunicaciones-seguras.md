---
title: "LAB-02 — Cifrado, credenciales y comunicaciones seguras"
description: "Unidad 2 de DBA — hash y derivación de contraseñas, cifrado con pgcrypto, gestión de claves y verificación de TLS en PostgreSQL."
---

**Unidad:** II. Seguridad, privacidad y control de acceso
**Tema:** 2.4 Cifrado, credenciales y protección de las comunicaciones
**Motor principal:** PostgreSQL 16
**Modalidad:** Individual
**Duración estimada:** 3 horas

---

## 1. Contexto

La protección de una base de datos no termina cuando se establecen usuarios, roles y permisos.

Una base de datos puede tener un esquema de control de acceso correctamente configurado y, aun así, exponer información sensible si:

* las contraseñas se almacenan incorrectamente
* los datos sensibles se almacenan sin protección
* las conexiones entre clientes y servidor no utilizan cifrado
* las claves criptográficas se almacenan junto con los datos que protegen
* los respaldos contienen información sensible sin protección
* las credenciales aparecen dentro de scripts, repositorios o archivos de configuración

En esta práctica se analizarán diferentes mecanismos de protección criptográfica utilizando PostgreSQL.

El objetivo no es convertir al estudiante en especialista en criptografía, sino que sea capaz de **identificar qué mecanismo corresponde a cada problema de seguridad y reconocer sus implicaciones para la administración de bases de datos**.

---

## 2. Objetivo

Implementar y verificar mecanismos básicos de protección criptográfica en PostgreSQL para proteger credenciales, información sensible y comunicaciones entre clientes y servidor.

---

## 3. Resultados de aprendizaje

Al finalizar la práctica, el estudiante será capaz de:

1. Diferenciar entre hash y cifrado.
2. Identificar prácticas incorrectas para almacenar contraseñas.
3. Aplicar funciones criptográficas para proteger información sensible.
4. Explicar la diferencia entre protección de datos almacenados y protección de datos en tránsito.
5. Configurar y verificar una conexión TLS en PostgreSQL.
6. Identificar la importancia de la gestión de claves criptográficas.
7. Reconocer información sensible que no debe almacenarse directamente en un repositorio Git.
8. Documentar evidencia técnica de las configuraciones realizadas.

---

## 4. Conceptos y definiciones

Antes de realizar las actividades, revisa los siguientes conceptos. No se espera que memorices todas las definiciones, pero sí que puedas identificar **qué problema resuelve cada concepto y cómo se relaciona con la administración segura de bases de datos**.

| Concepto                                                     | Definición                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cifrado (encryption)**                                     | Proceso mediante el cual información legible se transforma en una representación que no puede interpretarse sin utilizar el mecanismo o clave correspondiente.                                                                                                                                    |
| **Descifrado (decryption)**                                  | Proceso mediante el cual se recupera la información original a partir de información cifrada utilizando la clave o mecanismo correspondiente.                                                                                                                                                     |
| **Hash**                                                     | Transformación matemática que genera una representación de longitud determinada a partir de una entrada. Un hash criptográfico está diseñado para ser difícil de invertir. Se utiliza, entre otros usos, para verificar información y como componente de mecanismos de protección de contraseñas. |
| **Contraseña (password)**                                    | Secreto utilizado para demostrar que una persona conoce una determinada credencial. Una contraseña no debería almacenarse directamente en una base de datos.                                                                                                                                      |
| **Sal (salt)**                                               | Valor aleatorio que se combina con una contraseña antes de generar su representación criptográfica. Ayuda a evitar que contraseñas iguales produzcan representaciones iguales y dificulta determinados ataques mediante tablas precalculadas.                                                     |
| **Derivación de claves para contraseñas (password hashing)** | Proceso diseñado específicamente para transformar contraseñas en valores difíciles y costosos de obtener mediante ataques de fuerza bruta. Algoritmos como Argon2id, scrypt y bcrypt están diseñados para este propósito.                                                                         |
| **Cifrado simétrico (symmetric encryption)**                 | Cifrado en el que se utiliza una misma clave secreta, o información derivada de ella, para realizar el cifrado y el descifrado.                                                                                                                                                                   |
| **Cifrado asimétrico (asymmetric encryption)**               | Mecanismo criptográfico que utiliza un par de claves relacionadas: una clave pública y una clave privada. Se utiliza, entre otras funciones, para autenticación, intercambio de claves y firmas digitales.                                                                                        |
| **Clave criptográfica (cryptographic key)**                  | Información utilizada por un algoritmo criptográfico para realizar una operación como cifrado, descifrado, firma o verificación.                                                                                                                                                                  |
| **Gestión de claves (key management)**                       | Conjunto de procesos para generar, almacenar, distribuir, utilizar, rotar, revocar, respaldar y eliminar claves criptográficas de manera segura.                                                                                                                                                  |
| **Cifrado en reposo (encryption at rest)**                   | Protección de información mientras se encuentra almacenada, por ejemplo, en archivos, discos, bases de datos o respaldos.                                                                                                                                                                         |
| **Cifrado en tránsito (encryption in transit)**              | Protección de información mientras se transmite entre dos sistemas o componentes de una infraestructura.                                                                                                                                                                                          |
| **TLS (Transport Layer Security)**                           | Protocolo criptográfico utilizado para proteger comunicaciones mediante mecanismos de confidencialidad, integridad y autenticación. Es el mecanismo utilizado actualmente para proteger conexiones seguras como las conexiones HTTPS.                                                             |
| **SSL (Secure Sockets Layer)**                               | Familia de protocolos anterior a TLS. SSL está obsoleto y no debe utilizarse en sistemas actuales. El término "SSL" todavía aparece frecuentemente de manera informal para referirse a conexiones protegidas mediante TLS.                                                                        |
| **Certificado digital (digital certificate)**                | Documento digital que vincula una identidad con una clave pública y contiene información que permite verificar esa relación.                                                                                                                                                                      |
| **Autoridad certificadora (Certificate Authority, CA)**      | Entidad que emite y firma certificados digitales para permitir que otras partes puedan verificar su autenticidad y confianza.                                                                                                                                                                     |
| **Cadena de confianza (chain of trust)**                     | Relación jerárquica mediante la cual un certificado puede validarse hasta llegar a una autoridad certificadora que el cliente considera confiable.                                                                                                                                                |
| **Autenticación**                                            | Proceso mediante el cual se verifica la identidad de una persona, sistema o servicio.                                                                                                                                                                                                             |
| **Integridad**                                               | Propiedad que permite detectar modificaciones no autorizadas de la información.                                                                                                                                                                                                                   |
| **Confidencialidad**                                         | Propiedad que busca impedir que personas o sistemas no autorizados conozcan la información.                                                                                                                                                                                                       |
| **Secreto (secret)**                                         | Información que debe permanecer conocida únicamente por las entidades autorizadas, como una contraseña, token o clave criptográfica.                                                                                                                                                              |
| **Credencial**                                               | Información utilizada para demostrar la identidad o autorización de una persona o sistema. Puede incluir usuario, contraseña, certificados, claves o tokens.                                                                                                                                      |
| **Texto claro (plaintext)**                                  | Información en su forma legible antes de aplicar un mecanismo de cifrado.                                                                                                                                                                                                                         |
| **Texto cifrado (ciphertext)**                               | Información resultante después de aplicar un mecanismo de cifrado. Sin la clave correspondiente, su contenido no debería ser interpretable.                                                                                                                                                       |
| **Fuerza bruta (brute-force attack)**                        | Ataque que intenta numerosas combinaciones de posibles contraseñas o claves hasta encontrar una válida.                                                                                                                                                                                           |
| **Credencial expuesta**                                      | Contraseña, clave, token u otro secreto que ha quedado disponible para personas o sistemas que no deberían tener acceso a él.                                                                                                                                                                     |
| **`sslmode`**                                                | Parámetro de PostgreSQL utilizado por los clientes para determinar cómo debe establecerse y validarse una conexión SSL/TLS.                                                                                                                                                                       |
| **`verify-full`**                                            | Modo de conexión de PostgreSQL que requiere TLS y valida tanto la autoridad certificadora como la correspondencia entre el nombre del servidor y el certificado.                                                                                                                                  |
| **`pgcrypto`**                                               | Extensión de PostgreSQL que proporciona funciones criptográficas para operaciones como generación de valores aleatorios, hash y cifrado de determinados datos.                                                                                                                                    |
| **`pg_stat_ssl`**                                            | Vista de PostgreSQL que proporciona información sobre el uso de SSL/TLS en las conexiones activas al servidor.                                                                                                                                                                                    |
| **Secreto en código fuente (hardcoded secret)**              | Contraseña, clave, token u otro secreto escrito directamente dentro del código o de un script. Es una práctica insegura porque puede terminar expuesto mediante el control de versiones, copias o registros.                                                                                      |

---

### 4.1 Una distinción especialmente importante

No confundas estos conceptos:

```text
Contraseña
    ↓
No debe almacenarse directamente
    ↓
Hash / derivación de contraseña
```

con:

```text
Dato que necesita recuperarse
    ↓
Cifrado
    ↓
Se descifra cuando existe autorización y necesidad legítima
```

Por ejemplo:

| Información                       | Mecanismo que normalmente corresponde              |
| --------------------------------- | -------------------------------------------------- |
| Contraseña de usuario             | Derivación de claves para contraseñas              |
| RFC que debe recuperarse          | Cifrado, cuando exista una justificación para ello |
| Comunicación cliente → PostgreSQL | TLS                                                |
| Respaldo de base de datos         | Cifrado del respaldo                               |
| Clave criptográfica               | Gestión segura de claves                           |

---

### 4.2 TLS y SSL no son lo mismo

Es muy común encontrar documentación que utiliza la expresión:

> "Conexión SSL"

aunque técnicamente se esté utilizando TLS.

La relación histórica es:

```text
SSL
SSL 2.0
SSL 3.0
   ↓
TLS 1.0
TLS 1.1
TLS 1.2
TLS 1.3
```

SSL quedó obsoleto y no debe utilizarse en sistemas modernos.

Por eso, durante esta práctica utilizaremos preferentemente el término **TLS**, aunque PostgreSQL y algunas herramientas continúen utilizando nombres o parámetros históricos que contienen la palabra `ssl`.

Por ejemplo:

```sql
SHOW ssl;
```

o:

```text
sslmode=require
```

El nombre del parámetro no significa que debamos utilizar el protocolo SSL antiguo.

---

### 4.3 ¿Qué protege TLS?

TLS proporciona principalmente:

#### Confidencialidad

Evita que una persona que observe el tráfico pueda interpretar directamente la información transmitida.

#### Integridad

Permite detectar modificaciones no autorizadas de los datos durante la comunicación.

#### Autenticación

Permite que el cliente pueda verificar la identidad del servidor cuando la configuración utiliza certificados y validación adecuada.

Por esta razón:

```text
TLS ≠ solamente "cifrar la conexión"
```

TLS proporciona un conjunto de mecanismos para proteger una comunicación.

---

### 4.4 ¿Qué significa `verify-full`?

Cuando un cliente PostgreSQL utiliza:

```text
sslmode=verify-full
```

no solamente solicita una conexión TLS.

También espera poder verificar:

1. que el certificado proviene de una autoridad certificadora confiable
2. que el nombre utilizado para conectarse coincide con el certificado

Por ejemplo, si el cliente se conecta mediante:

```text
db.ficlabs.com.mx
```

el certificado debe estar emitido para un nombre compatible con ese servidor.

Esto es importante porque:

> **Cifrar una conexión no es exactamente lo mismo que verificar con quién estamos estableciendo la conexión.**

---

### 4.5 ¿Qué es una clave y qué es una contraseña?

Aunque pueden parecer similares, no son necesariamente lo mismo.

Una **contraseña** normalmente es un secreto elegido o utilizado por una persona para autenticarse.

Una **clave criptográfica** es información utilizada por un algoritmo criptográfico para realizar operaciones como cifrar, descifrar, firmar o verificar.

Por ejemplo:

```text
Usuario
   │
   └── contraseña
          │
          ▼
    mecanismo de autenticación
```

Mientras que:

```text
Aplicación
   │
   └── clave criptográfica
          │
          ▼
       algoritmo
          │
          ▼
     dato protegido
```

La administración de ambos secretos requiere controles de seguridad, pero no necesariamente se administran de la misma manera.

---

### 4.6 ¿Por qué no debemos guardar secretos en GitLab?

Un repositorio de código conserva historial.

Por lo tanto, aunque posteriormente elimines una contraseña de un archivo, puede permanecer en commits anteriores.

Por ejemplo:

```text
commit 1
    ↓
configuración con contraseña
    ↓
commit 2
    ↓
se elimina la contraseña
```

La contraseña puede continuar formando parte del historial.

Por esta razón:

> **Los repositorios de código no deben utilizarse como almacén de secretos.**

En ambientes productivos se utilizan mecanismos específicos para la gestión de secretos, de acuerdo con la arquitectura de la organización.

---

### 4.7 Relación entre los conceptos

Puedes visualizar la protección de una base de datos de esta manera:

```text
                    SEGURIDAD DE LA INFORMACIÓN
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
     Datos almacenados    Comunicaciones      Credenciales
          │                   │                   │
          ▼                   ▼                   ▼
       Cifrado              TLS             Hash/derivación
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                       Gestión de claves
                              │
                              ▼
                     Protección de secretos
```

La seguridad no depende de un único mecanismo.

Una base de datos puede tener TLS correctamente configurado y seguir teniendo problemas si:

* las contraseñas están en texto claro
* los usuarios tienen privilegios excesivos
* las claves están expuestas
* los respaldos no están protegidos
* existen secretos en el código
* los datos sensibles no tienen controles adecuados

Por eso, como DBA, debes analizar la protección **de manera integral**.


---

## 5. Escenario

La empresa ficticia **Comercializadora Norte S.A. de C.V.** continúa fortaleciendo la seguridad de su base de datos.

En el laboratorio anterior se trabajó con:

* clasificación de información
* enmascaramiento
* seudonimización
* anonimización
* control de acceso
* separación de funciones
* retención de información

Ahora el equipo de administración de bases de datos ha identificado tres necesidades adicionales:

#### Necesidad 1 — Credenciales

La aplicación utiliza información de autenticación y se requiere evitar que una contraseña pueda recuperarse directamente desde la base de datos.

#### Necesidad 2 — Información sensible

Algunos datos almacenados requieren una protección adicional porque contienen información que no debería quedar disponible en texto claro para cualquier usuario que pueda consultar directamente las tablas.

#### Necesidad 3 — Comunicaciones

Los administradores y aplicaciones se conectan al servidor PostgreSQL mediante una red. La información transmitida debe estar protegida contra observación o modificación durante el tránsito.

El estudiante deberá implementar y analizar soluciones para estas tres situaciones.

---

## 6. Preparación

Utiliza la base de datos empleada en LAB-01.

Si la tabla `clientes` ya existe, verifica su estructura:

```sql
\d clientes
```

También puedes consultar:

```sql
SELECT *
FROM clientes;
```

Si necesitas crear nuevamente la tabla para esta práctica:

```sql
CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    rfc VARCHAR(13),
    edad INTEGER,
    ciudad VARCHAR(80),
    codigo_postal VARCHAR(10),
    fecha_alta DATE DEFAULT CURRENT_DATE
);
```

Verifica que la extensión `pgcrypto` esté disponible:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

Comprueba:

```sql
SELECT extname
FROM pg_extension
WHERE extname = 'pgcrypto';
```

---

## 7. Actividad 1 — Protección de credenciales

### 7.1 El problema

Supongamos que una aplicación necesita almacenar información de usuarios.

Una implementación incorrecta sería:

```sql
CREATE TABLE usuarios_insegura (
    id BIGSERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

Insertamos un usuario de prueba:

```sql
INSERT INTO usuarios_insegura (usuario, password)
VALUES ('juan', 'Password123');
```

Consulta:

```sql
SELECT *
FROM usuarios_insegura;
```

#### Pregunta

¿Qué ocurriría si una persona obtiene acceso de lectura a esta tabla?

Documenta tu respuesta en:

```text
evidencias/01-credenciales.md
```

---

### 7.2 Identificar el problema

La consulta anterior permite observar directamente la contraseña.

Esto representa una mala práctica porque una persona con acceso a la tabla puede obtener inmediatamente la credencial.

Además, almacenar contraseñas como texto claro provoca que una filtración de la base de datos pueda convertirse directamente en una filtración de credenciales.

---

### 7.3 Generar una representación no reversible

Para fines didácticos utilizaremos `pgcrypto`.

Ejemplo:

```sql
SELECT crypt(
    'Password123',
    gen_salt('bf')
);
```

Observa el resultado.

Ejecuta nuevamente:

```sql
SELECT crypt(
    'Password123',
    gen_salt('bf')
);
```

Compara los resultados.

#### Preguntas

1. ¿Son iguales?
2. Si no son iguales, ¿por qué?
3. ¿Qué función cumple `gen_salt()`?
4. ¿Qué función cumple `crypt()`?
5. ¿Esto es cifrado reversible?

---

### 7.4 Crear una tabla para credenciales protegidas

Crea:

```sql
CREATE TABLE usuarios_segura (
    id BIGSERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);
```

Inserta un usuario:

```sql
INSERT INTO usuarios_segura (usuario, password_hash)
VALUES (
    'juan',
    crypt('Password123', gen_salt('bf'))
);
```

Consulta:

```sql
SELECT *
FROM usuarios_segura;
```

Observa que ya no aparece la contraseña original.

---

### 7.5 Verificar una contraseña

Para verificar una contraseña:

```sql
SELECT
    usuario,
    password_hash = crypt('Password123', password_hash)
        AS contraseña_correcta
FROM usuarios_segura
WHERE usuario = 'juan';
```

Prueba ahora con una contraseña incorrecta:

```sql
SELECT
    usuario,
    password_hash = crypt('OtraPassword', password_hash)
        AS contraseña_correcta
FROM usuarios_segura
WHERE usuario = 'juan';
```

#### Preguntas

1. ¿Qué resultado obtuviste con la contraseña correcta?
2. ¿Qué resultado obtuviste con la contraseña incorrecta?
3. ¿Por qué no es necesario recuperar la contraseña original?
4. ¿Por qué un hash no debe confundirse con cifrado?

---

### 7.6 Consideración para aplicaciones reales

El mecanismo anterior se utiliza aquí para demostrar el concepto dentro de PostgreSQL.

En una aplicación real, la selección del algoritmo para proteger contraseñas debe realizarse considerando las recomendaciones actuales de seguridad y las capacidades del framework utilizado.

No debes implementar tu propio algoritmo de hash.

Tampoco debes:

```text
guardar contraseñas en texto claro
```

ni:

```text
cifrar contraseñas con una clave fija y almacenarlas como si fueran datos recuperables
```

---

## 8. Actividad 2 — Cifrado de información sensible

En LAB-01 se identificaron datos que pueden requerir protección adicional.

Para esta actividad utilizaremos el campo RFC como ejemplo.

### 8.1 Crear una tabla de demostración

```sql
CREATE TABLE clientes_protegidos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    rfc_cifrado BYTEA NOT NULL
);
```

Inserta un registro utilizando cifrado simétrico:

```sql
INSERT INTO clientes_protegidos (
    nombre,
    rfc_cifrado
)
VALUES (
    'Ana López',
    pgp_sym_encrypt('LOPA900101ABC', 'CLAVE-DE-PRUEBA')
);
```

Consulta:

```sql
SELECT *
FROM clientes_protegidos;
```

Observa que el RFC ya no aparece directamente.

---

### 8.2 Recuperar el dato

Utiliza:

```sql
SELECT
    id,
    nombre,
    pgp_sym_decrypt(
        rfc_cifrado,
        'CLAVE-DE-PRUEBA'
    ) AS rfc
FROM clientes_protegidos;
```

#### Preguntas

1. ¿Qué diferencia existe entre `crypt()` y `pgp_sym_encrypt()`?
2. ¿Cuál de los dos mecanismos permite recuperar el dato original?
3. ¿Qué ocurre si se utiliza una clave incorrecta?
4. ¿Qué problema de seguridad representa colocar la clave directamente en una consulta?

---

## 9. Actividad 3 — El problema de la gestión de claves

El siguiente ejemplo funciona técnicamente:

```sql
SELECT pgp_sym_decrypt(
    rfc_cifrado,
    'CLAVE-DE-PRUEBA'
)
FROM clientes_protegidos;
```

Pero existe un problema.

La clave aparece dentro del código.

Esto puede provocar exposición mediante:

* scripts
* repositorios Git
* archivos de configuración
* registros de ejecución
* capturas de pantalla
* respaldos
* documentación
* variables mal administradas

### 9.1 Identificar una mala práctica

Crea un archivo temporal:

```text
sql/ejemplo-mala-practica.sql
```

Incluye únicamente para fines demostrativos:

```sql
SELECT pgp_sym_decrypt(
    rfc_cifrado,
    'CLAVE-DE-PRUEBA'
)
FROM clientes_protegidos;
```

No debes utilizar una clave real.

Analiza el archivo y responde:

> ¿Qué ocurriría si esta clave fuera una clave utilizada realmente por una organización y el archivo se publicara en un repositorio Git?

---

### 9.2 Regla del laboratorio

**No se deben almacenar claves, contraseñas, tokens ni secretos reales en el repositorio.**

Para esta práctica únicamente se utilizarán valores ficticios.

El archivo de demostración no debe conservarse como parte de la entrega final.

---

## 10. Actividad 4 — Protección de datos durante la comunicación

Hasta este momento hemos protegido información almacenada.

Ahora analizaremos otro problema:

> ¿Qué sucede con la información mientras viaja entre el cliente y PostgreSQL?

Una consulta como:

```sql
SELECT *
FROM clientes;
```

viaja entre el cliente y el servidor.

Si la conexión no está protegida, una persona con capacidad para observar el tráfico de red podría intentar obtener información de la comunicación.

Para resolver este problema se utiliza **TLS (Transport Layer Security)**.

---

## 11. Actividad 5 — Verificar el estado de TLS en PostgreSQL

Consulta:

```sql
SHOW ssl;
```

También:

```sql
SHOW ssl_min_protocol_version;
```

Consulta el puerto:

```sql
SHOW port;
```

Y:

```sql
SHOW listen_addresses;
```

---

### 11.1 Verificar la conexión actual

Ejecuta:

```sql
SELECT
    inet_client_addr(),
    inet_client_port();
```

Ahora verifica si la sesión actual utiliza TLS:

```sql
SELECT
    ssl,
    version,
    cipher
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();
```

Analiza los resultados.

#### Preguntas

1. ¿La conexión actual utiliza TLS?
2. ¿Qué versión de TLS se está utilizando?
3. ¿Qué algoritmo de cifrado aparece?
4. ¿Qué diferencia existe entre una conexión protegida con TLS y una conexión sin TLS?

---

## 12. Actividad 6 — Conexión mediante `psql`

Si tienes acceso a `psql`, identifica primero la configuración de conexión.

Ejemplo:

```bash
psql "host=SERVIDOR port=5432 dbname=TU_BASE user=TU_USUARIO sslmode=require"
```

Sustituye:

```text
SERVIDOR
TU_BASE
TU_USUARIO
```

por los valores correspondientes a tu entorno.

Una vez conectado, ejecuta:

```sql
SELECT
    ssl,
    version,
    cipher
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();
```

---

## 13. Comprender `sslmode`

PostgreSQL proporciona diferentes modos de conexión TLS.

Los más importantes para esta práctica son:

```text
disable
prefer
require
verify-ca
verify-full
```

No todos proporcionan el mismo nivel de verificación.

#### `sslmode=require`

Solicita una conexión TLS, pero no verifica completamente la identidad del servidor.

#### `sslmode=verify-ca`

Además de utilizar TLS, verifica el certificado contra una autoridad certificadora de confianza.

#### `sslmode=verify-full`

Además de validar la autoridad certificadora, verifica que el nombre del servidor coincida con el certificado.

En un entorno real, cuando se requiere una validación fuerte de identidad, `verify-full` es el modelo que debes comprender.

---

## 14. Actividad 7 — Comparar protección en reposo y protección en tránsito

Completa la siguiente tabla:

| Situación                                     | Mecanismo apropiado | ¿Qué protege? |
| --------------------------------------------- | ------------------- | ------------- |
| Contraseña de usuario                         |                     |               |
| RFC almacenado en una tabla                   |                     |               |
| Consulta enviada desde un cliente al servidor |                     |               |
| Respaldo de una base de datos                 |                     |               |
| Clave criptográfica                           |                     |               |

Guarda la respuesta en:

```text
evidencias/07-comparacion.md
```

---

## 15. Actividad 8 — Analizar un escenario de seguridad

Considera la siguiente situación:

> Una empresa almacena los siguientes elementos:
>
> * nombre
> * correo electrónico
> * contraseña
> * RFC
> * información financiera
> * claves criptográficas
>
> La base de datos utiliza usuarios y roles correctamente.
>
> Sin embargo:
>
> * las contraseñas están almacenadas en texto claro
> * el RFC está almacenado en texto claro
> * las conexiones utilizan una configuración sin validación adecuada del servidor
> * las claves criptográficas aparecen en archivos SQL
> * los respaldos se almacenan sin protección adicional

Responde:

#### Pregunta 1

¿Cuáles son los principales riesgos?

#### Pregunta 2

¿Qué mecanismo utilizarías para cada elemento?

#### Pregunta 3

¿Cuál de los problemas consideras más crítico y por qué?

#### Pregunta 4

¿Tener correctamente configurados los usuarios y permisos elimina estos riesgos?

Justifica tu respuesta.

Guarda el análisis en:

```text
evidencias/08-analisis-escenario.md
```

---

## 16. Actividad 9 — Verificación de secretos antes de GitLab

Antes de realizar el commit, revisa todos tus archivos.

Busca expresiones como:

```text
password=
password:
passwd=
secret=
token=
api_key=
clave=
```

También busca:

```text
postgresql://
```

y revisa si contienen credenciales.

Puedes utilizar:

```bash
grep -RniE 'password|passwd|secret|token|api_key|clave' .
```

El objetivo no es demostrar que esta búsqueda sea suficiente para detectar todos los secretos.

El objetivo es desarrollar el hábito de **revisar información sensible antes de publicarla en un repositorio**.

---

## 17. Actividad 10 — Crear una política mínima de protección de claves

Crea:

```text
evidencias/10-politica-claves.md
```

Define una política de entre 5 y 10 reglas para la gestión de claves criptográficas.

Debe considerar como mínimo:

1. generación
2. almacenamiento
3. acceso
4. rotación
5. respaldo
6. revocación
7. exposición accidental
8. eliminación

Ejemplo de principio:

> Las claves criptográficas no deben almacenarse en el mismo repositorio que contiene el código o los scripts que utilizan dichas claves.

No copies únicamente el ejemplo. Formula tus propias reglas.

---

## 18. Verificación final

Antes de terminar, comprueba que puedes responder correctamente:

#### Credenciales

```text
¿Una contraseña debe cifrarse o protegerse mediante un mecanismo de derivación de claves para contraseñas?
```

#### Datos sensibles

```text
¿Qué diferencia existe entre enmascaramiento, seudonimización y cifrado?
```

#### Comunicaciones

```text
¿Qué problema resuelve TLS?
```

#### Claves

```text
¿Dónde debería almacenarse una clave criptográfica en un entorno real?
```

#### Repositorio

```text
¿Es correcto subir una contraseña o clave real a GitLab aunque el repositorio sea privado?
```

La respuesta a la última pregunta debe ser:

**No.**

Un repositorio privado reduce exposición, pero no convierte un secreto en información apropiada para almacenar dentro del código.

---

## 19. Evidencias

La entrega deberá contener como mínimo:

```text
evidencias/
├── 01-credenciales.md
├── 02-cifrado-datos.md
├── 03-gestion-claves.md
├── 04-tls.md
├── 07-comparacion.md
├── 08-analisis-escenario.md
└── 10-politica-claves.md
```

Cada evidencia debe incluir:

```text
Objetivo
Comando o procedimiento
Resultado obtenido
Análisis
Conclusión
```

Las capturas de pantalla solamente deberán utilizarse cuando aporten evidencia que no pueda demostrarse adecuadamente mediante texto o resultados de comandos.

---

## 20. Estructura del laboratorio en GitLab

Dentro del repositorio personal:

```text
dba-19706-2026-2-apellido-nombre/
│
├── README.md
│
├── unidad-02/
│   │
│   └── lab-02-cifrado-credenciales/
│       │
│       ├── README.md
│       │
│       ├── sql/
│       │   ├── 01-credenciales.sql
│       │   ├── 02-cifrado-datos.sql
│       │   └── 03-verificacion-tls.sql
│       │
│       └── evidencias/
│           ├── 01-credenciales.md
│           ├── 02-cifrado-datos.md
│           ├── 03-gestion-claves.md
│           ├── 04-tls.md
│           ├── 07-comparacion.md
│           ├── 08-analisis-escenario.md
│           └── 10-politica-claves.md
│
└── ...
```

---

## 21. Commits

Realiza commits que permitan identificar la evolución del trabajo.

Por ejemplo:

```bash
git add .
git commit -m "feat: implementa proteccion de credenciales"
```

Posteriormente:

```bash
git add .
git commit -m "feat: implementa cifrado de datos sensibles"
```

Y:

```bash
git add .
git commit -m "docs: documenta configuracion y verificacion de TLS"
```

Finalmente:

```bash
git add .
git commit -m "docs: completa evidencias del laboratorio 02"
```

No es necesario utilizar ramas ni solicitudes de integración para esta práctica.

El objetivo del control de versiones es permitir:

* identificar cuándo se realizó el trabajo
* observar su evolución
* recuperar versiones anteriores
* revisar el trabajo del estudiante
* mantener un historial técnico

---

## 22. Informe final

Dentro de:

```text
unidad-02/lab-02-cifrado-credenciales/README.md
```

incluye:

### 1. Introducción

Explica brevemente el problema de seguridad abordado.

### 2. Protección de credenciales

Explica la diferencia entre texto claro, hash y cifrado.

### 3. Protección de datos sensibles

Explica qué información protegiste y por qué.

### 4. TLS

Explica qué problema resuelve y qué verificaste en PostgreSQL.

### 5. Gestión de claves

Explica por qué las claves no deben almacenarse junto con los scripts.

### 6. Resultados

Resume los principales resultados obtenidos.

### 7. Problemas encontrados

Documenta cualquier error o dificultad técnica.

### 8. Conclusiones

Explica qué aprendiste y qué medidas aplicarías en un entorno productivo.

---

## 23. Preguntas de reflexión

Responde en tu informe:

#### 1.

¿Por qué una contraseña no debe almacenarse como texto claro?

#### 2.

¿Por qué un hash no es equivalente a un cifrado?

#### 3.

¿Por qué el cifrado de una columna no sustituye al control de acceso?

#### 4.

¿Por qué TLS no sustituye a los mecanismos de autorización de PostgreSQL?

#### 5.

¿Qué ocurriría si una organización pierde una clave utilizada para cifrar información?

#### 6.

¿Qué ocurriría si una clave criptográfica se publica accidentalmente en GitLab?

#### 7.

¿Por qué un repositorio privado no debe considerarse un almacén de secretos?

#### 8.

¿Qué diferencia existe entre proteger información almacenada y proteger información durante su transmisión?

#### 9.

¿Por qué la gestión de claves es tan importante como el algoritmo criptográfico?

#### 10.

¿Qué mecanismo adicional implementarías en una organización para proteger los respaldos de las bases de datos?

---

## 24. Evaluación

| Criterio                            | Porcentaje |
| ----------------------------------- | ---------: |
| Protección de credenciales          |        20% |
| Cifrado de información sensible     |        20% |
| Análisis y gestión de claves        |        15% |
| Configuración y verificación de TLS |        20% |
| Análisis de escenarios              |        10% |
| Evidencias y documentación          |        10% |
| Uso correcto de GitLab              |         5% |
| **Total**                           |   **100%** |

---

## 25. Criterios técnicos importantes

Para considerar la práctica correctamente realizada:

* No se deben almacenar contraseñas reales en texto claro.
* No se deben incluir claves reales en los scripts.
* Las claves utilizadas en los ejemplos deben ser exclusivamente de laboratorio.
* El estudiante debe diferenciar hash y cifrado.
* El estudiante debe diferenciar protección de datos almacenados y datos en tránsito.
* Debe verificarse el estado real de TLS en PostgreSQL.
* Las evidencias deben mostrar resultados obtenidos, no solamente comandos copiados.
* Los scripts deben poder ser revisados y ejecutados nuevamente.
* No deben existir secretos reales dentro del repositorio.

---

## 26. Relación con los siguientes laboratorios

Este laboratorio establece las bases para las siguientes prácticas de la Unidad II.

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
        │
        ▼
INT-01
Evaluación integral de seguridad
```

Los conocimientos adquiridos en este laboratorio serán utilizados posteriormente para analizar:

* auditoría de accesos
* trazabilidad
* monitoreo
* protección de respaldos
* recuperación ante desastres
* disponibilidad
* replicación
* continuidad de operación

Por esta razón, el objetivo no es memorizar comandos, sino comprender **qué riesgo se está tratando de reducir, qué mecanismo se utiliza y cuáles son sus limitaciones**.
