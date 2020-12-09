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
    ...mapActions(['powerWithout', 'unPowerWithout', 'unPowerWith']),

    powerWithoutHandler: async function() {
      const spot = this.spot
      const activeTab = this.tab

      if (this.isLoggingIn == false) {
        this.dialogOn()
        this.$$store.dispatch('pushSnackbar', {
          message: 'ログインしてください',
          color: 'error'
        })
        return
      }

      if (this.isPostedSpot == false) {
        const result = await this.saveSpot(spot)
        await this.powerWithout({ spot: result, active_tab: activeTab })
        return
      }

      if (this.isPowerWithing == true) {
        await this.unPowerWith({
          spot: spot,
          power_with: this.powerWithsByCurrentUser[0],
          active_tab: activeTab
        })
        await this.powerWithout({ spot: spot, active_tab: activeTab })
        return
      }

      if (this.isPowerWithouting == false) {
        await this.powerWithout({ spot: spot, active_tab: activeTab })
        return
      }

      if (this.isPowerWithouting == true) {
        await this.unPowerWithout({
          spot: spot,
          power_without: this.powerWithoutsByCurrentUser[0],
          active_tab: activeTab
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
