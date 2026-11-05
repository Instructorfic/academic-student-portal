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
