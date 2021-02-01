<template>
  <v-tabs fixed-tabs show-arrows v-model="childTabs">
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      tabList: [
        { name: 'posts', icon: 'mdi-map-marker-outline' },
        { name: 'wifi_withs', icon: 'mdi-wifi' },
        { name: 'wifi_withouts', icon: 'mdi-wifi-off' },
        { name: 'power_withs', icon: 'mdi-power-plug' },
        { name: 'power_withouts', icon: 'mdi-power-plug-off' },
        { name: 'comments', icon: 'mdi-message-outline' },
        { name: 'likes', icon: 'mdi-heart-outline' }
      ]
    }
  },

  computed: {
    ...mapGetters(['profileTab']),

    childTabs: {
      get() {
        return this.profileTab
      },
      set(newVal) {
        this.changeProfileTab(newVal)
      }
    }
  },

  methods: {
    ...mapMutations(['changeProfileTab'])
  }
}
</script>
