import renderTiles from './renderTiles';
import rotateMap from './rotateMap';

export default function handleKeyDown (state) {
    //this = me;
    // allow mutation to take place only once cooldown is over
    // also, make sure an instance of drawFrequency is not running 

    // acceleration
    let inc = 10;
    // save posX at beginning of event
    let startingPosX = state.env.mapX;
    let startingPosY = state.env.mapY;
    // if not running, initiate interval
    if (state.keyMap[82]) {
      console.log('Pressed R, rotating map...');
      rotateMap(state);
      renderTiles(state);
    }
    let drawFrequency = setInterval(() => {
      if (state.keyMap[68]) {
        state.env.mapX += inc;
      }
      else if (state.keyMap[65]) state.env.mapX -= inc;

      if (state.keyMap[87]) {
        state.env.mapY -= inc;
      }
      else if (state.keyMap[83]) state.env.mapY += inc;

      if (state.keyMap[68] === false) {
        //alert('r key is up');
      }
      if (!state.keyMap[68] && !state.keyMap[65] &&
        !state.keyMap[87] && !state.keyMap[83]) {
        clearInterval(drawFrequency);
      }
      renderTiles(state);
    }, 20);
  }
