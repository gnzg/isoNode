import tileHeightMap from "../maps/tileHeightMap";
import map from '../maps/map0';
import state from '../store/state';
import store from '../store/index';
import colors from '../helpers/colors';

/**
*  Tile object
*  stores all info related to the tile object 
*/
export default class Tile {
    x: number;
    y: number;
    z: number;
    c: number;
    d: number;
    tileWidth: number;
    tileYoffset : number;
    topYfactor: number;
    topYsegment: number;
    rectColors: Object;
    rectShadowColors: Object;
    fillColor : string;
    rectColor : string;

    constructor({ x, y, z }) {
        // TODO: z parameter
        if (this.areParamsInvalid(x, y)) {
            store.dispatch("error", "The tile object incorrect number of parameters!");
        } else {
            this.tileWidth = state.env.tileWidth;
            this.x = x;
            this.y = y;
            this.z = z;
            this.c = state.env.map_offset_y - this.tileWidth * x * 0.5;
            this.d = this.tileWidth * 1.5;
            
            if (tileHeightMap.length !== state.env.map.length) {
                store.dispatch("error", "tileHeightMap size is different than map height!");
            } else {
                // every height degree is one quarter of the tile's own height
                this.tileYoffset = this.tileWidth + tileHeightMap[y][x] * this.tileWidth / 4;
                this.topYfactor = this.tileWidth * y * 0.5;
                this.topYsegment = this.c + this.topYfactor - this.tileYoffset;
                
                this.rectColors = colors.rectColors;
                this.rectShadowColors = colors.rectShadowColors;
                
                // refers to the tile's sides
                this.fillColor = Object.values(this.rectShadowColors)[map[y][x]];
                
                // refers to the tile's top rectangle
                this.rectColor = Object.values(this.rectColors)[map[y][x]];
            }
        }
    }
    areParamsInvalid( x : number, y: number ) {
        return x == undefined || y == undefined;
    }
}