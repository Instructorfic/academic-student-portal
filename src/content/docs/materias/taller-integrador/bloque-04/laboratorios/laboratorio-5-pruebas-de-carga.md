---
title: "Laboratorio 5 — Pruebas de carga y análisis de capacidad"
description: "Bloque IV de Taller Integrador — medir solicitudes por segundo, tiempo de respuesta y punto de saturación con k6, y razonar la capacidad con datos."
---

## 1. Propósito

"¿Cuántos usuarios aguanta tu sistema?" Hasta hoy, la respuesta honesta
de tu equipo es "no sabemos". En este laboratorio la cambiarás por
números medidos: cuántas solicitudes por segundo atiende, con qué
tiempo de respuesta, en qué punto se satura y qué componente se rinde
primero.

Después usarás esos números, y no opiniones, para razonar sobre el
escenario de referencia de **100,000 usuarios activos potenciales**,
separando con cuidado lo que mediste de lo que propones.

> **Regla ética del laboratorio.** Solo pruebas **tu** sistema. Las
> pruebas de estrés se hacen **en tu ambiente local**, nunca contra el
> servidor compartido, ni contra el sistema de otro equipo, ni contra
> servicios de terceros (tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/)).

---

## 2. ¿Qué vamos a lograr?

```text
☐ Un modelo de carga con supuestos explícitos y un objetivo verificable (A6).
☐ Scripts de k6 versionados: humo, carga y estrés.
☐ Una prueba de humo y una de carga con umbrales.
☐ Una tabla de escalones que muestre el punto de saturación.
☐ El cuello de botella identificado con docker stats.
☐ docs/ESCALABILIDAD.md que separa lo medido, lo estimado y lo propuesto (A7).
☐ Etiqueta v0.3.0, imagen 0.3.0 publicada y CHANGELOG.
```

---

## 3. Antes de comenzar

```text
Laboratorios 3 y 4 integrados.
Ensayo local de producción del Lab 4 (paso 2) funcionando.
Usuarios de ejemplo del seeder del Bloque III (estudiante@reservafic.test).
```

```bash
git checkout main
git pull origin main
git checkout -b perf/pruebas-de-carga
mkdir -p pruebas-carga
```

Cierra programas pesados (navegadores con muchas pestañas, videollamadas):
k6 y tu sistema compartirán la misma computadora y todo lo demás
distorsiona la medición.

---

## 4. Paso 1 — Preparar un ambiente medible (10 min)

### 4.1 Más datos

Cinco equipos no representan un sistema real. En modo desarrollo
(donde están Faker y las factories), crea más:

```text
$ docker compose up -d
$ docker compose exec app php artisan tinker --execute="App\Models\Equipo::factory()->count(200)->create();"
```

Adapta la línea a una entidad de tu proyecto.

### 4.2 La imagen de producción, como en el ensayo del Lab 4

Las mediciones se hacen sobre la imagen de **producción**: la de
desarrollo tiene `APP_DEBUG=true`, el código montado y la configuración
de PHP de desarrollo, que la hacen más lenta y no representan lo que se
despliega.

```text
$ docker compose down
$ docker compose -f compose.yaml -f compose.prod.yaml up -d
$ docker compose -f compose.yaml -f compose.prod.yaml exec app php artisan optimize
```

(Con las variables de ensayo del Lab 4 en tu `.env`: `APP_IMAGE` con
tu imagen local más reciente, `DOMINIO=localhost`.)

### 4.3 Anotar dónde mides

Los resultados no significan nada sin la máquina en la que se
obtuvieron:

```text
$ docker info --format 'CPUs: {{.NCPU}}  Memoria: {{.MemTotal}}'
```

Anota también el modelo de procesador y el sistema operativo. En
Windows y macOS, Docker Desktop limita la CPU y memoria de su máquina
virtual; el comando anterior muestra lo que Docker realmente tiene.

---

## 5. Paso 2 — Modelo de carga: de 100,000 a un objetivo (A6, 15 min)

Antes de medir, decide **qué** quieres comprobar. Sigue el
razonamiento del tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/) con supuestos de **tu** dominio y
escríbelo al inicio de `docs/ESCALABILIDAD.md`:

