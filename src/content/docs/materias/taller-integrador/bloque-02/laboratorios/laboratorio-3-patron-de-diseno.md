---
title: "Laboratorio 3 — Aplicar un patrón de diseño al proyecto"
description: "Bloque II de Taller Integrador — identifica un problema real de tu proyecto y resuélvelo con el patrón de diseño que le corresponde."
---

**Modalidad:** Laboratorio guiado, en equipo. **Requiere:**
[Laboratorio 2](/materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial/) completado — al menos un Service ya
separado del controlador.

## 1. Propósito

Un patrón de diseño no es una decoración para el código. Es una
solución ya probada a un problema que ya se repitió muchas veces antes
que en su proyecto.

Este laboratorio no pide "usar un patrón porque toca verlo". Pide
identificar un problema real de su proyecto y resolverlo con el patrón
que le corresponde.

## 2. ¿Qué vamos a lograr?

```text
☐ Identificar un problema real de diseño en su propio proyecto.
☐ Elegir el patrón de diseño que lo resuelve, con justificación.
☐ Implementarlo sobre el Service del Laboratorio 2.
☐ Documentar la decisión.
```

## 3. Antes de comenzar

### Requisitos

```text
Laboratorio 2 completado: al menos un Service ya separado del controlador.
```

```bash
git checkout main
git pull origin main
git checkout -b feature/patron-de-diseno
```

## 4. Paso 1 — Modelo con ReservaFIC: patrón Repository

**El problema.** El `PrestamoService` del Laboratorio 2 llama
directamente a `Prestamo::where(...)`. Si mañana cambian de MySQL a
otro motor, o si quieren probar el Service sin tocar la base de datos
real, tienen que modificar el Service.

**El patrón.** Repository (estructural): separa el Service de los
detalles de cómo se accede a los datos.

```php
// app/Repositories/PrestamoRepositoryInterface.php
interface PrestamoRepositoryInterface
{
    public function existeConflicto(array $datos): bool;
    public function crear(array $datos): Prestamo;
}
```

```php
// app/Repositories/EloquentPrestamoRepository.php
class EloquentPrestamoRepository implements PrestamoRepositoryInterface
{
    public function existeConflicto(array $datos): bool
    {
        return Prestamo::where('equipo_id', $datos['equipo_id'])
            ->where(function ($q) use ($datos) {
                $q->whereBetween('fecha_inicio', [$datos['fecha_inicio'], $datos['fecha_fin']])
                  ->orWhereBetween('fecha_fin', [$datos['fecha_inicio'], $datos['fecha_fin']]);
            })->exists();
    }

    public function crear(array $datos): Prestamo
    {
        return Prestamo::create($datos);
    }
}
```

```php
// app/Services/PrestamoService.php
class PrestamoService
{
    public function __construct(
        private PrestamoRepositoryInterface $repositorio
    ) {}

    public function crear(array $datos): Prestamo
    {
        if ($this->repositorio->existeConflicto($datos)) {
            throw new ConflictoDeReservaException();
        }

        return $this->repositorio->crear($datos);
    }
}
```

El `PrestamoService` ya no sabe que existe Eloquent. Solo conoce la
interfaz.

## 5. Paso 2 — Elegir el patrón de su propio proyecto

Repository no es obligatorio para todos los equipos. Identifiquen su
propio problema real:

| Si su problema es... | Consideren... | Familia |
| --- | --- | --- |
| Crear distintos tipos de un mismo objeto según una condición (por ejemplo, distintos tipos de notificación) | Factory | Creacional |
| Desacoplar la lógica de negocio del acceso a datos | Repository | Estructural |
| Adaptar una librería externa a la interfaz que su proyecto espera | Adapter | Estructural |
| Elegir entre varios algoritmos o reglas intercambiables (por ejemplo, distintas formas de calcular un costo o una prioridad) | Strategy | De comportamiento |
| Notificar a varias partes del sistema cuando algo cambia | Observer | De comportamiento |

### Punto de control 1

Escriban, en una frase, el problema real de su proyecto antes de elegir
el patrón. Si no pueden escribir esa frase, todavía no tienen un
problema real que resolver — no implementen un patrón sin ella.

## 6. Paso 3 — Implementar el patrón elegido

Sigan la misma estructura del ejemplo del Paso 1: interfaz cuando
corresponda, clase concreta, e inyección en el Service ya existente del
Laboratorio 2.

No implementen el patrón en un archivo aislado sin conectarlo al resto
del proyecto — debe resolver el problema real que identificaron en el
Paso 2.

## 7. Paso 4 — Verificar que el comportamiento no cambió

```bash
php artisan serve
```

Prueben la funcionalidad de extremo a extremo. Igual que en el
Laboratorio 2: un patrón de diseño bien aplicado no cambia lo que el
usuario observa, cambia cómo está organizado el código por dentro.

## 8. Paso 5 — Documentar la decisión

Agreguen a `ARQUITECTURA.md` (creado en el Laboratorio 2) una sección
nueva:

```text
## Patrón de diseño aplicado

### Patrón
[Nombre del patrón]

### Familia
[Creacional / Estructural / De comportamiento]

### Problema que resuelve en este proyecto
[Una frase concreta, la misma del Punto de control 1]

### Por qué este patrón y no otro
[Justificación breve]

### Dónde vive en el código
[Ruta de los archivos implicados]
```

## 9. Paso 6 — Integrar el cambio

```bash
git add .
git commit -m "feat: aplicar patrón [nombre] a [componente]"
git push origin feature/patron-de-diseno
```

Pull request, revisión real, integración — mismo flujo del Laboratorio
1.

## 10. Evidencia del laboratorio

- **A. Problema identificado** — frase concreta del problema real
  (Punto de control 1).
- **B. Patrón implementado** — código del patrón, conectado al Service
  existente.
- **C. Verificación de comportamiento** — captura de la funcionalidad
  funcionando igual que antes.
- **D. Documento de decisión** — sección "Patrón de diseño aplicado" en
  `ARQUITECTURA.md`.

## 11. Reflexión del equipo

1. ¿Qué hubiera pasado si hubieran elegido un patrón antes de
   identificar el problema?
2. ¿El patrón que eligieron les resultó más simple o más complejo de lo
   que esperaban?
3. ¿Qué otro problema de su proyecto podría resolverse con un patrón de
   diseño, aunque no lo hayan implementado todavía?

## 12. Criterio de finalización

```text
☐ El problema real está identificado y documentado antes del patrón.
☐ El patrón elegido está justificado, no solo implementado.
☐ El comportamiento observable no cambió.
☐ ARQUITECTURA.md incluye la sección de decisión del patrón.
☐ El cambio se integró mediante pull request revisado.
```

## 13. Cierre del bloque

Con los tres laboratorios completos, su equipo tiene:

```text
Flujo de ramas y pull requests en uso real (Laboratorio 1).
Arquitectura documentada y responsabilidades separadas (Laboratorio 2).
Al menos un patrón de diseño justificado (Laboratorio 3).
```

Esto es el **primer incremento funcional real** del proyecto. Ver
[6. Primer incremento — qué debes producir](/materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir/).
En el Bloque III van a construir componentes, APIs y persistencia sobre
esta misma arquitectura — no la van a rehacer desde cero.
