import renderTiles from './mutations/renderTiles';
import handleKeyDown from './mutations/handleKeyDown';
import handleKeyUp from './mutations/handleKeyUp';
import rotateMap from './mutations/rotateMap';
import centerCanvas from './mutations/centerCanvas'
import deleteTile from './mutations/deleteTile';
import tileHovered from './mutations/tileHovered';

export default {
  addItem(state, payload) {
    state.misc.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  // the below mutations implicitly use state as an argument
  renderTiles,
  handleKeyDown,
  handleKeyUp,
  rotateMap,
  centerCanvas,
  deleteTile,
  tileHovered
};