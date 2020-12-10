<template>
  <p>{{ count }}</p>
</template>

<script>
export default {
  props: {
    spot: Object,
    target: String
  },

  computed: {
    count() {
      return this.spot[this.target].length
    }
  }
}
</script>
