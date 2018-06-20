const renderMap = (env) => {
  let drawTile;
  let strokeStyle = '#222';
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;
  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];

      // two modes are possible, image-based, or rects
      if (mode === 'images') {
        ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
      } else {

        ctx.globalCompositeOperation = 'source-over';

        // draw all three visible sides of the rectangle

        ctx.setTransform(1, -0.5, 1, 0.5, 200, 185);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectColors[drawTile];
        ctx.rect(mapX + j * tileW, mapY + i * tileH, tileW, tileH);
        ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.stroke();

        ctx.globalCompositeOperation = 'destination-over';

        // z axis
        ctx.setTransform(1, -0.5, 0, 1, 527, 70);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        ctx.rect(mapX + j * tileW + i * tileW, mapY + i * tileH - 2/tileW, tileW, tileH);
        ctx.stroke();
        ctx.fillRect(mapX + j * tileW + i * tileW, mapY + i * tileH - 2/tileW, tileW, tileH);

        // x axis
        ctx.setTransform(1, 0.5, 0, 1, 480, 5);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle= strokeStyle;
        ctx.fillStyle= rectShadowColors[drawTile];
        // if we only care about first element of each row, set a conditional to j===0
        ctx.rect(mapX + i * tileW + tileW * j, mapY - j * tileH, tileW, tileH);
        ctx.stroke();
        ctx.fillRect(mapX + i * tileW + tileW * j, mapY - j * tileH, tileW, tileH);

      }
    }
  }
};

export default renderMap;