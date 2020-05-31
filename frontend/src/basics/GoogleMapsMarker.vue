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

    cache: {
      get() {
        return this.$store.getters.cache
      },
      // markerの選択状態をCardが監視
      set(value) {
        this.$store.dispatch('updateCurrentMarker', value)
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
