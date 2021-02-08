<template>
  <v-card
    class="d-flex flex-column"
    height="100%"
    max-height="420px"
    hover
    :class="{ selected: isActive }"
    :id="id"
    @click="
      spotlight(spot.data.place_id)
    "
  >
    <card-frame-content :spot="spot" />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardFrameContent from '@/components/Card/CardFrameContent.vue'

export default {
  props: {
    spot: Object,
    id: Number
  },

  components: {
    CardFrameContent
  },

  computed: {
    ...mapGetters(['map', 'profileTab']),

    isActive() {
      return this.spot.data.on
    }
  },

  methods: {
    ...mapActions({
      spotlightSearch: 'spot/spotlight',
      spotlightProfile: 'user/spotlight'
    }),

    spotlight(place_id) {
      const tab = this.profileTab
      const route = this.$route.name

      route == 'search'
        ? this.spotlightSearch(place_id)
        : this.spotlightProfile({ place_id, tab })
    },

    // カードをクリックすると、マーカーが地図の中心になるよう移動します
    panTo(spot) {
      const position = new google.maps.LatLng(
        spot.data.position.lat,
        spot.data.position.lng
      )
      this.map.panTo(position)
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
