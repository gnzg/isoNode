import checkCollision from '../math/checkCollision';

export default class Events {
    activateHitBoxes() {
        window.addEventListener("mousemove", e => {
            e.stopImmediatePropagation();
            checkCollision(e);
        });
    }
}