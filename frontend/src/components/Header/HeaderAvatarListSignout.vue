<template>
  <v-list-item @click="signOutHandler()">
    <v-list-item-avatar>
      <v-icon btn>mdi-logout</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>ログアウト</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['headers'])
  },

  methods: {
    ...mapMutations(['clearHeaders']),
    ...mapActions(['signOut', 'pushSnackbarSuccess', 'pushSnackbarError']),

    signOutHandler: async function() {
      const headers = this.headers

      try {
        await this.signOut(headers)
        await this.clearHeaders()
        this.pushSnackbarSuccess({ message: 'ログアウトしました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
