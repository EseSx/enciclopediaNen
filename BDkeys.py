import sqlite3

bd = sqlite3.connect("contraseñas.db", check_same_thread=False)

cursor = bd.cursor()


async def evaluador(contraseña):
    cursor.execute("SELECT * FROM contraseñas WHERE contraseña=?", (contraseña,))
    res = cursor.fetchone()

    if res:
        return True
    return False
