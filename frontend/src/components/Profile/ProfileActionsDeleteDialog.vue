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
import { axiosBase } from '@/plugins/axios.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import router from '@/router'

export default {
  computed: {
    ...mapGetters(['headers'])
  },

  methods: {
    ...mapMutations(['clearHeaders']),
    ...mapActions(['pushSnackbarSuccess', 'pushSnackbarError']),

    deleteAccountHandler: async function() {
      try {
        await this.deleteAccount(this.headers)
        await this.clearHeaders()
        router.push('/')
        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'アカウントを削除しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    deleteAccount(headers) {
      return axiosBase
        .delete('/api/v1/auth/', { headers })
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('アカウントの削除に失敗しました')
        })
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
