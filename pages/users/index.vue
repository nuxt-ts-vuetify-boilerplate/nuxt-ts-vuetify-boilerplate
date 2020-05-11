<template>
  <div>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="search">
          <p>検索</p>
          <div class="d-flex">
            <v-text-field placeholder="検索ワードを入力" class="pt-0" v-model="searchText"></v-text-field>
            <v-btn type="submit" class="ml-2">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-simple-table class="mt-3">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">DisplayName</th>
          <th class="text-left">Created</th>
          <th class="text-center">Status</th>
          <th class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr is="UserRow" v-for="(u, i) in users" :key="u.ID" v-model="users[i]"></tr>
        </tbody>
      </template>
    </v-simple-table>
    <div>
      <v-btn @click="prevPage">＜</v-btn>
      <v-btn @click="nextPage">＞</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'nuxt-property-decorator'
  import UserRow from '~/components/users/UserRow.vue'
  import User from '~/scripts/model/User'
  import LoadingModule from "~/store/loading";
  import {getModule} from "vuex-module-decorators";
  import NuxtLoading from "~/.nuxt/components/nuxt-loading.vue";
  import ClientsModule from "~/store/clients";
  import {ServiceUserGetUsersRequest} from "~/api/serviceUserGetUsers";
  import ErrorModule from "~/store/error";
  import {ServiceUserSearchUserRequest} from "~/api/serviceUserSearchUser";

  @Component({
    components: {
      NuxtLoading,
      UserRow,
    }
  })
  export default class UsersComponent extends Vue {
    @Provide()
    errorModule!: ErrorModule
    @Provide()
    loadingModule!: LoadingModule
    @Provide()
    clientsModule!: ClientsModule

    @Provide()
    public users: User[] = []

    @Provide()
    currentOffset: number = 0
    @Provide()
    searchText: string = ""

    created() {
      this.errorModule = getModule(ErrorModule, this.$store)
      this.loadingModule = getModule(LoadingModule, this.$store)
      this.clientsModule = getModule(ClientsModule, this.$store)

      this.loadUser(this.currentOffset)
    }

    prevPage() {
      this.currentOffset -= 5
      this.loadUser(this.currentOffset)
    }

    nextPage() {
      this.currentOffset += 5
      this.loadUser(this.currentOffset)
    }

    async search(){
      this.loadingModule.incrementLoading()

      try {
        const req = new ServiceUserSearchUserRequest()
        req.searchText = this.searchText

        const resp = await this.clientsModule.client.searchUsers(req)
        this.users = resp.users
      } catch (e) {
        this.errorModule.setError(e);
      } finally {
        this.loadingModule.decrementLoading()
      }
    }

    async loadUser(offset: number) {
      this.loadingModule.incrementLoading()

      try {
        const req = new ServiceUserGetUsersRequest()
        req.offset = offset
        req.maxItems = 5

        const resp = await this.clientsModule.client.getUsers(req)
        this.users = resp.users
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
