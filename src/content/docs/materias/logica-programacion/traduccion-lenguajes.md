---
title: "Del pseudocódigo a C, C++ y Python"
description: "Lógica de Programación — material de referencia: tabla de equivalencias y diez ejemplos del curso traducidos a C, C++ y Python."
---

**Lógica de Programación y Pensamiento Computacional**
Material de referencia · Unidades II, III y IV

---

## 1. Por qué existe este documento

Durante el curso escribiste algoritmos en pseudocódigo, los dibujaste como diagramas de flujo y los ejecutaste en PSeInt. Quizá te preguntaste para qué, si "los programas de verdad" se escriben en C, en C++ o en Python.

Este documento responde esa pregunta con evidencia: toma **diez algoritmos que ya resolviste** y los escribe en los tres lenguajes. Al compararlos vas a notar que:

- **lo difícil ya está hecho.** El análisis, las decisiones, los ciclos, las fronteras y los casos de prueba son exactamente los mismos en los tres lenguajes
- **lo que cambia es la sintaxis**: palabras clave, signos de puntuación, la forma de leer y de mostrar datos
- la traducción se vuelve casi **mecánica** con una tabla de equivalencias, como la de la sección 3

> Un lenguaje de programación se aprende en semanas. La capacidad de analizar un problema y diseñar su solución es la que tarda en formarse, y es la que construiste en esta materia.

Este documento es de **consulta**. No forma parte de la evaluación y no sustituye el pseudocódigo: en la materia, la solución se sigue construyendo y evaluando en pseudocódigo y PSeInt. En Programación estructurada estudiarás un lenguaje formal a profundidad.

---

## 2. El mismo algoritmo, cuatro representaciones

Recuerda el ejemplo de los segundos del bloque 4.1:

```text
horas = trunc(totalSegundos / SEGUNDOS_HORA)
resto = totalSegundos % SEGUNDOS_HORA
```

| Pseudocódigo | C | C++ | Python |
|---|---|---|---|
| `horas = trunc(totalSegundos / SEGUNDOS_HORA)` | `horas = totalSegundos / SEGUNDOS_HORA;` | `horas = totalSegundos / SEGUNDOS_HORA;` | `horas = total_segundos // SEGUNDOS_HORA` |
| `resto = totalSegundos % SEGUNDOS_HORA` | `resto = totalSegundos % SEGUNDOS_HORA;` | `resto = totalSegundos % SEGUNDOS_HORA;` | `resto = total_segundos % SEGUNDOS_HORA` |

La operación es la misma. Cambian detalles: el punto y coma al final de cada instrucción en C y C++, la forma de pedir una división entera y la convención para escribir los nombres.

---

## 3. Tabla de equivalencias

### 3.1 Estructura del programa

| Pseudocódigo | C | C++ | Python |
|---|---|---|---|
| `Inicio … Fin` | `int main(void) { … return 0; }` | `int main() { … return 0; }` | No se necesita: el archivo se ejecuta de arriba hacia abajo |
| Bibliotecas | `#include <stdio.h>` | `#include <iostream>` y `using namespace std;` | No se necesitan para entrada y salida |
| Fin de instrucción | `;` | `;` | Salto de línea |
| Bloques | `{ … }` | `{ … }` | Sangría (4 espacios) y `:` al final de la línea que abre el bloque |
| Comentario | `/* … */` o `// …` | `// …` | `# …` |

En Python la **sangría es obligatoria**: define qué instrucciones están dentro de un `if` o de un ciclo. Es la misma sangría que usas en el pseudocódigo.

### 3.2 Tipos, variables y constantes

| Pseudocódigo | C | C++ | Python |
|---|---|---|---|
| `ENTERO edad` | `int edad;` | `int edad;` | No se declara: `edad = int(input(...))` |
| `REAL promedio` | `double promedio;` | `double promedio;` | `promedio = float(...)` |
| `CARACTER opcion` | `char opcion;` | `char opcion;` | Cadena de un carácter: `"s"` |
| `CADENA nombre` | `char nombre[50];` (arreglo de caracteres) | `string nombre;` | `nombre = input(...)` |
| `LOGICO encontrado` | `int encontrado;` (0 es falso) o `bool` con `#include <stdbool.h>` | `bool encontrado;` | `encontrado = False` |
| `VERDADERO` / `FALSO` | `1` / `0` o `true` / `false` | `true` / `false` | `True` / `False` |
| `REAL TASA = 0.16` (constante) | `const double TASA = 0.16;` | `const double TASA = 0.16;` | `TASA = 0.16` (por convención en mayúsculas, el lenguaje no impide cambiarla) |

**Convención de nombres.** C y C++ suelen usar el mismo camelCase de la materia (`totalSegundos`). En Python la convención es snake_case (`total_segundos`). La lógica no cambia, solo la forma de escribir el nombre.

**Python no declara tipos.** El tipo lo decide el valor que se asigna. Eso no elimina el análisis de tipos: si lees un número con `input` y no lo conviertes con `int()` o `float()`, Python lo trata como texto y `"35" * 2` da `"3535"`, no 70.

### 3.3 Entrada y salida

| Pseudocódigo | C | C++ | Python |
|---|---|---|---|
| `Mostrar "Edad: "` + `Entrada: edad` (ENTERO) | `printf("Edad: ");` `scanf("%d", &edad);` | `cout << "Edad: ";` `cin >> edad;` | `edad = int(input("Edad: "))` |
| `Entrada: precio` (REAL) | `scanf("%lf", &precio);` | `cin >> precio;` | `precio = float(input(...))` |
| `Mostrar "Total: $", total` | `printf("Total: $%.2f\n", total);` | `cout << "Total: $" << total << endl;` | `print(f"Total: ${total:.2f}")` |
| Salto de línea | `\n` dentro del texto | `endl` o `"\n"` | `print` lo agrega solo |

Detalles que cambian:

