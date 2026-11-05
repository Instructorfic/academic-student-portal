SALDO_INICIAL = 2500

saldo = SALDO_INICIAL
print("1. Consultar saldo")
print("2. Depositar")
print("3. Retirar")
opcion = int(input("Opción: "))

if opcion == 1:
    print(f"Saldo disponible: ${saldo}")
elif opcion == 2:
    monto = int(input("Monto a depositar: "))
    saldo = saldo + monto
    print(f"Nuevo saldo: ${saldo}")
elif opcion == 3:
    monto = int(input("Monto a retirar: "))
    if monto <= saldo:
        if monto % 100 == 0:
            saldo = saldo - monto
            print(f"Retire su efectivo. Nuevo saldo: ${saldo}")
        else:
            print("Solo se entregan billetes de $100")
    else:
        print("Saldo insuficiente")
else:
    print("Opción no válida")
