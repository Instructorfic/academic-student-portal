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
