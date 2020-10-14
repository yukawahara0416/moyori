<template>
  <v-row justify="center">
    <v-btn color="success" @click.stop="commentHandler">
      <v-icon class="mr-2">mdi-message-outline</v-icon>
      コメントする
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <spot-show-dialog-comment-panel-post-dialog-form
        :spot="spot"
        :type="type"
        :dialog="dialog"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SpotShowDialogCommentPanelPostDialogForm from '@/components/Spot/SpotShowDialogCommentPanelPostDialogForm.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    SpotShowDialogCommentPanelPostDialogForm
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
