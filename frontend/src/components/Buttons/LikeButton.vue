<template>
  <div>
    <v-btn icon @click.stop="likeHandler()">
      <v-icon v-if="isLiked" color="error">mdi-heart</v-icon>
      <v-icon v-if="!isLiked">mdi-heart-outline</v-icon>
      <counter :spot="spot" :genre="'likes'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object,
    id: Number,
    type: String
  },

  components: {
    Counter
  },

  computed: {
    ...mapGetters(['headers', 'currentUser']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    },

    isLiked() {
      return this.ownLike.length > 0 ? true : false
    },

    ownLike() {
      if (this.isLoggedIn) {
        return this.spot.likes.filter(like => {
          return like.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['like', 'unlike', 'pushSnackbar']),

    likeHandler: async function() {
      const spot = this.spot
      // 修正点 index_idではなくdata.place_idを参照する方法に変更する
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          if (this.isLiked) {
            // 修正点 index_idではなくdata.place_idを参照する方法に変更する
            await this.unlike({ like: this.ownLike[0], id: id, type: type })
          } else {
            await this.like({ spot: spot, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.like({ spot: result, type: type })
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>
