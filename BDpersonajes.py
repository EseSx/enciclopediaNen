# # --- Configuración de la base de datos ---
import sqlite3

bd = sqlite3.connect("personajes.db")  # Conexión a la base de datos SQLite

cursor = bd.cursor()  # Cursor para ejecutar consultas

# Activar el uso de claves foráneas en SQLite
cursor.execute("PRAGMA foreign_keys = ON;")

# --- Creación de las tablas si no existen ---
cursor.execute(
    "CREATE TABLE IF NOT EXISTS personajes(id INTEGER PRIMARY KEY, nombreCompleto UNIQUE, descripcionWiki UNIQUE, imagenPersonaje UNIQUE, colorPersonaje, id_habilidades, FOREIGN KEY (id_habilidades) REFERENCES habilidades (id))"
)
cursor.execute(
    "CREATE TABLE IF NOT EXISTS organizaciones(id INTEGER PRIMARY KEY, nombreOrganizacion UNIQUE, descripcionWikiOrganizacion, imagenOrganizacion)"
)
cursor.execute(
    "CREATE TABLE IF NOT EXISTS habilidades(id INTEGER PRIMARY KEY, nombreHabilidadNen, descripcionWiki, capacidadUnica, tipoNen, imagenNen, controlDelNenAvanzado, bestiaNen, usuarios)"
)
cursor.execute(
    "CREATE TABLE IF NOT EXISTS personajes_organizaciones (id_personaje INTEGER, id_organizacion INTEGER, FOREIGN KEY (id_personaje) REFERENCES personajes(id), FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id), PRIMARY KEY (id_personaje, id_organizacion))"
)


# --- Funciones ---
def ingresador(data):
    """
    Inserta un personaje en la base de datos y lo asocia con una organización.

    Args:
        data (DatosFormulario): Objeto con los datos del personaje, incluyendo:
            - nombre: Nombre completo del personaje.
            - descripcion: Descripción del personaje estilo Wikipedia.
            - url: URL de la imagen del personaje.
            - color: Color representativo del personaje.
            - afiliacion: Nombre de la organización a la que pertenece.

    Nota:
        Actualmente no se almacenan las habilidades (falta por implementar).
    """
    # Insertar personaje (ignorar si ya existe)
    cursor.execute(
        "INSERT OR IGNORE INTO personajes (nombreCompleto, descripcionWiki, imagenPersonaje, colorPersonaje) VALUES (?, ?, ?, ?)",
        (data.nombre, data.descripcion, data.url, data.color),
    )

    # Obtener ID del personaje recién insertado
    cursor.execute("SELECT id FROM personajes WHERE nombreCompleto = ?", (data.nombre,))
    id_personaje = cursor.fetchone()[0]

    # Procesar el nombre de la organización (normalización)
    nombre_organizacion = data.afiliacion.title().replace(" ", "")

    # Verificar si la organización ya existe
    cursor.execute(
        "SELECT id FROM organizaciones WHERE nombreOrganizacion = ?",
        (nombre_organizacion,),
    )
    resultado = cursor.fetchone()

    if resultado:
        id_organizacion = resultado[0]
    else:
        # Insertar nueva organización si no existe
        cursor.execute(
            "INSERT INTO organizaciones (nombreOrganizacion) VALUES (?)",
            (nombre_organizacion,),
        )
        id_organizacion = cursor.lastrowid

    # Insertar relación personaje-organización
    cursor.execute(
        "INSERT OR IGNORE INTO personajes_organizaciones (id_personaje, id_organizacion) VALUES (?, ?)",
        (id_personaje, id_organizacion),
    )

    # Guardar cambios y cerrar conexión
    bd.commit()

    # TODO: Agregar lógica para guardar múltiples habilidades
