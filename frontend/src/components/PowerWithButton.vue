<template>
  <div>
    <v-btn icon @click="powerWithHandler()">
      wifi
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

    isPowerWithed() {
      const vm = this
      const powerWithed = this.spots[this.id].power_withs.filter(function(
        power_with
      ) {
        return power_with.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && powerWithed.length > 0) {
        return powerWithed
      } else {
        return []
      }
    }
  },

  methods: {
    powerWithHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.headers !== null) {
        if (this.isPosted) {
          if (this.isPowerWithed.length === 0) {
            await this.powerWith(spot, id)
          } else {
            await this.unPowerWith(this.isPowerWithed[0], id)
          }
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.powerWith(spot, id)
        }
      } else {
        console.log('ログインしてください')
      }
    },

    powerWith(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('powerWith', { params: params, id: id })
    },

    unPowerWith(powerWith, id) {
      var params = { id: powerWith.id }
      this.$store.dispatch('unPowerWith', { params: params, id: id })
    }
  }
}
</script>

<style></style>
