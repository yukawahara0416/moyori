<template>
  <div>
    <h1>this is Map</h1>
    <gmap-map
      ref="map"
      style="width: 800px; height: 800px;"
      :center="mapLocation"
      :options="mapOptions"
      :zoom="16"
      @center_changed="onCenterChanged"
    >
      <google-maps-circle :mapCenter="mapCenter" />
      <google-maps-marker @pan-to="panTo" />
    </gmap-map>
    <v-btn data-test="btn1" @click.native="panToLocation">現在地へ移動</v-btn>
    <v-btn data-test="btn2" @click.native="nearbySearch">周辺情報を取得</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GoogleMapsCircle from '@/basics/GoogleMapsCircle.vue'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'

export default {
  components: {
    GoogleMapsCircle,
    GoogleMapsMarker
  },

  data() {
    return {
      mapCenter: { lat: 0, lng: 0 },
      mapLocation: { lat: 35.68, lng: 139.76 },
      mapOptions: {
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: false
      }
    }
  },

  computed: {
    ...mapGetters(['markers'])
  },

  // 自動的に現在地でnearbySearchする
  async mounted() {
    const pos = await this.getLocation()
    // vue-google-mapsマップのレンダリングが完了してから処理を実行
    this.$gmapApiPromiseLazy().then(() => {
      this.mapCenter = pos
      this.setMarker(pos, 'you-are-here')
      this.panTo(pos)
      this.nearbySearch(pos)
    })
  },

  methods: {
    //// 検索機能（実行タイミング順） ////

    // 検索開始時の処理
    beforeSearch() {
      this.clearMarkers()
    },

    // 現在地へ移動する
    panToLocation: async function() {
      const pos = await this.getLocation()
      this.setMarker(pos, 'you-are-here')
      this.panTo(pos)
    },

    // 周辺を検索する
    nearbySearch: async function() {
      this.beforeSearch()
      var pos = this.mapCenter
      var results = await this.getNearby(pos)
      results = await Promise.all(
        results.map(async res => {
          return await this.formatResult(res)
        })
      )
      await this.setMarkers(results)
    },

    // 検索終了時の処理
    afterSearch() {},

    //// 個別機能（ABC順）////

    // 検索結果を$state.markersに追加する
    ...mapActions(['setMarkers']),

    // 検索結果をリセットする
    ...mapActions(['clearMarkers']),

    // 検索結果を整形する
    formatResult(res) {
      return new Promise(resolve => {
        var address = res.formatted_address ? res.formatted_address : 'null'
        // error: open_now is deprecated as of November 2019 and will be turned off in November 2020. Use the isOpen() function from a PlacesService.getDetails() result instead.
        // var isOpen = res.opening_hours ? res.opening_hours.open_now : 'null'
        var iconUrl =
          res.name.indexOf('スターバックス') !== -1
            ? 'starbucks'
            : res.name.indexOf('タリーズ') !== -1
            ? 'tullys'
            : res.name.indexOf('コメダ珈琲') !== -1
            ? 'komeda'
            : res.name.indexOf('ドトール') !== -1
            ? 'doutor'
            : res.name.indexOf('上島珈琲') !== -1
            ? 'ueshima'
            : res.name.indexOf('WIRED CAFE') !== -1
            ? 'wired-cafe'
            : 'cafe'
        var icon = {
          url: require(`@/assets/${iconUrl}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
        var photo = res.photos
          ? res.photos[0].getUrl({ maxWidth: 320 })
          : require('@/assets/noimage.png')
        var pos = {
          lat: res.geometry.location.lat(),
          lng: res.geometry.location.lng()
        }
        var vicinity = res.vicinity ? res.vicinity : 'null'

        var formattedResult = {
          address: address,
          // isOpen: isOpen,
          name: res.name,
          icon: icon,
          rating: res.rating,
          ratingsTotal: res.user_ratings_total,
          photoUrl: photo,
          place_id: res.place_id,
          position: pos,
          vicinity: vicinity,
          zIndex: 1
        }
        resolve(formattedResult)
      })
    },

    // 現在地を取得する
    getLocation() {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition(
          result => {
            resolve({
              lat: result.coords.latitude,
              lng: result.coords.longitude
            })
          },
          error => {
            reject(error)
          },
          options
        )
      })
    },

    // 与えられた位置（pos）周辺の情報を取得する
    getNearby(pos) {
      return new Promise((resolve, reject) => {
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        const request = {
          location: new google.maps.LatLng(pos.lat, pos.lng),
          radius: 500,
          type: ['cafe']
        }
        placeService.nearbySearch(request, (results, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            resolve(results)
          } else {
            reject(results)
          }
        })
      })
    },

    // マップ中心を監視する
    onCenterChanged(pos) {
      this.mapCenter = { lat: pos.lat(), lng: pos.lng() }
    },

    // 位置座標をマップの中心にする
    panTo(pos) {
      this.$refs.map.panTo(pos)
    },

    // 現在地マーカーを設置する
    setMarker(pos, icon) {
      new google.maps.Marker({
        map: this.$refs.map.$mapObject,
        position: pos,
        clickable: false,
        icon: {
          url: require(`@/assets/${icon}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
      })
    }
  }
}
</script>