```markdown
## Modelo de carga

| Paso | Supuesto | Justificación | Resultado |
| --- | --- | --- | --- |
| Usuarios potenciales | 100,000 | Escenario de referencia del programa (§4.4.3) | 100,000 |
| Activos en el día pico | __ % | ¿Qué día es el pico en nuestro dominio y por qué? | |
| Concentración en la hora pico | __ % | | |
| Peticiones por sesión | __ | Contamos las peticiones de una sesión típica con las herramientas del navegador | |
| RPS promedio en la hora pico | | peticiones / 3,600 s | |
| Factor de pico (minuto más intenso) | __ x | | |
| **RPS objetivo** | | | |

Objetivo verificable: atender __ RPS con p95 < __ ms y menos de 1% de errores.
```

Cada porcentaje es un **supuesto**: escríbelo así, con su razón. No
busques "el dato correcto" en Internet; lo que se evalúa es que el
razonamiento sea explícito y discutible.

Para contar las peticiones por sesión: abre tu aplicación con las
herramientas de desarrollo del navegador (pestaña Red / Network), haz
un recorrido típico de un usuario y cuenta las peticiones al servidor
(sin contar imágenes y archivos estáticos).

---

## 6. Paso 3 — Código común y prueba de humo (10 min)

Vas a ejecutar k6 como contenedor montando la carpeta `pruebas-carga`
(un bind mount, como en el Lab 1). Así los scripts pueden compartir
código.

`pruebas-carga/comun.js`:

```javascript
// Código compartido por los escenarios de k6
import http from 'k6/http';

export const BASE_URL = __ENV.BASE_URL || 'http://app';

const JSON_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

// Inicia sesión UNA vez (desde setup) y devuelve el token.
// Se hace una sola vez porque el login tiene límite de 5 intentos por minuto (Bloque III).
export function iniciarSesion() {
  const res = http.post(
    `${BASE_URL}/api/v1/login`,
    JSON.stringify({
      email: __ENV.EMAIL || 'estudiante@reservafic.test',
      password: __ENV.PASSWORD || 'password',
    }),
    { headers: JSON_HEADERS },
  );

  if (res.status !== 200) {
    throw new Error(`El login falló con estado ${res.status}: ${res.body}`);
  }
  return res.json('data.token');
}

// Cabeceras para peticiones autenticadas
export function cabeceras(token) {
  return {
    headers: Object.assign({}, JSON_HEADERS, { Authorization: `Bearer ${token}` }),
  };
}
```

`pruebas-carga/humo.js`:

```javascript
// Prueba de humo: ¿el script y el sistema funcionan? 1 usuario, 30 segundos.
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, iniciarSesion, cabeceras } from './comun.js';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate==1.0'],
  },
};

export function setup() {
  return { token: iniciarSesion() };
}

export default function (data) {
  const salud = http.get(`${BASE_URL}/up`);
  check(salud, { 'up responde 200': (r) => r.status === 200 });

  const equipos = http.get(`${BASE_URL}/api/v1/equipos`, cabeceras(data.token));
  check(equipos, {
    'equipos responde 200': (r) => r.status === 200,
    'equipos trae una lista': (r) => Array.isArray(r.json('data')),
  });

  const prestamos = http.get(`${BASE_URL}/api/v1/prestamos`, cabeceras(data.token));
  check(prestamos, { 'prestamos responde 200': (r) => r.status === 200 });

  sleep(1);
}
```

Ejecútalo, conectado a la red de Compose:

```text
$ docker run --rm --network reservafic_default \
    -v "$PWD/pruebas-carga:/scripts" \
    grafana/k6 run /scripts/humo.js
```

> En PowerShell usa `-v "${PWD}/pruebas-carga:/scripts"` y escribe todo
> en una línea. Si el montaje falla, la documentación de k6 muestra la
> alternativa de pasar un único script por la entrada estándar
> (`docker run --rm -i ... grafana/k6 run - < script.js`); en ese caso
> copia el contenido de `comun.js` dentro del script.

Revisa al final del resumen:

```text
     ✓ up responde 200
     ✓ equipos responde 200
     ✓ equipos trae una lista
     ✓ prestamos responde 200
     checks.........................: 100.00%
     http_req_failed................: 0.00%
```

Si algún `check` falla, **no sigas**: una prueba de carga sobre un
sistema que ya falla con un usuario no mide nada útil. Revisa
troubleshooting.

