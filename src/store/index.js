"use strict";
exports.__esModule = true;
var actions_1 = require("./actions");
var index_1 = require("./mutations/index");
var state_1 = require("./state");
var store_1 = require("./store");
exports["default"] = new store_1["default"]({
    actions: actions_1["default"],
    mutations: index_1["default"],
    state: state_1["default"]
});
