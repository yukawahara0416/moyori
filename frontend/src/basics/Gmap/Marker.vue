<template>
  <div>
    <GmapMarker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.icon"
      :position="m.position"
      :title="m.name"
      @click.native="
        changeIcon(m, id)
        panTo(m.position)
      "
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
      cache: { id: -1, icon: '' }
    }
  },

  methods: {
    // 選択中のマーカーのアイコンを変更する
    changeIcon(marker, id) {
      this.clearIcon(marker, id)
      this.cacheIcon(marker, id)
      this.setIcon(marker, id)
    },

    // 直前に選択していたマーカーのアイコンを戻す
    clearIcon(marker, id) {
      const target = this.markers[this.cache.id]
      if (this.cache.id >= 0 && this.cache.id != id) {
        target.icon = {
          url: this.cache.icon,
          scaledSize: new google.maps.Size(50, 50)
        }
        target.zIndex = 1
      }
    },

    // 選択したマーカーのアイコンを記録する（戻すときに必要）
    cacheIcon(marker, id) {
      if (this.cache.id != id) {
        this.cache = { id: id, icon: marker.icon.url }
      } else {
        this.cache.id = id
      }
    },

    // 選択したマーカーのアイコンを変更する
    setIcon(marker, id) {
      const select = this.markers[id]
      select.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      select.zIndex = 1000
    },

    // 位置座標をマップの中心にする
    panTo(pos) {
      this.$emit('panTo', pos)
    }
  }
}
</script>
