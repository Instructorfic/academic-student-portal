---
title: "DOC-07 · Estándar de code review"
description: "Severidades BLOCKER/MAJOR/MINOR/NIT, checklist del reviewer y cuándo se aprueba un PR."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-CR |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Tech Lead de cada equipo / Docente |
| Fecha | 2026-08-30 |

## 1. Objetivo
Que la revisión de código sea objetiva, formativa y consistente entre equipos, en vez de depender del "gusto" de quien revisa.

## 2. Severidad de hallazgos

| Etiqueta | Significado | Bloquea el merge |
|---|---|---|
| **BLOCKER** | Viola una regla P0 (seguridad, integridad, build roto) o rompe funcionalidad crítica. | Sí, siempre |
| **MAJOR** | Viola una regla P1 (naming, estructura, validación faltante) o introduce riesgo de bug significativo. | Sí, hasta corregirse |
| **MINOR** | Viola una regla P2 o es una mejora de calidad razonable, no urgente. | No bloquea; se puede fusionar y crear una tarea de seguimiento si es necesario |
| **NIT** | Preferencia de estilo/sugerencia sin impacto funcional. | No bloquea; el autor decide si la aplica |

## 3. Checklist formal del reviewer

```
[ ] Naming — clases, métodos, variables, tablas siguen las convenciones (Docs. 02-06)
[ ] Arquitectura — el cambio respeta las capas definidas (Controller delgado, lógica en Service, etc.)
[ ] Seguridad — sin secretos expuestos, sin Mass Assignment abierto, entradas validadas (Doc. 09)
[ ] Manejo de errores — excepciones controladas, sin catch vacíos, sin dd()/var_dump()
[ ] Validación — toda entrada de usuario se valida (FormRequest / validación en frontend + backend)
[ ] Performance — sin N+1 evidentes, sin queries obviamente ineficientes
[ ] Tests — el cambio incluye o actualiza pruebas relevantes (Doc. 08)
[ ] Documentación — README/API docs/ADR actualizados si el cambio lo amerita (Doc. 10)
[ ] Duplicación — no reintroduce código que ya existía en otro lugar
[ ] Complejidad — el método/clase no creció desproporcionadamente sin necesidad
[ ] Compatibilidad — no rompe un contrato de API o de base de datos ya en uso por otro equipo/módulo
[ ] Migraciones — reversibles, con constraints correctos (si aplica)
[ ] API — respeta el formato de request/response y status codes del Doc. 05 (si aplica)
[ ] Logs — usa el sistema de logging, sin datos sensibles en el log
```

## 4. Cuándo se puede aprobar un PR
Un PR **puede aprobarse** cuando:
1. No tiene hallazgos **BLOCKER** abiertos.
2. No tiene hallazgos **MAJOR** sin resolver o sin acuerdo explícito de posponerlos como deuda técnica registrada.
3. El pipeline de CI está en verde.
4. Al menos un reviewer distinto del autor dio su aprobación explícita en la plataforma (no solo un comentario suelto).

Los **MINOR** y **NIT** no impiden la aprobación; quedan a criterio del autor.

## 5. Cómo dar feedback (guía de tono)
- El feedback se dirige al código, no a la persona: *"esta validación falta aquí"*, no *"te olvidaste otra vez de validar"*.
- Toda observación **MAJOR/BLOCKER** debe explicar el "por qué" y, si es posible, sugerir cómo corregirlo o enlazar la regla del handbook (`STD-BE-M01`, etc.).
- Un PR se revisa en un plazo razonable (idealmente antes de 48 h hábiles) para no bloquear el flujo del equipo.

## 6. Ejemplo de comentario correcto vs. incorrecto

**Correcto:**
> **MAJOR — STD-BE-M01:** Este modelo usa `$guarded = []`, lo que permite Mass Assignment sin restricción. Definamos `$fillable` con los campos que realmente deben poder asignarse desde el request.

**Incorrecto:**
> "esto está mal, cámbialo"

## 7. Reviewer y autor: reglas de conducta
- El autor del PR no se auto-aprueba.
- Si el autor no está de acuerdo con un hallazgo, se discute en los comentarios del PR (no se ignora silenciosamente); si no hay acuerdo, escala al Tech Lead o al docente.
- El reviewer que aprueba es corresponsable de la calidad de lo aprobado — no es solo trámite.

## Reglas con ID (resumen)

Para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-CR-01 | Todo hallazgo se etiqueta con severidad: BLOCKER / MAJOR / MINOR / NIT. | P1 | 2 |
| STD-CR-02 | El reviewer aplica el checklist completo de la sección 3. | P1 | 3 |
| STD-CR-03 | Un PR no se aprueba con hallazgos BLOCKER abiertos. | P0 | 4 |
| STD-CR-04 | Un PR no se aprueba con MAJOR sin resolver ni acuerdo explícito de posponerlos como deuda registrada. | P1 | 4 |
| STD-CR-05 | Un PR no se aprueba con el pipeline de CI en rojo. | P0 | 4 |
| STD-CR-06 | La aprobación la da un reviewer distinto del autor, de forma explícita en la plataforma. | P1 | 4, 7 |
| STD-CR-07 | El feedback MAJOR/BLOCKER explica el "por qué" y referencia la regla del handbook cuando aplica. | P2 | 5 |
| STD-CR-08 | El autor no ignora un hallazgo en silencio; si no hay acuerdo, escala al Tech Lead o docente. | P1 | 7 |

## 8. Verificación de este documento

| Regla | Verificación | Herramienta |
|---|---|---|
| Checklist aplicado en cada PR | Manual | Evidencia: comentarios/checklist marcado en el PR |
| Al menos 1 aprobación real | Automática | Branch protection ([Doc. 06](/estandares/06-git/)) |
| Ausencia de BLOCKER al fusionar | Manual + parcialmente automática (CI cubre parte de los BLOCKER técnicos) | CI + Review |

## 9. Referencias
- [Doc. 06](/estandares/06-git/) — Git y Pull Requests.
- Docs. 02, 03, 04, 05, 09 — reglas técnicas referenciadas en el checklist.
- [Doc. 13](/estandares/13-checklists/) — Checklist D (versión operativa breve de este documento).
