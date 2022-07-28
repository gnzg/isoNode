"use strict";
exports.__esModule = true;
var default_1 = /** @class */ (function () {
    function default_1(props) {
        var self = this;
        this.render = this.render || new Function();
        props.store.events.subscribe('stateChange', function () { return self.render(); });
        if (Object.prototype.hasOwnProperty.call(props, 'element')) {
            this.element = props.element;
        }
    }
    return default_1;
}());
exports["default"] = default_1;
