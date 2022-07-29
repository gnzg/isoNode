import actions from './actions';
import mutations from './mutations/index';
import state from './state';
import Store from './store';

export default new Store ({
  actions,
  mutations,
  state
});
