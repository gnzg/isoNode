// RhombusVertrices constructor
export default function (tileWidth, mapX, i, j, d, topYsegment) {
    this.pointA = {
      x: tileWidth * i + mapX + tileWidth * j,
      y: d + topYsegment
    };
    this.pointB = {
      x: tileWidth * i + mapX + tileWidth * j + tileWidth,
      y: topYsegment + tileWidth * 2
    };
    this.pointC = {
      x: tileWidth * i + mapX + tileWidth * j + tileWidth * 2,
      y: d + topYsegment
    };
    this.pointD = {
      x: tileWidth * i + mapX + tileWidth * j + tileWidth,
      y: topYsegment + tileWidth
    };
};