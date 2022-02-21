import vectorAddition from './VectorAddition'
import distanceBetweenTwoPoints from './DistanceBetweenTwoPoints'
import vectorDivisionByScalar from './VectorDivisionByScalar'
import vectorSubtraction from './VectorSubtraction'
import vectorDotProduct from './VectorDotProduct'
// receives 4 points [x,y] and an arbitrary point [x,y]
// returns a boolean
export default (rhombus, p) => {

    let a = rhombus.pointA;
    let b = rhombus.pointB;
    let c = rhombus.pointC;
    let d = rhombus.pointD;

    // center point
    let Q = {
        x: 0.5*vectorAddition(a,c).x,
        y: 0.5*vectorAddition(a,c).y
    };

    // half-width (in the x-direction)
    let alpha = 0.5*distanceBetweenTwoPoints(a,c),
    // half-height (y-direction)
    beta = 0.5*distanceBetweenTwoPoints(b,d);

    // unit vector in x-direction
    //console.log('a', a, 'c', c);
    //console.log('vectorSubtraction(c, a)', vectorSubtraction(c, a));
    let U = vectorDivisionByScalar(vectorSubtraction(c, a), 2*alpha),
    // unit vector in y-direction
    V = vectorDivisionByScalar(vectorSubtraction(d, b), 2*beta);

    let W = vectorSubtraction(p, Q),
    xabs = vectorDotProduct(W, U),    // here W*U is the dot product of W and U
    yabs = vectorDotProduct(W, V);    // here W*V is the dot product of W and V

    // on intersection with tile
    if (xabs/alpha + yabs/beta <= 1) {
        return true;
    }
    // no intersection with tile
    else {
        return false;
    }
};