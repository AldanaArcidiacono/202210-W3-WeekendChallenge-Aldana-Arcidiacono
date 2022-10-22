import { IPoke } from '../model/poke.js';
import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';

export class PokeList extends Component {
  template!: string;
  pokes: any;
  pokesInfo: any;
  api: PokeApi;
  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = '';
    this.pokesInfo = '';
    this.startPokes();
  }
  async startPokes() {
    this.pokes = await this.api.getPoke();
    const pokesArr: any = [];
    this.pokes.results.forEach((item: any) => {
      pokesArr.push(item.url);
    });
    this.pokesInfo = await Promise.all(
      pokesArr.map((url: string) =>
        fetch(url).then((response) => response.json())
      )
    );

    this.manageComponent();
  }
  manageComponent() {
    console.log(this.pokes);
    this.template = this.createTemplate();
    this.render(this.selector, this.template);
  }
  createTemplate() {
    this.template = ``;
    this.pokesInfo.forEach((item: any) => {
      this.template += `
      <div class="pokes-container">
        <h1 class="pokes-name">${item.species.name}</h1>
        <img class="pokes-img" src="${item.sprites.other.dream_world.front_default}" alt="${item.species.name}">
      </div>`;
    });
    return this.template;
  }
}
