export default class Tile {

    // Tile object
    // draws three isometric aspects, i.e. top, left and right

    constructor({ x, y, tileW, fill, i, j, k, mapX, mapY, rectColors, rectShadowColors, map, waterWorld}) {
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
        this.waterWorld = waterWorld;
        this.rectColors = rectColors;
        this.fillColor = 'white';
        this.outlineWidth = 0.5;
        this.strokeStyle = '#666';
        this.enableStroke = false;
        this.tileYheight = 4;
        this.map = map;
        this.tempMap = [];
    }
    draw(ctx) {
        if (this.k === 0) {
            this.tempMap = this.waterWorld;
        } else if (this.k === 1) {
            this.tempMap = this.map;
        } else {
            this.tempMap = [];
        }
        //console.log('this.i', this.i, 'this.tempMap[this.i]', this.tempMap[this.i]);

        // if tile is non-zero, draw it
        if (this.tempMap.length > 0 && 
            this.tempMap[this.i] !== undefined && 
            this.tempMap[this.i][this.j] !== 0
            ) {
            
            this.tileYoffset = this.tileW * this.k*1.25;
            this.c = this.mapY-this.tileW*this.j*0.5;
            this.d = this.tileW*1.5;
            this.topYfactor = this.tileW*this.i*0.5;
            this.topYsegment = this.c + this.topYfactor - this.tileYoffset;
            this.fillColor = this.rectShadowColors[this.tempMap[this.i][this.j]];

            // if (this.k === 1 && this.i === 4 && this.j === 3) {
            //     ctx.fillStyle= '#FF14AE';
            // } else {
                ctx.fillStyle= this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
            //}
            
            // top
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.moveTo(this.tileW*this.i + this.tileW+this.mapX + this.tileW*this.j, this.tileW + this.topYsegment);
            ctx.lineTo(this.tileW*this.i + this.tileW*2+this.mapX + this.tileW*this.j, this.d + this.topYsegment);
            ctx.lineTo(this.tileW*this.i + this.tileW + this.mapX + this.tileW*this.j, this.tileW*2 + this.topYsegment);
            ctx.lineTo(this.tileW*this.i + this.tileW-this.tileW + this.mapX + this.tileW*this.j, this.d + this.topYsegment);
            ctx.closePath();
            // return corresponding top color based on position of fillColor in rectShadowColors[]
            //ctx.fillStyle= this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
            ctx.fill();

            // left
            ctx.globalCompositeOperation = 'destination-over';
            if (this.j === 0) ctx.globalCompositeOperation = 'source-over';
            if (this.j-1 >= 0 && this.tempMap[this.i][this.j-1] === 0) ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.moveTo(this.tileW*this.i + this.mapX + this.tileW*this.j, this.c + this.tileW*this.i + this.d-this.i*this.tileW*0.5 - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i + this.mapX + this.tileW*this.j, this.c + this.tileW*this.i + this.tileW+this.tileW*1.75-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i + this.mapX + this.tileW*this.j + this.tileW, this.c + this.tileW*this.i+this.tileW + this.tileW*1.75+this.tileW*0.5-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i + this.mapX + this.tileW*this.j + this.tileW, this.c + this.tileW*this.i + this.d + this.tileW*0.5-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.closePath();  
            ctx.fillStyle= this.fillColor;
            ctx.fill();

            // right
            ctx.globalCompositeOperation = 'source-over';
            if (this.i < this.tempMap.length-1 && this.tempMap[this.i+1][this.j] !== 0) ctx.globalCompositeOperation = 'destination-over';
            ctx.beginPath();
            ctx.moveTo(this.tileW*this.i+this.mapX+this.tileW*this.j+this.tileW*2, this.c+this.tileW*this.i+this.d-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i+this.mapX+this.tileW*this.j+this.tileW*2, this.c+this.tileW*this.i+this.tileW+this.tileW*1.75-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i+this.mapX+this.tileW*this.j+this.tileW, this.c+this.tileW*this.i+this.tileW+this.tileW*1.75+this.tileW*0.5-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.lineTo(this.tileW*this.i+this.mapX+this.tileW*this.j+this.tileW, this.c+this.tileW*this.i+this.d+this.tileW*0.5-this.i*this.tileW*0.5  - this.tileYoffset);
            ctx.closePath(); 
            ctx.fillStyle= this.fillColor;
            ctx.fill();
            
        } 
    } // end of Tile.prototype.draw
}