<template>
  <div>
    <v-btn icon @click.stop="likeHandler()">
      <v-icon v-if="isLiking" color="error">mdi-heart</v-icon>
      <v-icon v-else>mdi-heart-outline</v-icon>
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
    type: String
  },

  components: {
    Counter
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggingIn', 'dialogSign']),

    isPostedSpot() {
      return Object.prototype.hasOwnProperty.call(this.spot.data, 'id')
    },

    isLiking() {
      return this.likesByCurrentUser.length > 0 ? true : false
    },

    likesByCurrentUser() {
      if (this.spot.likes.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.likes.filter(like => {
        return like.user_id == this.currentUser.data.id
      })
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['like', 'unlike', 'pushSnackbar']),

    likeHandler: async function() {
      const spot = this.spot
      const type = this.type

      if (this.isLoggingIn == false) {
        this.dialogOn()
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
        return
      }

      if (this.isLoggingIn == true) {
        if (this.isPostedSpot == false) {
          const result = await this.saveSpot({ spot: spot })
          await this.like({ spot: result, type: type })
          return
        }

        if (this.isPostedSpot == true && this.isLiking == false) {
          await this.like({ spot: spot, type: type })
          return
        }

        if (this.isPostedSpot == true && this.isLiking == true) {
          await this.unlike({
            spot: spot,
            like: this.likesByCurrentUser[0],
            type: type
          })
          return
        }
      }
    },

    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
