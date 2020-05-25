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
      <GmapCircle :currentCenter="currentCenter" />
      <GmapMarker :markers="markers" />
    </GmapMap>
    <v-btn data-test="btn1" @click="moveToCurrentLocation">現在地へ移動</v-btn>
    <v-btn data-test="btn2" @click="setNearbyMarkers">周辺情報を取得</v-btn>
    <p>lat: {{ currentCenter.lat }}</p>
    <p>lng: {{ currentCenter.lng }}</p>
    <v-card v-for="(m, id) in markers" :key="id">
      <v-card-text>
        <p>{{ m.name }}</p>
        <p>{{ m.place_id }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import GmapCircle from '@/basics/Gmap/Circle.vue'
import GmapMarker from '@/basics/Gmap/Marker.vue'

export default {
  components: {
    GmapCircle,
    GmapMarker
  },

  data() {
    return {
      currentCenter: { lat: 35.68, lng: 139.76 },
      mapLocation: { lat: 35.68, lng: 139.76 },
      mapOptions: {
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: false
      }
    }
  },

  computed: {
    markers() {
      return this.$store.getters.markers
    }
  },

  // 初回読込時に現在地周辺を検索する
  async mounted() {
    const pos = await this.getCurrentLocation()
    // vue-google-mapsマップのレンダリングが完了してから処理を実行
    this.$gmapApiPromiseLazy().then(() => {
      google.maps.event.addListenerOnce(
        this.$refs.map.$mapObject,
        'idle',
        async function() {
          await this.setCurrentLocationMarker(pos)
          await this.panToLocation(pos)
          await this.setNearbyMarkers()
        }.bind(this)
      )
    })
  },

  // store整備が落ち着いたところで、機能で区切ってプラグイン化したい
  // JavaScript - vueCLIで外部JSファイルを読み込む方法｜teratail https://teratail.com/questions/251891
  methods: {
    // 現在地へ移動する
    moveToCurrentLocation: async function() {
      const pos = await this.getCurrentLocation()
      await this.setCurrentLocationMarker(pos)
      await this.panToLocation(pos)
    },

    // マップの中心付近を検索する
    setNearbyMarkers: async function() {
      this.beforeSearch()
      const pos = this.currentCenter
      const results = await this.nearbySearch(pos)
      const formattedResults = await Promise.all(
        results.map(async res => {
          return await this.formatResult(res)
        })
      )
      await this.pushToMarkers(formattedResults)
    },

    // 検索開始時の処理
    beforeSearch() {
      this.resetMarkers()
    },

    // 検索終了時の処理
    afterSearch() {},

    // 検索結果（res）を整形する
    formatResult(res) {
      return new Promise(resolve => {
        var address = res.formatted_address ? res.formatted_address : 'null'
        // error: open_now is deprecated as of November 2019 and will be turned off in November 2020. Use the isOpen() function from a PlacesService.getDetails() result instead.
        // var isOpen = res.opening_hours ? res.opening_hours.open_now : 'null'
        var iconUrl =
          res.name.indexOf('スターバックス') !== -1
            ? require('@/assets/starbucks-ori.png')
            : res.name.indexOf('タリーズ') !== -1
            ? require('@/assets/tullys-ori.png')
            : res.name.indexOf('コメダ珈琲') !== -1
            ? require('@/assets/komeda-ori.png')
            : res.name.indexOf('ドトール') !== -1
            ? require('@/assets/komeda-ori.png')
            : res.name.indexOf('上島珈琲') !== -1
            ? require('@/assets/ueshima-ori.png')
            : res.name.indexOf('WIRED CAFE') !== -1
            ? require('@/assets/wired-cafe-ori.png')
            : require('@/assets/cafe.png')
        var icon = {
          url: iconUrl,
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
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
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
              reject(err)
              console.log('現在地の取得中にエラーが発生しました')
              console.log(err)
            },
            options
          )
        } else {
          console.log('ブラウザが位置情報を取得できませんでした')
        }
      })
    },

    // 与えられた位置（pos）周辺の情報を取得する
    nearbySearch(pos) {
      return new Promise(resolve => {
        const request = {
          location: new google.maps.LatLng(pos.lat, pos.lng),
          radius: 500,
          type: ['cafe']
        }
        const map = this.$refs.map.$mapObject
        const placeService = new google.maps.places.PlacesService(map)
        placeService.nearbySearch(request, (results, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            resolve(results)
          } else {
            console.log('周辺の情報を取得中にエラーが発生しました')
          }
        })
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

    // 検索結果をマーカーに追加する
    pushToMarkers(results) {
      this.$store.dispatch('pushToMarkers', results)
    },

    // 検索結果をリセットする
    resetMarkers() {
      this.markers = []
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
