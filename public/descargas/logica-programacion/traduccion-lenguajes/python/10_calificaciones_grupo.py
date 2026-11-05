alumnos = int(input("Número de alumnos: "))
suma = 0
aprobados = 0
mayor = -1
menor = 11
for i in range(1, alumnos + 1):              # Desde i = 1 Hasta alumnos Con Paso 1
    calificacion = float(input(f"Calificación del alumno {i}: "))
    suma = suma + calificacion
    if calificacion >= 6:
        aprobados = aprobados + 1
    if calificacion > mayor:
        mayor = calificacion
    if calificacion < menor:
        menor = calificacion
promedio = suma / alumnos
print(f"Promedio: {promedio:.2f}")
print(f"Aprobados: {aprobados}")
print(f"Mayor: {mayor:.2f}  Menor: {menor:.2f}")
