import { Store } from '../store';

export default class StoreComponent {
  constructor(props ={}) {
    let self = this;

    this.render = this.render || function() {};

    if(props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element;
    }
  }
}