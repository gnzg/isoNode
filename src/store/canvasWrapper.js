import StoreComponent from "./lib/storeComponent";
import store from "./index";

// Create a child of the storeComponent class and assign it the canvas element

export default class CanvasWrapper extends StoreComponent {
  constructor(elementId) {
    super({
      store,
      element: document.getElementById(elementId),
    });
  }
  initialize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;

    store.dispatch("centerCanvas");
    store.dispatch("updateCanvas");
    store.dispatch("createTileHitBoxes");

  }
}
