# Variante con match: requiere Python 3.10 o posterior.
SALDO_INICIAL = 2500

saldo = SALDO_INICIAL
print("1. Consultar saldo")
print("2. Depositar")
print("3. Retirar")
opcion = int(input("Opción: "))

match opcion:
    case 1:
        print(f"Saldo disponible: ${saldo}")
    case 2:
        monto = int(input("Monto a depositar: "))
        saldo = saldo + monto
        print(f"Nuevo saldo: ${saldo}")
    case 3:
        monto = int(input("Monto a retirar: "))
        if monto <= saldo:
            if monto % 100 == 0:
                saldo = saldo - monto
                print(f"Retire su efectivo. Nuevo saldo: ${saldo}")
            else:
                print("Solo se entregan billetes de $100")
        else:
            print("Saldo insuficiente")
    case _:
        print("Opción no válida")
