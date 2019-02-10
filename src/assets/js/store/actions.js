export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  addEnvProp(context, payload) {
    console.log('payload', payload);
    context.commit('addEnvProp', payload);
  }
};