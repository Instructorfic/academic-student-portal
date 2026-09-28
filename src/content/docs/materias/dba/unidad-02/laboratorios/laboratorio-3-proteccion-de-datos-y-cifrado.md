---
title: "Laboratorio 3 — Protección de datos sensibles y cifrado, en PostgreSQL y MongoDB"
description: "Unidad 2 de DBA — laboratorio evaluado: enmascaramiento, seudonimización, anonimización, TLS y cifrado en reposo."
---

<span class="badge-estado">Evaluado</span>

**SGBD:** PostgreSQL 16 y MongoDB 7. **Tecnología de apoyo:** contenedores
Docker, `openssl` en el equipo anfitrión.

> Este laboratorio integra dos actividades: primero se clasifica y
> protege el dato (Actividad 4), después se cifra en tránsito y en
> reposo (Actividad 5), en los dos motores de la materia.

## Objetivo del laboratorio

Clasificar columnas de `clientes`, aplicar enmascaramiento,
seudonimización y anonimización en PostgreSQL y en MongoDB, y configurar
cifrado en tránsito (TLS) y en reposo, tanto con `pgcrypto` en
PostgreSQL como con cifrado de aplicación en MongoDB.

## Prerrequisitos

* Enmascaramiento, seudonimización, anonimización — ver [3. Protección de datos sensibles](/materias/dba/unidad-02/03-proteccion-de-datos-sensibles/).
* Cifrado en tránsito y en reposo — ver [4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/).
* Haber completado el [Laboratorio 1](/materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql/) y el [Laboratorio 2](/materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso/).
* `openssl` en el equipo anfitrión (verifica con `openssl version`).

## Entorno

Se reutilizan `dba-postgres-u2` y `dba-mongo-u2`. No se crea ningún
contenedor nuevo para las Partes A y B.

⚠️ **Advertencia de seguridad.** La llave de cifrado que uses es un valor
de práctica. Nunca la dejes en texto plano en un entregable compartido, y
nunca reutilices una llave de práctica como si fuera real.

## Preparación

```bash
docker ps | grep dba-postgres-u2
docker ps | grep dba-mongo-u2
```

Si alguno no aparece, inícialo o vuelve a crearlo según el Laboratorio 1.

## Procedimiento

### Parte A — Clasificación, enmascaramiento, seudonimización y anonimización (PostgreSQL)

**Paso 1.** Amplía la tabla `clientes` ya existente:

```bash
docker exec -it dba-postgres-u2 psql -U postgres -d practica
```

```sql
ALTER TABLE clientes ADD COLUMN correo TEXT;
ALTER TABLE clientes ADD COLUMN rfc TEXT;
ALTER TABLE clientes ADD COLUMN edad INT;

UPDATE clientes SET correo = 'ejemplo@correo-demo.test', rfc = 'ABCD123456XYZ', edad = 23 WHERE id = 1;

INSERT INTO clientes (nombre, clave_acceso, correo, rfc, edad) VALUES
  ('Persona Dos', 'clave2', 'persona2@correo-demo.test', 'WXYZ987654ABC', 31),
  ('Persona Tres', 'clave3', 'persona3@correo-demo.test', 'LMNO112233DEF', 45);
```

**Paso 2.** Clasifica cada columna (documento aparte, no una consulta):
`nombre`, `correo`, `telefono` si la agregaste, son dato personal según
LFPDPPP Art. 3 fracción V. `rfc` es dato personal identificativo, no cae
en la lista de sensibles del Art. 3 fracción VI a menos que se combine
con otros datos. Si tu tabla llegara a incluir salud u origen étnico, ahí
sí sería dato sensible.

**Paso 3, enmascaramiento:**

```sql
SELECT nombre,
       CONCAT('****', RIGHT(rfc, 4)) AS rfc_enmascarado,
       CONCAT(LEFT(correo, 2), '*****', SUBSTRING(correo FROM POSITION('@' IN correo))) AS correo_enmascarado
FROM clientes;
```

**Qué deberías ver.** Para la primera fila: `****6XYZ` y
`ej*****@correo-demo.test`.

**Paso 4, seudonimización:**

```sql
CREATE TABLE mapa_seudonimos (
  id_seudonimo TEXT PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES clientes(id)
);
INSERT INTO mapa_seudonimos VALUES ('SEUDO-0001', 1);
```

```sql
SELECT c.nombre, c.rfc
FROM clientes c
JOIN mapa_seudonimos m ON m.cliente_id = c.id
WHERE m.id_seudonimo = 'SEUDO-0001';
```

**Qué deberías ver.** `Persona Ejemplo | ABCD123456XYZ`. Si revocas el
acceso de `lector` a `mapa_seudonimos`
(`REVOKE SELECT ON mapa_seudonimos FROM lector;`), ese rol ya no puede
hacer la reversión, aunque siga viendo `clientes` normalmente.

**Paso 5, anonimización:**

