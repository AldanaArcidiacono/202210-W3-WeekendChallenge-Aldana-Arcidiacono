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
        this.pokesInfo = [];
        this.nextInfo = [];
        this.nextPokes = '';
        this.previousInfo = [];
        this.previousPokes = '';
        this.startInitialFetch();
    }
    startInitialFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokes = yield this.api.getPoke();
            const pokesArr = [];
            console.log('POKES', this.pokes);
            this.pokes.results.forEach((item) => {
                pokesArr.push(item.url);
            });
            this.pokesInfo = yield Promise.all(pokesArr.map((url) => fetch(url).then((result) => result.json())));
            this.nextPageFetch();
            this.previousPageFetch();
            this.manageComponent();
        });
    }
    nextPageFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextPokes = yield this.api.getNextPage(this.pokes.next);
            const nextPokeArr = [];
            this.nextPokes.results.forEach((item) => {
                nextPokeArr.push(item.url);
            });
            this.nextInfo = yield Promise.all(nextPokeArr.map((url) => fetch(url).then((result) => result.json())));
            console.log('NEXTINFO', this.nextInfo);
            console.log('NEXTPOKES', this.nextPokes);
        });
    }
    previousPageFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.previousPokes = yield this.api.getPreviousPage(this.pokes.previous);
            const previousPokeArr = [];
            this.previousPokes.results.forEach((item) => {
                previousPokeArr.push(item.url);
            });
            this.previousInfo = yield Promise.all(previousPokeArr.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    manageComponent() {
        var _a, _b;
        this.template = this.createTemplate();
        this.render(this.selector, this.template);
        (_a = document.querySelector('.next-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.pokes = this.nextPokes;
            this.pokesInfo = this.nextInfo;
            this.nextPageFetch();
            this.previousPageFetch();
            this.manageComponent();
        });
        (_b = document
            .querySelector('.previous-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.pokes = this.previousPokes;
            this.pokesInfo = this.previousInfo;
            this.nextPageFetch();
            this.previousPageFetch();
            this.manageComponent();
        });
    }
    createTemplate() {
        this.template = `<div class="pokes-container">`;
        this.pokesInfo.forEach((item) => {
            console.log('ITEM', item);
            this.template += `
      <div class="poke-card">
        <h2 class="pokes-name">${item.species.name}</h2>
        <img class="pokes-img" src="${item.sprites.other.dream_world.front_default}" alt="${item.species.name}" width="300">
      </div>`;
        });
        this.template += `</div>
    <div class="page-buttons">
      <button class="previous-button">Anterior</button>
      <button class="next-button">Siguiente</button>
    </div>`;
        return this.template;
    }
}
