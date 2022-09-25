import "./assets/scss/styles.scss";
import Store from "./store/index";
import State from "./store/state";
import CanvasWrapper from "./store/canvasWrapper";
import bindEventListeners from "./utilities/bindEventListeners";

// Extend the Window interface
declare global {
  interface Window {
    store: object;
    state: object;
  }
}

// Initialization
window.addEventListener("DOMContentLoaded", (e) => {
  let canvasWrapper = new CanvasWrapper("main");
  canvasWrapper.initialize();

  Store.dispatch("centerCanvas");
  Store.dispatch("updateCanvas");
  //Store.dispatch("getMapMaxMins"); // TODO: calculate max and min points of map to establish later on if cursor is within map borders

  bindEventListeners();

  // Make store and state accessible via window object
  window.store = Store;
  window.state = State;
  e.stopImmediatePropagation();
});
