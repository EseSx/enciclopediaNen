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
const contenedorForm = document.getElementById("contenedorForm")
const pedidoDatos = document.getElementById("pedidoDatos")
const inputPedidoDatos = document.getElementById("inputPedidoDatos")
const botonCerrar = document.getElementById("botonCerrar")
const botonSiguiente = document.getElementById("botonSiguiente")

// Listas de datos a ingresar
const titulosDatosIngresar = [
    "Ingrese el nombre completo del personaje",
    "Ingrese la descripcion del personaje",
    "Ingrese la URL de una imagen para representar al personaje",
    "Ingrese las afiliaciones del personaje (Tome en cuenta que debera separarlas por puntos)",
    "Ingrese las habilidades nen del personaje (Tome en cuenta que debera separarlas por puntos)",
    "Ingrese el color representativo del personaje"
]

let nombreJson, descripcionJson, urlJson, afiliacionJson, habilidadesJson, colorJson
let indicePedidos = 0
let contenedorDesplegable

function manejarclick() {
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

    if (indicePedidos === titulosDatosIngresar.length - 1) {
        botonSiguiente.innerHTML = "ENVIAR"
    }
}

// Utilidad del boton "Ingresar"
botonIngresar.addEventListener("click", function () {
    indicePedidos = 0
    nombreJson = descripcionJson = urlJson = afiliacionJson = habilidadesJson = colorJson = inputPedidoDatos.value = ""

    contenedorDesplegable = document.createElement("div")
    contenedorDesplegable.classList.add("contenedorDesplegable")
    const div = document.createElement("div")
    div.classList.add("divDesplegable")

    document.body.appendChild(contenedorDesplegable)
    contenedorDesplegable.appendChild(div)
    div.appendChild(contenedorForm)
    contenedorForm.style.display = "block"

    pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos]
    botonSiguiente.innerHTML = "SIGUIENTE"
    inputPedidoDatos.value = ""
    inputPedidoDatos.type = "text"

    botonSiguiente.removeEventListener("click", manejarclick)
    botonSiguiente.addEventListener("click", manejarclick)
})