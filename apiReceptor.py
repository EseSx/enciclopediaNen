from flask import Flask, request, jsonify
from flask_cors import CORS
from BDkeys import evaluador

app = Flask(__name__)

CORS(app)

datos = []


@app.route("/api/guardar_contraseña", methods=["POST"])
async def guardarContraseña():
    datos = request.get_json()

    if not datos or "contraseña" not in datos:
        return jsonify({"mensaje": "El campo 'contraseña' es obligatorio"}), 400

    contraseña = datos["contraseña"]

    resultado = await evaluador(contraseña)

    return (
        jsonify(
            {
                "mensaje": "Contraseña guardada con exito",
                "contraseñas": contraseña,
                "resultado": resultado,
            }
        ),
        201,
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)


@app.route("/api/formularioIngresar", methods=["POST"])
async def guardarDatosPersonajes():
    datos = request.get_json()

    print(datos)
