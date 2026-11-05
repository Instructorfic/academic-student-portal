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
