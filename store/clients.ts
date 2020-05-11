import {Module, VuexModule, Mutation} from 'vuex-module-decorators';
import Client from "~/api/client";

@Module({
  name: 'clients',
  stateFactory: true,
  namespaced: true
})
export default class ClientsModule extends VuexModule {
  private _client: Client = new Client()

  @Mutation
  setToken(token: string) {
    this._client = new Client(token)
  }

  get client(): Client {
    return this._client;
  }
}
