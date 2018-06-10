const drawMap = (tileGraphics, map) => {

  // set size of canvas
  let canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // create the 2d canvas context
  let ctx = canvas.getContext('2d');

  // Set as your tile pixel sizes, alter if you are using larger tiles.
  let tileH = 48;
  let tileW = 48;

  // mapX and mapY are offsets to make sure we can position the map as we want.
  let mapX = 40;
  let mapY = 280;

  let drawTile;

  // loop through our map and draw out the image represented by the number.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      drawTile = map[i][j];
      ctx.setTransform(-1, 0.5, 1, 0.5, 200, -80);
      // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
      ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
    }
  }
};

export default drawMap;