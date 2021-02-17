<template>
  <span>
    <v-btn small color="primary" @click.stop="commentHandler()">
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Spot } from '@/class/Spot.js'
import CommentPostDialogForm from '@/components/Comment/CommentPostDialogForm.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
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
    ...mapMutations(['dialogOn', 'changeSignTab']),
    ...mapActions(['pushSnackbarError']),

    commentHandler() {
      if (!this.isLoggingIn) {
        this.changeSignTab('signin')
        this.dialogOn('dialogSign')
        this.pushSnackbarError({ message: 'ログインしてください' })
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
