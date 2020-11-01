<template>
  <div>
    <v-toolbar
      short
      style="position: absolute; left: 10px; top: 10px; z-index: 2;"
    >
      <map-container-toolbar-demo-button @demo-search="demoSearch" />
      <map-container-toolbar-nearby-button @nearby-search="nearbySearch" />
      <map-container-toolbar-panto-button @panto-location="panToLocation" />
      <map-container-toolbar-option-button />
    </v-toolbar>
  </div>
</template>

<script>
import MapContainerToolbarPantoButton from '@/components/Map/MapContainerToolbarPantoButton.vue'
import MapContainerToolbarNearbyButton from '@/components/Map/MapContainerToolbarNearbyButton.vue'
import MapContainerToolbarDemoButton from '@/components/Map/MapContainerToolbarDemoButton.vue'
import MapContainerToolbarOptionButton from '@/components/Map/MapContainerToolbarOptionButton.vue'

export default {
  components: {
    MapContainerToolbarPantoButton,
    MapContainerToolbarNearbyButton,
    MapContainerToolbarDemoButton,
    MapContainerToolbarOptionButton
  },

  methods: {
    panToLocation() {
      this.$emit('panto-location')
    },

    nearbySearch() {
      this.$emit('nearby-search')
    },

    demoSearch() {
      this.$emit('demo-search')
    }
  }
}
</script>
