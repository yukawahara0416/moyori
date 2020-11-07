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
import Counter from '@/components/Card/Buttons/Counter.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    Counter
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggingIn', 'tab']),

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
    ...mapActions(['like', 'unlike']),

    likeHandler: async function() {
      const spot = this.spot
      const activeTab = this.tab

      if (this.isLoggingIn == false) {
        this.dialogOn()
        this.$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
        return
      }

      if (this.isPostedSpot == false) {
        const result = await this.saveSpot(spot)
        await this.like({ spot: result, active_tab: activeTab })
        return
      }

      if (this.isLiking == false) {
        await this.like({ spot: spot, active_tab: activeTab })
        return
      }

      await this.unlike({
        spot: spot,
        data: this.likesByCurrentUser[0],
        active_tab: activeTab
      })
    },

    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
