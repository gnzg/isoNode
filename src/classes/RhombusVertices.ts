import state from "../store/state";
import store from "../store/index";
import { TileType } from "../interfaces/TileType";
import { Point } from "../interfaces/Point";

export default class RhombusVertices {
    tile: TileType;
    x: number;
    y: number;
    pointA: Point;
    pointB: Point;
    pointC: Point;
    pointD: Point;

    constructor(x, y) {
        if (this !== undefined && y !== undefined && x !== undefined) {
            let map_offset_x = state.map_data.map_offset_x;

            // leftmost point
            this.pointA = {
                x: this.tile.tileWidth * y + map_offset_x + this.tile.tileWidth * x,
                y: this.tile.d + this.tile.topYsegment,
            };
            // central bottom point
            this.pointB = {
                x: this.tile.tileWidth * y + map_offset_x + this.tile.tileWidth * x + this.tile.tileWidth,
                y: this.tile.topYsegment + this.tile.tileWidth * 2,
            };
            // rightmost point
            this.pointC = {
                x: this.tile.tileWidth * y + map_offset_x + this.tile.tileWidth * x + this.tile.tileWidth * 2,
                y: this.tile.d + this.tile.topYsegment,
            };
            // central top point
            this.pointD = {
                x: this.tile.tileWidth * y + map_offset_x + this.tile.tileWidth * x + this.tile.tileWidth,
                y: this.tile.topYsegment + this.tile.tileWidth,
            };
        } else {
            store.dispatch("error", "RhombusVertrices received too many/few arguments!");
        }
    }
}
