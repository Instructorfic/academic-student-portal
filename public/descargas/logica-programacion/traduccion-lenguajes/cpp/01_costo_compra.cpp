#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double cantidad;
    double precio;
    double total;

    cout << "Cantidad: ";
    cin >> cantidad;
    cout << "Precio: ";
    cin >> precio;

    total = cantidad * precio;

    cout << fixed << setprecision(2);
    cout << "Total: " << total << endl;
    return 0;
}
