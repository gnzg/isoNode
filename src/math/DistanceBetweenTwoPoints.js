/**
 * Hypotenuse of a triangle
 * Returns a scalar value in pixels between two points.
 * @param {object} a The first point, consisting of two coordinates, x and y.
 * @param {object} b The second point.
 * @return {number} a scalar value in pixel between the points provided.
 */
let disntaceBetweenTwoPoints = (a, b) => {
    return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
};

module.exports = disntaceBetweenTwoPoints;