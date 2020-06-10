<template>
  <div>
    <v-btn icon @click="wifiWithHandler()">
      wifi
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
      const wifiWithed = this.spots[this.id].wifi_withs.filter(function(
        wifi_with
      ) {
        return wifi_with.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && wifiWithed.length > 0) {
        return wifiWithed
      } else {
        return []
      }
    },

    isWifiWithouted() {
      const vm = this
      const wifiWithouted = this.spots[this.id].wifi_withouts.filter(function(
        wifi_without
      ) {
        return wifi_without.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && wifiWithouted.length > 0) {
        return wifiWithouted
      } else {
        return []
      }
    }
  },

  methods: {
    wifiWithHandler: async function() {
      var spot = this.spot
      var id = this.id
      if (this.headers !== null) {
        if (this.isPosted) {
          if (this.isWifiWithed.length === 0) {
            await this.wifiWith(spot, id)
          } else {
            await this.unWifiWith(this.isWifiWithed[0], id)
          }
        } else {
          spot = await this.$store.dispatch('postSpot', {
            spot: spot,
            id: id
          })
          await this.wifiWith(spot, id)
        }
      } else {
        console.log('ログインしてください')
      }
    },

    wifiWith(spot, id) {
      var params = { spot_id: spot.record.id }
      this.$store.dispatch('wifiWith', { params: params, id: id })
    },

    unWifiWith(wifiWith, id) {
      var params = { id: wifiWith.id }
      this.$store.dispatch('unWifiWith', { params: params, id: id })
    },

    unWifiWithout(wifiWithout, id) {
      var params = { id: wifiWithout.id }
      this.$store.dispatch('unWifiWithout', { params: params, id: id })
    }
  }
}
</script>

<style></style>
