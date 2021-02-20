<template>
  <v-btn icon>
    <comment-index-avatar-image :comment="comment" />
  </v-btn>
</template>

<script>
import CommentIndexAvatarImage from '@/components/Comment/CommentIndexAvatarImage.vue'

export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },

  components: {
    CommentIndexAvatarImage
  }
}
</script>
