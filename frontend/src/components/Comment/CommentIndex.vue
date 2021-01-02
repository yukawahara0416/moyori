<template>
  <span>
    <v-card
      class="mx-4 my-1"
      flat
      v-for="(comment, id) in spot.comments"
      :key="id"
    >
      <v-card-subtitle class="pa-0">
        <comment-index-avatar :comment="comment" />

        <comment-index-username :comment="comment" />

        <comment-index-day :comment="comment" />

        <comment-index-delete-button
          v-if="isCommentingByCurrentUser(comment)"
          :spot="spot"
          :comment="comment"
        />
      </v-card-subtitle>

      <comment-index-content :comment="comment" />
    </v-card>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentIndexAvatar from '@/components/Comment/CommentIndexAvatar.vue'
import CommentIndexDeleteButton from '@/components/Comment/CommentIndexDeleteButton.vue'
import CommentIndexUsername from '@/components/Comment/CommentIndexUsername.vue'
import CommentIndexDay from '@/components/Comment/CommentIndexDay.vue'
import CommentIndexContent from '@/components/Comment/CommentIndexContent.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    CommentIndexAvatar,
    CommentIndexDeleteButton,
    CommentIndexUsername,
    CommentIndexDay,
    CommentIndexContent
  },
  computed: {
    ...mapGetters(['currentUser']),

    isCommentingByCurrentUser() {
      return function(comment) {
        return comment.user_id == this.currentUser.data.id
      }
    }
  }
}
</script>
