<template>
  <span>
    <v-btn color="green darken-1" text @click.stop="openDialog()">
      削除する
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <comment-index-delete-button-dialog
        :spot="spot"
        :comment="comment"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </span>
</template>

<script>
import CommentIndexDeleteButtonDialog from '@/components/Comment/CommentIndexDeleteButtonDialog.vue'

export default {
  props: {
    spot: Object,
    comment: Object
  },

  components: {
    CommentIndexDeleteButtonDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
