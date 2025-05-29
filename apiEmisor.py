# --- Creacion de la aplicacion FastAPI ---
from fastapi import FastAPI

app = FastAPI()

# --- Configuracion del CORS ---
from fastapi.middleware.cors import CORSMiddleware

# Permite solicitudes desde cualquier origen (útil para desarrollo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes
    allow_credentials=True,  # Permitir el uso de cookies/autenticación
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)


# --- Rutas de la API ---
@app.get("/personajes")
def getNumbers():
    """
    Devuelve una estructura vacía como respuesta a la ruta /personajes.

    Returns:
        dict: Diccionario vacío (debe ser reemplazado por datos de personajes en el futuro).
    """
    return {}