> **Sobre la etiqueta de la imagen.** `grafana/k6` sin etiqueta usa
> `latest`. Para que los resultados sean comparables entre integrantes,
> fijen una versión (`grafana/k6:<versión>`) tomada de Docker Hub al
> inicio del semestre (pendiente de verificación de la versión que fije
> el curso). Es la regla de versionado del tema [8. Construir nuestras propias imágenes](/materias/taller-integrador/bloque-04/08-construir-imagenes/) aplicada a una
> herramienta.

**Explica:** ¿por qué `BASE_URL` es `http://app` y no
`http://localhost`? ¿Por qué no pasa por Caddy? (Tema [3. Los cinco conceptos fundamentales](/materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales/), [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/).)
Anota que esta prueba **no mide el proxy ni HTTPS**: es una limitación
que irá en tu análisis.

---

## 7. Paso 4 — Prueba de carga: ¿cumplimos el objetivo? (10 min)

### 7.1 ¿Cuántos usuarios virtuales?

Usa la ley de Little (tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/)). En el script de abajo, cada
iteración hace en promedio 1.3 peticiones (una siempre y otra el 30% de
las veces) y dura poco más de 1 segundo (por el `sleep(1)`). Entonces
cada usuario virtual genera alrededor de 1.3 RPS:

```text
VUs necesarios ≈ RPS objetivo / 1.3
Ejemplo: 30 RPS / 1.3 ≈ 23 VUs
```

### 7.2 El script

`pruebas-carga/carga.js`:

```javascript
// Prueba de carga: la carga esperada del modelo (paso 2), con umbrales.
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, iniciarSesion, cabeceras } from './comun.js';

const VUS = Number(__ENV.VUS || 23);

export const options = {
  stages: [
    { duration: '30s', target: VUS },  // subir gradualmente
    { duration: '2m', target: VUS },   // sostener la carga esperada
    { duration: '30s', target: 0 },    // bajar
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],     // menos de 1% de errores
    http_req_duration: ['p(95)<500'],   // ajusta al objetivo de tu modelo
  },
};

export function setup() {
  return { token: iniciarSesion() };
}

export default function (data) {
  const equipos = http.get(`${BASE_URL}/api/v1/equipos`, cabeceras(data.token));
  check(equipos, { 'equipos 200': (r) => r.status === 200 });

  // 30% de las iteraciones también consultan sus préstamos
  if (Math.random() < 0.3) {
    const prestamos = http.get(`${BASE_URL}/api/v1/prestamos`, cabeceras(data.token));
    check(prestamos, { 'prestamos 200': (r) => r.status === 200 });
  }

  sleep(1);
}
```

Ajusta los endpoints y proporciones a lo que hace un usuario típico de
tu proyecto, según el recorrido que contaste en el paso 2.

### 7.3 Ejecutar observando

Abre una **segunda terminal** con:

```text
$ docker stats
```

Y en la primera:

```text
$ docker run --rm --network reservafic_default \
    -v "$PWD/pruebas-carga:/scripts" \
    -e VUS=23 \
    grafana/k6 run /scripts/carga.js
```

Durante la meseta de 2 minutos, anota la CPU y memoria de `app` y `db`.

Al final, k6 marca cada umbral como cumplido o no cumplido. Según la documentación de
k6, si algún umbral no se cumple, la prueba termina con estado de fallo
y código de salida distinto de cero.

Registra en `docs/ESCALABILIDAD.md`:

```markdown
## Prueba de carga (capacidad real demostrada)

Máquina: <CPU, núcleos, RAM, sistema operativo>
Imagen: <proyecto>:<versión>   Datos: <N registros>
Escenario: <VUs> VUs, 30 s subida + 2 min sostenidos + 30 s bajada, endpoints <...>

| Métrica | Resultado | Objetivo | ¿Cumple? |
| --- | --- | --- | --- |
| RPS (http_reqs/s) | | | |
| p95 (http_req_duration) | | | |
| Errores (http_req_failed) | | < 1% | |
| CPU de app / db (meseta) | | — | — |
```

#### Punto de control 1

```text
☐ La prueba de humo pasó todos los checks.
☐ La prueba de carga tiene resultado registrado, cumpla o no el objetivo.
☐ Puedo explicar de dónde salió el número de VUs.
```

---

## 8. Paso 5 — Prueba de estrés: buscar el punto de saturación (20 min)

