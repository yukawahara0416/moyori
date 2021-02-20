<template>
  <span>
    <v-btn text small color="green darken-1" @click.stop="openDialog()">
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
import { Spot } from '@/class/Spot.js'
import CommentIndexDeleteButtonDialog from '@/components/Comment/CommentIndexDeleteButtonDialog.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    },
    comment: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
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
