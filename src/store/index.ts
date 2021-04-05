import actions from './actions';
import mutations from './mutations';
import state from './state.ts';
import { Store }  from './store';

export default new Store({
  actions,
  mutations,
  state
});
