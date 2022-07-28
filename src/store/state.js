"use strict";
exports.__esModule = true;
var index_1 = require("../store/index");
var colors_1 = require("../utilities/colors");
var map0_1 = require("../maps/map0");
var canvas = document.querySelector('#main');
if (!canvas)
    index_1["default"].dispatch("error", "no canvas context found!");
var State = {
    ctx: canvas.getContext('2d'),
    debug_mode: false,
    maxTileHeight: 8,
    acceleration: 5,
    cursorInMap: undefined,
    cursor_pos_x: 0,
    cursor_pos_y: 0,
    env: {
        tileWidth: 24,
        map_tiles: map0_1["default"].tiles,
        map_tiles_height: map0_1["default"].tile_height,
        // a tile hitbox is an object with the form {pointA, pointB, pointC, pointD}
        tileHitBoxes: [],
        lastHoveredTile: {
            x: undefined,
            y: undefined
        },
        lastHoveredTileType: 0,
        rectColors: colors_1["default"].rectColors,
        rectShadowColors: colors_1["default"].rectShadowColors,
        // @param Array; Area to clear relative to the canvas
        clearArea: [-1000, 0, 4000, 4000],
        // @param Integer; the degree of map rotation
        rotationDegree: 0,
        // map_offset_x and map_offset_y are offsets to make sure we can position the map as we want.
        map_offset_x: 0,
        map_offset_y: 350,
        winWidth: window.innerWidth,
        winHeight: window.innerHeight
    },
    // save a map of pressed keys to allow key combinations
    keyMap: {
        w: false,
        a: false,
        s: false,
        d: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        " ": false
    }
};
exports["default"] = State;
