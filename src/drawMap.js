const drawMap = (env) => {
  let drawTile;
  let { tileGraphics, map, tileW, tileH, mapX, mapY, ctx } = env;
  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];
      // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
      ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
    }
  }
};

export default drawMap;