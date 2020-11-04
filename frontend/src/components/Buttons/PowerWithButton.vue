<template>
  <div>
    <v-btn icon @click="powerWithHandler()">
      <v-icon v-if="isPowerWithing" color="success">mdi-power-plug</v-icon>
      <v-icon v-else>mdi-power-plug</v-icon>
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

    isPowerWithing() {
      return this.powerWithsByCurrentUser.length > 0 ? true : false
    },

    isPowerWithouting() {
      return this.powerWithoutsByCurrentUser.length > 0 ? true : false
    },

    powerWithsByCurrentUser() {
      if (this.isLoggingIn) {
        return this.spot.power_withs.filter(power_with => {
          return power_with.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    },

    powerWithoutsByCurrentUser() {
      if (this.isLoggingIn) {
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
      const type = this.type

      if (this.isLoggingIn) {
        if (isPosted) {
          if (this.isPowerWithing) {
            await this.unPowerWith({
              spot: spot,
              power_with: this.powerWithsByCurrentUser[0],
              type: type
            })
          } else {
            if (this.isPowerWithouting) {
              await this.unPowerWithout({
                spot: spot,
                power_without: this.powerWithoutsByCurrentUser[0],
                type: type
              })
            }
            await this.powerWith({ spot: spot, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.powerWith({ spot: result, type: type })
        }
      } else {
        this.dialogOn()
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    },

    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
