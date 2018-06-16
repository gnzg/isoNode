import drawMap from './drawMap';

const loadImg = (env) => {
  let { tileGraphicsToLoad, map, ctx } = env;
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
        drawMap({tileGraphics, ...env});
      }
    }
  }

};

export default loadImg;