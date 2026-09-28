---
title: "Referencia DBA MongoDB"
description: "Gestión de Seguridad y Desempeño de Bases de Datos — Guía de consulta de comandos de MongoDB 7 y mongosh para administración, seguridad, control de acceso, diagnóstico, rendimiento y respaldo."
---

> Guía de consulta rápida para la materia **Gestión de Seguridad y Desempeño de Bases de Datos**.

**Motor:** MongoDB 7
**Cliente:** `mongosh`
**Enfoque:** administración, seguridad, control de acceso, diagnóstico, rendimiento, mantenimiento y continuidad.

---

## 1. Propósito

Este documento reúne comandos básicos para trabajar con MongoDB como administrador de bases de datos.

Incluye:

* conexión
* bases de datos
* colecciones
* documentos
* consultas
* actualización
* eliminación
* agregaciones
* índices
* análisis de consultas
* usuarios y roles
* monitoreo
* configuración
* seguridad
* backup
* restauración
* hardening

---

## 2. Conectarse

### Conexión local

```bash
mongosh
```

Indicar servidor:

```bash
mongosh "mongodb://localhost:27017"
```

Con autenticación:

```bash
mongosh "mongodb://usuario:password@localhost:27017/admin"
```

> Nunca colocar contraseñas reales directamente en comandos, scripts o repositorios.

---

## 3. Comandos básicos de `mongosh`

### Mostrar bases de datos

```javascript
show dbs
```

### Seleccionar base

```javascript
use sistema
```

### Mostrar base actual

```javascript
db
```

### Mostrar colecciones

```javascript
show collections
```

### Obtener ayuda

```javascript
help
```

---

## 4. Bases de datos

MongoDB crea una base cuando se almacenan datos en ella.

Seleccionar:

```javascript
use sistema
```

Crear implícitamente:

```javascript
db.usuarios.insertOne({
    nombre: "Ana",
    correo: "ana@example.com"
})
```

Eliminar una base:

```javascript
db.dropDatabase()
```

> **Precaución:** Esta operación elimina la base actual. Debe utilizarse solamente en ambientes controlados.

---

## 5. Colecciones

### Crear colección

```javascript
db.createCollection("usuarios")
```

### Listar colecciones

```javascript
show collections
```

### Eliminar colección

```javascript
db.usuarios.drop()
```

> **Precaución:** Elimina la colección y sus documentos.

---

## 6. Insertar documentos

### Un documento

```javascript
db.usuarios.insertOne({
    nombre: "Ana López",
    correo: "ana@example.com",
    activo: true
})
```

### Varios documentos

```javascript
db.usuarios.insertMany([
    {
        nombre: "Ana",
        correo: "ana@example.com",
        activo: true
    },
    {
        nombre: "Luis",
        correo: "luis@example.com",
        activo: true
    }
])
```

---

## 7. Consultar documentos

### Todos

```javascript
db.usuarios.find()
```

### Primer documento

```javascript
db.usuarios.findOne()
```

### Filtro

```javascript
db.usuarios.find({
    activo: true
})
```

### Por correo

```javascript
db.usuarios.find({
    correo: "ana@example.com"
})
```

---

## 8. Proyección

Mostrar únicamente algunos campos:

```javascript
db.usuarios.find(
    { activo: true },
    { nombre: 1, correo: 1 }
)
```

Excluir un campo:

```javascript
db.usuarios.find(
    {},
    { password: 0 }
)
```

Esto es especialmente importante cuando existen datos sensibles.

---

## 9. Operadores de consulta

### Mayor que

```javascript
db.usuarios.find({
    edad: { $gt: 18 }
})
```

### Menor que

```javascript
db.usuarios.find({
    edad: { $lt: 18 }
})
```

### Mayor o igual

```javascript
db.usuarios.find({
    edad: { $gte: 18 }
})
```

### Menor o igual

```javascript
db.usuarios.find({
    edad: { $lte: 18 }
})
```

### Diferente

```javascript
db.usuarios.find({
    estado: { $ne: "inactivo" }
})
```

### IN

```javascript
db.usuarios.find({
    estado: {
        $in: ["activo", "pendiente"]
    }
})
```

### AND

```javascript
db.usuarios.find({
    activo: true,
    edad: { $gte: 18 }
})
```

### OR

```javascript
db.usuarios.find({
    $or: [
        { rol: "admin" },
        { rol: "supervisor" }
    ]
})
```

---

## 10. Actualizar documentos

### Actualizar uno

```javascript
db.usuarios.updateOne(
    { correo: "ana@example.com" },
    {
        $set: {
            activo: false
        }
    }
)
```

### Actualizar varios

```javascript
db.usuarios.updateMany(
    { activo: false },
    {
        $set: {
            estado: "inactivo"
        }
    }
)
```

### Incrementar

