#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double gasto;
    double total;
    double mayor;
    int cantidad;

    total = 0;
    cantidad = 0;
    mayor = 0;
    cout << "Gasto (0 para terminar): ";
    cin >> gasto;
    while (gasto != 0) {
        total = total + gasto;
        cantidad = cantidad + 1;
        if (gasto > mayor) {
            mayor = gasto;
        }
        cout << "Gasto (0 para terminar): ";
        cin >> gasto;
    }
    cout << fixed << setprecision(2);
    cout << "Total: $" << total << " en " << cantidad << " gastos. Mayor: $" << mayor << endl;
    return 0;
}
