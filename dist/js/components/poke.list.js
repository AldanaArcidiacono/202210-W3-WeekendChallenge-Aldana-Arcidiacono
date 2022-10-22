var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';
export class PokeList extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.api = new PokeApi();
        this.pokes = '';
        this.pokesInfo = '';
        this.startPokes();
    }
    startPokes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokes = yield this.api.getPoke();
            const pokesArr = [];
            this.pokes.results.forEach((item) => {
                pokesArr.push(item.url);
            });
            this.pokesInfo = yield Promise.all(pokesArr.map((url) => fetch(url).then((response) => response.json())));
            this.manageComponent();
        });
    }
    manageComponent() {
        console.log(this.pokes);
        this.template = this.createTemplate();
        this.render(this.selector, this.template);
    }
    createTemplate() {
        this.template = ``;
        this.pokesInfo.forEach((item) => {
            this.template += `
      <div class="pokes-container">
        <h2 class="pokes-name">${item.species.name}</h2>
        <img class="pokes-img" src="${item.sprites.other.dream_world.front_default}" alt="${item.species.name}">
      </div>`;
        });
        return this.template;
    }
}
