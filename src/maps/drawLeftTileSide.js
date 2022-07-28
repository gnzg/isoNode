"use strict";
exports.__esModule = true;
var state_1 = require("../store/state");
exports["default"] = (function (tile) {
    var x = tile.x;
    var y = tile.y;
    var z = tile.z;
    var ctx = state_1["default"].ctx;
    var map_tiles = state_1["default"].env.map_tiles;
    var map_tiles_height = state_1["default"].env.map_tiles_height;
    var map_offset_x = state_1["default"].env.map_offset_x;
    var debug = state_1["default"].debug_mode;
    // left tile side
    if (
    // draw if first tile in row
    x === 0 ||
        // or, if preceeded by an empty tile on the x axis,
        map_tiles[y][x - 1] === 0 ||
        // or if not exceeding row length
        x > map_tiles[y].length - 1 ||
        // if current tile's height is greater than its predecessor's
        map_tiles_height[y][x] > map_tiles_height[y][x - 1]) {
        // if current tile has a higher height, draw under drawn elements
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        var zMultiplier = z === 0 ? 0 : z - 1;
        var topHalf = tile.c +
            tile.tileWidth * y -
            y * tile.tileWidth * 0.5 -
            tile.tileYoffset +
            tile.d;
        var bottomHalf = tile.c +
            tile.tileWidth * y -
            y * tile.tileWidth * 0.5 -
            tile.tileYoffset +
            tile.tileWidth * 1.75 +
            zMultiplier * (tile.tileWidth / 4);
        // establish left tile side height based on previous tile's height, if it exists
        var prevTileZ = map_tiles_height[y][x - 1] ? map_tiles_height[y][x - 1] : 0;
        var prevTileZOffset = prevTileZ * (tile.tileWidth / 4);
        // upper left corner of tile
        ctx.moveTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x, topHalf);
        // bottom left corner of tile
        ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x, bottomHalf - prevTileZOffset);
        // bottom right corner of tile
        ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth, bottomHalf + tile.tileWidth * 0.5 - prevTileZOffset);
        // upper right corner of tile
        ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth, topHalf);
        ctx.closePath();
        ctx.fillStyle = tile.fillColor;
        ctx.fill();
        // for debugging purposes, draw point at position 0
        if (x === 0 && y === 0 && debug) {
            ctx.beginPath();
            ctx.globalCompositeOperation = "source-over";
            var dummyX = tile.tileWidth * y + map_offset_x + tile.tileWidth * x;
            var dummyY = topHalf;
            ctx.arc(dummyX, dummyY, 3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
});
