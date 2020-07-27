import heightMap from '../maps/tileHeightMap';
import map from '../maps/map0';
import state from '../store/state'

export default ( {tile, x, y }) => {

  let mapX = state.env.mapX;
  let mapY = state.env.mapY;
  let ctx = state.ctx;
  let c = mapY - tile.tileWidth * x * 0.5;
  let d = tile.tileWidth * 1.5;
  let topYfactor = tile.tileWidth * y * 0.5;
  let topYsegment = c + topYfactor - tile.tileYoffset;
  
  // top
  // draw only if current tile is non-zero
  if (map[y][x] !== 0) {

    ctx.fillStyle = tile.rectColor;
    ctx.beginPath();
    ctx.moveTo(tile.tileWidth * y + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.closePath();
    ctx.fill();
    
  }
}