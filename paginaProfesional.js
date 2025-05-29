// Pantalla parra introducir la contraseña
document.addEventListener("DOMContentLoaded", () => {

  // Codigo Viejo
  const div = document.createElement("div");
  div.classList.add("divDesplegable");

  const h1 = document.createElement("h1");
  h1.textContent = "Ingrese una contraseña";

  const inputContraseña = document.createElement("input");
  inputContraseña.type = "password";

  const botonContraseña = document.createElement("button");
  botonContraseña.textContent = "siguiente";

  const contenedorDesplegable = document.createElement("div");
  contenedorDesplegable.classList.add("contenedorDesplegable");

  document.body.appendChild(contenedorDesplegable);

  contenedorDesplegable.appendChild(div);
  div.appendChild(h1);
  div.appendChild(inputContraseña);
  div.appendChild(botonContraseña);

  botonContraseña.addEventListener("click", () => {
    const contraseñaJS = inputContraseña.value.trim();

    if (contraseñaJS === "") {
      alert("Es obligatorio ingresar una contraseña");
      return;
    }

    enviarContraseña(contraseñaJS);
  });

  async function enviarContraseña(contraseña) {
    const data = {
      contraseña: contraseña,
    };

    try {
      const respuesta = await fetch(
        "http://127.0.0.1:8000/api/guardar_contraseña",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (respuesta.ok) {
        const resultado = await respuesta.json();
        console.log("Respuesta de la API:", resultado);
        confirmar(resultado);
      } else {
        const errorTexto = await respuesta.text();
        console.error("Error en la solicitud:", errorTexto);
        alert("Error: " + errorTexto);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("No se pudo conectar con la API");
    }
  }

  function confirmar(resultado) {
    if (resultado.resultado === true) {
      document.body.removeChild(contenedorDesplegable);
    } else {
      alert("Contraseña incorrecta");
    }
  }
});

// !IMPORTANTE¡ Revisar esta zona para adaptarla a fastAPI

// Botones del CRU
const botonIngresar = document.getElementById("botonIngresar");
const botonModificar = document.getElementById("botonModificar");
const botonEliminar = document.getElementById("botonEliminar");

// Formulario de personajes
// contenedores
const contenedorForm = document.getElementById("contenedorForm");
const contenedorPHOA = document.getElementById("contenedorPHOA");

// PHOA |"PHOA" Es la eleccion Personaje, Habilidad, Organizacion/Afiliacion que existe en cada formulario|
const PHOA = document.getElementById("PHOA");
const Personaje = document.getElementById("Personaje");
const Habilidad = document.getElementById("Habilidad");
const OrganizacionAfiliacion = document.getElementById(
  "OrganizacionAfiliacion"
);

// Pedido general de datos
const pedidoDatos = document.getElementById("pedidoDatos");
const inputPedidoDatos = document.getElementById("inputPedidoDatos");
const botonCerrar = document.getElementById("botonCerrar");
const botonSiguiente = document.getElementById("botonSiguiente");

// Listas de datos a ingresar por cada form
const titulosDatosIngresar = [
  "Ingrese el nombre completo del personaje",
  "Ingrese la descripcion del personaje",
  "Ingrese la URL de una imagen para representar al personaje",
  "Ingrese las afiliaciones del personaje",
  "Ingrese las habilidades nen del personaje",
  "Ingrese el color representativo del personaje",
];

// Datos a enviar a la api
let nombreJson,
  descripcionJson,
  urlJson,
  afiliacionJson,
  habilidadesJson,
  colorJson;

// Indice de las listas de datos previamente nombradas
let indicePedidos = 0;

// Contenedor de los formularios
let contenedorDesplegable;

function manejarclick() {
  // Guardo cada dato y reseteo el input despues de cada uso
  switch (indicePedidos) {
    case 0:
      nombreJson = inputPedidoDatos.value;
      inputPedidoDatos.value = "";
      break;
    case 1:
      descripcionJson = inputPedidoDatos.value;
      inputPedidoDatos.value = "";
      break;
    case 2:
      urlJson = inputPedidoDatos.value;
      inputPedidoDatos.value = "";
      break;
    case 3:
      afiliacionJson = inputPedidoDatos.value;
      inputPedidoDatos.value = "";
      break;
    case 4:
      habilidadesJson = inputPedidoDatos.value;
      inputPedidoDatos.value = "";
      break;
    case 5:
      colorJson = inputPedidoDatos.value;
      break;
  }

  // La logica para el envio de datos a la api
  if (botonSiguiente.innerHTML === "ENVIAR") {
    // Validación de campos vacíos
    if (
      !nombreJson ||
      !descripcionJson ||
      !urlJson ||
      !afiliacionJson ||
      !habilidadesJson ||
      !colorJson
    ) {
      alert("Por favor complete todos los campos antes de enviar.");
      return;
    }

    indicePedidos = 0;

    if (document.body.contains(contenedorDesplegable)) {
      document.body.removeChild(contenedorDesplegable);
    }

    const data = {
      nombre: String(nombreJson),
      descripcion: String(descripcionJson),
      url: String(urlJson),
      afiliacion: String(afiliacionJson),
      habilidades: String(habilidadesJson),
      color: String(colorJson),
    };

    fetch("http://localhost:8000/api/formularioIngresar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((respuesta) => {
        if (!respuesta.ok)
          throw new Error("Error en la respuesta del servidor.");
        return respuesta.json();
      })
      .then((resultado) => {
        console.log("Respuesta del servidor:", resultado);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al enviar los datos.");
      });
  }

  // Asigna el tipo de dato que se va a ingresar en cada caso y aumenta el indice
  if (indicePedidos < titulosDatosIngresar.length - 1) {
    indicePedidos++;

    pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos];

    switch (indicePedidos) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        inputPedidoDatos.type = "text";
        break;
      case 5:
        inputPedidoDatos.type = "color";
        break;
    }
  }

  // Cambia el texto de siguiente en el caso de que no hayan mas opciones
  if (indicePedidos === titulosDatosIngresar.length - 1) {
    botonSiguiente.innerHTML = "ENVIAR";
  } else {
    botonSiguiente.innerHTML = "SIGUIENTE";
  }

  if (indicePedidos !== 0) {
    botonCerrar.innerHTML = "ATRAS";
  } else {
    botonCerrar.innerHTML = "CERRAR";
  }
}

