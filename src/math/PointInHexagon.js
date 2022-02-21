// receives 2 points [x,y] and an arbitrary point [x,y]
// returns a boolean
export default (a,b) => {
    // calculate center point of bounding box
    let centerPoint = {x: (b.x - a.x)/2, y:(b.y - a.y)/2};
    console.log('centerPoint', centerPoint);
    //let q2x = Math.abs(p.x - _center.x);         // transform the test point locally and to quadrant 2
    //let q2y = Math.abs(p.y - _center.y);         // transform the test point locally and to quadrant 2
    //if (q2x > _hori || q2y > _vert*2) return false;           // bounding test (since q2 is in quadrant 2 only 2 tests are needed)
    //return 2 * _vert * _hori - _vert * q2x - _hori * q2y >= 0;   // finally the dot product can be reduced to this due to the hexagon symmetry
};