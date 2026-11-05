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
