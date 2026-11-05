#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int NUMERO_CALIFICACIONES = 3;

    double calificacion1;
    double calificacion2;
    double calificacion3;
    double promedio;

    cout << "Calificación 1: ";
    cin >> calificacion1;
    cout << "Calificación 2: ";
    cin >> calificacion2;
    cout << "Calificación 3: ";
    cin >> calificacion3;

    promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES;

    cout << fixed << setprecision(2);
    cout << "Promedio: " << promedio << endl;
    return 0;
}
