<template>
  <v-col
    class="pa-0"
    no-gutter
    :class="{
      mapHeight_big: $vuetify.breakpoint.mdAndUp,
      mapHeight_small: $vuetify.breakpoint.smAndDown
    }"
    :style="styleVariables"
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

  mounted() {
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  data() {
    return {
      height: window.innerHeight
    }
  },

  computed: {
    styleVariables() {
      return {
        '--checkbox-height': `${this.height}px`
      }
    }
  },

  methods: {
    handleResize() {
      this.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
.mapHeight_big {
  --checkbox-height: 100vh;
  position: fixed;
  top: calc(132px);
  right: 0;
  width: calc(50vw);
  height: calc(var(--checkbox-height) - 132px);
}
.mapHeight_small {
  position: fixed;
  top: calc(116px);
  left: 0;
  width: calc(100vw);
  height: calc(50vh - 116px);
}
</style>
