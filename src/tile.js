export default class Tile {

    // Tile object
    // draws three isometric aspects, i.e. top, left and right

    constructor({ x, y, tileW, fill, i, j, k, mapX, mapY, rectColors, rectShadowColors, map}) {
        this.x = x || 0;
        this.y = y || 0;
        this.tileW = tileW;
        this.i = i;
        this.j = j;
        this.k = k;
        this.mapX = mapX || 0;
        this.mapY = mapY || 0;
        this.tileYoffset = 0;
        this.rectShadowColors = rectShadowColors;
        this.fill = fill;
        this.rectColors = rectColors;
        this.fillColor = 'white';
        this.outlineWidth = 0.5;
        this.strokeStyle = '#666';
        this.enableStroke = false;
        this.tileYheight = 4;
        this.map = map;
        this.tempMap = [];
    }
}