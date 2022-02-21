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



