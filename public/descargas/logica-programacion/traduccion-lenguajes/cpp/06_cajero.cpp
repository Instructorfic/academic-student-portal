#include <iostream>
using namespace std;

int main() {
    const int SALDO_INICIAL = 2500;
    int saldo;
    int opcion;
    int monto;

    saldo = SALDO_INICIAL;
    cout << "1. Consultar saldo" << endl;
    cout << "2. Depositar" << endl;
    cout << "3. Retirar" << endl;
    cout << "Opción: ";
    cin >> opcion;

    switch (opcion) {
        case 1:
            cout << "Saldo disponible: $" << saldo << endl;
            break;
        case 2:
            cout << "Monto a depositar: ";
            cin >> monto;
            saldo = saldo + monto;
            cout << "Nuevo saldo: $" << saldo << endl;
            break;
        case 3:
            cout << "Monto a retirar: ";
            cin >> monto;
            if (monto <= saldo) {
                if (monto % 100 == 0) {
                    saldo = saldo - monto;
                    cout << "Retire su efectivo. Nuevo saldo: $" << saldo << endl;
                } else {
                    cout << "Solo se entregan billetes de $100" << endl;
                }
            } else {
                cout << "Saldo insuficiente" << endl;
            }
            break;
        default:
            cout << "Opción no válida" << endl;
    }
    return 0;
}
