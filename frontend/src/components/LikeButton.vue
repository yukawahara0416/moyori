<template>
  <div>
    <v-btn icon @click="likeHandler()">
      いいね
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
      const liked = this.spots[this.id].likes.filter(function(like) {
        return like.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && liked.length > 0) {
        return liked
      } else {
        return []
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
        console.log('ログインしてください')
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
