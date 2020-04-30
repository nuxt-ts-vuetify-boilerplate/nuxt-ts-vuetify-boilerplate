<template>
  <tr>
    <td>{{ user.ID }}</td>
    <td>{{ user.displayName }}</td>
    <td>{{ user.createdFormatted }}</td>
    <td class="text-center">
      <v-icon color="primary" v-if="user.status">mdi-check-circle</v-icon>
      <v-icon color="error" v-else>mdi-stop-circle</v-icon>
    </td>
    <td>

    </td>
  </tr>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'nuxt-property-decorator'
  import User from '~/scripts/model/User'

  @Component
  export default class UserRow extends Vue {
    @Prop()
    user!: User
  }
</script>

<style scoped lang="scss">

</style>