Ahora la pregunta cambia: no "¿cumplimos?" sino "¿dónde nos
rompemos?". Harás **escalones**: la misma prueba con cada vez más
usuarios, un minuto cada una, anotando los resultados.

`pruebas-carga/estres.js`:

```javascript
// Prueba de estrés por escalones: se ejecuta varias veces con distinto VUS.
// SOLO contra el ambiente local (regla ética del laboratorio).
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, iniciarSesion, cabeceras } from './comun.js';

export const options = {
  vus: Number(__ENV.VUS || 10),
  duration: __ENV.DURACION || '1m',
};

export function setup() {
  return { token: iniciarSesion() };
}

export default function (data) {
  const res = http.get(`${BASE_URL}/api/v1/equipos`, cabeceras(data.token));
  check(res, { 'equipos 200': (r) => r.status === 200 });
  sleep(0.5);
}
```

No tiene umbrales a propósito: queremos ver qué pasa al romperse, no
que se detenga.

Ejecuta los escalones con una pausa de 20 segundos entre cada uno
(para que el sistema se recupere), observando `docker stats`:

```text
$ for v in 10 25 50 100 200; do \
    echo "=== $v VUs ==="; \
    docker run --rm --network reservafic_default -v "$PWD/pruebas-carga:/scripts" \
      -e VUS=$v grafana/k6 run --quiet /scripts/estres.js | grep -E "http_reqs|http_req_duration|http_req_failed"; \
    sleep 20; \
  done
```

> En PowerShell, ejecuta cada escalón por separado cambiando `-e VUS=`.
> Si tu máquina tiene pocos núcleos y ya en 100 VUs los errores pasan
> del 50%, no ejecutes el de 200.

Llena la tabla:

```markdown
## Prueba de estrés por escalones (capacidad real demostrada)

| VUs | RPS | p95 (ms) | Errores (%) | CPU app | CPU db | Observación |
| --- | --- | --- | --- | --- | --- | --- |
| 10 | | | | | | |
| 25 | | | | | | |
| 50 | | | | | | |
| 100 | | | | | | |
| 200 | | | | | | |
```

### 8.1 Graficar

En una hoja de cálculo, grafica **RPS contra VUs** y **p95 contra VUs**.
Compara la forma con el diagrama del tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/). Marca:

* El último escalón donde el RPS todavía crecía casi en proporción a
  los VUs.
* El escalón donde el RPS dejó de crecer o bajó: el **punto de
  saturación**.
* El escalón donde aparecieron errores.

Agrega la gráfica (imagen) a `docs/` y referénciala desde
`ESCALABILIDAD.md`.

### 8.2 ¿Quién se rindió primero?

Con las columnas de CPU:

| Si observaste... | El cuello de botella probable es... |
| --- | --- |
| `app` cerca del máximo de CPU disponible y `db` baja | La aplicación (PHP/Apache) |
| `db` alta y `app` moderada | La base de datos |
| Ninguno al máximo, pero el p95 sube y hay errores de conexión | Límites de procesos o conexiones (Apache, PostgreSQL) |
| k6 mismo con CPU muy alta | La máquina de pruebas: la medición no es confiable en ese escalón |

> **Cómo leer el porcentaje de CPU.** En `docker stats`, 100% equivale a
> un núcleo completo. Con 8 núcleos, el máximo es cercano a 800%.

**Explica** en `ESCALABILIDAD.md` tu conclusión y la evidencia que la
sostiene. Recuerda la pregunta del Lab 2 (paso 9.3): ¿tu health check
habría detectado esta degradación?

#### Punto de control 2

```text
☐ Tabla de escalones completa con CPU de app y db.
☐ Punto de saturación identificado (o explicación de por qué no se alcanzó).
☐ Cuello de botella argumentado con datos.
```

---

## 9. Paso 6 — Análisis de capacidad: `docs/ESCALABILIDAD.md` (A7, estudio independiente)

Con tus mediciones, completa el documento. La estructura obligatoria
separa los **cuatro niveles de capacidad**
(tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/)):

