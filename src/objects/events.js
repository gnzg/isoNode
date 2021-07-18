import store from '../store/index';
import checkCollision from '../math/checkCollision';

export default class Events {
    activateHitBoxes() {
        window.addEventListener("mousemove", e => {
            e.estopImmediatePropagation();
            checkCollision(e);
        });
    }
}