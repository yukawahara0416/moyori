<template>
  <div>
    <gmap-marker
      v-for="(spot, id) in spots"
      :animation="4"
      :key="id"
      :icon="icon(spot)"
      :position="spot.marker.position"
      :title="spot.marker.name"
      :zIndex="spot.marker.zIndex"
      @click="
        spotlight(spot)
        panTo(spot)
        scroll(id)
      "
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    spots: Array
  },

  computed: {
    icon: function() {
      return function(spot) {
        return {
          url: require(`@/assets/${this.iconUrl(spot)}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
      }
    },

    iconUrl: function() {
      return function(spot) {
        var url =
          'name' in spot.marker
            ? spot.marker.on === false
              ? spot.marker.name.indexOf('スターバックス') !== -1
                ? 'starbucks'
                : spot.marker.name.indexOf('タリーズ') !== -1
                ? 'tullys'
                : spot.marker.name.indexOf('コメダ珈琲') !== -1
                ? 'komeda'
                : spot.marker.name.indexOf('ドトール') !== -1
                ? 'doutor'
                : spot.marker.name.indexOf('上島珈琲') !== -1
                ? 'ueshima'
                : spot.marker.name.indexOf('WIRED CAFE') !== -1
                ? 'wired-cafe'
                : 'cafe'
              : 'spotlight'
            : 'cafe'
        return url
      }
    }
  },

  methods: {
    ...mapActions({ spotlight: 'spot/spotlight' }),

    // SearchMapWrap/mounted
    panTo(spot) {
      this.$root.$emit('panTo', spot)
    },

    scroll(id) {
      var element = document.getElementById(id)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }
}
</script>
