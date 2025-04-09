// export const pokemonIds = [1, 20, 30, 34, 66];

export interface Pokemon {
  id: number;
  name: string;
  age?: number;
}

export const charmander: Pokemon = {
  id: 1,
  name: "Charmander",
  //   age: 10,
};

export const pikachu: Pokemon = {
  id: 2,
  name: "Pikachu",
  age: 7,
};

// console.log(charmander, pikachu);

export const pokemons: Pokemon[] = [];

pokemons.push(charmander, pikachu);
console.log(pokemons);
