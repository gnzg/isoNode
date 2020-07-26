import state from './store/state';

// RhombusVertrices constructor
export default function ({tile, y, x}) {

  let mapX = state.env.mapX;

  // leftmost point
  this.pointA = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x,
    y: tile.d + tile.topYsegment
  };
  // central bottom point
  this.pointB = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: tile.topYsegment + tile.tileWidth * 2
  };
  // rightmost point
  this.pointC = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2,
    y: tile.d + tile.topYsegment
  };
  // central top point
  this.pointD = {
    x: tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth,
    y: tile.topYsegment + tile.tileWidth
  };
  // console.log(this.pointA, this.pointB, this.pointC, this.pointD);
};