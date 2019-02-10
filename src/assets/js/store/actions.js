import { centerCanvas } from "../utils";

export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  addEnvProp(context, payload) {
    context.commit('addEnvProp', payload);
  },
  centerCanvas(context) {
    context.commit('centerCanvas');
  }
};