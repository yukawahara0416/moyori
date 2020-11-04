<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
      <v-icon v-if="isPowerWithouting" color="error">
        mdi-power-plug-off
      </v-icon>
      <v-icon v-else>mdi-power-plug-off</v-icon>
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
      if (this.spot.power_withs.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.power_withs.filter(power_with => {
        return power_with.user_id == this.currentUser.data.id
      })
    },

    powerWithoutsByCurrentUser() {
      if (this.spot.power_withouts.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.power_withouts.filter(power_without => {
        return power_without.user_id == this.currentUser.data.id
      })
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

      if (this.isLoggingIn == false) {
        this.dialogOn()
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
        return
      }

      if (this.isPostedSpot == false) {
        const result = await this.saveSpot({ spot: spot })
        await this.powerWithout({ spot: result, type: type })
        return
      }

      if (this.isPowerWithing == true) {
        await this.unPowerWith({
          spot: spot,
          power_with: this.powerWithsByCurrentUser[0],
          type: type
        })
        await this.powerWithout({ spot: spot, type: type })
        return
      }

      if (this.isPowerWithouting == false) {
        await this.powerWithout({ spot: result, type: type })
        return
      }

      if (this.isPowerWithouting == true) {
        await this.unPowerWithout({
          spot: spot,
          power_without: this.powerWithoutsByCurrentUser[0],
          type: type
        })
        return
      }
    },

    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
