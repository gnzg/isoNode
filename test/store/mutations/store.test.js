let Store = require("../../../src/store/index").default;

test(" Does the global store object exist?", () => {
  expect(Store instanceof Object).toBe(true);
});
