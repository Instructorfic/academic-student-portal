#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double PRECIO_KWH = 1.10;
    const double CARGO_FIJO = 35.00;
    int lecturaAnterior;
    int lecturaActual;
    int consumo;
    double importeEnergia;
    double total;

    cout << "Lectura anterior del medidor (kWh): ";
    cin >> lecturaAnterior;
    cout << "Lectura actual del medidor (kWh): ";
    cin >> lecturaActual;

    cout << fixed << setprecision(2);
    if (lecturaActual >= lecturaAnterior) {
        consumo = lecturaActual - lecturaAnterior;
        importeEnergia = consumo * PRECIO_KWH;
        total = importeEnergia + CARGO_FIJO;
        cout << "Consumo del periodo: " << consumo << " kWh" << endl;
        cout << "Importe de energía: $" << importeEnergia << endl;
        cout << "Cargo fijo: $" << CARGO_FIJO << endl;
        cout << "Total a pagar: $" << total << endl;
    } else {
        cout << "Error: la lectura actual es menor que la anterior" << endl;
    }
    return 0;
}
