#include <stdio.h>

int main(void) {
    const int SALDO_INICIAL = 2500;
    int saldo;
    int opcion;
    int monto;

    saldo = SALDO_INICIAL;
    printf("1. Consultar saldo\n");
    printf("2. Depositar\n");
    printf("3. Retirar\n");
    printf("Opción: ");
    scanf("%d", &opcion);

    switch (opcion) {
        case 1:
            printf("Saldo disponible: $%d\n", saldo);
            break;
        case 2:
            printf("Monto a depositar: ");
            scanf("%d", &monto);
            saldo = saldo + monto;
            printf("Nuevo saldo: $%d\n", saldo);
            break;
        case 3:
            printf("Monto a retirar: ");
            scanf("%d", &monto);
            if (monto <= saldo) {
                if (monto % 100 == 0) {
                    saldo = saldo - monto;
                    printf("Retire su efectivo. Nuevo saldo: $%d\n", saldo);
                } else {
                    printf("Solo se entregan billetes de $100\n");
                }
            } else {
                printf("Saldo insuficiente\n");
            }
            break;
        default:
            printf("Opción no válida\n");
    }
    return 0;
}
