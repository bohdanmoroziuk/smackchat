import state from 'src/store/modules/chat/state';
import * as getters from 'src/store/modules/chat/getters';
import * as mutations from 'src/store/modules/chat/mutations';
import * as actions from 'src/store/modules/chat/actions';

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
