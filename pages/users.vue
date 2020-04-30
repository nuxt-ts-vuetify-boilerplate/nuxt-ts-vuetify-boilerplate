<template>
  <div>
    <v-simple-table>
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
        <tr is="UserRow" v-for="u in users" :key="u.ID" :user="u"></tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'nuxt-property-decorator'
  import UserRow from '~/components/UserRow.vue'
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
