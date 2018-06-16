import drawMap from './drawMap';

const loadImg = (tileGraphicsToLoad, map) => {
  let tileGraphics = [];

  // Images to be loaded and used.
  let tileGraphicsLoaded = 0;

  for (let i = 0; i < tileGraphicsToLoad.length; i++) {
    tileGraphics[i] = new Image();
    tileGraphics[i].src = tileGraphicsToLoad[i];
    tileGraphics[i].onload = function() {
      //console.log('loaded asset');
      // Once the image is loaded increment the loaded graphics count and check if all images are ready.
      tileGraphicsLoaded++;
      if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
        drawMap(tileGraphics, map);
      }
    }
  }

};

export default loadImg;