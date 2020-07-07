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
* @param {Integer} z        // iterator across z axis, i.e. elements of the map array
* @param {Integer} x        // iterator across x axis, i.e. elements of the map item array
* @param {Integer} y        // iterator across y axis, i.e. map arrays
* @param {Array} rectColors
* @param {Array} rectShadowColors
* 
* @returns {Object} canvas
*/
  
  export default (ctx, maps, mapX, mapY, tileWidth, z, x, y, rectColors, rectShadowColors)  => {

    // operate on a copy of the actual map 
    let tempMap = maps[`${Object.keys(maps)[y]}`];
    let fillColor = rectShadowColors[tempMap[z][x]];

    let tile = new Tile({x, y, z, tileWidth, style: null, rectColors: rectColors[rectShadowColors.indexOf(fillColor)], rectShadowColors, tileYoffset: tileWidth * y * 1.25});

    // should the tile be drawn? 
    let drawTile = tempMap[z][x] !== 0;
    
    // if the map is defined and the tile is non-zero, draw it
    if (
      tempMap !== undefined &&
      tempMap.length > 0 &&
      tempMap[z] !== undefined &&
      drawTile === true
      ) 
    {
      
      let c = mapY - tileWidth * x * 0.5;
      let d = tileWidth * 1.5;
      let topYfactor = tileWidth * z * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices(tileWidth, mapX, z, x, d, topYsegment);
                  
          // save the tile's points, i.e. hitbox boundries
          // arbitrary: consider only 1st ground level
          if (y === 0) {
            // build the hitboxes array
            state.env.tileHitBoxes.push({ 
              // rhombus vertices
              ...rhombusVertices,
              // coordinates respective to the maps object
              x,
              y,
              z
            });
          }

        ctx.fillStyle = tile.rectColor;
        
        // top
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(tileWidth * z + tileWidth + mapX + tileWidth * x, tileWidth + topYsegment);
        ctx.lineTo(tileWidth * z  + tileWidth * 2 + mapX + tileWidth * x, d + topYsegment);
        ctx.lineTo(tileWidth * z  + tileWidth + mapX + tileWidth * x, tileWidth * 2 + topYsegment);
        ctx.lineTo(tileWidth * z  + tileWidth - tileWidth + mapX + tileWidth * x, d + topYsegment);
        ctx.closePath();
        ctx.fill();
        
        // left
        // draw only if NOT preceeded by a tile on the z axis, or if first tile
        if (tempMap[z][x - 1] !== 1 || x === 0) {
          ctx.globalCompositeOperation = 'destination-over';
          if (x === 0) ctx.globalCompositeOperation = 'source-over';
          if (x - 1 >= 0 && tempMap[z][x - 1] === 0) ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          ctx.moveTo(tileWidth * z  + mapX + tileWidth * x, c + tileWidth * z  + d - z* tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * z  + mapX + tileWidth * x, c + tileWidth * z  + tileWidth + tileWidth * 1.75 - z* tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * z  + mapX + tileWidth * x + tileWidth, c + tileWidth * z  + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - z* tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tileWidth * z  + mapX + tileWidth * x + tileWidth, c + tileWidth * z  + d + tileWidth * 0.5 - z* tileWidth * 0.5 - tile.tileYoffset);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
        
        // right
        // draw only if NOT preceeded by a tile on the x axis, or if iterating over the last row across the z axis
        if (tempMap[z  + 1] !== undefined && tempMap[z  + 1][x] !== 1 ||
          z=== tempMap.length - 1) {
            ctx.globalCompositeOperation = 'source-over';
            if (z< tempMap.length - 1 && tempMap[z + 1][x] !== 0) ctx.globalCompositeOperation = 'destination-over';
            ctx.beginPath();
            ctx.moveTo(tileWidth * z + mapX + tileWidth * x + tileWidth * 2, c + tileWidth * z + d - z * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * z + mapX + tileWidth * x + tileWidth * 2, c + tileWidth * z + tileWidth + tileWidth * 1.75 - z * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * z + mapX + tileWidth * x + tileWidth, c + tileWidth * z + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - z * tileWidth * 0.5 - tile.tileYoffset);
            ctx.lineTo(tileWidth * z + mapX + tileWidth * x + tileWidth, c + tileWidth * z + d + tileWidth * 0.5 - z * tileWidth * 0.5 - tile.tileYoffset);
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