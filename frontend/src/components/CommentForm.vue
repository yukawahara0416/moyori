<template>
  <div>
    <v-form @submit.prevent>
      <v-text-field
        label="コメント"
        name="comment"
        type="text"
        v-model="content"
      />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">
      コメント
    </v-btn>
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
          if (this.isCommented.length === 0) {
            await this.postComment(spot, id)
          } else {
            this.content = ''
          }
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.postComment(spot, id)
        }
      } else {
        console.log('ログインしてください')
      }
    },

    postComment(spot, id) {
      var params = { spot_id: spot.record.id, content: this.content }
      this.$store.dispatch('postCommnet', { params: params, id: id })
    }
  }
}
</script>

<style></style>
