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
