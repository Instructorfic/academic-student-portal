---
title: "5. Patrones de diseño"
description: "Bloque II de Taller Integrador — concepto de patrón de diseño, tres familias, y siete ejemplos con su caso de uso, ventajas y desventajas."
---

## ¿Qué es un patrón de diseño?

Un **patrón de diseño** (*design pattern*) es una solución con nombre a
un problema de diseño que se repite. Tiene tres partes:

```text
Problema  → qué situación lo provoca
Contexto  → bajo qué condiciones aplica
Solución  → cómo se resuelve, de forma general, no una implementación específica
```

Un patrón de diseño no es una decoración para el código: es una
solución ya probada a un problema que ya se repitió muchas veces antes
que en tu proyecto.

## Tres familias

| Familia | Resuelve | Ejemplo típico |
| --- | --- | --- |
| Creacional | Cómo se crean objetos, sin exponer el detalle de construcción | Factory, Singleton |
| Estructural | Cómo se organizan y relacionan clases y objetos | Repository, Adapter, Facade |
| De comportamiento | Cómo se comunican y reparten responsabilidad los objetos | Strategy, Observer |

## La pregunta correcta

Un patrón no siempre es la mejor opción: aplicarlo donde no hace falta
agrega complejidad sin beneficio. La pregunta correcta **no** es "¿qué
patrón puedo usar?". Es **"¿qué problema tengo, y qué patrón lo
resuelve?"**.

| Si tu problema es... | Considera... | Familia |
| --- | --- | --- |
| Crear distintos tipos de un mismo objeto según una condición (por ejemplo, distintos tipos de notificación) | Factory | Creacional |
| Desacoplar la lógica de negocio del acceso a datos | Repository | Estructural |
| Adaptar una librería externa a la interfaz que tu proyecto espera | Adapter | Estructural |
| Elegir entre varios algoritmos o reglas intercambiables (por ejemplo, distintas formas de calcular un costo o una prioridad) | Strategy | De comportamiento |
| Notificar a varias partes del sistema cuando algo cambia | Observer | De comportamiento |

## Ejemplos por familia: caso de uso, ventajas y desventajas

Los siguientes siete patrones son un punto de partida — no la lista
completa del catálogo original (Gamma, Helm, Johnson y Vlissides
documentan 23) — elegidos porque resuelven problemas que aparecen con
frecuencia en un proyecto del tamaño del tuyo.

### Creacionales

#### Factory Method

| | |
| --- | --- |
| **Problema que resuelve** | Necesitas crear distintos tipos de un mismo objeto según una condición, sin que el código que los usa tenga que conocer cada clase concreta |
| **Caso de uso** | Un sistema que debe crear distintos tipos de notificación (correo, SMS, push) según la preferencia del usuario, o distintos tipos de reporte (PDF, Excel, HTML) a partir de los mismos datos |
| **Ventajas** | Desacopla el código que necesita el objeto de las clases concretas que lo construyen; agregar un tipo nuevo (por ejemplo, notificación por WhatsApp) no obliga a modificar el código que ya funciona, solo a agregar una fábrica nueva |
| **Desventajas** | Puede generar muchas clases pequeñas (una fábrica por tipo) si se aplica a problemas con pocas variantes; agrega una capa de indirección que no siempre se justifica para dos o tres tipos fijos que nunca van a crecer |

**Implementación en ReservaFIC.** Cuando se aprueba un préstamo, hay que
notificar al estudiante por el canal que haya elegido (correo, SMS o
push), sin que el código que aprueba el préstamo tenga que saber cómo
se envía cada tipo de notificación:

```php
// app/Notificaciones/Notificador.php
interface Notificador
{
    public function enviar(Prestamo $prestamo): void;
}
```

```php
// app/Notificaciones/NotificadorCorreo.php
class NotificadorCorreo implements Notificador
{
    public function enviar(Prestamo $prestamo): void
    {
        Mail::to($prestamo->estudiante->correo)
            ->send(new PrestamoAprobado($prestamo));
    }
}
```

