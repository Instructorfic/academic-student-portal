#include <iostream>
using namespace std;

int main() {
    int semestre;

    do {
        cout << "Semestre (1 a 10): ";
        cin >> semestre;
    } while (!(semestre >= 1 && semestre <= 10));   // Hasta Que <condición>  ->  while (!<condición>)

    cout << "Semestre registrado: " << semestre << endl;
    return 0;
}
