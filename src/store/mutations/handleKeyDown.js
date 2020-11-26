import refreshCanvas from './refreshCanvas';
import { areObjectPropsEmpty } from '../../helpers/utils';

export default function handleKeyDown (state) {
  
  // allow mutation to take place only once cooldown is over
  // also, make sure an instance of drawFrequency is not running 
  // acceleration
  let inc = 5;
  // if not running, initiate interval
  let drawFrequency = setInterval(() => {
    if (state.keyMap["ArrowRight"] || state.keyMap["d"]) {
      state.env.mapX += inc;
    }
    else if (state.keyMap["ArrowLeft"] || state.keyMap["a"]) {
      state.env.mapX -= inc;
    }
    if (state.keyMap["ArrowUp"] || state.keyMap["w"]) {
      state.env.mapY -= inc;
    }
    else if (state.keyMap["ArrowDown"] || state.keyMap["s"]) {
      state.env.mapY += inc;
    }
    
    if (areObjectPropsEmpty(state.keyMap)) {
        clearInterval(drawFrequency);
        console.log("Cleared key cooldown");
      }
      refreshCanvas(state);
    }, 20);

    
  }
