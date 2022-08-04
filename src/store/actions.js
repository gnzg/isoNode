export default {
    error(context, payload) {
        context.commit("error", payload);
    },
    addEnvProp(context, payload) {
        context.commit("addEnvProp", payload);
    },
    centerCanvas(context) {
        context.commit("centerCanvas");
    },
    handleKeyDown(context, payload) {
        context.commit("handleKeyDown", payload);
    },
    handleKeyUp(context, payload) {
        context.commit("handleKeyUp", payload);
    },
    updateCanvas(context) {
        context.commit("updateCanvas");
    },
    rotateMap(context) {
        context.commit("rotateMap");
    },
    deleteTile(context, payload) {
        context.commit("deleteTile", payload);
    },
    onTileHover(context, payload) {
        context.commit("onTileHover", payload);
    },
    unhoverTile(context, payload) {
        context.commit("unhoverTile", payload);
    },
    saveCurrentlyHoveredTile(context, payload) {
        context.commit("saveCurrentlyHoveredTile", payload);
    },
    saveLastHoveredTile(context, payload) {
        context.commit("saveLastHoveredTile", payload);
    },
    checkCollision(context, payload) {
        context.commit("checkCollision", payload);
    },
    toggleDebugMode(context) {
        context.commit("toggleDebugMode");
        context.commit("updateCanvas");
    },
    createTileHitBoxes(context) {
        context.commit("createTileHitBoxes");
    },
    clearTileHitBoxes(context) {
        context.commit("clearTileHitBoxes");
    },
};
