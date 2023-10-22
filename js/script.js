document.addEventListener("DOMContentLoaded", function () {
    const apiUrlBase = "https://pokeapi.co/api/v2/pokemon/";

    // Elementos HTML
    const resultadoElement = document.getElementById("resultado");
    const nombrePokemonInput = document.getElementById("nombrePokemon");
    const buscarButton = document.getElementById("buscar");

    // Función para buscar y mostrar información de un Pokémon
    function buscarPokemon(nombre) {
        const apiUrl = `${apiUrlBase}${nombre.toLowerCase()}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Manipula los datos recibidos y muestra en la página
                const nombre = data.name;
                const tipos = data.types.map(tipo => tipo.type.name).join(", ");
                const imagenUrl = data.sprites.front_default;

                resultadoElement.innerHTML = `
                    <h2>Nombre: ${nombre}</h2>
                    <p>Tipos: ${tipos}</p>
                    <img src="${imagenUrl}" alt="${nombre}">
                `;
            })
            .catch(error => {
                console.error("Hubo un error:", error);
                resultadoElement.innerHTML = "No se encontró el Pokémon.";
            });
    }

    // Manejar la búsqueda cuando se haga clic en el botón
    buscarButton.addEventListener("click", function () {
        const nombrePokemon = nombrePokemonInput.value.trim();
        if (nombrePokemon) {
            buscarPokemon(nombrePokemon);
        }
    });

    // Manejar la búsqueda cuando se presione Enter en el campo de texto
    nombrePokemonInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const nombrePokemon = nombrePokemonInput.value.trim();
            if (nombrePokemon) {
                buscarPokemon(nombrePokemon);
            }
        }
    });
});