- En C, `scanf` necesita el formato (`%d` entero, `%lf` real) y el símbolo `&` antes de la variable.
- En C, `printf` también usa formatos: `%d` para enteros, `%.2f` para reales con dos decimales.
- En C++, `cout << fixed << setprecision(2);` (con `#include <iomanip>`) fija dos decimales para todo lo que se muestre después.
- En Python, `input` muestra el mensaje de solicitud y lee el dato en una sola instrucción, y siempre devuelve texto.

**Formato de los números.** PSeInt muestra `318.8`. En los tres lenguajes de este documento se pidió explícitamente mostrar dos decimales: `318.80`. Es la decisión de **diseño de la salida** que estudiaste en 4.1.1, solo que ahora el lenguaje te deja controlarla.

### 3.4 Operadores

| Operación | Pseudocódigo | C y C++ | Python |
|---|---|---|---|
| Asignación | `=` | `=` | `=` |
| Igual a (comparación) | `=` | `==` | `==` |
| Diferente de | `<>` | `!=` | `!=` |
| Y, O, NO | `Y`, `O`, `NO` | `&&`, `\|\|`, `!` | `and`, `or`, `not` |
| Residuo | `%` | `%` | `%` |
| División | `/` | `/` (entera si los dos operandos son enteros) | `/` (siempre real) |
| División entera | `trunc(a / b)` | `a / b` con dos `int` | `a // b` |
| Redondeo | `redon(x)` | `round(x)` con `#include <math.h>` | `round(x)` |

> **Error más frecuente al traducir:** en el pseudocódigo `=` sirve para asignar y para comparar. En C, C++ y Python la comparación es `==`. En C y C++, `if (opcion = 1)` **asigna** 1 y la condición siempre es verdadera, sin producir error.

### 3.5 Estructuras condicionales

| Pseudocódigo | C y C++ | Python |
|---|---|---|
| `Si c Entonces … FinSi` | `if (c) { … }` | `if c:` + bloque con sangría |
| `Sino` | `} else { … }` | `else:` |
| `Sino Si c Entonces` | `} else if (c) { … }` | `elif c:` |
| `Segun v Hacer` | `switch (v) {` | `match v:` (Python 3.10 o posterior) o cadena `if/elif` |
| `1:` | `case 1: … break;` | `case 1:` |
| `De Otro Modo:` | `default:` | `case _:` o `else:` |

En C y C++, cada `case` termina con `break`. Si lo olvidas, la ejecución **continúa con el caso siguiente**. En el pseudocódigo y en Python esto no ocurre.

### 3.6 Estructuras repetitivas

| Pseudocódigo | C y C++ | Python |
|---|---|---|
| `Mientras c Hacer … FinMientras` | `while (c) { … }` | `while c:` |
| `Repetir … Hasta Que c` | `do { … } while (!(c));` | `while True:` … `if c: break` |
| `Desde i = 1 Hasta n Con Paso 1 Hacer` | `for (i = 1; i <= n; i = i + 1) { … }` | `for i in range(1, n + 1):` |
| `Con Paso -1` (de 10 a 1) | `for (i = 10; i >= 1; i = i - 1)` | `for i in range(10, 0, -1):` |

Dos detalles importantes:

- **Repetir.** `Hasta Que` termina cuando la condición es **verdadera**. El `do … while` de C y C++ continúa mientras la condición es verdadera. Por eso la condición se **niega** con `!`. Python no tiene un ciclo con la condición al final: se usa un ciclo infinito que se interrumpe con `break`.
- **Desde en Python.** `range(1, n + 1)` produce los valores de 1 a `n`. El segundo número **no se incluye**, por eso se suma 1.

---

## 4. Ejemplos traducidos

Cada ejemplo presenta el pseudocódigo que ya conoces y sus tres traducciones. Los programas completos se pueden descargar en la sección 9.

### 4.1 Costo total de una compra

*Unidad II · Expresiones*

**Pseudocódigo**

```text
Inicio
    REAL cantidad
    REAL precio
    REAL total

    Mostrar "Cantidad: "
    Entrada: cantidad
    Mostrar "Precio: "
    Entrada: precio

    total = cantidad * precio

    Mostrar "Total: ", total
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    double cantidad;
    double precio;
    double total;

    printf("Cantidad: ");
    scanf("%lf", &cantidad);
    printf("Precio: ");
    scanf("%lf", &precio);

    total = cantidad * precio;

    printf("Total: %.2f\n", total);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double cantidad;
    double precio;
    double total;

    cout << "Cantidad: ";
    cin >> cantidad;
    cout << "Precio: ";
    cin >> precio;

    total = cantidad * precio;

    cout << fixed << setprecision(2);
    cout << "Total: " << total << endl;
    return 0;
}
```

**Python**

```python
cantidad = float(input("Cantidad: "))
precio = float(input("Precio: "))

total = cantidad * precio

print(f"Total: {total:.2f}")
```

**Qué observar**

- Es el programa más pequeño posible: entrada, una expresión y salida.
- En C y C++ aparece una parte fija (`#include`, `main`, `return 0`) que se repite en todos los programas. Python no la necesita.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| cantidad = 4, precio = 35 | Total: 140.00 |
| cantidad = 3, precio = 12.5 | Total: 37.50 |

---

### 4.2 Área de un triángulo

*Unidad III · Pseudocódigo*

**Pseudocódigo**

```text
Inicio
    ENTERO DIVISOR_AREA_TRIANGULO = 2

    REAL base
    REAL altura
    REAL area

    Mostrar "Ingrese la base:"
    Entrada: base
    Mostrar "Ingrese la altura:"
    Entrada: altura

    area = (base * altura) / DIVISOR_AREA_TRIANGULO

    Mostrar "El área del triángulo es:", area
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const int DIVISOR_AREA_TRIANGULO = 2;

    double base;
    double altura;
    double area;

    printf("Ingrese la base: ");
    scanf("%lf", &base);
    printf("Ingrese la altura: ");
    scanf("%lf", &altura);

    area = (base * altura) / DIVISOR_AREA_TRIANGULO;

    printf("El área del triángulo es: %.2f\n", area);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int DIVISOR_AREA_TRIANGULO = 2;

    double base;
    double altura;
    double area;

    cout << "Ingrese la base: ";
    cin >> base;
    cout << "Ingrese la altura: ";
    cin >> altura;

    area = (base * altura) / DIVISOR_AREA_TRIANGULO;

    cout << fixed << setprecision(2);
    cout << "El área del triángulo es: " << area << endl;
    return 0;
}
```

