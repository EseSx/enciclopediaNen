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

# --- Creacion los modelos de entrada con Pydantic ---
from pydantic import BaseModel


class ContraseñaData(BaseModel):
    """Modelo para recibir una contraseña desde el frontend."""

    contraseña: str


class DatosFormulario(BaseModel):
    """Modelo de datos del formulario para registrar personajes."""

    nombre: str
    descripcion: str
    url: str
    afiliacion: str
    habilidades: str
    color: str


# --- Importación de funciones de la base de datos ---
from BDkeys import evaluador

# from BDpersonajes import ingresador


# --- Rutas de la API ---
@app.post("/api/guardar_contraseña")
async def guardar_contraseña(data: ContraseñaData):
    """
    Verifica si la contraseña enviada ya está registrada en la base de datos.

    Args:
        data (ContraseñaData): Objeto con la contraseña a evaluar.

    Returns:
        dict: Mensaje de confirmación y resultado de la evaluación.
    """
    resultado = await evaluador(data.contraseña)
    return {
        "mensaje": "Contraseña guardada con éxito",
        "contraseñas": data.contraseña,
        "resultado": resultado,
    }


# @app.post("/api/formularioIngresar")
# async def guardar_datos_personajes(data: DatosFormulario):
#     """
#     Recibe y guarda los datos de un personaje enviados desde un formulario.

#     Args:
#         data (DatosFormulario): Objeto con los datos del personaje.

#     Returns:
#         dict: Mensaje de confirmación junto con los datos recibidos.
#     """
#     ingresador(data)
#     return {"mensaje": "Datos recibidos correctamente", "datos": data}
