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
    }
  },

  methods: {}
}
</script>

<style></style>
