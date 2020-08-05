<template>
  <div>
    <v-btn icon @click="powerWithHandler()">
      <v-icon v-if="isPowerWithed.length === 0">mdi-power-plug</v-icon>
      <v-icon v-if="isPowerWithed.length > 0" color="success">mdi-power-plug</v-icon>
      <counter :spot="spot" :genre="'power_withs'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object,
    id: Number
  },

  components: {
    Counter
  },

  computed: {
    ...mapGetters(['headers', 'currentUser']),

    isLoggedIn() {
      return this.headers !== null ? true : false
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
    powerWithHandler: async function() {
      const spot = this.spot
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.headers !== null) {
        if (this.isPosted) {
          if (this.isPowerWithed.length === 0) {
            if (this.isPowerWithouted.length > 0) {
              await this.unPowerWithout(this.isPowerWithouted[0], id)
            }
            await this.powerWith(spot, id)
          } else {
            await this.unPowerWith(this.isPowerWithed[0], id)
          }
        } else {
          spot = await this.$store.dispatch('spot/postSpot', {
            spot: spot,
            id: id
          })
          await this.powerWith(spot, id)
        }
      } else {
        this.$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
      }
    },

    powerWith(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('powerWith', { params: params, id: id })
    },

    unPowerWith(powerWith, id) {
      var params = { id: powerWith.id }
      this.$store.dispatch('unPowerWith', { params: params, id: id })
    },

    unPowerWithout(powerWithout, id) {
      var params = { id: powerWithout.id }
      this.$store.dispatch('unPowerWithout', { params: params, id: id })
    }
  }
}
</script>
