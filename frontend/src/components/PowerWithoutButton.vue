<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
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

    isPowerWithed() {
      const vm = this
      const powerWithed = this.spots[this.id].power_withs.filter(function(
        power_with
      ) {
        return power_with.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && powerWithed.length > 0) {
        return powerWithed
      } else {
        return []
      }
    }
  }
}
</script>

<style></style>
