const apartadoPersonajes = document.getElementById("apartadoPersonajes")

apartadoPersonajes.addEventListener("click", function () {
    async function solicitudPersonaje() {
        fetch("http://127.0.0.1:8000/personajes")
            .then((response) => response.json())
            .then((response) => receptorJS(response))
    }
    apartadoPersonajes.style.fontSize = '30px';
})

function receptorJS(data) {
    console.log(data)
}