---
title: "3. Protección de datos sensibles"
description: "Unidad 2 de DBA — clasificación legal de datos personales y sensibles, enmascaramiento, seudonimización y anonimización, en PostgreSQL y MongoDB."
---

Ya decidimos quién puede acceder a `clientes`. Pero incluso un usuario
autorizado no debería ver ciertos campos en texto claro para cualquier
tarea — antes de proteger un dato, hay que clasificarlo.

## Clasificación de datos

La Ley Federal de Protección de Datos Personales en Posesión de los
Particulares (LFPDPPP) no usa "sensible" como adjetivo informal: lo
define en su artículo 3. Esa definición determina qué protección exige
la ley.

| Categoría | Definición | Ejemplo en `clientes` |
| --- | --- | --- |
| **Dato personal** | Cualquier información concerniente a una persona física identificada o identificable (LFPDPPP Art. 3, fracción V). | `nombre`, `correo`, `telefono`, `rfc`. |
| **Dato sensible** | Datos personales que afecten la esfera más íntima del titular, o cuya utilización indebida pueda dar origen a discriminación o riesgo grave (LFPDPPP Art. 3, fracción VI). | Ninguna columna de `clientes` cae aquí — ver la lista exacta abajo. |

La LFPDPPP enumera de forma expresa qué cuenta como sensible: origen
racial o étnico, estado de salud presente y futuro, información
genética, creencias religiosas filosóficas y morales, afiliación
sindical, opiniones políticas, preferencia sexual, y datos biométricos.

Un dato puede ser personal, identificar a alguien, y **no** caer en esa
lista — sigue exigiendo aviso de privacidad y los principios rectores del
[tema 5](/materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo/),
solo que no requiere el régimen reforzado del Art. 9. Un dato **no** es
sensible por ser privado: es sensible porque su filtración puede derivar
en discriminación o riesgo grave para la persona.

### Caso real: la CLABE bancaria

La Suprema Corte de Justicia de la Nación resolvió, en el amparo directo
48/2017, que la CLABE bancaria es dato personal — identifica a una
persona de forma única — pero **no** es dato sensible, porque no revela
ningún aspecto de la lista del Art. 3, fracción VI.

La consecuencia práctica del Art. 9 es real: tratar un dato sensible
exige consentimiento expreso y **por escrito** del titular, no tácito, y
justificación explícita de por qué se necesita esa base de datos. Un
dato no sensible puede, en ciertos casos, tratarse con consentimiento
tácito.

### Marco de referencia internacional

ISO/IEC 29100 define **PII** (*Personally Identifiable Information*)
como cualquier información que pueda usarse para identificar al titular
o que esté vinculada directa o indirectamente a él — la misma lógica
detrás de "dato personal" en la ley mexicana, sin el nivel adicional de
"sensible".

> Referencia. LFPDPPP Art. 3, fracciones V y VI; LFPDPPP Art. 9; SCJN,
> Amparo Directo 48/2017; ISO/IEC 29100.

Una vez clasificados, existen tres técnicas para proteger los datos
personales sin eliminarlos por completo. No son sinónimos, y confundirlas
es el error conceptual más frecuente de esta unidad.

## Enmascaramiento (*data masking*)

| | |
| --- | --- |
| Definición | Oculta parte del valor. No hay mecanismo formal de reversión. |
| Dónde se usa | Ambientes de desarrollo y pruebas, demos, soporte técnico, capacitación. |
| Qué logra | Reduce la exposición del dato real sin cambiar su formato — útil para pruebas funcionales. |
| Ventaja | Rápido, conserva el formato del dato original, no requiere gestión de llaves. |
| Desventaja | No reduce obligaciones legales por sí solo. No es una garantía criptográfica formal. |
| Buena práctica | Enmascarar de forma consistente — el mismo valor de entrada da el mismo resultado, para no romper relaciones en pruebas. Nunca usarlo como único control en producción. |

**Ejemplo guiado (PostgreSQL y MongoDB):**

```sql
SELECT nombre, CONCAT('****', RIGHT(rfc, 4)) AS rfc_enmascarado
FROM clientes;
```

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

```text
Persona Ejemplo | ****6XYZ
Persona Ejemplo | es*****@correo-demo.test
```

> Referencia. ISO/IEC 27002:2022, secc. 8.11, "Data masking".

## Seudonimización

| | |
| --- | --- |
| Definición | Reversible con una llave o mapa separado. |
| Dónde se usa | Análisis interno, investigación, reproducir un incidente con datos reales sin exponer identidad a todo el equipo. |
| Qué logra | Separa el identificador del resto del registro; permite trazabilidad controlada. |
| Ventaja | Permite análisis longitudinal sin exponer identidad directamente. Sigue siendo operativamente útil. |
| Desventaja | Sigue siendo dato personal ante la ley. El mapa de reversión es un punto único de fallo. |
| Buena práctica | El mapa de reversión debe tener control de acceso más estricto que el propio dato seudonimizado — reutiliza el [control de acceso del tema 2](/materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos/). |

