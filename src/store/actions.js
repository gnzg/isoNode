export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  addEnvProp(context, payload) {
    context.commit('addEnvProp', payload);
  },
  centerCanvas(context) {
    context.commit('centerCanvas');
  },
  handleKeyDown(context, payload) {
    context.commit('handleKeyDown', payload);
  },
  handleKeyUp(context, payload) {
    context.commit('handleKeyUp', payload);
  },
  renderTiles(context) {
    context.commit('renderTiles');
  },
  rotateMapAction(context) {
    context.commit('rotateMap');
  },
  deleteTile(context, payload) {
    context.commit('deleteTile', payload);
  },
  tileHovered(context, payload) {
    context.commit('tileHovered', payload);
  }
};