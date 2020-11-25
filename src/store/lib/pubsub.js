export default class PubSub {
  constructor() {
    this.subscribers = {};
  }
  subscribe(event, callback) {
    let self = this;
    
    if(!Object.prototype.hasOwnProperty.call(self.subscribers, event)) {
      self.subscribers[event] = [];
    }

    return self.subscribers[event].push(callback);
  }
  publish(event, data = {}) {
    let self = this;

    if(!Object.prototype.hasOwnProperty.call(self.subscribers, event)) {
      return [];
    }

    return self.subscribers[event].map(callback => callback(data));
  }
}