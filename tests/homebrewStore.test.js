import store from '../src/store/index';

test('Add an item to our homebrew store', () => {
  store.dispatch('addItem', 'foo');
  expect(store.state.misc[0] === 'foo').toBe(true);
});

test('Should rotate the ground map', () => {
  let beforeRotationX = store.state.env.map[0].length;
  let beforeRotationZ = store.state.env.map.length;
  let currentKeyMap = store.state.keyMap;
  currentKeyMap[82] = true;
  store.dispatch('handleKeyDown', currentKeyMap);
  let afterRotationX = store.state.env.map[0].length;
  let afterRotationZ = store.state.env.map.length;
  expect(beforeRotationX === afterRotationZ &&
         beforeRotationZ === afterRotationX
    ).toBe(true);
});