```sql
SELECT CASE WHEN edad BETWEEN 18 AND 30 THEN '18-30'
            WHEN edad BETWEEN 31 AND 45 THEN '31-45'
            ELSE '46+' END AS rango_edad, COUNT(*) AS total
FROM clientes GROUP BY rango_edad;
```

**Qué deberías ver.** Ningún nombre ni identificador aparece, solo un
conteo por rango.

### Parte B — Clasificación, enmascaramiento, seudonimización y anonimización (MongoDB)

```bash
docker exec -it dba-mongo-u2 mongosh -u admin -p <REDACTED> --authenticationDatabase admin
```

```javascript
use practica
db.clientes.updateOne({ nombre: "usuario_demo" },
  { $set: { correo: "ejemplo@correo-demo.test", rfc: "ABCD123456XYZ", edad: 23 } })
```

Enmascaramiento:

```javascript
db.clientes.aggregate([
  { $project: { nombre: 1,
      correo_enmascarado: { $concat: [
        { $substrBytes: ["$correo", 0, 2] }, "*****",
        { $substrBytes: ["$correo", { $indexOfBytes: ["$correo", "@"] }, -1] }
      ]}
  }}
])
```

Seudonimización:

```javascript
db.mapa_seudonimos.insertOne({ id_seudonimo: "SEUDO-0001", cliente_ref: db.clientes.findOne({ nombre: "usuario_demo" })._id })
```

Anonimización:

```javascript
db.clientes.aggregate([
  { $bucket: { groupBy: "$edad", boundaries: [18, 31, 46, 120], default: "otros", output: { total: { $sum: 1 } } } }
])
```

**Qué deberías ver.** Los tres resultados deben ser conceptualmente
equivalentes a los de la Parte A: el correo enmascarado con el mismo
patrón, la seudonimización reversible solo vía `mapa_seudonimos`, y la
anonimización sin ningún identificador visible.

### Parte C — Cifrado en tránsito (PostgreSQL y MongoDB)

**PostgreSQL:**

```sql
SHOW ssl;   -- estado "antes"
```

```bash
openssl req -new -x509 -days 365 -nodes -text \
  -out server.crt -keyout server.key -subj "/CN=localhost"
chmod 600 server.key

docker cp server.crt dba-postgres-u2:/var/lib/postgresql/data/server.crt
docker cp server.key dba-postgres-u2:/var/lib/postgresql/data/server.key
docker exec dba-postgres-u2 chown postgres:postgres /var/lib/postgresql/data/server.crt /var/lib/postgresql/data/server.key
docker exec dba-postgres-u2 chmod 600 /var/lib/postgresql/data/server.key
```

```sql
ALTER SYSTEM SET ssl = on;
SELECT pg_reload_conf();
```

```bash
psql "host=localhost port=5432 dbname=practica user=postgres sslmode=require"
```

**Qué deberías ver.** `SHOW ssl;` pasa de `off` a `on`, y `\conninfo`
muestra `SSL connection (protocol: TLSv1.3, ...)`.

**MongoDB.**

> **Por qué esto necesita un contenedor nuevo.** `dba-mongo-u2` ya tiene
> un `mongod` corriendo como proceso principal (`PID 1`), ocupando el
> puerto 27017 y el directorio de datos. TLS en MongoDB se activa con
> banderas al **arrancar** el proceso — no hay forma de "recargarlo" en
> caliente como `pg_reload_conf()` en PostgreSQL. Por eso el certificado
> se monta en un contenedor **nuevo y desechable**, creado ya con las
> banderas de TLS desde `docker run`. `dba-mongo-u2` (con los datos de
> `practica`) no se toca y se sigue usando, sin TLS, en la Parte D.

```bash
openssl req -new -x509 -days 365 -nodes -text \
  -out mongo.crt -keyout mongo.key -subj "/CN=localhost"
cat mongo.key mongo.crt > mongo.pem
```

```bash
docker run --name dba-mongo-u2-tls -p 27018:27017 \
  -v "$(pwd)/mongo.pem:/etc/ssl/mongo.pem:ro" \
  -d mongo:7 --tlsMode requireTLS \
  --tlsCertificateKeyFile /etc/ssl/mongo.pem \
  --tlsCAFile /etc/ssl/mongo.pem \
  --tlsAllowConnectionsWithoutCertificates
```

`--tlsCAFile` es obligatorio a partir de MongoDB 7: el servidor exige una
cadena de confianza explícita aunque no vayas a pedir certificado de
cliente. Como el certificado es autofirmado, se reutiliza el mismo
archivo como su propia cadena de confianza. `--tlsAllowConnectionsWithoutCertificates`
evita exigir un certificado de cliente (fuera del alcance de esta
unidad).

**Intento sin TLS (debe fallar):**

```bash
docker exec dba-mongo-u2-tls mongosh --quiet --eval "db.runCommand({ping:1})"
```

**Intento con TLS (debe funcionar):**

