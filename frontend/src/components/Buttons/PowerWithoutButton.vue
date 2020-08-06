<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
      <v-icon v-if="isPowerWithouted" color="success">mdi-power-plug-off</v-icon>
      <v-icon v-if="!isPowerWithouted">mdi-power-plug-off</v-icon>
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

    isPowerWithed() {
      return this.ownPowerWith.length > 0 ? true : false
    },

    isPowerWithouted() {
      return this.ownPowerWithout.length > 0 ? true : false
    },

    ownPowerWith() {
      if (this.isLoggedIn) {
        return this.spot.power_withs.filter(power_with => {
          return power_with.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    },

    ownPowerWithout() {
      if (this.isLoggedIn) {
        return this.spot.power_withouts.filter(power_without => {
          return power_without.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions([
      'powerWithout',
      'unPowerWithout',
      'unPowerWith',
      'pushSnackbar'
    ]),

    powerWithoutHandler: async function() {
      const spot = this.spot
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
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
