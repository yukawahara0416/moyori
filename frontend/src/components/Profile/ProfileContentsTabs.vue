<template>
  <v-tabs fixed-tabs v-model="childTabs">
    <v-tab class="primary--text" href="#tab-1">
      <v-icon>mdi-map-marker-outline</v-icon>
    </v-tab>
    <v-tab class="primary--text" href="#tab-2">
      <v-icon>mdi-wifi</v-icon>
    </v-tab>
    <v-tab class="primary--text" href="#tab-3">
      <v-icon>mdi-power-plug</v-icon>
    </v-tab>
    <v-tab class="primary--text" href="#tab-4">
      <v-icon>mdi-message-outline</v-icon>
    </v-tab>
    <v-tab class="primary--text" href="#tab-5">
      <v-icon>mdi-heart-outline</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tabs: String
  },

  computed: {
    childTabs: {
      get() {
        return this.tabs
      },
      set(newValue) {
        this.$emit('changeTabs', newValue)
      }
    }
  }
}
</script>
