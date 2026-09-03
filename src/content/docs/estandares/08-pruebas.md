---
title: "DOC-08 · Estándar de pruebas"
description: "Qué se prueba y qué no, tipos de prueba, Factories y el papel de la cobertura."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-TEST |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Definir qué se prueba, cómo y con qué herramientas, evitando tanto la ausencia total de pruebas como la persecución ciega de un porcentaje de cobertura.

## 2. Tipos de prueba en el proyecto

| Tipo | Qué verifica | Herramienta |
|---|---|---|
| **Unit test** | Una unidad de lógica aislada (un método de un Service, una función util de JS), sin BD ni HTTP real. | PHPUnit/Pest · (JS: opcional, AVANZADO) |
| **Feature test (Laravel)** | Un flujo completo de la aplicación a través de HTTP simulado, incluyendo BD de pruebas. | PHPUnit/Pest + `RefreshDatabase` |
| **API test** | Que un endpoint responde con el status, formato y datos esperados (subconjunto de Feature tests enfocado en el contrato de API). | PHPUnit/Pest |
| **Integration test** | Que dos o más piezas reales (Service + Model + BD) funcionan juntas correctamente. | PHPUnit/Pest |
| **End-to-end (E2E)** | Flujo de usuario real de principio a fin, atravesando frontend + backend. | AVANZADO/opcional (ej. Playwright), solo si el equipo tiene tiempo/madurez |

## 3. Qué se prueba (obligatorio) vs. qué no se prueba

**Se prueba SIEMPRE (P0/P1):**
- Reglas de negocio críticas (cálculos, validaciones de dominio, condiciones de autorización).
- Endpoints de API: casos de éxito y al menos un caso de error relevante (422, 401/403, 404).
- Casos límite conocidos (valores en cero, negativos, vacíos) en lógica que los admite como entrada.

**No es necesario probar (para no generar carga innecesaria):**
- Getters/setters triviales sin lógica.
- Configuración de terceros ya probada por su propio paquete (no se reescribe el test de Laravel/Eloquent).
- Detalles de implementación que cambian frecuentemente y no son contrato público (ej. estructura interna de una función privada), se prueba el comportamiento observable, no el "cómo".
- UI puramente visual sin lógica (un `<div>` estático) no necesita test automatizado; sí necesita verificación manual ([Doc. 13](/estandares/13-checklists/), checklist F).

## 4. Naming y estructura

```
tests/
 ├── Unit/
 │   └── Services/InvoiceCalculatorTest.php
 ├── Feature/
 │   └── Api/V1/InvoiceControllerTest.php
 └── Integration/  (si se separan explícitamente de Feature)
```

- Nombre de clase de test: `<ClaseProbada>Test.php`.
- Nombre de método/caso: describe el comportamiento, no la implementación: `it_returns_422_when_total_is_missing()` o, en Pest, `it('retorna 422 cuando falta el total', ...)`.

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-TEST-01 | Cada endpoint público tiene al menos un Feature/API test de caso exitoso y uno de error. | P1 | OBLIGATORIO |
| STD-TEST-02 | La lógica de negocio no trivial (cálculos, reglas condicionales) tiene Unit test. | P1 | OBLIGATORIO |
| STD-TEST-03 | Los tests son independientes entre sí (no dependen del orden de ejecución ni de datos dejados por otro test). | P0 | OBLIGATORIO |
| STD-TEST-04 | Se usa `RefreshDatabase` (o transacción por test) para que cada test parta de un estado limpio. | P1 | OBLIGATORIO |
| STD-TEST-05 | Un mismo proyecto usa **un solo** framework de testing PHP (PHPUnit *o* Pest, no mezclados sin razón). | P1 | OBLIGATORIO |

## 5. Datos de prueba: Factories y Fixtures
- Se usan **Model Factories** de Laravel para generar datos de prueba realistas, nunca datos hardcodeados repetidos en cada test — P1/OBLIGATORIO.
- Los `Seeders` de datos "de demo" (para mostrar la app en clase) son distintos de las Factories de testing; no se reutiliza un Seeder de demo como fuente de datos de test — P2/RECOMENDADO.

**Ejemplo correcto:**
```php
public function test_store_invoice_returns_201_with_valid_data(): void
{
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/v1/invoices', [
        'total_amount' => 150.00,
        'client_id' => Client::factory()->create()->id,
    ]);

    $response->assertStatus(201)
             ->assertJsonPath('data.total_amount', '150.00');
}
```

## 6. Mocks
- Se usan mocks/fakes para dependencias externas lentas o no controlables (APIs de terceros, envío real de correo) — P2/RECOMENDADO. Laravel provee `Http::fake()`, `Mail::fake()`, `Queue::fake()`.
- No se mockea la base de datos propia del proyecto en Feature/Integration tests: se usa una BD de pruebas real — P1/OBLIGATORIO. Se prefiere **PostgreSQL de test** (mismo motor que producción), porque SQLite en memoria no reproduce todo el comportamiento de PostgreSQL (tipos, ciertas constraints, `RETURNING`, JSON/arrays). SQLite en memoria es un atajo aceptable solo para Unit tests que no dependen de características específicas de PostgreSQL. El pipeline de CI ([Doc. 11](/estandares/11-calidad-cicd/), sección 5) levanta un servicio `postgres` para esto.

## 7. Cobertura: por qué NO es el objetivo por sí sola
Un porcentaje de cobertura alto **no garantiza calidad**: se puede "cubrir" una línea con un test que no verifica nada relevante (assert trivial o inexistente). Por eso el estándar no fija solo un número; fija **qué debe estar probado** (sección 3) y usa la cobertura como **señal de alerta**, no como meta.

- Referencia orientativa (no exigencia rígida): lógica de negocio y endpoints críticos con cobertura visible; no se persigue el 100% del proyecto.
- Un PR que baja significativamente la cobertura de un módulo ya probado, sin justificación, se marca como MAJOR en Code Review — P2/RECOMENDADO.

## 8. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Suite de tests pasa | Automática | PHPUnit/Pest en CI |
| Cobertura como señal (no gate estricto) | Automática (reporte) | `--coverage` (Xdebug/PCOV) en CI, se publica como reporte, no bloquea por sí solo salvo caída drástica acordada por el equipo |
| Endpoints con test de éxito y error | Manual | Code Review ([Doc. 07](/estandares/07-code-review/)) |
| Tests independientes/reproducibles | Automática | CI ejecuta la suite completa en cada PR, en cualquier orden |

## 9. Referencias
- Documentación de PHPUnit / Pest.
- [Doc. 05](/estandares/05-api-rest/) — formato de respuesta de API que los tests deben aseverar.
- [Doc. 11](/estandares/11-calidad-cicd/) — integración de tests en el pipeline de CI.
