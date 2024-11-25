from flask import Flask, Request, jsonify

app = Flask(__name__)

datos = []


@app.route("/api/guardar_contraseña", methods=["POST"])
def guardarContraseña():
    datos = Request.get_json()

    if not datos or "contraseña" not in datos:
        return jsonify({"mensaje": "El campo 'contraseña' es obligatorio"}), 400

    contraseña = datos["contraseña"]

    return jsonify({"mensaje": "Contraseña guardada con exito", "contraseñas": contraseña}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
