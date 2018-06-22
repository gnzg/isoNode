const renderMap = (env) => {
  let drawTile;
  let strokeStyle = '#333';
  let enableStroke = true;
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;

  ctx.clearRect(-1000, -1000,  4000,  4000);

  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];

      // two modes are possible, image-based, or rects
      if (mode === 'images') {
        ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
      } else if (drawTile !== 0) {

        // draw all three visible sides of the rectaspect

        // right
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 0, 1, mapX+487, mapY-210);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        ctx.rect(mapX + j * tileW + i * tileW, mapY + i * tileH, tileW, tileH);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + j * tileW + i * tileW, mapY + i * tileH, tileW, tileH);

        // left
        // was the previous element an empty tile? if so, change z-index of left side of current tile
        ctx.globalCompositeOperation = map[i][j-1] === 0 ? 'source-over' : 'destination-over';
        // for the first cell in the row, always send left aspect forward
        j === 0 ? ctx.globalCompositeOperation = 'source-over' : '';
        ctx.setTransform(1, 0.5, 0, 1, mapX+440, mapY-186);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        // if we only care about first element of each row, set a conditional to j===0
        // ctx.rect(mapX + j * tileW + i * tileW), mapY - j * tileH, tileW, tileH);
        enableStroke && ctx.stroke();
        ctx.fillRect(mapX + j * tileW + i * tileW,
                     mapY - j * tileH - mapX - tileH, tileW, tileH);

        // top
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, -0.5, 1, 0.5, mapX+160, mapY-95);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectColors[drawTile];
        ctx.rect(mapX + j * tileW, mapY + i * tileH, tileW, tileH);
        ctx.fillRect(mapX + j * tileW - mapX/2,
                     mapY + i * tileH - 5*mapY/tileH,
                     tileW, tileH);
        enableStroke && ctx.stroke();
        // debugger;
      }
    }
    console.log('qwewqe');
  }
};

export default renderMap;