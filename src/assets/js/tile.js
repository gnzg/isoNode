export default class Tile {

    // Tile object
    // draws itself in all three isometric aspects, i.e. top, left and right

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
            // alert('see tile generation');
            this.tempMap = this.waterWorld;
        } else if (this.k === 1) {
            this.tempMap = this.map;
        } else {
            this.tempMap = [];
        }
        // if tile is non-zero, draw it
        if (this.tempMap.length > 0 && this.tempMap[this.i][this.j] !== 0) {
            
            this.tileYoffset = 52 * this.k;
         
            // top
            this.fillColor = this.rectShadowColors[this.tempMap[this.i][this.j]];
            ctx.globalCompositeOperation = 'source-over';
            //ctx.setTransform(1, -0.5, 1, 0.5, this.mapX+190, this.mapY);
            ctx.beginPath();
            ctx.moveTo(this.tileW+this.mapX+this.tileW*this.j, this.tileW+this.mapY-this.tileW*this.j*0.5);
            ctx.lineTo(this.tileW*2+this.mapX+this.tileW*this.j, this.tileW*1.5+this.mapY-this.tileW*this.j*0.5);
            ctx.lineTo(this.tileW+this.mapX+this.tileW*this.j, this.tileW*2+this.mapY-this.tileW*this.j*0.5);
            ctx.lineTo(this.tileW-this.tileW+this.mapX+this.tileW*this.j, this.tileW*1.5+this.mapY-this.tileW*this.j*0.5);
            ctx.closePath();
            
            ctx.lineWidth=this.outlineWidth;
            ctx.strokeStyle= this.strokeStyle;
            // return corresponding top color based on position of fillColor in rectShadowColors[]
            ctx.fillStyle= this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
            // draw outlines        
            /*ctx.rect(this.mapX + this.j * this.tileW + this.tileW - this.mapY +this.tileYoffset,
                this.mapY + this.i * this.tileW - this.tileYoffset,
                this.tileW,
                this.tileW
            );*/
            this.enableStroke && ctx.stroke();
            // fill
            ctx.stroke();
            /*ctx.fillRect(this.mapX + this.j * this.tileW + this.tileW - this.mapY +this.tileYoffset,
                this.mapY + this.i * this.tileW - this.tileYoffset,
                this.tileW,
                this.tileW
            );*/
            /*        
            // right
            ctx.globalCompositeOperation = 'source-over';
            ctx.setTransform(1, -0.5, 0, 1, this.mapX+238, this.mapY);
            ctx.beginPath();
            ctx.lineWidth=this.outlineWidth;
            ctx.strokeStyle= this.strokeStyle;
            ctx.fillStyle= this.fillColor;
            ctx.rect( this.mapX + (this.j + this.i) * this.tileW,
            this.mapY + this.i * this.tileW-this.tileYoffset,
            this.tileW,
            this.tileW+this.tileYheight
            );
            this.enableStroke && ctx.stroke();
            // fill
            ctx.fillRect(this.mapX + (this.j + this.i) * this.tileW,
            this.mapY + this.i * this.tileW-this.tileYoffset,
            this.tileW,
            this.tileW+this.tileYheight
            );
            
            // left
            if (this.j === 0 || this.tempMap[this.i][this.j-1] === 0) {
                ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.globalCompositeOperation = 'destination-over';
            }
            ctx.setTransform(1, 0.5, 0, 1, this.mapX+214, this.mapY+12);
            ctx.beginPath();
            ctx.lineWidth=this.outlineWidth;
            ctx.strokeStyle= this.strokeStyle;
            ctx.fillStyle= this.fillColor;
            // draw outlines
            ctx.rect( this.mapX + (this.j + this.i) * this.tileW,
            this.mapY - this.j * this.tileW - this.mapX - this.tileW-this.tileYoffset,
            this.tileW,
            this.tileW+this.tileYheight
            );
            this.enableStroke && ctx.stroke();
            // fill 
            ctx.fillRect(this.mapX + (this.j + this.i) * this.tileW,
            this.mapY - this.j * this.tileW - this.mapX - this.tileW-this.tileYoffset,
            this.tileW, 
            this.tileW+this.tileYheight
            );
            */
            //this.k === 1 && this.j === 5 && this.i === 5 && ctx.addHitRegion({id: 'circle'});
        } 
    } // end of Tile.prototype.draw
    /* isHit(event) {
        //let leftSideSurface = this.mapX + (this.j + this.i) * this.tileW
        //let rightSideSufrace = ;
        let topSurface = this.mapX + this.j * this.tileW + this.tileW - this.mapY +this.tileYoffset;
        // returns true if the cursor is within the Tile surface, otherwise returns false
        console.log(event.mousePosX >= this.x && event.mousePosX <= this.x + this.width && event.mousePosY >= this.y && event.mousePosY <= this.y + this.height);
    } */
}