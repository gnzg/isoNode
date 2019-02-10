import Component from '../lib/component';
import store from '../store';
import renderTiles from '../renderTiles';

// creating an instance of Component, and equipping it with a store instance

export default class canvasWrapper extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#main')
    });
  }
  render() {

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    renderTiles(store.state.env);

    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;
  }
}