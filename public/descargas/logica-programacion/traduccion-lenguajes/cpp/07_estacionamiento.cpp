#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int TOLERANCIA = 15;
    const int MINUTOS_HORA = 60;
    const double TARIFA_HORA = 18.50;
    const double TOPE_DIARIO = 150;
    int minutos;
    int horas;
    double importe;

    cout << "Minutos de estancia: ";
    cin >> minutos;

    if (minutos <= TOLERANCIA) {
        importe = 0;
    } else {
        horas = (minutos + MINUTOS_HORA - 1) / MINUTOS_HORA;
        importe = horas * TARIFA_HORA;
        if (importe > TOPE_DIARIO) {
            importe = TOPE_DIARIO;
        }
    }

    cout << fixed << setprecision(2);
    cout << "Total a pagar: $" << importe << endl;
    return 0;
}