**Python**

```python
DIVISOR_AREA_TRIANGULO = 2

base = float(input("Ingrese la base: "))
altura = float(input("Ingrese la altura: "))

area = (base * altura) / DIVISOR_AREA_TRIANGULO

print(f"El área del triángulo es: {area:.2f}")
```

**Qué observar**

- La constante se declara con `const` en C y C++. En Python solo la convención de mayúsculas indica que no debe cambiar.
- La expresión `(base * altura) / DIVISOR_AREA_TRIANGULO` se copia **sin ningún cambio** en los tres lenguajes.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| base = 10, altura = 6 | 30.00 |
| base = 7, altura = 5 | 17.50 |

---

### 4.3 Promedio de tres calificaciones

*Unidad III · Pseudocódigo*

**Pseudocódigo**

```text
Inicio
    ENTERO NUMERO_CALIFICACIONES = 3

    REAL calificacion1
    REAL calificacion2
    REAL calificacion3
    REAL promedio

    Entrada: calificacion1
    Entrada: calificacion2
    Entrada: calificacion3

    promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES

    Mostrar promedio
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const int NUMERO_CALIFICACIONES = 3;

    double calificacion1;
    double calificacion2;
    double calificacion3;
    double promedio;

    printf("Calificación 1: ");
    scanf("%lf", &calificacion1);
    printf("Calificación 2: ");
    scanf("%lf", &calificacion2);
    printf("Calificación 3: ");
    scanf("%lf", &calificacion3);

    promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES;

    printf("Promedio: %.2f\n", promedio);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int NUMERO_CALIFICACIONES = 3;

    double calificacion1;
    double calificacion2;
    double calificacion3;
    double promedio;

    cout << "Calificación 1: ";
    cin >> calificacion1;
    cout << "Calificación 2: ";
    cin >> calificacion2;
    cout << "Calificación 3: ";
    cin >> calificacion3;

    promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES;

    cout << fixed << setprecision(2);
    cout << "Promedio: " << promedio << endl;
    return 0;
}
```

**Python**

```python
NUMERO_CALIFICACIONES = 3

calificacion1 = float(input("Calificación 1: "))
calificacion2 = float(input("Calificación 2: "))
calificacion3 = float(input("Calificación 3: "))

promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES

print(f"Promedio: {promedio:.2f}")
```

**Qué observar**

- Los paréntesis que discutiste en la Unidad III siguen siendo necesarios en los tres lenguajes: la prioridad de operadores es la misma.
- Las calificaciones son `double` en C y C++. Si se declararan `int`, con 8, 9 y 9 el promedio sería **8** y no 8.67 (sección 6). El tipo elegido en el análisis importa.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 80, 90, 70 | 80.00 |
| 0, 0, 0 | 0.00 |
| 8, 9, 9 | 8.67 |

---

### 4.4 Segundos a horas, minutos y segundos

*Unidad IV · 4.1 Estructuras secuenciales*

**Pseudocódigo**

```text
Inicio
    ENTERO SEGUNDOS_HORA = 3600
    ENTERO SEGUNDOS_MINUTO = 60
    ENTERO totalSegundos
    ENTERO horas
    ENTERO minutos
    ENTERO segundos
    ENTERO resto

    Mostrar "Duración en segundos: "
    Entrada: totalSegundos

    horas = trunc(totalSegundos / SEGUNDOS_HORA)
    resto = totalSegundos % SEGUNDOS_HORA
    minutos = trunc(resto / SEGUNDOS_MINUTO)
    segundos = resto % SEGUNDOS_MINUTO

    Mostrar totalSegundos, " s equivalen a ", horas, " h ", minutos, " min ", segundos, " s"
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const int SEGUNDOS_HORA = 3600;
    const int SEGUNDOS_MINUTO = 60;
    int totalSegundos;
    int horas;
    int minutos;
    int segundos;
    int resto;

    printf("Duración en segundos: ");
    scanf("%d", &totalSegundos);

    horas = totalSegundos / SEGUNDOS_HORA;      /* int / int ya es división entera */
    resto = totalSegundos % SEGUNDOS_HORA;
    minutos = resto / SEGUNDOS_MINUTO;
    segundos = resto % SEGUNDOS_MINUTO;

    printf("%d s equivalen a %d h %d min %d s\n", totalSegundos, horas, minutos, segundos);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
using namespace std;

int main() {
    const int SEGUNDOS_HORA = 3600;
    const int SEGUNDOS_MINUTO = 60;
    int totalSegundos;
    int horas;
    int minutos;
    int segundos;
    int resto;

    cout << "Duración en segundos: ";
    cin >> totalSegundos;

    horas = totalSegundos / SEGUNDOS_HORA;      // int / int ya es división entera
    resto = totalSegundos % SEGUNDOS_HORA;
    minutos = resto / SEGUNDOS_MINUTO;
    segundos = resto % SEGUNDOS_MINUTO;

    cout << totalSegundos << " s equivalen a " << horas << " h " << minutos << " min " << segundos << " s" << endl;
    return 0;
}
```

**Python**

```python
SEGUNDOS_HORA = 3600
SEGUNDOS_MINUTO = 60

total_segundos = int(input("Duración en segundos: "))

horas = total_segundos // SEGUNDOS_HORA      # // es la división entera
resto = total_segundos % SEGUNDOS_HORA
minutos = resto // SEGUNDOS_MINUTO
segundos = resto % SEGUNDOS_MINUTO

print(f"{total_segundos} s equivalen a {horas} h {minutos} min {segundos} s")
```

**Qué observar**

- `trunc(a / b)` desaparece en C y C++: si los dos operandos son `int`, la división ya es entera. En Python se escribe `//`.
- El residuo `%` se escribe igual en los cuatro.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 7385 | 2 h 3 min 5 s |
| 59 | 0 h 0 min 59 s |
| 3600 | 1 h 0 min 0 s |
| 86399 | 23 h 59 min 59 s |

