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
    ...mapGetters(['spots', 'headers', 'currentUser'])
  }
}
</script>

<style></style>
