# --- Configuración de la base de datos ---
import sqlite3

bd = sqlite3.connect(
    "contraseñas.db", check_same_thread=False
)  # Conexión a la base de datos SQLite

cursor = bd.cursor()  # Cursor para ejecutar consultas


# --- Funciones ---
# Función que evalúa si una contraseña ya está registrada en la base de datos
async def evaluador(contraseña):
    """
    Evalúa si la contraseña ya está registrada en la base de datos.

    Args:
        contraseña (str): Contraseña ingresada por el usuario.

    Returns:
        bool: True si la contraseña existe en la base de datos, False en caso contrario.
    """
    cursor.execute("SELECT * FROM contraseñas WHERE contraseña=?", (contraseña,))
    res = cursor.fetchone()

    # Devuelve True si se encontró, False si no
    if res:
        return True
    return False
