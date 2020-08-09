<template>
  <span>
    <map-container-toolbar
      @nearby-search="nearbySearch"
      @text-search="textSearch"
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
import MapContainerToolbar from '@/components/Map/MapContainerToolbar.vue'
import MapContainerCircle from '@/components/Map/MapContainerCircle.vue'
import MapContainerMarker from '@/components/Map/MapContainerMarker.vue'
import SpotPostDialog from '@/components/Spot/SpotPostDialog.vue'

export default {
  components: {
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
    // SearchMapMarker/methods/panTo(spot)
    // CardFrame/methods/panTo(spot)
    this.$root.$on('panTo', spot => {
      this.panTo(spot.marker.position)
    })

    this.autoNearbySearch()
  },

  methods: {
    ...mapActions({
      clearSpots: 'spot/clearSpots',
      geolocate: 'map/geolocate',
      nearbySearchMap: 'map/nearbySearch',
      nearbySearchPost: 'post/nearbySearch',
      textSearchMap: 'map/textSearch',
      // textSearchPost: 'post/textSearch',
      addSpotsMap: 'map/addSpots',
      collateSpot: 'map/collateSpot',
      addSpotsPost: 'post/addSpots',
      postSpot: 'post/postSpot',
      pushSpot: 'post/pushSpot',
      placeIdGenerator: 'post/placeIdGenerator',
      formatNewSpot: 'format/newSpotFormat',
      formatPostSpot: 'format/postedSpotFormat'
    }),
    ...mapActions(['loadingOn', 'loadingOff', 'dialogOff']),

    // 検索開始前の処理
    beforeSearch() {
      this.dialogOff()
      this.loadingOn()
      this.clearSpots()
    },

    // 検索開始後の処理
    afterSearch() {
      this.loadingOff()
      this.$store.dispatch('pushSnackbar', {
        message: `${this.spots.length} 件ヒットしました`,
        color: 'success'
      })
    },

    // views/Searchアクセス時に自動でNearbySearch
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
      const map = this.$refs.map.$mapObject
      const center = this.center
      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: 500,
        type: ['cafe']
      }

      var resultsInPost = await this.nearbySearchPost(center)
      resultsInPost = await Promise.all(
        resultsInPost.map(async res => {
          return await this.formatPostSpot(res)
        })
      )
      this.addSpotsPost(resultsInPost)

      var resultsInMap = await this.nearbySearchMap({ map, request })
      resultsInMap = await Promise.all(
        resultsInMap.map(async res => {
          var formatted = await this.formatNewSpot(res)
          var assigned = await this.collateSpot(formatted)
          return assigned
        })
      )
      this.addSpotsMap(resultsInMap)
      this.afterSearch()
    },

    // デモ用エリアへ移動して検索
    demoSearch() {
      // this.beforeSearch()
      const center = { lat: 35.680959, lng: 139.767306 }
      this.panTo(center)
      this.center = center
      // this.setMarker(center, 'you-are-here')
      // this.panTo(center)
      this.nearbySearch()
    },

    // キーワード検索
    textSearch: async function(keyword) {
      this.beforeSearch()
      const map = this.$refs.map.$mapObject
      const center = this.center
      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: 500,
        query: keyword
      }

      // var resultsInPost = await this.nearbySearchPost(center)
      // resultsInPost = await Promise.all(
      //   resultsInPost.map(async res => {
      //     return await this.formatPostSpot(res)
      //   })
      // )
      // this.addSpotsPost(resultsInPost)

      var resultsInMap = await this.textSearchMap({ map, request })
      resultsInMap = await Promise.all(
        resultsInMap.map(async res => {
          var formatted = await this.formatNewSpot(res)
          var assigned = await this.collateSpot(formatted)
          return assigned
        })
      )
      this.addSpotsMap(resultsInMap)
      this.afterSearch()
    },

    // スポット新規作成
    createSpot(event) {
      this.$store.dispatch('post/clearSpotFormData')
      if (this.currentUser) {
        this.$store.dispatch('post/geocode', event)
        this.$store.dispatch('post/placeIdGenerate', this.currentUser.data.id)
        // Spot/SpotPostDialog/dialogOn
        this.$store.dispatch('dialogOn', 'dialogSpotCreate')
      } else {
        this.$store.dispatch('pushSnackbar', {
          message: 'スポットを登録するには、ログインが必要です',
          color: 'error'
        })
        // Header/HeaderSignButton/dialogOn
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

    // 周辺のマーカーを抽出する
    // sortMarker(results, pos) {
    //   return new Promise(resolve => {
    //     const request = {
    //       location: new google.maps.LatLng(pos.lat, pos.lng),
    //       radius: 500
    //     }
    //     const sortedResults = results.filter(result => {
    //       return (
    //         google.maps.geometry.spherical.computeDistanceBetween(
    //           result.geometry.location,
    //           request.location
    //         ) < request.radius
    //       )
    //     })
    //     resolve(sortedResults)
    //   })
    // },

    // spotのより詳細な情報を取得する
    // getDetail(res) {
    //   return new Promise((resolve, reject) => {
    //     const map = this.$refs.map.$mapObject
    //     const placeService = new google.maps.places.PlacesService(map)
    //     const request = {
    //       placeId: res.marker.place_id
    //       // fields: ['opening_hours', 'photos', 'reviews']
    //     }
    //     placeService.getDetails(request, (result, status) => {
    //       if (status == 'OK' || status == 'ZERO_RESULTS') {
    //         // const opening_hours = result.opening_hours
    //         //   ? result.opening_hours
    //         //   : null
    //         const address = result.formatted_address
    //           ? result.formatted_address
    //           : null
    //         const phone = result.formatted_phone_number
    //           ? result.formatted_phone_number
    //           : null
    //         const photos = result.photos ? result.photos : null
    //         const reviews = result.reviews ? result.reviews : null
    //         const website = result.website ? result.website : null

    //         // res['opening_hours'] = opening_hours
    //         res.marker['address'] = address
    //         res.marker['phone'] = phone
    //         res.marker['photos'] = photos
    //         res.marker['reviews'] = reviews
    //         res.marker['website'] = website
    //         resolve(res)
    //       } else {
    //         reject(res)
    //       }
    //     })
    //   })
    // },
  }
}
</script>
