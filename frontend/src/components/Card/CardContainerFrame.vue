<template>
  <v-card
    class="mt-2 d-flex flex-column"
    height="100%"
    hover
    :class="{ selected: isActive }"
    :id="id"
    @click="
      spotlight(spot)
      panTo(spot)
    "
  >
    <card-container-frame-content :spot="spot" :type="type" />
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

  computed: {
    isActive() {
      return this.spot.marker.on
    }
  },

  methods: {
    spotlight(spot) {
      this.$route.name == 'search'
        ? this.$store.dispatch('spot/spotlight', spot)
        : this.$store.dispatch('user/spotlight', {
            spot: spot,
            type: this.type
          })
    },

    // SearchMapWrap/mounted
    panTo(spot) {
      if (this.$route.name == 'search') this.$root.$emit('panTo', spot)
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
