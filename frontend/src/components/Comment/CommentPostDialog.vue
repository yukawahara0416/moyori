<template>
  <span>
    <v-btn color="primary" @click.stop="commentHandler()">
      <v-icon class="mr-2">mdi-message-outline</v-icon>
      コメントする
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <comment-post-dialog-form
        :spot="spot"
        :dialog="dialog"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentPostDialogForm from '@/components/Comment/CommentPostDialogForm.vue'

export default {
  props: {
    spot: Object
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
    ...mapGetters(['isLoggingIn'])
  },

  methods: {
    commentHandler() {
      if (this.isLoggingIn == false) {
        this.$store.dispatch('dialogOn', 'dialogSign')
        this.$$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
        return
      }
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
