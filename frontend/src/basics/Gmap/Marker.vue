<template>
  <div>
    <GmapMarker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.icon"
      :position="m.position"
      :title="m.name"
      @click="switchMarker(m, id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => [],
      required: false
    }
  },

  methods: {
    switchMarker(marker, id) {
      this.changeMarkerIcon(marker, id)
    },
    resetMarkerIcon() {},
    cacheMarkerIcon() {},
    changeMarkerIcon(marker, id) {
      const selectingMarker = this.markers[id]
      selectingMarker.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      selectingMarker.zIndex = 1000
    }
  }
}
</script>
