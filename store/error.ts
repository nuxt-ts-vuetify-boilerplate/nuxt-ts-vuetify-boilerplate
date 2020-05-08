import {Module, VuexModule, Mutation} from 'vuex-module-decorators';

@Module({
  name: 'error',
  stateFactory: true,
  namespaced: true
})
export default class ErrorModule extends VuexModule {
  private _error: string = '';

  @Mutation
  setError(message: string) {
    this._error = message;
  }

  get error(): string {
    return this._error;

  }
}
