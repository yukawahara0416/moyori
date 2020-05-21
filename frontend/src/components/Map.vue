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
    <v-btn @click="geolocation()">現在地取得</v-btn>
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
    // マップ中心の位置座標を監視する
    onCenterChanged(pos) {
      this.currentCenter = { lat: pos.lat(), lng: pos.lng() }
    },

    // 現在地の位置座標を取得する
    geolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            this.mapLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          },
          err => {
            console.log('現在地の取得中にエラーが発生しました')
            console.log(err)
          }
        )
      } else {
        console.log('現在地の取得中にエラーが発生しました')
      }
    }
  }
}
</script>
