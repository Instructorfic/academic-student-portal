---
title: "DOC-09 · Estándar de seguridad"
description: "Nivel de seguridad verificable alineado con OWASP Top 10:2021: secretos, autenticación, injection, XSS, CSRF y más."
draft: true
---

<span class="badge-estado">QA: aprobado con observaciones</span> <span class="badge-estado">Validación académica: pendiente</span>

:::note[Sobre este documento]
Material derivado del espacio de trabajo académico interno; es la versión para estudiantes del *Engineering Handbook* de estándares de desarrollo. Las referencias «Doc. NN» remiten a los demás documentos de esta sección (menú lateral). Los documentos 14 (Matriz de cumplimiento) y 15 (Rúbrica de evaluación técnica) tienen audiencia docente y no se publican aquí.
:::

| Campo | Valor |
|---|---|
| Código | STD-SEC |
| Versión | 1.0 |
| Estado | Vigente |
| Propietario | Docente/Arquitecto |
| Fecha | 2026-08-30 |

## 1. Objetivo
Establecer un nivel de seguridad realista y verificable, alineado con el **OWASP Top 10:2021**, sin exigir infraestructura de seguridad de nivel empresarial.

> **Pendiente de verificación:** confirmar en owasp.org si una edición posterior del OWASP Top 10 (p. ej. 2025) ya es la vigente; de ser así, realinear los nombres y agrupaciones de categoría de la sección 15 y actualizar la referencia de la sección 17. Las prácticas concretas de este documento (hashing, control de acceso, injection, etc.) no dependen de la edición.

## 2. Secrets y `.env`

| ID | Regla | Prioridad | Nivel |
|---|---|---|---|
| STD-SEC-01 | Ningún secreto (contraseñas, API keys, tokens) se sube al repositorio; siempre vía `.env`, que está en `.gitignore`. | P0 | OBLIGATORIO |
| STD-SEC-02 | Se provee un `.env.example` con las variables necesarias, **sin valores reales**. | P1 | OBLIGATORIO |
| STD-SEC-03 | El pipeline de CI ejecuta secret scanning (Gitleaks) en cada push/PR. | P0 | OBLIGATORIO |
| STD-SEC-04 | Si un secreto se sube por error, se rota inmediatamente (no basta con borrarlo del commit siguiente; el historial de Git lo conserva). | P0 | OBLIGATORIO |

## 3. Autenticación y hashing de contraseñas
- Las contraseñas nunca se almacenan en texto plano ni con hash reversible; se usa `bcrypt`/`argon2` vía el sistema de hashing de Laravel (`Hash::make()`) — P0/OBLIGATORIO.
- La autenticación de la API usa Sanctum ([Doc. 05](/estandares/05-api-rest/)); las sesiones/tokens tienen expiración razonable — P1/OBLIGATORIO.

## 4. Autorización
- Toda acción sensible (editar, eliminar, ver datos de otro usuario) se valida con Policies, no se asume que "si llegó autenticado, puede hacer todo" — P0/OBLIGATORIO.

## 5. Inyección SQL
- Se usa Eloquent/Query Builder con *bindings* parametrizados; nunca se concatena input de usuario directamente en SQL crudo (`DB::raw` con interpolación de variables) — P0/OBLIGATORIO.

**Incorrecto:**
```php
DB::select("SELECT * FROM users WHERE email = '{$request->email}'"); // Inyección SQL
```
**Correcto:**
```php
User::where('email', $request->email)->first();
```

## 6. XSS (Cross-Site Scripting)
- El frontend nunca inyecta datos de usuario/API vía `innerHTML` sin sanitizar ([Doc. 03](/estandares/03-frontend/)) — P0/OBLIGATORIO.
- Laravel Blade escapa por defecto con `{{ }}`; si se usa `{!! !!}` (sin escape), debe justificarse explícitamente — P0/OBLIGATORIO.

## 7. CSRF
- Para rutas de API consumidas por SPA vía Sanctum, se usa el mecanismo de protección CSRF de Sanctum (cookie + header) cuando aplica al flujo de autenticación por cookies; para tokens Bearer puros, CSRF no aplica de la misma forma pero se documenta explícitamente qué mecanismo se usa — P1/OBLIGATORIO.

## 8. Mass Assignment
- Ya cubierto en [Doc. 02](/estandares/02-backend-laravel/) (STD-BE-M01): `$fillable` explícito siempre, nunca `$guarded = []` — P0/OBLIGATORIO.

## 9. Validación de entradas
- Toda entrada del usuario (body, query params, headers relevantes, archivos) se valida antes de usarse — P0/OBLIGATORIO ([Doc. 02](/estandares/02-backend-laravel/), FormRequests).

## 10. Rate limiting
- Los endpoints de autenticación (login, registro, recuperación de contraseña) tienen rate limiting explícito (`throttle` middleware de Laravel) — P1/OBLIGATORIO.
- Endpoints públicos de alto costo (búsquedas, reportes) tienen rate limiting razonable — P2/RECOMENDADO.

## 11. CORS
- Se configura `config/cors.php` con los orígenes explícitamente permitidos (el dominio del frontend del proyecto), nunca `*` en producción si hay credenciales involucradas — P1/OBLIGATORIO.

## 12. Uploads de archivos
- Se valida tipo MIME real (no solo extensión), tamaño máximo, y se almacenan fuera del `document root` público directo cuando sea posible, o con nombres no adivinables — P1/OBLIGATORIO si el proyecto maneja uploads.
- Nunca se ejecuta un archivo subido por el usuario como código — P0/OBLIGATORIO.