---

### 4.5 Recibo de luz con validación

*Unidad IV · 4.2 Condicional doble*

**Pseudocódigo**

```text
Inicio
    REAL PRECIO_KWH = 1.10
    REAL CARGO_FIJO = 35.00
    ENTERO lecturaAnterior
    ENTERO lecturaActual
    ENTERO consumo
    REAL importeEnergia
    REAL total

    Mostrar "Lectura anterior del medidor (kWh): "
    Entrada: lecturaAnterior
    Mostrar "Lectura actual del medidor (kWh): "
    Entrada: lecturaActual

    Si lecturaActual >= lecturaAnterior Entonces
        consumo = lecturaActual - lecturaAnterior
        importeEnergia = consumo * PRECIO_KWH
        total = importeEnergia + CARGO_FIJO
        Mostrar "Consumo del periodo: ", consumo, " kWh"
        Mostrar "Importe de energía: $", importeEnergia
        Mostrar "Cargo fijo: $", CARGO_FIJO
        Mostrar "Total a pagar: $", total
    Sino
        Mostrar "Error: la lectura actual es menor que la anterior"
    FinSi
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const double PRECIO_KWH = 1.10;
    const double CARGO_FIJO = 35.00;
    int lecturaAnterior;
    int lecturaActual;
    int consumo;
    double importeEnergia;
    double total;

    printf("Lectura anterior del medidor (kWh): ");
    scanf("%d", &lecturaAnterior);
    printf("Lectura actual del medidor (kWh): ");
    scanf("%d", &lecturaActual);

    if (lecturaActual >= lecturaAnterior) {
        consumo = lecturaActual - lecturaAnterior;
        importeEnergia = consumo * PRECIO_KWH;
        total = importeEnergia + CARGO_FIJO;
        printf("Consumo del periodo: %d kWh\n", consumo);
        printf("Importe de energía: $%.2f\n", importeEnergia);
        printf("Cargo fijo: $%.2f\n", CARGO_FIJO);
        printf("Total a pagar: $%.2f\n", total);
    } else {
        printf("Error: la lectura actual es menor que la anterior\n");
    }
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double PRECIO_KWH = 1.10;
    const double CARGO_FIJO = 35.00;
    int lecturaAnterior;
    int lecturaActual;
    int consumo;
    double importeEnergia;
    double total;

    cout << "Lectura anterior del medidor (kWh): ";
    cin >> lecturaAnterior;
    cout << "Lectura actual del medidor (kWh): ";
    cin >> lecturaActual;

    cout << fixed << setprecision(2);
    if (lecturaActual >= lecturaAnterior) {
        consumo = lecturaActual - lecturaAnterior;
        importeEnergia = consumo * PRECIO_KWH;
        total = importeEnergia + CARGO_FIJO;
        cout << "Consumo del periodo: " << consumo << " kWh" << endl;
        cout << "Importe de energía: $" << importeEnergia << endl;
        cout << "Cargo fijo: $" << CARGO_FIJO << endl;
        cout << "Total a pagar: $" << total << endl;
    } else {
        cout << "Error: la lectura actual es menor que la anterior" << endl;
    }
    return 0;
}
```

**Python**

```python
PRECIO_KWH = 1.10
CARGO_FIJO = 35.00

lectura_anterior = int(input("Lectura anterior del medidor (kWh): "))
lectura_actual = int(input("Lectura actual del medidor (kWh): "))

if lectura_actual >= lectura_anterior:
    consumo = lectura_actual - lectura_anterior
    importe_energia = consumo * PRECIO_KWH
    total = importe_energia + CARGO_FIJO
    print(f"Consumo del periodo: {consumo} kWh")
    print(f"Importe de energía: ${importe_energia:.2f}")
    print(f"Cargo fijo: ${CARGO_FIJO:.2f}")
    print(f"Total a pagar: ${total:.2f}")
else:
    print("Error: la lectura actual es menor que la anterior")
```

**Qué observar**

- `Si … Entonces … Sino … FinSi` se convierte en `if (…) { … } else { … }` en C y C++, y en `if …:` / `else:` en Python.
- En Python no hay `FinSi`: el bloque termina cuando termina la sangría.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 15230 y 15488 | Total a pagar: $318.80 |
| 15488 y 15488 | Total a pagar: $35.00 |
| 15488 y 15230 | Error: la lectura actual es menor que la anterior |

---

### 4.6 Cajero automático

*Unidad IV · 4.2 Condicional múltiple y anidada*

**Pseudocódigo**

```text
Inicio
    ENTERO SALDO_INICIAL = 2500
    ENTERO saldo
    ENTERO opcion
    ENTERO monto

    saldo = SALDO_INICIAL
    Mostrar "1. Consultar saldo"
    Mostrar "2. Depositar"
    Mostrar "3. Retirar"
    Mostrar "Opción: "
    Entrada: opcion

    Segun opcion Hacer
        1:
            Mostrar "Saldo disponible: $", saldo
        2:
            Mostrar "Monto a depositar: "
            Entrada: monto
            saldo = saldo + monto
            Mostrar "Nuevo saldo: $", saldo
        3:
            Mostrar "Monto a retirar: "
            Entrada: monto
            Si monto <= saldo Entonces
                Si monto % 100 = 0 Entonces
                    saldo = saldo - monto
                    Mostrar "Retire su efectivo. Nuevo saldo: $", saldo
                Sino
                    Mostrar "Solo se entregan billetes de $100"
                FinSi
            Sino
                Mostrar "Saldo insuficiente"
            FinSi
        De Otro Modo:
            Mostrar "Opción no válida"
    FinSegun
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const int SALDO_INICIAL = 2500;
    int saldo;
    int opcion;
    int monto;

    saldo = SALDO_INICIAL;
    printf("1. Consultar saldo\n");
    printf("2. Depositar\n");
    printf("3. Retirar\n");
    printf("Opción: ");
    scanf("%d", &opcion);

    switch (opcion) {
        case 1:
            printf("Saldo disponible: $%d\n", saldo);
            break;
        case 2:
            printf("Monto a depositar: ");
            scanf("%d", &monto);
            saldo = saldo + monto;
            printf("Nuevo saldo: $%d\n", saldo);
            break;
        case 3:
            printf("Monto a retirar: ");
            scanf("%d", &monto);
            if (monto <= saldo) {
                if (monto % 100 == 0) {
                    saldo = saldo - monto;
                    printf("Retire su efectivo. Nuevo saldo: $%d\n", saldo);
                } else {
                    printf("Solo se entregan billetes de $100\n");
                }
            } else {
                printf("Saldo insuficiente\n");
            }
            break;
        default:
            printf("Opción no válida\n");
    }
    return 0;
}
```