```markdown
# Escalabilidad de <proyecto>

## 1. Modelo de carga
(paso 2)

## 2. Lo implementado
Arquitectura actual: servicios, imágenes, versiones, recursos de la máquina.

## 3. Capacidad real demostrada
(pasos 4 y 5: tablas, gráfica, cuello de botella)

## 4. Capacidad estimada mediante pruebas
Comparación entre el punto de saturación medido y el RPS objetivo.
Margen disponible. Qué supuestos hacen falta para extrapolar.

## 5. Arquitectura propuesta para el escenario de 100,000 usuarios (capacidad objetivo del diseño)
Responder, para nuestro proyecto:
- ¿Qué componentes se convertirían en cuello de botella?
- ¿Qué ocurriría con la base de datos?
- ¿Qué ocurriría con las sesiones?
- ¿Qué ocurriría con las APIs?
- ¿Qué componentes podrían escalar horizontalmente? ¿Son sin estado?
- ¿Dónde usaríamos caché? ¿Con qué vigencia?
- ¿Qué componentes requerirían balanceo?
- ¿Qué métricas deberían monitorearse?
- ¿Qué cambios requeriría la arquitectura?
Diagrama de la arquitectura propuesta.

## 6. Capacidad teórica
Razonamientos sin datos, marcados como tales.

## 7. Limitaciones del prototipo
Lo que NO se puede concluir de nuestras pruebas.
```

Las preguntas de la sección 5 son las de la planeación del curso. Usa el tema [12. Escalabilidad y orquestación](/materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion/)
para las estrategias y el ejemplo del §17.6 como referencia de tono.

**Regla de oro:** cada afirmación numérica lleva su nivel. "Soporta
100,000 usuarios" sin nivel es un error de evaluación; "la arquitectura
propuesta está diseñada para..." con la estrategia y los supuestos es
lo esperado.

---

## 10. Paso 7 — Cerrar el incremento: `v0.3.0` (15 min)

### 10.1 Regresar al ambiente de desarrollo

Quita las variables de ensayo de tu `.env` y:

```text
$ docker compose -f compose.yaml -f compose.prod.yaml down
$ docker compose up -d
```

### 10.2 Integrar y etiquetar

```bash
git add pruebas-carga docs/ESCALABILIDAD.md docs/*.png
git commit -m "perf: agregar pruebas de carga con k6 y análisis de capacidad"
git push -u origin perf/pruebas-de-carga
```

Después de integrar el merge request, actualiza `CHANGELOG.md`:

```markdown
## [0.3.0] - AAAA-MM-DD
### Added
- Dockerfile multietapa e imagen publicada en el Container Registry de GitLab.
- Ambiente reproducible con Docker Compose (desarrollo y producción).
- Despliegue con proxy inverso Caddy y HTTPS; runbook en docs/DESPLIEGUE.md.
- Pruebas de carga con k6 y análisis de capacidad en docs/ESCALABILIDAD.md.
### Changed
- Logs de la aplicación por stderr en contenedores.
- Laravel confía en el proxy inverso para generar URL https.
```

```bash
git tag -a v0.3.0 -m "Bloque IV: sistema contenerizado, desplegado y medido"
git push origin v0.3.0
```

El pipeline publicará la imagen `0.3.0`. Ruta A: actualiza el servidor
a `0.3.0` siguiendo **su propio runbook** (`docs/DESPLIEGUE.md`), con
un integrante que no lo haya hecho antes.

### 10.3 Prueba de humo contra el servidor (ruta A, opcional)

Una prueba de humo (1 VU, 30 s) contra el servidor es aceptable: es
carga mínima. **Avisa al docente antes.**

```text
$ docker run --rm -v "$PWD/pruebas-carga:/scripts" \
    -e BASE_URL=https://<tu-dominio> -e EMAIL=<usuario> -e PASSWORD=<contraseña> \
    grafana/k6 run /scripts/humo.js
```

Compara el p95 con el local. La diferencia incluye la red, el proxy y
HTTPS: anótala en las limitaciones. **No ejecutes `carga.js` ni
`estres.js` contra el servidor.**

> No escribas la contraseña real en el historial compartido: usa un
> usuario de prueba creado para esto y elimínalo después.

---

