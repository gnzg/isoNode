import state from './store/state';
import RhombusVertices from './RhombusVertices';
import Tile from './tile';
/**
* directly manipulates the canvas context found in the state object
*
* @param {Object} canvas
* @param {Array} maps
* @param {Integer mapX 
* @param {Integer} mapY 
* @param {Integer} tileWidth 
* @param {Integer} z 
* @param {Integer} x 
* @param {Integer} y 
* @param {Array} rectColors
* @param {Array} rectShadowColors
* 
* @returns {Object} canvas
*/
  
  export default (ctx, maps, mapX, mapY, tileWidth, z, x, y, rectColors, rectShadowColors)  => {

    let i = z;    // iterator across z axis, i.e. elements of the map array
    let j = x;    // iterator across x axis, i.e. elements of the map item array
    let k = y;    // iterator across y axis, i.e. map arrays

    // operate on a copy of the actual map 
    let tempMap = maps[`${Object.keys(maps)[k]}`];
    let fillColor = rectShadowColors[tempMap[i][j]];

    let tile = new Tile({x, y, z, tileWidth, style: null, rectColors: rectColors[rectShadowColors.indexOf(fillColor)], rectShadowColors, tileYoffset: tileWidth * k * 1.25});

    // should the tile be drawn? 
    let drawTile = tempMap[i][j] !== 0;
    
    // if the map is defined and the tile is non-zero, draw it
    if (
      tempMap !== undefined &&
      tempMap.length > 0 &&
      tempMap[i] !== undefined &&
      drawTile === true
      ) 
    {
      
      let c = mapY - tileWidth * j * 0.5;
      let d = tileWidth * 1.5;
      let topYfactor = tileWidth * i * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices(tileWidth, mapX, i, j, d, topYsegment);
                  
          // save the tile's points, i.e. hitbox boundries
          // arbitrary: consider only 1st ground level
          if (k === 1) {
            // build the hitboxes array
            state.env.tileHitBoxes.push({ 
              // rhombus vertices
              ...rhombusVertices,
              // coordinates respective to the maps object
              x:j,
              y:k,
              z:i
            });
          }

        ctx.fillStyle = tile.rectColor;
        
        // top
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(tileWidth * i + tileWidth + mapX + tileWidth * j, tileWidth + topYsegment);
        ctx.lineTo(tileWidth * i + tileWidth * 2 + mapX + tileWidth * j, d + topYsegment);
        ctx.lineTo(tileWidth * i + tileWidth + mapX + tileWidth * j, tileWidth * 2 + topYsegment);
        ctx.lineTo(tileWidth * i + tileWidth - tileWidth + mapX + tileWidth * j, d + topYsegment);
        ctx.closePath();
        ctx.fill();
        
        // left
        // draw only if NOT preceeded by a tile on the z axis, or if first tile
        if (tempMap[i][j - 1] !== 1 || j === 0) {
          ctx.globalCompositeOperation = 'destination-over';
          if (j === 0) ctx.globalCompositeOperation = 'source-over';
          if (j - 1 >= 0 && tempMap[i][j - 1] === 0) ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          ctx.moveTo(tileWidth * i + mapX + tileWidth * j, c + tileWidth * i + d - i * tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j, c + tileWidth * i + tileWidth + tileWidth * 1.75 - i * tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - i * tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + d + tileWidth * 0.5 - i * tileWidth * 0.5 - tile.tileYoffset);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
        
        // right
        // draw only if NOT preceeded by a tile on the x axis, or if iterating over the last row across the z axis
        if (tempMap[i + 1] !== undefined && tempMap[i + 1][j] !== 1 ||
          i === tempMap.length - 1) {
            ctx.globalCompositeOperation = 'source-over';
            if (i < tempMap.length - 1 && tempMap[i + 1][j] !== 0) ctx.globalCompositeOperation = 'destination-over';
            ctx.beginPath();
            ctx.moveTo(tileWidth * i + mapX + tileWidth * j + tileWidth * 2, c + tileWidth * i + d - i * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth * 2, c + tileWidth * i + tileWidth + tileWidth * 1.75 - i * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - i * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + d + tileWidth * 0.5 - i * tileWidth * 0.5 - tile.tileYoffset);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();
        }

          // draw vertices; only available in debug mode
          if (state.debug_mode) {
            drawAdditionalDetails(ctx, rhombusVertices);
          }

        }
      }