#include <iostream>
using namespace std;

int main() {
    const int SEGUNDOS_HORA = 3600;
    const int SEGUNDOS_MINUTO = 60;
    int totalSegundos;
    int horas;
    int minutos;
    int segundos;
    int resto;

    cout << "Duración en segundos: ";
    cin >> totalSegundos;

    horas = totalSegundos / SEGUNDOS_HORA;      // int / int ya es división entera
    resto = totalSegundos % SEGUNDOS_HORA;
    minutos = resto / SEGUNDOS_MINUTO;
    segundos = resto % SEGUNDOS_MINUTO;

    cout << totalSegundos << " s equivalen a " << horas << " h " << minutos << " min " << segundos << " s" << endl;
    return 0;
}
