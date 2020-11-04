<template>
  <div>
    <v-btn icon @click.stop="wifiWithHandler()">
      <v-icon v-if="isWifiWithed" color="success">mdi-wifi</v-icon>
      <v-icon v-if="!isWifiWithed">mdi-wifi</v-icon>
      <counter :spot="spot" :genre="'wifi_withs'" />
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

    isWifiWithed() {
      return this.ownWifiWith.length > 0 ? true : false
    },

    isWifiWithouted() {
      return this.ownWifiWithout.length > 0 ? true : false
    },

    ownWifiWith() {
      if (this.isLoggingIn) {
        return this.spot.wifi_withs.filter(wifi_with => {
          return wifi_with.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    },

    ownWifiWithout() {
      if (this.isLoggingIn) {
        return this.spot.wifi_withouts.filter(wifi_without => {
          return wifi_without.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['wifiWith', 'unWifiWith', 'unWifiWithout', 'pushSnackbar']),

    wifiWithHandler: async function() {
      const spot = this.spot
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggingIn) {
        if (isPosted) {
          if (this.isWifiWithed) {
            await this.unWifiWith({
              spot: spot,
              wifi_with: this.ownWifiWith[0],
              type: type
            })
          } else {
            if (this.isWifiWithouted) {
              await this.unWifiWithout({
                spot: spot,
                wifi_without: this.ownWifiWithout[0],
                type: type
              })
            }
            await this.wifiWith({ spot: spot, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.wifiWith({ spot: result, type: type })
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
