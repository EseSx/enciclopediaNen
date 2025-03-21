// Pantalla parra introducir la contraseña
// document.addEventListener("DOMContentLoaded", function () {
//     const div = document.createElement('div')
//     div.classList.add('divDesplegable')

//     const h1 = document.createElement('h1')
//     h1.textContent = 'Ingrese una contraseña'

//     const inputContraseña = document.createElement('input')

//     const botonContraseña = document.createElement('button')
//     botonContraseña.textContent = 'siguiente'

//     const contenedorDesplegable = document.createElement('div')
//     contenedorDesplegable.classList.add('contenedorDesplegable')

//     document.body.appendChild(contenedorDesplegable)

//     contenedorDesplegable.appendChild(div)
//     div.appendChild(h1)
//     div.appendChild(inputContraseña)
//     div.appendChild(botonContraseña)

//     botonContraseña.addEventListener("click", function () {
//         if (inputContraseña.value == "") {
//             alert("Es obligatorio ingresar una contraseña")
//         } else {
//             contraseñaJS = inputContraseña.value

//             const enviarContraseña = async () => {
//                 const data = {
//                     contraseña: contraseñaJS
//                 }

//                 try {
//                     const respuesta = await fetch("http://127.0.0.1:5000/api/guardar_contraseña", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(data)
//                     })

//                     if (respuesta.ok) {
//                         const resultado = await respuesta.json()
//                         console.log("Respuesta de la API:", resultado)
//                         confirmador(resultado)
//                     } else {
//                         console.error("Error en la solicitud:", await respuesta.text())
//                     }
//                 } catch (error) {
//                     console.error("Error al conectar con la API:", error)
//                 }
//             }

//             enviarContraseña()
//         }
//         function confirmador(valido) {
//             if (valido.resultado == true) {
//                 document.body.removeChild(contenedorDesplegable)
//             } else {
//                 alert("contraseña incorrecta")
//             }
//         }
//     })
// })

// Botones del CRU
const botonIngresar = document.getElementById("botonIngresar")
const botonModificar = document.getElementById("botonModificar")
const botonEliminar = document.getElementById("botonEliminar")

// Formulario de personajes
// contenedores
const contenedorForm = document.getElementById("contenedorForm")
const contenedorPHOA = document.getElementById("contenedorPHOA")
// PHOA |"PHOA" Es la eleccion Personaje, Habilidad, Organizacion/Afiliacion que existe en cada formulario|
const PHOA = document.getElementById("PHOA")
const Personaje = document.getElementById("Personaje")
const Habilidad = document.getElementById("Habilidad")
const OrganizacionAfiliacion = document.getElementById("OrganizacionAfiliacion")
// Pedido general de datos
const pedidoDatos = document.getElementById("pedidoDatos")
const inputPedidoDatos = document.getElementById("inputPedidoDatos")
const botonCerrar = document.getElementById("botonCerrar")
const botonSiguiente = document.getElementById("botonSiguiente")

// Listas de datos a ingresar por cada form
const titulosDatosIngresar = [
    "Ingrese el nombre completo del personaje",
    "Ingrese la descripcion del personaje",
    "Ingrese la URL de una imagen para representar al personaje",
    "Ingrese las afiliaciones del personaje (Tome en cuenta que debera separarlas por puntos)",
    "Ingrese las habilidades nen del personaje (Tome en cuenta que debera separarlas por puntos)",
    "Ingrese el color representativo del personaje"
]

// Datos a enviar a la api
let nombreJson, descripcionJson, urlJson, afiliacionJson, habilidadesJson, colorJson
// Indice de las listas de datos previamente nombradas
let indicePedidos = 0
// Contenedor de los formularios
let contenedorDesplegable

function manejarclick() {
    // Guardo cada dato y reseteo el input despues de cada uso
    switch (indicePedidos) {
        case 0:
            nombreJson = inputPedidoDatos.value
            inputPedidoDatos.value = ""
            break
        case 1:
            descripcionJson = inputPedidoDatos.value
            inputPedidoDatos.value = ""
            break
        case 2:
            urlJson = inputPedidoDatos.value
            inputPedidoDatos.value = ""
            break
        case 3:
            afiliacionJson = inputPedidoDatos.value
            inputPedidoDatos.value = ""
            break
        case 4:
            habilidadesJson = inputPedidoDatos.value
            inputPedidoDatos.value = ""
            break
        case 5:
            colorJson = inputPedidoDatos.value
            break
    }

    // La logica par ael envio de datos a la api
    // |IMPORTANTE| Falta conectar a la api
    if (botonSiguiente.innerHTML === "ENVIAR") {
        indicePedidos = 0
        document.body.removeChild(contenedorDesplegable)
        const data = {
            nombre: nombreJson,
            descripcion: descripcionJson,
            url: urlJson,
            afiliacion: afiliacionJson,
            habilidades: habilidadesJson,
            color: colorJson
        }
        console.log(data)
    }

    // Asigna el tipo de dato que se va a ingresar en cada caso
    if (indicePedidos < titulosDatosIngresar.length - 1) {
        indicePedidos++
        pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos]
        switch (indicePedidos) {
            case 0:
            case 1:
            case 3:
            case 4:
                inputPedidoDatos.type = "text"
                break
            case 2:
                inputPedidoDatos.type = "url"
                break
            case 5:
                inputPedidoDatos.type = "color"
                break
        }
    }

    // Cambia el texto de siguiente en el caso de que no hayan mas opciones
    if (indicePedidos === titulosDatosIngresar.length - 1) {
        botonSiguiente.innerHTML = "ENVIAR"
    }
}

// Utilidad del boton "Ingresar"
botonIngresar.addEventListener("click", function () {

    // Organizacion de datos para mostrar los formularios en pantalla
    contenedorDesplegable = document.createElement("div")
    contenedorDesplegable.classList.add("contenedorDesplegable")
    const div = document.createElement("div")
    div.classList.add("divDesplegable")

    document.body.appendChild(contenedorDesplegable)
    contenedorDesplegable.appendChild(div)
    div.appendChild(contenedorPHOA)
    contenedorPHOA.style.display = "flex"

    // Asignacion de textos a los elementos del PHOA
    PHOA.innerHTML = "Vamos a conjurar nuevos datos"
    Personaje.innerHTML = "Conjurar personaje"
    Habilidad.innerHTML = "Conjurar habilidad"
    OrganizacionAfiliacion.innerHTML = "Conjurar organizacion/afiliacion"

    // Si se selecciona "Personaje"
    Personaje.addEventListener("click", function () {
        // Reseteo los valores a 0 cada vez que se vuelve a seleccionar el formulario
        indicePedidos = 0
        nombreJson = descripcionJson = urlJson = afiliacionJson = habilidadesJson = colorJson = inputPedidoDatos.value = ""

        // Organizacion de datos para mostrar los formularios en pantalla
        contenedorDesplegable = document.createElement("div")
        contenedorDesplegable.classList.add("contenedorDesplegable")
        const div = document.createElement("div")
        div.classList.add("divDesplegable")

        // Le doy visibilidad al Form
        document.body.appendChild(contenedorDesplegable)
        contenedorDesplegable.appendChild(div)
        div.appendChild(contenedorForm)
        contenedorForm.style.display = "block"

        // Asigno lo que se va a mostrar el primera instancia, y borro los datos que puedan quedar en el input
        pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos]
        botonSiguiente.innerHTML = "SIGUIENTE"
        inputPedidoDatos.value = ""
        inputPedidoDatos.type = "text"

        botonSiguiente.removeEventListener("click", manejarclick)
        botonSiguiente.addEventListener("click", manejarclick)
    })
})