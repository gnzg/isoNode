export default {
  addItem(state, payload) {
    state.items.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  centerCanvas(state) {
    console.log('resized! Centering canvas...');
    let centered = 0;
    let mapCenter = state.env.map.length/2 *state.env.tileW*2.3;
    state.env.mapX = state.env.winWidth/2-mapCenter;
    return state;
  }
};