## 13. Logs e información sensible
- Los logs no contienen contraseñas, tokens completos, ni datos personales sensibles innecesarios — P0/OBLIGATORIO (ya referenciado en [Doc. 02](/estandares/02-backend-laravel/)).
- Los mensajes de error al usuario final no revelan detalles internos (versión de framework, rutas de servidor, queries) — P0/OBLIGATORIO.

## 14. Dependencias
- Se ejecuta auditoría de dependencias conocidas con vulnerabilidades (`composer audit`, `npm audit`) periódicamente y en CI — P2/RECOMENDADO (AVANZADO integrarlo como gate estricto; se recomienda al menos como reporte visible).
- No se agregan paquetes de fuentes no oficiales/sin mantenimiento sin revisión — P1/OBLIGATORIO.

## 15. Mapeo al OWASP Top 10:2021 (referencia)

| OWASP Top 10:2021 (categoría) | Cómo se cubre en este proyecto |
|---|---|
| Broken Access Control | Policies + Sanctum (secciones 3-4) |
| Cryptographic Failures | Hashing con bcrypt/argon2, HTTPS en despliegue (fuera de alcance de código, pero exigido en infraestructura) |
| Injection | Eloquent/Query Builder parametrizado (sección 5) |
| Insecure Design | ADRs y revisión arquitectónica ([Doc. 10](/estandares/10-documentacion/)) |
| Security Misconfiguration | `.env` correcto, CORS explícito, `APP_DEBUG=false` en producción |
| Vulnerable Components | Auditoría de dependencias (sección 14) |
| Auth Failures | Rate limiting en login, expiración de tokens |
| Software/Data Integrity Failures | CI con checks obligatorios antes de merge |
| Logging Failures | Sección 13 |
| SSRF | Fuera del alcance típico de este proyecto; si se agregan integraciones que hacen requests a URLs provistas por usuario, se valida el destino — AVANZADO |

## Reglas con ID (resumen)

Además de `STD-SEC-01…04` (sección 2), las reglas P0/P1 de este documento, para su referencia desde la Matriz de Cumplimiento (Doc. 14):

| ID | Regla | Prioridad | Sección |
|---|---|---|---|
| STD-SEC-05 | Contraseñas con `bcrypt`/`argon2` vía `Hash::make()`; nunca texto plano ni hash reversible. | P0 | 3 |
| STD-SEC-06 | La autenticación de la API usa Sanctum con expiración razonable de sesiones/tokens. | P1 | 3 |
| STD-SEC-07 | Toda acción sensible se valida con Policies (autorización explícita, no implícita). | P0 | 4 |
| STD-SEC-08 | Acceso a datos con Eloquent/Query Builder parametrizado; nunca SQL crudo con interpolación de input. | P0 | 5 |
| STD-SEC-09 | El frontend no usa `innerHTML` con datos sin sanitizar; Blade sin escape (`{!! !!}`) se justifica. | P0 | 6 |
| STD-SEC-10 | Se documenta explícitamente el mecanismo CSRF usado (cookie+header de Sanctum para SPA; N/A para Bearer puro). | P1 | 7 |
| STD-SEC-11 | `$fillable` explícito siempre (Mass Assignment); ver [Doc. 02](/estandares/02-backend-laravel/), `STD-BE-M01`. | P0 | 8 |
| STD-SEC-12 | Toda entrada del usuario (body, query, headers, archivos) se valida antes de usarse. | P0 | 9 |
| STD-SEC-13 | Los endpoints de autenticación (login, registro, recuperación) tienen rate limiting explícito. | P1 | 10 |
| STD-SEC-14 | `config/cors.php` con orígenes explícitos; nunca `*` con credenciales en producción. | P1 | 11 |
| STD-SEC-15 | Uploads: se valida tipo MIME real, tamaño máximo y almacenamiento no adivinable/fuera del docroot. | P1 | 12 |
| STD-SEC-16 | Nunca se ejecuta un archivo subido por el usuario como código. | P0 | 12 |
| STD-SEC-17 | Logs y errores al usuario final no revelan secretos ni detalles internos. | P0 | 13 |
| STD-SEC-18 | No se agregan paquetes de fuentes no oficiales o sin mantenimiento sin revisión. | P1 | 14 |

## 16. Verificación

| Regla | Verificación | Herramienta |
|---|---|---|
| Sin secretos en el repo | Automática | Gitleaks en CI |
| Mass Assignment / `$fillable` | Automática (Larastan) + manual | PHPStan/Larastan + Review |
| SQLi (uso de raw queries inseguras) | Manual + parcial automática | Code Review + regla estática si se configura |
| XSS en frontend | Manual | Code Review ([Doc. 03](/estandares/03-frontend/)) |
| Rate limiting en login | Manual + test | Feature test que verifica 429 tras N intentos |
| CORS configurado | Manual | Revisión de `config/cors.php` en PR de setup |
| Auditoría de dependencias | Automática (reporte) | `composer audit` / `npm audit` en CI |

## 17. Referencias
- OWASP Top 10:2021 (owasp.org/Top10). Verificar edición vigente antes de cada semestre (ver nota de la sección 1).
- Documentación de seguridad de Laravel y de Laravel Sanctum.
- [Doc. 02](/estandares/02-backend-laravel/) (Mass Assignment, excepciones) y [Doc. 05](/estandares/05-api-rest/) (autenticación de API).
