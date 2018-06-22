import renderMap from './renderMap';

// load images and pass array of images down to renderImageMap

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
        setInterval(()=>{
          mapY += 50;
          console.log(mapY);
          if (mapY >= 700) mapY=0;
          renderMap({tileGraphics, ...env, mapY});
          console.log('asdasd');
        }, 200);
      }
    }
  }

};

export default drawMap;