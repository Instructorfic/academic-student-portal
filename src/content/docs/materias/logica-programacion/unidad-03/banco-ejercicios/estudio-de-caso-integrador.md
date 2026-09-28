---
title: "Estudio de caso integrador"
description: "Unidad III de Lógica de Programación — propuesta algorítmica completa que integra las siete etapas de la metodología: la compra en una papelería."
---

**Etapas:** 3.2.1 a 3.2.7. **Instrumento:**
[Formato extendido de propuesta algorítmica](/materias/logica-programacion/unidad-03/plantillas/propuesta-algoritmica-extendida/).

## El caso

Una papelería desea automatizar el cálculo del importe de una compra de
un solo producto.

El usuario proporciona:

- la cantidad de unidades compradas
- el precio unitario del producto
- el porcentaje de impuesto aplicable.

El sistema debe calcular:

- el subtotal de la compra
- el importe correspondiente al impuesto
- el total que debe pagar el cliente.

### Reglas de cálculo

```text
subtotal = cantidad * precioUnitario
impuesto = subtotal * porcentajeImpuesto / 100
total = subtotal + impuesto
```

### Restricciones

- `cantidad` debe ser un número entero mayor que cero.
- `precioUnitario` debe ser un número real mayor que cero.
- `porcentajeImpuesto` debe ser un número real mayor o igual que cero.
- El algoritmo debe utilizar únicamente operaciones aritméticas.
- No se requieren estructuras condicionales.
- No se requieren estructuras repetitivas.
- Los resultados monetarios deben expresarse con dos posiciones
  decimales cuando se presenten al usuario.

## Qué debes hacer

Desarrolla una propuesta algorítmica completa utilizando las siete
etapas de la metodología.

### 1. Descripción del problema

Redacta el problema con tus propias palabras. Indica claramente qué
situación debe resolver el algoritmo.

### 2. Análisis del problema

Identifica: datos conocidos, datos de entrada, resultados esperados,
tipos de datos, restricciones y fórmulas necesarias.

### 3. Estrategia de solución

Describe la estrategia que utilizarás para resolver el problema. Indica
por qué la estrategia seleccionada permite obtener los resultados
solicitados.

### 4. Técnicas de análisis

Descompón el problema en subproblemas. Indica el orden en que deben
resolverse.

### 5. Representación algorítmica

Define las variables y constantes necesarias, utilizando `ENTERO`,
`REAL`, `CADENA`, `CARACTER` o `LOGICO` según corresponda. Utiliza
camelCase para variables y SCREAMING_SNAKE_CASE para constantes.

Posteriormente desarrolla el pseudocódigo utilizando la notación
establecida para la unidad.

### 6. Depuración y plan de pruebas

Realiza al menos tres casos de prueba:

| Caso | Cantidad | Precio unitario | Impuesto | Resultado esperado | Resultado obtenido |
| --- | --- | --- | --- | --- | --- |
| Normal | | | | | |
| Mínimo válido | | | | | |
| Diferente al normal | | | | | |

Verifica que los resultados obtenidos coincidan con los resultados
esperados.

**Verificación en PSeInt.** Después de la etapa 5 y como parte de esta
etapa:

1. Traduce el pseudocódigo a PSeInt siguiendo la
   [Traducción del pseudocódigo a PSeInt](/materias/logica-programacion/unidad-03/traduccion-a-pseint/)
   (perfil Flexible).
2. Ejecuta la traducción con los tres casos de prueba.
3. Registra en la tabla de pruebas el resultado obtenido en PSeInt.
4. Si algún resultado no coincide, corrige el pseudocódigo, vuelve a
   traducir y documenta la corrección en la etapa 7.

La traducción a PSeInt no sustituye al pseudocódigo: la propuesta se
evalúa sobre el pseudocódigo.

### 7. Documentación

Documenta: propósito del algoritmo, variables, constantes, supuestos,
restricciones, fórmulas, decisiones tomadas y resultados de las pruebas.

## Evidencia requerida

| Representación | Requerida |
| --- | --- |
| Pseudocódigo | Sí |
| Diagrama de flujo | No |
| Traducción a PSeInt | Sí (anexo de la propuesta) |
| Ejecución en PSeInt con los casos de prueba | Sí (resultados obtenidos en la tabla de pruebas) |

## Cómo se revisará

| Componente | Evidencia |
| --- | --- |
| Descripción | Problema correctamente delimitado |
| Análisis | Entradas, salidas, datos conocidos y restricciones |
| Estrategia | Procedimiento seleccionado y justificado |
| Técnica de análisis | Descomposición del problema |
| Pseudocódigo | Algoritmo completo |
| Pruebas | Casos de prueba y resultados |
| Documentación | Supuestos y decisiones |

**Condición de terminación:** el ejercicio estará terminado cuando las
siete etapas hayan sido completadas y los casos de prueba demuestren
que el pseudocódigo produce los resultados esperados.
