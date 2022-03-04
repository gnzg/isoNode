// calculate cross product (analog) based on two 2D vectors
// returns a scalar value
export default (U,V) => {
	let CrossProductAnalog = (U.x*V.y-U.y*V.x);
	return CrossProductAnalog;
};