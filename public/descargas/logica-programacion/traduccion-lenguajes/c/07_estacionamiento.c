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
