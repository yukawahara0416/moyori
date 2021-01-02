<template>
  <v-card>
    <v-card-title class="headline">
      アカウントを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn @click.stop="cancelDeleteAccount()" color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn @click="deleteAccountHandler()" color="green darken-1" text>
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import router from '@/router'

export default {
  computed: {
    ...mapGetters(['headers'])
  },

  methods: {
    ...mapMutations(['clearHeaders']),
    ...mapActions([
      'deleteAccount',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    deleteAccountHandler: async function() {
      const headers = this.headers
      try {
        await this.deleteAccount(headers)
        await this.clearHeaders()
        router.push('/')
        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'アカウントを削除しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    cancelDeleteAccount() {
      this.closeDialog()
      this.pushSnackbarSuccess({
        message: 'アカウントの削除をキャンセルしました'
      })
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
