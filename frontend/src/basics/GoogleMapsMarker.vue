<template>
  <div>
    <gmap-marker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.icon"
      :position="m.position"
      :title="m.name"
      :zIndex="m.zIndex"
      @click="
        setCurrentMarker(m, id)
        scrollCard(id)
      "
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['markers', 'currentMarker'])
  },

  watch: {
    // Cardコンポーネントと選択中のマーカーを同期しています
    currentMarker() {
      if (this.currentMarker.id >= 0) {
        var pos = this.markers[this.currentMarker.id].position
        this.panTo(pos)
      }
    }
  },

  methods: {
    setCurrentMarker(marker, id) {
      this.$store.dispatch('setCurrentMarker', { marker: marker, id: id })
      this.panTo(marker.position)
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
