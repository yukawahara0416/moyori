<template>
  <v-btn
    class="my-3"
    max-width="250"
    min-width="160"
    :small="$vuetify.breakpoint.smAndDown"
    @click.stop="signOutHandler()"
  >
    <v-icon left>mdi-logout</v-icon>
    ログアウト
  </v-btn>
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