// Utilidad del boton "Ingresar"
botonIngresar.addEventListener("click", function () {
  // Organizacion de datos para mostrar los formularios en pantalla
  contenedorDesplegable = document.createElement("div");
  contenedorDesplegable.classList.add("contenedorDesplegable");

  const div = document.createElement("div");
  div.classList.add("divDesplegable");

  document.body.appendChild(contenedorDesplegable);
  contenedorDesplegable.appendChild(div);
  div.appendChild(contenedorPHOA);
  contenedorPHOA.style.display = "flex";

  // Asignacion de textos a los elementos del PHOA
  PHOA.innerHTML = "Vamos a conjurar nuevos datos";
  Personaje.innerHTML = "Conjurar personaje";
  Habilidad.innerHTML = "Conjurar habilidad";
  OrganizacionAfiliacion.innerHTML = "Conjurar organizacion/afiliacion";

  // Si se selecciona "Personaje"
  Personaje.addEventListener("click", () => {
    // Borro el contenedor previo
    document.body.removeChild(contenedorDesplegable);

    // Reseteo los valores a 0 cada vez que se vuelve a seleccionar el formulario
    indicePedidos = 0;
    nombreJson =
      descripcionJson =
      urlJson =
      afiliacionJson =
      habilidadesJson =
      colorJson =
      inputPedidoDatos.value =
        "";

    // Organizacion de datos para mostrar los formularios en pantalla
    contenedorDesplegable = document.createElement("div");
    contenedorDesplegable.classList.add("contenedorDesplegable");
    const div = document.createElement("div");
    div.classList.add("divDesplegable");

    // Le doy visibilidad al Form
    document.body.appendChild(contenedorDesplegable);
    contenedorDesplegable.appendChild(div);
    div.appendChild(contenedorForm);
    contenedorForm.style.display = "flex";

    // Asigno lo que se va a mostrar el primera instancia, y borro los datos que puedan quedar en el input
    pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos];
    botonSiguiente.innerHTML = "SIGUIENTE";
    inputPedidoDatos.value = "";
    inputPedidoDatos.type = "text";

    botonSiguiente.removeEventListener("click", manejarclick);
    botonSiguiente.addEventListener("click", manejarclick);

    botonCerrar.addEventListener("click", function () {
      // Borro el dato anterior y reseteo el input
      switch (indicePedidos) {
        case 0:
          nombreJson = "";
          inputPedidoDatos.value = "";
          break;
        case 1:
          descripcionJson = "";
          inputPedidoDatos.value = "";
          break;
        case 2:
          urlJson = "";
          inputPedidoDatos.value = "";
          break;
        case 3:
          afiliacionJson = "";
          inputPedidoDatos.value = "";
          break;
        case 4:
          habilidadesJson = "";
          inputPedidoDatos.value = "";
          break;
        case 5:
          colorJson = "";
          break;
      }

      // La logica para cerrar el contenedor
      if (botonCerrar.innerHTML === "CERRAR") {
        indicePedidos = 0;
        document.body.removeChild(contenedorDesplegable);
      }

      // Asigna el tipo de dato que se va a ingresar en cada caso y reduzco el indice
      if (indicePedidos > 0) {
        indicePedidos = indicePedidos - 1;
        pedidoDatos.innerHTML = titulosDatosIngresar[indicePedidos];
        switch (indicePedidos) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            inputPedidoDatos.type = "text";
            break;
          case 5:
            inputPedidoDatos.type = "color";
            break;
        }
      }

      // Cambia el texto de siguiente en el caso de que no hayan mas opciones
      if (indicePedidos === titulosDatosIngresar.length - 1) {
        botonSiguiente.innerHTML = "ENVIAR";
      } else {
        botonSiguiente.innerHTML = "SIGUIENTE";
      }

      if (indicePedidos !== 0) {
        botonCerrar.innerHTML = "ATRAS";
      } else {
        botonCerrar.innerHTML = "CERRAR";
      }
    });
  });
});
