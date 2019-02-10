export default {
  addItem(state, payload) {
    state.items.push(payload);

    return state;
  }
};