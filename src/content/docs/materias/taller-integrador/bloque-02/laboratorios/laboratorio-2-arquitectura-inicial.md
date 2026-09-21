---
title: "Laboratorio 2 — Arquitectura inicial del proyecto"
description: "Bloque II de Taller Integrador — separa validación, regla de negocio y persistencia, y documenta la arquitectura resultante en ARQUITECTURA.md."
---

**Modalidad:** Laboratorio guiado, en equipo. **Requiere:**
[Laboratorio 1](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo/) completado.

## 1. Propósito

El controlador que construyeron en el Bloque I probablemente hace todo:
recibe la petición, valida los datos, aplica las reglas de negocio,
guarda en base de datos y arma la respuesta. Funciona. No va a seguir
funcionando así cuando el proyecto crezca.

Este laboratorio separa responsabilidades antes de que eso sea un
problema, no después.

## 2. ¿Qué vamos a lograr?

```text
☐ Identificar qué responsabilidades están mezcladas en su controlador actual.
☐ Separar esas responsabilidades en componentes distintos.
☐ Documentar la arquitectura resultante (componentes, interfaces, dependencias, flujo de información).
☐ Aplicar todo el cambio mediante el flujo de ramas y pull request del Laboratorio 1.
```

## 3. Antes de comenzar

### Requisitos

```text
Laboratorio 1 completado: flujo de ramas y pull request funcionando.
Al menos un controlador con lógica real del Bloque I.
```

Trabajen sobre una rama nueva:

```bash
git checkout main
git pull origin main
git checkout -b feature/arquitectura-inicial
```

## 4. Paso 1 — Modelo con ReservaFIC

**Antes del refactor.** El controlador de préstamos de ReservaFIC hace
todo en un solo método:

```php
public function store(Request $request)
{
    $request->validate([
        'equipo_id' => 'required|exists:equipos,id',
        'fecha_inicio' => 'required|date',
        'fecha_fin' => 'required|date|after:fecha_inicio',
    ]);

    $conflicto = Prestamo::where('equipo_id', $request->equipo_id)
        ->where(function ($q) use ($request) {
            $q->whereBetween('fecha_inicio', [$request->fecha_inicio, $request->fecha_fin])
              ->orWhereBetween('fecha_fin', [$request->fecha_inicio, $request->fecha_fin]);
        })->exists();

    if ($conflicto) {
        return back()->withErrors('El equipo ya está reservado en ese horario');
    }

    Prestamo::create($request->all());

    return redirect()->route('prestamos.index');
}
```

Validación, regla de negocio y persistencia están mezcladas en un solo
lugar.

**Después del refactor.** Tres responsabilidades, tres componentes:

```text
FormRequest   → valida la forma de los datos
Service       → decide la regla de negocio (no doble reserva)
Controlador   → coordina, no decide
```

```php
// app/Http/Requests/GuardarPrestamoRequest.php
class GuardarPrestamoRequest extends FormRequest
{
    public function rules()
    {
        return [
            'equipo_id' => 'required|exists:equipos,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
        ];
    }
}
```

```php
// app/Services/PrestamoService.php
class PrestamoService
{
    public function crear(array $datos): Prestamo
    {
        if ($this->existeConflicto($datos)) {
            throw new ConflictoDeReservaException();
        }

        return Prestamo::create($datos);
    }

    private function existeConflicto(array $datos): bool
    {
        return Prestamo::where('equipo_id', $datos['equipo_id'])
            ->where(function ($q) use ($datos) {
                $q->whereBetween('fecha_inicio', [$datos['fecha_inicio'], $datos['fecha_fin']])
                  ->orWhereBetween('fecha_fin', [$datos['fecha_inicio'], $datos['fecha_fin']]);
            })->exists();
    }
}
```

```php
// app/Http/Controllers/PrestamoController.php
public function store(GuardarPrestamoRequest $request, PrestamoService $service)
{
    try {
        $service->crear($request->validated());
    } catch (ConflictoDeReservaException $e) {
        return back()->withErrors('El equipo ya está reservado en ese horario');
    }

    return redirect()->route('prestamos.index');
}
```

El controlador ya no valida ni decide la regla de negocio. Solo
coordina.

## 5. Paso 2 — Diagnosticar su propio controlador

Elijan el controlador de su proyecto con más lógica mezclada.

