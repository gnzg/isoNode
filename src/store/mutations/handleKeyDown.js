import renderTiles from './renderTiles';

export default function handleKeyDown (state) {
  
  // allow mutation to take place only once cooldown is over
  // also, make sure an instance of drawFrequency is not running 
  // acceleration
  let inc = 10;
  // save posX at beginning of event
  let startingPosX = state.env.mapX;
  let startingPosY = state.env.mapY;
  // if not running, initiate interval
  let drawFrequency = setInterval(() => {
    if (state.keyMap[68]) {
      state.env.mapX += inc;
    }
    else if (state.keyMap[65]) state.env.mapX -= inc;
    
    if (state.keyMap[87]) {
      state.env.mapY -= inc;
    }
    else if (state.keyMap[83]) state.env.mapY += inc;
    
    if (!state.keyMap[68] && !state.keyMap[65] &&
      !state.keyMap[87] && !state.keyMap[83]) {
        clearInterval(drawFrequency);
      }
      renderTiles(state);
    }, 20);
  }
