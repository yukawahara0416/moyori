<template>
  <v-card class="mb-2 pa-3">
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

    <v-card-actions>
      <v-spacer />
      <v-btn @click="commentHandler()" type="submit">コメント</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    type: String,
    dialog: Boolean
  },

  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapGetters(['headers', 'currentUser', 'dialogSign']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['postComment', 'pushSnackbar']),

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
            content: this.content,
            type: type
          })
          this.content = ''
          this.closeDialog()
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.postComment({
            spot: result,
            type: type,
            content: this.content
          })
          this.content = ''
          this.closeDialog()
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style></style>
