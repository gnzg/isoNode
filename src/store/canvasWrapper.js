"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var storeComponent_1 = require("./lib/storeComponent");
var store_1 = require("./store");
// Create a child class of the storeComponent class and assign it the canvas element
var CanvasWrapper = /** @class */ (function (_super) {
    __extends(CanvasWrapper, _super);
    function CanvasWrapper(elementId) {
        return _super.call(this, {
            store: new store_1["default"]({ status: "resting" }),
            element: document.getElementById(elementId)
        }) || this;
    }
    CanvasWrapper.prototype.initialize = function () {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
        this.element.innerHTML = "<canvas>Browser does not support canvas.</canvas>";
    };
    return CanvasWrapper;
}(storeComponent_1["default"]));
exports["default"] = CanvasWrapper;
