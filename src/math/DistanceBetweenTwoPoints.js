// receives two points (x,y)
// returns a scalar value
export default (a, b) => {
    return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
}