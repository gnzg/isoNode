import renderTiles from './renderTiles';

const drawMap = (env) => {
  let { tileGraphicsToLoad, map, ctx, mapY } = env;
  let tileGraphics = [];
  let tileGraphicsLoaded = 0;

  for (let i = 0; i < tileGraphicsToLoad.length; i++) {
    tileGraphics[i] = new Image();
    tileGraphics[i].src = tileGraphicsToLoad[i];
    tileGraphics[i].onload = function() {
      //console.log('loaded asset');
      // Once the image is loaded increment the loaded graphics count and check if all images are ready.
      tileGraphicsLoaded++;
      // if done loading
      if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
        //setInterval(()=>{
         // mapY += 48;
          //console.log(mapY);
          //if (mapY >= 1500) mapY=0;
          renderTiles({tileGraphics, ...env, mapY});
          //console.log('asdasd');
       // }, 200);
      }
    }
  }

};

export default drawMap;