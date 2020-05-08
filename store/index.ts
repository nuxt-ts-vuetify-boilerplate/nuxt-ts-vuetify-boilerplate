import Vuex from 'vuex';
import LoadingModule from '~/store/loading';
import ClientsModule from "~/store/clients";

export function createStore() {
  return new Vuex.Store({
    modules: {
      LoadingModule,
      ClientsModule,
    }
  });
}
