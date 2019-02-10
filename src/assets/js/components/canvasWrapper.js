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
    //let ctx = this.element.getContext('2d');
    // add ctx to store
    console.log('store.state.env', store.state.env);

    renderTiles(store.state.env);

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    this.element.innerHTML = `<canvas>Browser does not support canvas.</canvas>`;
  }
}