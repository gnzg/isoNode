import Component from '../lib/component';
import store from '../store';

// creating an instance of Component, and equipping it with a store instance

export default class canvasWrapper extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#foo')
    });
  }
  render() {
    this.element.innerHTML = `<div>${store.state.items.length}</div>`;
  }
}