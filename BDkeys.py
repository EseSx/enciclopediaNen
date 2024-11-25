import sqlite3

bd = sqlite3.connect("contraseñas.db")

cursor = bd.cursor()

cursor.execute("SELECT * FROM contraseñas")
res = cursor.fetchall()