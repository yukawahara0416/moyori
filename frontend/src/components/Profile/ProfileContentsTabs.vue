<template>
  <v-tabs fixed-tabs v-model="childTabs">
    <v-tab class="primary--text" href="#posts">
      <v-icon>mdi-map-marker-outline</v-icon>
    </v-tab>

    <v-tab class="primary--text" href="#wifi_withs">
      <v-icon>mdi-wifi</v-icon>
    </v-tab>

    <v-tab class="primary--text" href="#power_withs">
      <v-icon>mdi-power-plug</v-icon>
    </v-tab>

    <v-tab class="primary--text" href="#comments">
      <v-icon>mdi-message-outline</v-icon>
    </v-tab>

    <v-tab class="primary--text" href="#likes">
      <v-icon>mdi-heart-outline</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tab']),

    childTabs: {
      get() {
        return this.tab
      },
      set(newValue) {
        this.$store.dispatch('changeTab', newValue)
      }
    }
  }
}
</script>
