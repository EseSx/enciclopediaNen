// Desplegar botones del CRU (la "D" esta en la otra pagina)
const botonPrincipal = document.getElementById('botonPrincipal')
const botonesDesplegables = document.getElementById('botonesDesplegables')

botonPrincipal.addEventListener("click", function () {
    if (botonesDesplegables.style.display === "none" || botonesDesplegables.style.display === "") {
        botonesDesplegables.style.display = "block"
        botonPrincipal.textContent = "Ocultar botones"
    } else {
        botonesDesplegables.style.display = "none"
        botonPrincipal.textContent = "Mostrar botones"
    }
})

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
const contenedorFormIng = document.getElementById("contenedorFormIng")

// Utilidad del boton "Ingresar"
botonIngresar.addEventListener("click", function () {
    const div = document.createElement('div')
    div.classList.add('divDesplegable')

    const contenedorDesplegable = document.createElement('div')
    contenedorDesplegable.classList.add('contenedorDesplegable')

    document.body.appendChild(contenedorDesplegable)
    contenedorDesplegable.appendChild(div)
    div.appendChild(contenedorFormIng)
    contenedorFormIng.style.display = "block"
})

// Formulario ingresar
const formularioIngresar = document.getElementById("formularioIngresar")
formularioIngresar.addEventListener("submit" , function(event){
    event.preventDefault()
})