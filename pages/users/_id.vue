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

  @Component
  export default class UserDetailComponent extends Vue {
    @Provide()
    public user!: User

    created() {
      this.loadUser()
    }

    loadUser() {
      this.user = new User('testID_1', 'test', new Date(), true)
    }
  }
</script>

<style scoped lang="scss">

</style>