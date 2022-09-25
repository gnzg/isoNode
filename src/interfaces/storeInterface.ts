import PubSub from '../store/lib/pubsub';
import StateInterface from './stateInterface';

export default interface StoreInterface {
  ctx?: CanvasRenderingContext2D;
  status: string;
  events?: PubSub;
  actions?: any;
  mutations?: any;
  state?: StateInterface;
}
