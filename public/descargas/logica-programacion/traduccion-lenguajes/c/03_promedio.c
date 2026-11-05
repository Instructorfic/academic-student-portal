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
