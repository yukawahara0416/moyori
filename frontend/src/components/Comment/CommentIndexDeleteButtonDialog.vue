<template>
  <v-card>
    <v-card-title class="headline">
      コメントを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn @click="closeDialog()" color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn @click="deleteCommentHandler()" color="green darken-1" text>
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    comment: Object
  },

  computed: {
    ...mapGetters(['headers', 'currentUser'])
  },

  methods: {
    ...mapActions(['unVote', 'pushSnackbarSuccess', 'pushSnackbarError']),

    deleteCommentHandler: async function() {
      const spot = this.spot
      const target = this.comment
      const tab = this.profileTab
      const headers = this.headers
      const route = this.$route.name

      try {
        await this.unVote({
          prop: 'comments',
          spot,
          target,
          tab,
          headers,
          route
        })
        this.pushSnackbarSuccess({ message: 'コメントを削除しました' })
        this.closeDialog()
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
