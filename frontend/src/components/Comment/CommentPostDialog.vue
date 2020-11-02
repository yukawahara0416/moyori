<template>
  <span>
    <v-btn color="primary" @click.stop="commentHandler()">
      <v-icon class="mr-2">mdi-message-outline</v-icon>
      コメントする
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <comment-post-dialog-form
        :spot="spot"
        :type="type"
        :dialog="dialog"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommentPostDialogForm from '@/components/Comment/CommentPostDialogForm.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    CommentPostDialogForm
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapGetters(['headers', 'dialogSign']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    }
  },

  methods: {
    ...mapActions(['pushSnackbar']),

    commentHandler() {
      if (this.isLoggedIn) {
        this.dialog = true
      } else {
        this.dialogOn()
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    },

    closeDialog() {
      this.dialog = false
    },

    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
