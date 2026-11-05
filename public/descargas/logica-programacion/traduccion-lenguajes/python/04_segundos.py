SEGUNDOS_HORA = 3600
SEGUNDOS_MINUTO = 60

total_segundos = int(input("Duración en segundos: "))

horas = total_segundos // SEGUNDOS_HORA      # // es la división entera
resto = total_segundos % SEGUNDOS_HORA
minutos = resto // SEGUNDOS_MINUTO
segundos = resto % SEGUNDOS_MINUTO

print(f"{total_segundos} s equivalen a {horas} h {minutos} min {segundos} s")
