<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
      <v-icon v-if="isPowerWithouted.length === 0">mdi-power-plug-off</v-icon>
      <v-icon v-if="isPowerWithouted.length > 0" color="error">mdi-power-plug-off</v-icon>
      <counter :spot="spot" :genre="'power_withouts'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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

    isPosted() {
      if (this.spot.record.length !== 0) {
        return this.spot
      } else {
        return false
      }
    },

    isPowerWithed() {
      const vm = this
      const powerWiths = this.spots[this.id].power_withs
      if (vm.currentUser !== null && powerWiths.length > 0) {
        const powerWithed = powerWiths.filter(function(power_with) {
          return power_with.user_id == vm.currentUser.data.id
        })
        return powerWithed
      } else {
        return []
      }
    },

    isPowerWithouted() {
      const vm = this
      const wifiWithouts = this.spots[this.id].power_withouts
      if (vm.currentUser !== null && wifiWithouts.length > 0) {
        const powerWithouted = wifiWithouts.filter(function(power_without) {
          return power_without.user_id == vm.currentUser.data.id
        })
        return powerWithouted
      } else {
        return []
      }
    }
  },

  methods: {
    powerWithoutHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.isLoggedIn) {
        if (this.isPosted) {
          if (this.isPowerWithouted.length === 0) {
            if (this.isPowerWithed.length > 0) {
              await this.unPowerWith(this.isPowerWithed[0], id)
            }
            await this.powerWithout(spot, id)
          } else {
            await this.unPowerWithout(this.isPowerWithouted[0], id)
          }
        } else {
          spot = await this.$store.dispatch('spot/postSpot', {
            spot: spot,
            id: id
          })
          await this.powerWithout(spot, id)
        }
      } else {
        this.$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
      }
    },

    powerWithout(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('powerWithout', { params: params, id: id })
    },

    unPowerWithout(powerWith, id) {
      var params = { id: powerWith.id }
      this.$store.dispatch('unPowerWithout', { params: params, id: id })
    },

    unPowerWith(powerWith, id) {
      var params = { id: powerWith.id }
      this.$store.dispatch('unPowerWith', { params: params, id: id })
    }
  }
}
</script>