```bash
docker exec -it dba-mongo-u2-tls mongosh --tls --tlsCertificateKeyFile /etc/ssl/mongo.pem --tlsAllowInvalidCertificates
```

**Qué deberías ver.** Sin `--tls`, `mongosh` no completa la conexión
(`MongoServerSelectionError`, conexión cerrada). Con las banderas `--tls`
la conexión se establece y `db.runCommand({ping:1})` devuelve `{ ok: 1 }`.

Al terminar esta parte, elimina el contenedor desechable — no se
reutiliza en el resto de la unidad:

```bash
docker rm -f dba-mongo-u2-tls
rm mongo.pem
```

### Parte D — Cifrado en reposo (PostgreSQL con pgcrypto, MongoDB con cifrado de aplicación)

**PostgreSQL:**

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE clientes ADD COLUMN rfc_cifrado BYTEA;
UPDATE clientes SET rfc_cifrado = pgp_sym_encrypt(rfc, '<REDACTED-KEY>');
SELECT rfc_cifrado FROM clientes;   -- binario ilegible
SELECT pgp_sym_decrypt(rfc_cifrado, '<REDACTED-KEY>') FROM clientes;
```

**Qué deberías ver.** El valor almacenado es un binario no legible, y
solo se recupera el texto original con la llave correcta.

**MongoDB:**

```bash
echo -n "ABCD123456XYZ" | openssl enc -aes-256-cbc -pbkdf2 -a -salt -pass pass:<REDACTED-KEY>
```

```javascript
db.clientes.updateOne({ nombre: "usuario_demo" }, { $set: { rfc_cifrado: "U2FsdGVkX1..." } })
```

**Qué deberías ver.** El documento en MongoDB nunca contiene el `rfc` en
texto plano una vez agregado `rfc_cifrado`. Documenta por qué este paso
ocurrió en el equipo anfitrión con `openssl` y no dentro del motor, a
diferencia de PostgreSQL — ver
[4. Cifrado](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/),
"Una asimetría real entre motores".

## Verificación

| Verificación | Resultado esperado |
| --- | --- |
| Enmascaramiento en ambos motores | Mismo patrón de salida |
| Reversión vía mapa de seudónimos, ambos motores | Recupera el dato original |
| Generalización de edad, ambos motores | Sin identificador visible |
| `SHOW ssl;` antes/después | `off` → `on` |
| Conexión TLS al contenedor dedicado de MongoDB | Exitosa solo con las banderas TLS |
| `pgp_sym_decrypt` con llave correcta | Devuelve el valor original |
| `pgp_sym_decrypt` con llave incorrecta | Error de descifrado |

## Problemas frecuentes

| Problema | Posible causa | Verificación | Solución |
| --- | --- | --- | --- |
| `openssl: command not found` | No instalado en el anfitrión | `openssl version` | Instalar antes de la Parte C |
| `docker cp` falla | Archivos no generados en el directorio actual | `ls server.crt server.key` | Repetir la generación en el mismo directorio |
| `mongod` no arranca con TLS | Falta `--tlsCAFile`, o ruta del `.pem` incorrecta | `docker logs dba-mongo-u2-tls` | Verificar que ambas banderas (`--tlsCertificateKeyFile` y `--tlsCAFile`) apunten al mismo archivo montado |
| `pgp_sym_decrypt` no da error con llave incorrecta | Comportamiento posible según los bytes, no siempre falla explícito | Repetir con la llave exacta del cifrado | Verificar carácter por carácter |

## Evidencia mínima

* Tabla de clasificación de columnas y justificación (Paso 2)
* Enmascaramiento, seudonimización y anonimización, en los dos motores, con resultado de cada consulta
* Estado de TLS antes/después, en los dos motores
* Cifrado en reposo con `pgcrypto`, y con cifrado de aplicación en MongoDB, con evidencia de que el valor almacenado no es legible sin la llave

## Reflexión

* ¿Por qué el enmascaramiento no es seudonimización en sentido estricto?
* Si `mapa_seudonimos` tuviera los mismos permisos que `clientes`, ¿seguiría teniendo sentido distinguir seudonimización de no hacer nada?
* En la anonimización, si un grupo tuviera una sola persona, ¿seguiría siendo anonimización real?
* ¿Qué escenario protege el cifrado en tránsito que el cifrado en reposo no protege, y viceversa?

## Limpieza

```bash
docker rm -f dba-postgres-u2 dba-mongo-u2
rm -f server.crt server.key mongo.crt mongo.key mongo.pem
```

Conserva los contenedores si vas a continuar con el Laboratorio 4 usando el mismo motor.

## Relación con la actividad de la unidad

Ejecución técnica conjunta de las
[Actividad 4](/materias/dba/unidad-02/actividades/actividad-4/) y
[Actividad 5](/materias/dba/unidad-02/actividades/actividad-5/). La
gestión de llaves con un servicio externo (KMS/HSM) excede el alcance de
esta unidad.
