<template>
  <span>
    <tutorial-dialog />

    <map-container-toolbar
      @nearby-search="nearbySearch"
      @panto-location="panToLocation"
      @demo-search="demoSearch"
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
      @click="createSpot($event)"
    >
      <map-container-circle :center="center" />

      <map-container-marker :spots="filterSpots" />

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
    ...mapGetters({ spots: 'spot/spots', filterSpots: 'spot/filterSpots' }),
    ...mapGetters(['currentUser', 'dialogSign', 'dialogSpotCreate'])
  },

  async mounted() {
    this.$root.$on('panTo', spot => {
      this.panTo(spot.marker.position)
    })

    this.$root.$on('placeDetailSearch', spot => {
      this.placeDetailSearch(spot)
    })

    this.autoNearbySearch()
  },

  methods: {
    ...mapActions({
      addSpotsStore: 'spot/addSpotsStore',
      clearSpotsStore: 'spot/clearSpotsStore',
      formatSpot: 'spot/formatSpot',
      nearbySearchMap: 'map/nearbySearch',
      collateSpot: 'map/collateSpot',
      placeDetail: 'map/placeDetail',
      geolocate: 'map/geolocate',
      nearbySearchPost: 'post/nearbySearch',
      postSpot: 'post/postSpot',
      unshiftSpotsStore: 'post/unshiftSpotsStore',
      placeIdGenerator: 'post/placeIdGenerator'
    }),
    ...mapActions(['loadingOn', 'loadingOff', 'dialogOff']),

    // 検索開始前の処理
    beforeSearch() {
      this.dialogOff()
      this.loadingOn()
      this.clearSpotsStore()
    },

    // 検索開始後の処理
    afterSearch() {
      this.loadingOff()
      this.$store.dispatch('pushSnackbar', {
        message: `${this.spots.length} 件ヒットしました`,
        color: 'success'
      })
    },

    // 初回読み込み時に自動でNearbySearch
    autoNearbySearch: async function() {
      this.beforeSearch()
      const center = await this.geolocate()
      this.$gmapApiPromiseLazy().then(() => {
        this.center = center
        this.setMarker(center, 'you-are-here')
        this.panTo(center)
        this.nearbySearch()
      })
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

      const nearbyPostSpots = await this.nearbySearchPost(center)
      let nearbyMapSpots = await this.nearbySearchMap({ map, request })
      nearbyMapSpots = await Promise.all(
        nearbyMapSpots.map(async spot => {
          const format = await this.formatSpot(spot)
          const assigned = await this.collateSpot(format)
          return assigned
        })
      )
      const nearbySpots = nearbyPostSpots.concat(nearbyMapSpots)
      this.addSpotsStore(nearbySpots)
      this.afterSearch()
    },

    // デモ用エリアへ移動して検索
    demoSearch() {
      const center = { lat: 35.680959, lng: 139.767306 }
      this.panTo(center)
      this.center = center
      this.nearbySearch()
    },

    // PlaceDetail検索
    placeDetailSearch: async function(spot) {
      const map = this.$refs.map.$mapObject
      const detail = await this.placeDetail({ map, spot })
      this.$store.commit('spot/updateDataSpotsStore', {
        spot: spot,
        data: detail,
        prop: 'detail'
      })
    },

    // スポット新規作成
    createSpot(event) {
      this.$store.commit('post/clearSpotFormData')
      if (this.currentUser) {
        this.$store.dispatch('post/geocode', event)
        this.$store.dispatch('post/placeIdGenerate', this.currentUser.data.id)
        this.$store.dispatch('dialogOn', 'dialogSpotCreate')
      } else {
        this.$store.dispatch('pushSnackbar', {
          message: 'スポットを登録するには、ログインが必要です',
          color: 'error'
        })
        this.$store.dispatch('dialogOn', 'dialogSign')
      }
    },

    // マップ中心の座標を監視
    onCenter(pos) {
      this.center = { lat: pos.lat(), lng: pos.lng() }
    },

    // マップの任意座標へ移動
    panTo(pos) {
      this.$refs.map.panTo(pos)
    },

    // 現在地へ移動
    panToLocation: async function() {
      this.loadingOn()
      const center = await this.geolocate()
      this.setMarker(center, 'you-are-here')
      this.panTo(center)
      this.loadingOff()
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
    }
  }
}
</script>
