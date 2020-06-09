<template>
  <div>
    <gmap-marker
      v-for="(s, id) in spots"
      :key="id"
      :icon="s.marker.icon"
      :position="s.marker.position"
      :title="s.marker.name"
      :zIndex="s.marker.zIndex"
      @click="
        setCurrentMarker(s.marker, id)
        panTo(s.marker.position)
        scrollCard(id)
      "
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['spots', 'cache'])
  },

  watch: {
    // Cardコンポーネントと選択中のマーカーを同期しています
    cache() {
      if (this.cache.id >= 0) {
        const pos = this.spots[this.cache.id].marker.position
        this.panTo(pos)
      }
    }
  },

  methods: {
    setCurrentMarker(marker, id) {
      this.$store.dispatch('setCurrentMarker', { marker: marker, id: id })
    },

    panTo(pos) {
      this.$emit('pan-to', pos)
    },

    // 選択したマーカーに対応するカードへスクロールします
    scrollCard(id) {
      var element = document.getElementById(id)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }
}
</script>
