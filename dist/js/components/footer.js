import { Component } from './components.js';
export class Footer extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
    }
    createTemplate() {
        return `
        <footer>
            <address>Aldana Arcidiacono</address>
        </footer>
        `;
    }
}
