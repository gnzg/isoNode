// RhombusVertrices constructor
export default function (tileWidth, mapX, z, x, d, topYsegment) {
    this.pointA = {
      x: tileWidth * z + mapX + tileWidth * x,
      y: d + topYsegment
    };
    this.pointB = {
      x: tileWidth * z + mapX + tileWidth * x + tileWidth,
      y: topYsegment + tileWidth * 2
    };
    this.pointC = {
      x: tileWidth * z + mapX + tileWidth * x + tileWidth * 2,
      y: d + topYsegment
    };
    this.pointD = {
      x: tileWidth * z + mapX + tileWidth * x + tileWidth,
      y: topYsegment + tileWidth
    };
};