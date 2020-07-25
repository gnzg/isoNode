// RhombusVertrices constructor
export default function (tile, mapX, y, x, d, topYsegment) {
    this.pointA = {
      x: tile.tileWidth * y + mapX + tile.tileWidth * x,
      y: d + topYsegment
    };
    this.pointB = {
      x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
      y: topYsegment + tile.tileWidth * 2
    };
    this.pointC = {
      x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2,
      y: d + topYsegment
    };
    this.pointD = {
      x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
      y: topYsegment + tile.tileWidth
    };
};