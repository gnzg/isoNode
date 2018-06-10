let drawMap = require('./drawMap');

const loadImg = () => {

  // Images to be loaded and used.
  // Tutorial Note: As water is loaded first it will be represented by a 0 on the map and land will be a 1.
  let tileGraphicsToLoad = ["/tutorials/images/water.png","/tutorials/images/land.png"],
    tileGraphicsLoaded = 0;

  for (let i = 0; i < tileGraphicsToLoad.length; i++) {
    tileGraphics[i] = new Image();
    tileGraphics[i].src = tileGraphicsToLoad[i];
    tileGraphics[i].onload = function() {
      // Once the image is loaded increment the loaded graphics count and check if all images are ready.
      tileGraphicsLoaded++;
      if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
        drawMap();
      }
    }
  }

};

module.export = loadImg;