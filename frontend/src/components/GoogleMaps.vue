<template>
  <v-col
    class="pa-0"
    :class="{
      mapHeight_big: $vuetify.breakpoint.mdAndUp,
      mapHeight_small: $vuetify.breakpoint.smAndDown
    }"
    cols="12"
    md="6"
    no-gutter
  >
    <v-toolbar style="position: absolute; left: 10px; top: 10px; z-index: 2;">
      <google-maps-text-search @text-search="textSearch" />

      <v-btn data-test="btn1" @click="panToCurrentLocation">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>

      <v-btn data-test="btn2" @click="nearbySearch">このエリアを検索</v-btn>
      <v-progress-circular
        class="ml-5"
        color="primary"
        indeterminate
        v-show="loading"
      />
    </v-toolbar>

    <gmap-map
      ref="map"
      style="width: 100%; height: 100%;"
      :center="mapLocation"
      :options="mapOptions"
      :zoom="16"
      @center_changed="onCenterChanged"
      @click="addMarker($event)"
    >
      <google-maps-circle :mapCenter="mapCenter" />
      <google-maps-marker @pan-to="panTo" />
    </gmap-map>
  </v-col>
</template>

<script>
import axios from 'axios'
import queryString from 'query-string'
import { mapGetters, mapActions } from 'vuex'
import GoogleMapsCircle from '@/basics/GoogleMapsCircle.vue'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'
import GoogleMapsTextSearch from '@/basics/GoogleMapsTextSearch.vue'

const axiosBase = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

