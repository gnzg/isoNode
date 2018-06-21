const renderMap = (env) => {
  let drawTile;
  let strokeStyle = '#aaa';
  let enableStroke = true;
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;
  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];

      // two modes are possible, image-based, or rects
      if (mode === 'images') {
        ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
      } else if (drawTile !== 0) {

        // draw all three visible sides of the rectangle

        // right angle
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 0, 1, 527, 70);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        ctx.rect(mapX + j * tileW + i * tileW, mapY + i * tileH - 2/tileW, tileW, tileH);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + j * tileW + i * tileW, mapY + i * tileH - 2/tileW, tileW, tileH);

        // left angle
        // was the previous element an empty tile? if so, change z-index of left side of current tile
        ctx.globalCompositeOperation = map[i][j-1] === 0 ? 'source-over' : 'destination-over';
        ctx.globalCompositeOperation = j === 0 ? 'source-over' : 'destination-over';
        ctx.setTransform(1, 0.5, 0, 1, 480, 5);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        // if we only care about first element of each row, set a conditional to j===0
        ctx.rect(mapX + i * tileW + tileW * j, mapY - j * tileH, tileW, tileH);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + i * tileW + tileW * j, mapY - j * tileH, tileW, tileH);

        // top
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 1, 0.5, 200, 185);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectColors[drawTile];
        ctx.rect(mapX + j * tileW, mapY + i * tileH, tileW, tileH);
        ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        enableStroke && ctx.stroke();
        // debugger;
      }
    }
  }
};

export default renderMap;