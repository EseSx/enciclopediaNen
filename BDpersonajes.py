# # --- Configuración de la base de datos ---
import sqlite3

bd = sqlite3.connect("hunterpedia.db")  # Conexión a la base de datos SQLite

cursor = bd.cursor()  # Cursor para ejecutar consultas

# Activar el uso de claves foráneas en SQLite
cursor.execute("PRAGMA foreign_keys = ON;")

# --- Creación de las tablas si no existen ---
cursor.executescript(
    """
    CREATE TABLE IF NOT EXISTS personajes (
    pj_id INTEGER PRIMARY KEY ,
    nombre_pj TEXT  UNIQUE,
    nombre_jp_pj TEXT  UNIQUE,
    genero TEXT ,
    edad TEXT ,
    altura TEXT ,
    peso TEXT ,
    fecha_de_nacimiento TEXT ,
    color_de_ojos TEXT ,
    color_de_pelo TEXT ,
    tipo_de_sangre TEXT,
    estado_pj TEXT,
    imagen_pj TEXT,
    raza TEXT);

    CREATE TABLE IF NOT EXISTS pj_al (
    pj_id INTEGER,
    al_id INTEGER,
    FOREIGN KEY(pj_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(al_id) REFERENCES alias(al_id));

    CREATE TABLE IF NOT EXISTS alias (
    al_id INTEGER PRIMARY KEY ,
    nombre_al TEXT UNIQUE,
    nombre_jp_al TEXT UNIQUE);

    CREATE TABLE IF NOT EXISTS pj_af (
    pj_id INTEGER ,
    af_id INTEGER ,
    rol TEXT ,
    FOREIGN KEY(pj_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(af_id) REFERENCES afiliacion(af_id));

    CREATE TABLE IF NOT EXISTS afiliacion (
    af_id INTEGER PRIMARY KEY ,
    nombre_af TEXT  UNIQUE,
    nombre_jp_af TEXT  UNIQUE,
    estado_af TEXT ,
    clasificacion TEXT ,
    imagen_af TEXT );

    CREATE TABLE IF NOT EXISTS ub_af (
    ub_id INTEGER ,
    af_id INTEGER ,
    FOREIGN KEY(ub_id) REFERENCES ubicacion(ub_id),
    FOREIGN KEY(af_id) REFERENCES afiliacion(af_id));

    CREATE TABLE IF NOT EXISTS ubicacion (
    ub_id INTEGER PRIMARY KEY ,
    nombre_ub TEXT  UNIQUE);

    CREATE TABLE IF NOT EXISTS af_al (
    af_id INTEGER ,
    al_id INTEGER ,
    FOREIGN KEY(af_id) REFERENCES afiliacion(af_id),
    FOREIGN KEY(al_id) REFERENCES alias(al_id));

    CREATE TABLE IF NOT EXISTS ocupacion (
    oc_id INTEGER PRIMARY KEY ,
    nombre_oc TEXT  UNIQUE,
    estado_oc TEXT );

    CREATE TABLE IF NOT EXISTS pj_oc (
    pj_id INTEGER ,
    oc_id INTEGER ,
    FOREIGN KEY(pj_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(oc_id) REFERENCES ocupacion(oc_id));

    CREATE TABLE IF NOT EXISTS nen (
    nen_id INTEGER PRIMARY KEY ,
    tipo_nen TEXT  UNIQUE,
    tipo_jp_nen TEXT  UNIQUE,
    descripcion_nen TEXT ,
    color_representativo TEXT ,
    imagen_nen TEXT );

    CREATE TABLE IF NOT EXISTS pj_nen (
    pj_id INTEGER ,
    nen_id INTEGER ,
    FOREIGN KEY(pj_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(nen_id) REFERENCES nen(nen_id));

    CREATE TABLE IF NOT EXISTS habilidades (
    hb_id INTEGER PRIMARY KEY ,
    tipo_hb TEXT ,
    nombre_hb TEXT  UNIQUE,
    nombre_jp_hb TEXT ,
    descripcion_hb TEXT ,
    imagen_hb TEXT ,
    nen_id INTEGER ,
    hb_padre INTEGER,
    FOREIGN KEY(nen_id) REFERENCES nen(nen_id),
    FOREIGN KEY(hb_padre) REFERENCES habilidades(hb_id));

    CREATE TABLE IF NOT EXISTS pj_hb (
    pj_id INTEGER ,
    hb_id INTEGER ,
    obtención TEXT ,
    FOREIGN KEY(pj_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(hb_id) REFERENCES habilidades(hb_id));

    CREATE TABLE IF NOT EXISTS relacion (
    pj_1_id INTEGER ,
    pj_2_id INTEGER ,
    relacion TEXT ,
    FOREIGN KEY(pj_1_id) REFERENCES personajes(pj_id),
    FOREIGN KEY(pj_2_id) REFERENCES personajes(pj_id));
    """
)


# --- Funciones ---
# def ingresador(data):
#     """
#     Inserta un personaje en la base de datos y lo asocia con una organización.

#     Args:
#         data (DatosFormulario): Objeto con los datos del personaje, incluyendo:
#             - nombre: Nombre completo del personaje.
#             - descripcion: Descripción del personaje estilo Wikipedia.
#             - url: URL de la imagen del personaje.
#             - color: Color representativo del personaje.
#             - afiliacion: Nombre de la organización a la que pertenece.

#     Nota:
#         Actualmente no se almacenan las habilidades (falta por implementar).
#     """
#     # Insertar personaje (ignorar si ya existe)
#     cursor.execute(
#         "INSERT OR IGNORE INTO personajes (nombreCompleto, descripcionWiki, imagenPersonaje, colorPersonaje) VALUES (?, ?, ?, ?)",
#         (data.nombre, data.descripcion, data.url, data.color),
#     )

#     # Obtener ID del personaje recién insertado
#     cursor.execute("SELECT id FROM personajes WHERE nombreCompleto = ?", (data.nombre,))
#     id_personaje = cursor.fetchone()[0]

#     # Procesar el nombre de la organización (normalización)
#     nombre_organizacion = data.afiliacion.title().replace(" ", "")

#     # Verificar si la organización ya existe
#     cursor.execute(
#         "SELECT id FROM organizaciones WHERE nombreOrganizacion = ?",
#         (nombre_organizacion,),
#     )
#     resultado = cursor.fetchone()

#     if resultado:
#         id_organizacion = resultado[0]
#     else:
#         # Insertar nueva organización si no existe
#         cursor.execute(
#             "INSERT INTO organizaciones (nombreOrganizacion) VALUES (?)",
#             (nombre_organizacion,),
#         )
#         id_organizacion = cursor.lastrowid

#     # Insertar relación personaje-organización
#     cursor.execute(
#         "INSERT OR IGNORE INTO personajes_organizaciones (id_personaje, id_organizacion) VALUES (?, ?)",
#         (id_personaje, id_organizacion),
#     )

#     # Guardar cambios y cerrar conexión
#     bd.commit()

#     # TODO: Agregar lógica para guardar múltiples habilidades
