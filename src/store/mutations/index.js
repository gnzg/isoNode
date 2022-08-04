import updateCanvas from "./updateCanvas";
import handleKeyDown from "./handleKeyDown";
import handleKeyUp from "./handleKeyUp";
import rotateMap from "./rotateMap";
import centerCanvas from "./centerCanvas";
import deleteTile from "./deleteTile";
import onTileHover from "./onTileHover";
import unhoverTile from "./unhoverTile";
import saveCurrentlyHoveredTile from "./saveCurrentlyHoveredTile";
import saveLastHoveredTile from "./saveLastHoveredTile";
import createTileHitBoxes from "./createTileHitBoxes";
import clearTileHitBoxes from "./clearTileHitBoxes";
import checkCollision from "./checkCollision";

export default {
    error(payload) {
        console.error("ERROR:", payload.data);
        return state;
    },
    addEnvProp(state, payload) {
        state[`${payload.key}`] = payload.value;
        return state;
    },
    toggleDebugMode(state) {
        state.debug_mode = !state.debug_mode;
        return state;
    },
    // the below mutations implicitly use state as a param
    updateCanvas,
    handleKeyDown,
    handleKeyUp,
    rotateMap,
    centerCanvas,
    deleteTile,
    onTileHover,
    unhoverTile,
    saveCurrentlyHoveredTile,
    saveLastHoveredTile,
    createTileHitBoxes,
    clearTileHitBoxes,
    checkCollision,
};
