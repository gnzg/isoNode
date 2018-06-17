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
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle=rectColors[drawTile];
        ctx.fillStyle= rectColors[drawTile];
        ctx.rect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.fillRect(j * tileW + mapX, i * tileH + mapY, tileW, tileH);
        ctx.stroke();
      }
    }
  }
};

export default renderMap;