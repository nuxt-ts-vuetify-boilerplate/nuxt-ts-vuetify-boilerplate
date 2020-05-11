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
  import ClientsModule from "~/store/clients";
  import {ServiceUserSearchUserRequest} from "~/api/serviceUserSearchUser";
  import {ServiceUserGetUserRequest} from "~/api/serviceUserGetUser";
  import ErrorModule from "~/store/error";

  @Component
  export default class UserDetailComponent extends Vue {
    @Provide()
    loadingModule!: LoadingModule
    @Provide()
    errorModule!: ErrorModule
    @Provide()
    clientsModule!: ClientsModule

    @Provide()
    public user: User = new User('', '', new Date(), false)

    get userID(): string {
      return this.$route.params.id
    }

    created() {
      this.loadingModule = getModule(LoadingModule, this.$store)
      this.errorModule = getModule(ErrorModule, this.$store)
      this.clientsModule = getModule(ClientsModule, this.$store)

      this.loadUser()
    }

    async loadUser() {
      this.loadingModule.incrementLoading()

      try {
        const req = new ServiceUserGetUserRequest()
        req.id = this.userID

        const resp = await this.clientsModule.client.getUser(req)
        this.user = resp.user
      } catch (e) {
        this.errorModule.setError(e);
      } finally {
        this.loadingModule.decrementLoading()
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
