<template>
  <div>
    <v-form @submit.prevent>
      <v-text-field name="comment" type="text" v-model="content" />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">コメント</v-btn>

    <div v-for="(c, id) in spot.comments" :key="id">
      <p>{{ c.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    id: Number
  },

  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapGetters(['spots', 'headers', 'currentUser']),

    isPosted() {
      if (this.spot.record.length !== 0) {
        return this.spot
      } else {
        return false
      }
    },

    isCommented() {
      const vm = this
      const commented = this.spots[this.id].comments.filter(function(comment) {
        return comment.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && commented.length > 0) {
        return commented
      } else {
        return []
      }
    }
  },

  methods: {
    commentHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.headers !== null) {
        if (this.isPosted) {
          await this.postComment(spot, id)
          this.content = ''
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.postComment(spot, id)
          this.content = ''
        }
      } else {
        console.log('ログインしてください')
      }
    },

    postComment(spot, id) {
      var params = { spot_id: spot.record.id, content: this.content }
      this.$store.dispatch('postComment', { params: params, id: id })
    }
  }
}
</script>

<style></style>
