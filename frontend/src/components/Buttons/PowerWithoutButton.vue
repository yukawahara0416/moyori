<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
      <v-icon v-if="isPowerWithouted" color="error">
        mdi-power-plug-off
      </v-icon>
      <v-icon v-if="!isPowerWithouted">mdi-power-plug-off</v-icon>
      <counter :spot="spot" :genre="'power_withouts'" />
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
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          if (this.isPowerWithouted) {
            await this.unPowerWithout({
              spot: spot,
              power_without: this.ownPowerWithout[0],
              type: type
            })
          } else {
            if (this.isPowerWithed) {
              await this.unPowerWith({
                spot: spot,
                power_with: this.ownPowerWith[0],
                type: type
              })
            }
            await this.powerWithout({ spot: spot, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.powerWithout({ spot: result, type: type })
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>
