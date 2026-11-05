#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int DIVISOR_AREA_TRIANGULO = 2;

    double base;
    double altura;
    double area;

    cout << "Ingrese la base: ";
    cin >> base;
    cout << "Ingrese la altura: ";
    cin >> altura;

    area = (base * altura) / DIVISOR_AREA_TRIANGULO;

    cout << fixed << setprecision(2);
    cout << "El área del triángulo es: " << area << endl;
    return 0;
}
