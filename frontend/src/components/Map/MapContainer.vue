<template>
  <span>
    <tutorial-dialog />

    <map-container-toolbar
      @demo-search="demoSearch()"
      @nearby-search="nearbySearch()"
      @panto-location="panToLocation()"
    />

    <gmap-map
      ref="map"
      style="width: 100%; height: 100%;"
      :center="location"
      :options="{
        clickableIcons: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        mapTypeControl: false
      }"
      :zoom="16"
      @center_changed="onCenter"
      @click="openDialogSpotCreate($event)"
    >
      <map-container-circle :center="center" />

      <map-container-marker :spots="filteredSpots" />

      <spot-post-dialog />
    </gmap-map>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TutorialDialog from '@/components/Tutorial/TutorialDialog.vue'
import MapContainerToolbar from '@/components/Map/MapContainerToolbar.vue'
import MapContainerCircle from '@/components/Map/MapContainerCircle.vue'
import MapContainerMarker from '@/components/Map/MapContainerMarker.vue'
import SpotPostDialog from '@/components/Spot/SpotPostDialog.vue'

export default {
  components: {
    TutorialDialog,
    MapContainerToolbar,
    MapContainerCircle,
    MapContainerMarker,
    SpotPostDialog
  },

  data() {
    return {
      center: { lat: 0, lng: 0 },
      location: { lat: 35.68, lng: 139.76 }
    }
  },

  computed: {
    ...mapGetters({ spots: 'spot/spots', filteredSpots: 'spot/filteredSpots' }),
    ...mapGetters(['currentUser', 'isLoggingIn'])
  },

  async mounted() {
    this.$root.$on('panTo', spot => {
      this.panTo(spot.marker.position)
    })

    this.$root.$on('placeDetailSearch', spot => {
      this.placeDetailSearch(spot)
    })

    this.geolocationAndNearbySearch()
  },

  methods: {
    ...mapActions(['loadingOn', 'loadingOff', 'dialogOff']),

    // 位置情報を取得してから周辺検索
    geolocationAndNearbySearch: async function() {
      this.beforeSearch()
      const locationInformation = await this.$store.dispatch('map/geolocate')
      this.$gmapApiPromiseLazy().then(() => {
        this.center = locationInformation
        this.setMarker(locationInformation, 'you-are-here')
        this.panTo(locationInformation)
        this.nearbySearch()
      })
    },

    // 検索開始前の処理
    beforeSearch() {
      this.dialogOff()
      this.loadingOn()
      this.$store.dispatch('spot/clearSpotsStore')
    },

    // 検索開始後の処理
    afterSearch() {
      this.loadingOff()
      this.$store.dispatch('pushSnackbar', {
        message: `${this.spots.length} 件ヒットしました`,
        color: 'success'
      })
    },

    // マップにマーカーを追加
    setMarker(center, icon) {
      new google.maps.Marker({
        map: this.$refs.map.$mapObject,
        position: center,
        clickable: false,
        icon: {
          url: require(`@/assets/${icon}.png`),
          scaledSize: new google.maps.Size(50, 50)
        },
        zIndex: 1
      })
    },

    // マップの任意座標へ移動
    panTo(pos) {
      this.$refs.map.panTo(pos)
    },

    // デモ用エリアへ移動して検索
    demoSearch() {
      const center = { lat: 35.680959, lng: 139.767306 }
      this.panTo(center)
      this.center = center
      this.nearbySearch()
    },

    // 周辺スポットの検索
    nearbySearch: async function() {
      this.beforeSearch()
      const center = this.center
      const map = this.$refs.map.$mapObject
      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: 500,
        type: ['cafe']
      }

      const nearbyPostSpots = await this.$store.dispatch(
        'post/nearbySearch',
        center
      )
      let nearbyMapSpots = await this.$store.dispatch('map/nearbySearch', {
        map,
        request
      })
      nearbyMapSpots = await Promise.all(
        nearbyMapSpots.map(async spot => {
          const format = await this.$store.dispatch('spot/formatSpot', spot)
          const assigned = await this.$store.dispatch('map/collateSpot', format)
          return assigned
        })
      )
      const nearbySpots = nearbyPostSpots.concat(nearbyMapSpots)
      this.$store.dispatch('spot/addSpotsStore', nearbySpots)
      this.afterSearch()
    },

    // 現在地へ移動
    panToLocation: async function() {
      this.loadingOn()
      const center = await this.$store.dispatch('map/geolocate')
      this.setMarker(center, 'you-are-here')
      this.panTo(center)
      this.loadingOff()
    },

    // PlaceDetail検索
    placeDetailSearch: async function(spot) {
      const map = this.$refs.map.$mapObject
      const detail = await this.$store.dispatch('map/placeDetail', {
        map,
        spot
      })
      this.$store.commit('spot/updateDataSpotsStore', {
        spot: spot,
        data: detail,
        prop: 'detail'
      })
    },

    // マップ中心の座標を監視
    onCenter(pos) {
      this.center = { lat: pos.lat(), lng: pos.lng() }
    },

    // スポット新規作成ダイヤログを開く
    openDialogSpotCreate(event) {
      if (this.isLoggingIn == false) {
        this.$store.dispatch('pushSnackbar', {
          message: 'スポットを登録するには、ログインが必要です',
          color: 'error'
        })
        this.$store.dispatch('dialogOn', 'dialogSign')
      }

      this.$store.commit('post/clearSpotFormData')
      this.$store.dispatch('post/geocodeGenerate', event)
      this.$store.dispatch('post/placeIdGenerate', this.currentUser.data.id)
      this.$store.dispatch('dialogOn', 'dialogSpotCreate')
    }
  }
}
</script>
