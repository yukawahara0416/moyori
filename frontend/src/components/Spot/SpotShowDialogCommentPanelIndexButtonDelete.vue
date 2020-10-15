<template>
  <span>
    <v-btn color="green darken-1" text @click.stop="dialog = !dialog">
      削除する
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <spot-show-dialog-comment-panel-index-button-delete-dialog
        :spot="spot"
        :comment="comment"
        :type="type"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </span>
</template>

<script>
import SpotShowDialogCommentPanelIndexButtonDeleteDialog from '@/components/Spot/SpotShowDialogCommentPanelIndexButtonDeleteDialog.vue'

export default {
  props: {
    spot: Object,
    comment: Object,
    type: String
  },

  components: {
    SpotShowDialogCommentPanelIndexButtonDeleteDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>

<style></style>
