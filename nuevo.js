// Esperar a que cargue el DOM
window.addEventListener("DOMContentLoaded", () => {
  crearPantallaContraseña();
});

// ==================== 1. Pantalla de contraseña ====================
function crearPantallaContraseña() {
  const contenedorClave = document.createElement("div");
  contenedorClave.id = "contenedorClave";
  contenedorClave.innerHTML = `
    <input id="claveInput" type="password" placeholder="Contraseña">
    <button id="botonClave">Siguiente</button>
  `;
  document.body.appendChild(contenedorClave);

  document.getElementById("botonClave").addEventListener("click", () => {
    const clave = document.getElementById("claveInput").value.trim();
    if (clave === "") {
      alert("Ingrese la contraseña");
      return;
    }
    enviarContraseña(clave);
  });
}

async function enviarContraseña(clave) {
  try {
    const response = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: clave }),
    });
    const data = await response.json();
    confirmarContraseña(data);
  } catch (error) {
    alert("Error en la conexión con el servidor.");
  }
}

function confirmarContraseña(data) {
  if (data.correcto) {
    document.getElementById("contenedorClave").remove();
    crearBotonIngreso();
  } else {
    alert("Contraseña incorrecta");
  }
}

// ==================== 2. Botón principal ====================
function crearBotonIngreso() {
  const botonIngresar = document.createElement("button");
  botonIngresar.textContent = "Ingresar";
  document.body.appendChild(botonIngresar);

  botonIngresar.addEventListener("click", () => {
    mostrarOpcionesIngreso();
  });
}

function mostrarOpcionesIngreso() {
  if (document.getElementById("contenedorOpciones")) return;

  const opciones = document.createElement("div");
  opciones.id = "contenedorOpciones";
  opciones.innerHTML = `
    <button id="btnPersonaje">Personaje</button>
    <button id="btnHabilidad">Habilidad</button>
    <button id="btnOrganizacion">Organización</button>
  `;
  document.body.appendChild(opciones);

  document.getElementById("btnPersonaje").addEventListener("click", () => {
    mostrarFormularioPersonaje();
    opciones.remove();
  });
  document.getElementById("btnHabilidad").addEventListener("click", () => {
    mostrarFormularioHabilidad();
    opciones.remove();
  });
  document.getElementById("btnOrganizacion").addEventListener("click", () => {
    mostrarFormularioOrganizacion();
    opciones.remove();
  });
}

// ==================== 3. Formulario Personaje ====================
const titulosDatosIngresar = [
  "Nombre del personaje",
  "Edad",
  "Tipo de Nen",
  "Descripción"
];
let indicePedidos = 0;
const datosPersonaje = [];

function mostrarFormularioPersonaje() {
  const contenedor = document.createElement("div");
  contenedor.id = "formularioPersonaje";
  contenedor.innerHTML = `
    <input id="inputFormulario" placeholder="${titulosDatosIngresar[indicePedidos]}">
    <button id="btnSiguiente">Siguiente</button>
  `;
  document.body.appendChild(contenedor);

  document.getElementById("btnSiguiente").addEventListener("click", manejarClickFormulario);
}

function manejarClickFormulario() {
  const input = document.getElementById("inputFormulario");
  const valor = input.value.trim();
  if (valor === "") {
    alert("Campo vacío");
    return;
  }
  datosPersonaje[indicePedidos] = valor;
  indicePedidos++;

  if (indicePedidos < titulosDatosIngresar.length) {
    input.placeholder = titulosDatosIngresar[indicePedidos];
    input.value = "";
  } else {
    enviarDatosPersonaje(datosPersonaje);
  }
}

async function enviarDatosPersonaje(datos) {
  try {
    const response = await fetch("/api/personajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ datos }),
    });
    const data = await response.json();
    if (data.exito) {
      alert("Personaje agregado correctamente");
      reiniciarFormulario();
    } else {
      alert("Error al agregar personaje");
    }
  } catch (error) {
    alert("Error al conectar con la API");
  }
}

function reiniciarFormulario() {
  indicePedidos = 0;
  datosPersonaje.length = 0;
  const input = document.getElementById("inputFormulario");
  input.value = "";
  input.placeholder = titulosDatosIngresar[0];
}

// ==================== 4. Formularios Habilidad y Organización (stubs) ====================
function mostrarFormularioHabilidad() {
  alert("Formulario para habilidad aún no implementado");
}

function mostrarFormularioOrganizacion() {
  alert("Formulario para organización aún no implementado");
}
