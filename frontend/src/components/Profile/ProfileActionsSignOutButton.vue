<template>
  <v-btn class="my-3" @click="signOutHandler()" width="250">
    <v-icon left>mdi-logout</v-icon>
    ログアウト
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['headers'])
  },

  methods: {
    ...mapActions(['signOut', 'pushSnackbarSuccess', 'pushSnackbarError']),

    signOutHandler: async function() {
      const headers = this.headers

      try {
        await this.signOut(headers)
        this.pushSnackbarSuccess({ message: 'ログアウトしました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
