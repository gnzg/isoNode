"use strict";
exports.__esModule = true;
// checks whether all object properties are false
/**
 *
 * @param {*} obj
 */
exports["default"] = (function (obj) {
    for (var property in obj) {
        if (obj[property] === false) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
});
