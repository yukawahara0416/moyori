<template>
  <v-container
    class="pa-0 overflow-y-auto"
    fluid
    id="scroll-target"
    :class="{
      indexHeight_big: $vuetify.breakpoint.mdAndUp,
      indexHeight_small: $vuetify.breakpoint.smAndDown
    }"
    :style="styleVariables"
  >
    <card-container :spots="filteredSpots" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  components: {
    CardContainer
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
  },

  computed: {
    ...mapGetters({ filteredSpots: 'spot/filteredSpots' })
  }
}
</script>

<style scoped>
.indexHeight_big {
  position: fixed;
  top: 132px;
  background-color: white;
  width: 50vw;
  height: calc(100vh - 132px);
}
.indexHeight_small {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: calc(100vw);
  height: calc(50vh);
}
</style>
