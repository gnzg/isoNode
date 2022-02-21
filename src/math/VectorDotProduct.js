// calculate dot product of two 2D vectors via the geometric definition
// i.e. by multiplying the sum of the vector lengths of points U, V by cos x,
// the former being the angle between the two vectors
// returns a scalar value
export default (U,V, x = 25) => {
    // vector lengths are always positive
    return Math.abs(U.x * V.x) + Math.abs(U.y * V.y)*Math.cos(x);
};