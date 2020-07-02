<template>
  <v-col
    class="pa-0"
    cols="12"
    md="6"
    no-gutter
    :class="{
      mapHeight_big: $vuetify.breakpoint.mdAndUp,
      mapHeight_small: $vuetify.breakpoint.smAndDown
    }"
  >
    <map-container />
  </v-col>
</template>

<script>
import MapContainer from '@/components/Map/MapContainer.vue'

export default {
  components: {
    MapContainer
  },

  computed: {
    vhHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '60vh'
        case 'sm':
          return '70vh'
        case 'md':
          return '80vh'
        case 'lg':
          return '90vh'
        case 'xl':
          return '100vh'
        default:
          return '100vh'
      }
    }
  }
}
</script>

<style scoped>
.mapHeight_big {
  height: 100%;
  width: 100%;
}
.mapHeight_small {
  height: 50%;
  width: 100%;
}
</style>
