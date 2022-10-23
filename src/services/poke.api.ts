import { IResults } from '../model/poke.js';

export class PokeApi {
  url: string;
  constructor() {
    this.url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  }
  getPoke(): Promise<Array<IResults>> {
    return fetch(this.url).then((response) => response.json());
  }
  getNextPage(nextUrl: string): Promise<Array<IResults>> {
    return fetch(nextUrl).then((response) => response.json());
  }
  getPreviousPage(previousUrl: string): Promise<Array<IResults>> {
    if (!previousUrl) return this.getPoke();
    return fetch(previousUrl).then((response) => response.json());
  }
}
