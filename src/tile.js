/**
*  Virtual Tile object
*  stores tile information and notifies the canvas on changes 
*/
export default class Tile {
    constructor({ x, y, z, tileWidth, style = null, rectColors, rectShadowColors}) {
        
        /* tile coordinates */
        this.x = x;
        this.y = y;
        this.z = z;
        
        /* size */
        this.tileWidth = tileWidth;

        this.rectColors = rectColors
        this.rectShadowColors = rectShadowColors;
        this.tileYoffset = 0;

        /* styling defaults */
        this.defaultStyle = {
            fill:  'white',
            shadowedFill: '#666',
            outlineWidth: 0.5,
            strokeStyle: '#666',
            enableStroke: false
        };
        this.style = style || this.defaultStyle;

    }
}