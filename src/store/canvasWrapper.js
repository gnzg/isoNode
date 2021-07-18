import StoreComponent from './lib/storeComponent';
import store from './index';

// Create an instance of Component, and equipping it with a store instance

export default class CanvasWrapper extends StoreComponent {
  constructor(elementId) {
    super({
      store,
      element: document.getElementById(elementId)
    });
  }
  render() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;
  }
  initialize() {
    store.dispatch('centerCanvas');
    store.dispatch('updateCanvas');
    store.dispatch("createTileHitBox");
  }
}
