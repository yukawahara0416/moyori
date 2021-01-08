<template>
  <div
    class="filter-container"
    :class="{
      md_and_up: $vuetify.breakpoint.mdAndUp,
      sm_and_down: $vuetify.breakpoint.smAndDown
    }"
  >
    <v-row class="ml-5">
      <search-filter-result
        v-if="$vuetify.breakpoint.smAndUp"
        :spots="spots"
        :filteredSpots="filteredSpots"
      />

      <search-filter-radius />

      <search-filter-type />

      <search-filter-switch :spots="spots" />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchFilterResult from '@/components/Search/SearchFilterResult.vue'
import SearchFilterRadius from '@/components/Search/SearchFilterRadius.vue'
import SearchFilterType from '@/components/Search/SearchFilterType.vue'
import SearchFilterSwitch from '@/components/Search/SearchFilterSwitch.vue'

export default {
  components: {
    SearchFilterResult,
    SearchFilterRadius,
    SearchFilterType,
    SearchFilterSwitch
  },

  mounted() {
    scrollTo()
  },

  computed: {
    ...mapGetters({ spots: 'spot/spots', filteredSpots: 'spot/filteredSpots' })
  }
}
</script>

<style scoped>
.filter-container {
  position: fixed;
  width: 100%;
  background-color: white;
}
.md_and_up {
  height: 64px;
  top: 68px;
}
.sm_and_down {
  height: 56px;
  top: 60px;
}
</style>
