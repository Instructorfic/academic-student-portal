NUMERO_CALIFICACIONES = 3

calificacion1 = float(input("Calificación 1: "))
calificacion2 = float(input("Calificación 2: "))
calificacion3 = float(input("Calificación 3: "))

promedio = (calificacion1 + calificacion2 + calificacion3) / NUMERO_CALIFICACIONES

print(f"Promedio: {promedio:.2f}")
