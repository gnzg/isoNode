let Store = require('../../../src/store/index');

test(' Does the global store object exist?', () => {
    let store = new Store;
    expect(store instanceof Object).toBe(true);
});

//console.log(Store);