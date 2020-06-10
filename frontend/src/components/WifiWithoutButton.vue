<template>
  <div>
    <v-btn icon @click="wifiWithoutHandler()">
      wifinone
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
  }
}
</script>

<style></style>
