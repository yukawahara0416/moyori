<template>
  <div>
    <v-btn icon @click.stop="wifiWithoutHandler()">
      <v-icon v-if="isWifiWithouted" color="success">mdi-wifi-off</v-icon>
      <v-icon v-if="!isWifiWithouted">mdi-wifi-off</v-icon>
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

    isWifiWithed() {
      return this.ownWifiWith.length > 0 ? true : false
    },

    isWifiWithouted() {
      return this.ownWifiWithout.length > 0 ? true : false
    },

    ownWifiWith() {
      if (this.isLoggedIn) {
        return this.spot.wifi_withs.filter(wifi_with => {
          return wifi_with.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    },

    ownWifiWithout() {
      if (this.isLoggedIn) {
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
    ...mapActions([
      'wifiWithout',
      'unWifiWithout',
      'unWifiWith',
      'pushSnackbar'
    ]),

    wifiWithoutHandler: async function() {
      const spot = this.spot
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          if (this.isWifiWithouted) {
            await this.unWifiWithout({
              wifi_without: this.ownWifiWithout[0],
              id: id,
              type: type
            })
          } else {
            if (this.isWifiWithed) {
              await this.unWifiWith({
                wifi_with: this.ownWifiWith[0],
                id: id,
                type: type
              })
            }
            await this.wifiWithout({ spot: spot, id: id, type: type })
          }
        } else {
          const result = await this.saveSpot({ spot: spot, id: id })
          await this.wifiWithout({ spot: result, id: id, type: type })
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>
