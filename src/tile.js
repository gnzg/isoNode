/**
*  Virtual Tile object
*  stores tile information and notifies the canvas on changes 
*/
export default class Tile {
    constructor({ x, y, z, tileWidth, style = null, rectColor, rectShadowColors, tileYoffset}) {
        
        /* tile coordinates */
        this.x = x;
        this.y = y;
        this.z = z;
        
        /* size */
        this.tileWidth = tileWidth;

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
    }
}