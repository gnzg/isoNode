
const renderMap = (env) => {
  let drawTile;
  let strokeStyle = '#333';
  let enableStroke = true;
  let { tileGraphics, map, waterWorld, tileYHeightMap, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;
  let tileYheight = 4;
  let tileYoffset = 0;
  let fillColor;
  let outlineWidth = 1;
  let tempMap = [];
  
  // TODO: Add prevalance of elevated tiles if they rise above other tiles
  
  // clear entire canvas
  ctx.clearRect(-1000, -1000,  4000,  4000);
  
  // loop through our map and draw out the image represented by the number.
  // iterator k draws the map across the y axis
  for (let k = 0; k < 9; k++) { 
    /*if (k === 0) {
      tempMap = waterWorld;
    } else if (k === 1) {*/
          tempMap = map;
    /*} 
      else {
        tempMap = [];
      }*/
      tileYoffset = 24*k;
      // iterator i draws a row across the z axis
      for (let i = 0; i < map[i].length; i++) {
        // iterator j draws a row across the x axis
        // map[i].length
        for (let j = 0; j < map[i].length; j++) {
          drawTile = tempMap[i][j];
          fillColor = rectShadowColors[drawTile];
          
          //tileYoffset = env.tileH + 4;
          //fillColor = 'red';
          
          //tileYheight= 32 * (map[i][j] === 0 ? 1 : map[i][j]);
          // to make sure tiles are drawn upwards and not downwards
          //tileYoffset = 32 * (map[i][j] === 0 ? 1 : map[i][j]);
          
          // two modes are possible, image-based, or rects
          if (mode === 'images') {
            ctx.drawImage(tileGraphics[drawTile], j * tileW + mapX, i * tileH + mapY);
          }
          // if not an empty tile, draw it
          else if (drawTile !== 0) {
            // draw all three visible sides of the rect aspect

            // top
            ctx.globalCompositeOperation = 'source-over';
            
            ctx.setTransform(1, -0.5, 1, 0.5, mapX+198, mapY+8);
            ctx.beginPath();
            ctx.lineWidth=outlineWidth;
            ctx.strokeStyle= "strokeStyle";
            // return corresponding top color based on position of fillColor in rectShadowColors[]
            ctx.fillStyle= rectColors[rectShadowColors.indexOf(fillColor)];
            // draw outlines        
            ctx.rect(mapX + j * tileW + tileW - mapY + 4.665*tileW+tileYoffset,
              mapY + i * tileW - 4.725*tileW-tileYoffset,
              tileW,
              tileH
            );
            enableStroke && ctx.stroke();
            // fill
            ctx.fillRect(mapX + j * tileW + tileW - mapY + 4.665*tileW+tileYoffset,
              mapY + i * tileW - 4.725*tileW-tileYoffset,
              tileW,
              tileH
            );

            // right
              ctx.globalCompositeOperation = 'source-over';
            ctx.setTransform(1, -0.5, 0, 1, mapX+244, mapY-105);
            ctx.beginPath();
            ctx.lineWidth=outlineWidth;
            ctx.strokeStyle= strokeStyle;
            ctx.fillStyle= fillColor;
            ctx.rect( mapX + (j + i) * tileW,
            mapY + i * tileW-tileYoffset,
            tileW,
            tileH+tileYheight
            );
            enableStroke && ctx.stroke();
            // fill
            ctx.fillRect(mapX + (j + i) * tileW,
            mapY + i * tileW-tileYoffset,
            tileW,
            tileH+tileYheight
            );
            
            // left
            if (j === 0 || map[i][j-1] === 0) {
              ctx.globalCompositeOperation = 'source-over';
            } else {
              ctx.globalCompositeOperation = 'destination-over';
            }
            ctx.setTransform(1, 0.5, 0, 1, mapX+220, mapY-93);
            ctx.beginPath();
            ctx.lineWidth=outlineWidth;
            ctx.strokeStyle= strokeStyle;
            ctx.fillStyle= fillColor;
            // draw outlines
            ctx.rect( mapX + (j + i) * tileW,
            mapY - j * tileW - mapX - tileW-tileYoffset,
            tileW,
            tileH+tileYheight
            );
            enableStroke && ctx.stroke();
            // fill 
            ctx.fillRect(mapX + (j + i) * tileW,
            mapY - j * tileW - mapX - tileW-tileYoffset,
            tileW, tileH+tileYheight
            );
            
            
          } // end of for loop
        }
      }
    };
  }
  export default renderMap;