export default {
  components: {
    GoogleMapsCircle,
    GoogleMapsMarker,
    GoogleMapsTextSearch
  },

  data() {
    return {
      loading: true,
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
    ...mapGetters(['spots', 'currentUser']),

    vhHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '60vh'
        case 'sm':
          return '70vh'
        case 'md':
          return '80vh'
        case 'lg':
          return '90vh'
        case 'xl':
          return '100vh'
        default:
          return '100vh'
      }
    }
  },

  // 自動的に現在地でnearbySearchする
  async mounted() {
    const pos = await this.getLocation()
    this.$gmapApiPromiseLazy().then(() => {
      this.mapCenter = pos
      this.setMarker(pos, 'you-are-here')
      this.panTo(pos)
      this.nearbySearch(pos)
    })
  },

  methods: {
    ...mapActions(['clearSpots', 'addSpots']),

    // 検索開始時のアクションまとめ
    startSearch() {
      this.startLoading()
      this.clearSpots()
    },

    // 検索終了時のアクションまとめ
    closeSearch: async function() {
      await this.stopLoading()
      this.$store.dispatch('pushSnackbar', {
        message: `${this.spots.length} 件ヒットしました`,
        color: 'success'
      })
    },

    // 現在地へ移動する
    panToCurrentLocation: async function() {
      this.startLoading()
      const pos = await this.getLocation()
      this.setMarker(pos, 'you-are-here')
      this.panTo(pos)
      await this.stopLoading()
    },

    // 周辺を検索する
    nearbySearch: async function() {
      this.startSearch()
      var originals = await this.getOriginal(this.mapCenter)
      originals = await Promise.all(
        originals.map(async ori => {
          return await this.formatMarker(ori)
        })
      )
      var results = await this.getNearby(this.mapCenter)
      results = await Promise.all(
        results.map(async res => {
          var formattedResult = await this.formatMarker(res)
          formattedResult = await this.getDetail(formattedResult)
          return await this.getSpotData(formattedResult)
        })
      )
      await this.addSpots(originals)
      await this.addSpots(results)
      await this.closeSearch()
    },

    // テキスト検索する
    textSearch: async function(keyword) {
      this.startSearch()
      var pos = this.mapCenter
      var results = await this.getTextSearch(pos, keyword)
      results = await this.sortMarker(results, pos)
      results = await Promise.all(
        results.map(async res => {
          var formattedResult = await this.formatMarker(res)
          formattedResult = await this.getDetail(formattedResult)
          return await this.getSpotData(formattedResult)
        })
      )
      await this.addSpots(results)
      await this.closeSearch()
    },

    // Spotを新規登録する
    addMarker: async function(event) {
      var l = 8
      var c = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var cl = c.length
      var r = ''
      for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      var placeId = this.currentUser.data.id + '_' + r
      var latLng = {
        lat: parseFloat(event.latLng.lat().toFixed(6)),
        lng: parseFloat(event.latLng.lng().toFixed(6))
      }
      var address = await this.getAddress(latLng)
      var request = {
        address: address,
        position: latLng,
        place_id: placeId
      }
      var formattedRequest = await this.formatMarker(request)
      await alert('保存しますか？')
      await this.$store.dispatch('postSpot', {
        spot: formattedRequest,
        id: this.spots.length + 1
      })
    },

    ////////////////////////
    //// 個別機能（ABC順）////
    ////////////////////////

    // 検索結果を整形する
    formatMarker(res) {
      return new Promise(resolve => {
        var address = res.address ? res.address : null
        var iconUrl = res.name
          ? res.name.indexOf('スターバックス') !== -1
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
          : 'cafe'
        var icon = {
          url: require(`@/assets/${iconUrl}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
        var name = res.name ? res.name : res.record ? res.record.name : null
        var rating = res.rating ? res.rating : null
        var ratingsTotal = res.user_ratings_total
          ? res.user_ratings_total
          : null
        var placeId = res.place_id
          ? res.place_id
          : res.record.place_id
          ? res.record.place_id
          : null
        var position = res.geometry
          ? {
              lat: res.geometry.location.lat(),
              lng: res.geometry.location.lng()
            }
          : res.record
          ? {
              lat: parseFloat(res.record.lat),
              lng: parseFloat(res.record.lng)
            }
          : res.position

        var formattedResult = res.record
          ? {
              marker: {
                icon: icon,
                name: name,
                rating: rating,
                ratingsTotal: ratingsTotal,
                place_id: placeId,
                position: position,
                zIndex: 10
              },
              record: res.record,
              likes: res.likes,
              wifi_withs: res.wifi_withs,
              wifi_withouts: res.wifi_withouts,
              power_withs: res.power_withs,
              power_withouts: res.power_withouts,
              comments: res.comments
            }
          : {
              marker: {
                address: address,
                icon: icon,
                name: name,
                rating: rating,
                ratingsTotal: ratingsTotal,
                place_id: placeId,
                position: position,
                zIndex: 10
              },
              record: [],
              likes: [],
              wifi_withs: [],
              wifi_withouts: [],
              power_withs: [],
              power_withouts: [],
              comments: []
            }
        resolve(formattedResult)
      })
    },

    // 緯度経度を住所に変換する
    getAddress(pos) {
      const geocoder = new google.maps.Geocoder()
      return new Promise(resolve => {
        geocoder.geocode({ latLng: pos }, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              resolve(results[0].formatted_address.replace(/^日本、/, ''))
            } else {
              resolve(null)
            }
          }
        })
      })
    },

    // spotのより詳細な情報を取得する
    getDetail(res) {
      return new Promise((resolve, reject) => {
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        const request = {
          placeId: res.marker.place_id
          // fields: ['opening_hours', 'photos', 'reviews']
        }
        placeService.getDetails(request, (result, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            // const opening_hours = result.opening_hours
            //   ? result.opening_hours
            //   : null
            const address = result.formatted_address
              ? result.formatted_address
              : null
            const phone = result.formatted_phone_number
              ? result.formatted_phone_number
              : null
            const photos = result.photos ? result.photos : null
            const reviews = result.reviews ? result.reviews : null
            const website = result.website ? result.website : null

            // res['opening_hours'] = opening_hours
            res.marker['address'] = address
            res.marker['phone'] = phone
            res.marker['photos'] = photos
            res.marker['reviews'] = reviews
            res.marker['website'] = website
            resolve(res)
          } else {
            reject(res)
          }
        })
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
            if (error.code == 3) {
              this.$store.dispatch('pushSnackbar', {
                message: 'タイムアウトしました',
                color: 'error'
              })
            } else {
              this.$store.dispatch('pushSnackbar', {
                message: '現在地の取得時にエラーが発生しました',
                color: 'error'
              })
            }
            reject(error)
          },
          options
        )
      })
    },

    // 周辺をジャンル検索する
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
            this.$store.dispatch('pushSnackbar', {
              message: '予期しないエラーが発生しました',
              color: 'error'
            })
            reject(results)
          }
        })
      })
    },

    // 周辺の投稿spotをGETする
    getOriginal(pos) {
      return new Promise(resolve => {
        const params = { lat: pos.lat, lng: pos.lng }
        axiosBase
          .get('/api/v1/spots/search', {
            params: params
          })
          .then(function(response) {
            resolve(response.data)
          })
      })
    },

    // バックエンドからSpotデータを取得する
    getSpotData(res) {
      return new Promise(resolve => {
        const query = queryString.stringify({ place_id: res.marker.place_id })
        axiosBase.get('/api/v1/spots?' + query).then(function(response) {
          if (response.data != null) {
            var formattedResult = Object.assign(res, response.data)
            resolve(formattedResult)
          }
          resolve(res)
        })
      })
    },

    // 周辺をキーワード検索する
    getTextSearch(pos, keyword) {
      return new Promise((resolve, reject) => {
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        const request = {
          location: new google.maps.LatLng(pos.lat, pos.lng),
          radius: 500,
          query: keyword
        }
        placeService.textSearch(request, (results, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            resolve(results)
          } else {
            this.$store.dispatch('pushSnackbar', {
              message: '予期しないエラーが発生しました',
              color: 'error'
            })
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

    // マーカーを設置する
    setMarker(pos, icon) {
      new google.maps.Marker({
        map: this.$refs.map.$mapObject,
        position: pos,
        clickable: false,
        icon: {
          url: require(`@/assets/${icon}.png`),
          scaledSize: new google.maps.Size(50, 50)
        },
        zIndex: 1
      })
    },

    // 周辺のマーカーを抽出する
    sortMarker(results, pos) {
      return new Promise(resolve => {
        const request = {
          location: new google.maps.LatLng(pos.lat, pos.lng),
          radius: 500
        }
        const sortedResults = results.filter(result => {
          return (
            google.maps.geometry.spherical.computeDistanceBetween(
              result.geometry.location,
              request.location
            ) < request.radius
          )
        })
        resolve(sortedResults)
      })
    },

    // ローディング開始
    startLoading() {
      this.loading = true
    },

    // ローディング終了
    stopLoading() {
      return new Promise(resolve => {
        this.loading = false
        resolve()
      })
    }
  }
}
</script>

<style>
.mapHeight_big {
  height: 100%;
  width: 100%;
}
.mapHeight_small {
  height: 50%;
  width: 100%;
}
.indexHeight_big {
  height: 100%;
  width: 100%;
}
.indexHeight_small {
  height: 50%;
  width: 100%;
}
</style>
