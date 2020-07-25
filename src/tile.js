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
            
            /* size */
            this.tileWidth = state.env.tileWidth;
            
            this.tileYoffset = this.tileWidth * tileHeightMap[y][x] * 1.25 + map[y][x]*10;
            this.rectColors = state.env.rectColors;
            this.rectShadowColors = state.env.rectShadowColors;
            
            /* styling defaults */
            /*
            this.defaultStyle = {
                fill:  'white',
                shadowedFill: '#666',
                outlineWidth: 0.5,
                strokeStyle: '#666',
                enableStroke: false
            };
            this.style = style || this.defaultStyle;
            */
            
            this.fillColor = this.rectShadowColors[map[y][x]];
            this.rectColor = this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
        } else {
            console.error("The tile object received too many/few arguments!");
        }
    }
}