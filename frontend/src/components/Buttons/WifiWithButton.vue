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
    // 修正点 index_idではなくdata.place_idを参照する方法に変更する
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['wifiWith', 'unWifiWith', 'unWifiWithout', 'pushSnackbar']),

    wifiWithHandler: async function() {
      const spot = this.spot
      const id = this.id
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggedIn) {
        if (isPosted) {
          if (this.isWifiWithed) {
            // 修正点 index_idではなくdata.place_idを参照する方法に変更する
            await this.unWifiWith({
              wifi_with: this.ownWifiWith[0],
              id: id,
              type: type
            })
          } else {
            // 修正点 index_idではなくdata.place_idを参照する方法に変更する
            if (this.isWifiWithouted) {
              await this.unWifiWithout({
                wifi_without: this.ownWifiWithout[0],
                id: id,
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
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    }
  }
}
</script>
