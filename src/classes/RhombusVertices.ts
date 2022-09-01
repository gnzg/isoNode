import state from "../store/state";
import store from "../store/index";
import { TileType } from "../interfaces/TileType";
import { Point } from "../interfaces/Point";

export default class RhombusVertices {
    tile: TileType;         // the tile in question
    x: number;              // x value relative to canvas
    y: number;              // y value relativ to canvas
    pointA: Point;
    pointB: Point;
    pointC: Point;
    pointD: Point;

    constructor(tile, x, y) {
        if (this !== undefined && y !== undefined && x !== undefined) {
            let map_offset_x = state.map_data.map_offset_x;
            let tileWidth = state.map_data.tileWidth;
            let d = tile.d;

            // leftmost point
            this.pointA = {
                x: tileWidth * y + map_offset_x + tileWidth * x,
                y: d + tile.topYsegment,
            };
            // central bottom point
            this.pointB = {
                x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth,
                y: tile.topYsegment + tileWidth * 2,
            };
            // rightmost point
            this.pointC = {
                x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth * 2,
                y: d + tile.topYsegment,
            };
            // central top point
            this.pointD = {
                x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth,
                y: tile.topYsegment + tileWidth,
            };
        } else {
            store.dispatch("error", "RhombusVertrices received too many/few arguments!");
        }
    }
}
