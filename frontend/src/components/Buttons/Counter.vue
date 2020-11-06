<template>
  <p>{{ count }}</p>
</template>

<script>
export default {
  props: {
    spot: Object,
    genre: String
  },

  computed: {
    count() {
      const targetSpots = this.spot[this.genre]
      return targetSpots.length > 0 ? targetSpots.length : 0
    }
  }
}
</script>
