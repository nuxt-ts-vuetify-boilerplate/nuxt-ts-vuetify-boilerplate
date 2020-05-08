import {Module, VuexModule, Mutation} from 'vuex-module-decorators';

@Module({
  name: 'loading',
  stateFactory: true,
  namespaced: true
})
export default class LoadingModule extends VuexModule {
  private loadingCount: number = 0;

  @Mutation
  incrementLoading() {
    this.loadingCount++;
  }

  @Mutation
  decrementLoading() {
    this.loadingCount--;
    if (this.loadingCount < 0) {
      this.loadingCount = 0;
    }
  }

  get isLoading(): boolean {
    return this.loadingCount > 0;
  }
}
