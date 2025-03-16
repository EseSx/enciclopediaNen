import sqlite3

bd = sqlite3.connect("personajes.db")

cursor = bd.cursor()

cursor.execute(
    "CREATE TABLE IF NOT EXISTS personajes(id INTEGER PRIMARY KEY, nombreCompleto, descripcionWiki, imagenPersonaje, colorPersonaje, id_organizaciones, id_habilidades)"
)
cursor.execute(
    "CREATE TABLE IF NOT EXISTS organizaciones(id INTEGER PRIMARY KEY, nombreOrganizacion, descripcionWikiOrganizacion, imagenOrganizacion, id_miembros, id_lider)"
)
cursor.execute(
    "CREATE TABLE IF NOT EXISTS habilidades(id INTEGER PRIMARY KEY, nombreHabilidadNen, descripcionWiki, capacidadUnica, tipoNen, imagenNen, controlDelNenAvanzado, bestiaNen, id_usuarios)"
)
