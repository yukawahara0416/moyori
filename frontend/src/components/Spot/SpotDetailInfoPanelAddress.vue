<template>
  <p class="mb-1">
    <strong>住所：</strong>
    <a :href="url" target="_blank">{{ address }}</a>
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
    address() {
      return this.spot.data.address
    },

    url() {
      return (
        'https://www.google.com/maps/dir/?api=1&destination=' +
        this.spot.data.position.lat +
        ',' +
        this.spot.data.position.lng
      )
    }
  }
}
</script>
