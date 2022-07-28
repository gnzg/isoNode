"use strict";
exports.__esModule = true;
var state_1 = require("../store/state");
var drawLeftTileSide_1 = require("./drawLeftTileSide");
var drawRightTileSide_1 = require("./drawRightTileSide");
exports["default"] = (function (tile) {
    var x = tile.x;
    var y = tile.y;
    var z = tile.z;
    var map_tiles = state_1["default"].env.map_tiles;
    var map_tiles_height = state_1["default"].env.map_tiles_height;
    // if the map is defined and the tile is non-zero, draw it
    if (map_tiles !== undefined &&
        map_tiles[y] !== undefined &&
        map_tiles[y][x] !== 0 &&
        // draw only the tiles correspond to the current height value i
        map_tiles_height[y][x] === z) {
        (0, drawLeftTileSide_1["default"])(tile);
        (0, drawRightTileSide_1["default"])(tile);
    }
    else if (map_tiles.length == 0) {
        console.error("Length of main map is zero!");
    }
});
