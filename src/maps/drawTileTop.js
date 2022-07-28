"use strict";
exports.__esModule = true;
var state_1 = require("../store/state");
var drawOutlines_1 = require("./drawOutlines");
var RhombusVertices_1 = require("../math/RhombusVertices");
/**
 * @param Integer x    iterates across a map array
 * @param Integer y    iterates across a map array child's elements
 * @returns Object canvas
 */
exports["default"] = (function (tile) {
    var x = tile.x;
    var y = tile.y;
    var z = tile.z;
    var map_tiles = state_1["default"].env.map_tiles;
    var map_tiles_height = state_1["default"].env.map_tiles_height;
    var map_offset_x = state_1["default"].env.map_offset_x;
    var topYfactor = tile.tileWidth * y * 0.5;
    var topYsegment = tile.c + topYfactor - tile.tileYoffset;
    var ctx = state_1["default"].ctx;
    // tile top
    // draw only if current tile is non-zero
    // and if the tile height level corresponds to z
    if (map_tiles[y][x] !== 0 && map_tiles_height[y][x] === z) {
        // determine whether the surface will be drawn above or below
        // the present data on thecanvas
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = tile.rectColor;
        ctx.beginPath();
        // upper left corner of tile
        ctx.moveTo(tile.tileWidth * y + tile.tileWidth + map_offset_x + tile.tileWidth * x, tile.tileWidth + topYsegment);
        ctx.lineTo(tile.tileWidth * y +
            tile.tileWidth * 2 +
            map_offset_x +
            tile.tileWidth * x, tile.d + topYsegment);
        ctx.lineTo(tile.tileWidth * y + tile.tileWidth + map_offset_x + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
        ctx.lineTo(tile.tileWidth * y +
            tile.tileWidth -
            tile.tileWidth +
            map_offset_x +
            tile.tileWidth * x, tile.d + topYsegment);
        ctx.closePath();
        ctx.fill();
        // debug mode
        if (state_1["default"].debug_mode === true) {
            // establish coordinates for the four vertices of each rhombus
            var rhombusVertices = new RhombusVertices_1["default"]({ tile: tile, x: x, y: y });
            (0, drawOutlines_1["default"])({ ctx: ctx, rhombusVertices: rhombusVertices, x: x, y: y });
        }
    }
});
