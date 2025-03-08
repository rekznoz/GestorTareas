// https://pokeapi.co/api/v2/

/**
 * getPokemonOptions
 * @description Función que retorna un arreglo de promesas con las opciones de pokemons
 * @returns {Promise} Retorna un arreglo de promesas con las opciones de pokemons
 */
export const getPokemonOptions = async () => {
    const pokemons = Array.from(Array(4)).map( async () => {
        const id = Math.floor(Math.random() * 898) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        return {
            id: data.id,
            name: data.name,
        }
    });
    return Promise.all(pokemons);
}