**C++**

```cpp
#include <iostream>
using namespace std;

int main() {
    const int SALDO_INICIAL = 2500;
    int saldo;
    int opcion;
    int monto;

    saldo = SALDO_INICIAL;
    cout << "1. Consultar saldo" << endl;
    cout << "2. Depositar" << endl;
    cout << "3. Retirar" << endl;
    cout << "Opción: ";
    cin >> opcion;

    switch (opcion) {
        case 1:
            cout << "Saldo disponible: $" << saldo << endl;
            break;
        case 2:
            cout << "Monto a depositar: ";
            cin >> monto;
            saldo = saldo + monto;
            cout << "Nuevo saldo: $" << saldo << endl;
            break;
        case 3:
            cout << "Monto a retirar: ";
            cin >> monto;
            if (monto <= saldo) {
                if (monto % 100 == 0) {
                    saldo = saldo - monto;
                    cout << "Retire su efectivo. Nuevo saldo: $" << saldo << endl;
                } else {
                    cout << "Solo se entregan billetes de $100" << endl;
                }
            } else {
                cout << "Saldo insuficiente" << endl;
            }
            break;
        default:
            cout << "Opción no válida" << endl;
    }
    return 0;
}
```

**Python**

```python
SALDO_INICIAL = 2500

saldo = SALDO_INICIAL
print("1. Consultar saldo")
print("2. Depositar")
print("3. Retirar")
opcion = int(input("Opción: "))

if opcion == 1:
    print(f"Saldo disponible: ${saldo}")
elif opcion == 2:
    monto = int(input("Monto a depositar: "))
    saldo = saldo + monto
    print(f"Nuevo saldo: ${saldo}")
elif opcion == 3:
    monto = int(input("Monto a retirar: "))
    if monto <= saldo:
        if monto % 100 == 0:
            saldo = saldo - monto
            print(f"Retire su efectivo. Nuevo saldo: ${saldo}")
        else:
            print("Solo se entregan billetes de $100")
    else:
        print("Saldo insuficiente")
else:
    print("Opción no válida")
```

**Python con `match`** (Python 3.10 o posterior)

```python
# Variante con match: requiere Python 3.10 o posterior.
SALDO_INICIAL = 2500

saldo = SALDO_INICIAL
print("1. Consultar saldo")
print("2. Depositar")
print("3. Retirar")
opcion = int(input("Opción: "))

match opcion:
    case 1:
        print(f"Saldo disponible: ${saldo}")
    case 2:
        monto = int(input("Monto a depositar: "))
        saldo = saldo + monto
        print(f"Nuevo saldo: ${saldo}")
    case 3:
        monto = int(input("Monto a retirar: "))
        if monto <= saldo:
            if monto % 100 == 0:
                saldo = saldo - monto
                print(f"Retire su efectivo. Nuevo saldo: ${saldo}")
            else:
                print("Solo se entregan billetes de $100")
        else:
            print("Saldo insuficiente")
    case _:
        print("Opción no válida")
```

**Qué observar**

- `Segun` es `switch` en C y C++. Cada caso termina con `break`: sin él, la ejecución seguiría con el caso siguiente.
- `monto % 100 = 0` se escribe `monto % 100 == 0`. Es el error de traducción más frecuente.
- En Python se muestran dos versiones: con `if/elif` (cualquier versión de Python 3) y con `match` (Python 3.10 o posterior).

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 1 | Saldo disponible: $2500 |
| 2, 500 | Nuevo saldo: $3000 |
| 3, 700 | Retire su efectivo. Nuevo saldo: $1800 |
| 3, 750 | Solo se entregan billetes de $100 |
| 3, 3000 | Saldo insuficiente |
| 7 | Opción no válida |

---

### 4.7 Estacionamiento con tolerancia y tope

*Unidad IV · 4.2 Resolución de problemas*

**Pseudocódigo**

```text
Inicio
    ENTERO TOLERANCIA = 15
    ENTERO MINUTOS_HORA = 60
    REAL TARIFA_HORA = 18.50
    REAL TOPE_DIARIO = 150
    ENTERO minutos
    ENTERO horas
    REAL importe

    Mostrar "Minutos de estancia: "
    Entrada: minutos

    Si minutos <= TOLERANCIA Entonces
        importe = 0
    Sino
        horas = trunc((minutos + MINUTOS_HORA - 1) / MINUTOS_HORA)
        importe = horas * TARIFA_HORA
        Si importe > TOPE_DIARIO Entonces
            importe = TOPE_DIARIO
        FinSi
    FinSi

    Mostrar "Total a pagar: $", importe
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    const int TOLERANCIA = 15;
    const int MINUTOS_HORA = 60;
    const double TARIFA_HORA = 18.50;
    const double TOPE_DIARIO = 150;
    int minutos;
    int horas;
    double importe;

    printf("Minutos de estancia: ");
    scanf("%d", &minutos);

    if (minutos <= TOLERANCIA) {
        importe = 0;
    } else {
        horas = (minutos + MINUTOS_HORA - 1) / MINUTOS_HORA;
        importe = horas * TARIFA_HORA;
        if (importe > TOPE_DIARIO) {
            importe = TOPE_DIARIO;
        }
    }

    printf("Total a pagar: $%.2f\n", importe);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int TOLERANCIA = 15;
    const int MINUTOS_HORA = 60;
    const double TARIFA_HORA = 18.50;
    const double TOPE_DIARIO = 150;
    int minutos;
    int horas;
    double importe;

    cout << "Minutos de estancia: ";
    cin >> minutos;

    if (minutos <= TOLERANCIA) {
        importe = 0;
    } else {
        horas = (minutos + MINUTOS_HORA - 1) / MINUTOS_HORA;
        importe = horas * TARIFA_HORA;
        if (importe > TOPE_DIARIO) {
            importe = TOPE_DIARIO;
        }
    }

    cout << fixed << setprecision(2);
    cout << "Total a pagar: $" << importe << endl;
    return 0;
}
```

