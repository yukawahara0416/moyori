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
    <v-btn @click="moveToCurrentLocation">現在地へ移動</v-btn>
    <v-btn @click="setNearbyMarkers">周辺情報を取得</v-btn>
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
    // 現在地へ移動する
    moveToCurrentLocation: async function() {
      const pos = await this.getCurrentLocation()
      await this.setCurrentLocationMarker(pos)
      await this.panToLocation(pos)
    },

    // 周辺情報をマーカーで設置する
    setNearbyMarkers: async function() {
      const pos = this.currentCenter
      await this.nearbySearch(pos)
      // マーカーを設置する処理はココ
    },

    // 現在地を取得する
    getCurrentLocation() {
      return new Promise(resolve => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            res => {
              const pos = {
                lat: res.coords.latitude,
                lng: res.coords.longitude
              }
              resolve(pos)
            },
            err => {
              console.log('現在地の取得中にエラーが発生しました')
              console.log(err)
            }
          )
        } else {
          console.log('現在地の取得中にエラーが発生しました')
        }
      })
    },

    // 周辺の情報を取得する
    nearbySearch(pos) {
      return new Promise(resolve => {
        const request = {
          location: new google.maps.LatLng(pos.lat, pos.lng),
          radius: 500,
          type: ['cafe']
        }
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        const markers = placeService.nearbySearch(
          request,
          (results, status) => {
            if (status == 'OK' || status == 'ZERO_RESULTS') {
              console.log(results)
            } else {
              console.log('周辺の情報を取得中にエラーが発生しました')
            }
          }
        )
        resolve(markers)
      })
    },

    // マップ中心を監視する
    onCenterChanged(pos) {
      this.currentCenter = { lat: pos.lat(), lng: pos.lng() }
    },

    // 位置座標をマップの中心にする
    panToLocation(pos) {
      return new Promise(resolve => {
        const pan = this.$refs.map.panTo(pos)
        resolve(pan)
      })
    },

    // 現在地マーカーを設置する
    setCurrentLocationMarker(pos) {
      return new Promise(resolve => {
        const map = this.$refs.map.$mapObject
        const marker = new google.maps.Marker({
          map: map,
          position: pos,
          clickable: false,
          icon: {
            url: require('@/assets/you-are-here.png'),
            scaledSize: new google.maps.Size(50, 50)
          }
        })
        resolve(marker)
      })
    }
  }
}
</script>