```php
// app/Notificaciones/NotificadorFactory.php
class NotificadorFactory
{
    public static function crear(string $canal): Notificador
    {
        return match ($canal) {
            'correo' => new NotificadorCorreo(),
            'sms' => new NotificadorSms(),
            'push' => new NotificadorPush(),
            default => throw new \InvalidArgumentException("Canal no soportado: {$canal}"),
        };
    }
}
```

```php
// Uso, por ejemplo dentro de PrestamoService
$notificador = NotificadorFactory::crear($prestamo->estudiante->canal_preferido);
$notificador->enviar($prestamo);
```

El `PrestamoService` nunca escribe `new NotificadorCorreo()` ni conoce
las clases concretas: solo conoce la interfaz `Notificador` y le pide a
la fábrica que le entregue la implementación correcta. Agregar un canal
nuevo (por ejemplo, WhatsApp) significa agregar una clase y un caso al
`match` de la fábrica — no tocar `PrestamoService`.

#### Singleton

| | |
| --- | --- |
| **Problema que resuelve** | Garantizar que exista una única instancia de una clase en toda la aplicación, y un punto de acceso global a ella |
| **Caso de uso** | Una configuración compartida que se lee una sola vez y se reutiliza en toda la aplicación, o una conexión a un recurso que no tiene sentido duplicar |
| **Ventajas** | Evita crear múltiples instancias costosas de crear o que deben mantenerse sincronizadas; controla el acceso a un recurso compartido |
| **Desventajas** | Introduce estado global oculto, lo que dificulta las pruebas unitarias (el resultado de una prueba puede depender del estado que dejó otra); es fácil de sobreusar hasta convertirlo en un "objeto todopoderoso" que termina conociendo demasiado sobre el resto del sistema — en Laravel, buena parte de lo que "se sentiría" como Singleton ya lo resuelve el contenedor de servicios del framework, sin que necesites implementarlo tú mismo |

**Implementación en ReservaFIC.** El número máximo de préstamos activos
que puede tener un estudiante al mismo tiempo es una regla que se
consulta desde varios lugares del sistema (al aprobar un préstamo, al
mostrar el formulario, al generar reportes) y que debe leerse una sola
vez, no releerse de la base de datos cada vez:

```php
// app/Configuracion/ConfiguracionPrestamos.php
class ConfiguracionPrestamos
{
    private static ?ConfiguracionPrestamos $instancia = null;

    private int $maximoPrestamosActivos;

    private function __construct()
    {
        $this->maximoPrestamosActivos = config('reservafic.maximo_prestamos_activos', 3);
    }

    public static function obtener(): self
    {
        if (self::$instancia === null) {
            self::$instancia = new self();
        }

        return self::$instancia;
    }

    public function maximoPrestamosActivos(): int
    {
        return $this->maximoPrestamosActivos;
    }
}
```

```php
// Uso, por ejemplo dentro de PrestamoService
if ($prestamosActivos >= ConfiguracionPrestamos::obtener()->maximoPrestamosActivos()) {
    throw new LimiteDePrestamosExcedidoException();
}
```

El constructor es `private`: nadie puede escribir
`new ConfiguracionPrestamos()` desde fuera de la clase, por lo que la
única forma de obtener la instancia es `ConfiguracionPrestamos::obtener()`
— y esa llamada siempre devuelve la misma instancia, ya construida.

> **Alternativa en Laravel.** Para este caso concreto (un valor de
> configuración), Laravel ya resuelve el problema con `config()` y con
> *singletons* registrados en el contenedor de servicios
> (`$this->app->singleton(...)` en un *service provider*) — no
> necesitas escribir la clase de arriba en un proyecto real. Se muestra
> aquí para que entiendas qué problema resuelve el patrón por dentro,
> incluso cuando el framework ya te lo da resuelto.

### Estructurales

#### Repository — modelo con ReservaFIC

**El problema.** El `PrestamoService` documentado en
[4. Arquitectura de software](/materias/taller-integrador/bloque-02/04-arquitectura-de-software/)
llama directamente a la consulta de base de datos. Si mañana cambian de
motor de base de datos, o si quieren probar el Service sin tocar la
base de datos real, tienen que modificar el Service.

