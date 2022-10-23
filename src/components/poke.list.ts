import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';

export class PokeList extends Component {
  template!: string;
  pokes: any;
  api: PokeApi;
  pokesInfo: Array<string>;
  nextPageInfo: any;
  nextPagePokes: any;
  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = '';
    this.pokesInfo = [];
    this.startPokes();
  }

  async startPokes() {
    this.pokes = await this.api.getPoke();
    const pokesArr: Array<string> = [];

    this.pokes.results.forEach((item: any) => {
      pokesArr.push(item.url);
    });

    this.pokesInfo = await Promise.all(
      pokesArr.map((url: string) => fetch(url).then((result) => result.json()))
    );

    this.nextPageInfo = await this.api.getNextPage(this.pokes.next);

    const nextPokeArr: Array<string> = [];

    this.nextPageInfo.results.forEach((item: any) => {
      nextPokeArr.push(item.url);
    });

    this.nextPagePokes = await Promise.all(
      nextPokeArr.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );

    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate(this.pokesInfo);
    this.renderAdd(this.selector, this.template);

    document.querySelector('.next-button')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.nextPagePokes);
      this.render(this.selector, this.template);
    });
  }

  createTemplate(array: Array<string>) {
    this.template = `<div class="pokes-container">`;
    array.forEach((item: any) => {
      this.template += `
      <div class="poke-card">
        <h2 class="pokes-name">${item.species.name}</h2>
        <img class="pokes-img" src="${item.sprites.other.dream_world.front_default}" alt="${item.species.name}">
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
