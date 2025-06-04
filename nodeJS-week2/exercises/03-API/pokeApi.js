const callApi = async () => {
    const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    return await pokemonData.json();
}

const result = await callApi();
console.log(result);