# Creo la API
from fastapi import FastAPI

app = FastAPI()

# Configuro el CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Creo los modelos de entrada con Pydantic
from pydantic import BaseModel


class ContraseñaData(BaseModel):
    contraseña: str


class DatosFormulario(BaseModel):
    # Cambiar por los datos pertinentes a futuro
    nombre: str
    edad: int
    habilidad: str


# Rutas
from BDkeys import evaluador


@app.post("/api/guardar_contraseña")
async def guardar_contraseña(data: ContraseñaData):
    resultado = await evaluador(data.contraseña)
    return {
        "mensaje": "Contraseña guardada con éxito",
        "contraseñas": data.contraseña,
        "resultado": resultado,
    }


@app.post("/api/formularioIngresar")
async def guardar_datos_personajes(data: DatosFormulario):
    print(data)
    return {"mensaje": "Datos recibidos correctamente", "datos": data}