```javascript
db.productos.updateOne(
    { nombre: "Laptop" },
    {
        $inc: {
            existencia: 1
        }
    }
)
```

---

## 11. Eliminar documentos

### Uno

```javascript
db.usuarios.deleteOne({
    correo: "ana@example.com"
})
```

### Varios

```javascript
db.usuarios.deleteMany({
    activo: false
})
```

> **Precaución:** `deleteMany({})` puede eliminar todos los documentos de una colección.

Nunca ejecutar operaciones destructivas sin verificar primero el filtro.

---

## 12. Ordenamiento

```javascript
db.usuarios.find().sort({
    nombre: 1
})
```

Descendente:

```javascript
db.usuarios.find().sort({
    nombre: -1
})
```

---

## 13. Limitar resultados

```javascript
db.usuarios.find().limit(10)
```

---

## 14. Contar documentos

```javascript
db.usuarios.countDocuments()
```

Con filtro:

```javascript
db.usuarios.countDocuments({
    activo: true
})
```

---

## 15. Agregaciones

MongoDB utiliza el pipeline de agregación para procesar documentos.

Ejemplo:

```javascript
db.ventas.aggregate([
    {
        $match: {
            estado: "completada"
        }
    },
    {
        $group: {
            _id: "$cliente",
            total: {
                $sum: "$importe"
            }
        }
    }
])
```

Operadores comunes:

```text
$match
$group
$project
$sort
$limit
$lookup
$unwind
$count
```

---

## 16. Índices

### Crear índice

```javascript
db.usuarios.createIndex({
    correo: 1
})
```

### Índice único

```javascript
db.usuarios.createIndex(
    {
        correo: 1
    },
    {
        unique: true
    }
)
```

### Listar índices

```javascript
db.usuarios.getIndexes()
```

### Eliminar índice

```javascript
db.usuarios.dropIndex("correo_1")
```

Los índices pueden mejorar las consultas, pero tienen costos de:

* almacenamiento
* memoria
* inserciones
* actualizaciones
* mantenimiento

---

## 17. Analizar una consulta

```javascript
db.usuarios.find({
    correo: "ana@example.com"
}).explain("executionStats")
```

La información permite analizar aspectos como:

* documentos examinados
* claves examinadas
* documentos devueltos
* uso de índices
* tiempo de ejecución

---

## 18. Conceptos importantes del `explain`

Al analizar una consulta es útil observar:

```text
executionTimeMillis
totalDocsExamined
totalKeysExamined
nReturned
winningPlan
```

Una consulta que devuelve pocos documentos pero examina una gran cantidad puede requerir revisión.

---

## 19. Usuarios

Crear usuario con permisos de lectura:

```javascript
use sistema

db.createUser({
    user: "app_readonly",
    pwd: "CAMBIAR_ESTA_CONTRASEÑA",
    roles: [
        {
            role: "read",
            db: "sistema"
        }
    ]
})
```

Usuario de lectura y escritura:

```javascript
db.createUser({
    user: "app_web",
    pwd: "CAMBIAR_ESTA_CONTRASEÑA",
    roles: [
        {
            role: "readWrite",
            db: "sistema"
        }
    ]
})
```

> La cuenta de aplicación debe tener únicamente los privilegios que realmente necesita.

---

## 20. Consultar usuarios

```javascript
db.getUsers()
```

Consultar roles:

```javascript
db.getRoles()
```

---

## 21. Eliminar usuario

```javascript
db.dropUser("app_web")
```

> Verificar dependencias antes de eliminar cuentas.

---

## 22. Roles

MongoDB proporciona roles integrados, entre ellos:

```text
read
readWrite
dbAdmin
userAdmin
clusterMonitor
```

Los roles administrativos deben asignarse solamente cuando sean necesarios.

---

## 23. Mínimo privilegio

Ejemplo conceptual:

```text
Aplicación
    ↓
Usuario app_web
    ↓
readWrite sobre una base específica
    ↓
Colecciones necesarias
```

Evitar:

```text
Aplicación
    ↓
Usuario administrador
    ↓
Acceso a todo MongoDB
```

El segundo modelo aumenta el impacto potencial de:

* credenciales comprometidas
* errores de programación
* inyección NoSQL
* abuso de privilegios

---

## 24. Información del servidor

```javascript
db.serverStatus()
```

Puede proporcionar información sobre:

* conexiones
* operaciones
* memoria
* actividad
* estadísticas internas

---

## 25. Estadísticas de una base

```javascript
db.stats()
```

Estadísticas de una colección:

```javascript
db.usuarios.stats()
```

Estas herramientas son útiles para diagnóstico y análisis de capacidad.

---

## 26. Operaciones actuales

```javascript
db.currentOp()
```

Puede utilizarse para investigar actividad en curso.

> El acceso a determinada información depende de los privilegios del usuario y de la configuración del servidor.

