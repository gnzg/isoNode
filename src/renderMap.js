const renderMap = (env) => {
  let drawTile;
  let strokeStyle = '#333';
  let enableStroke = true;
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;
  let tileElevation = 100;
  let fillColor;

  // clear entire canvas
  ctx.clearRect(-1000, -1000,  4000,  4000);

  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];
      fillColor = rectShadowColors[drawTile];

      if (i === 1 && j === 0) {tileElevation = 50; fillColor = 'red'; } else { tileElevation = 100; fillColor = rectShadowColors[drawTile]; }

      // two modes are possible, image-based, or rects
      if (mode === 'images') {
        ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
      }
      // if not an empty tile, draw it
      else if (drawTile !== 0) {

        // draw all three visible sides of the rect aspect


        // right
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 0, 1, mapX+243, mapY-105);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= fillColor;
        ctx.rect(mapX + (j + i) * tileW, mapY + i * tileW, tileW, tileH+tileElevation);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + (j + i) * tileW, mapY + i * tileW, tileW, tileH+tileElevation);

        // left
        // was the previous element an empty tile? if so, change z-index of left side of current tile
        ctx.globalCompositeOperation = map[i][j-1] === 0 ? 'source-over' : 'destination-over';
        // for the first cell in the row, always send left aspect forward
        j === 0 ? ctx.globalCompositeOperation = 'source-over' : '';
        ctx.setTransform(1, 0.5, 0, 1, mapX+220, mapY-93);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= fillColor;
        // if we only care about first element of each row, set a conditional to j===0
        ctx.rect(mapX + (j + i) * tileW, mapY - j * tileW - mapX - tileW, tileW, tileH+tileElevation);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + (j + i) * tileW, mapY - j * tileW - mapX - tileW, tileW, tileH+tileElevation);

        // top
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 1, 0.5, mapX+198, mapY+8);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        // return corresponding top color based on position of fillColor in rectShadowColors[]
        ctx.fillStyle= rectColors[rectShadowColors.indexOf(fillColor)];
        ctx.rect(mapX + j * tileW + tileW - mapY + 4.665*tileW,
          mapY + i * tileW - 4.725*tileW,
          tileW, tileH);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + j * tileW + tileW - mapY + 4.665*tileW,
                     mapY + i * tileW - 4.725*tileW,
                     tileW, tileH);
        // debugger;
      }
    }
    // console.log('qwewqe');
  }
};

export default renderMap;