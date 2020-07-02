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
      const target = this.spot[this.genre]
      return target.length > 0 ? target.length : 0
    }
  }
}
</script>
