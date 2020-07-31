<template>
  <div>
    <v-toolbar style="position: absolute; left: 10px; top: 10px; z-index: 2;">
      <!-- <map-container-toolbar-text-form @text-search="textSearch" /> -->
      <map-container-toolbar-nearby-button @nearby-search="nearbySearch" />
      <map-container-toolbar-panto-button @panto-location="panToLocation" />
    </v-toolbar>

    <v-toolbar style="position: absolute; left: 10px; top: 90px; z-index: 2;">
      <v-btn class="mx-2">
        <v-icon class="mr-2">mdi-database</v-icon>
        デモ用エリアへ移動
        <span style="font-size: 5px;">（実用データが豊富です^^）</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
// import MapContainerToolbarTextForm from '@/components/Map/MapContainerToolbarTextForm.vue'
import MapContainerToolbarPantoButton from '@/components/Map/MapContainerToolbarPantoButton.vue'
import MapContainerToolbarNearbyButton from '@/components/Map/MapContainerToolbarNearbyButton.vue'

export default {
  components: {
    // MapContainerToolbarTextForm,
    MapContainerToolbarPantoButton,
    MapContainerToolbarNearbyButton
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
    }
  }
}
</script>
