import updateCanvas from './updateCanvas';
import handleKeyDown from './handleKeyDown';
import handleKeyUp from './handleKeyUp';
import rotateMap from './rotateMap';
import centerCanvas from './centerCanvas';
import deleteTile from './deleteTile';
import tileHovered from './tileHovered';
import tileNotHovered from './tileNotHovered';
import saveLastHoveredTile from './saveLastHoveredTile';
import createTileHitBox from './createTileHitBox';
import clearTileHitBoxes from './clearTileHitBoxes';

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