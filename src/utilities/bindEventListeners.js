import store from "../store/index";

// register user input
export default () => {
  // Rotate or move canvas on key(s) down
  window.addEventListener("keydown", (e) => {
    // prevent event bubbling
    e.stopImmediatePropagation();
    store.dispatch("handleKeyDown", e.key);
  });

  window.addEventListener("keyup", (e) => {
    e.stopImmediatePropagation();
    store.dispatch("handleKeyUp", e.key);
  });

  window.addEventListener("mousemove", (e) => {
    // limit Canvas refresh rate
    store.dispatch("checkCollision", e);
    e.stopImmediatePropagation();
  });
};
