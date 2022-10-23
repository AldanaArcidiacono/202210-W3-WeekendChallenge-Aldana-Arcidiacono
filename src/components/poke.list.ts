import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';

export class PokeList extends Component {
  template!: string;
  pokes: any;
  api: PokeApi;
  pokesInfo: Array<string>;
  nextPagePokes: any;
  nextPageInfo: any;
  previousPagePokes: any;
  previousPageInfo: any;
  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = '';
    this.pokesInfo = [];
    this.nextPagePokes = '';
    this.nextPageInfo = [];
    this.previousPagePokes = '';
    this.previousPageInfo = [];
    this.startInitialFetch();
  }

  async startInitialFetch() {
    this.pokes = await this.api.getPoke();
    const pokesArr: Array<string> = [];

    this.pokes.results.forEach((item: any) => {
      pokesArr.push(item.url);
    });

    this.pokesInfo = await Promise.all(
      pokesArr.map((url: string) => fetch(url).then((result) => result.json()))
    );

    // this.nextPageInfo();
    // this.previousPageFetch();
    //this.manageComponent();
    // }

    /// -----------NEXT

    // async nextPageFetch() {
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
    //this.manageComponent();
    //}

    /// -----------PREVIOUS

    //async previousPageFetch() {
    //if (this.pokes.previous !== null) {
    this.previousPageInfo = await this.api.getPreviousPage(this.pokes.previous);
    const previousPokeArr: Array<string> = [];

    this.previousPageInfo.results.forEach((item: any) => {
      previousPokeArr.push(item.url);
    });

    this.previousPagePokes = await Promise.all(
      previousPokeArr.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
    //}

    this.manageComponent();
  }

  manageComponent() {
    //manageComponent(array = this.pokesInfo) {
    //this.template = this.createTemplate(array);
    this.template = this.createTemplate(this.pokesInfo);
    this.render(this.selector, this.template);

    document.querySelector('.next-button')?.addEventListener('click', () => {
      //this.template = this.createTemplate(array);
      this.template = this.createTemplate(this.nextPagePokes);
      this.render(this.selector, this.template);
      // this.pokes = this.nextPagePokes;
      // this.pokesInfo = this.nextPageInfo;
      // this.nextPageInfo();
      // this.previousPageFetch();
      // this.manageComponent();
    });

    document
      .querySelector('.previous-button')
      ?.addEventListener('click', () => {
        console.log('first');
        //this.template = this.createTemplate(array);
        this.template = this.createTemplate(this.previousPagePokes);
        this.render(this.selector, this.template);
        // this.pokes = this.previousPagePokes;
        // this.pokesInfo = this.previousPageInfo;
        // this.nextPageInfo();
        // this.previousPageFetch();
        // this.manageComponent();
      });
  }

  createTemplate(array: Array<string>) {
    this.template = `<div class="pokes-container">`;
    array.forEach((item: any) => {
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
