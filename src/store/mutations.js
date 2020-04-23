import renderTiles from './mutations/renderTiles';
import handleKeyDown from './mutations/handleKeyDown';
import handleKeyUp from './mutations/handleKeyUp';
import rotateMap from './mutations/rotateMap';
import centerCanvas from './mutations/centerCanvas'

export default {
  addItem(state, payload) {
    state.misc.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  centerCanvas,
  rotateMap,
  handleKeyDown,
  handleKeyUp,
  renderTiles
};