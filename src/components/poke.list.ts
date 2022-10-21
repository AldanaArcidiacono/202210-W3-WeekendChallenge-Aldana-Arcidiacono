import { IPoke } from '../model/poke.js';
import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';

export class PokeList extends Component {
  template: string;
  pokes: any;
  api: PokeApi;
  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = '';
    this.startPokes();
  }
  async startPokes() {
    this.pokes = await this.api.getPoke();
    this.manageComponent();
  }
  manageComponent() {
    console.log(this.pokes);
    this.template = this.createTemplate();
    this.render(this.selector, this.template);
  }
  createTemplate() {
    this.template = ``;
    this.pokes.results.forEach((pokemon: any) => {
      this.template += `<h1>${pokemon.name}</h1>`;
    });
    return this.template;
  }
}
