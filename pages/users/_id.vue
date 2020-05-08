<template>
  <v-card>
    <v-card-title>
      {{ user.displayName }}
    </v-card-title>

    <v-card-text>
      <v-simple-table>
        <template>
          <tbody>
          <tr>
            <td>ID</td>
            <td>{{ user.ID }}</td>
          </tr>
          <tr>
            <td>DisplayName</td>
            <td>{{ user.displayName }}</td>
          </tr>
          <tr>
            <td>Created Date</td>
            <td>{{ user.createdFormatted }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td class="text-center">
              <v-icon color="primary" v-if="user.status">mdi-check-circle</v-icon>
              <v-icon color="error" v-else>mdi-stop-circle</v-icon>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'nuxt-property-decorator'
  import User from '~/scripts/model/User'
  import LoadingModule from "~/store/loading";
  import {getModule} from "vuex-module-decorators";

  @Component
  export default class UserDetailComponent extends Vue {
    @Provide()
    loadingModule!: LoadingModule
    @Provide()
    public user: User = new User('', '', new Date(), false)

    created() {
      this.loadingModule = getModule(LoadingModule, this.$store)
      this.loadUser()
    }

    loadUser() {
      this.loadingModule.incrementLoading()
      setTimeout(() => {
        this.user = new User('testID_1', 'test', new Date(), true)
        this.loadingModule.decrementLoading()
      }, 2000)
    }
  }
</script>

<style scoped lang="scss">

</style>
