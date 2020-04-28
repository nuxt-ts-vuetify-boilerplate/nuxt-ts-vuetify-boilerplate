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
        <tr v-for="u in users" :key="u.ID">
          <td>{{ u.ID }}</td>
          <td>{{ u.displayName }}</td>
          <td>{{ u.createdFormatted }}</td>
          <td class="text-center">
            <v-icon color="primary" v-if="u.status">mdi-check-circle</v-icon>
            <v-icon color="error" v-else>mdi-stop-circle</v-icon>
          </td>
          <td>

          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Provide, Vue, Watch } from 'nuxt-property-decorator'

  class User {
    public ID: string = ''
    public displayName: string = ''
    public _created: Date | undefined
    public createdFormatted: string = ''
    public status: boolean = false

    constructor(id: string, displayName: string, created: Date, status: boolean) {
      this.ID = id
      this.displayName = displayName
      this.created = created
      this.status = status
    }

    set created(val: Date) {
      this._created = val
      this.createdFormatted = val.getFullYear() + '/' +
        ('00' + (val.getMonth() + 1)).slice(-2) + '/' +
        ('00' + val.getDate()).slice(-2) + ' ' +
        ('00' + val.getHours()).slice(-2) + ':' +
        ('00' + val.getMinutes()).slice(-2) + ':' +
        ('00' + val.getSeconds()).slice(-2)
    }
  }

  @Component
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
