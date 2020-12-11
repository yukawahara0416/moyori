<template>
  <v-card flat outlined class="mb-2">
    <v-card-actions class="mt-2">
      <v-spacer />
      <comment-post-dialog :spot="spot" />
      <v-spacer />
    </v-card-actions>

    <span v-if="spot.comments[0]">
      <comment-index :spot="spot" />
    </span>
    <span v-else>
      <v-card flat class="ma-4">
        <p>コメントはまだありません</p>
      </v-card>
    </span>
  </v-card>
</template>

<script>
import CommentIndex from '@/components/Comment/CommentIndex.vue'
import CommentPostDialog from '@/components/Comment/CommentPostDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    CommentIndex,
    CommentPostDialog
  }
}
</script>
