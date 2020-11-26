import tileHeightMap from "../maps/tileHeightMap";
import map from '../maps/map0';
import state from '../store/state';

/**
*  Tile object
*  stores all info related to the tile object 
*/

export default class Tile {
    constructor({ x, y }) {
        if (this.validateParams(x,y)) {
            window.console.error("The tile object received too many/few arguments!");
        } else {
            this.tileWidth = state.env.tileWidth;
            
            this.c = state.env.mapY - this.tileWidth * x * 0.5;
            this.d = this.tileWidth * 1.5;
            
            if (tileHeightMap.length !== state.env.map.length) {
                window.console.error("tileHeightMap size is different than map height!");
            } else {
                // every height degree is one quarter of the tile's own height
                this.tileYoffset = this.tileWidth + tileHeightMap[y][x] * this.tileWidth / 4;
                this.topYfactor = this.tileWidth * y * 0.5;
                this.topYsegment = this.c + this.topYfactor - this.tileYoffset;
                
                this.rectColors = state.env.rectColors;
                this.rectShadowColors = state.env.rectShadowColors;
                
                this.fillColor = this.rectShadowColors[map[y][x]];
                this.rectColor = this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
            }
        }
    }
    validateParams(x,y) {
        return x == undefined || y == undefined;
    }
}