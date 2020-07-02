<template>
  <v-toolbar style="position: absolute; left: 10px; top: 10px; z-index: 2;">
    <map-container-toolbar-text-form @text-search="textSearch" />

    <map-container-toolbar-panto-button @panto-location="panToLocation" />

    <map-container-toolbar-nearby-button @nearby-search="nearbySearch" />
  </v-toolbar>
</template>

<script>
import MapContainerToolbarTextForm from '@/components/Map/MapContainerToolbarTextForm.vue'
import MapContainerToolbarPantoButton from '@/components/Map/MapContainerToolbarPantoButton.vue'
import MapContainerToolbarNearbyButton from '@/components/Map/MapContainerToolbarNearbyButton.vue'

export default {
  components: {
    MapContainerToolbarTextForm,
    MapContainerToolbarPantoButton,
    MapContainerToolbarNearbyButton
  },

  methods: {
    textSearch(keyword) {
      this.$emit('text-search', keyword)
    },

    panToLocation() {
      this.$emit('panto-location')
    },

    nearbySearch() {
      this.$emit('nearby-search')
    }
  }
}
</script>
