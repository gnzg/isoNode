import PubSub from '../store/lib/pubsub';
import StateInterface from './StateInterface';

export default interface StoreInterface {
  ctx?: CanvasRenderingContext2D;
  status: string;
  events: PubSub;
  actions: any;
  mutations: any;
  state: StateInterface;
}
