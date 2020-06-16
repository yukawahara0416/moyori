<template>
  <div>
    <v-btn icon @click="wifiWithoutHandler()">
      <v-icon v-if="isWifiWithouted.length === 0">mdi-wifi-off</v-icon>
      <v-icon v-if="isWifiWithouted.length > 0" color="error">
        mdi-wifi-off
      </v-icon>
      <p>{{ count }}</p>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    id: Number
  },

  computed: {
    ...mapGetters(['spots', 'headers', 'currentUser']),

    isPosted() {
      if (this.spot.record.length !== 0) {
        return this.spot
      } else {
        return false
      }
    },

    isWifiWithed() {
      const vm = this
      const wifiWiths = this.spots[this.id].wifi_withs
      if (vm.currentUser !== null && wifiWiths.length > 0) {
        const wifiWithed = wifiWiths.filter(function(wifi_with) {
          return wifi_with.user_id == vm.currentUser.data.id
        })
        return wifiWithed
      } else {
        return []
      }
    },

    isWifiWithouted() {
      const vm = this
      const wifiWithouts = this.spots[this.id].wifi_withouts
      if (vm.currentUser !== null && wifiWithouts.length > 0) {
        const wifiWithouted = wifiWithouts.filter(function(wifi_without) {
          return wifi_without.user_id == vm.currentUser.data.id
        })
        return wifiWithouted
      } else {
        return []
      }
    },

    count() {
      const wifiWithouts = this.spots[this.id].wifi_withouts
      if (wifiWithouts.length > 0) {
        return wifiWithouts.length
      } else {
        return 0
      }
    }
  },

  methods: {
    wifiWithoutHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.headers !== null) {
        if (this.isPosted) {
          if (this.isWifiWithouted.length === 0) {
            if (this.isWifiWithed.length > 0) {
              await this.unWifiWith(this.isWifiWithed[0], id)
            }
            await this.wifiWithout(spot, id)
          } else {
            await this.unWifiWithout(this.isWifiWithouted[0], id)
          }
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.wifiWithout(spot, id)
        }
      } else {
        console.log('ログインしてください')
      }
    },

    wifiWithout(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('wifiWithout', { params: params, id: id })
    },

    unWifiWithout(wifiWithout, id) {
      var params = { id: wifiWithout.id }
      this.$store.dispatch('unWifiWithout', { params: params, id: id })
    },

    unWifiWith(wifiWith, id) {
      var params = { id: wifiWith.id }
      this.$store.dispatch('unWifiWith', { params: params, id: id })
    }
  }
}
</script>

<style></style>
