<template>
  <v-col
    class="pa-0"
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
  }
}
</script>

<style scoped>
.mapHeight_big {
  position: fixed;
  top: calc(132px);
  right: 0;
  width: calc(50vw);
  height: calc(100vh - 132px);
}
.mapHeight_small {
  position: fixed;
  top: calc(116px);
  left: 0;
  width: calc(100vw);
  height: calc(50vh - 116px);
}
</style>