**El patrón.** Repository (estructural): separa el Service de los
detalles de cómo se accede a los datos. Se define una interfaz que
declara qué operaciones necesita el Service (por ejemplo, "existe un
conflicto de horario" y "crear un préstamo"), y una clase concreta que
implementa esa interfaz usando el motor de base de datos elegido. El
`Service` ya no sabe qué motor de base de datos existe por debajo — solo
conoce la interfaz.

| | |
| --- | --- |
| **Caso de uso** | Desacoplar la lógica de negocio (el Service) de los detalles de cómo se accede a los datos (Eloquent, otra base de datos, incluso una API externa) |
| **Ventajas** | El Service se puede probar sin una base de datos real, sustituyendo la interfaz por una implementación de prueba; cambiar de motor de persistencia no obliga a tocar la lógica de negocio |
| **Desventajas** | Agrega una capa adicional (interfaz + implementación) que, para un CRUD simple sin lógica de negocio real, puede ser más estructura de la que el problema necesita |

#### Adapter

| | |
| --- | --- |
| **Problema que resuelve** | Dos interfaces incompatibles necesitan trabajar juntas: tienes una clase o librería ya existente cuya interfaz no coincide con la que tu código espera |
| **Caso de uso** | Integrar una librería externa de pagos o de envío de correo cuya forma de llamarse no coincide con la interfaz que ya usa tu `Service` |
| **Ventajas** | Permite reutilizar código o librerías externas sin modificarlas; aísla el resto de tu proyecto de los detalles de una API externa específica |
| **Desventajas** | Agrega una capa de indirección adicional; si tienes que adaptar muchas librerías distintas, el número de adaptadores puede crecer y volverse difícil de mantener |

**Implementación en ReservaFIC.** Retomando el `NotificadorSms` del
ejemplo de Factory Method: la librería externa para enviar SMS tiene su
propia interfaz (`sendMessage`), distinta de la interfaz `Notificador`
que ya usa el resto del sistema (`enviar`). El Adapter conecta ambas
sin modificar la librería externa:

```php
// Librería externa — no la controla el equipo, no se debe modificar
class ClienteSmsExterno
{
    public function sendMessage(string $to, string $body): array
    {
        // Lógica propia de la librería del proveedor de SMS
    }
}
```

```php
// app/Notificaciones/NotificadorSms.php
class NotificadorSms implements Notificador
{
    public function __construct(
        private ClienteSmsExterno $cliente
    ) {}

    public function enviar(Prestamo $prestamo): void
    {
        $this->cliente->sendMessage(
            to: $prestamo->estudiante->telefono,
            body: "Tu préstamo de {$prestamo->equipo->nombre} fue aprobado."
        );
    }
}
```

`NotificadorSms` es el adaptador: por fuera cumple la interfaz
`Notificador` que espera `NotificadorFactory` (sección de Factory
Method), y por dentro traduce esa llamada al método `sendMessage` de la
librería externa. Si el equipo cambia de proveedor de SMS más adelante,
solo se reescribe este adaptador — el resto del sistema sigue
llamando a `enviar()` sin enterarse del cambio.

#### Facade

| | |
| --- | --- |
| **Problema que resuelve** | Un subsistema tiene varias clases que colaboran entre sí de forma compleja, y el código que las usa no debería necesitar conocer esa complejidad |
| **Caso de uso** | Exponer una sola clase `ReporteService` que internamente coordina varias clases especializadas en generar PDF, Excel y HTML, para que el controlador solo llame a un método |
| **Ventajas** | Simplifica el uso del subsistema desde fuera; reduce el acoplamiento entre el código cliente y los detalles internos del subsistema |
| **Desventajas** | Si la fachada empieza a acumular demasiada lógica propia (no solo coordinación), puede convertirse en un "God Object" que concentra responsabilidades que deberían seguir separadas |

**Implementación en ReservaFIC.** El administrador de laboratorio
necesita descargar un reporte de préstamos en distintos formatos. Cada
formato tiene su propia clase generadora, pero el controlador no debe
conocer los detalles de ninguna de las tres:

```php
// app/Reportes/ReporteService.php
class ReporteService
{
    public function __construct(
        private GeneradorPdf $pdf,
        private GeneradorExcel $excel,
        private GeneradorHtml $html,
    ) {}

    public function generarReportePrestamos(string $formato, Collection $prestamos): string
    {
        return match ($formato) {
            'pdf' => $this->pdf->generar($prestamos),
            'excel' => $this->excel->generar($prestamos),
            'html' => $this->html->generar($prestamos),
            default => throw new \InvalidArgumentException("Formato no soportado: {$formato}"),
        };
    }
}
```

```php
// app/Http/Controllers/ReporteController.php
public function descargar(Request $request, ReporteService $reportes)
{
    $prestamos = Prestamo::activos()->get();

    return $reportes->generarReportePrestamos($request->query('formato', 'pdf'), $prestamos);
}
```

El controlador llama a un solo método de una sola clase. No necesita
saber que, por dentro, `ReporteService` coordina tres generadores
distintos — esa complejidad queda oculta detrás de la fachada.

### De comportamiento

#### Strategy

| | |
| --- | --- |
| **Problema que resuelve** | Necesitas elegir entre varios algoritmos o reglas intercambiables para resolver la misma tarea, y quieres evitar un bloque gigante de condicionales (`if`/`else` o `switch`) para decidir cuál usar |
| **Caso de uso** | Distintas formas de calcular un descuento según el tipo de cliente, o distintas reglas de prioridad para atender una solicitud |
| **Ventajas** | Permite agregar una estrategia nueva sin modificar las que ya existen (ni el código que las usa); evita condicionales largos y difíciles de mantener |
| **Desventajas** | El código que usa el patrón debe conocer las estrategias disponibles para poder elegir la correcta; para dos opciones simples que nunca van a cambiar, puede ser más estructura de la que el problema justifica |

**Implementación en ReservaFIC.** Cuando hay más solicitudes de
préstamo que equipos disponibles, alguien tiene que decidir en qué
orden se atienden. El criterio puede cambiar (por ejemplo, orden de
llegada durante el semestre normal, prioridad para tesistas durante el
cierre de tesis) sin que el resto del sistema cambie:

```php
// app/Priorizacion/EstrategiaPriorizacion.php
interface EstrategiaPriorizacion
{
    public function ordenar(Collection $solicitudes): Collection;
}
```

```php
// app/Priorizacion/PriorizacionPorOrdenDeLlegada.php
class PriorizacionPorOrdenDeLlegada implements EstrategiaPriorizacion
{
    public function ordenar(Collection $solicitudes): Collection
    {
        return $solicitudes->sortBy('created_at');
    }
}
```

```php
// app/Priorizacion/PriorizacionPorTesistas.php
class PriorizacionPorTesistas implements EstrategiaPriorizacion
{
    public function ordenar(Collection $solicitudes): Collection
    {
        return $solicitudes->sortByDesc(fn ($solicitud) => $solicitud->estudiante->es_tesista);
    }
}
```

```php
// app/Services/SolicitudPrestamoService.php
class SolicitudPrestamoService
{
    public function __construct(
        private EstrategiaPriorizacion $estrategia
    ) {}

    public function listarPendientes(Collection $solicitudes): Collection
    {
        return $this->estrategia->ordenar($solicitudes);
    }
}
```

```php
// Uso: la estrategia se decide al construir el servicio, no dentro de él
$servicio = new SolicitudPrestamoService(new PriorizacionPorTesistas());
$pendientesOrdenadas = $servicio->listarPendientes($solicitudesPendientes);
```

`SolicitudPrestamoService` nunca pregunta "¿qué época del semestre es?"
con un `if`: simplemente usa la estrategia que le inyectaron. Agregar
un tercer criterio de priorización no requiere tocar esta clase, solo
agregar una nueva implementación de `EstrategiaPriorizacion`.

#### Observer

| | |
| --- | --- |
| **Problema que resuelve** | Varias partes del sistema necesitan enterarse cuando algo cambia, sin que el objeto que cambia tenga que conocer a cada una de ellas de antemano |
| **Caso de uso** | Notificar a los módulos de facturación, inventario y correo cada vez que se aprueba un préstamo, sin que esos módulos sepan unos de otros ni el `PrestamoService` tenga que llamarlos uno por uno de forma explícita |
| **Ventajas** | Bajo acoplamiento entre quien emite el cambio y quien reacciona a él; agregar un nuevo interesado en el evento no requiere modificar el código que lo genera |
| **Desventajas** | El orden en que reaccionan los distintos observadores puede no estar garantizado; rastrear qué observador reaccionó a qué evento (para depurar un error) puede ser más difícil que seguir una llamada directa a un método |

**Implementación en ReservaFIC.** Cuando se aprueba un préstamo, tres
cosas distintas deben ocurrir: actualizar la disponibilidad del equipo,
registrar el movimiento en una bitácora, y enviar la notificación al
estudiante. `PrestamoService` no debería conocer a los tres módulos
uno por uno:

```php
// app/Observadores/ObservadorDePrestamo.php
interface ObservadorDePrestamo
{
    public function actualizar(Prestamo $prestamo): void;
}
```

```php
// app/Observadores/ActualizarInventario.php
class ActualizarInventario implements ObservadorDePrestamo
{
    public function actualizar(Prestamo $prestamo): void
    {
        $prestamo->equipo->marcarComoPrestado();
    }
}
```

```php
// app/Observadores/RegistrarEnBitacora.php
class RegistrarEnBitacora implements ObservadorDePrestamo
{
    public function actualizar(Prestamo $prestamo): void
    {
        Bitacora::create([
            'prestamo_id' => $prestamo->id,
            'evento' => 'prestamo_aprobado',
        ]);
    }
}
```

```php
// app/Observadores/EnviarNotificacionDePrestamo.php
class EnviarNotificacionDePrestamo implements ObservadorDePrestamo
{
    public function actualizar(Prestamo $prestamo): void
    {
        NotificadorFactory::crear($prestamo->estudiante->canal_preferido)
            ->enviar($prestamo);
    }
}
```

```php
// app/Services/PrestamoService.php
class PrestamoService
{
    /** @var ObservadorDePrestamo[] */
    private array $observadores = [];

    public function agregarObservador(ObservadorDePrestamo $observador): void
    {
        $this->observadores[] = $observador;
    }

    public function aprobar(Prestamo $prestamo): void
    {
        $prestamo->aprobar();

        foreach ($this->observadores as $observador) {
            $observador->actualizar($prestamo);
        }
    }
}
```

`PrestamoService::aprobar()` no menciona inventario, bitácora ni
notificaciones por su nombre: solo recorre una lista de observadores.
Agregar un cuarto módulo interesado (por ejemplo, un reporte de
métricas) significa agregar una clase e inscribirla — no modificar
`aprobar()`. Nota además cómo este ejemplo reutiliza el
`NotificadorFactory` de Factory Method: los patrones no se aplican
aislados, se combinan cuando el problema lo pide.

## Error común

Elegir un patrón "porque toca verlo" o porque suena avanzado, sin haber
identificado antes un problema real de tu proyecto que ese patrón
resuelva. Si no puedes escribir en una frase cuál es el problema, todavía
no tienes un problema real que justifique aplicar un patrón.

## Para reflexionar

- Piensa en una funcionalidad de tu proyecto que podría necesitar, en
  el futuro, más de una forma de calcular algo (por ejemplo, distintos
  tipos de descuento o distintas reglas de prioridad). ¿Qué familia de
  patrón consideraste, y por qué?
- ¿Qué complejidad adicional introduce el patrón Repository, y bajo qué
  condición esa complejidad vale la pena?

## Actividad y evidencia

Practica primero el orden correcto (problema antes que patrón) en la
[Actividad 5 — Del problema al patrón: mapa de decisiones](/materias/taller-integrador/bloque-02/actividades/actividad-5/),
y después aplica un patrón real a tu proyecto en el
[Laboratorio 3 — Aplicar un patrón de diseño](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno/).

## Referencias de este tema

- Gamma, Helm, Johnson y Vlissides. *Design Patterns: Elements of
  Reusable Object-Oriented Software* — catálogo original de las tres
  familias de patrones.
- Freeman y Robson. *Head First Design Patterns* — lectura de entrada
  más accesible. Ver
  [Referencias del bloque](/materias/taller-integrador/bloque-02/referencias/).

## Qué sigue

Con Git colaborativo, integración, arquitectura y un patrón de diseño
aplicado, ya cuentas con todos los elementos del primer incremento del
proyecto: continúa con
[6. Primer incremento — qué debes producir](/materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir/).
