import Component from '../lib/component';
import store from '../store';

// creating an instance of Component, and equipping it with a store instance

export default class canvasWrapper extends Component {
  constructor(elementId) {
    super({
      store,
      element: document.getElementById(elementId)
    });
  }
  render() {

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    store.dispatch('renderTiles');

    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;
  }
}

// smooth out map movements