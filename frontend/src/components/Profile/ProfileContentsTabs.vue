<template>
  <v-tabs fixed-tabs v-model="childTabs">
    <v-tab
      v-for="(tab, key) in tabList"
      :key="key"
      class="primary--text"
      :href="'#' + tab.name"
    >
      <v-icon>{{ tab.icon }}</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tabList: [
        { name: 'posts', icon: 'mdi-map-marker-outline' },
        { name: 'wifi_withs', icon: 'mdi-wifi' },
        { name: 'power_withs', icon: 'mdi-power-plug' },
        { name: 'comments', icon: 'mdi-message-outline' },
        { name: 'likes', icon: 'mdi-heart-outline' }
      ]
    }
  },

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
