var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// export class PokeApi {
//   url: string;
//   constructor() {
//     this.url = 'https://pokeapi.co/api/v2/pokemon/';
//   }
//   getPoke(): Promise<Array<IPoke>> {
//     return fetch(this.url).then((response) => response.json());
//   }
// }
export const getAllPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log(data);
    });
});
