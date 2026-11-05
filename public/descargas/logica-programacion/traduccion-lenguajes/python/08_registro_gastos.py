total = 0
cantidad = 0
mayor = 0
gasto = float(input("Gasto (0 para terminar): "))
while gasto != 0:
    total = total + gasto
    cantidad = cantidad + 1
    if gasto > mayor:
        mayor = gasto
    gasto = float(input("Gasto (0 para terminar): "))
print(f"Total: ${total:.2f} en {cantidad} gastos. Mayor: ${mayor:.2f}")
