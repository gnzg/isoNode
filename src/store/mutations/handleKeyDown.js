import refreshCanvas from './refreshCanvas';

export default function handleKeyDown (state) {
  
  if (state.acceleration != 5) state.acceleration = 5;
  
  // also, make sure an instance of drawFrequency is not already running 
  
  // if not running, initiate interval
  //if (state.drawFrequency == null) {
  state.drawFrequency = setInterval(() => {
    if (state.keyMap["ArrowRight"] || state.keyMap["d"]) {
      state.env.mapX += state.acceleration;
    }
    else if (state.keyMap["ArrowLeft"] || state.keyMap["a"]) {
      state.env.mapX -= state.acceleration;
    }
    if (state.keyMap["ArrowUp"] || state.keyMap["w"]) {
      state.env.mapY -= state.acceleration;
    }
    else if (state.keyMap["ArrowDown"] || state.keyMap["s"]) {
      state.env.mapY += state.acceleration;
    }
    // allow state mutation to take place only once cooldown is over
    refreshCanvas(state);
    
  }, 20);
  //}
  return state;
}