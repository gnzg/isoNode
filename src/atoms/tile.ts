import tileHeightMap from "../maps/tileHeightMap";
import map from '../maps/map0';
import state from '../store/state';
import store from '../store/index';

/**
*  Tile object
*  stores all info related to the tile object 
*/
export default class Tile {
    x: number;
    y: number;
    c: number;
    d: number;
    tileWidth: number;
    tileYoffset : number;
    topYfactor: number;
    topYsegment: number;
    rectColors: string[];
    rectShadowColors: string[];
    fillColor : string;
    rectColor : string;

    constructor({ x, y }) {
        if (this.areParamsInvalid(x,y)) {
            store.dispatch("error", "The tile object incorrect number of parameters!");
        } else {
            this.tileWidth = state.env.tileWidth;
            
            this.c = state.env.map_offset_y - this.tileWidth * x * 0.5;
            this.d = this.tileWidth * 1.5;
            
            if (tileHeightMap.length !== state.env.map.length) {
                store.dispatch("error", "tileHeightMap size is different than map height!");
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
    areParamsInvalid(x,y) {
        return x == undefined || y == undefined;
    }
}