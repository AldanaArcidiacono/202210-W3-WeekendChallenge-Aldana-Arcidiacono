import { IPoke } from '../model/poke.js';

// export class PokeApi {
//   url: string;
//   constructor() {
//     this.url = 'https://pokeapi.co/api/v2/pokemon/';
//   }
//   getPoke(): Promise<Array<IPoke>> {
//     return fetch(this.url).then((response) => response.json());
//   }
// }
export const getAllPokemons = async () => {
  fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      return response.json();
    })
    .then((data: any) => {
      console.log(data);
    });
};
