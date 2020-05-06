import state from './store/state';
/**
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
 */
export default function draw (canvas, mapsArray, mapXparam, mapYparam, tileWidthParam, z, x, y, rectColorsParam, rectShadowColorsParam) {
  let i = z;   // iterator across z axis, i.e. elements of the map array
  let j = x;   // iterator across x axis, i.e. elements of the map item array
  let k = y;   // iterator across y axis, i.e. map arrays
  let tileWidth = tileWidthParam;
  let mapX = mapXparam;
  let mapY = mapYparam;
  let maps = mapsArray;
  let rectColors = rectColorsParam;
  let rectShadowColors = rectShadowColorsParam;
  let ctx = canvas;
  let tileYoffset = 0;
  // save a copy of the map 
  let tempMap = maps[`${Object.keys(maps)[k]}`];
  
  // if the map is defined and the tile is non-zero, draw it
  if (
    tempMap !== undefined &&
    tempMap.length > 0 &&
    tempMap[i] !== undefined &&
    tempMap[i][j] !== 0
    ) {
      
      tileYoffset = tileWidth * k * 1.25;
      let c = mapY - tileWidth * j * 0.5;
      let d = tileWidth * 1.5;
      let topYfactor = tileWidth * i * 0.5;
      let topYsegment = c + topYfactor - tileYoffset;
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
      
      // save hitboxes only for the ground level map
      if (k === 1 && i === 0 && j === 0) {
        let alef = Math.sqrt(Math.pow(tileWidth * i + tileWidth - tileWidth + mapX + tileWidth * j, 2) + Math.pow(d + topYsegment, 2));
        let beth = Math.sqrt(Math.pow(tileWidth * i + tileWidth + mapX + tileWidth * j,2), Math.pow(tileWidth + topYsegment ,2));
        let gimel = Math.sqrt(Math.pow(tileWidth * i + tileWidth + mapX + tileWidth * j, 2) + Math.pow(tileWidth + topYsegment, 2));
        let daled = Math.sqrt(Math.pow(tileWidth * i + tileWidth * 2 + mapX + tileWidth * j, 2) + Math.pow( d + topYsegment, 2));
        // save the tile's vector magnitudes, i.e. hitbox boundries
        state.env.tileHitBoxes[0] = {
          'alef':alef,
          'beth':beth,
          'gimel':gimel,
          'daled':daled
        };
      }
      
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
      }
      return ctx;
    }