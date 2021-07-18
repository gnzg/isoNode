import updateCanvas from './mutations/updateCanvas';
import handleKeyDown from './mutations/handleKeyDown';
import handleKeyUp from './mutations/handleKeyUp';
import rotateMap from './mutations/rotateMap';
import centerCanvas from './mutations/centerCanvas';
import deleteTile from './mutations/deleteTile';
import tileHovered from './mutations/tileHovered';
import tileNotHovered from './mutations/tileNotHovered';
import saveLastHoveredTile from './mutations/saveLastHoveredTile';
import createTileHitBox from './mutations/createTileHitBox';
import clearTileHitBoxes from './mutations/clearTileHitBoxes';

export default {
  error(payload) {
    console.error("ERROR:", payload.data);
  },
  addItem(state, payload) {
    state.misc.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  toggleDebugMode(state) {
    state.debug_mode = !state.debug_mode;
    return state;
  },
  // the below mutations implicitly use state as an argument
  updateCanvas,
  handleKeyDown,
  handleKeyUp,
  rotateMap,
  centerCanvas,
  deleteTile,
  tileHovered,
  tileNotHovered,
  saveLastHoveredTile,
  createTileHitBox,
  clearTileHitBoxes
};