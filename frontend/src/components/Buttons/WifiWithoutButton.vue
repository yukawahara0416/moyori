<template>
  <div>
    <v-btn icon @click.stop="wifiWithoutHandler()">
      <v-icon v-if="isWifiWithouting" color="error">mdi-wifi-off</v-icon>
      <v-icon v-else>mdi-wifi-off</v-icon>
      <counter :spot="spot" :genre="'wifi_withouts'" />
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

    isWifiWithing() {
      return this.wifiWithsByCurrentUser.length > 0 ? true : false
    },

    isWifiWithouting() {
      return this.wifiWithoutsByCurrentUser.length > 0 ? true : false
    },

    wifiWithsByCurrentUser() {
      if (this.spot.wifi_withs.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.wifi_withs.filter(wifi_with => {
        return wifi_with.user_id == this.currentUser.data.id
      })
    },

    wifiWithoutsByCurrentUser() {
      if (this.spot.wifi_withouts.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.wifi_withouts.filter(wifi_without => {
        return wifi_without.user_id == this.currentUser.data.id
      })
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions([
      'wifiWithout',
      'unWifiWithout',
      'unWifiWith',
      'pushSnackbar'
    ]),

    wifiWithoutHandler: async function() {
      const spot = this.spot
      const type = this.type

      if (this.isLoggingIn == false) {
        this.dialogOn()
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
        return
      }

      if (this.isPostedSpot == false) {
        const result = await this.saveSpot({ spot: spot })
        await this.wifiWithout({ spot: result, type: type })
        return
      }

      if (this.isWifiWithing == true) {
        await this.unWifiWith({
          spot: spot,
          wifi_with: this.wifiWithsByCurrentUser[0],
          type: type
        })
        await this.wifiWithout({ spot: spot, type: type })
        return
      }

      if (this.isWifiWithouting == false) {
        await this.wifiWithout({ spot: spot, type: type })
        return
      }

      if (this.isWifiWithouting == true) {
        await this.unWifiWithout({
          spot: spot,
          wifi_without: this.wifiWithoutsByCurrentUser[0],
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
