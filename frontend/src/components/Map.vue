<template>
  <div>
    <h1>this is Map</h1>
    <GmapMap
      ref="map"
      style="width: 500px; height: 500px;"
      :center="mapLocation"
      :options="mapOptions"
      :zoom="16"
      @center_changed="onCenterChanged"
    >
      <GmapMarker
        v-for="(m, id) in markers"
        :key="id"
        :position="m.position"
        :title="m.title"
      />
    </GmapMap>
    <p>lat: {{ currentCenter.lat }}</p>
    <p>lng: {{ currentCenter.lng }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCenter: { lat: '', lng: '' },
      markers: [{ position: { lat: 35.68, lng: 139.76 }, title: 'hoge' }],
      mapLocation: { lat: 35.68, lng: 139.76 },
      mapOptions: {
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: false
      }
    }
  },

  methods: {
    onCenterChanged(pos) {
      this.currentCenter = { lat: pos.lat(), lng: pos.lng() }
    }
  }
}
</script>
