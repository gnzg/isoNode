export default class PubSub {
  constructor() {
    this.subscribers = {};
  }
  subscribe(event, callback) {
    let self = this;
    
    if(!self.subscribers.hasOwnProperty(event)) {
      self.subscribers[event] = [];
    }

    return self.subscribers[event].push(callback);
  }
  publish(event, data = {}) {
    let self = this;

    if(!self.subscribers.hasOwnProperty(event)) {
      return [];
    }

    return self.subscribers[event].map(callback => callback(data));
  }
}