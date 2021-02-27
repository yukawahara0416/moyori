<template>
  <p class="mb-1">
    <strong>ＵＲＬ：</strong>
    <a :href="url" target="_blank">
      {{ url }}
    </a>
  </p>
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
    }
  },

  computed: {
    url() {
      return this.spot.data.url
    }
  }
}
</script>
