import state from './store/state';
import RhombusVertices from './RhombusVertices';
import Tile from './tile';
import drawAdditionalDetails from './drawAdditionalDetails';
import debugOptions from './debugOptions';

/**
* directly manipulates the canvas context found in the state object
*
* @param Object canvas
* @param Array maps
* @param Integer mapX 
* @param Integer mapY 
* @param Integer tileWidth 
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @param Integer mapIndex    iterates across the array of maps
* @param Array rectColors
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ctx, maps, mapX, mapY, tileWidth, y, x, mapIndex, rectColors, rectShadowColors})  => {
  // operate on a copy of the actual map 
  let tempMap = maps[`${Object.keys(maps)[mapIndex]}`];
  let fillColor = rectShadowColors[tempMap[y][x]];
  
  //alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);

  let tile = new Tile({
    mapIndex, y, x,
    tileWidth,
    style: null,
    rectColor: rectColors[rectShadowColors.indexOf(fillColor)],
    rectShadowColors,
    tileYoffset: tileWidth * mapIndex * 1.25 + maps[1][y][x]*10
  });
  
  // if the map is defined and the tile is non-zero, draw it
  if (
    tempMap !== undefined &&
    tempMap.length > 0 &&
    tempMap[y] !== undefined &&
    tempMap[y][x] !== 0
    && debugOptions({dimension:mapIndex, position:0}) // draw only first map
    && (debugOptions({dimension:y, position:0}) || debugOptions({dimension:y, position:1}) || debugOptions({dimension:y, position:2})) // draw only first map
    )
    {
      
      let c = mapY - tile.tileWidth * x * 0.5;
      let d = tile.tileWidth * 1.5;
      let topYfactor = tile.tileWidth * y * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices(tile.tileWidth, mapX, y, x, d, topYsegment);
      
      // build the hitboxes array
      state.env.tileHitBoxes.push({ 
        // rhombus vertices
        ...rhombusVertices,
        // coordinates respective to the maps object
        x,
        mapIndex,
        y
      });
      
      ctx.fillStyle = tile.rectColor;
      
      // top
      
      // check placement based on tile offset 
      // if current offset is larger than the offset of the next tile, 
      // then current tile visibility dominates
      if (maps[1][y][x] >= maps[1][y+1][x]) { 
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.globalCompositeOperation = 'destination-over';
      }

      ctx.beginPath();
      ctx.moveTo(tile.tileWidth * y + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
      ctx.lineTo(tile.tileWidth * y  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, d + topYsegment);
      ctx.lineTo(tile.tileWidth * y  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
      ctx.lineTo(tile.tileWidth * y  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, d + topYsegment);
      ctx.closePath();
      ctx.fill();
      
      // left
      // draw only if NOT preceeded by a tile on the y axis, or if first tile
      if (tempMap[y][x - 1] !== 1 || x === 0) {
        
        // TODO: account for different tile offsets
        
        
        
        
        ctx.globalCompositeOperation = 'destination-over';
        



        if (x === 0) ctx.globalCompositeOperation = 'source-over';
        if (x - 1 >= 0 && tempMap[y][x - 1] === 0) ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y  + d - y* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y  + tile.tileWidth + tile.tileWidth * 1.75 - y* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y  + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y  + d + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      
      // right
      // draw only if NOT preceeded by a tile on the x axis, or if iterating over the last row across the y axis
      if (tempMap[y  + 1] !== undefined && tempMap[y  + 1][x] !== 1 ||
        y=== tempMap.length - 1) {
          ctx.globalCompositeOperation = 'source-over';
          if (y< tempMap.length - 1 && tempMap[y + 1][x] !== 0) ctx.globalCompositeOperation = 'destination-over';
          ctx.beginPath();
          ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + d - y * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + d + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
        
        // draw vertices; only available in debug mode
        if (state.debug_mode === true) {
          drawAdditionalDetails(ctx, rhombusVertices);
        }
      }
    }