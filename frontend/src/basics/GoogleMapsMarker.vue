<template>
  <div>
    <gmap-marker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.data.icon"
      :position="m.data.position"
      :title="m.data.name"
      :zIndex="m.data.zIndex"
      @click="
        setCurrentMarker(m, id)
        panTo(m.data.position)
        scrollCard(id)
      "
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['markers', 'cache'])
  },

  watch: {
    // Cardコンポーネントと選択中のマーカーを同期しています
    cache() {
      if (this.cache.id >= 0) {
        const pos = this.markers[this.cache.id].data.position
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
