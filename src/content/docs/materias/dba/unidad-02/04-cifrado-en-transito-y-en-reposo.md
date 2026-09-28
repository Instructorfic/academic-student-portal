---
title: "4. Cifrado en tránsito y en reposo"
description: "Unidad 2 de DBA — fundamentos de criptografía, cifrado simétrico/asimétrico, hash, TLS en PostgreSQL y MongoDB, pgcrypto, y la asimetría entre motores."
---

Clasificar y enmascarar protege el dato en uso. Pero mientras viaja por
la red, o mientras está guardado en disco, necesita otra capa distinta:
cifrado.

## ¿Qué es la criptografía?

La **criptografía** es la disciplina que diseña técnicas matemáticas para
proteger información frente a quien no debería tener acceso a ella.

| Técnica | Qué logra |
| --- | --- |
| **Cifrado** | Confidencialidad reversible con la clave correcta. |
| **Hash** | Integridad y verificación sin guardar el dato original. |
| **Firma digital** | Autenticidad e integridad usando un par de llaves. |

La **codificación** (como Base64) **no es criptografía**: no busca
proteger nada, solo cambia la representación del dato — lo vemos más
abajo con un ejemplo.

> Referencia. Ferguson, Schneier y Kohno, *Cryptography Engineering*
> (2010), cap. 1.

## Cifrado simétrico y asimétrico

| Tipo | Cómo funciona | Dónde lo usa esta unidad |
| --- | --- | --- |
| **Simétrico** | Misma llave para cifrar y descifrar. Rápido. | `pgcrypto` en PostgreSQL. |
| **Asimétrico** | Llave pública para cifrar, llave privada para descifrar. | Es la base de TLS. |

> Referencia. NIST FIPS 197, *Advanced Encryption Standard*, RFC 8446,
> TLS 1.3.

### Simétrico y asimétrico juntos: cómo funciona HTTPS

| Momento | Tipo de cifrado | Qué ocurre |
| --- | --- | --- |
| Al conectar | Asimétrico | Navegador y servidor usan llave pública y privada **solo** para acordar una llave nueva. |
| Durante la sesión | Simétrico | Esa llave compartida cifra todo el tráfico real, porque es mucho más rápida. |

Lo asimétrico es lento pero no necesita compartir un secreto de
antemano. Lo simétrico es rápido pero necesita que ambos ya tengan la
misma llave. HTTPS usa primero uno y después el otro.

### Cómo se ve esto en la práctica: SSH por el puerto 22

```bash
$ ssh -i ~/.ssh/id_ed25519 estudiante@servidor.uas.edu.mx -p 22
```

Nunca se escribió ni se transmitió una contraseña. El servidor solo
comprobó que la computadora respondiera al reto con la llave privada que
coincide con la pública en `authorized_keys`.

> Referencia. OpenSSH manual, "How Public Key Authentication Works".

## Ejemplo guiado: cifrado simétrico

```bash
$ echo -n "numero-de-tarjeta-de-ejemplo" | \
  openssl enc -aes-256-cbc -pbkdf2 -a -salt -pass pass:clave-de-prueba
U2FsdGVkX1+3f8K9pQ2mVx7bT4nO5rWePq8LxAYbZ9w=
```

El algoritmo AES-256-CBC es **público**. Solo la clave es secreta. Este es
el **principio de Kerckhoffs**: la seguridad debe residir en la clave,
nunca en ocultar el algoritmo.

> Referencia. Kerckhoffs, A. (1883). "La cryptographie militaire".
> *Journal des sciences militaires*.

## Hash: por qué SHA-256 no basta para contraseñas

```sql
SELECT digest('numero-de-tarjeta-de-ejemplo', 'sha256');
```

No existe un comando para revertir un hash: solo se vuelve a calcular y
se compara.

| Algoritmo | Por qué sí o no sirve para contraseñas |
| --- | --- |
| SHA-256 solo | Rápido *a propósito* — un atacante puede probar miles de millones de combinaciones por segundo. |
| bcrypt, scrypt o Argon2 | Deliberadamente lentos, con *salt* integrado. |

```sql
SELECT crypt('clave-de-usuario', gen_salt('bf'));
```

> Referencia. OWASP *Password Storage Cheat Sheet*, NIST SP 800-63B,
> secc. 5.1.1.2.

## Codificación con Base64 no es cifrado

```bash
$ echo -n "numero-de-tarjeta-de-ejemplo" | base64
bnVtZXJvLWRlLXRhcmpldGEtZGUtZWplbXBsbw==
```

No se usó ninguna clave para decodificarlo. Eso es exactamente lo que
significa que Base64 no protege nada — cualquiera puede revertirlo sin
ningún secreto.

## Cifrado en tránsito

| | |
| --- | --- |
| Qué significa | Proteger los datos mientras viajan por la red, entre cliente y servidor. |
| Cómo se protege | TLS con certificados válidos, deshabilitando versiones antiguas de TLS. |
| En qué beneficia | Previene interceptación y protege credenciales que viajan por la conexión. |
| Ventaja | Transparente para la aplicación una vez configurado, estándar ampliamente soportado. |
| Desventaja | No protege el dato una vez que llega a disco o memoria. Requiere gestionar certificados. |

