<template>
  <span>
    <search-filter />

    <search-card-container />

    <search-map-container />
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import SearchFilter from '@/components/Search/SearchFilter.vue'
import SearchCardContainer from '@/components/Search/SearchCardContainer.vue'
import SearchMapContainer from '@/components/Search/SearchMapContainer.vue'

export default {
  components: {
    SearchFilter,
    SearchCardContainer,
    SearchMapContainer
  },

  created() {
    this.clearSpotsStore()
    this.clearUser()
  },

  methods: {
    ...mapMutations({
      clearSpotsStore: 'spot/clearSpotsStore',
      clearUser: 'user/clearUser'
    })
  }
}
</script>