**Python**

```python
TOLERANCIA = 15
MINUTOS_HORA = 60
TARIFA_HORA = 18.50
TOPE_DIARIO = 150

minutos = int(input("Minutos de estancia: "))

if minutos <= TOLERANCIA:
    importe = 0
else:
    horas = (minutos + MINUTOS_HORA - 1) // MINUTOS_HORA
    importe = horas * TARIFA_HORA
    if importe > TOPE_DIARIO:
        importe = TOPE_DIARIO

print(f"Total a pagar: ${importe:.2f}")
```

**Qué observar**

- El truco de "hora o fracción" (`minutos + MINUTOS_HORA - 1`) es lógica, no sintaxis: se conserva intacto.
- Las siete fronteras del plan de pruebas dan el mismo resultado en los tres lenguajes.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 10 | $0.00 |
| 15 | $0.00 |
| 16 | $18.50 |
| 60 | $18.50 |
| 61 | $37.00 |
| 480 | $148.00 |
| 481 | $150.00 |

---

### 4.8 Registro de gastos con centinela

*Unidad IV · 4.3 Mientras*

**Pseudocódigo**

```text
Inicio
    REAL gasto
    REAL total
    REAL mayor
    ENTERO cantidad

    total = 0
    cantidad = 0
    mayor = 0
    Mostrar "Gasto (0 para terminar): "
    Entrada: gasto
    Mientras gasto <> 0 Hacer
        total = total + gasto
        cantidad = cantidad + 1
        Si gasto > mayor Entonces
            mayor = gasto
        FinSi
        Mostrar "Gasto (0 para terminar): "
        Entrada: gasto
    FinMientras
    Mostrar "Total: $", total, " en ", cantidad, " gastos. Mayor: $", mayor
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    double gasto;
    double total;
    double mayor;
    int cantidad;

    total = 0;
    cantidad = 0;
    mayor = 0;
    printf("Gasto (0 para terminar): ");
    scanf("%lf", &gasto);
    while (gasto != 0) {
        total = total + gasto;
        cantidad = cantidad + 1;
        if (gasto > mayor) {
            mayor = gasto;
        }
        printf("Gasto (0 para terminar): ");
        scanf("%lf", &gasto);
    }
    printf("Total: $%.2f en %d gastos. Mayor: $%.2f\n", total, cantidad, mayor);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double gasto;
    double total;
    double mayor;
    int cantidad;

    total = 0;
    cantidad = 0;
    mayor = 0;
    cout << "Gasto (0 para terminar): ";
    cin >> gasto;
    while (gasto != 0) {
        total = total + gasto;
        cantidad = cantidad + 1;
        if (gasto > mayor) {
            mayor = gasto;
        }
        cout << "Gasto (0 para terminar): ";
        cin >> gasto;
    }
    cout << fixed << setprecision(2);
    cout << "Total: $" << total << " en " << cantidad << " gastos. Mayor: $" << mayor << endl;
    return 0;
}
```

**Python**

```python
total = 0
cantidad = 0
mayor = 0
gasto = float(input("Gasto (0 para terminar): "))
while gasto != 0:
    total = total + gasto
    cantidad = cantidad + 1
    if gasto > mayor:
        mayor = gasto
    gasto = float(input("Gasto (0 para terminar): "))
print(f"Total: ${total:.2f} en {cantidad} gastos. Mayor: ${mayor:.2f}")
```

**Qué observar**

- `Mientras` es `while` en los tres lenguajes, y `<>` se escribe `!=`.
- La lectura previa (una entrada antes del ciclo y otra al final del cuerpo) se conserva exactamente igual.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 120, 45.5, 300, 0 | Total: $465.50 en 3 gastos. Mayor: $300.00 |
| 0 | Total: $0.00 en 0 gastos. Mayor: $0.00 |

---

### 4.9 Validación del semestre

*Unidad IV · 4.3 Repetir*

**Pseudocódigo**

```text
Inicio
    ENTERO semestre

    Repetir
        Mostrar "Semestre (1 a 10): "
        Entrada: semestre
    Hasta Que semestre >= 1 Y semestre <= 10

    Mostrar "Semestre registrado: ", semestre
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    int semestre;

    do {
        printf("Semestre (1 a 10): ");
        scanf("%d", &semestre);
    } while (!(semestre >= 1 && semestre <= 10));   /* Hasta Que <condición>  ->  while (!<condición>) */

    printf("Semestre registrado: %d\n", semestre);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
using namespace std;

int main() {
    int semestre;

    do {
        cout << "Semestre (1 a 10): ";
        cin >> semestre;
    } while (!(semestre >= 1 && semestre <= 10));   // Hasta Que <condición>  ->  while (!<condición>)

    cout << "Semestre registrado: " << semestre << endl;
    return 0;
}
```

**Python**

```python
# Python no tiene Repetir...Hasta Que: se usa while True con break.
while True:
    semestre = int(input("Semestre (1 a 10): "))
    if semestre >= 1 and semestre <= 10:     # condición del Hasta Que
        break

print(f"Semestre registrado: {semestre}")
```

**Qué observar**

- `Repetir … Hasta Que c` se convierte en `do { … } while (!(c));`. La condición se **niega** porque `do … while` continúa mientras la condición es verdadera.
- Python no tiene este ciclo: se escribe `while True:` y se sale con `break` cuando se cumple la condición del `Hasta Que`.
- `Y` se escribe `&&` en C y C++, y `and` en Python.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 15, 0, 3 | Pide tres veces. Semestre registrado: 3 |