### Ejemplo guiado: cifrar la conexión (PostgreSQL)

```bash
openssl req -new -x509 -days 365 -nodes -text \
  -out server.crt -keyout server.key -subj "/CN=servidor-demo"
chmod 600 server.key
```

```text
# postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

```bash
psql "host=servidor.uas.edu.mx dbname=tienda_demo user=lector sslmode=verify-full sslrootcert=ca.crt"
```

`sslmode=verify-full` no solo cifra: también valida que el certificado
del servidor corresponda al *host* al que te conectas. `sslmode=require`
cifra pero no valida identidad — útil solo para entender la diferencia,
no para producción (REF-U2-03).

### Ejemplo guiado: cifrar la conexión (MongoDB)

```yaml
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
```

```bash
mongosh --tls --tlsCertificateKeyFile client.pem --host servidor.uas.edu.mx
```

Mismo principio que en PostgreSQL: `requireTLS` obliga a que **toda**
conexión esté cifrada, no solo a las que el cliente decida iniciar
cifradas (REF-U2-06).

## Cifrado en reposo

| | |
| --- | --- |
| Qué significa | Proteger los datos mientras están almacenados: en disco, respaldos o *snapshots*. |
| Cómo se protege | Cifrado a nivel de columna con `pgcrypto`, cifrado de disco completo, cifrado a nivel de aplicación. |
| En qué beneficia | Protege contra robo físico del disco, acceso al sistema de archivos, respaldos filtrados. |
| Ventaja | Protege incluso si el control de acceso del motor falla o es evadido. |
| Desventaja | La gestión de llaves añade complejidad real. Cifrar una columna dificulta indexar o buscar sobre ese campo. |

El cifrado **no sustituye** al control de acceso del [tema 2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/):
alguien con credenciales válidas puede leer datos cifrados igual que
datos sin cifrar.

> Referencia. ISO/IEC 27002:2022, secc. 8.24, "Use of cryptography".

### Ejemplo guiado: `pgcrypto`, cifrado en reposo (PostgreSQL)

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE clientes ADD COLUMN rfc_cifrado BYTEA;
UPDATE clientes SET rfc_cifrado = pgp_sym_encrypt(rfc, '<REDACTED-KEY>');
SELECT pgp_sym_decrypt(rfc_cifrado, '<REDACTED-KEY>') FROM clientes;
```

```text
 ABCD123456XYZ
```

(REF-U2-04)

## Cifrado en MongoDB: una asimetría real entre motores

PostgreSQL cifra dentro del motor con `pgcrypto`. Una MongoDB Community
típica no tiene ese equivalente nativo y transparente: el cifrado
automático por campo requiere Enterprise o Atlas.

```bash
$ echo -n "ABCD123456XYZ" | \
  openssl enc -aes-256-cbc -pbkdf2 -a -salt -pass pass:<REDACTED-KEY>
```

```javascript
db.clientes.updateOne(
  { nombre: "Persona Ejemplo" },
  { $set: { rfc_cifrado: "U2FsdGVkX1+7h2M..." } }
)
```

El motor nunca ve el valor original de `rfc`: la aplicación cifra antes
de escribir. La versión explícita de cifrado por campo existe en
Community desde la versión 4.2, pero exige *key vault*, proveedor KMS y
la librería `libmongocrypt` — demasiada infraestructura para un
laboratorio. Esto tiene una implicación directa: quién es responsable de
gestionar la llave cambia según el motor — dentro de la base de datos en
PostgreSQL, fuera de ella (a nivel de aplicación) en MongoDB Community.

## Manejo seguro de credenciales

Una llave de cifrado, igual que una contraseña, **nunca debe** guardarse
en texto plano dentro del código de la aplicación ni en el propio
repositorio de código. La gestión de llaves con un servicio externo
(gestor de secretos o KMS) excede el alcance de esta unidad. Aquí se
presenta solo como principio.

> **Actividad 5 — Cifrado.** Habilita TLS en PostgreSQL y cifra `rfc` con
> `pgcrypto`. En MongoDB, cifra el mismo campo a nivel de aplicación con
> `openssl` antes de insertarlo. Documenta, con la tabla de ventajas y
> desventajas vista aquí, por qué esta asimetría entre motores existe.
> Instrucciones completas en la
> [Actividad 5](/materias/dba/unidad-02/actividades/actividad-5/), guía
> técnica en el
> [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/), Parte C y D.
>
> ⚠️ **Advertencia.** En los laboratorios de esta unidad nunca uses
> contraseñas ni llaves reales. Usa siempre valores de ejemplo, y nunca
> los incluyas en texto plano en un entregable o repositorio público.

## Referencias de este tema

- The PostgreSQL Global Development Group, *Secure TCP/IP Connections
  with SSL* (REF-U2-03).
- The PostgreSQL Global Development Group, *pgcrypto* (REF-U2-04).
- MongoDB, Inc., *Configure MongoDB Instances for TLS/SSL Encryption*
  (REF-U2-06).

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente.

## Qué sigue

Ya protegimos `clientes` técnicamente: acceso, clasificación, cifrado.
Falta conectar cada control con la obligación legal que lo exige.
Continúa con
[5. Privacidad y cumplimiento normativo](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/).
