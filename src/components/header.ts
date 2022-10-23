import { Component } from './components.js';

export class Header extends Component {
  template: string;
  constructor(public selector: string) {
    super();
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
    //new Menu('header>slot');
  }
  createTemplate() {
    return `
        <header>
          <div>
            <h1>PokeApi</h1>
            <img src="../assets/pokemon-logo.svg" alt="Pokemon Logo">
          </div>
        </header>
        `;
  }
}