---

### 4.10 Calificaciones de un grupo

*Unidad IV · 4.3 Desde*

**Pseudocódigo**

```text
Inicio
    ENTERO alumnos
    ENTERO i
    ENTERO aprobados
    REAL calificacion
    REAL suma
    REAL mayor
    REAL menor
    REAL promedio

    Mostrar "Número de alumnos: "
    Entrada: alumnos
    suma = 0
    aprobados = 0
    mayor = -1
    menor = 11
    Desde i = 1 Hasta alumnos Con Paso 1 Hacer
        Mostrar "Calificación del alumno ", i, ": "
        Entrada: calificacion
        suma = suma + calificacion
        Si calificacion >= 6 Entonces
            aprobados = aprobados + 1
        FinSi
        Si calificacion > mayor Entonces
            mayor = calificacion
        FinSi
        Si calificacion < menor Entonces
            menor = calificacion
        FinSi
    FinDesde
    promedio = suma / alumnos
    Mostrar "Promedio: ", promedio
    Mostrar "Aprobados: ", aprobados
    Mostrar "Mayor: ", mayor, "  Menor: ", menor
Fin
```

**C**

```c
#include <stdio.h>

int main(void) {
    int alumnos;
    int i;
    int aprobados;
    double calificacion;
    double suma;
    double mayor;
    double menor;
    double promedio;

    printf("Número de alumnos: ");
    scanf("%d", &alumnos);
    suma = 0;
    aprobados = 0;
    mayor = -1;
    menor = 11;
    for (i = 1; i <= alumnos; i = i + 1) {
        printf("Calificación del alumno %d: ", i);
        scanf("%lf", &calificacion);
        suma = suma + calificacion;
        if (calificacion >= 6) {
            aprobados = aprobados + 1;
        }
        if (calificacion > mayor) {
            mayor = calificacion;
        }
        if (calificacion < menor) {
            menor = calificacion;
        }
    }
    promedio = suma / alumnos;
    printf("Promedio: %.2f\n", promedio);
    printf("Aprobados: %d\n", aprobados);
    printf("Mayor: %.2f  Menor: %.2f\n", mayor, menor);
    return 0;
}
```

**C++**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int alumnos;
    int aprobados;
    double calificacion;
    double suma;
    double mayor;
    double menor;
    double promedio;

    cout << "Número de alumnos: ";
    cin >> alumnos;
    suma = 0;
    aprobados = 0;
    mayor = -1;
    menor = 11;
    for (int i = 1; i <= alumnos; i = i + 1) {
        cout << "Calificación del alumno " << i << ": ";
        cin >> calificacion;
        suma = suma + calificacion;
        if (calificacion >= 6) {
            aprobados = aprobados + 1;
        }
        if (calificacion > mayor) {
            mayor = calificacion;
        }
        if (calificacion < menor) {
            menor = calificacion;
        }
    }
    promedio = suma / alumnos;
    cout << fixed << setprecision(2);
    cout << "Promedio: " << promedio << endl;
    cout << "Aprobados: " << aprobados << endl;
    cout << "Mayor: " << mayor << "  Menor: " << menor << endl;
    return 0;
}
```

**Python**

```python
alumnos = int(input("Número de alumnos: "))
suma = 0
aprobados = 0
mayor = -1
menor = 11
for i in range(1, alumnos + 1):              # Desde i = 1 Hasta alumnos Con Paso 1
    calificacion = float(input(f"Calificación del alumno {i}: "))
    suma = suma + calificacion
    if calificacion >= 6:
        aprobados = aprobados + 1
    if calificacion > mayor:
        mayor = calificacion
    if calificacion < menor:
        menor = calificacion
promedio = suma / alumnos
print(f"Promedio: {promedio:.2f}")
print(f"Aprobados: {aprobados}")
print(f"Mayor: {mayor:.2f}  Menor: {menor:.2f}")
```

**Qué observar**

- `Desde i = 1 Hasta alumnos Con Paso 1` se escribe `for (i = 1; i <= alumnos; i = i + 1)` en C y C++: sus tres partes son la inicialización, la condición y la actualización de la variable de control.
- En Python es `for i in range(1, alumnos + 1)`: el límite superior no se incluye, por eso se suma 1.
- En C++ es habitual declarar `i` dentro del propio `for`.

**Pruebas** (mismo resultado en los tres lenguajes)

| Entrada | Resultado |
|---|---|
| 5 alumnos: 8, 5.5, 9.5, 7, 6 | Promedio 7.20, aprobados 4, mayor 9.50, menor 5.50 |

---

## 5. Lo que cambia y lo que no

| No cambió en ningún ejemplo | Cambió según el lenguaje |
|---|---|
| Qué datos se piden y en qué orden | Cómo se pide un dato (`scanf`, `cin`, `input`) |
| Qué se calcula y con qué fórmula | El signo de la comparación (`=` frente a `==`) |
| Qué decisiones se toman y en qué orden | Cómo se escriben `Y`, `O`, `NO` |
| Qué se repite y cuándo se detiene | Cómo se escribe cada ciclo |
| Los casos de prueba y sus resultados | El formato de los números en pantalla |
| Las fronteras (15/16 minutos, 480/481 minutos) | El punto y coma, las llaves o la sangría |

La columna de la izquierda es el resultado de la **lógica**. La de la derecha es **sintaxis** y se consulta en una tabla. Si la columna izquierda es correcta, cualquier lenguaje es una traducción.

---

## 6. Diferencias que sí requieren pensar

Algunas diferencias no son solo de escritura: pueden cambiar el resultado. Todas se comprobaron ejecutando los programas.

| Situación | Pseudocódigo / PSeInt | C y C++ | Python |
|---|---|---|---|
| `(8 + 9 + 9) / 3` con variables enteras | 8.67 | **8**: entero entre entero es división entera | 8.67 |
| `-7` entre `2`, división entera | `trunc(-3.5)` = −3 | `-7 / 2` = −3 | `-7 // 2` = **−4** (redondea hacia abajo, no hacia cero) |
| Residuo de `-7` entre `2` | — | `-7 % 2` = −1 | `-7 % 2` = **1** |
| Redondear 2.5 | pendiente de verificación en PSeInt | `round(2.5)` = 3 | `round(2.5)` = **2** (redondea al par más cercano) |
| `143 - 123.28` | Se muestra 19.72 (pendiente de verificar en PSeInt) | Valor interno 19.719999999999999 | Se muestra 19.72 |
| Leer un número | Se lee con su tipo | Se lee con su tipo | `input` devuelve **texto**: hay que convertir |

