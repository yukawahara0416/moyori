<template>
  <span>
    <v-card class="ma-4" flat v-for="(comment, id) in spot.comments" :key="id">
      <v-card-subtitle class="pa-0">
        <comment-index-avatar :comment="comment" />

        <comment-index-username :comment="comment" />

        <comment-index-day :comment="comment" />

        <comment-index-delete-button
          v-if="isCommentingByCurrentUser(comment)"
          :spot="spot"
          :type="type"
          :comment="comment"
        />
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-row>
          <v-col :cols="isImageExist(comment) ? 9 : 12" class="py-0">
            <p class="mx-3">{{ comment.data.content }}</p>
          </v-col>

          <v-col v-if="isImageExist(comment)" cols="3" class="pa-0">
            <comment-index-image :comment="comment" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentIndexAvatar from '@/components/Comment/CommentIndexAvatar.vue'
import CommentIndexDeleteButton from '@/components/Comment/CommentIndexDeleteButton.vue'
import CommentIndexUsername from '@/components/Comment/CommentIndexUsername.vue'
import CommentIndexDay from '@/components/Comment/CommentIndexDay.vue'
import CommentIndexImage from '@/components/Comment/CommentIndexImage.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    CommentIndexAvatar,
    CommentIndexDeleteButton,
    CommentIndexUsername,
    CommentIndexDay,
    CommentIndexImage
  },

  computed: {
    ...mapGetters(['currentUser']),

    isImageExist() {
      return function(comment) {
        return comment.image !== null
      }
    },

    isCommentingByCurrentUser() {
      return function(comment) {
        return comment.data.user_id == this.currentUser.data.id
      }
    }
  }
}
</script>
