<template>
  <div>
    <v-btn icon @click="likeHandler()">
      <v-icon v-if="isLiked.length === 0">mdi-heart-outline</v-icon>
      <v-icon v-if="isLiked.length > 0" color="error">mdi-heart</v-icon>
      <p>{{ count }}</p>
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

  computed: {
    ...mapGetters(['spots', 'headers', 'currentUser']),

    isPosted() {
      if (this.spot.record.length !== 0) {
        return this.spot
      } else {
        return false
      }
    },

    isLiked() {
      const vm = this
      const likes = this.spots[this.id].likes
      if (vm.currentUser !== null && likes.length > 0) {
        const liked = likes.filter(function(like) {
          return like.user_id == vm.currentUser.data.id
        })
        return liked
      } else {
        return []
      }
    },

    count() {
      const likes = this.spots[this.id].likes
      if (likes.length > 0) {
        return likes.length
      } else {
        return 0
      }
    }
  },

  methods: {
    likeHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.headers !== null) {
        if (this.isPosted) {
          if (this.isLiked.length === 0) {
            await this.like(spot, id)
          } else {
            await this.unlike(this.isLiked[0], id)
          }
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.like(spot, id)
        }
      } else {
        this.$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
      }
    },

    like(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('like', { params: params, id: id })
    },

    unlike(like, id) {
      var params = { id: like.id }
      this.$store.dispatch('unlike', { params: params, id: id })
    }
  }
}
</script>

<style></style>
