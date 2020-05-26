<template>
  <div>
    <GmapMarker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.icon"
      :position="m.position"
      :title="m.name"
      @click="switchMarkerIcon(m, id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => [],
      required: false
    }
  },

  data() {
    return {
      cacheMarker: { id: -1, icon: '' }
    }
  },

  methods: {
    // 選択中のマーカーのアイコンを変更する
    switchMarkerIcon(marker, id) {
      this.resetMarkerIcon(marker, id)
      this.cacheMarkerIcon(marker, id)
      this.changeMarkerIcon(marker, id)
    },

    // 直前に選択していたマーカーのアイコンを戻す
    resetMarkerIcon(marker, id) {
      const targetMarker = this.markers[this.cacheMarker.id]
      if (this.cacheMarker.id >= 0 && this.cacheMarker.id != id) {
        targetMarker.icon = {
          url: this.cacheMarker.icon,
          scaledSize: new google.maps.Size(50, 50)
        }
        targetMarker.zIndex = 1
      }
    },

    // 選択したマーカーのアイコンを記録する（戻すときに必要）
    cacheMarkerIcon(marker, id) {
      if (this.cacheMarker.id != id) {
        this.cacheMarker = { id: id, icon: marker.icon.url }
      } else {
        this.cacheMarker.id = id
      }
    },

    // 選択したマーカーのアイコンを変更する
    changeMarkerIcon(marker, id) {
      const selectingMarker = this.markers[id]
      selectingMarker.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      selectingMarker.zIndex = 1000
    }
  }
}
</script>
