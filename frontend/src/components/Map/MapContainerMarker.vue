<template>
  <div>
    <gmap-marker
      v-for="(s, id) in spots"
      :animation="4"
      :key="id"
      :icon="icon(s)"
      :position="s.marker.position"
      :title="s.marker.name"
      :zIndex="s.marker.zIndex"
      @click="
        spotlight(id)
        panTo(s)
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
        var iconUrl =
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
        return {
          url: require(`@/assets/${iconUrl}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
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
