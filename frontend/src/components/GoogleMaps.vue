<template>
  <div>
    <h1>this is Map</h1>

    <google-maps-text-search @text-search="textSearch" />
    <v-btn data-test="btn1" @click="panToCurrentLocation">
      現在地へ移動
    </v-btn>
    <v-btn data-test="btn2" @click="nearbySearch">
      周辺情報を取得
    </v-btn>

    <gmap-map
      ref="map"
      style="width: 800px; height: 600px;"
      :center="mapLocation"
      :options="mapOptions"
      :zoom="16"
      @center_changed="onCenterChanged"
    >
      <google-maps-circle :mapCenter="mapCenter" />
      <google-maps-marker @pan-to="panTo" />
    </gmap-map>
  </div>
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
    ...mapGetters(['spots'])
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

    // 現在地へ移動する
    panToCurrentLocation: async function() {
      const pos = await this.getLocation()
      this.setMarker(pos, 'you-are-here')
      this.panTo(pos)
    },

    // 周辺を検索する
    nearbySearch: async function() {
      this.clearSpots()
      var results = await this.getNearby(this.mapCenter)
      results = await Promise.all(
        results.map(async res => {
          var formattedResult = await this.formatMarker(res)
          formattedResult = await this.getDetail(formattedResult)
          return await this.getSpotData(formattedResult)
        })
      )
      await this.addSpots(results)
    },

    // テキスト検索する
    textSearch: async function(keyword) {
      this.beforeSearch()
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
    },

    ////////////////////////
    //// 個別機能（ABC順）////
    ////////////////////////

    // 検索結果を整形する
    formatMarker(res) {
      return new Promise(resolve => {
        var address = res.formatted_address ? res.formatted_address : 'null'
        var vicinity = res.vicinity ? res.vicinity : 'null'
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
        // var photo = res.photos
        //   ? res.photos[0].getUrl({ maxWidth: 320 })
        //   : require('@/assets/noimage.png')
        var pos = {
          lat: res.geometry.location.lat(),
          lng: res.geometry.location.lng()
        }

        var formattedResult = {
          marker: {
            address: address,
            icon: icon,
            name: res.name,
            rating: res.rating,
            ratingsTotal: res.user_ratings_total,
            // photoUrl: photo,
            place_id: res.place_id,
            position: pos,
            vicinity: vicinity,
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

    // spotのより詳細な情報を取得する
    getDetail(res) {
      return new Promise((resolve, reject) => {
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        const request = {
          placeId: res.marker.place_id,
          fields: ['opening_hours', 'photos', 'reviews']
        }
        placeService.getDetails(request, (result, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            // const opening_hours = result.opening_hours
            //   ? result.opening_hours
            //   : 'null'
            const photos = result.photos ? result.photos : 'null'
            const reviews = result.reviews ? result.reviews : 'null'

            // res['opening_hours'] = opening_hours
            res['photos'] = photos
            res['reviews'] = reviews
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
            reject(results)
          }
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
    }
  }
}
</script>
