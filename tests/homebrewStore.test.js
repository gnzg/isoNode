import store from '../src/store/index';

test('Add an item to our homebrew store', () => {
  store.dispatch('addItem', 'foo');
  expect(store.state.misc[0] === 'foo').toBe(true);
});