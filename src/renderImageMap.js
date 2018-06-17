const renderMap = (env) => {
  let drawTile;
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx, mode, rectColors } = env;
  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];

      // two modes are possible, image-based, or rects
      if (mode === 'images') {
        ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
      } else {
        ctx.setTransform(1, -0.5, 1, 0.5, 200, 150);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle=rectColors[drawTile];
        ctx.strokeStyle="white";
        ctx.fillStyle= rectColors[drawTile];
        ctx.rect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.stroke();
        // draw all three visible sides of the rectangle

        // z axis
        ctx.setTransform(1, -0.5, 0, 1, 527, 35);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="white";
        if (i === 0) {
          ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        }
        else if (i === 1) {
          ctx.fillRect(j * tileW + mapX + tileW, i * tileH + mapY + 2/tileW, tileW, tileH);
        }
        else if (i >= 2) {
          ctx.fillRect(j * tileW + mapX + i * tileW, i * tileH + mapY - 2/tileW, tileW, tileH);
        }
        // ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.stroke();

        // x axis
        /*
        ctx.setTransform(1, 0.5, 0, 1, 480, -30);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="white";
        ctx.rect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.stroke(); */
      }
    }
  }
};

export default renderMap;