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
        changeIcon(m, id)
        panTo(m.position)
      "
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['markers']),

    currentMarker: {
      get() {
        return this.$store.getters.currentMarker
      },
      // markerの選択状態をCardが監視
      set(value) {
        this.$store.dispatch('setCurrentMarker', value)
      }
    }
  },

  watch: {
    // Cardの選択状態を監視
    currentMarker() {
      if (this.currentMarker.id >= 0) {
        var pos = this.markers[this.currentMarker.id].position
        this.panTo(pos)
      }
    }
  },

  methods: {
    changeIcon(marker, id) {
      this.$store.dispatch('changeIcon', { marker: marker, id: id })
    },

    panTo(pos) {
      this.$emit('pan-to', pos)
    }
  }
}
</script>
