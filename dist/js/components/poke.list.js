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
        this.nextPagePokes = [];
        this.nextPageInfo = '';
        this.previousPagePokes = [];
        this.previousPageInfo = '';
        this.startInitialFetch();
    }
    startInitialFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokes = yield this.api.getPoke();
            const pokesArr = [];
            this.pokes.results.forEach((item) => {
                pokesArr.push(item.url);
            });
            this.pokesInfo = yield Promise.all(pokesArr.map((url) => fetch(url).then((result) => result.json())));
            this.nextPageFetch();
            this.previousPageFetch();
            this.manageComponent();
        });
    }
    /// -----------NEXT
    nextPageFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextPageInfo = yield this.api.getNextPage(this.pokes.next);
            const nextPokeArr = [];
            this.nextPageInfo.results.forEach((item) => {
                nextPokeArr.push(item.url);
            });
            this.nextPagePokes = yield Promise.all(nextPokeArr.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    /// -----------PREVIOUS
    previousPageFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.previousPageInfo = yield this.api.getPreviousPage(this.pokes.previous);
            const previousPokeArr = [];
            this.previousPageInfo.results.forEach((item) => {
                previousPokeArr.push(item.url);
            });
            this.previousPagePokes = yield Promise.all(previousPokeArr.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    //this.manageComponent();
    manageComponent() {
        var _a, _b;
        //manageComponent(array = this.pokesInfo) {
        //this.template = this.createTemplate(array);
        this.template = this.createTemplate(this.pokesInfo);
        this.render(this.selector, this.template);
        (_a = document.querySelector('.next-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.template = this.createTemplate(this.nextPagePokes);
            this.render(this.selector, this.template);
            // this.pokes = this.nextPagePokes;
            // this.pokesInfo = this.nextPageInfo;
            // this.nextPageFetch();
            // this.previousPageFetch();
            // this.manageComponent();
        });
        (_b = document
            .querySelector('.previous-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            console.log('first');
            this.template = this.createTemplate(this.previousPagePokes);
            this.render(this.selector, this.template);
            // this.pokes = this.previousPagePokes;
            // this.pokesInfo = this.previousPageInfo;
            // this.nextPageFetch();
            // this.previousPageFetch();
            // this.manageComponent();
        });
    }
    createTemplate(array) {
        this.template = `<div class="pokes-container">`;
        array.forEach((item) => {
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
