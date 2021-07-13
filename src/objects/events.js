import store from '../store/index';
import checkCollision from '../math/checkCollision';

export default class Events {
    activateHitBoxes() {
        window.addEventListener("mousemove", e => {
            e.stopImmediatePropagation();
            checkCollision(e);
        });
    }
    refreshCanvasOnResize() {
    window.addEventListener("resize", () => {
        store.state.env.winWidth = window.innerWidth;
        store.state.env.winHeight = window.innerHeight;
        store.dispatch('centerCanvas');
        store.dispatch('refreshCanvas');
      });
    }
}