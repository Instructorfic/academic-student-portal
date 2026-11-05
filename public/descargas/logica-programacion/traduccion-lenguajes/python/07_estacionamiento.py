TOLERANCIA = 15
MINUTOS_HORA = 60
TARIFA_HORA = 18.50
TOPE_DIARIO = 150

minutos = int(input("Minutos de estancia: "))

if minutos <= TOLERANCIA:
    importe = 0
else:
    horas = (minutos + MINUTOS_HORA - 1) // MINUTOS_HORA
    importe = horas * TARIFA_HORA
    if importe > TOPE_DIARIO:
        importe = TOPE_DIARIO

print(f"Total a pagar: ${importe:.2f}")
