import distanceBetweenTwoPoints from "../../src/math/DistanceBetweenTwoPoints";

// truncate an integer without rounding it
let trunc = (num, dec) => {
  const pow = 10 ** dec;
  return Math.trunc(num * pow) / pow;
};

test("Calculates the hypotenuse between two sides", () => {
  let hypotenuseLength = distanceBetweenTwoPoints(
    { x: 2, y: 2 },
    { x: 4, y: 4 }
  );
  console.log("hypotenuseLength", hypotenuseLength);
  let truncatedHypoLength = trunc(hypotenuseLength, 4);

  expect(truncatedHypoLength).toBe(2.8284);
});
