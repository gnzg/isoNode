import StoreComponent from "./lib/storeComponent";
import Store from './store';


// Create a child class of the storeComponent class and assign it the canvas element
class CanvasWrapper extends StoreComponent {
  constructor(elementId) {
    super({
      store: new Store ({status: "resting"}),
      element: document.getElementById(elementId),
    });
  }
  initialize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;
  }
}

export default CanvasWrapper;