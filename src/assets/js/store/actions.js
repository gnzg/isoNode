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
  rotateMap(context) {
    context.commit('rotateMap');
  },
  moveMap(context, payload) {
    context.commit('moveMap', payload);
  },
  renderTiles(context) {
    context.commit('renderTiles');
  }
};