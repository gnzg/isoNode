export default function centerCanvas(state) {
  console.log('Window resized! Centering canvas...');
  // referring to the biggest map, i.e. in our case maps.waterWorld
  // console.log(state.env.maps.waterWorld.length);
  let mapCenter = state.env.map.length / 2 * state.env.tileWidth * 2.3;
  state.env.map_offset_x = state.env.winWidth / 2 - mapCenter;
  state.env.map_offset_y = state.env.winHeight / 2;
  return state;
}
