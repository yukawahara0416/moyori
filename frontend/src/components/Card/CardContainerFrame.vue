<template>
  <v-card
    class="mt-2 d-flex flex-column"
    height="100%"
    hover
    :class="{ selected: spot.marker.on === true }"
    :id="id"
    @click="
      spotlight(id)
      panTo(spot)
    "
  >
    <card-container-frame-content :spot="spot" :id="id" :type="type" />
  </v-card>
</template>

<script>
import CardContainerFrameContent from '@/components/Card/CardContainerFrameContent.vue'

export default {
  props: {
    spot: Object,
    id: Number,
    type: String
  },

  components: {
    CardContainerFrameContent
  },

  methods: {
    spotlight(id) {
      this.type === 'map'
        ? this.$store.dispatch('spot/spotlight', id)
        : this.$store.dispatch('user/spotlight', { id: id, type: this.type })
    },

    // SearchMapWrap/mounted
    panTo(spot) {
      this.type === 'map' ? this.$root.$emit('panTo', spot) : []
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
