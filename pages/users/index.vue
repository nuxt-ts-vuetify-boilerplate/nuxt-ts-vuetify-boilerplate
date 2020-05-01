<template>
  <div>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="">
          <p>検索</p>
          <div class="d-flex">
            <v-text-field placeholder="検索ワードを入力" class="pt-0"></v-text-field>
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
  </div>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'nuxt-property-decorator'
  import UserRow from '~/components/users/UserRow.vue'
  import User from '~/scripts/model/User'

  @Component({
    components: {
      UserRow,
    }
  })
  export default class UsersComponent extends Vue {
    @Provide()
    public users: User[] = []

    created() {
      this.loadUser()
    }

    loadUser() {
      this.users = [
        new User('testID_1', 'test', new Date(), true)
      ]
    }
  }
</script>

<style scoped lang="scss">

</style>
