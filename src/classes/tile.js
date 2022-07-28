"use strict";
exports.__esModule = true;
var state_1 = require("../store/state");
var index_1 = require("../store/index");
var colors_1 = require("../utilities/colors");
/**
*  Tile object
*  stores all info related to the tile object
*/
var Tile = /** @class */ (function () {
    function Tile(_a) {
        var x = _a.x, y = _a.y, _b = _a.z, z = _b === void 0 ? 0 : _b;
        // TODO: z parameter
        if (this.areParamsInvalid(x, y)) {
            index_1["default"].dispatch("error", "The tile object incorrect number of parameters!");
        }
        else {
            this.tileWidth = state_1["default"].env.tileWidth;
            this.x = x;
            this.y = y;
            this.z = z;
            this.c = state_1["default"].env.map_offset_y - this.tileWidth * x * 0.5;
            this.d = this.tileWidth * 1.5;
            // check if tile map and tile height map lengths are the same
            if (state_1["default"].env.map_tiles_height.length !== state_1["default"].env.map_tiles.length) {
                index_1["default"].dispatch("error", "map_tiles_height length is different than map_tiles height!");
            }
            else {
                this.tileHeight = state_1["default"].env.map_tiles_height[y][x];
                this.tileType = state_1["default"].env.map_tiles[y][x];
                // every height degree is one quarter of the tile's own height
                this.tileYoffset = this.tileWidth + this.tileHeight * this.tileWidth / 4;
                this.topYfactor = this.tileWidth * y * 0.5;
                this.topYsegment = this.c + this.topYfactor - this.tileYoffset;
                // refers to the tile's sides
                this.fillColor = Object.values(colors_1["default"].rectShadowColors)[this.tileType];
                // refers to the tile's top rectangle
                this.rectColor = Object.values(colors_1["default"].rectColors)[this.tileType];
            }
        }
    }
    Tile.prototype.areParamsInvalid = function (x, y) {
        return x == undefined || y == undefined;
    };
    return Tile;
}());
exports["default"] = Tile;