La última fila del promedio es la razón por la que, en el análisis, siempre se pregunta **de qué tipo es cada dato**. Los demás casos muestran que los supuestos (no negativos, pesos enteros) que escribiste en tus hojas de trabajo también protegen la traducción.

### Tamaño en memoria

En C y C++ cada tipo ocupa un número fijo de bytes. En el equipo donde se probaron estos programas (macOS, 64 bits, Apple clang 17), `sizeof(int)` es 4, `sizeof(double)` es 8 y `sizeof(char)` es 1. **Estos valores pueden variar según el compilador y el sistema.** Para conocerlos en tu equipo, ejecuta `printf("%zu\n", sizeof(int));`.

---

## 7. Cómo ejecutar los ejemplos

| Lenguaje | Herramienta | Pasos |
|---|---|---|
| C | Dev-C++ (herramienta del programa de la materia) | Abrir el archivo `.c`, compilar y ejecutar (F11). pendiente de verificación: probado solo con clang, no con Dev-C++ 5.11 |
| C | Terminal con gcc o clang | `gcc -o costo 01_costo_compra.c` y después `./costo` |
| C++ | Dev-C++ o terminal con g++ | `g++ -o costo 01_costo_compra.cpp` y después `./costo` |
| Python | Python 3 instalado | `python3 01_costo_compra.py` (en Windows puede ser `python` o `py`) |

Si en la consola de Windows aparecen símbolos extraños en lugar de letras acentuadas (`á`, `ó`, `ñ`), el programa es correcto: es un problema de configuración de caracteres de la consola. pendiente de verificación en los equipos del laboratorio.

---

## 8. Actividad sugerida (opcional)

1. Elige un ejemplo y ejecútalo en los tres lenguajes con los casos de prueba de la tabla.
2. Toma un algoritmo de tus propias tareas que **no** esté en este documento y tradúcelo a uno de los tres lenguajes usando solo la sección 3.
3. Responde: ¿cuánto tardaste en la traducción comparado con lo que tardaste en el análisis y el pseudocódigo? ¿Qué parte de la tabla consultaste más?

---

## 9. Descargas

| # | C | C++ | Python |
| --- | --- | --- | --- |
| 01 | [01_costo_compra.c](/descargas/logica-programacion/traduccion-lenguajes/c/01_costo_compra.c) | [01_costo_compra.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/01_costo_compra.cpp) | [01_costo_compra.py](/descargas/logica-programacion/traduccion-lenguajes/python/01_costo_compra.py) |
| 02 | [02_area_triangulo.c](/descargas/logica-programacion/traduccion-lenguajes/c/02_area_triangulo.c) | [02_area_triangulo.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/02_area_triangulo.cpp) | [02_area_triangulo.py](/descargas/logica-programacion/traduccion-lenguajes/python/02_area_triangulo.py) |
| 03 | [03_promedio.c](/descargas/logica-programacion/traduccion-lenguajes/c/03_promedio.c) | [03_promedio.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/03_promedio.cpp) | [03_promedio.py](/descargas/logica-programacion/traduccion-lenguajes/python/03_promedio.py) |
| 04 | [04_segundos.c](/descargas/logica-programacion/traduccion-lenguajes/c/04_segundos.c) | [04_segundos.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/04_segundos.cpp) | [04_segundos.py](/descargas/logica-programacion/traduccion-lenguajes/python/04_segundos.py) |
| 05 | [05_recibo_luz.c](/descargas/logica-programacion/traduccion-lenguajes/c/05_recibo_luz.c) | [05_recibo_luz.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/05_recibo_luz.cpp) | [05_recibo_luz.py](/descargas/logica-programacion/traduccion-lenguajes/python/05_recibo_luz.py) |
| 06 | [06_cajero.c](/descargas/logica-programacion/traduccion-lenguajes/c/06_cajero.c) | [06_cajero.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/06_cajero.cpp) | [06_cajero.py](/descargas/logica-programacion/traduccion-lenguajes/python/06_cajero.py) · [06_cajero_match.py](/descargas/logica-programacion/traduccion-lenguajes/python/06_cajero_match.py) |
| 07 | [07_estacionamiento.c](/descargas/logica-programacion/traduccion-lenguajes/c/07_estacionamiento.c) | [07_estacionamiento.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/07_estacionamiento.cpp) | [07_estacionamiento.py](/descargas/logica-programacion/traduccion-lenguajes/python/07_estacionamiento.py) |
| 08 | [08_registro_gastos.c](/descargas/logica-programacion/traduccion-lenguajes/c/08_registro_gastos.c) | [08_registro_gastos.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/08_registro_gastos.cpp) | [08_registro_gastos.py](/descargas/logica-programacion/traduccion-lenguajes/python/08_registro_gastos.py) |
| 09 | [09_validar_semestre.c](/descargas/logica-programacion/traduccion-lenguajes/c/09_validar_semestre.c) | [09_validar_semestre.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/09_validar_semestre.cpp) | [09_validar_semestre.py](/descargas/logica-programacion/traduccion-lenguajes/python/09_validar_semestre.py) |
| 10 | [10_calificaciones_grupo.c](/descargas/logica-programacion/traduccion-lenguajes/c/10_calificaciones_grupo.c) | [10_calificaciones_grupo.cpp](/descargas/logica-programacion/traduccion-lenguajes/cpp/10_calificaciones_grupo.cpp) | [10_calificaciones_grupo.py](/descargas/logica-programacion/traduccion-lenguajes/python/10_calificaciones_grupo.py) |
