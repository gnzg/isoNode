// RhombusVertrices constructor
export default function ({tile, mapX, mapY, y, x}) {

  this.c = mapY - tile.tileWidth * x * 0.5;
  this.d = tile.tileWidth * 1.5;
  this.topYfactor = tile.tileWidth * y * 0.5;
  this.topYsegment = this.c + this.topYfactor - tile.tileYoffset;

  // leftmost point
  this.pointA = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x,
    y: this.d + this.topYsegment
  };
  // central bottom point
  this.pointB = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: this.topYsegment + tile.tileWidth * 2
  };
  // rightmost point
  this.pointC = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2,
    y: this.d + this.topYsegment
  };
  // central top point
  this.pointD = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: this.topYsegment + tile.tileWidth
  };
  // console.log(this.pointA, this.pointB, this.pointC, this.pointD);
};