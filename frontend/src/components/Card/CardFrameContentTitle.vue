<template>
  <v-card-title class="nowrap py-2">
    <p class="ma-0">{{ spot.data.name }}</p>
  </v-card-title>
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
  }
}
</script>

<style scoped>
.nowrap p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
