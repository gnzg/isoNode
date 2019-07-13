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
  renderTiles(context) {
    context.commit('renderTiles');
  }
};