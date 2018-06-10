import drawMap from './drawMap';

const loadImg = (tileGraphicsToLoad, map) => {
  let tileGraphics = [];

  // Images to be loaded and used.
  // Tutorial Note: As water is loaded first it will be represented by a 0 on the map and land will be a 1.
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