import PubSub from "./lib/pubsub";
import StoreInterface from "../interfaces/StoreInterface";

class Store implements StoreInterface {
  status: StoreInterface["status"];
  events: PubSub;
  actions: StoreInterface["actions"];
  mutations: StoreInterface["mutations"];
  state: StoreInterface["state"];

  constructor(params) {
    // save the current context
    let self: this = this;
    self.status = "";
    self.events = new PubSub();

    if (Object.prototype.hasOwnProperty.call(params, "actions")) {
      self.actions = params.actions;
    }
    if (Object.prototype.hasOwnProperty.call(params, "mutations")) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy(params.state || {}, {
      set: function (state, key: string, value) {
        state[key] = value;

        /*
        // notify of a state change
        console.log(`stateChange: ${key}: ${value}`);
        */
        // warn if the new state was changed outside of a mutation
        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }
        /*
        // store the value
        //self.state[key] = state[key];
        */
        self.status = "resting";

        // indicate success
        return true;
      },
    });
  }
  dispatch(actionKey: string, payload?: any) {
    let self: this = this;

    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    if (actionKey !== "error") {
      // comment the below line out if you do not want action notifications
      console.groupCollapsed(`ACTION: ${actionKey}`);

      self.status = "action";

      self.actions[actionKey](self, payload);
      console.groupEnd();
    } else {
      console.groupEnd();
      console.error("ERROR:", payload);
      return false;
    }
    return true;
  }

  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== "function") {
      console.error(`Action "${mutationKey} doesn't exist.`);
      return false;
    }

    self.status = "mutation";

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);
    self.events.publish("stateChange", self.state);

    return true;
  }
}

export default Store;