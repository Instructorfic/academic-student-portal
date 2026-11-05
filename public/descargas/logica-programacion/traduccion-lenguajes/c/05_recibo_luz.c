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
