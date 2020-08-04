<template>
  <v-col
    class="pa-0"
    :class="{
      indexHeight_big: $vuetify.breakpoint.mdAndUp,
      indexHeight_small: $vuetify.breakpoint.smAndDown
    }"
    cols="12"
    md="6"
    no-gutter
  >
    <v-container
      class="overflow-y-auto"
      fluid
      id="scroll-target"
      style="height: 100%; width: 100%;"
    >
      <search-card-container-fill :spots="filterSpots" />

      <card-container :spots="filterSpots ? filterSpots : []" :type="'map'" />
    </v-container>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchCardContainerFill from '@/components/Search/SearchCardContainerFill.vue'
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  components: {
    SearchCardContainerFill,
    CardContainer
  },

  computed: {
    ...mapGetters({ spots: 'spot/spots', filterSpots: 'spot/filterSpots' }),

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
.indexHeight_big {
  height: 100%;
  width: 100%;
}
.indexHeight_small {
  height: 40%;
  width: 100%;
}
</style>
