PRECIO_KWH = 1.10
CARGO_FIJO = 35.00

lectura_anterior = int(input("Lectura anterior del medidor (kWh): "))
lectura_actual = int(input("Lectura actual del medidor (kWh): "))

if lectura_actual >= lectura_anterior:
    consumo = lectura_actual - lectura_anterior
    importe_energia = consumo * PRECIO_KWH
    total = importe_energia + CARGO_FIJO
    print(f"Consumo del periodo: {consumo} kWh")
    print(f"Importe de energía: ${importe_energia:.2f}")
    print(f"Cargo fijo: ${CARGO_FIJO:.2f}")
    print(f"Total a pagar: ${total:.2f}")
else:
    print("Error: la lectura actual es menor que la anterior")
