import { map, waterWorld } from '../map';

export default {
  items: [
    'foo',
    'foo2'
  ],
  env: {
    ctx: document.querySelector('#main').getContext('2d'),
    // The isometric map. Each item represents a row, each number in a row a tile.
    map: map,
    waterWorld: waterWorld,
    rectColors: [
      'empty',
      '#096dff',
      '#8dee03',
      '#29a36e',
      'salmon'
    ],
    rectShadowColors: [
      'empty',
      '#0d49a9',
      '#04b807',
      '#1c6e4a',
      'red'
    ],
    tileGraphicsToLoad: [
      "./images/water.png",
      "./images/land.png"
    ],
    // Set as your tile pixel sizes, alter if you are using larger tiles.
    tileW: 24,
    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 0,
    mapY: 350,
    winWidth: 0,
    winHeight: 0,
    rotationDegree: 0
  }
};