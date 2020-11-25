import refreshCanvas from './refreshCanvas';

export default function handleKeyDown (state) {
  
  // allow mutation to take place only once cooldown is over
  // also, make sure an instance of drawFrequency is not running 
  // acceleration
  let inc = 5;
  // if not running, initiate interval
  let drawFrequency = setInterval(() => {
    
    if (state.keyMap["ArrowRight"]) {
      state.env.mapX += inc;
    }
    else if (state.keyMap["ArrowLeft"]) {
      state.env.mapX -= inc;
    }
    if (state.keyMap["ArrowUp"]) {
      state.env.mapY -= inc;
    }
    else if (state.keyMap["ArrowDown"]) {
      state.env.mapY += inc;
    }
    
    if (!state.keyMap["ArrowLeft"] && !state.keyMap["ArrowRight"] &&
      !state.keyMap["ArrowUp"] && !state.keyMap["ArrowDown"]) {
        clearInterval(drawFrequency);
      }
      refreshCanvas(state);
    }, 20);
  }
