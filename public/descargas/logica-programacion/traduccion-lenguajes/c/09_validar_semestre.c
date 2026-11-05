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
