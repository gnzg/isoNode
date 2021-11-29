import Store from '../store';

export default class {
  protected render: Function;
  protected element: any;

  constructor(
      props: { store: Store, element: HTMLElement }) {

    let self = this;

    this.render = this.render || new Function();

    props.store.events.subscribe('stateChange', () => self.render());

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element;
    }
  }
}