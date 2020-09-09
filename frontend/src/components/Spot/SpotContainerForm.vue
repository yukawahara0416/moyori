<template>
  <div v-if="isOriginalSpot && isPostedByYou">
    <v-form @submit.prevent>
      <v-text-field name="comment" type="text" v-model="name" />
      <v-text-field name="comment" type="text" v-model="address" />
      <v-text-field name="comment" type="text" v-model="website" />
    </v-form>

    <v-btn @click="spotUpdateHandler()" type="submit">更新</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    id: Number
  },

  data() {
    return {
      name: this.spot.record.name,
      address: this.spot.record.address,
      website: this.spot.record.url
    }
  },

  computed: {
    ...mapGetters([{ spots: 'spot/spots' }, 'headers', 'currentUser']),

    isOriginalSpot() {
      if (this.spot.record.lat && this.spot.record.lng) {
        return true
      } else {
        return false
      }
    },

    isPostedByYou() {
      const vm = this
      if (vm.currentUser.data.id === this.spot.record.user_id) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions(['pushSnackbar']),

    spotUpdateHandler: async function() {
      const spot = this.spot
      const id = this.id
      if (this.headers !== null) {
        if (this.isOriginalSpot) {
          if (this.isPostedByYou) {
            await this.updateSpot(spot, id)
          } else {
            this.pushSnackbar({
              message: '投稿者ではないので更新できません',
              color: 'error'
            })
          }
        } else {
          this.pushSnackbar({
            message: '更新可能なスポットではありません',
            color: 'error'
          })
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    },

    updateSpot(spot, id) {
      var params = {
        address: this.address,
        name: this.name,
        url: this.website
      }
      this.$store.dispatch('spot/updateSpot', {
        spot: spot,
        id: id,
        params: params
      })
    }
  }
}
</script>
