<template>
  <div>
    <v-dialog v-model="loadingModule.isLoading" max-width="300">
      <v-card>
        <v-card-title class="d-flex justify-center align-center">
          Now Loading
        </v-card-title>
        <v-card-text class="d-flex justify-center align-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator';
  import LoadingModule from "~/store/loading";
  import {getModule} from "vuex-module-decorators";

  @Component
  export default class LoadingDialog extends Vue {
    @Provide()
    loadingModule!: LoadingModule

    created() {
      this.loadingModule = getModule(LoadingModule, this.$store)
    }
  }
</script>
<style lang="scss" scoped>
</style>
