const DistanceBetweenTwoPoints = require('../src/math/DistanceBetweenTwoPoints');

// trunace an integer without rounding it 
let trunc = (num, dec) => {
    const pow = 10 ** dec
    return Math.trunc(num * pow) / pow;
}

test('Calculates the hypotenuse between two sides', () => {
    let hypotenuseLength = DistanceBetweenTwoPoints({x:2,y:2},{x:4,y:4});
    let truncatedHypoLength = trunc(hypotenuseLength,4);
    console.log('truncatedHypoLength', truncatedHypoLength);

    expect(truncatedHypoLength).toBe(2.8284);
});