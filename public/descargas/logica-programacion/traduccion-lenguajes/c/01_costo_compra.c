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
