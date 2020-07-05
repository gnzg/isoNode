import state from './store/state';

/**
* directly manipulates the canvas reference found in the state object
*
* @param {Object} canvas 
* @param {Array} mapsArray 
* @param {Integer mapXparam 
  * @param {Integer} mapYparam 
  * @param {Integer} tileWidthParam 
  * @param {Integer} z 
  * @param {Integer} x 
  * @param {Integer} y 
  * @param {Array} rectColorsParam 
  * @param {Array} rectShadowColorsParam
  * 
  * @returns {Object} canvas
  */
  
  export default (ctx, mapsArray, mapXparam, mapYparam, tileWidthParam, z, x, y, rectColorsParam, rectShadowColorsParam)  => {
    let i = z;    // iterator across z axis, i.e. elements of the map array
    let j = x;    // iterator across x axis, i.e. elements of the map item array
    let k = y;    // iterator across y axis, i.e. map arrays
    let tileWidth = tileWidthParam;
    let mapX = mapXparam;
    let mapY = mapYparam;
    let maps = mapsArray;
    let rectColors = rectColorsParam;
    let rectShadowColors = rectShadowColorsParam;
    let tileYoffset = 0;
    let rhombusVertices = { pointA: {}, pointB: {}, pointC: {}, pointD: {}};

    // operate on a copy of the actual map 
    let tempMap = maps[`${Object.keys(maps)[k]}`];
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
      
      tileYoffset = tileWidth * k * 1.25;
      let c = mapY - tileWidth * j * 0.5;
      let d = tileWidth * 1.5;
      let topYfactor = tileWidth * i * 0.5;
      let topYsegment = c + topYfactor - tileYoffset;
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      // i.e. build the hitboxes for the tile top surfaces
      rhombusVertices = {
            pointA : {
              x: tileWidth * i + mapX + tileWidth * j,
              y: d + topYsegment
            },
            pointB : {
              x: rhombusVertices.pointA.x + tileWidth,
              y: 2 * tileWidth + topYsegment
            },
            pointC : {
              x: rhombusVertices.pointB.x + tileWidth,
              y: rhombusVertices.pointA.y
            },
            pointD : {
              x: rhombusVertices.pointB.x,
              y: rhombusVertices.pointB.y - tileWidth
            }
        };

        let fillColor = rectShadowColors[tempMap[i][j]];
        ctx.fillStyle = rectColors[rectShadowColors.indexOf(fillColor)];
        
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
          ctx.moveTo(tileWidth * i + mapX + tileWidth * j, c + tileWidth * i + d - i * tileWidth * 0.5 - tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j, c + tileWidth * i + tileWidth + tileWidth * 1.75 - i * tileWidth * 0.5 - tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - i * tileWidth * 0.5 - tileYoffset);
          ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + d + tileWidth * 0.5 - i * tileWidth * 0.5 - tileYoffset);
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
            ctx.moveTo(tileWidth * i + mapX + tileWidth * j + tileWidth * 2, c + tileWidth * i + d - i * tileWidth * 0.5 - tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth * 2, c + tileWidth * i + tileWidth + tileWidth * 1.75 - i * tileWidth * 0.5 - tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + tileWidth + tileWidth * 1.75 + tileWidth * 0.5 - i * tileWidth * 0.5 - tileYoffset);
            ctx.lineTo(tileWidth * i + mapX + tileWidth * j + tileWidth, c + tileWidth * i + d + tileWidth * 0.5 - i * tileWidth * 0.5 - tileYoffset);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();
        }

          // draw vertices; only available in debug mode
          if (state.debug_mode) {
            drawAdditionalDetails(ctx, rhombusVertices);
          }
          
          // save the tile's points, i.e. hitbox boundries
          // arbitrary: consider only 1st ground level
          // but only if the map tile is non-zero
          if (drawTile === true && k === 1) {
            state.env.tileHitBoxes.push({ 
              // rhombus vertices
              ...rhombusVertices,
              // coordinates respective to the maps object
              x:j,
              y:k,
              z:i
            });
          }
        }
      }