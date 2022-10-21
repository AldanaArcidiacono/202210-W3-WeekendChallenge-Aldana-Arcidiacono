var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { PokeApi } from '../services/poke.api.js';
import { Component } from './components.js';
export class PokeList extends Component {
    // api: PokeApi;
    constructor(selector) {
        super();
        this.selector = selector;
        // this.api = new PokeApi();
    }
    startTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.poke = await this.api.getPoke();
            this.manageComponent();
        });
    }
    manageComponent() {
        this.template = this.createTemplate();
        this.render(this.selector, this.template);
    }
    createTemplate() {
        return ``;
    }
}