```text
1. Marquen, línea por línea, qué hace cada parte: ¿valida?, ¿decide una regla de negocio?, ¿accede a datos?, ¿arma la respuesta?
2. Cuenten cuántas responsabilidades distintas encontraron.
```

### Punto de control 1

Si encontraron una sola responsabilidad, probablemente su controlador
ya es simple — elijan otro con más lógica antes de continuar.

## 6. Paso 3 — Extraer la validación

Creen un Form Request:

```bash
php artisan make:request Guardar[NombreDelRecurso]Request
```

Muevan las reglas de validación del controlador a la clase `rules()`.

## 7. Paso 4 — Extraer la regla de negocio

Creen una clase de servicio:

```bash
mkdir -p app/Services
```

```php
// app/Services/[Nombre]Service.php
class [Nombre]Service
{
    public function crear(array $datos)
    {
        // regla de negocio aquí, no en el controlador
    }
}
```

Muevan la lógica de decisión (no la validación de formato, la regla de
negocio real) del controlador a este servicio.

## 8. Paso 5 — Dejar el controlador delgado

El controlador final solo debe:

```text
Recibir la petición ya validada.
Llamar al servicio correspondiente.
Decidir qué respuesta devolver según el resultado.
```

Nada más.

### Punto de control 2

```bash
php artisan serve
```

Prueben la funcionalidad de extremo a extremo. Debe comportarse
exactamente igual que antes del refactor — un refactor no cambia el
comportamiento observable, solo la organización interna.

## 9. Paso 6 — Documentar la arquitectura del proyecto

Creen un archivo `ARQUITECTURA.md` en la raíz del repositorio con esta
estructura mínima:

```text
# Arquitectura de [nombre del proyecto]

## Tipo de arquitectura
Monolito multicapa (Laravel).

## Componentes principales
- Controladores: coordinan la petición y la respuesta.
- Form Requests: validan la forma de los datos de entrada.
- Services: contienen las reglas de negocio.
- Models: representan los datos y su persistencia.

## Diagrama de flujo de información

Petición HTTP
      ↓
  Ruta (routes/web.php)
      ↓
  Form Request (valida)
      ↓
  Controlador (coordina)
      ↓
  Service (decide la regla de negocio)
      ↓
  Model (persiste)
      ↓
  Respuesta

## Dependencias entre componentes
El Controlador depende del Service y del Form Request.
El Service depende del Model.
El Model no depende de ninguno de los anteriores.

## Decisión de diseño
[Expliquen, en dos o tres líneas, por qué separaron estas
responsabilidades específicamente para su proyecto]
```

## 10. Paso 7 — Integrar el cambio

Usen el flujo del Laboratorio 1.

```bash
git add .
git commit -m "refactor: separar validación, regla de negocio y persistencia"
git push origin feature/arquitectura-inicial
```

Abran el pull request, asignen revisor, esperen aprobación real, luego
integren.

## 11. Evidencia del laboratorio

- **A. Diagnóstico** — controlador original con las responsabilidades
  marcadas (Paso 2).
- **B. Refactor** — Form Request, Service y Controlador ya separados
  (Pasos 3–5).
- **C. Verificación de comportamiento** — captura de la funcionalidad
  funcionando igual que antes del refactor.
- **D. Documento de arquitectura** — `ARQUITECTURA.md` completo,
  integrado al repositorio mediante pull request.

## 12. Reflexión del equipo

1. ¿Qué responsabilidad fue más difícil de separar y por qué?
2. Si mañana cambia la regla de negocio (por ejemplo, el máximo de
   préstamos activos por estudiante), ¿en cuántos archivos tendrían que
   tocar código con esta nueva organización, comparado con antes?
3. ¿En qué parte de su arquitectura documentada todavía tienen más
   acoplamiento del que les gustaría?

## 13. Criterio de finalización

```text
☐ El controlador elegido ya no mezcla validación, regla de negocio y persistencia.
☐ La funcionalidad se comporta igual que antes del refactor.
☐ ARQUITECTURA.md existe y describe componentes, dependencias y flujo de información.
☐ El cambio se integró mediante pull request revisado.
```

## 14. Conexión con el resto del bloque

El Service que crearon aquí es exactamente donde va a vivir el patrón
de diseño del
[Laboratorio 3](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno/).
No repitan el diagnóstico del Paso 2 ahí — continúen sobre esta misma
organización.
