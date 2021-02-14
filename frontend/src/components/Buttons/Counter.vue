<template>
  <p>{{ count }}</p>
</template>

<script>
import { Spot } from '@/class/Spot.js'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    },
    target: {
      type: String,
      default: '',
      required: true
    }
  },

  computed: {
    count() {
      return this.spot[this.target].length
    }
  }
}
</script>
