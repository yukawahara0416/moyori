<template>
  <v-card>
    <v-form @submit.prevent>
      <v-textarea
        label="コメントを入力してください"
        name="comment"
        prepend-icon="mdi-comment"
        rows="5"
        type="text"
        v-model="content"
      />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">コメント</v-btn>

    <div v-for="(comment, id) in spot.comments" :key="id">
      <p>{{ comment.content }}</p>
      <v-btn
        type="submit"
        v-if="currentUser && comment.user_id == currentUser.data.id"
        @click="deleteComment({ spot, comment, type })"
      >
        削除
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    type: String,
    isLoggedIn: Boolean
  },

  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  // ここからコピペしただけ手つかず
  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['postComment', 'deleteComment', 'pushSnackbar']),

    commentHandler: async function() {
      const spot = this.spot
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          await this.postComment({
            spot: spot,
            type: type,
            content: this.content
          })
          this.content = ''
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.postComment({
            spot: result,
            type: type,
            content: this.content
          })
          this.content = ''
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>

<style></style>
