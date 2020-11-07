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

  data() {
    return {
      shopList: [
        { jp: 'スターバックス', en: 'starbucks' },
        { jp: 'タリーズ', en: 'tullys' },
        { jp: 'コメダ珈琲', en: 'komeda' },
        { jp: 'ドトール', en: 'doutor' },
        { jp: '上島珈琲', en: 'ueshima' },
        { jp: 'WIRED CAFE', en: 'wired-cafe' }
      ]
    }
  },

  computed: {
    icon: function() {
      return function(spot) {
        return {
          url: require(`@/assets/${this.iconFileName(spot)}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
      }
    },

    iconFileName: function() {
      return function(spot) {
        if (spot.marker.on == true) {
          return 'spotlight'
        }

        let fileName = 'cafe'

        for (let i = 0; i < this.shopList.length; i++) {
          if (spot.marker.name.indexOf(this.shopList[i].jp) !== -1) {
            fileName = this.shopList[i].en
          }
        }

        return fileName
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
