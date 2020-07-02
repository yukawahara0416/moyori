<template>
  <v-row
    class="ma-0"
    fill-height
    no-gutter
    style="position: relative; height: calc(100vh - 64px);"
  >
    <search-map-container />
    <search-card-container />
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import SearchMapContainer from '@/components/Search/SearchMapContainer.vue'
import SearchCardContainer from '@/components/Search/SearchCardContainer.vue'

export default {
  components: {
    SearchMapContainer,
    SearchCardContainer
  },

  created() {
    this.clearSpots()
    this.clearUser()
  },

  methods: {
    ...mapActions({
      clearSpots: 'spot/clearSpots',
      clearUser: 'user/clearUser'
    })
  }
}
</script>
