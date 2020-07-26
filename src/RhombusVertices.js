// RhombusVertrices constructor
export default function (tile, mapX, mapY, y, x) {

  this.c = mapY - tile.tileWidth * x * 0.5;
  this.d = tile.tileWidth * 1.5;
  this.topYfactor = tile.tileWidth * y * 0.5;
  this.topYsegment = this.c + this.topYfactor - tile.tileYoffset;

  this.pointA = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x,
    y: this.d + this.topYsegment
  };
  this.pointB = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: this.topYsegment + tile.tileWidth * 2
  };
  this.pointC = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2,
    y: this.d + this.topYsegment
  };
  this.pointD = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: this.topYsegment + tile.tileWidth
  };
};