<template>
  <tr>
    <td>{{ user.ID }}</td>
    <td>{{ user.displayName }}</td>
    <td>{{ user.createdFormatted }}</td>
    <td class="text-center">
      <v-icon color="primary" v-if="user.status">mdi-check-circle</v-icon>
      <v-icon color="error" v-else>mdi-stop-circle</v-icon>
    </td>
    <td class="d-flex justify-center align-center">
      <v-btn color="primary" @click="showDialog">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <n-link :to="`/users/${user.ID}`" prefetch class="ml-2">
        <v-btn color="primary">
          <v-icon>mdi-text-box</v-icon>
        </v-btn>
      </n-link>

      <v-dialog v-model="isShowDialog" max-width="500">
        <v-card>
          <v-card-title>
            <v-icon>mdi-pencil</v-icon>
            {{ user.displayName }}
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="save">
              <v-text-field placeholder="ID" v-model="editUser.ID" disabled></v-text-field>
              <v-text-field placeholder="display name" v-model="editUser.displayName"></v-text-field>
              <v-text-field placeholder="created date" v-model="editUser.createdFormatted" disabled></v-text-field>
              <v-label>
                <v-switch label="status" v-model="editUser.status"></v-switch>
              </v-label>

              <div class="d-flex justify-end">
                <v-btn type="submit" color="primary">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </td>
  </tr>
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue, Watch} from 'nuxt-property-decorator'
  import User from '~/scripts/model/User'
  import LoadingModule from "~/store/loading";
  import {getModule} from "vuex-module-decorators";

  @Component
  export default class UserRow extends Vue {
    @Prop()
    public value!: User

    @Watch('value')
    changeValue(user: User) {
      this.editUser = user
    }

    @Provide()
    loadingModule!: LoadingModule

    @Provide()
    editUser: User = this.user.clone()

    @Provide()
    isShowDialog: boolean = false

    get user() {
      if (typeof this.value === 'undefined') {
        return new User('', '', new Date(), false)
      }
      return this.value
    }

    showDialog() {
      this.editUser = this.user.clone()
      this.isShowDialog = true
    }

    save() {
      this.loadingModule.incrementLoading()

      setTimeout(() => {
        this.$emit('input', this.editUser)
        this.isShowDialog = false

        this.loadingModule.decrementLoading()
      }, 2000);
    }

    created() {
      this.loadingModule = getModule(LoadingModule, this.$store)
    }
  }
</script>

<style scoped lang="scss">

</style>