**Ejemplo guiado (PostgreSQL y MongoDB):**

```sql
CREATE TABLE mapa_seudonimos (
  id_seudonimo TEXT PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES clientes(id)
);
INSERT INTO mapa_seudonimos VALUES ('SEUDO-0001', 1);
```

```javascript
db.mapa_seudonimos.insertOne({
  id_seudonimo: "SEUDO-0001",
  cliente_ref: ObjectId("...")
})
```

La reversión depende de una tabla o colección **separada**, nunca del
documento en `clientes` mismo.

## Anonimización

| | |
| --- | --- |
| Definición | Irreversible, sin relación recuperable con el original. |
| Dónde se usa | Datasets abiertos, reportes públicos, estadísticas agregadas, compartir con terceros. |
| Qué logra | El dato deja de ser dato personal ante la ley, una vez verdaderamente anonimizado. |
| Ventaja | Máxima protección. Libera de buena parte de las obligaciones de tratamiento. |
| Desventaja | Pierde detalle individual. Riesgo de re-identificación al combinar cuasi-identificadores. |
| Buena práctica | Usar un tamaño mínimo de grupo razonable, revisar cuasi-identificadores en conjunto, documentar el método. |

**Ejemplo guiado — generalización (PostgreSQL y MongoDB):**

```sql
SELECT CASE WHEN edad BETWEEN 18 AND 30 THEN '18-30'
            WHEN edad BETWEEN 31 AND 45 THEN '31-45'
            ELSE '46+' END AS rango_edad, COUNT(*) AS total
FROM clientes GROUP BY rango_edad;
```

```javascript
db.clientes.aggregate([
  { $bucket: { groupBy: "$edad", boundaries: [18, 31, 46, 120],
      default: "otros", output: { total: { $sum: 1 } } } }
])
```

Nota lo que desapareció: ya no existe una fila por persona, solo un
conteo agregado por rango. Un grupo con `total: 1` **sigue siendo**
identificable por descarte — exactamente el riesgo que el tamaño mínimo
de grupo busca acotar.

> Referencia. Sweeney, L. (2002). "k-Anonymity". *International Journal
> on Uncertainty, Fuzziness and Knowledge-Based Systems*, 10(5), 557–570.

## Comparativa completa

| Técnica | Reversible | Ventaja principal | Desventaja principal | Caso de uso típico |
| --- | --- | --- | --- | --- |
| Enmascaramiento | No hay mecanismo formal | Rápido, conserva formato | No reduce obligaciones legales por sí solo | Demos, desarrollo, soporte |
| Seudonimización | Sí, con llave separada | Permite análisis y trazabilidad | Sigue siendo dato personal ante la ley | Investigación interna, reproducir incidentes |
| Anonimización | No, irreversible | Deja de ser dato personal | Pierde detalle, riesgo de re-identificación combinada | Datasets abiertos, reportes públicos |

> **Regla práctica.** Si en algún momento vas a necesitar recuperar el
> dato original, no es anonimización — como mucho es seudonimización. Si
> el dato se va a publicar o compartir fuera del control de tu
> organización, el enmascaramiento no es suficiente — se necesita
> anonimización real.

Finalmente, los datos no deben conservarse indefinidamente: la
**retención** debe tener un plazo definido, y al final de ese plazo debe
existir un procedimiento de **eliminación segura** (que el dato realmente
deje de ser recuperable, no solo "invisible" para la aplicación).

> Referencia técnica complementaria. ISO/IEC 20889:2018. NIST SP 800-188,
> "De-Identifying Government Datasets: Techniques and Governance"
> (REF-U2-14) — cataloga generalización, supresión de identificadores y
> datos sintéticos como técnicas de des-identificación.

> **Actividad 4 — Clasificación y protección.** Clasifica las columnas de
> `clientes`. Aplica enmascaramiento en PostgreSQL y MongoDB, construye
> seudonimización en ambos motores, y anonimiza por rangos con `GROUP BY`
> y con `$bucket`. Para cada técnica, justifica cuál usarías en cada uno
> de los tres casos de uso de la tabla comparativa. Instrucciones
> completas en la
> [Actividad 4](/materias/dba/unidad-02/actividades/actividad-4/), guía
> técnica en el
> [Laboratorio 3](/materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado/), Parte A y B.

## Referencias de este tema

- LFPDPPP Art. 3 (fracciones V y VI) y Art. 9 (REF-U2-09).
- ISO/IEC 27002:2022, secc. 8.11 "Data masking".
- ISO/IEC 20889:2018; NIST SP 800-188 (REF-U2-14).

Ver [Referencias de la unidad](/materias/dba/unidad-02/referencias/) para
la ficha completa de cada fuente.

## Qué sigue

Clasificar y enmascarar protege el dato **en uso**. Pero mientras viaja
por la red, o mientras está guardado en disco, necesita otra capa
distinta: cifrado. Continúa con
[4. Cifrado en tránsito y en reposo](/materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo/).
