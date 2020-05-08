<template>
  <div>
    <v-dialog max-width="500" v-model="errorDialogStatus">
      <v-card>
        <v-card-title>エラー</v-card-title>
        <v-card-text>
          <pre>{{ errorMessage }}</pre>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" @click="errorDialogStatus=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide, Watch} from 'nuxt-property-decorator';
  import LoadingModule from "~/store/loading";
  import {getModule} from "vuex-module-decorators";
  import ErrorModule from "~/store/error";

  @Component
  export default class ErrorDialog extends Vue {
    @Provide()
    errorModule!: ErrorModule;
    @Provide()
    errorDialogStatus: boolean = false;

    get errorMessage(): string {
      const message = this.errorModule.error;
      this.errorDialogStatus = message.length > 0;
      return message;
    }

    @Watch('errorDialogStatus')
    watchErrorDialogStatus(val: boolean) {
      if (!val) {
        this.errorModule.setError('');
      }
    }

    created() {
      this.errorModule = getModule(ErrorModule, this.$store);
    }
  }
</script>
<style lang="scss" scoped>
</style>
