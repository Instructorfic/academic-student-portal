# Python no tiene Repetir...Hasta Que: se usa while True con break.
while True:
    semestre = int(input("Semestre (1 a 10): "))
    if semestre >= 1 and semestre <= 10:     # condición del Hasta Que
        break

print(f"Semestre registrado: {semestre}")
