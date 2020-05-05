/**
*  Virtual Tile object
*  stores tile information and notifies the canvas on changes 
*/

export default class Tile {
    constructor({ x, y, z, tileWidth = 24, style = null}) {
        
        /* tile coordinates */
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        
        /* size */
        this.tileWidth = tileWidth;
        
        /* styling defaults */
        let defaultStyle = {
            fill:  'white',
            shadowedFill: '#666',
            outlineWidth: 0.5,
            strokeStyle: '#666',
            enableStroke: false
        };
        this.style = style || defaultStyle;
    }
}