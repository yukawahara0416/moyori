<template>
  <span>
    <div class="nearby-button">
      <map-nearby-button @nearby-search="nearbySearch" />
    </div>

    <div class="panto-button">
      <map-panto-button @panto-location="panToLocation" />
    </div>

    <gmap-map
      ref="map"
      class="gmap"
      :center="location"
      :options="{
        clickableIcons: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        mapTypeControl: false,
        streetViewControl: false
      }"
      :zoom="zoom"
      @center_changed="onCenter"
      @click="openDialogPostSpot($event)"
    >
      <map-circle :center="center" />

      <map-marker :spots="filteredSpots" />

      <spot-post-dialog />
    </gmap-map>
  </span>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MapNearbyButton from '@/components/Map/MapNearbyButton.vue'
import MapPantoButton from '@/components/Map/MapPantoButton.vue'
import MapCircle from '@/components/Map/MapCircle.vue'
import MapMarker from '@/components/Map/MapMarker.vue'
import SpotPostDialog from '@/components/Spot/SpotPostDialog.vue'
import { gmapApi } from 'vue2-google-maps'
import {
  nearbySearch,
  geolocate,
  geocodeGenerate,
  placeIdGenerate
} from '@/plugins/maps.js'

export default {
  components: {
    MapNearbyButton,
    MapPantoButton,
    MapCircle,
    MapMarker,
    SpotPostDialog
  },

  async mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      this.googleMutation(gmapApi)
      this.mapMutation(this.$refs.map.$mapObject)
    })

    // this.geolocationAndNearbySearch()
    this.demoSearch()
  },

  data() {
    return {
      center: { lat: 0, lng: 0 },
      location: { lat: 35.680959, lng: 139.767306 }
    }
  },

  computed: {
    ...mapGetters({
      spots: 'spot/spots',
      radius: 'spot/radius',
      type: 'spot/type',
      filteredSpots: 'spot/filteredSpots'
    }),
    ...mapGetters(['currentUser', 'isLoggingIn']),

    zoom() {
      if (this.radius.value === 3000) return 13
      if (this.radius.value === 1000 && this.$vuetify.breakpoint.smAndDown)
        return 14
      if (this.radius.value === 1000 && this.$vuetify.breakpoint.mdAndUp)
        return 15
      if (this.$vuetify.breakpoint.smAndDown) return 15
      return 16
    }
  },

  methods: {
    ...mapMutations([
      'googleMutation',
      'mapMutation',
      'assignSpotFormData',
      'clearForm',
      'loadingOn',
      'loadingOff',
      'dialogOn'
    ]),
    ...mapMutations({
      setSpots: 'spot/setSpots',
      clearSpotsStore: 'spot/clearSpotsStore',
      setRadius: 'spot/setRadius'
    }),
    ...mapActions(['dialogOff', 'pushSnackbarSuccess', 'pushSnackbarError']),

    // 検索開始前の処理
    beforeSearch() {
      this.dialogOff('dialogSign')
      this.dialogOff('dialogSpotCreate')
      this.dialogOff('dialogSpotEdit')
      this.loadingOn()
      this.clearSpotsStore()
    },

    // 位置情報を取得してから周辺検索
    // geolocationAndNearbySearch: async function() {
    //   let locationInfo = null

    //   this.beforeSearch()

    //   try {
    //     locationInfo = await geolocate()
    //   } catch (error) {
    //     this.pushSnackbarError({ message: error })
    //   }

    //   this.$gmapApiPromiseLazy().then(() => {
    //     this.center = locationInfo
    //     this.setLocationMarker(locationInfo, 'you-are-here')
    //     this.panTo(locationInfo)
    //     this.nearbySearch()
    //   })
    // },

    // デモ用エリアへ移動して検索
    demoSearch() {
      const center = { lat: 35.680959, lng: 139.767306 }
      this.$gmapApiPromiseLazy().then(() => {
        this.center = center
        this.panTo(center)
        this.nearbySearch()
      })
    },

    // 周辺スポットの検索
    nearbySearch: async function() {
      this.beforeSearch()

      const center = this.center
      const radius = this.radius.value
      const type = this.type.value
      const map = this.$refs.map.$mapObject
      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: radius,
        type: [type]
      }

      try {
        const spots = await nearbySearch(center, radius, map, request)

        this.setSpots(spots)

        this.loadingOff()
        this.pushSnackbarSuccess({
          message: `${this.spots.length} 件ヒットしました`
        })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    // 現在地へ移動
    panToLocation: async function() {
      try {
        this.loadingOn()
        const position = await geolocate()
        this.setLocationMarker(position)
        this.panTo(position)
      } catch (error) {
        this.pushSnackbarSuccess({ message: error })
      } finally {
        this.loadingOff()
      }
    },

    // 現在地マーカーを追加
    setLocationMarker(pos) {
      new google.maps.Marker({
        position: pos,
        map: this.map,
        clickable: false,
        icon: {
          url: require('@/assets/you-are-here.png'),
          scaledSize: new google.maps.Size(50, 50)
        },
        zIndex: 1
      })
    },

    // スポット新規作成ダイヤログを開く
    openDialogPostSpot: async function(event) {
      if (!this.isLoggingIn) {
        this.pushSnackbarError({
          message: 'スポットを登録するには、ログインが必要です'
        })
        this.dialogOn('dialogSign')
        return
      }

      this.clearForm()
      const geocodeData = await geocodeGenerate(event)
      const placeIdData = placeIdGenerate(this.currentUser.data.id)
      this.assignSpotFormData(geocodeData)
      this.assignSpotFormData(placeIdData)
      this.dialogOn('dialogSpotCreate')
    },

    // マップ中心の座標を監視
    onCenter(pos) {
      this.center = { lat: pos.lat(), lng: pos.lng() }
    },

    // マップの任意座標へ移動
    panTo(pos) {
      this.$refs.map.panTo(pos)
    }
  }
}
</script>

<style scoped>
.nearby-button {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translate(-50%, 0px);
  z-index: 100;
}
.panto-button {
  position: absolute;
  bottom: 120px;
  right: 10px;
  transform: translate(0px, 0px);
  z-index: 100;
}
.gmap {
  width: 100%;
  height: 100%;
}
</style>
