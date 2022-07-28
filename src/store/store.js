"use strict";
exports.__esModule = true;
var pubsub_1 = require("./lib/pubsub");
var Store = /** @class */ (function () {
    function Store(params) {
        // save the current context
        var self = this;
        self.events = new pubsub_1["default"]();
        self.status = "resting";
        if (params.hasOwnProperty("actions")) {
            self.actions = params.actions;
        }
        if (params.hasOwnProperty("mutations")) {
            self.mutations = params.mutations;
        }
        self.state = new Proxy(params.state || {}, {
            set: function (state, key, value) {
                state[key] = value;
                // warn if the new state was changed outside of a mutation
                if (self.status !== "mutation") {
                    //console.warn(`You should use a mutation to set ${key}`);
                }
                self.status = "resting";
                // indicate success
                return true;
            }
        });
    }
    Store.prototype.dispatch = function (actionKey, payload) {
        var self = this;
        if (typeof self.actions[actionKey] !== "function") {
            console.error("Action \"".concat(actionKey, " doesn't exist."));
            return false;
        }
        if (actionKey !== "error") {
            // comment the below line out if you do not want action notifications
            console.groupCollapsed("ACTION: ".concat(actionKey));
            self.status = "action";
            self.actions[actionKey](self, payload);
            console.groupEnd();
        }
        else {
            console.groupEnd();
            console.error("ERROR:", payload);
            return false;
        }
        return true;
    };
    Store.prototype.commit = function (mutationKey, payload) {
        var self = this;
        if (typeof self.mutations[mutationKey] !== "function") {
            console.error("Action \"".concat(mutationKey, " doesn't exist."));
            return false;
        }
        self.status = "mutation";
        var newState = self.mutations[mutationKey](self.state, payload);
        self.state = Object.assign(self.state, newState);
        self.events.publish("stateChange", self.state);
        return true;
    };
    return Store;
}());
exports["default"] = Store;
