import tileHeightMap from "./maps/tileHeightMap";
import map from './maps/map0';
import state from './store/state'

/**
*  Virtual Tile object
*  stores all info related to the tile object 
*/
export default class Tile {
    constructor({ x, y, z, tileWidth, style = null, rectColor, rectShadowColors, tileYoffset}) {
        
        /* tile coordinates */
        this.x = x;
        this.y = y;
        this.z = z;
        
        /* size */
        this.tileWidth = tileWidth;

        this.tileYoffset = this.tileWidth * tileHeightMap[y][x] * 1.25 + map[y][x]*10

        this.rectColor = rectColor
        this.rectShadowColors = rectShadowColors;
        this.tileYoffset = tileYoffset;

        /* styling defaults */
        this.defaultStyle = {
            fill:  'white',
            shadowedFill: '#666',
            outlineWidth: 0.5,
            strokeStyle: '#666',
            enableStroke: false
        };
        this.style = style || this.defaultStyle;

        this.fillColor = state.env.rectShadowColors[map[y][x]];
        this.rectColor = state.env.rectColors[rectShadowColors.indexOf(this.fillColor)];
    }
}