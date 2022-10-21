import { IPoke } from '../model/poke.js';
//import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';

export class PokeList extends Component {
  template: string;
  poke: Array<IPoke>;
  // api: PokeApi;
  constructor(public selector: string) {
    super();
    // this.api = new PokeApi();
  }
  async startTasks() {
    // this.poke = await this.api.getPoke();
    this.manageComponent();
  }
  manageComponent() {
    this.template = this.createTemplate();
    this.render(this.selector, this.template);
  }
  createTemplate() {
    return ``;
  }
}
