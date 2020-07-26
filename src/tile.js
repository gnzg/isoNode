import tileHeightMap from "./maps/tileHeightMap";
import map from './maps/map0';
import state from './store/state';

/**
*  Virtual Tile object
*  stores all info related to the tile object 
*/
export default class Tile {
    constructor({ x, y }) {
        if (Object.keys(arguments[0]).length === 2) {
            /* tile coordinates */
            this.x = x;
            this.y = y;
            
            this.tileWidth = state.env.tileWidth;

            this.c = state.env.mapY - this.tileWidth * this.x * 0.5;
            this.d = this.tileWidth * 1.5;
            
            /* size */
            
            this.tileYoffset = this.tileWidth * tileHeightMap[this.y][this.x] * 1.25 + map[this.y][this.x]*10;
            this.topYfactor = this.tileWidth * this.y * 0.5;
            this.topYsegment = this.c + this.topYfactor - this.tileYoffset;

            this.rectColors = state.env.rectColors;
            this.rectShadowColors = state.env.rectShadowColors;
            
            this.fillColor = this.rectShadowColors[map[this.y][this.x]];
            this.rectColor = this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
        } else {
            console.error("The tile object received too many/few arguments!");
        }
    }
}