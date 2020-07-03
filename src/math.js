// calculate cross product (analog) based on two 2D vectors 
// returns a scalar value
export let vectorCrossProduct = (U,V) => {
    let CrossProductAnalog = (U.x*V.y-U.y*V.x);
    return CrossProductAnalog;
};

// calculate dot product of two 2D vectors via the geometric definition
// i.e. by multiplying the sum of the vector lengths of points U, V by cos x,
// the former being the angle between the two vectors 
// returns a scalar value
export let vectorDotProduct = (U,V, x = 25) => {
    // vector lengths are always positive
    return Math.abs(U.x * V.x) + Math.abs(U.y * V.y)*Math.cos(x);
};

export let vectorAddition = (a,b) => {
    return { x: a.x+b.x, y: a.y+b.y };
}

export let vectorSubtraction = (a,b) => {
    return { x: a.x-b.x, y: a.y-b.y };
}

export let vectorDivisionByScalar = (a, s) => {
    return { x: a.x/s, y: a.y/s };
}

// receives two points (x,y)
// returns a scalar value
export let distanceBetweenTwoPoints = (a, b) => {
    return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
}

// receives 3 points [x,y] and an arbitrary point [x,y]
// returns a boolean
export let pointInTriangle = (a,b,c,p) => {
    // Compute vectors        
    let v0 =  {x: c.x - a.x, y: c.y - a.y},
    v1 =      {x: b.x - a.x, y: b.y - a.y},
    v2 =      {x: p.x - a.x, y: p.y - a.y};
    
    // Compute dot products
    let dot00 = vectorDotProduct(v0, v0),
    dot01 = vectorDotProduct(v0, v1),
    dot02 = vectorDotProduct(v0, v2),
    dot11 = vectorDotProduct(v1, v1),
    dot12 = vectorDotProduct(v1, v2);
    
    // Compute barycentric coordinates
    let invDenom = 1 / (dot00 * dot11 - dot01 * dot01),
    u = (dot11 * dot02 - dot01 * dot12) * invDenom,
    v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    
    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
};

// receives 4 points [x,y] and an arbitrary point [x,y]
// returns a boolean
export let pointInRhombus = (a,b,c,d,p) => {
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

// receives 2 points [x,y] and an arbitrary point [x,y]
// returns a boolean
export let pointInHexagon = (a,b) => {
    // calculate center point of bounding box
    let centerPoint = {x: (b.x - a.x)/2, y:(b.y - a.y)/2};
    console.log('centerPoint', centerPoint);
    //let q2x = Math.abs(p.x - _center.x);         // transform the test point locally and to quadrant 2
    //let q2y = Math.abs(p.y - _center.y);         // transform the test point locally and to quadrant 2
    //if (q2x > _hori || q2y > _vert*2) return false;           // bounding test (since q2 is in quadrant 2 only 2 tests are needed)
    //return 2 * _vert * _hori - _vert * q2x - _hori * q2y >= 0;   // finally the dot product can be reduced to this due to the hexagon symmetry
};

