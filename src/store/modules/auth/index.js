import state from 'src/store/modules/auth/state';
import * as getters from 'src/store/modules/auth/getters';
import * as mutations from 'src/store/modules/auth/mutations';
import * as actions from 'src/store/modules/auth/actions';

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
