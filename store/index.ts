import Vuex from 'vuex';
import LoadingModule from '~/store/loading';

export function createStore() {
  return new Vuex.Store({
    modules: {
      LoadingModule,
    }
  });
}
