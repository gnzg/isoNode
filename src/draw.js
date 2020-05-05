let draw = (ctx, maps, mapX, mapY, tileWidth, i, j, k, rectColors, rectShadowColors) => {
  this.i = i; // iterator across z axis, i.e. elements of the map array
  this.j = j; // iterator across x axis, i.e. elements of the map item array
  this.k = k; //iterator across y axis, i.e. map arrays
  this.tileWidth = tileWidth;
  this.mapX = mapX;
  this.mapY = mapY;
  this.maps = maps;
  this.rectColors = rectColors;
  this.rectShadowColors = rectShadowColors;

  if (this.k === 0) {
    // Waterworld
    this.tempMap = maps[`${Object.keys(maps)[0]}`];
  }
  else if (this.k === 1) {
    // ground level 1
    this.tempMap = maps[`${Object.keys(maps)[1]}`];
  }
  else if (this.k === 2) {
    // ground level 2
    this.tempMap = maps[`${Object.keys(maps)[2]}`];
  } else {
    this.tempMap = [];
  }
  //console.log('this.i', this.i, 'this.tempMap[this.i]', this.tempMap[this.i]);

  // if tile is non-zero, draw it
  if (
    this.tempMap !== undefined &&
    this.tempMap.length > 0 &&
    this.tempMap[this.i] !== undefined &&
    this.tempMap[this.i][this.j] !== 0
  ) {

    this.tileYoffset = this.tileWidth * this.k * 1.25;
    this.c = this.mapY - this.tileWidth * this.j * 0.5;
    this.d = this.tileWidth * 1.5;
    this.topYfactor = this.tileWidth * this.i * 0.5;
    this.topYsegment = this.c + this.topYfactor - this.tileYoffset;
    this.fillColor = this.rectShadowColors[this.tempMap[this.i][this.j]];

    // if (this.k === 1 && this.i === 4 && this.j === 3) {
    //     ctx.fillStyle= '#FF14AE';
    // } else {
    ctx.fillStyle = this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
    //}

    // top
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.moveTo(this.tileWidth * this.i + this.tileWidth + this.mapX + this.tileWidth * this.j, this.tileWidth + this.topYsegment);
    ctx.lineTo(this.tileWidth * this.i + this.tileWidth * 2 + this.mapX + this.tileWidth * this.j, this.d + this.topYsegment);
    ctx.lineTo(this.tileWidth * this.i + this.tileWidth + this.mapX + this.tileWidth * this.j, this.tileWidth * 2 + this.topYsegment);
    ctx.lineTo(this.tileWidth * this.i + this.tileWidth - this.tileWidth + this.mapX + this.tileWidth * this.j, this.d + this.topYsegment);
    ctx.closePath();
    // return corresponding top color based on position of fillColor in rectShadowColors[]
    //ctx.fillStyle= this.rectColors[this.rectShadowColors.indexOf(this.fillColor)];
    ctx.fill();

    // left
    // draw only if NOT preceeded by a tile on the z axis, or if first tile
    if (this.tempMap[this.i][this.j - 1] !== 1 || this.j === 0) {
      ctx.globalCompositeOperation = 'destination-over';
      if (this.j === 0) ctx.globalCompositeOperation = 'source-over';
      if (this.j - 1 >= 0 && this.tempMap[this.i][this.j - 1] === 0) ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j, this.c + this.tileWidth * this.i + this.d - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j, this.c + this.tileWidth * this.i + this.tileWidth + this.tileWidth * 1.75 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth, this.c + this.tileWidth * this.i + this.tileWidth + this.tileWidth * 1.75 + this.tileWidth * 0.5 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth, this.c + this.tileWidth * this.i + this.d + this.tileWidth * 0.5 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.closePath();
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    // right
    // draw only if NOT preceeded by a tile on the x axis, or if iterating over the last row across the z axis
    if (this.tempMap[this.i + 1] !== undefined && this.tempMap[this.i + 1][this.j] !== 1 ||
      this.i === this.tempMap.length - 1) {
      ctx.globalCompositeOperation = 'source-over';
      if (this.i < this.tempMap.length - 1 && this.tempMap[this.i + 1][this.j] !== 0) ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      ctx.moveTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth * 2, this.c + this.tileWidth * this.i + this.d - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth * 2, this.c + this.tileWidth * this.i + this.tileWidth + this.tileWidth * 1.75 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth, this.c + this.tileWidth * this.i + this.tileWidth + this.tileWidth * 1.75 + this.tileWidth * 0.5 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.lineTo(this.tileWidth * this.i + this.mapX + this.tileWidth * this.j + this.tileWidth, this.c + this.tileWidth * this.i + this.d + this.tileWidth * 0.5 - this.i * this.tileWidth * 0.5 - this.tileYoffset);
      ctx.closePath();
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
  }
}
module.exports = draw;