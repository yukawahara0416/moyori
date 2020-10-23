<template>
  <v-card flat outlined>
    <span v-if="spot.comments[0]">
      <spot-show-dialog-comment-panel-index :spot="spot" :type="type" />
    </span>
    <span v-else>
      <v-card flat class="ma-4">
        <p>コメントはまだありません</p>
      </v-card>
    </span>

    <v-card-actions>
      <v-spacer />
      <spot-show-dialog-comment-panel-post-dialog :spot="spot" :type="type" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import SpotShowDialogCommentPanelIndex from '@/components/Spot/SpotShowDialogCommentPanelIndex.vue'
import SpotShowDialogCommentPanelPostDialog from '@/components/Spot/SpotShowDialogCommentPanelPostDialog.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    SpotShowDialogCommentPanelIndex,
    SpotShowDialogCommentPanelPostDialog
  }
}
</script>