## 11. Troubleshooting

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `El login falló con estado 401` | Usuario o contraseña del seeder distintos | Revisa el seeder de tu proyecto o pasa `-e EMAIL= -e PASSWORD=` |
| `El login falló con estado 429` | Ejecutaste muchas pruebas seguidas: límite de login (5 por minuto) | Espera un minuto entre ejecuciones |
| `dial tcp: lookup app ... no such host` | k6 no está en la red de Compose o la red tiene otro nombre | `docker network ls`; usa `--network <proyecto>_default` |
| `connection refused` a `localhost` | Dentro del contenedor de k6, `localhost` es k6 | `BASE_URL=http://app` |
| `open /scripts/humo.js: no such file` | El montaje no apunta a la carpeta correcta | Ejecuta desde la raíz del proyecto; en Windows revisa la ruta |
| Muchos `429` durante la carga | Tu proyecto tiene limitación de tasa en la API | Es un hallazgo válido: documéntalo; para medir capacidad, prueba con un límite mayor solo en el ensayo local |
| `p95` muy alto incluso con 1 VU | Ambiente de desarrollo (`APP_DEBUG=true`) o sin `optimize` | Paso 4.2 |
| Errores 500 al subir VUs | Algo se agotó (conexiones, memoria) | `docker compose logs app` durante la prueba: es información para el análisis, no un error del laboratorio |
| Resultados muy distintos entre integrantes | Máquinas distintas | Es esperable: por eso se anota la máquina (paso 4.3) |

---

## 12. Evidencia del laboratorio

```text
☐ pruebas-carga/comun.js, humo.js, carga.js y estres.js en el repositorio.
☐ docs/ESCALABILIDAD.md con modelo de carga, resultados de carga, tabla de escalones, gráfica, cuello de botella y las siete secciones.
☐ Cada afirmación de capacidad indica su nivel.
☐ CHANGELOG con [0.3.0], etiqueta v0.3.0 e imagen 0.3.0 en el registry.
☐ Ruta A: servidor actualizado a 0.3.0 por un integrante distinto, siguiendo el runbook.
```

---

## 13. Reflexión del equipo

1. ¿Qué les sorprendió más de los resultados?
2. ¿Su objetivo del modelo de carga era realista para su máquina? ¿Y
   para el escenario de 100,000 usuarios?
3. ¿Qué afirmación de su análisis les costó más clasificar en uno de
   los cuatro niveles?
4. Si tuvieran una semana más, ¿qué cambiarían primero en el sistema
   para mejorar el punto de saturación, y cómo comprobarían que
   funcionó?

---

## 14. Reto adicional (opcional)

1. **Escalar en la misma máquina.** Con el ensayo local, ejecuta
   `docker compose -f compose.yaml -f compose.prod.yaml up -d --scale app=3`
   y repite un escalón cerca de la saturación. Antes, **predice**: si
   las tres instancias comparten los mismos núcleos de tu laptop, ¿debe
   mejorar el RPS? Explica el resultado. (Nota: Compose resuelve el
   nombre `app` hacia varias instancias, pero cómo reparte las
   peticiones cada cliente no está garantizado; documenta lo que
   observes.)
2. **Caché.** Guarda en caché durante 60 segundos la respuesta del
   listado de tu entidad más consultada y repite la prueba de estrés.
   Compara. Discute qué datos **no** deberían ir en caché.
3. **Escrituras.** Agrega a un escenario la creación de registros
   (por ejemplo, préstamos en horarios distintos) y observa qué pasa con
   la base de datos y con la regla de traslape del Bloque III bajo
   concurrencia.
4. **Índices.** Revisa con `EXPLAIN` la consulta del endpoint más
   lento y propone un índice. Mide antes y después.

---

## 15. Criterio de finalización

```text
☐ El equipo puede decir, con números medidos, cuántas RPS atiende su sistema en su máquina y con qué p95.
☐ El punto de saturación y el cuello de botella están argumentados con datos.
☐ docs/ESCALABILIDAD.md separa lo medido, lo estimado, lo propuesto y lo teórico, e incluye limitaciones.
☐ Existe la etiqueta v0.3.0 y su imagen en el registry.
```

---

## 16. Cierre del bloque

Al comenzar el Bloque IV su sistema funcionaba en algunas laptops.
Ahora está empaquetado en una imagen versionada, se levanta con un
comando, corre en un servidor con HTTPS y sus límites están medidos.
Preparen la Sprint Review con una demostración en vivo:

1. Un clon limpio levantado con `docker compose up -d`.
2. La URL pública (o el ensayo local con HTTPS).
3. Una actualización de versión en vivo.
4. La gráfica de saturación y la propuesta de arquitectura para 100,000
   usuarios, con sus niveles de capacidad.

En el Bloque V profundizarás en la integración final, la operación y el
monitoreo del sistema que acaban de desplegar.