---

## 27. Configuración de red

Una consideración importante es la dirección en la que MongoDB escucha conexiones.

Ejemplo conceptual:

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```

Una configuración que limite las interfaces de escucha reduce la exposición de red.

No debe asumirse que MongoDB debe estar disponible directamente desde Internet.

---

## 28. Autenticación

Una instalación segura debe analizar:

```text
Autenticación
+
Autorización
+
Cifrado
+
Restricción de red
```

La autenticación verifica:

> ¿Quién eres?

La autorización determina:

> ¿Qué puedes hacer?

---

## 29. TLS

TLS protege las comunicaciones entre clientes y MongoDB.

Debe considerarse para:

* aplicaciones
* administradores
* réplicas
* conexiones remotas

La configuración concreta depende de la arquitectura y certificados utilizados.

---

## 30. Backup con `mongodump`

Ejemplo:

```bash
mongodump \
  --uri="mongodb://usuario:password@localhost:27017/sistema" \
  --out=/backup/sistema
```

También puede realizarse sobre una instancia completa según la estrategia de respaldo.

> No colocar credenciales reales en scripts o repositorios.

---

## 31. Restauración con `mongorestore`

```bash
mongorestore \
  --uri="mongodb://usuario:password@localhost:27017" \
  /backup/sistema
```

Antes de restaurar en producción:

```text
1. Validar respaldo
2. Verificar destino
3. Verificar compatibilidad
4. Restaurar
5. Validar datos
6. Validar aplicación
7. Documentar
```

---

## 32. `mongodump` no es lo mismo que `mongoexport`

`mongodump` está orientado al respaldo lógico de MongoDB.

`mongoexport` está orientado principalmente al intercambio de datos en formatos como JSON o CSV.

No deben considerarse equivalentes.

---

## 33. Diagnóstico básico

Ante una consulta lenta:

```text
1. Identificar la consulta
2. Ejecutar explain
3. Revisar documentos examinados
4. Revisar índices
5. Revisar cardinalidad
6. Revisar tamaño de datos
7. Revisar carga del servidor
8. Evaluar el diseño de la consulta
```

---

## 34. Checklist de seguridad MongoDB

#### Autenticación

* [ ] Activar autenticación
* [ ] Crear usuarios específicos
* [ ] Evitar cuentas administrativas para aplicaciones
* [ ] Revisar usuarios periódicamente

#### Autorización

* [ ] Aplicar mínimo privilegio
* [ ] Revisar roles
* [ ] Eliminar permisos innecesarios

#### Red

* [ ] Limitar `bindIp`
* [ ] No exponer MongoDB directamente a Internet
* [ ] Filtrar conexiones mediante firewall
* [ ] Utilizar redes privadas cuando sea posible

#### Cifrado

* [ ] Utilizar TLS cuando corresponda
* [ ] Proteger credenciales
* [ ] Proteger respaldos

#### Mantenimiento

* [ ] Revisar índices
* [ ] Analizar consultas
* [ ] Revisar conexiones
* [ ] Revisar capacidad
* [ ] Revisar registros

#### Continuidad

* [ ] Realizar backups
* [ ] Proteger backups
* [ ] Probar restauraciones
* [ ] Definir RPO
* [ ] Definir RTO

---

## 35. Operaciones peligrosas

Especial atención a:

```javascript
db.dropDatabase()
```

```javascript
db.coleccion.drop()
```

```javascript
db.coleccion.deleteMany({})
```

```javascript
db.coleccion.updateMany(
    {},
    ...
)
```

También deben revisarse cuidadosamente los cambios de:

```text
roles
usuarios
bindIp
puertos
TLS
firewall
configuración
```

---

## 36. Comandos que conviene memorizar

```text
show dbs
use nombre
show collections
db
```

```javascript
db.coleccion.find()
db.coleccion.findOne()
db.coleccion.insertOne()
db.coleccion.insertMany()
db.coleccion.updateOne()
db.coleccion.updateMany()
db.coleccion.deleteOne()
db.coleccion.deleteMany()
```

```javascript
db.coleccion.createIndex()
db.coleccion.getIndexes()
db.coleccion.explain()
```

```javascript
db.createUser()
db.getUsers()
db.getRoles()
db.dropUser()
```

```javascript
db.serverStatus()
db.stats()
db.currentOp()
```

---

## 37. Modelo mental del DBA MongoDB

La administración no consiste en memorizar comandos.

El proceso debe ser:

```text
OBSERVAR
   ↓
ENTENDER
   ↓
EVALUAR RIESGO
   ↓
CAMBIAR
   ↓
VERIFICAR
   ↓
DOCUMENTAR
```

Un DBA debe pensar simultáneamente en:

```text
Datos
Seguridad
Rendimiento
Disponibilidad
Recuperación
```
