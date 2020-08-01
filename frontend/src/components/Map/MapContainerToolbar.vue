<template>
  <div>
    <v-toolbar style="position: absolute; left: 10px; top: 10px; z-index: 2;">
      <!-- <map-container-toolbar-text-form @text-search="textSearch" /> -->
      <map-container-toolbar-demo-button @demo-search="demoSearch" />
      <map-container-toolbar-nearby-button @nearby-search="nearbySearch" />
      <map-container-toolbar-panto-button @panto-location="panToLocation" />
    </v-toolbar>
  </div>
</template>

<script>
// import MapContainerToolbarTextForm from '@/components/Map/MapContainerToolbarTextForm.vue'
import MapContainerToolbarPantoButton from '@/components/Map/MapContainerToolbarPantoButton.vue'
import MapContainerToolbarNearbyButton from '@/components/Map/MapContainerToolbarNearbyButton.vue'
import MapContainerToolbarDemoButton from '@/components/Map/MapContainerToolbarDemoButton.vue'

export default {
  components: {
    // MapContainerToolbarTextForm,
    MapContainerToolbarPantoButton,
    MapContainerToolbarNearbyButton,
    MapContainerToolbarDemoButton
  },

  methods: {
    // textSearch(keyword) {
    //   this.$emit('text-search', keyword)
    // },

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
