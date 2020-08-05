<template>
  <div>
    <v-btn icon @click="powerWithHandler()">
      <v-icon v-if="isPowerWithed" color="success">mdi-power-plug</v-icon>
      <v-icon v-if="!isPowerWithed">mdi-power-plug</v-icon>
      <counter :spot="spot" :genre="'power_withs'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      'powerWith',
      'unPowerWith',
      'unPowerWithout',
      'pushSnackbar'
    ]),

    powerWithHandler: async function() {
      const spot = this.spot
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          if (this.isPowerWithed) {
            await this.unPowerWith({
              power_with: this.ownPowerWith[0],
              id: id,
              type: type
            })
          } else {
            if (this.isPowerWithouted) {
              await this.unPowerWithout({
                power_without: this.ownPowerWithout[0],
                id: id,
                type: type
              })
            }
            await this.PowerWith({ spot: spot, id: id, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot, id: id })
          await this.PowerWith({ spot: result, id: id, type: type })
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>
